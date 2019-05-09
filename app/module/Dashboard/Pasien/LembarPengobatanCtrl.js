define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('OrderFarmasiCtrl', ['ManagePasien', 'FindProduk', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai',

        function(managePasien, findProduk, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, findPegawai) {
            $scope.tempItem = {};
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $scope.now = new Date();

            $rootScope.showMenuPengkajianMedis = true;
            ModelItem.get("ResepObat").then(function(data) {
                $scope.item = data;
                $scope.item.TanggalOrder = $scope.now;
                $scope.item.TanggalResep = $scope.now;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            var ss = 1;

            $scope.init = function(name) {
                //This function is sort of private constructor for controller
                $scope.ids = id;
                $scope.names = name;

            };

            findPasien.getObat().then(function(e) {
                $scope.listAmbilObat = e.data.data.stokProdukGlobal
            });

            
            // $scope.$watch('tempItem.Generik', function(e) {
            //     if (e === undefined) return;
            //     findPasien.getAmbilObat(e.id).then(function(e) {
            //         $scope.listAmbilObat = e.data.data.stokProdukGlobal
            //     });
            //     findPasien.findKekuatan(e.id).then(function(e) {
            //         $scope.tempItem.JumlahKekuatan = e.data.data[0].kekuatanDosis;
            //     });
            // })
            //@miftah
            // $scope.$watch('tempItem.JumlahMg', function(e) {
            //     if (e === undefined) return;
            //     calculate();
            // })
            // $scope.$watch('tempItem.JumlahTablet', function(e) {
            //     if (e === undefined) return;
            //     calculate();
            // });
            // $scope.$watch('item.sumRekap', function(e) {
            //     if (e === undefined) return;
            //     calculate();
            // });
            $scope.addRacikanObat = function() {
                $scope.statusOrder = 0;
                if ($scope.tempItem.NamaObat === undefined || $scope.tempItem.NamaObat === null) {
                    $scope.tempItem.NamaObat = $scope.listAmbilObat[0];
                    $scope.tempItem.NamaObat.namaObat = "";
                    //belum pilih obat untuk nanti di apotik nya
                    $scope.statusOrder = -1;
                }
                var tempDatariwayat = {
                    "id": "1",
                    "jenisRacikan": $scope.tempItem.JenisRacikan.name,
                    "produkSelesai": $scope.tempItem.NamaObat.namaObat,
                    // "generik": $scope.tempItem.Generik,
                    "produk": $scope.tempItem.NamaObat,
                    "produku": $scope.tempItem.NamaObat.namaObat,
                    "stock": $scope.tempItem.Stock,
                    "jumlah": $scope.tempItem.Jumlah,
                    "route": $scope.tempItem.route,
                    "statusOrder": $scope.statusOrder,
                    "keteranganPakai": $scope.tempItem.KeteranganPakai,
                    "totalMgMl": $scope.tempItem.JumlahMg,
                    // "jumlahTablet": $scope.tempItem.JumlahTablet,
                    // "jumlahKekuatan": $scope.tempItem.JumlahKekuatan,
                    "total": $scope.tempItem.Jumlah // $scope.tempItem.JenisRacikan.name === 'Puyer' ? ($scope.tempItem.JumlahMg / $scope.tempItem.JumlahKekuatan) * $scope.tempItem.Jumlah : $scope.tempItem.JumlahTablet * $scope.tempItem.Jumlah,

                }

                $scope.racikanObats.add(tempDatariwayat);
                // $scope.tempItem.JenisRacikan = undefined;
                $scope.tempItem.NamaBarang = undefined;
                $scope.tempItem.Stock = undefined;
                $scope.tempItem.JumlahMg = undefined;
                $scope.tempItem.JumlahTablet = undefined;
                $scope.tempItem.JumlahKekuatan = undefined;
            }
            $scope.racikanObats = new kendo.data.DataSource({
                data: []
            });
            $scope.closeRacikanObat = function() {
                $scope.racikanObats = new kendo.data.DataSource({
                    data: []
                });
            }
            ModelItem.getDataDummyGeneric("JenisKemasan", false, false, undefined, undefined, '**').then(function(data) {
                $scope.listJenisObat = data;
            })

            ModelItem.getDataDummyGeneric("Generik", false, false, undefined, undefined, '**').then(function(data) {
                $scope.listJenisGeneric = data;
            })
            ModelItem.getDataDummyGeneric("RouteFarmasi", false).then(function(data) {
                $scope.routes = data;
            })

            ModelItem.getDataDummyGeneric("Stigma", false).then(function(data) {
                $scope.stigmas = data;
            })

            ModelItem.getDataDummyGeneric("JenisKelamin", false).then(function(data) {
                $scope.listJenisKelamin = data;
            });

            ModelItem.getDataDummyGeneric("Generik", false).then(function(data) {
                $scope.listJenisGeneriku = data;
            });
            // findProduk.findObat('').then(function(e) {
            //     
            //     $scope.listNamaBarang = e;
            // });
            $scope.$watch('tempItem.NamaObat', function(e) {
                if (e === undefined) return;
                if ($scope.item.RuanganTujuan === undefined) return;
                findProduk.findStokBarang(e.id, $scope.item.RuanganTujuan.id).then(function(e) {
                    $scope.tempItem.Stock = e.data.data;
                });
                if (e.generik !== undefined)
                    findProduk.findGenerikObat(e.generik.id, $scope.item.RuanganTujuan.id).then(function(e) {
                        $scope.ListSameObat = e.data.data;
                    });
            });

            $scope.changeObat = function(data) {
                $scope.tempItem.NamaBarang = data;
            }
            $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-obat', true);
            // ModelItem.getDataDummyGeneric("/find-obat", false).then(function(data) {
            //     $scope.listNamaBarang = data;
            // })

            ModelItem.getDataDummyGeneric("Ruangan", false).then(function(data) {
                $scope.listRuanganTujuan = _.filter(data, function(e) {
                    return e.departemenId === 14;
                });
            })
            ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
                $scope.dokters = data;
                $scope.item.pegawai = ModelItem.getPegawai();
            });

            $scope.selesaiRacikan = function() {

                var racikan = [];
                $scope.ListSameObat = [];
                for (var key in $scope.racikanObats._data) {
                    if ($scope.racikanObats._data.hasOwnProperty(key)) {
                        var element = $scope.racikanObats._data[key];
                        if (element.id !== undefined) {
                            racikan.push(element);
                        }
                    }
                }
                $scope.statusOrder = 0;
                var tempDatariwayat = {
                    "id": "1",
                    "jenisObat": $scope.tempItem.JenisObat,
                    "produkSelesai": $scope.tempItem.JenisObat.produk.namaProduk,
                    "produk": $scope.tempItem.JenisObat.produk,
                    "stock": $scope.tempItem.Jumlah,
                    // "generik": $scope.tempItem.Generik,
                    "jumlah": $scope.tempItem.KeteranganPakai.jumlahPakai * $scope.item.sumRekap,
                    "route": $scope.tempItem.route,
                    "statusOrder": $scope.statusOrder,
                    "keteranganPakai": $scope.tempItem.KeteranganPakai,
                    racikan: ModelItem.beforePost(racikan),
                    name: ""
                }

                $scope.dataResepObat.add(tempDatariwayat);
                $scope.tempItem.JenisObat = undefined;
                $scope.tempItem.NamaBarang = undefined;
                $scope.tempItem.Stock = undefined;
                $scope.tempItem.Jumlah = undefined;
                $scope.tempItem.AturanPakai = undefined;
                $scope.tempItem.KeteranganPakai = undefined;
                $scope.tempItem.KeteranganPakai2 = undefined;
                $scope.tempItem.KeteranganLain = undefined;
                $scope.tempItem.route = undefined;
                $scope.tempItem.JenisRacikan = undefined;
                $scope.racikanObats = new kendo.data.DataSource({
                    data: []
                });
            }


            //waktu saat ini

            $scope.tempItem = {
                "JenisObat": "",
                "NamaBarang": "",
                "Stock": "",
                "Jumlah": "",
                "AturanPakai": "",
                "KeteranganPakai": "",
                "KeteranganPakai2": "",
                "KeteranganLain": ""
            };
            $scope.addDataResepObat = function() {
                $scope.statusOrder = 0;
                if ($scope.tempItem.NamaObat === undefined || $scope.tempItem.NamaObat === null) {
                    $scope.tempItem.NamaObat = $scope.listAmbilObat[0];
                    $scope.tempItem.NamaObat.namaObat = "";
                    //belum pilih obat untuk nanti di apotik nya
                    $scope.statusOrder = -1;
                }
                var tempDatariwayat = {
                    "id": "1",
                    "jenisObat": $scope.tempItem.JenisObat,
                    "produkSelesai": $scope.tempItem.NamaObat.namaObat,
                    // "generik": $scope.tempItem.Generik,
                    "produk": $scope.tempItem.NamaObat,
                    "stock": $scope.tempItem.Stock,
                    "jumlah": $scope.tempItem.Jumlah,
                    "route": $scope.tempItem.route,
                    "statusOrder": $scope.statusOrder,
                    "keteranganPakai": $scope.tempItem.KeteranganPakai
                }
                debugger;
                $scope.dataResepObat.add(tempDatariwayat);
                $scope.tempItem.JenisObat = undefined;
                $scope.tempItem.NamaBarang = undefined;
                $scope.tempItem.Stock = undefined;
                $scope.tempItem.Jumlah = undefined;
                $scope.tempItem.AturanPakai = undefined;
                $scope.tempItem.KeteranganPakai = undefined;
                $scope.tempItem.KeteranganPakai2 = undefined;
                $scope.tempItem.KeteranganLain = undefined;
                $scope.tempItem.route = undefined;
                $scope.tempItem.Generik = undefined;
                $scope.tempItem.NamaObat = undefined;
                $scope.tempItem.JenisRacikan = undefined;
            }
            //@miftah
            // $scope.$watch('tempItem.KeteranganPakai', function(e) {
            //     if (e === undefined) return;
            //     calculate();

            // })

            // function calculate() {
                // if ($scope.tempItem.JenisRacikan.name === 'Puyer' || $scope.tempItem.JenisRacikan.name === 'Sirup') {
                //     $scope.tempItem.Jumlah = ($scope.tempItem.JumlahMg * $scope.tempItem.KeteranganPakai.jumlahPakai) * $scope.item.sumRekap / $scope.tempItem.JumlahKekuatan;
                // } else if ($scope.tempItem.JenisRacikan.name === 'Tablet') {
                //     $scope.tempItem.Jumlah = ($scope.tempItem.JumlahTablet * $scope.tempItem.KeteranganPakai.jumlahPakai) * $scope.item.sumRekap / $scope.tempItem.JumlahKekuatan;
                // } else if ($scope.tempItem.JenisRacikan.name === 'Salep') {
                //     $scope.tempItem.Jumlah = 1;
                // }

            //}
            $scope.removeDataResepObat = function(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataResepObat.remove(selectedItem);
            };
            $scope.removeDataResepPuyer = function(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.racikanObats.remove(selectedItem);
            };

            //-----keperluan grid RiwayatPenyakitOrObat
            debugger;
            $scope.dataResepObat = new kendo.data.DataSource({

                data: []
            });
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                $scope.isRawatInap = data.data.ruangan.departemenId === 16;
                $scope.item.sumRekap = 1;
            });
            findPasien.getByNoCM($state.params.noCM).then(function(data) {
                $scope.currentPasien = data.data.data;
            });
            $scope.Save = function() {
                debugger;
                if ($scope.isRawatInap === false)
                    $scope.item.sumRekap = undefined;
                var obats = [];
                for (var key in $scope.dataResepObat._data) {
                    if ($scope.dataResepObat._data.hasOwnProperty(key)) {
                        var element = $scope.dataResepObat._data[key];
                        if (element.id !== undefined)
                            obats.push(element);
                    }
                }
                var data = {
                    sumRekap: $scope.item.sumRekap,
                    strukOrder: {
                        tglOrder: $scope.item.TanggalOrder,
                        ruanganTujuan: $scope.item.RuanganTujuan
                    },
                    strukResep: {
                        noResep: $scope.item.noResep,
                        tglResep: $scope.item.TanggalResep,
                        penulisResep: $scope.item.pegawai,
                        pasien: {
                            noRec: $state.params.noRec
                        }
                    },
                    tanggalPendaftaran: $state.params.tanggal,
                    pasien: {
                        noRec: $state.params.noRec
                    }
                };
                var dataSend = ModelItem.beforePost(data, 'YYYY-MM-DD HH:mm:ss');
                dataSend.listObat = obats;
                dataSend.noRec = $state.params.noRec;
                managePasien.saveObat(dataSend).then(function(e) {
                    $scope.item.noResep = e.data.data.noResep;
                });
            }

            $scope.columnRacikan = [{
                    "field": "jenisRacikan",
                    "title": "Jenis Racikan",
                    "width": "100px"
                }, {
                    "field": "produku",
                    "title": "Nama Barang"
                }, {
                    "field": "stock",
                    "title": "Stok",
                    "width": "50px"
                },
                //  {
                //     "field": "jumlah",
                //     "title": "Jumlah",
                //     "width": "60px"
                // },
                {
                    "field": "total",
                    "title": "Total",
                    "width": "60px"
                }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeDataResepPuyer
                },
                title: "&nbsp;",
                width: "100px"
            }
            ];


            $scope.columnDataResepObat = [{
                "field": "jenisObat.jenisKemasan",
                "title": "Jenis Resep",
                "width": "100px"
            }, {
                "field": "produkSelesai",
                "title": "Nama Barang"
            }, {
                "field": "stock",
                "title": "Stok",
                "width": "50px"
            }, {
                "field": "jumlah",
                "title": "Jumlah",
                "width": "60px"
            }, {
                "field": "route.name",
                "title": "Route"
            }, {
                "field": "keteranganPakai.name",
                "title": "Keterangan Pakai"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeDataResepObat
                },
                title: "&nbsp;",
                width: "100px"
            }];
            $scope.listJenisRacikan = [{
                "id": 0,
                "name": "Puyer"
            }, {
                "id": 1,
                "name": "Tablet"
            }, {
                "id": 2,
                "name": "Sirup"
            }, {
                "id": 3,
                "name": "Salep"
            }]
            $scope.jumlahNama=function(){
                debugger;
                $scope.jumlah="";
                if($scope.tempItem.JenisRacikan.name === "Puyer"){
                    $scope.jumlah = "ML/MG"
                }if($scope.tempItem.JenisRacikan.name === "Tablet"){
                    $scope.jumlah = "Tablet"
                }if($scope.tempItem.JenisRacikan.name === "Sirup"){
                    $scope.jumlah = "Botol"
                }if($scope.tempItem.JenisRacikan.name === "Salep"){
                    $scope.jumlah = "Pcs"
                }
            }
        
        }

    ]);
});