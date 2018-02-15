// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-mocha-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        files: [		
            // Include a Material theme in the test suite.		
            {pattern: 'node_modules/@angular/material/prebuilt-themes/indigo-pink.css', included: true, watched: true},		
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true
        },
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                // flags: [
                //     '--headless',
                //     '--disable-gpu',
                //     // Without a remote debugging port, Google Chrome exits immediately.
                //     '--remote-debugging-port=9222',
                // ],
            }
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
        ? ['mocha', 'coverage-istanbul']		
        : ['mocha', 'kjhtml'],		
        // reporter options		
        mochaReporter: {		
            output: 'autowatch'		
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        browserNoActivityTimeout: 60000,
        singleRun: false
    });
};
