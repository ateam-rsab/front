define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MetodeDeliveryCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MetodeDelivery", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MetodeDelivery;
					
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

			IPSRSService.getFieldListData("MetodeDelivery&select=id,metodeDelivery", true).then(function(dat){
				$scope.listmetodeDeliveryHead = dat.data;
			});
			$scope.columnMetodeDelivery = [
			{
				"field": "No",
				"title": "No"
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
				"field": "kdMetodeDelivery",
				"title": "kd Metode Delivery"
			},
			{
				"field": "metodeDeliveryHead",
				"title": "metode Delivery Head"
			},
			{
				"field": "metodeDeliveryHeadId",
				"title": "metode Delivery Head Id"
			},
			{
				"field": "metodeDelivery",
				"title": "metode Delivery"
			},
			{
				"field": "qJenisDelivery",
				"title": "q Jenis Delivery"
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
                columns: $scope.columnMetodeDelivery,
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
				$scope.item.departemen = current.departemen;
				$scope.item.departemenId = current.departemenId;
				$scope.item.kdMetodeDelivery = current.kdMetodeDelivery;
				$scope.item.metodeDeliveryHead = current.metodeDeliveryHead;
				$scope.item.metodeDeliveryHeadId = current.metodeDeliveryHeadId;
				$scope.item.metodeDelivery = current.metodeDelivery;
				$scope.item.qJenisDelivery = current.qJenisDelivery;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MetodeDelivery&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MetodeDelivery&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "MetodeDelivery",
					"listField": {
							"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kdMetodeDelivery": $scope.item.kdMetodeDelivery,
					 		"metodeDeliveryHead": $scope.item.metodeDeliveryHead,
					 		"metodeDeliveryHeadId": $scope.item.metodeDeliveryHeadId,
					 		"metodeDelivery": $scope.item.metodeDelivery,
					 		"qJenisDelivery": $scope.item.qJenisDelivery,
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
					"class": "MetodeDelivery",
					"listField": {
							"id": $scope.item.id,
							"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kdMetodeDelivery": $scope.item.kdMetodeDelivery,
					 		"metodeDeliveryHead": $scope.item.metodeDeliveryHead,
					 		"metodeDeliveryHeadId": $scope.item.metodeDeliveryHeadId,
					 		"metodeDelivery": $scope.item.metodeDelivery,
					 		"qJenisDelivery": $scope.item.qJenisDelivery,
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