define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('KirimProdukCtrl', ['ManageSarpras', '$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem',
        function(manageSarpras, $state, findSarpras, $rootScope, $scope, ModelItem) {
            $scope.listJenisPemeriksaan = [{ name: "Amprahan", id: 1 },
                { name: "Transfer", id: 2 }
            ]
            $scope.now = new Date();
            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuanganTujuan = data;
            })
            ModelItem.getDataDummyGeneric("AsalProduk", false).then(function(data) {
                $scope.listAsalProduk = data;
            })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            ModelItem.getDataDummyGeneric("KelompokProduk", false).then(function(data) {
                $scope.listKelompokBarang = data;
            })
            ModelItem.getDataDummyGeneric("SatuanStandard", false).then(function(data) {
                $scope.listSatuanStandard = data;
            })
            $scope.addProduk = function() {
                $scope.dataOrder.add($scope.tempItem);
                $scope.tempItem = undefined;
            }
            if (
                $state.params.noRecOrder !== '' && $state.params.noRec === '') {
                $scope.isOrder = true;
                findSarpras.getOrderDetailBarang($state.params.noRecOrder).then(function(e) {
                    var data = ModelItem.beforePost(e.data.data)
                    $scope.item = data;
                    $scope.item.ruanganPemesan = data.ruangan;
                    $scope.namaPemesan = data.pegawaiOrder.namaLengkap;
                    $scope.item.kelompokBarang = {
                        id: $scope.item.statusBarang.id,
                        kelompokProduk: $scope.item.statusBarang.name,
                    }
                    var items = [];
                    for (var key in e.data.data.orderPelayanan) {
                        if (e.data.data.orderPelayanan.hasOwnProperty(key)) {
                            var element = e.data.data.orderPelayanan[key];
                            items.push({
                                NamaBarang: element.produk,
                                asalProduk: element.asalProduk,
                                stok: element.stokLogistik === undefined ? 0 : element.stokLogistik,
                                qty: element.qtyProduk,
                                qtyOrder: element.qtyProduk,
                                satuan: element.satuanStandar
                            });
                        }
                    }
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: items
                    });
                });
            } else {
                $scope.isOrder = true;
                findSarpras.getKirimDetailBarang($state.params.noRec).then(function(e) {
                    var dataKirim;
                    var data = dataKirim = ModelItem.beforePost(e.data.data)
                    data = data.noorder;
                    $scope.item = data;
                    $scope.item.noOrder = data.noOrderIntern;
                    $scope.item.ruanganPemesan = data.ruangan;
                    $scope.item.noKirim = dataKirim.nokirim;
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
                                // isHide: true,
                                stok: element.qtyStokCurrent === undefined ? 0 : element.qtyStokCurrent,
                                qty: element.qtyProduk,
                                qtyOrder: element.qtyOrder,
                                satuan: element.satuanStandar
                            });
                        }
                    }
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: items
                    });
                });
            }
            $scope.dataOrder = new kendo.data.DataSource({
                data: [],
                change: function(e){
                    console.log("change : "+ e.action)
                }
            });
            $scope.columnOrder = [{
                    "field": "NamaBarang.namaProduk",
                    "title": "Nama Barang"
                },
                {
                    "field": "asalProduk",
                    "title": "Sumber Dana",
                    "template": "<input kendo-combo-box k-ng-model=\"dataItem.asalProduk\" k-data-text-field=\"'asalProduk'\" k-data-value-field=\"'id'\" k-data-source=\"listAsalProduk\"  k-on-change=\"update(data, dataItem, columns)\" style=\"width: 100%\" ></input>"
                    // template: '<input style="width: 100%;" kendo-combo-box k-ng-model="dataItem.asalProduk" k-data-text-field="\'asalProduk\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-auto-bind="false" k-data-source="listAsalProduk" k-on-change=\"update(data, columns, dataItem)\" />'
                    // template: '<span ng-show="dataItem.isHide" >{{dataItem.asalProduk.asalProduk}}</span><input ng-hide="dataItem.isHide" style="width: 100%;" kendo-combo-box k-ng-model="dataItem.asalProduk" k-data-text-field="\'asalProduk\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-auto-bind="false" k-data-source="listAsalProduk"/>'
                },
                {
                    "field": "stok",
                    "title": "Saldo",
                    type: "number"
                },
                {
                    "field": "qtyOrder",
                    "title": "Qty Order",
                    type: "number"
                }, {
                    "field": "qty",
                    "title": "Qty Kirim",
                    type: "number",
                    template: '<input type="number" ng-model="dataItem.qty"/>',
                },

                {
                    "field": "satuan.satuanStandar",
                    "title": "Satuan"
                }
            ];
            $scope.update = function(data, dataItem, columns) {
                $scope.data = data;
                $scope.columns = columns;
                $scope.dataItem = dataItem;

                console.log(data);
                debugger;
            };
            $scope.notf1Options = {
                position: {
                    pinned: true,
                    top: 30,
                    right: 30
                },
                autoHideAfter: 3000,
                stacking: "down",
                templates: [{
                    type: "ngTemplate",
                    template: $("#notificationTemplate").html()
                }]
            };

            $scope.showPopup = function () {
                $scope.notf1.show({
                    title: "Informasi",
                    message: $scope.messages
                }, "ngTemplate");
            }
            $scope.Save = function() {
                var data = [];
                for (var key in $scope.dataOrder._data) {
                    if ($scope.dataOrder._data.hasOwnProperty(key)) {
                        var element = $scope.dataOrder._data[key];
                        // if (element.asalProduk === undefined) {
                        // } else {
                            if (element.stok === 0) {
                                $scope.messages = "Stok " + element.NamaBarang.namaProduk + " saat ini: <b>" + element.stok + "</b> buah, Pesanan Belum dapat dikirim";
                                $scope.showPopup();
                                return;
                            } else {
                                if (element.stok !== 0 ) { 
                                    if (element.qty < element.stok) { 
                                        data.push({
                                            "qty": element.qty,
                                            "qtyOrder": element.qtyOrder,
                                            "satuanStandar": {
                                                id: element.satuan.id
                                            },
                                            'asalProduk': element.asalProduk,
                                            "stok": element.stok,
                                            "produk": {
                                                "id": element.NamaBarang.id
                                            }
                                        });
                                    }
                                }
                            }

                        // }
                    }
                }
                
                if (data.length !== 0) {
                    var tempData = {
                        "noOrder": $state.params.noRecOrder,
                        "requestBarangDariRuanganDetail": data,
                        "tglOrder": $scope.item.tglOrder,
                        "ruangan": {
                            "id": $scope.item.ruanganPemesan.id
                        },
                        "ruanganTujuan": {
                            "id": $scope.item.ruanganTujuan.id
                        },
                        "jenisPermintaanVO": {
                            "id": $scope.item.jenisPermintaan.id
                        },
                        "statusBarang": {
                            "id": $scope.item.kelompokBarang.id
                        }
                    }

                    // manageSarpras.saveKirimProduk(tempdata).then(function(e){
                    //     console.log(e.data);
                    // });
                    manageSarpras.saveDataSarPras(tempData, "request-permintaan-barang/save-request-kirim-barang/").then(function(e){
                        console.log(JSON.stringify(e.data));
                        $scope.isNext = true;
                    });
                    // manageSarpras.saveKirimProduk(ModelItem.beforePost({
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
                    $scope.messages = "Peringatan, Data belum lengkap";
                    $scope.showPopup();
                }
            }

            $scope.Back = function(){
                window.history.back();
            }

        }
    ]);
});