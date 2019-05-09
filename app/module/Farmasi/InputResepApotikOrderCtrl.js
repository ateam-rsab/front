define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('InputResepApotikOrderCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper) {
            var norecAPD =$state.params.noRec;
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.item.tglresep = $scope.now;
            $scope.item.tglresepAkhir = $scope.now;
            $scope.riwayatForm = false
            $scope.inputObatOrder = true

            var norec_apd = '';
            var dataProdukDetail=[];
            var noTerima ='';
            var data2 = [];
            var hrg1 = 0
            var hrgsdk = 0
            var diffDays=1

            var date1 = new Date($scope.item.tglresep);
            var date2 = new Date($scope.item.tglresepAkhir);
            diffDays = date2.getDate() - date1.getDate(); 
            diffDays =  diffDays + 1
            $scope.kAngka=diffDays

            

            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
           LoadCache();
           init();
            function LoadCache(){
               //  var chacePeriode = cacheHelper.get('InputResepApotikOrderCtrl');
               //  if(chacePeriode != undefined){
               //     //var arrPeriode = chacePeriode.split(':');
               //     $scope.item.nocm = chacePeriode[0]
               //     $scope.item.namaPasien = chacePeriode[1]
               //     $scope.item.jenisKelamin = chacePeriode[2]
               //     $scope.item.noRegistrasi = chacePeriode[3]

               //     $scope.item.umur = chacePeriode[4]

               //     $scope.listKelas =([{id:chacePeriode[5],namakelas:chacePeriode[6]}]) 
               //     $scope.item.kelas ={id:chacePeriode[5],namakelas:chacePeriode[6]} 
               //     $scope.item.tglregistrasi = chacePeriode[7]
               //     norec_apd = chacePeriode[8]

               //     $scope.item.tglAwal =  new Date($scope.now);
               //     $scope.item.resep = '-';

               //     init()
               // }else{
                 
               // }
           }
        function init() {
            // debugger;
            $scope.isRouteLoading=true;
            manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo", true).then(function(dat){
                $scope.isRouteLoading=false;
                // $scope.listPenulisResep = dat.data.penulisresep;
                $scope.listRuangan = dat.data.ruanganfarmasi;
                $scope.listJenisKemasan = dat.data.jeniskemasan;
                $scope.listProduk = dat.data.produk;
                $scope.listAsalProduk = dat.data.asalproduk;
                $scope.listRoute = dat.data.route;
                $scope.listAturanPakai = dat.data.signa;
                $scope.listJenisRacikan = dat.data.jenisracikan;
            });
            manageLogistikPhp.getDataTableTransaksi("get-data-login", true).then(function(dat){
                $scope.listPenulisResep = dat.data;
                $scope.item.penulisResep ={id:dat.data[0].id,namalengkap:dat.data[0].namalengkap};
            });
            manageLogistikPhp.getDataTableTransaksi('logistik/get-daftar-order?norec_apd='+norecAPD).then(function(e) {
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
            $scope.item.nilaiKonversi = 1// $scope.item.satuan.nilaikonversi
            if ($scope.item.ruangan == undefined) {
                //alert("Pilih Ruangan terlebih dahulu!!")
                return;
            }
            // if ($scope.item.asal == undefined) {
            //     //alert("Pilih asal terlebih dahulu!!")
            //     return;
            // }
            $scope.isRouteLoading=true;
            manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
                    $scope.isRouteLoading=false;
                    dataProdukDetail =dat.data.detail;
                    $scope.item.stok =dat.data.jmlstok / $scope.item.nilaiKonversi 

                    $scope.item.dosis =$scope.dataSelected.dosis
                    $scope.item.jumlahxmakan =parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.item.dosis)

                    $scope.item.nilaiKonversi = $scope.dataSelected.nilaikonversi
                    // $scope.item.satuan = {ssid:$scope.dataSelected.satuanstandarfk,satuanstandar:$scope.dataSelected.satuanstandar}
                    $scope.item.stok = $scope.dataSelected.jmlstok //* $scope.item.nilaiKonversi 
                    $scope.item.jumlah = $scope.dataSelected.jumlah
                    $scope.item.hargaSatuan = $scope.dataSelected.hargasatuan
                    $scope.item.hargadiskon = $scope.dataSelected.hargadiscount
                    $scope.item.total = $scope.dataSelected.total
            });
        }
        $scope.getNilaiKonversi = function(){
            $scope.item.nilaiKonversi =  $scope.item.satuan.nilaikonversi
        }
        $scope.$watch('item.nilaiKonversi', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                if ($scope.item.stok > 0) {
                    $scope.item.stok =parseFloat($scope.item.stok) * (parseFloat(oldValue)/ parseFloat(newValue))
                    $scope.item.jumlah =0//parseFloat($scope.item.jumlah) / parseFloat(newValue)
                    $scope.item.hargaSatuan =0//hrg1 * parseFloat(newValue)
                    $scope.item.hargadiskon =0//hrgsdk * parseFloat(newValue)
                    $scope.item.total =0// parseFloat(newValue) * 
                           // (hrg1-hrgsdk)
                }
            }
        });
        $scope.$watch('item.tglresepAkhir', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                var date1 = new Date($scope.item.tglresep);
                var date2 = new Date($scope.item.tglresepAkhir);
                diffDays = date2.getDate() - date1.getDate(); 
                diffDays =  diffDays + 1
                $scope.kAngka=diffDays
            }
        });
        $scope.$watch('item.jumlahxmakan', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                if ($scope.item.stok > 0) {
                    $scope.item.jumlah = parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)
                }
            }
        });
        $scope.$watch('item.dosis', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                if ($scope.item.stok > 0) {
                    $scope.item.jumlah = parseFloat($scope.item.jumlahxmakan) * parseFloat($scope.item.dosis)
                }
            }
        });
        $scope.$watch('item.jenisKemasan.jeniskemasan', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                if (newValue == 'Racikan') {
                   $scope.showRacikanDose = true
                }else{
                   $scope.showRacikanDose = false
                }
            }
        });
        $scope.$watch('item.jumlah', function(newValue, oldValue) {
            if (newValue != oldValue  ) {

                if ($scope.item.stok == 0 ) {
                    $scope.item.jumlah = 0
                    //alert('Stok kosong')

                    return;
                }
                // var tarifJasa = 0
                // var qty20 = 0
                // if ($scope.item.jenisKemasan.id == 2) {
                //     tarifJasa = 800
                // }
                // if ($scope.item.jenisKemasan.id == 1) {
                //     qty20 = Math.floor(parseFloat($scope.item.jumlah)/20)
                //     if (parseFloat($scope.item.jumlah) % 20 == 0) {
                //         qty20 = qty20 
                //     }else{
                //         qty20 = qty20 + 1
                //     }
                    
                //     tarifJasa = 800 * qty20
                // }

                var ada = false;
                for (var i = 0; i < dataProdukDetail.length; i++) {
                    ada = false
                    if (parseFloat($scope.item.jumlah * parseFloat($scope.item.nilaiKonversi) ) <= parseFloat(dataProdukDetail[i].qtyproduk) ){
                        hrg1 = Math.round(parseFloat(dataProdukDetail[i].hargajual)* parseFloat($scope.item.nilaiKonversi))
                        hrgsdk = parseFloat(dataProdukDetail[i].hargadiscount) * parseFloat($scope.item.nilaiKonversi)
                        $scope.item.hargaSatuan = hrg1 
                        $scope.item.hargadiskon = hrgsdk 
                        $scope.item.total =(parseFloat($scope.item.jumlah) * (hrg1-hrgsdk))//+tarifJasa
                        noTerima = dataProdukDetail[i].norec
                        ada=true;
                        break;
                    }
                }
                if (ada == false) {
                    $scope.item.hargaSatuan = 0
                    $scope.item.hargadiskon =0
                    $scope.item.total = 0
                    
                    noTerima = ''
                }
                if ($scope.item.jumlah == 0) {
                    $scope.item.hargaSatuan = 0
                }
                // if ($scope.item.stok > 0) {
                //     $scope.item.stok =parseFloat($scope.item.stok) * (parseFloat(oldValue)/ parseFloat(newValue))
                // }
            }
        });
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
                // if ($scope.item.asal == undefined) {
                //     alert("Pilih Asal Produk terlebih dahulu!!")
                //     return;
                // }
                if ($scope.item.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.item.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                // var nomor =0
                // if ($scope.dataGrid == undefined) {
                //     nomor = 1
                // }else{
                //     nomor = data2.length+1
                // }
                var data ={};
                if ($scope.item.no != undefined){
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no ==  $scope.item.no){                            

                            //data2[i] = data;
                            // delete data2[i]
                            data2.splice(i, 1);

                            var subTotal = 0 ;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal=subTotal+ parseFloat(data2[i].total)
                                data2[i].no = i+1
                            }
                            // data2.length = data2.length -1
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            // for (var i = data2.length - 1; i >= 0; i--) {
                            //     subTotal=subTotal+ parseFloat(data2[i].total)
                            // }
                            $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        }
                        // break;
                    }

                }
                Kosongkan()
            }
        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.tambah = function () {
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
            // if ($scope.item.asal == undefined) {
            //     alert("Pilih Asal Produk terlebih dahulu!!")
            //     return;
            // }
            var dosis =1;
            if ($scope.item.jenisKemasan.jeniskemasan == 'Racikan') {
                dosis = $scope.item.dosis
            }
            if ($scope.item.produk == undefined) {
                alert("Pilih Produk terlebih dahulu!!")
                return;
            }
            if ($scope.item.satuan == undefined) {
                alert("Pilih Satuan terlebih dahulu!!")
                return;
            }
            var nomor =0
            if ($scope.dataGrid == undefined) {
                nomor = 1
            }else{
                nomor = data2.length+1
            }
            var data = {};
            if ($scope.item.no != undefined){
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no ==  $scope.item.no){
                        data.no = $scope.item.no

                        data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
                        //data.tglregistrasi = $scope.item.tglregistrasi
                        data.generik = null
                        data.hargajual = $scope.item.hargaSatuan
                        data.jenisobatfk = null
                        //data.kelasfk = $scope.item.kelas.id
                        data.stock = $scope.item.stok
                        data.harganetto = $scope.item.hargaSatuan
                        data.nostrukterimafk = noTerima
                        data.ruanganfk = $scope.item.ruangan.id

                        data.rke = $scope.item.rke
                        data.jeniskemasanfk = $scope.item.jenisKemasan.id
                        data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
                        data.aturanpakaifk = $scope.item.aturanPakai.id
                        data.aturanpakai = $scope.item.aturanPakai.name
                        data.routefk = $scope.item.route.id
                        data.route = $scope.item.route.name
                        data.asalprodukfk = 0//$scope.item.asal.id
                        data.asalproduk = ''//$scope.item.asal.asalproduk
                        data.produkfk = $scope.item.produk.id
                        data.namaproduk = $scope.item.produk.namaproduk
                        data.nilaikonversi = $scope.item.nilaiKonversi
                        data.satuanstandarfk = $scope.item.satuan.ssid
                        data.satuanstandar = $scope.item.satuan.satuanstandar
                        data.satuanviewfk = $scope.item.satuan.ssid
                        data.satuanview = $scope.item.satuan.satuanstandar
                        data.jmlstok = $scope.item.stok
                        data.jumlah = $scope.item.jumlah
                        data.dosis = dosis
                        data.hargasatuan = $scope.item.hargaSatuan
                        data.hargadiscount = $scope.item.hargadiskon
                        data.total = $scope.item.total
                        data.jmldosis = String(($scope.item.jumlah)/dosis) + '/' + String(dosis)

                        data2[i] = data;
                        $scope.dataGrid = new kendo.data.DataSource({
                            data: data2
                        });

                    }
                }

            }else{
                data={
                        no:nomor,
                        generik:null,
                        hargajual:$scope.item.hargaSatuan,
                        jenisobatfk:null,
                        //kelasfk:$scope.item.kelas.id,
                        stock:$scope.item.stok,
                        harganetto:$scope.item.hargaSatuan,
                        nostrukterimafk:noTerima,
                        ruanganfk:$scope.item.ruangan.id,//£££
                        rke:$scope.item.rke,
                        jeniskemasanfk:$scope.item.jenisKemasan.id,
                        jeniskemasan:$scope.item.jenisKemasan.jeniskemasan,
                        aturanpakaifk:$scope.item.aturanPakai.id,
                        aturanpakai:$scope.item.aturanPakai.name,
                        routefk:$scope.item.route.id,
                        route:$scope.item.route.name,
                        asalprodukfk:0,//$scope.item.asal.id,
                        asalproduk:'',//$scope.item.asal.asalproduk,
                        produkfk:$scope.item.produk.id,
                        namaproduk:$scope.item.produk.namaproduk,
                        nilaikonversi:$scope.item.nilaiKonversi,
                        satuanstandarfk:$scope.item.satuan.ssid,
                        satuanstandar:$scope.item.satuan.satuanstandar,
                        satuanviewfk:$scope.item.satuan.ssid,
                        satuanview:$scope.item.satuan.satuanstandar,
                        jmlstok:$scope.item.stok,
                        jumlah:$scope.item.jumlah,
                        dosis:dosis,
                        hargasatuan:$scope.item.hargaSatuan,
                        hargadiscount:$scope.item.hargadiskon,
                        total:$scope.item.total,
                        jmldosis:String(($scope.item.jumlah)/dosis) + '/' + String(dosis)
                    }
                data2.push(data)
                // $scope.dataGrid.add($scope.dataSelected)
                $scope.dataGrid = new kendo.data.DataSource({
                    data: data2
                });
                var subTotal = 0 ;
                for (var i = data2.length - 1; i >= 0; i--) {
                    subTotal=subTotal+ parseFloat(data2[i].total)
                }
                $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            }
             Kosongkan()
        }

        $scope.klikGrid = function(dataSelected){
            var dataProduk =[];
            //no:no,
            $scope.item.no = dataSelected.no
            $scope.item.rke = dataSelected.rke
            $scope.item.jenisKemasan = {id:dataSelected.jeniskemasanfk,jeniskemasan:dataSelected.jeniskemasan}
            $scope.item.aturanPakai = {id:dataSelected.aturanpakaifk,name:dataSelected.aturanpakai}
            $scope.item.route = {id:dataSelected.routefk,name:dataSelected.route}
            $scope.item.asal = {id:dataSelected.asalprodukfk,asalproduk:dataSelected.asalproduk}
            for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                if ($scope.listProduk[i].id == dataSelected.produkfk){
                    dataProduk = $scope.listProduk[i]
                    break;
                }
            }
            $scope.item.produk = dataProduk//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
            GETKONVERSI()
            
        }
        function Kosongkan(){
            $scope.item.produk =''
            $scope.item.satuan=''
            $scope.item.nilaiKonversi=0
            $scope.item.stok=0
            $scope.item.jumlah=0
            $scope.item.hargadiskon=0
            $scope.item.no=undefined
            $scope.item.total=0
            $scope.item.hargaSatuan=0
        }
        $scope.batal = function(){
            Kosongkan()
        }

        $scope.columnGrid = [
        {
            "field": "no",
            "title": "No",
            "width" : "30px",
        },
        {
            "field": "rke",
            "title": "R/ke",
            "width" : "40px",
        },
        {
            "field": "jeniskemasan",
            "title": "Kemasan",
            "width" : "70px",
        },
        {
            "field": "aturanpakai",
            "title": "Aturan Pakai",
            "width" : "100px",
        },
        {
            "field": "jmldosis",
            "title": "Jml/Dosis",
            "width" : "70px",
        },
        {
            "field": "namaproduk",
            "title": "Deskripsi",
            "width" : "200px",
        },
        {
            "field": "satuanstandar",
            "title": "Satuan",
            "width" : "80px",
        },
        {
            "field": "jumlah",
            "title": "Qty",
            "width" : "70px",
        },
        {
            "field": "hargasatuan",
            "title": "Harga Satuan",
            "width" : "100px",
            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
        },
        {
            "field": "hargadiscount",
            "title": "Harga Discount",
            "width" : "100px",
            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
        },
        {
            "field": "total",
            "title": "Total",
            "width" : "100px",
            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
        }
        ];
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
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }

            $scope.simpan = function(){
                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return
                } 
                if (diffDays < 1) {
                    alert("Tanggal Akhir tidak boleh lebih kecil!!")
                    return
                }

                var tglResepHari =''
                for (var i = diffDays - 1; i >= 0; i--) {
                    var someDate = moment($scope.item.tglresep).toDate();//new Date(moment($scope.item.tglresep).format('YYYY-MM-DD hh:mm:ss'));
                    var numberOfDaysToAdd = i;
                    tglResepHari = moment(someDate.setDate(someDate.getDate() + numberOfDaysToAdd)).format('YYYY-MM-DD hh:mm:ss'); 
                
                    var strukorder = {
                                tglresep: tglResepHari,//moment($scope.item.tglAwal).format('YYYY-MM-DD hh:mm:ss'),
                                penulisresepfk: $scope.item.penulisResep.id,
                                ruanganfk: $scope.item.ruangan.id,
                                noregistrasifk: norecAPD,
                                qtyproduk: $scope.dataGrid._data.length
                            }
                    var objSave = [
                        {
                            strukorder:strukorder,
                            orderfarmasi:data2
                        }
                    ]
                    manageLogistikPhp.postorderpelayananapotik(objSave).then(function(e) {
                        $scope.item.resep = e.data.noresep.noorder
                    })
                }
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

