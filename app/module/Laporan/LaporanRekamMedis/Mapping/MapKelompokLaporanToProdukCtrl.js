define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('MapKelompokLaporanToProdukCtrl', ['$q', '$rootScope', '$scope', 'ManageSarprasPhp', 'ModelItem','$http','ManageSarpras', 'ModelItemAkuntansi',
        function($q, $rootScope, $scope, manageSarprasPhp, modelItem, $http,manageSarpras, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();    
            var dataPost = [];
            $scope.dataSelected = {};
            
            loadCombo()
            loadProduk()
            
            function loadCombo() {

                manageSarprasPhp.getDataTableTransaksi("mapping/get-combo-mapping", true).then(function(dat){
                    // $scope.listProduk = dat.data.produk
                    $scope.listKelompok = dat.data.kelompokLaporan
                    $scope.listCaraBayar = dat.data.caraBayar
                    $scope.listjenislaporan = dat.data.jenisLaporan
                    $scope.listdataruangan = dat.data.ruanganall
                    // $scope.listproduk = dat.data.produk
                });
            }

            function loadProduk(){
                modelItemAkuntansi.getDataDummyPHP("mapping/get-produk", true, true, 10).then(function(data) {
                    $scope.listproduk = data;
                });
            }


            $scope.Batal = function () {
               delete $scope.item.Produk
               delete $scope.item.jenislaporan;
               delete $scope.item.kelompok;
               delete $scope.item.norec;
               ClickGrid()
               loaaaaaaad()

           }

           $scope.Hapus = function () {

            if ($scope.item.Produk == undefined) {
                alert("Pilih data yang mau di hapus!!")
                return
            }
            
            var mapping = {norec: $scope.item.norec}
            var objDelete = { mapping : mapping,}

            manageSarprasPhp.deleteDataMapping(objDelete).then(function (e) {
               delete $scope.item.Produk
               delete $scope.item.jenislaporan;
               delete $scope.item.kelompok;
               delete $scope.item.norec;
               ClickGrid()
               loaaaaaaad()
           })
        }

        $scope.Simpan = function () {

            if ($scope.item.Produk == undefined) {
                alert("Pilih Produk terlebih dahulu!!")
                return
            }
            if ($scope.item.kelompok == undefined) {
                alert("Pilih Konten terlebih dahulu!!")
                return
            }
            var jenislaporan =""
            if ($scope.gridSelected == undefined) {
                jenislaporan = $scope.item.jenislaporanC.id
            }else{
                jenislaporan = $scope.gridSelected.id
            }
            var norec = "";
            if ($scope.item.norec != undefined) {
               norec = $scope.item.norec
           }

           var mappingproduktolaporanrl = {
            norec : norec,
            produkfk: $scope.item.Produk.idproduk,
            objectjenislaporanfk: jenislaporan,
            objectkelompokkontenfk: $scope.item.kelompok.id,
        }
                // var objSave =
                //     {
                //         mappingproduktolaporanrl: mappingproduktolaporanrl,
                //     }
                manageSarprasPhp.simpanDataMapping(mappingproduktolaporanrl).then(function (e) {
                    delete $scope.item.Produk
                    delete $scope.item.jenislaporan;
                    delete $scope.item.kelompok;
                    delete $scope.item.norec;
                    ClickGrid()
                    loaaaaaaad()
                    // window.history.back();
                })

            }

            $scope.Cari = function(){
                loaaaaaaad();
            } 

            function loaaaaaaad() {
             var idLap =""
             if ($scope.item.jenislaporanC != undefined){
                var idLap ="idLap=" +$scope.item.jenislaporanC.id
            }
            manageSarprasPhp.getDataTableTransaksi("mapping/get-data-jenislaporan?"
                +idLap).then(function (data) {
                    for (var i = 0; i < data.data.length; i++) {
                        data.data[i].no = i+1
                    }
                    $scope.GridSearch = new kendo.data.DataSource({
                        data: data.data,
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
            }

            $scope.klikGrid = function(dataSelected){
                    if (dataSelected != undefined) {
                        $scope.listproduk.add({
                            id: dataSelected.id,
                            idkelompoklaporan: dataSelected.idkelompoklaporan,
                            idproduk: dataSelected.idproduk,
                            jenislaporan: dataSelected.jenislaporan,
                            kelompoklaporan: dataSelected.kelompoklaporan, 
                            namaproduk: dataSelected.namaproduk,
                            norec: dataSelected.norec
                        })

                        $scope.item.norec = dataSelected.norec
                }
                   
                $scope.item.Produk = {
                                        // id: dataSelected.id,
                                        // idkelompoklaporan: dataSelected.idkelompoklaporan,
                                        idproduk: dataSelected.idproduk,
                                        // jenislaporan: dataSelected.jenislaporan,
                                        // kelompoklaporan: dataSelected.kelompoklaporan, 
                                        namaproduk: dataSelected.namaproduk,
                                        // norec: dataSelected.norec
                                     }
                $scope.item.kelompok = {
                                        id:dataSelected.idkelompoklaporan, 
                                        kelompoklaporan:dataSelected.kelompoklaporan
                                       }
                $scope.item.norec = dataSelected.norec
            }

            $scope.clickGrid = function(gridSelected){
                ClickGrid()
            }
            function ClickGrid(){            
                var idKonten =""

                if ($scope.gridSelected != undefined){
                    var idKonten ="idKonten=" +$scope.gridSelected.idkelompoklaporan
                }
                manageSarprasPhp.getDataTableTransaksi("mapping/get-data-mapping?"
                    +idKonten, true).then(function(dat){
                        for (var i = 0; i < dat.data.length; i++) {
                            dat.data[i].no = i+1
                    // $scope.item.Produk = {idproduk:dat.data[i].idproduk,namaproduk:dat.data[i].namaproduk}

                }
                $scope.item.kelompok = {
                    id:$scope.gridSelected.idkelompoklaporan, 
                    kelompoklaporan:$scope.gridSelected.kelompoklaporan
                }
                $scope.dataGrid = dat.data;

            });
                    delete $scope.item.Produk
                    delete $scope.item.jenislaporan;
                    delete $scope.item.kelompok;
                    delete $scope.item.norec;
                }

                $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px",
                },
                {
                    "field": "idproduk",
                    "title": "Kode Produk",
                    "width" : "100px",
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width" : "100px",
                }
                ];

                $scope.columnGridSeacrh = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px",
                },
                {
                    "field": "kelompoklaporan",
                    "title": "Konten Laporan",
                    "width" : "100px",
                }
                ];
            }
            ]);
});