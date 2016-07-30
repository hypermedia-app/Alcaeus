// Karma configuration
// Generated on Sun Apr 10 2016 12:06:14 GMT+0200 (Central European Daylight Time)

module.exports = function (config) {
    if (process.env.TRAVIS && (!process.env.TB_KEY || !process.env.TB_SECRET)) {
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
        .addFirefox('6.0', '33', '34', '38', '39')()
        .addLatest('chrome', 'OS X 10.11')
        .addLatest('chrome', 'Windows 8')
        .addLatest('chrome', 'linux')
        .addLatest('firefox', 'linux')
        .addLatest('firefox', 'Windows 10')
        .addLatest('firefox', 'OS X 10.11')
        .addLatest('MicrosoftEdge', 'Windows 10');

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
        reporters: process.env.TRAVIS ? ['dots'] : ['progress'],

        plugins: ['karma-systemjs', 'karma-jasmine', 'karma-browserstack-launcher'],

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
       // browsers: process.env.TRAVIS
       //     ? Object.keys(customLaunchers).filter(function(key) { return !key.startsWith('add'); })
       //     :['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: process.env.TRAVIS ? true : false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 1,


        systemjs: {
            configFile: 'config.js',
            serveFiles: [
                'src/**/*.ts',
                'tests/**/*.ts',
                'jspm_packages/**/*',
                'node_modules/**/*'
            ]
        },

        customLaunchers: {
            bs_firefox_mac: {
                base: 'BrowserStack',
                browser: 'firefox',
                browser_version: '21.0',
                os: 'OS X',
                os_version: 'Mountain Lion'
            },
            bs_iphone5: {
                base: 'BrowserStack',
                device: 'iPhone 5',
                os: 'ios',
                os_version: '6.0'
            }
        },

        browsers: ['bs_firefox_mac', 'bs_iphone5']
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
    
    this.addLatest = function(browser, system) {
        self[browser + '_latest_' + system] = {
            base: 'BrowserStack',
            browser: browser,
            platform: system
        };

        return self;
    };

    function addBrowser(browser) {        
        return function () {
            var versions = Array.from(arguments);
            return function (system) {
                
                versions.forEach(function (version) {
                    var seleniumKey = browser + '_' + version + '_' + system;

                    self[seleniumKey] = {
                        base: 'BrowserStack',
                        browser: browser,
                        browser_version: version
                    };

                    if (system) {
                        self[seleniumKey].os = system;
                    }
                });

                return self;
            };
        };
    }
}
