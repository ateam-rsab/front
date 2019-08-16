define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ResepElektronikCtrl', ['ManagePasien', 'socket', '$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R','ManageLogistikPhp','CacheHelper',
        function(managePasien, socket, $state, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r,manageLogistikPhp,cacheHelper) {
            $scope.title = "Resep elektronik";

            $scope.dataVOloaded = true;
            $scope.item = {};
            $rootScope.isOpen = true;
            $scope.item.namaPasien = "";
            $scope.item.ruangan = "";

            // $scope.notDetail = true;
            //define column untuk grid
            $scope.arrColumnGridResepElektronik = [
            {
                "field": "noorder",
                "title": "No Pesanan",
                "width" : "60px",


            }, {
                "field": "nocm",
                "title": "No Rekam Medis",
                "width" : "60px",


            }, {
                "field": "namapasien",
                "title": "Nama Pasien",
                "width" : "100px",

            }, {
                "field": "jeniskelamin",
                "title": "Jenis Kelamin",
                "width" : "60px",

            }, {
                "field": "namaruanganrawat",
                "title": "Ruang Rawat",
                "width" : "100px",

            }, {
                template: "#= new moment(new Date(tglorder)).format('DD-MM-YYYY HH:mm:ss') #",
                "field": "strukOrder.tglOrder",
                "title": "Tanggal/Jam Masuk",
                "width" : "100px",

            }, {
                "field": "namalengkap",
                "title": "Dokter",
                "width" : "100px",

            }, {
                "field": "kelompokpasien",
                "title": "Tipe Pasien",
                "width" : "60px",

            }, {
                hidden: true,
                "field": "namaruangan",
                "width" : "70px",
                "title": "Depo",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # "

            }, {
                "field": "statusorder",
                "title": "Status",
                "width" : "60px",

            }, {
                "field": "namapengambilorder",
                "title": "Pengambil Obat",
                "width" : "70px",

            }];

        LoadCache();
        function LoadCache(){
            var chacePeriode = cacheHelper.get('ResepElektronikCtrl');
            if(chacePeriode != undefined){
                //var arrPeriode = chacePeriode.split(':');
                $scope.startDate = new Date(chacePeriode[0]);
                $scope.untilDate = new Date(chacePeriode[1]);
            }
            else{
                $scope.item.startDate = $scope.now;
                $scope.item.untilDate = $scope.now;
            }
         }

         $scope.noCm = "";
         // $scope.startDate = new Date();
         // $scope.untilDate = new Date();
         $scope.ruanganId = "";
         $scope.group = {
            field: "namaruanganrawat",
            aggregates: [{
                field: "namaruanganrawat",
                aggregate: "count"
            }]
        };
            // $scope.arrColumnGridResepElektronik = [{
            //     "field": "strukOrder.noOrder",
            //     "title": "No Pesanan",


            // }, {
            //     "field": "pasien.noCm",
            //     "title": "No Rekam Medis",


            // }, {
            //     "field": "pasien.namaPasien",
            //     "title": "Nama Pasien",

            // }, {
            //     "field": "pasien.jenisKelamin.jenisKelamin",
            //     "title": "Jenis Kelamin",

            // }, {
            //     "field": "strukOrder.ruangan.namaRuangan",
            //     "title": "Ruang Rawat",

            // }, {
            //     template: "#= new moment(new Date(strukOrder.tglOrder)).format('DD-MM-YYYY HH:mm:ss') #",
            //     "field": "strukOrder.tglOrder",
            //     "title": "Tanggal/Jam Masuk",

            // }, {
            //     "field": "penulisResep.namaLengkap",
            //     "title": "Dokter",

            // }, {
            //     "field": "strukOrder.pasienDaftar.kelompokPasien.kelompokPasien",
            //     "title": "Tipe Pasien",

            // }, {
            //     hidden: true,
            //     "field": "strukOrder.ruanganTujuan.namaRuangan",
            //     "title": "Depo",
            //     aggregates: ["count"],
            //     groupHeaderTemplate: "Ruangan #= value # "

            // }, {
            //     "field": "statusAntrian",
            //     "title": "Status",

            // }, {
            //     "field": "strukOrder.namaPengambilOrder",
            //     "title": "Pengambil Obat",

            // }];

            // $scope.noCm = "";
            // $scope.startDate = new Date();
            // $scope.untilDate = new Date();
            // $scope.ruanganId = "";
            // $scope.group = {
            //     field: "strukOrder.ruanganTujuan.namaRuangan",
            //     aggregates: [{
            //         field: "strukOrder.ruanganTujuan.namaRuangan",
            //         aggregate: "count"
            //     }]
            // };

            $scope.refresh = function() {
                // debugger;
                var nocm =''
                if ($scope.noCm != undefined) {
                    nocm= '&nocm='+$scope.noCm
                }

                var tglAwal = moment($scope.startDate).format('YYYY-MM-DD');
                var tglAkhir = moment($scope.untilDate).format('YYYY-MM-DD');
                manageLogistikPhp.getDataTableTransaksi('logistik/get-daftar-order?tglAwal='+ tglAwal+'&tglAkhir='+tglAkhir+nocm).then(function(e) {
                // findPasien.findOrderObat($scope.noCm, $scope.ruanganId, $scope.startDate, $scope.untilDate).then(function(e) {
                    for (var i = 0; i < e.data.length; i++) {
                        e.data[i].no = i+1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(e.data[i].tgllahir);
                        var umur = DateHelper.CountAge(tanggalLahir, tanggal);
                        e.data[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    }
                    $scope.patienGrids = new kendo.data.DataSource({
                        //data: ModelItem.beforePost(e.data.data, true),
                        data: ModelItem.beforePost(e.data, true),
                        group: $scope.group
                    });


                });
                var chacePeriode ={ 
                      0 : tglAwal,
                      1 : tglAkhir
                    }
                cacheHelper.set('ResepElektronikCtrl', chacePeriode);
            };
            $scope.refresh();


            $scope.now = new Date();
            $scope.detailOrder = function() {

                    //$state.go('ResepElektronikDetail', { noOrder: $scope.item.strukOrder.noOrder, noAntrianPasien: $scope.item.strukOrder.noRegistrasi.noRec });
                   
                    // *** OLD
                    // var arrStr ={ 0 : $scope.item.nocm ,
                    //     1 : $scope.item.namapasien,
                    //     2 : $scope.item.jeniskelamin,
                    //     3 : $scope.item.noregistrasi, 
                    //     4 : $scope.item.umur,
                    //     5 : $scope.item.klid,
                    //     6 : $scope.item.namakelas,
                    //     7 : $scope.item.tglregistrasi,
                    //     8 : $scope.item.norec_apd,
                    //     9 : 'detail'
                    // }
                    // cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
                    // $state.go('TransaksiPelayananApotik')
                    var dataSet = []

                    manageLogistikPhp.getDataTableTransaksi('logistik/get-daftar-detail-order?norec_apd='+ $scope.item.norec_apd).then(function(e) {
                        for (var i = e.data.length - 1; i >= 0; i--) {
                            e.data[i].no=i+1
                            for (let z = 0; z < e.data[i].details.length; z++) {
                                dataSet.push({
                                        no:  z +1,
                                        jeniskelamin:  e.data[i].jeniskelamin,
                                        kelompokpasien: e.data[i].kelompokpasien,
                                        klid:  e.data[i].klid,
                                        namakelas:  e.data[i].namakelas,
                                        namalengkap:  e.data[i].namalengkap,
                                        namapasien:  e.data[i].namapasien,
                                        namapengambilorder:  e.data[i].namapengambilorder,
                                        namaruangan:  e.data[i].namaruangan,
                                        namaruanganrawat:  e.data[i].namaruanganrawat,
                                        nocm:  e.data[i].nocm,
                                        noorder:  e.data[i].noorder,
                                        norec: e.data[i].norec,
                                        norec_apd:  e.data[i].norec_apd,
                                        noregistrasi:  e.data[i].noregistrasi,
                                        statusorder: e.data[i].statusorder,
                                        tgllahir:  e.data[i].tgllahir,
                                        tglorder:  e.data[i].tglorder,
                                        tglregistrasi:  e.data[i].tglregistrasi,
                                        aturanpakai: e.data[i].details[z].aturanpakai,
                                        hargasatuan: e.data[i].details[z].hargasatuan,
                                        jeniskemasan:e.data[i].details[z].jeniskemasan,
                                        jumlah: e.data[i].details[z].jumlah,
                                        namaproduk: e.data[i].details[z].namaproduk,
                                        noorder: e.data[i].details[z].noorder,
                                        rke: e.data[i].details[z].rke,
                                        satuanstandar: e.data[i].details[z].satuanstandar,
                                })
                              
                            }
                        }
                        if(dataSet.length> 0){
                            $scope.item.tglorders = dataSet[0].tglorder
                            $scope.item.noorders = dataSet[0].noorder
                            $scope.item.dokters = dataSet[0].namalengkap
                            $scope.item.statuss = dataSet[0].statusorder
                        }
                        $scope.dataGridRiwayat = new kendo.data.DataSource({
                            data:dataSet,
                            pageSize:10
                        });
        
        
                    });
                    $scope.popUp.center().open()
                }

                $scope.updateProduksi = function() {
                    if ( $scope.item.statusorder == 'Verifikasi') {
                    //managePasien.updateStatusOrder($scope.item.strukOrder.noOrder, 1).then(function(e) {
                        managePasien.updateStatusOrder($scope.item.noorder, 1).then(function(e) {
                            $scope.refresh();
                        });
                    }else{
                        alert('Status harus verifikasi!!')
                    }
                }
                $scope.updatePackaging = function() {
                    if ( $scope.item.statusorder == 'Produksi') {
                    //managePasien.updateStatusOrder($scope.item.strukOrder.noOrder, 2).then(function(e) {
                        managePasien.updateStatusOrder($scope.item.noorder, 2).then(function(e) {
                            $scope.refresh();
                        });;
                    }else{
                        alert('Status harus Produksi!!')
                    }
                }
                $scope.updateDone = function() {
                    if ( $scope.item.statusorder == 'Packaging') {
                    //managePasien.updateStatusOrder($scope.item.strukOrder.noOrder, 3).then(function(e) {
                        managePasien.updateStatusOrder($scope.item.noorder, 3).then(function(e) {
                            $scope.refresh();
                        });;
                    }else{
                        alert('Status harus Packaging!!')
                    }
                }

                $scope.verifikasi = function() {
                    // debugger;

                    if ( $scope.item.statusorder == 'Menunggu') {
                    //$state.go('ResepElektronikVerifikasi', { noOrder: $scope.item.strukOrder.noOrder, noAntrianPasien: $scope.item.strukOrder.noRegistrasi.noRec });
                    var arrStr ={ 0 : $scope.item.nocm ,
                        1 : $scope.item.namapasien,
                        2 : $scope.item.jeniskelamin,
                        3 : $scope.item.noregistrasi, 
                        4 : $scope.item.umur,
                        5 : $scope.item.klid,
                        6 : $scope.item.namakelas,
                        7 : $scope.item.tglregistrasi,
                        8 : $scope.item.norec_apd,
                        9 : $scope.item.noorder,
                        10 : $scope.item.jenisPenjamin,
                        11 : $scope.item.kelompokPasien,
                        12 : $scope.item.beratBadan,
                        13 : $scope.item.AlergiYa,
                        14 : ''
                    }
                    cacheHelper.set('ResepApotikCtrl', arrStr);
                    $state.go('ResepApotik')

                }else{
                    alert('Sudah di verifikasi!!')
                }
            }
            $scope.ambilObat = function() {
                if ( $scope.item.statusorder == 'Selesai') {
                    //$state.go('ResepElektronikAmbilObat', { noOrder: $scope.item.strukOrder.noOrder, noAntrianPasien: $scope.item.strukOrder.noRegistrasi.noRec });
                    $state.go('ResepElektronikAmbilObat', { noOrder: $scope.item.noorder, noAntrianPasien: $scope.item.norec_apd });
                }else{
                    alert('Status harus Selesai!!')
                }
            }
            $scope.columnGridRiwayat = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "30px",
                },
                // {
                //     "field": "tglorder",
                //     "title": "Tgl Order",
                //     "width" : "50px",
                // },
                // {
                //     "field": "noorder",
                //     "title": "No Order",
                //     "width" : "60px",
                // },
                {
                    field: "rke",
                    title: "Rke",
                    width:"50px",
                },
                {
                    field: "jeniskemasan",
                    title: "Jenis Kemasan",
                    width:"100px",
                },
                {
                    field: "namaproduk",
                    title: "Deskripsi",
                    width:"200px"
                },
                {
                    field: "satuanstandar",
                    title: "Satuan",
                    width:"100px"
                },
                {
                    field: "aturanpakai",
                    title: "Aturan Pakai",
                    width:"100px"
                },
                {
                    field: "jumlah",
                    title: "Qty",
                    width:"100px"
                },
                // {
                //     "field": "namalengkap",
                //     "title": "Dokter",
                //     "width" : "100px"
                // },
                {
                    "field": "namaruangan",
                    "title": "Apotik",
                    "width" : "70px",
                },
                // {
                //     "field": "statusorder",
                //     "title": "Status",
                //     "width" : "70px",
                // }
                ];
                $scope.detailGridOptions = function(dataItem) {
                    return {
                        dataSource: new kendo.data.DataSource({
                            data: dataItem.details
                        }),
                        columns: [
                        {
                            field: "rke",
                            title: "Rke",
                            width:"30px",
                        },
                        {
                            field: "jeniskemasan",
                            title: "Jenis Kemasan",
                            width:"100px",
                        },
                        {
                            field: "namaproduk",
                            title: "Deskripsi",
                            width:"200px"
                        },
                        {
                            field: "satuanstandar",
                            title: "Satuan",
                            width:"100px"
                        },
                        {
                            field: "aturanpakai",
                            title: "Aturan Pakai",
                            width:"100px"
                        },
                        {
                            field: "jumlah",
                            title: "Qty",
                            width:"100px"
                        }]
                    };
                };

            
        }
        ]);
});