const fs = require('fs');

fs.writeFileSync('.npmrc', `@deja-js:registry=//registry.npmjs.org/:_authToken=${process.env.NPM_PUBLISH_TOKEN}`);
