var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require("path");

module.exports = {
    entry: {
        bundle: [
            "./node_modules/@angular/material/core/theming/prebuilt/deeppurple-amber.css",
            "./src/scss",
            "./src/polyfills.ts",
            "./src/demo-app/main.ts",
        ],
    },
    module: {
        loaders: [{
            loaders: [
                "awesome-typescript-loader",
                "angular2-template-loader",
                "angular2-router-loader",
            ],
            test: /\.ts$/,
        }, {
            loader: "html-loader",
            query: {
                minimize: false,
            },
            test: /\.html$/,
        }, {
            loader: "file-loader?name=assets/[name].[hash].[ext]",
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        }, {
            include: [
                path.resolve("./node_modules/@angular/material/core/theming/prebuilt"),
                path.resolve("./src/scss"),
            ],
            loaders: ["style-loader", "css-loader", "resolve-url-loader"],
            test: /\.css$/,
        }, {
            loaders: ["exports-loader?module.exports.toString()", "css-loader?sourceMap", "sass-loader?sourceMap"],
            test: /\.scss$/,
        }, {
            loader: "url-loader?limit=100000",
            test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        }],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            "./src"),
        new CopyWebpackPlugin([{
            from: "node_modules/monaco-editor/min/vs",
            to: "vs",
        }]),
        new webpack.ProvidePlugin({ X2JS: "x2js" }),
    ],
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".css", ".html"],
    },
};
