define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PioCtrl', ['ManagePasien', '$rootScope', '$scope', 'ModelItem',
        function(managePasien, $rootScope, $scope, ModelItem) {
            $scope.cek = "PioCtrl";
            $scope.dataVOloaded = true;
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
                $scope.dokters = data;
                $scope.item.pegawai = ModelItem.getPegawai();
            });
            $scope.item = {};
            $scope.Save = function() {
                managePasien.savePio({
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