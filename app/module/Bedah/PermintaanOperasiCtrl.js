define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PermintaanOperasiCtrl', ['ManagePasien', 'socket', '$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R','$timeout','$mdDialog',
        function(managePasien, socket, $state, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r, $timeout, $mdDialog) {
            $scope.model = { tglPelayanan: new Date() };
            $scope.items = [];
            $scope.temp = [];
            $scope.no = 1;
            $scope.isHeader = true;
            $scope.item= {};
            $scope.item.tglRencanaOperasi=new Date();
            findPasien.getPermintaanOperasiByNoRec($state.params.noRecRegistrasi).then(function(dat){
            debugger;
            $scope.listDataPermintaan = dat.data.data;
            $scope.item.noRM = $scope.listDataPermintaan.noCm;
            $scope.item.namaPasien = $scope.listDataPermintaan.namaPasien;
            $scope.item.namaRuangan = $scope.listDataPermintaan.namaRuangan;
            $scope.item.tglPermintaanOperasi = new moment($scope.listDataPermintaan.tglPermintaanOperasi).format('DD-MM-YYYY');
            $scope.item.namaJenisOperasi = $scope.listDataPermintaan.namaJenisOperasi;
            });

            $scope.showTambah1 = true;
            $scope.tambah2 = function () {
                $scope.showTambah1 = false;
                $scope.showJenisPelaksana2 = true;
                $scope.showTambah2 = true;
                $scope.showHapus2 = true;
            };

            $scope.hapus2= function () {
                $scope.showTambah1 = true;
                $scope.showJenisPelaksana2 = false;
                $scope.showTambah2 = false;
                $scope.item.jenisPelaksana2 = "";
                $scope.selectedPegawai2 = [];
            };
            $scope.tambah3 =function () {
                $scope.showTambah2 = false;
                $scope.showJenisPelaksana3 = true;
                $scope.showTambah3 = true;
                $scope.showHapus3 = true;
                $scope.showHapus2 = false;
            }
            $scope.hapus3= function () {
                $scope.showTambah2 = true;
                $scope.showJenisPelaksana3 = false;
                $scope.showTambah3 = false;
                $scope.showHapus2 = true;
                $scope.item.jenisPelaksana3 = "";
                $scope.selectedPegawai3 = [];
            };
            $scope.tambah4 =function () {
                $scope.showTambah3 = false;
                $scope.showJenisPelaksana4 = true;
                $scope.showTambah4 = true;
                $scope.showHapus3 = false;
                $scope.showHapus4 = true;
            }
            $scope.hapus4= function () {
                $scope.showTambah3 = true;
                $scope.showJenisPelaksana4 = false;
                $scope.showTambah4 = false;
                $scope.showHapus3 = true;
                $scope.item.jenisPelaksana4 = "";
                $scope.selectedPegawai4 = [];
            };
            $scope.tambah5 =function () {
                $scope.showTambah4 = false;
                $scope.showJenisPelaksana5 = true;
                $scope.showTambah5 = true;
                $scope.showHapus4 = false;
                $scope.showHapus5 = true;
            }
            $scope.hapus5= function () {
                $scope.showTambah4 = true;
                $scope.showJenisPelaksana5 = false;
                $scope.showTambah5 = false;
                $scope.showHapus4 = true;
                $scope.item.jenisPelaksana5 = "";
                $scope.selectedPegawai5 = [];
            };
            $scope.tambah6 =function () {
                $scope.showTambah5 = false;
                $scope.showJenisPelaksana6 = true;
                $scope.showTambah6 = true;
                $scope.showHapus5 = false;
                $scope.showHapus6 = true;
            }
            $scope.hapus6= function () {
                $scope.showTambah5 = true;
                $scope.showJenisPelaksana6 = false;
                $scope.showTambah6 = false;
                $scope.showHapus5 = true;
                $scope.item.jenisPelaksana5 = "";
                $scope.selectedPegawai5 = [];
            };

            $scope.init = function () {
                debugger;
                var id = $scope.item.jenisPelaksana.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;

                    $scope.dataSource = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });
                });
            };
            $scope.selectedPegawai = [];
            $scope.init2 = function () {
                var id = $scope.item.jenisPelaksana2.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource2 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai2 = [];
            $scope.init3 = function () {
                var id = $scope.item.jenisPelaksana3.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource3 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai3 = [];
            $scope.init4 = function () {
                var id = $scope.item.jenisPelaksana3.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource4 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai4 = [];
            $scope.init5 = function () {
                var id = $scope.item.jenisPelaksana3.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource5 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai5 = [];
            $scope.init6 = function () {
                var id = $scope.item.jenisPelaksana3.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource6 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai6 = [];

            $scope.asdasd = function () {
                $scope.dataPegawai = $scope.selectedPegawai.concat($scope.selectedPegawai2,$scope.selectedPegawai3,$scope.selectedPegawai4,$scope.selectedPegawai5,$scope.selectedPegawai6);
                console.log(JSON.stringify($scope.dataPegawai));
            }

            $scope.selectOptions = {
                placeholder: "Pilih Pegawai...",
                dataTextField: "namaLengkap",
                dataValueField: "id",
                valuePrimitive: true,
                autoBind: false
            };
            
            findPasien.getPegawaiPelaksana().then(function(data) {
                $scope.ListJenisDiagnosisPrimer = data.data.data.listData;
            })
            
            $scope.simpan = function() {
                $scope.items.push($scope.model);
                $scope.model = { detailPelaksana: [], tglPelayanan: new Date() };
            }
            $scope.now = new Date();

            $scope.petugas = [];
            
            $scope.petugas1 = function () {
                $scope.pegawai = [];
                for (var i = 0; i < $scope.selectedPegawai.length; i++) {
                     var pegawai ={
                        "id": $scope.selectedPegawai[i].id
                     } 
                     $scope.pegawai.push(pegawai);
                }

                var tempPetugas1 = {
                    "jenisPelaksana":{  
                        "id": $scope.item.jenisPelaksana.id
                    },
                    "pegawaiList": $scope.pegawai,
                    "ruangan":{  
                        "id":$scope.listDataPermintaan.idRuangan
                    }
                }
                $scope.petugas.push(tempPetugas1);
            }
            $scope.petugas2 = function () {
                $scope.pegawai2 = [];
                if ($scope.item.jenisPelaksana2 == undefined || $scope.item.jenisPelaksana2 == ""){
                    var tempPetugas2 = null;
                } else {
                    for (var i = 0; i < $scope.selectedPegawai2.length; i++) {
                         var pegawai ={
                            "id": $scope.selectedPegawai2[i].id
                         } 
                         $scope.pegawai2.push(pegawai);
                    }
                    var tempPetugas2 = {
                        "jenisPelaksana":{  
                            "id": $scope.item.jenisPelaksana2.id
                        },
                        "pegawaiList": $scope.pegawai2,
                        "ruangan":{  
                            "id":$scope.listDataPermintaan.idRuangan
                        }
                    }
                    $scope.petugas.push(tempPetugas2);
                }
                
            }
            $scope.petugas3 = function () {
                if ($scope.item.jenisPelaksana3 == undefined || $scope.item.jenisPelaksana3 == ""){
                    var tempPetugas3 = null;
                } else {
                    $scope.pegawai3 = [];
                    for (var i = 0; i < $scope.selectedPegawai3.length; i++) {
                         var pegawai ={
                            "id": $scope.selectedPegawai3[i].id
                         } 
                         $scope.pegawai3.push(pegawai);
                    }
                    var tempPetugas3 = {
                        "jenisPelaksana":{  
                            "id": $scope.item.jenisPelaksana3.id
                        },
                        "pegawaiList": $scope.pegawai3,
                        "ruangan":{  
                            "id":$scope.listDataPermintaan.idRuangan
                        }
                    }
                    $scope.petugas.push(tempPetugas3);
                }
                
            }
            $scope.petugas4 = function () {
                if ($scope.item.jenisPelaksana4 == undefined || $scope.item.jenisPelaksana4 == ""){
                    var tempPetugas4 = null;
                } else {
                    $scope.pegawai4 = [];
                    for (var i = 0; i < $scope.selectedPegawai4.length; i++) {
                         var pegawai ={
                            "id": $scope.selectedPegawai4[i].id
                         } 
                         $scope.pegawai4.push(pegawai);
                    }
                    var tempPetugas4 = {
                        "jenisPelaksana":{  
                            "id": $scope.item.jenisPelaksana4.id
                        },
                        "pegawaiList": $scope.pegawai4,
                        "ruangan":{  
                            "id":$scope.listDataPermintaan.idRuangan
                        }
                    }
                    $scope.petugas.push(tempPetugas4);
                }
                
            }
            $scope.petugas5 = function () {
                if ($scope.item.jenisPelaksana5 == undefined || $scope.item.jenisPelaksana5 == ""){
                    var tempPetugas5 = null;
                } else {
                    $scope.pegawai5 = [];
                    for (var i = 0; i < $scope.selectedPegawai5.length; i++) {
                         var pegawai ={
                            "id": $scope.selectedPegawai5[i].id
                         } 
                         $scope.pegawai5.push(pegawai);
                    }
                    var tempPetugas5 = {
                        "jenisPelaksana":{  
                            "id": $scope.item.jenisPelaksana5.id
                        },
                        "pegawaiList": $scope.pegawai5,
                        "ruangan":{  
                            "id":$scope.listDataPermintaan.idRuangan
                        }
                    }
                    $scope.petugas.push(tempPetugas5);
                }
                
            }
            $scope.petugas6 = function () {
                if ($scope.item.jenisPelaksana6 == undefined || $scope.item.jenisPelaksana6 == ""){
                    var tempPetugas6 = null;
                } else {
                    $scope.pegawai6 = [];
                    for (var i = 0; i < $scope.selectedPegawai6.length; i++) {
                         var pegawai ={
                            "id": $scope.selectedPegawai6[i].id
                         } 
                         $scope.pegawai6.push(pegawai);
                    }
                    var tempPetugas6 = {
                        "jenisPelaksana":{  
                            "id": $scope.item.jenisPelaksana6.id
                        },
                        "pegawaiList": $scope.pegawai6,
                        "ruangan":{  
                            "id":$scope.listDataPermintaan.idRuangan
                        }
                    }
                    $scope.petugas.push(tempPetugas6);
                }
                
                
            }
            $scope.Save = function() {
                $scope.petugas1();
                $scope.petugas2();
                $scope.petugas3();
                $scope.petugas4();
                $scope.petugas5();
                $scope.petugas6();
                debugger;
                // debugger;
                
                var tglPermintaanOperasi = DateHelper.formatDate($scope.listDataPermintaan.tglPermintaanOperasi, 'YYYY-MM-DD');
                var tglRencanaOperasi = DateHelper.formatDate($scope.item.tglRencanaOperasi, 'YYYY-MM-DD');

                var data = {
                    "strukOrder": {
                        "noRec": $scope.listDataPermintaan.strukOrderId
                    },
                    "rencanaOperasi": {
                        "tglPermintaanOperasi": tglPermintaanOperasi,
                        "tglRencana": tglRencanaOperasi,
                        "kamar": {
                            "id": null
                        },
                        "ruangan": {
                            "id": null
                        },
                        "jenisOperasi": {
                            "id": null
                        },
                        "detailPelaksana": $scope.petugas
                    }
                }
                console.log(JSON.stringify(data));
                managePasien.saveRencanaOperasi(ModelItem.beforePost(data))
                // $timeout(function () {
                //     $scope.back();
                // }, 5000);
               var confirm = $mdDialog.confirm()
                      .title('Peringatan')
                      .textContent('Apakah Anda akan melanjutkan ke Form Daftar Rencana Operasi?')
                      .ariaLabel('Lucky day')
                      .cancel('Tidak')
                      .ok('Ya')
                $mdDialog.show(confirm).then(function() {
                    $state.go("JadwalOperasi");
                })
            };

            $scope.back = function(){
                $state.go('DaftarPermintaanOperasi')
            }

            // $scope.Save = function () {
            //     managePasien.saveTindakan(ModelItem.beforePost($scope.finalTindakanPelayanan))
            //     console.log(JSON.stringify($scope.finalTindakanPelayanan));
            //     // body...
            // }

        }
    ]);
});