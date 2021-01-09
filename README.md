[![npm version](https://badge.fury.io/js/%40deja-js%2Fcomponent.svg)](https://www.npmjs.com/package/@deja-js/component)
[![travis build](https://travis-ci.com/DSI-HUG/dejajs-components.svg?branch=master)](https://travis-ci.com/DSI-HUG/dejajs-components)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![codebeat badge](https://codebeat.co/badges/84883b64-dd1f-4c76-9ed0-e12cda09f3fb)](https://codebeat.co/projects/github-com-dsi-hug-dejajs-components-develop)

# @deja-js/component
This is the home for the Hôpitaux Universitaires de Genève - DSI - Domaine Patient team's Angular components for Angular and material. 

Online demo : [https://dsi-hug.github.io/dejajs-components](https://dsi-hug.github.io/dejajs-components)

## Intro

This repository is an Angular components library and the common utility functions, with a demo application for testing it.

### Requirements

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2. [Yarn][]: (Optional) We use Yarn to manage Node dependencies.
   Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

### Getting started 

Begin by cloning the repository.

After cloning, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

`yarn` or `npm i` 

Take a look at the `project` folder. All components are placed here. 
The demo application is under `src` folder.


## Running demo app 

`yarn start` or `npm start`

and navigate to `http://localhost:5100`.

## Build

To build the library you can use the command `npm run build:lib`

A `dist/` folder will be created in the root directory for the library.

## Test

Just run `npm run test:lib` to launch tests.

## Contributing

Contributions are welcome! To ensure speedy merges, please:

- base any pull requests on the develop branch.
- ensure that the code passes TSLint validation with the included ruleset.
