define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('AkuntansiLaporanAktivitasRev1Ctrl', ['$q', '$rootScope', '$scope', 'ManageAkuntansi','$state','CacheHelper','DateHelper',
        function($q, $rootScope, $scope,manageAkuntansi,$state,cacheHelper,dateHelper) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            $scope.monthUngkul = {
                start: "year",
                depth: "year"
            }
            $scope.yearUngkul = {
                start: "decade",
                depth: "decade"
            }
            
            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('NeracaCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
                $scope.item.bulan = new Date(chacePeriode[0]);
                $scope.item.tahun = new Date(chacePeriode[1]);
               
                init();
             }
             else{
                $scope.item.bulan =  $scope.now;
                $scope.item.tahun =  $scope.now;
                init();
             }
           }
            function loadCombo(){
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
                //     pegawaiUser = dat.data.datalogin
                // });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            $scope.Tambah = function(){
                $state.go('UsulanPermintaanBarangJasaRuangan')
            }
            function init() {
                $scope.isRouteLoading=true;
                // var ins =""
                // if ($scope.item.instalasi != undefined){
                //     var ins ="&dpid=" +$scope.item.instalasi.id
                // }
                // var rg =""
                // if ($scope.item.ruangan != undefined){
                //     var rg ="&ruid=" +$scope.item.ruangan.id
                // }
                // var Jra =""
                // if ($scope.item.jenisRacikan != undefined){
                //     var Jra ="&jenisobatfk=" +$scope.item.jenisRacikan.id
                // }
                var level ="&namalaporan=Laporan Aktivitas" //+$scope.item.level.id
                var bulan = dateHelper.formatDate($scope.item.bulan,"MM")
                var tahun = dateHelper.formatDate($scope.item.tahun,"YYYY")
                var tgltgl = tahun + bulan;
                var tglAwal1 = tahun+"-"+bulan+"-01"
                var tglAkhir1 = tahun+"-"+bulan+"-"+getLastDay( tahun,bulan)
                manageAkuntansi.getDataTableTransaksi("akuntansi/get-data-aruskas?"+
                    "tglAwal=" + tglAwal1 + 
                    "&tglAkhir=" + tglAkhir1 +
                    "&tgltgl=" + tgltgl +
                    "&reportdisplay=aruskas" + level
                    , true).then(function(dat){
                        $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.length; i++) {
                        dat.data[i].no = i+1
                        if (dat.data[i].debet == null) {
                            dat.data[i].debet = 0
                        } 
                        if (dat.data[i].kredit == null) {
                            dat.data[i].kredit = 0
                        } 
                        dat.data[i].saldo = parseFloat(dat.data[i].debet)-parseFloat(dat.data[i].kredit)
                        dat.data[i].thnSebelum = 0
                        dat.data[i].naikturun = 0
                        dat.data[i].naikturunpersen = 0
                    }
                   $scope.dataGrid = dat.data;
                   // pegawaiUser = dat.data.datalogin
                });

                var chacePeriode ={ 0 : $scope.item.bulan ,
                    1 : $scope.item.tahun,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('NeracaCtrl', chacePeriode);

                
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

            $scope.CetakRincian = function(){
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-rincian-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.CetakBukti = function(){
                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-bukti-penerimaan=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.Cetak = function(){
                var stt = 'false'
                if (confirm('View Bukti Penerimaan? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/logistik?cetak-usulanpermintaanbarang=1&nores='+$scope.dataSelected.norec+'&view='+stt, function(response) {
                    //aadc=response;
                });
            }
            
            $scope.EditTerima = function(){
                var chacePeriode ={ 0 : $scope.dataSelected.norec ,
                    1 : 'EditTerima',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('UsulanPermintaanBarangJasaRuanganCtrl', chacePeriode);
                $state.go('UsulanPermintaanBarangJasaRuangan')
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
                manageAkuntansi.getDataTableTransaksi("penerimaan-suplier/delete-terima-barang-suplier?"+"norec_sp=" + $scope.dataSelected.norec, true).then(function(dat){
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
                    "field": "nomap",
                    "title": "No",
                    "width" : "20px",
                    "template": "<span class='style-center'>#: nomap #</span>"
                },
                {
                    "field": "namamap",
                    "title": "Uraian",
                    "width" : "150px"
                },
                {
                    "field": "total",
                    "title": "s/d Juli",
                    "width" : "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
                },
                {
                    "field": "total2",
                    "title": "Agustus",
                    "width" : "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total2 #', '')}}</span>"
                },
                {
                    "field": "total3",
                    "title": "s/d Agustus",
                    "width" : "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total3 #', '')}}</span>"
                }
            ];


            // $scope.columnGrid = [
            //     {
            //         "field": "no",
            //         "title": "No",
            //         "width" : "20px",
            //         "template": "<span class='style-center'>#: no #</span>"
            //     },
            //     {
            //         "field": "noaccount",
            //         "title": "No Akun",
            //         "width" : "50px",
            //         "template": "<span class='style-center'>#: noaccount #</span>"
            //     },
            //     {
            //         "field": "namaaccount",
            //         "title": "Nama Akun",
            //         "width" : "150px"
            //     },
            //     {
            //         "field": "total",
            //         "title": "Saldo",
            //         "width" : "100px",
            //         "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
            //     },
            //     {
            //         "field": "thnSebelum",
            //         "title": "Tahun Sebelumnya",
            //         "width" : "100px",
            //         "template": "<span class='style-right'>{{formatRupiah('#: thnSebelum #', '')}}</span>"
            //     },
            //     {
            //         "title": "Kenaikan / Penurunan",
            //         "width" : "100px",
            //         "columns":[
            //         {
            //             "field": "naikturun",
            //             "title": "Jumlah",
            //             "width" : "100px",
            //             "template": "<span class='style-right'>{{formatRupiah('#: naikturun #', '')}}</span>"
            //         },
            //         {
            //             "field": "naikturunpersen",
            //             "title": "%",
            //             "width" : "50px",
            //             "template": "<span class='style-right'>{{formatRupiah('#: naikturunpersen #', '')}}</span>"
            //         }]
            //     }
            // ];
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
            function getLastDay(y, m) {
                if (m == 2 && y % 4 != 0){
                    return 28
                }
                else {
                    return 31 + (m <= 7 ? ((m % 2) ? 1 : 0) : (!(m % 2) ? 1 : 0)) - (m == 2) - (m == 2 && y % 4 != 0 || !(y % 100 == 0 && y % 400 == 0)); 
                }
            }
//***********************************

}
]);
});
