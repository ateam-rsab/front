define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RehabilitasiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'GetPostOnPengkajianAwal', 'FindPegawai','CacheHelper','ManagePasien','DateHelper',
        function($rootScope, $scope, ModelItem, $state, findPasien, getPostOnPengkajianAwal, FindPegawai, cacheHelper, ManagePasien, dateHelper) {
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $scope.item={};
            $scope.pasien = {};
            $scope.noRecAntrian = $state.params.noRec;
            $("#datetimepicker").kendoDateTimePicker({
                format: "yyyy-MM-dd HH:mm",
                timeFormat: "HH:mm",
                value: new Date()
            });
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};

            // findPasien.getByNoCM($scope.noCM).then(function(data) {
            //     debugger;
            //     $rootScope.currentPasien = data.data.data;
            //     $scope.pasien = data.data.data;
            // });

            $scope.tanggal = $state.params.tanggal;

            ModelItem.getDataDummyGeneric("JenisDiagnosa", true, undefined, 10).then(function(data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });
            $scope.isLoadingDiagnosis = true;

            $scope.dataDiagnosisPrimerICD9 = new kendo.data.DataSource({
                data: []
            });
            //load diagnosa inputan
            $scope.columnDiagnosisPrimerICD9 = [{
                "field": "no",
                "title": "No",
                "width": "30px"
            }, {
                "field": "kdDiagnosaTindakan",
                "title": "Kode ICD 9",
                "width": "150px"
            }, {
                "field": "namaDiagnosaTindakan",
                "title": "ICD 9",
                "width": "300px"
            }];

            $scope.addDataDiagnosisPrimerICD9 = function() {
                var any = [];
                //  = _.filter($scope.dataDiagnosisPrimer._data, {
                //     kdDiagnosaTindakan: $scope.item.diagnosisPrimer.kdDiagnosaTindakan
                // });
                if (any.length === 0) {
                    $scope.item.diagnosisICD9.no = $scope.dataDiagnosisPrimerICD9._data.length + 1;
                    $scope.dataDiagnosisPrimerICD9.add($scope.item.diagnosisICD9);
                    $scope.item.diagnosisICD9="";
                }
            }

            $scope.removeDataDiagnosisPrimerICD9 = function() {
                $scope.dataDiagnosisPrimerICD9.data([]);
            };

            ModelItem.getDataDummyGeneric("Diagnosa", true, undefined, 10).then(function(data) {
                $scope.sourceDiagnosisPrimer = data;
            });
            ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 10).then(function(data) {
                $scope.sourceDiagnosisICD9 = data;
            });
            //-----keperluan grid data diagnosis primer
            $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                data: []
            });

            $scope.columnDiagnosisPrimer = [{
                "field": "no",
                "title": "No",
                "width": "30px"
            }, {
                "field": "jenisDiagnosis.jenisDiagnosa",
                "title": "Jenis Diagnosis",
                "width": "150px"
            }, {
                "field": "kdDiagnosa",
                "title": "Kode ICD 10",
                "width": "150px"
            }, {
                "field": "namaDiagnosa",
                "title": "ICD 10",
                "width": "250px"
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
                    $scope.dataDiagnosisPrimer.add($scope.item.diagnosisPrimer);
                    $scope.item.jenisDiagnosis="";
                    $scope.item.diagnosisPrimer="";
                }
            }

            $scope.removeDataDiagnosisPrimer = function() {
                $scope.dataDiagnosisPrimer.data([]);
            };

            ModelItem.getDataDummyGeneric("PapProsedure", true, undefined, 10).then(function(data) {
                $scope.sourceProsedure = data;
            });

            function getRehabilitasi(){
                debugger;
                findPasien.getRehabilitasKlaimFormulir($scope.noRecAntrian).then(function(data){
                    $scope.listDataRehab = data.data.data;
                    $scope.dataRehabilitasi = new kendo.data.DataSource({
                        data: $scope.listDataRehab,
                        pageSize:10
                    })
                })
            };
            getRehabilitasi();

            $scope.Save = function() {
                debugger;
                var dataItem = ModelItem.beforePost($scope.item);
                var pasien = ModelItem.beforePost($scope.pasien);
                var tanggal = dateHelper.toTimeStamp(new Date());

                var dataDiagnosaICD10 = $scope.dataDiagnosisPrimer._data;

                var tempDataDiaganosaICD10 = [];
                for (var i = 0; i < dataDiagnosaICD10.length; i++) {
                    var obj = {
                        "diagnosaTindakan": {
                            "id": dataDiagnosaICD10[i].id
                        }
                    }
                    tempDataDiaganosaICD10.push(obj);
                }

                var dataDiagnosaICD9 = $scope.dataDiagnosisPrimerICD9._data;

                var tempDataDiaganosaICD9 = [];
                for (var i = 0; i < dataDiagnosaICD9.length; i++) {
                    var obj = {
                        "diagnosaTindakan": {
                            "id": dataDiagnosaICD9[i].id
                        }
                    }
                    tempDataDiaganosaICD9.push(obj);
                }

                var data={
                    "noRec" : $scope.item.noRecRehab,
                    "pasienDaftar": {
                        "noRec": $scope.noRecAntrian
                    },
                    "tglInput": tanggal,
                    "hubunganKeluarga": dataItem.hubunganKeluarga,
                    "anamnesa": dataItem.anamnesa,
                    "pemeriksaanFisik": dataItem.pemeriksaanFisik,
                    "pemeriksaanPenunjang": dataItem.pemeriksaanPenunjang,
                    "diagnosisMedis": tempDataDiaganosaICD10,
                    "diagnosisFungsi": tempDataDiaganosaICD10,
                    "tataLaksanaKFR": tempDataDiaganosaICD9,
                    "anjuran": dataItem.anjuran,
                    "evaluasi": dataItem.evaluasi
                }
                if(data.noRec==undefined){
                    delete data.noRec
                }
                console.log(JSON.stringify(data));
                ManagePasien.saveRehabilitas(ModelItem.beforePost(data)).then(function(e) {
                    $scope.Back();
                    getRehabilitasi();
                });
            };

            $scope.Back=function(){
                $scope.item = {};
                $scope.dataDiagnosisPrimerICD9=[];
                $scope.dataDiagnosisPrimer=[];
            };

            $scope.mainGridOptions = {
                pageable: true,
                selectable: "row",
                pageSizes: true,
                columns: [
                    {
                        field: "anamnesa",
                        title: "Anamnesa",
                        width: "300px"
                    },
                    {
                        field: "pemeriksaanFisik",
                        title: "Pemeriksaan Fisik",
                        width: "300px"
                    },
                    {
                        field: "pemeriksaanPenunjang",
                        title: "Pemeriksaan Penunjang",
                        width: "300px"
                    },
                    {
                        field: "anjuran",
                        title: "Anjuran",
                        width: "300px"
                    },
                    {
                        field: "evaluasi",
                        title: "Evaluasi",
                        width: "300px"
                    }
                    // ,
                    // {
                    //     "width" : "90px",
                    //     "template" : "<button class='btnHapus' ng-click='deleteData()'>Hapus</button>"
                    // }
                ]
            };
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.diagnosisMedis
                    }),
                    columns:[
                        {
                            field: "id",
                            title: "Kode ICD 10",
                            width: "20px"
                        },
                        {
                            field: "namaDiagnosaTindakan",
                            title: "Nama Diagnosa 1CD 10",
                            width: "100px"
                        }
                    ]
                }
            };
            $scope.data3 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.tataLaksanaKFR
                    }),
                    columns:[
                        {
                            field: "id",
                            title: "Kode ICD 9",
                            width: "20px"
                        },
                        {
                            field: "namaDiagnosaTindakan",
                            title: "Nama Diagnosa ICD 9",
                            width: "100px"
                        }
                    ]
                }
            };
            $scope.click=function(data){
                $scope.item.noRecRehab= data.noRec;
                $scope.item.anamnesa = data.anamnesa;
                $scope.item.pemeriksaanFisik = data.pemeriksaanFisik;
                $scope.item.pemeriksaanPenunjang = data.pemeriksaanPenunjang;
                $scope.item.anjuran = data.anjuran;
                $scope.item.evaluasi = data.evaluasi;
                $scope.item.hubunganKeluarga = data.hubunganKeluarga;
                $scope.dataDiagnosisPrimer.add(data.diagnosisFungsi);
                $scope.dataDiagnosisPrimerICD9.add(data.tataLaksanaKFR);
            };
            $scope.deleteData=function(){
                debugger;
                $scope.item.noRecRehab;
                // ManagePasien.deleteRehabilitasi().then(function(dat){
                //     // debugger;
                //     getRehabilitasi();

                // });
            };
        }
    ]);
});