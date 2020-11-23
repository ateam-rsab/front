define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RedirectPageCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper',

        function ($rootScope, $scope, ModelItem, $state, dateHelper) {
           let  getCookieName = (cookiename) => {
                // Get name followed by anything except a semicolon
                var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
                // Return everything after the equal sign, or an empty string if the cookie name not found
                return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
            }

            let init = () => {
                // http://0.0.0.0:3333/#/login
                // let data = document.cookie.split(';');
                let data = getCookieName('dataLogin');
                console.log(data);
                setTimeout(()=> {
                    window.location.replace('http://172.16.99.88:3333/#/redirect-login?data=' + data);
                }, 5000)

            }
            init();


        }
    ]);
});