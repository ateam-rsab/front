define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('JadwalDokterCtrl', ['ManagePegawai', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'FindPegawai',
        function(managePegwai, $rootScope, $scope, ModelItem, $state, findPasien, findPegawai) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalJadwal = $scope.now;
            ModelItem.getDataDummyGeneric("Ruangan", true, true, 500).then(function(data) {
                $scope.ruangans = data;
            });
            ModelItem.getDataDummyGeneric("Pegawai", true, true, 10).then(function(data) {
                $scope.dokters = data;
            });

            ModelItem.getDataDummyGeneric("JadwalPraktek", true, undefined, 100).then(function(data) {
                $scope.jamPrakteks = data;
            });
            $scope.$watch('item.tanggalJadwal', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            })
            $scope.$watch('item.ruangan', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            })
            $scope.hapus = function(data) {
                var data = findPegawai.hapusDokterRawatJalan(data).then(function() {
                    $scope.refresh();
                });
            }
            $scope.Save = function() {
                var data = {
                    id: "",
                    ruangan: {
                        id: $scope.item.ruangan.id
                    },
                    dokter: {
                        id: $scope.item.dokter.id
                    },
                    jadwalPraktek: {
                        id: $scope.item.jadwalPraktek.id
                    },
                    tanggalJadwal: $scope.item.tanggalJadwal
                }
                managePegwai.savePegawai(ModelItem.beforePost(data)).then(function(e) {
                    $scope.refresh();
                });
            };
            $scope.refresh = function() {
                if ($scope.item.tanggalJadwal !== undefined && $scope.item.ruangan !== undefined) {
                    var data = findPegawai.getDokterRawatJalan($scope.item.tanggalJadwal, $scope.item.ruangan);
                    data.fetch(function() {
                        $scope.listData = this._data;
                        $scope.$apply();
                    });
                }
            };
        }
    ]);
});