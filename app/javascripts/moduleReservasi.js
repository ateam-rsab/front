define(['HttpServiceAkuntansi', 'Configuration', 'require', 'config', 'Controller', 'AngularRoute', 'OcLazyLoad', 'HttpService', 'AngularUIRouter', 'AngularAnimate', 'routing', 'AngularFilter', 'LoginService', 'core'],
    function(httpServiceAkuntansi, configuration, require, config, Controller, ngRoute, lazy, httpService, AngularUIRouter, AngularAnimate, ComponentDirective, routing, AngularFilter, LoginService, core) {
        'use strict';
        var app = angular
            .module('myApp', ['HttpServicesAkuntansi', 'ui.router', 'ngAnimate', 'ngRoute', 'oc.lazyLoad', 'HttpServices', 'ui.router', 'angular.filter', 'ngMaterial', 'LoginServices', 'core'])
            .factory('socket', function(socketFactory) {
                var myIoSocket = io.connect(configuration.urlSocket);
                var mySocket = socketFactory({
                    ioSocket: myIoSocket
                });
                return mySocket;
            })
            .config(config.method)
            .controller('Controller', Controller)
            .run(run);

        function run($rootScope, $http, $location) {
            // $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
            var temp = [];
            // track current state for active tab
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                $rootScope.currentState = toState.name;
                temp.push($location.path());
            });
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                $rootScope.changeState = toState;
                $rootScope.doneLoad = true;

            });
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                $rootScope.doneLoad = false;
            });
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, a, s, d, f, g, h) {
                debugger;
                console.error(a);
            });

            $rootScope.$watch(function() {
                return $location.path()
            }, function(newLocation, oldLocation) {
                var count = _.countBy(temp, function(e) {
                    return e === newLocation;
                })
            });
        }
        window.config = config;
        return app;
    });