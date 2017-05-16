var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require("path");

module.exports = {
    entry: {
        bundle: [
            "./src/polyfills.ts",
            "./src/demo-app/main.ts",
        ],
        sendAction: [
            "./send-action.js",
            "./send-action-test.js",
        ],
    },
    module: {
        loaders: [
            {
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
                loader: 'file-loader?name=assets/[name].[hash].[ext]',
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            }, {
                loaders: ["exports-loader?module.exports.toString()", "css-loader?sourceMap", "sass-loader?sourceMap"],
                test: /\.scss$/,
            },
        ],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            "./src",
            {}),
        new CopyWebpackPlugin([{
            from: "node_modules/monaco-editor/min/vs",
            to: "vs",
        }]),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".html"],
        modules: [path.join(__dirname, "node_modules")],
    },
};
