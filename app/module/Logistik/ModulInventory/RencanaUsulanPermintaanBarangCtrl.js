define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RencanaUsulanPermintaanBarangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.showInputObat =true
            $scope.showRacikan = false
            $scope.saveShow=true;
            $scope.item.tglDibutuhkan=new Date();
            $scope.item.tglUsulan=new Date();
            $scope.item.tglKebutuhan=new Date();
            $scope.isRouteLoading = false;
            var BulanRomawi ='';
            var pegawaiUser = {}
            var norecRealisasi ='';
            var norec_apd = '';
            var noOrder = '';
            var norecResep = '';
            var dataProdukDetail=[];
            var noTerima ='';
            var data2 = [];
            var data2R = [];
            var hrg1 = 0;
            var hrgsdk = 0;
            var hrgPpn = 0;
            var racikan = 0;
            var TotTotal = 0;
            var TotPpn = 0;
            var saldoAwal = 0;
            var qty = 0
            var hrgsatuan =0 
            var ppn = 0 
            var hargadiskon = 0
            var ppnprs = 0 
            var hargadiskonprs = 0
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();

            // init();
            function LoadCache(){
               var chacePeriode = cacheHelper.get('RencanaUsulanPermintaanBarangCtrl');
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
                    cacheHelper.set('RencanaUsulanPermintaanBarangCtrl', chacePeriode);
               }else{
                    // $scope.item.tglUsulan=$scope.now;
                    init()
               }
           }
           $scope.Generate = function(data){
                if (data === true) {
                    /* Format No Faktur PB/BLN-THN/APT/NO URUT (APT = BLU, BG = Hibah,  KK = Kas  Kecil) */ 
                    var Usulan ='';
                    if ($scope.item.KlmpokBarang != undefined) {
                        Usulan = $scope.item.KlmpokBarang.kelompokbarang;
                    }
                    var nows = moment(new Date()).format('YY')
                    if (Usulan.indexOf('Reagen') > -1 || Usulan =='' )
                        $scope.item.noUsulan = '____/' + 'IF-01/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Obat') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-02/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Alkes') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-03/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Alat Medis') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-04/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Barang Umum') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-06/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Pekerjaan') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-07/' + BulanRomawi +'/'+ nows;
                    else if(Usulan.indexOf('Gas Medis') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-08/' + BulanRomawi +'/'+ nows;

                }else{
                    delete $scope.item.noUsulan 
                }
        };

        $scope.newGenerate = function(data){
                if (data === true) {
                    /* Format No Faktur PB/BLN-THN/APT/NO URUT (APT = BLU, BG = Hibah,  KK = Kas  Kecil) */ 
                    var Usulan ='';
                    if ($scope.item.KlmpokBarang != undefined) {
                        Usulan = $scope.item.KlmpokBarang.kelompokbarang
                    }
                    var nows = moment(new Date()).format('YY')
                    if (Usulan.indexOf('Reagen') > -1 || Usulan =='' )
                        $scope.item.noUsulan = '____/' + 'IF-01/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Obat') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-02/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Alkes') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-03/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Alat Medik') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-04/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Barang Umum') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-06/' + BulanRomawi +'/'+ nows;
                    else if (Usulan.indexOf('Pekerjaan') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-07/' + BulanRomawi +'/'+ nows;
                    else if(Usulan.indexOf('Gas Medis') > -1)
                        $scope.item.noUsulan = '____/' + 'IF-08/' + BulanRomawi +'/'+ nows;

                }else{
                    delete $scope.item.noUsulan;
                }
        };


           function init() {
                $scope.isRouteLoading=true;
                // debugger;
                modelItemAkuntansi.getDataDummyPHP("usulan-permintaan/ruangan/get-data-combo-saeutik", true, true, 20).then(function(data) {
                    $scope.listProduk= data;
                })
                
                modelItemAkuntansi.getDataDummyPHP("usulan-permintaan/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function(data) {
                    $scope.listPegawai= data;
                })
                manageLogistikPhp.getDataTableTransaksi("usulan-permintaan/ruangan/get-data-combo?produk=0", true).then(function(dat){
                    $scope.isRouteLoading=false;
                    $scope.listKoordinator = dat.data.jenisusulan;//[{id:1,namaKoordinator:'Medis'}]
                    $scope.item.koordinator = {id:1,jenisusulan:'Medis'};
                    $scope.listUnitPengusul = dat.data.ruangan_login;
                    $scope.item.ruanganPengusul = {id:$scope.listUnitPengusul[0].id,namaruangan:$scope.listUnitPengusul[0].namaruangan};
                    $scope.listUnitTujuan = dat.data.ruangan;
                    $scope.item.ruanganTujuan = {id:$scope.listUnitTujuan[0].id,namaruangan:$scope.listUnitTujuan[0].namaruangan};   
                    $scope.listAsalBarang = dat.data.asalproduk;
                    $scope.listmataAnggaran = dat.data.mataanggaran;
                    $scope.listKlmpokBarang = [
                                                {id:1,kelompokbarang:'Reagen'},
                                                {id:2,kelompokbarang:'Obat'},
                                                {id:3,kelompokbarang:'Alkes'},
                                                {id:4,kelompokbarang:'Alat Medis'},
                                                {id:5,kelompokbarang:'Barang Umum'},
                                                {id:6,kelompokbarang:'Pekerjaan'},
                                                {id:7,kelompokbarang:'Gas Medis'},
                                            ]
                    BulanRomawi = $scope.listUnitPengusul[0].bulanromawi
                
                    if (noOrder != '') {
                        if (noOrder == 'EditTerima') {
                            manageLogistikPhp.getDataTableTransaksi("usulan-permintaan/ruangan/get-detail-rencana-usulan-permintaan?norecOrder="+norecResep, true).then(function(data_ih){
                                $scope.item.noOrder=data_ih.data.detail.noorder
                                $scope.item.tglAwal=data_ih.data.detail.tglorder
                                $scope.item.keterangan=data_ih.data.detail.keterangan
                                $scope.item.penanggungjawab={
                                        id:data_ih.data.detail.petugasid,
                                        namalengkap:data_ih.data.detail.petugas
                                    } 
                                $scope.item.koordinator={id:1,jenisusulan:'Medis'} 
                                $scope.item.tglUsulan=data_ih.data.detail.tglusulan
                                $scope.item.noUsulan=data_ih.data.detail.nousulan
                                $scope.item.namaPengadaan=data_ih.data.detail.namapengadaan
                                $scope.item.noKontrak=data_ih.data.detail.nokontrak
                                $scope.item.tahun=data_ih.data.detail.tahunusulan
                                $scope.item.alamatSupl=data_ih.data.detail.alamat
                                $scope.item.telpSupl=data_ih.data.detail.telp
                                $scope.item.suplier={id:data_ih.data.detail.namarekananid,namarekanan:data_ih.data.detail.namarekanan} 
                                $scope.item.keteranganUsulan = data_ih.data.detail.keterangan;
                                norecRealisasi=data_ih.data.detail.norecrealisasi;
                                $scope.item.ruanganPengusul ={id:data_ih.data.detail.idunitpengusul ,namaruangan:data_ih.data.detail.unitpengusul}
                                $scope.item.ruanganTujuan ={id:data_ih.data.detail.idunittujuan ,namaruangan:data_ih.data.detail.unittujuan}
                                $scope.item.mataAnggaran={norec:data_ih.data.detail.mataanggranid,mataanggaran:data_ih.data.detail.mataanggaran};                               
                                $scope.item.asalproduk = {id:data_ih.data.details[0].asalprodukfk,asalproduk:data_ih.data.details[0].asalproduk} 
                                if(data_ih.data.detail != undefined){
                                    $scope.listPegawai.add({
                                        alamat: data_ih.data.detail.alamat,
                                        keterangan: data_ih.data.detail.keterangan,
                                        koordinator: data_ih.data.detail.koordinator,
                                        namapengadaan: data_ih.data.detail.namapengadaan,
                                        namarekanan: data_ih.data.detail.namarekanan,
                                        namarekananid: data_ih.data.detail.namarekananid,
                                        nippns: data_ih.data.detail.nippns,
                                        nokontrak: data_ih.data.detail.nokontrak,
                                        noorder: data_ih.data.detail.noorder,
                                        norec: data_ih.data.detail.norec,
                                        nousulan: data_ih.data.detail.nousulan,
                                        petugas: data_ih.data.detail.petugas,
                                        petugasid: data_ih.data.detail.petugasid,
                                        keterangan: data_ih.data.detail.keterangan,
                                        petugasmengetahui: data_ih.data.detail.petugasmengetahui,
                                        petugasmengetahuiid: data_ih.data.detail.petugasmengetahuiid,
                                        tahunusulan: data_ih.data.detail.tahunusulan,
                                        telp: data_ih.data.detail.telp,
                                        tglorder: data_ih.data.detail.tglorder,
                                        tglusulan: data_ih.data.detail.tglusulan,
                                        totalhargasatuan: data_ih.data.detail.totalhargasatuan,
                                        nipps:data_ih.data.detail.nipps
                                    })
                                    $scope.item.mengetahui= {id: data_ih.data.detail.petugasmengetahuiid, namalengkap:data_ih.data.detail.petugasmengetahui};
                                    $scope.item.nip= data_ih.data.detail.nippns
                                }else{
                                    $scope.item.mengetahui='';
                                }


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
                        }else if (noOrder == 'AjukanKembali') {
                            debugger;
                            manageLogistikPhp.getDataTableTransaksi("sppb/get-detail-SPPB?norecOrder="+norecResep, true).then(function(data_ih){
                                // $scope.item.noOrder=data_ih.data.detail.noorder
                                $scope.item.tglAwal=data_ih.data.detail.tglorder
                                $scope.item.keterangan=data_ih.data.detail.keterangan
                                $scope.item.penanggungjawab={
                                        id:data_ih.data.detail.petugasid,
                                        namalengkap:data_ih.data.detail.petugas
                                    } 
                                $scope.item.koordinator={id:1,jenisusulan:'Medis'} 
                                $scope.item.tglUsulan=data_ih.data.detail.tglusulan
                                // $scope.item.noUsulan=data_ih.data.detail.nousulan
                                $scope.item.namaPengadaan=data_ih.data.detail.namapengadaan
                                $scope.item.noKontrak=data_ih.data.detail.nokontrak
                                $scope.item.tahun=data_ih.data.detail.tahunusulan
                                $scope.item.alamatSupl=data_ih.data.detail.alamat
                                $scope.item.telpSupl=data_ih.data.detail.telp
                                $scope.item.suplier={id:data_ih.data.detail.namarekananid,namarekanan:data_ih.data.detail.namarekanan} 
                                $scope.item.keteranganUsulan = data_ih.data.detail.keterangan;
                                // norecRealisasi=data_ih.data.detail.norecrealisasi;
                                $scope.item.ruanganPengusul ={id:data_ih.data.detail.idunitpengusul ,namaruangan:data_ih.data.detail.unitpengusul}
                                $scope.item.ruanganTujuan ={id:data_ih.data.detail.idunittujuan ,namaruangan:data_ih.data.detail.unittujuan}
                                // $scope.item.saldoAnggaran = parseFloat(data_ih.data.detail.saldoawalblu).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                                $scope.item.mataAnggaran={norec:data_ih.data.detail.mataanggranid,mataanggaran:data_ih.data.detail.mataanggaran};
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
                                if(data_ih.data.detail != undefined){
                                    $scope.listPegawai.add({
                                        alamat: data_ih.data.detail.alamat,
                                        keterangan: data_ih.data.detail.keterangan,
                                        koordinator: data_ih.data.detail.koordinator,
                                        namapengadaan: data_ih.data.detail.namapengadaan,
                                        namarekanan: data_ih.data.detail.namarekanan,
                                        namarekananid: data_ih.data.detail.namarekananid,
                                        nippns: data_ih.data.detail.nippns,
                                        nokontrak: data_ih.data.detail.nokontrak,
                                        noorder: data_ih.data.detail.noorder,
                                        norec: data_ih.data.detail.norec,
                                        nousulan: data_ih.data.detail.nousulan,
                                        petugas: data_ih.data.detail.petugas,
                                        petugasid: data_ih.data.detail.petugasid,
                                        keterangan: data_ih.data.detail.keterangan,
                                        petugasmengetahui: data_ih.data.detail.petugasmengetahui,
                                        petugasmengetahuiid: data_ih.data.detail.petugasmengetahuiid,
                                        tahunusulan: data_ih.data.detail.tahunusulan,
                                        telp: data_ih.data.detail.telp,
                                        tglorder: data_ih.data.detail.tglorder,
                                        tglusulan: data_ih.data.detail.tglusulan,
                                        totalhargasatuan: data_ih.data.detail.totalhargasatuan,
                                        nipps:data_ih.data.detail.nipps
                                    })
                                    $scope.item.mengetahui= {id: data_ih.data.detail.petugasmengetahuiid, namalengkap:data_ih.data.detail.petugasmengetahui};
                                    $scope.item.nip= data_ih.data.detail.nippns
                                }else{
                                    $scope.item.mengetahui='';
                                }


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
                                norecResep='';
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
        $scope.saldoAnggaran = function(){
            $scope.item.saldoAnggaran = parseFloat($scope.item.mataAnggaran.saldoawalblu).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            $scope.item.saldoAnggaranRM = parseFloat($scope.item.mataAnggaran.saldoawalrm).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
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
            $scope.item.ppnpersen = 0;
            $scope.item.hargaDiskon = 0;
            $scope.item.hargaDiskonPersen = 0;
            $scope.item.ppn = 0;
            $scope.item.subTotal = 0;
            $scope.item.hargaSatuan = 0;
            $scope.item.jumlah =0;
            $scope.item.spesifikasi = $scope.item.produk.spesifikasi;

            manageLogistikPhp.getDataTableTransaksi("logistik/get-harga?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk=50" , true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    // $scope.item.hargaSatuan = 0
                    // $scope.item.hargadiskon = 0
                    // $scope.item.hargaNetto = 0
                    // $scope.item.total = 0
                    // $scope.item.jumlah = 0 
                    if (jml != 0){
                        $scope.item.hargaSatuan =  $scope.item.hargaSatuan
                    }else{
                        $scope.item.hargaSatuan = dat.data.detail[0].harga   
                    }
            });
        }
        $scope.getNilaiKonversi = function(){
            $scope.item.nilaiKonversi =  $scope.item.satuan.nilaikonversi
            manageLogistikPhp.getDataTableTransaksi("logistik/get-harga?"+
                "produkfk="+ $scope.item.produk.id +
                "&ruanganfk=50", true).then(function(dat){
                    dataProdukDetail =dat.data.detail;
                    // $scope.item.hargaSatuan =0
                    // $scope.item.hargadiskon =0
                    // $scope.item.hargaNetto=0
                    // $scope.item.total = 0
                    // $scope.item.jumlah = 0 
                   if (jml != undefined){
                        $scope.item.hargaSatuan = 0
                    }else{
                        $scope.item.hargaSatuan = dat.data.detail[0].hargapenerimaan   
                    }
            });
        }

        $scope.$watch('item.noUsulan', function(newValue, oldValue) {
            if (newValue != oldValue  ) {

                manageLogistikPhp.getDataTableTransaksi("data/get-no-usulan?NoSPK="+$scope.item.noUsulan, true).then(function(data_ih){
                    var datas = data_ih.data;
                    for (var i = datas.length - 1; i >= 0; i--) {
                       if(datas[i].noorder == $scope.item.noUsulan){
                         alert("No Terima Tidak Boleh Sama!")
                         break
                       } 
                    }
                })

            }
        });

        $scope.$watch('item.nilaiKonversi', function(newValue, oldValue) {
            // if (newValue != oldValue  ) {
            //     if ($scope.item.stok > 0) {
            //         $scope.item.stok =parseFloat($scope.item.stok) * (parseFloat(oldValue)/ parseFloat(newValue))
            //         $scope.item.jumlah = 0//parseFloat($scope.item.jumlah) / parseFloat(newValue)
            //         $scope.item.hargaSatuan = 0//hrg1 * parseFloat(newValue)
            //         $scope.item.hargadiskon = 0 //hrgsdk * parseFloat(newValue)
            //         $scope.item.total = 0// parseFloat(newValue) * 
            //                // (hrg1-hrgsdk)
            //     }
            // }
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
        $scope.$watch('item.hargaSatuan', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotal = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.$watch('item.hargaDiskonPersen', function(newValue, oldValue) {
           if (newValue != oldValue  ) {
                $scope.item.hargaDiskon = (parseFloat($scope.item.hargaDiskonPersen)*parseFloat($scope.item.hargaSatuan))/100
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
        $scope.$watch('item.hargaDiskon', function(newValue, oldValue) {
             if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotal = qty*(hrgsatuan+ppn-hargadiskon)
            }
        });
        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.tambah = function () {
            for (var i = data2.length - 1; i >= 0; i--) {
                if (data2[i].produkfk == $scope.item.produk.id) {
                    alert("Produk Tidak Boleh Sama!!")
                    return;
                }
            }
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
            var spesifikasi ="-";
            if ($scope.item.spesifikasi != undefined){
                spesifikasi = $scope.item.spesifikasi;
            }
            var nomor = 0
            if ($scope.dataGrid == undefined) {
                nomor = 1
            }else{
                nomor = data2.length+1
            }
             var asalproduk = null;
            var asalprodukfk = null;
            if ($scope.item.asalproduk != undefined) {
                asalproduk = $scope.item.asalproduk.asalproduk
                asalprodukfk = $scope.item.asalproduk.id
            }
            var data ={};
            if ($scope.item.no != undefined){
                for (var i = data2.length - 1; i >= 0; i--) {                   
                    if (data2[i].no ==  $scope.item.no){
                        data.no = $scope.item.no

                        // data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
                        // data.tglregistrasi = moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss')
                        // data.generik = null
                        data.hargajual = null
                        data.jenisobatfk = null
                        // data.kelasfk = $scope.item.kelas.id
                        data.stock = null
                        data.harganetto = null
                        data.nostrukterimafk = null
                        data.ruanganfk = null

                        // data.rke = $scope.item.rke
                        // data.jeniskemasanfk = $scope.item.jenisKemasan.id
                        // data.jeniskemasan = $scope.item.jenisKemasan.jeniskemasan
                        // data.aturanpakaifk = $scope.item.aturanPakai.id
                        // data.aturanpakai = $scope.item.aturanPakai.name
                        // data.routefk = $scope.item.route.id
                        // data.route = $scope.item.route.name
                        data.kdproduk = $scope.item.produk.kdproduk
                        data.asalprodukfk =asalprodukfk
                        data.asalproduk = asalproduk
                        data.produkfk = $scope.item.produk.id
                        data.namaproduk = $scope.item.produk.namaproduk
                        data.nilaikonversi = $scope.item.nilaiKonversi
                        data.satuanstandarfk = $scope.item.satuan.ssid
                        data.satuanstandar = $scope.item.satuan.satuanstandar
                        data.satuanviewfk = $scope.item.satuan.ssid
                        data.satuanview = $scope.item.satuan.satuanstandar
                        data.jmlstok = null
                        data.jumlah = $scope.item.jumlah
                        data.hargasatuan = String($scope.item.hargaSatuan)
                        data.hargadiscount=String($scope.item.hargaDiskon)
                        data.persendiscount = String($scope.item.hargaDiskonPersen)
                        data.ppn = String($scope.item.ppn)
                        data.persenppn = String($scope.item.ppnpersen)
                        data.total = $scope.item.subTotal
                        data.tglkebutuhan = $scope.item.tglKebutuhan
                        data.kdproduk = $scope.item.produk.kdproduk
                        data.spesifikasi = spesifikasi

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
                    // break;
                }

            }else{
                data={
                        no:nomor,
                        // noregistrasifk:norec_apd,//$scope.item.noRegistrasi,
                        // tglregistrasi:moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                        // generik:null,
                        hargajual:null,
                        jenisobatfk:null,
                        // kelasfk:$scope.item.kelas.id,
                        stock:null,
                        harganetto:null,
                        nostrukterimafk:null,
                        ruanganfk:null,//£££
                        // rke:$scope.item.rke,
                        // jeniskemasanfk:$scope.item.jenisKemasan.id,
                        // jeniskemasan:$scope.item.jenisKemasan.jeniskemasan,
                        // aturanpakaifk:$scope.item.aturanPakai.id,
                        // aturanpakai:$scope.item.aturanPakai.name,
                        // routefk:$scope.item.route.id,
                        // route:$scope.item.route.name,
                        asalprodukfk:asalprodukfk,
                        asalproduk:asalproduk,
                        kdproduk :$scope.item.produk.kdproduk,
                        produkfk:$scope.item.produk.id,
                        namaproduk:$scope.item.produk.namaproduk,
                        nilaikonversi:$scope.item.nilaiKonversi,
                        satuanstandarfk:$scope.item.satuan.ssid,
                        satuanstandar:$scope.item.satuan.satuanstandar,
                        satuanviewfk:$scope.item.satuan.ssid,
                        satuanview:$scope.item.satuan.satuanstandar,
                        jmlstok:null,
                        jumlah:$scope.item.jumlah,
                        hargasatuan :String($scope.item.hargaSatuan),
                        hargadiscount:String($scope.item.hargaDiskon),
                        persendiscount: String($scope.item.hargaDiskonPersen),
                        ppn :String($scope.item.ppn),
                        persenppn :String($scope.item.ppnpersen),
                        total:$scope.item.subTotal,
                        tglkebutuhan:$scope.item.tglKebutuhan,
                        kdproduk:$scope.item.produk.kdproduk,
                        spesifikasi:spesifikasi
                    }

                data2.push(data)

                // $scope.dataGrid.add($scope.dataSelected)
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
                TotalAll =subTotal+ppn-diskon
                $scope.item.totalIniLoh=parseFloat(TotalAll).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.terbilang = terbilang(parseFloat(TotalAll))
                TotTotal=parseFloat(subTotal)
                TotPpn=parseFloat(TotalAll)
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
            // for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
            //     if ($scope.listProduk[i].id == dataSelected.produkfk){
            //         dataProduk = $scope.listProduk[i]
            //         break;
            //     }
            // }
            manageLogistikPhp.getDataTableTransaksi("usulan-permintaan/ruangan/get-data-combo-saeutik?namaproduk="+dataSelected.namaproduk, true, true, 20).then(function(data) {
                $scope.listProduk.add(data.data[0])
                $scope.item.produk = data.data[0];

                $scope.item.jumlah = 0
                GETKONVERSI(dataSelected.jumlah)
                $scope.item.nilaiKonversi = dataSelected.nilaikonversi
                $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}
                
                
                $scope.item.jumlah = dataSelected.jumlah
                $scope.item.hargaSatuan = dataSelected.hargasatuan
                $scope.item.hargaDiskon = dataSelected.hargadiscount
                $scope.item.ppn = dataSelected.ppn
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
            $scope.item.hargaDiskon=0
            $scope.item.ppnpersen=0
            $scope.item.hargaDiskonPersen=0
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
                "width" : "100px",
                "template": "<span class='style-left'>{{formatTanggal('#: tglkebutuhan #')}}</span>"
            },
            {
                "field": "produkfk",
                "title": "Kode Barang",
                "width" : "100px",
            },
            {
                "field": "kdproduk",
                "title": "Kode Barang Internal",
                "width" : "100px",
            },
            {
                "field": "namaproduk",
                "title": "Nama Produk",
                "width" : "200px",
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

            $scope.simpan = function(){
                // if ($scope.item.asalproduk == undefined) {
                //     alert("Pilih Asal Produk!!")
                //     return
                // }
                if ($scope.item.noUsulan == undefined) {
                    alert("No Usulan Tidak Boleh Kosong!!")
                    return
                }
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
                if (data2.length == 0) {
                    alert("Pilih Produk terlebih dahulu!!")
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
                var mataanggaran = '';
                if ($scope.item.mataAnggaran != undefined) {
                    mataanggaran=$scope.item.mataAnggaran.norec
                }
                var asalproduk = null;
                if ($scope.item.asalproduk != undefined) {
                    asalproduk=parseFloat($scope.item.asalproduk.id)
                }
                
                var strukorder = {
                            noUsulan: $scope.item.noUsulan,
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
                            objectmataanggaranfk:mataanggaran,
                            norecrealisasi:norecRealisasi,
                            asalproduk:asalproduk,
                        }
                var objSave = 
                    {
                        strukorder:strukorder,
                        details:data2
                    }
                
                   manageLogistikPhp.saverencanausulanpermintaanbarang(objSave).then(function(e) { 
                    $scope.item.noKirim = e.data.nokirim.norec
                    $scope.saveShow=false;
                    // var stt = 'false'
                    // if (confirm('View Cetak Usulan? ')) {
                    //     // Save it!
                    //     stt='true';
                    // } else {
                    //     // Do nothing!
                    //     stt='false'
                    // }
                    // var client = new HttpClient();
                    // //client.get('http://127.0.0.1:1237/printvb/printvb/logistik?cetak-SPPB=1&nores='+e.data.nokirim+'&view='+stt+'&user='+pegawaiUser.namalengkap, function(response) {
                    // client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpermintaanbarang=1&norec='+$scope.item.noKirim+'&view=true', function(response) {
                    //     //aadc=response;
                    // });
                    window.history.back();
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
