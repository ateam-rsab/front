define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaporanKonselingCtrl', ['FindPasien', '$state', 'ManagePasien', '$rootScope', '$scope', 'ModelItem',
        function(findPasien, $state, managePasien, $rootScope, $scope, ModelItem) {
            $scope.cek = "PioCtrl";
            $scope.dataVOloaded = true;
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
                $scope.dokters = data;
                $scope.item.pegawai = ModelItem.getPegawai();
            });
            $scope.find = function() {
                $state.go('LaporanKonselingFind');
            }
            if ($state.params.noRec !== '') {

                findPasien.getByNoRegistrasi($state.params.noRec).then(function(e) {
                    $scope.data = e.data;
                });
            }
            $scope.item = {};
            $scope.Save = function() {
                managePasien.savePio({
                    pasien: $scope.data.pasien,
                    pegawai: $scope.item.pegawai,
                    produk: $scope.item.NamaBarang,
                    detailPio: [],
                    namaPenanya: $scope.item.namaPenanya,
                    bagian: $scope.item.bagian,
                    noTelepon: $scope.item.noTelepon
                });
            }
        }
    ]);
});