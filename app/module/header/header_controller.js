define(['kendo.menu'], function(kendoMenu) {
    'use strict';

    function HeaderCtrl($window, $scope, MenuService, GlobalToState, $rootScope, $state, LoginHelper, $location, socket) {
        $scope.isOpen = true;
        $scope.listMenuHeader = {};
        $scope.messages = [];
        $scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
        
        $rootScope.$watch('addData', function(e) {
            $scope.messages.push(e);
        });

        $scope.open = function() {
            $scope.isOpen = !$scope.isOpen;
        };

        $scope.$watch('isOpen', function(e) {});

        $scope.getListMenuHeader = function() {
            MenuService.get("GetHeaderMenu" + "/" + LoginHelper.get())
                .then(function(result) {
                    var temp = [];
                    var valid = false;
                    
                    for (var key in result) {
                        if (result.hasOwnProperty(key)) {
                            var element = result[key];
                            if (element.caption.toLowerCase().indexOf('logout') < 0)
                                temp.push(element);
                            else {
                                valid = true;
                                temp.push(element);
                            }
                        }
                    }

                    var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
                    if (valid === false)
                        temp.push({
                            caption: "Logout (" + pegawai.namaLengkap + ")",
                            link: "/app/Logout",
                        });
                    $scope.listMenuHeader = temp;

                });
        };   
        
        $scope.showMenu = function() {
            $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
        }

        var cokie = document.cookie.split(';')[0].split('=')[1];
        $scope.userName = cokie;
        //jalanin fungsi kalo document ready
        angular.element(document).ready(function() {
            $scope.getListMenuHeader();
        });
        $rootScope.$watch('hideMenuUp', function(e) {
            $scope.hide = e;
        })
        $scope.first = function() {
            $rootScope.first();
        }
        $scope.last = function() {
            $rootScope.last();
        }
        $scope.next = function() {
            $rootScope.next();
        }
        $scope.back = function() {
            $rootScope.back();
        }
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                GlobalToState.set(toState);
        });

        // Start Syamsu

        $scope.goToLink = function(url){
            if (url.toLowerCase().indexOf('logout') <0 ){
                //debugger;
                if (url.toLowerCase().indexOf('bi-') > -1 ){
                    window.open($window.location.origin + url,'_blank')
                }else{
                    $window.location.href = url;
                    if (!$rootScope.$$phase) $rootScope.$apply();
                }
             
            } else {
                $rootScope.doLogout();
            }
        };


        $rootScope.loadDariNotif = false;
        
        $scope.checkNotif = function(data){

            var dataKirim  = {
                ruanganId : $scope.rootRuanganUnitKerja.ruanganId,
                notif : data
            };

            $rootScope.listNotification = _.without($rootScope.listNotification, data);
            

            if ($rootScope.listNotification.length > 0){
                 window.localStorage.setItem('listNotification', JSON.stringify($rootScope.listNotification));
            } else {
                window.localStorage.removeItem('listNotification');
            }

            var msgNotif = JSON.stringify(dataKirim);

            socket.emit('deleteNotif', msgNotif);

            if (data.urlForm == undefined || data.urlForm == null){
                return;
            }

            if ($location.absUrl().indexOf(data.urlForm) < 0){
                $window.location.href = data.urlForm;
                if (!$rootScope.$$phase) $rootScope.$apply();
                $rootScope.loadDariNotif = true;
            }
        };

        $scope.datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
        $scope.dataPegawai = JSON.parse(window.localStorage.getItem("pegawai"));
        $scope.showEditNohandphone = false;
        $scope.showEditEmail = false;
        $scope.showEditPassword = false;

        $scope.dataTemp = "";

        $scope.editDataProfile = function(strVarCurrData, varShow){
            $scope.dataTemp = $scope.dataPegawai[strVarCurrData];
            $scope.showEditNohandphone = false;
            $scope.showEditEmail = false;
            $scope.showEditPassword = false;

            $scope[varShow] = true;
        };

        $scope.cancelEditProfile = function(varShow){
            $scope[varShow] = false;
            $scope.dataTemp = "";
        };

        $scope.currentVarshow = "";
        $scope.currentType = "";

        $scope.confirmEditprofile = function (strVarCurrData, varShow){
            $scope.dataPegawai[strVarCurrData] = $scope.dataTemp;
            $scope.currentVarshow = varShow;
            $scope.showRootAuthPassword = true;
            $scope.currentType = "EditDataProfile";
        };

        $scope.dataConfirmPassword = "";

        $scope.sendEditProfile = function(){
            var dataPost = {
                "pegawaiVO": $scope.dataPegawai,
                "password": $scope.dataConfirmPassword
            }

            MenuService.postProfilePegawai(dataPost)
                .then(function(result) {
                    window.localStorage.setItem('pegawai', JSON.stringify($scope.dataPegawai));
                    $scope.dataConfirmPassword = "";
                    $scope.cancelEditProfile($scope.currentVarshow);
                    $scope.showRootAuthPassword = false;
                                
                }, function(error){
                    $scope.dataPegawai = JSON.parse(window.localStorage.getItem("pegawai"));
                    $scope.dataConfirmPassword = "";
                    $scope.cancelEditProfile($scope.currentVarshow);
                    $scope.showRootAuthPassword = false;
                });


            $scope.dataTemp = "";
        };

        $scope.editDataPassword = function(varShow){
            $scope.currentVarshow = varShow;
            $scope.showEditNohandphone = false;
            $scope.showEditEmail = false;
            $scope.showEditPassword = false;

            $scope[varShow] = true;
        };

        $scope.cancelEditDataPassword = function(varShow){
            $scope[varShow] = false;
            $scope.dataTemp = "";
        };

        $scope.confirmDataPassword = function (varShow){
            $scope.showRootAuthPassword = true;
            $scope.currentType = "EditKataSandi";
        };

        $scope.submitPassword = function(){
            switch($scope.currentType){
                case "EditDataProfile":
                     $scope.sendEditProfile();
                break;

                case "EditKataSandi":
                    $scope.sendEditKataSandi();
                break;
            }
        };

        $scope.sendEditKataSandi = function(){
            var dataPost = {
                "id": $scope.datauserlogin.id, 
                "kataSandi": $scope.dataTemp,
                "password": $scope.dataConfirmPassword
            }

            MenuService.postKataSandi(dataPost)
                .then(function(result) {
                    $scope.cancelEditDataPassword($scope.currentVarshow);
                    $scope.showRootAuthPassword = false;
                                
                }, function(error){
                    $scope.cancelEditDataPassword($scope.currentVarshow);
                    $scope.showRootAuthPassword = false;
                });


            $scope.dataTemp = "";
        };

        $rootScope.hideHoverConfirmPassword = function(){
            $scope.showRootAuthPassword = false;
        };


        $rootScope.isShowBoxNotification = false;
        $rootScope.showBoxNotification = function(){
            if($rootScope.isShowBoxNotification){
                $rootScope.isShowBoxNotification = false;
            }
            else
            {
                $rootScope.isShowBoxNotification = true;
            }
        };

        $rootScope.isShowBoxProfile = false;
        $rootScope.showBoxProfile = function(){
            if($rootScope.isShowBoxProfile){
                $rootScope.isShowBoxProfile = false;
            }
            else
            {
                $rootScope.isShowBoxProfile = true;
            }
        };

        $scope.toMainMenu = function() {
            window.history.back();
        };

        // End Syamsu

        $scope.now = new Date;
        $scope.tglSkrg=moment($scope.now).format('YYYY-MM-DD HH:mm:ss');


    }

    HeaderCtrl.$inject = ['$window', '$scope', 'MenuService', 'GlobalToState', '$rootScope', '$state', 'LoginHelper', '$location', 'socket'];

    return HeaderCtrl;
});