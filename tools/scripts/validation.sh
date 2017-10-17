# #!/bin/bash
set -e # Exit with nonzero exit code if anything fails

license="yarn run licensecheck > license.log"
lint="yarn run lint > lint.log"
test="yarn run test > test.log"
e2e="yarn run e2e > e2e.log"
lib="yarn run build:lib > lib.log"

node_modules/.bin/concurrently -p "[{name}]" -n "license,lint,test,e2e,build:lib" "$license" "$lint" "$test" "$e2e" "$lib" > /dev/null
