module.exports = function (config) {
    if (process.env.TRAVIS && (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY)) {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
        process.exit(1);
    }

    var customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox'
        },
        sl_safari: {
            base: 'SauceLabs',
            browserName: 'iphone',
            platform: 'OS X 10.9'
        },
        sl_ie: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1'
        },
        sl_edge: {
            base: 'SauceLabs',
            browserName: 'MicrosoftEdge',
            platform: 'Windows 10'
        }
    };

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['systemjs', 'jasmine'],

        //plugins
        plugins: process.env.TRAVIS
            ? ['karma-systemjs', 'karma-jasmine', 'karma-sauce-launcher']
            : ['karma-systemjs', 'karma-jasmine', 'karma-chrome-launcher'],


        // list of files / patterns to load in the browser
        files: [
            'tests/*-spec.js',
            'tests/*-specs.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


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

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: process.env.TRAVIS ? true : false,

        concurrency: 2,

        systemjs: {
            configFile: 'config.js',
            serveFiles: [
                'src/**/*',
                'tests/**/*',
                'jspm_packages/**/*',
                'node_modules/**/*'
            ]
        }
    });
};