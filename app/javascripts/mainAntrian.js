$(document).ready(function() {
    var UrlDataConfig = "data/GetRequireConfig";
    var UrlDataConfigAkuntansi = "data/GetRequireConfigAkuntansi";
    var UrlDataConfigHelper = "data/GetRequireConfigHelper";


    var dataConfigPelayanan, dataConfigAkuntansi, dataConfigHelper;
    //ambil data require file dari masing masing module
    $.when(
        // $.getJSON(UrlDataConfig, function(data) {
        //     dataConfigPelayanan = data;
        // }),
        // $.getJSON(UrlDataConfigAkuntansi, function(data) {
        //     dataConfigAkuntansi = data;
        // }),
        // $.getJSON(UrlDataConfigHelper, function(data) {
        //     dataConfigHelper = data;
        // })
    ).then(function() {
        var msgError = "";
        var dataConfig = [{
                "nameDep": "SurveiCtrl",
                "urlDep": "module/SDM/SurveiCtrl"
            }, {
                "nameDep": "Header",
                "urlDep": "javascripts/directive/Header"
            }, {
                "nameDep": "StateService",
                "urlDep": "javascripts/Services/State"
            }, {
                "nameDep": "PatientService",
                "urlDep": "javascripts/Model/pasien"
            }, {
                "nameDep": "angular",
                "urlDep": "javascripts/angular.min"
            }, {
                "nameDep": "AngularUIRouter",
                "urlDep": "javascripts/angular-ui-router"
            }, {
                "nameDep": "AngularAnimate",
                "urlDep": "javascripts/angular-animate.min"
            }, {
                "nameDep": "routing",
                "urlDep": "javascripts/routing"
            }, {
                "nameDep": "config",
                "urlDep": "javascripts/config"
            }, {
                "nameDep": "initialize",
                "urlDep": "javascripts/moduleReservasi"
            }, {
                "nameDep": "Helper",
                "urlDep": "javascripts/Helper"
            }, {
                "nameDep": "initializeSurvei",
                "urlDep": "javascripts/moduleSurvei"
            }, {
                "nameDep": "mask",
                "urlDep": "javascripts/jquery-mask"
            }, {
                "nameDep": "main",
                "urlDep": "javascripts/mainReservasi"
            }, {
                "nameDep": "Configuration",
                "urlDep": "javascripts/Setting"
            }, {
                "nameDep": "DataRequestService",
                "urlDep": "javascripts/shared/service/data_request_service"
            }, {
                "nameDep": "Controller",
                "urlDep": "javascripts/ControllerReservasi"
            }, {
                "nameDep": "HttpServiceAkuntansi",
                "urlDep": "javascripts/Services/Akuntansi/HttpServicesAkuntansi"
            }, {
                "nameDep": "ControllerSurvei",
                "urlDep": "javascripts/ControllerSurvei"
            }, {
                "nameDep": "AngularRoute",
                "urlDep": "javascripts/angular-route.min"
            },
            {
                "nameDep": "OcLazyLoad",
                "urlDep": "javascripts/ocLazyLoad"
            }, {
                "nameDep": "EventRouteState",
                "urlDep": "javascripts/Services/EventRouteState"
            }, {
                "nameDep": "HeaderService",
                "urlDep": "javascripts/Services/HeaderService"
            }, {
                "nameDep": "HttpService",
                "urlDep": "javascripts/Services/HttpServices"
            }, {
                "nameDep": "core",
                "urlDep": "javascripts/core"
            }, {
                "nameDep": "KendoUI",
                "urlDep": "javascripts/kendo.all.min"
            }, {
                "nameDep": "ComponentDirective",
                "urlDep": "javascripts/directive/componentDirective"
            }, {
                "nameDep": "AngularFilter",
                "urlDep": "javascripts/angular-filter"
            }, {
                "nameDep": "Service",
                "urlDep": "javascripts/Services/Service"
            }, {
                "nameDep": "LoginService",
                "urlDep": "javascripts/Services/LoginService"
            }, /*{
                "nameDep": "WelcomeCtrl",
                "urlDep": "javascripts/Controllers/WelcomeCtrl"
            },*/ {
                "nameDep": "SdmService",
                "urlDep": "javascripts/Services/Sdm/SdmService"
            }, {
                "nameDep": "ReservasiOnlineCtrl",
                "urlDep": "module/pasien/ReservasiOnline/ReservasiOnlineCtrl"
            }, {
                "nameDep": "PasienService",
                "urlDep": "javascripts/Services/Pasien/PasienService"
            }, {
                "nameDep": "PegawaiService",
                "urlDep": "javascripts/Services/PegawaiService"
            }, {
                "nameDep": "ReservasiOnlineNewCtrl",
                "urlDep": "module/pasien/ReservasiOnline/ReservasiOnlineNewCtrl"
            }, {
                "nameDep": "DaftarAntrianPasienCtrl",
                "urlDep": "module/Daftar/Antrian/Pasien/DaftarAntrianPasienCtrl"
            }
        ];

        if (msgError == "") {
            var pathConfig = {};

            for (var i = 0; i < dataConfig.length; i++) {
                pathConfig[dataConfig[i].nameDep] = window.root + dataConfig[i].urlDep
            }
            var config = {
                baseUrl: '/',
                waitSeconds: 30,
                paths: pathConfig,
                deps: ['main']
            }

            require.config(config);
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