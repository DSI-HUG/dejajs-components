var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var commonConfig = require("./webpack.config.common.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = webpackMerge.smart(commonConfig, {
    entry: {
        "app": "./demo-app/main.ts",
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
            template: "demo-app/index.ejs",
            baseUrl: 'https://dsi-hug.github.io/dejajs-components/',
            title: 'DEJA-JS Demo App',
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["./demo-app/main.ts", "./src/polyfills.ts"],
        }),
    ],
});
