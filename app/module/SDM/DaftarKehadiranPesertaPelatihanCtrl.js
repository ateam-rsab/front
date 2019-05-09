define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarKehadiranPesertaPelatihanCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
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
	            var chacePeriode = cacheHelper.get('DaftarKehadiranPesertaPelatihanCtrl');
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
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-daftar-kehadiran-peserta-pelatihan?"+
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
                cacheHelper.set('DaftarKehadiranPesertaPelatihanCtrl', chacePeriode);                
            }

            $scope.SearchData = function (){
				init()
			}
			function categoryDropDownEditor(container, options) {
                $('<input required name="' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "kehadiran",
                        dataValueField: "id",
                        dataSource: $scope.listKehadiranPelatihan
                    });
			}			

			$scope.columnGrid = {
				pageable: true,
				scrollable: true,
				columns: [
					{
						field: "no",
						title: "No",
						width: "40px"
					},		
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
	                },
	                {
	                    field: "kehadiran",
	                    title: "Status Kehadiran",
	                    width: "80px"
	                },
	     //            { 
	     //            	"title" : "Action",
						// "width" : "200px",
						// "template" : "<button class='btnhadir' ng-click='enableData()'>Enable</button>"+
						// "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
	     //            }     
		     		{
	                    "command": [
	                        { text: "Hadir", click: Hadir, imageClass: "k-icon k-i-pencil" },
	                        // { text: "Jawab Rujukan", click: jawabRujukan, imageClass: "k-icon k-i-download" },
	                        { text: "Tidak Hadir", click: tidakHadir, imageClass: "k-icon k-i-pencil" },
	                    ],
	                    title: "",
	                    width: "150px",
	                }        
	            ],	           
			}

			function Hadir(e) {
				e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
               
                if (dataItem == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }; 

                if (moment($scope.now).format('YYYY-MM-DD') != moment(dataItem.tanggalpelaksanaan).format('YYYY-MM-DD')) {
                    alert("Maaf, anda belum bisa update data kehadiran, lakukan update kehadiran pada tanggal " + moment(dataItem.tanggalpelaksanaan).format('DD-MM-YYYY HH:mm'))
                    return;
                };

				var statushadir = 1;
                var data = 
                {
                	norecdetail: dataItem.norecdetail,
                	pegawaifk: dataItem.pegawaifk,
                    statuskehadiran: parseFloat(statushadir),               
                    tglabsen : moment($scope.now).format('YYYY-MM-DD HH:mm')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.savekehadiranpeserta(objSave).then(function(e) {
                	init();                  
            	});
            }

            function tidakHadir(e) {

            	e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
               
                if (dataItem == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }; 

                if (moment($scope.now).format('YYYY-MM-DD') != moment(dataItem.tanggalpelaksanaan).format('YYYY-MM-DD')) {
                    alert("Maaf, anda belum bisa update data kehadiran, lakukan update kehadiran pada tanggal " + moment(dataItem.tanggalpelaksanaan).format('DD-MM-YYYY HH:mm'))
                    return;
                };

				var statushadir = 2;
                var data = 
                {
                	norecdetail: dataItem.norecdetail,
                	pegawaifk: dataItem.pegawaifk,
                    statuskehadiran: parseFloat(statushadir),               
                    tglabsen : moment($scope.now).format('YYYY-MM-DD HH:mm')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.savekehadiranpeserta(objSave).then(function(e) {
                	init();                 
            	});
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

		}
	]);
});