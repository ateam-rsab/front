define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AnamesisCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper',
        function(findPasien, managePasien, $rootScope, $scope, ModelItem, $state, cacheHelper, dateHelper) {

            $scope.noCM = $state.params.noCM;
            //indikator harap tunggu
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $rootScope.showMenuPengkajianMedis = true;
            $scope.tanggal = $state.params.tanggal;

            $scope.petugas = ModelItem.getPegawai();

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                $scope.noRec = data.data.noRec;
                $scope.tglDaftar = new moment(data.data.tglRegistrasi).format('YYYY-MM-DD');
                $scope.ruangan = data.data.ruangan.id;
            });

            $scope.getDataAnamnesis=function(){
                findPasien.getAnamnesis($state.params.noCM).then(function(data) {
                    debugger;
                    $scope.dataAnamnesis = data.data.data;

                    $scope.sourceAnamnesisDokter = new kendo.data.DataSource({
                        pageSize: 10,
                        data: $scope.dataAnamnesis
                    });

                    $scope.mainGridOptions = {
                        pageable: true,
                        columns: [
                        {
                            "field": "tanggalInput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "petugas",
                            "title": "Petugas",
                            "width": "200px"
                        }, {
                            "field": "namaRuangan",
                            "title": "Ruangan",
                            "width": "200px"
                        }, {
                            "field": "anamnesisDokter",
                            "title": "Anamnesis",
                            "width": "300px"
                        }
                        ]
                    };
                });
            };

            $scope.SelectData=function(data)
            {
                console.log(JSON.stringify(data));
                $scope.item.anamnesisDokter=data.anamnesisDokter
                // debugger;
            };

            $scope.SelectDataRiwayat=function(data)
            {
                console.log(JSON.stringify(data));
                $scope.item.riwayatPengobatan=data.riwayatPengobatan;
                $scope.item.riwayatPenyakit=data.riwayatPenyakit;
                // debugger;
            };

            $scope.Batal = function(){
                $scope.item.anamnesisDokter = "";
            };

            $scope.BatalRiwayat = function(){
                $scope.item.riwayatPengobatan = "";
                $scope.item.riwayatPenyakit = "";
            }

            $scope.getDataAnamnesis();

            $scope.SaveAnamnesis = function(){
                debugger;
                $scope.now = new Date();

                var data = {
                    "anamnesisDokter": $scope.item.anamnesisDokter,
                    "petugas":{  
                        "id":$scope.petugas.id
                    },
                     "tanggalInput": $scope.now,
                     "tanggalPendaftaran":$scope.tglDaftar,
                     "pasienDaftar":{  
                        "noRec":$scope.noRec
                     },
                     "ruangan":{  
                        "id":$scope.ruangan
                     }
                }
                console.log(JSON.stringify(data));
                managePasien.saveAnamnesis(data,"anamnesis/save-anamnesis").then(function(e) {
                    $scope.getDataAnamnesis();
                    $scope.Batal();
                });
                
            };

            $scope.getDataRiwayat=function(){
                findPasien.getRiwayatAnamnesis($state.params.noCM).then(function(data) {
                    debugger;
                    $scope.dataRiwayatAnamnesis = data.data.data;

                    $scope.sourceRiwayatAnamnesis = new kendo.data.DataSource({
                        pageSize: 10,
                        data: $scope.dataRiwayatAnamnesis
                    });

                    $scope.mainGridOptions2 = {
                        pageable: true,
                        columns: [
                        {
                            "field": "tanggalInput",
                            "title": "Tgl / Jam",
                            "width": "100px"
                        }, {
                            "field": "petugas",
                            "title": "Petugas",
                            "width": "200px"
                        }, {
                            "field": "namaRuangan",
                            "title": "Ruangan",
                            "width": "200px"
                        },{
                            "field": "riwayatPenyakit",
                            "title": "Riwayat Penyakit",
                            "width": "300px"
                        }, {
                            "field": "riwayatPengobatan",
                            "title": "Riwayat Pengobatan",
                            "width": "300px"
                        }
                        ]
                    };
                });
            };

            $scope.getDataRiwayat();

            $scope.SaveAnamnesisRiwayat = function(){
                debugger;
                $scope.now = new Date();

                var data = [{
                    "riwayatPengobatan": $scope.item.riwayatPengobatan,
                    "riwayatPenyakit": $scope.item.riwayatPenyakit,
                     "petugas":{  
                        "id":$scope.petugas.id
                     },
                     "tanggalInput":$scope.now,
                     "tanggalPendaftaran":$scope.tglDaftar,
                     "pasienDaftar":{  
                        "noRec":$scope.noRec
                     },
                     "ruangan":{  
                        "id":$scope.ruangan
                     }
                }]
                console.log(JSON.stringify(data));
                managePasien.saveAnamnesis(data,"riwayat-penyakit-pengobatan/save-riwayat-penyakit-pengobatan").then(function(e) {
                    $scope.getDataRiwayat();
                    $scope.BatalRiwayat();
                });
                
            }
            // $scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Pengkajian  Keperawatan";
            // $scope.noCM = $state.params.noCM;

            // //indikator harap tunggu
            // $rootScope.doneLoad = false;
            // debugger;
            // findPasien.getKeluhanUtama($state.params.noCM, $state.params.tanggal).then(function(e) {
            //     if (e.data.data.papKeluhanUtama !== undefined)
            //         if (e.data.data.papKeluhanUtama.keluhanUtama != undefined) {

            //             var anamesis = "Keluhan Utama : " + e.data.data.papKeluhanUtama.keluhanUtama + "\nKeluhan Tambahan : \n";
            //             findPasien.getDataKeluhanTambahan($state.params.noRec).then(function(data) {
            //                 if (data.data.data.PapKeluhanTambahan!==undefined) {
            //                 // if (data.data.data.dataFound) {

            //                     $scope.item.keluhanTambahan = ModelItem.beforePost(data.data.data.PapKeluhanTambahan, true);
            //                     $scope.detailKeluhan = $scope.item.keluhanTambahan;
            //                     var temp = []

            //                     for (var key in $scope.item.keluhanTambahan) {
            //                         if ($scope.item.keluhanTambahan.hasOwnProperty(key)) {
            //                             var element = $scope.item.keluhanTambahan[key];
            //                             anamesis += "\n" + element.keluhanTambahan;
            //                         }
            //                     }

            //                     $scope.item.anamansisSuster = anamesis;

            //                 } else {
            //                     $scope.editMode = false;
            //                     $scope.item.anamansisSuster = anamesis;
            //                 }
            //             })
            //             findPasien.getDataKeluhanUtama($state.params.noRec).then(function(data) {
            //                 if (data.data.data.PapKeluhanTambahan!==undefined) {

            //                     $scope.item.keluhanTambahan = ModelItem.beforePost(data.data.PapKeluhanTambahan, true);
            //                     $scope.detailKeluhan = $scope.item.keluhanTambahan;
            //                     var temp = []

            //                     for (var key in $scope.item.keluhanTambahan) {
            //                         if ($scope.item.keluhanTambahan.hasOwnProperty(key)) {
            //                             var element = $scope.item.keluhanTambahan[key];
            //                             anamesis += "\n" + element.keluhanTambahan;
            //                         }
            //                     }

            //                     $scope.item.anamansisSuster = anamesis;

            //                 } else {
            //                     $scope.editMode = false;
            //                 }
            //             })

            //         }
            // });
            // $scope.sourceAnamnesisDokter = new kendo.data.DataSource({
            //     pageSize: 10,
            //     data: $scope.dataAnamnesisDokterm
            // })

            // $scope.mainGridOptions = {
            //     pageable: true,
            //     columns: [
            //     {
            //         "field": "tanggalInput",
            //         "title": "Tgl / Jam",
            //         "width": "100px"
            //     }, {
            //         "field": "petugas",
            //         "title": "Petugas",
            //         "width": "200px"
            //     }, {
            //         "field": "namaRuangan",
            //         "title": "Ruangan",
            //         "width": "200px"
            //     }, {
            //         "field": "Anamnesis",
            //         "title": "Anamnesis",
            //         "width": "300px"
            //     }
            //     ]
            // }
            // // findPasien.getAnamesisPasien($scope.noCM, $scope.tanggal).then(function(e) {
            // //     var anamesis = "Keluhan Utama : " + e.data.keluhanUtama + "\nKeluhan Tambahan : \n";
            // //     for (var key in e.data.keluhanTambahan) {
            // //         if (e.data.keluhanTambahan.hasOwnProperty(key)) {
            // //             var element = e.data.keluhanTambahan[key];
            // //             anamesis += "\t " + element.tambahan + "\n";
            // //         }
            // //     }

            // //     $scope.item.keluhanUtama = anamesis

            // // });

            // $rootScope.showMenu = true;
            // $rootScope.showMenuDetail = false;
            // $scope.tanggal = $state.params.tanggal;
            // $scope.item = {};
            $scope.dataRiwayatPenyakitOrObat = new kendo.data.DataSource({
                data: []
            });

            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            findPasien.getByNoCM($scope.noCM).then(function(data) {
                $rootScope.currentPasien = data.data.data;
                $scope.pasien = data.data.data;
            });

            $scope.columnRiwayatPenyakitOrObat = [{
                "field": "riwayatPenyakit",
                "title": "Riwayat Penyakit"
            }, {
                "field": "riwayatPengobatan",
                "title": "Riwayat Pengobatan"
            }];

            $scope.addDataRiwayatPenyakitOrObat = function() {
                $scope.dataRiwayatPenyakitOrObat.add({
                    riwayatPenyakit: $scope.item.riwayatPenyakit,
                    riwayatPengobatan: $scope.item.riwayatPengobatan
                });
                $scope.item.riwayatPenyakit="";
                riwayatPengobatan: $scope.item.riwayatPengobatan="";
            }

            $scope.removeRiwayatPenyakitOrObat = function() {
                $scope.dataRiwayatPenyakitOrObat.data([]);
            };

            $scope.Save = function() {
                var data = {};
                data.anamesisSuster = $scope.item.keluhanUtama;
                data.anamesisDokter = $scope.item.anamesisDokter;

                var riwayatPenyakitPengobatan = $scope.dataRiwayatPenyakitOrObat._data;

                var tempListRiwayatPenyakit = [];
                for (var i = 0; i < riwayatPenyakitPengobatan.length; i++) {
                    var obj = {
                        "riwayatPengobatan": riwayatPenyakitPengobatan[i].riwayatPengobatan,
                        "riwayatPenyakit": riwayatPenyakitPengobatan[i].riwayatPenyakit
                    }

                    tempListRiwayatPenyakit.push(obj);
                }

                $scope.item.riwayatPenyakitPengobatan = tempListRiwayatPenyakit;


                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                managePasien.saveAnamesisDokterUmum(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

                    $scope.kajianAwal.anamesis = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    /*$state.go('dashboardpasien.Sirkulasi', {
                        noCM: $scope.noCM
                    });*/
                });

            };
            // $rootScope.doneLoad = false;
            // $rootScope.showMenu = false;
            // $rootScope.showMenuDetail = false;
            // $rootScope.showMenuPengkajianMedis = true;
        }
    ]);
});