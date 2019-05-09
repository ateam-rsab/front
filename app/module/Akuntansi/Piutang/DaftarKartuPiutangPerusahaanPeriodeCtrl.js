define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('DaftarKartuPiutangPerusahaanPeriodeCtrl', ['CacheHelper','$timeout', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', '$state','DateHelper', '$http',
        function(cacheHelper,$timeout, $q, $rootScope, $scope, modelItemAkuntansi,$state,dateHelper, $http) {
    	//Inisial Variable
        //Inisial Variable 
        $scope.isRouteLoading=false;
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        $scope.monthSelectorOptions = {
            start: "year",
            depth: "year"
        };
        $scope.item.tgl=$scope.now;
        $scope.item.tglawal=$scope.now;
        $scope.item.tglakhir=$scope.now;
        $scope.isRouteLoading=false;
        $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
        $scope.listPeriode=[{id: 1,name: "Per Tanggal"},{id: 2,name: "Per Bulan"}];

        $q.all([
            modelItemAkuntansi.getDataTableTransaksi("tatarekening/get-data-combo-piutang"), //Ambil data departemen
            ]).then(function(data) {
                $scope.listRekanan = data[0].rekanan;
        });

        $scope.klikPeriode=function(ss){
            if(ss.id==1){
                $scope.isDate=true
                $scope.isMonth=false
            }else{
                $scope.isDate=false
                $scope.isMonth=true
            }
        }
        
        $scope.formatRupiah = function(value, currency) {
            return currency  + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
        
        $scope.loadData = function(){
            // debugger
            $scope.isRouteLoading = true;
            if($scope.isDate==true){
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59:59');
            }
            if($scope.isMonth==true){
                var tgl = new Date($scope.item.tgl.getFullYear(), $scope.item.tgl.getMonth()+1, 0).getDate();
                var tglAwal = moment($scope.item.tgl).format('YYYY-MM-01 00:00:00');
                var tglAkhir = moment($scope.item.tgl).format('YYYY-MM-'+tgl+' 23:59:59');
            }
            var noPosting = "";
            if($scope.item.noCollect != undefined){
                noPosting = $scope.item.noCollect;
            }
            var idPerusahaan = "";
            if($scope.item.perusahaan != undefined){
                idPerusahaan = $scope.item.perusahaan.id;
            }
            modelItemAkuntansi.getDataTableTransaksi("piutang/daftar-kartu-piutang-perusahaan-periode?"
            + "&tglAwal=" + tglAwal
            + "&tglAkhir=" + tglAkhir
            + "&noPosting=" + noPosting
            + "&idPerusahaan=" + idPerusahaan
            , true).then(function(dat){
                $scope.isRouteLoading = false;
                // for (var i = 0; i < dat[0].rekap.length; i++) {
                //     dat[0].rekap[i].no = i+1
                // }
                $scope.dataSource = {
                    data:dat[0].data,
                    schema:{
                        model:{
                            fields:{
                                noCollect:{type:"string"},
                                tglBayar:{type:"string"},
                                keterangan:{type:"string"},
                                kps:{type:"string"},
                                namarekanan:{type:"string"},
                                piutang:{type:"number"},
                                bayar:{type:"number"},
                                adm:{type:"number"},
                                saldo:{type:"number"},
                            }
                        }
                    },
                    group:[
                        {
                            field:"kps", aggregates:[
                                {field:'saldo', aggregate:'sum'}
                            ]                           
                        },                        
                    ],
                    groupable: true,
                    selectable: true,
                    refresh: true,
                    // groupable:true,
                    aggregate:[
                        {field:'saldo', aggregate:'sum'}
                    ]

                };                                
        //         $scope.dataSourceRekap = {
        //             data:dat[0].rekap,
        //             schema:{
        //                 model:{
        //                     fields:{
        //                         idrekanan:{type:"string"},
        //                         namarekanan:{type:"string"},
        //                         saldo:{type:"number"},
        //                     }
        //                 }
        //             },
        //             selectable: true,
        //             refresh: true,
        //             // groupable:true,
        //             aggregate:[
        //                 {field:'saldo', aggregate:'sum'}
        //             ]
        //         };                
            });
        }

        $scope.detailOption = {
            // columns: $scope.columnLapRehab,
            toolbar: "<button type='button' class='k-button' data-toggle='tooltip' title='cetak laporan' style='width:10%' ng-click='cetak()'><i class='fa fa-print'></i>&nbsp;Cetak</button><button type='button' class='k-button' data-toggle='tooltip' title='cetak rekap' style='width:10%' ng-click='cetakRekap()'><i class='fa fa-print'></i>&nbsp;Cetak Rekap</button>",
            columns: [
                {
                    field: "noCollect",
                    title: "No Reg",
                    width:"100px",
                },
                {
                    field: "tglCollect",
                    title: "Keluar",
                    width:"50px",
                    template: "#= moment(new Date(tglCollect)).format('DD-MM-YYYY') #",
                    // footerTemplate:"Terbilang"
                },
                {
                    field: "keterangan",
                    title: "Keterangan",
                    width:"150px",
                    // footerTemplate:"'#: terbilang #'"
                },
                {
                    field: "piutang",
                    title: "Piutang",
                    width:"100px",
                    template: "<span class='style-left'>{{formatRupiah('#: piutang #', 'Rp.')}}</span>"
                },
                {
                    field: "bayar",
                    title: "Bayar",
                    width:"100px",
                    template: "<span class='style-left'>{{formatRupiah('#: bayar #', 'Rp.')}}</span>"
                },
                {
                    field: "adm",
                    title: "ADM",
                    width:"50px",
                    template: "<span class='style-left'>{{formatRupiah('#: adm #', 'Rp.')}}</span>",
                    footerTemplate:"Total"
                },
                {
                    field: "saldo",
                    title: "Saldo",
                    width:"100px",
                    template: "<span class='style-left'>{{formatRupiah('#: saldo #', 'Rp.')}}</span>",
                    aggregates:["sum"],
                    groupFooterTemplate:"<span>Rp. {{formatRupiah('#:data.saldo.sum  #', '')}}</span>",
                    footerTemplate:"<span>Rp. {{formatRupiah('#:data.saldo.sum  #', '')}}</span>"
                },
                {
                    hidden: true,
                    field: "kps",
                    title: "Perusahaan",
                    groupHeaderTemplate: "#= value #"
                },
                {
                    hidden: true,
                    field: "namarekanan",
                    title: "Perusahaan",
                    groupHeaderTemplate: "{{('#: value.idrekanan #'}} #= value #"
                }
            ],
            sortable: {
                mode: "single",
                allowUnsort: false,
            },
            pageable:{
                messages: {
                    display: "Menampilkan {2} data"
                    // display: "Menampilkan {0} - {1} data dari {2} data"
                  }
            },
            groupable :{
                field: "kps",
                title: "kps",
                // template: "<span class='style-right'>{{'#: idrekanan #'}} &nbsp;{{'#: namarekanan #'}}</span>",
            }
        }
        $scope.rekapOption = {
            // columns: $scope.columnLapRehab,
            columns : [
                {
                    field: "no",
                    title: "No",
                    width:"20px",
                    attributes: {align:"center"}
                },
                {
                    field: "idrekanan",
                    title: "Kode Perusahaan",
                    width:"50px",
                    attributes: {align:"center"}
                },
                {
                    field: "namarekanan",
                    title: "Perusahaan",
                    width:"200px",
                    footerTemplate:"Jumlah keseluruhan"            
                },                
                {
                    field: "saldo",
                    title: "Saldo",
                    template: "<span class='style-right'>{{formatRupiah('#: saldo #', 'Rp.')}}</span>",
                    width:"100px",
                    aggregates:["sum"],
                    footerTemplate:"<span>Rp. {{formatRupiah('#:data.saldo.sum  #', '')}}</span>"
                }
            ],
            sortable: {
                mode: "single",
                allowUnsort: false,
            },
            pageable:{
                messages: {
                    display: "Menampilkan {2} data"
                    // display: "Menampilkan {0} - {1} data dari {2} data"
                  }
            }
        }
        // $scope.detailGridOptions = function(dataItem) {
        //     return {
        //         dataSource: new kendo.data.DataSource({
        //             data: dataItem.detail,
        //             schema:{
        //                 model:{
        //                     fields:{
        //                         nocollect:{type:"string"},
        //                         tglbayar:{type:"string"},
        //                         keterangan:{type:"string"},
        //                         piutang:{type:"number"},
        //                         bayar:{type:"number"},
        //                         adm:{type:"number"},
        //                         saldo:{type:"number"}
        //                     }
        //                 }
        //             },
        //             aggregate:[
        //                 {field:'saldo', aggregate:'sum'}
        //             ]
        //         }),
        //         columns: [
        //             {
        //                 field: "nocollect",
        //                 title: "No Reg",
        //                 width:"100px",
        //             },
        //             {
        //                 field: "tglbayar",
        //                 title: "Keluar",
        //                 width:"50px",
        //                 template: "#= moment(new Date(tglbayar)).format('DD-MM-YYYY') #",
        //                 // footerTemplate:"Terbilang"
        //             },
        //             {
        //                 field: "keterangan",
        //                 title: "Keterangan",
        //                 width:"150px",
        //                 // footerTemplate:"'#: terbilang #'"
        //             },
        //             {
        //                 field: "piutang",
        //                 title: "Piutang",
        //                 width:"100px",
        //                 template: "<span class='style-left'>{{formatRupiah('#: piutang #', 'Rp.')}}</span>"
        //             },
        //             {
        //                 field: "bayar",
        //                 title: "Bayar",
        //                 width:"100px",
        //                 template: "<span class='style-left'>{{formatRupiah('#: bayar #', 'Rp.')}}</span>"
        //             },
        //             {
        //                 field: "adm",
        //                 title: "ADM",
        //                 width:"50px",
        //                 template: "<span class='style-left'>{{formatRupiah('#: adm #', 'Rp.')}}</span>",
        //                 footerTemplate:"Total"
        //             },
        //             {
        //                 field: "saldo",
        //                 title: "Saldo",
        //                 width:"100px",
        //                 template: "<span class='style-left'>{{formatRupiah('#: saldo #', 'Rp.')}}</span>",
        //                 aggregates:["sum"],
        //                 footerTemplate:"<span>Rp. {{formatRupiah('#:data.saldo.sum  #', '')}}</span>"
        //             }
        //         ]
        //     }
        // };
        $scope.formatRupiah = function(value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
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

        $scope.tglPelayanan = $scope.item.pelayanan;
        $scope.dokter = $scope.item.namaPegawai;
        
        // debugger;
        $scope.date = new Date();
        var tanggals = dateHelper.getDateTimeFormatted3($scope.date);

        // Tanggal Inputan
        $scope.tglawal = $scope.item.tglawal;
        $scope.pegawai = modelItemAkuntansi.getPegawai();
		
        $scope.cetak = function() {
            debugger;
            if($scope.isDate==true){
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59:59');
            }
            if($scope.isMonth==true){
                var tgl = new Date($scope.item.tgl.getFullYear(), $scope.item.tgl.getMonth()+1, 0).getDate();
                var tglAwal = moment($scope.item.tgl).format('YYYY-MM-01 00:00:00');
                var tglAkhir = moment($scope.item.tgl).format('YYYY-MM-'+tgl+' 23:59:59');
            }
            var noPosting = "";
            if($scope.item.noCollect != undefined){
                noPosting = $scope.item.noCollect;
            }
            var idPerusahaan = "";
            if($scope.item.perusahaan != undefined){
                idPerusahaan = $scope.item.perusahaan.id;
            }
            var stt = 'false'
            if (confirm('View Kartu Piutang Perusahaan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-KartuPiutangPerusahaanDetail=1&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&strPerusahaan='+idPerusahaan+'&noPosting='+noPosting+'&strIdPegawai='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
            }); 
	    }
	    $scope.cetakRekap = function() {
            debugger;
           if($scope.isDate==true){
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00:00');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59:59');
            }
            if($scope.isMonth==true){
                var tgl = new Date($scope.item.tgl.getFullYear(), $scope.item.tgl.getMonth()+1, 0).getDate();
                var tglAwal = moment($scope.item.tgl).format('YYYY-MM-01 00:00:00');
                var tglAkhir = moment($scope.item.tgl).format('YYYY-MM-'+tgl+' 23:59:59');
            }
            var noPosting = "";
            if($scope.item.noCollect != undefined){
                noPosting = $scope.item.noCollect;
            }
            var idPerusahaan = "";
            if($scope.item.perusahaan != undefined){
                idPerusahaan = $scope.item.perusahaan.id;
            }
            var stt = 'false'
            if (confirm('View Rekapitulasi Kartu Piutang Perusahaan? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/Piutang?cetak-RekapKartuPiutangPerusahaan=1&tglAwal='+tglAwal+'&tglAkhir='+tglAkhir+'&strPerusahaan='+idPerusahaan+'&noPosting='+noPosting+'&strIdPegawai='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
            });
	   	}   
  
       }
    ]);
});