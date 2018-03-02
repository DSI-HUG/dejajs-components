set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

# Clean
rm -rf dist-prod
rm -rf doc

# Run our compile script and deploy dist directory into th GH-PAGES branch
demo="gulp build:demo && node_modules/.bin/gh-pages -d demo/dist --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-components.git > demo.log"
# Run our compile script and deploy doc directory into th GH-PAGES branch
doc="gulp build:doc && node_modules/.bin/gh-pages -d doc --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-doc.git > doc.log"
# Deploy dist directory into th GH-PAGES branch
test="node_modules/.bin/gh-pages -d coverage --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-test.git > coverage.log"

node_modules/.bin/concurrently -p "[{name}]" -n "demo,doc,test" "$demo" "$doc" "$test"

cat demo.log && rm demo.log
cat doc.log && rm doc.log
cat coverage.log && rm coverage.log