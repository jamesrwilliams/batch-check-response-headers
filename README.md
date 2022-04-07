# Batch check response headers

A quick Node.JS way to batch check for specific response headers for a series of URLs.

## Usage

- Create a config based on `config.example.json` called `config.json`,
- Add your subdomains, variations and expected headers as detailed below,
- Run `node app.js`
- Results will be showing in the command line.

## Example

Take the following `config.json` as an example:

```json
{
  "options": {
    "show_only_failures": true
  },
  "url": "example.com",
  "subdomains": [
    "bar",
    "foo"
  ],
  "variations": [
    "qa.", "uat."
  ],
  "expectedHeaders": [
    "permissions-policy"
  ]
}
```

This will result in the following URLs being checked to ensure they have set a 
`permissions-policy` header in the response:

- `https://foo.example.com`
- `https://foo.qa.example.com`
- `https://foo.uat.example.com`
- `https://bar.example.com`
- `https://bar.qa.example.com`
- `https://bar.uat.example.com`

The modifiers are used to add additional middle subdomains to each subdomain provided in the 
`config.json`.

## Config Properties

| Property          | Type     | Description                     | Example                  |
|-------------------|----------|---------------------------------|--------------------------|
| `url`             | String   | The base URL for the subdomains | `example.com`            |
| `subdomains`      | String[] |                                 | `["foo", "bar"]`         |
| `modifiers`       | String[] |                                 | `["qa", "uat"]`          |
| `expectedHeaders` | String[] |                                 | `["permissions-policy"]` |
| `options`         | Object   | See Options below               | `{}`                     |

### Options

| Option               | Type    | Default | Description |
|----------------------|---------|---------|-------------|
| `show_only_failures` | Boolean | `True`  |             |
