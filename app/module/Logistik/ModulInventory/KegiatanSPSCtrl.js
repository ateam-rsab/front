define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KegiatanSPSCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.rke =1;
            $scope.dataSelected={};
            $scope.showInputObat =true
            $scope.showRacikan = false
            $scope.saveShow=true;
            // $scope.item.tglDibutuhkan=new Date();
            // $scope.item.tglUsulan=new Date();
            $scope.item.tglKebutuhan=new Date();
            $scope.item.tglConfirm=new Date();
            $scope.supplier=true;
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
            var hrg1 = 0
            var hrgsdk = 0
            var hrgPpn = 0
            var racikan = 0
            var TotTotal = 0
            var TotPpn = 0
            var qty = 0
            var hrgsatuan = 0  
            var ppn = 0    
            var hargadiskon = 0 
            var subTotal = 0
            $scope.item.tglKontrak = $scope.now;
            $scope.dataSelected = {};
            // $scope.item.tglAkhir = $scope.now;
            Load();
            // LoadCache();

            // init();
            function LoadCache(){
               var chacePeriode = cacheHelper.get('KegiatanSPSCtrl');
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
                    cacheHelper.set('KegiatanSPSCtrl', chacePeriode);
               }else{
                    init()
               }
           }

           function Load(){
                $scope.item.tglConfirm = $scope.now;
                if($state.params != undefined){
                        norecResep = $state.params.norec;
                        noOrder = $state.params.noOrder;
                        init()
                }else{
                    init()
                }
           }

           function init() {
                $scope.isRouteLoading=true;
                modelItemAkuntansi.getDataDummyPHP("spk/ruangan/get-data-combo-saeutik", true, true, 20).then(function(data) {
                    $scope.listProduk= data;
                })
                
                modelItemAkuntansi.getDataDummyPHP("spk/ruangan/get-data-combo-pegawai-part", true, true, 20).then(function(data) {
                    $scope.listPegawai= data;
                })

                modelItemAkuntansi.getDataDummyPHP("spk/rekanan/get-data-combo-rekanan", true, true, 20).then(function(data) {
                    $scope.listRekanan = data;
                })

                manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo?produk=0", true).then(function(dat){
                    // $scope.listPegawai = dat.data.penulisresep;
                    // $scope.listRekanan = dat.data.rekanan;

                    $scope.listKoordinator = dat.data.jenisusulan;//[{id:1,namaKoordinator:'Medis'}]
                    $scope.item.koordinator = {id:1,jenisusulan:'Medis'};
                    // $scope.listUnitPengusul = dat.data.ruangan_login;
                    $scope.listUnitPengusul = dat.data.ruangan;
                    // $scope.item.ruanganPengusul = {id:$scope.listUnitPengusul[0].id,namaruangan:$scope.listUnitPengusul[0].namaruangan};
                    $scope.listUnitTujuan = dat.data.ruangan;
                    // $scope.item.ruanganTujuan = {id:$scope.listUnitTujuan[0].id,namaruangan:$scope.listUnitTujuan[0].namaruangan};
                    $scope.item.noUsulan = $scope.listUnitPengusul[0].kodeUsulan
                    $scope.listmataAnggaran = dat.data.mataAnggaran;
                    // $scope.listProduk = dat.data.produk;
                    $scope.listAsalProduk = dat.data.asalproduk;
                    $scope.item.noOrder = dat.data.noSPPB;

                    $scope.isRouteLoading=false;                                
                    if (noOrder != '') {
                        if (noOrder == 'EditTerima') {
                            manageLogistikPhp.getDataTableTransaksi("spk/get-detail-SPPB?norecOrder="+norecResep, true).then(function(data_ih){
                                $scope.item.noOrder=data_ih.data.detail.noorder
                                $scope.item.mataAnggaran ={norec:data_ih.data.detail.objectmataanggaranfk, mataanggaran:data_ih.data.detail.mataanggaran}
                                $scope.item.tglUsulan=data_ih.data.detail.tglorder
                                $scope.item.keterangan=data_ih.data.detail.keterangan
                                $scope.item.pegawaiPembuat={id:data_ih.data.detail.petugasid,namalengkap:data_ih.data.detail.petugas} 
                                $scope.item.koordinator={id:1,jenisusulan:'Medis'} 
                                $scope.item.tglDibutuhkan=data_ih.data.detail.tglusulan
                                $scope.item.noUsulan=data_ih.data.detail.nousulan
                                $scope.item.namaPengadaan=data_ih.data.detail.namapengadaan
                                $scope.item.tahun=data_ih.data.detail.tahunusulan
                                $scope.item.alamatSupl=data_ih.data.detail.alamat
                                $scope.item.telpSupl=data_ih.data.detail.telp
                                $scope.item.suplier={id:data_ih.data.detail.namarekananid,namarekanan:data_ih.data.detail.namarekanan} 
                                $scope.item.keteranganUsulan = data_ih.data.detail.keterangan
                                $scope.item.nip = data_ih.data.detail.nippns
                                $scope.item.penanggungjawab ={id:data_ih.data.detail.penanggungjawabid,namalengkap:data_ih.data.detail.penanggungjawab}
                                $scope.item.mengetahui ={id:data_ih.data.detail.pegawaimengetahuiid,namalengkap:data_ih.data.detail.pegawaimengetahui} 
                                $scope.item.asalProduk = {id:data_ih.data.details[0].asalprodukfk,asalproduk:data_ih.data.details[0].asalproduk} 
                                norec_Realisasi = data_ih.data.detail.norecrealisasi;
                                norecRR=data_ih.data.detail.norecrr;
                                keltrans=data_ih.data.detail.keltransaksi;
                                verifikasifk=data_ih.data.detail.objectsrukverifikasifk
                                $scope.item.HPS=data_ih.data.detail.noorderhps
                                $scope.item.ruanganPengusul = {id:data_ih.data.detail.idunitpengusul, namaruangan:data_ih.data.detail.unitpengusul} 
                                $scope.item.ruanganTujuan = {id:data_ih.data.detail.idunittujuan, namaruangan:data_ih.data.detail.unittujuan}


                            data2 = data_ih.data.details
                            // $scope.dataGrid = new kendo.data.DataSource({
                            //         data: data2
                            // });

                            var datas = [];
                            if (data_ih.data.details.length != 0){
                                datas = data_ih.data.details;
                                for(var i=0; i<datas.length; i++)
                                {
                                    datas[i].statCheckbox = false;
                                }
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: datas,
                                    pageSize: 10,
                                    total: datas,
                                    serverPaging: false,
                                    schema:  {
                                        model: {
                                            fields: {
                                                tglTransaksi: { type: "date" }
                                            }
                                        }
                                    }  
                                });
                            }else{
                                $scope.dataGrid = new kendo.data.DataSource({
                                    data: datas,
                                    pageSize: 10,
                                    total: datas,
                                    serverPaging: false,
                                    schema:  {
                                        model: {
                                            fields: {
                                                tglTransaksi: { type: "date" }
                                            }
                                        }
                                    }  
                                });
                                // var chacePeriode = tglAwal + ":" + tglAkhir;
                                // cacheHelper.set('dataGrid', chacePeriode);
                            }

                        var grid = $('#kGrid').data("kendoGrid");

                        grid.setDataSource($scope.dataGrid);
                        grid.refresh();
                        //$timeout($scope.SearchData, 500);
                        var subTotal = 0 ;
                        for (var i = data2.length - 1; i >= 0; i--) {
                            subTotal=subTotal+ parseFloat(data2[i].hargasatuanquo*data2[i].qtyprodukkonfirmasi)
                        }
                            $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.totalPpn=(parseFloat(subTotal*10)/100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                $scope.item.totalIniLoh=parseFloat(subTotal+((subTotal*10)/100)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.item.terbilang = terbilang(parseFloat(subTotal))
                            TotTotal=parseFloat(subTotal)
                            });
                        }
                    }
                });
                
            } 

            $scope.UbahSupplier = function(){
                $scope.supplier=false
                $scope.button =  true
            }

            $scope.batalRekanan = function(){
                $scope.supplier=true
                $scope.button =  false
            }

            $scope.simpanRekanan =function(){
                // $scope.supplier=false;
                var dataPost = [];
                    for(var i=0; i<$scope.dataGrid._data.length; i++){
                        if($scope.dataGrid._data[i].statCheckbox){
                            var data={
                                 "norec_op":  $scope.dataGrid._data[i].norec_op,
                                 "rekananfk": $scope.item.rekanan.id
                            }
                            dataPost[i] =data;
                            // i++;
                        }
                    }
                        var datae={
                             "data": dataPost,
                    }

                    if(dataPost.length>0){
                        manageLogistikPhp.postUpdateRekanan(datae).then(function(e) {
                            // Kosongkan();
                            //debugger;
                            $scope.supplier=true;
                            $scope.button =  false;
                            init();
                            // SaveSPK();
                            // $scope.saveShow = false;
                        });
                    }
                    else
                    {
                        alert("Belum ada data yang dipilih");
                        return
                    }
            }

            $scope.changePage = function(stateName){
                    if($scope.dataSelected.norec_op != undefined)
                    {
                        $state.go(stateName, {
                            dataPasien: JSON.stringify($scope.dataSelected)
                        });
                    }
                    else
                    {
                        alert("Silahkan pilih data pasien terlebih dahulu");
                    }
                }

                function checkValue(obj, param){
                    var res="";
                    var data = undefined;

                    if(param.length > 1){
                        if(obj[param[0]] != undefined)
                            data = obj[param[0]][param[1]]; 
                    }
                    else
                    {
                        data = obj[param[0]];
                    }

                    if(data != undefined)
                        var res = data;
                    
                    return res;
                }

                function isInt(value) {
                    var er = /^-?[0-9]+$/;

                    return er.test(value);
                }

            $scope.selectRow = function(dataItem)
            {
                $scope.item.tglkebutuhan = $scope.now;
                var dataSelect = _.find($scope.dataGrid._data, function(data){
                    return data.norec_op == dataItem.norec_op; 
                });

                if(dataSelect.statCheckbox){
                    dataSelect.statCheckbox = false;
                }
                else
                {
                    dataSelect.statCheckbox = true;
                }
                
                
                // reloadDataGrid($scope.dataGrid._data);
            }

            var isCheckAll = false
            $scope.selectUnselectAllRow = function()
            {
                $scope.item.tglkebutuhan = $scope.now;
                var tempData = $scope.dataGrid._data;

                if(isCheckAll)
                {
                    isCheckAll = false;
                    for(var i=0; i<tempData.length; i++)
                    {
                        tempData[i].statCheckbox = false;
                    }
                }
                else{
                    isCheckAll = true;
                    for(var i=0; i<tempData.length; i++)
                    {
                        tempData[i].statCheckbox = true;
                    }
                }
                
                reloadDataGrid(tempData);
                
            }

            $scope.cekData = function()
                {
                var tempData = $scope.dataGrid._data;

                if(isCheckAll)
                {
                    isCheckAll = false;
                    for(var i=0; i<tempData.length; i++)
                    {
                        tempData[i].statCheckbox = false;
                    }
                }
                else{
                    isCheckAll = true;
                    for(var i=0; i<5; i++)
                    {
                        tempData[i].statCheckbox = true;
                    }
                }
                
                reloadDataGrid(tempData);
                
            }

            // function reloadDataGrid(ds)
            // {

            //     var newDs = new kendo.data.DataSource({
            //         data: ds,
            //         pageSize: 10,
            //         total: ds.length,
            //         serverPaging: false,
            //     });

            //     var grid = $('#kGrid').data("kendoGrid");

            //     grid.setDataSource(newDs);
            //     grid.refresh();
            //     $scope.dataVOloaded = true;
            // }      

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
            // $scope.item.jumlah=0
            // $scope.item.hargaSatuan=0
            $scope.item.disc=0
            $scope.item.ppn=0
            // $scope.item.total = 0

            // manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
            //     "produkfk="+ $scope.item.produk.id +
            //     "&ruanganfk=50" , true).then(function(dat){
            //         dataProdukDetail =dat.data.detail;
            //         $scope.item.hargaSatuan =0
            //         $scope.item.hargadiskon =0
            //         $scope.item.hargaNetto=0
            //         $scope.item.total =0
            //         $scope.item.hargaSatuan = dat.data.detail[0].hargajual
            // });
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
        $scope.$watch('item.ppn', function(newValue, oldValue) {
            if (newValue != oldValue  ) {
                qty = parseFloat($scope.item.jumlah)
                hrgsatuan = parseFloat($scope.item.hargaSatuan)
                ppn = parseFloat($scope.item.ppn)
                hargadiskon = parseFloat($scope.item.hargaDiskon)
                $scope.item.subTotal = qty*(hrgsatuan+ppn-hargadiskon)
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
        $scope.$watch('item.asalProduk', function(newValue, oldValue) {
            // $scope.isRouteLoading=true;
            // manageLogistikPhp.getDataTableTransaksi("sppb/permintaan-pengiriman-barang/get-data-combo?produk=1", true).then(function(dat){
            //     $scope.listProduk = dat.data.produk;
            //     $scope.isRouteLoading=false;
            // });
        });

        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }

        $scope.tambah = function () {
           
            if ($scope.item.produk == undefined) {
                alert("Pilih Produk terlebih dahulu!!")
                return;
            }
            if ($scope.item.satuan == undefined) {
                alert("Pilih Satuan terlebih dahulu!!")
                return;
            }
            var spesifikasi ="-";
            if($scope.item.spesifikasi != null){
                var spesifikasi = $scope.item.spesifikasi;
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
                        data.asalprodukfk = data2[i].asalprodukfk
                        data.asalproduk = data2[i].asalproduk
                        data.produkfk = $scope.item.produk.id
                        data.namaproduk = $scope.item.produk.namaproduk
                        data.nilaikonversi = $scope.item.nilaiKonversi
                        data.satuanstandarfk = $scope.item.satuan.ssid
                        data.satuanstandar = $scope.item.satuan.satuanstandar
                        data.satuanviewfk = $scope.item.satuan.ssid
                        data.satuanview = $scope.item.satuan.satuanstandar
                        data.rekananfk= data2[i].rekananfk
                        data.namarekanan= data2[i].namarekanan
                        data.nokontrakspk=$scope.item.noSPK
                        data.jmlstok = null
                        data.jumlah = data2[i].jumlah
                        data.qtyprodukkonfirmasi = $scope.item.jumlah
                        data.hargasatuan = String($scope.item.hargaSatuan)
                        data.hargasatuanquo = String($scope.item.hargaSatuan)
                        data.hargadiscountquo = String($scope.item.hargaDiskon)
                        data.hargappnquo = String($scope.item.ppn)
                        data.totalkonfirmasiss =$scope.item.subTotal
                        data.hargadiscount =0
                        data.ppn =0
                        data.total = $scope.item.subTotal
                        data.tglkebutuhan = $scope.item.tglKebutuhan
                        data.kdproduk = $scope.item.produk.kdproduk
                        data.spesifikasi = spesifikasi
                        data.norec_op = data2[i].norec_op

                        data2[i] = data;
                        $scope.dataGrid = new kendo.data.DataSource({
                            data: data2
                        });
                        // var subTotal = 0 ;
                        for(var i=0; i<data2.length; i++)
                        {
                            data2[i].statCheckbox = false;
                        }
                        for (var i = data2.length - 1; i >= 0; i--) {
                            subTotal=subTotal+ parseFloat(data2[i].totalkonfirmasiss)
                            TotPpn=TotPpn + parseFloat(data2[i].hargappnquo)
                        }
                        $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.totalPpn=parseFloat(TotPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.totalIniLoh=parseFloat(subTotal+(TotPpn)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                        $scope.item.terbilang = terbilang(parseFloat(subTotal))
                        TotTotal=parseFloat(subTotal)
                        TotPpn=parseFloat(TotPpn)
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
                        asalprodukfk:data2[i].asalprodukfk,
                        asalproduk:data2[i].asalproduk,
                        produkfk:$scope.item.produk.id,
                        namaproduk:$scope.item.produk.namaproduk,
                        nilaikonversi:$scope.item.nilaiKonversi,
                        satuanstandarfk:$scope.item.satuan.ssid,
                        satuanstandar:$scope.item.satuan.satuanstandar,
                        // rekananfk:$scope.item.rekanan.id,
                        // namarekanan:$scope.item.rekanan.namarekanan,
                        nokontrakspk:$scope.item.noSPK,
                        satuanviewfk:$scope.item.satuan.ssid,
                        satuanview:$scope.item.satuan.satuanstandar,
                        jmlstok:null,
                        // jumlah:$scope.item.jumlah,
                        jumlah:$scope.item.jumlah,
                        qtyprodukkonfirmasi:$scope.item.jumlah,
                        hargasatuan:String($scope.item.hargaSatuan),
                        hargasatuanquo:String($scope.item.hargaSatuan),
                        hargadiscountquo:String($scope.item.hargaDiskon),
                        hargappnquo:String($scope.item.ppn),
                        totalkonfirmasiss:$scope.item.subTotal,//data2[i].totalkonfirmasiss,
                        hargadiscount:0,
                        ppn:0,
                        total:$scope.item.subTotal,
                        tglkebutuhan:$scope.item.tglKebutuhan,
                        kdproduk:$scope.item.produk.kdproduk,
                        spesifikasi:$scope.item.spesifikasi,
                        norec_op:null
                    }
                data2.push(data)
                // $scope.dataGrid.add($scope.dataSelected)
                $scope.dataGrid = new kendo.data.DataSource({
                    data: data2
                });
                for(var i=0; i<data2.length; i++)
                {
                    data2[i].statCheckbox = false;
                }
                // var subTotal = 0 ;
                for (var i = data2.length - 1; i >= 0; i--) {
                    subTotal=subTotal+ parseFloat(data2[i].totalkonfirmasiss)
                     TotPpn=TotPpn + parseFloat(data2[i].hargappnquo)
                }
                $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.totalPpn=parseFloat(TotPpn).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.totalIniLoh=parseFloat(subTotal+(TotPpn)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.terbilang = terbilang(parseFloat(subTotal))
                TotTotal=parseFloat(subTotal)
                TotPpn=parseFloat(TotPpn)
            }
            // if ($scope.item.jenisKemasan.jeniskemasan != 'Racikan') {
            //     $scope.item.rke = parseFloat($scope.item.rke) + 1
            // }
            Kosongkan()
            racikan =''
        }


        $scope.klikGrid = function(){
            //debugger;
            if($scope.dataSelected != undefined){
            var dataSelected = $scope.dataSelected;   
            var dataProduk =[];
            //no:no,
            // $scope.item.tglkebutuhan = $scope.now;
            $scope.item.no = dataSelected.no
            // for (var i = $scope.listProduk.length - 1; i >= 0; i--) {
            //     if ($scope.listProduk[i].id == dataSelected.produkfk){
            //         dataProduk = $scope.listProduk[i]
            //         break;
            //     }
            // }
            manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo-saeutik?namaproduk="+dataSelected.namaproduk, true, true, 20).then(function(data) {
                $scope.item.tglkebutuhan = $scope.now;
                $scope.listProduk.add(data.data[0])
                $scope.item.produk = data.data[0];
                if(dataSelected.namarekanan != undefined){
                    $scope.item.rekanan = {id:dataSelected.objectrekananfk, namarekanan:dataSelected.namarekanan};
                }else{
                    $scope.item.rekanan ='';
                }
                $scope.item.jumlah = 0
                GETKONVERSI(dataSelected.jumlah)
                 $scope.item.nilaiKonversi = dataSelected.nilaikonversi
                $scope.item.satuan = {ssid:dataSelected.satuanstandarfk,satuanstandar:dataSelected.satuanstandar}
                $scope.item.jumlah = dataSelected.qtyprodukkonfirmasi
                $scope.item.hargaSatuan = dataSelected.hargasatuanquo
                $scope.item.hargaDiskon = dataSelected.hargadiscountquo
                $scope.item.hargaDiskonPersen =0
                $scope.item.ppn = dataSelected.hargappnquo
                $scope.item.subTotal = dataSelected.totalkonfirmasiss
                $scope.item.tglKebutuhan = dataSelected.tglkebutuhan
                $scope.item.spesifikasi = dataSelected.spesifikasi
                $scope.disableKdProduk=true;
                $scope.disableNamaProduk=true;
                $scope.disableSatuan=true;
                $scope.disableSubtot=true;  

            })
            // manageLogistikPhp.getDataTableTransaksi("spk/ruangan/get-data-combo-rekanan-saeutik?namarekanan="+dataSelected.namarekanan, true, true, 20).then(function(data) {
            //     $scope.listRekanan.add(data.data[0])
            //     $scope.item.rekanan = data.data[0];                
            // })
            }
        }
        function Kosongkan(){
            $scope.item.produk =''
            $scope.item.spesifikasi =''
            $scope.item.asal =''
            $scope.item.satuan=''
            $scope.item.rekanan=''
            $scope.item.nilaiKonversi=0
            $scope.item.stok=0
            $scope.item.jumlah=0
            $scope.item.hargadiskon=0
            $scope.item.no=undefined
            $scope.item.total=0
            $scope.item.hargaSatuan=0
            $scope.item.ppn=0
            $scope.item.disc=0
            $scope.item.rekanan=''
            $scope.item.subTotal=0
        }
        $scope.batal = function(){
            Kosongkan()
        }

        $scope.columnGrid = [
            { 
                "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
                template: "# if (statCheckbox) { #"+
                "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
                "# } else { #"+
                "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
                "# } #",
                width:"50px"
            },
            {
                "field": "no",
                "title": "No",
                "width" : "45px",
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
                "width" : "100px",
            },
            {
                "field": "spesifikasi",
                "title": "Spesifikasi",
                "width" : "150px",
            },
            {
                "field": "namarekanan",
                "title": "Supplier",
                "width" : "100px",
            },
            {
                "field": "satuanstandar",
                "title": "Satuan",
                "width" : "80px",
            },
            {
                "field": "jumlah",
                "title": "Qty",
                "width" : "80px",
            },
            {
                "field": "qtyprodukkonfirmasi",
                "title": "Qty Konfirmasi",
                "width" : "80px",
            },
            {
                "field": "hargasatuanquo",
                "title": "Harga Satuan",
                "width" : "80px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargasatuanquo #', '')}}</span>"
            },
            {
                "field": "hargappnquo",
                "title": "Ppn",
                "width" : "80px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargappnquo #', '')}}</span>"
            },
            {
                "field": "hargadiscountquo",
                "title": "Diskon",
                "width" : "80px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargadiscountquo #', '')}}</span>"
            },
            {
                "field": "totalkonfirmasiss",
                "title": "SubTotal",
                "width" : "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: totalkonfirmasiss #', '')}}</span>"
            },
            {
                "field": "statusbarang",
                "title": "Stat Barang",
                "width" : "100px",
                // "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
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

            function SaveSPK() {
                if ($scope.item.noSPK == undefined) {
                    alert("Nomor Kontrak Tidak Boleh Kosong!!")
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
                 if ($scope.item.pegawaiConfirm == undefined) {
                    alert("Pilih Pegawai yang Mengkonfirmasi SPK!!")
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
                if ($scope.item.BiayaKirim == undefined) {
                    alert("Biaya Kirim Kosong")
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
                var mataanggaran = null; 
                if($scope.item.mataAnggaran != undefined){
                    mataanggaran = $scope.item.mataAnggaran.norec
                }

                init()
                var strukorder = {
                            keteranganorder: $scope.item.keteranganUsulan,
                            qtyjenisproduk: data2.length,
                            tglUsulan: moment($scope.item.tglUsulan).format('YYYY-MM-DD hh:mm:ss'),
                            tglDibutuhkan: moment($scope.item.tglDibutuhkan).format('YYYY-MM-DD hh:mm:ss'),
                            koordinator:$scope.item.koordinator.jenisusulan,
                            nousulan:$scope.item.noUsulan,
                            ruanganfkPengusul:$scope.item.ruanganPengusul.id,
                            ruanganfkTujuan:$scope.item.ruanganTujuan.id,
                            penanggungjawabfk:$scope.item.penanggungjawab.id,
                            nokontrakspk:$scope.item.noSPK,
                            tglkontrak:moment($scope.item.tglConfirm).format('YYYY-MM-DD hh:mm:ss'),
                            mengetahuifk:$scope.item.mengetahui.id,
                            objectpegawaispkfk:$scope.item.pegawaiConfirm.id,
                            nipPns:$scope.item.nip,
                            total:TotTotal,
                            norec:norecResep,
                            ppn:TotPpn,
                            norecrealisasi:norec_Realisasi,
                            norecriwayatrealisasi:norecRR,
                            objectkelompoktransaksifk:keltrans,
                            objectsrukverifikasifk:verifikasifk,
                            noKontrak: $scope.item.noSPK,
                            objectmataanggaranfk:mataanggaran,
                            hps:$scope.item.HPS,
                            biayakirim:parseFloat($scope.item.BiayaKirim),
                        }
                var dataIn =[];
                var details = data2

                var  TempData = []
                        for(var i=0;i<details.length; i++){
                           if (details[i].rekananfk != null && details[i].statusbarang == null){
                               TempData.push(details[i])
                            }    
                        }
                var subTotal = 0 ;
                var ppn =0;
                var subtotalwithppn=0;
                for (var i = TempData.length - 1; i >= 0; i--) {
                    subTotal=subTotal+ parseFloat(TempData[i].totalkonfirmasiss)
                    ppn=parseFloat((subTotal*10)/100)
                    subtotalwithppn=parseFloat(subTotal-((subTotal*10)/100))
                }
                // $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                // $scope.item.totalPpn=parseFloat((subTotal*10)/100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                // $scope.item.totalIniLoh=parseFloat(subTotal-((subTotal*10)/100)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                // $scope.item.terbilang = terbilang(parseFloat(subTotal))
                
                //         TotTotal=parseFloat(subTotal)
                //         TotPpn=parseFloat(subTotal-((subTotal*10)/100))
                $scope.dataGrid._data = TempData;
            

                var data = 
                    {
                        strukorder:strukorder,
                        subTotal,
                        ppn,
                        subtotalwithppn,
                        details:TempData
                    } 
                   // manageLogistikPhp.postdataspk(data).then(function(e) { 
                    manageLogistikPhp.postdataspknew(data).then(function(e) { 
                    $scope.item.noKirim = e.data.nokirim.nokirim
                     var stt = 'false'
                     var nokirim =e.data.nokirim
                    if (confirm('View Cetak SPK? ')) {
                        // Save it!
                        stt='true';
                    } else {                    
                        stt='false'
                    }
                    var client = new HttpClient();
                     //debugger;
                    client.get('http://127.0.0.1:1237/printvb/logistik?cetak-spk=1&nores='+$scope.item.noKirim+'&view='+stt, function(response) {
                        //aadc=response;
                    });
                        
                    window.history.back();
                    $scope.saveShow=false;
                    init();
                    Kosongkan();
                })
                
                // $state.go("TransaksiPelayananApotik")
                
            }

            $scope.simpan = function(){
                // if ($scope.item.noSPK == undefined) {
                //     alert("Nomor Kontrak Tidak Boleh Kosong!!")
                //     return
                // }
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
                    alert("Pilih Pegawai yang Mengkonfirmasi SPK!!")
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
                // if ($scope.item.BiayaKirim == undefined) {
                //     alert("Biaya Kirim Kosong")
                //     return
                // }
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
                var mataanggaran = null; 
                if($scope.item.mataAnggaran != undefined){
                    mataanggaran = $scope.item.mataAnggaran.norec
                }

                init()
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
                            nokontrakspk:$scope.item.noSPK,
                            tglkontrak:moment($scope.item.tglConfirm).format('YYYY-MM-DD HH:mm:ss'),
                            mengetahuifk:$scope.item.mengetahui.id,
                            objectpegawaispkfk:$scope.item.pegawaiConfirm.id,
                            nipPns:$scope.item.nip,
                            total:TotTotal,
                            norec:norecResep,
                            ppn:TotPpn,
                            norecrealisasi:norec_Realisasi,
                            norecriwayatrealisasi:norecRR,
                            objectkelompoktransaksifk:keltrans,
                            objectsrukverifikasifk:verifikasifk,
                            noKontrak: $scope.item.noSPK,
                            objectmataanggaranfk:mataanggaran,
                            hps:$scope.item.HPS,
                            biayakirim:parseFloat($scope.item.BiayaKirim),
                        }
                var dataIn =[];
                var details = data2

                var  TempData = []
                        for(var i=0;i<details.length; i++){
                           // if (details[i].rekananfk != null && details[i].statusbarang == null){
                               TempData.push(details[i])
                            // }    
                        }
                // var subTotal1 = SubTotal;
                // var ppn1 = TotPpn;
                // var subtotalwithppn1= $scope.item.totalIniLo;
                // for (var i = TempData.length - 1; i >= 0; i--) {
                //     subTotal=subTotal+ parseFloat(TempData[i].totalkonfirmasiss)
                //     ppn=parseFloat((subTotal*10)/100)
                //     subtotalwithppn=parseFloat(subTotal-((subTotal*10)/100))
                // }
                // $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                // $scope.item.totalPpn=parseFloat((subTotal*10)/100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                // $scope.item.totalIniLoh=parseFloat(subTotal-((subTotal*10)/100)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                // $scope.item.terbilang = terbilang(parseFloat(subTotal))
                
                //         TotTotal=parseFloat(subTotal)
                //         TotPpn=parseFloat(subTotal-((subTotal*10)/100))
                $scope.dataGrid._data = TempData;
            

                var data = 
                    {
                        strukorder:strukorder,
                        // subTotal1,
                        // ppn1,
                        // subtotalwithppn1,
                        details:TempData
                    } 
                   // manageLogistikPhp.postdataspk(data).then(function(e) { 
                    manageLogistikPhp.savesps(data).then(function(e) { 
                    // $scope.item.noKirim = e.data.nokirim
                    //  var stt = 'false'
                    //  var nokirim =e.data.nokirim
                    // if (confirm('View Cetak SPK? ')) {
                    //     // Save it!
                    //     stt='true';
                    // } else {                    
                    //     stt='false'
                    // }
                    // var client = new HttpClient();
                    //  //debugger;
                    // client.get('http://127.0.0.1:1237/printvb/logistik?cetak-spk=1&nores='+$scope.item.noKirim+'&view='+stt, function(response) {
                    //     //aadc=response;
                    // });
                        
                    // window.history.back();
                    // $scope.saveShow=false;
                    // Load();
                    // Kosongkan();
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
