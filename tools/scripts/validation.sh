# #!/bin/bash
# set -e # Exit with nonzero exit code if anything fails

# SOURCE_BRANCH="master"

# # Pull requests and commits to other branches shouldn't try to deploy, just build to verify
# if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
#     echo "Skipping deploy; just doing a build."
#     exit 0
# fi

# # Clean
# rm -rf dist-prod
# rm -rf docs

# # Run our compile script and deploy dist directory into th GH-PAGES branch
# demo="yarn run build:prod && node_modules/.bin/gh-pages -d dist-demo --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-components.git"
# # Run our compile script and deploy docs directory into th GH-PAGES branch
# docs="yarn run docs:build && node_modules/.bin/gh-pages -d docs --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-doc.git"
# # Deploy dist directory into th GH-PAGES branch
# test="node_modules/.bin/gh-pages -d coverage --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-test.git"

# command="node_modules/.bin/concurrently \"$demo\" \"$docs\" \"$test\""


set -e

license="yarn run licensecheck"
lint="yarn run lint"
test="yarn run test"
e2e="yarn run e2e"
lib="yarn run build:lib"

node_modules/.bin/concurrently -p "[{name}]" -n "license,lint,test,e2e,build:lib" "$license" "$lint" "$test" "$e2e" "$lib"