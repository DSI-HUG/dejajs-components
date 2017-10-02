#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy Test coverage on Github Pages; just doing a build."
    exit 0
fi

# Deploy dist directory into th GH-PAGES branch
node_modules/.bin/gh-pages -d coverage --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-test.git