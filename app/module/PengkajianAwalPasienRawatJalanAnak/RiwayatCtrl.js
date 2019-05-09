define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function($rootScope, $scope, ModelItem, $state) {
            $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Riwayat";
            $rootScope.showMenu = true;$rootScope.showMenuDetail = false;

            //dummy data locaksi nyeri
            $scope.listLokasiUmur = [{
                "id": "1",
                "name": "1"
            }, {
                "id": "2",
                "name": "2"
            }, {
                "id": "3",
                "name": "3"
            }, {
                "id": "4",
                "name": "4"
            }, {
                "id": "5",
                "name": "5"
            }, ];
            $scope.item = {};
            $scope.item.lokasiumur = {
                "id": "4",
                "name": "4"
            };

            //dummy data Hasil Imunisasi
            $scope.listHasilImunisasi = [{
                "id": "1",
                "name": "Pernah"
            }, {
                "id": "2",
                "name": "Tidak Pernah"
            }, ];
            $scope.item.hasilimunisasi = {
                "id": "2",
                "name": "Tidak Pernah"
            };

        }
    ]);
});