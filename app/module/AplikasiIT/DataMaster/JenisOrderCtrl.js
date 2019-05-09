define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisOrderCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisOrder", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisOrder;
					
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

			IPSRSService.getFieldListData("JenisOrder&select=id,jenisOrder", true).then(function(dat){
				$scope.listjenisOrderHead = dat.data;
			});
			$scope.columnJenisOrder = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisOrder",
				"title": "jenis Order"
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
				"field": "kdJenisOrder",
				"title": "kd Jenis Order"
			},
			{
				"field": "jenisOrderHead",
				"title": "jenis Order Head"
			},
			{
				"field": "jenisOrderHeadId",
				"title": "jenis Order Head Id"
			},
			{
				"field": "qJenisOrder",
				"title": "q Jenis Order"
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
                columns: $scope.columnJenisOrder,
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
				$scope.item.jenisOrder = current.jenisOrder;
				$scope.item.departemen = current.departemen;
				$scope.item.departemenId = current.departemenId;
				$scope.item.kdJenisOrder = current.kdJenisOrder;
				$scope.item.jenisOrderHead = current.jenisOrderHead;
				$scope.item.jenisOrderHeadId = current.jenisOrderHeadId;
				$scope.item.qJenisOrder = current.qJenisOrder;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisOrder&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisOrder&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisOrder",
					"listField": {
							"jenisOrder": $scope.item.jenisOrder,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisOrder": $scope.item.kdJenisOrder,
					 		"jenisOrderHead": $scope.item.jenisOrderHead,
					 	
					 		"qJenisOrder": $scope.item.qJenisOrder,
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
					"class": "JenisOrder",
					"listField": {
							"id": $scope.item.id,
							"jenisOrder": $scope.item.jenisOrder,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisOrder": $scope.item.kdJenisOrder,
					 		"jenisOrderHead": $scope.item.jenisOrderHead,
					 		
					 		"qJenisOrder": $scope.item.qJenisOrder,
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