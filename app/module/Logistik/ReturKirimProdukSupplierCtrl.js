define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('ReturKirimProdukSupplierCtrl', ['ManageSarpras', '$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper',
        function(manageSarpras, $state, findSarpras, $rootScope, $scope, ModelItem, DateHelper) {
            // duplicate from KirimProdukCtrl
            $scope.now = new Date();
            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuanganTujuan = data;
            })
            ModelItem.getDataDummyGeneric("AsalProduk", false).then(function(data) {
                $scope.listAsalProduk = data;
            })
            $scope.sourceSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            // manageSarpras.getListData("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.sourceSuplier = data;
            // })
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            ModelItem.getDataDummyGeneric("KelompokProduk", false).then(function(data) {
                $scope.listKelompokBarang = data;
            })
            // ModelItem.getDataDummyGeneric("SatuanStandard", false).then(function(data) {
            //     $scope.listSatuanStandard = data;
            // })
            $scope.formatHarga = {
                culture: "de-DE",
                format: "{0:n0}"
            }
            $scope.addProduk = function() {
                $scope.dataOrder.add($scope.tempItem);
                $scope.tempItem = undefined;
            }
            $scope.dataOrder = new kendo.data.DataSource({
                data: [],
                aggregate: [
                    { field: "total", aggregate: "sum" }
                ],
                schema: {
                    model: {
                        id: "noRecDetail",
                        fields: {
                            namaProduk: {editable: false, type: "string"},
                            asalProduk: {editable: false, type: "string"},
                            hargaSatuan: {editable: false, type: "number"},
                            qty: {editable: false, type: "number"},
                            qtyRetur: {type: "number"},
                            satuan: {editable: false, type: "string"},
                            total: {editable: false, type: "number"}
                        }
                    }
                },
                change: function(e){
                    if (e.action === "itemchange") {
                        e.items[0].total = e.items[0].hargaSatuan * e.items[0].qtyRetur;
                        $scope.dataOrder.fetch();
                        $scope.item.totalBiaya = $scope.dataOrder.aggregates().total.sum;
                    }
                }
            });
            if (
                $state.params.noRec !== '') {
                $scope.isOrder = true;
                manageSarpras.getDetilTerimaSupplier($state.params.noRec).then(function(e) {
                    var data = ModelItem.beforePost(e.data)
                    $scope.item = data.header;
                    var items = [];
                    for (var key in data.detail) {
                        if (data.detail.hasOwnProperty(key)) {
                            var element = data.detail[key];
                            $scope.dataOrder.add({
                                noRec: element.noRecDetail,
                                namaProduk: element.namaProduk,
                                asalProduk: element.asalProduk,
                                hargaSatuan: element.hargaSatuan,
                                qty: element.qtyProduk,
                                qtyRetur: element.qtyRetur === undefined ? 0 : element.qtyRetur,
                                satuan: element.satuanStandar
                            });
                        }
                    }
                });
            } else { }
            $scope.columnOrder = [{
                    "field": "namaProduk",
                    "title": "Nama Produk"
                },
                {
                    "field": "asalProduk",
                    "title": "Sumber Dana"
                },{
                    "field": "hargaSatuan",
                    "title": "Harga Satuan",
                    format: "{0:n0}",
                    attributes: {
                        style: "text-align:right"
                    }
                },
                {
                    "field": "qty",
                    "title": "Saldo",
                    type: "number",
                    attributes: {
                        style: "text-align:right"
                    }
                },
                {
                    "field": "qtyRetur",
                    "title": "Qty Retur",
                    attributes: {
                        style: "text-align:right"
                    }
                },
                {
                    "field": "satuan",
                    "title": "Satuan"
                },
                {
                    "field": "total",
                    "title": "Total",
                    format: "{0:n0}",
                    attributes: {
                        style: "text-align:right"
                    }
                }
            ];
            $scope.Save = function() {
                var listRawRequired = [
                    "item.tglRetur|k-ng-model|Tanggal retur",
                    "item.keterangan|ng-model|Keterangan"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var data = [];
                    for (var key in $scope.dataOrder._data) {
                        if ($scope.dataOrder._data.hasOwnProperty(key)) {
                            var element = $scope.dataOrder._data[key];
                            // if (element.asalProduk === undefined) {
                            // } else {
                                if (element.qtyRetur > element.qty) {
                                    window.messageContainer.error("Qty retur melibihi Saldo Produk");
                                    // $scope.messages = "Stok " + element.NamaBarang.namaProduk + " saat ini: <b>" + element.stok + "</b> buah, Pesanan Belum dapat dikirim";
                                    // $scope.showPopup();
                                    return;
                                } else {
                                    if (element.qtyRetur !== 0 ) { 
                                        if (element.qtyRetur <= element.qty) { 
                                            data.push({
                                                "detail":{
                                                    "noRec":element.noRec
                                                },
                                                "qtyProdukRetur":element.qtyRetur
                                            });
                                        }
                                    }
                                }
                            // }
                        }
                    }
                    
                    if (data.length !== 0) {
                        var tempData = {
                            "tanggalRetur": DateHelper.getPeriodeFormatted($scope.item.tglRetur),
                            "keterangan": $scope.item.keterangan,
                            "returDetail": data
                        }
                        manageSarpras.saveDataSarPras(tempData, "retur-supplier/save-retur-supplier").then(function(e){
                            manageSarpras.getOrderList("request-permintaan-barang/get-no-retur").then(function(data){
                                $scope.item.noRetur = data.data.noRetur;
                            })
                            // console.log(JSON.stringify(e.data));
                            $scope.isNext = true;
                        });
                    } else {
                        window.messageContainer.error("Data tidak dapat di proses")
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