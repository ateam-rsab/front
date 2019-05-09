define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('GinekologikKhususCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien','ManagePasien', 'CacheHelper', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien,ManagePasien,cacheHelper,dateHelper) {
            
            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = false;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            $scope.kajianAwal = cacheHelper.get("kajianAwal");
            if ($scope.kajianAwal === undefined)
                $scope.kajianAwal = {};
            
            $scope.listKehamilan = []
            for (var i = 1; i <= 10; i++) {
                $scope.listKehamilan.push({
                    id: i,
                    keterangan: ""
                });
            }
            $scope.now = new Date();
            $scope.listDay = [];
            for (var i = 1; i <= 30; i++) {
                $scope.listDay.push({
                    id: i
                });
            }

            
            $scope.isLoadingDiagnosis = true;

            //load diagnosa inputan
            $scope.columnDiagnosisPrimer = [{
                "field": "id",
                "title": "no"
            }, {
                "field": "kode",
                "title": "Kode ICD 10"
            }, {
                "field": "name",
                "title": "ICD 10"
            }];
            

            //-----keperluan grid data diagnosis primer
            $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                data: []
            });

            $scope.columnDiagnosisPrimer = [{
                "field": "no",
                "title": "No"
            }, {
                "field": "jenisDiagnosis.jenisDiagnosa",
                "title": "Jenis Diagnosis"
            }, {
                "field": "kdDiagnosa",
                "title": "Kode ICD 10"
            }, {
                "field": "namaDiagnosa",
                "title": "ICD 10"
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
                }
            }

            $scope.removeDataDiagnosisPrimer = function() {

                $scope.dataDiagnosisPrimer.data([]);
            };

            $scope.tanggal = $state.params.tanggal;

            $scope.arrTandaVital = [
                { "name":"Keadaan Umum", "nilai":"", "type":"", "noRec": ""},
                { "name":"Jantung", "nilai":"", "type":"", "noRec": ""},
                { "name":"Paru Paru", "nilai":"", "type":"", "noRec": ""},
                { "name":"Perut", "nilai":"", "type":"", "noRec": ""},
                { "name":"Berat Badan", "nilai":"", "type":"", "noRec": ""},
                { "name":"Perubahan Lain Lain", "nilai":"", "type":"", "noRec": ""},
                { "name":"Tekanan Darah", "nilai":"", "type":"", "noRec": ""},
            ];
            $scope.listYaTidak = [
            { "id":1,
              "name":"Ya"},
            { "id":2,
              "name":"Tidak"}
            ]
            $q.all([ModelItem.getDataDummyGeneric("StatusYaTidak", false),
                    ModelItem.getDataDummyGeneric("Ginekologi", false),
                    ModelItem.getDataDummyGeneric("JenisDiagnosa", false),
                    ModelItem.getDataDummyGeneric("Diagnosa", false),
                    ModelItem.get("Ginekologi"),
                    findPasien.getByNoCM($scope.noCM),
                    findPasien.getHistroyGinekologi($scope.noCM),
                    ModelItem.getDataDummyGeneric("DataTandaVital", false)
                    ]).then(function(data) {
                
                if(data[0].statResponse)
                $scope.listYaTidak = data[0];

                if(data[1].statResponse)
                $scope.listLaboratorium = data[1];
                
                if(data[2].statResponse)
                $scope.sourceJenisDiagnosisPrimer = data[2];

                if(data[3].statResponse)
                $scope.sourceDiagnosisPrimer = data[3];

                if(data[4].statResponse){
                    $scope.item = data[4];
                    $scope.item.noRec = "";
                }
                
                if(data[5].statResponse){
                    $rootScope.currentPasien = data[5].data.data;
                    $scope.pasien = data[5].data.data;
                }
            
                if(data[6].statResponse)
                $scope.listRiwayatPengobatan = data[6];   

                if(data[7].statResponse)
                $scope.DataTandaVital = data[7];


                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien()
            {
                findPasien.getGinekologi($state.params.noCM, $state.params.tanggal).then(function(e) {
                    
                    if(e.data.data.dataFound){
                        $scope.item.PapGinekologi = e.data.data.papGinekologi;
                        $scope.item.noRec = $scope.item.PapTandaVital.noRec;
                   
                        //$scope.arrTandaVital = ModelItem.setTandaVitalCurrentData($scope.item.PapTandaVital.papDataTandaVitalSet, $scope.arrTandaVital);
                     }
                });
            };

            $scope.Save = function() {

                debugger;
                /*$scope.item.tandaVital = ModelItem.setTandaVitalForSend($scope.DataTandaVital, $scope.arrTandaVital);*/
                
                $scope.item.listKehamilan = $scope.listKehamilan
                cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveGinekologiKhusus(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {
                   
                    $scope.kajianAwal.ginekologikhusus = $scope.item;
                    /*cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $state.go('dashboardpasien.Integumen', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });*/
                });
            };
        }
    ]);
})
