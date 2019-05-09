define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarHisoriPiutangCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper', 'ModelItemAkuntansi',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.isRouteLoading=false;
            $scope.nonbpjs={id:153,kelompokpasien:"Non BPJS"};
            var pegawaiUser = {}
            LoadCache();
            loadCombo();

            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarHisoriPiutangCtrl');
                if(chacePeriode != undefined){
                    $scope.item.tglAwal = new Date(chacePeriode[0]);
                    $scope.item.tglAkhir = new Date(chacePeriode[1]);                   
                }
                else{
                    $scope.item.tglAwal = $scope.now;
                    $scope.item.tglAkhir = $scope.now;
                }
            }

            function loadCombo(){
                manageLogistikPhp.getDataTableTransaksi("laporan/get-data-combo-laporan", true).then(function (dat) {
                    $scope.listDepartemen = dat.data.departemen;
                    $scope.listKelompokPasien = dat.data.kelompokpasien;
                    if($scope.listKelompokPasien!=undefined){
                      $scope.listKelompokPasien.push($scope.nonbpjs)
                    }
                });

                manageLogistikPhp.getDataTableTransaksi("tatarekening/get-data-combo-piutang", false).then(function(data) {
                    var datas = data.data; //piutang/get-data-rekanan-piutang
                    $scope.listRekanan = datas.rekanan;
                });
            }

            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.Departemen.ruangan
            }

            function init() {
                $scope.isRouteLoading=true;
                var ins =""
                if ($scope.item.Departemen != undefined){
                    var ins ="&dpid=" +$scope.item.Departemen.id
                }
                var rg =""
                if ($scope.item.Ruangan != undefined){
                    var rg ="&ruid=" +item.Ruangan.id
                }
                var kpid =""
                if ($scope.item.KelompokPasien != undefined){
                    var kpid ="&kpid=" + $scope.item.KelompokPasien.id
                }
                var penjamin =""
                if ($scope.item.Rekanan != undefined){
                    var penjamin ="&rknid=" + $scope.item.Rekanan.id
                }
                var noregistrasi =""
                if ($scope.item.Noregistrasi != undefined){
                    var noregistrasi ="&noregistrasi=" + $scope.item.Noregistrasi
                }
                var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD HH:mm:ss');
                manageLogistikPhp.getDataTableTransaksi("piutang/get-data-histori-piutang?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    ins+rg+kpid+penjamin+noregistrasi
                    , true).then(function(dat){
                        $scope.isRouteLoading=false;
                        var data =  dat.data.daftar;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
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
                cacheHelper.set('DaftarHisoriPiutangCtrl', chacePeriode);            
            }

            $scope.getRuangan = function(){
                $scope.listRuangan = $scope.item.instalasi.ruangan;
            }
            $scope.cariFilter = function(){

                init();
            }
                        
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.columnGrid = [
                {
                    "field": "no",
                    "title": "No",
                    "width" : "40px",
                },
                {
                    "field": "tglregistrasi",
                    "title": "Tgl Registrasi",
                    "width" : "80px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglregistrasi #', '')}}</span>"
                },
               
                {
                    "field": "noregistrasi",
                    "title": "No RM/Noregistrasi",
                    "width" : "100px",
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width" : "100px",
                },
                {
                    "field": "kelompokpasien",
                    "title": "Tipe Pasien",
                    "width" : "80px",
                },
                {
                    "field": "penjamin",
                    "title": "Penjamin",
                    "width" : "100px",
                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width" : "100px",
                },                
                {
                    "field": "tglpulang",
                    "title": "Tgl Pulang",
                    "width" : "80px",
                    "template": "<span class='style-right'>{{formatTanggal('#: tglpulang #', '')}}</span>"
                },
            ];
            
            $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "tglveriftr",
                            "title": "Tgl Verif Tata Rekening",
                            "width" : "100px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglveriftr #', '')}}</span>"
                        },
                        {
                            "field": "tglveriftr",
                            "title": "Tgl Verif Piutang",
                            "width" : "100px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglverifpiutang #', '')}}</span>"
                        },
                        {
                            "field": "tglposting",
                            "title": "Tgl Posting",
                            "width" : "100px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglposting #', '')}}</span>"
                        },
                        {
                            "field": "tglsbm",
                            "title": "Tgl SBM",
                            "width" : "100px",
                            "template": "<span class='style-right'>{{formatTanggal('#: tglsbm #', '')}}</span>"
                        },
                        {
                            "field": "noveriftr",
                            "title": "No Verif Tata Rekening",
                            "width" : "120px",
                        },
                        {
                            "field": "noverifpiutang",
                            "title": "No Verif Piutang",
                            "width" : "120px",
                        },
                        {
                            "field": "noposting",
                            "title": "No Posting",
                            "width" : "120px",
                        },
                        {
                            "field": "nosbm",
                            "title": "No SBM",
                            "width" : "120px",
                        },
                        {
                            "field": "totalppenjamin",
                            "title": "Total Dijamin",
                            "width" : "120px",
                            "template": "<span class='style-right'>{{formatRupiah('#: totalppenjamin #', 'Rp.')}}</span>",
                        },                       
                        {
                            "field": "totalharusdibayar",
                            "title": "Total Harus Dibayar",
                            "width" : "120px",
                            "template": "<span class='style-right'>{{formatRupiah('#: totalharusdibayar #', 'Rp.')}}</span>",
                        },
                        {
                            "field": "tarifklaimbpjs",
                            "title": "Klaim BPJS",
                            "width" : "120px",
                            "template": "<span class='style-right'>{{formatRupiah('#: tarifklaimbpjs #', 'Rp.')}}</span>",
                        },                       
                        {
                            "field": "totalsudahdibayar",
                            "title": "Sudah Dibayar",
                            "width" : "120px",
                            "template": "<span class='style-right'>{{formatRupiah('#: totalsudahdibayar #', 'Rp.')}}</span>",
                        },
                        {
                            "field": "totalbiaya",
                            "title": "Total Biaya",
                            "width" : "80px",
                            "template": "<span class='style-right'>{{formatRupiah('#: totalbiaya #', 'Rp.')}}</span>",
                        }                       
                    ]
                }
            };  
            
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY HH:mm');
            }
            function itungUsia(tgl){
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih/(1000*60*60*24*365));
                return thn + ' thn '
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
