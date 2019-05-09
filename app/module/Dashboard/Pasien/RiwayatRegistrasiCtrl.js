define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('RiwayatRegistrasiCtrl', ['$q', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'DateHelper',
        function($q, managePasien, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, dateHelper) {
            $scope.isRouteLoading = false;
            // $scope.showDetail = false;
            var currentParams;
            $scope.now = new Date();
            $scope.item = {
                from: $scope.now,
                until: $scope.now
            }
            $scope.items = {};
            $scope.batal = function(){
                $scope.from = $scope.until = $scope.now;
                delete $scope.item.noRegistrasi;
            }
            // data dummy detil list registrasi
            $scope.listRegistrasiDetil = [];
            $scope.batal();
            $scope.findByRegistrasi = function() {
                // if (!$scope.noRegistrasi) $scope.noRegistrasi = '';
                var listRawRequired = [
                    "item.noRegistrasi|ng-model|Nomor registrasi"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.isRouteLoading = true;
                    // findPasien.getDaftarRegistrasi($scope.item.noRegistrasi, dateHelper.formatDate($scope.item.from, 'YYYY-MM-DD'), dateHelper.formatDate($scope.item.until, 'YYYY-MM-DD')).then(function(e) {
                    findPasien.getDaftarRegistrasi('', $scope.item.noRegistrasi, '', '').then(function(e) {
                        var data = [];
                        for (var key in e.data.data) {
                            if (e.data.data.hasOwnProperty(key)) {
                                var element = e.data.data[key];
                                element.isCheck = false;
                                data.push(element);
                            }
                        }
                        $scope.daftarRegistrasi = data;
                        $scope.listRegistrasi = new kendo.data.DataSource({
                            data: $scope.daftarRegistrasi,
                            pageSize: 25
                        });
                        $scope.isRouteLoading = false;
                        $scope.showDetail = false;
                    }, function(err){
                        messageContainer.error(err);
                        $scope.isRouteLoading = false;
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.findBynoCM = function(noCm){
                var listRawRequired = [
                    "item.noCm|ng-model|No CM"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.isRouteLoading = true;
                    $q.all([findPasien.findByNoCM(noCm),
                        findPasien.getDaftarRegistrasi(noCm, '', '', '')
                    ]).then(function(e){
                        if (e[0].statResponse) {
                            $scope.item = e[0].data.data;
                            $scope.item.tglLahir = new Date($scope.item.tglLahir);
                            $scope.item.from = $scope.now;
                            $scope.item.until = $scope.now;
                        }
                        if (e[1].statResponse) {
                            $scope.listRegistrasi = new kendo.data.DataSource({
                                data: e[1].data.data,
                                pageable: true,
                                pagesize: 5
                            })
                        }
                        $scope.isRouteLoading = false;
                        $scope.showDetail = false;
                   }, function(err){
                        messageContainer.error(err);
                        $scope.isRouteLoading = false;
                    });
                }else{
                    ModelItem.showMessages(isValid.messages);
                }
            }
            // $scope.findData();
            $scope.gridOptions = {
                sortable: true,
                selectable: "row",
                columns: [{
                    title: "#",
                    template: "{{listRegistrasi.indexOf(dataItem) + 1}}",
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
                    field: "namaRuanganLast",
                    title: "Ruangan Pelayanan",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)",
                    width: 250
                }, {
                    field: "namaDokterDpjp",
                    title: "Dokter"
                },  {
                    field: "tglPulang",
                    title: "Tgl Pulang",
                    template: "#if (tglPulang) {# #= new moment(tglPulang).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #",
                    width: 130
                },  {
                    title: "",
                    template: "<button class=\"c-button\" ng-click=\"showDetails(dataItem)\">Detil</button>",
                    width: 90
                }],
                pageable: true
            }
            $scope.detilGridOptions = {
                sortable: true,
                selectable: "row",
                columns: [{
                    title: "#",
                    template: "{{listRegistrasiDetil.indexOf(dataItem) + 1}}",
                    width: 35
                },  {
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
                },  {
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
                    template: '<a class="k-button" data-ng-click="inputIcd9()">Input ICD-9</a>'
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
                    template: '<a class="k-button" data-ng-click="inputIcd10()">Input ICD-10</a>'
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
            $scope.showDetails= function (e) {
                if (!e.noRec) return;
                currentParams = e.noRec; // kondisi jalanin trigger toggle show hide
                findPasien.getAntrianRegistrasi(e.noRec).then(function(list){
                    var listData = list.data.data;
                    $scope.listRegistrasiDetil =  new kendo.data.DataSource({
                        data: listData.antrian,
                        pageable: true,
                        pagesize: 20,
                        // schema: {
                        //     model: {
                        //         id: "noRec",
                        //         fields: {
                        //             noRec: {editable: false},
                        //             statusEnabled: {editable: false, defaultValue: true},
                        //             keUnit: {type: "string", validation: { required: true }},
                        //             dariUnit: {type: "string", validation: { required: true }},
                        //             tglUpdate: {validation: { required: true }},
                        //             kdProfile: {type: "number", editable: false, defaultValue: 0},
                        //             statusKendaliDokumen: {validation: { required: true }},
                        //             pasienId: {editable: false, type: "number", validation: { required: true }},
                        //             tglKembali: {nullable: true }
                        //         }
                        //     }
                        // }
                    })
                    $scope.listIcd9 =  new kendo.data.DataSource({
                        data: listData.ICD9,
                        pageable: true,
                        pagesize: 20,
						schema: {
                            model: {
                                fields: {
                                    kdDiagnosa: {type: "string", validation: { required: true }},
                                    namaDiagnosa: {type: "string", validation: { required: true }},
                                    namaRuangan: {type: "string", validation: { required: true }},
                                    idRuangan: {type: "number", validation: { required: true }},
                                }
                            }
                        }
                    })
                    $scope.listIcd10 =  new kendo.data.DataSource({
                        data: listData.ICD10,
                        pageable: true,
                        pagesize: 20,
						schema: {
                            model: {
                                fields: {
                                    kdDiagnosa: {type: "string", validation: { required: true }},
                                    namaDiagnosa: {type: "string", validation: { required: true }},
                                    jenisDiagnosa: {type: "string", validation: { required: true }},
                                    idDiagnosa: {type: "number", validation: { required: true }},
                                    namaRuangan: {type: "string", validation: { required: true }},
                                    idRuangan: {type: "number", validation: { required: true }},
                                }
                            }
                        }
                    })
                }).then(function(){
                    // get diagnosa icd10
                    ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                        $scope.sourceDiagnosisPrimer = data;
                    });
                    // get jenis diagnosa
                    ModelItem.getDataDummyGeneric("JenisDiagnosa").then(function(data) {
                        $scope.sourceJenisDiagnosisPrimer = data;
                    });
                    // get diagnosa icd9
                    ModelItem.getDataDummyGeneric("DiagnosaTindakan", true, true, 10).then(function(data) {
                        $scope.sourceDiagnosisTindakan = data;
                    });
                    $scope.item.findBy = '1';
                })
                $scope.showDetail = true;
                $scope.toggleDetail(e.noRec);
            }
            $scope.toggleDetail = function(currentData){
                if (currentData !== currentParams)
                    $scope.showDetail = !$scope.showDetail;
            }
            $scope.kl = function(data){
                $scope.currentAntrian = data;
            }
            $scope.inputIcd9 = function(){
                if($scope.currentAntrian) {
                    $scope.icd9.center().open();
                } else {
                    messageContainer.error('Silahkan pilih antrian terlebih dahulu');
                }
            }
            $scope.closeIcd9 = function(){
                 $scope.icd9.close();
            }
            $scope.inputIcd10 = function(){
                if($scope.currentAntrian) {
                    $scope.icd10.center().open();
                } else {
                    messageContainer.error('Silahkan pilih antrian terlebih dahulu');
                }
            }
            $scope.closeIcd10 = function(){
                 $scope.icd10.close();
            }
            $scope.tambahData = function(page){
                if (page.indexOf('9') > 0){
                    var listRawRequired = [
                        "item.diagnosisTindakan|k-ng-model|Diagnosa"
                    ]
                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var saveData = {
                            "noRec": $scope.currentAntrian.noRec,
                            "pasien":{  
                                "id": $scope.item.id
                            },
                            "tanggalPendaftaran": $scope.item.pasienDaftar.tglRegistrasi,
                            "diagnosisTindakan": [{
                                "diagnosaTindakan": {
                                    "id": $scope.item.diagnosisTindakan.id,
                                    "namaDiagnosaTindakan": $scope.item.diagnosisTindakan.namaDiagnosaTindakan,
                                    "diagnosaTindakan": {
                                        "id": $scope.item.diagnosisTindakan.id,
                                        "namaDiagnosa": $scope.item.diagnosisTindakan.namaDiagnosaTindakan
                                    }
                                }
                            }]
                        }
                        var localData = {
                            "kdDiagnosa": $scope.item.diagnosisTindakan.kdDiagnosaTindakan,
                            "namaDiagnosa":  $scope.item.diagnosisTindakan.namaDiagnosaTindakan,
                            "namaRuangan": $scope.currentAntrian.namaRuangan,
                            "idRuangan": $scope.currentAntrian.idRuangan
                        }
                        $scope.setToLocalGrid('icd9', localData);
                        managePasien.saveDiagnosaTindakanICD(saveData).then(function(e){
                            debugger;
                            delete $scope.item.diagnosisTindakan;
                            delete $scope.item.findBy;
                            $scope.icd9.close();
                        }, function(err){
                            $scope.icd9.close();
                        })
                    } else {
                        window.messageContainer.error(isValid.msg);
                    }
                } else if (page.indexOf('10') > 0) {
                    var listRawRequired = [
                        "item.jenisDiagnosis|k-ng-model|Jenis Diagnosa",
                        "item.diagnosisPrimer|k-ng-model|Diagnosa awal"
                    ]
                    var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var saveData = {
                            pasien: {
                                id: $scope.item.id
                            },
                            tanggalPendaftaran: $scope.item.pasienDaftar.tglRegistrasi,
                            diagnosis: [{
                                diagnosa: {
                                    id: $scope.item.diagnosisPrimer.id
                                },
                                jenisDiagnosa: $scope.item.jenisDiagnosis
                            }],
                            noRecPasienDaftar: $scope.currentAntrian.noRec
                        }
                        var localData = {
                            "kdDiagnosa": $scope.item.diagnosisPrimer.kdDiagnosa,
                            "namaDiagnosa":  $scope.item.diagnosisPrimer.namaDiagnosa,
                            "jenisDiagnosa": $scope.item.jenisDiagnosis.jenisDiagnosa,
                            "idDiagnosa": $scope.item.jenisDiagnosis.id,
                            "namaRuangan": $scope.currentAntrian.namaRuangan,
                            "idRuangan": $scope.currentAntrian.idRuangan
                        }
                        $scope.setToLocalGrid('icd10', localData);
                        managePasien.saveDiagnosaRmk(saveData).then(function(e){
                            debugger;
                            delete $scope.item.diagnosisPrimer;
                            delete $scope.item.jenisDiagnosis;
                            $scope.icd10.close();
                        }, function(err){
                            $scope.icd10.close();
                        })
                    } else {
                        window.messageContainer.error(isValid.msg);
                    }
                }
            }
            $scope.setToLocalGrid = function(page, items){
                var grid;
                if (page.indexOf('9')>0){
                    grid = $scope.listIcd9
                } else if(page.indexOf('10')>0){
                    grid = $scope.listIcd10
                }
                grid.add(items);
                grid.sync();
            }
        }
    ]);
});