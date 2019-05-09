define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InputJamLemburCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm',
        function($rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm) {
            ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
                $scope.item = data;
                $scope.now = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});
            $scope.no = 1;
            ModelItem.getDataDummyGeneric("Penandatangan", true).then(function(data) {
                $scope.listPenandatangan = data;
            })
            $scope.dataLaporanUjiHasil = new kendo.data.DataSource({
                data: [{}]
            });

            $scope.pindah = function() {

                $state.go("RekamDataPegawai");

            }
            NamaAsuransi.getOrderList("service/list-generic/?view=NamaAsuransi&select=*", true).then(function(dat) {
                $scope.ListNamaAsuransi = dat.data;

            });

            $scope.Listketerangan = [{
                "id": 1,
                "kode": "1",
                "name": "2016"
            }];


            $scope.ganti = function() {

                if ($scope.item.tahunUMR.name == "2016") {
                    $scope.item.jumlahUMR = "2300000";

                } else {
                    $scope.item.jumlahUMR = "";

                }

            }









            $scope.pindah1 = function() {

                $state.go("DataKeluarga");

            }


            $scope.daftarJenisBahan = new kendo.data.DataSource({
                data: [{
                        "kodeJenis": "BHN001",
                        "JenisBahan": "Aldet"
                    }, {
                        "kodeJenis": "BHN002",
                        "JenisBahan": "Laudet"
                    }, {
                        "kodeJenis": "BHN003",
                        "JenisBahan": "MC. Bleach"
                    }, {
                        "kodeJenis": "BHN004",
                        "JenisBahan": "OXO. Bleach"
                    }, {
                        "kodeJenis": "BHN005",
                        "JenisBahan": "E. 951"
                    }, {
                        "kodeJenis": "BHN006",
                        "JenisBahan": "M. Saur"
                    }, {
                        "kodeJenis": "BHN007",
                        "JenisBahan": "M. Soft"
                    }

                ]
            });


            $scope.daftarBahanLinen = new kendo.data.DataSource({
                data: [{
                        "kodeJenis": "BHN001",
                        "JenisBahan": "Aldet"
                    }, {
                        "kodeJenis": "BHN002",
                        "JenisBahan": "Laudet"
                    }, {
                        "kodeJenis": "BHN003",
                        "JenisBahan": "MC. Bleach"
                    }, {
                        "kodeJenis": "BHN004",
                        "JenisBahan": "OXO. Bleach"
                    }, {
                        "kodeJenis": "BHN005",
                        "JenisBahan": "E. 951"
                    }, {
                        "kodeJenis": "BHN006",
                        "JenisBahan": "M. Saur"
                    }, {
                        "kodeJenis": "BHN007",
                        "JenisBahan": "M. Soft"
                    }

                ]
            });
            var init = function() {
                ManageSdm.getOrderList("sdm/get-kehadiran/147/2017-01-01/2017-02-21", true).then(function(dat) {
                    $scope.lisDataMaster = dat.data.data.listkehadiran;
                    var getData = [];
                    var i = 1;
                    $scope.lisDataMaster.forEach(function(e) {
                        var daftar = {
                            "nip": e.nip,
                            "namaPegawai": e.nama,
                            "unitKerja": e.namaRuangan,
                            "statusPegawai": e.alasan,
                            "jabatan": e.jabatanInternal,
                            "tanggalLembur": e.tanggal,
                            "jamLembur": e.jadwalPulang + " - " + e.absensiPulang,
                            "jadwalPulang": e.jadwalPulang,
                            "absensiPulang": e.absensiPulang,
                            "totalJamLembur": parseFloat(eval(parseInt(e.kelebihanJamKerja) / 60).toFixed(2)),
                            "keterangan": e.alasan
                        }
                        getData[i - 1] = daftar
                        i++;
                    });
                    $scope.source = getData;

                    $scope.dataSource = new kendo.data.DataSource({
                        data: $scope.source,
                        autoSync: true
                    });
                    
                });
            }
            init();
            $scope.mainGridOptions = {
                pageable: false,
                selectable: "row",
                columns: $scope.columnLaporanUjiHasil,
                editable: "popup",
                scrollable: false,
            };
            $scope.klik = function(current) {
                $scope.showEdit = true;
                $scope.current = current;
                $scope.totalLembur = current.totalJamLembur;
                if ($scope.totalLembur >= 2) {
                    $scope.item.unitKerja = current.unitKerja;
                    $scope.item.namaPegawai = current.namaPegawai;
                    $scope.item.NIP = current.nip;
                    $scope.item.jabatan = current.jabatan;
                    $scope.item.tanggalLembur = current.tanggalLembur;
                    $scope.item.totalJamLembur = current.totalJamLembur;
                    $scope.item.jamLembur = current.jadwalPulang;
                    $scope.item.jamLembur2 = current.absensiPulang;
                    $scope.item.keterangan = current.keterangan;
                }
                
            };

            $scope.columnLaporanUjiHasil = [{
                "field": "nip",
                "title": "NIP"
            }, {
                "field": "namaPegawai",
                "title": "Nama Pegawai"
            }, {
                "field": "unitKerja",
                "title": "Unit Kerja"
            }, {
                "field": "statusPegawai",
                "title": "Status Pegawai"
            }, {
                "field": "jabatan",
                "title": "Jabatan"
            }, {
                "field": "tanggalLembur",
                "title": "Tanggal Lembur"
            }, {
                "field": "jamLembur",
                "title": "Jam Lembur"
            }, {
                "field": "jadwalPulang",
                "hidden": true
            }, {
                "field": "absensiPulang",
                "hidden": true
            }, {
                "field": "totalJamLembur",
                "title": "Total Jam Lembur"
            }, {
                "field": "keterangan",
                "title": "Keterangan"
            }];



            $scope.Save = function() {


                ManageSdm.savePremiKesehatan(ModelItem.beforePost($scope.item)).then(function(e) {
                    $scope.item = {};
                    init();
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
                });


            };





















        }
    ]);
});
