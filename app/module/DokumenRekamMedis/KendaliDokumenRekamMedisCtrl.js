define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('KendaliDokumenRekamMedisCtrl', ['$q', '$scope', 'ModelItem', '$state', '$rootScope', '$timeout', '$window', 'ManagePasien', 'FindPasien', 'DateHelper', 'CetakHelper', 'ModelItem',
        function($q, $scope, modelItem, $state, $rootScope, $timeout, $window, managePasien, findPasien, dateHelper, cetakHelper, ModelItem) {
            $scope.title = "Kendali Dokumen Rekam Medis";
            $scope.subTitleKiri = "Registrasi";
            $scope.now = new Date();
            $scope.items = {
                start: $scope.now,
                end: $scope.now,
            }
            $scope.editable = true;
            ModelItem.getDataDummyGeneric("StatusKendaliDokumen").then(function(data){
                $scope.listStatus = data
            })
            $scope.reloadGridKendali = function(noRm){
                findPasien.getDaftarKendali(noRm, '', '', '', '').then(function(e){
                    $scope.gridDaftarKendali =  new kendo.data.DataSource({
                        data: e.data.data.data,
                        pageable: true,
                        pagesize: 20,
                        schema: {
                            model: {
                                id: "noRec",
                                fields: {
                                    noRec: {editable: false},
                                    statusEnabled: {editable: false, defaultValue: true},
                                    keUnit: {type: "string", validation: { required: true }},
                                    dariUnit: {type: "string", validation: { required: true }},
                                    tglUpdate: {validation: { required: true }},
                                    kdProfile: {type: "number", editable: false, defaultValue: 0},
                                    statusKendaliDokumen: {validation: { required: true }},
                                    pasienId: {editable: false, type: "number", validation: { required: true }},
                                    tglKembali: {nullable: true }
                                }
                            }
                        }
                    })
                })
            }
            $scope.kl =  function(current){
                $scope.tglJamSkrg = new Date();
                console.log($scope.tglJamSkrg);
            }
            $scope.find = function(noRm){
                $scope.currentRm = noRm;
                if (noRm) {
                    $q.all([findPasien.findByNoCM(noRm),
                        findPasien.getAntrianKendali(noRm, '', ''),
                        findPasien.getDaftarKendali(noRm, '', '', '', '')
                    ]).then(function(e){
                        if (e[0].statResponse) {
                            $scope.item = e[0].data.data;
                            $scope.item.tglLahir = new Date($scope.item.tglLahir);
                        }
                        if (e[1].statResponse) {
                            $scope.listRegistrasi = new kendo.data.DataSource({
                                data: e[1].data.data,
                                pageable: true,
                                pagesize: 20
                            })
                        }
                        if (e[2].statResponse) {
                            $scope.gridDaftarKendali =  new kendo.data.DataSource({
                                data: e[2].data.data.data,
                                pageable: true,
                                pagesize: 20,
                                schema: {
                                    model: {
                                        id: "noRec",
                                        fields: {
                                            noRec: {editable: false},
                                            statusEnabled: {editable: false, defaultValue: true},
                                            keUnit: {type: "string", validation: { required: true }},
                                            dariUnit: {type: "string", validation: { required: true }},
                                            tglUpdate: {validation: { required: true }, default: $scope.now},
                                            kdProfile: {type: "number", editable: false, defaultValue: 0},
                                            statusKendaliDokumen: {validation: { required: true }},
                                            pasienId: {editable: false, type: "number", validation: { required: true }},
                                            tglKembali: {nullable: true }
                                        }
                                    }
                                }
                            })
                        }
                   });
                   $scope.editable = true;
                } else {
                    messageContainer.error('No CM belum diisi')
                }
            }
            $scope.findRekap = function(){
                var noCm = $scope.items.noCm,
                    start = $scope.items.start,
                    end = $scope.items.end,
                    ruangan = $scope.items.ruangan,
                    status = $scope.items.status;

                if (!noCm) {
                   noCm = ''
                }
                if (!start) {
                   start = ''
                } else {
                    start = dateHelper.formatDate(start, 'YYYY-MM-DD HH:mm')
                }
                if (!end) {
                   end = ''
                } else {
                    end = dateHelper.formatDate(end, 'YYYY-MM-DD HH:mm')
                }
                if (!ruangan) {
                    ruangan = ''
                }
                if (!status) {
                    status = ''
                } else {
                    status = status.id 
                }
                findPasien.getDaftarKendali(noCm, start, end, ruangan, status).then(function(e){
                    $scope.gridDaftarKendali =  new kendo.data.DataSource({
                        data: e.data.data.data,
                        pageable: true,
                        pagesize: 20,
                        schema: {
                            model: {
                                id: "noRec",
                                fields: {
                                    noRec: {editable: false},
                                    statusEnabled: {editable: false, defaultValue: true},
                                    keUnit: {type: "string", validation: { required: true }},
                                    dariUnit: {type: "string", validation: { required: true }},
                                    tglUpdate: {validation: { required: true }},
                                    kdProfile: {type: "number", editable: false, defaultValue: 0},
                                    statusKendaliDokumen: {validation: { required: true }},
                                    pasienId: {editable: false, type: "number", validation: { required: true }},
                                    tglKembali: {nullable: true }
                                }
                            }
                        }
                    })
                })
                $scope.editable = false;
            }
            $scope.gridDaftarRegistrasi = {
                columns: [{
                    "field": "noRegistrasi",
                    "title": "No. Registrasi"
                }, {
                    "field": "namaRuangan",
                    "title": "Ruangan"
                }]
            }
            $scope.gridKendaliDokRM = {
                pageable: true,
                selectable: "row",
                save: function(e){
                    var tglUpdate = e.model.tglUpdate,
                        tglKembali = e.model.tglKembali;
                    var data = {
                        "noRec": e.model.noRec,
                        // "keUnit": e.model.keUnit,
                        // "dariUnit": e.model.dariUnit,
                        "dariUnit": "RAK",
                        "keUnit": "POLI",
                        "tglUpdate": new Date(tglUpdate).getTime(),
                        "statusEnabled":e.model.statusEnabled,
                        "kdProfile": e.model.kdProfile,
                        "statusKendaliDokumen": {
                            "id":e.model.statusKendaliDokumen.id,
                        },
                        "pasien": {
                            "id":e.model.pasien.id,
                        },
                        // "tglKembali": tglKembali == undefined ? "" : tglKembali.getTime(),
                        "tglKembali": tglKembali == "",
                    };
                    managePasien.saveKendaliDokumen(data).then(function(e){
                        // if (e.data.data.norec){
                        //     debugger;
                        //     $scope.reloadGridKendali($scope.currentRm);   
                        // }
                        // delete $scope.dataItem;
                        // $scope.winDialog.close();
                    })
                },
                columns: [{
                    "field": "tglUpdate",
                    "title": "Tgl/Jam Update",
                    "template": "#= kendo.toString(new Date(tglUpdate), 'dd-MM-yyyy HH:mm') #",
                    "width": 120
                }, {
                    "field": "noMr",
                    "title": "No. MR",
                    "template": '#= pasien.noCm #'
                }, {
                    "field": "dariUnit",
                    "title": "Unit Asal"
                }, {
                    "field": "keUnit",
                    "title": "Unit Tujuan"
                }, {
                    "field": "statusKendaliDokumen",
                    "title": "Status",
                    "template": '# if( statusKendaliDokumen==null) {# - # } else {# #= statusKendaliDokumen.name # #} #'
                }, {
                    "field": "kembali",
                    "title": "Kembali",
                    "template": '# if( tglKembali==null) {#<span class="center">Belum<span># } else {#<span class="center">Sudah<span>#} #'
                }, {
                    "field": "tglKembali",
                    "title": "Tgl/Jam Kembali",
                    "template": '# if( tglKembali==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tglKembali), "dd-MM-yyyy HH:mm") #<span>#} #',
                    "width": 120
                }, { 
                    "command": ["edit"],
                    title: " ",
                    width: "80px" 
                }],
                toolbar: [{
                    "name": "add",
                    "text": "Tambah Kendali",
                    "template": '<a ng-click="onClick()" class="k-button k-button-icontext k-grid-upload">Tambah Kendali</a>'	
                }],
                editable: {
                    mode: "popup",
                    window: {
                        title: "Update Data Kendali Dokumen",
                        // resizable: true,
                        // modal: false,
                        // draggable: true,
                        // visible: true
                    },
                    template: kendo.template($("#popup_editor").html())
                }
            }
            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
                dateInput: true
            }
            // $scope.listStatus = new kendo.data.DataSource({
            //     data: [{"id":1, "name": "dipinjam"},{"id":1, "name": "selesai"},{"id":1, "name": "diteruskan"}]
            // })
            $scope.onClick = function(){
                // if(!$scope.editable){

                //     return;
                // }
                if (!$scope.item && !$scope.editable){
                    messageContainer.error('No CM belum dipilih');
                    return;
                }
                $scope.dataItem = {
                    tglUpdate:$scope.now
                }
                // $scope.listStatus = new kendo.data.DataSource({
                //     data: [{"name": "dipinjam"},{"name": "selesai"},{"name": "diteruskan"}]
                // })
                // $scope.selectOptions1 = {
                //     dataSource: $scope.listStatus,
                //     template: "<div>#:name#</div>",
                //     autoBind: false
                // };
                $scope.winDialog.center().open();
            }
            $scope.tambahData = function(items){
                var listRawRequired = [
                    "dataItem.tglUpdate|k-ng-model|Tanggal update",
                    "dataItem.dariUnit|ng-model|Unit asal",
                    "dataItem.keUnit|ng-model|Unit tujuan",
                    "dataItem.statusKendaliDokumen|k-ng-model|Status dokumen",
                    // "dataItem.tglKembali|k-ng-model|Tanggal Kembali",
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        var tglKembali = items.tglKembali,
                            tglUpdate = items.tglUpdate;
                        var data = {
                            "keUnit": items.keUnit,
                            "dariUnit": items.dariUnit,
                            "tglUpdate": tglUpdate.getTime(), // error bad request jika save dengan format jam HH:mm:ss
                            "statusEnabled":true,
                            "kdProfile": 0,
                            "statusKendaliDokumen": items.statusKendaliDokumen,
                            "pasien": {
                                "id":$scope.item.id
                            },
                            "tglKembali": tglKembali == undefined ? "" : tglKembali.getTime(), // error bad request jika save dengan format jam HH:mm:ss
                        }
                        managePasien.saveKendaliDokumen(data).then(function(e){
                            if (e.data.data.norec){
                                delete $scope.dataItem;
                                $scope.winDialog.close();
                                $scope.reloadGridKendali($scope.currentRm);
                            }
                        })
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
            }
            $scope.batal = function(){
                $scope.winDialog.close();
            }
        }]
    )
})