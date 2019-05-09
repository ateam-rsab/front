define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('ReturKirimProdukCtrl', ['ManageSarpras', '$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper',
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
                            jenisProduk: {editable: false, type: "object"},
                            NamaBarang: {editable: false, type: "object"},
                            asalProduk: {editable: false, type: "object"},
                            hargaSatuan: {editable: false, type: "string"},
                            qty: {editable: false, type: "number"},
                            qtyRetur: {type: "number"},
                            satuan: {editable: false, type: "object"},
                            total: {editable: false, type: "number"}
                        }
                    }
                },
                pageSize: 20,
                change: function(e) {
                    if (e.action === "add") {
                        $scope.item.totalBiaya = $scope.dataOrder.aggregates().total.sum;
                    }
                    if (e.action === "itemchange") {
                        e.items[0].total = e.items[0].hargaSatuan * e.items[0].qtyRetur;
                        // debugger;
                        $scope.dataOrder.fetch();
                        $scope.item.totalBiaya = $scope.dataOrder.aggregates().total.sum;
                    }
                }
            });
            
            if ($state.params.noRec !== undefined) {
                $scope.isOrder = true;
                findSarpras.getDetilPenerimaan($state.params.noRec).then(function(e) {
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
                    $scope.item.tglKirim = DateHelper.getPeriodeFormatted($scope.item.tanggalKirim);
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
                                noRec: element.noRecKirimProduk,
                                jenisProduk: {
                                    id: element.jenisProdukId,
                                    jenisProduk: element.jenisProduk
                                },
                                NamaBarang: {
                                    id: element.produkId,
                                    namaProduk: element.namaProduk
                                },
                                asalProduk: {
                                    id: element.asalProdukId,
                                    asalProduk: element.asalProduk
                                },
                                noRecStrukKonfrmasi: element.noRecStrukKonfrmasi,
                                hargaSatuan: element.hargaSatuan,
                                qty: element.qty,
                                qtyRetur: element.stokLogistik === undefined ? 0 : element.stokLogistik,
                                satuan: {
                                    id: element.satuanStandarId,
                                    satuanStandar: element.satuanStandar
                                },
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
                    "field": "jenisProduk",
                    "title": "Jenis Produk",
                    "template": "#=jenisProduk.jenisProduk#"
                },{
                    "field": "NamaBarang",
                    "title": "Nama Produk",
                    "template": "#=NamaBarang.namaProduk#"
                },
                {
                    "field": "asalProduk",
                    "title": "Sumber Dana",
                    "template": "#=asalProduk.asalProduk#"
                },{
                    "field": "hargaSatuan",
                    "title": "Harga Satuan",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    filterable: false
                },
                {
                    "field": "qty",
                    "title": "Saldo",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 60,
                    filterable: false
                },
                {
                    "field": "qtyRetur",
                    "title": "Qty Retur",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 120,
                    filterable: false
                },
                {
                    "field": "satuan",
                    "title": "Satuan",
                    "template": "#=satuan.satuanStandar#",
                    filterable: false
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
                    "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"
                }]
            };
            $scope.update = function(data, dataItem, columns) {
                $scope.data = data;
                $scope.columns = columns;
                $scope.dataItem = dataItem;

                console.log(data);
                debugger;
            };
            $scope.formatHarga = {
                culture: "de-DE",
                format: "{0:n0}"
            }
            $scope.Save = function() {
                var listRawRequired = [
                    "item.tanggalRetur|k-ng-model|Tanggal retur",
                    "item.keterangan|ng-model|Keterangan"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var data = [];
                    for (var key in $scope.dataOrder._data) {
                        if ($scope.dataOrder._data.hasOwnProperty(key)) {
                            var element = $scope.dataOrder._data[key];
                            if (element.qtyRetur === 0) {
                                window.messageContainer.error("Qty retur tidak boleh kosong");
                                return;
                            } else {
                                if (element.qtyRetur <= element.qty) { 
                                    data.push({
                                        "kirimProduk": {
                                            "noRec": element.noRec
                                        },
                                        "qtyProdukRetur": element.qtyRetur
                                    });
                                }
                            }
                        }
                    }

                    if (data.length !== 0) {
                        var tempData = {
                            "tanggalRetur": DateHelper.getPeriodeFormatted($scope.item.tanggalRetur),
                            "keterangan": $scope.item.keterangan,
                            "returDetail": data
                        }
                        manageSarpras.saveDataSarPras(tempData, "retur-ruangan/save-retur-ruangan").then(function(e){
                            manageSarpras.getOrderList("request-permintaan-barang/get-no-retur").then(function(data){
                                $scope.item.noRetur = data.data.noRetur;
                            })
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