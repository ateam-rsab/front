define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemeriksaanKhususCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, findPasien) {
            $scope.noCM = $state.params.noCM;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.tanggal = $state.params.tanggal;
            $scope.noCM = $state.params.noCM;
            $scope.item = {};
            $scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
                data: []
            });

            /*findPasien.checkPemeriksaanPasien($scope.noCM, $scope.tanggal, "Pernafasan").then(function(e) {
                $scope.flagPernafasan = e.data;
            });*/


        }
    ]);
});