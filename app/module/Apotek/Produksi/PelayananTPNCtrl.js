define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PelayananTPNCtrl', ['ManagePasien', 'FindPasien', '$state', '$rootScope', '$scope', 'ModelItem',
        function(managePasien, findPasien, $state, $rootScope, $scope, ModelItem) {
            $scope.cek = "PelayananTPNCtrl";
            $scope.dataVOloaded = true;
            $rootScope.isOpen = true;
            $scope.item = {};
            $scope.temp = {};
            if ($state.params.noRec !== '') {
                findPasien.getByNoRegistrasi($state.params.noRec).then(function(e) {
                    $scope.data = e.data;
                });
            }

            var arrFieldSelectVoJenisKelamin = ['id', 'name'];
            ModelItem.getKendoSource("OrderTpn", arrFieldSelectVoJenisKelamin, false).then(function(data) {
                $scope.listOrderTpn = data;
            });

            ModelItem.getDataDummyGeneric("Storage", false, false, undefined, undefined, '**').then(function(data) {
                $scope.listDataStorage = data;
            })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            $scope.now = new Date();
            $scope.find = function() {
                $state.go('PelayananTPNFind');
            }
            $scope.idSequence = 1;
            $scope.isInputMode = true;
            $scope.idDataHandlingCytotoxic = "";

            $scope.DataHandlingCytotoxic = [];
            $scope.AddDataHandlingCytotoxic = function() {
                var data = {
                    'id': $scope.idSequence,
                    'kodeBarang': $scope.temp.barang.kdProduk,
                    'barang': $scope.temp.barang,
                    'satuan': $scope.temp.barang.satuanStandar.satuanStandar,
                    // 'kebutuhan': $scope.item.kebutuhan,
                    'qty': $scope.temp.qty,
                    'harga': $scope.temp.harga,
                    'per24': $scope.temp.per24,
                    'order': $scope.temp.order,
                    'kebutuhan': $scope.temp.kebutuhan,
                    'subTotal': $scope.temp.harga
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
                    data.barang = $scope.temp.barang,
                    data.satuan = $scope.temp.satuan,
                    data.kebutuhan = $scope.temp.kebutuhan,
                    data.qty = $scope.temp.qty,
                    data.harga = $scope.temp.harga,
                    data.per24 = $scope.temp.per24,
                    data.order = $scope.temp.order,
                    data.kebutuhan = $scope.temp.kebutuhan,
                    data.subTotal = $scope.temp.harga

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
                $scope.temp.barang = data.barang;
                $scope.temp.satuan = data.satuan;
                $scope.temp.kebutuhan = data.kebutuhan;
                $scope.temp.qty = data.qty;
                $scope.temp.harga = data.harga;
                $scope.temp.subTotal = data.harga * data.qty;

                $scope.temp.per24 = data.per24;
                $scope.temp.order = data.order;
                $scope.temp.kebutuhan = data.kebutuhan;
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
                            "orderTpn": element.order,
                            "order": element.barang,
                            "kebutuhan": element.kebutuhan,
                            "per24": element.per24,
                            "harga": element.harga,
                            "subTotal": element.subTotal
                        });
                    }
                }
                managePasien.saveTpn(ModelItem.beforePost({
                    "tglExpired": $scope.item.produksi.tglExpired,
                    "jasa": $scope.item.produksi.jasa,
                    "tanggal": $scope.item.tanggal,
                    "pelayananTpnSet": data,
                    "unitCost": $scope.item.produksi.unitCost,
                    "osm": "0",
                    "volume": $scope.item.produksi.volume,
                    "tglRegistrasi": $scope.data.tglRegistrasi,
                    "pasien": $scope.data.pasien,
                    "storage": $scope.item.produksi.storage
                })).then(function(e) {
                    
                    $scope.item.produksi.noProduksi = e.data.data.noProduksi;
                });
                // managePasien.saveTpn(ModelItem.beforePost({
                //     listObat: $scope.DataHandlingCytotoxic,
                //     produksi: $scope.item,
                //     pasien: $scope.data
                // }));
            }
        }
    ]);
});