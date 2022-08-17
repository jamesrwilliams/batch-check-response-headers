const axios = require('axios');

try {
  const { urls, expectedHeaders: headers } = require('./config.js');

  // Normalise header names
  const expectedHeaders = headers.map((elm) => elm.toLowerCase());

  console.log('\n');
  console.log(`Starting header monitor for ${urls.length} URLs, looking for the following ${expectedHeaders.length} headers:`);
  console.log(expectedHeaders.join(', '));

  const fetchPromises = [];

  urls.forEach((url) => {
    fetchPromises.push(axios.get(url));
  });

  const output = {};

  Promise.all(fetchPromises).then((results) => {
    results.forEach((response) => {
      const { request: {host, protocol}, headers } = response;

      // Filter our expected array with headers provided by the request. This will leave us with
      // the headers we're missing.
      const missing = [...expectedHeaders].filter((elm) => Object.keys(headers).indexOf(elm) === -1);

      output[`${protocol}//${host}`] = {
        missing: missing,
        hasAll: missing.length === 0,
        headers: Object.keys(headers)
      }
    });
  }).finally(async () => {
    console.log('\nResults:\n');

    const missingCounts = {
      all: 0,
      some: 0,
      none: 0
    }

    for (const [key, {missing}] of Object.entries(output)) {

      const breakdown = `${missing.length}/${expectedHeaders.length}`;

      if(missing.length === 0) {
        missingCounts.none++;
      } else if(missing.length === expectedHeaders.length) {
        console.log(`🔴 ${key} is missing all expected headers.`);
        missingCounts.all++;
      } else {
        missingCounts.some++;
        console.log(`${key} is missing ${breakdown} expected headers:`);
        console.log(missing.join('\n') + '\n');
      }
    }

    console.log(`\nTotals: ${Object.entries(missingCounts).map(([status, count]) => `${status}: ${count}`).join(', ')}`);

  }).catch((err) => {
    console.log(err);
  });

  return;

} catch (e) {
  if(e.message.indexOf(`Cannot find module './config.js'`) !== -1) {
    console.log('Error: Cannot find a ./config.js file in the script directory.');
  } else {
    console.log(e);
  }
}
