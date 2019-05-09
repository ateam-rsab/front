
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'RegistrasiPasienBaruCtrl': window.root + 'javascripts/Controllers/RegistrasiPasienBaruCtrl',
        'RegistrasiPasienLamaCtrl': window.root + 'javascripts/Controllers/RegistrasiPasienLamaCtrl',
        'RegistrasiPasienMobileCtrl': window.root + 'javascripts/Controllers/RegistrasiPasienMobileCtrl',
        'PasienBaruCtrl': window.root + 'javascripts/Controllers/PasienBaruCtrl',
        'RuanganCtrl': window.root + 'javascripts/Controllers/RuanganCtrl',
        'JenisPasienCtrl': window.root + 'javascripts/Controllers/JenisPasienCtrl',
        'PasienVerifikasiCtrl': window.root + 'javascripts/Controllers/PasienVerifikasiCtrl',
        'CompleteCtrl': window.root + 'javascripts/Controllers/CompleteCtrl',
        'Service': window.root + 'javascripts/Services/Service',
        'StateService': window.root + 'javascripts/Services/State',
        'PatientService': window.root + 'javascripts/Model/pasien',
        'WelcomeCtrl': window.root + 'javascripts/Controllers/WelcomeCtrl',
        'CheckReservationCtrl': window.root + 'javascripts/Controllers/CheckReservationCtrl',
        //'angular_ocLazyLoad': 'javascripts/ocLazyLoad.min',
        'angular': window.root + 'javascripts/angular.min',
        'routing': window.root + 'javascripts/routing',
        'config': window.root + 'javascripts/config',
        'jQuery': window.root + 'javascripts/jquery.min',
        'main': window.root + 'main',

    },
    shim: {
        //'angular_ocLazyLoad': {
        //    deps: ['angular']
        //},
        'main': {
            //deps:
            //    [
            //     'angular_ocLazyLoad'
            //    ]
        },
        'RegistrasiPasienBaruCtrl': {
            deps: ['main']
        },
        'RegistrasiPasienLamaCtrl': {
            deps: ['main']
        },

    },
    deps: ['main']
});
require(['javascripts/module'],
    function (module) {
        
        'use strict';
        angular.bootstrap(document, ['myApp']);
    }
);;