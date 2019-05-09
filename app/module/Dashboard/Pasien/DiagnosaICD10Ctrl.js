define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DiagnosaICD10Ctrl', ['$rootScope','ManagePasien', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai', 'DateHelper','ManageSarprasPhp',
        function($rootScope, managePasien, $scope, ModelItem, $state, findPasien, cacheHelper, findPegawai, dateHelper, manageSarprasPhp) {
            
            $scope.item = {};
            $scope.now = new Date();
            $scope.findBy = "1";
            if ($state.params.noRecRegistrasi !== undefined) {
                $scope.isHeader = true; 
            }

            if ($state.current.name === 'dashboardpasien.DiagnosisICD10New') {
                $rootScope.showMenu = true;
            } else if ($state.current.name === 'dashboardpasien.PengkajianMedis.DashboardDiagnosis.DiagnosisICD10New') {
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

            // $scope.isLoadingDiagnosis = true;
            // ModelItem.getDataDummyGeneric("JenisDiagnosa", true, true, 10).then(function (data) {
            //     $scope.sourceJenisDiagnosisPrimer = data;
            //     $scope.sourceJenisDiagnosisPrimer1 =data;
            // });
            // ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 10).then(function(data) {
            //     $scope.sourceDiagnosisPrimer = data;
            // });
            $scope.isLoadingDiagnosis = true;
            ModelItem.getDataDummyGeneric("JenisDiagnosa", true, true, 10).then(function (data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });
            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                $scope.sourceDiagnosisPrimer = data;
            });


            // $scope.klik=function(dataSelected){
            //     $scope.item.jenisDiagnosis = { 
            //         id: dataSelected.objectjenisdiagnosafk, 
            //         jenisDiagnosa: dataSelected.jenisdiagnosa 
            //     }

            //     $scope.item.diagnosisPrimer = {
            //         id: dataSelected.id,
            //         namaDiagnosaTindakan: dataSelected.namadiagnosa,
            //         kdDiagnosaTindakan: dataSelected.kddiagnosa
            //     }
            //     $scope.item.keterangan = dataSelected.keterangan
            //     $scope.findBy = "1";
            // }
             $scope.klik=function(dataSelected){
                $scope.item.jenisDiagnosis = { 
                    id: dataSelected.objectjenisdiagnosafk, 
                    jenisDiagnosa: dataSelected.jenisdiagnosa 
                }

                $scope.item.diagnosisPrimer = {
                    id: dataSelected.id,
                    namaDiagnosa: dataSelected.namadiagnosa,
                    kdDiagnosa: dataSelected.kddiagnosa
                }
                $scope.item.keterangan = dataSelected.keterangan
                $scope.findBy = "1";
            }
            
            function loadDiagnosa() {
                var norReg = ""
                if ($scope.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.noregistrasi;
                }
                manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoreg?"
                    + norReg
                ).then(function (data) {
                    var dataICD10 = data.data.datas;
                    $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                        data: dataICD10,
                        pageSize: 10
                    });
                });

            }

            $scope.columnDiagnosisPrimer = [{
                "title": "No",
                "template": "{{dataDiagnosisPrimer.indexOf(dataItem) + 1}}",
                "width": "30px"
            }, {
                "field": "jenisdiagnosa",
                "title": "Jenis Diagnosa",
                "width": "150px"
                }, {
                "field": "kddiagnosa",
                "title": "Kode ICD 10",
                "width": "100px"
            }, {
                "field": "namadiagnosa",
                "title": "Nama ICD 10",
                "width": "300px"
            }, {
                "field": "keterangan",
                "title": "Keterangan",
                "width": "200px"
            }, {
                "field": "namaruangan",
                "title": "Ruangan",
                "width": "150px"
            }];

            $scope.batal=function(){
                delete $scope.item.jenisDiagnosis;
                delete $scope.item.diagnosisPrimer;
                delete $scope.item.keterangan;
            }

            function validasi(){
                var listRawRequired = [
                    "item.diagnosisPrimer|k-ng-model|kode / Nama Diagnosa",
                    "item.jenisDiagnosis|k-ng-model|kode / Jenis Diagnosa"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var norec_diagnosapasien = "";
                    var tglinput = "";
                    if ($scope.dataSelected != undefined) {
                        norec_diagnosapasien = $scope.dataSelected.norec_diagnosapasien
                        tglinput = $scope.dataSelected.tglinputdiagnosa
                    }else{
                        tglinput = moment($scope.now).format('YYYY-MM-DD HH:mm:ss')
                    }
                    var keterangan ="";
                    if ($scope.item.keterangan == undefined){
                        keterangan = "-"
                    }
                    else{
                        keterangan = $scope.item.keterangan
                    }

                    $scope.now = new Date();
                    var data = {
                        norec_dp: norec_diagnosapasien,
                        noregistrasifk:$scope.norec_apd,
                        tglregistrasi: moment($scope.tglregistrasi).format('YYYY-MM-DD HH:mm:ss'),
                        objectdiagnosafk: $scope.item.diagnosisPrimer.id,
                        objectjenisdiagnosafk: $scope.item.jenisDiagnosis.id,
                        tglinputdiagnosa: tglinput,
                        keterangan: keterangan
                    }
                    
                    $scope.objSave =
                    {
                        detaildiagnosapasien: data,
                    }
                }else{
                    ModelItem.showMessages(isValid.messages)
                }
            } 
            
            $scope.save = function() {
                validasi();
                console.log(JSON.stringify($scope.objSave));
                manageSarprasPhp.postDataDiagnosa($scope.objSave).then(function (e) {
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.keterangan;
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
                manageSarprasPhp.deleteDataDiagnosa(objDelete).then(function (e) {
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.keterangan;
                    $scope.dataSelected = {};
                    loadDiagnosa()
                })
            }

        }

    ]);
});