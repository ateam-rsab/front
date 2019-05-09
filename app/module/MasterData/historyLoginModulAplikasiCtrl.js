define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('historyLoginModulAplikasiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=HistoryLoginModulAplikasi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.HistoryLoginModulAplikasi;
					
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
			IPSRSService.getFieldListData("ModulAplikasi&select=id,modulAplikasi", true).then(function(dat){
				debugger;
				$scope.listmodulAplikasi = dat.data;
			});

			IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
				$scope.listruanganUser = dat.data;
			});
			$scope.columnHistoryLoginModulAplikasi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdHistoryLogin",
				"title": "kd History Login"
			},
			{
				"field": "modulAplikasi",
				"title": "modul Aplikasi"
			},
			{
				"field": "modulAplikasiId",
				"title": "modul Aplikasi Id"
			},
			{
				"field": "ruanganUser",
				"title": "ruangan User"
			},
			{
				"field": "ruanganUserId",
				"title": "ruangan User Id"
			},
			{
				"field": "kdUser",
				"title": "kd User"
			},
			{
				"field": "namaHost",
				"title": "nama Host"
			},
			{
				"field": "tglLogin",
				"title": "tgl Login"
			},
			{
				"field": "tglLogout",
				"title": "tgl Logout"
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
                columns: $scope.columnHistoryLoginModulAplikasi,
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
				$scope.item.kdHistoryLogin = current.kdHistoryLogin;
				$scope.item.modulAplikasi = current.modulAplikasi;
				$scope.item.modulAplikasiId = current.modulAplikasiId;
				$scope.item.ruanganUser = current.ruanganUser;
				$scope.item.ruanganUserId = current.ruanganUserId;
				$scope.item.kdUser = current.kdUser;
				$scope.item.namaHost = current.namaHost;
				$scope.item.tglLogin = current.tglLogin;
				$scope.item.tglLogout = current.tglLogout;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=HistoryLoginModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=HistoryLoginModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "HistoryLoginModulAplikasi",
					"listField": {
							"kdHistoryLogin": $scope.item.kdHistoryLogin,
					 		"modulAplikasi": $scope.item.modulAplikasi,
					 		"ruanganUser": $scope.item.ruanganUser,
					 		"kdUser": $scope.item.kdUser,
					 		"namaHost": $scope.item.namaHost,
					 		"tglLogin": moment($scope.item.tglLogin).format("YYYY-MM-DD"),
					 		"tglLogout": moment($scope.item.tglLogout).format("YYYY-MM-DD"),
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
					"class": "HistoryLoginModulAplikasi",
					"listField": {
							"id": $scope.item.id,
							"kdHistoryLogin": $scope.item.kdHistoryLogin,
					 		"modulAplikasi": $scope.item.modulAplikasi,
					 		"ruanganUser": $scope.item.ruanganUser,
					 		"kdUser": $scope.item.kdUser,
					 		"namaHost": $scope.item.namaHost,
					 		"tglLogin": $scope.item.tglLogin,
					 		"tglLogout": $scope.item.tglLogout,
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