define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPemusnahanBarangCtrl', ['$sce', 'FindProduk', 'ManageSarpras', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindSarpras',
            function($sce, findProduk, manageSarpras, $rootScope, $scope, ModelItem, DateHelper, findSarpras) {     
            $scope.now =  new Date();
            $scope.dataVOloaded = true;
            $scope.item = {
                // periodeAwal: $scope.now,
                // periodeAhir: $scope.now
            };
            manageSarpras.getOrderList("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            $scope.cari = function(){
                var kelBarang, jenBarang, barangId, periode;
                if ($scope.item.periodeAwal === undefined && $scope.item.periodeAhir === undefined) {
                    periode = "&dateStart=&dateEnd=";
                } else {
                    periode = "&dateStart=" + DateHelper.getPeriodeFormatted($scope.item.periodeAwal) + "&dateEnd=" + DateHelper.getPeriodeFormatted($scope.item.periodeAhir);
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
                manageSarpras.getDaftarPemusnahan(kelBarang, jenBarang, barangId, periode).then(function(e) {
                    $scope.isReport = true;
                    e.data.data.forEach(function(item){
                        if (item.tanggalKadaluarsa !== null) {
                            debugger;
                            item.tanggalKadaluarsa = DateHelper.getPeriodeFormatted(item.tanggalKadaluarsa);
                        }
                    })
                    $scope.dataStokOpname = new kendo.data.DataSource({
                        data: e.data.data,
                        schema: {
                            model: {
                                id: "no",
                                fields: {
                                    kodeProduk: {editable: false, type: "number"},
                                    namaProduk: {editable: false, type: "string"},
                                    noBatch: {editable: false, type: "string"},
                                    tanggalKadaluarsa: {editable: false},
                                    qtyPemusnahan: {editable: false, type: "number"},
                                    satuanStandar: {editable: false, type: "string"},
                                    satuan: {editable: false, type: "string"},
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
                    "field": "noTerima",
                    "title": "No Pemusnahan",
                    "width": 80,
                    // filterable: false
                }, {
                    "field": "kodeProduk",
                    "title": "Kode Barang",
                    "width": 100,
                    // filterable: false
                }, {
                    "field": "namaProduk",
                    "title": "Nama Barang",
                    "width": "200px"
                }, {
                    "field": "noBatch",
                    "title": "No Batch",
                    "width": 150
                }, {
                    "field": "tanggalKadaluarsa",
                    "title": "Tgl Expired",
                    "width": 80,
                    // filterable: false
                }, {
                    "field": "qtyPemusnahan",
                    "title": "Qty",
                    "format": "{0:n0}",
                    "attributes": {
                        "style": "text-align:right"
                    },
                    "width": 60,
                    // filterable: false
                }, {
                    "field": "satuanStandar",
                    "title": "Satuan",
                    "width": 80,
                    // filterable: false
                }, 
                // {
                //     "field": "noRegis",
                //     "title": "No Registrasi",
                //     "width": 80
                // }, 
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": 80,
                    // filterable: false
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
                var kelBarang, jenBarang, barangId, dateStart, dateEnd;
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

                $scope.urlBilling = $sce.trustAsResourceUrl(findSarpras.lapPemusnahanBarang(kelBarang, jenBarang, barangId, dateStart, dateEnd));
                window.open($scope.urlBilling, '','width=800,height=600');
            }
            $scope.batal = function(){
                $scope.item = {};
            }
        }
    ]);
});