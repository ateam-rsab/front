define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPenerimaanReturnBarangRuanganCtrl', ['FindProduk', 'ManageSarpras', '$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper',
            function(findProduk, manageSarpras, $rootScope, $scope, $state, ModelItem, DateHelper) {     

            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isNext = true;
            $scope.item = {
                periodeAwal: $scope.now,
                periodeAhir: $scope.now
            };
            findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
            });
            manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            $scope.cari = function(){
                var dateStart, dateEnd;
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
                manageSarpras.getDaftarPenerimaanRetur(dateStart, dateEnd).then(function(e) {
                    $scope.isReport = true;
                    $scope.isEdit = true;
                    $scope.isDetil = true;
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
                                }
                            }
                        },
                        pageSize: 20,
                        change: function (e) {
                            console.log("change :" + e.action);
                            // if (e.field && e.action === "itemchange") {
                            //     $scope.current.selisih = $scope.current.qtyProduk - $scope.current.stokReal;
                            //     $scope.dataStokOpname.fetch();
                            // }
                        }
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
                columns: [{
                    "field": "noRetur",
                    "title": "No Retur",
                    "width": 80,
                    filterable: false
                }, 
                // {
                //     "field": "namaProduk",
                //     "title": "Nama Produk",
                //     "width": 200
                // }, {
                //     "field": "asalProduk",
                //     "title": "Asal Produk",
                //     "width": 100,
                //     filterable: false
                // }, 
                {
                    "field": "ruanganAsal",
                    "title": "Ruangan Asal",
                    "width": 150,
                    filterable: false
                }, {
                    "field": "ruanganTujuan",
                    "title": "Ruangan Tujuan",
                    "width": 150,
                    filterable: false
                }, 
                // {
                //     "field": "hargaSatuan",
                //     "title": "Harga Satuan",
                //     "width": 80,
                //     filterable: false
                // }, {
                //     "field": "saldo",
                //     "title": "Saldo",
                //     "format": "{0:n0}",
                //     "attributes": {
                //         "style": "text-align:right"
                //     },
                //     "width": 60,
                //     filterable: false
                // }, {
                //     "field": "qtyProdukRetur",
                //     "title": "Qty Retur",
                //     "format": "{0:n0}",
                //     "attributes": {
                //         "style": "text-align:right"
                //     },
                //     "width": 60,
                //     filterable: false
                // }, {
                //     "field": "satuanStandar",
                //     "title": "Satuan",
                //     "width": 80,
                //     filterable: false
                // }, {
                //     "field": "total",
                //     "title": "Total",
                //     "width": 80,
                //     filterable: false
                // }
                ]

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
            $scope.Detil = function() {
                $state.go('SimpanReturPengiriman', {
                    noRec: $scope.current.noRec
                });
            }
            $scope.cetak = function() {
                window.messageContainer.error('Fitur belum tersedia');
            }
            $scope.batal = function(){
                $scope.item = {};
            }
        }
    ]);
});