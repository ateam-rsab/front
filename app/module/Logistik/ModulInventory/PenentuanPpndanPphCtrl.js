define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PenentuanPpndanPphCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,modelItemAkuntansi) {
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
            LoadCache();
            function LoadCache(){
                
                var chacePeriode = cacheHelper.get('PenentuanPpndanPphCtrl');
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
                    cacheHelper.set('PenentuanPpndanPphCtrl', chacePeriode);
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
            
            manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-combo", true).then(function(dat){
                $scope.listKelompokProduk = dat.data.kelompokproduk;
                $scope.item.kelompokproduk = {id:24,kelompokproduk:'Barang Persediaan'}
                $scope.listmataAnggaran = dat.data.mataanggaran; 
                $scope.listAsalBarang = dat.data.asalproduk;
                $scope.item.tglConfirm = $scope.now;;

                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/get-data-produk?idkelompokproduk="+$scope.item.kelompokproduk.id, true).then(function(dat){
                    $scope.listProduk = dat.data.produk;
                });

                 modelItemAkuntansi.getDataDummyPHP("upk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function(data) {
                    $scope.listPegawai= data;
                })

                manageLogistikPhp.getDataTableTransaksi("upk/ruangan/get-data-combo?produk=0", true).then(function(dat){
                    $scope.listKoordinator = dat.data.jenisusulan;
                    $scope.item.koordinator = {id:1,jenisusulan:'Medis'};
                    $scope.listUnitPengusul = dat.data.ruanganall;
                    // $scope.item.ruanganPengusul = {id:$scope.listUnitPengusul[0].id,namaruangan:$scope.listUnitPengusul[0].namaruangan};
                    $scope.listUnitTujuan = dat.data.ruangan;
                    $scope.item.ruanganTujuan = {id:$scope.listUnitTujuan[0].id,namaruangan:$scope.listUnitTujuan[0].namaruangan};
                    // $scope.item.noUsulan = $scope.listUnitPengusul[0].kodeUsulan
                });

                // $scope.listAsalBarang = dat.data.asalproduk;
                // $scope.listRuangan = dat.data.ruangan;
                // $scope.listRuanganKK = dat.data.ruangan;
                // $scope.item.ruanganPenerima = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                // $scope.item.ruanganKK = {id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan}
                // $scope.listPegawai = dat.data.detaillogin;
                // $scope.item.pegawaiPenerima = {id:$scope.listPegawai[0].id,namalengkap:$scope.listPegawai[0].namalengkap}
                // $scope.listRekanan = dat.data.rekanan;
                // $scope.listpegawaiKK = dat.data.pegawaipenerima;
                // $scope.listProduk = dat.data.produk;
                // pegawaiUser = dat.data.detaillogin[0]; 
                
                if (noOrder != '') {
                    $scope.isRouteLoading=true;
                    if (noOrder == 'EditTerima') {
                        manageLogistikPhp.getDataTableTransaksi("data-hps/get-detail-SPPB?norecOrder="+norecTerima, true).then(function(data_ih){                            
                            $scope.isRouteLoading=false;
                                $scope.item.noUsulan=data_ih.data.detail.noorder
                                // $scope.item.noOrder=data_ih.data.detail.noorder
                                $scope.item.tglUsulan=data_ih.data.detail.tglorder
                                // $scope.item.keterangan=data_ih.data.detail.keterangan
                                $scope.item.pegawaiPembuat={id:data_ih.data.detail.petugasid,namalengkap:data_ih.data.detail.petugas} 
                                $scope.item.koordinator={id:1,jenisusulan:'Medis'} 
                                $scope.item.tglDibutuhkan=data_ih.data.detail.tglusulan
                                $scope.item.namaPengadaan=data_ih.data.detail.namapengadaan
                                $scope.item.noKontrak=data_ih.data.detail.nokontrak
                                $scope.item.tahun=data_ih.data.detail.tahunusulan
                                $scope.item.alamatSupl=data_ih.data.detail.alamat
                                $scope.item.telpSupl=data_ih.data.detail.telp
                                $scope.item.suplier={id:data_ih.data.detail.namarekananid,namarekanan:data_ih.data.detail.namarekanan} 
                                $scope.item.keteranganUsulan = data_ih.data.detail.keterangan
                                $scope.item.nip = data_ih.data.detail.nippns
                                $scope.item.penanggungjawab ={id:data_ih.data.detail.penanggungjawabid,namalengkap:data_ih.data.detail.penanggungjawab}
                                $scope.item.mengetahui ={id:data_ih.data.detail.pegawaimengetahuiid,namalengkap:data_ih.data.detail.pegawaimengetahui} 
                                $scope.item.asalproduk = {id:data_ih.data.details[0].asalprodukfk,asalproduk:data_ih.data.details[0].asalproduk} 
                                norec_Realisasi = data_ih.data.detail.norecrealisasi;
                                norecRR=data_ih.data.detail.norecrr;
                                $scope.item.ruanganPengusul ={id:data_ih.data.detail.idunitpengusul ,namaruangan:data_ih.data.detail.unitpengusul}
                                $scope.item.ruanganTujuan ={id:data_ih.data.detail.idunittujuan ,namaruangan:data_ih.data.detail.unittujuan}
                                // keltrans=data_ih.data.detail.keltransaksi;
                                verifikasifk=data_ih.data.detail.objectsrukverifikasifk
                                $scope.item.mataAnggaran ={norec:data_ih.data.detail.mataanggaranid, mataanggaran:data_ih.data.detail.mataanggaran}
                                kelTrans=101;                        
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
                }else{
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

$scope.getDataLain = function(){
     manageLogistikPhp.getDataTableTransaksi("data-hps/no-hps?NoHPS="+$scope.item.hps, true).then(function(data_ih){
        var datas = data_ih.data;
        if (datas == $scope.item.hps) {
             alert("No HPS Tidak Boleh Sama!")
             return;
        }
    })
}

$scope.$watch('item.hps', function(newValue, oldValue) {
    if (newValue != oldValue  ) {

        manageLogistikPhp.getDataTableTransaksi("data-hps/no-hps?NoHPS="+$scope.item.hps, true).then(function(data_ih){
            var datas = data_ih.data;
            for (var i = datas.length - 1; i >= 0; i--) {
               if(datas[i].noorderhps == $scope.item.hps){
                 alert("No HPS Tidak Boleh Sama!")
                 $scope.item.hps = "";
                 break
               } 
            }
            // if (datas == $scope.item.hps) {
                
            // }
        })

    }
});
            
 $scope.CariHPS = function(){
    $scope.isRouteLoading=true;
    manageLogistikPhp.getDataTableTransaksi("data-hps/no-hps?NoHPS="+$scope.item.hps, true).then(function(data_ih){
        $scope.isRouteLoading=false;
        var datas = data_ih.data;
        if (datas == $scope.item.hps) {
             alert("No HPS Tidak Boleh Sama!")
             return;
        }
    })
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
    $scope.item.jumlah = 0;
    $scope.item.hargaSatuan = 0;
    $scope.item.ppn = 0;
    $scope.item.ppnpersen = 0;
    $scope.item.hargaDiskon = 0;
    $scope.item.hargaDiskonPersen = 0;
    $scope.item.subTotaltxt = 0;

    $scope.item.keterangan = '-';
    $scope.item.nobatch = '-';
    $scope.item.tglkadaluarsa =new Date();

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
        $scope.$watch('item.jumlah', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
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
                            data.no = $scope.item.no
                            data.hargasatuan = String($scope.item.hargaSatuan)
                            // data.ruanganfk = $scope.item.ruanganPenerima.id
                            data.asalprodukfk = $scope.item.asalproduk.id
                            data.asalproduk = $scope.item.asalproduk.asalproduk
                            data.produkfk = $scope.item.produk.id
                            data.namaproduk = $scope.item.produk.namaproduk
                            data.nilaikonversi = $scope.item.nilaiKonversi
                            data.satuanstandarfk = $scope.item.satuan.ssid
                            data.satuanstandar = $scope.item.satuan.satuanstandar
                            data.satuanviewfk = $scope.item.satuan.ssid
                            data.satuanview = $scope.item.satuan.satuanstandar
                            data.jumlah = $scope.item.jumlah
                            data.hargadiscount =String($scope.item.hargaDiskon)
                            data.persendiscount = String($scope.item.hargaDiskonPersen)
                            data.hargasatuan = String($scope.item.hargaSatuan)
                            data.hargasatuanquo = String($scope.item.hargaSatuan)
                            data.hargadiscountquo = String($scope.item.hargaDiskon)
                            data.hargappnquo = String($scope.item.ppn)
                            data.ppn =String($scope.item.ppn)
                            data.persenppn = String($scope.item.ppnpersen)
                            data.total = $scope.item.subTotaltxt
                            data.keterangan = $scope.item.keterangan
                            data.nobatch = $scope.item.nobatch
                            data.tglkadaluarsa = $scope.item.tglkadaluarsa
                            data.norec_op = data2[i].norec_op

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
                        // ruanganfk:$scope.item.ruanganPenerima.id,
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
                        hargadiscount:String($scope.item.hargaDiskon),
                        persendiscount:String($scope.item.hargaDiskonPersen),
                        ppn:String($scope.item.ppn),
                        persenppn:String($scope.item.ppnpersen),
                        hargasatuan:String($scope.item.hargaSatuan),
                        hargasatuanquo:String($scope.item.hargaSatuan),
                        hargadiscountquo:String($scope.item.hargaDiskon),
                        hargappnquo:String($scope.item.ppn),
                        total:$scope.item.subTotaltxt,
                        keterangan:$scope.item.keterangan,
                        nobatch:$scope.item.nobatch,
                        tglkadaluarsa:$scope.item.tglkadaluarsa,
                        norec_op:null
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
            $scope.item.no = dataSelected.no
            for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
                if ($scope.listProduk[i].id == dataSelected.produkfk){
                    dataProduk = $scope.listProduk[i]
                    break;
                }
            }
            $scope.item.produk = dataProduk//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
            $scope.listSatuan = [{ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}]//dataProduk.konversisatuan

            $scope.item.jumlah = dataSelected.jumlah
            $scope.item.hargaSatuan = dataSelected.hargasatuan
            $scope.item.ppnpersen = dataSelected.persenppn
            $scope.item.hargaDiskon = dataSelected.hargadiscount
            $scope.item.hargaDiskonPersen = dataSelected.persendiscount
            $scope.item.ppn= dataSelected.ppn
            $scope.item.subTotaltxt = dataSelected.total;
            $scope.item.keterangan = dataSelected.keterangan
            $scope.item.nobatch = dataSelected.nobatch
            $scope.item.tglkadaluarsa = dataSelected.tglkadaluarsa
            if(dataSelected.nilaikonversi == null){
                $scope.item.nilaiKonversi=1;
            }else{
                $scope.item.nilaiKonversi = dataSelected.nilaikonversi
            }
            $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}                        
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
            $scope.item.pegawaiConfirm = undefined
        }
        $scope.batal = function(){
            Kosongkan()
        }

        
        $scope.formatRupiah = function(value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }

        $scope.kembali=function(){
            window.history.back();
        }

        $scope.simpan = function(){
            if ($scope.item.asalproduk == undefined) {
                alert("Pilih Asal Produk!!")
                return
            }
            if ($scope.item.tglConfirm == undefined) {
                    alert("Isi tgl Confirm!!")
                    return
            }
            if ($scope.item.hps == undefined) {
                    alert("No HPS Kosong!!")
                    return
            }
            // if ($scope.item.ruanganPenerima == undefined) {
            //     alert("Pilih Ruangan Penerima!!")
            //     return
            // }
            if ($scope.item.pegawaiConfirm == undefined) {
                alert("Pilih Pegawai HPS!!")
                return
            }
            // if ($scope.item.tglFaktur == undefined) {
            //     alert("Pilih Tanggal Faktur!!")
            //     return
            // }
            // if ($scope.item.namaRekanan == undefined) {
            //     alert("Pilih Nama Rekanan!!")
            //     return
            // }
            // if ($scope.item.noTerima == undefined) {
            //      alert("No Terima Kosong!!")
            //     return
            // }
            if (data2.length == 0) {
                alert("Pilih Produk terlebih dahulu!!")
                return
            }
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
            // var kelTrans = ""
            if (kelTrans == ''){
                kelTrans=101;
            }
            var usulan = "-"
            if ($scope.item.noUsulan != undefined){
                usulan=$scope.item.noUsulan
            }

            var norec ='';
            if(noOrder == undefined){
                norec=norecSPPB;
            }else{
                norec=noOrder;
            }

            var mataanggaran = '';
            if ($scope.item.mataAnggaran != undefined) {
                mataanggaran=$scope.item.mataAnggaran.norec
            }

            var strukorder = {
                // nostruk: norecTerima,
                // rekananfk: $scope.item.namaRekanan.id,
                // namarekanan: $scope.item.namaRekanan.namarekanan,
                // ruanganfk: $scope.item.ruanganPenerima.id,
                // nokontrak: nokontrak,
                // nofaktur: $scope.item.noFaktur,
                // tglfaktur: moment($scope.item.tglFaktur).format('YYYY-MM-DD HH:mm'),
                // tglstruk: moment($scope.item.tglTerima).format('YYYY-MM-DD HH:mm'),
                // tglrealisasi: moment($scope.item.tglTerima).format('YYYY-MM-DD HH:mm'),
                // pegawaimenerimafk:$scope.item.pegawaiPenerima.id,
                // namapegawaipenerima: $scope.item.pegawaiPenerima.namalengkap,
                // qtyproduk:data2.length,
                // totalharusdibayar:grandTotal,
                // totalppn:ttlPpn,
                // totaldiscount:ttlDiskon,
                // totalhargasatuan:ttlTotal,
                // asalproduk:parseFloat($scope.item.asalproduk.id),
                // ruanganfkKK:rkk,
                // tglKK:tglkk,
                // pegawaifkKK:pegkk,
                // norecsppb:norecSPPB,
                // kelompoktranskasi:kelTrans,
                // norecrealisasi:norec_Realisasi,
                // nousulan:usulan,
                // norec:norec,
                // objectmataanggaranfk:mataanggaran,
                // noterima:$scope.item.noTerima,
                keteranganorder: $scope.item.keteranganUsulan,
                qtyjenisproduk: data2.length,
                tglUsulan: moment($scope.item.tglUsulan).format('YYYY-MM-DD HH:mm:ss'),
                tglDibutuhkan: moment($scope.item.tglDibutuhkan).format('YYYY-MM-DD HH:mm:ss'),
                koordinator:$scope.item.koordinator.jenisusulan,
                nousulan:$scope.item.noUsulan,
                ruanganfkPengusul:$scope.item.ruanganPengusul.id,
                ruanganfkTujuan:$scope.item.ruanganTujuan.id,
                penanggungjawabfk:$scope.item.penanggungjawab.id,
                mengetahuifk:$scope.item.mengetahui.id,
                nipPns:$scope.item.nip,
                norec:norecTerima,
                norecrealisasi:norec_Realisasi,
                norecriwayatrealisasi:norecRR,
                objectkelompoktransaksifk:keltrans,
                objectsrukverifikasifk:verifikasifk,
                objectmataanggaranfk:mataanggaran,
                totalharusdibayar:grandTotal,
                totalppn:ttlPpn,
                totaldiscount:ttlDiskon,
                totalhargasatuan:ttlTotal,
                tglconfirm: moment($scope.item.tglConfirm).format('YYYY-MM-DD HH:mm:ss'),
                pegawaihps: $scope.item.pegawaiConfirm.id,
                nohps: $scope.item.hps,
            }
            var objSave = 
            {
                strukorder:strukorder,
                details:data2
            }

            // manageLogistikPhp.postterimabarangsuplier(objSave).then(function(e) {
                manageLogistikPhp.savehps(objSave).then(function(e) {
                $scope.item.nokirim = e.data.nokirim
                    var stt = 'false'
                    if (confirm('View Struk? ')) {
                        // Save it!
                        stt='true';
                    } else {
                        // Do nothing!
                        stt='false'
                    }
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/logistik?cetak-hps=1&nores='+$scope.item.nokirim+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                        //aadc=response;
                    });
                    window.history.back();
                    $scope.saveShow=false;
                    Kosongkan();
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
//***********************************

}
]);
});
