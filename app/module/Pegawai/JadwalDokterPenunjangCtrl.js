define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('JadwalDokterPenunjangCtrl', ['ManagePegawai', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'FindPegawai', 'DateHelper',
        function(managePegawai, $rootScope, $scope, ModelItem, $state, findPasien, findPegawai, dateHelper) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalJadwal = $scope.now;
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            ModelItem.getDataDummyGeneric("Ruangan", true, true, 500).then(function(data) {

                $scope.ruangans = data;
            });
            ModelItem.getDataDummyGeneric("Pegawai", true, true, 10).then(function(data) {
                $scope.dokters = data;
            });

            ModelItem.getDataDummyGeneric("JadwalPraktek", true, undefined, 100).then(function(data) {
                $scope.jamPrakteks = data;
            });
            debugger;
            $scope.$watch('item.tanggalJadwal', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            })
            $scope.$watch('item.ruangan', function(e) {
                if (e === undefined) return;
                $scope.refresh();
            })
            $scope.statusDokters = [{"id":1,"statusDokter":"Dokter"},{"id":1,"statusDokter":"Dokter PenanggungJawab"}]
            $scope.hapus = function(data) {
                var data = findPegawai.hapusDokterRawatJalan(data).then(function() {
                    $scope.refresh();
                });
            }
            $scope.Save = function() {
                debugger;
                var data = {
                    jamAwal: dateHelper.formatDate($scope.item.tanggalAwal, "YYYY-MM-DD hh:mm"),
                    jamAkhir: dateHelper.formatDate($scope.item.tanggalAkhir, "YYYY-MM-DD hh:mm"),
                    dokter: {
                        id: $scope.item.dokter.id
                    },
                    ruangan: {
                        id: $scope.item.ruangan.id
                    },
                    status: $scope.item.statusDokter.statusDokter
                }
                managePegawai.savePegawaiDpjp(ModelItem.beforePost(data)).then(function(e) {
                    console.log(data)
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