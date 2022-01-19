const fs = require('fs');

fs.writeFileSync('.npmrc', `@deja-js:registry=https://registry.npmjs.org/:_authToken=${process.env.NODE_AUTH_TOKEN}`);
