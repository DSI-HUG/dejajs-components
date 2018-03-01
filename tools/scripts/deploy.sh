set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

# Clean
rm -rf dist-prod
rm -rf docs

# Run our compile script and deploy dist directory into th GH-PAGES branch
demo="cd demo && yarn run build && node_modules/.bin/gh-pages -d dist --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-components.git > demo.log"
# Run our compile script and deploy docs directory into th GH-PAGES branch
docs="yarn run docs:build && node_modules/.bin/gh-pages -d docs --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-doc.git > docs.log"
# Deploy dist directory into th GH-PAGES branch
test="node_modules/.bin/gh-pages -d coverage --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-test.git > coverage.log"

node_modules/.bin/concurrently -p "[{name}]" -n "demo,docs,test" "$demo" "$docs" "$test"

cat demo.log && rm demo.log
cat docs.log && rm docs.log
cat coverage.log && rm coverage.log