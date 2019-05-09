define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarUndanganPelatihanCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
		function($rootScope, $scope, ModelItem,$state, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.isRouteLoading=false;
			$scope.now = new Date();
			$scope.item.KelompokUser='';
			$scope.item.idPegawai='';
			loadDataCombo();			
			LoadCache();

			function loadDataCombo(){	
	            modelItemAkuntansi.getDataTableTransaksi("sdm-pelatihan/get-combo-pelatihan?", true).then(function(dat){
	            	// $scope.listJabatan=dat.jabatan;
	            	$scope.listJenisPelatihan=dat.jenispelatihan;
                    $scope.item.KelompokUser=dat.datapegawai.objectkelompokuserfk;
                    $scope.item.idPegawai=dat.datapegawai.objectpegawaifk;
	            });

	            modelItemAkuntansi.getDataTableTransaksi("sdm-pelatihan/get-combo-data-pelatihan?", true).then(function(dat){
	            	$scope.listPelatihan=dat.strukplanning;
	            });
		    }

			function LoadCache(){
	            var chacePeriode = cacheHelper.get('DaftarUndanganPelatihanCtrl');
	            if(chacePeriode != undefined){
	               //var arrPeriode = chacePeriode.split(':');
	                $scope.item.tglawal = new Date(chacePeriode[0]);
	                $scope.item.tglakhir = new Date(chacePeriode[1]);
	               
	                // init();
	            }else{
	               $scope.item.tglawal=moment($scope.now).format('YYYY-MM-DD 00:00');
				   $scope.item.tglakhir=moment($scope.now).format('YYYY-MM-DD 23:59');	
	               // init();
	            }
           	}

           	function init() {
                $scope.isRouteLoading=true;
                var jenisPelatihan =""
                if ($scope.item.jenisPelatihan != undefined){
                    jenisPelatihan ="&jenisPelatihan=" +$scope.item.jenisPelatihan.id
                }
                var Pelatihan =""
                if ($scope.item.Pelatihan != undefined){
                    Pelatihan ="&Pelatihan=" +$scope.item.Pelatihan.noplanning
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-data-peserta-pelatihan?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    jenisPelatihan+Pelatihan, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                    }
                    $scope.dataGrid = dat.data.daftar;
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarUndanganPelatihanCtrl', chacePeriode);                
            }

            $scope.SearchData = function (){
				init()
			}

			$scope.columnGrid = [
				{
					field: "no",
					title: "No",
					width: "60px"
				},
	   //          {
				// 	field: "namaplanning",
				// 	title: "Id Pegawai",
				// 	width: "150px"
				// },
				{
					field: "nippns",
					title: "Nip",
					width: "120px"
				},
				{
					field: "namalengkap",
					title: "Nama Peserta",
					width: "150px"
				},
				{
					field: "tanggalpelaksanaan",
					groupHeaderTemplate: "#=value#",
					title: "Tanggal Pelaksanaan Pelatihan",
					width: "120px"
				},			
                {
                    field: "penyelenggara",
                    title: "Penyelenggara",
                    width: "120px"
                }                
            ];

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


	        $scope.CetakUndangan = function() {
        
	            var Pelatihan =""
                if ($scope.item.Pelatihan != undefined){
                    Pelatihan = $scope.item.Pelatihan.noplanning
                }

	            var stt = 'false'
	            if (confirm('View Undangan Pelatihan? ')){
	                // Save it!
	                stt='true';
	            }else {
	                // Do nothing!
	                stt='false'
	            }
	            var client = new HttpClient();        
	            client.get('http://127.0.0.1:1237/printvb/sdm?cetak-undangan-pelatihan=1&nores='+Pelatihan+'&strIdPegawai='+$scope.item.idPegawai+'&view='+ stt, function(response) {
	            
	            });
		    };

		    $scope.CetakSuratTugas = function() {
        
	            var Pelatihan =""
                if ($scope.item.Pelatihan != undefined){
                    Pelatihan = $scope.item.Pelatihan.noplanning
                }

	            var stt = 'false'
	            if (confirm('View Surat Tugas Pelatihan? ')){
	                // Save it!
	                stt='true';
	            }else {
	                // Do nothing!
	                stt='false'
	            }
	            var client = new HttpClient();        
	            client.get('http://127.0.0.1:1237/printvb/sdm?cetak-surat-tugas=1&nores='+Pelatihan+'&strIdPegawai='+$scope.item.idPegawai+'&view='+ stt, function(response) {
	            
	            });
		    };

		    $scope.CetakPerNara = function() {
        
	            var Pelatihan =""
                if ($scope.item.Pelatihan != undefined){
                    Pelatihan = $scope.item.Pelatihan.noplanning
                }

	            var stt = 'false'
	            if (confirm('View Surat Permohonan Narasumber? ')){
	                // Save it!
	                stt='true';
	            }else {
	                // Do nothing!
	                stt='false'
	            }
	            var client = new HttpClient();        
	            client.get('http://127.0.0.1:1237/printvb/sdm?cetak-permohonan-narasumber=1&nores='+Pelatihan+'&strIdPegawai='+$scope.item.idPegawai+'&view='+ stt, function(response) {
	            
	            });
		    };

		    $scope.CetakPerMC = function() {
        
	            var Pelatihan =""
                if ($scope.item.Pelatihan != undefined){
                    Pelatihan = $scope.item.Pelatihan.noplanning
                }

	            var stt = 'false'
	            if (confirm('View Surat Permohonan MC dan Dokumentasi? ')){
	                // Save it!
	                stt='true';
	            }else {
	                // Do nothing!
	                stt='false'
	            }
	            var client = new HttpClient();        
	            client.get('http://127.0.0.1:1237/printvb/sdm?cetak-permohonan-mc=1&nores='+Pelatihan+'&strIdPegawai='+$scope.item.idPegawai+'&view='+ stt, function(response) {
	            
	            });
		    };

		}
	]);
});