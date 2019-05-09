// Karma configuration
// Generated on Sat May 14 2016 13:38:56 GMT+0700 (SE Asia Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'
    , 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      //Common
      // 'app/javascripts/require.js.',
      'app/javascripts/angular.min.js',
      'app/javascripts/angular-resource.js',
      'app/javascripts/angular-route.min.js',
      'app/javascripts/jquery.min.js',
      'app/javascripts/jquery-mask.js',
      'app/javascripts/ngMask.js',
      'app/javascripts/mask.js',

      'app/javascripts/kendo.all.min.js',
      'app/javascripts/kendo.angular.min.js',
      'app/javascripts/ocLazyLoad.js',
      'app/javascripts/underscrote-min.js',


      //'node_modules/karma-requirejs/lib/adapter.js',

      'bower_components/angular-mocks/angular-mocks.js', {
        pattern: 'app/module/**/*.js',
        included: false
      }, {
        pattern: 'app/javascripts/**/*.js',
        included: false
      },
      // { pattern:'app/javascripts/directive/**/*.js', included: false },
      // { pattern:'app/javascripts/model/**/*.js', included: false },
      // { pattern:'app/javascripts/Services/**/*.js', included: false },
      // 'app/javascripts/config.js',
      //  'app/javascripts/routing.js',
      'app/javascripts/Controller.js',
      'app/javascripts/Services/LoginService.js',
      'app/javascripts/Services/HeaderService.js',
      'app/javascripts/Services/HttpService.js',
      // 'app/javascripts/Core.js',
      // 'app/javascripts/initialize.js',


      'unit_test/**/*.js',
      'test-main.js'
    ],


    // list of files to exclude
    exclude: [
      // 'app/javascripts/main.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    //    plugins : ['karma-jasmine','karma-requirejs','karma-mocha-reporter'],
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  })
}