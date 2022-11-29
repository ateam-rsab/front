define(['initialize'], function (initialize, pasienServices) {
    'use strict';
    initialize.controller('InputDiagnosaDokterCtrl', ['$rootScope', 'ManagePasien', '$scope', 'ModelItem', 'ModelItemAkuntansi', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai', 'DateHelper', 'ManageSarprasPhp', 'ManagePhp',
        function ($rootScope, managePasien, $scope, ModelItem, modelItemAkuntansi, $state, findPasien, cacheHelper, findPegawai, dateHelper, manageSarprasPhp, ManagePhp) {
            $scope.onInit=()=>{
                var datauserlogin = JSON.parse(window.localStorage.getItem('pegawai'));
                (datauserlogin['id']=="320263") ? $scope.isVedika=true : $scope.isVedika=false;
            }
            $scope.onInit();
            $scope.item = {};
            $scope.now = new Date();
            $scope.dataVOloaded = true
            $scope.findBy = "1"
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str = ''
            var detail = ''
            $scope.showTombol = false

            LoadCache();
            function LoadCache() {
                LoadCombo();
                var chacePeriode = cacheHelper.get('CacheInputDiagnosaDokter');
                if (chacePeriode != undefined) {
                    //var arrPeriode = chacePeriode.split(':');
                    $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
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
                    $scope.item.kelas = chacePeriode[10]
                    $scope.item.idRuangan = chacePeriode[11]
                    $scope.item.namaRuangan = chacePeriode[12]
                    if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                    }
                }
            }



            function LoadCombo() {
                $scope.isLoadingDiagnosis = true;
                modelItemAkuntansi.getDataDummyPHP("pasien/get-combo-icd9", true, true, 10).then(function (data) {
                    $scope.listDiagnosaTindakan = data;
                });
                modelItemAkuntansi.getDataDummyPHP("diagnosa/get-data-diagnosa-part", true, true, 20).then(function (data) {
                    $scope.listDiagnosa = data;
                });
                ManagePhp.getData('diagnosa/get-data-combo').then(function (data) {
                    $scope.listJenisDiagnosa = data.data.jenisdiagnosa;
                });

                //   ModelItem.getDataDummyGeneric("JenisDiagnosa", true, true, 10).then(function (data) {
                //     $scope.listJenisDiagnosa = data;
                // });

                // ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                //     $scope.listDiagnosa = data;
                // });

            }

            $scope.klikIcd9 = function (dataIcd9Selected) {
                $scope.item.diagnosaTindakan = {
                    id: dataIcd9Selected.id,
                    namaDiagnosaTindakan: dataIcd9Selected.namadiagnosatindakan,
                    kdDiagnosaTindakan: dataIcd9Selected.kddiagnosatindakan
                }
                $scope.item.ketTindakan = dataIcd9Selected.keterangantindakan
                $scope.findBy = "1";
            }
            $scope.klikIcd10 = function (dataIcd10Selected) {
                $scope.item.jenisDiagnosis = {
                    id: dataIcd10Selected.objectjenisdiagnosafk,
                    jenisDiagnosa: dataIcd10Selected.jenisdiagnosa
                }

                $scope.item.diagnosa = {
                    id: dataIcd10Selected.id,
                    namaDiagnosa: dataIcd10Selected.namadiagnosa,
                    kdDiagnosa: dataIcd10Selected.kddiagnosa
                }
                $scope.item.keterangan = dataIcd10Selected.keterangan
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
                    $scope.dataSourceDiagnosaIcd9 = new kendo.data.DataSource({
                        data: dataICD9,
                        pageSize: 10
                    });
                });

                manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoreg?"
                    + norReg
                ).then(function (data) {
                    // $scope.isRouteLoading = false;
                    var dataICD10 = data.data.datas;
                    $scope.dataSourceDiagnosaIcd10 = new kendo.data.DataSource({
                        data: dataICD10,
                        pageSize: 10
                    });
                });
            }

            $scope.mainGridOptions = {
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            contains: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                }
            }

            $scope.columnDiagnosaIcd9 = [{
                "title": "No",
                "template": "{{dataSourceDiagnosaIcd9.indexOf(dataItem) + 1}}",
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
                "field": "keterangantindakan",
                "title": "Keterangan",
                "width": "200px"
            }, {
                "field": "namaruangan",
                "title": "Ruangan",
                "width": "200px"
            },
            {
                "field": "namalengkap",
                "title": "Penginput",
                "width": "200px"
            },
            {
                "field": "tglinputdiagnosa",
                "title": "Tgl Input",
                "width": "200px"
            }];

            $scope.columnDiagnosaIcd10 = [{
                "title": "No",
                "template": "{{dataSourceDiagnosaIcd10.indexOf(dataItem) + 1}}",
                "width": "50px"
            }, {
                "field": "jenisdiagnosa",
                "title": "Jenis Diagnosis",
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
            },
            {
                "field": "namalengkap",
                "title": "Penginput",
                "width": "200px"
            },
            {
                "field": "tglinputdiagnosa",
                "title": "Tgl Input",
                "width": "200px"
            }];
            $scope.batal = function () {
                delete $scope.item.diagnosaTindakan;
                delete $scope.item.ketTindakan;
                delete $scope.item.jenisDiagnosis;
                delete $scope.item.diagnosa;
                delete $scope.item.keterangan;
            }

            function validasi() {
                var listRawRequired = [
                    "item.diagnosaTindakan|k-ng-model|kode / Nama Diagnosa"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var norec_diagnosapasien = "";
                    if ($scope.dataIcd9Selected != undefined) {
                        norec_diagnosapasien = $scope.dataIcd9Selected.norec_diagnosapasien
                    }
                    var ketTindakans = "";
                    if ($scope.item.ketTindakan != undefined) {
                        ketTindakans = $scope.item.ketTindakan
                    }
                    var data = {
                        norec_dp: norec_diagnosapasien,
                        objectpasienfk: norec_apd,
                        tglpendaftaran: $scope.item.tglRegistrasi,
                        objectdiagnosatindakanfk: $scope.item.diagnosaTindakan.id,
                        keterangantindakan: ketTindakans
                    }

                    $scope.objSave =
                    {
                        detaildiagnosatindakanpasien: data,
                    }
                } else {
                    ModelItem.showMessages(isValid.messages)
                }
            }

            $scope.saveIcd9 = function () {
                validasi();
                console.log(JSON.stringify($scope.objSave));
                manageSarprasPhp.postDataDiagnosaTIndakan($scope.objSave).then(function (e) {

                    manageSarprasPhp.postApi("Procedure", $scope.objSave).then(function (res) {
                        console.log(res)
                    })

                    delete $scope.item.diagnosaTindakan;
                    delete $scope.item.ketTindakan;
                    delete $scope.dataIcd9Selected;
                    loadDiagnosa()

                    ManagePhp.postLogging('Diagnosis', 'Norec DiagnosaTindakanPasien_T', e.data.data.norec, 'ICD 9').then(function (res) {
                    })
                })
            }

            $scope.deleteIcd9 = function () {
                if ($scope.item.diagnosaTindakan == undefined) {
                    alert("Pilih data yang mau di hapus!!")
                    return
                }
                var diagnosa = {
                    norec_dp: $scope.dataIcd9Selected.norec_diagnosapasien
                }
                var objDelete =
                {
                    diagnosa: diagnosa,
                }
                manageSarprasPhp.deleteDataDiagnosaTindakan(objDelete).then(function (e) {
                    delete $scope.item.diagnosaTindakan;
                    delete $scope.item.ketTindakan;
                    delete $scope.dataIcd9Selected
                    loadDiagnosa()

                })
            }
            function validasiIcd10() {
                var listRawRequired = [
                    "item.diagnosa|k-ng-model|kode / Nama Diagnosa",
                    "item.jenisDiagnosis|k-ng-model|kode / Jenis Diagnosa"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var norec_diagnosapasien = "";
                    var tglinput = "";
                    if ($scope.dataIcd10Selected != undefined) {
                        norec_diagnosapasien = $scope.dataIcd10Selected.norec_diagnosapasien
                        tglinput = $scope.dataIcd10Selected.tglinputdiagnosa
                    } else {
                        tglinput = moment($scope.now).format('YYYY-MM-DD hh:mm:ss')
                    }
                    var keterangan = "";
                    if ($scope.item.keterangan == undefined) {
                        keterangan = "-"
                    }
                    else {
                        keterangan = $scope.item.keterangan
                    }

                    $scope.now = new Date();
                    var data = {
                        pegawaifk: $scope.dataLogin.id,
                        norec_dp: norec_diagnosapasien,
                        noregistrasifk: norec_apd,
                        tglregistrasi: moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                        objectdiagnosafk: $scope.item.diagnosa.id,
                        kddiagnosa: $scope.item.diagnosa.kdDiagnosa,
                        objectjenisdiagnosafk: $scope.item.jenisDiagnosis.id,
                        jenisdiagnosa: $scope.item.jenisDiagnosis.jenisDiagnosa,
                        tglinputdiagnosa: tglinput,
                        keterangan: keterangan
                    }

                    $scope.objSave =
                    {
                        detaildiagnosapasien: data,
                    }
                } else {
                    ModelItem.showMessages(isValid.messages)
                }
            }
            $scope.saveIcd10 = function () {
                validasiIcd10();
                console.log(JSON.stringify($scope.objSave));
                manageSarprasPhp.postDataDiagnosa($scope.objSave).then(function (e) {
                    console.log(e)
                    manageSarprasPhp.postApi("condition?noreg=" + $scope.item.noregistrasi + "&kode=" + $scope.item.diagnosa.kdDiagnosa + "&display=" + $scope.item.diagnosa.namaDiagnosa + "&pasienname=" + $scope.item.namaPasien + "&idpasien=" + $scope.item.noMr).then(function (res) {
                        console.log(res)
                    })
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosa;
                    delete $scope.item.keterangan;
                    delete $scope.dataIcd10Selected;
                    loadDiagnosa()
                    ManagePhp.postLogging('Diagnosis', 'Norec DiagnosaPasien_T', e.data.data.norec, 'ICD 10').then(function (res) {
                    })
                })
            }

            $scope.deleteIcd10 = function () {
                if ($scope.item.diagnosa == undefined) {
                    alert("Pilih data yang mau di hapus!!")
                    return
                }
                var diagnosa = {
                    norec_dp: $scope.dataIcd10Selected.norec_diagnosapasien
                }
                var objDelete =
                {
                    diagnosa: diagnosa,
                }
                manageSarprasPhp.deleteDataDiagnosa(objDelete).then(function (e) {
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosa;
                    delete $scope.item.keterangan;
                    delete $scope.dataIcd10Selected
                    loadDiagnosa()


                })
            }


            $scope.back = function () {
                $state.go('DaftarAntrianDokterRajal')
            }
            $scope.showInputDiagnosaDokter = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                $state.go('InputTindakanPelayananDokterRev', {
                    norecPD: norec_pd,
                    norecAPD: norec_apd,

                });
            }
            $scope.laboratorium = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }
            $scope.radiologi = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('CacheInputDiagnosaDokter');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }

        }

    ]);
});