define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DashboarPasienPengkajianUtamaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'DateHelper',

        function($rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, dateHelper) {
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $scope.noRecRiwayatPap = $state.params.noRecRiwayatPap;
            $scope.pasienId = $state.params.pasienId;
            $scope.activeMenuDashboardPAP = localStorage.getItem('activeMenuDashboardPAP'); 
            debugger;
            // findPasien.findDokterPenanggungJawab($state.params.tanggal, $state.params.noCM).then(function(e) {
            //     $rootScope.dpjp = e.data.namaPegawai;
            // });
            $rootScope.tanggal = $scope.tanggal;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = false;
            $scope.item = cacheHelper.get("kajianAwal");
            $rootScope.hideMenuKajianAwal = window.stateKajianAwal;

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                debugger;
                $scope.item = ModelItem.beforePost(data.data, true);
                // $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);

                $scope.item.pasien.umurPasien = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-YYYY HH:mm');
                debugger;
            });
        }
    ]);
});