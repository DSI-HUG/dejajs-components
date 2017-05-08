#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

#Install Plugin GH-PAGES
yarn global add gh-pages

# Clean dist existing contents
rm -rf dist

# Run our compile script
npm run build:prod

# Deploy dist directory into th GH-PAGES branch
gh-pages -d dist --repo https://rtrompier:${GITHUB_TOKEN}@github.com/DSI-HUG/dejajs-components.git