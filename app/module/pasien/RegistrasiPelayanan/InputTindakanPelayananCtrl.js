define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InputTindakanPelayananCtrl', ['ManagePasien', 'socket', '$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
        function(managePasien, socket, $state, findPasien, $rootScope, $scope, ModelItem, DateHelper, $document, r) {
            $scope.model = { tglPelayanan: new Date() };
            $scope.items = [];
            $scope.temp = [];
            $scope.dataModelGrid = [];
            $scope.no = 1;
            $scope.isHeader = true;
            $scope.item= {};
            var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
            debugger;
            if($state.params.noRec) {
                findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                    debugger;
                    $scope.item = ModelItem.beforePost(data.data, true);
                });
            }
            $scope.listYaTidak = [
            {
                "id": 1, "name":"Ya"
            },
            {
                "id": 0, "name":"Tidak"
            }]
            $scope.model.statusCito=[{"id":0,"name":"tidak"}];
            // $scope.$watch('model.jenisPelaksana', function() {
            //     if (!$scope.model.jenisPelaksana) return;
            //     var id = $scope.model.jenisPelaksana.id;
            //     findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
            //         $scope.listPegawai = dat.data.data.listData;
            //         $scope.dataSource = new kendo.data.DataSource({
            //             data: $scope.listPegawai
            //         });
            //     });
            // });
            $scope.selectedPegawai = [{
                "id": pegawai.id,
                "namaLengkap": pegawai.namaLengkap,
                "jenisPegawai": pegawai.jenisPegawai.id
            }]
            console.log(JSON.stringify($scope.selectedPegawai));
            // $scope.init = function () {
            //     var id = $scope.model.jenisPelaksana.id;
            //     findPasien.getItem("pegawai/get-pegawai-by-pelaksana?id=" + id, true).then(function(dat){
            //         $scope.listPegawai = dat.data.data.listData;
            //         $scope.dataSource = new kendo.data.DataSource({
            //             data: $scope.listPegawai
            //         });
            //     });
            // };
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
            $scope.now = new Date();
            $scope.$watch('item.statusCito', function(newValue, oldValue) {
                if (newValue == "Ya") {
                    $scope.statusCito = 1;
                } else {
                    $scope.statusCito = 0;
                }
            });
            //static jenis petugas, nama petugas by login
            $scope.petugas = [{
				"objectJenisPetugasPe": {
					"id": 2
				},
				"mapPelayananPasienPetugasToPegawaiSet": $scope.selectedPegawai
			}];
            $scope.getHargaTindakan = function () {
                $scope.model.hargaTindakan = $scope.model.namaProduk.hargaSatuan;
            }
            findPasien.getItem("registrasi-pelayanan/get-tindakan-pelayanan?noRec=" + $state.params.noRec, true).then(function(dat){
                $scope.listNamaBarang = dat.data.data.listData;
            });
            
            $scope.dataSelectedRow = {};
            $scope.dataTindakan = new kendo.data.DataSource({
                data: [],
                pageSize:5
            });
            $scope.mainGridOptions = {
                columns: $scope.columnDataTindakan,
                pageable: true,
                selectable: "row",
                pageSizes: true
            };
            var id = 0;
            $scope.tambahTindakan = function() {
                var listRawRequired = [
                    "model.jumlah|k-ng-model|Jumlah"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    var tglPelayanan = DateHelper.getTanggalFormattedNew($scope.model.tglPelayanan);
                    var grid = $('#grid').data("kendoGrid");
                    id += 1;
                    $scope.dataModelGrid[id] = {};

                    grid.dataSource.add({
                        "no": id,
                        "noRec": $scope.item.pasienDaftar.noRec,
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
                            "noRec" : $scope.item.noRec
                        },
                        "pelayananPasienPetugasSet": $scope.petugas
                    });
                    $scope.model.namaProduk = "";
                    $scope.model.hargaTindakan = "";
                    $scope.model.jumlah = "";
                }else{
                    ModelItem.showMessages(isValid.messages);
                }
            };
            
            $scope.columnDataTindakan = [
            {
                "field": "tglPelayanan",
                "title": "<h3 align=center>Tanggal</h3>",
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
            $scope.Save = function () {
                var listTindakan = $scope.dataTindakan._data;
                var dataTindakanFix = [];
                listTindakan.forEach(function(e){
                    var data ={
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
                    }
                    dataTindakanFix.push(data);
                })
                managePasien.saveTindakan(JSON.stringify(dataTindakanFix)).then(function(e){
                    $scope.isNext = true;
                })
                // console.log(JSON.stringify(dataTindakanFix));
                // body...
            }
            $scope.selectOptions = {
                filter: "contains"
            };
            
            findPasien.getPegawaiPelaksana().then(function(data) {
                $scope.ListJenisDiagnosisPrimer = data.data.data.listData;
                $scope.model.jenisPelaksana = $scope.ListJenisDiagnosisPrimer[1];
            })
        }
    ]);
});