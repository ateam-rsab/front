define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PelayananRepackingCtrl', ['ManagePasien', '$rootScope', '$scope', 'ModelItem',
        function(managePasien, $rootScope, $scope, ModelItem) {
            $scope.cek = "PelayananRepackingCtrl";
            $scope.dataVOloaded = true;

            $scope.item = {};
            $scope.temp = {};

            $scope.now = new Date();


            ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
                $scope.listDataYangmeminta = data;
            });

            ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
                $scope.listDataYangMemberikan = data;
            });

            ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
                $scope.listDataMengetahui = data;
            });
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);

            $scope.idSequence = 1;
            $scope.isInputMode = true;
            $scope.idDataPelayananRepacking = "";

            $scope.DataPelayananRepacking = [];
            $scope.AddDataPelayananRepacking = function() {
                var data = {
                    'id': $scope.idSequence,
                    'kodeBarang': $scope.temp.barang.kdProduk,
                    'namaBarang': $scope.temp.barang.namaProduk,
                    'satuan': $scope.temp.barang.satuanStandar.satuanStandar,
                    // 'kebutuhan': $scope.item.kebutuhan,
                    'qty': $scope.temp.qty,
                    'harga': $scope.temp.harga,
                    'subtotal': $scope.temp.harga
                };

                $scope.temp = {};
                $scope.DataPelayananRepacking.push(data);
                $scope.idSequence++;
            }

            $scope.EditDataPelayananRepacking = function() {
                var data = _.find($scope.DataPelayananRepacking, function(data) {
                    return data.id == $scope.idDataHandlingCytotoxic;
                });

                data.kodeBarang = $scope.temp.kodeBarang,
                    data.namaBarang = $scope.temp.namaBarang,
                    data.satuan = $scope.temp.satuan,
                    data.kebutuhan = $scope.temp.kebutuhan,
                    data.qty = $scope.temp.qty,
                    data.harga = $scope.temp.harga,
                    data.subtotal = $scope.temp.harga

                $scope.isInputMode = true;

                $scope.temp = {};
            }

            $scope.getEditData = function(id) {
                $scope.idDataPelayananRepacking = id;
                $scope.isInputMode = false;

                var data = _.find($scope.DataPelayananRepacking, function(data) {
                    return data.id == id;
                });

                $scope.temp.kodeBarang = data.kodeBarang;
                $scope.temp.namaBarang = data.namaBarang;
                $scope.temp.satuan = data.satuan;
                $scope.temp.kebutuhan = data.kebutuhan;
                $scope.temp.qty = data.qty;
                $scope.temp.harga = data.harga;
                $scope.temp.harga = data.subtotal;
            }


            $scope.removeDataPelayananRepacking = function(data) {
                $scope.DataPelayananRepacking = _.without($scope.DataPelayananRepacking, data);
            }

            $scope.Save = function() {
                managePasien.saveRepacking(ModelItem.beforePost({
                    listObat: $scope.DataPelayananRepacking,
                    produksi: $scope.item
                }));
            }
            $scope.showDetailData = function(id) {
                var data = _.find($scope.DataPelayananRepacking, function(data) {
                    return data.id == id;
                });


                if (data.statVisible) {
                    data.statVisible = false;
                } else {
                    data.statVisible = true;
                }
            }

        }
    ]);
});