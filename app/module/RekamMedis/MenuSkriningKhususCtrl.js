define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MenuSkriningKhususCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper',
        function($rootScope, $scope, ModelItem, $state, cacheHelper) {
            // $scope.title = "Psikologi";
            // debugger;
            if (currentState.indexOf('Tambahan') > 0 || currentState.indexOf('Riwayat') > 0 || currentState.indexOf('InformasiIbu') > 0 || currentState.indexOf('KehamilanSekarang') > 0 ||
            currentState.indexOf('CapKakiBayi') > 0 || currentState.indexOf('Klinik') > 0  || currentState.indexOf('Ginekologi') > 0 || currentState.indexOf('Edukasi') > 0)
                $scope.activeMenuSkriningKhusus = localStorage.getItem('activeMenuSkriningKhusus');
            $scope.dataVOloaded = true;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.nav = function(state) {
                $scope.activeMenuSkriningKhusus = state;
                localStorage.setItem('activeMenuSkriningKhusus', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});