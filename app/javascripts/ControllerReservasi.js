define(['Service', 'Configuration'], function(Service, conf) {
    'use strict';

    function Controller($http, $scope, $timeout, $ocLazyLoad, $rootScope, $state, loginService) {

        $scope.Menu = 'Pasien';

        var status = document.cookie.split(';')[0].split('=')[1];
        if (status === 'operator')
            $scope.Menu = 'Pendaftaran';
        $scope.isRouteLoading = false;
        $scope.doneSlide = false;
        $rootScope.$watch('doneSlide', function(e) {
            if (e === undefined) return;
            $scope.doneSlide = e;
        });
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
        $scope.doneLoad = false;
        $rootScope.$watch('doneLoad', function(e) {
            $scope.doneLoad = e;
        });
        $(window).on('resize', function() {
            if (!$scope.isTablet)
                $scope.width = $(window).width() - 307;
            else {
                $scope.width = $(window).width() - 27;
            }
        });
        $scope.$watch('isOpen', function(e) {
            if (e) {
                $scope.width = $(window).width() - 27;
            } else {
                if (!$scope.isTablet)

                    if ($(window).width() > 800)
                        $scope.width = $(window).width() - 307;
                    else {
                        $scope.width = $(window).width() - 27;
                        $scope.isOpen = true;
                    }
                else {
                    $scope.width = $(window).width() - 27;
                }
            }
        });

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
        $scope.menu = [];
        $scope.autoLogin = false;
        $scope.$watch('autoLogin', function(e) {
            if (e !== true) return;
            var userName = "pasien";
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
                            if (window.location.hash === undefined || window.location.hash === "#/home" || window.location.hash === "#/Logistik")
                                setTimeout(function() {
                                    window.location = "#" + $scope.url;
                                }, 1000);

                        }
                    });
                    // window.location = "#" + $scope.url;

                    $scope.isBusy = false;
                },
                function(error) {
                    $scope.isBusy = false;
                    window.messageContainer.error('Gagal masuk ke dalam system')
                });
        })
    }
    Controller.$inject = ['$http', '$scope', '$timeout', '$ocLazyLoad', '$rootScope', '$state', 'LoginService'];
    return Controller;
});