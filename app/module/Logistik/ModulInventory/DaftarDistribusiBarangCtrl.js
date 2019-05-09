define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarDistribusiBarangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            var datas =[];
            var data3 =[];
            var etos =[];
            var dataCheck=[];
            $scope.dataAh = [];
            var norecKirim = '';
            var noKirim = '';
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            ComboLoad();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarDistribusiBarangCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
                $scope.item.tglAwal = new Date(chacePeriode[0]);
                $scope.item.tglAkhir = new Date(chacePeriode[1]);
               
                init();
             }
             else{
               $scope.item.tglAwal = $scope.now;
               $scope.item.tglAkhir = $scope.now;
               init();
             }
           }

            function ComboLoad () {

                manageLogistikPhp.getDataTableTransaksi("humas/get-daftar-combo", true).then(function(dat){
                     $scope.listDataJabatan = dat.data.jabatan;
                });

                modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai-all", true, true, 20).then(function(data) {
                    $scope.ListDataPegawai=data;
                });
            }

            function loadCombo(){
                modelItemAkuntansi.getDataDummyPHP("aset/get-data-barang", true, true, 20).then(function(data) {
                    $scope.listNamaBarang = data;
                }); 
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
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

            function init() {
                $scope.isRouteLoading=true;
                // var ins =""
                // if ($scope.item.instalasi != undefined){
                //     var ins ="&dpid=" +$scope.item.instalasi.id
                // }
                var rg =""
                if ($scope.item.namaruangantujuan != undefined){
                    var rg ="&ruangantujuanfk=" +$scope.item.namaruangantujuan.id
                }
                var produkfk =""
                if ($scope.item.namaBarang != undefined){
                    var produkfk ="&produkfk=" + $scope.item.namaBarang.id
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-daftar-distribusi-barang?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&nokirim=" + $scope.item.struk +rg+produkfk
                    , true).then(function(dat){
                        $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                        // var tanggal = $scope.now;
                        // var tanggalLahir = new Date(dat.data.daftar[i].tgllahir);
                        // var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                        // dat.data.daftar[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    }
                   // $scope.dataGrid = dat.data.daftar;
                   $scope.dataGrid = new kendo.data.DataSource({
                        data:  dat.data.daftar,
                        pageSize: 50,
                        total:  dat.data.daftar.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });       
                   
                   pegawaiUser = dat.data.datalogin
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarDistribusiBarangCtrl', chacePeriode);
                var jenispermintaanfk ='';
                var objSave ={
                  jenispermintaanfk:jenispermintaanfk,
                  tglAwal:tglAwal,
                  tglAkhir:tglAkhir
                }
                manageLogistikPhp.postjurnalamprahanbarangall(objSave).then(function(data){                
                });
                
            }
            $scope.klikGrid = function(data){
                if (data != undefined) {

                    etos= data.details;
                
                }
               
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }

            // $scope.TransaksiPelayanan = function(){
            //     
            //     var arrStr ={ 0 : $scope.dataSelected.nocm ,
            //         1 : $scope.dataSelected.namapasien,
            //         2 : $scope.dataSelected.jeniskelamin,
            //         3 : $scope.dataSelected.noregistrasi, 
            //         4 : $scope.dataSelected.umur,
            //         5 : $scope.dataSelected.klid,
            //         6 : $scope.dataSelected.namakelas,
            //         7 : $scope.dataSelected.tglregistrasi,
            //         8 : $scope.dataSelected.norec_apd,
            //         9 : 'resep'
            //     }
            //     cacheHelper.set('TransaksiPelayananApotikCtrl', arrStr);
            //     $state.go('TransaksiPelayananApotik')

            //     var arrStr2 ={ 0 : $scope.dataSelected.norec 
            //     }
            //     cacheHelper.set('DaftarResepCtrl', arrStr2);
            //     $state.go('DaftarResepCtrl')
            // }

            $scope.CetakBuktiLayanan = function(){
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores=NonLayanan'+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.NewKirim = function(){
                $state.go('KirimBarangLogistik')
            }
            $scope.EditKirim = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di ubah!!")
                    return;
                }
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : '',
                    2 : 'EditKirim',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('KirimBarangLogistikCtrl', chacePeriode);
                $state.go('KirimBarangLogistik')
            }
          function GetprodukBatal(){
                var noorderfk = '';
                if ($scope.dataSelected.noorderfk != undefined) {
                    noorderfk = $scope.dataSelected.noorderfk ;
                }    
                if ($scope.dataSelected.jeniskirim == 'Amprahan') {
                    var strukkirim = {
                        nokrim: $scope.dataSelected.nostruk,
                        noreckirim: $scope.dataSelected.norec,
                        tglpelayanan : $scope.dataSelected.tglstruk,
                        ruanganasal: $scope.dataSelected.namaruanganasal,
                        objectruanganasal: $scope.dataSelected.ruasalid,
                        ruangantujuan: $scope.dataSelected.namaruangantujuan,
                        obejectruangantujuan: $scope.dataSelected.rutujuanid,
                        noorderfk : noorderfk,
                        jenispermintaanfk: $scope.dataSelected.jenispermintaanfk,
                        keterangan : $scope.item.alasanBatal
                    
                    }
                    var objSave = {
                            strukkirim:strukkirim,
                            detail:etos
                    }

                    manageLogistikPhp.batalkirimbarang(objSave).then(function(e) {
                        manageLogistikPhp.hapusjurnalamprahanbarang(objSave).then(function(e) {
                            init();
                        });
                    });
                    
                    $scope.item.alasanBatal="";
                    $scope.winDialog.close();
                }else{
                    var noorderfk = '';
                    if ($scope.dataSelected.noorderfk != undefined) {
                        noorderfk = $scope.dataSelected.noorderfk ;
                    }            
                    manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-daftar-barang-batal?nokirimfk="+ $scope.dataSelected.norec 
                        + "&ruanganfk=" +  $scope.dataSelected.rutujuanid
                        , true).then(function(dat){
                        
                        datas=dat.data;
                        var jumlah = 0 ;
                        for (var i = 0; i < datas.length; i++) {
                            for (var j = 0; j < etos.length; j++) {
                                if (etos[j].objectprodukfk == datas[i].kdeproduk) {
                                    if (etos[j].qtyproduk <= datas[i].qtyproduk) {
                                       jumlah = i + 1;
                                    }
                                }
                            }
                        }
                        if(etos.length <= jumlah){

                            var strukkirim = {

                                nokrim: $scope.dataSelected.nostruk,
                                noreckirim: $scope.dataSelected.norec,
                                tglpelayanan : $scope.dataSelected.tglstruk,
                                ruanganasal: $scope.dataSelected.namaruanganasal,
                                objectruanganasal: $scope.dataSelected.ruasalid,
                                ruangantujuan: $scope.dataSelected.namaruangantujuan,
                                obejectruangantujuan: $scope.dataSelected.rutujuanid,
                                noorderfk : noorderfk,
                                jenispermintaanfk: $scope.dataSelected.jenispermintaanfk,
                                keterangan : $scope.item.alasanBatal
                            
                            }
                            var objSave = {
                                    strukkirim:strukkirim,
                                    detail:etos
                            }

                            manageLogistikPhp.batalkirimbarang(objSave).then(function(e) {
                                manageLogistikPhp.hapusjurnalamprahanbarang(objSave).then(function(e) {
                                    init();
                                });
                            });
                            
                            $scope.item.alasanBatal="";
                            $scope.winDialog.close();

                         }else{
                             alert("Stok Telah Terpakai, Tidak Bisa Dibatalkan!!!")
                             $scope.winDialog.close();
                             return;
                         }

                    });
                }
            }

             $scope.lanjutBatal = function() {
                if ($scope.item.alasanBatal == undefined) {
                    alert("Alasan Batal Belum Diisi!!")
                    return;
                }
                GetprodukBatal()
             }


            $scope.lanjutBatal1 = function() {
                if ($scope.item.alasanBatal1 == undefined) {
                    alert("Alasan Batal Belum Diisi!!")
                    $scope.item.alasanBatal="";
                    return;
                }

                GetprodukBatal1()
            }

            function GetprodukBatal1(){
                var noorderfk = '';
                if ($scope.dataGrid._data[0].noorderfk != undefined) {
                    noorderfk = $scope.dataGrid._data[0].noorderfk ;
                } 
                 var dataIn = '';
                    var dataOn = '';
                    var norec = '';
                    for(var i=0; i<$scope.dataGrid._data[0].details.length; i++){
                        if($scope.dataGrid._data[0].details[i].statCheckbox==true){
                            if (dataOn == '') {
                                 dataOn = $scope.dataGrid._data[0].details[i].objectprodukfk;
                                 dataIn = dataOn;
                            }else{
                                dataIn =$scope.dataGrid._data[0].details[i].objectprodukfk;
                                dataOn =  dataOn + ',' + dataIn 
                            }
                        }  
                    } 

                if ($scope.dataGrid._data[0].jeniskirim == 'Amprahan') {
                    var strukkirim = {

                        nokrim: $scope.dataGrid._data[0].nostruk,
                        noreckirim: $scope.dataGrid._data[0].norec,
                        tglpelayanan : $scope.dataGrid._data[0].tglstruk,
                        ruanganasal: $scope.dataGrid._data[0].namaruanganasal,
                        objectruanganasal: $scope.dataGrid._data[0].ruasalid,
                        ruangantujuan: $scope.dataGrid._data[0].namaruangantujuan,
                        obejectruangantujuan: $scope.dataGrid._data[0].rutujuanid,
                        noorderfk : noorderfk,
                        jenispermintaanfk: $scope.dataGrid._data[0].jenispermintaanfk,
                        keterangan : $scope.item.alasanBatal1,
                        dataproduk : dataOn,
                    }
                    data3 =[];
                    for(var i=0; i < $scope.dataGrid._data[0].details.length; i++){
                        if($scope.dataGrid._data[0].details[i].statCheckbox == true){
                            data3.push({
                                "objectprodukfk" : $scope.dataGrid._data[0].details[i].objectprodukfk,
                                "namaproduk" : $scope.dataGrid._data[0].details[i].namaproduk,
                                "satuanstandar" : $scope.dataGrid._data[0].details[i].satuanstandar,
                                "qtyproduk" :$scope.dataGrid._data[0].details[i].qtyproduk,
                            },)
                        }
                    }

                    var objSave = {
                            strukkirim:strukkirim,
                            detail:data3
                    }

                    manageLogistikPhp.postBatalKirimBarangPerItem(objSave).then(function(e) {
                        manageLogistikPhp.updatejurnalbatalkirimperitem(objSave).then(function(e) {
                            init();
                        });
                    });
                    
                    $scope.item.alasanBatal1="";
                    $scope.winDialogBatalPerItem.close();

                }else{

                    manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-daftar-barang-batal?nokirimfk="+ $scope.dataGrid._data[0].norec 
                        + "&ruanganfk=" + $scope.dataGrid._data[0].rutujuanid 
                        + "&objectprodukfk=" + dataOn
                        , true).then(function(dat){
                        
                        datas=dat.data;
                        var datBatal = [];
                        datBatal = $scope.dataGrid._data[0].details;
                        var jumlah = 0 ;
                        var Cek = 0
                        var ceklis = 0
                        for (var i = 0; i < datas.length; i++) {
                            for (var j = 0; j < datBatal.length; j++) {
                                 if (datBatal[j].statCheckbox === true) {
                                        ceklis = j +1
                                    if (datBatal[j].objectprodukfk == datas[i].kdeproduk) {
                                        if (datBatal[j].qtyproduk <= datas[i].qtyproduk || datBatal[j].qtyproduk == 0) {
                                           jumlah = i + 1;
                                           Cek = j + 1;
                                        }
                                    }
                                 }
                            }
                        }
                        if(ceklis = jumlah){
                            data3 =[];
                            for(var i=0; i<$scope.dataGrid._data[0].details.length; i++){
                                if($scope.dataGrid._data[0].details[i].statCheckbox==true){
                                    data3.push({
                                        "objectprodukfk" : $scope.dataGrid._data[0].details[i].objectprodukfk,
                                        "namaproduk" : $scope.dataGrid._data[0].details[i].namaproduk,
                                        "satuanstandar" : $scope.dataGrid._data[0].details[i].satuanstandar,
                                        "qtyproduk" :$scope.dataGrid._data[0].details[i].qtyproduk,
                                    },)
                                }
                            }

                            var strukkirim = {

                                nokrim: $scope.dataGrid._data[0].nostruk,
                                noreckirim: $scope.dataGrid._data[0].norec,
                                tglpelayanan : $scope.dataGrid._data[0].tglstruk,
                                ruanganasal: $scope.dataGrid._data[0].namaruanganasal,
                                objectruanganasal: $scope.dataGrid._data[0].ruasalid,
                                ruangantujuan: $scope.dataGrid._data[0].namaruangantujuan,
                                obejectruangantujuan: $scope.dataGrid._data[0].rutujuanid,
                                noorderfk : noorderfk,
                                jenispermintaanfk: $scope.dataGrid._data[0].jenispermintaanfk,
                                keterangan : $scope.item.alasanBatal1,
                                dataproduk : dataOn,
                            }

                            var objSave = {
                                strukkirim:strukkirim,
                                // norec:e.data.nokirim.norec,
                                detail:data3
                            }

                            manageLogistikPhp.postBatalKirimBarangPerItem(objSave).then(function(e) {
                                manageLogistikPhp.updatejurnalbatalkirimperitem(objSave).then(function(e) {
                                    init();
                                });
                            });
                            
                            $scope.item.alasanBatal1="";
                            $scope.winDialogBatalPerItem.close();

                        }else{
                             alert("Stok Telah Terpakai, Tidak Bisa Dibatalkan!!!")
                             $scope.winDialogBatalPerItem.close();
                             $scope.item.alasanBatal1="";
                             return;
                        }
                    });  

                }                           
            }

            $scope.BatalKirim = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }
                $scope.winDialog.center().open();
            }

            $scope.BatalPeritem = function(){
                if ($scope.dataGrid == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }
                $scope.winDialogBatalPerItem.center().open();
            }

            $scope.batalBatal = function() {
                $scope.item.alasanBatal="";
                $scope.winDialog.close();
            }

            $scope.batalBatal1 = function() {
                $scope.item.alasanBatal1="";
                $scope.winDialogBatalPerItem.close();
            }

            $scope.Cetak = function(){
                $scope.popUp.center().open();
                // var stt = 'false'
                // if (confirm('View Bukti Kirim? ')) {
                //     // Save it!
                //     stt='true';
                // } else {
                //     // Do nothing!
                //     stt='false'
                // }
                // var client = new HttpClient();
                // client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-pengeluaran=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                //     //aadc=response;
                // });
            }

            $scope.CetakAh = function(){
                var jabatan1 = ''
                if($scope.item.DataJabatan != undefined){
                    jabatan1 = $scope.item.DataJabatan.namajabatan;
                }
                
                var jabatan2 = ''
                if($scope.item.DataJabatan1 != undefined){
                    jabatan2 = $scope.item.DataJabatan1.namajabatan;
                }
                
                var jabatan3 =''
                if($scope.item.DataJabatan2 != undefined){
                    jabatan3 = $scope.item.DataJabatan2.namajabatan;
                }

                var pegawai = ''
                if($scope.item.DataPegawai != undefined){
                    pegawai =$scope.item.DataPegawai.id;
                }

                var pegawai1 = ''
                if($scope.item.DataPegawai1 != undefined){
                    pegawai1 =$scope.item.DataPegawai1.id;
                }
                
                var pegawai2 = ''
                if($scope.item.DataPegawai2 != undefined){
                    pegawai2 =$scope.item.DataPegawai2.id;
                }

               var stt = 'false'
                if (confirm('View Bukti Kirim? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-pengeluaran=1&nores='+$scope.dataSelected.norec+'&pegawaiPenyerah='+pegawai+'&pegawaiPenerima='+pegawai1+'&pegawaiMegetahui='+pegawai2
                    +'&JabatanPenyerah='+jabatan1+'&JabatanPenerima='+jabatan2+'&jabatanMengetahui='+jabatan3+'&view='+stt+'&user='+pegawaiUser[0].namalengkap, function(response) {
                    //aadc=response; 

                });
                 // $scope.item.DataJabatan = undefined;
                 // $scope.item.DataJabatan1 = undefined;
                 // $scope.item.DataJabatan2 = undefined;
                 // $scope.item.DataPegawai = undefined;
                 // $scope.item.DataPegawai1 = undefined;
                 // $scope.item.DataPegawai2 = undefined;
                 $scope.popUp.close();
            }

            $scope.DaftarDistribusiBarang = function(){
                // var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                //     1 : 'EditTerima',
                //     2 : '',
                //     3 : '', 
                //     4 : '',
                //     5 : '',
                //     6 : ''
                // }
                // cacheHelper.set('PenerimaanBarangSuplierCtrl', chacePeriode);
                // $state.go('PenerimaanBarangSuplier')
            }

            $scope.HapusPenerimaan = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }
                if ($scope.dataSelected.nosbm != undefined) {
                    alert("Sudah di bayar tidak dapat di hapus!!")
                    return;
                }
                var stt = 'false'
                if (confirm('Hapus Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    return;
                }
                manageLogistikPhp.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?"+"norec_sp=" + $scope.dataSelected.norec, true).then(function(dat){
                    init()
                });
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "20px",
                },
                {
                    "field": "status",
                    "title": "Status",
                    "width" : "60px"
                },
                {
                    "field": "tglstruk",
                    "title": "Tgl Struk",
                    "width" : "50px",
                                "template": "<span class='style-right'>{{formatTanggal('#: tglstruk #', '')}}</span>"
                },
                {
                    "field": "nostruk",
                    "title": "NoTerima",
                    "width" : "80px",
                },
                {
                    "field": "jeniskirim",
                    "title": "Jenis Kirim",
                    "width" : "80px",
                },
                {
                    "field": "jmlitem",
                    "title": "Item",
                    "width" : "35px",
                    "template": "<span class='style-right'>#= kendo.toString(jmlitem) #</span>",
                },
                {
                    "field": "namaruanganasal",
                    "title": "Nama Ruangan Asal",
                    "width" : "100px",
                },
                {
                    "field": "namaruangantujuan",
                    "title": "Nama Ruangan Tujuan",
                    "width" : "100px",
                },
                {
                    "field": "petugas",
                    "title": "Petugas",
                    "width" : "100px",
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width" : "100px",
                }
            ];


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

            $scope.selectRow = function(dataItem)
            {                
                var dataSelect = _.find($scope.dataGrid._data[0].details, function(data){
                    return data.no == dataItem.no; 
                });

                if(dataSelect.statCheckbox){
                    dataSelect.statCheckbox = false;
                }
                else
                {
                    dataSelect.statCheckbox = true;
                }
                
                $scope.tempCheckbox = dataSelect.statCheckbox;
                var tempData = $scope.dataGrid._data[0].details;
                reloadDataGrid(tempData);
              
            }

            var isCheckAll = false
            $scope.selectUnselectAllRow = function()
            {
                var tempData = $scope.dataGrid._data[0].details;
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
                var tempData = $scope.dataGrid._data[0].details;

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

            function reloadDataGrid(ds) {
                var newDs = new kendo.data.DataSource({
                        data:  ds,
                        _data:  ds,
                        // pageSize: 50,
                        // total:  ds.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });    
               

                var grid = $('#kGridDetail').data("kendoGrid");

                grid.setDataSource(newDs);
                grid.refresh();

            }

            $scope.data2 = function(dataItem) {
                for (var i = 0; i < dataItem.details.length; i++) {
                    dataItem.details[i].statCheckbox = false;
                    dataItem.details[i].no = i+1
                }
                dataCheck=dataItem.details;
                $scope.dataAh=dataItem.details;
                $scope.dataGrid1=dataItem.details;
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        { 
                            "title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
                            "template": "# if (statCheckbox) { #"+
                            "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />"+
                            "# } else { #"+
                            "<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />"+
                            "# } #",
                            "width":"20px"
                        },
                        {
                            "field": "no",
                            "title": "No",
                            "width" : "45px",
                        },
                        {
                            "field": "kdproduk",
                            "title": "Kd Produk",
                            "width" : "100px",
                        },
                        {
                            "field": "kdsirs",
                            "title": "Kd Sirs",
                            "width" : "100px",
                        },
                        {
                            "field": "namaproduk",
                            "title": "Nama Produk",
                            "width" : "100px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width" : "30px",
                        },
                        {
                            "field": "qtyproduk",
                            "title": "Qty",
                            "width" : "30px",
                        },
                        {
                            "field": "qtyprodukretur",
                            "title": "Qty Retur",
                            "width" : "30px",
                        }
                    ]
                }
            };  
           
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
            }

            function itungUsia(tgl){
                
                // var tg = parseInt(form.elements[0].value);
                // var bl = parseInt(form.elements[1].value);
                // var th = parseInt(form.elements[2].value);
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih/(1000*60*60*24*365));
                //var bln = Math.round((selisih % 365)/(1000*60*60*24));
                return thn + ' thn '// + bln + ' bln'
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
//***********************************

}
]);
});
