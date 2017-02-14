var webpackMerge = require("webpack-merge");
var commonConfig = require("./webpack.config.common.js");

module.exports = webpackMerge(commonConfig, {
    devServer: {
        historyApiFallback: true,
        stats: "minimal",
    },
    devtool: "cheap-module-eval-source-map",
    output: {
        chunkFilename: "[id].chunk.js",
        filename: "[name].js",
        path: "/dist",
        publicPath: "/",
    },
});
