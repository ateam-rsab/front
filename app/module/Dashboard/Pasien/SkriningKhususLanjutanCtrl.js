// duplicate from SkriningKekhususanCtrl
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SkriningKhususLanjutanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "Psikologi";
            $scope.dataVOloaded = true;
            // $rootScope.showMenu = true;
            // $rootScope.showMenuDetail = false;
            if(currentState.indexOf('Tambahan') > 0 || currentState.indexOf('Klinik') > 0){
                $scope.activeMenuSkriningKhususLanjutan = localStorage.getItem('activeMenuSkriningKhususLanjutan'); // set active menu
            } else {
                localStorage.removeItem('activeMenuSkriningKhususLanjutan'); // remove cache activeMenuDashboardPAP
            }
            $scope.nav = function(state) {
                $scope.activeMenuSkriningKhususLanjutan = state;
                localStorage.setItem('activeMenuSkriningKhususLanjutan', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});