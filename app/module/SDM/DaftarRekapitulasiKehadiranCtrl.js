define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarRekapitulasiKehadiranCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper','$parse',
		function($rootScope, $scope, ModelItem,$state, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper, $parse) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.isRouteLoading=false;
			$scope.now = new Date();
			$scope.item.KelompokUser='';
			$scope.item.idPegawai='';
			var StatusKehadiran ="";
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
	            var chacePeriode = cacheHelper.get('DaftarRekapitulasiKehadiranCtrl');
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
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-daftar-rekapitulasi-kehadiran-peserta-pelatihan?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    jenisPelatihan+Pelatihan, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    var totalpeserta=0;
                    var hadir=0;
                    var tidakhadir=0;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                    }
                    $scope.dataGrid = dat.data.daftar;
                    $scope.columnGrid = {
						pageable: true,
						scrollable: true,
						dataBound: $scope.onDataBound,
						columns: [
							{
								field: "no",
								title: "No",
								width: "40px"
							},		
							{
								field: "namaplanning",
								title: "Pelatihan",
								width: "120px"
							},
							{
								field: "tanggalpelaksanaan",
								groupHeaderTemplate: "#=value#",
								title: "Tanggal Pelaksanaan",
								width: "150px"
							},	
							{
								field: "totalpeserta",
								title: "Total Peserta",
								width: "120px",
								// template: "<a ng-click='cellClick()'># if( totalpeserta==null) {# - # } else {# #= totalpeserta # #} #</a>",
							},
							{
								field: "totalhadir",
								title: "Peserta Hadir",
								width: "120px"
							},		
			                {
								field: "totaltidakhadir",
								title: "Peserta Tidak Hadir",
								width: "120px"
							}	             
			            ],
			           	           
					}
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarRekapitulasiKehadiranCtrl', chacePeriode);                
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


			$scope.onDataBound = function(e){
				
				var closestGridElement = e.sender.element.closest('[data-role="grid"]');
				var gridId = closestGridElement.attr('id');
				// console.log(id);
				var grid = $("#" + gridId).data("kendoGrid");
				var model = $parse(gridId);
				// var value = grid.dataSource.aggregates().pointQty.sum;
				// model.assign($scope, value.toFixed(2));
				$(grid.tbody).on("click", "td", function (e) {
					// if (e.currentTarget.innerText === "") return; // disable show popup on empty cell date value
					var row = $(this).closest("tr");
					var selectedData = grid.dataItem(row);
					// var rowIdx = $("tr", grid.tbody).index(row);
					var colIdx = $("td", row).index(this);
					if (colIdx == 3){
						$scope.showDetail(selectedData.noplanning);
						// disable show popup if cell index < 5
						// var colDateIdx = colIdx - 3;
						// var colName = $("#" + gridId + ' tr').eq(1).find('th').eq(colDateIdx).text();

						// if(colName.length === 1){
						// 	colName = "0" + colName;
						// }
						// if (colName.length <= 2){							
							
						// 	$scope.showDetail(selectedData.noplanning);
						// }
						
					}else if (colIdx == 4){
						$scope.showDetail1(selectedData.noplanning);
						// disable show popup if cell index < 5
						// var colDateIdx = colIdx - 4;
						// var colName = $("#" + gridId + ' tr').eq(1).find('th').eq(colDateIdx).text();

						// if(colName.length === 1){
						// 	colName = "0" + colName;
						// }
						// if (colName.length <= 2){							
							
						// 	$scope.showDetail1(selectedData.noplanning);
						// }
						
					}else if (colIdx == 5){
						$scope.showDetail2(selectedData.noplanning);
						// disable show popup if cell index < 5
						// var colDateIdx = colIdx - 5;
						// var colName = $("#" + gridId + ' tr').eq(1).find('th').eq(colDateIdx).text();

						// if(colName.length === 1){
						// 	colName = "0" + colName;
						// }
						// if (colName.length <= 2){							
							
						// 	$scope.showDetail2(selectedData.noplanning);
						// }
						
					}			

				});
			}

			$scope.showDetail = function(noplanning){
				$scope.isRouteLoading = true;
				StatusKehadiran="";
				$scope.dataGridDetail=undefined;
				$scope.item.JudulPelatihan=undefined;
                var Pelatihan =""
                if (noplanning != undefined){
                    Pelatihan ="&Pelatihan=" + noplanning
                }
                var StatusKehadiran ="&StatusKehadiran=" + "ALL"
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-detail-kehadiran-peserta-pelatihan?"+
                	"tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    StatusKehadiran+Pelatihan, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                    }
                    $scope.item.JudulPelatihan=dat.data.daftar[0].namaplanning;
                    $scope.columnGridDetail = {
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
								width: "120px",
							},
							{
								field: "namajabatan",
								title: "jabatan",
								width: "120px"
							},
							{
								field: "kehadiran",
								title: "Status Kehadiran",
								width: "120px"
							}            
			            ],
			           	           
					}
					$scope.dataGridDetail = new kendo.data.DataSource({
						data: dat.data.daftar,
					});
					$scope.PopUpDetailPeserta.center().open();
                });
			}

			$scope.showDetail1 = function(noplanning){
				$scope.isRouteLoading = true;
				StatusKehadiran="";
				$scope.dataGridDetail=undefined;
				$scope.item.JudulPelatihan=undefined;
				var satu = 1;
                var Pelatihan =""
                if (noplanning != undefined){
                    Pelatihan ="&Pelatihan=" + noplanning
                }
                var StatusKehadiran ="&StatusKehadiran=" + parseFloat(satu);
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-detail-kehadiran-peserta-pelatihan?"+
                	"tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    StatusKehadiran+Pelatihan, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                    }
                    $scope.item.JudulPelatihan=dat.data.daftar[0].namaplanning;
                    $scope.columnGridDetail = {
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
								width: "120px",
							},
							{
								field: "namajabatan",
								title: "jabatan",
								width: "120px"
							},
							{
								field: "kehadiran",
								title: "Status Kehadiran",
								width: "120px"
							}            
			            ],
			           	           
					}
					$scope.dataGridDetail = new kendo.data.DataSource({
						data: dat.data.daftar,
					});
					$scope.PopUpDetailPeserta.center().open();
                });
			}	

			$scope.showDetail2 = function(noplanning){
				$scope.isRouteLoading = true;
				StatusKehadiran="";
				$scope.dataGridDetail=undefined;
				$scope.item.JudulPelatihan=undefined;
                var satu = 2;
                var Pelatihan =""
                if (noplanning != undefined){
                    Pelatihan ="&Pelatihan=" + noplanning
                }
                var StatusKehadiran ="&StatusKehadiran=" + parseFloat(satu);
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');
                manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-detail-kehadiran-peserta-pelatihan?"+
                	"tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    StatusKehadiran+Pelatihan, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                    }
                    $scope.item.JudulPelatihan=dat.data.daftar[0].namaplanning;
                    $scope.columnGridDetail = {
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
								width: "120px",
							},
							{
								field: "namajabatan",
								title: "jabatan",
								width: "120px"
							},
							{
								field: "kehadiran",
								title: "Status Kehadiran",
								width: "120px"
							}            
			            ],
			           	           
					}
					$scope.dataGridDetail = new kendo.data.DataSource({
						data: dat.data.daftar,
					});
					$scope.PopUpDetailPeserta.center().open();
                });
			}		
			
			$scope.close = function(){
				$scope.dataGridDetail=undefined;
				$scope.item.JudulPelatihan=undefined;
				$scope.PopUpDetailPeserta.close();
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