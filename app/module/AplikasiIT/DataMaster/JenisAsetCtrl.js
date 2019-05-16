define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisAsetCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisAset", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisAset;
					
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
			IPSRSService.getFieldListData("ChartOfAccount&select=id,namaAccount", true).then(function(dat){
				$scope.listaccount = dat.data;
			});

			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("JenisAset&select=id,jenisAset", true).then(function(dat){
				$scope.listjenisAset = dat.data;
			});
			$scope.columnJenisAset = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisAset",
				"title": "jenis Aset"
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
				"field": "kdJenisAset",
				"title": "kd Jenis Aset"
			},
			{
				"field": "jenisAsetHead",
				"title": "jenis Aset Head"
			},
			{
				"field": "jenisAsetHeadId",
				"title": "jenis Aset Head Id"
			},
			{
				"field": "qJenisAset",
				"title": "q Jenis Aset"
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
                columns: $scope.columnJenisAset,
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
				$scope.item.jenisAset = current.jenisAset;
				$scope.item.account = current.account;
			
				$scope.item.departemen = current.departemen;
				
				$scope.item.kdJenisAset = current.kdJenisAset;
				$scope.item.jenisAsetHead = current.jenisAsetHead;
				
				$scope.item.qJenisAset = current.qJenisAset;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisAset&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisAset&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisAset",
					"listField": {
							"jenisAset": $scope.item.jenisAset,
					 		"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisAset": $scope.item.kdJenisAset,
					 		"jenisAsetHead": $scope.item.jenisAsetHead,
					 		
					 		"qJenisAset": $scope.item.qJenisAset,
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
					"class": "JenisAset",
					"listField": {
							"id": $scope.item.id,
							"jenisAset": $scope.item.jenisAset,
					 		"account": $scope.item.account,
					 		
					 		"departemen": $scope.item.departemen,
					 	
					 		"kdJenisAset": $scope.item.kdJenisAset,
					 		"jenisAsetHead": $scope.item.jenisAsetHead,
					 		
					 		"qJenisAset": $scope.item.qJenisAset,
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