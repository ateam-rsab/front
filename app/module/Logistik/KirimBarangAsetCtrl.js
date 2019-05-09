define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KirimBarangAsetCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.showInputObat =true
            $scope.showRacikan = false
            $scope.saveShow=true;
            $scope.item.tglAwal=new Date();
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
            var norecAsset=''
            var statusLoad =''
            var noAsset=''
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            loadDataCombo()
            LoadCache();
            // init();
            function loadDataCombo(){
                var ruangid='';
                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-data-combo-transfer", true).then(function(dat){
                    $scope.listPenulisResep = dat.data.penulisresep;
                    $scope.listRuangan = dat.data.ruangan;
                    $scope.listJenisKirim = [{id:1,jenis:'Amprahan'},{id:2,jenis:'Transfer'}]                   
                    $scope.listkondisiproduk = dat.data.kondisiproduk;
                    $scope.listAsalProduk = dat.data.asalproduk;
                    $scope.listRuanganTujuan =dat.data.ruanganall;
                    pegawaiUser = dat.data.detaillogin[0]; 
                    $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan};
                    $scope.item.jenisKirim = {id:2,jenis:'Transfer'};
                    $scope.listSatuan = dat.data.satuan; 
                    $scope.ListKondisiProduk = dat.data.kondisiproduk;
                    loadProduk();
                });
            } 

            function loadProduk(){
                var ruanganid = '';
                if ($scope.item.ruangan != undefined) {
                    ruanganid = $scope.item.ruangan.id;
                }
                manageLogistikPhp.getDataTableTransaksi("aset/get-data-produkforkirim?ruanganId="+ruanganid, true).then(function(dat){
                    var data = dat.data[0].data;
                    $scope.listProduk= data;
                })
            }

            function LoadCache(){
                var chacePeriode = cacheHelper.get('KirimBarangAsetCtrl');
                if(chacePeriode != undefined){
                   norecAsset = chacePeriode[0];
                   statusLoad = chacePeriode[1];
                   noAsset = chacePeriode[2];
                   init()
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('KirimBarangAsetCtrl', chacePeriode);
                }else{
                    init()
                }
            }
          

            function init() {
                // //debugger;
                if (statusLoad != '') {
                    if (statusLoad == 'KirimBarangAsset') {
                        $scope.isRouteLoading=true;
                        manageLogistikPhp.getDataTableTransaksi("aset/get-detail-registrasiasset?"+"norecAsset="+norecAsset, true).then(function(data_ih){
                            $scope.isRouteLoading=false;
                            //debugger;
                            var datas = data_ih.data.datas[0];
                            $scope.item.NoAsset = {norec:datas.norec,noregisteraset:datas.noregisteraset};
                            $scope.item.ruangan = {id:datas.ruangancurrenfk,namaruangan:datas.ruangancurrent};
                            $scope.item.produk = {id:datas.idproduk,namaproduk:datas.namaproduk};
                            $scope.item.satuan = {id:datas.ssid,satuanstandar:datas.satuanstandar};
                            $scope.item.stok = datas.qtyprodukaset;
                            $scope.item.jumlah = 0;
                            // GETKONVERSI(0);
                        });
                    }
                    // if (statusLoad == 'EditKirim') {
                    //     manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-detail-kirim-barang?norec="+noreckirim, true).then(function(data_ih){
                    //         $scope.isRouteLoading=false;
                    //         $scope.item.noKirim = data_ih.data.head.nokirim
                    //         $scope.item.tglAwal = data_ih.data.head.tglkirim
                    //         $scope.item.ruangan = {id:data_ih.data.head.id,namaruangan:data_ih.data.head.namaruangan}
                    //         $scope.item.ruanganTujuan = {id:data_ih.data.head.ruid2,namaruangan:data_ih.data.head.namaruangan2}

                    //         data2 = data_ih.data.detail

                    //         $scope.dataGrid = new kendo.data.DataSource({
                    //             data: data2
                    //         });

                    //         var subTotal = 0 ;
                    //         for (var i = data2.length - 1; i >= 0; i--) {
                    //             subTotal=subTotal+ parseFloat(data2[i].total)
                    //         }
                    //         $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    //     });
                    // }
                    // if (statusLoad == 'KirimBarang') {
                    //     manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-detail-order-for-kirim-barang?norecOrder="+norecOrder, true).then(function(data_ih){
                    //         $scope.isRouteLoading=false;
                    //         $scope.item.tglAwal = data_ih.data.detail.tglorder
                    //         $scope.item.ruangan = {id:data_ih.data.detail.ruidtujuan,namaruangan:data_ih.data.detail.ruangantujuan}
                    //         $scope.item.ruanganTujuan = {id:data_ih.data.detail.ruidasal,namaruangan:data_ih.data.detail.ruanganasal}
                    //         $scope.item.jenisKirim = {id:data_ih.data.detail.jenisid,jenis:data_ih.data.detail.jenis}
                    //         data2 = data_ih.data.details

                    //         $scope.dataGrid = new kendo.data.DataSource({
                    //             data: data2
                    //         });

                    //         var subTotal = 0 ;
                    //         for (var i = data2.length - 1; i >= 0; i--) {
                    //             subTotal=subTotal+ parseFloat(data2[i].total)
                    //         }
                    //         $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    //     });
                    // }
                }
            }

        $scope.getSatuan = function(){
            GETKONVERSI(0)
        }
        $scope.getAsset = function(){
            manageLogistikPhp.getDataTableTransaksi("aset/get-no-asset?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
                    $scope.listAsset = dat.data.result;                    
            });
        }

        $scope.getQty = function (){
            manageLogistikPhp.getDataTableTransaksi("aset/get-no-asset?"+
            "noregisteraset="+ $scope.item.NoAsset.noregisteraset, true).then(function(dat){
                var datas = dat.data.dataaset[0];
                $scope.item.stok = datas.qtyprodukaset;
                $scope.item.jumlah = 0;                
            });
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
            $scope.item.satuan = {ssid:$scope.item.satuan.ssid, satuanstandar:$scope.item.satuan.satuanstandar}
            $scope.item.nilaiKonversi = 1// $scope.item.satuan.nilaikonversi
            if ($scope.item.ruangan == undefined) {
                //alert("Pilih Ruangan terlebih dahulu!!")
                return;
            }
          
            manageLogistikPhp.getDataTableTransaksi("aset/get-data-detail-asset?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    $scope.item.stok =dat.data.jmlstok / $scope.item.nilaiKonversi ;
                    $scope.listAsset =dat.data.noregisteraset;
                    $scope.item.jumlah =jml;
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
      
        $scope.$watch('item.jumlah', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                if ($scope.item.stok == 0 ) {
                    $scope.item.jumlah = 0
                    return;
                }

                $scope.item.hargaSatuan = 0 
                $scope.item.hargadiskon = 0
                $scope.item.total = 1
                noTerima = 'KirimAset'
                $scope.item.asal={id:1,asalproduk:'KirimAset'}


                var ada = false;
                        ada=true;
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
            if (noTerima == '') {
                $scope.item.jumlah = 0
                alert("Jumlah blm di isi!!")
                return;
            }
            if ($scope.item.produk == undefined) {
                alert("Pilih Produk terlebih dahulu!!")
                return;
            }
            // if ($scope.item.satuan == undefined) {
            //     alert("Pilih Satuan terlebih dahulu!!")
            //     return;
            // }
            if ($scope.item.kondisiproduk == undefined) {
                alert("Pilih Kondisi terlebih dahulu!!")
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
                        data.hargajual = String($scope.item.hargaSatuan)
                        data.stock = String($scope.item.stok)
                        data.harganetto = String($scope.item.hargaSatuan)
                        data.nostrukterimafk = noTerima
                        data.ruanganfk = $scope.item.ruangan.id
                        data.asalprodukfk = $scope.item.asal.id
                        data.asalproduk = $scope.item.asal.asalproduk
                        data.produkfk = $scope.item.produk.id
                        data.namaproduk = $scope.item.produk.namaproduk
                        data.nilaikonversi = $scope.item.nilaiKonversi
                        data.kondisiprodukfk = $scope.item.kondisiproduk.id
                        data.kondisiproduk = $scope.item.kondisiproduk.kondisiproduk
                        // data.satuanstandarfk = $scope.item.satuan.ssid
                        // data.satuanstandar = $scope.item.satuan.satuanstandar
                        // data.satuanviewfk = $scope.item.satuan.ssid
                        // data.satuanview = $scope.item.satuan.satuanstandar
                        data.jmlstok = String($scope.item.stok)
                        data.jumlah = $scope.item.jumlah
                        data.hargasatuan = String($scope.item.hargaSatuan)
                        data.hargadiscount =String($scope.item.hargadiskon)
                        data.total = $scope.item.total
                        data.noasset = $scope.item.NoAsset.noregisteraset
                        data.norecasset = $scope.item.NoAsset.norec

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
                        hargajual:String($scope.item.hargaSatuan),                        
                        stock:String($scope.item.stok),
                        harganetto:String($scope.item.hargaSatuan),
                        nostrukterimafk:noTerima,
                        ruanganfk:$scope.item.ruangan.id,//£££
                        asalprodukfk:$scope.item.asal.id,
                        asalproduk:$scope.item.asal.asalproduk,
                        produkfk:$scope.item.produk.id,
                        namaproduk:$scope.item.produk.namaproduk,
                        nilaikonversi:$scope.item.nilaiKonversi,
                        // satuanstandarfk:$scope.item.satuan.ssid,
                        // satuanstandar:$scope.item.satuan.satuanstandar,
                        kondisiprodukfk : $scope.item.kondisiproduk.id,
                        kondisiproduk : $scope.item.kondisiproduk.kondisiproduk,
                        // satuanviewfk:$scope.item.satuan.ssid,
                        // satuanview:$scope.item.satuan.satuanstandar,
                        jmlstok:String($scope.item.stok),
                        jumlah:$scope.item.jumlah,
                        hargasatuan:String($scope.item.hargaSatuan),
                        hargadiscount:String($scope.item.hargadiskon),
                        total:$scope.item.total,
                        noasset: $scope.item.NoAsset.noregisteraset,
                        norecasset: $scope.item.NoAsset.norec
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
            racikan =''
        }

        $scope.klikGrid = function(dataSelected){
            var dataProduk =[];
            //no:no,
            $scope.item.no = dataSelected.no
            for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                if ($scope.listProduk[i].id == dataSelected.produkfk){
                    dataProduk = $scope.listProduk[i]
                    break;
                }
            }
            $scope.item.produk = dataProduk
            $scope.item.jumlah = dataSelected.jumlah
            $scope.item.stok = dataSelected.jmlstok
            $scope.item.NoAsset = {norec:dataSelected.norecasset,noregisteraset:dataSelected.noasset};
            // GETKONVERSI(dataSelected.jumlah)
            // $scope.item.nilaiKonversi = dataSelected.nilaikonversi
            // $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}
        }
        function Kosongkan(){
            $scope.item.produk =''
            $scope.item.NoAsset=''
            $scope.item.kondisiproduk=''
            $scope.item.stok=0
            $scope.item.jumlah=0
            $scope.item.tglAwal=moment($scope.now).format('YYYY-MM-DD HH:mm:ss')
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
                "field": "namaproduk",
                "title": "Deskripsi",
                "width" : "200px",
            },
            // {
            //     "field": "satuanstandar",
            //     "title": "Satuan",
            //     "width" : "80px",
            // },
            {
                "field": "kondisiproduk",
                "title": "Kondisi",
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
        ];
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.kembali=function(){
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }

            $scope.simpan = function(){
                //debugger
                if ($scope.item.ruangan == undefined) {
                    alert("Pilih Ruanganan Pengirim!!")
                    return
                }
                if ($scope.item.ruanganTujuan == undefined) {
                    alert("Pilih Ruanganan Tujuan!!")
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
                var noAsset ='';
                if ($scope.item.noAsset != undefined) {
                    noAsset = $scope.item.noAsset;
                }
                var strukkirimaset = {
                            noreckirim: noreckirim,
                            norecAsset: norecAsset,
                            // noasset: noAsset,
                            objectpegawaipengirimfk: pegawaiUser.id,
                            objectruanganfk: $scope.item.ruangan.id,
                            objectruangantujuanfk: $scope.item.ruanganTujuan.id,
                            jenispermintaanfk: $scope.item.jenisKirim.id,
                            keteranganlainnyakirim: 'Kirim Barang Aset',
                            // qtydetailjenisproduk: 0,
                            // qtyproduk: 0,
                            tglkirim: moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss'),
                            // totalhargasatuan: 0,
                            norecOrder:norecOrder,
                            // norec_apd:0
                        }
                var objSave = 
                    {
                        strukkirimaset:strukkirimaset,
                        details:data2
                    }
                
                manageLogistikPhp.postkirimbarangasset(objSave).then(function(e) {
                    $scope.item.noKirim = e.data.nokirim.nokirim
                    $scope.saveShow=false;
                    var stt = 'false'
                    if (confirm('View resep? ')) {
                        // Save it!
                        stt='true';
                    } else {
                        // Do nothing!
                        stt='false'
                    }
                    // var client = new HttpClient();
                    // client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores=NonLayanan'+e.data.nokirim.norec+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    //     //aadc=response;
                    // });
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-pengeluaran=1&nores='+e.data.nokirim.norec+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                        //aadc=response;
                    });
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
//***********************************

}
]);
});
