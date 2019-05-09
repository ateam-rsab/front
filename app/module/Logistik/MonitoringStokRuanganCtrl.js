define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MonitoringStokRuanganCtrl', ['FindProduk', 'ManageSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper',
            function(findProduk, manageSarpras, $rootScope, $scope, ModelItem, DateHelper) {
            $scope.dataVOloaded = true;
            $scope.item = {
                kelUser: document.cookie.split(';')[0].split('=')[1]
            };
            $scope.isReport = true;
            if ($scope.item.kelUser === 'logistik' || $scope.item.kelUser === "bagianUmum") {
                $scope.bukanLogistik = false;
            } else {
                $scope.bukanLogistik = true;
            }
            findProduk.getListRuangan("Ruangan&select=id,namaRuangan").then(function(data) {
                $scope.sourceRuangan = data;
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
                debugger;
            })
            manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            $scope.cariFast = function(){
                var kelBarang, jenBarang, barangId, dateStart, dateEnd;
                if ($scope.item.awal === undefined) {
                    dateStart = "";
                } else {
                    dateStart = DateHelper.getPeriodeFormatted($scope.item.awal)
                }
                if ($scope.item.ahir === undefined) {
                    dateEnd = "";
                } else {
                    dateEnd = DateHelper.getPeriodeFormatted($scope.item.ahir)
                }
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
                manageSarpras.daftarFastMoving(kelBarang, jenBarang, barangId, dateStart, dateEnd).then(function(e) {
                    $scope.isReport = true;
                    // $scope.isEdit = true;
                    $scope.dataFastMoving = new kendo.data.DataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                fields: {
                                    kdProduk: {editable: false, type: "string"},
                                    namaProduk: {editable: false, type: "string"},
                                    jumlah: {editable: false, type: "number"},
                                    namaRuangan: {editable: false, type: "string"},
                                    kdRuangan: {editable: false, type: "number"}
                                }
                            }
                        },
                        pageSize: 20,
                        change: function (e) {
                            console.log("change :" + e.action);
                            if (e.field && e.action === "itemchange") {
                                $scope.current.selisih = $scope.current.qtyProduk - $scope.current.stokReal;
                                $scope.dataFastMoving.fetch();
                            }
                        }
                    });
                })
            }
            $scope.cariSlow = function(){
                var kelBarang, jenBarang, barangId, dateStart, dateEnd;
                if ($scope.item.awal === undefined) {
                    dateStart = "";
                } else {
                    dateStart = DateHelper.getPeriodeFormatted($scope.item.awal)
                }
                if ($scope.item.ahir === undefined) {
                    dateEnd = "";
                } else {
                    dateEnd = DateHelper.getPeriodeFormatted($scope.item.ahir)
                }
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
                manageSarpras.daftarSlowMoving(kelBarang, jenBarang, barangId, dateStart, dateEnd).then(function(e) {
                    $scope.isReport = true;
                    // $scope.isEdit = true;
                    $scope.dataSlowMoving = new kendo.data.DataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                fields: {
                                    kdProduk: {editable: false, type: "string"},
                                    namaProduk: {editable: false, type: "string"},
                                    jumlah: {editable: false, type: "number"},
                                    namaRuangan: {editable: false, type: "string"},
                                    kdRuangan: {editable: false, type: "number"}
                                }
                            }
                        },
                        pageSize: 20,
                        change: function (e) {
                            console.log("change :" + e.action);
                            if (e.field && e.action === "itemchange") {
                                $scope.current.selisih = $scope.current.qtyProduk - $scope.current.stokReal;
                                $scope.dataSlowMoving.fetch();
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
                // filterable: {
                //     extra: false,
                //     operators: {
                //         string: {
                //             contains: "Contains",
                //             startswith: "Starts with"
                //         }
                //     }
                // },
                pageable: true,
                editable: false,
                columns: [{
                    "field": "kdProduk",
                    "title": "Kode Barang",
                    "width": 100
                }, {
                    "field": "namaProduk",
                    "title": "Nama Barang",
                    "width": "200px"
                }, {
                    "field": "namaRuangan",
                    "title": "Nama Ruangan",
                    "width": "200px"
                }, {
                    "field": "kdRuangan",
                    "title": "",
                    "hidden": true
                }, {
                    "field": "jumlah",
                    "title": "Jumlah",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 60,
                    // filterable: false
                }, 
                // {
                //     "field": "qtyMasuk",
                //     "title": "Saldo Masuk",
                //     "format": "{0:n0}",
                //     "attributes": {
                //         "style": "text-align:right"
                //     },
                //     "width": 60,
                //     filterable: false
                // }, {
                //     "field": "qtyKeluar",
                //     "title": "Saldo Keluar",
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
                window.messageContainer.error('Fitur belum tersedia');
            }
            $scope.batal = function(){
                $scope.item = {};
            }     
            $("#tabstrip").kendoTabStrip({
                animation:  {
                    open: {
                        effects: "fadeIn"
                    }
                }
            });
        }
    ]);
});