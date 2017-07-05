[![npm version](https://badge.fury.io/js/%40deja-js%2Fcomponent.svg)](https://www.npmjs.com/package/@deja-js/component)
[![travis build](https://travis-ci.org/DSI-HUG/dejajs-components.svg?branch=master)](https://travis-ci.org/DSI-HUG/dejajs-components)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

# @deja-js/component
This is the home for the Hôpitaux Universitaires de Genève - DSI - Domaine Patient team's Angular2 components for Angular 2 and material. 

Online demo : [https://dsi-hug.github.io/dejajs-components](https://dsi-hug.github.io/dejajs-components)

## Intro

This repository is a Angular2 components library and the the common utility functions, with a demo application to testing it.

### Requirement

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2. [Yarn][]: We use Yarn to manage Node dependencies.
   Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

### Getting started 

Begin by cloning the repository.

After cloning, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

`yarn install`

Take a look at the `src` folder. All components and demo application are placed here. 


## Running demo app 

`yarn start`

and navigate to `http://localhost:5100`.


## Feature status and browsers compatibility:

| Feature            | Working OnPush | Required / Disabled | Chrome 56 | Edge | IE11 | FF51 | Opera Neon | Readme and Demo | Note           |
|--------------------|----------------|---------------------|-----------|------|------|------|------------|-----------------|----------------|
| Accordion          |             yes|                  N/A|        yes|   yes|   yes|   yes|         yes|        available|                |
| Auto-Size TextArea |             yes|                  N/A|        yes|   yes|   yes|   yes|         yes|<span style="color:red">@todo</span>| |
| Circular Picker    |             yes|                @todo|yes|yes|yes|yes|yes|available| |
| Color Selector     |             yes|                  yes|yes|yes|yes|yes|yes|available| |
| Color Picker       |             yes|                  yes|yes|yes|yes|yes|yes|available| |
| Content Editable   |             yes|                  yes|yes|yes|yes|yes|yes|available|New line issue on IE11. IE11 add p instead br |
| Date Selector      |             yes|                @todo|yes|yes|yes|yes|yes|available| |
| Date Picker        |             yes|                @todo|yes|yes|yes|yes|yes|available| |
| Dialog             |             yes|                  N/A|yes|yes|yes|yes|yes|Message Box| |
| Events             |             yes|                  N/A|yes|yes|yes|yes|yes|<span style="color:red">@todo</span>| |
| Grid               |             yes|                  N/A|yes|yes|yes|yes|yes|available| |
| Dropdown Control   |             yes|                  N/A|yes|yes|yes|yes|yes|Color Picker| |
| Menu               |             yes|                  N/A|yes|yes|yes|yes|yes|<span style="color:red">@todo</span>| |
| Message Box        |             yes|                  N/A|yes|yes|yes|yes|yes|available| |
| Monaco Editor      |             yes|                  N/A|yes|yes|yes|yes|yes|available| |
| Range              |             yes|                  yes|yes|yes|yes|yes|yes|available| |
| Select             |             yes|                  yes|yes|yes|yes|yes|yes|available|Place Holder placement in FF, Edge and IE11 |
| Snackbar           |             yes|                  N/A|yes|yes|yes|yes|yes|available| |
| Splitter           |             yes|                  N/A|yes|yes|yes|yes|yes|available| |
| Tiles              |             yes|                  N/A|yes|yes|yes|yes|yes|<span style="color:red">@todo</span>| |
| Tooltip            |             yes|                  N/A|yes|yes|yes|yes|yes|Message Box| |
| Treelist           |             yes|                  yes|yes|yes|yes|yes|yes|available| |
| Viewport           |             yes|                  N/A|yes|yes|yes|yes|yes|yes| |
