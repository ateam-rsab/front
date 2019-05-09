define(['routing', 'Helper'], function(routing, helper) {
    'use strict';
    var stateProvider = undefined;

    function config($stateProvider, $urlRouterProvider, $controllerProvider, $provide, $httpProvider) {
        window.registerController = $controllerProvider.register;
        window.$register = $provide;
        stateProvider = $stateProvider;
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        $provide.factory('myHttpInterceptor', function($q) {
            return {
                // optional method
                'request': function(config) {
                    // do something on success
                    return config;
                },

                // optional method
                'requestError': function(rejection) {


                    // do something on error
                    return $q.reject(rejection);
                },



                // optional method
                'response': function(response) {

                    // do something on success
                    return response;
                },

                // optional method
                'responseError': function(rejection) {
                    // do something on error
                    return $q.reject(rejection);
                }
            };
        });

        $httpProvider.interceptors.push('myHttpInterceptor');
        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        var obj = JSON.parse(window.localStorage.getItem('urlBind'));
        var list = [];
        for (var i in obj) {
            var arr = _.where(list, {
                name: obj[i].name
            });
            if (arr.length === 0)
                if (obj[i].name !== undefined) {
                    if (obj[i].name === 'DaftarPasienPulang') {
                        console.log(obj[i].name)
                    }
                    $stateProvider.state(obj[i].name, {
                        url: obj[i].url,
                        templateUrl: window.root + obj[i].templateurl,
                        controller: obj[i].controller,
                        deps: obj[i].deps,
                        resolve: routing
                    });
                    list.push({
                        name: obj[i].name
                    });
                }
        }

        helper.getRouting(false);

        /*$.getJSON(conf.RouteUrl, function() {})
            .done(function(data) {
                window.localStorage.setItem('urlBind', JSON.stringify(data));
            })
            .fail(function(jqxhr, textStatus, error) {
                console.log("Request Failed: " + error);
            });*/


        // catch all route
        // send users to the form page 
        $urlRouterProvider.otherwise('/home');
        // if (window.hasRouting === undefined) {
        //     if (window.location.hash === '' || window.location.hash === '#/home') return; //
        //     var temp = window.location.hash;
        //     window.location = "#/home";
        //     setTimeout(function() {
        //         window.location = temp;
        //     }, 200);
        //     window.hasRouting = "";
        // }
    }
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$provide', '$httpProvider'];
    return {
        method: config,
        state: stateProvider
    };
});