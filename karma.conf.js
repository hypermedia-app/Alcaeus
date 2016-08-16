module.exports = function (config) {
    if (process.env.TRAVIS && (!process.env.BROWSER_STACK_USERNAME || !process.env.BROWSER_STACK_ACCESS_KEY)) {
        console.log('Make sure the BROWSER_STACK_USERNAME and BROWSER_STACK_ACCESS_KEY environment variables are set.');
        process.exit(1);
    }

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['systemjs', 'jasmine'],

        //plugins
        plugins: process.env.TRAVIS
            ? ['karma-systemjs', 'karma-jasmine', 'karma-browserstack-launcher']
            : ['karma-systemjs', 'karma-jasmine', 'karma-chrome-launcher'],


        // list of files / patterns to load in the browser
        files: [
            'tests/*-spec.ts',
            'tests/*-specs.ts'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        browserStack: {
            username: process.env.BROWSERSTACK_USERNAME,
            accessKey: process.env.BROWSERSTACK_KEY
        },

        // define browsers
        customLaunchers: getCustomLaunchers(),

        browsers: process.env.TRAVIS
            ? Object.keys(getCustomLaunchers()).filter(function(key) { return !key.startsWith('add'); })
            : ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: process.env.TRAVIS ? true : false,

        systemjs: {
            configFile: 'config.js',
            serveFiles: [
                'src/**/*.ts',
                'tests/**/*.ts',
                'jspm_packages/**/*',
                'node_modules/**/*'
            ]
        }
    });

    function getCustomLaunchers() {
        return Object.assign(
            getLaunchers('firefox')('6.0', '33', '34', '38', '39')('Windows', '8.1'),
            getLaunchers('chrome')('36', '42', '43', '44', '45')('Windows', '8'),
            getLaunchers('internet explorer')('9', '10', '11')('Windows', '7'),
            getLaunchers('safari')('8')('OS X', 'Yosemite'),
            getLaunchers('safari')('7.1')('OS X', 'Mavericks'),
            getLaunchers('safari')('9.1')('OS X', 'El Capitan'),
            getLatest('firefox')('Windows', '8.1'),
            getLatest('chrome')('Windows', '7'),
            getLatest('internet explorer')('Windows', '8.1'),
            getLatest('edge')('Windows', '10')
        );
    }

    function getLaunchers(browser) {
        return function() {
            var browser_versions = Array.from(arguments);

            return function(os, os_version) {
                var launchers = {};

                browser_versions.forEach(function(browser_version) {
                    launchers[browser + '_' + os + '_' + os_version] = {
                        base: 'BrowserStack',
                        browser: browser,
                        browser_version: browser_version,
                        os: os,
                        os_version: os_version
                    };
                });

                return launchers;
            }
        }
    }

    function getLatest(browser) {
        return function(os, os_version) {
            var launcher = {};

            launcher[browser + '_' + os + '_' + os_version] = {
                base: 'BrowserStack',
                browser: browser,
                os: os,
                os_version: os_version
            };

            return launcher;
        }
    }
};