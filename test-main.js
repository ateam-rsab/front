var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});
require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/',
  paths: {
    //       'Service':  'javascripts/Services/Service',
    'LoginService': 'app/javascripts/Services/LoginService',
    //       'StateService':  'javascripts/Services/State',
    'WelcomeCtrl': 'app/javascripts/Controllers/WelcomeCtrl',
    //       'angular':  'javascripts/angular.min',
    'routing': 'app/javascripts/routing',
    'config': 'app/javascripts/config',
    'initialize': 'app/javascripts/module',
    'main': 'app/javascripts/main',
    'core': 'app/javascripts/core',
    'kendoDirectives': 'app/javascripts/kendo.angular.min',
    'KendoUI': 'app/javascripts/kendo.all.min',
    'Controller': 'app/javascripts/Controller',
    'AngularRoute': 'app/javascripts/angular-route.min',
    'OcLazyLoad': 'app/javascripts/ocLazyLoad',
    'header': 'app/module/header/header_controller',
    'HeaderService': 'app/javascripts/Services/HeaderService',
    'HttpServices': 'app/javascripts/Services/HttpServices',
    'jQuery': 'app/javascripts/jquery.min',
    // {"nameDep": "HeaderService", "urlDep" : "javascripts/Services/HeaderService"},     
    'ngMask': 'app/javascripts/ngMask',
    'underscore': 'app/javascripts/underscore-min',
    'kendo.core': 'app/javascripts/Kendo/kendo.core',
    'kendo.panelbar': 'app/javascripts/Kendo/kendo.panelbar',
    'kendo.dataviz.qrcode': 'app/javascripts/Kendo/kendo.dataviz.qrcode',
    'kendo.button': 'app/javascripts/Kendo/kendo.button',
    'kendo.notification': 'app/javascripts/Kendo/kendo.notification',
    'kendo.menu': 'app/javascripts/Kendo/kendo.menu',
    'kendo.datepicker': 'app/javascripts/Kendo/kendo.datepicker',
    'kendo.combobox': 'app/javascripts/Kendo/kendo.combobox',
    'kendo.popup': 'app/javascripts/Kendo/kendo.popup',
    'kendo.calendar': 'app/javascripts/Kendo/kendo.calendar',
    'kendo.list': 'app/javascripts/Kendo/kendo.list',
    'kendo.mobile.scroller': 'app/javascripts/Kendo/kendo.mobile.scroller',
    'kendo.dataviz.core': 'app/javascripts/Kendo/kendo.dataviz.core',
    'kendo.drawing': 'app/javascripts/Kendo/kendo.drawing',
    'kendo.fx': 'app/javascripts/Kendo/kendo.fx',
    'kendo.draganddrop': 'app/javascripts/Kendo/kendo.draganddrop',
    'kendo.color': 'app/javascripts/Kendo/kendo.color',
    'kendo.userevents': 'app/javascripts/Kendo/kendo.userevents',
    'kendo.data.odata': 'app/javascripts/Kendo/kendo.data.odata',
    'kendo.data.xml': 'app/javascripts/Kendo/kendo.data.xml',
    'kendo.data': 'app/javascripts/Kendo/kendo.data',
    // 'LoginService': window.root + 'javascripts/Services/LoginService',
    // 'StateService': window.root + 'javascripts/Services/State',
    // 'angular': window.root + 'javascripts/angular.min',
    //  'jQuery': window.root + 'javascripts/jquery.min',         
  },
  waitSeconds: 5000,
  // dynamically load all test files
  deps: allTestFiles,
  shim: {
    angular: {
      exports: 'angular'
    },
    'WelcomeCtrl': {
      deps: ['initialize', 'Controller'],
      exports: 'WelcomeCtrl'
    },
    'kendoDirectives': {
      deps: ['kendoui'],
      exports: 'kendoDirectives'
    },
    'kendoui': {
      deps: ['underscore'],
      exports: 'kendoDirectives'
    }

  },
  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});