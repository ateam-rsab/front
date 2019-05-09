define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarOrderBarangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper', 'ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            ComboLoad();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarOrderBarangCtrl');
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
            $scope.newOrder =  function(){
                $state.go('OrderBarangLogistik')
            }

             $scope.BatalCetak = function(){

                 $scope.popUp.close();                 
                 // $scope.item.DataJabatan2 = undefined;                 
                 // $scope.item.DataPegawai2 = undefined;

            }

            $scope.deleteOrder = function(){
                if ($scope.dataSelected == undefined) {
                    alert("Pilih yg akan di hapus!!")
                    return;
                }
                if ($scope.dataSelected.statusorder != '') {
                    alert("Sudah di kirim tidak dapat di hapus!!")
                    return;
                }
                var stt = 'false'
                if (confirm('Hapus Order? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    return;
                }
                var objSave = 
                    {
                        norecorder:$scope.dataSelected.norec
                    }
                
                manageLogistikPhp.postbatalorderbarang(objSave).then(function(e) {
                    init()
                })
            }
            function init() {
                $scope.isRouteLoading=true;
                // var ins =""
                // if ($scope.item.instalasi != undefined){
                //     var ins ="&dpid=" +$scope.item.instalasi.id
                // }
                var rg =""
                if ($scope.item.namaruangantujuan != undefined){
                    var rg ="&ruangantujuanfk=" +$scope.item.namaruangantujuan
                }
                var produkfk =""
                if ($scope.item.namaBarang != undefined){
                    var produkfk ="&produkfk=" + $scope.item.namaBarang.id
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("logistik-stok/get-daftar-order-barang?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&noorder=" + $scope.item.struk+rg+produkfk
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
                   $scope.dataGrid = dat.data.daftar;
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
                cacheHelper.set('DaftarOrderBarangCtrl', chacePeriode);

                
            }
            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }

            // $scope.TransaksiPelayanan = function(){
            //     debugger;
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
            $scope.EditOrder = function(){
                if ($scope.dataSelected.status == 'Terima Order Barang') {
                    alert('Tidak bisa mengubah order ini!')
                    return;
                }
                if ($scope.dataSelected.statusorder == 'Sudah Kirim') {
                    alert('Sudah Di Kirim!')
                    return;
                }
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditOrder',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('OrderBarangLogistikCtrl', chacePeriode);
                $state.go('OrderBarangLogistik')
            }
            $scope.KirimBarang = function(){
                if ($scope.dataSelected.status != 'Terima Order Barang') {
                    alert('Tidak bisa mengirim ke ruangan Sendiri!')
                    return;
                }
                if ($scope.dataSelected.statusorder == 'Sudah Kirim') {
                    alert('Sudah Di Kirim!')
                    return;
                }
                var chacePeriode ={ 0 : '' ,
                    1 : $scope.dataSelected.norec,
                    2 : 'KirimBarang',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('KirimBarangLogistikCtrl', chacePeriode);
                $state.go('KirimBarangLogistik')
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
                "width" : "35px",
            },
            {
                "field": "status",
                "title": "Status",
                "width" : "100px"
            },
            {
                "field": "tglorder",
                "title": "Tgl Order",
                "width" : "60px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglorder #', '')}}</span>"
            },
            {
                "field": "noorder",
                "title": "No Order",
                "width" : "100px",
            },
            {
                "field": "jeniskirim",
                "title": "Jenis Order",
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
                "width" : "120px",
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
            },
            {
                "field": "statusorder",
                "title": "Status Order",
                "width" : "100px",
            }
            ];
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "kdproduk",
                            "title": "Kd Produk",
                            "width" : "70px",
                        },
                        {
                            "field": "kdsirs",
                            "title": "Kd Sirs",
                            "width" : "70px",
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
                        }
                    ]
                }
            };  
            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
            }
            function itungUsia(tgl){
                debugger;
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
            $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
            $scope.cetak =  function(){
                // var stt = 'false'
                    
                // if($scope.dataSelected!=undefined){
                //     if (confirm('View Bukti Order? ')) {
                //     // Save it!
                //         stt='true';
                //     } else {
                //         // Do nothing!
                //         stt='false'
                //     }
                //     var client = new HttpClient();
                //     client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-order=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+$scope.dataLogin.namaLengkap, function(response) {
                //         //aadc=response;
                //     });
                // }else{
                //     alert("Pilih Data Dulu !!!")
                // }
                 $scope.popUp.center().open();
            }

            $scope.CetakAh = function(){               
                
                var jabatan1 =''
                if($scope.item.DataJabatan2 != undefined){
                    jabatan1 = $scope.item.DataJabatan2.namajabatan;
                }            
                
                var pegawai1 = ''
                if($scope.item.DataPegawai2 != undefined){
                    pegawai1 =$scope.item.DataPegawai2.id;
                }

                var jabatan2 =''
                if($scope.item.DataJabatan != undefined){
                    jabatan2 = $scope.item.DataJabatan.namajabatan;
                }            
                
                var pegawai2 = ''
                if($scope.item.DataPegawai != undefined){
                    pegawai2 =$scope.item.DataPegawai.id;
                }

               var stt = 'false'
                if (confirm('View Bukti Order? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-order=1&nores='+$scope.dataSelected.norec+'&pegawaiMegetahui='+pegawai1+'&pegawaiMeminta='+pegawai2
                    +'&jabatanMengetahui='+jabatan1+'&jabatanMeminta='+jabatan2+'&view='+stt+'&user='+pegawaiUser[0].namalengkap, function(response) {
                    //aadc=response; 

                });                
                 // $scope.item.DataJabatan2 = undefined;            
                 // $scope.item.DataPegawai2 = undefined;
                 $scope.popUp.close();
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
