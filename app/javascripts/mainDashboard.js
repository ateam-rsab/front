$(document).ready(function() {
    var UrlDataConfig = "data/GetRequireConfig";

    $.getJSON(UrlDataConfig, function() {})
        .done(function(data) {
            var pathConfig = {};

            //looping data dari server
            for (var i = 0; i < data.path.length; i++) {
                pathConfig[data.path[i].nameDep] = window.root + data.path[i].urlDep
                    // console.log(data.path[i].nameDep + " : " + window.root + data.path[i].urlDep)
            }
            //set config untuk require
            var config = {
                urlArgs: "bust=" + (new Date()).getTime(),
                baseUrl: '/',
                waitSeconds: 30,
                paths: pathConfig, //data pathconfig dapet dari server
                deps: ['main']

            }


            //set reuqire config dari daa server
            require.config(config);
            //init awal app
            require(['initialize'],
                function(initialize) {
                    'use strict';
                    if (window.valid === undefined)
                        angular.bootstrap(document, ['myApp']);
                    window.valid = true;
                    window.location = "#/Dashboard";
                }
            );
        })
        .fail(function(jqxhr, textStatus, error) {
            console.log("Request Failed: " + error);
        });
})