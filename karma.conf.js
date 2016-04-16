// Karma configuration
// Generated on Sun Apr 10 2016 12:06:14 GMT+0200 (Central European Daylight Time)

module.exports = function (config) {
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
        reporters: ['progress'],


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
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,


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
        }
    })
};
