define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InputTindakanRevCtrl', ['ManagePasien', 'socket', '$parse', '$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', 'ManageServicePhp',
        function(managePasien, socket, $parse, $state, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r, manageServicePhp ) {
            $scope.model = { tglPelayanan: new Date() };
            $scope.items = [];
            $scope.temp = [];
            $scope.dataModelGrid = [];
            $scope.no = 1;
            $scope.isHeader = true;
            $scope.item= {};
            
            $scope.listYaTidak = [
                {"id": 1, "name":"Ya"},
                {"id": 0, "name":"Tidak"}
            ]
            $scope.listIdPetugas = [10, 12, 13, 14]
            $scope.model.statusCito=[{"id":0,"name":"tidak"}];

            $scope.isInArray = function(value, array){
                return array.indexOf(value) > -1;
            }
            function getGenericPegawai(input, output){
                var selectedData = $parse(output);
                selectedData.assign($scope, []);
                var model = $parse(input);
                findPasien.getListData("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function(dat){
                    $scope.listPegawai = new kendo.data.DataSource({
                        data: dat.data
                    });
                    model.assign($scope, $scope.listPegawai);
                });
            }
            function getPegawaiById(id, input, output){
                var selectedData = $parse(output);
                selectedData.assign($scope, []);
                var model = $parse(input);
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = new kendo.data.DataSource({
                        data: dat.data.data.listData
                    });
                    model.assign($scope, $scope.listPegawai);
                });
            }
            $scope.init = function () {
                var id = $scope.model.jenisPelaksana.id;
                var model = 'dataSource';
                var listArray = 'selectedPegawai';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai = [];
            $scope.init2 = function () {
                var id = $scope.model.jenisPelaksana2.id;
                var model = 'dataSource2';
                var listArray = 'selectedPegawai2';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai2 = [];
            $scope.init3 = function () {
                var id = $scope.model.jenisPelaksana3.id;
                var model = 'dataSource3';
                var listArray = 'selectedPegawai3';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai3 = [];
            $scope.init4 = function () {
                var id = $scope.model.jenisPelaksana4.id;
                var model = 'dataSource4';
                var listArray = 'selectedPegawai4';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai4 = [];
            $scope.init5 = function () {
                var id = $scope.model.jenisPelaksana5.id;
                var model = 'dataSource5';
                var listArray = 'selectedPegawai5';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai5 = [];
            $scope.init6 = function () {
                var id = $scope.model.jenisPelaksana6.id;
                var model = 'dataSource6';
                var listArray = 'selectedPegawai6';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai6 = [];
            $scope.init7 = function () {
                var id = $scope.model.jenisPelaksana7.id;
                var model = 'dataSource7';
                var listArray = 'selectedPegawai7';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai7 = [];
            $scope.init8 = function () {
                var id = $scope.model.jenisPelaksana8.id;
                var model = 'dataSource8';
                var listArray = 'selectedPegawai8';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai8 = [];
            $scope.init9 = function () {
                var id = $scope.model.jenisPelaksana9.id;
                var model = 'dataSource9';
                var listArray = 'selectedPegawai9';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai9 = [];
            $scope.init10 = function () {
                var id = $scope.model.jenisPelaksana10.id;
                var model = 'dataSource10';
                var listArray = 'selectedPegawai10';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                    getGenericPegawai(model, listArray);
                } else {
                    getPegawaiById(id, model, listArray);
                }
            };
            $scope.selectedPegawai10 = [];

            $scope.asdasd = function () {
                $scope.dataPegawai = $scope.selectedPegawai.concat($scope.selectedPegawai2,$scope.selectedPegawai3,$scope.selectedPegawai4,$scope.selectedPegawai5,$scope.selectedPegawai6);
                console.log(JSON.stringify($scope.dataPegawai));
            }
            $scope.showTambah1 = true;
            $scope.show = true;
            $scope.tambah = function () {
                $scope.showJenisPelaksana2 = true;
                $scope.show = false;
                $scope.show2 = true;
            };
            $scope.hapus= function () {
                $scope.show = true;
                $scope.show2 = false;
                $scope.showJenisPelaksana2 = false;
                $scope.model.jenisPelaksana2 = "";
                $scope.selectedPegawai2 = [];
            };

            $scope.tambah2 =function () {
                $scope.showJenisPelaksana3 = true;
                $scope.show3 = true;
                $scope.show2 = false;
            }
            $scope.hapus2= function () {
                $scope.showJenisPelaksana3 = false;
                $scope.show2 = true;
                $scope.show3 = false;
                $scope.model.jenisPelaksana3 = "";
                $scope.selectedPegawai3 = [];
            };

            $scope.tambah3 =function () {
                $scope.showJenisPelaksana4 = true;
                $scope.show3 = false;
                $scope.show4 = true;
            }
            $scope.hapus3 = function () {
                $scope.showJenisPelaksana4 = false;
                $scope.show3 = true;
                $scope.show4 = false;
                $scope.model.jenisPelaksana4 = "";
                $scope.selectedPegawai4 = [];
            };
            
            $scope.tambah4 = function () {
                $scope.showJenisPelaksana5 = true;
                $scope.show4 = false;
                $scope.show5 = true;
            }
            $scope.hapus4 = function () {
                $scope.showJenisPelaksana5 = false;
                $scope.show4 = true;
                $scope.show5 = false;
                $scope.model.jenisPelaksana5 = "";
                $scope.selectedPegawai5 = [];
            };

            $scope.tambah5 = function () {
                $scope.showJenisPelaksana6 = true;
                $scope.show5 = false;
                $scope.show6 = true;
            }
            $scope.hapus5 = function () {
                $scope.showJenisPelaksana6 = false;
                $scope.show5 = true;
                $scope.show6 = false;
                $scope.model.jenisPelaksana5 = "";
                $scope.selectedPegawai5 = [];
            };
            
            $scope.tambah6 = function () {
                $scope.showJenisPelaksana7 = true;
                $scope.show6 = false;
                $scope.show7 = true;
            }
            $scope.hapus6 = function () {
                $scope.showJenisPelaksana7 = false;
                $scope.show6 = true;
                $scope.show7 = false;
                $scope.model.jenisPelaksana6 = "";
                $scope.selectedPegawai6 = [];
            };
            
            $scope.tambah7 = function () {
                $scope.showJenisPelaksana8 = true;
                $scope.show7 = false;
                $scope.show8 = true;
            }
            $scope.hapus7 = function () {
                $scope.showJenisPelaksana8 = false;
                $scope.show7 = true;
                $scope.show8 = false;
                $scope.model.jenisPelaksana7 = "";
                $scope.selectedPegawai7 = [];
            };
            
            $scope.tambah8 = function () {
                $scope.showJenisPelaksana9 = true;
                $scope.show8 = false;
                $scope.show9 = true;
            }
            $scope.hapus8 = function () {
                $scope.showJenisPelaksana9 = false;
                $scope.show8 = true;
                $scope.show9 = false;
                $scope.model.jenisPelaksana8 = "";
                $scope.selectedPegawai8 = [];
            };
            
            $scope.tambah9 = function () {
                $scope.showJenisPelaksana10 = true;
                $scope.show9 = false;
                $scope.show10 = true;
            }
            $scope.hapus9 = function () {
                $scope.showJenisPelaksana10 = false;
                $scope.show9 = true;
                $scope.show10 = false;
                $scope.model.jenisPelaksana9 = "";
                $scope.selectedPegawai9 = [];
            };


            $scope.selectOptions = {
                placeholder: "Pilih Pegawai...",
                dataTextField: "namaLengkap",
                dataValueField: "id",
                filter: "contains"
            };

            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak = data;
            })
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.kelas = data.data;
                $scope.item.namaRuangan = data.data;

                for (var key in $scope.item.tandaVital) {
                    if ($scope.item.tandaVital.hasOwnProperty(key)) {
                        var element = $scope.item.tandaVital[key];
                        if (element.dataTandaVital.name === 'Berat Badan') {
                            if ($scope.item.strukOrder === undefined)
                                $scope.item.strukOrder = {};
                            $scope.item.strukOrder.keteranganLainnya = "Berat badan : " + element.nilai + " KG";
                        }
                    }
                    $scope.item.displayCito = $scope.item.strukOrder === undefined ? 'Tidak Cito' : $scope.item.strukOrder.cito === true ? 'Cito' : "Tidak Cito";
                }
            });
            
            findPasien.getPegawaiPelaksana().then(function(data) {
                $scope.ListJenisDiagnosisPrimer = data.data.data.listData;
            })
            
            $scope.simpan = function() {
                $scope.items.push($scope.model);
                $scope.model = { detailPelaksana: [], tglPelayanan: new Date() };
            }
            $scope.now = new Date();
            $scope.$watch('item.statusCito', function(newValue, oldValue) {
                if (newValue == "Ya") {
                    $scope.statusCito = 1;
                } else {
                    $scope.statusCito = 0;
                }
            });

            $scope.petugas = [];

            $scope.petugas1 = function () {
                var tempPetugas1 = {
                    "objectJenisPetugasPe":{  
                        "id": $scope.model.jenisPelaksana.id,
                        "jenisPetugasPelaksana": $scope.model.jenisPelaksana.jenisPetugasPelaksana
                    },
                    "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai
                }
                $scope.petugas.push(tempPetugas1);
            }
            $scope.petugas2 = function () {
                if ($scope.model.jenisPelaksana2 == undefined || $scope.model.jenisPelaksana2 == ""){
                    var tempPetugas2 = null;
                } else {
                    var tempPetugas2 = {
                        "objectJenisPetugasPe":{  
                            "id": $scope.model.jenisPelaksana2.id
                        },
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai2

                    }
                    $scope.petugas.push(tempPetugas2);
                }
                
            }
            $scope.petugas3 = function () {
                if ($scope.model.jenisPelaksana3 == undefined || $scope.model.jenisPelaksana3 == ""){
                    var tempPetugas3 = null;
                } else {
                    var tempPetugas3 = {
                        "objectJenisPetugasPe":{  
                            "id": $scope.model.jenisPelaksana3.id
                        },
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai3
                    }
                    $scope.petugas.push(tempPetugas3);
                }
                
            }
            $scope.petugas4 = function () {
                if ($scope.model.jenisPelaksana4 == undefined || $scope.model.jenisPelaksana4 == ""){
                    var tempPetugas4 = null;
                } else {
                    var tempPetugas4 = {
                        "objectJenisPetugasPe":{  
                            "id": $scope.model.jenisPelaksana4.id
                        },
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai4
                    }
                    $scope.petugas.push(tempPetugas4);
                }
                
            }
            $scope.petugas5 = function () {
                if ($scope.model.jenisPelaksana5 == undefined || $scope.model.jenisPelaksana5 == ""){
                    var tempPetugas5 = null;
                } else {
                    var tempPetugas5 = {
                        "objectJenisPetugasPe":{  
                            "id": $scope.model.jenisPelaksana5.id
                        },
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai5
                    }
                    $scope.petugas.push(tempPetugas5);
                }
                
            }
            $scope.petugas6 = function () {
                if ($scope.model.jenisPelaksana6 == undefined || $scope.model.jenisPelaksana6 == ""){
                    var tempPetugas6 = null;
                } else {
                    var tempPetugas6 = {
                        "objectJenisPetugasPe":{  
                            "id": $scope.model.jenisPelaksana6.id
                        },
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai6
                    }
                    $scope.petugas.push(tempPetugas6);
                }
            }
            $scope.petugas7 = function () {
                if ($scope.model.jenisPelaksana7 == undefined || $scope.model.jenisPelaksana7 == ""){
                    var tempPetugas7 = null;
                } else {
                    var tempPetugas7 = {
                        "objectJenisPetugasPe":{  
                            "id": $scope.model.jenisPelaksana7.id
                        },
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai7
                    }
                    $scope.petugas.push(tempPetugas7);
                }
            }
            $scope.petugas8 = function () {
                if ($scope.model.jenisPelaksana8 == undefined || $scope.model.jenisPelaksana8 == ""){
                    var tempPetugas8 = null;
                } else {
                    var tempPetugas8 = {
                        "objectJenisPetugasPe":{  
                            "id": $scope.model.jenisPelaksana8.id
                        },
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai8
                    }
                    $scope.petugas.push(tempPetugas8);
                }
            }
            $scope.petugas9 = function () {
                if ($scope.model.jenisPelaksana9 == undefined || $scope.model.jenisPelaksana9 == ""){
                    var tempPetugas9 = null;
                } else {
                    var tempPetugas9 = {
                        "objectJenisPetugasPe":{  
                            "id": $scope.model.jenisPelaksana9.id
                        },
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai9
                    }
                    $scope.petugas.push(tempPetugas9);
                }
            }
            $scope.petugas10 = function () {
                if ($scope.model.jenisPelaksana10 == undefined || $scope.model.jenisPelaksana10 == ""){
                    var tempPetugas10 = null;
                } else {
                    var tempPetugas10 = {
                        "objectJenisPetugasPe":{  
                            "id": $scope.model.jenisPelaksana10.id
                        },
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai10
                    }
                    $scope.petugas.push(tempPetugas10);
                }
            }
            $scope.getHargaTindakan = function (data) {
                debugger;
                data.hargaSatuan = data.produk.hargaSatuan;
                // var a = $state.params.noRegister;
                // var b = $scope.model.namaProduk.id;
                // var c = $scope.statusCito;
                // findPasien.getItem("pelayanan-piutang-rekanan/get?noRegistrasi="+a+"&produkId="+b+"&cito="+c, true).then(function(dat){
                //     debugger;
                //     $scope.model.hargaTindakan = dat.data.data.list[0].hargaSatuan;
                //     // $scope.hargaTindakan = dat.data.data.list[0].hargaSatuan;
                // });
            }

            //%%%%%%%
            // findPasien.getItem("registrasi-pelayanan/get-order-pelayanan-all/?noRec=" + $state.params.noAntrianPasien, true).then(function(dat){
            //     debugger
            //     $scope.listNamaBarang = dat.data.data.orders;
               

            // });
            var noRec = ""
            if ($state.params.noAntrianPasien == undefined){
                noRec = $state.params.noRec
            }else{
                noRec = $state.params.noAntrianPasien
            }
            findPasien.getItem("registrasi-pelayanan/get-tindakan-pelayanan?noRec=" + noRec, true).then(function(dat){
                debugger
                $scope.listNamaBarang = dat.data.data.listData;
               

            });
            //%%%%%%
            
            $scope.dataPetugas = []; // data untus petugas Set

            $scope.dataSelectedRow = {};
            $scope.dataTindakan = new kendo.data.DataSource({
                autoSync: false,
                aggregate: [
                    { field: "subTotal", aggregate: "sum" }
                ],
                editable: true,
                schema: {
                    model: {
                        rowNumber: "id",
                        fields: {
                            rowNumber: { editable: false},
                            tglPelayanan: { editable: false, defaultValue: $scope.now},
                            produk: { validation: { 
                                productnamevalidation: function (input) {
                                if (input.is("[name='produk']") && input.val() === "") {                        
                                    return false;
                                }
                                return true;
                                }
                            } },
                            hargaSatuan: {type: "number", editable: false},
                            qty: { type: "number", validation: { 
                                productqtyvalidation: function (input) {
                                if (input.is("[name='qty']") && input.val() === "0") {                        
                                    return false;
                                }
                                return true;
                                }
                            } },
                            subTotal: {type: "number", editable: false}
                        }
                    }
                },
                change: function (e) {
                    debugger;
                    var noRec = ""
                    if ($state.params.noAntrianPasien == undefined){
                        noRec = $state.params.noRec
                    }else{
                        noRec = $state.params.noAntrianPasien
                    }
                    var idx = e.index;
                    if (e.action === "add") {
                        if ($scope.model.jenisPelaksana) delete $scope.model.jenisPelaksana;
                    }
                    if (e.action === "sync") {
                        var idx = e.items.length;
                        idx = --idx;
                        
                        if (e.items[0]) {
                            e.items[0].id = idx;
                            e.items[0].noRec = noRec;
                            e.items[0].ruangan = {
                                "id": $scope.item.ruangan.id,
                                "namaRuangan": $scope.item.ruangan.namaRuangan,
                            };
                            e.items[0].kelas = {
                                "id": $scope.item.kelas.id,
                                "namaKelas": $scope.item.kelas.namaKelas
                            };
                            e.items[0].pasienDaftar = {
                                "noRec" : noRec
                            };
                            e.items[0].subTotal = e.items[0].hargaSatuan * e.items[0].qty;
                            var qty = e.items[0].qty;
                            e.items[0].qty = qty.toString();
                            // detail grid goes here
                            if ($scope.model.jenisPelaksana && $scope.selectedPegawai){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                            }
                            if ($scope.model.jenisPelaksana2 && $scope.selectedPegawai2){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana2.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana2.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai2
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana2 = false;
                                delete $scope.model.jenisPelaksana2;
                            }
                            if ($scope.model.jenisPelaksana3 && $scope.selectedPegawai3){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana3.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana3.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai3
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana3 = false;
                                delete $scope.model.jenisPelaksana3;
                            }
                            if ($scope.model.jenisPelaksana4 && $scope.selectedPegawai4){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana4.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana4.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai4
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana4 = false;
                                delete $scope.model.jenisPelaksana4;
                            }
                            if ($scope.model.jenisPelaksana5 && $scope.selectedPegawai5){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana5.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana5.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai5
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana5 = false;
                                delete $scope.model.jenisPelaksana5;
                            }
                            if ($scope.model.jenisPelaksana6 && $scope.selectedPegawai6){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana6.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana6.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai6
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana6 = false;
                                delete $scope.model.jenisPelaksana6;
                            }
                            if ($scope.model.jenisPelaksana7 && $scope.selectedPegawai7){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana7.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana7.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai7
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana7 = false;
                                delete $scope.model.jenisPelaksana7;
                            }
                            if ($scope.model.jenisPelaksana8 && $scope.selectedPegawai8){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana8.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana8.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai8
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana8 = false;
                                delete $scope.model.jenisPelaksana8;
                            }
                            if ($scope.model.jenisPelaksana9 && $scope.selectedPegawai9){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana9.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana9.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai9
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana9 = false;
                                delete $scope.model.jenisPelaksana9;
                            }
                            if ($scope.model.jenisPelaksana10 && $scope.selectedPegawai10){
                                var pushData = {
                                    "idParent": e.items[0].id,
                                    "jenisPetugas": {
                                        "id": $scope.model.jenisPelaksana10.id,
                                        "jenisPelaksana": $scope.model.jenisPelaksana10.jenisPetugasPelaksana
                                    },
                                    "listPetugas": $scope.selectedPegawai10
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana10 = false;
                                delete $scope.model.jenisPelaksana10;
                            }
                            console.log(JSON.stringify(e.items[0]));
                            $scope.show = true;
                        }
                        var row = 0;
                        e.items.forEach(function(elemen){
                            elemen.rowNumber = ++row;
                        })
                    }
                }
            });
            $scope.gridPetugasPelaksana = new kendo.data.DataSource({
                data:[]
            })
            $scope.mainGridOptions = {
                sortable: true,
                toolbar: [{
                    name: "create",
                    text: "Tambah"
                }],
                autoSync: true,
                batch: true,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [
                    {
                        "field": "rowNumber", "title": "<h3 align=center>#</h3>", "width": 20
                    },
                    {
                        "field": "tglPelayanan",
                        "title": "<h3 align=center>Tanggal</h3>",
                        "template": "#= new moment(new Date(tglPelayanan)).format('DD-MM-YYYY') #",
                        "width": "60px"
                    },
                    {
                        "field": "tglPelayanan",
                        "title": "<h3 align=center>Jam</h3>",
                        "template": "#= new moment(new Date(tglPelayanan)).format('HH:mm') #",
                        "width": "40px"
                    },
                    {
                        "field": "produk.namaProduk",
                        "title": "<h3 align=center>Tindakan</h3>",
                        "width": "400px"
                    },
                    {
                        "field": "hargaSatuan",
                        "title": "<h3 align=center>Harga Netto</h3>",
                        "width": "100px",
                        "template": "#= kendo.toString(hargaSatuan, 'n0')#",
                        "attributes": {align:"center"}
                    },
                    {
                        "field": "qty",
                        "title": "<h3 align=center>Qty</h3>",
                        "width": "70px",
                        "attributes": {align:"center"}
                    },
                    {
                        "field": "subTotal",
                        "title": "<h3 align=center>SubTotal</h3>",
                        "width": "70px",
                        "template": "#= kendo.toString(subTotal, 'n0')#",
                        "attributes": {align:"center"}
                    },
                    {
                        command: ["destroy"], title: "&nbsp;", width: "70px" 
                    }
                ],
                editable: {
                    mode: "popup",
                    window: {
                        title: "Input Tindakan",
                        scrollable: true,
                        height: 400,
                        actions: ["maximize"],
                    },
                    template: kendo.template($("#popup-editor").html())
                }
            };
            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: {
                        data: $scope.gridPetugasPelaksana._data,
                        filter: { field: "idParent", operator: "eq", value: dataItem.id }
                    },
                    columns: [
                        {
                            field: "jenisPetugas",
                            title: "Jenis Pelaksanan",
                            width: "100px",
                            template: "#= jenisPetugas.jenisPelaksana #"
                        },
                        {
                            field: "listPetugas[0].namaLengkap",
                            title: "Nama Pegawai",
                            width: "200px",
                            template: multiSelectArrayToString
                        }
                    ]
                };
            };
            function multiSelectArrayToString(item) {
                // debugger;
                if(item.listPetugas !== ""){
                    return item.listPetugas.map(function(elem){
                        return elem.namaLengkap
                    }).join(", ");
                }
            };
            var id = 0;
            $scope.format24Jam = {
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            }
            $scope.tambahTindakan = function() {
                var listRawRequired = [
                    "model.jumlah|k-ng-model|Jumlah"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.petugas1();
                    $scope.petugas2();
                    $scope.petugas3();
                    $scope.petugas4();
                    $scope.petugas5();
                    $scope.petugas6();
                    var tglPelayanan = $scope.model.tglPelayanan;
                    tglPelayanan = tglPelayanan.getTime();

                    $scope.dataTindakan.add({
                        "noRec": $state.params.noAntrianPasien,
                        "tglPelayanan": tglPelayanan,
                        "ruangan" : $scope.item.ruangan,
                        "produk": {
                            "id": $scope.model.namaProduk.produkId,
                            "namaProduk": $scope.model.namaProduk.namaProduk
                        },
                        "hargaSatuan": $scope.model.hargaTindakan,
                        "qty" : $scope.model.jumlah,
                        "kelas" : $scope.item.kelas,
                        "pasienDaftar": {
                            "noRec" : $state.params.noAntrianPasien
                        },
                        "pelayananPasienPetugasSet": $scope.petugas
                    });
                    $scope.model.namaProduk = "";
                    $scope.model.hargaTindakan = "";
                    $scope.model.jumlah = "";
                    $scope.model.jenisPelaksana = "";
                    $scope.model.petugasPelaksana = "";
                    $scope.model.jenisPelaksana2 = "";
                    $scope.model.petugasPelaksana2 = "";
                    $scope.model.jenisPelaksana3 = "";
                    $scope.model.petugasPelaksana3 = "";
                    $scope.model.jenisPelaksana4 = "";
                    $scope.model.petugasPelaksana4 = "";
                    $scope.selectedPegawai = [];
                    $scope.selectedPegawai1 = [];
                    $scope.selectedPegawai2 = [];
                    $scope.selectedPegawai3 = [];
                    $scope.selectedPegawai4 = [];
                    $scope.selectedPegawai5 = [];
                    $scope.removePegawai2();
                    $scope.removePegawai3();
                    $scope.removePegawai4();
                }else{
                    ModelItem.showMessages(isValid.messages);
                }
            };
            
            $scope.columnDataTindakan = [
                {
                    "field": "tglPelayanan",
                    "title": "<h3 align=center>Tanggal</h3>",
                    "template": "#= new moment(new Date(tglPelayanan)).format('DD-MM-YYYY HH:mm') #",
                    "width": "100px"
                },
                {
                    "field": "produk.namaProduk",
                    "title": "<h3 align=center>Tindakan</h3>",
                    "width": "400px"
                },
                {
                    "field": "hargaSatuan",
                    "title": "<h3 align=center>Harga Netto</h3>",
                    "width": "100px",
                    "attributes": {align:"center"}
                },
                {
                    "field": "qty",
                    "title": "<h3 align=center>Jumlah</h3>",
                    "width": "70px",
                    "attributes": {align:"center"}
                },{
                    "title": "<h5 align=center>Action</h5>",
                    "width": "70px",
                    "template": "<button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi()'>Hapus</button>"
                }
            ];

            $scope.hapusTransaksi = function(){
                var data = $scope.dataSelectedRow;
                $scope.dataTindakan.remove(data);
            };
            $scope.hapusAll = function(){
                $scope.dataTindakan = new kendo.data.DataSource({
                    data: []
                })
            };
            $scope.detailTindakan = new kendo.data.DataSource({
                data: []
            }); 
            $scope.columnDetailTindakan = [
            {
                field: "jenisPelaksana.jenisPetugasPelaksana",
                title: "Jenis Pelaksanan",
                width: "100px"
            },
            {
                field: "petugasPelaksana.namaLengkap",
                title: "Nama Pegawai",
                width: "200px"
            }];
            $scope.hapusDataPetugas = function(e) {

                e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDetailTindakan = $scope.detailTindakan
                .filter(function (el) {
                    return el.name !== grid._data[0].name;
                });

                grid.removeRow(row);

            };

            $scope.addPegawai=function(){
                $scope.newPetugas=true
            };
            $scope.addPegawai2=function(){
                $scope.newPetugas2=true
            };
            $scope.addPegawai3=function(){
                $scope.newPetugas3=true
            };
            $scope.addPegawai4=function(){
                $scope.newPetugas4=true
            };
            $scope.removePegawai2=function(){
                $scope.newPetugas=false
            };
            $scope.removePegawai3=function(){
                $scope.newPetugas2=false
            };
            $scope.removePegawai4=function(){
                $scope.newPetugas3=false
            };
            $scope.removePegawai5=function(){
                $scope.newPetugas4=false
            };
            $scope.Save = function () {
                debugger;
                if ($state.current.name === 'dashboardpasien.PengkajianMedis.DashboardDiagnosis.inputTindakan') {
                    $scope.isNext = false;
                }else{
                    $scope.isNext = true;
                }
                
                var dataTindakanFix = [];
                var dataLogInputTindakan=[];
                $scope.dataTindakan._data.forEach(function(e){
                    var petugasLayanan = [];
                    $scope.gridPetugasPelaksana._data.forEach(function(a){
                        if(e.id === a.idParent){
                            petugasLayanan.push({
                                "objectJenisPetugasPe":{  
                                    "id": a.jenisPetugas.id
                                },
                                "mapPelayananPasienPetugasToPegawaiSet": a.listPetugas
                            });
                        }
                    })
                    dataTindakanFix.push({
                        "noRec": e.noRec,
                        "tglPelayanan": new Date(e.tglPelayanan).getTime(),
                        "ruangan" : e.ruangan,
                        "produk": {
                            "id": e.produk.produkId,
                            "namaProduk": e.produk.namaProduk
                        },
                        "hargaSatuan": e.hargaSatuan,
                        "qty" : e.qty,
                        "kelas" : e.kelas,
                        "pasienDaftar": {
                            "noRec" : e.pasienDaftar.noRec
                        },
                        "pelayananPasienPetugasSet": petugasLayanan
                    });
                    dataLogInputTindakan.push({
                        "tglpelayanan": new moment(e.tglPelayanan).format('YYYY-MM-DD HH:mm:ss.SSS'),
                        "noregistrasifk": e.noRec,
                        "produkfk": e.produk.produkId,
                        "kelasfk" : e.kelas.id,
                       
                    });
                })
                 var objSave={ 
                    pelayananpasien:dataLogInputTindakan

                  } 
                managePasien.saveTindakan(JSON.stringify(dataTindakanFix)).then(function(e){
                       //#save log
                        manageServicePhp.saveLogInputTindakan(objSave).then(function(data) {
                        
                         })
                        //
                    $scope.hapusAll();
                }, function(error){
                    $scope.isNext = false;
                })
                
               

            }
        }
    ]);
});