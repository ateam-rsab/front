define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ProduksiObatInputSisaCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.showInputObat =true
            $scope.showRacikan = false
            $scope.saveShow=true;
            $scope.item.tglAwal=new Date();
            $scope.item.tglKadaluarsa=new Date();
            $scope.item.kdProduksi = 'FP/' + moment(new Date()).format('YYMM')+'____'
            $scope.qtyProduksiDis =true;
            var pegawaiUser = {}

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
            var norecOrder=''
            var statusLoad =''
            var hargaSatuanProduksi=0
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            // init();
            function LoadCache(){
                var chacePeriode = cacheHelper.get('ProduksiObatCtrl');
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
                    cacheHelper.set('ProduksiObatCtrl', chacePeriode);
               }else{
                    init()
               }
           }
           function init() {
            // debugger;
            manageLogistikPhp.getDataTableTransaksi("produksi/get-data-combo-produksi", true).then(function(dat){
                $scope.listUser = dat.data.detaillogin;
                $scope.listRuangan = dat.data.ruangan;
                // $scope.listJenisKirim = [{id:1,jenis:'Amprahan'},{id:2,jenis:'Transfer'}]
                // $scope.listJenisKemasan = dat.data.jeniskemasan;
                $scope.listProduk = dat.data.produk;
                // $scope.listAsalProduk = dat.data.asalproduk;
                // $scope.listRuanganTujuan =dat.data.ruanganall;
                // $scope.listRoute = dat.data.route;
                // $scope.listAturanPakai = dat.data.signa;
                // $scope.listJenisRacikan = dat.data.jenisracikan;
                pegawaiUser = dat.data.detaillogin[0]; 

                $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                $scope.item.userLogin = {id:$scope.listUser[0].id,namalengkap:$scope.listUser[0].namalengkap}
                
            
                if (statusLoad != '') {
                    if (statusLoad == 'EditKirim') {
                        // manageLogistikPhp.getDataTableTransaksi("kasir/get-detail-obat-bebas?norecResep="+norecResep, true).then(function(data_ih){
                        //     $scope.isRouteLoading=false;
                        //     $scope.item.resep = data_ih.data.detailresep.nostruk
                        //     $scope.item.ruangan = {id:data_ih.data.detailresep.id,namaruangan:data_ih.data.detailresep.namaruangan}
                        //     $scope.item.penulisResep = {id:data_ih.data.detailresep.pgid,namalengkap:data_ih.data.detailresep.namalengkap}
                        //     $scope.item.nocm = data_ih.data.detailresep.nocm
                        //     $scope.item.namapasien = data_ih.data.detailresep.nama
                        //     $scope.item.tglLahir = data_ih.data.detailresep.tgllahir
                        //     $scope.item.noTelepon = data_ih.data.detailresep.notlp
                        //     $scope.item.alamat = data_ih.data.detailresep.alamat

                        //     data2 = data_ih.data.pelayananPasien

                        //     $scope.dataGrid = new kendo.data.DataSource({
                        //         data: data2
                        //     });

                        //     var subTotal = 0 ;
                        //     for (var i = data2.length - 1; i >= 0; i--) {
                        //         subTotal=subTotal+ parseFloat(data2[i].total)
                        //     }
                        //     $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        // });
                    }
                    if (statusLoad == 'KirimBarang') {
                        manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-detail-order-for-kirim-barang?norecOrder="+norecOrder, true).then(function(data_ih){
                            $scope.isRouteLoading=false;
                            $scope.item.tglAwal = data_ih.data.detail.tglorder
                            // $scope.item.ruangan = {id:data_ih.data.detail.id,namaruangan:data_ih.data.detail.namaruangan}
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
                                subTotal=subTotal+ parseFloat(data2[i].total)
                            }
                            $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        });
                    }
                }
            });

        }
        $scope.getSatuanProd = function(){
            GETKONVERSIProd(0)
        }
        function GETKONVERSIProd(jml){
            $scope.isRouteLoading=true;
            $scope.qtyProduksiDis =true;
            $scope.saveShow=true;
            if ($scope.item.produkProd == undefined) {
                return
            }
            if ($scope.item.produkProd == "") {
                return
            }
            if ($scope.item.ruangan == undefined) {
                return
            }
            if ($scope.item.ruangan == "") {
                return
            }
            $scope.listSatuanProd = $scope.item.produkProd.konversisatuan
            if ($scope.listSatuanProd.length == 0) {
                $scope.listSatuanProd = ([{ssid:$scope.item.produkProd.ssid,satuanstandar:$scope.item.produkProd.satuanstandar}])
            }
            $scope.item.satuanProd = {ssid:$scope.item.produkProd.ssid,satuanstandar:$scope.item.produkProd.satuanstandar}
            $scope.item.qtyHasil=$scope.item.produkProd.qtyhasil
            $scope.item.qtyProduksi = 0//$scope.item.produkProd.qtyhasil
            $scope.item.keterangan=$scope.item.produkProd.keteranganlainnya
            manageLogistikPhp.getDataTableTransaksi("produksi/get-detail-master-barang-produksi?idprodukhasil="+$scope.item.produkProd.id+
                '&ruid='+$scope.item.ruangan.id, true).then(function(data_ih){
                $scope.isRouteLoading=false;

                for (var i = data_ih.data.details.length - 1; i >= 0; i--) {
                    data_ih.data.details[i].ruanganfk = $scope.item.ruangan.id
                }

                data2 = data_ih.data.details
                
                var subTotal=0
                for (var i = data2.length - 1; i >= 0; i--) {
                    // data2[i].jumlahbahan=parseFloat(data2[i].jumlah)*parseFloat($scope.item.qtyProduksi)
                    data2[i].total=parseFloat(data2[i].jumlah)*parseFloat(data2[i].harganetto)
                    subTotal=subTotal+ parseFloat(data2[i].total)
                }
                $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                hargaSatuanProduksi=subTotal/parseFloat($scope.item.qtyProduksi);
                $scope.item.hrgSatuanHasil=parseFloat(hargaSatuanProduksi).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")


                $scope.dataGrid = new kendo.data.DataSource({
                    data: data2
                });
                $scope.qtyProduksiDis =false;
            });
            manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
                "produkfk="+ $scope.item.produkProd.id +
                "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    for (var i = dataProdukDetail.length - 1; i >= 0; i--) {
                        $scope.item.hargasssst = dataProdukDetail[i].harganetto
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
            manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    $scope.item.stok =dat.data.jmlstok / $scope.item.nilaiKonversi 
                    $scope.item.jumlah =jml
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
        $scope.$watch('item.qtyProduksi', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                // var subTotal=0
                // for (var i = data2.length - 1; i >= 0; i--) {
                //     data2[i].jumlahbahan=parseFloat(data2[i].jumlah)*parseFloat($scope.item.qtyProduksi)
                //     data2[i].total=parseFloat(data2[i].jumlah)*parseFloat(data2[i].harganetto)
                //     subTotal=subTotal+ parseFloat(data2[i].total)
                // }
                // $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                // hargaSatuanProduksi=subTotal/parseFloat($scope.item.qtyProduksi);
                // $scope.item.hrgSatuanHasil=parseFloat(hargaSatuanProduksi).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                // $scope.dataGrid = new kendo.data.DataSource({
                //     data: data2
                // });
            }
        });
        $scope.$watch('item.jumlah', function(newValue, oldValue) {
            if (newValue != oldValue  ) {

                // if ($scope.item.jenisKemasan == undefined) {
                //     return
                // }
                if ($scope.item.stok == 0 ) {
                    $scope.item.jumlah = 0
                    //alert('Stok kosong')

                    return;
                }
                var ada = false;
                for (var i = 0; i < dataProdukDetail.length; i++) {
                    ada = false
                    if (parseFloat($scope.item.jumlah * parseFloat($scope.item.nilaiKonversi) ) <= parseFloat(dataProdukDetail[i].qtyproduk) ){
                        hrg1 = parseFloat(dataProdukDetail[i].hargajual)* parseFloat($scope.item.nilaiKonversi)
                        hrgsdk = parseFloat(dataProdukDetail[i].hargadiscount) * parseFloat($scope.item.nilaiKonversi)
                        $scope.item.hargaSatuan = hrg1 
                        $scope.item.hargadiskon = hrgsdk 
                        $scope.item.total = parseFloat($scope.item.jumlah) * (hrg1-hrgsdk)
                        noTerima = dataProdukDetail[i].norec
                        $scope.item.asal={id:dataProdukDetail[i].objectasalprodukfk,asalproduk:dataProdukDetail[i].asalproduk}
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
            }
        });

        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.tambah = function () {
            debugger;
            if ($scope.item.jumlah == 0) {
                alert("Jumlah harus di isi!")
                return;
            }
            // if ($scope.item.total == 0) {
            //     alert("Stok tidak ada harus di isi!")
            //     return;
            // }
            // if ($scope.item.jenisKemasan == undefined) {
            //     alert("Pilih Jenis Kemasan terlebih dahulu!!")
            //     return;
            // }
            // if (noTerima == '') {
            //     $scope.item.jumlah = 0
            //     alert("Jumlah blm di isi!!")
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
                        data.namaproduk = $scope.item.produk.namaproduk
                        data.nilaikonversi = $scope.item.nilaiKonversi
                        data.satuanstandarfk = $scope.item.satuan.ssid
                        data.satuanstandar = $scope.item.satuan.satuanstandar
                        data.satuanviewfk = $scope.item.satuan.ssid
                        data.satuanview = $scope.item.satuan.satuanstandar
                        data.jmlstok = String($scope.item.stok)
                        data.jumlah = $scope.item.jumlah
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
                        namaproduk:$scope.item.produk.namaproduk,
                        nilaikonversi:$scope.item.nilaiKonversi,
                        satuanstandarfk:$scope.item.satuan.ssid,
                        satuanstandar:$scope.item.satuan.satuanstandar,
                        satuanviewfk:$scope.item.satuan.ssid,
                        satuanview:$scope.item.satuan.satuanstandar,
                        jmlstok:String($scope.item.stok),
                        jumlah:$scope.item.jumlah,
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
        $scope.columnGridStok = [
            {
                "field": "no",
                "title": "No",
                "width" : "20px",
            },
            {
                "field": "namaruangan",
                "title": "Ruangan",
                "width" : "100px",
            },
            {
                "field": "nostruk",
                "title": "NoStruk",
                "width" : "100px",
            },
            {
                "field": "qtyproduk",
                "title": "Stok",
                "width" : "50px",
            }
          
         ];
         $scope.mergestok = function(){
            var objSave = 
                {
                    produkfk : $scope.item.idProduks,
                    ruanganfk : $scope.item.ruangan.id
                }
            
            manageLogistikPhp.poststockmerger(objSave).then(function(e) {

            })
         }

        $scope.klikGrid = function(dataSelected){
            manageLogistikPhp.getDataTableTransaksi("logistik/get-info-stok-detail?produkfk="+dataSelected.produkfk +"&ruanganfk="+$scope.item.ruangan.id,true)
            .then(function(e){
                $scope.item.namaProduks=dataSelected.namaproduk;
                $scope.item.idProduks=dataSelected.produkfk;
                  for (var i = 0; i < e.data.detail.length; i++) {
                        e.data.detail[i].no = i+1
                    }
                $scope.dataGridStok=new kendo.data.DataSource({
                data:e.data.detail,
                pageable: true,
                pageSize: 5,
                total: e.data.detail.length,
                serverPaging: false,
                schema: {
                    model: {
                        fields: {
                        }
                    }
                }
             })
            })
            // var dataProduk =[];
            // //no:no,
            // $scope.item.no = dataSelected.no
            // // $scope.item.rke = dataSelected.rke
            // // $scope.item.jenisKemasan = {id:dataSelected.jeniskemasanfk,jeniskemasan:dataSelected.jeniskemasan}
            // // $scope.item.aturanPakai = {id:dataSelected.aturanpakaifk,name:dataSelected.aturanpakai}
            // // $scope.item.route = {id:dataSelected.routefk,name:dataSelected.route}
            // // if (dataSelected.asalprodukfk != 0) {
            // //     $scope.item.asal = {id:dataSelected.asalprodukfk,asalproduk:dataSelected.asalproduk}    
            // // }
            // for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
            //     if ($scope.listProduk[i].id == dataSelected.produkfk){
            //         dataProduk = $scope.listProduk[i]
            //         break;
            //     }
            // }
            // $scope.item.produk = dataProduk//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
            // // $scope.item.stok = dataSelected.jmlstok //* $scope.item.nilaiKonversi 

            // $scope.item.jumlah = 0
            // GETKONVERSI(dataSelected.jumlah)
            // $scope.item.nilaiKonversi = dataSelected.nilaikonversi
            // $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}
            
            
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
                "title": "Qty Bahan",
                "width" : "70px",
            },
            {
                "field": "jmlstok",
                "title": "Stok",
                "width" : "70px",
            },
            {
                "field": "hargasatuan",
                "title": "Harga Satuan",
                "width" : "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
            },
            // {
            //     "field": "jumlahbahan",
            //     "title": "Qty",
            //     "width" : "70px",
            // },
        // {
        //     "field": "hargadiscount",
        //     "title": "Harga Discount",
        //     "width" : "100px",
        //     "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
        // },
            {
                "field": "total",
                "title": "Total",
                "width" : "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
            }
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

            $scope.simpan = function(){
                $scope.saveShow=false;
                if ($scope.item.produkProd == undefined) {
                    alert("Pilih produk Hasil!!")
                    return
                }
                if ($scope.item.satuanProd == undefined) {
                    alert("Pilih satuan Hasil!!")
                    return
                }
                if ($scope.item.qtyHasil == undefined) {
                    alert("Isi Qty Hasil produksi!!")
                    return
                }
                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return
                }
                var struk = {
                            objectruanganfk: $scope.item.ruangan.id,
                            hargasatuan: $scope.item.hargasssst,
                            jumlahproduksi: $scope.item.qtyProduksi,
                            objectpegawaiygmengetahuifk: $scope.item.userLogin.id,
                            objectprodukfk: $scope.item.produkProd.id,
                            satuan: $scope.item.satuanProd.ssid,
                            spesifikasi: $scope.item.keterangan,
                            tanggalexpired: moment($scope.item.tglKadaluarsa).format('YYYY-MM-DD hh:mm:ss'),
                            norecProduksi:norecOrder
                        }
                var objSave = 
                    {
                        struk:struk,
                        // details:data2
                    }
                
                manageLogistikPhp.postinputsisaproduksibarang(objSave).then(function(e) {
                    // $scope.item.noKirim = e.data.nokirim.nokirim
                    // var stt = 'false'
                    // if (confirm('View resep? ')) {
                    //     // Save it!
                    //     stt='true';
                    // } else {
                    //     // Do nothing!
                    //     stt='false'
                    // }
                    // var client = new HttpClient();
                    // client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores='+e.data.noresep.norec+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    //     //aadc=response;
                    // });
                    // window.history.back();
                    
                    Kosongkan();
                })
                
                // $state.go("TransaksiPelayananApotik")
                
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
