#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy Doc on Github Pages; just doing a build."
    exit 0
fi

# Clean dist existing contents
rm -rf docs

# Run our compile script
yarn run docs:build

# Deploy dist directory into th GH-PAGES branch
node_modules/.bin/gh-pages -d docs --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-doc.git