define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KalenderCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Kalender", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Kalender;
					
					$scope.dataSource = new kendo.data.DataSource({
	                    pageSize: 10,
	                    data: $scope.listDataMaster,
	                    autoSync: true
	                    /*schema: {
	                      	model: {
	                        	id: "asetId",
	                        	fields: {
	                            	
	                        	}   
	                    	}
	                	}	*/
	            	});
					
				});
			}
			init();
			IPSRSService.getFieldListData("HistoryLoginD&select=id,namaExternal", true).then(function(dat){
				$scope.listHhstoryLoginD = dat.data;
			});

			IPSRSService.getFieldListData("HistoryLoginI&select=id,namaExternal", true).then(function(dat){
				$scope.listHhstoryLoginI = dat.data;
			});

			IPSRSService.getFieldListData("HistoryLoginU&select=id,namaExternal", true).then(function(dat){
				$scope.listHhstoryLoginS = dat.data;
			});
			IPSRSService.getFieldListData("HistoryLoginU&select=id,namaExternal", true).then(function(dat){
				$scope.listHhstoryLoginU = dat.data;
			});
			$scope.columnKalender = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "bulanFiscal",
				"title": "bulan Fiscal"
			},
			{
				"field": "bulanKeDlmTahun",
				"title": "bulan Ke Dlm Tahun"
			},
			{
				"field": "hariKeDlmBulan",
				"title": "hari Ke Dlm Bulan"
			},
			{
				"field": "hariKeDlmMinggu",
				"title": "hari Ke Dlm Minggu"
			},
			{
				"field": "hariKeDlmTahun",
				"title": "hari Ke Dlm Tahun"
			},
			{
				"field": "historyLoginD",
				"title": "history Login D"
			},
			{
				"field": "historyLoginDId",
				"title": "history Login DId"
			},
			{
				"field": "historyLoginI",
				"title": "history Login I"
			},
			{
				"field": "historyLoginIId",
				"title": "history Login IId"
			},
			{
				"field": "historyLoginS",
				"title": "history Login S"
			},
			{
				"field": "historyLoginSId",
				"title": "history Login SId"
			},
			{
				"field": "historyLoginU",
				"title": "history Login U"
			},
			{
				"field": "historyLoginUId",
				"title": "history Login UId"
			},
			{
				"field": "kdTanggal",
				"title": "kd Tanggal"
			},
			{
				"field": "namaBulan",
				"title": "nama Bulan"
			},
			{
				"field": "namaHari",
				"title": "nama Hari"
			},
			{
				"field": "qTanggal",
				"title": "q Tanggal"
			},
			{
				"field": "semesterKeDlmTahun",
				"title": "semester Ke Dlm Tahun"
			},
			{
				"field": "tahunFiscal",
				"title": "tahun Fiscal"
			},
			{
				"field": "tahunKalender",
				"title": "tahun Kalender"
			},
			{
				"field": "tanggal",
				"title": "tanggal"
			},
			{
				"field": "triwulanKeDlmTahun",
				"title": "triwulan Ke Dlm Tahun"
			},
			{
				"field": "reportDisplay",
				"title": "report Display"
			},
			{
				"field": "kodeExternal",
				"title": "kode External"
			},
			{
				"field": "namaExternal",
				"title": "nama External"
			},
			{
				"field": "statusEnabled",
				"title": "status Enabled"
			},
			{
				"title" : "Action",
    			"width" : "200px",
    			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];

			$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columnKalender,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klik = function(current){
            	$scope.showEdit = true;
				$scope.current = current;
				// debugger;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.bulanFiscal = current.bulanFiscal;
				$scope.item.bulanKeDlmTahun = current.bulanKeDlmTahun;
				$scope.item.hariKeDlmBulan = current.hariKeDlmBulan;
				$scope.item.hariKeDlmMinggu = current.hariKeDlmMinggu;
				$scope.item.hariKeDlmTahun = current.hariKeDlmTahun;
				$scope.item.historyLoginD = current.historyLoginD;
				$scope.item.historyLoginDId = current.historyLoginDId;
				$scope.item.historyLoginI = current.historyLoginI;
				$scope.item.historyLoginIId = current.historyLoginIId;
				$scope.item.historyLoginS = current.historyLoginS;
				$scope.item.historyLoginSId = current.historyLoginSId;
				$scope.item.historyLoginU = current.historyLoginU;
				$scope.item.historyLoginUId = current.historyLoginUId;
				$scope.item.kdTanggal = current.kdTanggal;
				$scope.item.namaBulan = current.namaBulan;
				$scope.item.namaHari = current.namaHari;
				$scope.item.qTanggal = current.qTanggal;
				$scope.item.semesterKeDlmTahun = current.semesterKeDlmTahun;
				$scope.item.tahunFiscal = current.tahunFiscal;
				$scope.item.tahunKalender = current.tahunKalender;
				$scope.item.tanggal = current.tanggal;
				$scope.item.triwulanKeDlmTahun = current.triwulanKeDlmTahun;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Kalender&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Kalender&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Kalender",
					"listField": {
							"bulanFiscal": $scope.item.bulanFiscal,
					 		"bulanKeDlmTahun": $scope.item.bulanKeDlmTahun,
					 		"hariKeDlmBulan": $scope.item.hariKeDlmBulan,
					 		"hariKeDlmMinggu": $scope.item.hariKeDlmMinggu,
					 		"hariKeDlmTahun": $scope.item.hariKeDlmTahun,
					 		"historyLoginD": $scope.item.historyLoginD,
					 		"historyLoginDId": $scope.item.historyLoginDId,
					 		"historyLoginI": $scope.item.historyLoginI,
					 		"historyLoginIId": $scope.item.historyLoginIId,
					 		"historyLoginS": $scope.item.historyLoginS,
					 		"historyLoginSId": $scope.item.historyLoginSId,
					 		"historyLoginU": $scope.item.historyLoginU,
					 		"historyLoginUId": $scope.item.historyLoginUId,
					 		"kdTanggal": $scope.item.kdTanggal,
					 		"namaBulan": $scope.item.namaBulan,
					 		"namaHari": $scope.item.namaHari,
					 		"qTanggal": $scope.item.qTanggal,
					 		"semesterKeDlmTahun": $scope.item.semesterKeDlmTahun,
					 		"tahunFiscal": $scope.item.tahunFiscal,
					 		"tahunKalender": $scope.item.tahunKalender,
					 		"tanggal": $scope.item.tanggal,
					 		"triwulanKeDlmTahun": $scope.item.triwulanKeDlmTahun,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
		        });
		    }

		    $scope.edit = function()
		    {	
		        var data = {
					"class": "Kalender",
					"listField": {
							"id": $scope.item.id,
							"bulanFiscal": $scope.item.bulanFiscal,
					 		"bulanKeDlmTahun": $scope.item.bulanKeDlmTahun,
					 		"hariKeDlmBulan": $scope.item.hariKeDlmBulan,
					 		"hariKeDlmMinggu": $scope.item.hariKeDlmMinggu,
					 		"hariKeDlmTahun": $scope.item.hariKeDlmTahun,
					 		"historyLoginD": $scope.item.historyLoginD,
					 		"historyLoginDId": $scope.item.historyLoginDId,
					 		"historyLoginI": $scope.item.historyLoginI,
					 		"historyLoginIId": $scope.item.historyLoginIId,
					 		"historyLoginS": $scope.item.historyLoginS,
					 		"historyLoginSId": $scope.item.historyLoginSId,
					 		"historyLoginU": $scope.item.historyLoginU,
					 		"historyLoginUId": $scope.item.historyLoginUId,
					 		"kdTanggal": $scope.item.kdTanggal,
					 		"namaBulan": $scope.item.namaBulan,
					 		"namaHari": $scope.item.namaHari,
					 		"qTanggal": $scope.item.qTanggal,
					 		"semesterKeDlmTahun": $scope.item.semesterKeDlmTahun,
					 		"tahunFiscal": $scope.item.tahunFiscal,
					 		"tahunKalender": $scope.item.tahunKalender,
					 		"tanggal": $scope.item.tanggal,
					 		"triwulanKeDlmTahun": $scope.item.triwulanKeDlmTahun,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
		        });
		    }
		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }

		}
		]);
});