# @deja-js/core
This is the core librery for the Hôpitaux Universitaires de Genève - DSI - Domaine Patient team's Angular components for Angular and material.

## Linking the library

During development, you can link the library to an angular project.   

:warning: Be careful not to commit the following modifications !

##### Linking with distribution

`cd dist/deja-js/core`
`npm link` or `yarn link`

`cd my-angular-project`
`npm link @deja-js/core` or `yarn link @deja-js/core`   

Add the following to the **angular.json** file of my-angular-project:

```json
"architect": {
    "build": {
        "options": {
            "preserveSymlinks": true
        }
    }
}
```

##### Link with sources
##### Linking with sources

`cd projects/deja-js/core`
`npm link` or `yarn link`

`cd my-angular-project`
`npm link @deja-js/core` or `yarn link @deja-js/core`   

Add the following to the **angular.json** file of my-angular-project:

```json
"architect": {
    "build": {
        "options": {
            "preserveSymlinks": true
        }
    }
}
```

Add the following to the **tsconfig.app.json** file of my-angular-project:

```json
"include": [
    "./**/*",
    "../node_modules/@deja-js/core/**/*"
]
```