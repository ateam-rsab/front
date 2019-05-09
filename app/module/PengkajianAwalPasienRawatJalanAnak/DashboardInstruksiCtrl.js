define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardInstruksiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $scope.noRecPasienDaftar = $state.params.noRecPasienDaftar;
            debugger;
            //indikator harap tunggu
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.item = {};
            $scope.nav = function(state) {
                debugger;
                $state.go(state, $state.params);
            }
        }
    ]);
});