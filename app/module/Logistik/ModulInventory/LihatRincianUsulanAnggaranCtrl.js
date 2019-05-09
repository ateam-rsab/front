define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LihatRincianUsulanAnggaranCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ModelItemAkuntansi','ModelItem','$window','$mdDialog','ManageServicePhp',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,modelItemAkuntansi,ModelItem,window, $mdDialog, manageServicePhp) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.showInputObat =true
            $scope.showRacikan = false
            $scope.saveShow=true;
            $scope.item.periodeTahun = $scope.now;
            $scope.item.periodeTahuns = $scope.now;
            $scope.dataAnggaranSelected={};
            $scope.dataSelected={};
            $scope.item.saldoRms=0;
            $scope.item.saldoBlus=0;
            $scope.item.tglKebutuhan=new Date();
            $scope.item.tglConfirm=new Date();
            var pegawaiUser = {}
            var norec_Realisasi='';
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
            $scope.treeSourceAnggaran=[];
            var hrg1 = 0
            var hrgsdk = 0
            var hrgPpn = 0
            var racikan = 0
            var TotTotal = 0
            var TotPpn = 0  
            var qty = 0   
            var hrgsatuan =0
            var hargadiskon =0
            var ppn = 0
            LoadComboAnggaran();
            LoadCache();

            $scope.findData=function(){
                loadTreeview();
            }

            function LoadComboAnggaran(){
                $scope.item.SaldoBlu = 0;
                $scope.item.SaldoRm = 0; 
                manageLogistikPhp.getDataTableTransaksi("upk/get-daftar-combo-anggaran", true).then(function(dat){
                    var data = dat.data;
                    $scope.listHeadSatu = data.headsatu;
                    $scope.listHeadDua = data.headdua;
                    $scope.listHeadTiga = data.headtiga;
                    $scope.listHeadEmpat = data.headempat;
                    $scope.listmataAnggaran = data.mataanggaran;
                    $scope.listPengendali = data.pengendali;
                    $scope.listAsalBarang = data.asalproduk;
                    $scope.listStatus = [{id:1,status:'Disetujui'},{id:2,status:'Tidak Disetujui'}]
                });

            }

            $scope.GetOtherHead1 = function(){

                if ($scope.item.Pengendali != undefined) {
                    manageLogistikPhp.getDataTableTransaksi("upk/get-daftar-data-master-anggaran?Pengendali="+$scope.item.Pengendali.id, true).then(function(dat){
                        var data = dat.data.data;
                        $scope.listmataAnggaran = data;
                    });
                }
            }

            $scope.GetSaldo = function(){
                 if ($scope.item.mataAnggaran != undefined) {

                    $scope.item.SaldoBlu = parseFloat($scope.item.mataAnggaran.saldoawalblu).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.SaldoRm = parseFloat($scope.item.mataAnggaran.saldoawalrm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 

                 }
            }

            // init();
            function LoadCache(){
               var chacePeriode = cacheHelper.get('LihatRincianUsulanAnggaranCtrl');
                if(chacePeriode != undefined){
                   norecResep = chacePeriode[0]
                   noOrder = chacePeriode[1]

                   init()
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('LihatRincianUsulanAnggaranCtrl', chacePeriode);
               }else{
                    init()
               }
           }

           function init() {
                $scope.isRouteLoading=true;
                modelItemAkuntansi.getDataDummyPHP("upk/ruangan/get-data-combo-saeutik", true, true, 20).then(function(data) {
                    $scope.listProduk= data;
                })
                
                modelItemAkuntansi.getDataDummyPHP("upk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function(data) {
                    $scope.listPegawai= data;
                })
                manageLogistikPhp.getDataTableTransaksi("upk/ruangan/get-data-combo?produk=0", true).then(function(dat){
                    $scope.listKoordinator = dat.data.jenisusulan;
                    $scope.item.koordinator = {id:1,jenisusulan:'Medis'};
                    // $scope.listUnitPengusul = dat.data.ruangan_login;
                     $scope.listUnitPengusul = dat.data.ruangan;
                    // $scope.item.ruanganPengusul = {id:$scope.listUnitPengusul[0].id,namaruangan:$scope.listUnitPengusul[0].namaruangan};
                    $scope.listUnitTujuan = dat.data.ruangan;
                    // $scope.item.ruanganTujuan = {id:$scope.listUnitTujuan[0].id,namaruangan:$scope.listUnitTujuan[0].namaruangan};
                    $scope.item.noUsulan = $scope.listUnitPengusul[0].kodeUsulan
                    $scope.listAsalProduk = dat.data.asalproduk;
                    $scope.item.noOrder = dat.data.noSPPB;
                    $scope.isRouteLoading=false;                   
                
                    if (noOrder != '') {
                        if (noOrder == 'EditTerima') {
                            manageLogistikPhp.getDataTableTransaksi("upk/get-detail-SPPB?norecOrder="+norecResep, true).then(function(data_ih){
                                $scope.item.noOrder=data_ih.data.detail.noorder
                                $scope.item.tglUsulan=data_ih.data.detail.tglorder
                                $scope.item.keterangan=data_ih.data.detail.keterangan
                                $scope.item.pegawaiPembuat={id:data_ih.data.detail.petugasid,namalengkap:data_ih.data.detail.petugas} 
                                $scope.item.koordinator={id:1,jenisusulan:'Medis'} 
                                $scope.item.tglDibutuhkan=data_ih.data.detail.tglusulan
                                $scope.item.noUsulan=data_ih.data.detail.nousulan
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
                                keltrans=data_ih.data.detail.keltransaksi;
                                verifikasifk=data_ih.data.detail.objectsrukverifikasifk
                                $scope.item.mataAnggaran ={norec:data_ih.data.detail.mataanggaranid, mataanggaran:data_ih.data.detail.mataanggaran,saldoawalblu:data_ih.data.detail.saldoawalblu,saldoawalrm:data_ih.data.detail.saldoawalrm}
                                $scope.item.SaldoBlu = parseFloat(data_ih.data.detail.saldoawalblu).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                                $scope.item.SaldoRm = parseFloat(data_ih.data.detail.saldoawalrm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                                $scope.item.ruanganPengusul ={id:data_ih.data.detail.idunitpengusul ,namaruangan:data_ih.data.detail.unitpengusul}
                                $scope.item.ruanganTujuan ={id:data_ih.data.detail.idunittujuan ,namaruangan:data_ih.data.detail.unittujuan}
                                $scope.item.Pengendali ={id:data_ih.data.detail.pengendaliid ,pengendali:data_ih.data.detail.pengendali}
                                $scope.item.pegawaiConfirm = {id:data_ih.data.detail.idpegpengendali ,namalengkap:data_ih.data.detail.namapengendali}
                                data2 = data_ih.data.details
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: data2
                                });

                                var subTotal = 0 ;
                                var ppn = 0;
                                var diskon = 0;
                                var TotalAll = 0 ;
                                for (var i = data2.length - 1; i >= 0; i--) {
                                    subTotal=subTotal+ (parseFloat(data2[i].jumlah)*parseFloat(data2[i].hargasatuan))
                                    ppn= ppn+ (parseFloat(data2[i].jumlah)*parseFloat(data2[i].ppn))
                                    diskon = diskon + (parseFloat(data2[i].jumlah)*parseFloat(data2[i].hargadiscount))
                                }
                                $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalPpn=parseFloat(ppn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                TotalAll = TotalAll =subTotal+ppn-diskon;
                                $scope.item.totalIniLoh=parseFloat(TotalAll).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.terbilang = terbilang(parseFloat(TotalAll))
                                TotTotal=parseFloat(subTotal)
                                TotPpn=parseFloat(TotalAll)
                            });
                        }
                    }
                });
                
            }   

        $scope.getKodeUsulan = function(){
            $scope.item.noUsulan = $scope.item.ruanganPengusul.kodeUsulan
        }
        $scope.getNip_pns = function(){
            $scope.item.nip = $scope.item.mengetahui.nip_pns
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
            $scope.item.disc=0
            $scope.item.ppn=0
        }
        $scope.getNilaiKonversi = function(){
            $scope.item.nilaiKonversi =  $scope.item.satuan.nilaikonversi
        }

         $scope.$watch('item.mataAnggaran', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                if ($scope.item.mataAnggaran != undefined) {
                    $scope.item.SaldoBlu = parseFloat($scope.item.mataAnggaran.saldoawalblu).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                    $scope.item.SaldoRm = parseFloat($scope.item.mataAnggaran.saldoawalrm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); 
                 }
            }
        });


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
        $scope.$watch('item.suplier', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
               $scope.item.alamatSupl = $scope.item.suplier.alamatlengkap
               $scope.item.telpSupl = 'Telp. ' + $scope.item.suplier.telepon + ' Fax. ' + $scope.item.suplier.faksimile
            }
        });
        $scope.$watch('item.jumlah', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotal = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.$watch('item.QtyKonfirmasi', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.QtyKonfirmasi)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotal = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.$watch('item.hargaSatuan', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotal = qty*(hrgsatuan+ppn-hargadiskon)               
            }
        });
        $scope.$watch('item.disc', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotal = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.$watch('item.ppn', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotal = qty*(hrgsatuan+ppn-hargadiskon)
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
            var qtyawal = 0;
            var qtyconfirm = 0;
            qtyawal = parseFloat($scope.item.jumlah);
            qtyconfirm = parseFloat($scope.item.QtyKonfirmasi)
             if (qtyconfirm > qtyawal) {
                alert("Qty konifrmasi lebih besar dari Qty yang diajukan")
                return;
            }        
            if ($scope.item.jumlah == 0) {
                alert("Jumlah harus di isi!")
                return;
            }
            var spesifikasi ="-";
            if($scope.item.spesifikasi != undefined){
                spesifikasi = $scope.item.spesifikasi;
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
                        data.hargajual = null
                        data.jenisobatfk = null
                        data.stock = null
                        data.harganetto = null
                        data.nostrukterimafk = null
                        data.ruanganfk = null
                        data.asalprodukfk = null
                        data.asalproduk = null
                        data.produkfk = $scope.item.produk.id
                        data.namaproduk = $scope.item.produk.namaproduk
                        data.nilaikonversi = $scope.item.nilaiKonversi
                        data.satuanstandarfk = $scope.item.satuan.ssid
                        data.satuanstandar = $scope.item.satuan.satuanstandar
                        data.satuanviewfk = $scope.item.satuan.ssid
                        data.satuanview = $scope.item.satuan.satuanstandar
                        data.jmlstok = null
                        data.jumlah = parseFloat($scope.item.jumlah)
                        data.qtyprodukkonfirmasi = parseFloat($scope.item.QtyKonfirmasi)
                        data.hargasatuan =  data2[i].hargasatuan
                        data.hargadiscount =String($scope.item.hargaDiskon)
                        data.hargasatuanquo = String($scope.item.hargaSatuan)
                        data.hargappnquo =String($scope.item.ppn)
                        data.ppn=String($scope.item.ppn)
                        data.total = data2[i].total//$scope.item.subTotal
                        data.totalkonfirmasi = $scope.item.subTotal
                        data.tglkebutuhan = $scope.item.tglKebutuhan
                        data.kdproduk = $scope.item.produk.kdproduk
                        data.spesifikasi = spesifikasi
                        data.norec_op = data2[i].norec_op

                        data2[i] = data;
                        $scope.dataGrid = new kendo.data.DataSource({
                            data: data2
                        });
                        var subTotal = 0 ;
                        var ppn = 0;
                        var diskon = 0;
                        var TotalAll = 0 ;
                        for (var i = data2.length - 1; i >= 0; i--) {
                            subTotal=subTotal+ (parseFloat(data2[i].jumlah)*parseFloat(data2[i].hargasatuan))
                            ppn= ppn+ (parseFloat(data2[i].jumlah)*parseFloat(data2[i].ppn))
                            diskon = diskon + (parseFloat(data2[i].jumlah)*parseFloat(data2[i].hargadiscount))
                        }
                        $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.totalPpn=parseFloat(ppn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        TotalAll =subTotal+ppn-diskon;
                        $scope.item.totalIniLoh=parseFloat(TotalAll).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.terbilang = terbilang(parseFloat(TotalAll))
                        TotTotal=parseFloat(subTotal)
                        TotPpn=parseFloat(TotalAll)
                    }
                }

            }else{
                data={
                        no:nomor,
                        hargajual:null,
                        jenisobatfk:null,
                        stock:null,
                        harganetto:null,
                        nostrukterimafk:null,
                        ruanganfk:null,
                        asalprodukfk:null,
                        asalproduk:null,
                        produkfk:$scope.item.produk.id,
                        namaproduk:$scope.item.produk.namaproduk,
                        nilaikonversi:$scope.item.nilaiKonversi,
                        satuanstandarfk:$scope.item.satuan.ssid,
                        satuanstandar:$scope.item.satuan.satuanstandar,
                        satuanviewfk:$scope.item.satuan.ssid,
                        satuanview:$scope.item.satuan.satuanstandar,
                        jmlstok:null,
                        jumlah:parseFloat($scope.item.jumlah),
                        qtyprodukkonfirmasi:parseFloat($scope.item.QtyKonfirmasi),
                        hargasatuan:data2[i].hargasatuan,
                        hargadiscount:String($scope.item.hargaDiskon),
                        hargasatuanquo:String($scope.item.hargaSatuan),
                        hargappnquo:String($scope.item.ppn),
                        ppn:String($scope.item.ppn),
                        total: data2[i].total,
                        totalkonfirmasi: $scope.item.subTotal,
                        tglkebutuhan:$scope.item.tglKebutuhan,
                        kdproduk:$scope.item.produk.kdproduk,
                        spesifikasi:spesifikasi,
                        norec_op:null
                    }
                data2.push(data)
                $scope.dataGrid = new kendo.data.DataSource({
                    data: data2
                });
                var subTotal = 0 ;
                var ppn = 0;
                var diskon = 0;
                var TotalAll = 0 ;
                for (var i = data2.length - 1; i >= 0; i--) {
                    subTotal=subTotal+ (parseFloat(data2[i].jumlah)*parseFloat(data2[i].hargasatuan))
                    ppn= ppn+ (parseFloat(data2[i].jumlah)*parseFloat(data2[i].ppn))
                    diskon = diskon + (parseFloat(data2[i].jumlah)*parseFloat(data2[i].hargadiscount))
                }
                $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.totalPpn=parseFloat(ppn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                TotalAll =subTotal+ppn-diskon;
                $scope.item.totalIniLoh=parseFloat(TotalAll).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.terbilang = terbilang(parseFloat(TotalAll))
                TotTotal=parseFloat(subTotal)
                TotPpn=parseFloat(TotalAll)
            }
            Kosongkan()
            racikan =''
        }

        $scope.klikGrid = function(dataSelected){
            var dataProduk =[];
            $scope.item.no = dataSelected.no
            manageLogistikPhp.getDataTableTransaksi("upk/ruangan/get-data-combo-saeutik?namaproduk="+dataSelected.namaproduk, true, true, 20).then(function(data) {
                $scope.listProduk.add(data.data[0])
                $scope.item.produk = data.data[0];

                $scope.item.jumlah = 0
                GETKONVERSI(dataSelected.jumlah)
                $scope.item.nilaiKonversi = dataSelected.nilaikonversi
                $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}
                $scope.item.QtyKonfirmasi = dataSelected.qtyprodukkonfirmasi
                $scope.item.jumlah = dataSelected.jumlah
                $scope.item.hargaSatuan = dataSelected.hargasatuan
                $scope.item.hargaDiskon = dataSelected.hargadiscount
                if ($scope.item.hargaDiskon != 0) {
                    $scope.item.hargaDiskonPersen = parseFloat(dataSelected.hargasatuan)/parseFloat(dataSelected.hargadiscount);
                }else{
                    $scope.item.hargaDiskonPersen = 0;
                }
                if ($scope.item.ppn != 0) {
                     $scope.item.persenppn = parseFloat(dataSelected.hargasatuan)/parseFloat(dataSelected.ppn)
                }else{
                    $scope.item.ppn = 0
                }                 
                $scope.item.subTotal = dataSelected.total
                $scope.item.tglKebutuhan = dataSelected.tglkebutuhan
                $scope.item.spesifikasi = dataSelected.spesifikasi
                $scope.disableKdProduk=true;
                $scope.disableNamaProduk=true;
                $scope.disableSatuan=true;
                $scope.disableSubtot=true;  

            })
            
        }
        function Kosongkan(){
            $scope.item.produk =''
            $scope.item.spesifikasi =''
            $scope.item.asal =''
            $scope.item.satuan=''
            $scope.item.nilaiKonversi=0
            $scope.item.stok=0
            $scope.item.jumlah=0
            $scope.item.hargadiskon=0
            $scope.item.no=undefined
            $scope.item.total=0
            $scope.item.hargaSatuan=0
            $scope.item.ppn=0
            $scope.item.disc=0
            $scope.item.QtyKonfirmasi=0
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
                "field": "tglkebutuhan",
                "title": "Tgl Kebutuhan",
                "width" : "80px",
                "template": "<span class='style-left'>{{formatTanggal('#: tglkebutuhan #')}}</span>"
            },
            {
                "field": "produkfk",
                "title": "Kode Barang",
                "width" : "80px",
            },
            {
                "field": "namaproduk",
                "title": "Deskripsi",
                "width" : "120px",
            },
            {
                "field": "spesifikasi",
                "title": "Spesifikasi",
                "width" : "150px",
            },
            {
                "field": "satuanstandar",
                "title": "Satuan",
                "width" : "80px",
            },
            {
                "field": "qtyprodukkonfirmasi",
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
                "field": "ppn",
                "title": "Harga Ppn",
                "width" : "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: ppn #', '')}}</span>"
            },
            {
                "field": "hargadiscount",
                "title": "Harga Diskon",
                "width" : "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
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
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }
            $scope.kembali=function(){
                //$state.go("TransaksiPelayananApotik")
                window.history.back();
            }

            $scope.verifUsulan = function(){
                $scope.PopUpVerifikasi.center().open();
            }

            $scope.Batal1 = function(){
                $scope.item.Status = undefined;
                $scope.item.Keterangan = '';
                $scope.PopUpVerifikasi.close();
            }

             $scope.SimpanVerif = function(){
                if ($scope.item.Status == undefined) {
                    alert("Pilih Status Verifikasi!!")
                    return
                }
                // var keterangan ='-';
                if ($scope.item.Status != undefined) {
                    if ($scope.item.Status.id == 2) {
                        if ($scope.item.Keterangan == undefined) {
                            alert("Isi Keterangan!!")
                            return
                        }
                    }else if ($scope.item.Status.id == 1) {
                        if ($scope.item.Keterangan == undefined) {
                            $scope.item.Keterangan ='Disetujui';
                        }
                    }
                }

                var strukverifikasi = {
                    keterangan: $scope.item.Keterangan,
                    status:$scope.item.Status.id,
                    objectruanganfk:$scope.item.ruanganTujuan.id,
                    norecrealisasi:norec_Realisasi,
                    mataanggaran:$scope.item.mataAnggaran.norec,
                    norec:norecResep,
                    nousulan:$scope.item.noUsulan,
                    totalpengajuan: parseFloat($scope.item.totalIniLoh),
                    totalppn: parseFloat($scope.item.totalPpn),
                    totaldiskon: 0,

                }
                var objSave = 
                {                    
                    strukverifikasi:strukverifikasi,
                }
                manageLogistikPhp.postverifikasianggaran(objSave).then(function(e) {
                    $scope.item.Status = undefined;
                    $scope.item.Keterangan = '';
                    $scope.PopUpVerifikasi.close();
                })        
                    
             }

            $scope.simpan = function(){
                if ($scope.item.koordinator == undefined) {
                    alert("Pilih Koordinator!!")
                    return
                }
                if ($scope.item.penanggungjawab == undefined) {
                    alert("Pilih Pegawai penanggung jawab!!")
                    return
                }
                if ($scope.item.mengetahui == undefined) {
                    alert("Pilih Pegawai yang mengetahui!!")
                    return
                }
                 if ($scope.item.pegawaiConfirm == undefined) {
                    alert("Pilih Pegawai yang Mengkonfirmasi UPK!!")
                    return
                }
                    
                if ($scope.item.ruanganTujuan == undefined) {
                    alert("Pilih ruangan tujuan!!")
                    return
                }
                if ($scope.item.ruanganPengusul == undefined) {
                    alert("Pilih Unit Pengusul!!")
                    return
                }
                if ($scope.item.keteranganUsulan == undefined) {
                    alert("Isi Jenis Usulan!!")
                    return
                }
                if ($scope.item.tglUsulan == undefined) {
                    alert("Pilih Tgl Usulan!!")
                    return
                }
                if ($scope.item.tglDibutuhkan == undefined) {
                    alert("Isi tgl Dibutuhkan!!")
                    return
                }
                if ($scope.item.asalproduk == undefined) {
                    alert("Pilih Sumber Dana!!")
                    return
                }
                if ($scope.item.mataAnggaran == undefined) {
                    alert("Pilih Mata Anggaran!!")
                    return
                }
                var strAlamat ='';
                if ($scope.item.alamatSupl != undefined) {
                    strAlamat=$scope.item.alamatSupl
                }
                var qtyHari = 0;
                if ($scope.item.jmlHari != undefined) {
                    qtyHari=$scope.item.jmlHari
                }
                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return
                }
                var mataanggaran = '';
                if ($scope.item.mataAnggaran != undefined) {
                    mataanggaran=$scope.item.mataAnggaran.norec
                }

                var strukorder = {
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
                    total:TotTotal,
                    norec:norecResep,
                    ppn:TotPpn,
                    norecrealisasi:norec_Realisasi,
                    norecriwayatrealisasi:norecRR,
                    objectkelompoktransaksifk:keltrans,
                    objectsrukverifikasifk:verifikasifk,
                    objectmataanggaranfk:mataanggaran,
                    asalproduk: $scope.item.asalproduk.id,
                }
                var strukverifikasi = {
                    tglconfirm: moment($scope.item.tglConfirm).format('YYYY-MM-DD HH:mm:ss'),
                    objectpegawaipjawabfk:$scope.item.pegawaiConfirm.id,
                    objectruanganfk:$scope.item.ruanganTujuan.id
                }

                var objSave = 
                    {
                        strukorder:strukorder,
                        strukverifikasi:strukverifikasi,
                        details:data2
                    }
                
                // manageLogistikPhp.postUsulanPelaksanaanKegiatan(objSave).then(function(e) {
                    manageLogistikPhp.postUsulanPelaksanaanKegiatanNew(objSave).then(function(e) {
                    $scope.item.noKirim = e.data.nokirim
                    var stt = 'false'
                    if (confirm('View Cetak UPK? ')) {
                        // Save it!
                        stt='true';
                    } else {
                        // Do nothing!
                        stt='false'
                    }
                    var client = new HttpClient();
                    //client.get('http://127.0.0.1:1237/printvb/printvb/logistik?cetak-SPPB=1&nores='+e.data.nokirim+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpelaksanaankegiatan=1&norec='+e.data.nokirim+'&view=true', function(response) {
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

            function terbilang(bilangan) {
 
                 bilangan    = String(bilangan);
                 var angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
                 var kata    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');
                 var tingkat = new Array('','Ribu','Juta','Milyar','Triliun');
                 
                 var panjang_bilangan = bilangan.length;
                 
                 /* pengujian panjang bilangan */
                 if (panjang_bilangan > 15) {
                   kaLimat = "Diluar Batas";
                   return kaLimat;
                 }
                 
                 /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
                 var i = 0
                 var j = 0

                 for (i = 1; i <= panjang_bilangan; i++) {
                   angka[i] = bilangan.substr(-(i),1);
                 }
                 
                 i = 1;
                 j = 0;
                 var kaLimat= "";
                 var subkaLimat= "";
                 kaLimat = "";
                 
                 
                 /* mulai proses iterasi terhadap array angka */
                 while (i <= panjang_bilangan) {
                 
                   subkaLimat = "";
                   var kata1 = "";
                   var kata2 = "";
                   var kata3 = "";
                 
                   /* untuk Ratusan */
                   if (angka[i+2] != "0") {
                     if (angka[i+2] == "1") {
                       kata1 = "Seratus";
                     } else {
                       kata1 = kata[angka[i+2]] + " Ratus";
                     }
                   }
                 
                   /* untuk Puluhan atau Belasan */
                   if (angka[i+1] != "0") {
                     if (angka[i+1] == "1") {
                       if (angka[i] == "0") {
                         kata2 = "Sepuluh";
                       } else if (angka[i] == "1") {
                         kata2 = "Sebelas";
                       } else {
                         kata2 = kata[angka[i]] + " Belas";
                       }
                     } else {
                       kata2 = kata[angka[i+1]] + " Puluh";
                     }
                   }
                 
                   /* untuk Satuan */
                   if (angka[i] != "0") {
                     if (angka[i+1] != "1") {
                       kata3 = kata[angka[i]];
                     }
                   }
                 
                   /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
                   if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")) {
                     subkaLimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
                   }
                 
                   /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
                   kaLimat = subkaLimat + kaLimat;
                   i = i + 3;
                   j = j + 1;
                 
                 }
                 
                 /* mengganti Satu Ribu jadi Seribu jika diperlukan */
                 if ((angka[5] == "0") && (angka[6] == "0")) {
                   kaLimat = kaLimat.replace("Satu Ribu","Seribu");
                 }
                 
                 return kaLimat + "Rupiah";
                }

//***********************************

}
]);
});
