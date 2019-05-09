define(['Service', 'Configuration'], function(Service, conf) {
    'use strict';

function Controller($http, $scope, $timeout, $ocLazyLoad, MenuService, $rootScope, socket, $state, LoginHelper, loginService, $mdSidenav, $mdDialog, $window, $location) {
        $window.kendoAlert = (function () {
            // create modal window on the fly
            var win = $("<div>").kendoWindow({
                  modal: true,
                  title:  "Laporan Kerusakan Barang",
                  width: "400px",
                  visible: false,
                  close: function (e) {
                    $state.go("RespondPerbaikan");
                  }
            }).getKendoWindow();
            return function (msg) {
                  // set the content

                  win.content("Kerusakan pada "+ msg);
                  // center it and open it
                  win.center().open();
            };
        });
        socket.on('PermintaanPerbaikan', function(data) {
            // debugger;
            //var str = data.message;
            // $scope.tmp = angular.fromJson(data.message);
            kendoAlert(data.message.keluhan);
            //console.log(data.message);
        });
        $scope.Menu = 'Pasien';
        var status = document.cookie.split(';')[0].split('=')[1];
        if (status === 'operator')
            $scope.Menu = 'Pendaftaran';
        $scope.isRouteLoading = true;
        $rootScope.$watch('doneLoad', function(e) {
            if (e === undefined) return;
            $scope.isRouteLoading = e;
        });
        $scope.toggleRight = buildToggler('right');

        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {});
            }
        }
        $rootScope.$watch('isOpenMenu', function(e) {
            if (e === undefined) return;
            $scope.toggleRight();
        })
        $scope.orientation = "horizontal";
        $rootScope.$watch('isOpen', function(e) {
            $scope.isOpen = e;
        });
        $scope.$watch('isOpen', function(e) {
            $rootScope.showSideMenu = e;
        });
        $scope.isOpen = true;
        $scope.width = 200;
        $scope.hasLoad = false;
        $timeout(function() {
            $scope.hasLoad = true;
        }, 100);

        $rootScope.$watch('doneLoad', function(e) {
            $scope.doneLoad = e;
        });
        // $(window).on('resize', function() {
        //     if (!$scope.isTablet)
        //         $scope.width = $(window).width() - 307;
        //     else {
        //         $scope.width = $(window).width() - 27;
        //     }
        // });
        // $scope.$watch('isOpen', function(e) {
        //     if (e) {
        //         $scope.width = $(window).width() - 27;
        //     } else {
        //         if (!$scope.isTablet)

        //             if ($(window).width() > 800)
        //                 $scope.width = $(window).width() - 307;
        //             else {
        //                 $scope.width = $(window).width() - 27;
        //                 $scope.isOpen = true;
        //             }
        //         else {
        //             $scope.width = $(window).width() - 27;
        //         }
        //     }
        // });

        if (!$scope.isTablet) {
            if ($(window).width() > 800)
                $scope.width = $(window).width() - 307;
            else
                $scope.width = $(window).width() - 27;
        } else {
            $scope.width = $(window).width() - 27;
        }
        $scope.isOpen = false;
        $scope.isTablet = false;
        $scope.menuOrientation = "horizontal";

        //ambil menu cara lama
        // non aktif by egie
        $rootScope.menu = [];
        // MenuService.get("GetSideMenu" + "/" + LoginHelper.get())
        //     .then(function(result) {
        //         $rootScope.menu = result;
        // });

          //ambil menu cara baru *change egie*
        $scope.DefaultLeftMenu = [];

        $scope.cacheWelcome= JSON.parse(window.localStorage.getItem("cacheHelper"));
        if($scope.cacheWelcome!=undefined){
            if($scope.cacheWelcome[0].name== "WelcomeCtrl" ){   
               var arrModulAplikasiId= $scope.cacheWelcome[0].value[0];
               var arrKelompokUserId= $scope.cacheWelcome[0].value[1];
            }
        }

        var getChildren = function(arr){
                var children = [];
                for(var i=0; i< arr.length; i++){
                    var menu = {};
                    menu["name"] = arr[i].objekModulAplikasi;
                    menu["id"] = arr[i].id;    

                    if(arr[i].children.length > 0){
                        menu["children"] = getChildren(arr[i].children);
                    }
                    else
                    {
                        menu["link"] = arr[i].alamatUrlForm;
                    }

                    children.push(menu);
                }
                return children;
        }
     

        MenuService.getDataMenu("modul-aplikasi/get-all-default-objek-modul").then(function(result){
                $scope.DefaultLeftMenu = result.data;
        });

        MenuService.getDataMenuPhp("pegawai/get-all-objek-modul?idModulAplikasi="+arrModulAplikasiId +"&idKelompokUser="
                    + arrKelompokUserId)
                    .then(function(result) {

                        $rootScope.menu = [];
                        var menu = {};
                        menu["name"] = "Depan";
                        menu["link"] = "#/home";
                        
                        $rootScope.menu.push(menu);
                        // debugger
                        var childMenu = result.data;   
                        var defMenu = $scope.DefaultLeftMenu;
                           
                        for (var i=0; i < defMenu.length; i++){
                           
                            menu = {};
                            var add = false;
                            menu["children"] = [];   
                            for (var j=0; j < childMenu.length; j++){  
                                if (defMenu[i].id == childMenu[j].id){
                                    menu["name"] = defMenu[i].objekModulAplikasi;      
                                    menu["id"] = defMenu[i].id;                              
                                    var iChildMenu = {};

                                    iChildMenu["name"] = childMenu[j].objekModulAplikasi;   
                                    if (childMenu[j].alamatUrlForm != null ){
                                        iChildMenu["link"] = childMenu[j].alamatUrlForm; 
                                    }
                                    if(childMenu[j].children.length > 0){
                                        iChildMenu["children"] = getChildren(childMenu[j].children);
                                    }
                                    menu["children"].push(iChildMenu);
                                } 
                            }

                            for (var k=0; k < menu["children"].length; k++){  
                                if ("name" in menu["children"][k]){
                                    // debugger
                                    $rootScope.menu.push(menu["children"][k]);
                                }
                            }

                            // if(isLogin)
                            // {
                            //     $state.go("welcome");
                            // }
                        } 
                        // if (childMenu.length > 0){
                        //     toastr.info('Sukses','Navigasi');
                        // }else{
                        //     toastr.error('Anda tidak memiliki Akses','Info');
                        // }   
                          
                  
                }, function(response) {
                    $scope.showRootRuangan = false;
                    if (response.headers('error_message') == undefined) {                        
                        window.messageContainer.error('Periksa jaringan LAN.');
                    } else {
                        window.messageContainer.error(response.headers('error_message'));
                    }
                });   


         //end cara baru  **

        $scope.$watch('autoLogin', function(e) {
            if (e !== true) return;
            var userName = "sdm";
            var password = "admin";
            loginService.authentication({
                namaUser: userName,
                kataSandi: password
            }).then(function(data) {

                    if (data.data.messages.message) {
                        window.messageContainer.error(data.data.messages.message);
                        $scope.isBusy = false;
                        return;
                    }
                    var cookieStr = "statusCode=" + data.data.data.kelompokUser.kelompokUser + ';';
                    document.cookie = cookieStr;
                    document.cookie = 'authorization=' + data.data.messages['X-AUTH-TOKEN'] + ";";
                    window.localStorage.setItem('pegawai', JSON.stringify(data.data.data.pegawai));
                    var dataUrlRoute = [];
                    var dataUrlRouteAkuntansi = [];
                    $.when(
                        $.getJSON(conf.urlRoute, function(data) {
                            dataUrlRoute = data;
                        }),
                        $.getJSON(conf.urlRoute_Akuntansi, function(data) {
                            dataUrlRouteAkuntansi = data;
                        })
                    ).then(function() {
                        var msgError = "";
                        var arrDataConfig = [dataUrlRoute, dataUrlRouteAkuntansi];
                        var dataConfig = [];
                        dataConfig.push({
                            "nameDep": "jQuery",
                            "urlDep": "../jquery"
                        });
                        for (var i = 0; i < arrDataConfig.length; i++) {
                            for (var k = 0; k < arrDataConfig[i].length; k++) {
                                dataConfig.push(arrDataConfig[i][k]);
                            }
                        }

                        if (msgError == "") {
                            window.localStorage.setItem('urlBind', JSON.stringify(dataConfig));
                            window.location = "#" + $scope.url;
                        }
                    });

                    $scope.isBusy = false;
                },
                function(error) {
                    $scope.isBusy = false;
                    window.messageContainer.error('Gagal masuk ke dalam system')
                });
        })
    }
    Controller.$inject = ['$http', '$scope', '$timeout', '$ocLazyLoad', 'MenuService', '$rootScope', 'socket', '$state', 'LoginHelper', 'LoginService', '$mdSidenav', '$mdDialog', '$window', '$location' ];
    return Controller;
});