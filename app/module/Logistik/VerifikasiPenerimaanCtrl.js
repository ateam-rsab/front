define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('VerifikasiPenerimaanCtrl', ['ManageSarpras', '$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem',
        function(ManageSarpras, $state, findSarpras, $rootScope, $scope, ModelItem) {
            $scope.listJenisPemeriksaan = [{ name: "Amprahan", id: 1 },
                { name: "Transfer", id: 2 }
            ]
            $scope.now = new Date();
            $scope.dats = {};
            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuanganTujuan = data;
            })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            ModelItem.getDataDummyGeneric("KelompokProduk", false).then(function(data) {
                $scope.listKelompokBarang = data;
            })
            ModelItem.getDataDummyGeneric("SatuanStandar", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })
            $scope.addProduk = function() {
                $scope.dataOrder.add($scope.tempItem);
                $scope.tempItem = undefined;
            }
            findSarpras.getKirimDetailBarang($state.params.noRec).then(function(e) {
                debugger;
                var dataKirim;
                var data = dataKirim = ModelItem.beforePost(e.data.data)
                data = data.noorder;
                $scope.item = data;
                $scope.item.noOrder = data.noOrderIntern;
                $scope.item.ruanganPemesan = data.ruangan;
                $scope.item.noKirim = dataKirim.nokirim;
                $scope.item.jenisPermintaan = { "name": data.jenisPermintaan.name, "id": data.jenisPermintaan.id }
                $scope.namaPemesan = data.pegawaiOrder.namaLengkap;
                $scope.item.kelompokBarang = {
                    id: $scope.item.statusBarang.id,
                    kelompokProduk: $scope.item.statusBarang.name,
                }
                var items = [];
                for (var key in e.data.data.kirimProduk) {
                    if (e.data.data.kirimProduk.hasOwnProperty(key)) {
                        var element = e.data.data.kirimProduk[key];
                        items.push({
                            NamaBarang: element.produk,
                            asalProduk: element.asalProduk,
                            isHide: true,
                            stok: element.qtyProduk,
                            qtyKirim: element.qtyProdukKonfirmasi,
                            qtyTerima: element.qtyTerima === undefined ? element.qtyProdukKonfirmasi : element.qtyTerima,
                            noRec: element.noRec,
                            qtyOrder: element.qtyOrder,
                            satuan: element.satuanStandar,
                            keterangan: element.keterangan
                        });
                    }
                }
                
                $scope.dataOrder = new kendo.data.DataSource({
                    data: items,
                    schema: {
                        model: {
                            id: "noRec",
                            fields: {
                                NamaBarang: {editable: false},
                                satuan: {editable: false},
                                asalProduk: {editable: false},
                                stok: {type: "number",  editable: false},
                                qtyOrder: {type: "number", editable: false},
                                qtyKirim: {type: "number", editable: false},
                                qtyTerima: {type: "number"},
                                keterangan: {type: "string"}
                            }
                        }
                    }
                });
            });
            $scope.columnOrder = [{
                    "field": "NamaBarang.namaProduk",
                    "title": "Nama Barang",
                    width: 300
                }, {    
                    "field": "asalProduk.asalProduk",
                    "title": "Sumber Dana",
                    editable: false
                },
                {
                    "field": "stok",
                    "title": "Saldo",
                },
                {
                    "field": "qtyOrder",
                    "title": "Qty Order",
                },
                {
                    "field": "qtyKirim",
                    "title": "Qty Kirim",
                },
                {
                    "field": "qtyTerima",
                    "title": "Qty Terima",
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                }
                ,
                {
                    "field": "satuan",
                    "title": "Satuan",
                    "width": "150px",
                    template: "#= satuan.satuanStandar #"
                }
            ];
            $scope.Save = function() {
                var listRawRequired = [
                    "item.tglOrder|k-ng-model|Tanggal konfirmasi"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var data = [];
                    for (var key in $scope.dataOrder._data) {
                        if ($scope.dataOrder._data.hasOwnProperty(key)) {
                            var element = $scope.dataOrder._data[key];
                            debugger;
                            if (element.qtyTerima > 0 && element.qtyTerima <= element.qtyKirim )
                                data.push({
                                    "noRec": element.noRec,
                                    "qtyProdukTerima": element.qtyTerima,
                                    // "qty": element.qty,
                                    // "qtyOrder": element.qtyOrder,
                                    "satuanStandar": {
                                        id: element.satuan.id
                                    }
                                    // 'asalProduk': element.asalProduk,
                                    // "stok": element.stok,
                                    // "produk": {
                                    //     "id": element.NamaBarang.id
                                    // }
                                });
                        }
                    }
                    $scope.dats.requestBarangDariRuanganDetail = data;

                    if (data.length !== 0) {
                        ManageSarpras.saveDataSarPras($scope.dats, "request-permintaan-barang/save-verifikasi-pengiriman/").then(function(e){
                            // console.log(JSON.stringify(e.data));
                            ManageSarpras.getOrderList("request-permintaan-barang/get-no-retur").then(function(data){
                                $scope.item.noRetur = data.data.noRetur;
                            })
                            $scope.isNext = true;
                        })
                        // .then(function(){
                        // });
                    } else {
                        window.messageContainer.error('Data tidak valid');
                    }

                    // ManageSarpras.saveVerifikasiKirim(ModelItem.beforePost({
                    //     "noOrder": $state.params.noRecOrder,
                    //     "requestBarangDariRuanganDetail": data,
                    //     "tglOrder": $scope.item.tglOrder,
                    //     "ruangan": {
                    //         "id": $scope.item.ruanganPemesan.id
                    //     },
                    //     "ruanganTujuan": {
                    //         "id": $scope.item.ruanganTujuan.id
                    //     },
                    //     "jenisPermintaanVO": {
                    //         "id": $scope.item.jenisPermintaan.id
                    //     },
                    //     "statusBarang": {
                    //         "id": $scope.item.kelompokBarang.id
                    //     }
                    // }));
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.Back = function() {
                window.history.back();
            }
        }
    ]);
});