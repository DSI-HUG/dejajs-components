# #!/bin/bash
set -e # Exit with nonzero exit code if anything fails

license="yarn run licensecheck > license.log"
build="yarn run build > build.log"

node_modules/.bin/concurrently -p "[{name}]" -n "license,build" "$license" "$build" > /dev/null
