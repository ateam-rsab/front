define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DashboarDiagnosisCtrl', ['DateHelper', 'FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'FindPegawai',

        function(dateHelper, findPasien, managePasien, $rootScope, $scope, ModelItem, $state, cacheHelper, findPegawai) {
            $rootScope.$watch('hideButtonAdd', function(e) {
                $scope.hideButtonAdd = e;
                $rootScope.doneLoad = false;
                $rootScope.showMenu = false;
                $rootScope.showMenuDetail = false;
                $rootScope.showMenuPengkajianMedis = false;
            });
            $rootScope.$watch('isViewDiagnosa', function(e) {
                if (e === undefined) return;
                $scope.hideButtonAdd = e;
            });
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal; //new moment().format('DD-MM-YYYY');
            $rootScope.showMenuPengkajianMedis = false;
            if ($scope.noCM !== undefined)
                findPasien.getByNoCM($scope.noCM).then(function(data) {
                    $rootScope.currentPasien = data.data;
                    $scope.pasien = data.data.data;
                });
            ModelItem.getDataDummyGeneric("JenisDiagnosa", true, undefined, 10).then(function(data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });

            if ($state.current.name === 'dashboardpasien.inputdiagnosa') {
                $rootScope.showMenu = false;
                findPegawai.getDiagnosaTop('P0001').then(function(data) {
                    $scope.topDiagnosis = data.data;
                });
            } else if ($state.current.name === 'dashboardpasien.PengkajianMedis.Diagnosis') {
                $rootScope.showMenuPengkajianMedis = true;
                // findPegawai.getDiagnosaTop('P0001').then(function(data) {
                //     $scope.topDiagnosis = data.data;
                // });
            }
            $scope.item = {};
            $scope.item.noRec = "";
            $scope.now = new Date();
            $scope.Simpan = function() {
                $scope.listAlergi.push({
                    noCM: $scope.noCM,
                    tanggal: $scope.item.tanggal,
                    alergi: $scope.item.jenisAlergi.namaAlergi,
                    keterangan: $scope.item.jenisAlergi.keterangan,
                    reaksi: $scope.item.reaksi
                });
                $scope.isAddAlergi = false;
            };
            debugger;
            if ($state.params.noRec !== undefined) {
                findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                    $scope.item.pasien = data.data.pasien;
                    $scope.item.pasien.noRec = data.data.noRec;
                    findPasien.getDiagnosaNyNoRec(data.data.noRec).then(function(data) {

                        if (data.data.data.DiagnosaPasien === undefined) return;
                        if (data.data.data.DiagnosaPasien.length === 0) return;
                        $scope.listDiagnosa = ModelItem.beforePost(data.data.data.DiagnosaPasien[data.data.data.DiagnosaPasien.length - 1].diagnosis, true);
                        $scope.item.noRec = data.data.data.DiagnosaPasien[0].noRec;
                        var temp = [];
                        var i = 1;
                        for (var key in $scope.listDiagnosa) {
                            if ($scope.listDiagnosa.hasOwnProperty(key)) {
                                var element = $scope.listDiagnosa[key];
                                temp.push({
                                    jenisDiagnosis: element.jenisDiagnosa,
                                    kdDiagnosa: element.diagnosa.kdDiagnosa,
                                    namaDiagnosa: element.diagnosa.namaDiagnosa,
                                    id: element.diagnosa.id,
                                    no: i
                                });
                                i++;
                            }
                        }
                        $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                            data: temp
                        });
                        $scope.isLoadingDiagnosis = false;
                    });
                });

            } else {
                findPasien.getDiagnosa($scope.noCM, $state.params.tanggal).then(function(data) {

                    if (data.data.data.DiagnosaPasien === undefined) return;
                    if (data.data.data.DiagnosaPasien.length === 0) return;
                    $scope.listDiagnosa = ModelItem.beforePost(data.data.data.DiagnosaPasien[data.data.data.DiagnosaPasien.length - 1].diagnosis, true);
                    $scope.item.noRec = data.data.data.DiagnosaPasien[0].noRec;
                    var temp = [];
                    var i = 1;
                    for (var key in $scope.listDiagnosa) {
                        if ($scope.listDiagnosa.hasOwnProperty(key)) {
                            var element = $scope.listDiagnosa[key];
                            temp.push({
                                jenisDiagnosis: element.jenisDiagnosa,
                                kdDiagnosa: element.diagnosa.kdDiagnosa,
                                namaDiagnosa: element.diagnosa.namaDiagnosa,
                                id: element.diagnosa.id,
                                no: i,
                                noRecord: element.noRec
                            });
                            i++;
                        }
                    }
                    $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                        data: temp
                    });
                    $scope.isLoadingDiagnosis = false;
                });
            }
            $scope.removeDiagnosa = function(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataDiagnosisPrimer.remove(selectedItem);
            }

            if ($state.current.name === 'dashboardpasien.inputdiagnosa' || $state.current.name === 'dashboardpasien.PengkajianMedis.Diagnosis') {
                $scope.isLoadingDiagnosis = true;

                //load diagnosa inputan
                $scope.columnDiagnosisPrimer = [{
                    "field": "id",
                    "title": "no",
                    "width": 50
                }, {
                    "field": "kode",
                    "title": "Kode ICD 10"
                }, {
                    "field": "name",
                    "title": "ICD 10"
                }];
                ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    $scope.sourceDiagnosisPrimer = data;
                });
                findPasien.getDiagnosa
                    //-----keperluan grid data diagnosis primer
                $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                    data: []
                });

                $scope.columnDiagnosisPrimer = [{
                    "field": "no",
                    "title": "No",
                    "width": 50
                }, {
                    "field": "jenisDiagnosis.jenisDiagnosa",
                    "title": "Jenis Diagnosis",
                    "width": 150
                }, {
                    "field": "kdDiagnosa",
                    "title": "Kode ICD 10",
                    "width": 150
                }, {
                    "field": "namaDiagnosa",
                    "title": "ICD 10"
                }, {
                    "field": "ketDiagnosis",
                    "title": "Keterangan",
                    "width": 150
                }, {
                    command: {
                        text: "Hapus",
                        click: $scope.removeDiagnosa
                    },
                    title: "&nbsp;",
                    width: "100px"
                }];

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
                $scope.addDataDiagnosisPrimer = function() {
                    var any = _.filter($scope.dataDiagnosisPrimer._data, {
                        kdDiagnosa: $scope.item.diagnosisPrimer.kdDiagnosa
                    });
                    var temp = [];
                    for (var key in $scope.dataDiagnosisPrimer._data) {
                        if ($scope.dataDiagnosisPrimer._data.hasOwnProperty(key)) {
                            var element = $scope.dataDiagnosisPrimer._data[key];
                            if (element.jenisDiagnosis != undefined && element.jenisDiagnosis.jenisDiagnosa === 'DIAGNOSA UTAMA')
                                return;
                        }
                    }

                    if (any.length === 0) {
                        $scope.item.diagnosisPrimer.no = $scope.dataDiagnosisPrimer._data.length + 1;
                        $scope.item.diagnosisPrimer.jenisDiagnosis = $scope.item.jenisDiagnosis;
                        $scope.item.diagnosisPrimer.ketDiagnosis = $scope.item.ketDiagnosis
                        $scope.dataDiagnosisPrimer.add($scope.item.diagnosisPrimer);
                    }
                    $scope.batal();
                }

                $scope.removeDataDiagnosisPrimer = function() {

                    $scope.dataDiagnosisPrimer.data([]);
                };

                $scope.batal = function(){
                    $scope.item.jenisDiagnosis="";
                    $scope.item.diagnosisPrimer="";
                    $scope.item.ketDiagnosis="";
                }
                $scope.Save = function() {
                    debugger;
                    var data = [];
                    for (var key in $scope.dataDiagnosisPrimer._data) {
                        if ($scope.dataDiagnosisPrimer._data.hasOwnProperty(key)) {
                            var element = $scope.dataDiagnosisPrimer._data[key];
                            if (element.id !== undefined) {
                                data.push({
                                    diagnosa: element,
                                    jenisDiagnosa: element.jenisDiagnosis,
                                    noRec: element.noRecord
                                });
                            }
                        }
                    }
                    managePasien.saveDiagnosa($scope.item.pasien, dateHelper.toTimeStamp(dateHelper.toDate($scope.tanggal)), {
                        diagnosis: data,
                        noRec: $state.params.noRec
                    }).then(function(e) {
                        managePasien.updateStatusAntrian($state.params.noRec, 3);
                    })
                }
            }

        }
    ]);
});