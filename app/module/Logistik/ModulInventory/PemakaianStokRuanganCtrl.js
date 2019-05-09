define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemakaianStokRuanganCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.showInputObat =true
            $scope.showRacikan = false
            $scope.saveShow=true;
            $scope.item.tgl=new Date();
            $scope.item.tglKK = new Date();

            $scope.kaskecilShow =false;

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


            var qty = 0
            var hrgsatuan =0 
            var ppn = 0 
            var hargadiskon = 0
            var ppnprs = 0 
            var hargadiskonprs = 0

            var ttlTotal = 0 ;
            var ttlDiskon = 0 ;
            var ttlPpn = 0 ;
            var grandTotal = 0 ;
            var norecTerima =''
            var norecSPPB =''
            var tarifJasa = 0
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            // init();
            function LoadCache(){
                $scope.item.noTerima = 'RS/' + moment(new Date()).format('YYMM')+'____'
                $scope.item.noBuktiKK = '____' + '/KK/' + moment(new Date()).format('MM/YY')
                var chacePeriode = cacheHelper.get('PemakaianStokRuanganCtrl');
                if(chacePeriode != undefined){
                   norecTerima = chacePeriode[0]
                   noOrder = chacePeriode[1]
                   norecSPPB = chacePeriode[2]


                   init()
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('PemakaianStokRuanganCtrl', chacePeriode);
               }else{
                    init()
               }
           }
           $scope.getProduk = function(){
            manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-produk?idkelompokproduk="+$scope.item.kelompokproduk.id, true).then(function(dat){
                $scope.listProduk = dat.data.produk;
            })
        }
        function init() {
            // debugger;
            manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-combo", true).then(function(dat){
                $scope.listKelompokProduk = dat.data.kelompokproduk;
                $scope.item.kelompokproduk = {id:24,kelompokproduk:'Barang Persediaan'}
                // manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-produk?idkelompokproduk="+$scope.item.kelompokproduk.id, true).then(function(dat){
                //     $scope.listProduk = dat.data.produk;
                // })
                modelItemAkuntansi.getDataDummyPHP("sppb/permintaan-pengiriman-barang/get-data-combo-part", true, true, 30).then(function(data) {
                    $scope.listProduk= data;
                })
                $scope.listAsalBarang = dat.data.asalproduk;
                $scope.listRuangan = dat.data.ruangan;
                // $scope.listRuanganKK = dat.data.ruangan;
                $scope.item.ruangan = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                // $scope.item.ruanganKK = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                $scope.listPegawai = dat.data.detaillogin;
                $scope.item.pegawaiPenerima = {id:$scope.listPegawai[0].id,namalengkap:$scope.listPegawai[0].namalengkap}
                $scope.listRekanan = dat.data.rekanan;
                $scope.listpegawaiKK = dat.data.pegawaipenerima;


                // $scope.item.namaRekanan = {id:5129,namarekanan:'Indofarma Global Medika, PT'}
                // $scope.item.asalproduk = {id:1,asalproduk:'Badan Layanan Umum'}

                // $scope.listJenisKirim = [{id:1,jenis:'Amprahan'},{id:2,jenis:'Transfer'}]
                $scope.listProduk = dat.data.produk;
                // $scope.listRuanganTujuan =dat.data.ruanganall;
                // $scope.listRoute = dat.data.route;
                // $scope.listAturanPakai = dat.data.signa;
                // $scope.listJenisRacikan = dat.data.jenisracikan;
                pegawaiUser = dat.data.detaillogin[0]; 

                if (noOrder != '') {
                    if (noOrder == 'EditPemakaian') {
                        manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-detail-pemakaian-ruangan?norec="+norecTerima, true).then(function(e){
                            var head = e.data.struk
                            var details = e.data.details
                            $scope.isRouteLoading=false;
                            $scope.item.noPemakaian = head.nostruk
                            $scope.item.tgl =head.tglstruk
                            $scope.item.kelompokproduk ={id:details[0].kpid,kelompokproduk:details[0].kelompokproduk} 
                            $scope.item.asal = {id:details[0].asalprodukfk,asalproduk:details[0].asalproduk} 
                            $scope.item.ruangan = {id:head.objectruanganfk,namaruangan:head.namaruangan} 
                            $scope.item.pegawaiPenerima = {id:head.pgid,namalengkap:head.namalengkap} 
                            $scope.item.keterangan = head.keteranganlainnya
                            // $scope.item.noFaktur = data_ih.data.detailterima.nofaktur
                            // $scope.item.namaRekanan = {id:data_ih.data.detailterima.objectrekananfk,namarekanan:data_ih.data.detailterima.namarekanan} 

                            // $scope.item.ruangan = {id:data_ih.data.detailresep.id,namaruangan:data_ih.data.detailresep.namaruangan}
                            // $scope.item.penulisResep = {id:data_ih.data.detailresep.pgid,namalengkap:data_ih.data.detailresep.namalengkap}
                            // $scope.item.nocm = data_ih.data.detailresep.nocm
                            // $scope.item.namapasien = data_ih.data.detailresep.nama
                            // $scope.item.tglLahir = data_ih.data.detailresep.tgllahir
                            // $scope.item.noTelepon = data_ih.data.detailresep.notlp
                            // $scope.item.alamat = data_ih.data.detailresep.alamat

                            data2 = details
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            ttlTotal = 0 ;
                            ttlDiskon = 0 ;
                            ttlPpn = 0 ;
                            grandTotal = 0 ;

                            for (var i = data2.length - 1; i >= 0; i--) {
                                ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].jumlah))
                                ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].jumlah))
                                ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].jumlah))
                            }
                            $scope.item.total=parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalDiskon=parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalPpn=parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                            grandTotal = ttlTotal+ttlPpn-ttlDiskon
                            $scope.item.grandTotal=parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        });
                    }
                    if (noOrder == 'SPPB') {
                        manageLogistikPhp.getDataTableTransaksi("sppb/get-detail-SPPB?norecOrder="+norecSPPB, true).then(function(data_ih){
                            $scope.isRouteLoading=false;
                            $scope.item.noOrder=data_ih.data.detail.noorder
                            $scope.item.tglAwal=data_ih.data.detail.tglorder
                            $scope.item.keterangan=data_ih.data.detail.keterangan
                            $scope.item.pegawaiPembuat={id:data_ih.data.detail.pgid,namalengkap:data_ih.data.detail.petugas} 
                            $scope.item.koordinator={id:1,namaKoordinator:'Medis'} 
                            $scope.item.tglUsulan=data_ih.data.detail.tglusulan
                            $scope.item.noUsulan=data_ih.data.detail.nousulan
                            $scope.item.namaPengadaan=data_ih.data.detail.namapengadaan
                            $scope.item.noKontrak=data_ih.data.detail.nokontrak
                            $scope.item.tahun=data_ih.data.detail.tahunusulan
                            $scope.item.namaRekanan={id:data_ih.data.detail.namarekananid,namarekanan:data_ih.data.detail.namarekanan} 
                            // $scope.item.koordinator = data_ih.data.detailterima.nostruk
                            // $scope.item.tglTerima = data_ih.data.detailterima.tglstruk
                            // $scope.item.kelompokproduk ={id:data_ih.data.pelayananPasien[0].kpid,kelompokproduk:data_ih.data.pelayananPasien[0].kelompokproduk} 
                            $scope.item.asalproduk = {id:data_ih.data.details[0].asalprodukfk,asalproduk:data_ih.data.details[0].asalproduk} 
                            // $scope.item.ruanganPenerima = {id:data_ih.data.detailterima.id,namaruangan:data_ih.data.detailterima.namaruangan} 
                            // $scope.item.pegawaiPenerima = {id:data_ih.data.detailterima.pgid,namalengkap:data_ih.data.detailterima.namalengkap} 
                            // $scope.item.tglFaktur = data_ih.data.detailterima.tglfaktur
                            // $scope.item.noFaktur = data_ih.data.detailterima.nofaktur
                            // $scope.item.namaRekanan = {id:data_ih.data.detailterima.objectrekananfk,namarekanan:data_ih.data.detailterima.namarekanan} 

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
                            ttlTotal = 0 ;
                            ttlDiskon = 0 ;
                            ttlPpn = 0 ;
                            grandTotal = 0 ;

                            for (var i = data2.length - 1; i >= 0; i--) {
                                ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].jumlah))
                                ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].jumlah))
                                ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].jumlah))
                            }
                            $scope.item.total=parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalDiskon=parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalPpn=parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                            grandTotal = ttlTotal+ttlPpn-ttlDiskon
                            $scope.item.grandTotal=parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        });
                    }
                }
            });

}
$scope.getChangeAP = function(){
    if ($scope.item.asalproduk.asalproduk == "Kas Kecil") {
        $scope.kaskecilShow = true
    }else{
        $scope.kaskecilShow = false
    }
    
}
$scope.getSatuan = function(){
    // if ($scope.item.produk == undefined) {
    //     $scope.item.nilaiKonversi = ''
    // }
    // if ( $scope.item.nilaiKonversi == '') {
    //     GETKONVERSI(0)    
    // }
    // if ($scope.item.nilaiKonversi == undefined) {
        GETKONVERSI();
    // }
    
}
function GETKONVERSI(){
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

            

            $scope.item.jumlah=0
            $scope.item.dosis=1
            $scope.item.jumlahxmakan=1
            manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk="+ $scope.item.ruangan.id , true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    if (dat.data.jmlstok == 0){
                        toastr.warning('Stok tidak ada')
                    }
                    $scope.item.stok = parseFloat (dat.data.jmlstok / $scope.item.nilaiKonversi )

                    //parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.dataSelected.nilaikonversi)
                    $scope.item.hargaSatuan =0
                    $scope.item.hargadiskon =0
                    $scope.item.hargaNetto=0
                    // $scope.item.subTotaltxt =0
                    // $scope.item.jumlahxmakan =1
                    if ($scope.dataSelected != undefined) {
                        $scope.item.jumlah =$scope.dataSelected.jumlah
                        $scope.item.dosis =$scope.dataSelected.dosis
                        $scope.item.jumlahxmakan =parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.item.dosis)
                        $scope.item.nilaiKonversi = $scope.dataSelected.nilaikonversi
                        $scope.item.satuan = {ssid:$scope.dataSelected.satuanviewfk,satuanstandar:$scope.dataSelected.satuanview}
                        $scope.item.hargaSatuan = $scope.dataSelected.hargasatuan
                        $scope.item.hargadiskon = $scope.dataSelected.hargadiscount
                        $scope.item.hargaNetto = $scope.dataSelected.harganetto
                        $scope.item.subTotaltxt = $scope.dataSelected.total 
                    }

                    
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
                    $scope.item.subTotaltxt =0// parseFloat(newValue) * 
                           // (hrg1-hrgsdk)
                       }
                   }
               });
        // var qty = 0
        //     var hrgsatuan =0 
        //     var ppn = 0 
        //     var hargadiskon = 0
        //     var ppnprs = 0 
        //     var hargadiskonprs = 0
        $scope.$watch('item.jumlah', function(newValue, oldValue) {
            if (newValue != oldValue  ) {

                // if ($scope.item.jenisKemasan == undefined) {
                //     return
                // }
                // if (racikan == 'Racikan') {
                //     hrg1 = parseFloat($scope.item.totalSubTotalR)
                //     hrgsdk = parseFloat($scope.item.totalDiskonR)
                //     $scope.item.hargaSatuan =hrg1
                //     $scope.item.hargadiskon =hrgsdk
                //     $scope.item.total = parseFloat($scope.item.jumlah) * (hrg1-hrgsdk)
                //     noTerima = null
                // }else{
                    if ($scope.item.stok == 0 ) {
                        $scope.item.jumlah = 0
                        //alert('Stok kosong')

                        return;
                    }
                    var qty20 = 0
                    tarifJasa = 0//800
                    if (parseFloat(tarifJasa) != 0) {
                        if ($scope.item.jenisKemasan.id == 2) {
                            tarifJasa = 800
                        }
                        if ($scope.item.jenisKemasan.id == 1) {
                            qty20 = Math.floor(parseFloat($scope.item.jumlah)/20)
                            if (parseFloat($scope.item.jumlah) % 20 == 0) {
                                qty20 = qty20 
                            }else{
                                qty20 = qty20 + 1
                            }
                            
                            if (qty20 != 0) {
                                tarifJasa = 800 * qty20
                            }
                            
                        }
                    }
                    if ($scope.item.no == undefined) {
                        for (var i = data2.length - 1; i >= 0; i--) {
                            if (data2[i].rke  == $scope.item.rke) {
                                tarifJasa=0
                            }
                        }
                    }
                    // tarifJasa = 

                    var ada = false;
                    for (var i = 0; i < dataProdukDetail.length; i++) {
                        ada = false
                        if (parseFloat($scope.item.jumlah * parseFloat($scope.item.nilaiKonversi) ) <= parseFloat(dataProdukDetail[i].qtyproduk) ){
                            hrg1 = Math.round(parseFloat(dataProdukDetail[i].harganetto)* parseFloat($scope.item.nilaiKonversi))
                            hrgsdk = parseFloat(dataProdukDetail[i].hargadiscount) * parseFloat($scope.item.nilaiKonversi)
                            $scope.item.hargaSatuan = hrg1
                            $scope.item.hargaNetto  = Math.round(parseFloat(dataProdukDetail[i].harganetto)* parseFloat($scope.item.nilaiKonversi))
                            
                            $scope.item.hargadiskon = hrgsdk 
                            $scope.item.subTotaltxt =(parseFloat($scope.item.jumlah) * (hrg1-hrgsdk)) + parseFloat(tarifJasa)
                            noTerima = dataProdukDetail[i].norec
                            $scope.item.asal={id:dataProdukDetail[i].objectasalprodukfk,asalproduk:dataProdukDetail[i].asalproduk}
                            ada=true;
                            break;
                        }
                    }
                    if (ada == false) {
                        $scope.item.hargaSatuan = 0
                        $scope.item.hargadiskon =0
                        $scope.item.hargaNetto =0
                        $scope.item.subTotaltxt = 0
                        
                        noTerima = ''
                    }
                    if ($scope.item.jumlah == 0) {
                        $scope.item.hargaSatuan = 0
                        $scope.item.hargaNetto =0
                    }
                // }
                // if ($scope.item.stok > 0) {
                //     $scope.item.stok =parseFloat($scope.item.stok) * (parseFloat(oldValue)/ parseFloat(newValue))
                // }
            }
        });

        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.tambah = function () {
            if ($scope.item.subTotaltxt == 0) {
                toastr.error("SubTotal harus di isi!")
                return;
            }
            if ($scope.item.jumlah == 0) {
                 toastr.error("Jumlah harus di isi!")
                return;
            }
            if ($scope.item.produk == undefined) {
                 toastr.error("Pilih Produk terlebih dahulu!!")
                return;
            }
            if ($scope.item.satuan == undefined) {
                 toastr.error("Pilih Satuan terlebih dahulu!!")
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
                        data.hargasatuan = String($scope.item.hargaSatuan)
                        data.harganetto = String($scope.item.hargaSatuan)
                        data.nostrukterimafk = noTerima
                        data.ruanganfk = $scope.item.ruangan.id
                        data.asalprodukfk = $scope.item.asal.id
                        data.asalproduk = $scope.item.asal.asalproduk
                        data.produkfk = $scope.item.produk.id
                        data.namaproduk = $scope.item.produk.namaproduk
                        data.nilaikonversi =  parseFloat ($scope.item.nilaiKonversi)
                        data.satuanstandarfk = $scope.item.satuan.ssid
                        data.satuanstandar = $scope.item.satuan.satuanstandar
                        data.satuanviewfk = $scope.item.satuan.ssid
                        data.satuanview = $scope.item.satuan.satuanstandar
                        data.jumlah = parseFloat ($scope.item.jumlah)
                        // data.hargadiscount =String($scope.item.hargaDiskon)
                        // data.persendiscount = String($scope.item.hargaDiskonPersen)
                        // data.ppn =String($scope.item.ppn)
                        // data.persenppn = String($scope.item.ppnpersen)
                        data.total = $scope.item.subTotaltxt
                        data.keterangan = $scope.item.keterangan
                        data.nobatch = $scope.item.nobatch
                        data.tglkadaluarsa = $scope.item.tglkadaluarsa

                        data2[i] = data;
                        $scope.dataGrid = new kendo.data.DataSource({
                            data: data2
                        });
                        
                        ttlTotal = 0 ;
                        ttlDiskon = 0 ;
                        ttlPpn = 0 ;
                        grandTotal = 0 ;

                        for (var i = data2.length - 1; i >= 0; i--) {
                            ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].jumlah))
                            ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].jumlah))
                            ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].jumlah))
                        }
                        $scope.item.total=parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.totalDiskon=parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.totalPpn=parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                        grandTotal = ttlTotal+ttlPpn-ttlDiskon
                        $scope.item.grandTotal=parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                    }
                    // break;
                }

            }else{
                data={
                    no:nomor,
                    hargasatuan:String($scope.item.hargaSatuan),
                    nostrukterimafk:noTerima,
                    ruanganfk:$scope.item.ruangan.id,
                    asalprodukfk:$scope.item.asal.id,
                    asalproduk:$scope.item.asal.asalproduk,
                    produkfk:$scope.item.produk.id,
                    namaproduk:$scope.item.produk.namaproduk,
                    nilaikonversi:$scope.item.nilaiKonversi,
                    satuanstandarfk:$scope.item.satuan.ssid,
                    satuanstandar:$scope.item.satuan.satuanstandar,
                    satuanviewfk:$scope.item.satuan.ssid,
                    satuanview:$scope.item.satuan.satuanstandar,
                    jumlah: parseFloat($scope.item.jumlah),
                    // hargadiscount:String($scope.item.hargaDiskon),
                    // persendiscount:String($scope.item.hargaDiskonPersen),
                    // ppn:String($scope.item.ppn),
                    // persenppn:String($scope.item.ppnpersen),
                    total: parseFloat($scope.item.subTotaltxt),
                    keterangan:$scope.item.keterangan,
                    nobatch:$scope.item.nobatch,
                    tglkadaluarsa:$scope.item.tglkadaluarsa
                }
                data2.push(data)
                $scope.dataGrid = new kendo.data.DataSource({
                    data: data2
                });

                ttlTotal = 0 ;
                ttlDiskon = 0 ;
                ttlPpn = 0 ;
                grandTotal = 0 ;

                for (var i = data2.length - 1; i >= 0; i--) {
                    ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].jumlah))
                    ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].jumlah))
                    ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].jumlah))
                }
                $scope.item.total=parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.totalDiskon=parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.totalPpn=parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                grandTotal = ttlTotal+ttlPpn-ttlDiskon
                $scope.item.grandTotal=parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
            }
            
            Kosongkan()
            racikan =''
        }

        $scope.klikGrid = function(dataSelected){
            var dataProduk =[];
            //no:no,
            $scope.item.no = dataSelected.no

            manageLogistikPhp.getDataTableTransaksi("sppb/permintaan-pengiriman-barang/get-data-combo-part?namaproduk="+dataSelected.namaproduk, true, true, 20).then(function(data) {
                // $scope.listProduk= data;
                $scope.listProduk.add(data.data[0])
                $scope.item.produk = data.data[0];

                $scope.item.jumlah = 0
                GETKONVERSI()
                $scope.item.nilaiKonversi = parseFloat(dataSelected.nilaikonversi)
                $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}
                
                
                $scope.item.jumlah = parseFloat(dataSelected.jumlah)
                $scope.item.hargaSatuan = parseFloat(dataSelected.hargasatuan)
                $scope.item.subTotaltxt = parseFloat(dataSelected.total)
            })
            
            // for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
            //     if ($scope.listProduk[i].id == dataSelected.produkfk){
            //         dataProduk = $scope.listProduk[i]
            //         break;
            //     }
            // }
            // $scope.item.produk = dataProduk

            // $scope.item.jumlah = dataSelected.jumlah
            // $scope.item.hargaSatuan = dataSelected.hargasatuan
            // $scope.item.nilaiKonversi = dataSelected.nilaikonversi
            // $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}
            
        }
        function Kosongkan(){
            $scope.item.produk =''
            // $scope.item.asal =''
            $scope.item.satuan=''
            $scope.item.nilaiKonversi=0
            $scope.item.hargaSatuan=0
            $scope.item.stok=0
            $scope.item.jumlah=0
            $scope.item.hargadiskon=0
            $scope.item.no=undefined
            $scope.item.ppn=0
            $scope.item.hargaDiskon=0
            $scope.item.subTotaltxt=0
            $scope.dataSelected=undefined
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
                "title": "Nama Produk",
                "width" : "120px",
            },
            {
                "field": "satuanstandar",
                "title": "Satuan",
                "width" : "50px",
            },
            {
                "field": "jumlah",
                "title": "Qty",
                "width" : "50px",
            },
            {
                "field": "hargasatuan",
                "title": "Harga Satuan",
                "width" : "70px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
            },
            {
                "field": "total",
                "title": "SubTotal",
                "width" : "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
            }
        ];
        $scope.formatRupiah = function(value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
        $scope.kembali=function(){
            window.history.back();
        }

        $scope.simpan = function(){
            // if ($scope.item.asalproduk == undefined) {
            //     alert("Pilih Asal Produk!!")
            //     return
            // }
            if ($scope.item.ruangan == undefined) {
                 toastr.error("Pilih Ruangan !!")
                return
            }
            if ($scope.item.pegawaiPenerima == undefined) {
                 toastr.error("Pilih Pegawai !!")
                return
            }
            if ($scope.item.keterangan == undefined) {
                 toastr.error("Isi keterangan!!")
                return
            }
            if (data2.length == 0) {
                 toastr.error("Pilih Produk terlebih dahulu!!")
                return
            }
            // var rkk = null
            // if ($scope.item.ruanganKK != undefined) {
            //     rkk=$scope.item.ruanganKK.id
            // }
            // var tglkk = null
            // if ($scope.item.tglKK != undefined) {
            //     tglkk =$scope.item.tglKK
            // }
            // var pegkk = null
            // if ($scope.item.pegawaiKK != undefined) {
            //     pegkk =$scope.item.pegawaiKK.id
            // }
            var struk = {
                nostruk: norecTerima,
                ruanganfk: $scope.item.ruangan.id,
                namaruangan: $scope.item.ruangan.namaruangan,
                tglstruk: moment($scope.item.tgl).format('YYYY-MM-DD HH:mm:ss'),
                pegawaimenerimafk:$scope.item.pegawaiPenerima.id,
                namapegawaipenerima: $scope.item.pegawaiPenerima.namalengkap,
                keterangan:$scope.item.keterangan,
                qtyproduk:data2.length,
                total:ttlTotal
            }
            var objSave = 
            {
                struk:struk,
                details:data2
            }

            manageLogistikPhp.postpemakaianstokruangan(objSave).then(function(e) {
                $scope.item.noTerima = e.data.noterima
                    var stt = 'false'
                    if (confirm('View Struk? ')) {
                        // Save it!
                        stt='true';
                    } else {
                        // Do nothing!
                        stt='false'
                    }
                    var client = new HttpClient();
                    // client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores='+e.data.noresep.norec+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    //     //aadc=response;
                    // });
                    client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+e.data.data.norec+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                        //aadc=response;
                    });
                    window.history.back();
                    $scope.saveShow=false;
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
            // $scope.BatalR = function(){
            //     $scope.showInputObat =true
            //     $scope.showRacikan = false
            //     $scope.item.jenisKemasan =''

            //     racikan =''
            // }
            $scope.hapus = function(){
                if ($scope.item.jumlah == 0) {
                     toastr.error("Jumlah harus di isi!")
                    return;
                }
                if ($scope.item.total == 0) {
                     toastr.error("Stok tidak ada harus di isi!")
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
                     toastr.error("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.item.satuan == undefined) {
                     toastr.error("Pilih Satuan terlebih dahulu!!")
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

                            // var subTotal = 0 ;
                            // for (var i = data2.length - 1; i >= 0; i--) {
                            //     subTotal=subTotal+ parseFloat(data2[i].total)
                            //     data2[i].no = i+1
                            // }
                            // data2.length = data2.length -1
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            // for (var i = data2.length - 1; i >= 0; i--) {
                            //     subTotal=subTotal+ parseFloat(data2[i].total)
                            // }
                            // $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                            var ttlTotal = 0 ;
                            var ttlDiskon = 0 ;
                            var ttlPpn = 0 ;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].jumlah))
                                ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].jumlah))
                                ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].jumlah))
                            }
                            $scope.item.total=parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalDiskon=parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalPpn=parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                            var grandTotal = 0 ;
                            grandTotal = ttlTotal+ttlPpn-ttlDiskon
                            $scope.item.grandTotal=parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

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
