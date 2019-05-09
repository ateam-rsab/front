define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardRencanaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            $scope.noCM = $state.params.noCM;
            //indikator harap tunggu
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.tanggal = $state.params.tanggal;

            $scope.noCM = $state.params.noCM;
            $scope.item = {};

        }
    ]);
});