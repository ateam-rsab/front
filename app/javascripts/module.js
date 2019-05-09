define(['HttpServicesDataMaster', 'HttpServiceAkuntansi', 'Configuration', 'require', 'config', 'Controller', 'AngularRoute', 'OcLazyLoad', 'header', 'HeaderService', 'HttpService', 'core', 'AngularUIRouter', 'AngularAnimate', 'EventRouteState', 'ComponentDirective', 'routing', 'AngularFilter', 'LoginService'],
    function(httpServicesDataMaster, httpServiceAkuntansi, configuration, require, config, Controller, ngRoute, lazy, header, headerService, httpService, core, AngularUIRouter, AngularAnimate, EventRouteState, ComponentDirective, routing, AngularFilter, LoginService) {
        'use strict';
        var app = angular
            .module('myApp', ['HttpServicesDataMaster', 'HttpServicesAkuntansi', 'ui.router', 'ngAnimate', 'ngRoute', 'core', 'kendo.directives', 'oc.lazyLoad', 'Headers', 'HttpServices', 'ui.router', 'EventRouteState', 'ComponentDirective', 'btford.socket-io', 'angular.filter', 'ngMaterial', 'ngSanitize', 'LoginServices'])
            .config(config.method).controller('Controller', Controller).controller('HeaderCtrl', header).run(run);

        function run($window, socket, $timeout, $rootScope, $http, $location, R, LoginService) {
 
             var recursiveArray = function(arr, objectModulId){
                var oke = false;

                for (var i=0; i<arr.length; i++){
                    console.log('Id %d', arr[i].id);
                    if (arr[i].id == objectModulId){
                        return true;
                        break;
                    }

                    if (arr[i].children == undefined){
                        continue;
                    }
                    oke = recursiveArray(arr[i].children);
                }

                return oke;
            };

            var responSocketBuatNotif = function(data){

                var objectData = JSON.parse(data);

                var lDataRuangan = window.localStorage.getItem('dataRuangan');

                if (lDataRuangan == undefined || lDataRuangan == null){
                    return;
                }   

                var dataRuangan = dataRuangan = JSON.parse(lDataRuangan);

                if (dataRuangan == undefined && dataRuangan == null){
                    return;
                }    


                var strModulAppId = window.localStorage.getItem('modulAplikasiId');

                if (strModulAppId == undefined || strModulAppId == null){
                    return;
                }

                var modulAplikasiId = parseInt(JSON.parse(strModulAppId));


                console.log('isi data : %s', data);

                 var listNotif = [];


                for (var i=0; i<objectData.length; i++){

                    var dataNotif = objectData[i];
                    
                    var ruangan = dataNotif.ruangan;
                    var modulAplikasi = dataNotif.modulAplikasi;
                    var objekModulAplikasi = dataNotif.objekModulAplikasi;
                    var titleNotifikasi =dataNotif.titleNotifikasi;
                    var pesanNotifikasi = dataNotif.pesanNotifikasi;
                    var fromPegawai = dataNotif.fromPegawai;
                    var urlForm = dataNotif.urlForm;

                    var adaObjekModul = recursiveArray($rootScope.menu, objekModulAplikasi);                   

                    if(dataRuangan.ruanganId == ruangan.id && modulAplikasiId == modulAplikasi.id && adaObjekModul){

                        var singleNotif = {
                            "title": titleNotifikasi,
                            "description": pesanNotifikasi,
                            "fromPegawai" : fromPegawai.namaLengkap,
                            "unitKerja" : ruangan.namaRuangan,
                            "urlForm": urlForm,
                            "date": moment().format('MMMM Do YYYY, h:mm:ss a')
                        };

                        listNotif.push(singleNotif);
                    }

                }

                if (listNotif.length > 0) {
                    var lastNotif = listNotif[listNotif.length-1];

                    if ($location.absUrl().indexOf(lastNotif.urlForm) >= 0){
                        //$rootScope.kendoGridUImagic(); // ini untuk refresh otomatis tutup dulu
                    }    
                }

                $rootScope.listNotification = listNotif;

                if (listNotif.length <= 0){
                    window.localStorage.removeItem('listNotification');
                }else {
                    window.localStorage.setItem('listNotification', JSON.stringify($rootScope.listNotification));                   
                }
                
                //window.messageContainer.log('perbaharui notifikasi...');
            };

            $rootScope.socketOffruanganId = function(objectRuanganId) {

                if (objectRuanganId == undefined || objectRuanganId == null || 
                    objectRuanganId.ruanganId == undefined || objectRuanganId.ruanganId == null){
                    return;
                }
                socket.removeAllListeners('listNotif.' + objectRuanganId.ruanganId);
                console.log("disconnect ke ruangan %s", objectRuanganId.ruanganId.toString());
            };


            $rootScope.notifListperRuangan = function(objectRuanganId){
                if (objectRuanganId == undefined || objectRuanganId == null || 
                    objectRuanganId.ruanganId == undefined || objectRuanganId.ruanganId == null){
                    return;
                }

                socket.on('listNotif.' + objectRuanganId.ruanganId, responSocketBuatNotif);
                socket.emit('ruanganId', objectRuanganId.ruanganId.toString());
                console.log("connect ke ruangan %s", objectRuanganId.ruanganId.toString());
            };


            socket.on('login', function(data) {

                // var pegawai = JSON.parse(window.localStorage.getItem("pegawai"));

                // if (pegawai.namaLengkap == data.namaLengkap) {
                //     return;
                // }
                
                // var notif = {
                //     "title": data.namaLengkap + ', berhasil login',
                //     "description": 'Info : Click atau tap untuk menghapus.',
                //     "fromPegawai" : 'System',
                //     "unitKerja" : null,
                //     "date": moment().format('MMMM Do YYYY, h:mm:ss a'),
                //     "urlForm": undefined
                // };

                // $rootScope.listNotification.push(notif);
                // window.localStorage.setItem('listNotification', JSON.stringify($rootScope.listNotification));
                // window.messageContainer.log('Anda dapat ada notifikasi baru.');
            });       

            socket.on('logout', function(data) {

                // var pegawai = JSON.parse(window.localStorage.getItem("pegawai"));

                // if (pegawai.namaLengkap == data.namaLengkap) {
                //     return;
                // }
                
                // var notif = {
                //     "title": data.namaLengkap + ', telah logout',
                //     "description": 'Info : Click atau tap untuk menghapus.',
                //     "fromPegawai" : 'System',
                //     "unitKerja" : null,
                //     "date": moment().format('MMMM Do YYYY, h:mm:ss a'),
                //     "urlForm": undefined
                // };

                // $rootScope.listNotification.push(notif);
                // window.localStorage.setItem('listNotification', JSON.stringify($rootScope.listNotification));
                // window.messageContainer.log('Anda dapat ada notifikasi baru.');

            });    

            $rootScope.kendoGridUImagic = function(){

                try{
                    setTimeout(function(){
                                                
                        var grid = $('.k-grid').data('kendoGrid');

                        grid.dataSource.page(grid.dataSource.totalPages());
                        setTimeout(function(){
                            var rows = grid.dataSource.data();

                            var model = rows[rows.length - 1]; 
                            var lastRowUid = model.uid;

                            var row = grid.table.find("[data-uid=" + lastRowUid + "]");
                            grid.select(row);
                            $("html, body").animate({ scrollTop: $(document).height() }, 500);
                            window.messageContainer.log('Refresh oleh notifikasi...');     
                        }, 1000);
                    }, 2000);
                }catch(err){

                }

                //window.messageContainer.log('Refresh oleh notifikasi...');     
            };

            //init var notification
            $rootScope.listNotification = JSON.parse(window.localStorage.getItem('listNotification'));
            if ($rootScope.listNotification == undefined || $rootScope.listNotification == null){
                $rootScope.listNotification = [];
            }


            // $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
            var temp = [];
            // track current state for active tab
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                $rootScope.currentState = toState.name;
                temp.push($location.path());
            });
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                $rootScope.changeState = toState;
                $rootScope.doneLoad = false;
            });
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                if ($rootScope.loadDariNotif){
                    $rootScope.kendoGridUImagic();
                }
                $rootScope.doneLoad = true;            
            });
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, a, s, d, f, g, h) {                
                console.error(a);
            });

            $rootScope.$watch(function() {
                return $location.path()
            }, function(newLocation, oldLocation) {
                var count = _.countBy(temp, function(e) {
                    return e === newLocation;
                })
            });

            $rootScope.showRootFormlogin = false;
            $rootScope.hideHover = function(showBox){
                $rootScope[showBox] = false;
            }

            $rootScope.dataLoginSupervisor = {};
            $rootScope.dataSupervisor = {};
            $rootScope.dataObjectForSupervisor = {};
            $rootScope.dataUrlForSupervisor = "";

            $rootScope.loginSuperUser = function() {
                $rootScope.dataSupervisor = {
                    'namaUser': $rootScope.dataLoginSupervisor.UserName,
                    'kataSandi': $rootScope.dataLoginSupervisor.Password
                }

                LoginService.superviseLogin($rootScope.dataSupervisor, $rootScope.dataObjectForSupervisor, $rootScope.dataUrlForSupervisor).then(function(e) {
                    $rootScope.dataLoginSupervisor = {};
                    $rootScope.showRootFormlogin = false;
                }, function(e) {
                    $rootScope.msgErorLoginSupervisor = "User supervisor not valid";
                    $rootScope.dataLoginSupervisor = {};

                    $timeout(function()
                    {
                       $rootScope.msgErorLoginSupervisor = "";
                    }, 1500);
                });
               
            }

            $rootScope.logoutUlang = 0;

            //debugger;

            $rootScope.doLogout = function()
            {
                LoginService.logout().then(function(e) {

                    var pegawai = JSON.parse(window.localStorage.getItem("pegawai"));
                    socket.emit('logout', pegawai);

                    window.localStorage.clear();

                    var delete_cookie = function(name) {
                        var today = new Date();
                        var expr = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
                        document.cookie = name + '=;expires=' + (expr.toGMTString());
                    }
                    delete_cookie('authorization');
                    delete_cookie('statusCode');
                    delete_cookie('io'); 

                    $rootScope.logoutUlang = 0;

                    $window.location.replace('Logout');
                }, function(e) {

                    $rootScope.logoutUlang++;
                    
                    if ($rootScope.logoutUlang > 2) {
                        window.messageContainer.error("Logout gagal. Periksa jaringan LAN.");
                    } else {
                         window.messageContainer.error("Logout gagal, coba lagi");
                    }

                });
            }
        }
        window.config = config;
        return app;
    });