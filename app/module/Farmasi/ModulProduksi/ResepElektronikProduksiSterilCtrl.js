define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ResepElektronikProduksiSterilCtrl', ['ManagePasien', 'socket', '$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R','ManageLogistikPhp','CacheHelper',
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
            var chacePeriode = cacheHelper.get('ResepElektronikProduksiSterilCtrl');
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
                manageLogistikPhp.getDataTableTransaksi('farmasi/get-order-produksi-steril?tglAwal='+ tglAwal+'&tglAkhir='+tglAkhir+nocm).then(function(e) {
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
                cacheHelper.set('ResepElektronikProduksiSterilCtrl', chacePeriode);
            };
            $scope.refresh();


            $scope.now = new Date();
            $scope.detailOrder = function() {
                    //$state.go('ResepElektronikDetail', { noOrder: $scope.item.strukOrder.noOrder, noAntrianPasien: $scope.item.strukOrder.noRegistrasi.noRec });
                    // debugger;
                    var arrStr ={ 0 : $scope.item.nocm ,
                        1 : $scope.item.namapasien,
                        2 : $scope.item.jeniskelamin,
                        3 : $scope.item.noregistrasi, 
                        4 : $scope.item.umur,
                        5 : $scope.item.klid,
                        6 : $scope.item.namakelas,
                        7 : $scope.item.tglregistrasi,
                        8 : $scope.item.norec_apd,
                        9 : 'detail'
                    }
                    cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
                    $state.go('TransaksiPelayananApotik')
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
                        });
                    }else{
                        alert('Status harus Produksi!!')
                    }
                }
                $scope.updateDone = function() {
                    if ( $scope.item.statusorder == 'Packaging') {
                    //managePasien.updateStatusOrder($scope.item.strukOrder.noOrder, 3).then(function(e) {
                        managePasien.updateStatusOrder($scope.item.noorder, 3).then(function(e) {
                            $scope.refresh();
                        });
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
                    cacheHelper.set('InputResepApotikCtrl', arrStr);
                    $state.go('InputResepApotik')

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

        }
        ]);
});