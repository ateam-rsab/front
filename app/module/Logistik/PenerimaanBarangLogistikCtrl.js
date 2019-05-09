define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PenerimaanBarangLogistikCtrl', ['$rootScope', '$scope', 'FindProduk', 'ModelItem', 'R', 'DateHelper', 'PenerimaanBarangLogistik',
        function($rootScope, $scope, FindProduk, ModelItem, r, DateHelper, PenerimaanBarangLogistik) {

            $scope.item = {};
            $scope.now = new Date();
            $scope.totalSub = [];

            $scope.colomnProduk = [{
                    "field": "no",
                    "title": "No",
                    width: 40
                },
                {
                    "field": "produk.namaProduk",
                    "title": "Nama Barang",
                    width: 250
                },
                {
                    "field": "asalProduk.asalProduk",
                    "title": "Sumber Dana",
                    width: 200
                },
                // {
                //     "field": "qtyproduk",
                //     "title": "Jumlah Order"
                // },
                // {
                //     "field": "satuan.satuanStandar",
                //     "title": "Satuan"
                // },
                {
                    "field": "jumlahTerima",
                    "title": "Jumlah",
                    format: "{0:n0}",
                    width: 100
                },
                {
                    "field": "satuanTerima.namaExternal",
                    "title": "Satuan",
                    width: 100
                },
                {
                    "field": "harga",
                    "title": "Harga (Rp)",
                    format: "{0:n0}",
                    width: 100
                },
                {
                    "field": "discount",
                    "title": "Diskon (%)",
                    width: 100
                },
                {
                    "field": "total",
                    "title": "Total (Rp.)",
                    width: 200,
                    format: "{0:n0}",
                    "aggregates": "[\"sum\"]",
                    "footerTemplate": "<div class=\"pull-right\">#=kendo.toString(sum, \"n0\")#</div>"

                },
                {
                    "field": "tanggalKadaluarsa",
                    "title": "Tgl Kadaluarsa",
                    type: "date",
                    format: "{0:dd/MM/yyyy}"
                },
                {
                    "field": "noBatch",
                    "title": "No Batch"
                },
                { 
                    command: "destroy",
                    title: " ",
                    width: 100
                }
            ];

            $scope.canEdit = false;

            $scope.tambah = function() {
                // $scope.dat = {
                //  "tanggal": new Date(),
                //  "jamBaru": new Date(),
                //  "durasi": 0
                // };
                $scope.dat = {};
                $scope.canEdit = true;

                $scope.$watch('(dat.jumlahTerima * dat.harga) - (dat.discount/100 * (dat.jumlahTerima * dat.harga))', function(value) {
                    $scope.dat.subTotalProduk = value;
                });
            }

            $scope.dataProduk = new kendo.data.DataSource({
                data: [],
                aggregate: [
                    { field: "total", aggregate: "sum" }
                ],
                editable: true,
                change: function(e) {
                    // console.log("change: " + e.action);
                    if (e.action === "remove") {
                        $scope.item.totalSub = 0;
                        console.log(JSON.stringify($scope.dataProduk));
                    }
                },
                batch: true
            });

            $scope.ArrProduk = [];

            $scope.parser = {};
            $scope.edit = function(data) {
                if ($scope.parser === data) $scope.canEdit = true;
                else {
                    $scope.canEdit = false;
                    $scope.parser = data;
                }
            };

            PenerimaanBarangLogistik.getSumberDana("AsalProduk&select=id,asalProduk").then(function(data) {
                $scope.sourceSumber = data;
            });
            PenerimaanBarangLogistik.getKomponen("anggaran/get-ruangan", true).then(function(dat){
                $scope.item.ruangan = dat.data.data;
            });
            $scope.sourceSuplier = ModelItem.kendoHttpSource('product/find-supplier', true);
            // PenerimaanBarangLogistik.getSuplier("Rekanan&select=id,namaRekanan").then(function(data) {
            //     $scope.sourceSuplier = data;
            // });

            PenerimaanBarangLogistik.getSatuan("SatuanStandar&select=id,satuanStandar").then(function(data) {
                $scope.sourceSatuan = data;
            });
            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuanganTujuan = data;
            });
            $scope.listProduk = ModelItem.kendoHttpSource('/product/find-obat-data', true);
            $scope.$watch('dat.kelompokBarang', function(e) {
                if (e === undefined) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.kelompokProduk };
                $scope.listNamaBarang = ModelItem.kendoHttpSource('product/find-barang-by-kelompok?id=' + e.id, true);
            })
            $scope.$watch('dat.NamaBarang', function(e) {
                if (e === undefined) return;
                if (e === null) return;
                if (e.id === undefined) return;
                $rootScope.addData = { content: 'ada data baru ' + e.namaProduk, type: 'informasi' };
                $scope.listSatuanStandard = ModelItem.kendoHttpSource('product/get-hirarki-satuan-produk?id=' + e.id, true);
                findProduk.findStokBarang(e.id, $scope.item.ruanganTujuan.id).then(function(e) {
                    $scope.tempItem.stok = e.data.data === null ? 0 : e.data.data;
                });
            })
            $scope.listKelompokBarang = ModelItem.kendoHttpSource('/product/kelompok-produk-have-stok', true);
            $scope.selesai = function(dataBaru) {
                var listRawRequired = [
                        "dat.noBatch|ng-model|No batch",
                        "dat.NamaBarang|k-ng-model|Nama produk",
                        "dat.asalProduk|k-ng-model|Sumber dana",
                        "dat.jumlahTerima|ng-model|Jumlah terima",
                        "dat.satuanTerima|k-ng-model|Satuan terima",
                        "dat.tanggalKadaluarsa|k-ng-model|Tanggal kadaluarsa",
                        "dat.harga|ng-model|Harga produk",
                        "dat.discount|ng-model|Jumlah diskon"
                    ];

                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                    if(isValid.status){ 
                        // console.log(JSON.stringify($scope.dat));
                        var id = $scope.ArrProduk.length + 1;
                        var newData = {
                            // "no": id,
                            "produk": dataBaru.NamaBarang,
                            "asalProduk": dataBaru.asalProduk,
                            // "qtyproduk": dataBaru.qtyproduk,
                            // "satuan": dataBaru.satuan,
                            "jumlahTerima": dataBaru.jumlahTerima,
                            "satuanTerima": dataBaru.satuanTerima,
                            "harga": dataBaru.harga,
                            "discount": dataBaru.discount,
                            "total": dataBaru.subTotalProduk,
                            "tanggalKadaluarsa": DateHelper.getPeriodeFormatted(new Date(dataBaru.tanggalKadaluarsa)),
                            "noBatch": dataBaru.noBatch
                        };

                        $scope.dataProduk.add(newData);
                        $scope.ArrProduk.push(newData);
                        $scope.canEdit = false;


                        $scope.item.totalSub = $scope.dataProduk.aggregates().total.sum;
                        // debugger;
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
                
            }

            $scope.$watch('(item.totalSub) + (item.ppn/100 * (item.totalSub))', function(value) {
                $scope.item.totalPenerimaan = value;
            });

            $scope.notf1Options = {
                position: {
                    pinned: true,
                    top: 30,
                    right: 30
                },
                autoHideAfter: 3000,
                stacking: "down",
                templates: [{
                    type: "ngTemplate",
                    template: $("#notificationTemplate").html()
                }]
            };
            $scope.formatHarga = {
                culture: "de-DE",
                format: "{0:n0}"
            }
            $scope.formatPpn = {
                format: "{0:# \\%}"
            }
            $scope.showPopup = function () {
                $scope.notf1.show({
                    title: "Informasi",
                    message: $scope.messages
                }, "ngTemplate");
            }
            $scope.Save = function() {
                var listRawRequired = [
                        "item.noKontrak|ng-model|No kontrak",
                        "item.noFaktur|ng-model|No faktur",
                        "item.noSppb|ng-model|No Sppb",
                        "item.tanggalTerima|k-ng-model|Tanggal terima",
                        "item.supplier|k-ng-model|Nama supplier",
                        "item.totalBeaMaterai|ng-model|Bea materai"
                    ];

                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                    
                    if(isValid.status){  

                        if ($scope.dataProduk._data.length > 0) {
                            $scope.item.penerimaanBarangDetail = $scope.dataProduk._data;
                            $scope.item.tanggalTerima = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggalTerima));
                            $scope.item.tanggalFaktur = DateHelper.getPeriodeFormatted(new Date($scope.now));
                            $scope.item.tanggalJatuhTempo = DateHelper.getPeriodeFormatted(new Date($scope.now));

                            PenerimaanBarangLogistik.savePenerimaanLogistik($scope.item, "penerimaan-barang/save-penerimaan-barang/").then(function(e) {
                                console.log(JSON.stringify(e.data));
                                $scope.isNext = true;
                            });
                        } else {
                            $scope.messages = "Peringatan, data belum lengkap";
                            $scope.showPopup();
                        }
                        // if ($scope.item.tanggalTerima !== undefined && $scope.item.tanggalFaktur !== undefined && $scope.item.tanggalJatuhTempo !== undefined && $scope.item.supplier !== undefined ) {
                        //     $scope.item.penerimaanBarangDetail = $scope.dataProduk._view;
                        //     debugger;
                        //     $scope.item.tanggalTerima = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggalTerima));
                        //     $scope.item.tanggalFaktur = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggalTerima));
                        //     $scope.item.tanggalJatuhTempo = DateHelper.getPeriodeFormatted(new Date($scope.item.tanggalTerima));
                            
                        //     PenerimaanBarangLogistik.savePenerimaanLogistik($scope.item, "penerimaan-barang/save-penerimaan-barang/").then(function(e) {
                                // console.log(JSON.stringify($scope.item));
                                // debugger;
                        //     });
                        // } else {
                        //     $scope.messages = "Peringatan, data belum lengkap";
                        //     $scope.showPopup();
                        // }

                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
               
            }
        }
    ])
})