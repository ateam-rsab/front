define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RekapStokRuanganCtrl', ['$sce', 'FindProduk', 'ManageSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindSarpras',
            function($sce, findProduk, manageSarpras, $rootScope, $scope, ModelItem, DateHelper, findSarpras) {     

            $scope.dataVOloaded = true;
            $scope.item = {
                kelUser: document.cookie.split(';')[0].split('=')[1]
            };
            // $scope.isReport = true;
            $scope.isNext = true;
            if ($scope.item.kelUser === 'logistik' || $scope.item.kelUser === "bagianUmum") {
                $scope.bukanLogistik = false;
            } else {
                $scope.bukanLogistik = true;
            }
            
            manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
            });
            findProduk.getListRuangan("AsalProduk&select=id,kdAsalProduk,asalProduk", true).then(function(dat){
                $scope.listSumberDana = dat.data;
            });
            $scope.listJenisPemeriksaan = [{ name: "Kelompok Produk", id: 1 },
                { name: "Jenis Produk", id: 2 }
            ];
            $scope.isSelected = false;
            $scope.$watch('item.jenisPermintaan', function(e) {
                if (e === undefined) return;
                if (e.id === 1) {
                    $scope.isSelected = true;
                    $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
                }
            })
            manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            $scope.cari = function(){
                var kelBarang, jenBarang, ruanganId, barangId, asalProdukId;
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
                if ($scope.item.asalProduk === undefined) {
                    asalProdukId = "";
                } else {
                    asalProdukId = $scope.item.asalProduk.id
                }

                if ($scope.enableNamaRuangan === true && $scope.item.ruanganAsal !== undefined) {
                    ruanganId = $scope.item.ruanganAsal.id
                } else {
                    ruanganId = $scope.item.ruangan.id
                }

                manageSarpras.getStokOpnameRekap(kelBarang, jenBarang, barangId, ruanganId, asalProdukId).then(function(e) {
                    $scope.isReport = true;
                    $scope.isEdit = true;
                    $scope.dataStokOpname = new kendo.data.DataSource({
                        data: e.data.data,
                        // groupable: true,
                        // group: {
                        //     field: "namaProduk",
                        //     dir: "asc"
                        // },
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    kodeBarang: {editable: false, type: "number"},
                                    namaProduk: {editable: false, type: "string"},
                                    asalProduk: {editable: false, type: "string"},
                                    qtyProduk: {editable: false, type: "number"},
                                    qtyMasuk: {type: "number"},
                                    qtyKeluar: {editable: false, type: "number"},
                                    satuan: {editable: false, type: "string"}
                                }
                            }
                        },
                        pageSize: 20,
                        change: function (e) {
                            console.log("change :" + e.action);
                            if (e.field && e.action === "itemchange") {
                                $scope.current.selisih = $scope.current.qtyProduk - $scope.current.stokReal;
                                $scope.dataStokOpname.fetch();
                            }
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
                editable: false,
                columns: [{
                    "field": "kodeBarang",
                    "title": "Kode Barang",
                    "width": 120,
                    filterable: false
                }, {
                    "field": "namaProduk",
                    "title": "Nama Barang",
                    // "width": 250
                }, 
                // {
                //     "field": "asalProduk",
                //     "title": "Asal Barang",
                //     "width": "200px"
                // }, 
                {
                    "field": "qtyProduk",
                    "title": "Saldo",
                    "format": "{0:n}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 60,
                    filterable: false
                }, {
                    "field": "satuanStandar",
                    "title": "Satuan",
                    "width": 60,
                    filterable: false
                }, 
                // {
                //     "field": "qtyMasuk",
                //     "title": "Saldo Minimum",
                //     "format": "{0:n0}",
                //     "attributes": {
                //         "style": "text-align:right"
                //     },
                //     "width": 60,
                //     filterable: false
                // }, {
                //     "field": "qtyKeluar",
                //     "title": "Saldo Maksimum",
                //     "format": "{0:n0}",
                //     "attributes": {
                //         "style": "text-align:right"
                //     },
                //     "width": 60,
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
            $scope.cetak = function() {
                var kelBarang, jenBarang, ruanganId, barangId, asalProdukId, noTerima;
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
                
                if ($scope.item.noTerima === undefined) {
                    noTerima = "";
                } else {
                    noTerima = $scope.item.noTerima
                }
                
                if ($scope.item.asalProduk === undefined) {
                    asalProdukId = "";
                } else {
                    asalProdukId = $scope.item.asalProduk.id
                }

                if ($scope.enableNamaRuangan === true && $scope.item.ruanganAsal !== undefined) {
                    ruanganId = $scope.item.ruanganAsal.id
                } else {
                    ruanganId = $scope.item.ruangan.id
                }
                $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.cetakStokRekap(kelBarang, jenBarang, barangId, ruanganId, noTerima, asalProdukId));
                window.open($scope.urlBilling, '','width=800,height=600');
            }
            $scope.batal = function(){
                $scope.item = {};
            }
        }
    ]);
});