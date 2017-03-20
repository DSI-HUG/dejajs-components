/**
 * Created by rtrompier on 19.03.17.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

exports.config = {
    allScriptsTimeout: 20000,

    specs: [
        'accordion/accordion.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    // directConnect: true,

    baseUrl: 'http://localhost:5100/',

    framework: 'jasmine',

    // jasmineNodeOpts: {
    //     showColors: true,
    //     defaultTimeoutInterval: 30000
    // },

    beforeLaunch: function () {
        return new Promise(function(resolve){
            var compiler = webpack(require('../webpack.config.dev.js'));
            var server = new WebpackDevServer(compiler, {
                stats: 'errors-only'
            });

            server.listen(5100, 'localhost');

            compiler.plugin('done', function() {
                resolve();
            });
        });
    },

    // onPrepare: function () {
    //     browser.driver.manage().window().setSize(1280, 1024);
    // },

    useAllAngular2AppRoots: true
};
