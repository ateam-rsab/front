define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('KonfirmasiReturKirimCtrl', ['ManageSarpras', '$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper',
        function(manageSarpras, $state, findSarpras, $rootScope, $scope, ModelItem, DateHelper) {
            // duplicate from KirimProdukCtrl
            $scope.now = new Date();
            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuangan = data;
            })
            ModelItem.getDataDummyGeneric("AsalProduk", false).then(function(data) {
                $scope.listAsalProduk = data;
            })
            // $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            // ModelItem.getDataDummyGeneric("KelompokProduk", false).then(function(data) {
            //     $scope.listKelompokBarang = data;
            // })
            // // ModelItem.getDataDummyGeneric("SatuanStandard", false).then(function(data) {
            // //     $scope.listSatuanStandard = data;
            // // })

            $scope.dataOrder = new kendo.data.DataSource({
                data: [],
                aggregate: [
                    { field: "total", aggregate: "sum" }
                ],
                schema: {
                    model: {
                        id: "noRecKirimProduk",
                        fields: {
                            noRetur: {editable: false, type: "number"},
                            namaProduk: {editable: false, type: "string"},
                            ruanganAsal: {editable: false, type: "string"},
                            ruanganTujuan: {editable: false, type: "string"},
                            hargaSatuan: {editable: false, type: "string"},
                            saldo: {editable: false, type: "number"},
                            qtyProdukRetur: {editable: false, type: "number"},
                            qtyKonfirmasi: {type: "number"},
                            satuanStandar: {editable: false, type: "string"},
                            total: {editable: false, type: "number"}
                        }
                    }
                },
                pageSize: 20,
                editable: true,
                change: function(e) {
                    if (e.action === "add" || e.action === "itemchange") {
                        e.items[0].total = e.items[0].hargaSatuan * e.items[0].qtyKonfirmasi;
                        $scope.dataOrder.fetch();
                        $scope.item.totalBiaya = $scope.dataOrder.aggregates().total.sum;
                    }
                }
            });
            
            if ($state.params.noRec !== undefined) {
                $scope.isOrder = true;
                findSarpras.getDetilRetur($state.params.noRec).then(function(e) {
                    // debugger;
                    var data = ModelItem.beforePost(e.data)
                    $scope.item = data.header;
                    $scope.item.ruanganAsal = {
                        id: $scope.item.ruanganAsalId,
                        namaRuangan: $scope.item.ruanganAsal
                    };
                    $scope.item.ruanganTujuan = {
                        id: $scope.item.ruanganTujuanId,
                        namaRuangan: $scope.item.ruanganTujuan
                    };
                    $scope.item.tanggalRetur = DateHelper.getPeriodeFormatted($scope.item.tanggalRetur);
                    // $scope.item.ruanganPemesan = data.ruangan;
                    // $scope.namaPemesan = data.pegawaiOrder.namaLengkap;
                    // $scope.item.kelompokBarang = {
                    //     id: $scope.item.statusBarang.id,
                    //     kelompokProduk: $scope.item.statusBarang.name,
                    // }

                    // var items = [];
                    for (var key in e.data.detail) {
                        if (e.data.detail.hasOwnProperty(key)) {
                            var element = e.data.detail[key];
                             $scope.dataOrder.add({
                                noRec: element.noRec,
                                noRetur: element.noRetur,
                                namaProduk: element.namaProduk,
                                ruanganAsal: element.ruanganAsal,
                                ruanganTujuan: element.ruanganTujuan,
                                hargaSatuan: element.hargaSatuan,
                                saldo: element.saldo,
                                qtyProdukRetur: element.qtyProdukRetur,
                                qtyKonfirmasi: element.qtyKonfirmasi === undefined ? element.qtyProdukRetur : element.qtyKonfirmasi,
                                satuanStandar: element.satuanStandar,
                                total: element.total === undefined ? 0 : element.total
                            });
                        }
                    }
                });
            }
            $scope.optionsDataPenerimaan = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                pageable: true,
                editable: true,
                columns: [{
                    "field": "noRetur",
                    "title": "No Retur",
                    "width": 80
                },{
                    "field": "namaProduk",
                    "title": "Nama Produk",
                    "width": 200
                },
                {
                    "field": "ruanganAsal",
                    "title": "Ruangan Asal",
                    "width": 200
                },
                {
                    "field": "ruanganTujuan",
                    "title": "Ruangan Tujuan",
                    "width": 200
                },{
                    "field": "hargaSatuan",
                    "title": "Harga Satuan",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    filterable: false,
                    width: 80
                },
                {
                    "field": "saldo",
                    "title": "Saldo",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 60,
                    filterable: false
                },
                {
                    "field": "qtyProdukRetur",
                    "title": "Qty Retur",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 80,
                    filterable: false
                },
                {
                    "field": "qtyKonfirmasi",
                    "title": "Qty Konfirmasi",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 100,
                    filterable: false
                },
                {
                    "field": "satuanStandar",
                    "title": "Satuan",
                    filterable: false,
                    "width": 100,
                },
                {
                    "field": "total",
                    "title": "Total",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    filterable: false,
                    "aggregates": "[\"sum\"]",
                    "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>",
                    "width": 100,
                }]
            };
            $scope.update = function(data, dataItem, columns) {
                $scope.data = data;
                $scope.columns = columns;
                $scope.dataItem = dataItem;

                // console.log(data);
                debugger;
            };
            $scope.formatHarga = {
                culture: "de-DE",
                format: "{0:n0}"
            }
            $scope.Save = function() {
                var listRawRequired = [
                    // "item.tanggalKonfirmasi|k-ng-model|Tanggal retur",
                    // "item.keterangan|ng-model|Keterangan"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var data = [];
                    for (var key in $scope.dataOrder._data) {
                        if ($scope.dataOrder._data.hasOwnProperty(key)) {
                            var element = $scope.dataOrder._data[key];
                            if (element.qtyKonfirmasi === 0) {
                                window.messageContainer.error("Qty konfirmasi tidak boleh kosong");
                                return;
                            } else {
                                if (element.qtyKonfirmasi <= element.qtyProdukRetur) { 
                                    data.push({
                                        "noRec": element.noRec,
                                        "qtyProdukTerima": element.qtyKonfirmasi
                                    });
                                }
                            }
                        }
                    }
                    
                    if (data.length !== 0) {
                        var tempData = {
                            // "tanggalRetur": DateHelper.getPeriodeFormatted($scope.item.tanggalRetur),
                            // "keterangan": $scope.item.keterangan,
                            "requestBarangDariRuanganDetail": data
                        }
                        manageSarpras.saveDataSarPras(tempData, "retur-ruangan/save-verifikasi-pengiriman/").then(function(e){
                            // console.log(JSON.stringify(e.data));
                            $scope.isNext = true;
                        });
                    } else {
                        window.messageContainer.error("Data belum lengkap");
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.Back = function(){
                window.history.back();
            }

        }
    ]);
});