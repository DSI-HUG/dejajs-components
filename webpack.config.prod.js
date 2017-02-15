var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var commonConfig = require("./webpack.config.common.js");
var TypedocWebpackPlugin = require("typedoc-webpack-plugin");

module.exports = webpackMerge.smart(commonConfig, {
    entry: {
        "app": "./src/demo-app/main.ts",
    },

    module: {
        loaders: [
            {
                loaders: [
                    "awesome-typescript-loader",
                    "angular2-template-loader",
                    "angular2-router-loader?aot=false&genDir=dist/src/app",
                ],
                test: /\.ts$/,
            },
        ],
    },
    output: {
        chunkFilename: "[id].[hash].chunk.js",
        filename: "[name].[hash].js",
        path: "./dist",
        publicPath: "/dejajs-components/",
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
        name: ["./src/demo-app/main.ts", "./src/polyfills.ts"],
    }),
    new TypedocWebpackPlugin({
            "emitDecoratorMetadata": "true",
            "excludeExternals": "true",
            "excludeNotExported": "true",
            "excludePrivate": "true",
            "experimentalDecorators": "true",
            "externalPattern": "node_modules",
            "ignoreCompilerErrors": "true",
            "logger": "none",
            "mode": "modules",
            "module": "commonjs",
            "out": "./docs",
            "preserveConstEnums": "true",
            "stripInternal": "true",
            "suppressExcessPropertyErrors": "true",
            "suppressImplicitAnyIndexErrors": "true",
            "target": "ES5",
            "theme": "default",
    },
     ["./src/common/app/",
      "./src/common/core/annotations",
      "./src/common/core/cloning",
      "./src/common/core/graphics",
      "./src/common/core/pipes",
      "./src/common/core/sorting",
      "./src/common/core/style",
      "./src/common/core/validation",
      "./src/common/external-service/",
      "./src/common/global-event/",
      "./src/common/lang/",
      "./src/common/loader/",
      "./src/common/util/",
      "./src/component/",
      ]),
    ],
});
