define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanRehabCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien, manageTataRekening) {
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

        $scope.item.tglawal = $scope.now;
        $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
        
        $scope.formatRupiah = function(value, currency) {
            return currency  + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
        $scope.mainGroupOptionLaporanRehab ={
            // columns: $scope.columnLapRehab,
            columns:[
                {
                    field:"kelompokpasien",
                    title:"Tipe Layanan",
                    groupFooterTemplate:"Jumlah",
                    footerTemplate:"Jumlah keseluruhan"
                },
                {
                    field:"layanan",
                    title:"Layanan"
                },
                {
                    field:"harga",
                    title:"Harga",
                    template:"<span>Rp. {{formatRupiah('#: harga #', '')}}</span>",
                },
                {
                    field:"jumlah", 
                    title:"Jumlah Tindakan",
                    aggregates:["sum"],
                    groupFooterTemplate:"<span>Tindakan: #=data.jumlah.sum  #</span>",
                    footerTemplate:"<span>#:data.jumlah.sum  #</span>"
                    
                },
                {
                    field:"subtotal",
                    title:"Sub Total",
                    template:"<span>Rp. {{formatRupiah('#: subtotal #', '')}}</span>",
                    aggregates:["sum"]
                },
                {
                    field:"totalPenerimaan",
                    title:"Total Penerimaan",
                    groupFooterTemplate:"<span>Penerimaan: Rp. {{formatRupiah('#=data.subtotal.sum  #', '')}}</span>",
                    footerTemplate:"<span>Rp. {{formatRupiah('#:data.subtotal.sum  #', '')}}</span>"
                }
            ],
            sortable: {
                mode: "single",
                allowUnsort: false,
            }
            ,
            pageable:{
                messages: {
                    display: "Menampilkan {2} data"
                    // display: "Menampilkan {0} - {1} data dari {2} data"
                  }
            },
        }
        // console.log($scope.mainGroupOptionLaporanRehab.columns)
        // $scope.loadData();
        $scope.loadData = function(){
            
            $scope.isRouteLoading = true;
            var periode = new moment($scope.item.tglawal).format('YYYY-MM-01');
            var idDept = "";
            if($scope.item.departement != undefined){
                idDept = $scope.item.departement.id;
            }
            modelItemAkuntansi.getDataTableTransaksi("laporan/get-laporan-rehab?"
            + "tanggal=" + periode
            + "&idDept=" + idDept
            , true).then(function(dat){                
                // console.log(JSON.stringify(dat.data))
                $scope.dataSourceLaporanRehabService = {
                    data:dat.data,
                    schema:{
                        model:{
                            fields:{
                                kelompokpasien:{type:"string"},
                                layanan:{type:"string"},
                                jumlah:{type:"number"},
                                harga:{type:"number"},
                                subtotal:{type:"number"},
                                totalPenerimaan:{type:"number"},
                            }
                        }
                    },
                    selectable: true,
                    refresh: true,
                    // groupable:true,
                    group:[
                        {
                            field:"kelompokpasien", aggregates:[
                                {field:'subtotal', aggregate:'sum'},
                                {field:"jumlah", aggregate:'sum'},
                                {field:'harga', aggregate:'sum'},
                            ]                            
                        },                        
                    ],
                    aggregate:[
                        {field:'harga', aggregate:'sum'},
                        {field:'subtotal', aggregate:'sum'},
                        {field:'jumlah',  aggregate:'sum'},
                    ]
                };                
            });
            $scope.isRouteLoading = false;
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
        $scope.listDepartemen = [
            {
                id: 18,
                departemen: "Instalasi Rawat Jalan"
            },{
                id: 16,
                departemen: "Instalasi Rawat Inap"
            }
        ]
        //sdm service hanya sementara, nanti harus diganti pake service kasir !!

        
	    // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat) {
	    // $scope.listRuangan = dat.data;
	    // });
        $scope.listDepartemen = [{
            id: 18,
            departemen: 'Instalasi Rawat Jalan'
        },{
            id:16,
            departemen:'Instalasi Rawat Inap'
        }
    ];


        $scope.tglPelayanan = $scope.item.pelayanan;
        $scope.dokter = $scope.item.namaPegawai;

        $scope.listDataFormat = [
             {
             "id":1, "format":"pdf"
             },
             {
              "id":2, "format":"xls"
             }
		];
        
        ;
        $scope.date = new Date();
        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);

        // Tanggal Inputan
        $scope.tglawal = $scope.item.tglawal;
        $scope.pegawai = modelItemAkuntansi.getPegawai();
		
        $scope.Cetak = function() {
            
        // if($scope.item.format == undefined){
        // 	alert('format file harus dipilih terlebih dahulu !!!')
        // }
            ;
            var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "01-MM-yyyy");
            if($scope.item.departement == undefined)
                var departement = "";
            else
                var departement = $scope.item.departement.id;
            var stt = 'false'
            if (confirm('View Laporan Bulanan Rehab Medik? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-rekapPemeriksaan=1&tglAwal='+tglawal+'&strIdDepartement='+departement+'&strIdPegawai='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
            });
            // if(client.status==0){
            //     if($scope.item.format == undefined){
            //         alert('format file harus dipilih terlebih dahulu !!!');
            //     }else{
            //         var urlLaporan = ReportPelayanan.open('preporting/lapPelayananPasien?startDate=''+tglawal+'+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdDepartement='+departement+'&strIdKelompokPasien='+kelompokPasien+'&strIdDokter='+namaPegawai+'&format='+$scope.item.format.format);
            //         window.open(urlLaporan, '_blank');
            //     }
            // }   
	    }
	    $scope.CetakObat = function() {
            
        // if($scope.item.format == undefined){
        // 	alert('format file harus dipilih terlebih dahulu !!!')
        // }
            ;
            var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "01-MM-yyyy");
            var stt = 'false'
            if (confirm('View Laporan Bulanan Rehab Medik? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-rekapPendapatanObat=1&tglAwal='+tglawal+'&strIdPegawai='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
                // do something with response
            });
	   	}   
            // if(client.status==0){
            //     if($scope.item.format == undefined){
            //         alert('format file harus dipilih terlebih dahulu !!!');
            //     }else{
            //         var urlLaporan = ReportPelayanan.open('preporting/lapPelayananPasien?startDate=''+tglawal+'+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdDepartement='+departement+'&strIdKelompokPasien='+kelompokPasien+'&strIdDokter='+namaPegawai+'&format='+$scope.item.format.format);
            //         window.open(urlLaporan, '_blank');
            //     }
            // }   
       }
    ]);
});