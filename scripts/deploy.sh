set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

# Run our compile script and deploy demo directory into the GH-PAGES branch
npm run build
rm -rf node_modules/gh-pages/.cache
node_modules/.bin/gh-pages -d dist/demo --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-components.git

# Deploy doc directory into the GH-PAGES branch
rm -rf node_modules/gh-pages/.cache
node_modules/.bin/gh-pages -d doc --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-doc.git

# Deploy coverage directory into the GH-PAGES branch
rm -rf node_modules/gh-pages/.cache
node_modules/.bin/gh-pages -d coverage/html --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-test.git
