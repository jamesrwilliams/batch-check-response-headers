# Batch check response headers

A quick Node.JS way to batch check for specific response headers for a series of URLs.

## Usage

- Create a config based on `config.sample.js` called `config.js`,
- Add your URLs and expected headers as detailed below,
- Run `node app.js`
- Results will be showing in the command line.

## Example

Take the following `config.js` as an example:

```json
{
  "urls": [
    "example.com"
  ],
  "expectedHeaders": [
    "permissions-policy"
  ]
}
```

This will result in the URLs being checked to ensure they have set a 
`permissions-policy` header in the response.
