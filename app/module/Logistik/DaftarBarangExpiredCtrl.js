define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarBarangExpiredCtrl', ['FindProduk', 'ManageSarpras', '$rootScope', '$scope','$state', 'ModelItem', 'DateHelper','ManageLogistikPhp','CacheHelper','$mdDialog','ModelItemAkuntansi',
            function(findProduk, manageSarpras, $rootScope, $scope,$state, ModelItem, DateHelper,manageLogistikPhp,cacheHelper,$mdDialog,modelItemAkuntansi) {     
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
            manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-data-combo-transfer", true).then(function(dat){
                $scope.listPenulisResep = dat.data.penulisresep;
                $scope.listRuangan = dat.data.ruangan;
                $scope.listJenisKirim = [{id:1,jenis:'Amprahan'},{id:2,jenis:'Transfer'}]                
                // $scope.listProduk = dat.data.produk;
                $scope.listAsalProduk = dat.data.asalproduk;
                $scope.listRuanganTujuan =dat.data.ruangan;//dat.data.ruanganall;
                pegawaiUser = dat.data.detaillogin[0]; 
                $scope.item.Pegawai = {id:pegawaiUser.id,namalengkap:pegawaiUser.namalengkap};
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
                            $scope.item.tglAwal = data_ih.data.detail.tglorder
                            $scope.item.ruangan = {id:data_ih.data.detail.ruidtujuan,namaruangan:data_ih.data.detail.ruangantujuan}
                            $scope.item.ruanganTujuan = {id:data_ih.data.detail.ruidasal,namaruangan:data_ih.data.detail.ruanganasal}
                            $scope.item.jenisKirim = {id:data_ih.data.detail.jenisid,jenis:data_ih.data.detail.jenis}

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

        $scope.getProdukRuangan = function(){
            if ($scope.item.ruanganTujuan != undefined) {
                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-daftar-produkkadaluarsa?objectruangan="+$scope.item.ruanganTujuan.id, true).then(function(dat){                   
                   $scope.listProduk = dat.data.produk;
                });
            }
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
            $scope.item.nilaiKonversi = 1
            if ($scope.item.ruangan == undefined) {
                return;
            }
            $scope.item.jumlah =jml
            manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    $scope.item.stok =$scope.item.produk.qtyproduk / $scope.item.nilaiKonversi 
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
                    return;
                }

                $scope.item.hargaSatuan = 0 
                $scope.item.hargadiskon = 0
                $scope.item.total = 1//parseFloat($scope.item.jumlah) * (0)
                noTerima = 'as@epic'
                $scope.item.asal={id:1,asalproduk:'as@epic'}


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

                        data.hargajual = String($scope.item.hargaSatuan)
                        data.stock = String($scope.item.stok)
                        data.harganetto = String($scope.item.hargaSatuan)
                        data.nostrukterimafk = noTerima
                        data.ruanganfk = $scope.item.ruangan.id
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
                        hargajual:String($scope.item.hargaSatuan),
                        stock:String($scope.item.stok),
                        harganetto:String($scope.item.hargaSatuan),
                        nostrukterimafk:noTerima,
                        ruanganfk:$scope.item.ruangan.id,//£££
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
            $scope.item.no = dataSelected.no
            for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                if ($scope.listProduk[i].id == dataSelected.produkfk){
                    dataProduk = $scope.listProduk[i]
                    break;
                }
            }
            $scope.item.produk = dataProduk//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
            $scope.item.jumlah = 0
            GETKONVERSI(dataSelected.jumlah)
            $scope.item.nilaiKonversi = dataSelected.nilaikonversi
            $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}           
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
        ];
        
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
            var strukkirim = {
                        norec:noreckirim,
                        objectpegawaipengirimfk: $scope.item.Pegawai.id,
                        objectruanganfk:$scope.item.ruanganTujuan.id,
                        keteranganlainnya: $scope.item.Keterangan,
                        tglkadaluarsa: moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss'),
            }                        
            var objSave = 
                {
                    strukkirim:strukkirim,
                    details:data2
                }
            
            manageLogistikPhp.postinputbarangkadaluarsa(objSave).then(function(e) {
                Kosongkan();
            });
        }
            
        $scope.simpan = function(){
            
            if ($scope.item.ruanganTujuan == undefined) {
                alert("Pilih Ruanganan Tujuan!!")
                return
            }
            if ($scope.item.Keterangan == undefined) {
                alert("Keterangan Masih Kosong!!")
                return
            }
            if (data2.length == 0) {
                alert("Pilih Produk terlebih dahulu!!")
                return
            }
            var confirm = $mdDialog.confirm()
                    .title('Peringatan')
                    .textContent('Apakah anda yakin akan simpan?')
                    .ariaLabel('Lucky day')
                    .cancel('Tidak')
                    .ok('Ya')
                $mdDialog.show(confirm).then(function () {
                    $scope.SaveKirim();
                })
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
}
]);
});
