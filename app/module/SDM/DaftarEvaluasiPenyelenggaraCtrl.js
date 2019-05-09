define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarEvaluasiPenyelenggaraCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSdm', '$state','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
		function($rootScope, $scope, ModelItem, ManageSdm, $state, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.isRouteLoading=false;
			$scope.now = new Date();
			var data2 = [];		
			loadDataCombo();
			LoadCache();
			init();

			function LoadCache(){
	            var chacePeriode = cacheHelper.get('DaftarEvaluasiPenyelenggaraCtrl');
	            if(chacePeriode != undefined){
	               //var arrPeriode = chacePeriode.split(':');
	                $scope.item.tglawal = new Date(chacePeriode[0]);
	                $scope.item.tglakhir = new Date(chacePeriode[1]);
	               
	                init();
	            }else{
	               $scope.item.tglawal=moment($scope.now).format('YYYY-MM-DD 00:00');
				   $scope.item.tglakhir=moment($scope.now).format('YYYY-MM-DD 23:59');	
	               init();
	            }
           	}

			function loadDataCombo(){	
	            modelItemAkuntansi.getDataTableTransaksi("sdm-pelatihan/get-combo-pelatihan?", true).then(function(dat){
	            	$scope.listJabatan=dat.jabatan;
	            	$scope.listJenisPelatihan=dat.jenispelatihan;
	            });
		    }

		    function init() {
                $scope.isRouteLoading=true;
                var judulMateri =""
                if ($scope.item.judulMateri != undefined){
                    var judulMateri ="&judulMateri=" +$scope.item.judulMateri
                }
                var NamaFasilitator =""
                if ($scope.item.NamaFasilitator != undefined){
                    var NamaFasilitator ="&NamaFasilitator=" +$scope.item.NamaFasilitator
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan-penyelenggara/get-daftar-evaluasi-penyelenggara?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    judulMateri+NamaFasilitator, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.data.length; i++) {
                        dat.data.data[i].no = i+1
                    }
                    $scope.dataGrid = dat.data.data;
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarEvaluasiPenyelenggaraCtrl', chacePeriode);                
            }

		    $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
            }

		    $scope.columnGrid = [
	            {
					field: "tglevaluasi",
					title: "Tgl Evaluasi",
                    format:"{0:dd MMMM yyyy}",
					width: "150px"
				},
				{
					field: "materi",
					title: "Judul materi",
					width: "150px"
				},
				{
					field: "fasilitator",
					title: "Fasilitator",
					width: "120px"
				},
				{
					field: "saran",
					title: "Keterangan",
					width: "120px"
				}
            ];

		    $scope.data2 = function(dataItem) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItem.details
                    }),
                    columns: [
                        {
                            "field": "pegawaifk",
                            "title": "Id Peserta",
                            "width" : "70px",
                        },
                        {
                            "field": "namalengkap",
                            "title": "Nama Peserta",
                            "width" : "120px",
                        }
                    ]
                }
            };  			
			
			$scope.tambahPengajuanPelatihan = function () {
				$state.go('InputEvaluasiNarasumber',{})
			}

			$scope.SearchData = function (){
				init()
			}

			$scope.ClearData = function (){
				$scope.item = {};
				$scope.item.tglawal=moment($scope.now).format('YYYY-MM-DD 00:00');
				$scope.item.tglakhir=moment($scope.now).format('YYYY-MM-DD 23:59');	
			}

			$scope.editPengajuanPelatihan = function(current){

                if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                }                
                
                var chacePeriode ={ 
                    0 : $scope.dataSelected.norec,
                    1 : 'EditEvaluasi',
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }

                cacheHelper.set('InputEvaluasiPenyelenggaraanRevCtrl', chacePeriode);
                $state.go('InputEvaluasiPenyelenggaraanRev', {
                    kpid:  $scope.dataSelected.norec,
                    noOrder:'EditEvaluasi'
                });
            }

            $scope.Hapus = function(current){

                var data = 
                {
                    norec: $scope.dataSelected.norec,               
                    tglbatal : moment($scope.now).format('YYYY-MM-DD HH:mm')
                }

                var objSave = {
                    data: data,
                }

                manageServicePhp.hapusevaluasipenyelenggara(objSave).then(function(e) {
                	init();
                    ClearAll();                   
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

             $scope.Cetak = function() {
        
                var Pelatihan =""
                if ($scope.dataSelected != undefined){
                    Pelatihan = $scope.dataSelected.noplanning
                }

                var stt = 'false'
                if (confirm('View Evaluasi Penyelenggara? ')){
                    // Save it!
                    stt='true';
                }else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();        
                client.get('http://127.0.0.1:1237/printvb/sdm?cetak-evaluasi-penyelenggara=1&nores='+Pelatihan+'&strIdPegawai='+$scope.item.idPegawai+'&view='+ stt, function(response) {
                
                });
            };

			
		}
	]);
});