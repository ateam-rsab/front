define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AnggaranBiayaPemasaranCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm',  'DateHelper','$mdDialog', '$state',
        function($rootScope, $scope, ModelItem, ManageSdm, DateHelper,$mdDialog,$state) {
            $scope.item = {};
            $scope.now = new Date();
             $scope.dataVOloaded = false;

             
             ManageSdm.getItem("historiPelayananCs/get-load-histori-pelayanan?ruanganId=1", true).then(function(dat){
                $scope.item.noHistori = dat.data.data.noHistori;
            
            });

             ManageSdm.getItem("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
                $scope.ListDataPegawai = dat.data.data.data;
            });

              ManageSdm.getItem("planningdiklathumasmarket/get-list-noplanning",true).then(function(dat){
                debugger;
               $scope.ListDataNoPlanning = dat.data.data.data;
               $scope.loadGrid();
               });

               ManageSdm.getItem("planningdiklathumasmarketbiaya/get-produk-byharga",true).then(function(dat){
               $scope.ListProdukHarga = dat.data.data.data;
               });

                ManageSdm.getItem("/planningdiklathumasmarketbiaya/get-produk-asal",true).then(function(dat){
               debugger;
               $scope.ListProdukAsal = dat.data.data.data;
               });



            
             $scope.loadGrid = function () {
            
                $scope.NoPlanning = $scope.item.noPlanning.noPlanning;
                 ManageSdm.getItem("planningdiklathumasmarketbiaya/get-list-bynoplanning?noPlanning="+$scope.NoPlanning, true).then(function(dat){
                $scope.dataMaster = dat.data.data.data;
                ManageSdm.getItem("/planningdiklathumasmarketpeserta/get-list-all-produkdkm-bynoplanning?noPlanning="+$scope.NoPlanning, true).then(function(dat){
                $scope.ListProduk = dat.data.data.data;
              
                });
                $scope.dataSource = new kendo.data.DataSource({
                pageSize: 50,
                data : $scope.dataMaster,
                autoSync: true,
                    });
                });
            }



             $scope.loadharga = function () {
        
               $scope.item.HargaSatuan = $scope.item.Produk.hargaNetto1;
               
            }


        ManageSdm.getItem("sdm/get-login-user-permohonan-status", true).then(function(dat){
            $scope.ruanganId = dat.data.data.idRuangan;
            /*load();*/
            $scope.loadGrid();
        });
                

                $scope.TES = function (){
                debugger;
                $scope.NoPlanning = $scope.item.noPlanning.noPlanning;
                

                }
     


            $scope.cutiHabis = false;
            $scope.dataVOloaded = true;
            $scope.disJumlahCuti = true;
            $scope.hideJumlahCuti = false;
            $scope.showJumlahCuti = function () {
                if ($scope.item.statusPegawai.id == 1) {
                    $scope.hideJumlahCuti = true;
                    $scope.getCuti();
                    
                } else {
                    $scope.hideJumlahCuti = false;
                }
            }

            ManageSdm.getItem("service/list-generic/?view=Komunikasi&select=*", true).then(function(dat){
                    $scope.listKomunikasi = dat.komunikasi;
                    
                });
       
            $scope.listDataJenisKelamin = [

             {
             "id":1, "JK":"Laki-laki"
             },
             {
              "id":2, "JK":"Perempuan"
             }

             ]
            
            $scope.dataSource = new kendo.data.DataSource({
                pageSize: 10,
                data: $scope.listDataMaster,
                autoSync: true,
                scrollable : true
            });
            
             $scope.mainGridOptions = {
              editable: "popup",
                pageable: true,
                scrollable: true,
                height: 300,
                selectable: "row",
                columns: $scope.columnPermohonanPerubahanStatus,
                
               
            };

            $scope.columnPermohonanPerubahanStatus = [
                    
               {
                    "field": "noPlanning",
                    "title": "No Planning",
                    "width": "120px"
                }, {
                    "field": "tglPlanning",
                    "title": "Tanggal planning",
                    "width": "120px",
                    "template": "#= new moment(new Date(tglPlanning)).format('DD-MM-YYYY') #",
                },
                {
                    "field": "namaProdukbyKelas",
                    "title": "Produk",
                    "width": "120px"
                },
                {
                    "field": "asalProduk",
                    "title": "Asal Produk",
                    "width": "150px",
                
                },
                {
                    "field": "qtyProduk",
                    "title": "Jumlah Produk",
                    "width": "150px",
                
                },
                {
                    "field": "hargaSatuan",
                    "title": "Harga Satuan",
                    "width": "150px",
                
                },
                {
                    "field": "persenDiskon",
                    "title": "Persent discount",
                    "width": "150px",
                
                },
                {
                    "field": "hargaDiskon",
                    "title": "Harga discount",
                    "width": "150px",
                
                },
                {
                    "field": "hargaPPH",
                    "title": "Harga PPH",
                    "width": "150px",
                
                },
                {
                    "field": "hargaPPN",
                    "title": "Harga PPN",
                    "width": "150px",
                
                },
                {
                    "field": "hargaTambahan",
                    "title": "Harga Tambahan",
                    "width": "150px",
                
                },
                {
                    "field": "isInOut",
                    "title": "Is In Out ",
                    "width": "150px",
                     "template": "<span class='style-right'>{{pelayanans('#: isInOut #')}}</span>",
                
                },
                {
                    "field": "deskirpsiDetailProduk",
                    "title": "Deskripsi Detail produk",
                    "width": "150px",
                
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan Lainnya",
                    "width": "150px",
                
                }

                    ];
            $scope.statusBarang = [
                    {
                        "id": 0,
                        "name": "Belum Dikirim"
                    },
                    {
                        "id": 1,
                        "name": "Sudah Diterima"
                    }
            ]


            $scope.citoo = function(values){
            var data=values;
            if (data==1){
                return 'TRUE'
             }   
            else {
                return 'FALSE'
             }
           }


           $scope.pelayanans = function(values){
            var data=values;
            if (data==1){
                return 'IN'
             }   
            else {
                return 'OUT'
             }
           }
  


            $scope.alertTgl = function(ev) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(false)
                    .title('Peringatan')
                    .textContent('Jumlah hari yang anda pilih melebihi sisa cuti')
                    .ariaLabel('Alert Tgl')
                    .ok('OK')
                    .targetEvent(ev)
                    );
            };


            var days = function(date1, date2) {
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                var _days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var days = [];
                for (var i = 0; i < diff; i++) {
                    date1.setDate(date1.getDate() + i);
                    days.push(_days[date1.getDay()]);
                }
                return days;
            };

            var removeA = function (arr) {
                var what, a = arguments, L = a.length, ax;
                while (L > 1 && arr.length) {
                    what = a[--L];
                    while ((ax= arr.indexOf(what)) !== -1) {
                        arr.splice(ax, 1);
                    }
                }
                return arr;
            }


            $scope.dataUser = new kendo.data.DataSource({
                data: $scope.dataMaster,
            });

            
            $scope.isShowPopUp = false;
            $scope.dataSelected = {};




       
            var aktif = false;
            var aktif = 0;
            $scope.check = function () {
                debugger;   
                if (aktif)
                    aktif = 0;

                else
                    aktif = 1;      
            
            }

            $scope.klik = function(dataSelected){
                 debugger;

                $scope.showEdit = true;
                $scope.dataSelected = dataSelected;
                $scope.item.noRec = dataSelected.noRec;
                $scope.item.noCm = dataSelected.noCm;
                $scope.item.alamat = dataSelected.alamatCustomer;
                $scope.item.deskripsi = dataSelected.deskripsi
                          
            };

             $scope.rencana = function(dataSelected){
                debugger;
                $state.go("Planning",
                    {
                        noRec:$scope.item.noRec
                    })
            }

            $scope.reset = function(){

             $scope.item.noPlanning = "";
             $scope.item.TglPlanning = "";
             $scope.item.Produk = "";
             $scope.item.AsalProduk = "";
             $scope.item.JumlahProduk = "";
             $scope.item.HargaSatuan = "";
             $scope.item.PersentDiscount = "";
             $scope.item.HargaDiscount = "";
             $scope.item.HargaPPN = "";
             $scope.item.HargaPPH = "";
             $scope.item.HargaTambahan = "";
             $scope.item.pelayanan.id = "";
             $scope.item.DeskripsiDetailProduk = "";
             $scope.item.keterangan = "";

            }

           $scope.Save = function () {
            debugger;
            var listRawRequired = [
                    "item.noPlanning|K-ng-model|No Planning",
                    "item.namaLengkap|k-ng-model|Pegawai",
                    "item.produkDHM|k-ng-model|Kode Produk DHM",
                    "item.TglPlanning|k-ng-model|Tanggal Planning",
                    "item.Produk|k-ng-model|Produk",
                    "item.AsalProduk|k-ng-model|Asal Produk",
                    "item.JumlahProduk|ng-model|Jumlah Produk",
                    "item.HargaSatuan|ng-model|Harga Satuan",
                    "item.PersentDiscount|ng-model|Persent Discount",
                    "item.HargaDiscount|ng-model|Harga Discount",
                    "item.HargaPPN|ng-model|Harga PPN",
                    "item.HargaPPH|ng-model|Harga PPH",
                    "item.HargaTambahan|ng-model|Harga Tambahan",
                    "item.DeskripsiDetailProduk|ng-model|Deskripsi Detail Produk",
                    "item.keterangan|ng-model|Keterangan"

                                  ];

        var isValid = ModelItem.setValidation($scope, listRawRequired);    
           
           
            var data = {
                        "pegawai" : {"id" : $scope.item.namaLengkap.idpegawai},
                        "tglPlanning" : $scope.item.TglPlanning,
                        "asalProduk" : {"id" : $scope.item.AsalProduk.produkAsalId},
                        "produkKelas" : {"id" : $scope.item.Produk.idProdukByClass},
                        "qtyProduk" : $scope.item.JumlahProduk,
                        "hargaSatuan" : $scope.item.HargaSatuan,
                        "persenDiskon" : $scope.item.PersentDiscount,
                        "hargaDiskon" : $scope.item.HargaDiscount,
                        "hargaPPN" : $scope.item.HargaPPN,
                        "hargaPPH" : $scope.item.HargaPPH,
                        "hargaTambahan" : $scope.item.HargaTambahan,
                        "deskripsiDetailProduk" : $scope.item.DeskripsiDetailProduk,
                        "keterangan" : $scope.item.keterangan,
                        "isInOut" : $scope.item.pelayanan.id,
                        "kdProdukDHM" : $scope.item.produkDHM.produkDHM,
                        "noPlanning" : $scope.item.noPlanning.noPlanning
                   
                    }


            ManageSdm.saveData(data,"planningdiklathumasmarketbiaya/save-planning-dhm-biaya").then(function(e) {
                console.log(JSON.stringify(e.data));
                $scope.loadGrid();
            });

            }
            }
        ]);
});