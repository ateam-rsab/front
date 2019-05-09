/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function(initialize) {

    'use strict';
    initialize.controller('MasukKamarCtrl', ['DateHelper','ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien',
        function(dateHelper,managePasien, $rootScope, $scope, ModelItem, $state, findPasien) {
            debugger;
            $scope.title = "Masuk Kamar";
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            $scope.item = {};
            $scope.instruksi = $state.params.instruksi;
            findPasien.getPasienDaftar($state.params.noRec).then(function(e) {
                $scope.pasien = e.data.data;
                $scope.item.pasien = e.data.data.pasien;
                $scope.item.pasien.tglDaftarku = dateHelper.formatDate(e.data.data.pasien.tglDaftar, "DD-MM-YYYY")
                
                if ($scope.pasien !== undefined) {
                    debugger;
                    findPasien.getPasienDaftarDua($scope.item.pasien.noCm).then(function(f) {
                        $scope.item.pasiendua = f.data.data;
                    })
                }
            })

            // findPasien.getDokterDPJP().then(function(e) {
            //     debugger;
            //     ListDokterDpjp = e.data;
            // })
            // var noRec = $state.params.noRec;
            // findPasien.getSuratPermintaanMasukRumahSakitAll("papgeneric/find-medical-record-tglInput/?key=noRec=" + noRec).then(function(e) {
            //     $scope.item.intruksi= e.data.data.SuratPermintaanMasuk.pertolongn;   
            // })

            ModelItem.get("MasukKamar").then(function(data) {;
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            var dataItem = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
            dataItem.fetch(function() {
                    $scope.namaRuang = dataItem._data;
                })

            $scope.$watch('item.ruangan', function(e) {
                if (e === undefined) return;
                var ruanganId = $scope.item.ruangan.id;
                findPasien.findDokterDPJP(ruanganId).then(function(dr){
                    debugger;
                    $scope.ListDokterDpjp = dr.data;
                })
                findPasien.getKelasByRuangan(ruanganId).then(function(a) {
                    $scope.listKelas = a.data.data.listData;
                })
            });

            $scope.$watch('item.kelas', function(e) {
                if (e === undefined) return;
                var kelasId = $scope.item.kelas.id;
                var ruanganId = $scope.item.ruangan.id
                findPasien.getKamarByKelas(kelasId, ruanganId).then(function(a) {
                    $scope.listKamar = a.data.data.listData;
                })
            });
            $scope.$watch('item.kamar', function(e) {
                if (e === undefined) return;
                var kamarId = $scope.item.kamar.id;
                findPasien.getNoBed(kamarId).then(function(a) {
                    $scope.listNoBed = a.data.data.listData;
                })
            });
            // findPasien.getPasienDaftar($state.params.noRec).then(function(e) {
            //     $scope.pasien = e.data.data;
            //     $scope.item.pasien = e.data.data.pasien;
            //     $scope.item.pasien.tglDaftarku = dateHelper.formatDate(e.data.data.pasien.tglDaftar, "DD-MM-YYYY")
                
            // if ($scope.pasien !== undefined) {
            //     debugger;
            //         findPasien.getPasienDaftarDua($scope.item.pasien.noCm).then(function(f) {
                
            //     $scope.item.pasiendua = f.data.data;
            // })}
                
            // })
            



            // $scope.$watch('noCm', function(e) {
            //     if (e === undefined) return;
            //     if (e === window.noCm) return;
            //     window.noCm = e;
            //     findPasien.getDataPasien(undefined, e).then(function(e) {
            //         $scope.pasiens = e.data.data.listData;
            //     })
            // })

            // ModelItem.get("MasukKamar").then(function(data) {;
            //     $scope.item = data;
            //     $scope.dataVOloaded = true;
            // }, function errorCallBack(err) {});
            // var dataItem = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
            // dataItem.fetch(function() {
            //         $scope.namaRuang = dataItem._data;
            //     })
            //     // ModelItem.getDataDummyGeneric("Ruangan", true).then(function(data) {
            //     //     $scope.listRuangan = data;
            //     //     $scope.listRuangan.read();

            // //     $scope.namaRuang = function(apps) {
            // //         return apps.departemenId === 16;
            // //     };
            // // })

            // $scope.$watch('item.ruangan', function(e) {
            //     if (e === undefined) return;
            //     $scope.listTipeRuang = _.filter($scope.listKelas, function(e) {
            //         return e.id;
            //     })

            // });

            // ModelItem.getDataDummyGeneric("Kelas", false).then(function(data) {
            //     $scope.listKelas = data;
            // })
            // debugger;
            // ModelItem.getDataDummyGeneric("Kamar", false).then(function(data) {
            //     $scope.listAllKamar = data;
            // })

            // $scope.$watch('item.kelas', function(e) {
            //     debugger;
            //     if (e === undefined) return;
            //     $scope.listTipeKelas = _.filter($scope.listAllKamar, function(apps) {
            //         return apps.kelasId === e.id && apps.ruanganId === $scope.item.ruangan.id;
            //     })
            // });

            // ModelItem.getDataDummyGeneric("Kamar", false).then(function(data) {
            //     $scope.listKamar = data;
            //     /* $scope.listKamar.read();*/
            // })

            // $scope.$watch('item.kamar', function(e) {
            //     if (e === undefined) return;
            //     $scope.listTipeKamar = _.filter($scope.listAllTipeKamar, function(v) {
            //         return v.kamarId === e.id;
            //     })
            // });

            // ModelItem.getDataDummyGeneric("TempatTidur", false, false, 250, undefined, "id,nomorBed,statusBed,namaExternal,kamarId").then(function(data) {
            //     $scope.listAllTipeKamar = data;
            // })

            $scope.Save = function() {
                debugger;
                managePasien.saveMasukKamar({
                    "kamar": {
                        "id": $scope.item.kamar.id
                    },
                    "kelas": {
                        "id": $scope.item.kelas.id
                    },
                    "tempatTidur": {
                        "id": $scope.item.nomorBed.id
                    },
                    "pasienDaftar": {
                        "noRec": $state.params.noRec
                    },
                    "persetujuanUmum": {
                        "noRec": $state.params.noPersetujuan
                    },
                    "noRec": $state.params.noPersetujuan,
                    "pemberiInformasi" : $scope.item.pemberiInformasi
                }).then(function(data){
                    $scope.isNext = true;
                })
            }
        }
    ]);

});