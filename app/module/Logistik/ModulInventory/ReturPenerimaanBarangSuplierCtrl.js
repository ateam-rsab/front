define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('ReturPenerimaanBarangSuplierCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ModelItemAkuntansi','$mdDialog',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,modelItemAkuntansi,$mdDialog) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.showInputObat =true
            $scope.showRacikan = false
            $scope.saveShow=true;
            $scope.item.tglTerima=new Date();
            $scope.item.tglKK = new Date();
            $scope.isRouteLoading=false;
            var NorecCetak = '';
            // $scope.isUnitt=false;
            $scope.kaskecilShow =false;
            var noOrder ='';
            var pegawaiUser = {}
            var norec_Realisasi='';
            var norec_RealisasiKontrak='';
            var norecRR='';
            var keltrans='';
            var verifikasifk='';
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
            var nilai = 0
            var kelTrans='';
            var qty = 0
            var hrgsatuan =0 
            var ppn = 0 
            var hargadiskon = 0
            var ppnprs = 0 
            var hargadiskonprs = 0
            var sppb = '';
            var ttlTotal = 0 ;
            var ttlDiskon = 0 ;
            var ttlPpn = 0 ;
            var grandTotal = 0 ;
            var norecTerima =''
            var norecSPPB =''
            var loadSPK = 'tidak'
            var loadSPPB = 'tidak'
            var loadSPPBDetail = 'tidak'
            var dataIN = '';
            var norecRetur = '';
            var retur = 0;
            $scope.disableSppb =false;
            var datas = [];
            ComboLoad ()
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            // init();
            function LoadCache(){
                // $scope.item.noTerima = 'RS/' + moment(new Date()).format('YYMM')+'____'
                // $scope.item.noBuktiKK = '____' + '/KK/' + moment(new Date()).format('MM/YY')
                var chacePeriode = cacheHelper.get('ReturPenerimaanBarangSuplierCtrl');
                if(chacePeriode != undefined){
                   norecTerima = chacePeriode[0]
                   noOrder = chacePeriode[1]
                   norecSPPB = chacePeriode[2]
                   dataIN = chacePeriode[3]


                   init()
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('ReturPenerimaanBarangSuplierCtrl', chacePeriode);
               }else{
                    init()
               }
           }

           $scope.BatalCetak = function(){

                 $scope.popUp.close();                 
                 $scope.item.DataJabatan1 = undefined;                 
                 $scope.item.DataPegawai1 = undefined;
                 $scope.item.DataJabatan2 = undefined;                 
                 $scope.item.DataPegawai2 = undefined;
                 $scope.item.DataJabatan3 = undefined;
                 $scope.item.DataPegawai3 = undefined;
                 window.history.back(); 
            }

             $scope.CetakAh = function(){               
                
                var jabatan1 =''
                if($scope.item.DataJabatan1 != undefined){
                    jabatan1 = $scope.item.DataJabatan1.namajabatan;
                }            
                
                var pegawai1 = ''
                if($scope.item.DataPegawai1 != undefined){
                    pegawai1 =$scope.item.DataPegawai1.id;
                }

                var jabatan2 =''
                if($scope.item.DataJabatan2 != undefined){
                    jabatan2 = $scope.item.DataJabatan2.namajabatan;
                }            
                
                var pegawai2 = ''
                if($scope.item.DataPegawai2 != undefined){
                    pegawai2 =$scope.item.DataPegawai2.id;
                }

                var jabatan3 =''
                if($scope.item.DataJabatan3 != undefined){
                    jabatan3 = $scope.item.DataJabatan3.namajabatan;
                }            
                
                var pegawai3 = ''
                if($scope.item.DataPegawai3 != undefined){
                    pegawai3 =$scope.item.DataPegawai3.id;
                }


                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+NorecCetak+'&pegawaiPenerima='+pegawai1+'&pegawaiPenyerahan='+pegawai2+'&pegawaiMengetahui='+pegawai3
                    +'&jabatanPenerima='+jabatan1+'&jabatanPenyerahan='+jabatan2+'&jabatanMengetahui='+jabatan3+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    //aadc=response; 

                });                
                 $scope.item.DataJabatan1 = undefined;                 
                 $scope.item.DataPegawai1 = undefined;
                 $scope.item.DataJabatan2 = undefined;                 
                 $scope.item.DataPegawai2 = undefined;
                 $scope.item.DataJabatan3 = undefined;
                 $scope.item.DataPegawai3 = undefined
                 $scope.popUp.close();
                 window.history.back(); 
            }

           function ComboLoad () {

                manageLogistikPhp.getDataTableTransaksi("humas/get-daftar-combo", true).then(function(dat){
                     $scope.listDataJabatan = dat.data.jabatan;
                });

                modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai-all", true, true, 20).then(function(data) {
                    $scope.ListDataPegawai=data;
                });
            }

           $scope.getProduk = function(){
            manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-produk?idkelompokproduk="+$scope.item.kelompokproduk.id, true).then(function(dat){
                $scope.listProduk = dat.data.produk;
                // usulan-permintaan/ruangan/get-data-combo-pegawai-part
            })
           
        }

        $scope.Generate = function(data){

                if (data === true) {
                    var AsalPro = ''
                    if ($scope.item.asalproduk != undefined) {
                        AsalPro = $scope.item.asalproduk.id
                    }
                    manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-nostruk-generate?asalproduk="+AsalPro, true).then(function(dat){
                        var datas =dat.data
                        if (datas.noStruk != "") {
                            $scope.item.noTerima = datas.noStruk
                        }else{
                            $scope.item.noTerima = ""
                        }

                        if (datas.noBuktiKK != "") {
                            $scope.item.noBuktiKK = datas.noBuktiKK
                        }else{
                            $scope.item.noBuktiKK = ""
                        }
                    })                   
                }else{
                     $scope.item.noTerima = '';
                     $scope.item.noBuktiKK = '';
                }
        };

        $scope.Generate1 = function(data){

                if (data === true) {
                    var AsalPro = ''
                    if ($scope.item.asalproduk != undefined) {
                        AsalPro = $scope.item.asalproduk.id
                    }
                    manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-nostruk-generate?asalproduk="+AsalPro, true).then(function(dat){
                        var datas =dat.data
                        if (datas.noStruk != "") {
                            $scope.item.noTerima = datas.noStruk
                        }else{
                            $scope.item.noTerima = ""
                        }

                        if (datas.noBuktiKK != "") {
                            $scope.item.noBuktiKK = datas.noBuktiKK
                        }else{
                            $scope.item.noBuktiKK = ""
                        }
                    })                   
                }else{
                     $scope.item.noTerima ='';
                     $scope.item.noBuktiKK='';
                }
        };



        function init() {
            // $scope.isRouteLoading=true;
            // 
            manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-combo", true).then(function(dat){
                $scope.listKelompokProduk = dat.data.kelompokproduk;
                $scope.item.kelompokproduk = {id:24,kelompokproduk:'Barang Persediaan'}
                $scope.listmataAnggaran = dat.data.mataanggaran;

                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-produk?idkelompokproduk="+$scope.item.kelompokproduk.id, true).then(function(dat){
                    $scope.listProduk = dat.data.produk;
                });

                 modelItemAkuntansi.getDataDummyPHP("spk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function(data) {
                    $scope.listPegawaiPembuat= data;
                });
                // manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function(dat){
                //     $scope.listKoordinator = dat.data.jenisusulan;
                //     $scope.item.koordinator = {id:1,jenisusulan:'Medis'};
                // });

                $scope.listAsalBarang = dat.data.asalproduk;
                $scope.listRuangan = dat.data.ruangan;
                $scope.listRuanganKK = dat.data.ruangan;
                $scope.item.ruanganPenerima = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                $scope.item.ruanganKK = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
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
                    $scope.isRouteLoading=true;
                    if (noOrder == 'EditTerima') {
                         $scope.disableSppb =true;
                         manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function(dat){
                            $scope.listKoordinator = dat.data.jenisusulan;
                            $scope.item.koordinator = {id:1,jenisusulan:'Medis'};
                        });
                        manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-detail-terima-barang-suplier?norec="+norecTerima, true).then(function(data_ih){
                            //
                            $scope.isRouteLoading=false;
                            $scope.item.noTerima = data_ih.data.detailterima.nostruk
                            $scope.item.noUsulan = data_ih.data.detailterima.nousulan
                            $scope.item.noOrder = data_ih.data.detailterima.nosppb
                            $scope.item.noKontrak = data_ih.data.detailterima.nokontrak
                            $scope.item.tglTerima = data_ih.data.detailterima.tglstruk
                            $scope.item.tglUsulan = data_ih.data.detailterima.tglrealisasi
                            $scope.item.tglAwal = data_ih.data.detailterima.tgldokumen
                            $scope.item.ketTerima = data_ih.data.detailterima.keteranganambil
                            $scope.item.namaPengadaan = data_ih.data.detailterima.namapengadaan
                            $scope.item.keterangan1 = data_ih.data.detailterima.keteranganlainnya
                            $scope.item.tahun = moment(data_ih.data.detailterima.tglstruk).format('YYYY');
                            $scope.item.kelompokproduk ={id:data_ih.data.pelayananPasien[0].kpid,kelompokproduk:data_ih.data.pelayananPasien[0].kelompokproduk} 
                            $scope.item.asalproduk = {id:data_ih.data.pelayananPasien[0].asalprodukfk,asalproduk:data_ih.data.pelayananPasien[0].asalproduk} 
                            $scope.item.ruanganPenerima = {id:data_ih.data.detailterima.id,namaruangan:data_ih.data.detailterima.namaruangan} 
                            $scope.item.pegawaiPenerima = {id:data_ih.data.detailterima.pgid,namalengkap:data_ih.data.detailterima.namalengkap} 
                            $scope.item.pegawaiPembuat = {id:data_ih.data.detailterima.objectpegawaipenanggungjawabfk,namalengkap:data_ih.data.detailterima.penanggungjawab} 
                            $scope.item.tglFaktur = data_ih.data.detailterima.tglfaktur
                            $scope.item.noFaktur = data_ih.data.detailterima.nofaktur
                            $scope.item.namaRekanan = {id:data_ih.data.detailterima.objectrekananfk,namarekanan:data_ih.data.detailterima.namarekanan} 
                            norec_Realisasi = data_ih.data.detailterima.norecrealisasi;
                            $scope.item.mataAnggaran ={norec:data_ih.data.detailterima.mataanggranid, mataanggaran:data_ih.data.detailterima.namamataanggaran}
                            kelTrans=35;
                            // $scope.item.ruangan = {id:data_ih.data.detailresep.id,namaruangan:data_ih.data.detailresep.namaruangan}
                            // $scope.item.penulisResep = {id:data_ih.data.detailresep.pgid,namalengkap:data_ih.data.detailresep.namalengkap}
                            // $scope.item.nocm = data_ih.data.detailresep.nocm
                            // $scope.item.namapasien = data_ih.data.detailresep.nama
                            // $scope.item.tglLahir = data_ih.data.detailresep.tgllahir
                            // $scope.item.noTelepon = data_ih.data.detailresep.notlp
                            // $scope.item.alamat = data_ih.data.detailresep.alamat

                            data2 = data_ih.data.pelayananPasien
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
                                "field": "qtyprodukretur",
                                "title": "Jumlah Retur",
                                "width" : "50px",
                            },
                            {
                                "field": "hargasatuan",
                                "title": "Harga Satuan",
                                "width" : "70px",
                                "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                            },
                            {
                                "field": "ppn",
                                "title": "Ppn",
                                "width" : "70px",
                                "template": "<span class='style-right'>{{formatRupiah('#: ppn #', '')}}</span>"
                            },
                            {
                                "field": "hargadiscount",
                                "title": "Harga Discount",
                                "width" : "70px",
                                "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                            },
                            {
                                "field": "total",
                                "title": "SubTotal",
                                "width" : "100px",
                                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                            },
                            {
                                "field": "nobatch",
                                "title": "No Batch",
                                "width" : "50px",
                            },
                            {
                                "field": "tglkadaluarsa",
                                "title": "Tgl Kadaluarsa",
                                "width" : "100px",
                                "template": "<span class='style-center'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                            }
                        ];

                    }
                }else{
                    manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function(dat){
                            $scope.listKoordinator = dat.data.jenisusulan;
                            $scope.item.koordinator = {id:1,jenisusulan:'Medis'};
                        });
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
                            "field": "ppn",
                            "title": "Ppn",
                            "width" : "70px",
                            "template": "<span class='style-right'>{{formatRupiah('#: ppn #', '')}}</span>"
                        },
                        {
                            "field": "hargadiscount",
                            "title": "Harga Discount",
                            "width" : "70px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "SubTotal",
                            "width" : "100px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                        },
                        {
                            "field": "nobatch",
                            "title": "No Batch",
                            "width" : "50px",
                        },
                        {
                            "field": "tglkadaluarsa",
                            "title": "Tgl Kadaluarsa",
                            "width" : "100px",
                            "template": "<span class='style-center'>{{formatTanggal('#: tglkadaluarsa #', '')}}</span>"
                        }
                    ];
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
        GETKONVERSI(0)    
    // }
    
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
    $scope.item.jumlah = 0;
    $scope.item.hargaSatuan = 0;
    // $scope.item.ppn = 0;
    $scope.item.ppnpersen = 0;
    $scope.item.hargaDiskon = 0;
    $scope.item.hargaDiskonPersen = 0;
    $scope.item.subTotaltxt = 0;

    $scope.item.keterangan = '-';
    $scope.item.nobatch = '-';
    $scope.item.tglkadaluarsa =new Date();
    // if ($scope.item.ruangan == undefined) {
    //     //alert("Pilih Ruangan terlebih dahulu!!")
    //     return;
    // }
            manageLogistikPhp.getDataTableTransaksi("logistik/get-harga?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk=50" , true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    $scope.item.hargaSatuan =0
                    $scope.item.hargadiskon =0
                    $scope.item.hargaNetto=0
                    $scope.item.total = 0
                    $scope.item.jumlah = 0 
                    $scope.item.hargaSatuan = dat.data.detail[0].harga
            });
}
        $scope.getNilaiKonversi = function(){
            $scope.item.nilaiKonversi =  $scope.item.satuan.nilaikonversi
            manageLogistikPhp.getDataTableTransaksi("logistik/get-harga?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk=50", true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    $scope.item.hargaSatuan =0
                    $scope.item.hargadiskon =0
                    $scope.item.hargaNetto=0
                    $scope.item.total = 0
                    $scope.item.jumlah = 0 
                    $scope.item.hargaSatuan = dat.data.detail[0].hargapenerimaan
            });
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
        // var qty = 0
        //     var hrgsatuan =0 
        //     var ppn = 0 
        //     var hargadiskon = 0
        //     var ppnprs = 0 
        //     var hargadiskonprs = 0

        $scope.$watch('item.noTerima', function(newValue, oldValue) {
            if (newValue != oldValue  ) {

                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-nostruk?NoSPK="+$scope.item.noTerima, true).then(function(data_ih){
                    var datas = data_ih.data;
                    for (var i = datas.length - 1; i >= 0; i--) {
                       if(datas[i].nostruk == $scope.item.noTerima && noOrder != 'EditTerima'){
                         alert("No Terima Tidak Boleh Sama!")
                         // $scope.item.noTerima = "";
                         break
                       } 
                    }
                    // if (datas == $scope.item.hps) {
                        
                    // }
                })

            }
        });

        $scope.$watch('item.noFaktur', function(newValue, oldValue) {
            if (newValue != oldValue  ) {

                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-nofaktur?NoSPK="+$scope.item.noFaktur, true).then(function(data_ih){
                    var datas = data_ih.data;
                    for (var i = datas.length - 1; i >= 0; i--) {
                       if(datas[i].nofaktur == $scope.item.noFaktur && noOrder != 'EditTerima'){
                         alert("No Terima Tidak Boleh Sama!")
                         // $scope.item.noFaktur = "";
                         break
                       } 
                    }
                    // if (datas == $scope.item.hps) {
                        
                    // }
                })

            }
        });

        $scope.$watch('item.jumlah', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotaltxt = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.$watch('item.jumlahRetur', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlahRetur)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotaltxt = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.$watch('item.hargaSatuan', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotaltxt = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.$watch('item.ppn', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotaltxt = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.$watch('item.hargaDiskon', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotaltxt = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.$watch('item.ppnpersen', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                $scope.item.ppn = (parseFloat($scope.item.ppnpersen)*parseFloat($scope.item.hargaSatuan))/100
            }
        });
        $scope.$watch('item.hargaDiskonPersen', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                $scope.item.hargaDiskon = (parseFloat($scope.item.hargaDiskonPersen)*parseFloat($scope.item.hargaSatuan))/100
            }
        });

        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.tambah = function () {

            if ($scope.item.subTotaltxt == 0) {
                alert("SubTotal harus di isi!")
                return;
            }
            if ($scope.item.jumlah == 0) {
                alert("Jumlah harus di isi!")
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
                            // if(data2[i].qtyprodukretur == undefined && $scope.item.jumlahRetur != 0){

                                data.no = $scope.item.no
                                data.hargasatuan = String($scope.item.hargaSatuan)
                                data.ruanganfk = $scope.item.ruanganPenerima.id
                                data.asalprodukfk = $scope.item.asalproduk.id
                                data.asalproduk = $scope.item.asalproduk.asalproduk
                                data.produkfk = $scope.item.produk.id
                                data.namaproduk = $scope.item.produk.namaproduk
                                data.nilaikonversi = $scope.item.nilaiKonversi
                                data.satuanstandarfk = $scope.item.satuan.ssid
                                data.satuanstandar = $scope.item.satuan.satuanstandar
                                data.satuanviewfk = $scope.item.satuan.ssid
                                data.satuanview = $scope.item.satuan.satuanstandar
                                data.jumlah = parseFloat($scope.item.jumlah)-parseFloat($scope.item.jumlahRetur)
                                data.qtyprodukretur = $scope.item.jumlahRetur
                                data.hargadiscount =String($scope.item.hargaDiskon)
                                data.persendiscount = String($scope.item.hargaDiskonPersen)
                                data.ppn =String($scope.item.ppn)
                                data.persenppn = String($scope.item.ppnpersen)
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
                                retur = 0;
                                for (var i = data2.length - 1; i >= 0; i--) {
                                    if(data2[i].qtyprodukretur == undefined){
                                        data2[i].qtyprodukretur=retur
                                    }
                                    ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].qtyprodukretur))
                                    ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].qtyprodukretur))
                                    ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].qtyprodukretur))
                                }
                                $scope.item.total=parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalDiskon=parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalPpn=parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                                grandTotal = ttlTotal+ttlPpn-ttlDiskon
                                $scope.item.grandTotal=parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                            // }
                        }
                    }
                }else{
                    data={
                        no:nomor,
                        hargasatuan:String($scope.item.hargaSatuan),
                        ruanganfk:$scope.item.ruanganPenerima.id,
                        asalprodukfk:$scope.item.asalproduk.id,
                        asalproduk:$scope.item.asalproduk.asalproduk,
                        produkfk:$scope.item.produk.id,
                        namaproduk:$scope.item.produk.namaproduk,
                        nilaikonversi:$scope.item.nilaiKonversi,
                        satuanstandarfk:$scope.item.satuan.ssid,
                        satuanstandar:$scope.item.satuan.satuanstandar,
                        satuanviewfk:$scope.item.satuan.ssid,
                        satuanview:$scope.item.satuan.satuanstandar,
                        jumlah:$scope.item.jumlah,
                        qtyprodukretur:$scope.item.jumlahRetur,
                        hargadiscount:String($scope.item.hargaDiskon),
                        persendiscount:String($scope.item.hargaDiskonPersen),
                        ppn:String($scope.item.ppn),
                        persenppn:String($scope.item.ppnpersen),
                        total:$scope.item.subTotaltxt,
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
                        ttlTotal=ttlTotal+ (parseFloat(data2[i].hargasatuan)* parseFloat(data2[i].qtyprodukretur))
                        ttlDiskon=ttlDiskon+ (parseFloat(data2[i].hargadiscount)* parseFloat(data2[i].qtyprodukretur))
                        ttlPpn=ttlPpn+ (parseFloat(data2[i].ppn)* parseFloat(data2[i].qtyprodukretur))
                    }
                    $scope.item.total=parseFloat(ttlTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    $scope.item.totalDiskon=parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                    $scope.item.totalPpn=parseFloat(ttlPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                    grandTotal = ttlTotal+ttlPpn-ttlDiskon
                    $scope.item.grandTotal=parseFloat(grandTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                }
            Kosongkan()
            // racikan =''
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
            $scope.listSatuan = [{ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}]//dataProduk.konversisatuan
            // $scope.item.stok = dataSelected.jmlstok //* $scope.item.nilaiKonversi 

            $scope.item.jumlah = dataSelected.jumlah
            $scope.item.hargaSatuan = dataSelected.hargasatuan
            if (dataSelected.persenppn == 0 && dataSelected.ppn == "10" ) {
                $scope.item.ppnpersen = dataSelected.ppn
                $scope.item.ppn = (parseFloat($scope.item.ppnpersen)*parseFloat(dataSelected.hargasatuan))/100
            }else if(dataSelected.persenppn == "10"){
                $scope.item.ppnpersen = dataSelected.persenppn
                 $scope.item.ppn = (parseFloat($scope.item.ppnpersen)*parseFloat(dataSelected.hargasatuan))/100
            }else if(dataSelected.ppn != "10" && dataSelected.ppn != 0){
                var ppnu = 0;
                var ppnu = parseFloat(dataSelected.hargasatuan)/parseFloat(dataSelected.ppn)
                $scope.item.ppn = dataSelected.ppn
                $scope.item.ppnpersen = ppnu;
//                 $scope.item.ppn = (parseFloat($scope.item.ppnpersen)*parseFloat(dataSelected.hargasatuan))/100
            }else{
                 // var ppnu = parseFloat(dataSelected.hargasatuan)/parseFloat(dataSelected.ppn)
                 $scope.item.ppnpersen = 0
                 $scope.item.ppn = 0
            }
            $scope.item.jumlahRetur = 0;
            // $scope.item.ppn = dataSelected.ppn
            $scope.item.hargaDiskon = dataSelected.hargadiscount
            $scope.item.hargaDiskonPersen = dataSelected.persendiscount
            $scope.item.keterangan = dataSelected.keterangan
            $scope.item.nobatch = dataSelected.nobatch
            $scope.item.tglkadaluarsa = dataSelected.tglkadaluarsa
            // GETKONVERSI(dataSelected.jumlah)
            if(dataSelected.nilaikonversi == null){
                $scope.item.nilaiKonversi=1;
            }else{
                $scope.item.nilaiKonversi = dataSelected.nilaikonversi
            }
            $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}
            
            
            // $scope.item.jumlah = dataSelected.jumlah
            // $scope.item.hargaSatuan = dataSelected.hargasatuan
            // $scope.item.hargadiskon = dataSelected.hargadiscount
            // $scope.item.total = dataSelected.total
        }
        function Kosongkan(){
            $scope.item.produk =''
            // $scope.item.asal =''
            $scope.item.satuan=''
            $scope.item.nilaiKonversi=0
            $scope.item.hargaSatuan=0
            $scope.item.jumlah=0
            $scope.item.hargadiskon=0
            $scope.item.no=undefined
            $scope.item.ppn=0
            $scope.item.hargaDiskon=0
            $scope.item.subTotaltxt=0
            $scope.item.jumlahRetur=0
        }
        $scope.batal = function(){
            Kosongkan()
            // $scope.popUp.center().open();
        }

        
        $scope.formatRupiah = function(value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
        $scope.kembali=function(){
           window.history.back();
            //$scope.popUp.center().open();
        }

         function GetprodukRetur(){
                
            manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-to-retur?noTerima="+norecTerima 
                + "&ruanganfk=" + $scope.item.ruanganPenerima.id
                , true).then(function(dat){
                
                datas=dat.data;
                var jumlah = 0 ;
                for (var i = 0; i < datas.length; i++) {
                    for (var j = 0; j < data2.length; j++) {
                        if (data2[j].produkfk == datas[i].kdeproduk) {
                            if (data2[j].qtyprodukretur <= datas[i].qtyproduk) {
                               jumlah = i + 1;
                            }
                        }
                    }
                }
                if(data2.length <= jumlah){

                   var rkk = null
                    if ($scope.item.ruanganKK != undefined) {
                        rkk=$scope.item.ruanganKK.id
                    }
                    var tglkk = null
                    if ($scope.item.tglKK != undefined) {
                        tglkk =$scope.item.tglKK
                    }
                    var pegkk = null
                    if ($scope.item.pegawaiKK != undefined) {
                        pegkk =$scope.item.pegawaiKK.id
                    }
                    var nokontrak = "-"
                    if ($scope.item.noKontrak != undefined){
                        nokontrak=$scope.item.noKontrak
                    }
                    var kelTrans = ""
                    if (kelTrans == ''){
                        kelTrans=35;
                    }
                    var usulan = "-"
                    if ($scope.item.noUsulan != undefined){
                        usulan=$scope.item.noUsulan
                    }

                    var norecOrder =null;
                    if(norecTerima == '' || norecTerima == undefined){
                        norecOrder=null;
                    }else if (norecSPPB != undefined && norecTerima == undefined) {
                        norecOrder=norecSPPB;
                    }else if (norecTerima != undefined && norecSPPB == undefined) {
                        norecOrder=norecTerima;
                    }

                    var jenisusulan =null;
                    if ($scope.item.koordinator != undefined) {
                        jenisusulan = $scope.item.koordinator.id;
                    }

                    var mataanggaran = '';
                    if ($scope.item.mataAnggaran != undefined) {
                        mataanggaran=$scope.item.mataAnggaran.norec
                    }
                    var ketTerima = '';
                    if ($scope.item.ketTerima != undefined) {
                        ketTerima=$scope.item.ketTerima
                    }
                    var namapengadaan = '-';
                    if ($scope.item.namaPengadaan != undefined) {
                        namapengadaan = $scope.item.namaPengadaan
                    }
                    var noOrder = '-';
                    if ($scope.item.noOrder != undefined) {
                        noOrder = $scope.item.noOrder
                    }
                     $scope.saveShow=false;
                    var struk = {
                        norecRetur: norecRetur,
                        nostruk: norecTerima,
                        noorder: noOrder,
                        rekananfk: $scope.item.namaRekanan.id,
                        namarekanan: $scope.item.namaRekanan.namarekanan,
                        ruanganfk: $scope.item.ruanganPenerima.id,
                        namaruangan: $scope.item.ruanganPenerima.namaruangan,
                        nofaktur: $scope.item.noFaktur, 
                        pegawaimenerimafk : $scope.item.pegawaiPenerima.id,
                        qtyproduk:data2.length,
                        noterima:$scope.item.noTerima,
                        keterangan:$scope.item.Keterangan,
                    }
                    var objSave = 
                    {
                        struk:struk,
                        details:data2
                    }

                    manageLogistikPhp.returpenerimaanbarang(objSave).then(function(e) {
                       
                    })

                 }else{
                     alert("Stok Telah Terpakai, Tidak Bisa Di Retur!!!")
                     return;
                 }

            });
        }

        function SaveReturPenerimaan(){
            GetprodukRetur();
        }

        $scope.simpan = function(){

            if ($scope.item.noTerima == undefined) {
                alert("No Terima Tidak Boleh Kosong!!")
                return
            }        
            if ($scope.item.ruanganPenerima == undefined) {
                alert("Pilih Ruangan Penerima!!")
                return
            }
            if ($scope.item.pegawaiPenerima == undefined) {
                alert("Pilih Pegawai Penerima!!")
                return
            }           
            if ($scope.item.noFaktur == undefined) {
                alert("No Faktur Kosong!!")
                return
            }
            if ($scope.item.namaRekanan == undefined) {
                alert("Pilih Nama Rekanan!!")
                return
            }
            if ($scope.item.Keterangan == undefined) {
                 alert("Keterangan Retur Kosong!!")
                return
            }
            if (data2.length == 0) {
                alert("Pilih Produk terlebih dahulu!!")
                return
            }            
            
            var confirm = $mdDialog.confirm()
                .title('Peringatan')
                .textContent('Apakah anda yakin akan retur barang?')
                .ariaLabel('Lucky day')
                .cancel('Tidak')
                .ok('Ya')
                $mdDialog.show(confirm).then(function () {
                    SaveReturPenerimaan();
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
            // $scope.BatalR = function(){
            //     $scope.showInputObat =true
            //     $scope.showRacikan = false
            //     $scope.item.jenisKemasan =''

            //     racikan =''
            // }

            $scope.hapus = function(){
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
                            $scope.item.total=parseFloat(ttlDiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
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

            $scope.loadComboProduk = function () {
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-produk?idkelompokproduk="+$scope.item.kelompokproduk.id, true).then(function(dat){
                    $scope.listProduk = dat.data.produk;
                });
            }
            $scope.KlikFakturOtomatis = function(data){
                if (data === true) {
                    /* Format No Faktur PB/BLN-THN/APT/NO URUT (APT = BLU, BG = Hibah,  KK = Kas  Kecil) */ 
                    var asalproduk ='';
                    if ($scope.item.asalproduk != undefined) {
                        asalproduk = $scope.item.asalproduk.asalproduk
                    }
                    var nows = moment(new Date()).format('MM-YY')
                    if (asalproduk.indexOf('Badan Layanan') > -1 || asalproduk =='' )
                       $scope.item.noFaktur = 'PB/' + nows + '/APT/____'
                    else if (asalproduk.indexOf('Hibah') > -1)
                         $scope.item.noFaktur = 'PB/' + nows + '/BG/____'
                    else if (asalproduk.indexOf('Kas Kecil') > -1)
                         $scope.item.noFaktur = 'PB/' + nows + '/KK/____'

                }else{
                    delete $scope.item.noFaktur 
                }
        };
//***********************************

}
]);
});
