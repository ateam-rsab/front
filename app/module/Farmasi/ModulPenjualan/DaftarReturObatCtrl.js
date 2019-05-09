define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarReturObatCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper','ManageTataRekening',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,manageTataRekening) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            var pegawaiUser = {}
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarReturObatCtrl');
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
            function loadCombo(){
                manageTataRekening.getDataTableTransaksi("ruangan/get-ruangan-farmasi", true).then(function(dat){
                    $scope.listRuangan = dat.data;
                });
                // $scope.listJenisRacikan = [{id:1,jenisracikan:'Puyer'}]
            }
            function init() {
                $scope.isRouteLoading=true;
                var ins =""
                if ($scope.item.instalasi != undefined){
                    var ins ="&dpid=" +$scope.item.instalasi.id
                }
                var rg =""
                if ($scope.item.ruangan != undefined){
                    var rg ="&ruid=" +$scope.item.ruangan.id
                }
                // var Jra =""
                // if ($scope.item.jenisRacikan != undefined){
                //     var Jra ="&jenisobatfk=" +$scope.item.jenisRacikan.id
                // }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("farmasi/get-daftar-retur-obat?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    "&nostruk=" + $scope.item.struk 
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
                cacheHelper.set('DaftarReturObatCtrl', chacePeriode);

                
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
                client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-struk-retur=1&nores='+$scope.dataSelected.norec+'&view='+stt+'&user='+pegawaiUser.userData.namauser, function(response) {
                    //aadc=response;
                });
            }
            $scope.CetakRekapLayanan = function(){
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                var stt = 'false'
                if (confirm('Lihat Rekap Retur? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/farmasi?cetak-RekapReturObat=1&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&user='+pegawaiUser.userData.namauser+'&view='+stt, function(response) {
                    //aadc=response;
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
                    "field": "tglretur",
                    "title": "Tgl Retur",
                    "width" : "40px",
                },
                {
                    "field": "noretur",
                    "title": "NoRetur",
                    "width" : "40px",
                },
                {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width" : "40px",
                },
                {
                    "field": "nocm",
                    "title": "NoMR",
                    "width" : "40px",
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width" : "100px",
                },
                {
                    "field": "keteranganlainnya",
                    "title": "Keterangan",
                    "width" : "100px",
                },
                {
                    "field": "namaruangan",
                    "title": "Nama Ruangan",
                    "width" : "80px",
                },
                {
                    "field": "namalengkap",
                    "title": "Pegawai",
                    "width" : "80px"
                }
            ];
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "rke",
                            "title": "Rke",
                            "width" : "30px",
                        },
                        {
                            "field": "jeniskemasan",
                            "title": "Jumlah",
                            "width" : "50px"
                        },
                        {
                            "field": "namaproduk",
                            "title": "Harga Satuan",
                            "width" : "100px",
                        },
                        {
                            "field": "satuanstandar",
                            "title": "Satuan",
                            "width" : "30px",
                        },
                        {
                            "field": "jumlah",
                            "title": "Qty",
                            "width" : "30px",
                        },
                        {
                            "field": "hargasatuan",
                            "title": "Harga Satuan",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
                        },
                        {
                            "field": "hargadiscount",
                            "title": "Discount",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
                        },
                        {
                            "field": "jasa",
                            "title": "Jasa",
                            "width" : "50px",
                            "template": "<span class='style-right'>{{formatRupiah('#: jasa #', '')}}</span>"
                        },
                        {
                            "field": "total",
                            "title": "Total",
                            "width" : "70px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
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
