var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var commonConfig = require("./webpack.config.common.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

var NODE_MODULES = path.join(__dirname, "node_modules");
var COMPONENTS = path.join(__dirname, 'src', 'component');
var COMMON = path.join(__dirname, 'src', 'common');
var DEMOAPP = path.join(__dirname, 'src', 'demo-app');
var RXJS = path.join(NODE_MODULES, 'rxjs');
var ZONEJS = path.join(NODE_MODULES, 'zone.js');
var ANGULAR = path.join(NODE_MODULES, '@angular');

function isDejaDependency(modulePath) {
    return modulePath.startsWith(RXJS) || modulePath.startsWith(ZONEJS) || modulePath.startsWith(ANGULAR);
}

function checkIfModuleIsDejaDependency(module) {
    return !!(module.userRequest && isDejaDependency(module.userRequest));
}

function checkIfModuleIsNodeModuleButNotDejaDepenedency(module) {
    return !!(module.userRequest && module.userRequest.startsWith(NODE_MODULES) && !isDejaDependency(module.userRequest));
}

module.exports = webpackMerge(commonConfig, {
    devServer: {
        historyApiFallback: true,
        stats: "minimal",
    },
    devtool: "source-map",
    output: {
        chunkFilename: "[id].chunk.js",
        filename: "[name].js",
        path: "/dist",
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.ejs",
            baseUrl: '/',
            title: 'DEJA-JS Demo App',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bundle'],
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'known-vendors',
            minChunks: checkIfModuleIsDejaDependency,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'unknown-vendors',
            minChunks: checkIfModuleIsNodeModuleButNotDejaDepenedency,
        }),
    ],
});
