require.config({
    // urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: '/',
    paths: {
        'LoginService': window.root + 'javascripts/Services/LoginService',
        'HttpServices': window.root + 'javascripts/Services/HttpServices',
        'core': window.root + 'javascripts/core',
        'jQuery': 'jquery',
        'Configuration': window.root + 'javascripts/Setting',
        'Service': window.root + 'javascripts/Services/Service',
        'Helper': window.root + 'javascripts/Helper'
    },
    shim: {

    }
});
require(['LoginService', 'core', "kendo.angular", 'Configuration', 'Helper', 'jQuery', 'Service', 'HttpServices'],
    function(LoginService, core, kendo, conf, helper) {
        angular.module('myApp', ["kendo.directives", "core", 'LoginServices', 'LocalStorageModule', 'Services', 'HttpServices'])
            .controller('Controller', [
                'socket', '$rootScope', '$scope', '$timeout', 'LoginService', 'localStorageService',
                function(socket, $rootScope, $scope, $timeout, loginService, localStorageService) {

                    // Alter Syamsu, perubahaan cara user login
                    var goLogin = function(userName, password){
                        window.localStorage.clear();

                        var delete_cookie = function(name) {
                            var today = new Date();
                            var expr = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
                            document.cookie = name + '=;expires=' + (expr.toGMTString());
                        }
                        delete_cookie('authorization');
                        delete_cookie('statusCode');
                        delete_cookie('io'); 

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
                            
                            var dataUserLogin = {
                                id: data.data.data.id,
                                // Start Syamsu
                                kdUser : data.data.data.namaUser,
                                // End Syamsu
                                waktuLogin : new Date(),
                                // endWaktuLogin : new Date(new Date().getTime() + ( 2 * 60 * 1000))
                                endWaktuLogin : new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000))
                            };

                            window.localStorage.setItem('datauserlogin', JSON.stringify(dataUserLogin));
                            window.localStorage.setItem('pegawai', JSON.stringify(data.data.data.pegawai));
                            var dataUrlRoute = [];
                            var dataUrlRouteAkuntansi = [];
                            $.when(
                                $.getJSON(conf.urlRoute, function(data) {
                                    dataUrlRoute = data;
                                }),
                                $.getJSON(conf.urlRoute_Akuntansi, function(data) {
                                    dataUrlRouteAkuntansi = data;
                                }),
                                $.getJSON(conf.urlRoute_SDM, function(data) {
                                    dataUrlRouteSDM = data;
                                })
                            ).then(function() {
                                var msgError = "";
                                var arrDataConfig = [dataUrlRoute, dataUrlRouteAkuntansi, dataUrlRouteSDM];
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
                                    socket.emit('login', data.data.data.pegawai);
                                    window.localStorage.setItem('urlBind', JSON.stringify(dataConfig));
                                    setTimeout(function(){                                                                                        
                                        window.location = "/app/#/home";
                                        $scope.isBusy = false;
                                    }, 1000);
                                }
                            });                            
                        },
                        function(error) {
                            if(error.data.messages)
                                window.messageContainer.error(error.data.messages)
                            $scope.isBusy = false;
                            // window.messageContainer.error('Gagal masuk ke dalam system')
                        });

                        loginService.javaAuthentication({
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
                            
                            var dataUserLogin = {
                                id: data.data.data.id,
                                // Start Syamsu
                                kdUser : data.data.data.namaUser,
                                // End Syamsu
                                waktuLogin : new Date(),
                                // endWaktuLogin : new Date(new Date().getTime() + ( 2 * 60 * 1000))
                                endWaktuLogin : new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000))
                            };

                            window.localStorage.setItem('datauserlogin', JSON.stringify(dataUserLogin));
                            window.localStorage.setItem('pegawai', JSON.stringify(data.data.data.pegawai));
                            var dataUrlRoute = [];
                            var dataUrlRouteAkuntansi = [];
                            $.when(
                                $.getJSON(conf.urlRoute, function(data) {
                                    dataUrlRoute = data;
                                }),
                                $.getJSON(conf.urlRoute_Akuntansi, function(data) {
                                    dataUrlRouteAkuntansi = data;
                                }),
                                $.getJSON(conf.urlRoute_SDM, function(data) {
                                    dataUrlRouteSDM = data;
                                })
                            ).then(function() {
                                var msgError = "";
                                var arrDataConfig = [dataUrlRoute, dataUrlRouteAkuntansi, dataUrlRouteSDM];
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
                                    socket.emit('login', data.data.data.pegawai);
                                    window.localStorage.setItem('urlBind', JSON.stringify(dataConfig));
                                    setTimeout(function(){                                                                                        
                                        window.location = "/app/#/home";
                                        $scope.isBusy = false;
                                    }, 1000);
                                }
                            });                            
                        },
                        function(error) {
                            if(error.data.messages)
                                window.messageContainer.error(error.data.messages)
                            $scope.isBusy = false;
                            // window.messageContainer.error('Gagal masuk ke dalam system')
                        });
                    };


                    $scope.isBusy = true;
                    $scope.login = function(userName, password) {

                        var datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
                        var blmLogout = !(datauserlogin == undefined || datauserlogin == null);
                        
                        if (blmLogout){
                            loginService.logout().then(function(e) {
                                var pegawai = JSON.parse(window.localStorage.getItem("pegawai"));
                                socket.emit('logout.otomatis', pegawai);
                                goLogin(userName, password);
                            },function(e) {
                                goLogin(userName, password);
                            });
                        } else {
                            goLogin(userName, password);
                        }
                    };
                     // Alter Syamsu, perubahaan cara user login
                }
            ]);
        angular.bootstrap(document, ['myApp']);
    }
);