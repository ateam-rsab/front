define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaporanPerhitunganKasaBaruCtrl', ['$state', 'CacheHelper', '$rootScope', '$scope', 'ModelItem', 'DateHelper','ManagePasien','FindPasien',
        function($state, cacheHelper, $rootScope, $scope, ModelItem, DateHelper,ManagePasien,findPasien) {
            $scope.isLoadingData2 = true;
            $scope.current = {};
            $scope.item = {};
            $scope.loops = {};
            $scope.listAlatDigunakan = [];
            $scope.listNamaBarang = [
            {
                "id" : 1,
                "namaProduk" : "Kassa Operasi"
            },
            {
                "id" : 2,
                "namaProduk" : "Kassa Bertali"
            },
            {
                "id" : 3,
                "namaProduk" : "Kassa Rol Kecil"
            },
            {
                "id" : 4,
                "namaProduk" : "Kassa Rol Besar"
            },
            {
                "id" : 5,
                "namaProduk" : "Deppers Kecil"
            },
            {
                "id" : 6,
                "namaProduk" : "Deppers Besar"
            },
            {
                "id" : 7,
                "namaProduk" : "Pincent Anatomis"
            },
            {
                "id" : 8,
                "namaProduk" : "Pincent Cirugis"
            },
            {
                "id" : 9,
                "namaProduk" : "Mata Pisau"
            },
            {
                "id" : 10,
                "namaProduk" : "Gunting"
            },
            {
                "id" : 11,
                "namaProduk" : "Klem Pean"
            },
            {
                "id" : 12,
                "namaProduk" : "Kocher"
            },
            {
                "id" : 13,
                "namaProduk" : "Krome"
            },
            {
                "id" : 14,
                "namaProduk" : "Mecolix"
            },
            {
                "id" : 15,
                "namaProduk" : "Hak"
            },
            {
                "id" : 16,
                "namaProduk" : "Jarum"
            }
            ]


           $scope.loadGrid = function () {
            debugger
            findPasien.getLoadlapKassa($state.params.noRec).then(function(data) {
            debugger;
            if(data.data.data != undefined){
            debugger
            $scope.dataMaster = data.data.data.showData;
            $scope.dataSource = new kendo.data.DataSource({
            pageSize:50,
            data : $scope.dataMaster,
            $scrollable : true
             });
            }
            });
            }
            $scope.loadGrid();

            $scope.columnLaporanKasaBaru = [
                        {
                            "field": "noRec",
                            "title": "Norec"
                        }
                       
             ];

            $scope.addBarang = function() {
                $scope.listAlatDigunakan.push($scope.current.barang);
            }


            findPasien.getDokter().then(function(data){
               $scope.listdokter = data.data.data;
            });

            findPasien.getPerawat().then(function(dat) {
            
                $scope.listPerawat = dat.data;
            });

            $state.params.noRec;
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
            debugger;
            $scope.noRegistrasiNorec = $state.params.noRec;
            $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-TYYYY HH:mm');
            $scope.isLoadingData2 = false;
            });
                
            $scope.Back = function(){
            $state.go('RevDaftarPasienRuanganBedah')
            }



            $scope.klik = function(dataSelected){
             if (dataSelected != undefined){
             toastr.info("1 Dipilih");
             $scope.item.idCheckin = dataSelected.noRec;
             findPasien.getLoadlapSubKassa($scope.item.idCheckin).then(function(data) {
              $scope.subdatamaster = data.data.data.showData;
               $scope.subdatamaster = data.data.data.showData;
                $scope.dataJenisKasa.data([]);
                 for(var i = 0; i<$scope.subdatamaster[0].DetailAlatDigunakan.length; i++){
                    $scope.dataJenisKasa.add({
                     barang : {id : $scope.subdatamaster[0].DetailAlatDigunakan[i].idProduk, namaProduk : $scope.subdatamaster[0].DetailAlatDigunakan[i].namaProduk},
                     HitunganPertama : $scope.subdatamaster[0].DetailAlatDigunakan[i].kuantitas,
                     penambahan1 : $scope.subdatamaster[0].DetailAlatDigunakan[i].tambah1,
                     penambahan2 : $scope.subdatamaster[0].DetailAlatDigunakan[i].tambah2,
                     penambahan3 : $scope.subdatamaster[0].DetailAlatDigunakan[i].tambah3,
                     penambahan4 : $scope.subdatamaster[0].DetailAlatDigunakan[i].tambah4,
                     penambahan5 : $scope.subdatamaster[0].DetailAlatDigunakan[i].tambah5,
                     penambahan6 : $scope.subdatamaster[0].DetailAlatDigunakan[i].tambah6,
                     hitunganTotal : $scope.subdatamaster[0].DetailAlatDigunakan[i].kuantitas,
                     keterangan2 : $scope.subdatamaster[0].DetailAlatDigunakan[i].keterngan,
                     noRec: $scope.subdatamaster[0].DetailAlatDigunakan[i].noRec,
                    })
                 }
                $scope.item.AhliBedah = {id :$scope.subdatamaster[1].DetailDokter[0].idAhliBedah, namaLengkap : $scope.subdatamaster[1].DetailDokter[0].nameAhliBedah};
                $scope.item.Asisten = {id :$scope.subdatamaster[1].DetailDokter[0].idAsisten, namaLengkap : $scope.subdatamaster[1].DetailDokter[0].nameAsisten};
                $scope.item.PerawatInstrumen = {id :$scope.subdatamaster[1].DetailDokter[0].idPerawatInstrumen, namaExternal : $scope.subdatamaster[1].DetailDokter[0].namePerawatInstrumen};
                $scope.item.PerawatSirkuler = {id :$scope.subdatamaster[1].DetailDokter[0].idPerawatSirkuler, namaExternal : $scope.subdatamaster[1].DetailDokter[0].namePerawatSirkuler};
                $scope.item.KondisiSterilisasi = $scope.subdatamaster[1].DetailDokter[0].kondisiSterilisasi;
                $scope.loops.load4 = $scope.subdatamaster[1].DetailDokter[0].load;
                $scope.loops.load2 = $scope.subdatamaster[1].DetailDokter[1].load;
                $scope.loops.load3 = $scope.subdatamaster[1].DetailDokter[2].load;
                $scope.loops.load1 = $scope.subdatamaster[1].DetailDokter[3].load;
                $scope.loops.produk4 = $scope.subdatamaster[1].DetailDokter[0].load;
                $scope.loops.produk2 = $scope.subdatamaster[1].DetailDokter[1].load;
                $scope.loops.produk3 = $scope.subdatamaster[1].DetailDokter[2].load;
                $scope.loops.produk1 = $scope.subdatamaster[1].DetailDokter[3].load;
                $scope.loops.tglSteril4 = new moment($scope.subdatamaster[1].DetailDokter[0].tanggalSteril).format('YYYY-MM-DD'); 
                $scope.loops.tglSteril2 = new moment($scope.subdatamaster[1].DetailDokter[1].tanggalSteril).format('YYYY-MM-DD'); 
                $scope.loops.tglSteril3 = new moment($scope.subdatamaster[1].DetailDokter[2].tanggalSteril).format('YYYY-MM-DD');
                $scope.loops.tglSteril1 = new moment($scope.subdatamaster[1].DetailDokter[3].tanggalSteril).format('YYYY-MM-DD');
                $scope.Norec4 = $scope.subdatamaster[1].DetailDokter[0].noRec;
                $scope.Norec2 = $scope.subdatamaster[1].DetailDokter[1].noRec;
                $scope.Norec3 = $scope.subdatamaster[1].DetailDokter[2].noRec;
                $scope.Norec1 = $scope.subdatamaster[1].DetailDokter[3].noRec;
                $scope.loops.Produk4 = $scope.subdatamaster[1].DetailDokter[0].alat;
                $scope.loops.Produk2 = $scope.subdatamaster[1].DetailDokter[1].alat;
                $scope.loops.Produk3 = $scope.subdatamaster[1].DetailDokter[2].alat;
                $scope.loops.Produk1 = $scope.subdatamaster[1].DetailDokter[3].alat;
                $scope.statusEnabledDetail = $scope.subdatamaster[1].DetailDokter[0].statusEnabled;
                $scope.NorecKassa = $scope.subdatamaster[2].Kassa[0].noRec;
                $scope.statusEnabledKassa = $scope.subdatamaster[2].Kassa[0].statusEnabled;
                });
               }
               }

            $scope.Add = function() {
            debugger;
            $scope.dataJenisKasa.add($scope.current);
            }
             
            $scope.now = new Date();
            $scope.column = [{
                "field": "barang.namaProduk",
                "title": "Jenis Alat"
            }, {
                "field": "HitunganPertama",
                "title": "Hitungan Pertama",
                "width": "150px"
             }, 

            {
                "title": "Penambahan",
                    "columns": [
                    {
                        "field": "penambahan1",
                        "title": "1",
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "penambahan2",
                        "title": "2",
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "penambahan3",
                        "title": "3",
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "penambahan4",
                        "title": "4",
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "penambahan5",
                        "title": "5",
                        "width": 60,
                        filterable: false
                    }, {
                        "field": "penambahan6",
                        "title": "6",
                        "width": 60,
                        filterable: false
                    }]
                },



            {
                "field": "hitunganTotal",
                "title": "Hitungan Total Sebelum menutup luka operasi"
            }, 
            {
                "field": "keterangan2",
                "title": "keterangan"
            }
            ];
            if (cacheHelper !== undefined) {
                $scope.dataJenisKasa = new kendo.data.DataSource({
                    data: cacheHelper.get('Kasa' + $state.params.noRegister)
                });;
            } else
                $scope.dataJenisKasa = new kendo.data.DataSource({
                    data: []
                });

        

            $scope.Save = function() {
            $scope.item.AhliBedah.namaLengkap
                var detailAlatYangDigunakan = [];
                var ProdukLaporanKasa = [];
                for(var i = 0; i<$scope.dataJenisKasa._data.length; i++){
                    var tglSteri= new moment($scope.dataJenisKasa._data[i].tglSteri).format('DD-MM-YYYY');
                    var datax = {
                        produk : {id : $scope.dataJenisKasa._data[i].barang.id},
                        kuantitas : $scope.dataJenisKasa._data[i].hitunganTotal,
                        tambah1 : $scope.dataJenisKasa._data[i].penambahan1,
                        tambah2:  $scope.dataJenisKasa._data[i].penambahan2,
                        tambah3 : $scope.dataJenisKasa._data[i].penambahan3,
                        tambah4:  $scope.dataJenisKasa._data[i].penambahan4,
                        tambah5 : $scope.dataJenisKasa._data[i].penambahan5,
                        tambah6 : $scope.dataJenisKasa._data[i].penambahan6,
                        tambah7 : $scope.dataJenisKasa._data[i].penambahan7,
                        statusEnabled : true,
                        keterngan : $scope.dataJenisKasa._data[i].keterangan2,
                        noRec : $scope.dataJenisKasa._data[i].noRec
                    }
                   detailAlatYangDigunakan.push(datax);
                  }

           //dibuat statis ajaaahhh
           var detailDokterOperasi  =    
                [
                {
                      "ahliBedah" : {id : $scope.item.AhliBedah.id}, 
                      "asisten" : {id : $scope.item.Asisten.id}, 
                      "perawatInstrumen" : {id : $scope.item.PerawatInstrumen.id}, 
                      "perawatSekuler" : {id : $scope.item.PerawatSirkuler.id},
                      "perawatSirkuler" : {id : $scope.item.PerawatSirkuler.id},
                      "kondisiSterilisasi" : $scope.item.KondisiSterilisasi,                         
                      "produk" : {"id" : null},
                      "alat" : $scope.loops.Produk1,
                      "load" : $scope.loops.load1, 
                      "tanggalSteril" : moment($scope.loops.tglSteril1).format('YYYY-MM-DD'), 
                      "statusEnabled" : "true",
                      "noRec" : $scope.Norec1
                },
                {
                      "ahliBedah" : {id : $scope.item.AhliBedah.id}, 
                      "asisten" : {id : $scope.item.Asisten.id}, 
                      "perawatInstrumen" : {id : $scope.item.PerawatInstrumen.id}, 
                      "perawatSekuler" : {id : $scope.item.PerawatSirkuler.id},
                      "perawatSirkuler" : {id : $scope.item.PerawatSirkuler.id},
                      "kondisiSterilisasi" : $scope.item.KondisiSterilisasi,                         
                      "produk" : {"id" : null},
                      "alat" : $scope.loops.Produk2, 
                      "load" : $scope.loops.load2, 
                      "tanggalSteril" : moment($scope.loops.tglSteril2).format('YYYY-MM-DD'), 
                      "statusEnabled" : "true",
                      "noRec" : $scope.Norec2
                },
                {

                      "ahliBedah" : {id : $scope.item.AhliBedah.id}, 
                      "asisten" : {id : $scope.item.Asisten.id}, 
                      "perawatInstrumen" : {id : $scope.item.PerawatInstrumen.id}, 
                      "perawatSekuler" : {id : $scope.item.PerawatSirkuler.id},
                      "perawatSirkuler" : {id : $scope.item.PerawatSirkuler.id},
                      "kondisiSterilisasi" : $scope.item.KondisiSterilisasi,                         
                      "produk" : {"id" : null},
                      "alat" : $scope.loops.Produk3,
                      "load" : $scope.loops.load3,
                      "tanggalSteril" : moment($scope.loops.tglSteril3).format('YYYY-MM-DD'), 
                      "statusEnabled" : "true",
                      "noRec" : $scope.Norec3
                },
                {
                      "ahliBedah" : {id : $scope.item.AhliBedah.id}, 
                      "asisten" : {id : $scope.item.Asisten.id}, 
                      "perawatInstrumen" : {id : $scope.item.PerawatInstrumen.id}, 
                      "perawatSekuler" : {id : $scope.item.PerawatSirkuler.id},
                      "perawatSirkuler" : {id : $scope.item.PerawatSirkuler.id},
                      "kondisiSterilisasi" : $scope.item.KondisiSterilisasi,                         
                      "produk" : {"id" : null},
                      "load" : $scope.loops.load4,
                      "alat" : $scope.loops.Produk4, 
                      "tanggalSteril" : moment($scope.loops.tglSteril4).format('YYYY-MM-DD'), 
                      "statusEnabled" : "true",
                      "noRec" : $scope.Norec4
                }
                ]

              var data = {
                        "pasienDaftar" : {"noRec" : $state.params.noRec},
                        "statusEnabled" : "true",
                        "noRec" : $scope.NorecKassa,
                        "detailAlatYangDigunakan" : detailAlatYangDigunakan,
                        "detailDokterOperasi" :detailDokterOperasi
                         }

                ManagePasien.saveLaporanPerhitunganKasa(data).then(function() {
                $scope.loadGrid();
                })
            }
        }
    ]);
});
