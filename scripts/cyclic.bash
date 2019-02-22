#!/bin/bash

set -e

cd `dirname $0`
# npm install --save-dev webpack-cyclic-dependency-checker

echo "--> Creating the statistics"
node_modules/.bin/webpack --json --config webpack.config.dev.js | grep -v "at-loader" > stats.json
node_modules/.bin/iscyclic stats.json
