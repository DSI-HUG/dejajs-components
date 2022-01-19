const fs = require('fs');

fs.writeFileSync('.npmrc',
`//registry.npmjs.org/:_authToken=${process.env.NPM_PUBLISH_TOKEN}
@deja-js:registry=https://npm.pkg.github.com/`);
