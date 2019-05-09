define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ResepElektronikDetailCtrl', ['CacheHelper', 'ManagePasien', 'socket', '$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R','ManageLogistikPhp',
        function(cacheHelper, managePasien, socket, $state, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r,manageLogistikPhp) {
            $scope.title = "Resep elektronik";
            $scope.item = {};
            $scope.now = new Date();

            $scope.tglPengambilan = moment($scope.now).format('YYYY-MM-DD hh:mm:ss')
            $rootScope.isOpen = true;
            $scope.listData = cacheHelper.get('ResepElektronikAmbilObat');
            findPasien.getByNoRegistrasi($state.params.noAntrianPasien).then(function(data) {
                //debugger;
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);

                $scope.item.pasien.umurPasien = $scope.item.pasien.umur//DateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                $scope.item.tglRegistrasi =$scope.item.pasien.tglDaftar// moment(data.data.tglRegistrasi).format('DD-MM-YYYY HH:SS');
                $scope.item.jenisKelamin = $scope.item.pasien.jenisKelamin.jenisKelamin//data.data.pasien.jenisKelamin.jenisKelamin;
                $scope.item.statusPerkawinan = $scope.item.pasien.statusPerkawinan.statusPerkawinan//data.data.pasien.statusPerkawinan.statusPerkawinan;
                $scope.item.alamat = data.data.alamat.alamatLengkap;
                $scope.item.keluhan = 'Keluhan utama :' + data.data.keluhanUtama//.keluhanUtama;
                for (var key in $scope.item.tandaVital) {
                    if ($scope.item.tandaVital.hasOwnProperty(key)) {
                        var element = $scope.item.tandaVital[key];
                        if (element.dataTandaVital.name === 'Berat Badan') {
                            if ($scope.item.strukOrder === undefined)
                                $scope.item.strukOrder = {};
                            $scope.item.strukOrder.keteranganLainnya = "Berat badan : " + element.nilai + " KG";
                        }
                    }
                    $scope.item.displayCito = $scope.item.strukOrder === undefined ? 'Tidak Cito' : $scope.item.strukOrder.cito === true ? 'Cito' : "Tidak Cito";
                }
                manageLogistikPhp.getDataTableTransaksi("logistik/get-transaksi-pelayanan?nocm="+data.data.pasien.noCm+"&noregistrasifk="+data.data.noRec, true).then(function(dat){
                    for (var i = 0; i < dat.data.length; i++) {
                        dat.data[i].no = i+1
                        dat.data[i].total =parseFloat(dat.data[i].jumlah) * (parseFloat(dat.data[i].hargasatuan)-parseFloat(dat.data[i].hargadiscount))
                        dat.data[i].total = parseFloat(dat.data[i].total)
                        dat.data[i].hargasatuan = parseFloat(dat.data[i].hargasatuan)
                        dat.data[i].hargadiscount = parseFloat(dat.data[i].hargadiscount)
                    }
                    $scope.dataGrid = dat.data;
                });

            });
            $scope.columnGrid = [
        {
            "field": "no",
            "title": "No",
            "width" : "30px",
        },
        {
            "field": "noresep",
            "title": "No.Resep",
            "width" : "80px",
        },
        {
            "field": "tglpelayanan",
            "title": "Tgl Pelayanan",
            "width" : "110px",
        },
        // {
        //     "field": "asalproduk",
        //     "title": "Asal Produk",
        //     "width" : "70px",
        // },
        {
            "field": "namaproduk",
            "title": "Deskripsi",
            "width" : "200px",
        },
        {
            "field": "satuanstandar",
            "title": "Satuan",
            "width" : "80px",
        },
        {
            "field": "jumlah",
            "title": "Qty",
            "width" : "40px",
        },
        {
            "field": "hargasatuan",
            "title": "Harga Satuan",
            "width" : "100px",
            // "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
        },
        {
            "field": "hargadiscount",
            "title": "Harga Discount",
            "width" : "100px",
            // "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
        },
        {
            "field": "total",
            "title": "Total",
            "width" : "100px",
            // "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
        }
        ];
            // $scope.arrColumnGridResepElektronik = [{
            //     "field": "produk.namaProduk",
            //     "title": "Nama Item",

            // }, {
            //     "field": "jumlah",
            //     "title": "Jumlah",
            //     width: 70
            // }, {
            //     "field": "hargaSatuan",
            //     "title": "Harga",
            //     width: 100,
            //     template: "<span style='text-align:right;display:block'>#=kendo.toString(hargaSatuan, 'n2')#</span>",

            // }, {
            //     "field": "jumlah",
            //     "title": "Total",
            //     width: 100,
            //     template: " <span style='text-align:right;display:block'> #=kendo.toString(jumlah*hargaSatuan, 'n2')# </span>  ",
            // }, {
            //     hidden: true,
            //     field: "pasienDaftar.ruangan.namaRuangan",
            //     title: "Nama Ruangan",
            //     aggregates: ["count"],
            //     groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            // }, {
            //     hidden: true,
            //     field: "produk.detailJenisProduk.detailJenisProduk",
            //     title: "",
            //     aggregates: ["count"],
            //     groupHeaderTemplate: " #= value # Jumlah: #= count# "
            // }];
            // $scope.group = [{
            //     field: "pasienDaftar.ruangan.namaRuangan",
            //     aggregates: [{
            //         field: "produk.namaProduk",
            //         aggregate: "count"
            //     }, {
            //         field: "pasienDaftar.ruangan.namaRuangan",
            //         aggregate: "count"
            //     }]
            // }, {
            //     field: "produk.detailJenisProduk.detailJenisProduk",
            //     groupHeaderTemplate: "Bagian #= value #",
            //     aggregates: [{
            //         field: "produk.namaProduk",
            //         aggregate: "count"
            //     }, {
            //         field: "produk.detailJenisProduk.detailJenisProduk",
            //         aggregate: "count"
            //     }]
            // }];
            $scope.simpanVerifikasi = function() {
                //debugger;
                var data = [];
                for (var key in $scope.patienGrids) {
                    if ($scope.patienGrids.hasOwnProperty(key)) {
                        var element = $scope.patienGrids[key];
                        var elementOld = $scope.listData[key];
                        if (element.statusOrder === -1 && element.produk.id !== element.produk.id) {
                            element.statusOrder = 1;
                        }
                        if (element.noRec !== undefined) {
                            data.push(element);
                        }
                        if(element.isBenar===null){
                            element.isBenar=false;
                        }else{
                            element.isBenar=true
                        }

                        for (var j in element.racikan) {
                            if (element.racikan.hasOwnProperty(j)) {
                                var elem = element.racikan[j];
                                var elemOld = elementOld.racikan[j];
                                if (elem !== undefined) {
                                    if (elem.statusOrder === -1 && elemOld.produk.id !== elem.produk.id) {
                                        elem.statusOrder = 1;
                                    }
                                }
                            }
                        }
                    }
                }
                managePasien.saveVerifikasiObat(ModelItem.beforePost({ list: data }));
                $state.go('ResepElektronik')
            }
            $scope.close = function(data) {
                //  $scope.listAmbilObat = [];
            }
            $scope.init = function(data) {
                this.$watch('data.keteranganPakai', function(e) {
                    data.jumlah = data.jml / data.jmlPakai * e.jumlahPakai;
                    data.jumlahPembulatan = Math.ceil(data.jumlah);
                });

            }
            $scope.selectAll = function(data, e) {
                for (var key in $scope.patienGrids) {
                    if ($scope.patienGrids.hasOwnProperty(key)) {
                        var element = $scope.patienGrids[key];
                        if (element.noRec !== undefined) {
                            if (element['is' + data] === undefined)
                                element['is' + data] = true;
                            else
                                element['is' + data] = e.target.checked;
                        }
                    }
                }

                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {

                } else {
                    $scope.$apply();

                }

            }
            $scope.refres = function() {
                findPasien.findDetailOrderObat($state.params.noOrder).then(function(e) {
                    //debugger;
                    $scope.listData = ModelItem.beforePost(e.data.data.orders, true);

                    findPasien.getAmbilObat(e.id).then(function(e) {
                        $scope.listAmbilObat = e.data.data.stokProdukGlobal
                    });
                    //debugger;
                    var arr = ModelItem.beforePost(e.data.data.orders, true);
                    var temp = [];
                    for (var key in arr) {
                        if (arr.hasOwnProperty(key)) {
                            var element = arr[key];
                            element.jmlPakai = element.keteranganPakai.jumlahPakai;
                            element.jml = element.jumlah;
                            temp.push(element);
                        }
                    }
                    $scope.patienGrids = temp;
                    $scope.total = _.reduce(e.data.data.orders, function(memo, num) {
                        return memo + (num.jumlah * num.hargaJual);
                    }, 0);
                    $scope.totalObatSesudahDibulatkan = _.reduce(e.data.data.orders, function(memo, num) {
                        return memo + (num.jumlahReal);
                    }, 0);
                    $scope.totalObat = _.reduce(e.data.data.orders, function(memo, num) {
                        return memo + (num.jumlah);
                    }, 0);
                });
            }
            $scope.cetakEtike = function() {
                $state.go('ResepElektronikCetak', {
                    noOrder: $state.params.noOrder,
                    noAntrianPasien: $state.params.noAntrianPasien
                });
            }
            ModelItem.getDataDummyGeneric("Stigma", false).then(function(data) {
                $scope.stigmas = data;
            });
            //  $scope.listAmbilObat = ModelItem.kendoHttpSource('/stok-produk-global/find-produk-obat-stok/?generikId=3');
            $scope.load = function(data) {

                if ($scope.current !== undefined)
                    $scope.current.isEdit = false;
                $scope.current = data;
                data.isEdit = true;
                if (data.statusOrder === 0) return;
                if (data.isNew === false || data.isNew === undefined) return;

                this.$watch('data.produk', function(e) {
                    if (e === undefined) return;
                    data.produk = e;
                });
                data.isLoading = false;
                findPasien.getAmbilObat(data.generik.id).then(function(e) {
                    $scope.listAmbilObat = e.data.data.stokProdukGlobal
                    if ($rootScope.$$phase === null)
                        $scope.$apply();
                    data.isLoading = true;
                });
            }
            
            ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
                $scope.dokters = data;
            });
            $scope.ambilObat = function() {
                var model = $scope.strukOrder;
                model.tglAmbilOrder = $scope.tglPengambilan;
                model.namaPengambilOrder = $scope.namaPengambilOrder;
                managePasien.ambilObat(ModelItem.beforePost(model));
            }
            $scope.$watch('pegawai', function(e) {
                if (e === undefined) return;
                $scope.namaPengambilOrder = e.namaLengkap;
            })
            findPasien.findDetailOrderObat($state.params.noOrder).then(function(e) {
                // $scope.item.pasien = e.data.data.orders[0].pasienDaftar.pasien;
                $scope.listData = ModelItem.beforePost(e.data.data.orders, true);


                cacheHelper.set('daftarOrderApotik', $scope.listData);
                if ($scope.listData.length === 0) return;
                $scope.temp = e.data.data.orders;

                var rKe = 1;
                for (var key in e.data.data.orders) {
                    if (e.data.data.orders.hasOwnProperty(key)) {
                        var element = e.data.data.orders[key];
                        $scope.strukOrder = ModelItem.beforePost(element.strukOrder, true);
                        $scope.tglPengambilan = moment($scope.now).format('YYYY-MM-DD hh:mm:ss')//$scope.strukOrder.tglAmbilOrder;
                        $scope.namaPengambilOrder = $scope.strukOrder.namaPengambilOrder;
                        element.rKe = rKe;
                        element.jmlPakai = element.keteranganPakai.jumlahPakai;
                        element.jml = element.jumlah;
                        if (element.statusOrder === -1) {
                            element.isNew = true;
                            element.produk = undefined;
                        }
                        rKe++;
                        element.jumlahPembulatan = Math.ceil(element.jumlah);
                        for (var j in element.racikan) {
                            if (element.racikan.hasOwnProperty(j)) {

                                var elem = element.racikan[j];
                                if (elem !== undefined) {
                                    if (elem.statusOrder === -1) {
                                        elem.isNew = true;
                                        elem.produk = undefined;

                                    }
                                    elem.totalPembulatan = Math.ceil(elem.total);
                                    elem.hargaJual = 0;
                                    elem.hargaSatuan = 0;
                                }
                            }
                        }
                        socket.on(element.noRec, function(data) {
                            $scope.refres();
                        });
                    }
                }
                $scope.patienGrids = ModelItem.beforePost(e.data.data.orders, true);

                $scope.total = _.reduce(e.data.data.orders, function(memo, num) {
                    return memo + (num.jumlah * num.hargaJual);
                }, 0);
                $scope.totalObatSesudahDibulatkan = _.reduce(e.data.data.orders, function(memo, num) {
                    return memo + (num.jumlahReal);
                }, 0);
                $scope.totalObat = _.reduce(e.data.data.orders, function(memo, num) {
                    return memo + (num.jumlah);
                }, 0);
                //   $scope.item.pasien.jenisPasien = e.data.data.orders[0].pasienDaftar.kelompokPasien.kelompokPasien

            });

        }
    ]);
});