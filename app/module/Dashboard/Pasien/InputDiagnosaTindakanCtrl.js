define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('InputDiagnosaTindakanCtrl', ['$rootScope','ManagePasien', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai', 'DateHelper',

        function($rootScope, managePasien, $scope, ModelItem, $state, findPasien, cacheHelper, findPegawai, dateHelper) {
            $scope.findBy = "1";
            if ($state.params.noRecRegistrasi !== undefined) {
                debugger;
                $scope.isHeader = true; 
            }
            
            /*$scope.model.ruangan.namaRuangan = "lalala";*/
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenuPengkajianMedis = true;
            if ($scope.noCM !== undefined)
                findPasien.getByNoCM($scope.noCM).then(function(data) {
                    $rootScope.currentPasien = data.data.data;
                    $scope.pasien = data.data.data;
                });
            $scope.isView = $state.current.name !== 'dashboardpasien.PengkajianMedis.DashboardDiagnosis.DiagnosisICD9';

            if ($state.current.name === 'dashboardpasien.inputdiagnosa') {
                $rootScope.showMenu = true;
            } else if ($state.current.name === 'dashboardpasien.PengkajianMedis.DashboardDiagnosis.DiagnosisICD9') {
                $rootScope.showMenuPengkajianMedis = true;

            }
            
            ModelItem.getDataDummyGeneric("JenisPetugasPelaksana", true, undefined, 10).then(function(data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });
            $scope.item = {};
            $scope.now = new Date();
            if ($scope.noCM !== undefined)
                findPasien.getDiagnosa($scope.noCM).then(function(data) {
                    $scope.listDiagnosa = data.data;
                    $scope.isLoadingDiagnosis = false;
                });

            $scope.isLoadingDiagnosis = true;
            ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 10).then(function(data) {
                $scope.sourceDiagnosisPrimer = data;
            });

            $scope.removeRiwayatPenyakitOrObat = function(e) {
                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataDiagnosisPrimer.remove(selectedItem);
            };

            $scope.columnDiagnosisPrimer = [{
                "field": "no",
                "title": "No",
                "width": "30px"
            }, {
                "field": "kdDiagnosaTindakan",
                "title": "Kode ICD 9 CM",
                "width": "100px"
            }, {
                "field": "namaDiagnosaTindakan",
                "title": "Nama ICD 9 CM",
                "width": "300px"
            }, {
                "field": "ketTindakan",
                "title": "Keterangan",
                "width": "200px"
            }, {
                command: {
                    text: "Hapus",
                    click: $scope.removeRiwayatPenyakitOrObat
                },
                title: "&nbsp;",
                width: "110px"
            }];
            if ($state.params.noRegister !== undefined || $state.params.noRec !== undefined) {
                var noRec = $state.params.noRec;
                if (noRec === undefined)
                    noRec = $state.params.noRegister;
                findPasien.getByNoRegistrasi(noRec).then(function(data) {
                    $scope.item = data.data.pasien;
                    $scope.item.pasien = data.data.pasien;
                    $scope.item.pasien.noRec = data.data.noRec;
                    findPasien.getDiagnosisTindakanByNoRec(data.data.noRec).then(function(data) {
                        if (data.data.data.DiagnosaTindakanPasien.length === 0) return;
                        $scope.listDiagnosa = data.data.data.DiagnosaTindakanPasien[0].diagnosisTindakan;
                        $scope.item.noRec = data.data.data.DiagnosaTindakanPasien[0].noRec;
                        var temp = [];
                        var i = 1;
                        for (var key in $scope.listDiagnosa) {
                            if ($scope.listDiagnosa.hasOwnProperty(key)) {
                                var element = $scope.listDiagnosa[key];
                                temp.push({
                                    jenisDiagnosis: element.jenisDiagnosa,
                                    kdDiagnosaTindakan: element.diagnosaTindakan.kdDiagnosaTindakan,
                                    namaDiagnosaTindakan: element.diagnosaTindakan.namaDiagnosaTindakan,
                                    id: element.diagnosaTindakan.id,
                                    noRec: element.noRec,
                                    no: i
                                });
                                i++;
                            }
                        }
                        $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                            data: temp
                        })
                        $scope.isLoadingDiagnosis = false;
                    });
                });


            } else {
                findPasien.getDiagnosisTindakan($scope.noCM, $state.params.tanggal).then(function(data) {
                    $scope.listDiagnosa = data.data.data.DiagnosaTindakanPasien[0].diagnosisTindakan;
                    $scope.item.noRec = data.data.data.DiagnosaTindakanPasien[0].noRec;
                    var temp = [];
                    var i = 1;
                    for (var key in $scope.listDiagnosa) {
                        if ($scope.listDiagnosa.hasOwnProperty(key)) {
                            var element = $scope.listDiagnosa[key];
                            temp.push({
                                jenisDiagnosis: element.jenisDiagnosa,
                                noRec: element.noRec,
                                kdDiagnosaTindakan: element.diagnosaTindakan.kdDiagnosaTindakan,
                                namaDiagnosaTindakan: element.diagnosaTindakan.namaDiagnosaTindakan,
                                id: element.diagnosaTindakan.id,
                                no: i
                            });
                            i++;
                        }
                    }
                    $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                        data: temp
                    })
                    $scope.isLoadingDiagnosis = false;
                });
            }
            $scope.$watch('item.typeDiagnosisPrimer', function(newValue, oldValue) {
                if (newValue == "name") {
                    $scope.isCodeDiagnosisPrimer = false;
                } else {
                    $scope.isCodeDiagnosisPrimer = true;
                }
            });
            $scope.item.typeDiagnosisPrimer = "kode";
            $scope.isCodeDiagnosisPrimer = false;
            $scope.addFromTopTen = function(data) {
                $scope.item.diagnosisPrimer = data;
                $scope.addDataDiagnosisPrimer();
            }
            $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                data: []
            })
            $scope.addDataDiagnosisPrimer = function() {
                var any = [];
                //  = _.filter($scope.dataDiagnosisPrimer._data, {
                //     kdDiagnosaTindakan: $scope.item.diagnosisPrimer.kdDiagnosaTindakan
                // });
                if (any.length === 0) {
                    $scope.item.diagnosisPrimer.no = $scope.dataDiagnosisPrimer._data.length + 1;
                    $scope.item.diagnosisPrimer.ketTindakan = $scope.item.ketTindakan
                    $scope.dataDiagnosisPrimer.add($scope.item.diagnosisPrimer);
                    $scope.item.diagnosisPrimer="";
                    $scope.item.jumlah="";
                    $scope.item.ketTindakan="";
                }
            }

            $scope.removeDataDiagnosisPrimer = function() {

                $scope.dataDiagnosisPrimer.data([]);
            };

            $scope.Save = function() {
                debugger;
                var dataDiagnosa = $scope.dataDiagnosisPrimer._data;

                var tempDataDiaganosa = [];
                for (var i = 0; i < dataDiagnosa.length; i++) {
                    var obj = {
                        "diagnosaTindakan": {
                            "id": dataDiagnosa[i].id,
                            "namaDiagnosaTindakan": dataDiagnosa[i].namaDiagnosaTindakan,
                            "diagnosaTindakan": {
                                "id": dataDiagnosa[i].id,
                                "namaDiagnosa": dataDiagnosa[i].namaDiagnosaTindakan
                            }
                        }
                    }
                    tempDataDiaganosa.push(obj);
                }

                var data={
                    "noRec": $scope.item.noRec,
                    "pasien":{  
                        "id": $scope.item.pasien.id
                    },
                    "tanggalPendaftaran": $scope.item.pasien.tglDaftar,
                    "diagnosisTindakan": tempDataDiaganosa
                }
                console.log(JSON.stringify(data));
                managePasien.saveDiagnosaTindakanICD(ModelItem.beforePost(data)).then(function(e) {

                });

            }

            

            // $scope.Save = function() {
            //     debugger;
            //     var dataDiagnosa = $scope.dataDiagnosisPrimer._data;

            //     var tempDataDiaganosa = [];
            //     for (var i = 0; i < dataDiagnosa.length; i++) {
            //         var obj = {
            //             "id": dataDiagnosa[i].id,
            //             "noRec": dataDiagnosa[i].noRec,
            //             "namaDiagnosa": dataDiagnosa[i].namaDiagnosaTindakan,
            //             "jumlah": dataDiagnosa[i].jumlah
            //         }

            //         tempDataDiaganosa.push(obj);
            //     }

            //     $scope.item.dataDiagnosa = tempDataDiaganosa;
            //     managePasien.saveDiagnosaTindakan(ModelItem.beforePost($scope.item.pasien), dateHelper.toTimeStamp($state.params.tanggal), {
            //         diagnosisTindakan: tempDataDiaganosa,
            //         noRec: $state.params.noRec
            //     }).then(function(e) {

            //     });

            // }
        }

    ]);
});