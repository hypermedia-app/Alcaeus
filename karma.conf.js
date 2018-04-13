const webpackConfig = require("./webpack.config");
const webpack = require('webpack');

delete webpackConfig.externals;
delete webpackConfig.entry;
webpackConfig.bail = false;
webpackConfig.stats = 'errors-only';
webpackConfig.plugins = [];
webpackConfig.plugins.push(new webpack.SourceMapDevToolPlugin({
  filename: null,
  test: /\.(ts|js)($|\?)/i
}));

module.exports = function (config) {
    if (process.env.TRAVIS && (!process.env.BROWSER_STACK_USERNAME || !process.env.BROWSER_STACK_ACCESS_KEY)) {
        console.log('Make sure the BROWSER_STACK_* environment variables are set.');
        process.exit(1);
    }

    const customLaunchers = {
        sl_chrome_42: {
            base: 'BrowserStack',
            browser: 'chrome',
            os: 'Windows',
            os_version: '10',
            browser_version: '42'
        },
        sl_chrome_latest: {
            base: 'BrowserStack',
            browser: 'chrome',
            platform: 'Windows 7',
            os: 'Windows',
            os_version: '10'
        },
        sl_firefox_39: {
            base: 'BrowserStack',
            browser: 'firefox',
            browser_version: '39.0',
            os: 'Windows',
            os_version: '8.1'
        },
        sl_firefox_latest: {
            base: 'BrowserStack',
            browser: 'firefox',
            os: 'OS X',
            os_version: 'Mountain Lion'
        },
        sl_safari_9: {
            base: 'BrowserStack',
            browser: 'safari',
            browser_version: '9.1',
            os: 'OS X',
            os_version: 'El Capitan'
        },
        sl_safari_8: {
            base: 'BrowserStack',
            browser: 'safari',
            os: 'OS X',
            os_version: 'Yosemite',
            browser_version: '8.0'
        },
        sl_safari_10: {
            base: 'BrowserStack',
            browser: 'safari',
            os: 'OS X',
            os_version: 'Sierra',
            browser_version: '10.1'
        },
        sl_safari_latest: {
            base: 'BrowserStack',
            browser: 'safari',
            os: 'OS X',
            os_version: 'High Sierra'
        },
        sl_ie_11: {
            base: 'BrowserStack',
            browser: 'IE',
            os: 'Windows',
            os_version: '8.1',
            browser_version: '11.0'
        },
        sl_edge_14: {
            base: 'BrowserStack',
            browser: 'Edge',
            os: 'Windows',
            os_version: '10',
            browser_version: '14.0'
        },
        sl_edge_15: {
            base: 'BrowserStack',
            browser: 'Edge',
            os: 'Windows',
            os_version: '10',
            browser_version: '15.0'
        },
        sl_edge_latest: {
            base: 'BrowserStack',
            browser: 'Edge',
            os: 'Windows',
            os_version: '10'
        }
    };

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'tests/**/*-spec.ts'
        ],

        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "tests/**/*.ts": ["webpack", "sourcemap"],
            "src/**/*.ts": ["webpack", "sourcemap" ]
        },

        mime: { 'text/x-typescript': ['ts'] },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: process.env.TRAVIS ? ['dots', 'summary', 'saucelabs'] : ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // define browsers
        customLaunchers: customLaunchers,

        browsers: process.env.TRAVIS
            ? ['sl_chrome_latest', 'sl_safari_latest', 'sl_firefox_latest', 'sl_edge_latest']
            : ['Chrome'],

        singleRun: true,

        concurrency: process.env.TRAVIS ? 1 : 2,

        webpack: webpackConfig,

        // to avoid DISCONNECTED messages when connecting to BrowserStack
        browserDisconnectTimeout : 10000, // default 2000
        browserDisconnectTolerance : 1, // default 0
        browserNoActivityTimeout : 4*60*1000, //default 10000
        captureTimeout : 4*60*1000 //default 60000
    });
};
