define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RedirectPageCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper',

    function($rootScope, $scope, ModelItem, $state, dateHelper) { 

        let init = () => {
            // http://0.0.0.0:3333/#/login
            let data = document.cookie.split(';')
            console.log(document.cookie.split(';'));
            setTimeout(()=> {
                window.location.replace('http://172.16.99.55:3333/#/redirect-login?data=' + data[0]);
            }, 5000)
            
        }
        init();
    }
    ]);
});