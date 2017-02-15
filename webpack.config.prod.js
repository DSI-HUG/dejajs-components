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
    ],
});
