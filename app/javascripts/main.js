$(document).ready(function() {
    var UrlDataConfig = "data/GetRequireConfig";
    var UrlDataConfigAkuntansi = "data/GetRequireConfigAkuntansi";
    var UrlDataConfigSDM = "data/GetRequireConfigSDM";
    var UrlDataConfigHelper = "data/GetRequireConfigHelper";


    var dataConfigPelayanan, dataConfigAkuntansi, dataConfigHelper, dataConfigSDM;
    //ambil data require file dari masing masing module
    $.when(
        $.getJSON(UrlDataConfig, function(data) {
            dataConfigPelayanan = data;
        }),
        $.getJSON(UrlDataConfigAkuntansi, function(data) {
            dataConfigAkuntansi = data;
        }),
        $.getJSON(UrlDataConfigSDM, function(data) {
            dataConfigSDM = data;
        }),
        $.getJSON(UrlDataConfigHelper, function(data) {
            dataConfigHelper = data;
        })
    ).then(function() {
        var msgError = "";
        var arrDataConfig = [dataConfigPelayanan, dataConfigAkuntansi, dataConfigHelper, dataConfigSDM];
        var dataConfig = [];


        for (var i = 0; i < arrDataConfig.length; i++) {
            isValid(arrDataConfig[i], msgError);
            for (var k = 0; k < arrDataConfig[i].path.length; k++) {
                dataConfig.push(arrDataConfig[i].path[k]);
            }
        }

        if (msgError == "") {
            var pathConfig = {};

            //looping data dari server
            for (var i = 0; i < dataConfig.length; i++) {
                pathConfig[dataConfig[i].nameDep] = window.root + dataConfig[i].urlDep
                    // console.log(data.path[i].nameDep + " : " + window.root + data.path[i].urlDep)
            }
            //set config untuk require
            var config = {
                //urlArgs: "bust=" + (new Date()).getTime(),
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
                }
            );
        }
    });
});

function isValid(data, msg) {
    if (data != undefined) {
        if (!(data.path.length > 0)) {
            msg += "data di path kosong. ";
        }
    }
}