define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DiagnosaDokterCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'FindPegawai', 'DateHelper','ManageSarprasPhp','ModelItemAkuntansi',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, findPegawai, dateHelper, manageSarprasPhp, modelItemAkuntansi) {
            
            $scope.item = {}
            $scope.dataVOloaded = true
            $scope.now = new Date()
            $scope.findBy = "1"
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str=''
            var detail = ''

            LoadCache();
            function LoadCache(){
                var chacePeriode = cacheHelper.get('DiagnosaDokterCtrl');
                if(chacePeriode != undefined){
                   //var arrPeriode = chacePeriode.split(':');
                   $scope.item.noMr = chacePeriode[0]
                   $scope.item.namaPasien = chacePeriode[1]
                   $scope.item.jenisKelamin = chacePeriode[2]
                   $scope.item.noregistrasi = chacePeriode[3]
                   $scope.item.umur = chacePeriode[4]
                   $scope.item.kelompokPasien = chacePeriode[5]
                   $scope.item.tglRegistrasi = chacePeriode[6]
                   norec_apd = chacePeriode[7]
                   norec_pd = chacePeriode[8]
                   $scope.item.idKelas = chacePeriode[9]
                   $scope.item.kelas =chacePeriode[10]
                   $scope.item.idRuangan =chacePeriode[11]
                   $scope.item.namaRuangan =chacePeriode[12]
                }
           }

            $scope.isLoadingDiagnosis = true;
            ModelItem.getDataDummyGeneric("JenisDiagnosa", true, true, 10).then(function (data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });
            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                $scope.sourceDiagnosisPrimer = data;
            });

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
            loadDiagnosa();
            function loadDiagnosa() {
                $scope.isRouteLoading = true;
                var norReg = ""
                if ($scope.item.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.item.noregistrasi;
                }
                manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoreg?"
                    + norReg
                ).then(function (data) {
                    $scope.isRouteLoading = false;
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
                        tglinput = moment($scope.now).format('YYYY-MM-DD hh:mm:ss')
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
                        noregistrasifk:norec_apd,
                        tglregistrasi: moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
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
                    delete $scope.dataSelected;
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

            $scope.back=function(){
                $state.go('DaftarAntrianDokterRajal')
            }

        }

    ]);
});