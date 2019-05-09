define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PengkajianKeperawatanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            //indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $rootScope.showMenu = true;$rootScope.showMenuDetail = false;
            $scope.noCM = $state.params.noCM;
            //dummy Persalinan
            $scope.listPersalinan = [{
                "id": "1",
                "name": "Spontan"
            }, {
                "id": "2",
                "name": "Direncanakan"
            }, ];
            $scope.item = {};
            $scope.item.persalinan = {
                "id": "1",
                "name": "Spontan"
            };

            //dummy Menaangis
            $scope.listMenangis = [{
                "id": "1",
                "name": "Ya"
            }, {
                "id": "2",
                "name": "Tidak"
            }, ];
            $scope.item.menangis = {
                "id": "1",
                "name": "Ya"
            };

            //dummy Riwayat Kuning
            $scope.listRiwayatKuning = [{
                "id": "1",
                "name": "Ya"
            }, {
                "id": "2",
                "name": "Tidak"
            }, ];
            $scope.item.riwayatkuning = {
                "id": "2",
                "name": "Tidak"
            };
        }
    ]);
});