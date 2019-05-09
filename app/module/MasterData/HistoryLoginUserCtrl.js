define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HistoryLoginUserCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=HistoryLoginUser", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.HistoryLoginUser;
					
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
			IPSRSService.getFieldListData("HistoryLogin&select=id,namaExternal", true).then(function(dat){
				$scope.listhistoryLogin = dat.data;
			});

			$scope.columnHistoryLoginUser = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "detailDataCRUD",
				"title": "detail Data CRUD"
			},
			{
				"field": "isCRUD",
				"title": "is CRUD"
			},
			{
				"field": "historyLogin",
				"title": "history Login"
			},
			{
				"field": "historyLoginId",
				"title": "history Login Id"
			},
			{
				"field": "namaObjekCRUD",
				"title": "nama Objek CRUD"
			},
			{
				"field": "noRecord",
				"title": "no Record"
			},
			{
				"field": "tglCRUDin",
				"title": "tgl CRUDin"
			},
			{
				"field": "tglCRUDout",
				"title": "tgl CRUDout"
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
                columns: $scope.columnHistoryLoginUser,
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
				$scope.item.detailDataCRUD = current.detailDataCRUD;
				$scope.item.isCRUD = current.isCRUD;
				$scope.item.historyLogin = current.historyLogin;
				$scope.item.historyLoginId = current.historyLoginId;
				$scope.item.namaObjekCRUD = current.namaObjekCRUD;
				$scope.item.noRecord = current.noRecord;
				$scope.item.tglCRUDin = current.tglCRUDin;
				$scope.item.tglCRUDout = current.tglCRUDout;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=HistoryLoginUser&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=HistoryLoginUser&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "HistoryLoginUser",
					"listField": {
							"detailDataCRUD": $scope.item.detailDataCRUD,
					 		"isCRUD": $scope.item.isCRUD,
					 		"historyLogin": $scope.item.historyLogin,
					 		"historyLoginId": $scope.item.historyLoginId,
					 		"namaObjekCRUD": $scope.item.namaObjekCRUD,
					 		"noRecord": $scope.item.noRecord,
					 		"tglCRUDin": $scope.item.tglCRUDin,
					 		"tglCRUDout": $scope.item.tglCRUDout,
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
					"class": "HistoryLoginUser",
					"listField": {
							"id": $scope.item.id,
							"detailDataCRUD": $scope.item.detailDataCRUD,
					 		"isCRUD": $scope.item.isCRUD,
					 		"historyLogin": $scope.item.historyLogin,
					 		"historyLoginId": $scope.item.historyLoginId,
					 		"namaObjekCRUD": $scope.item.namaObjekCRUD,
					 		"noRecord": $scope.item.noRecord,
					 		"tglCRUDin": $scope.item.tglCRUDin,
					 		"tglCRUDout": $scope.item.tglCRUDout,
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