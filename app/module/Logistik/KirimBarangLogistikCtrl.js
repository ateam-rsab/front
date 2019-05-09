define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KirimBarangLogistikCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','$mdDialog','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,$mdDialog,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.showInputObat =true
            $scope.showRacikan = false
            $scope.saveShow=true;
            $scope.item.tglAwal=new Date();
            var pegawaiUser = {}
            var norecCetak = '';
            var norec_apd = '';
            var noOrder = '';
            var norecResep = '';
            var dataProdukDetail=[];
            var noTerima ='';
            var data2 = [];
            var data2R = [];
            var hrg1 = 0
            var hrgsdk = 0
            var racikan = 0
            var noreckirim=''
            var norecOrder='';
            var statusLoad =''
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            ComboLoad();
            // init();
            function LoadCache(){
                var chacePeriode = cacheHelper.get('KirimBarangLogistikCtrl');
                if(chacePeriode != undefined){
                   noreckirim = chacePeriode[0]
                   norecOrder = chacePeriode[1]
                   statusLoad = chacePeriode[2]

                   init()
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('KirimBarangLogistikCtrl', chacePeriode);
               }else{
                    init()
               }
           }

           $scope.BatalCetak = function(){
                 $scope.popUp.close();
                 // $scope.item.DataJabatan = undefined;
                 // $scope.item.DataJabatan1 = undefined;
                 // $scope.item.DataJabatan2 = undefined;

                 // $scope.item.DataPegawai = undefined;
                 // $scope.item.DataPegawai1 = undefined;
                 // $scope.item.DataPegawai2 = undefined;

           }

           function ComboLoad () {

                manageLogistikPhp.getDataTableTransaksi("humas/get-daftar-combo", true).then(function(dat){
                     $scope.listDataJabatan = dat.data.jabatan;
                });

                modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai-all", true, true, 20).then(function(data) {
                    $scope.ListDataPegawai=data;
                });
           }

           function init() {
            // debugger;
            manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-data-combo-transfer", true).then(function(dat){
                $scope.listPenulisResep = dat.data.penulisresep;
                $scope.listRuangan = dat.data.ruangan;
                $scope.listJenisKirim = [{id:1,jenis:'Amprahan'},{id:2,jenis:'Transfer'}]
                // $scope.listJenisKemasan = dat.data.jeniskemasan;
                $scope.listProduk = dat.data.produk;
                $scope.listAsalProduk = dat.data.asalproduk;
                $scope.listRuanganTujuan =dat.data.ruanganall;
                // $scope.listRoute = dat.data.route;
                // $scope.listAturanPakai = dat.data.signa;
                // $scope.listJenisRacikan = dat.data.jenisracikan;
                pegawaiUser = dat.data.detaillogin[0]; 

                $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                $scope.item.jenisKirim = {id:2,jenis:'Transfer'}
            
                if (statusLoad != '') {
                    if (statusLoad == 'EditKirim') {
                        manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-detail-kirim-barang?norec="+noreckirim, true).then(function(data_ih){
                            $scope.isRouteLoading=false;
                            $scope.item.noKirim = data_ih.data.head.nokirim
                            $scope.item.tglAwal = data_ih.data.head.tglkirim
                            $scope.item.ruangan = {id:data_ih.data.head.id,namaruangan:data_ih.data.head.namaruangan}
                            $scope.item.ruanganTujuan = {id:data_ih.data.head.ruid2,namaruangan:data_ih.data.head.namaruangan2}
                            $scope.item.Keterangan=data_ih.data.head.keterangan;
                            data2 = data_ih.data.detail

                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });

                            var subTotal = 0 ;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal=subTotal+ parseFloat(data2[i].total)
                            }
                            $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        });
                    }
                    if (statusLoad == 'KirimBarang') {
                        manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-detail-order-for-kirim-barang?norecOrder="+norecOrder, true).then(function(data_ih){
                            $scope.isRouteLoading=false;
                            $scope.item.tglAwal = moment($scope.now).format('YYYY-MM-DD HH:mm:ss') //data_ih.data.detail.tglorder
                            $scope.item.ruangan = {id:data_ih.data.detail.ruidtujuan,namaruangan:data_ih.data.detail.ruangantujuan}
                            $scope.item.ruanganTujuan = {id:data_ih.data.detail.ruidasal,namaruangan:data_ih.data.detail.ruanganasal}
                            $scope.item.jenisKirim = {id:data_ih.data.detail.jenisid,jenis:data_ih.data.detail.jenis}

                            // $scope.item.resep = data_ih.data.detailresep.nostruk
                            // $scope.item.ruangan = {id:data_ih.data.detailresep.id,namaruangan:data_ih.data.detailresep.namaruangan}
                            // $scope.item.penulisResep = {id:data_ih.data.detailresep.pgid,namalengkap:data_ih.data.detailresep.namalengkap}
                            // $scope.item.nocm = data_ih.data.detailresep.nocm
                            // $scope.item.namapasien = data_ih.data.detailresep.nama
                            // $scope.item.tglLahir = data_ih.data.detailresep.tgllahir
                            // $scope.item.noTelepon = data_ih.data.detailresep.notlp
                            // $scope.item.alamat = data_ih.data.detailresep.alamat

                            data2 = data_ih.data.details

                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });

                            var subTotal = 0 ;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                if (data2[i].qtyorder == undefined) {
                                    data2[i].qtyorder = 0;
                                }
                                subTotal=subTotal+ parseFloat(data2[i].total)
                            }
                            $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        });
                    }
                }
            });

        }

        $scope.getSatuan = function(){
            GETKONVERSI(0)
        }
        function GETKONVERSI(jml){
            if ($scope.item.produk == undefined) {
                return
            }
            if ($scope.item.produk == "") {
                return
            }
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
            $scope.item.jumlah =jml
            manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    $scope.item.stok =dat.data.jmlstok / $scope.item.nilaiKonversi 
                    // $scope.item.jumlah =jml
                    
                    // $scope.item.hargaSatuan =0
                    // $scope.item.hargadiskon =0
                    // $scope.item.total =0
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
        // $scope.$watch('item.jenisKemasan.jeniskemasan', function(newValue, oldValue) {
        //     if (newValue != oldValue  ) {
        //         if (newValue == 'Racikan') {
        //            $scope.showInputObat =false
        //            $scope.showRacikan = true
        //         }else{

        //            $scope.showInputObat =true
        //            $scope.showRacikan = false
        //         }
        //     }
        // });
        $scope.$watch('item.jumlah', function(newValue, oldValue) {
            if (newValue != oldValue  ) {

                // if ($scope.item.jenisKemasan == undefined) {
                //     return
                // }
                if ($scope.item.stok == 0 ) {
                    $scope.item.jumlah = 0
                    // alert('Stok kosong')
                    // return;
                }

                $scope.item.hargaSatuan = 0 
                $scope.item.hargadiskon = 0
                $scope.item.total = 1//parseFloat($scope.item.jumlah) * (0)
                noTerima = 'as@epic'
                $scope.item.asal={id:1,asalproduk:'as@epic'}


                var ada = false;
                // for (var i = 0; i < dataProdukDetail.length; i++) {
                //     ada = false
                //     if (parseFloat($scope.item.jumlah * parseFloat($scope.item.nilaiKonversi) ) <= parseFloat(dataProdukDetail[i].qtyproduk) ){
                //         hrg1 = parseFloat(dataProdukDetail[i].harganetto)* parseFloat($scope.item.nilaiKonversi)
                //         hrgsdk = parseFloat(dataProdukDetail[i].hargadiscount) * parseFloat($scope.item.nilaiKonversi)
                //         $scope.item.hargaSatuan = hrg1 
                //         $scope.item.hargadiskon = hrgsdk 
                //         $scope.item.total = parseFloat($scope.item.jumlah) * (hrg1-hrgsdk)
                //         noTerima = dataProdukDetail[i].norec
                //         $scope.item.asal={id:dataProdukDetail[i].objectasalprodukfk,asalproduk:dataProdukDetail[i].asalproduk}
                        ada=true;
                //         break;
                //     }
                // }
                if (ada == false) {
                    $scope.item.hargaSatuan = 0
                    $scope.item.hargadiskon =0
                    $scope.item.total = 0
                    
                    noTerima = ''
                }
                if ($scope.item.jumlah == 0) {
                    $scope.item.hargaSatuan = 0
                }
            }
        });

        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.tambah = function () {
            if ($scope.item.jumlah == 0) {
                alert("Jumlah harus di isi!")
                return;
            }
            if ($scope.item.stok == 0) {
                alert("Stok Tidak Ada!")
                return;
            }
            // if ($scope.item.jenisKemasan == undefined) {
            //     alert("Pilih Jenis Kemasan terlebih dahulu!!")
            //     return;
            // }
            if (noTerima == '') {
                $scope.item.jumlah = 0
                alert("Jumlah blm di isi!!")
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
            var nomor =0
            if ($scope.dataGrid == undefined) {
                nomor = 1
            }else{
                nomor = data2.length+1
            }
            var data ={};
            if ($scope.item.no != undefined){
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no ==  $scope.item.no){
                        data.no = $scope.item.no

                        // data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
                        // data.tglregistrasi = moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss')
                        // data.generik = null
                        data.hargajual = String($scope.item.hargaSatuan)
                        // data.jenisobatfk = null
                        // data.kelasfk = $scope.item.kelas.id
                        data.stock = String($scope.item.stok)
                        data.harganetto = String($scope.item.hargaSatuan)
                        data.nostrukterimafk = noTerima
                        data.ruanganfk = $scope.item.ruangan.id

                        // data.rke = $scope.item.rke
                        // data.jeniskemasanfk = $scope.item.jenisKemasan.id
                        // data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
                        // data.aturanpakaifk = $scope.item.aturanPakai.id
                        // data.aturanpakai = $scope.item.aturanPakai.name
                        // data.routefk = $scope.item.route.id
                        // data.route = $scope.item.route.name
                        data.asalprodukfk = $scope.item.asal.id
                        data.asalproduk = $scope.item.asal.asalproduk
                        data.produkfk = $scope.item.produk.id
                        data.kdproduk = $scope.item.produk.kdproduk
                        data.namaproduk = $scope.item.produk.namaproduk
                        data.nilaikonversi = $scope.item.nilaiKonversi
                        data.satuanstandarfk = $scope.item.satuan.ssid
                        data.satuanstandar = $scope.item.satuan.satuanstandar
                        data.satuanviewfk = $scope.item.satuan.ssid
                        data.satuanview = $scope.item.satuan.satuanstandar
                        data.jmlstok = String($scope.item.stok)
                        data.jumlah = $scope.item.jumlah                        
                        data.qtyorder = data2[i].qtyorder                            
                        data.hargasatuan = String($scope.item.hargaSatuan)
                        data.hargadiscount =String($scope.item.hargadiskon)
                        data.total = $scope.item.total

                        data2[i] = data;
                        $scope.dataGrid = new kendo.data.DataSource({
                            data: data2
                        });
                        var subTotal = 0 ;
                        for (var i = data2.length - 1; i >= 0; i--) {
                            subTotal=subTotal+ parseFloat(data2[i].total)
                        }
                        $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                    }
                    // break;
                }

            }else{
                data={
                        no:nomor,
                        // noregistrasifk:norec_apd,//$scope.item.noRegistrasi,
                        // tglregistrasi:moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                        // generik:null,
                        hargajual:String($scope.item.hargaSatuan),
                        // jenisobatfk:null,
                        // kelasfk:$scope.item.kelas.id,
                        stock:String($scope.item.stok),
                        harganetto:String($scope.item.hargaSatuan),
                        nostrukterimafk:noTerima,
                        ruanganfk:$scope.item.ruangan.id,//£££
                        // rke:$scope.item.rke,
                        // jeniskemasanfk:$scope.item.jenisKemasan.id,
                        // jeniskemasan:$scope.item.jenisKemasan.jeniskemasan,
                        // aturanpakaifk:$scope.item.aturanPakai.id,
                        // aturanpakai:$scope.item.aturanPakai.name,
                        // routefk:$scope.item.route.id,
                        // route:$scope.item.route.name,
                        asalprodukfk:$scope.item.asal.id,
                        asalproduk:$scope.item.asal.asalproduk,
                        produkfk:$scope.item.produk.id,
                        kdproduk:$scope.item.produk.kdproduk,
                        namaproduk:$scope.item.produk.namaproduk,
                        nilaikonversi:$scope.item.nilaiKonversi,
                        satuanstandarfk:$scope.item.satuan.ssid,
                        satuanstandar:$scope.item.satuan.satuanstandar,
                        satuanviewfk:$scope.item.satuan.ssid,
                        satuanview:$scope.item.satuan.satuanstandar,
                        jmlstok:String($scope.item.stok),
                        jumlah:$scope.item.jumlah,
                        qtyorder:0,
                        hargasatuan:String($scope.item.hargaSatuan),
                        hargadiscount:String($scope.item.hargadiskon),
                        total:$scope.item.total
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
            // if ($scope.item.jenisKemasan.jeniskemasan != 'Racikan') {
            //     $scope.item.rke = parseFloat($scope.item.rke) + 1
            // }
            Kosongkan()
            racikan =''
        }

        $scope.klikGrid = function(dataSelected){
            var dataProduk =[];
            //no:no,
            $scope.item.no = dataSelected.no
            // $scope.item.rke = dataSelected.rke
            // $scope.item.jenisKemasan = {id:dataSelected.jeniskemasanfk,jeniskemasan:dataSelected.jeniskemasan}
            // $scope.item.aturanPakai = {id:dataSelected.aturanpakaifk,name:dataSelected.aturanpakai}
            // $scope.item.route = {id:dataSelected.routefk,name:dataSelected.route}
            // if (dataSelected.asalprodukfk != 0) {
            //     $scope.item.asal = {id:dataSelected.asalprodukfk,asalproduk:dataSelected.asalproduk}    
            // }
            for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                if ($scope.listProduk[i].id == dataSelected.produkfk){
                    dataProduk = $scope.listProduk[i]
                    break;
                }
            }
            $scope.item.produk = dataProduk//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
            // $scope.item.stok = dataSelected.jmlstok //* $scope.item.nilaiKonversi 

            $scope.item.jumlah = 0
            GETKONVERSI(dataSelected.jumlah)
            $scope.item.nilaiKonversi = dataSelected.nilaikonversi
            $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}
            
            
            // $scope.item.jumlah = dataSelected.jumlah
            // $scope.item.hargaSatuan = dataSelected.hargasatuan
            // $scope.item.hargadiskon = dataSelected.hargadiscount
            // $scope.item.total = dataSelected.total
        }
        function Kosongkan(){
            $scope.item.produk =''
            $scope.item.asal =''
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
            // {
            //     "field": "rke",
            //     "title": "R/ke",
            //     "width" : "40px",
            // },
            {
                "field": "produkfk",
                "title": "Kd Produk",
                "width" : "70px",
            },
            {
                "field": "kdproduk",
                "title": "Kd Sirs",
                "width" : "70px",
            },
            {
                "field": "namaproduk",
                "title": "Produk",
                "width" : "200px",
            },
            {
                "field": "satuanstandar",
                "title": "Satuan",
                "width" : "80px",
            },
            {
                "field": "jmlstok",
                "title": "Stok",
                "width" : "70px",
            },
            {
                "field": "jumlah",
                "title": "Qty",
                "width" : "70px",
            }
            // ,
            // {
            //     "field": "harganetto",
            //     "title": "Harga Netto",
            //     "width" : "100px",
            //     "template": "<span class='style-right'>{{formatRupiah('#: harganetto #', '')}}</span>"
            // }
        // {
        //     "field": "hargadiscount",
        //     "title": "Harga Discount",
        //     "width" : "100px",
        //     "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
        // },
        // {
        //     "field": "total",
        //     "title": "Total",
        //     "width" : "100px",
        //     "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
        // }
        ];
        // $scope.columnGridR = [
        // {
        //     "field": "no",
        //     "title": "No",
        //     "width" : "30px",
        // },
        // {
        //     "field": "rke",
        //     "title": "R/ke",
        //     "width" : "40px",
        // },
        // {
        //     "field": "jeniskemasan",
        //     "title": "Kemasan",
        //     "width" : "70px",
        // },
        // {
        //     "field": "asalproduk",
        //     "title": "Asal Produk",
        //     "width" : "100px",
        // },
        // {
        //     "field": "namaproduk",
        //     "title": "Deskripsi",
        //     "width" : "200px",
        // },
        // {
        //     "field": "satuanstandar",
        //     "title": "Satuan",
        //     "width" : "80px",
        // },
        // {
        //     "field": "jumlah",
        //     "title": "Qty",
        //     "width" : "70px",
        // },
        // {
        //     "field": "hargasatuan",
        //     "title": "Harga Satuan",
        //     "width" : "100px",
        //     "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
        // },
        // {
        //     "field": "hargadiscount",
        //     "title": "Harga Discount",
        //     "width" : "100px",
        //     "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
        // },
        // {
        //     "field": "total",
        //     "title": "Total",
        //     "width" : "100px",
        //     "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
        // }
        // ];
            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.kembali=function(){
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }
            var noorderfk = null
            if (norecOrder != '') {
                noorderfk = norecOrder
            }

            $scope.SaveKirim = function(){
                $scope.saveShow=false
                var Keterangan ='Kirim Barang'
                if ($scope.item.Keterangan != undefined || $scope.item.Keterangan != '') {
                    Keterangan = $scope.item.Keterangan
                }
                // debugger;
                // for (var i = data2.length - 1; i >= 0; i--) {
                //     // if (data2[i].) {}
                // }


                var strukkirim = {
                            objectpegawaipengirimfk: pegawaiUser.id,
                            objectruanganfk: $scope.item.ruangan.id,
                            objectruangantujuanfk: $scope.item.ruanganTujuan.id,
                            jenispermintaanfk: $scope.item.jenisKirim.id,
                            keteranganlainnyakirim: Keterangan,
                            qtydetailjenisproduk: 0,
                            qtyproduk: data2.length,
                            tglkirim: moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss'),
                            totalhargasatuan: 0,
                            norecOrder:noorderfk,
                            noreckirim:noreckirim,
                            norec_apd:0
                }                        
                var objSave = 
                    {
                        strukkirim:strukkirim,
                        details:data2
                    }
                
                manageLogistikPhp.postkirimbarang(objSave).then(function(e) {
                    // $scope.saveShow=false;
                    $scope.item.noKirim = e.data.nokirim.norec
                    norecCetak = $scope.item.noKirim;
                    // window.history.back();
                     var forSave = 
                        {
                            strukkirim:strukkirim,
                            norec:e.data.nokirim.norec,
                            details:data2
                        }                    
                    manageLogistikPhp.postjurnalamprahanbarang(forSave).then(function(data){
                        Kosongkan();
                        $scope.popUp.center().open();        
                    });
                },function(error){
                    $scope.saveShow=true;
                });
                
                // $state.go("TransaksiPelayananApotik")
            }
            $scope.tes = function () {
                $scope.popUp.center().open();
            }

            $scope.CetakAh = function(){

                var jabatan1 = ''
                if($scope.item.DataJabatan != undefined){
                    jabatan1 = $scope.item.DataJabatan.namajabatan;
                }
                
                var jabatan2 = ''
                if($scope.item.DataJabatan1 != undefined){
                    jabatan2 = $scope.item.DataJabatan1.namajabatan;
                }
                
                var jabatan3 =''
                if($scope.item.DataJabatan2 != undefined){
                    jabatan3 = $scope.item.DataJabatan2.namajabatan;
                }

                var pegawai = ''
                if($scope.item.DataPegawai != undefined){
                    pegawai =$scope.item.DataPegawai.id;
                }

                var pegawai1 = ''
                if($scope.item.DataPegawai1 != undefined){
                    pegawai1 =$scope.item.DataPegawai1.id;
                }
                
                var pegawai2 = ''
                if($scope.item.DataPegawai2 != undefined){
                    pegawai2 =$scope.item.DataPegawai2.id;
                }

                var stt = 'false'
                if (confirm('View Bukti Kirim? ')) {
                    stt='true';
                } else {
                    stt='false'
                }

                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-pengeluaran=1&nores='+norecCetak+'&pegawaiPenyerah='+pegawai+'&pegawaiPenerima='+pegawai1+'&pegawaiMegetahui='+pegawai2
                    +'&JabatanPenyerah='+jabatan1+'&JabatanPenerima='+jabatan2+'&jabatanMengetahui='+jabatan3+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    //aadc=response; 
                     });
                 //  $scope.item.DataJabatan = undefined;
                 // $scope.item.DataJabatan1 = undefined;
                 // $scope.item.DataJabatan2 = undefined;

                 // $scope.item.DataPegawai = undefined;
                 // $scope.item.DataPegawai1 = undefined;
                 // $scope.item.DataPegawai2 = undefined;
                $scope.popUp.close();

            }
            
            $scope.simpan = function(){
                
                if ($scope.item.ruangan == undefined) {
                    alert("Pilih Ruanganan Pengirim!!")
                    return
                }
                if ($scope.item.ruanganTujuan == undefined) {
                    alert("Pilih Ruanganan Tujuan!!")
                    return
                }
                if ($scope.item.Keterangan == undefined) {
                    alert("Keterangan Masih Kosong!!")
                    return
                }
                if ($scope.item.jenisKirim == undefined) {
                    alert("Pilih Jenis Kiriman!!")
                    return
                }
                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return
                }
                // for (var i = data2.length - 1; i >= 0; i--) {
                //     if (parseFloat(data2[i].stock) < parseFloat(data2[i].jumlah)) {
                //          alert(data2[i].namaproduk + "stok kurang dari jumlah order")
                //          return
                //     }
                // }
                // $scope.saveShow=false;
                // if (norecPD==''){
                   // if($scope.CekPasienDaftar.length >0 && $scope.CekPasienDaftar[0].objectruanganlastfk== $scope.item.ruangan.id){

                        // var confirm = $mdDialog.confirm()
                        //         .title('Peringatan')
                        //         .textContent('Apakah anda yakin akan kirim barang?')
                        //         .ariaLabel('Lucky day')
                        //         .cancel('Tidak')
                        //         .ok('Ya')
                        //     $mdDialog.show(confirm).then(function () {
                        //         $scope.SaveKirim();
                        //     })

                    // }else
                    //  $scope.SimpanRegistrasi();
                 // }else
                 //   $scope.SimpanRegistrasi();
                var objSave = 
                    {
                        objectruanganfk:$scope.item.ruangan.id,
                        details:data2
                    }
                
                manageLogistikPhp.posttransaksi("logistik-stok/cek-barang-kirim",objSave).then(function(dat) {                
                        var datax=dat.data.data;
                        var datacek=data2;
                        var sama = false
                        var groupingData2 = []
                        var jumlah = 0 ;
                        for (var x = 0; x < data2.length; x++) {
                            sama = false
                            for (var y = 0; y < groupingData2.length; y++) {
                                if (groupingData2[y].produkfk == data2[x].produkfk) {
                                    sama = true;
                                    groupingData2[y].jumlah = parseFloat(groupingData2[y].jumlah) + parseFloat(data2[x].jumlah)
                                }
                            }
                            if (sama == false) {
                                var result = {
                                    produkfk: data2[x].produkfk,
                                    jumlah: data2[x].jumlah,
                                }
                                groupingData2.push(result)
                            }
                        }

                        for (var i = 0; i < datax.length; i++) {
                            for (var j = 0; j < groupingData2.length; j++) {
                                if (groupingData2[j].produkfk == datax[i].produkfk) {
                                    if (parseFloat(datax[i].stok) >= parseFloat(groupingData2[j].jumlah)) {
                                       jumlah = i + 1;
                                    }
                                }
                            }
                        }
                       
                        if(groupingData2.length == jumlah){

                            var confirm = $mdDialog.confirm()
                                .title('Peringatan')
                                .textContent('Apakah anda yakin akan kirim barang?')
                                .ariaLabel('Lucky day')
                                .cancel('Tidak')
                                .ok('Ya')
                            $mdDialog.show(confirm).then(function () {
                                $scope.SaveKirim();
                            })

                         }else{
                             alert("Stok Tidak Ada, Tidak Bisa Dikirim!!!")
                             $scope.winDialog.close();
                             return;
                         }

                    });
                
            }

            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }
            $scope.BatalR = function(){
                $scope.showInputObat =true
                $scope.showRacikan = false
                $scope.item.jenisKemasan =''

                racikan =''
            }
            $scope.hapus = function(){
                if ($scope.item.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                if ($scope.item.total == 0) {
                    alert("Stok tidak ada harus di isi!")
                    return;
                }
                // if ($scope.item.jenisKemasan == undefined) {
                //     alert("Pilih Jenis Kemasan terlebih dahulu!!")
                //     return;
                // }
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
        //     $scope.tambahR = function () {
        //     if ($scope.item.jumlah == 0) {
        //         alert("Jumlah harus di isi!")
        //         return;
        //     }
        //     if ($scope.item.total == 0) {
        //         alert("Stok tidak ada harus di isi!")
        //         return;
        //     }
        //     if ($scope.item.jenisKemasan == undefined) {
        //         alert("Pilih Jenis Kemasan terlebih dahulu!!")
        //         return;
        //     }
        //     if ($scope.item.asal == undefined) {
        //         alert("Pilih Asal Produk terlebih dahulu!!")
        //         return;
        //     }
        //     if ($scope.item.produk == undefined) {
        //         alert("Pilih Produk terlebih dahulu!!")
        //         return;
        //     }
        //     if ($scope.item.satuan == undefined) {
        //         alert("Pilih Satuan terlebih dahulu!!")
        //         return;
        //     }
        //     var nomor =0
        //     if ($scope.dataGridR == undefined) {
        //         nomor = 1
        //     }else{
        //         nomor = data2.length+1
        //     }
        //     var data ={};
        //     if ($scope.item.no != undefined){
        //         for (var i = data2R.length - 1; i >= 0; i--) {
        //             if (data2R[i].no ==  $scope.item.no){
        //                 data.no = $scope.item.no

        //                 data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
        //                 data.tglregistrasi = moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss')
        //                 data.generik = null
        //                 data.hargajual = String($scope.item.hargaSatuan)
        //                 data.jenisobatfk = null
        //                 data.kelasfk = $scope.item.kelas.id
        //                 data.stock = String($scope.item.stok)
        //                 data.harganetto = String($scope.item.hargaSatuan)
        //                 data.nostrukterimafk = noTerima
        //                 data.ruanganfk = $scope.item.ruangan.id

        //                 data.rke = $scope.item.rke
        //                 data.jeniskemasanfk = $scope.item.jenisKemasan.id
        //                 data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
        //                 data.aturanpakaifk = $scope.item.aturanPakai.id
        //                 data.aturanpakai = $scope.item.aturanPakai.name
        //                 data.routefk = $scope.item.route.id
        //                 data.route = $scope.item.route.name
        //                 data.asalprodukfk = $scope.item.asal.id
        //                 data.asalproduk = $scope.item.asal.asalproduk
        //                 data.produkfk = $scope.item.produk.id
        //                 data.namaproduk = $scope.item.produk.namaproduk
        //                 data.nilaikonversi = $scope.item.nilaiKonversi
        //                 data.satuanstandarfk = $scope.item.satuan.ssid
        //                 data.satuanstandar = $scope.item.satuan.satuanstandar
        //                 data.satuanviewfk = $scope.item.satuan.ssid
        //                 data.satuanview = $scope.item.satuan.satuanstandar
        //                 data.jmlstok = String($scope.item.stok)
        //                 data.jumlah = $scope.item.jumlah
        //                 data.hargasatuan = String($scope.item.hargaSatuan)
        //                 data.hargadiscount =String($scope.item.hargadiskon)
        //                 data.total = $scope.item.total

        //                 data2R[i] = data;
        //                 $scope.dataGridR = new kendo.data.DataSource({
        //                     data: data2R
        //                 });
                        
        //                 var subTotal = 0 ;
        //                 var totalDiskon = 0 ;
        //                 for (var i = data2R.length - 1; i >= 0; i--) {
        //                     subTotal=subTotal+ parseFloat(data2R[i].total)
        //                     totalDiskon=totalDiskon+ parseFloat(data2R[i].hargadiscount)
        //                 }
        //                 $scope.item.totalSubTotalR=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        //                 $scope.item.totalDiskonR=parseFloat(totalDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

        //             }
        //             // break;
        //         }

        //     }else{
        //         data={
        //                 no:nomor,
        //                 noregistrasifk:norec_apd,//$scope.item.noRegistrasi,
        //                 tglregistrasi:moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
        //                 generik:null,
        //                 hargajual:String($scope.item.hargaSatuan),
        //                 jenisobatfk:null,
        //                 kelasfk:$scope.item.kelas.id,
        //                 stock:String($scope.item.stok),
        //                 harganetto:String($scope.item.hargaSatuan),
        //                 nostrukterimafk:noTerima,
        //                 ruanganfk:$scope.item.ruangan.id,//£££
        //                 rke:$scope.item.rke,
        //                 jeniskemasanfk:$scope.item.jenisKemasan.id,
        //                 jeniskemasan:$scope.item.jenisKemasan.jeniskemasan,
        //                 aturanpakaifk:$scope.item.aturanPakai.id,
        //                 aturanpakai:$scope.item.aturanPakai.name,
        //                 routefk:$scope.item.route.id,
        //                 route:$scope.item.route.name,
        //                 asalprodukfk:$scope.item.asal.id,
        //                 asalproduk:$scope.item.asal.asalproduk,
        //                 produkfk:$scope.item.produk.id,
        //                 namaproduk:$scope.item.produk.namaproduk,
        //                 nilaikonversi:$scope.item.nilaiKonversi,
        //                 satuanstandarfk:$scope.item.satuan.ssid,
        //                 satuanstandar:$scope.item.satuan.satuanstandar,
        //                 satuanviewfk:$scope.item.satuan.ssid,
        //                 satuanview:$scope.item.satuan.satuanstandar,
        //                 jmlstok:String($scope.item.stok),
        //                 jumlah:$scope.item.jumlah,
        //                 hargasatuan:String($scope.item.hargaSatuan),
        //                 hargadiscount:String($scope.item.hargadiskon),
        //                 total:$scope.item.total
        //             }
        //         data2R.push(data)
        //         // $scope.dataGrid.add($scope.dataSelected)
        //         $scope.dataGridR = new kendo.data.DataSource({
        //             data: data2R
        //         });
        //         var subTotal = 0 ;
        //         var totalDiskon = 0 ;
        //         for (var i = data2R.length - 1; i >= 0; i--) {
        //             subTotal=subTotal+ parseFloat(data2R[i].total)
        //             totalDiskon=totalDiskon+ parseFloat(data2R[i].hargadiscount)
        //         }
        //         $scope.item.totalSubTotalR=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        //         $scope.item.totalDiskonR=parseFloat(totalDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        //     }
        //      Kosongkan()
        // }
        // $scope.simpanR = function(){
        //     if (data2R.length == 0) {
        //         alert("Pilih Produk terlebih dahulu!!")
        //         return
        //     }
        //     var resepRacikanOrder = {
        //             aturanpakaifk: $scope.item.aturanPakai.id,
        //             aturanpakai: $scope.item.aturanPakai.name,
        //             objectjeniswaktufk: null,
        //             objectketeranganpakaifk:null,
        //             objectnoresepfk: null,
        //             qtyprodukhasilracikan: 0,
        //             racikanke: null,
        //             resepke:null,
        //             objectsatuanstandarfk:null
        //             }
        //     var dataRacikan = [
        //         {
        //             resepracikanorder:resepRacikanOrder,
        //             resepracikanorderdetail:data2R//$scope.dataGrid._data
        //         }
        //     ]
        //     $scope.item.produk = {
        //         id: 10014242,
        //         namaproduk: "Racikan",
        //         ssid: 112,
        //         satuanstandar: "Bungkus",
        //         konversisatuan: [
        //             {
        //                 ssid: 112,
        //                 satuanstandar: "Bungkus",
        //                 nilaikonversi: "1"
        //             }
        //         ]
        //     }
        //     $scope.item.stok =1
        //     racikan ='Racikan'
        //     GETKONVERSI()

        //     // var nomor =0
        //     // if ($scope.dataGrid == undefined) {
        //     //     nomor = 1
        //     // }else{
        //     //     nomor = data2.length+1
        //     // }

        //     // var data ={};
        //     // if ($scope.item.no != undefined){
        //     //     for (var i = data2.length - 1; i >= 0; i--) {
        //     //         if (data2[i].no ==  $scope.item.no){
        //     //             data.no = $scope.item.no

        //     //             data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
        //     //             data.tglregistrasi = moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss')
        //     //             data.generik = null
        //     //             data.hargajual = String($scope.item.totalSubTotalR)
        //     //             data.jenisobatfk = null
        //     //             data.kelasfk = $scope.item.kelas.id
        //     //             data.stock = String(0)
        //     //             data.harganetto = String($scope.item.totalSubTotalR)
        //     //             data.nostrukterimafk = null
        //     //             data.ruanganfk = $scope.item.ruangan.id

        //     //             data.rke = $scope.item.rke
        //     //             data.jeniskemasanfk = $scope.item.jenisKemasan.id
        //     //             data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
        //     //             data.aturanpakaifk = $scope.item.aturanPakai.id
        //     //             data.aturanpakai = $scope.item.aturanPakai.name
        //     //             data.routefk = $scope.item.route.id
        //     //             data.route = $scope.item.route.name
        //     //             data.asalprodukfk = $scope.item.asal.id
        //     //             data.asalproduk = $scope.item.asal.asalproduk
        //     //             data.produkfk = $scope.item.produk.id
        //     //             data.namaproduk = $scope.item.produk.namaproduk
        //     //             data.nilaikonversi = $scope.item.nilaiKonversi
        //     //             data.satuanstandarfk = $scope.item.satuan.ssid
        //     //             data.satuanstandar = $scope.item.satuan.satuanstandar
        //     //             data.satuanviewfk = $scope.item.satuan.ssid
        //     //             data.satuanview = $scope.item.satuan.satuanstandar
        //     //             data.jmlstok = String($scope.item.stok)
        //     //             data.jumlah = $scope.item.jumlah
        //     //             data.hargasatuan = String($scope.item.hargaSatuan)
        //     //             data.hargadiscount =String($scope.item.hargadiskon)
        //     //             data.total = $scope.item.total

        //     //             data2[i] = data;
        //     //             $scope.dataGrid = new kendo.data.DataSource({
        //     //                 data: data2
        //     //             });
        //     //             var subTotal = 0 ;
        //     //             for (var i = data2.length - 1; i >= 0; i--) {
        //     //                 subTotal=subTotal+ parseFloat(data2[i].total)
        //     //             }
        //     //             $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

        //     //         }
        //     //         // break;
        //     //     }

        //     // }else{
        //     //     data={
        //     //             no:nomor,
        //     //             noregistrasifk:norec_apd,//$scope.item.noRegistrasi,
        //     //             tglregistrasi:moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
        //     //             generik:null,
        //     //             hargajual:String($scope.item.totalSubTotalR),
        //     //             jenisobatfk:null,
        //     //             kelasfk:$scope.item.kelas.id,
        //     //             stock:'0',
        //     //             harganetto:String($scope.item.totalSubTotalR),
        //     //             nostrukterimafk:null,
        //     //             ruanganfk:$scope.item.ruangan.id,//£££
        //     //             rke:$scope.item.rke,
        //     //             jeniskemasanfk:$scope.item.jenisKemasan.id,
        //     //             jeniskemasan:$scope.item.jenisKemasan.jeniskemasan,
        //     //             aturanpakaifk:$scope.item.aturanPakai.id,
        //     //             aturanpakai:$scope.item.aturanPakai.name,
        //     //             routefk:$scope.item.route.id,
        //     //             route:$scope.item.route.name,
        //     //             asalprodukfk:null,
        //     //             asalproduk:null,
        //     //             produkfk:10014242,
        //     //             namaproduk:'Racikan',
        //     //             nilaikonversi:1,
        //     //             satuanstandarfk:$scope.item.satuan.ssid,
        //     //             satuanstandar:$scope.item.satuan.satuanstandar,
        //     //             satuanviewfk:$scope.item.satuan.ssid,
        //     //             satuanview:$scope.item.satuan.satuanstandar,
        //     //             jmlstok:'0',
        //     //             jumlah:$scope.item.jumlah,
        //     //             hargasatuan:String($scope.item.totalSubTotalR),
        //     //             hargadiscount:String($scope.item.totalDiskonR),
        //     //             total:$scope.item.total
        //     //         }
        //     //     data2.push(data)
        //     //     // $scope.dataGrid.add($scope.dataSelected)
        //     //     $scope.dataGrid = new kendo.data.DataSource({
        //     //         data: data2
        //     //     });
        //     //     var subTotal = 0 ;
        //     //     for (var i = data2.length - 1; i >= 0; i--) {
        //     //         subTotal=subTotal+ parseFloat(data2[i].total)
        //     //     }
        //     //     $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        //     // }

        //     // data2R = []
        //     // $scope.dataGridR = new kendo.data.DataSource({
        //     //         data: data2R
        //     //     });
        //     $scope.showInputObat =true
        //     $scope.showRacikan = false
            
        // }

        // $scope.klikGridR = function(dataSelectedR){
        //     var dataProduk =[];
        //     //no:no,
        //     $scope.item.no = dataSelectedR.no
        //     $scope.item.rke = dataSelectedR.rke
        //     $scope.item.jenisKemasan = {id:dataSelectedR.jeniskemasanfk,jeniskemasan:dataSelectedR.jeniskemasan}
        //     $scope.item.aturanPakai = {id:dataSelectedR.aturanpakaifk,name:dataSelectedR.aturanpakai}
        //     $scope.item.route = {id:dataSelectedR.routefk,name:dataSelectedR.route}
        //     if (dataSelectedR.asalprodukfk != 0) {
        //         $scope.item.asal = {id:dataSelectedR.asalprodukfk,asalproduk:dataSelectedR.asalproduk}    
        //     }
        //     for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
        //         if ($scope.listProduk[i].id == dataSelectedR.produkfk){
        //             dataProduk = $scope.listProduk[i]
        //             break;
        //         }
        //     }
        //     $scope.item.produk = dataProduk//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
        //     // $scope.item.stok = dataSelected.jmlstok //* $scope.item.nilaiKonversi 

        //     $scope.item.jumlah = 0
        //     GETKONVERSI()
        //     $scope.item.nilaiKonversi = dataSelectedR.nilaikonversi
        //     $scope.item.satuan = {ssid:dataSelectedR.satuanstandarfk,satuanstandar:dataSelectedR.satuanstandar}
            
            
        //     $scope.item.jumlah = dataSelectedR.jumlah
        //     $scope.item.hargaSatuan = dataSelectedR.hargasatuan
        //     $scope.item.hargadiskon = dataSelectedR.hargadiscount
        //     $scope.item.total = dataSelectedR.total
        // }
//***********************************

}
]);
});
