define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelompokAsetCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokAset", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KelompokAset;
					
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
			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("JenisAset&select=id,jenisAset", true).then(function(dat){
				$scope.listjenisAset = dat.data;
			});

			IPSRSService.getFieldListData("MetodePenyusutan&select=id,metodePenyusutan", true).then(function(dat){
				$scope.listmetodePenyusutan = dat.data;
			});
			IPSRSService.getFieldListData("ChartOfAccount&select=id,namaAccount", true).then(function(dat){
				$scope.listaccount = dat.data;
			});
			$scope.columnKelompokAset = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "account",
				"title": "account"
			},
			{
				"field": "accountId",
				"title": "account Id"
			},
			{
				"field": "departemen",
				"title": "departemen"
			},
			{
				"field": "departemenId",
				"title": "departemen Id"
			},
			{
				"field": "jenisAset",
				"title": "jenis Aset"
			},
			{
				"field": "jenisAsetId",
				"title": "jenis Aset Id"
			},
			{
				"field": "kdKelompokAset",
				"title": "kd Kelompok Aset"
			},
			{
				"field": "metodePenyusutan",
				"title": "metode Penyusutan"
			},
			{
				"field": "metodePenyusutanId",
				"title": "metode Penyusutan Id"
			},
			{
				"field": "kelompokAset",
				"title": "kelompok Aset"
			},
			{
				"field": "persenPenyusutan",
				"title": "persen Penyusutan"
			},
			{
				"field": "qKelompokAset",
				"title": "q Kelompok Aset"
			},
			{
				"field": "rumusPenyusutan",
				"title": "rumus Penyusutan"
			},
			{
				"field": "umurEkonomis_Thn",
				"title": "umur Ekonomis _Thn"
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
                columns: $scope.columnKelompokAset,
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
				$scope.item.account = current.account;
				
				$scope.item.departemen = current.departemen;
			
				$scope.item.jenisAset = current.jenisAset;
				
				$scope.item.kdKelompokAset = current.kdKelompokAset;
				$scope.item.metodePenyusutan = current.metodePenyusutan;
				
				$scope.item.kelompokAset = current.kelompokAset;
				$scope.item.persenPenyusutan = current.persenPenyusutan;
				$scope.item.qKelompokAset = current.qKelompokAset;
				$scope.item.rumusPenyusutan = current.rumusPenyusutan;
				$scope.item.umurEkonomis_Thn = current.umurEkonomis_Thn;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KelompokAset&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KelompokAset&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "KelompokAset",
					"listField": {
							"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 		
					 		"jenisAset": $scope.item.jenisAset,
					 		
					 		"kdKelompokAset": $scope.item.kdKelompokAset,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		
					 		"kelompokAset": $scope.item.kelompokAset,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qKelompokAset": $scope.item.qKelompokAset,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
					 		"umurEkonomis_Thn": $scope.item.umurEkonomis_Thn,
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
					"class": "KelompokAset",
					"listField": {
							"id": $scope.item.id,
							"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 		
					 		"jenisAset": $scope.item.jenisAset,
					 		
					 		"kdKelompokAset": $scope.item.kdKelompokAset,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		
					 		"kelompokAset": $scope.item.kelompokAset,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qKelompokAset": $scope.item.qKelompokAset,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
					 		"umurEkonomis_Thn": $scope.item.umurEkonomis_Thn,
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