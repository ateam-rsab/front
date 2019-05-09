define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InputResepProduksiOrderCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper) {
            var norecAPD =$state.params.noRec;
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.item.tglresep = $scope.now;
            $scope.riwayatForm = false
            $scope.inputObatOrder = true

            var norec_apd = '';
            var dataProdukDetail=[];
            var noTerima ='';
            var data2 = [];
            var hrg1 = 0
            var hrgsdk = 0
            $scope.item.no = 1
           LoadCache();
           init();
            function LoadCache(){
           }
        function init() {
            $scope.isRouteLoading=true;
            manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo-orderproduksi", true).then(function(dat){
                $scope.isRouteLoading=false;
                $scope.listRuangan = dat.data.ruanganfarmasi;
                $scope.item.ruangan = {id:dat.data.ruanganfarmasi[0].id,namaruangan:dat.data.ruanganfarmasi[0].namaruangan};
                $scope.listProduk = dat.data.produk;
            });
            manageLogistikPhp.getDataTableTransaksi("get-data-login", true).then(function(dat){
                $scope.listPenulisResep = dat.data;
                $scope.item.penulisResep ={id:dat.data[0].id,namalengkap:dat.data[0].namalengkap};
            });
            manageLogistikPhp.getDataTableTransaksi('farmasi/get-order-produksi-steril?norec_apd='+norecAPD).then(function(e) {
                for (var i = e.data.length - 1; i >= 0; i--) {
                    e.data[i].no=i+1
                }
                $scope.dataGridRiwayat = new kendo.data.DataSource({
                    data: e.data
                });


            });

        }

        $scope.getSatuan = function(){
            GETKONVERSI()
        }
        function GETKONVERSI(){
            $scope.listSatuan = $scope.item.produk.konversisatuan
            if ($scope.listSatuan.length == 0) {
                $scope.listSatuan = ([{ssid:$scope.item.produk.ssid,satuanstandar:$scope.item.produk.satuanstandar}])
            }
            $scope.item.satuan = {ssid:$scope.item.produk.ssid,satuanstandar:$scope.item.produk.satuanstandar}
            $scope.item.nilaiKonversi = 1
            if ($scope.item.ruangan == undefined) {
                return;
            }
            // $scope.isRouteLoading=true;
            // manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
            //     "produkfk="+ $scope.item.produk.id +
            //     "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
            //         $scope.isRouteLoading=false;
            //         dataProdukDetail =dat.data.detail;
            //         $scope.item.stok =dat.data.jmlstok / $scope.item.nilaiKonversi 

            //         $scope.item.dosis =$scope.dataSelected.dosis
            //         $scope.item.jumlahxmakan =parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.item.dosis)

            //         $scope.item.nilaiKonversi = $scope.dataSelected.nilaikonversi
            //         $scope.item.stok = $scope.dataSelected.jmlstok 
            //         $scope.item.jumlah = $scope.dataSelected.jumlah
            //         $scope.item.hargaSatuan = $scope.dataSelected.hargasatuan
            //         $scope.item.hargadiskon = $scope.dataSelected.hargadiscount
            //         $scope.item.total = $scope.dataSelected.total
            // });
        }
        $scope.getNilaiKonversi = function(){
            $scope.item.nilaiKonversi =  $scope.item.satuan.nilaikonversi
        }
        $scope.$watch('item.nilaiKonversi', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                if ($scope.item.stok > 0) {
                    $scope.item.stok =parseFloat($scope.item.stok) * (parseFloat(oldValue)/ parseFloat(newValue))
                    $scope.item.jumlah =0
                    $scope.item.hargaSatuan =0
                    $scope.item.hargadiskon =0
                    $scope.item.total =0
                }
            }
        });

        // $scope.$watch('item.jumlahxmakan', function(newValue, oldValue) {
        //     if (newValue != oldValue  ) {
        //         if ($scope.item.stok > 0) {
        //             $scope.item.jumlah = parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)
        //         }
        //     }
        // });
        // $scope.$watch('item.dosis', function(newValue, oldValue) {
        //     if (newValue != oldValue  ) {
        //         if ($scope.item.stok > 0) {
        //             $scope.item.jumlah = parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)
        //         }
        //     }
        // });
        // $scope.$watch('item.jenisKemasan.jeniskemasan', function(newValue, oldValue) {
        //     if (newValue != oldValue  ) {
        //         if (newValue == 'Racikan') {
        //            $scope.showRacikanDose = true
        //         }else{
        //            $scope.showRacikanDose = false
        //         }
        //     }
        // });
        // $scope.$watch('item.jumlah', function(newValue, oldValue) {
        //     if (newValue != oldValue  ) {

        //         if ($scope.item.stok == 0 ) {
        //             $scope.item.jumlah = 0

        //             return;
        //         }
        //         var ada = false;
        //         for (var i = 0; i < dataProdukDetail.length; i++) {
        //             ada = false
        //             if (parseFloat($scope.item.jumlah * parseFloat($scope.item.nilaiKonversi) ) <= parseFloat(dataProdukDetail[i].qtyproduk) ){
        //                 hrg1 = parseFloat(dataProdukDetail[i].hargajual)* parseFloat($scope.item.nilaiKonversi)
        //                 hrgsdk = parseFloat(dataProdukDetail[i].hargadiscount) * parseFloat($scope.item.nilaiKonversi)
        //                 $scope.item.hargaSatuan = hrg1 
        //                 $scope.item.hargadiskon = hrgsdk 
        //                 $scope.item.total = parseFloat($scope.item.jumlah) * (hrg1-hrgsdk)
        //                 noTerima = dataProdukDetail[i].norec
        //                 ada=true;
        //                 break;
        //             }
        //         }
        //         if (ada == false) {
        //             $scope.item.hargaSatuan = 0
        //             $scope.item.hargadiskon =0
        //             $scope.item.total = 0
                    
        //             noTerima = ''
        //         }
        //         if ($scope.item.jumlah == 0) {
        //             $scope.item.hargaSatuan = 0
        //         }
        //     }
        // });

        $scope.$watch('item.rke', function(newValue, oldValue) {
            $scope.item.no=1
            for (var i = data2.length - 1; i >= 0; i--) {
                if (data2[i].rke == $scope.item.rke) {
                    $scope.item.no = data[i].details.length +1
                }
                
            }
        })
        $scope.hapus1 = function(){
                if ($scope.item.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                if ($scope.item.total == 0) {
                    alert("Stok tidak ada harus di isi!")
                    return;
                }
                if ($scope.item.jenisKemasan == undefined) {
                    alert("Pilih Jenis Kemasan terlebih dahulu!!")
                    return;
                }
                if ($scope.item.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.item.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                var data ={};
                if ($scope.item.no != undefined){
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no ==  $scope.item.no){                            

                            data2.splice(i, 1);

                            var subTotal = 0 ;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal=subTotal+ parseFloat(data2[i].total)
                                data2[i].no = i+1
                            }
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        }
                    }

                }
                Kosongkan()
            }
        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.tambah = function () {
            if ($scope.item.jumlah == undefined) {
                alert("Jumlah harus di isi!")
                return;
            }
            if ($scope.item.volume == undefined) {
                alert("Volume harus di isi!")
                return;
            }
            if ($scope.item.keterangan == undefined) {
                alert("Keterangan harus di isi!")
                return;
            }
            if ($scope.item.produk == undefined) {
                alert("Pilih Produk terlebih dahulu!!")
                return;
            }
            if ($scope.item.satuan == undefined) {
                alert("Pilih Satuan terlebih dahulu!!")
                return;
            }
            if ($scope.item.dosis == undefined) {
                alert("Isi Dosis terlebih dahulu!!")
                return;
            }
            // var nomor =0
            // if ($scope.dataGrid == undefined) {
            //     nomor = 1
            // }else{
            //     nomor = data2.length+1
            // }

            var data = {};
            var detail = {};

            // var details = {};
             detail={           
                    no : parseFloat($scope.item.no),         
                    produkfk : $scope.item.produk.id,
                    namaproduk : $scope.item.produk.namaproduk,
                    satuanstandarfk : $scope.item.satuan.ssid,
                    satuanstandar : $scope.item.satuan.satuanstandar,
                    satuanviewfk : $scope.item.satuan.ssid,
                    satuanview : $scope.item.satuan.satuanstandar,
                    dosis : $scope.item.dosis
                }

             data={
                    rke : $scope.item.rke,
                    ruanganfk : $scope.item.ruangan.id,
                    volume : $scope.item.volume,
                    jumlah : $scope.item.jumlah,
                    keterangan : $scope.item.keterangan,
                    details : [detail]
                }
            var stt=false
            for (var i = data2.length - 1; i >= 0; i--) {
                if (data.rke == data2[i].rke) {
                    stt=true
                    // details.push(data2[i].details)
                    // details.push(detail)
                    data2[i].details.push(detail)
                    break
                }else{
                    stt=false
                }
            }
            if (stt==false) {
                data2.push(data)
            }
            $scope.dataGrid = new kendo.data.DataSource({
                data: data2
            });

             Kosongkan()
        }

        $scope.klikGrid = function(dataSelected){
            // var dataProduk =[];
            // //no:no,
            // $scope.item.no = dataSelected.no
            // $scope.item.rke = dataSelected.rke
            // $scope.item.jenisKemasan = {id:dataSelected.jeniskemasanfk,jeniskemasan:dataSelected.jeniskemasan}
            // $scope.item.aturanPakai = {id:dataSelected.aturanpakaifk,name:dataSelected.aturanpakai}
            // $scope.item.route = {id:dataSelected.routefk,name:dataSelected.route}
            // $scope.item.asal = {id:dataSelected.asalprodukfk,asalproduk:dataSelected.asalproduk}
            // for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
            //     if ($scope.listProduk[i].id == dataSelected.produkfk){
            //         dataProduk = $scope.listProduk[i]
            //         break;
            //     }
            // }
            // $scope.item.produk = dataProduk
            // GETKONVERSI()
            
        }
        function Kosongkan(){
            $scope.item.produk =''
            $scope.item.satuan=''
            // $scope.item.nilaiKonversi=0
            // $scope.item.stok=0
            // $scope.item.jumlah=0
            // $scope.item.hargadiskon=0
            $scope.item.no=parseFloat($scope.item.no)+1
            // $scope.item.total=0
            // $scope.item.hargaSatuan=0
        }
        $scope.batal = function(){
            Kosongkan()
        }

        $scope.columnGrid = [
        {
            "field": "rke",
            "title": "R/ke",
            "width" : "30px",
        },
        {
            "field": "volume",
            "title": "Volume",
            "width" : "70px",
        },
        {
            "field": "jumlah",
            "title": "Jumlah",
            "width" : "70px",
        },
        {
            "field": "keterangan",
            "title": "Keterangan",
            "width" : "250px"
        }
        ];
        $scope.data2 = function(dataItem) {
            return {
                dataSource: new kendo.data.DataSource({
                    data: dataItem.details
                }),
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        "width" : "50px",
                    },
                    {
                        "field": "namaproduk",
                        "title": "Nama Obat",
                        "width" : "150px",
                    },
                    {
                        "field": "dosis",
                        "title": "Dosis",
                        "width" : "50px"
                    },
                    {
                        "field": "satuanview",
                        "title": "Satuan",
                        "width" : "50px"
                    }
                ]
            }
        };  

        $scope.columnGridRiwayat = [
            {
                "field": "no",
                "title": "No",
                "width" : "20px",
            },
            {
                "field": "tglorder",
                "title": "Tgl Order",
                "width" : "50px",
            },
            {
                "field": "noorder",
                "title": "No Order",
                "width" : "60px",
            },
            {
                "field": "namalengkap",
                "title": "Dokter",
                "width" : "100px"
            },
            {
                "field": "namaruangan",
                "title": "Apotik",
                "width" : "70px",
            },
            {
                "field": "statusorder",
                "title": "Status",
                "width" : "70px",
            }
        ];
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.kembali=function(){
                window.history.back();
            }

            $scope.simpan = function(){
                if ($scope.item.resep != undefined) {
                    alert("Sudah Tersimpan")
                    return
                }
                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
                }
                var strukorder = {
                            tglresep: moment($scope.item.tglAwal).format('YYYY-MM-DD hh:mm:ss'),
                            penulisresepfk: $scope.item.penulisResep.id,
                            ruanganfk: $scope.item.ruangan.id,
                            noregistrasifk: norecAPD,
                            qtyproduk:$scope.dataGrid._data.length
                        }
                var objSave = [
                    {
                        strukorder:strukorder,
                        orderfarmasi:data2
                    }
                ]
                manageLogistikPhp.postorderproduksiobat(objSave).then(function(e) {
                    $scope.item.resep = e.data.noresep.noorder
                })
                
            }
            $scope.riwayat = function(){
                $scope.riwayatForm =true
                $scope.inputObatOrder = false;
            }
            $scope.newOrder = function(){
                $scope.riwayatForm =false
                $scope.inputObatOrder = true;
            }

//***********************************

}
]);
});

