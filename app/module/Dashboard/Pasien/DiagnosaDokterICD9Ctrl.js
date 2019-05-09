define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('DiagnosaDokterICD9Ctrl', ['$rootScope','ManagePasien', '$scope', 'ModelItem', 'ModelItemAkuntansi', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai', 'DateHelper','ManageSarprasPhp',
        function($rootScope, managePasien, $scope, ModelItem, modelItemAkuntansi,$state, findPasien, cacheHelper, findPegawai, dateHelper, manageSarprasPhp) {
            
            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true
            $scope.findBy = "1"
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str=''
            var detail = ''

            LoadCache();
            function LoadCache(){
                var chacePeriode = cacheHelper.get('DiagnosaDokterICD9Ctrl');
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
            
            loadDiagnosa();
            function loadDiagnosa() {
                $scope.isRouteLoading = true;
                var norReg = ""
                if ($scope.item.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.item.noregistrasi;
                }
                manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoregicd9?"
                    + norReg
                ).then(function (data) {
                    $scope.isRouteLoading = false;
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
                        objectpasienfk:norec_apd,
                        tglpendaftaran: $scope.item.tglRegistrasi,
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
                manageSarprasPhp.deleteDataDiagnosaTindakan(objDelete).then(function (e) {
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.ketTindakan;
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