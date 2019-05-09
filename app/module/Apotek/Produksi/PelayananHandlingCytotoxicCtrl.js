define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PelayananHandlingCytotoxicCtrl', ['ManagePasien', 'FindPasien', '$state', '$rootScope', '$scope', 'ModelItem',
        function(managePasien, findPasien, $state, $rootScope, $scope, ModelItem) {
            $scope.cek = "PelayananHandlingCytotoxicCtrl";
            $scope.dataVOloaded = true;

            $scope.item = {};
            $scope.temp = {};
            if ($state.params.noRec !== '') {

                findPasien.getByNoRegistrasi($state.params.noRec).then(function(e) {
                    $scope.data = e.data;
                });
            }
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            $scope.now = new Date();
            $scope.find = function() {
                $state.go('PelayananHandlingCytotoxicfind');
            }
            ModelItem.getDataDummyGeneric("Storage", false, false, undefined, undefined, '**').then(function(data) {
                $scope.listDataStorage = data;
            })
            $scope.idSequence = 1;
            $scope.isInputMode = true;
            $scope.idDataHandlingCytotoxic = "";

            $scope.DataHandlingCytotoxic = [];
            $scope.AddDataHandlingCytotoxic = function() {
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
                $scope.DataHandlingCytotoxic.push(data);
                $scope.idSequence++;
            }

            $scope.EditDataHandlingCytotoxic = function() {
                var data = _.find($scope.DataHandlingCytotoxic, function(data) {
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
                $scope.idDataHandlingCytotoxic = id;
                $scope.isInputMode = false;

                var data = _.find($scope.DataHandlingCytotoxic, function(data) {
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


            $scope.removeDataHandlingCytotoxic = function(data) {
                $scope.DataHandlingCytotoxic = _.without($scope.DataHandlingCytotoxic, data);
            }

            $scope.Save = function() {
                var data = [];
                for (var key in $scope.DataHandlingCytotoxic) {
                    if ($scope.DataHandlingCytotoxic.hasOwnProperty(key)) {
                        var element = $scope.DataHandlingCytotoxic[key];
                        data.push({
                            "kdBarang": element.kodeBarang,
                            "satuan": element.satuan,
                            "qty": element.qty,
                            "namaBarang": element.namaBarang,
                            "harga": element.harga
                        });
                    }
                }
                managePasien.saveCytotoxic(ModelItem.beforePost({
                    "tglExpired": $scope.item.produksi.tglExpired,
                    "jasa": $scope.item.produksi.jasa,
                    "tanggal": $scope.item.tanggal,
                    "pelayananCytotoxic": data,
                    "unitCost": $scope.item.produksi.unitCost,
                    "osm": "0",
                    "volume": $scope.item.produksi.volume,
                    "tglRegistrasi": $scope.data.tglRegistrasi,
                    "pasien": $scope.data.pasien,
                    "storage": $scope.item.produksi.storage
                }));
                // {
                //     listObat: $scope.DataHandlingCytotoxic,
                //     produksi: $scope.item,
                //     pasien: $scope.data
                // }
            }
        }
    ]);
});