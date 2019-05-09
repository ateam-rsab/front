define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('KirimProdukRevCtrl', ['$sce', 'ManageSarpras', '$state', 'FindSarpras', '$rootScope', '$scope', 'ModelItem', 'PengajuanUsulanAnggaranService', 'DateHelper',
        function($sce, manageSarpras, $state, findSarpras, $rootScope, $scope, ModelItem, PengajuanUsulanAnggaranService, DateHelper) {
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
            manageSarpras.getListData("Pegawai&select=id,namaLengkap", true).then(function(e){
                $scope.listPegawai = e.data;
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
                    PengajuanUsulanAnggaranService.getKomponen("request-permintaan-barang/get-no-kirim", true).then(function(dat){
                        $scope.item.noKirim = dat.data.noKirim;
                    });
                    $scope.item.ruanganPemesan = data.ruangan;
                    $scope.namaPemesan = data.pegawaiOrder.namaLengkap;
                    $scope.item.kelompokBarang = {
                        id: $scope.item.statusBarang.id,
                        kelompokProduk: $scope.item.statusBarang.name,
                    }
                    if ($scope.item.jenisPermintaan === undefined)
                        $scope.item.jenisPermintaan = {
                            id: 1
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
                                qtyProdukKonfirmasi: element.qtyProduk,
                                satuan: element.satuanStandar,
                                namaKonfirmasi: element.namaKonfirmasi
                            });
                        }
                    }
                    $scope.dataOrder = new kendo.data.DataSource({
                        data: items,
                        schema: {
                            model: {
                                fields: {
                                    NamaBarang: {editable: false},
                                    satuan: {editable: false},
                                    asalProduk: { defaultValue: { id: 9999, asalProduk: "--Pilih asal produk"}},
                                    stok: {editable: false},
                                    qtyOrder: {editable: false},
                                    qty: {type: "number",  validation: { required: true}},
                                    qtyProdukKonfirmasi: {type: "number",  validation: { required: true}},
                                    namaKonfirmasi: {type: "string",  validation: { required: true}},
                                }
                            }
                        }
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
                                stok: element.stokLogistik === undefined ? element.qtyProduk : element.stokLogistik,
                                qtyOrder: element.qtyOrder === undefined ? element.qtyProduk : element.qtyOrder,
                                qtyProdukKonfirmasi: element.qtyProdukKonfirmasi === undefined ? element.stokLogistik : element.qtyProdukKonfirmasi,
                                satuan: element.satuanStandar,
                                namaKonfirmasi: element.namaKonfirmasi === undefined ? element.keterangan : element.namaKonfirmasi
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
                    "field": "NamaBarang",
                    "title": "Nama Barang",
                    width: 350,
                    template: "#=NamaBarang.namaProduk#",
                    editable: false
                },
                {
                    "field": "satuan",
                    "title": "Satuan",
                    width: 100,
                    template: "#=satuan.satuanStandar#",
                    editable: false
                },
                {
                    "field": "asalProduk",
                    "title": "Sumber Dana",
                    width: 200,
                    "template": "<input kendo-combo-box k-ng-model=\"dataItem.asalProduk\" k-data-text-field=\"'asalProduk'\" k-data-value-field=\"'id'\" k-data-source=\"listAsalProduk\" style=\"width: 100%\" ></input>"
                    // template: '<input style="width: 100%;" kendo-combo-box k-ng-model="dataItem.asalProduk" k-data-text-field="\'asalProduk\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-auto-bind="false" k-data-source="listAsalProduk" k-on-change=\"update(data, columns, dataItem)\" />'
                    // template: '<span ng-show="dataItem.isHide" >{{dataItem.asalProduk.asalProduk}}</span><input ng-hide="dataItem.isHide" style="width: 100%;" kendo-combo-box k-ng-model="dataItem.asalProduk" k-data-text-field="\'asalProduk\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-auto-bind="false" k-data-source="listAsalProduk"/>'
                },
                {
                    "field": "stok",
                    "title": "Saldo",
                    width: 80,
                    editable: false
                },
                {
                    "field": "qtyOrder",
                    "title": "Qty Order",
                    width: 80,
                    editable: false
                },
                {
                    title: "Konfirmasi",
                    columns: [{
                        "field": "qtyProdukKonfirmasi",
                        "title": "Qty",
                        width: 80,
                        editable: true
                    },
                    {
                        "field": "namaKonfirmasi",
                        "title": "Keterangan",
                        editable: true
                    }] 
                }
            ];
            $scope.update = function(data, dataItem, columns) {
                $scope.data = data;
                $scope.columns = columns;
                $scope.dataItem = dataItem;
            };
            $scope.Save = function() {
                var listRawRequired = [
                    "item.mengetahui|k-ng-model|Pegawai mengetahui",
                    "item.penanggungJawab|k-ng-model|Pegawai penanggung jawab"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var data = [];
                    for (var key in $scope.dataOrder._data) {
                        if ($scope.dataOrder._data.hasOwnProperty(key)) {
                            var element = $scope.dataOrder._data[key];
                            if (element.stok === 0) {
                                window.messageContainer.error('Stok tidak boleh kosong, Pesanan belum dapat dikirim');
                            } else {
                                if (element.stok !== 0 ) { 
                                    if (element.qtyProdukKonfirmasi <= element.stok) { 
                                        data.push({
                                            "qtyProduk": element.stok,
                                            "qtyProdukKonfirmasi": element.qtyProdukKonfirmasi,
                                            "qtyOrder": element.qtyOrder,
                                            "namaKonfirmasi": element.namaKonfirmasi,
                                            "satuanStandar": {
                                                id: element.satuan.id
                                            },
                                            'asalProduk': element.asalProduk,
                                            "produk": {
                                                "id": element.NamaBarang.id
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                    
                    if (data.length === $scope.dataOrder._data.length) {
                        var tempData = {
                            "noOrder": $state.params.noRecOrder,
                            "requestBarangDariRuanganDetail": data,
                            "tglOrder": DateHelper.getPeriodeFormatted($scope.item.tglOrder),
                            "pegawaiMengetahui": {
                                "id": $scope.item.mengetahui.id
                            },
                            "pegawaiPenanggungJawab": {
                                "id": $scope.item.penanggungJawab.id
                            },
                            // disable form keterangan
                            // "keterangan": $scope.item.keterangan,
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
                    
                        manageSarpras.saveDataSarPras(tempData, "request-permintaan-barang/save-request-kirim-barang/").then(function(response){
                            $scope.noRec = response.data.data.noRec;
                        }).then(function(){
                            $scope.isNext = true;
                            // $scope.isReport = true;
                        });
                    } else {
                        window.messageContainer.error('Peringatan, Data belum lengkap');
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.Back = function(){
                window.history.back();
            }

            $scope.cetak = function() {
                if ($scope.noRec !== undefined) {
                    var getDetailID = $scope.noRec;
                    console.log(getDetailID);
                    $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.reportKirimOrder(getDetailID));
                    window.open($scope.urlBilling, '','width=800,height=600');
                } else {
                    window.messageContainer.error('Silahkan ke halaman daftar pengiriman untuk mencetak laporan');
                }
            }
        }
    ]);
});