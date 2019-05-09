define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegisterAsetCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.showInputObat =true
            $scope.showRacikan = false
            $scope.RegAsetShow = false
            $scope.saveShow=true;
            $scope.item.tglTerima=new Date();
            $scope.item.tglKK = new Date();
            $scope.isRouteLoading=false;
            $scope.kaskecilShow =false;
            $scope.headerUhu=true;
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
            var ttlTotal = 0 ;
            var ttlDiskon = 0 ;
            var ttlPpn = 0 ;
            var grandTotal = 0 ;
            var norecTerima =''
            var norecSPPB ='' 
            var qtyregis = 0; 
            var qtystok =0;
            var noasset='';
            LoadCache();
            $scope.item.tglRegAset = $scope.now;
            var keterangan='';
            // init();

            function LoadCache(){
                // $scope.item.noTerima = 'RS/' + moment(new Date()).format('YYMM')+'____'
                // $scope.item.noBuktiKK = '____' + '/KK/' + moment(new Date()).format('MM/YY')
                var chacePeriode = cacheHelper.get('RegisterAsetCtrl');
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
                    cacheHelper.set('RegisterAsetCtrl', chacePeriode);
               }else{
                    init()
               }
           }

        // $scope.getProduk = function(){
        //    modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
        //         debugger;
        //         $scope.listProduk = dat.data.produk;
        //    })
        // }
        function LoadGrid(){
            manageLogistikPhp.getDataTableTransaksi("aset/get-data-registeraset?norec="+norecTerima, true).then(function(data_ih){
                data2 = data_ih.data.pelayananPasien;
                $scope.dataGridAset = new kendo.data.DataSource({
                    data: data2
                });

            });
        }
        
        function init() {
            LoadGrid();
            modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                $scope.listProduk= data;
            })

            manageLogistikPhp.getDataTableTransaksi("aset/get-combo-aset", true).then(function(dat){
                $scope.listKelompokProduk = dat.data.kelompokproduk;
                // $scope.item.kelompokproduk = {id:24,kelompokproduk:'Barang Persediaan'}
                // $scope.listmataAnggaran = dat.data.mataanggaran;

                modelItemAkuntansi.getDataDummyPHP("spk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function(data) {
                    $scope.listPegawaiPembuat= data;
                });

                $scope.listAsalBarang = dat.data.asalproduk;
                $scope.listRuangan = dat.data.ruangan;
                $scope.listRuanganAset = dat.data.ruangan;
                $scope.listPegawai = dat.data.pegawai;
                $scope.listDjp = dat.data.detailjenisproduk;
                $scope.listJenisProduk = dat.data.jenisproduk;
                // $scope.item.pegawaiPenerima = {id:$scope.listPegawai[0].id,namalengkap:$scope.listPegawai[0].namalengkap}
                $scope.listRekanan = dat.data.rekanan;
                // pegawaiUser = dat.data.detaillogin[0]; 

                if (noOrder != '') {
                    $scope.isRouteLoading=true;
                    if (noOrder == 'RegisAset') {
                        manageLogistikPhp.getDataTableTransaksi("aset/get-detail-barang?norec="+norecTerima, true).then(function(data_ih){
                            debugger;
                            $scope.isRouteLoading=false;
                            $scope.item.noTerima = data_ih.data.detailterima.nostruk
                            $scope.item.tglTerima = data_ih.data.detailterima.tglstruk
                            $scope.item.kelompokproduk ={id:data_ih.data.pelayananPasien[0].kpid,kelompokproduk:data_ih.data.pelayananPasien[0].kelompokproduk} 
                            $scope.item.asalproduk = {id:data_ih.data.pelayananPasien[0].asalprodukfk,asalproduk:data_ih.data.pelayananPasien[0].asalproduk} 
                            $scope.item.ruanganPenerima = {id:data_ih.data.detailterima.id,namaruangan:data_ih.data.detailterima.namaruangan} 
                            $scope.item.pegawaiPenerima = {id:data_ih.data.detailterima.pgid,namalengkap:data_ih.data.detailterima.namalengkap} 
                            $scope.item.namaRekanan = {id:data_ih.data.detailterima.objectrekananfk,namarekanan:data_ih.data.detailterima.namarekanan} 
                            norec_Realisasi = data_ih.data.detailterima.norecrealisasi;
                            $scope.item.AlamatSup = data_ih.data.detailterima.alamatrekanan
                            $scope.item.telpSup = 'Telp. ' + data_ih.data.detailterima.telprekanan + '   ' +' Fax. ' + data_ih.data.detailterima.faxrekanan
                            kelTrans=35;
                           

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

$scope.formatTanggal = function(tanggal){
    return moment(tanggal).format('DD-MMM-YYYY');
}

$scope.klikGridAset = function(dataSelectedAset){
    debugger;
    if($scope.dataSelected == undefined){
        alert("Data Asset Belum Dipilih!!")
        return
    }
    $scope.item.NoAsset = $scope.dataSelectedAset.noregisteraset
    $scope.item.Produk = {id:$scope.dataSelectedAset.produkfk,namaproduk:$scope.dataSelectedAset.namaproduk};
    $scope.item.Harga = $scope.dataSelectedAset.hargasatuan;
    $scope.item.Djp = {id:$scope.dataSelectedAset.djpid,detailjenisproduk:$scope.dataSelectedAset.detailjenisproduk};
    $scope.item.JenisProduk = {id:$scope.dataSelectedAset.jpid,jenisproduk:$scope.dataSelectedAset.jenisproduk};
    $scope.item.norecdetail = $scope.dataSelectedAset.norec;
    $scope.item.stok = parseFloat($scope.dataSelectedAset.jumlah)-parseFloat($scope.dataSelectedAset.qtyregis);
    $scope.item.ruanganAset = {id:$scope.dataSelectedAset.objectruanganposisicurrentfk,namaruangan:$scope.dataSelectedAset.ruangaset};
    qtyregis = $scope.dataSelectedAset.qtyregis;
    $scope.item.Qty=$scope.dataSelectedAset.qtyprodukaset;
    keterangan = 'Edit Register Aset' + $scope.item.NoAsset
}

$scope.klikGrid = function(dataSelected){
    debugger;
    if($scope.dataSelected == undefined){
        alert("Data Asset Belum Dipilih!!")
        return
    }
    // $scope.item.NoAsset = $scope.dataSelected.noregisteraset
    $scope.item.Produk = {id:$scope.dataSelected.produkfk,namaproduk:$scope.dataSelected.namaproduk};
    $scope.item.Harga = $scope.dataSelected.hargasatuan;
    $scope.item.Djp = {id:$scope.dataSelected.djpid,detailjenisproduk:$scope.dataSelected.detailjenisproduk};
    $scope.item.JenisProduk = {id:$scope.dataSelected.jpid,jenisproduk:$scope.dataSelected.jenisproduk};
    $scope.item.norecdetail = $scope.dataSelected.norec;
    $scope.item.stok = parseFloat($scope.dataSelected.jumlah)-parseFloat($scope.dataSelected.qtyregis);
    $scope.item.ruanganAset = {id:$scope.dataSelected.objectruanganposisicurrentfk,namaruangan:$scope.dataSelected.ruangaset};
    qtyregis = $scope.dataSelected.qtyregis;
    $scope.item.Qty = 0;
    keterangan = 'Registrasi Aset Baru'
}

        function Kosongkan(){
            $scope.item.NoAsset = '';
            $scope.item.Produk = '';
            $scope.item.Harga = 0
            $scope.item.Djp = '';
            $scope.item.JenisProduk = '';
            $scope.item.norecdetail = '';
            $scope.item.stok = 0
            $scope.item.ruanganAset = '';
            $scope.item.Qty=0;
        }

        $scope.batal = function(){
            Kosongkan();
            $scope.RegAsetShow= false;
        }

        $scope.RegisAset = function(){
            debugger;
            if($scope.dataSelected == undefined){
                alert("Data Asset Belum Dipilih!!")
                return
            }
            $scope.RegAsetShow= true;
            $scope.item.Qty = 0;
            $scope.item.Produk = {id:$scope.dataSelected.produkfk,namaproduk:$scope.dataSelected.namaproduk};
            $scope.item.Harga = $scope.dataSelected.hargasatuan;
            $scope.item.Djp = {id:$scope.dataSelected.djpid,detailjenisproduk:$scope.dataSelected.detailjenisproduk};
            $scope.item.JenisProduk = {id:$scope.dataSelected.jpid,jenisproduk:$scope.dataSelected.jenisproduk};
            $scope.item.norecdetail = $scope.dataSelected.norec;
            $scope.item.stok = parseFloat($scope.dataSelected.jumlah)-parseFloat($scope.dataSelected.qtyregis);
            qtyregis = $scope.dataSelected.qtyregis;
            keterangan= 'Registrasi Aset Baru'
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
            "field": "qtyregis",
            "title": "Qty Teregistrasi",
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
        }];

        $scope.columnGridAset = [
            // {
            //     "field": "",
            //     "title": "No",
            //     "width" : "30px",
            // },
            {
                "field": "produkfk",
                "title": "Kode Produk",
                "width" : "120px",
            },
            {
                "field": "noregisteraset",
                "title": "No Asset",
                "width" : "50px",
            },
            {
                "field": "namaproduk",
                "title": "Nama Barang",
                "width" : "50px",
            },
            {
                "field": "ruangaset",
                "title": "Ruangan",
                "width" : "70px",
            }
        ];

        $scope.formatRupiah = function(value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
        $scope.kembali=function(){
            window.history.back();
        }

        $scope.simpanRegisAset = function(){
            if ($scope.item.Produk == undefined) {
                alert("Pilih Produk!!")
                return
            }
            if ($scope.item.Qty > 1) {
                alert("Qty Tidak Dari 1!!")
                return
            }
            if ($scope.item.Qty == 0) {
                alert("Qty Tidak Boleh Nol!!")
                return
            }
            if ($scope.item.Qty > $scope.item.stok) {
                alert("Qty Lebih Dari Stok!!")
                return
            }
            if ($scope.item.stok == 0) {
                alert("Data Sudah Diregistrasi Seluruhnya!!")
                return
            }
            if ($scope.item.asalproduk == undefined) {
                alert("Pilih Asal Produk!!")
                return
            }
            if ($scope.item.ruanganPenerima == undefined) {
                alert("Pilih Ruangan Penerima!!")
                return
            }
            if ($scope.item.ruanganAset == undefined) {
                alert("Pilih Ruangan Registrasi Kosong!!")
                return
            }
            if ($scope.item.pegawaiPenerima == undefined) {
                alert("Pilih Pegawai Penerima!!")
                return
            }
            if ($scope.item.namaRekanan == undefined) {
                alert("Pilih Nama Rekanan!!")
                return
            }

            if($scope.item.NoAsset != undefined){
                noasset = $scope.item.NoAsset
            }
            var  alamatsupplier ="-";
            if ($scope.item.AlamatSup != undefined ) {
                alamatsupplier=$scope.item.AlamatSup;
            } 

            var stokSPD = 0;
            if($scope.item.ruanganPenerima.id == $scope.item.ruanganAset.id){
                stokSPD = parseFloat($scope.item.stok);
            }else{
                stokSPD = parseFloat($scope.item.stok) - parseFloat($scope.item.Qty);
            }

            var regAset = {
                nostruk: norecTerima,
                rekananfk: $scope.item.namaRekanan.id,
                namarekanan: $scope.item.namaRekanan.id,
                ruanganfk: $scope.item.ruanganPenerima.id,
                objectruanganposisicurrentfk: $scope.item.ruanganAset.id,
                tglstruk: moment($scope.item.tglTerima).format('YYYY-MM-DD HH:mm'),
                tglregisteraset: moment($scope.item.tglRegAset).format('YYYY-MM-DD HH:mm'),
                tahunperolehan: moment($scope.item.tglRegAset).format('YYYY'),
                produkfk: $scope.item.Produk.id,
                qtyprodukaset: $scope.item.Qty,
                saldoawal:  stokSPD,
                alamatlengkap:  alamatsupplier,
                nostrukterimadetailfk: $scope.item.norecdetail,           
                hargasatuan : $scope.item.Harga,
                objectdetailjenisproduk: $scope.item.Djp.id,
                objectjenisproduk: $scope.item.JenisProduk.id,
                noasset: noasset,
                qty : parseFloat($scope.item.Qty)+parseFloat(qtyregis),
                keterangan: keterangan,
                asalprodukfk: $scope.item.asalproduk.id
            }
            var objSave = 
            {
                regAset:regAset,
            }

                manageLogistikPhp.simpanregistrasiasset(objSave).then(function(e) {
                    LoadGrid();
                    Kosongkan();
                    init();
                // $scope.item.noTerima = e.data.noterima
                //     var stt = 'false'
                //     if (confirm('View Struk? ')) {
                //         // Save it!
                //         stt='true';
                //     } else {
                //         // Do nothing!
                //         stt='false'
                //     }
                //     var client = new HttpClient();
                    // client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores='+e.data.noresep.norec+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    //     //aadc=response;
                    // });
                    // client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+e.data.data.norec+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    //     //aadc=response;
                    // });
                    // window.history.back();
                    // $scope.saveShow=false;
                    // Kosongkan();
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
                Kosongkan()
            }
//***********************************

}
]);
});
