const webpackConfig = require("./webpack.config");
const webpack = require('webpack');

delete webpackConfig.entry;
webpackConfig.bail = false;
webpackConfig.stats = 'errors-only';
webpackConfig.plugins = [];
webpackConfig.plugins.push(new webpack.SourceMapDevToolPlugin({
  filename: null,
  test: /\.(ts|js)($|\?)/i
}));
/*webpackConfig.module.rules.push({
  enforce: 'post',
  test: /\.ts$/,
  include: path.resolve(__dirname, 'src'),
  exclude: path.resolve(__dirname, 'src/test'),
  loader: 'istanbul-instrumenter-loader',
  options: {
    esModules: true
  }
});*/

module.exports = function (config) {
    if (process.env.TRAVIS && (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY)) {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
        process.exit(1);
    }

    var customLaunchers = {
        sl_chrome_42: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7',
            version: '42'
        },
        sl_chrome_latest: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7'
        },
        sl_firefox_39: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '39.0'
        },
        sl_safari_9: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: '9.0'
        },
        sl_safari_8: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.10',
            version: '8.0'
        },
        sl_ie_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        },
        sl_edge_13: {
            base: 'SauceLabs',
            browserName: 'MicrosoftEdge',
            platform: 'Windows 10',
            version: '13.10586'
        },
        sl_edge_14: {
            base: 'SauceLabs',
            browserName: 'MicrosoftEdge',
            platform: 'Windows 10',
            version: '14.14393'
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
            'tests/*-spec.ts',
            'tests/*-specs.ts'
        ],

        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "tests/**/*.ts": ["webpack"],
            "src/**/*.ts": ["webpack"]
        },

        mime: { 'text/x-typescript': ['ts','tsx'] },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: process.env.TRAVIS ? ['dots', 'saucelabs'] : ['progress'],


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
            ? Object.keys(customLaunchers)
            : ['Chrome'],

        singleRun: !!process.env.TRAVIS,

        concurrency: 3,

        webpack: webpackConfig
    });
};