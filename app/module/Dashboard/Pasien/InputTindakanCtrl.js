define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InputTindakanCtrl', ['ManagePasien', 'socket', '$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
        function(managePasien, socket, $state, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r) {
            $scope.model = { tglPelayanan: new Date() };
            $scope.items = [];
            $scope.temp = [];
            $scope.dataModelGrid = [];
            $scope.no = 1;
            $scope.isHeader = true;
            $scope.item= {};
            
            $scope.listYaTidak = [
            {
                "id": 1, "name":"Ya"
            },
            {
                "id": 0, "name":"Tidak"
            }]
            $scope.model.statusCito=[{"id":0,"name":"tidak"}];

            $scope.init = function () {
                var id = $scope.model.jenisPelaksana.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });
                });
            };
            $scope.selectedPegawai = [];
            $scope.init2 = function () {
                var id = $scope.model.jenisPelaksana2.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource2 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai2 = [];
            $scope.init3 = function () {
                var id = $scope.model.jenisPelaksana3.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource3 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai3 = [];
            $scope.init4 = function () {
                var id = $scope.model.jenisPelaksana3.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource4 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai4 = [];
            $scope.init5 = function () {
                var id = $scope.model.jenisPelaksana3.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource5 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai5 = [];
            $scope.init6 = function () {
                var id = $scope.model.jenisPelaksana3.id;
                findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
                    $scope.listPegawai = dat.data.data.listData;
                    $scope.dataSource6 = new kendo.data.DataSource({
                        data: $scope.listPegawai
                    });

                });
            };
            $scope.selectedPegawai6 = [];

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


            $scope.selectOptions = {
                placeholder: "Pilih Pegawai...",
                dataTextField: "namaLengkap",
                dataValueField: "id",
                valuePrimitive: true,
                autoBind: false
            };

            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak = data;
            })
            if ($state.params.noRegister !== undefined) {
                $scope.isHeader = false; 
                /*$scope.listRuanganTujuan = [{"namaRuangan":"testong"}]*/
                findPasien.findRuanganPelayanan($state.params.noRegister).then(function(e) {
                    // $scope.item.ruangan = e.data.data.ruangan;
                    // $scope.item.kelas = e.data.data.pasienDaftar.kelas.id;
                    // debugger;
                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            element[0].kelas = element[1];
                            element[0].noRecRegistrasi = element[2];
                            $scope.model.ruangan = element[0];
                            data.push(element[0]);
                        }
                    }


                    $scope.listRuanganTujuan = data;
                });
            }

            // $scope.listRuanganTujuan = [{"id":18,"namaRuangan":"dummy Ruangan","kelas":{"id":1,"noRec": "d08b5c41-1748-446e-ab38-93a221dc","namaKelas":"dumy kelas"},"noRecRegistrasi":$state.params.noRec}]
            

            /*$scope.listNamaBarang = [{"id":1,"namaProduk":"dummy tindakan"}]*/
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                debugger;
                $scope.item = ModelItem.beforePost(data.data, true);
                // $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);
                $scope.kelas = data.data;
                $scope.item.namaRuangan = data.data;

                // $scope.item.pasien.umurPasien = DateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                // $scope.item.tglRegistrasi = moment(new Date(data.data.tglRegistrasi)).format('DD-MM-YYYY'); 
                // $scope.item.keluhan = 'Keluhan utama :' + data.data.keluhanUtama.keluhanUtama;
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
            // $scope.$watch('item.namaRuangan', function(e) {
            //     if (e === undefined) return;
            //     debugger;
            //     $scope.listNamaBarang = ModelItem.kendoHttpSource('/product/find-tindakan-by-ruangan?idRuangan=' + e.ruanganId, true);
            // })
            // $scope.temp.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            /*$scope.temp.pegawai = [pegawai]*/
            // $scope.$watch('model.ruangan', function(e) {
            //     if (e === undefined) return;
            // debugger;
            // $scope.listNamaBarang = ModelItem.kendoHttpSource('registrasi-pelayanan/get-tindakan-pelayanan?noRec=' + $state.params.noRec, true);
            // })

            /*$scope.getIdPelaksana = function(){
                var id = $scope.item.jenisPelaksana.id;
                findPasien.getPegawaiByPelaksana(id).then(function(data) {
                    $scope.listPegawai = data.data.data.listData;
                })
            }*/
            
            findPasien.getPegawaiPelaksana().then(function(data) {
                $scope.ListJenisDiagnosisPrimer = data.data.data.listData;
            })
            
            $scope.simpan = function() {
                $scope.items.push($scope.model);
                $scope.model = { detailPelaksana: [], tglPelayanan: new Date() };
            }
            $scope.now = new Date();

            /*$scope.getHargaNetto = function(){
                var produkId = $scope.model.namaProduk.id;

                findPasien.getHargaNetto($state.params.noRecRegistrasi, produkId).then(function(data) {
                    $scope.ListHarga= data.data.data.list;
                    $scope.hargaNetto1 = data.data.data.list.hargaNetto1;
                    $scope.hargaNetto2 = data.data.data.list.hargaNetto2;
                    $scope.hargaNetto3 = data.data.data.list.hargaNetto3;
                    $scope.hargaNetto = data.data.data.list.hargaNetto;
                })
            };*/
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
                        "id": $scope.model.jenisPelaksana.id
                    },
                    "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai
                    // "objectProduk":{  
                    //     "id":$scope.model.namaProduk.id
                    // },
                    // "objectRuangan":{  
                    //     "id":$scope.item.ruangan.id
                    // },
                    // "objectAsalProduk":{  
                    //     "id":1
                    // }
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
                        "mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai2                      // "objectProduk":{  
                        //     "id": $scope.model.namaProduk.id
                        // },
                        // "objectRuangan":{  
                        //     "id":$scope.item.ruangan.id
                        // },
                        // "objectAsalProduk":{  
                        //     "id":1
                        // }

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
                        // "objectProduk":{  
                        //     "id": $scope.model.namaProduk.id
                        // },
                        // "objectRuangan":{  
                        //     "id":$scope.item.ruangan.id
                        // },
                        // "objectAsalProduk":{  
                        //     "id":1
                        // }
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
                        // "objectProduk":{  
                        //     "id": $scope.model.namaProduk.id
                        // },
                        // "objectRuangan":{  
                        //     "id":$scope.item.ruangan.id
                        // },
                        // "objectAsalProduk":{  
                        //     "id":1
                        // }
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
                        // "objectProduk":{  
                        //     "id": $scope.model.namaProduk.id
                        // },
                        // "objectRuangan":{  
                        //     "id":$scope.item.ruangan.id
                        // },
                        // "objectAsalProduk":{  
                        //     "id":1
                        // }
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
                        // "objectProduk":{  
                        //     "id": $scope.model.namaProduk
                        // },
                        // "objectRuangan":{  
                        //     "id":$scope.item.ruangan.id
                        // },
                        // "objectAsalProduk":{  
                        //     "id":1
                        // }
                    }
                    $scope.petugas.push(tempPetugas6);
                }
                
                
            }
            $scope.getHargaTindakan = function () {
                 debugger;
                $scope.model.hargaTindakan = $scope.model.namaProduk.hargaSatuan;
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
            findPasien.getItem("registrasi-pelayanan/get-tindakan-pelayanan?noRec=" + $state.params.noAntrianPasien, true).then(function(dat){
                debugger
                $scope.listNamaBarang = dat.data.data.listData;
               

            });
            //%%%%%%
            
            $scope.dataSelectedRow = {};
            $scope.dataTindakan = new kendo.data.DataSource({
                data: [],
                pageSize:5,
                change: function(e) {
                    var row = e.index;
                    e.items.forEach(function(data){
                        // var row = 0;
                        data.rowNumber = ++row;
                    })
                }
            });
            $scope.mainGridOptions = {
                columns: [{
                    "field": "rowNumber", "title": "<h3 align=center>#</h3>", "width": 40
                },
                {
                    "field": "tglPelayanan",
                    "title": "<h3 align=center>Tanggal</h3>",
                    template: "#= new moment(new Date(tglPelayanan)).format('DD-MM-YYYY HH:mm') #",
                    "width": "100px"
                },
                {
                    "field": "produk.namaProduk",
                    "title": "<h3 align=center>Tindakan</h3>",
                    "width": "400px"
                },
                {
                    "field": "hargaNetto",
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
                    title: "<h5 align=center>Action</h5>",
                    width: "70px",
                    template: "<button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi()'>Hapus</button>"
                }],
                pageable: true,
                selectable: "row",
                pageSizes: true
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
                    // var grid = $('#grid').data("kendoGrid");
                    // id += 1;
                    // $scope.dataModelGrid[id] = {};

                    $scope.dataTindakan.add({
                        // "no": id,
                        "noRec": $state.params.noAntrianPasien,
                        "tglPelayanan": tglPelayanan,
                        "ruangan" : $scope.item.ruangan,
                        "produk": {
                            "id": $scope.model.namaProduk.produkId,
                            "namaProduk": $scope.model.namaProduk.namaProduk
                        },
                        "hargaNetto": $scope.model.hargaTindakan,
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
            // $scope.addTindakan = function() {
            //     var listRawRequired = [
            //             "model.jumlah|k-ng-model|Jumlah",
            //         ];
            //     var isValid = ModelItem.setValidation($scope, listRawRequired);
            //     if(isValid.status){
            //         $scope.no = 1;
            //         $scope.petugas1();
            //         $scope.petugas2();
            //         $scope.petugas3();
            //         $scope.petugas4();
            //         $scope.petugas5();
            //         $scope.petugas6();
            //         debugger;
            //         $scope.hargaNetto = parseInt($scope.hargaTindakan) * parseInt($scope.item.jumlah);
            //         // debugger;
            //         var tempDataTindakan = {
            //             "id": $scope.no++,
            //             "noRec": $state.params.noAntrianPasien,
            //             "tglPelayanan": $scope.model.tglPelayanan,
            //             "ruangan" : $scope.item.ruangan,
            //             "produk": {
            //                 "id": $scope.model.namaProduk.produkId,
            //                 "namaProduk": $scope.model.namaProduk.namaProduk
            //             },
            //             "hargaNetto": $scope.model.hargaTindakan,
            //             "qty" : $scope.model.jumlah,
            //             "kelas" : $scope.item.pasienDaftar.kelas,
            //             "pasienDaftar": {
            //                 "noRec" : $state.params.noRegister
            //             },
            //             "pelayananPasienPetugasSet": $scope.petugas
            //         }
            //         console.log(JSON.stringify(tempDataTindakan));
            //         $scope.dataTindakanPelayanan.push(tempDataTindakan);
            //         $scope.finalTindakanPelayanan.push(tempDataTindakan);
            //         console.log(JSON.stringify($scope.finalTindakanPelayanan));
            //         reloadGrid();
            //         debugger;
            //         $scope.model.namaProduk = "";
            //         $scope.model.hargaTindakan = "";
            //         $scope.model.jumlah = "";
            //         $scope.model.jenisPelaksana = "";
            //         $scope.model.petugasPelaksana = "";
            //         $scope.model.jenisPelaksana2 = "";
            //         $scope.model.petugasPelaksana2 = "";
            //         $scope.model.jenisPelaksana3 = "";
            //         $scope.model.petugasPelaksana3 = "";
            //         $scope.model.jenisPelaksana4 = "";
            //         $scope.model.petugasPelaksana4 = "";
            //         $scope.selectedPegawai = [];
            //         $scope.selectedPegawai1 = [];
            //         $scope.selectedPegawai2 = [];
            //         $scope.selectedPegawai3 = [];
            //         $scope.selectedPegawai4 = [];
            //         $scope.selectedPegawai5 = [];
            //         $scope.removePegawai2();
            //         $scope.removePegawai3();
            //         $scope.removePegawai4();
            //     }else{
            //         ModelItem.showMessages(isValid.messages);
            //     }
            // };

            // $scope.dataTindakanPelayanan = [];
            // $scope.finalTindakanPelayanan = [];

            // var reloadGrid = function () {
            //     $scope.dataTindakanPelayanan.forEach(function(data){
            //         var date = new Date(data.tglPelayanan);
            //         data.tglPelayanan = DateHelper.getTanggalFormattedNew(date);
            //     });
            //     $scope.dataTindakan = new kendo.data.DataSource({
            //         data: $scope.dataTindakanPelayanan,
            //         autoSync: true,
            //         schema: {
            //             model: {
            //                 id: "id"
            //             }
            //         }
            //     });
            // }
            
            $scope.columnDataTindakan = [
            {
                "field": "tglPelayanan",
                "title": "<h3 align=center>Tanggal</h3>",
                template: "#= new moment(new Date(tglPelayanan)).format('DD-MM-YYYY HH:mm') #",
                "width": "100px"
            },
            {
                "field": "produk.namaProduk",
                "title": "<h3 align=center>Tindakan</h3>",
                "width": "400px"
            },
            {
                "field": "hargaNetto",
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
                title: "<h5 align=center>Action</h5>",
                width: "70px",
                template: "<button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi()'>Hapus</button>"
            }
            ];

            $scope.hapusTransaksi = function(){
                debugger;
                var data = $scope.dataSelectedRow;
                $scope.dataTindakan.remove(data);
            };
            $scope.hapusAll = function(){
                debugger;
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

            /*$scope.Save = function() {
                debugger;
                var kelasId = $scope.kelas.pasienDaftar.kelasId;
                var dat = $scope.dataTindakan._data;
                console.log(JSON.stringify(dat));
                var i=0;
                var DataTindakan = [];
                dat.forEach(function(value){
                    var data ={
                        "kelas":{
                            "id": kelasId
                        },
                        "tglPelayanan": value.tglPelayanan,
                        "Produk": {
                            "id": value.namaProduk.id
                        },
                        "pasienDaftar":{
                            "noRec": $state.params.noRecRegistrasi
                        },
                        "petugas": [
                        {
                            "objectJenisPetugasPe":{  
                                "id":value.jenisPelaksana.id
                            },
                            "objectPegawai":{  
                                "id": value.petugasPelaksana.id
                            },
                            "objectProduk":{  
                                "id":value.namaProduk.id
                            },
                            "objectRuangan":{  
                                "id":value.ruangan.id
                            },
                            "objectAsalProduk":{  
                                "id":1
                            }

                        }
                        ]
                    }
                    DataTindakan[i] =data;
                    i++;
                })
                debugger;
                managePasien.saveTindakan(ModelItem.beforePost(DataTindakan))
            }*/
            $scope.Save = function () {
                $scope.isNext = true;
                // var dat = $scope.dataTindakan._data;
                // var i=0;
                var dataTindakanFix = [];
                $scope.dataTindakan._data.forEach(function(e){
                    debugger;
                    dataTindakanFix.push({
                        "noRec": e.noRec,
                        "tglPelayanan": e.tglPelayanan,
                        "ruangan" : e.ruangan,
                        "produk": {
                            "id": e.produk.id,
                            "namaProduk": e.produk.namaProduk
                        },
                        "hargaSatuan": e.hargaNetto,
                        "qty" : e.qty,
                        "kelas" : e.kelas,
                        "pasienDaftar": {
                            "noRec" : e.pasienDaftar.noRec
                        },
                        "pelayananPasienPetugasSet": e.pelayananPasienPetugasSet
                    });
                })
                managePasien.saveTindakan(JSON.stringify(dataTindakanFix)).then(function(e){
                    $scope.hapusAll();
                }, function(error){
                    $scope.isNext = false;
                })
                // console.log(JSON.stringify(dataTindakanFix));
                // body...
            }
            $scope.selectOptions = {
                filter: "contains"
            };
            
            // ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
            //     $scope.sourcePegawai = data;
            // })
            
            // ModelItem.getDataDummyGeneric("JenisPetugasPelaksana", true, undefined, 10).then(function(data) {
            //     $scope.sourceJenisDiagnosisPrimer = data;
            // });
            // $scope.addPegawai = function() {
            //     $scope.model.detailPelaksana.push($scope.temp);
            //     $scope.temp = undefined;
            // }
            // $("#multiselect").kendoMultiSelect({
            //   dataSource: {
            //     data: $scope.listPegawai
            //   }
            // });
            // $scope.dataModelGrid.petugasPelaksana = {};
            // $scope.rowTemplate = 
            //     "<tr data-uid='#: uid #'>"+
            //         //No Perkiraan
            //         "<td>"+
            //            "<input style='width: 100%;' kendo-combo-box k-ng-model='item.petugasPelaksana' k-data-text-field=\"'namaLengkap'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='listPegawai' />"+
            //         //action
            //         "<td>"+
            //             "<button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi()'>Hapus</button>"+
            //         "</td>"+

            //     "</tr>";
            // $scope.dataSelectedRowPetugasPelaksana = {};

            // $scope.sourcePetugasPelaksana = new kendo.data.DataSource({
            //     data: [{id:1}],

            // }); 
            // $scope.columnPetugasPelaksana = [
            //     {
            //         "title": "Nama Pegawai",
            //         "width": "100px",
            //         "attributes":{align:"center"}
            //     },
            //     {
            //         "title": "Action",
            //         "width": "20px",
            //     }
            // ]

            // $scope.mainGridOptions = {
            //     pageable: true,
            //     toolbar: ["create"],
            //     scrollable:false,
            //     columns: [{
            //         "title": "Nama Pegawai",
            //         "width": "100px",
            //         "attributes":{align:"center"}
            //     },
            //     {
            //         "title": "Action",
            //         "width": "20px",
            //     }],
            //     editable: "inline"
            // };

            



                // var data = [];
                // for (var key in $scope.items) {
                //     if ($scope.items.hasOwnProperty(key)) {
                //         var element = $scope.items[key];
                //         var model = {};
                //         model.kelas = element.ruangan.kelas;
                //         model.tglPelayanan = element.tglPelayanan;
                //         model.produk = element.namaProduk;
                //         model.pasienDaftar = { noRec: element.ruangan.noRecRegistrasi };
                //         model.petugas = [];
                //         for (var i in element.detailPelaksana) {
                //             if (element.detailPelaksana.hasOwnProperty(i)) {
                //                 var subElement = element.detailPelaksana[i];
                //                 model.petugas.push({
                //                     objectJenisPetugasPe: subElement.jenisPelaksana,
                //                     objectPegawai: subElement.pegawai,
                //                     objectProduk: element.namaProduk,
                //                     objectRuangan: element.ruangan,
                //                     objectAsalProduk: { id: 1 },
                //                 })
                //             }
                //         }
                //         model.produk = element.namaProduk;
                //         data.push(model);
                //     }
                // }

            }
            ]);
});