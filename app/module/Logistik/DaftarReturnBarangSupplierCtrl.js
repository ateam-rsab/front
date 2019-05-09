define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarReturnBarangSupplierCtrl', ['$sce', 'FindProduk', 'ManageSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindSarpras',
            function($sce, findProduk, manageSarpras, $rootScope, $scope, ModelItem, DateHelper, findSarpras) {     

            $scope.dataVOloaded = true;
            $scope.item = {};
            findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
            })
            manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            })
            $scope.sourceSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            // manageSarpras.getListData("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.sourceSuplier = data;
            // })
            $scope.cari = function(){
                var kelBarang, jenBarang, barangId, supplierId;
                if ($scope.item.kelompokBarang === undefined) {
                    kelBarang = "";
                } else {
                    kelBarang = $scope.item.kelompokBarang.id
                }

                if ($scope.item.jenisProduk === undefined) {
                    jenBarang = "";
                } else {
                    jenBarang = $scope.item.jenisProduk.id
                }

                if ($scope.item.namaBarang === undefined) {
                    barangId = "";
                } else {
                    barangId = $scope.item.namaBarang.id
                }

                if ($scope.item.supplier === undefined) {
                    supplierId = "";
                } else {
                    supplierId = $scope.item.supplier.id
                }
                manageSarpras.getListReturSupllier(kelBarang, jenBarang, barangId, supplierId).then(function(e) {
                    $scope.isReport = true;
                    // $scope.isEdit = true;
                    e.data.data.forEach(function(item){
                        item.total = item.qtyProduk * item.hargaSatuan
                    })

                    $scope.dataStokOpname = new kendo.data.DataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                id: "noRetur",
                                fields: {
                                    namaProduk: {editable: false, type: "string"},
                                    hargaSatuan: {editable: false, type: "number"},
                                    total: {editable: false, type: "number"},
                                    qtyProduk: {type: "number"},
                                    selisih: {editable: false, type: "number"},
                                    satuan: {editable: false, type: "string"},
                                    asalProduk: {editable: false, type: "string"},
                                    namaPegawai: {editable: false, type: "string"},
                                    keterangan: {editable: false, type: "string"},
                                    satuanStandar: {editable: false, type: "string"}
                                }
                            }
                        },
                        pageSize: 20
                    });
                })
            }
            $scope.kl = function(current){
                $scope.current = current;
                console.log(current);
            };
            $scope.optionsDataStokOpname = {
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
                editable: false,
                columns: [{
                    "field": "noRetur",
                    "title": "No Retur",
                    "width": 150,
                    filterable: false
                }, {
                    "field": "namaProduk",
                    "title": "Nama Produk",
                    "width": 300
                }, {
                    "field": "asalProduk",
                    "title": "Asal Produk",
                    "width": 150,
                    filterable: false
                }, {
                    "field": "hargaSatuan",
                    "title": "Harga Satuan",
                    "width": 80,
                    filterable: false,
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    }
                }, {
                    "field": "qtyProduk",
                    "title": "Qty Retur",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 60,
                    filterable: false
                }, {
                    "field": "satuanStandar",
                    "title": "Satuan",
                    "width": 80,
                    filterable: false
                }, {
                    "field": "total",
                    "title": "Total",
                    "width": 80,
                    filterable: false,
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    }
                }, {
                    "field": "namaPegawai",
                    "title": "Pengirim",
                    "width": 150,
                    filterable: false
                }, {
                    "field": "keterangan",
                    "title": "Keterangan",
                    filterable: false
                }]

            };
            $scope.$watch('item.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listJenisBarang = ModelItem.kendoHttpSource('product/find-jenis-produk?idKelompokProduk=' + e.id, true);
            })
            $scope.$watch('item.jenisProduk', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-produk-by-jenis-produk-and-nama-produk?idDetailJenisProduk=' + e.id, true);
            })
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            $scope.Save = function() {
                var listRawRequired = [
                    "item.tanggal|k-ng-model|Tanggal Penutupan"
                ];

                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                if(isValid.status){
                    var dataArray = [];
                    $scope.dataStokOpname._data.forEach(function(element){
                        if (element.stokReal !== null) { 
                            dataArray.push({
                                "id": element.id,
                                "stokReal": element.stokReal
                            });
                        }
                    })
                    
                    if (dataArray.length !== 0) {
                        var tempData = {
                            "tanggal": DateHelper.getPeriodeFormatted($scope.item.tanggal),
                            "stokProdukGlobal": dataArray
                        }
                        manageSarpras.saveDataSarPras(tempData, "stok-op-name/save-stok-op-name").then(function(e){
                            console.log(JSON.stringify(e.data));
                            $scope.isNext = true;
                        });
                    } else {
                        window.messageContainer.error('Saldo Real barang belum di isi');
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.cetak = function() {
                var dateStart, dateEnd, barangId, kelProdukId, jenisProdukId;

                if ($scope.item.namaBarang === undefined) {
                    barangId = "";
                } else {
                    barangId = $scope.item.namaBarang.id
                }

                if ($scope.item.periodeAwal === undefined) {
                    dateStart = "";
                } else {
                    dateStart = DateHelper.getPeriodeFormatted($scope.item.periodeAwal)
                }

                if ($scope.item.periodeAhir === undefined) {
                    dateEnd = "";
                } else {
                    dateEnd = DateHelper.getPeriodeFormatted($scope.item.periodeAhir)
                }

                $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.lapReturBarangSupplier(dateStart, dateEnd, '', barangId));
                window.open($scope.urlBilling, '','width=800,height=600');
            }
            $scope.batal = function(){
                $scope.item = {};
            }
        }
    ]);
});