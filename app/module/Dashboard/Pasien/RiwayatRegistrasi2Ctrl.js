define(['initialize'], function (initialize, pasienServices) {
    'use strict';
    initialize.controller('RiwayatRegistrasi2Ctrl', ['$q', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', 'ModelItemAkuntansi', '$state', 'FindPasien', 'CacheHelper', 'DateHelper', 'ManageSarprasPhp', '$mdDialog',
        function ($q, managePasien, $rootScope, $scope, ModelItem,modelItemAkuntansi, $state, findPasien, cacheHelper, dateHelper, manageSarprasPhp, $mdDialog) {
            $scope.isRouteLoading = false;
            // $scope.showDetail = false;
            var currentParams;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.dataSelected1 = {};
            $scope.item = {
                from: $scope.now,
                until: $scope.now
            }
            $scope.isRouteLoading=false;
            $scope.items = {};

            // if($state.params != undefined){
            //    $scope.item.noCm = $state.params.nocm;
            //    $scope.item.noRegistrasi = $state.params.noregistrasi;
            // }else{
            //     $scope.item.noCm ="";
            //     $scope.item.noRegistrasi="";
            // }           
            // loadData()
            // loadDatas()

            $scope.batal = function () {
                $scope.from = $scope.until = $scope.now;
                // delete $scope.item.noRegistrasi;
            }


            $scope.showMasterDiagnosa = function () {
                $state.go("DiagnosaTindakanEdit")
            }

            $scope.showMasterDiagnosaTindakan = function () {
                $state.go("DiagnosaEdit")
            }
            $scope.listRegistrasiDetil = [];
            $scope.batal();
            $scope.findByRegistrasi = function () {
                
                loadDatas()

                // var listRawRequired = [
                //     "item.noRegistrasi|ng-model|Nomor registrasi"
                // ]
                // var isValid = ModelItem.setValidation($scope, listRawRequired);
                // if (isValid.status) {
                //     $scope.isRouteLoading = true;
                //     // findPasien.getDaftarRegistrasi($scope.item.noRegistrasi, dateHelper.formatDate($scope.item.from, 'YYYY-MM-DD'), dateHelper.formatDate($scope.item.until, 'YYYY-MM-DD')).then(function(e) {
                //     findPasien.getDaftarRegistrasi('', $scope.item.noRegistrasi, '', '').then(function (e) {
                //         var data = [];
                //         for (var key in e.data.data) {
                //             if (e.data.data.hasOwnProperty(key)) {
                //                 var element = e.data.data[key];
                //                 element.isCheck = false;
                //                 data.push(element);
                //             }
                //         }
                //         $scope.daftarRegistrasi = data;
                //         $scope.listRegistrasi = new kendo.data.DataSource({
                //             data: $scope.daftarRegistrasi,
                //             pageSize: 25
                //         });
                //         $scope.isRouteLoading = false;
                //         $scope.showDetail = false;
                //     }, function (err) {
                //         messageContainer.error(err);
                //         $scope.isRouteLoading = false;
                //     });
                // } else {
                //     ModelItem.showMessages(isValid.messages);
                // }
            }

            // $scope.findBynoCM = function (noCm) {
            //     var listRawRequired = [
            //         "item.noCm|ng-model|No CM"
            //     ];
            //     var isValid = ModelItem.setValidation($scope, listRawRequired);
            //     if (isValid.status) {
            //         $scope.isRouteLoading = true;
            //         $q.all([findPasien.findByNoCM(noCm),
            //         findPasien.getDaftarRegistrasi(noCm, '', '', '')
            //         ]).then(function (e) {
            //             if (e[0].statResponse) {
            //                 $scope.item = e[0].data.data;
            //                 $scope.item.tglLahir = new Date($scope.item.tglLahir);
            //                 $scope.item.from = $scope.now;
            //                 $scope.item.until = $scope.now;
            //             }
            //             if (e[1].statResponse) {
            //                 $scope.listRegistrasi = new kendo.data.DataSource({
            //                     data: e[1].data.data,
            //                     pageable: true,
            //                     pagesize: 5
            //                 })
                        
            //             }
            //             $scope.isRouteLoading = false;
            //             $scope.showDetail = false;
            //         }, function (err) {
            //             messageContainer.error(err);
            //             $scope.isRouteLoading = false;

            //         });
            //     } else {
            //         ModelItem.showMessages(isValid.messages);
            //     }
            //     $scope.cboDiagnosa = false;
            //     $scope.cboDiagnosa1 = false;
            //     $scope.cboInputDiagnosa = true;
            // }

         manageSarprasPhp.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
              $scope.listDepartemen = data.data.deptrirj;
              $scope.item.departement = {id:$scope.listDepartemen[0].id,namadepartemen:$scope.listDepartemen[0].namadepartemen}
              // $scope.listKelompokPasien = data.data.kelompokpasien;
              // $scope.listRuangan = data.data.ruanganRi;
          })

           
            $scope.findBynoCM = function(){

                loadData()
                 $scope.cboDiagnosa=false;
                 $scope.cboDiagnosa1=false;
                 $scope.cboInputDiagnosa = true;
            }

            function loadData(){
                $scope.isRouteLoading=true;

                var noCm =""
                if($scope.item.noCm != undefined){
                    var noCm ="noCm=" +$scope.item.noCm
                }

                var noReg =""
                if ($scope.item.noRegistrasi != undefined){
                    var noReg ="noReg=" +$scope.item.noRegistrasi
                }   

                $q.all([
                    manageSarprasPhp.getDataTableTransaksi("pasien/get-pasien-by-nocm?"
                       +noCm),
                    ]).then(function(data) {
                        $scope.isRouteLoading=false;
                        var datas = data[0].data.datas;
                        $scope.item.namaPasien = datas.namapasien;
                        $scope.item.tempatLahir = datas.tempatlahir;
                        $scope.item.tglLahir = datas.tgllahir;
                        $scope.item.alamatLengkap = datas.alamatlengkap;
                        $scope.item.noTelepon = datas.notelepon;
                        $scope.item.namaKeluarga = datas.namakeluarga;
                        $scope.item.namaIbu = datas.namaibu;
                        });

                    loadDatas()
            }

            function loadDatas(){
                // $scope.isRouteLoading=true;
                var noReg =""
                if ($scope.item.noRegistrasi != undefined){
                    var noReg ="&noReg=" +$scope.item.noRegistrasi
                }

                var noCm =""
                if ($scope.item.noCm != undefined){
                    var noCm ="&noCm=" +$scope.item.noCm
                }  

                 var tempDepartemen = "";
                 if ($scope.item.departement != undefined) {
                    tempDepartemen = "&idDept=" + $scope.item.departement.id;
                } 
                
                $q.all([
                    manageSarprasPhp.getDataTableTransaksi("pasien/get-antrian-by-nocm1?"
                        +noReg
                        +noCm
                        +tempDepartemen),
                    ]).then(function(data) {
                        var dot = data[0].data.datas;
                        $scope.listRegistrasi = new kendo.data.DataSource({
                          data: dot,
                          pageSize: 5,
                          total: data.length,
                          serverPaging: false,
                          schema: {
                              model: {
                                  fields: {
                                  }
                              }
                          }
                      });
                        // $scope.isRouteLoading=false;
                        // $scope.listRegistrasi = dot;
                    });
            };
        
            $scope.gridRegistrasi = [
                {
                    title: "#",
                    template: "{{listRegistrasi.indexOf(dataItem) + 1}}",
                    width: 35
                }, 
                {
                    field: "noregistrasi",
                    title: "No. Registrasi",
                    aggregates: ["count"],
                    width: 120
                }, 
                {
                    field: "tglregistrasi",
                    title: "Tgl Registrasi",
                    template: "#if (tglregistrasi) {# #= new moment(tglregistrasi).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #",
                    width: 130
                }, 
                {
                    field: "namaruangan",
                    title: "Ruangan Pelayanan",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)",
                    width: 250
                }, 
                {
                    field: "namalengkap",
                    title: "Dokter"
                }, 
                {
                    field: "tglpulang",
                    title: "Tgl Pulang",
                    template: "#if (tglpulang) {# #= new moment(tglpulang).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #",
                    width: 130
                }
            ];
                
            // $scope.findData();
            // $scope.gridOptions = {
            //     sortable: true,
            //     selectable: "row",
            //     columns: [{
            //         title: "#",
            //         template: "{{listRegistrasi.indexOf(dataItem) + 1}}",
            //         width: 35
            //     }, {
            //         field: "noregistrasi",
            //         title: "No. Registrasi",
            //         aggregates: ["count"],
            //         width: 120
            //     }, {
            //         field: "tglregistrasi",
            //         title: "Tgl Registrasi",
            //         template: "#if (tglRegistrasi) {# #= new moment(tglRegistrasi).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #",
            //         width: 130
            //     }, {
            //         field: "namaruangan",
            //         title: "Ruangan Pelayanan",
            //         aggregates: ["count"],
            //         groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)",
            //         width: 250
            //     }, {
            //         field: "namalengkap",
            //         title: "Dokter"
            //     }, {
            //         field: "tglpulang",
            //         title: "Tgl Pulang",
            //         template: "#if (tglpulang) {# #= new moment(tglPulang).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #",
            //         width: 130
            //     }
            //         // ,
            //         // {
            //         // title: "",
            //         // template: "<button class=\"c-button\" ng-click=\"showDetails(dataItem)\">Detil</button>",
            //         // width: 90
            //         // }
            //     ],
            //     pageable: true
            // }

            ModelItem.getDataDummyGeneric("JenisDiagnosa", true, true, 10).then(function (data) {
                $scope.sourceJenisDiagnosisPrimer = data;
                $scope.sourceJenisDiagnosisPrimer1 =data;
            });

            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function (data) {
                $scope.sourceDiagnosisPrimer = data;
                // $scope.sourceDiagnosisPrimer1 =data;
                // $scope.sourceKdDiagnosa = data;
                // $scope.sourceNamaDiagnosa = data;
            });
            
            ModelItem.getDataDummyGeneric("Ruangan", true, true, 10).then(function (data) {
                $scope.sourceRuangan = data;
            });

            // get diagnosa icd9
            // ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 50).then(function(data) {
            //     $scope.sourceDiagnosisTindakan = data;
            // }); 

             modelItemAkuntansi.getDataDummyPHP("pasien/get-combo-icd9", true, true, 10).then(function(data) {
                     $scope.sourceDiagnosisPrimer1= data;

                 });
          
            
           

            $scope.addDataDiagnosisPrimer = function () {
                var listRawRequired = [
                    "item.jenisDiagnosis|k-ng-model|Jenis Diagnosa",
                    "item.diagnosisPrimer|k-ng-model|Diagnosa",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    $scope.listInputDiagnosis.add({
                        "jenisDiagnosis": $scope.item.jenisDiagnosis,
                        "diagnosisPrimer": $scope.item.diagnosisPrimer,
                        "namaRuangan": $scope.item.namaRuangan
                    });
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.namaRuangan;
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.removeDiagnosa = function (e) {
                e = $scope.klikGrid.norec_dp;

                // e.preventDefault();
                // var grid = this;
                // var row = $(e.currentTarget).closest("tr");

                // var selectedItem = grid.dataItem(row);

                // $scope.dataDiagnosisPrimer.remove(selectedItem);
            }
            $scope.listInputDiagnosis = new kendo.data.DataSource({
                data: [],
                change: function (e) {
                    var row = e.index;
                    e.items.forEach(function (data) {
                        data.rowNumber = ++row;
                    })
                }
            });
            $scope.detilGridOptions = {
                sortable: true,
                selectable: "row",
                columns: [{
                    title: "#",
                    template: "{{listRegistrasiDetil.indexOf(dataItem) + 1}}",
                    width: 35
                }, {
                    field: "noRegistrasi",
                    title: "No. Registrasi",
                    aggregates: ["count"],
                    width: 120
                }, {
                    field: "tglRegistrasi",
                    title: "Tgl Registrasi",
                    template: "#if (tglRegistrasi) {# #= new moment(tglRegistrasi).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #",
                    width: 130
                }, {
                    field: "tglRegistrasiPasienDaftar",
                    title: "Tgl Daftar",
                    template: "#if (tglRegistrasiPasienDaftar) {# #= new moment(tglRegistrasiPasienDaftar).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #",
                    width: 130
                }, {
                    field: "namaRuangan",
                    title: "Ruangan Pelayanan"
                }, {
                    field: "namaRuanganAsal",
                    title: "Ruangan Asal"
                }, {
                    field: "namaRuanganLast",
                    title: "Ruangan Last"
                }, {
                    field: "tglMasuk",
                    title: "Tgl Masuk",
                    template: "#if (tglMasuk) {# #= new moment(tglMasuk).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #",
                    width: 120
                }, {
                    field: "tglPulang",
                    title: "Tgl Pulang",
                    template: "#if (tglPulang) {# #= new moment(tglPulang).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #"
                }, {
                    field: "statusKendaliDokumen",
                    title: "Status"
                }, {
                    field: "namaDokter",
                    title: "Dokter"
                }, {
                    field: "namaDokterDpjp",
                    title: "Dokter DPJP"
                }, {
                    field: "namaDokterPemeriksa",
                    title: "Dokter Pemeriksa",
                    template: "#if (namaDokterPemeriksa) {# #= namaDokterPemeriksa # #} else {# - #} #"
                }],
                pageable: true
            }
            $scope.gridIcd9 = {
                sortable: true,
                selectable: "row",
                toolbar: [{
                    name: "create",
                    template: '<a class="k-button" data-ng-click="toogleKlikIcd(\'Icd9\')">Input ICD-9</a>'
                }],
                columns: [{
                    title: "Diagnosa",
                    columns: [{
                        field: "kdDiagnosa",
                        title: "Kode",
                        width: 80
                    }, {
                        field: "namaDiagnosa",
                        title: "Nama",
                        width: 250
                    }]
                }, {
                    field: "namaRuangan",
                    title: "Nama Ruangan",
                }, {
                    field: "idRuangan",
                    title: "ID Ruangan",
                    hidden: true
                }]
            }
            $scope.gridIcd10 = {
                sortable: true,
                selectable: "row",
                toolbar: [{
                    name: "create",
                    template: '<a class="k-button" data-ng-click="toogleKlikIcd(\'icd10\')">Input ICD-10</a>'
                }],
                columns: [{
                    title: "Diagnosa",
                    columns: [{
                        field: "jenisDiagnosa",
                        title: "Jenis",
                        width: 120
                    }, {
                        field: "kdDiagnosa",
                        title: "Kode",
                        width: 80
                    }, {
                        field: "namaDiagnosa",
                        title: "Nama",
                        width: 250
                    }, {
                        field: "idDiagnosa",
                        title: "ID Diagnosa",
                        hidden: true
                    }]
                }, {
                    field: "namaRuangan",
                    title: "Nama Ruangan",
                }, {
                    field: "idRuangan",
                    title: "ID Ruangan",
                    hidden: true
                }]
            }
            $scope.gridDaftarInputIcd9 = {
                sortable: true,
                selectable: "row",
                columns: [{
                    title: "#",
                    template: "{{daftarInputIcd9.indexOf(dataItem) + 1}}",
                    width: 35
                }, {
                    title: "Diagnosa",
                    columns: [{
                        field: "diagnosisTindakan.kdDiagnosaTindakan",
                        title: "Kode",
                        width: 80
                    }, {
                        field: "diagnosisTindakan.namaDiagnosaTindakan",
                        title: "Nama",
                        width: 250
                    }]
                }, {
                    field: "keterangan",
                    title: "Keterangan",
                }]
            }
            $scope.gridDaftarInputIcd10 = {
                sortable: true,
                selectable: "row",
                columns: [{
                    title: "#",
                    template: "{{daftarInputIcd10.indexOf(dataItem) + 1}}",
                    width: 35
                }, {
                    field: "jenisDiagnosis.jenisDiagnosa",
                    title: "Jenis Diagnosa",
                    width: 120
                }, {
                    title: "Diagnosa",
                    columns: [{
                        field: "diagnosis.kdDiagnosa",
                        title: "Kode",
                        width: 80
                    }, {
                        field: "diagnosis.namaDiagnosa",
                        title: "Nama",
                        width: 250
                    }, {
                        field: "diagnosis.idDiagnosa",
                        title: "ID Diagnosa",
                        hidden: true
                    }]
                }, {
                    field: "keterangan",
                    title: "Keterangan",
                }]
            }

            $scope.showDetails = function (e) {
                if (!e.noRec) return;
                currentParams = e.noRec; // kondisi jalanin trigger toggle show hide
                findPasien.getAntrianRegistrasi(e.noRec).then(function (list) {
                    var listData = list.data.data;
                    $scope.listRegistrasiDetil = new kendo.data.DataSource({
                        data: listData.antrian,
                        pageable: true,
                        pagesize: 20
                    })
                    $scope.listIcd9 = new kendo.data.DataSource({
                        data: listData.ICD9,
                        pageable: true,
                        pagesize: 20,
                        schema: {
                            model: {
                                fields: {
                                    kdDiagnosa: { type: "string", validation: { required: true } },
                                    namaDiagnosa: { type: "string", validation: { required: true } },
                                    namaRuangan: { type: "string", validation: { required: true } },
                                    idRuangan: { type: "number", validation: { required: true } },
                                }
                            }
                        }
                    })
                    $scope.listIcd10 = new kendo.data.DataSource({
                        data: listData.ICD10,
                        pageable: true,
                        pagesize: 20,
                        schema: {
                            model: {
                                fields: {
                                    kdDiagnosa: { type: "string", validation: { required: true } },
                                    namaDiagnosa: { type: "string", validation: { required: true } },
                                    jenisDiagnosa: { type: "string", validation: { required: true } },
                                    idDiagnosa: { type: "number", validation: { required: true } },
                                    namaRuangan: { type: "string", validation: { required: true } },
                                    idRuangan: { type: "number", validation: { required: true } },
                                }
                            }
                        }
                    })
                }).then(function () {
                    // get diagnosa icd10
                    ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function (data) {
                        $scope.sourceDiagnosisPrimer = data;

                    });
                    // get jenis diagnosa
                    ModelItem.getDataDummyGeneric("JenisDiagnosa").then(function (data) {
                        $scope.sourceJenisDiagnosisPrimer = data;
                        $scope.sourceJenisDiagnosisPrimer1 = data;
                    });

                    // get diagnosa icd9
                    // ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 10).then(function(data) {
                    //     $scope.sourceDiagnosisPrimer1 = data;
                    // }); 
                    $scope.item.findBy = '1';
                    $scope.item.findBy1 = '1';
                })

                $scope.showDetail = true;
                $scope.toggleDetail(e.noRec);
            }
            $scope.toggleDetail = function (currentData) {
                if (currentData !== currentParams)
                    $scope.showDetail = !$scope.showDetail;
            }

            function loaaaaaaad() {
                var norReg = ""
                if ($scope.currentAntrian.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.currentAntrian.noregistrasi;
                }
                // manageSarprasPhp.getDataTableTransaksi("pasien/get-pasienbynoreg?"
                //     + norReg
                // ).then(function (dat) {
                //     $scope.listRuangan = dat.data.data;
                // });

                manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoreg?"
                    + norReg
                ).then(function (data) {
                    $scope.listGridDiagnosa = new kendo.data.DataSource({
                        data: data.data.datas,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                });

                    // $scope.dataSelected = data.data.datas;
                manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoregicd9?"
                    + norReg
                ).then(function (data) {
                    $scope.listGridDiagnosa1 = new kendo.data.DataSource({
                        data: data.data.datas,
                        pageSize: 10,
                        total: data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });

                    // $scope.dataSelected = data.data.datas;
                });

            }


            // function LoadData() {
            $scope.kl = function (data) {
          
                if ($scope.klikInputDiagnosis) return;
                $scope.currentAntrian = data;
    

                var norReg = ""
                if ($scope.currentAntrian.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.currentAntrian.noregistrasi;
                }
                manageSarprasPhp.getDataTableTransaksi("pasien/get-pasienbynoreg?"
                    + norReg
                ).then(function (dat) {
                    $scope.listRuangan = dat.data.data
                    $scope.item.namaRuangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                    $scope.listRuangan1 = dat.data.data
                    $scope.item.namaRuangan1 = {id:$scope.listRuangan1[0].id,namaruangan:$scope.listRuangan1[0].namaruangan}

                });

                // manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoreg?"
                //     + norReg
                // ).then(function (dat) {
                //     $scope.listRuangan = dat.data.data
                //     $scope.item.namaRuangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                //     $scope.listRuangan1 = dat.data.data
                //     $scope.item.namaRuangan1 = {id:$scope.listRuangan1[0].id,namaruangan:$scope.listRuangan1[0].namaruangan}

                // });

                loaaaaaaad();
            }
          
            $scope.gridDiagnosa =
                // {
                // columns: 
                [
                    {
                        "title": "#",
                        "template": "{{listGridDiagnosa.indexOf(dataItem) + 1}}",
                        "width": 35
                    },
                    {
                        "field": "jenisdiagnosa",
                        "title": "Jenis Diagnosis",
                        "width": 150
                    }, {
                        "field": "kddiagnosa",
                        "title": "Kode Diagnosa",
                        "width": 150
                    }, {
                        "field": "namadiagnosa",
                        "title": "Nama Diagnosa"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": 150
                    },
                    {
                        "field": "keterangan",
                        "title": "Keterangan",
                        "width": 150
                    }
                    // ,
                    // {
                    //     "field": "no",
                    //     "title": "No",
                    //     "width" : "30px",
                    // },
                    // {
                    //     "field": "jenisDiagnosis.jenisDiagnosa",
                    //     "title": "Jenis Diagnosis",
                    //     "width": 150
                    // }, {
                    //     "field": "diagnosisPrimer.kdDiagnosa",
                    //     "title": "Kode Diagnosa",
                    //     "width": 150
                    // }, {
                    //     "field": "diagnosisPrimer.namaDiagnosa",
                    //     "title": "Nama Diagnosa"
                    // }, {
                    //     "field": "namaRuangan.namaruangan",
                    //     "title": "Ruangan",
                    //     "width": 150
                    // },
                    // {
                    //     command: {
                    //         text: "Hapus",
                    //         click: $scope.removeDiagnosa
                    //     },
                    //     title: "&nbsp;",
                    //     width: "100px"
                    // }
                ];
            // }
            // }
            // LoadData();

            $scope.gridDiagnosa1 =
                // {
                // columns: 
                [
                    {
                        "title": "#",
                        "template": "{{listGridDiagnosa1.indexOf(dataItem) + 1}}",
                        "width": 35
                    },
                    // {
                    //     "field": "jenisdiagnosa",
                    //     "title": "Jenis Diagnosis",
                    //     "width": 150
                    // },
                    {
                        "field": "kddiagnosatindakan",
                        "title": "Kode Diagnosa",
                        "width": 150
                    }, {
                        "field": "namadiagnosatindakan",
                        "title": "Nama Diagnosa"
                    }, {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": 150
                    },
                    {
                        "field": "keterangantindakan",
                        "title": "Keterangan",
                        "width" : "100px",
                    }
                    // ,
                    // {
                    //     "field": "no",
                    //     "title": "No",
                    //     "width" : "30px",
                    // },
                    // {
                    //     "field": "jenisDiagnosis.jenisDiagnosa",
                    //     "title": "Jenis Diagnosis",
                    //     "width": 150
                    // }, {
                    //     "field": "diagnosisPrimer.kdDiagnosa",
                    //     "title": "Kode Diagnosa",
                    //     "width": 150
                    // }, {
                    //     "field": "diagnosisPrimer.namaDiagnosa",
                    //     "title": "Nama Diagnosa"
                    // }, {
                    //     "field": "namaRuangan.namaruangan",
                    //     "title": "Ruangan",
                    //     "width": 150
                    // },
                    // {
                    //     command: {
                    //         text: "Hapus",
                    //         click: $scope.removeDiagnosa
                    //     },
                    //     title: "&nbsp;",
                    //     width: "100px"
                    // }
                ];

            $scope.cboInputDiagnosa = true;
            $scope.showInputDiagnosa = function () {
          
                if ($scope.currentAntrian == undefined) {
                    alert("Pilih data Pasien terlebih dahulu !")
                    return;
                }
                
                $scope.cboDiagnosa = true
                $scope.cboDiagnosa1 = true
                $scope.cboInputDiagnosa = false
                $scope.findBy = "0";
                $scope.findBy1 = "0";
                loaaaaaaad();
            }
            $scope.batal = function () {
                $scope.cboDiagnosa = false
                $scope.cboDiagnosa1 = false
                $scope.cboInputDiagnosa = true
                delete $scope.item.jenisDiagnosis;
                delete $scope.item.diagnosisPrimer;
                delete $scope.item.namaRuangan;
                loaaaaaaad();
            }

            $scope.batal1 = function () {
                $scope.cboDiagnosa = false
                $scope.cboDiagnosa1 = false
                $scope.cboInputDiagnosa = true
                // delete $scope.item.jenisDiagnosis;
                delete $scope.item.diagnosisPrimer1;
                delete $scope.item.namaRuangan1;
                loaaaaaaad();
            }

            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.hapusDiagnosa = function () {

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
                    // delete $scope.item.KodeDiagnosa;
                    delete $scope.item.namaRuangan;
                    // window.history.back();
                    $scope.dataSelected = {};
                    loaaaaaaad()
                })
                // loaaaaaaad();
            }

            $scope.hapusDiagnosa1 = function () {

                if ($scope.item.diagnosisPrimer1 == undefined) {
                    alert("Pilih data yang mau di hapus!!")
                    return
                }
                var diagnosa = {
                    norec_dp: $scope.dataSelected1.norec_diagnosapasien
                }
                var objDelete =
                    {
                        diagnosa: diagnosa,
                    }
                manageSarprasPhp.deleteDataDiagnosaTindakan(objDelete).then(function (e) {
                    // delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosisPrimer1;
                    // delete $scope.item.keterangan1;
                    // delete $scope.item.KodeDiagnosa;
                    delete $scope.item.namaRuangan1;
                    // window.history.back();
                    $scope.dataSelected1 = {};
                    loaaaaaaad()
                })
                // loaaaaaaad();
            }
            
            $scope.SaveDiagnosa = function(){
               if ($scope.item.jenisDiagnosis == undefined) {
                    alert("Pilih Jenis Diagnosa terlebih dahulu!!")
                    return
                }
                if ($scope.item.diagnosisPrimer == undefined) {
                    alert("Pilih Kode Diagnosa dan Nama Diagnosa terlebih dahulu!!")
                    return
                }
                // if ($scope.item.NamaDiagnosa == undefined) {
                //     alert("Pilih  Nama Diagnosa terlebih dahulu!!")
                //     return
                // }
                var norecDiagnosaPasien = "";
                if ($scope.dataSelected.norec_diagnosapasien != undefined) {
                    norecDiagnosaPasien = $scope.dataSelected.norec_diagnosapasien
                }

                var keterangan ="";
                if ($scope.item.keterangan == undefined){
                    keterangan = "-"
                }
                else{
                    keterangan = $scope.item.keterangan
                }

                $scope.now = new Date();
                var detaildiagnosapasien = {
                    norec_dp: norecDiagnosaPasien,
                    // noregistrasifk: $scope.item.namaRuangan.details.norec_apd,
                    noregistrasifk: $scope.listRuangan[0].details[0].norec_apd,
                    tglregistrasi: $scope.currentAntrian.tglregistrasi,
                    objectdiagnosafk: $scope.item.diagnosisPrimer.id,
                    objectjenisdiagnosafk: $scope.item.jenisDiagnosis.id,
                    tglinputdiagnosa: moment($scope.now).format('YYYY-MM-DD hh:mm:ss'),
                    keterangan: keterangan
                }
                var objSave =
                    {
                        detaildiagnosapasien: detaildiagnosapasien,
                    }

                manageSarprasPhp.postDataDiagnosa(objSave).then(function (e) {
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.keterangan;
                    // delete $scope.item.KodeDiagnosa;
                    // delete $scope.item.namaRuangan;
                    $scope.dataSelected = {};
                    loaaaaaaad()
                    // window.history.back();
                })
               
            }

            $scope.SaveDiagnosa1 = function(){
               // if ($scope.item.jenisDiagnosis1 == undefined) {
                //     alert("Pilih Jenis Diagnosa terlebih dahulu!!")
                //     return
                // }
                if ($scope.item.diagnosisPrimer1 == undefined) {
                    alert("Pilih Kode Diagnosa dan Nama Diagnosa terlebih dahulu!!")
                    return
                }
                // if ($scope.item.NamaDiagnosa == undefined) {
                //     alert("Pilih  Nama Diagnosa terlebih dahulu!!")
                //     return
                // }
                var norecDiagnosaTindakanPasien = "";
                if ($scope.dataSelected1.norec_diagnosapasien != undefined) {
                    norecDiagnosaTindakanPasien = $scope.dataSelected1.norec_diagnosapasien
                }
                var keteranganTindakan = "-";
                if($scope.item.keteranganTindakan != undefined){
                    keteranganTindakan = $scope.item.keteranganTindakan
                }

                $scope.now = new Date();
                var detaildiagnosatindakanpasien = {
                    norec_dp: norecDiagnosaTindakanPasien,
                    // noregistrasifk: $scope.item.namaRuangan.details.norec_apd,
                    objectpasienfk:$scope.listRuangan1[0].details[0].norec_apd,
                    tglpendaftaran: $scope.currentAntrian.tglregistrasi,
                    objectdiagnosatindakanfk: $scope.item.diagnosisPrimer1.id,
                    keterangantindakan: keteranganTindakan,
                    // objectjenisdiagnosafk: $scope.item.jenisDiagnosis1.id,
                    // tglinputdiagnosa: moment($scope.now).format('YYYY-MM-DD hh:mm:ss'),
                    // keterangan: $scope.item.keterangan
                }
                var objSave =
                    {
                        detaildiagnosatindakanpasien: detaildiagnosatindakanpasien,
                    }

                manageSarprasPhp.postDataDiagnosaTIndakan(objSave).then(function (e) {
                    // delete $scope.item.jenisDiagnosis1;
                    delete $scope.item.diagnosisPrimer1;
                    // delete $scope.item.diagnosisPrimer22;
                    // delete $scope.item.keterangan1;
                    // delete $scope.item.KodeDiagnosa;
                    // delete $scope.item.namaRuangan;
                    $scope.dataSelected1 = {};
                    loaaaaaaad()
                    // window.history.back();
                })
               
            }

            $scope.simpanDiagnosa = function () {
                var norReg = ""
                if ($scope.currentAntrian.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.currentAntrian.noregistrasi;
                }
                var kddiagnosa = ""
                if ($scope.item.diagnosisPrimer != undefined) {
                    kddiagnosa = "&kddiagnosa=" + $scope.item.diagnosisPrimer.kdDiagnosa;
                }
                 $scope.SaveDiagnosa();
               // manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoreg?"
               //      + norReg
               //      + kddiagnosa
               //  ).then(function (data) {
               //      debugger;
               //      var datas = data.data.datas;
               //         // if (datas == ''){
               //              if(datas.length > 0){
               //                  var confirm = $mdDialog.confirm()
               //                          .title('Peringatan')
               //                          .textContent('Pasien Sudah Memiliki Diagnosa yang sama ! Lanjut Simpan? ')
               //                          .ariaLabel('Lucky day')
               //                          .cancel('Tidak')
               //                          .ok('Ya')
               //                      $mdDialog.show(confirm).then(function () {
               //                          $scope.SaveDiagnosa();
               //                      })

               //              }else{
               //                  $scope.SaveDiagnosa();
               //              }
               //          // }else
               //          //    $scope.SaveDiagnosa();
               //  })
            }

            $scope.simpanDiagnosa1 = function () {
                var norReg = ""
                if ($scope.currentAntrian.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.currentAntrian.noregistrasi;
                }
                var kddiagnosa = ""
                if ($scope.item.diagnosisPrimer1 != undefined) {
                    kddiagnosa = "&kddiagnosatindakan=" + $scope.item.diagnosisPrimer1.kdDiagnosaTindakan;
                }
                $scope.SaveDiagnosa1();
                // manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoregicd9?"
                //     + norReg
                //     + kddiagnosa
                // ).then(function (data) {
                //     debugger;
                //     var datas = data.data.datas;
                //        // if (datas == ''){
                //             if(datas.length > 0){
                //                 var confirm = $mdDialog.confirm()
                //                         .title('Peringatan')
                //                         .textContent('Pasien Sudah Memiliki Diagnosa yang sama ! Lanjut Simpan? ')
                //                         .ariaLabel('Lucky day')
                //                         .cancel('Tidak')
                //                         .ok('Ya')
                //                     $mdDialog.show(confirm).then(function () {
                //                         $scope.SaveDiagnosa1();
                //                     })

                //             }else{
                                
                //                 $scope.SaveDiagnosa1();
                //             }
                //         // }else
                //         //    $scope.SaveDiagnosa();
                // })
            }

            $scope.klikGrid = function (dataSelected) {
                if (dataSelected != undefined) {
                    $scope.sourceDiagnosisPrimer.add({
                        id: dataSelected.objectdiagnosafk,
                        kdDiagnosa: dataSelected.kddiagnosa,
                        namaDiagnosa: dataSelected.namadiagnosa,
                        noregistrasi: dataSelected.noregistrasi,
                        tglregistrasi: dataSelected.tglregistrasi,
                        objectruanganfk: dataSelected.objectruanganfk,
                        namaruangan: dataSelected.namaruangan,
                        norec_apd: dataSelected.norec_apd,
                        objectdiagnosafk: dataSelected.objectdiagnosafk,
                        objectjenisdiagnosafk: dataSelected.objectjenisdiagnosafk,
                        jenisdiagnosa: dataSelected.jenisdiagnosa,
                        norec_diagnosapasien: dataSelected.norec_diagnosapasien,
                        norec_detaildpasien: dataSelected.norec_detaildpasien,
                        id: dataSelected.id,
                        kdprofile: dataSelected.kdprofile,
                        statusenabled: dataSelected.statusenabled,
                        kodeexternal: dataSelected.kodeexternal,
                        namaexternal: dataSelected.namaexternal,
                        norec: dataSelected.norec,
                        reportdisplay: dataSelected.reportdisplay,
                        objectjeniskelaminfk: dataSelected.objectjeniskelaminfk,
                        objectkategorydiagnosafk: dataSelected.objectkategorydiagnosafk,
                        qdiagnosa: dataSelected.qdiagnosa
                    })
                    $scope.item.jenisDiagnosis = { id: dataSelected.objectjenisdiagnosafk, jenisDiagnosa: dataSelected.jenisdiagnosa }
                    $scope.item.diagnosisPrimer = {
                        id: dataSelected.objectdiagnosafk,
                        kdDiagnosa: dataSelected.kddiagnosa,
                        namaDiagnosa: dataSelected.namadiagnosa,
                        noregistrasi: dataSelected.noregistrasi,
                        tglregistrasi: dataSelected.tglregistrasi,
                        objectruanganfk: dataSelected.objectruanganfk,
                        namaruangan: dataSelected.namaruangan,
                        norec_apd: dataSelected.norec_apd,
                        objectdiagnosafk: dataSelected.objectdiagnosafk,
                        objectjenisdiagnosafk: dataSelected.objectjenisdiagnosafk,
                        jenisdiagnosa: dataSelected.jenisdiagnosa,
                        norec_diagnosapasien: dataSelected.norec_diagnosapasien,
                        norec_detaildpasien: dataSelected.norec_detaildpasien,
                        id: dataSelected.id,
                        kdprofile: dataSelected.kdprofile,
                        statusenabled: dataSelected.statusenabled,
                        kodeexternal: dataSelected.kodeexternal,
                        namaexternal: dataSelected.namaexternal,
                        norec: dataSelected.norec,
                        reportdisplay: dataSelected.reportdisplay,
                        objectjeniskelaminfk: dataSelected.objectjeniskelaminfk,
                        objectkategorydiagnosafk: dataSelected.objectkategorydiagnosafk,
                        qdiagnosa: dataSelected.qdiagnosa
                    }
                    $scope.item.diagnosisPrimer2 = { id: dataSelected.objectdiagnosafk, namaDiagnosa: dataSelected.namadiagnosa }
                    $scope.item.namaRuangan = ''
                    $scope.item.namaRuangan = {
                        noregistrasi: dataSelected.noregistrasi,
                        objectruanganfk: dataSelected.objectruanganfk,
                        namaruangan: dataSelected.namaruangan,
                        norec_apd: dataSelected.norec_apd,
                        keterangan: dataSelected.keterangan
                    }//  { id: dataSelected.objectruanganfk, namaruangan: dataSelected.namaruangan }
                }

            }

            $scope.klikGrid1 = function (dataSelected1) {
                if (dataSelected1 != undefined) {
                    $scope.sourceDiagnosisPrimer1.add({
                        id: dataSelected1.objectdiagnosafk,
                        kdDiagnosaTindakan: dataSelected1.kddiagnosatindakan,
                        namaDiagnosaTindakan: dataSelected1.namadiagnosatindakan,
                        noregistrasi: dataSelected1.noregistrasi,
                        tglregistrasi: dataSelected1.tglregistrasi,
                        objectruanganfk: dataSelected1.objectruanganfk,
                        namaruangan: dataSelected1.namaruangan,
                        norec_apd: dataSelected1.norec_apd,
                        objectdiagnosafk: dataSelected1.objectdiagnosafk,
                        objectjenisdiagnosafk: dataSelected1.objectjenisdiagnosafk,
                        jenisdiagnosa: dataSelected1.jenisdiagnosa,
                        norec_diagnosapasien: dataSelected1.norec_diagnosapasien,
                        norec_detaildpasien: dataSelected1.norec_detaildpasien,
                        id: dataSelected1.id,
                        kdprofile: dataSelected1.kdprofile,
                        statusenabled: dataSelected1.statusenabled,
                        kodeexternal: dataSelected1.kodeexternal,
                        namaexternal: dataSelected1.namaexternal,
                        norec: dataSelected1.norec,
                        reportdisplay: dataSelected1.reportdisplay,
                        objectjeniskelaminfk: dataSelected1.objectjeniskelaminfk,
                        objectkategorydiagnosafk: dataSelected1.objectkategorydiagnosafk,
                        qdiagnosa: dataSelected1.qdiagnosa,
                        keterangantindakan: dataSelected1.keterangantindakan
                    })
                     
                    $scope.item.jenisDiagnosis1 = { id: dataSelected1.objectjenisdiagnosafk, jenisDiagnosa: dataSelected1.jenisdiagnosa }
                    $scope.item.diagnosisPrimer1 = {
                        id: dataSelected1.objectdiagnosafk,
                        kdDiagnosaTindakan: dataSelected1.kdDiagnosaTindakan,
                        namaDiagnosaTindakan: dataSelected1.namaDiagnosaTindakan,
                        noregistrasi: dataSelected1.noregistrasi,
                        tglregistrasi: dataSelected1.tglregistrasi,
                        objectruanganfk: dataSelected1.objectruanganfk,
                        namaruangan: dataSelected1.namaruangan,
                        norec_apd: dataSelected1.norec_apd,
                        objectdiagnosafk: dataSelected1.objectdiagnosafk,
                        objectjenisdiagnosafk: dataSelected1.objectjenisdiagnosafk,
                        jenisdiagnosa: dataSelected1.jenisdiagnosa,
                        norec_diagnosapasien: dataSelected1.norec_diagnosapasien,
                        norec_detaildpasien: dataSelected1.norec_detaildpasien,
                        id: dataSelected1.id,
                        kdprofile: dataSelected1.kdprofile,
                        statusenabled: dataSelected1.statusenabled,
                        kodeexternal: dataSelected1.kodeexternal,
                        namaexternal: dataSelected1.namaexternal,
                        norec: dataSelected1.norec,
                        reportdisplay: dataSelected1.reportdisplay,
                        objectjeniskelaminfk: dataSelected1.objectjeniskelaminfk,
                        objectkategorydiagnosafk: dataSelected1.objectkategorydiagnosafk,
                        qdiagnosa: dataSelected1.qdiagnosa,
                        keterangantindakan: dataSelected1.keterangantindakan
                    }
                   
                    $scope.item.diagnosisPrimer2 = { id: dataSelected1.objectdiagnosafk, namaDiagnosaTindakan: dataSelected1.namaDiagnosaTindakan }
                    $scope.item.namaRuangan1 = ''
                    $scope.item.namaRuangan1 = {
                        noregistrasi: dataSelected1.noregistrasi,
                        objectruanganfk: dataSelected1.objectruanganfk,
                        namaruangan: dataSelected1.namaruangan,
                        norec_apd: dataSelected1.norec_apd
                    }//  { id: dataSelected.objectruanganfk, namaruangan: dataSelected.namaruangan }
                    $scope.item.keteranganTindakan = dataSelected1.keterangantindakan
                }

            }

            $scope.toogleKlikIcd = function (current) {
                if ($scope.currentAntrian) {
                    if (current) {
                        if (current.indexOf('9') >= 0) {
                            $scope.daftarInputIcd9 = new kendo.data.DataSource({
                                data: [],
                                pageSize: 15,
                                change: function (e) {
                                    if (e.items.length > 0) {
                                        $scope.showSimpanIcd9 = true;
                                    } else {
                                        $scope.showSimpanIcd9 = false;
                                    }
                                }
                            });
                            $scope.pilihIcd9 = true;
                        } else if (current.indexOf('10') >= 0) {
                            $scope.daftarInputIcd10 = new kendo.data.DataSource({
                                data: [],
                                pageSize: 15,
                                change: function (e) {
                                    if (e.items.length > 0) {
                                        $scope.showSimpanIcd10 = true;
                                    } else {
                                        $scope.showSimpanIcd10 = false;
                                    }
                                }
                            });
                            $scope.pilihIcd10 = true;
                        }
                    } else {
                        delete $scope.pilihIcd9;
                        delete $scope.pilihIcd10;
                    }
                    $scope.klikInputDiagnosis = !$scope.klikInputDiagnosis;
                } else {
                    messageContainer.error('Antrian belum dipilih');
                }
            }

            $scope.tambahDataBaruDiagnosa = function (page) {
                if (page === 'icd9') {
                    var listRawRequired = [
                        "item.diagnosisTindakan|k-ng-model|Diagnosa"
                    ]
                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if (isValid.status) {
                        $scope.daftarInputIcd9.add({
                            diagnosisTindakan: $scope.item.diagnosisTindakan,
                            keterangan: $scope.item.keteranganDiagnosis
                        })
                        delete $scope.item.diagnosisTindakan;
                        delete $scope.item.keteranganDiagnosis;
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
                } else if (page === 'icd10') {
                    var listRawRequired = [
                        "item.jenisDiagnosis|k-ng-model|Jenis Diagnosa",
                        "item.diagnosisPrimer|k-ng-model|Nama Diagnosa"
                    ]
                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if (isValid.status) {
                        $scope.daftarInputIcd10.add({
                            jenisDiagnosis: $scope.item.jenisDiagnosis,
                            diagnosis: $scope.item.diagnosisPrimer,
                            keterangan: $scope.item.keteranganDiagnosis
                        })
                        delete $scope.item.jenisDiagnosis;
                        delete $scope.item.diagnosisPrimer;
                        delete $scope.item.keteranganDiagnosis;
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
                }
            }

            $scope.tambahData = function (page) {
                if (page.indexOf('9') > 0) {
                    if ($scope.daftarInputIcd9._data.length > 0) {
                        var dataDiagnosis = [], localData = [];
                        $scope.daftarInputIcd9._data.forEach(function (items) {
                            dataDiagnosis.push({
                                "id": items.diagnosisTindakan.id,
                                "namaDiagnosaTindakan": items.diagnosisTindakan.namaDiagnosaTindakan,
                                "keterangan": items.keterangan,
                                "diagnosaTindakan": {
                                    "id": items.diagnosisTindakan.id,
                                    "namaDiagnosa": items.diagnosisTindakan.namaDiagnosaTindakan,
                                    "keterangan": items.keterangan
                                }
                            })
                            localData.push({
                                "kdDiagnosa": items.diagnosisTindakan.kdDiagnosaTindakan,
                                "namaDiagnosa": items.diagnosisTindakan.namaDiagnosaTindakan,
                                "namaRuangan": $scope.currentAntrian.namaRuangan,
                                "idRuangan": $scope.currentAntrian.idRuangan
                            })
                        })
                        var saveData = {
                            "noRec": $scope.currentAntrian.noRec,
                            "pasien": {
                                "id": $scope.item.id
                            },
                            "tanggalPendaftaran": $scope.item.pasienDaftar.tglRegistrasi,
                            "diagnosisTindakan": dataDiagnosis
                        }
                        // var localData = {
                        //     "kdDiagnosa": $scope.item.diagnosisTindakan.kdDiagnosaTindakan,
                        //     "namaDiagnosa":  $scope.item.diagnosisTindakan.namaDiagnosaTindakan,
                        //     "namaRuangan": $scope.currentAntrian.namaRuangan,
                        //     "idRuangan": $scope.currentAntrian.idRuangan
                        // }
                        $scope.setToLocalGrid('icd9', localData);
                        managePasien.saveDiagnosaTindakanICD(saveData).then(function (e) {
                            $scope.toogleKlikIcd();
                            // debugger;
                            // delete $scope.item.diagnosisTindakan;
                            // delete $scope.item.findBy;
                            // $scope.icd9.close();
                        }, function (err) {
                            $scope.toogleKlikIcd();
                            // $scope.icd9.close();
                        })
                    } else {
                        messageContainer.error('Daftar diagnosa icd 9 tidak boleh kosong');
                    }
                } else if (page.indexOf('10') > 0) {
                    if ($scope.daftarInputIcd10._data.length > 0) {
                        var dataDiagnosis = [], localData = [];
                        $scope.daftarInputIcd10._data.forEach(function (items) {
                            dataDiagnosis.push({
                                diagnosa: {
                                    id: items.diagnosis.id
                                },
                                jenisDiagnosa: items.jenisDiagnosis,
                                keterangan: items.keterangan
                            });
                            localData.push({
                                "kdDiagnosa": items.diagnosis.kdDiagnosa,
                                "namaDiagnosa": items.diagnosis.namaDiagnosa,
                                "jenisDiagnosa": items.jenisDiagnosis.jenisDiagnosa,
                                "idDiagnosa": items.diagnosis.id,
                                "namaRuangan": $scope.currentAntrian.namaRuangan,
                                "idRuangan": $scope.currentAntrian.idRuangan
                            })
                        })
                        var saveData = {
                            pasien: {
                                id: $scope.item.id
                            },
                            tanggalPendaftaran: $scope.item.pasienDaftar.tglRegistrasi,
                            diagnosis: dataDiagnosis,
                            noRecPasienDaftar: $scope.currentAntrian.noRec
                        }
                        // var localData = {
                        //     "kdDiagnosa": $scope.item.diagnosisPrimer.kdDiagnosa,
                        //     "namaDiagnosa":  $scope.item.diagnosisPrimer.namaDiagnosa,
                        //     "jenisDiagnosa": $scope.item.jenisDiagnosis.jenisDiagnosa,
                        //     "idDiagnosa": $scope.item.jenisDiagnosis.id,
                        //     "namaRuangan": $scope.currentAntrian.namaRuangan,
                        //     "idRuangan": $scope.currentAntrian.idRuangan
                        // }
                        $scope.setToLocalGrid('icd10', localData);
                        managePasien.saveDiagnosaRmk(saveData).then(function (e) {
                            $scope.toogleKlikIcd();
                            // debugger;
                            // delete $scope.item.diagnosisPrimer;
                            // delete $scope.item.jenisDiagnosis;
                            // $scope.icd10.close();
                        }, function (err) {
                            $scope.toogleKlikIcd();
                            // $scope.icd10.close();
                        })
                    } else {
                        messageContainer.error('Daftar diagnosa icd 10 tidak boleh kosong');
                    }
                }
            }
            $scope.setToLocalGrid = function (page, items) {
                var grid;
                if (page.indexOf('9') > 0) {
                    grid = $scope.listIcd9
                } else if (page.indexOf('10') > 0) {
                    grid = $scope.listIcd10
                }
                items.forEach(function (elemen) {
                    grid.add(elemen);
                    grid.sync();
                })
            }
        }
    ]);
});