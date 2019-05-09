define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapLoginUserToRuanganCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MapLoginUserToRuangan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MapLoginUserToRuangan;
					
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
			IPSRSService.getFieldListData("LoginUser&select=id,namaExternal", true).then(function(dat){
				$scope.listloginUser = dat.data;
			});

			IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
				$scope.listruangan = dat.data;
			});
			$scope.columnMapLoginUserToRuangan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "loginUser",
				"title": "login User"
			},
			{
				"field": "loginUserId",
				"title": "login User Id"
			},
			{
				"field": "ruangan",
				"title": "ruangan"
			},
			{
				"field": "ruanganId",
				"title": "ruangan Id"
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
                columns: $scope.columnMapLoginUserToRuangan,
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
				$scope.item.loginUser = current.loginUser;
				$scope.item.loginUserId = current.loginUserId;
				$scope.item.ruangan = current.ruangan;
				$scope.item.ruanganId = current.ruanganId;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MapLoginUserToRuangan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MapLoginUserToRuangan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "MapLoginUserToRuangan",
					"listField": {
							"loginUser": $scope.item.loginUser,
					 		"loginUserId": $scope.item.loginUserId,
					 		"ruangan": $scope.item.ruangan,
					 		"ruanganId": $scope.item.ruanganId,
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
					"class": "MapLoginUserToRuangan",
					"listField": {
							"id": $scope.item.id,
							"loginUser": $scope.item.loginUser,
					 		"loginUserId": $scope.item.loginUserId,
					 		"ruangan": $scope.item.ruangan,
					 		"ruanganId": $scope.item.ruanganId,
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