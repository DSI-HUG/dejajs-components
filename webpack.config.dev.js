var webpackMerge = require("webpack-merge");
var commonConfig = require("./webpack.config.common.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = webpackMerge(commonConfig, {
    devServer: {
        historyApiFallback: true,
        stats: "minimal",
    },
    devtool: "cheap-eval-source-map",
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
        })
    ]
});
