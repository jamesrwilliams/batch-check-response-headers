const axios = require('axios');

try {
  const { expectedHeaders, variations, subdomains, url, options } = require('./config.json');

  const { show_only_failures: ONLY_SHOW_FAILS } = options;

  const fetchPromises = [];

  const modifiers = ["", ...variations];

  subdomains.forEach((subdomain) => {
    modifiers.forEach((modifier) => {
      fetchPromises.push(axios.get(`https://${subdomain}.${modifier}${url}`));
    });
  });

  const output = {};

  Promise.all(fetchPromises).then((results) => {
    results.forEach((response) => {
      const { request: {host, protocol}, headers } = response;

      const allFound = expectedHeaders.some(r=> Object.keys(headers).indexOf(r) >= 0);

      if (ONLY_SHOW_FAILS) {
        if(allFound === false) {
          output[`${protocol}//${host}`] = {
            headers: Object.keys(headers)
          }
        }
      } else {
        output[`${protocol}//${host}`] = {
          'All Headers Found': allFound,
          headers: Object.keys(headers)
        }
      }
    });
  }).finally(() => {
    console.table(output);
  });

} catch (e) {
  if(e.message.indexOf(`Cannot find module './config.json'`) !== -1) {
    console.log('Error: Cannot find a config.json file in the script directory.');
  } else {
    console.log(e);
  }
}
