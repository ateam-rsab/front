define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarReturnBarangRuanganCtrl', ['$sce', 'FindProduk', 'ManageSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindSarpras',
            function($sce, findProduk, manageSarpras, $rootScope, $scope, ModelItem, DateHelper, findSarpras) {     

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var init = function() {
                $scope.item = {
                    periodeAwal: $scope.now,
                    periodeAhir: $scope.now
                };
            }
            init();
            manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            $scope.isNext = true;
            findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
            });
            $scope.cari = function(){
                var dateStart, dateEnd, kProduk, jProduk, produkId;
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

                if ($scope.item.kelompokBarang === undefined) {
                    kProduk = "";
                } else {
                    kProduk = $scope.item.kelompokBarang.id
                }

                if ($scope.item.jenisProduk === undefined) {
                    jProduk = "";
                } else {
                    jProduk = $scope.item.jenisProduk.id
                }

                if ($scope.item.namaBarang === undefined) {
                    produkId = "";
                } else {
                    produkId = $scope.item.namaBarang.id
                }

                manageSarpras.getDaftarPengirimanRetur(dateStart, dateEnd, kProduk, jProduk, produkId).then(function(e) {
                    $scope.isReport = true;
                    // $scope.isEdit = true;
                    e.data.data.forEach(function(items){
                        items.total = items.hargaSatuan * items.qtyProdukRetur
                    })

                    $scope.dataStokOpname = new kendo.data.DataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                id: "noRetur",
                                fields: {
                                    namaProduk: {type: "string"},
                                    qtyProdukRetur: {type: "number"},
                                    saldo: {type: "number"},
                                    ruanganTujuan: {type: "string"},
                                    ruanganAsal: {type: "string"},
                                    satuanStandar: {type: "string"},
                                    hargaSatuan: {type: "number"},
                                    total: {type: "number"},
                                }
                            }
                        },
                        pageSize: 20
                    });
                })
            }
            $scope.kl = function(current){
                $scope.current = current;
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
                columns: [{
                    "field": "noRetur",
                    "title": "No Retur",
                    "width": 80,
                    filterable: false
                }, {
                    "field": "namaProduk",
                    "title": "Nama Produk",
                    "width": 200
                }, {
                    "field": "asalProduk",
                    "title": "Asal Produk",
                    "width": 100,
                    filterable: false
                }, {
                    title: "Ruangan",
                    columns: [{
                        "field": "ruanganAsal",
                        "title": "Asal",
                        "width": 150,
                        filterable: false
                    }, {
                        "field": "ruanganTujuan",
                        "title": "Tujuan",
                        "width": 150,
                        filterable: false
                    }]
                }, {
                    "field": "hargaSatuan",
                    "title": "Harga Satuan",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "format": "{0:n0}",
                    "width": 80,
                    filterable: false
                }, {
                    "field": "saldo",
                    "title": "Saldo",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 60,
                    filterable: false
                }, {
                    "field": "qtyProdukRetur",
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
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 80,
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
            // $scope.Save = function() {
            //     var listRawRequired = [
            //         "item.tanggal|k-ng-model|Tanggal Penutupan"
            //     ];

            //     var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
            //     if(isValid.status){
            //         var dataArray = [];
            //         $scope.dataStokOpname._data.forEach(function(element){
            //             if (element.stokReal !== null) { 
            //                 dataArray.push({
            //                     "id": element.id,
            //                     "stokReal": element.stokReal
            //                 });
            //             }
            //         })
                    
            //         if (dataArray.length !== 0) {
            //             var tempData = {
            //                 "tanggal": DateHelper.getPeriodeFormatted($scope.item.tanggal),
            //                 "stokProdukGlobal": dataArray
            //             }
            //             manageSarpras.saveDataSarPras(tempData, "stok-op-name/save-stok-op-name").then(function(e){
            //                 console.log(JSON.stringify(e.data));
            //                 $scope.isNext = true;
            //             });
            //         } else {
            //             window.messageContainer.error('Saldo Real barang belum di isi');
            //         }
            //     } else {
            //         ModelItem.showMessages(isValid.messages);
            //     }
            // }
            $scope.cetak = function() {
                var dateStart, dateEnd, barangId, kelProdukId, jenisProdukId;

                if ($scope.item.kelompokBarang === undefined) {
                    kelProdukId = "";
                } else {
                    kelProdukId = $scope.item.kelompokBarang.id
                }

                if ($scope.item.jenisProduk === undefined) {
                    jenisProdukId = "";
                } else {
                    jenisProdukId = $scope.item.jenisProduk.id
                }

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

                $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.lapReturBarangRuangan(kelProdukId, jenisProdukId, barangId, dateStart, dateEnd));
                window.open($scope.urlBilling, '','width=800,height=600');
            }
            $scope.batal = function(){
                init();
                manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                    $scope.item.ruangan = dat.data.data;
                });
            }
        }
    ]);
});