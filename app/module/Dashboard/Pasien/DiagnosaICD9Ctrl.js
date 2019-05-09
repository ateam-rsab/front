define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DiagnosaICD9Ctrl', ['$rootScope','ManagePasien', '$scope', 'ModelItem', 'ModelItemAkuntansi', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai', 'DateHelper','ManageSarprasPhp',
        function($rootScope, managePasien, $scope, ModelItem, modelItemAkuntansi,$state, findPasien, cacheHelper, findPegawai, dateHelper, manageSarprasPhp) {
            
            $scope.item = {};
            $scope.now = new Date();
            $scope.findBy = "1";
            if ($state.params.noRecRegistrasi !== undefined) {
                $scope.isHeader = true; 
            }

            if ($state.current.name === 'dashboardpasien.DiagnosisICD9New') {
                $rootScope.showMenu = true;
            } else if ($state.current.name === 'dashboardpasien.PengkajianMedis.DashboardDiagnosis.DiagnosisICD9New') {
                $rootScope.showMenuPengkajianMedis = true;

            }

            if ($state.params.noRegister !== undefined || $state.params.noRec !== undefined) {
                var noRec = $state.params.noRec;
                findPasien.getByNoRegistrasi(noRec).then(function(data) {
                    $scope.idRuangan=data.data.ruangan.id;
                    $scope.noregistrasi=data.data.pasienDaftar.noRegistrasi;
                    $scope.norec_apd=data.data.noRec;
                    $scope.tglregistrasi=data.data.pasienDaftar.tglRegistrasi;
                    loadDiagnosa();
                });
            };

            $scope.isLoadingDiagnosis = true;
            modelItemAkuntansi.getDataDummyPHP("pasien/get-combo-icd9", true, true, 10).then(function(data) {
                 $scope.sourceDiagnosisPrimer= data;
             });

            $scope.klik=function(dataSelected){
                $scope.item.diagnosisPrimer = {
                    id: dataSelected.id,
                    namaDiagnosaTindakan: dataSelected.namadiagnosatindakan,
                    kdDiagnosaTindakan: dataSelected.kddiagnosatindakan
                }
                $scope.findBy = "1";
            }
            
            function loadDiagnosa() {
                var norReg = ""
                if ($scope.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.noregistrasi;
                }
                manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoregicd9?"
                    + norReg
                ).then(function (data) {
                    var dataICD9 = data.data.datas;
                    $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                        data: dataICD9,
                        pageSize: 10
                    });
                });

            }

            $scope.columnDiagnosisPrimer = [{
                "title": "No",
                "template": "{{dataDiagnosisPrimer.indexOf(dataItem) + 1}}",
                "width": "30px"
            }, {
                "field": "kddiagnosatindakan",
                "title": "Kode ICD 9",
                "width": "100px"
            }, {
                "field": "namadiagnosatindakan",
                "title": "Nama ICD 9",
                "width": "300px"
            }, {
                "field": "ketTindakan",
                "title": "Keterangan",
                "width": "200px"
            }, {
                "field": "namaruangan",
                "title": "Ruangan",
                "width": "200px"
            }];

            $scope.batal=function(){
                delete $scope.item.diagnosisPrimer;
                delete $scope.item.ketTindakan;
            }

            function validasi(){
                var listRawRequired = [
                    "item.diagnosisPrimer|k-ng-model|kode / Nama Diagnosa"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var norec_diagnosapasien = "";
                    if ($scope.dataSelected != undefined) {
                        norec_diagnosapasien = $scope.dataSelected.norec_diagnosapasien
                    }
                    var data = {
                        norec_dp: norec_diagnosapasien,
                        objectpasienfk:$scope.norec_apd,
                        tglpendaftaran: moment($scope.tglregistrasi).format("YYYY-MM-DD HH:mm:ss"),
                        objectdiagnosatindakanfk: $scope.item.diagnosisPrimer.id,
                    }
                    
                    $scope.objSave =
                    {
                        detaildiagnosatindakanpasien: data,
                    }
                }else{
                    ModelItem.showMessages(isValid.messages)
                }
            } 
            
            $scope.save = function() {
                validasi();
                console.log(JSON.stringify($scope.objSave));
                manageSarprasPhp.postDataDiagnosaTIndakan($scope.objSave).then(function (e) {
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.ketTindakan;
                    loadDiagnosa()
                })
            }

            $scope.delete = function () {
                if ($scope.item.diagnosisPrimer == undefined) {
                    alert("Pilih data yang mau di hapus!!")
                    return
                }
                var diagnosa = {
                    norec_dp: $scope.dataSelected.norec_diagnosapasien
                }
                var objDelete =
                    {
                        diagnosa: diagnosa,
                    }
                manageSarprasPhp.deleteDataDiagnosaTindakan(objDelete).then(function (e) {
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.ketTindakan;
                    $scope.dataSelected = {};
                    loadDiagnosa()
                })
            }

        }

    ]);
});