define([],
    function() {
        var current;
        'use strict';
        return {
            loadModule: ['$ocLazyLoad', '$q', '$route', '$state', function($ocLazyLoad, $q, $route, $state) {
                // if (window.currentState !== this.url.source) {
                window.currentState = this.url.source;

                var globalToState = window.globalToState;
                //if (globalToState != null && globalToState != "") 
                {
                    var deferred = $q.defer();
                    var data = [];
                    var deps = this.self.deps;
                    for (var i in deps) {
                        data.push(deps[i].define);
                    }
                    data.push(this.self.controller);
                    window.deps = this.self.deps;;

                    require(data, function() {
                        var module = angular.module;
                        var temp = module('myApp');
                        if (window.deps !== undefined)
                            for (var i = 0; i < window.deps.length; i++) {
                                temp.requires.push(window.deps[i].module);
                            }
                        $ocLazyLoad.inject('myApp');
                        window.globalToState = "";
                        deferred.resolve();

                    });

                }
                // }
                /*
                var deferred = $q.defer();
                var arr = $route.current.$$route.controller;
                var data = [];
                
                var deps = $route.current.$$route.deps;
                for (var i in deps) {
                    data.push(deps[i].define);
                }
                data.push(arr);                
                window.deps = $route.current.$$route.deps;
                require(data, function () {
                    var module = angular.module;
                    var temp = module('myApp');
                    if (window.deps !== undefined)
                        for (var i = 0; i < window.deps.length; i++) {
                            temp.requires.push(window.deps[i].module);
                        }
                    $ocLazyLoad.inject('myApp');
                    deferred.resolve();
                });*/
                return deferred.promise;
            }]
        }
    });