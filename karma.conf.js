// Karma configuration
// Generated on Sun Apr 10 2016 12:06:14 GMT+0200 (Central European Daylight Time)

module.exports = function (config) {
    if (process.env.TRAVIS && (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY)) {
        console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
        process.exit(1);
    }

    var customLaunchers = new CustomLaunchers();

    customLaunchers
        .addChrome('36', '42', '43', '44', '45')('Windows 8')
        .addEdge('13.10586')('Windows 10')
        .addIE('9.0', '10.0', '11.0')('Windows 7')
        .addIE('10.0')('Windows 8')
        .addIE('11.0')('Windows 8.1')
        .addSafari('7.0')('OS X 10.9')
        .addSafari('8.0')('OS X 10.10')
        .addSafari('9.0')('OS X 10.11')
        .addFirefox('6.0', '33', '34', '38', '39')('Windows 8')
        .addFirefox('6.0', '33', '34', '38', '39')();

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['systemjs', 'jasmine'],


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
        reporters: process.env.TRAVIS ? ['dots', 'saucelabs'] : ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: process.env.TRAVIS
            ? Object.keys(customLaunchers).filter(function(key) { return !key.startsWith('add'); })
            :['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: process.env.TRAVIS ? true : false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 4,


        systemjs: {
            configFile: 'config.js',
            config: {
                paths: {
                    "typescript": "node_modules/typescript/lib/typescript.js",
                    "systemjs": "node_modules/systemjs/dist/system.js",
                    'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js',
                    'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js'
                },
                packages: {
                    'tests': {
                        defaultExtension: 'ts'
                    },
                    'src': {
                        defaultExtension: 'ts'
                    }
                },
                transpiler: 'typescript'
            },
            serveFiles: [
                'src/**/*.ts',
                'tests/**/*.ts',
                'jspm_packages/**/*'
            ]
        },

        customLaunchers: JSON.parse(JSON.stringify(customLaunchers)),
        
        sauceLabs: {
            testName: 'Web App Unit Tests'
        }
    })
};

function CustomLaunchers() {
    var self = this;

    this.addChrome = addBrowser('chrome');
    this.addEdge = addBrowser('MicrosoftEdge');
    this.addOpera = addBrowser('opera');
    this.addSafari = addBrowser('safari');
    this.addFirefox = addBrowser('firefox');
    this.addIE = addBrowser('internet explorer');

    function addBrowser(browser) {
        var browserName = browser.replace(' ', '_');
        
        return function () {
            var versions = Array.from(arguments);
            return function (system) {
                var systemName = (system || 'linux').replace(' ', '_');
                
                versions.forEach(function (version) {
                    var seleniumKey = browserName + '_' + version + '_' + systemName;

                    self[seleniumKey] = {
                        base: 'SauceLabs',
                        seleniumKey: browser,
                        version: version
                    };

                    if (system) {
                        self[seleniumKey].platform = system;
                    }
                });

                self[browserName + '_latest_' + systemName] = {
                    base: 'SauceLabs',
                    seleniumKey: browser
                };

                return self;
            };
        };
    }
}
