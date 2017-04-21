var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var commonConfig = require("./webpack.config.common.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

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
        path: path.join(__dirname, "dist"),
        publicPath: "/dejajs-components/",
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.ejs",
            baseUrl: 'https://dsi-hug.github.io/dejajs-components/',
            title: 'DEJA-JS Demo App',
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["./src/demo-app/main.ts", "./src/polyfills.ts"],
        }),
    ],
});
