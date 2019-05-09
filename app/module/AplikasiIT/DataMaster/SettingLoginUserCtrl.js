define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SettingLoginUserCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService', 'ModelItem',
        function($q, $rootScope, $scope, IPSRSService, modelItem) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            var init = function() {
                modelItem.get("Ruangan").then(function(data) {
                    var data = data.data;
                    $scope.listSideMenu = data.listSideMenu;
                    $scope.listSideMenu.forEach(function(data) {
                        data.text = data.namaRuangan;
                        data.items = data.listModul;
                        if (data.listModul == undefined) {

                        } else {
                            data.listModul.forEach(function(dat) {
                                dat.text = dat.namaModul
                                dat.items = dat.listObjectModulHead
                                if (dat.listObjectModulHead == undefined) {

                                } else {
                                    dat.listObjectModulHead.forEach(function(dt) {
                                        dt.text = dt.namaObjekModulHead
                                    })
                                }
                            })
                        }

                    });
                    $scope.treeDataMenu = new kendo.data.HierarchicalDataSource({
                        data: $scope.listSideMenu
                    });
                    $scope.mainTreeViewOption = {
                        checkboxes: {
                            checkChildren: true,
                            template: "# if(item.hasChildren){# <input type='checkbox' value='true' />#}#"
                        },
                        dragAndDrop: true
                    }
                    
                });
                /*IPSRSService.getItem("user/get-load-data", true).then(function(dat) {
                    $scope.listKelompokuser = dat.data.data.listKelompokUser;
                    $scope.listPegawai = dat.data.data.listPegawai;
                    $scope.listSideMenu = dat.data.data.listSideMenu;
                    $scope.listSideMenu.forEach(function(data) {
                        data.text = data.namaRuangan;
                        data.items = data.listModul;
                        if (data.listModul == undefined) {

                        } else {
                            data.listModul.forEach(function(dat) {
                                dat.text = dat.namaModul
                                dat.items = dat.listObjectModulHead
                                if (dat.listObjectModulHead == undefined) {

                                } else {
                                    dat.listObjectModulHead.forEach(function(dt) {
                                        dt.text = dt.namaObjekModulHead
                                    })
                                }
                            })
                        }

                    });

                    $scope.treeDataMenu = new kendo.data.HierarchicalDataSource({
                        data: $scope.listSideMenu
                    });
                });*/

                

            }

            IPSRSService.getFieldListData("Ruangan&select=*&criteria=statusEnabled&values=true", true).then(function(dat) {
                $scope.listruangan = dat.data;
            });
            init();
            $scope.columnModulAplikasi = [{
                "field": "kdModulAplikasi",
                "title": "Kode Modul Aplikasi"
            }, {
                "field": "modulAplikasi",
                "title": "Modul Aplikasi"
            }, {
                "field": "reportDisplay",
                "title": "Report Display"
            }, {
                "field": "kodeExternal",
                "title": "Kode External"
            }, {
                "field": "namaExternal",
                "title": "Nama External"
            }, {
                "field": "statusEnabled",
                "title": "Status Enabled"
            }, {
                "title": "Action",
                "width": "200px",
                "template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
                    "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
            }];
            var initModulAplikasi = function() {
                IPSRSService.getFieldListData("ModulAplikasi&select=id,kdModulAplikasi,modulAplikasi,reportDisplay,kodeExternal,namaExternal,statusEnabled,noRec", true).then(function(dat) {
                    $scope.dataModulAplikasi = dat.data;
                    $scope.listModulAplikasi = dat.data;
                    $scope.dataSourceModulAplikasi = new kendo.data.DataSource({
                        data: $scope.dataModulAplikasi,
                        pageSize: 10
                    });
                });
            };
            initModulAplikasi();
            $scope.mainGridOptionsModulAplikasi = {
                pageable: true,
                columns: $scope.columnModulAplikasi,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klikModulAplikasi = function(current) {
                $scope.showEdit = true;
                $scope.current = current;
                
                $scope.item.id = current.id;
                $scope.item.noRec = current.noRec;
                $scope.item.statusEnabled = current.statusEnabled;
                $scope.item.kdModulAplikasi = current.kdModulAplikasi;
                $scope.item.modulAplikasi = current.modulAplikasi;
                $scope.item.reportDisplay = current.reportDisplay;
                $scope.item.kodeExternal = current.kodeExternal;
                $scope.item.namaExternal = current.namaExternal;
                
            };
            $scope.disableData = function() {
                IPSRSService.getClassMaster("delete-master-table?className=ModulAplikasi&&id=" + $scope.item.id + "&&statusEnabled=false").then(function(dat) {
                    // debugger;
                    initModulAplikasi();

                });
            };

            $scope.enableData = function() {
                IPSRSService.getClassMaster("delete-master-table?className=ModulAplikasi&&id=" + $scope.item.id + "&&statusEnabled=true").then(function(dat) {
                    // debugger;
                    initModulAplikasi();

                });
            };
            $scope.tambahModulAplikasi = function() {
                var data = {
                    "class": "ModulAplikasi",
                    "listField": {
                        "kdModulAplikasi": $scope.item.kdModulAplikasi,
                        "modulAplikasi": $scope.item.modulAplikasi,
                        "reportDisplay": $scope.item.reportDisplay,
                        "kodeExternal": $scope.item.kodeExternal,
                        "namaExternal": $scope.item.namaExternal,
                        "iconImage": "",
                        "noUrut": $scope.item.noUrut,
                        "kdModulAplikasiHead": $scope.item.kdModulAplikasiHead.id,
                        "modulIconImage": "",
                        "modulNoUrut": $scope.item.noUrut
                    }
                }
                IPSRSService.saveDataMaster(data, "save-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initModulAplikasi();
                    $scope.item = {};
                });
            }

            $scope.editModulAplikasi = function() {
                var data = {
                    "class": "ModulAplikasi",
                    "listField": {
                        "id": $scope.item.id,
                        "kdModulAplikasi": $scope.item.kdModulAplikasi,
                        "modulAplikasi": $scope.item.modulAplikasi,
                        "reportDisplay": $scope.item.reportDisplay,
                        "kodeExternal": $scope.item.kodeExternal,
                        "namaExternal": $scope.item.namaExternal,
                        "statusEnabled": $scope.item.statusEnabled,
                        "noRec": $scope.item.noRec,
                        "statusEnabled": $scope.item.statusEnabled,
                        "iconImage": "",
                        "noUrut": $scope.item.noUrut,
                        "kdModulAplikasiHead": $scope.item.kdModulAplikasiHead.id,
                        "modulIconImage": "",
                        "modulNoUrut": $scope.item.noUrut
                    }
                }
                IPSRSService.saveDataMaster(data, "update-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initModulAplikasi();
                });
            };
            $scope.batal = function() {
                $scope.showEdit = false;
                $scope.item = {};
            };
            $scope.columnsObjekModulAplikasi = [{
                'field': 'kdObjekModulAplikasi',
                'title': 'Kd Objek Modul Aplikasi'
            }, {
                'field': 'objekModulAplikasi',
                'title': 'Objek Modul Aplikasi'
            }, {
                'field': 'fungsi',
                'title': 'Fungsi'
            }, {
                'field': 'namaExternal',
                'title': 'Nama External'
            }, {
                'field': 'kodeExternal',
                'title': 'Kode External'
            }, {
                'field': 'reportDisplay',
                'title': 'Report Display'
            }, {
                'field': 'keterangan',
                'title': 'Keterangan'
            }, {
                'field': 'noUrut',
                'title': 'No Urut'
            }, {
                'field': 'alamatUrlForm',
                'title': 'Alamat Url Form'
            }, {
                'field': 'statusEnabled',
                'title': 'Status Enabled'
            }, {
                'title': 'Action',
                'width': '200px',
                'template': "<button class='btnEdit' ng-click='enableDataObjekModulAplikasi()' style='margin:0px 0px 10px'>Enable</button>" +
                            "<button class='btnHapus' ng-click='disableDataObjekModulAplikasi()'>Disable</button>"
            }];
            $scope.mainGridOptionsObjekModulAplikasi = {
                pageable: true,
                scrollable: false,
                editable: "popup",
                selectable: "row",
                columns: $scope.columnsObjekModulAplikasi
            };
            var initObjekModulAplikasi = function() {
                IPSRSService.getFieldListData("ObjekModulAplikasi&select=id,fungsi,keterangan,namaExternal,kodeExternal,statusEnabled,reportDisplay,kdObjekModulAplikasi,objekModulAplikasi,noUrut,kdObjekModulAplikasiHead,alamatUrlForm,noRec,statusEnabled", true).then(function(dat) {
                    $scope.dataObjekModulAplikasi = dat.data;
                    
                    $scope.listjenisObjekModul = dat.data;
                    $scope.listobjekModulAplikasiHead = dat.data;
                    //debugger;
                    $scope.dataSourceObjekModulAplikasi = new kendo.data.DataSource({
                        data: $scope.dataObjekModulAplikasi,
                        pageSize: 10
                    });
                });
            };
            initObjekModulAplikasi();
            $scope.klikObjekModulAplikasi = function(current) {
                $scope.showEdit = true;
                $scope.current = current;
                $scope.item.id = current.id;
                $scope.item.noRec = current.noRec;
                $scope.item.fungsiObjekModulAplikasi = current.fungsi;
                $scope.item.keteranganObjekModulAplikasi = current.keterangan;
                $scope.item.namaExternalObjekModulAplikasi = current.namaExternal;
                $scope.item.kodeExternalObjekModulAplikasi = current.kodeExternal;
                $scope.item.reportDisplayObjekModulAplikasi = current.reportDisplay;
                $scope.item.statusEnabled = current.statusEnabled;
                $scope.item.noUrutObjekModulAplikasi = current.noUrut;
                $scope.item.alamatUrlFormObjekModulAplikasi = current.alamatUrlForm;
                $scope.item.jenisObjekModulAplikasi = {
                    id: current.kdObjekModulAplikasi,
                    objekModulAplikasi: current.objekModulAplikasi
                };
                //debugger;
                IPSRSService.getFieldListData("ObjekModulAplikasi&select=id,objekModulAplikasi&criteria=id&values=" + current.kdObjekModulAplikasiHead).then(function(dat){
                    //var data=dat;
                    //debugger;
                    $scope.item.objekModulAplikasiHead = {
                        id: dat.data[0].id,
                        objekModulAplikasi: dat.data[0].objekModulAplikasi
                    };
                    //debugger;
                });
                //debugger;
            };
            $scope.enableDataObjekModulAplikasi = function() {
                IPSRSService.getClassMaster("delete-master-table?className=ObjekModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
                    initObjekModulAplikasi();
                });
            };
            $scope.disableDataObjekModulAplikasi = function() {
                IPSRSService.getClassMaster("delete-master-table?className=ObjekModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
                    initObjekModulAplikasi();
                });
            };
            $scope.tambahDataObjekModulAplikasi = function() {
                var data = {
                    "class": "ObjekModulAplikasi",
                    "listField": {
                        "namaExternal": $scope.item.namaExternalObjekModulAplikasi,
                        "kodeExternal": $scope.item.kodeExternalObjekModulAplikasi,
                        "reportDisplay": $scope.item.reportDisplayObjekModulAplikasi,
                        "objekModulAplikasi": $scope.item.jenisObjekModulAplikasi.objekModulAplikasi,
                        "keterangan": $scope.item.keteranganObjekModulAplikasi,
                        "fungsi": $scope.item.fungsiObjekModulAplikasi,
                        "noUrut": $scope.item.noUrutObjekModulAplikasi,
                        "alamatUrlForm": $scope.item.alamatUrlFormObjekModulAplikasi,
                        "kdObjekModulAplikasi": $scope.item.jenisObjekModulAplikasi.id,
                        "kdObjekModulAplikasiHead": $scope.item.objekModulAplikasiHead.id 
                    }
                }
                //debugger;
                IPSRSService.saveDataMaster(data, "save-master-table").then(function(e){
                    console.log(JSON.stringify(e.data));
                    initObjekModulAplikasi();
                    $scope.item = {};
                });
            };
            $scope.editDataObjekModulAplikasi = function() {
                var data = {
                    "class": "ObjekModulAplikasi",
                    "listField": {
                        "namaExternal": $scope.item.namaExternalObjekModulAplikasi,
                        "kodeExternal": $scope.item.kodeExternalObjekModulAplikasi,
                        "reportDisplay": $scope.item.reportDisplayObjekModulAplikasi,
                        "objekModulAplikasi": $scope.item.jenisObjekModulAplikasi.objekModulAplikasi,
                        "keterangan": $scope.item.keteranganObjekModulAplikasi,
                        "fungsi": $scope.item.fungsiObjekModulAplikasi,
                        "noUrut": $scope.item.noUrutObjekModulAplikasi,
                        "alamatUrlForm": $scope.item.alamatUrlFormObjekModulAplikasi,
                        "kdObjekModulAplikasi": $scope.item.jenisObjekModulAplikasi.id,
                        "kdObjekModulAplikasiHead": $scope.item.objekModulAplikasiHead.id,
                        "id": $scope.item.id,
                        "noRec": $scope.item.noRec,
                        "statusEnabled": $scope.item.statusEnabled
                    }
                };
                IPSRSService.saveDataMaster(data, "update-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initObjekModulAplikasi();
                    $scope.item = {};
                });
            };
            $scope.columnsKelompokUser = [{
                'field': 'kdKelompokUser',
                'title': 'Kode Kelompok User'
            }, {
                'field': 'kelompokUser',
                'title': 'Kelompok User'
            }, {
                'field': 'reportDisplay',
                'title': 'Report Display'
            }, {
                'field': 'namaExternal',
                'title': 'Nama External'
            }, {
                'field': 'kodeExternal',
                'title': 'Kode External'
            }, {
                'field': 'statusEnabled',
                'title': 'Status Enabled'
            }, {
                'title': 'Action',
                'width': '200px',
                'template': "<button class='btnEdit' ng-click='enableDataKelompokUser()'>Enable</button>" +
                            "<button class='btnHapus' ng-click='disableDataKelompokUser()'>Disable</button>"
            }];
            $scope.mainGridOptionsKelompokUser = {
                pageable: true,
                scrollable: false,
                selectable: "row",
                editable: "popup",
                columns: $scope.columnsKelompokUser
            };
            $scope.klikKelompokUser = function(current) {
                $scope.showEdit = true;
                $scope.current = current;
                $scope.item.id = current.id;
                $scope.item.noRec = current.noRec;
                $scope.item.kdKelompokUser = current.kdKelompokUser;
                $scope.item.kelompokUser = current.kelompokUser;
                $scope.item.reportDisplayKelompokUser = current.reportDisplay;
                $scope.item.namaExternalKelompokUser = current.namaExternal;
                $scope.item.kodeExternalKelompokUser = current.kodeExternal;
                $scope.item.statusEnabled = current.statusEnabled;
            };
            var initKelompokUser = function() {
                IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokUser", true).then(function(dat) {
                    $scope.dataKelompokUser = dat.data.data.KelompokUser;
                    $scope.dataSourceKelompokUser = new kendo.data.DataSource({
                        data: $scope.dataKelompokUser,
                        pageSize: 10
                    });
                });
            };
            $scope.enableDataKelompokUser = function() {
                IPSRSService.getClassMaster("delete-master-table?className=KelompokUser&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
                    initKelompokUser();

                });
            };
            $scope.disableDataKelompokUser = function() {
                IPSRSService.getClassMaster("delete-master-table?className=KelompokUser&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat) {
                    initKelompokUser();
                });
            };
            $scope.tambahDataKelompokUser = function() {
                var data = {
                    "class": "KelompokUser",
                    "listField": {
                        "kdKelompokUser": $scope.item.kdKelompokUser,
                        "kelompokUser": $scope.item.kelompokUser,
                        "reportDisplay": $scope.item.reportDisplayKelompokUser,
                        "kodeExternal": $scope.item.kodeExternalKelompokUser,
                        "namaExternal": $scope.item.namaExternalKelompokUser
                    } 
                }
                IPSRSService.saveDataMaster(data, "save-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initKelompokUser();
                    $scope.item = {};
                });
            };
            $scope.editDataKelompokUser = function() {
                var data = {
                    "class": "KelompokUser",
                    "listField": {
                        "id": $scope.item.id,
                        "noRec": $scope.item.noRec,
                        "kdKelompokUser": $scope.item.kdKelompokUser,
                        "kelompokUser": $scope.item.kelompokUser,
                        "namaExternal": $scope.item.namaExternalKelompokUser,
                        "reportDisplay": $scope.item.reportDisplayKelompokUser,
                        "kodeExternal": $scope.item.kodeExternalKelompokUser
                    } 
                }
                IPSRSService.saveDataMaster(data, "update-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initKelompokUser();
                    $scope.item = {};
                });
            };
            initKelompokUser();
            $scope.columnsMapKelompokUser = [{
                'field': 'kelompokUserId',
                'title': 'Kelompok User ID'
            }, {
                'field': 'kelompokUser',
                'title': 'Kelompok User'
            }, {
                'field': 'objekModulAplikasiId',
                'title': 'Objek Modul Aplikasi ID'
            }, {
                'field': 'objekModulAplikasi',
                'title': 'Objek Modul Aplikasi'
            }, {
                'field': 'reportDisplay',
                'title': 'Report Display'
            }, {
                'field': 'kodeExternal',
                'title': 'Kode External'
            }, {
                'field': 'namaExternal',
                'title': 'Nama External'
            }, {
                'field': 'simpan',
                'title': 'Simpan'
            }, {
                'field': 'cetak',
                'title': 'Cetak'
            }, {
                'field': 'hapus',
                'title': 'Hapus'
            }, {
                'field': 'edit',
                'title': 'Edit'
            }, {
                'field': 'statusEnabled',
                'title': 'Status Enabled'
            }, {
                'title': 'Action',
                'width': '200px',
                'template': "<button class='btnEdit' ng-click='enableDataMapKelompokUser()' style='margin: 0px 0px 10px'>Enable</button>" +
                            "<button class='btnHapus' ng-click='disableDataMapKelompokUser()' style='margin: 0px 0px 10px'>Disable</button>"
            }];
            $scope.mainGridOptionsMapKelompokUser = {
                pageable: true,
                scrollable: false,
                editable: "popup",
                selectable: "row",
                columns: $scope.columnsMapKelompokUser
            };
            var initMapKelompokUser = function() {
                var mapKelompokUser = [];
                var kelompokUser = [];
                var objekModulAplikasi = [];
                var kelompokUserS = "";
                var objekModulAplikasiS = "";
                var dataMapKelompokUser = []; 
                $q.all([
                    IPSRSService.getFieldListData("MapObjekModulToKelompokUser&select=id,kelompokUserId,objekModulAplikasiId,reportDisplay,namaExternal,kodeExternal,cetak,simpan,hapus,edit,statusEnabled,noRec", true),
                    IPSRSService.getFieldListData("KelompokUser&select=id,kelompokUser", true),
                    IPSRSService.getFieldListData("ObjekModulAplikasi&select=id,objekModulAplikasi", true)
                ]).then(function(data) {
                    mapKelompokUser = data[0].data;
                    kelompokUser = data[1].data;
                    objekModulAplikasi = data[2].data;
                    //debugger;
                    for (var i = 0; i < mapKelompokUser.length; i++) {
                        for (var j = 0; j < kelompokUser.length; j++) {
                            if (mapKelompokUser[i].kelompokUserId == kelompokUser[j].id) {
                                kelompokUserS = kelompokUser[j].kelompokUser
                            }
                        }
                        for (var k = 0; k < objekModulAplikasi.length; k++) {
                            if (mapKelompokUser[i].objekModulAplikasiId == objekModulAplikasi[k].id) {
                                objekModulAplikasiS = objekModulAplikasi[k].objekModulAplikasi
                            }
                        }
                        var daftar = {
                            kelompokUserId: mapKelompokUser[i].kelompokUserId,
                            kelompokUser: kelompokUserS,
                            objekModulAplikasiId: mapKelompokUser[i].objekModulAplikasiId,
                            objekModulAplikasi: objekModulAplikasiS,
                            reportDisplay: mapKelompokUser[i].reportDisplay,
                            kodeExternal: mapKelompokUser[i].kodeExternal,
                            namaExternal: mapKelompokUser[i].namaExternal,
                            statusEnabled: mapKelompokUser[i].statusEnabled,
                            noRec: mapKelompokUser[i].noRec,
                            simpan: mapKelompokUser[i].simpan,
                            hapus: mapKelompokUser[i].hapus,
                            edit: mapKelompokUser[i].edit,
                            cetak: mapKelompokUser[i].cetak
                        }
                        dataMapKelompokUser.push(daftar);
                    }
                    $scope.listkelompokUser = kelompokUser;
                    $scope.listobjekModulAplikasi = objekModulAplikasi;
                    $scope.dataSourceMapKelompokUser = new kendo.data.DataSource({
                        data: dataMapKelompokUser,
                        pageSize: 10
                    });
                });
            };
            $scope.item.simpan = false;
            $scope.item.edit = false;
            $scope.item.hapus = false;
            $scope.item.cetak = false;
            $scope.checkAll = function(data) {
                var data = data;
                if (data == true) {
                    //$('#check2 input[type=checkbox]').prop('checked', true);
                    $scope.item.simpan = true;
                    $scope.item.hapus = true;
                    $scope.item.edit = true;
                    $scope.item.cetak = true;
                }
                else {
                    //$('#check2 input[type=checkbox]').prop('checked', false);
                    $scope.item.simpan = false;
                    $scope.item.hapus = false;
                    $scope.item.edit = false;
                    $scope.item.cetak = false;
                }
            };
            
            $scope.clickSimpan = function(data) {
                $scope.item.simpan = data;
            };
            $scope.clickEdit = function(data) {
                $scope.item.edit = data;
            };
            $scope.clickHapus = function(data) {
                $scope.item.hapus = data;
            };
            $scope.clickCetak = function(data) {
                $scope.item.cetak = data;
            };
            $scope.klikMapKelompokUser = function(current) {
                $scope.showEdit = true;
                $scope.current = current;
                $scope.item.id = current.id;
                $scope.item.noRec = current.noRec;
                $scope.item.statusEnabled = current.statusEnabled;
                $scope.item.reportDisplayMapKelompokUser = current.reportDisplay;
                $scope.item.kodeExternalMapKelompokUser = current.kodeExternal;
                $scope.item.namaExternalMapKelompokUser = current.namaExternal;
                $scope.item.simpan = current.simpan;
                $scope.item.hapus = current.hapus;
                $scope.item.edit = current.edit;
                $scope.item.cetak = current.cetak;
                $scope.item.mapKelompokUser = {
                    id: current.kelompokUserId,
                    kelompokUser: current.kelompokUser
                };
                $scope.item.objekModulAplikasiMapUser = {
                    id: current.objekModulAplikasiId,
                    objekModulAplikasi: current.objekModulAplikasi
                }
            };
            
            initMapKelompokUser();
            $scope.enableDataMapKelompokUser = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapObjekModulToKelompokUser&&id="+$scope.item.id+"&&statusEnabled=true").then(function(data) {
                    initMapKelompokUser();
                });
            };
            $scope.disableDataMapKelompokUser = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapObjekModulToKelompokUser&&id="+$scope.item.id+"&&statusEnabled=false").then(function(data) {
                    initMapKelompokUser();
                });
            };
            $scope.tambahDataMapKelompokUser = function() {
                var data = {
                    "class": "MapObjekModulToKelompokUser",
                    "listField": {
                        "kelompokUser": $scope.item.mapKelompokUser,
                        "objekModulAplikasi": $scope.item.objekModulAplikasiMapUser,
                        "reportDisplay": $scope.item.reportDisplayMapKelompokUser,
                        "kodeExternal": $scope.item.kodeExternalMapKelompokUser,
                        "namaExternal": $scope.item.namaExternalMapKelompokUser,
                        "simpan": $scope.item.simpan,
                        "hapus": $scope.item.hapus,
                        "edit": $scope.item.edit,
                        "cetak": $scope.item.cetak     
                    }
                }
                IPSRSService.saveDataMaster(data, "save-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initMapKelompokUser();
                    $scope.item = {};
                });
            };
            $scope.editDataMapKelompokUser = function() {
                var data = {
                    "class": "MapObjekModulToKelompokUser",
                    "listField": {
                        "kelompokUser": $scope.item.mapKelompokUser,
                        "objekModulAplikasi": $scope.item.objekModulAplikasiMapUser,
                        "reportDisplay": $scope.item.reportDisplayMapKelompokUser,
                        "kodeExternal": $scope.item.kodeExternalMapKelompokUser,
                        "namaExternal": $scope.item.namaExternalMapKelompokUser,
                        "simpan": $scope.item.simpan,
                        "hapus": $scope.item.hapus,
                        "edit": $scope.item.edit,
                        "cetak": $scope.item.cetak,
                        "id": $scope.item.id,
                        "noRec": $scope.item.noRec     
                    }
                }
                IPSRSService.saveDataMaster(data, "update-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initMapKelompokUser();
                    $scope.item = {};
                });
            };
            $scope.columnMapModulAplikasi = [{
                'field': 'modulAplikasiId',
                'title': 'Modul Aplikasi ID'
            }, {
                'field': 'modulAplikasi',
                'title': 'Modul Aplikasi'
            }, {
                'field': 'pegawaiId',
                'title': 'Pegawai ID'
            }, {
                'field': 'pegawai',
                'title': 'Pegawai'
            }, {
                'field': 'reportDisplay',
                'title': 'Report Display'
            }, {
                'field': 'namaExternal',
                'title': 'Nama External'
            }, {
                'field': 'kodeExternal',
                'title': 'Kode External'
            }, {
                'field': 'statusEnabled',
                'title': 'Status Enabled'
            }, {
                'title': 'Action',
                'width': '200px',
                'template': "<button class='btnEdit' ng-click='enableDataMapPegawai()'>Enable</button>" +
                            "<button class='btnHapus' ng-click='disableDataMapPegawai()'>Disable</button>"
            }];
            $scope.mainGridOptionsMapModulAplikasi = {
                pageable: true,
                scrollable: false,
                selectable: "row",
                editable: "popup",
                columns: $scope.columnMapModulAplikasi
            };
            var initMapPegawai = function() {
                var mapPegawai = [];
                var dataPegawai = [];
                var dataModulAplikasi = [];
                var dataPegawaiS = "";
                var modulAplikasiS = "";
                var dataMapPegawai = [];
                $q.all([
                    IPSRSService.getFieldListData("ModulAplikasi&select=id,modulAplikasi", true),
                    IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true),
                    IPSRSService.getFieldListData("MapPegawaiToModulAplikasi&select=id,modulAplikasiId,pegawaiId,reportDisplay,kodeExternal,namaExternal,statusEnabled,noRec", true)
                ]).then(function(data) {
                    dataModulAplikasi = data[0].data;
                    dataPegawai = data[1].data;
                    mapPegawai = data[2].data;
                    $scope.listmodulAplikasi = dataModulAplikasi;
                    $scope.listpegawai = dataPegawai;
                    for (var i = 0; i < mapPegawai.length; i++) {
                        for (var j = 0; j < dataPegawai.length; j++) {
                            if (mapPegawai[i].pegawaiId == dataPegawai[j].id) {
                                dataPegawaiS = dataPegawai[j].namaExternal
                            }
                        }
                        for (var k = 0; k < dataModulAplikasi.length; k++) {
                            if (mapPegawai[i].modulAplikasiId == dataModulAplikasi[k].id) {
                                modulAplikasiS = dataModulAplikasi[k].modulAplikasi
                            }
                        }
                        var daftar = {
                            modulAplikasiId: mapPegawai[i].modulAplikasiId,
                            modulAplikasi: modulAplikasiS,
                            pegawaiId: mapPegawai[i].pegawaiId,
                            pegawai: dataPegawaiS,
                            reportDisplay: mapPegawai[i].reportDisplay,
                            kodeExternal: mapPegawai[i].kodeExternal,
                            namaExternal: mapPegawai[i].namaExternal,
                            statusEnabled: mapPegawai[i].statusEnabled,
                            id: mapPegawai[i].id,
                            noRec: mapPegawai[i].noRec
                        }
                        dataMapPegawai.push(daftar);
                    }
                    $scope.dataSourceMapModulAplikasi = new kendo.data.DataSource({
                        data: dataMapPegawai,
                        pageSize: 10
                    });
                    //debugger;
                });
            };
            initMapPegawai();
            $scope.klikMapModulAplikasi = function(current) {
                $scope.showEdit = true;
                $scope.current = current;
                $scope.item.id = current.id;
                $scope.item.noRec = current.noRec;
                $scope.item.reportDisplayMapPegawai = current.reportDisplay;
                $scope.item.kodeExternalMapPegawai = current.kodeExternal;
                $scope.item.namaExternalMapPegawai = current.namaExternal;
                $scope.item.mapPegawaiModulAplikasi = {
                    id: current.modulAplikasiId,
                    modulAplikasi: current.modulAplikasi
                };
                $scope.item.mapPegawai = {
                    id: current.pegawaiId,
                    namaExternal: current.pegawai
                }
            };
            $scope.enableDataMapPegawai = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapPegawaiToModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(data) {
                    initMapPegawai();
                });
            };
            $scope.disableDataMapPegawai = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapPegawaiToModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(data) {
                    initMapPegawai();
                });
            };
            $scope.tambahDataMapPegawai = function() {
                    var data = {
                        "class": "MapPegawaiToModulAplikasi",
                        "listField": {
                            "modulAplikasi": {
                                "id": $scope.item.mapPegawai.id 
                            },
                            "pegawai": {
                                "id": $scope.item.mapPegawaiModulAplikasi.id 
                            },
                            "reportDisplay": $scope.item.reportDisplayMapPegawai,
                            "kodeExternal": $scope.item.kodeExternalMapPegawai,
                            "namaExternal": $scope.item.namaExternalMapPegawai
                        }
                    };
                IPSRSService.saveDataMaster(data, "save-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initMapPegawai();
                    $scope.item = {};
                });
            };
            $scope.editDataMapPegawai = function() {
                var data = {
                    "class": "MapPegawaiToModulAplikasi",
                    "listField": {
                        "modulAplikasi": {
                            "id": $scope.item.mapPegawai.id 
                        },
                        "pegawai":{
                            "id": $scope.item.mapPegawaiModulAplikasi.id 
                        },
                        "reportDisplay": $scope.item.reportDisplayMapPegawai,
                        "kodeExternal": $scope.item.kodeExternalMapPegawai,
                        "namaExternal": $scope.item.namaExternalMapPegawai,
                        "id": $scope.item.id,
                        "noRec": $scope.item.noRec,
                        "statusEnabled": $scope.item.statusEnabled
                    }
                };
                IPSRSService.saveDataMaster(data, "update-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initMapPegawai();
                    $scope.item = {};
                });
            };
            $scope.columnsMapLoginUser = [{
                'field': 'loginUserId',
                'title': 'Login User ID'
            }, {
                'field': 'loginUser',
                'title': 'Login User'
            }, {
                'field': 'ruanganId',
                'title': 'Ruangan ID'
            }, {
                'field': 'ruangan',
                'title': 'Ruangan'
            }, {
                'field': 'reportDisplay',
                'title': 'Report Display'
            }, {
                'field': 'kodeExternal',
                'title': 'Kode External'
            }, {
                'field': 'namaExternal',
                'title': 'Nama External'
            }, {
                'field': 'statusEnabled',
                'title': 'Status Enabled'
            }, {
                'title': 'Action',
                'width': '200px',
                'template': "<button class='btnEdit' ng-click='enableDataMapLoginUser()'>Enable</button>" +
                            "<button class='btnHapus' ng-click='disableDataMapLoginUser()'>Disable</button>"
            }];
            $scope.mainGridOptionsMapLoginUser = {
                pageable: true,
                scrollable: false,
                selectable: "row",
                editable: "popup",
                columns: $scope.columnsMapLoginUser
            }; 
            var initMapLoginUser = function() {
                var mapLoginUser = [];
                var loginUser = [];
                var ruangan = [];
                var userS = "";
                var ruanganS = "";
                var dataMapLoginUser = [];
                $q.all([
                    IPSRSService.getFieldListData("MapLoginUserToRuangan&select=id,loginUserId,kodeExternal,ruanganId,namaExternal,reportDisplay,noRec,statusEnabled", true),
                    IPSRSService.getFieldListData("LoginUser&select=id,namaUser", true),
                    IPSRSService.getFieldListData("Ruangan&select=id,namaRuangan", true)
                ]).then(function(data) {
                    mapLoginUser = data[0].data;
                    loginUser = data[1].data;
                    ruangan = data[2].data;
                    $scope.listloginUser = loginUser;
                    $scope.listruangan = ruangan;
                    for (var i = 0; i < mapLoginUser.length; i++) {
                        for (var j = 0; j < loginUser.length; j++) {
                            if (mapLoginUser[i].loginUserId == loginUser[j].id) {
                                userS = loginUser[j].namaUser
                            }
                        }
                        for (var k = 0; k < ruangan.length; k++) {
                            if (mapLoginUser[i].ruanganId == ruangan[k].id) {
                                ruanganS = ruangan[k].namaRuangan
                            }
                        }
                        var daftar = {
                            loginUserId: mapLoginUser[i].loginUserId,
                            loginUser: userS,
                            ruanganId: mapLoginUser[i].ruanganId,
                            ruangan: ruanganS,
                            kodeExternal: mapLoginUser[i].kodeExternal,
                            namaExternal: mapLoginUser[i].namaExternal,
                            reportDisplay: mapLoginUser[i].reportDisplay,
                            noRec: mapLoginUser[i].noRec,
                            statusEnabled: mapLoginUser[i].statusEnabled,
                            id: mapLoginUser[i].id
                        }
                        dataMapLoginUser.push(daftar);
                    }
                    $scope.dataSourceMapLoginUser = new kendo.data.DataSource({
                        data: dataMapLoginUser,
                        pageSize: 10
                    });
                });
            };
            initMapLoginUser();
            $scope.klikMapLoginUser = function(current) {
                $scope.showEdit = true;
                $scope.current = current;
                $scope.item.id = current.id;
                $scope.item.noRec = current.noRec;
                $scope.item.statusEnabled = current.statusEnabled;
                $scope.item.reportDisplayMapLogin = current.reportDisplay;
                $scope.item.kodeExternalMapLogin = current.kodeExternal;
                $scope.item.namaExternalMapLogin = current.namaExternal;
                $scope.item.mapLoginUser =  {
                    id: current.loginUserId,
                    namaUser: current.loginUser
                };
                $scope.item.ruanganMapLoginUser = {
                    id: current.ruanganId,
                    namaRuangan: current.ruangan
                }
            };
            $scope.enableDataMapLoginUser = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapLoginUserToRuangan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(data) {
                    initMapLoginUser();
                });
            };
            $scope.disableDataMapLoginUser = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapLoginUserToRuangan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(data) {
                    initMapLoginUser();
                });
            };
            $scope.tambahDataMapLoginUser = function() {
                var data = {
                    "class": "MapLoginUserToRuangan",
                    "listField": {
                        "loginUser":{
                            "id": $scope.item.mapLoginUser.id
                        },
                        "ruangan":{
                            "id": $scope.item.ruanganMapLoginUser.id
                        },
                        "namaExternal": $scope.item.namaExternalMapLogin,
                        "kodeExternal": $scope.item.kodeExternalMapLogin,
                        "reportDisplay": $scope.item.reportDisplayMapLogin
                    }
                }
                IPSRSService.saveDataMaster(data, "save-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initMapLoginUser();
                    $scope.item = {};
                });
            };
            $scope.editDataMapLoginUser = function() {
                var data = {
                    "class": "MapLoginUserToRuangan",
                    "listField": {
                        "loginUser":{
                            "id": $scope.item.mapLoginUser.id
                        },
                        "ruangan":{
                            "id": $scope.item.ruanganMapLoginUser.id
                        },
                        "namaExternal": $scope.item.namaExternalMapLogin,
                        "kodeExternal": $scope.item.kodeExternalMapLogin,
                        "reportDisplay": $scope.item.reportDisplayMapLogin,
                        "id": $scope.item.id,
                        "noRec": $scope.item.noRec,
                        "statusEnabled": $scope.item.statusEnabled
                    }
                }
                IPSRSService.saveDataMaster(data, "update-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initMapLoginUser();
                    $scope.item = {};
                });
            };
            $scope.columnMapObjek = [{
                'field': 'departemenId',
                'title': 'Departemen ID'
            },{
                'field': 'departemen',
                'title': 'Departemen'
            }, {
                'field': 'objekModulAplikasiId',
                'title': 'Objek Modul Aplikasi ID'
            }, {
                'field': 'objekModulAplikasi',
                'title': 'Objek Modul Aplikasi'
            }, {
                'field': 'reportDisplay',
                'title': 'Report Display'
            }, {
                'field': 'namaExternal',
                'title': 'Nama External'
            }, {
                'field': 'kodeExternal',
                'title': 'Kode External'
            }, {
                'field': 'statusEnabled',
                'title': 'Status Enabled'
            }, {
                'title': 'Action',
                'width': '200px',
                'template': "<button class='btnEdit' ng-click='enableDataMapObjek()'>Enable</button>" +
                            "<button class='btnHapus' ng-click='disableDataMapObjek()'>Disable</button>"
            }];
            $scope.mainGridOptionsMapObjek = {
                pageable: true,
                scrollable: false,
                selectable: "row",
                editable: "popup",
                columns: $scope.columnMapObjek
            };
            var initMapObjek = function() {
                var mapObjek = [];
                var departemen = [];
                var objekModulAplikasi = [];
                var departemenS = "";
                var objekModulAplikasiS = "";
                var dataMapObjek = [];
                $q.all([
                    IPSRSService.getFieldListData("MapObjekModulToDepartemen&select=id,departemenId,namaExternal,objekModulAplikasiId,reportDisplay,namaExternal,kodeExternal,statusEnabled,noRec", true),
                    IPSRSService.getFieldListData("Departemen&select=id,namaDepartemen", true),
                    IPSRSService.getFieldListData("ObjekModulAplikasi&select=id,objekModulAplikasi", true)
                ]).then(function(data) {
                    mapObjek = data[0].data;
                    departemen = data[1].data;
                    objekModulAplikasi = data[2].data;
                    $scope.listdepartemen = departemen;
                    $scope.listobjekModulAplikasi = objekModulAplikasi;
                    for (var i = 0; i < mapObjek.length; i++) {
                        for (var j = 0; j < departemen.length; j++) {
                            if (mapObjek[i].departemenId == departemen[j].id) {
                                departemenS = departemen[j].namaDepartemen
                            }
                        }
                        for (var k = 0; k < objekModulAplikasi.length; k++) {
                            if (mapObjek[i].objekModulAplikasiId == objekModulAplikasi[k].id) {
                                objekModulAplikasiS = objekModulAplikasi[k].objekModulAplikasi
                            }
                        }
                        var daftar = {
                            departemenId: mapObjek[i].departemenId,
                            departemen: departemenS,
                            objekModulAplikasiId: mapObjek[i].objekModulAplikasiId,
                            objekModulAplikasi: objekModulAplikasiS,
                            namaExternal: mapObjek[i].namaExternal,
                            kodeExternal: mapObjek[i].kodeExternal,
                            reportDisplay: mapObjek[i].reportDisplay,
                            id: mapObjek[i].id,
                            noRec: mapObjek[i].noRec,
                            statusEnabled: mapObjek[i].statusEnabled 
                        }
                        dataMapObjek.push(daftar);
                    }
                    $scope.dataSourceMapObjek = new kendo.data.DataSource({
                        data: dataMapObjek,
                        pageSize: 10
                    })
                });
            };
            initMapObjek();
            $scope.klikMapObjek = function(current) {
                $scope.showEdit = true;
                $scope.current = current;
                $scope.item.id = current.id;
                $scope.item.noRec = current.noRec;
                $scope.item.statusEnabled = current.statusEnabled;
                $scope.item.reportDisplayMapObjek = current.reportDisplay;
                $scope.item.kodeExternalMapObjek = current.kodeExternal;
                $scope.item.namaExternalMapObjek = current.namaExternal;
                $scope.item.departemenMapObjek = {
                    id: current.departemenId,
                    namaDepartemen: current.departemen
                };
                $scope.item.mapObjekDepartemen = {
                    id: current.objekModulAplikasiId,
                    objekModulAplikasi: current.objekModulAplikasi
                }
            };
            $scope.enableDataMapObjek = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapObjekModulToDepartemen&&id="+$scope.item.id+"&&statusEnabled=true").then(function(data) {
                    initMapObjek();
                });
            };
            $scope.disableDataMapObjek = function() {
                IPSRSService.getClassMaster("delete-master-table?className=MapObjekModulToDepartemen&&id="+$scope.item.id+"&&statusEnabled=false").then(function(data) {
                    initMapObjek();
                });
            };
            $scope.tambahDataMapObjek = function() {
                var data = {
                    "class": "MapObjekModulToDepartemen",
                    "listField": {
                            "departemen": {
                                "id": $scope.item.departemenMapObjek.id
                            },
                            "objekModulAplikasi": {
                                "id": $scope.item.mapObjekDepartemen.id
                            },
                            "reportDisplay": $scope.item.reportDisplayMapObjek,
                            "kodeExternal": $scope.item.kodeExternalMapObjek,
                            "namaExternal": $scope.item.namaExternalMapObjek
                    }
                }
                IPSRSService.saveDataMaster(data, "save-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initMapObjek();
                    $scope.item = {};
                });
            };
            $scope.editDataMapObjek = function() {
                var data = {
                    "class": "MapObjekModulToDepartemen",
                    "listField": {
                            "departemen": {
                                "id": $scope.item.departemenMapObjek.id
                            },
                            "objekModulAplikasi": {
                                "id": $scope.item.mapObjekDepartemen.id
                            },
                            "reportDisplay": $scope.item.reportDisplayMapObjek,
                            "kodeExternal": $scope.item.kodeExternalMapObjek,
                            "namaExternal": $scope.item.namaExternalMapObjek,
                            "id": $scope.item.id,
                            "noRec": $scope.item.noRec,
                            "statusEnabled": $scope.item.statusEnabled
                    }
                }
                IPSRSService.saveDataMaster(data, "update-master-table").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    initMapObjek();
                    $scope.item = {};
                });
            };
            IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokUser", true).then(function(dat) {
                $scope.listKelompokuser = dat.data.data.KelompokUser;
            });
            IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat) {
                $scope.listPegawai = dat.data;
            });
            $scope.getDataUser = function(data) {
                var data = data;
                IPSRSService.getFieldListData("LoginUser&select=*&criteria=pegawaiId&values=" + data.id, true).then(function(dat) {
                    if (dat === undefined) {
                        $scope.item.namaUser = "";
                        $scope.item.kataKunciPass = "";
                        $scope.item.kataKunciConfirm = "";
                        $scope.item.kelompokUserHakAkses = "";
                    }
                    else {
                        $scope.item.namaUser = dat.data[0].namaUser;
                        $scope.item.kataKunciPass = "admin";
                        $scope.item.kataKunciConfirm = "admin";
                        var kelompokUserId = dat.data[0].kelompokUserId;
                        IPSRSService.getFieldListData("KelompokUser&select=id,kelompokUser&criteria=id&values=" + kelompokUserId, true).then(function(dat) {
                            $scope.item.kelompokUserHakAkses = {
                                id: dat.data[0].id,
                                kelompokUser: dat.data[0].kelompokUser
                            };
                        });
                    }
                });
            };
            $scope.saveTreeFields = function() {
                var node;
                var nodee;
                var checkedNodes = [];
                var checkModul = [];
                var nodes = $scope.treeDataMenu.view();
                //debugger;
                for (var i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                    if (node.dirty == true) {
                        checkedNodes.push({
                            "ruangan": {
                                "id": node.ruanganId
                            }
                        });
                        if (node.hasChildren == true) {
                            for (var j = 0; j < node.items.length; j++) {
                                nodee = node.items[j];
                                if (nodee.checked) {
                                    checkModul.push({
                                        "modulAplikasi": {
                                            "id": nodee.id
                                        },
                                        "pegawai": {
                                            "id": $scope.item.namaPegawai.id
                                        }
                                    })
                                }
                            }
                        }
                    }
                }
                console.log(JSON.stringify(checkedNodes));
                console.log(JSON.stringify(checkModul));
                var data = {
                    "kelompokUser": {
                        "id": $scope.item.kelompokUserHakAkses.id
                    },
                    "statusLogin": 0,
                    "kataSandi": $scope.item.kataKunciPass,
                    "namaUser": $scope.item.namaUser,
                    "namaExternal": $scope.item.namaUser,
                    "reportDisplay": $scope.item.namaUser,
                    "kodeExternal": $scope.item.kelompokUserHakAkses.id,
                    "pegawai": {
                        "id": $scope.item.namaPegawai.id
                    },
                    "mapLoginUserToRuanganSet": checkedNodes,
                    "mapPegawaiToModulAplikasiSet": checkModul
                }
                IPSRSService.saveDataSarPras(data, "user/save-login-user").then(function(e) {
                    console.log(JSON.stringify(e.data));
                    $scope.item = {};
                });
            }

        }
    ]);
});
