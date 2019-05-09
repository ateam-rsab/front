define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PemilikProfileCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=PemilikProfile", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.PemilikProfile;
					
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
			IPSRSService.getFieldListData("KelompokPemilikProfile&select=id,namaExternal", true).then(function(dat){
				$scope.listkelompokPemilik = dat.data;
			});
			$scope.columnPemilikProfile = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kelompokPemilik",
				"title": "kelompok Pemilik"
			},
			{
				"field": "kelompokPemilikId",
				"title": "kelompok Pemilik Id"
			},
			{
				"field": "kdPemilikProfile",
				"title": "kd Pemilik Profile"
			},
			{
				"field": "pemilikProfile",
				"title": "pemilik Profile"
			},
			{
				"field": "qPemilikProfile",
				"title": "q Pemilik Profile"
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
                columns: $scope.columnPemilikProfile,
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
				$scope.item.kelompokPemilik = current.kelompokPemilik;
				$scope.item.kelompokPemilikId = current.kelompokPemilikId;
				$scope.item.kdPemilikProfile = current.kdPemilikProfile;
				$scope.item.pemilikProfile = current.pemilikProfile;
				$scope.item.qPemilikProfile = current.qPemilikProfile;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=PemilikProfile&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=PemilikProfile&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "PemilikProfile",
					"listField": {
							"kelompokPemilik": $scope.item.kelompokPemilik,
					 		"kelompokPemilikId": $scope.item.kelompokPemilikId,
					 		"kdPemilikProfile": $scope.item.kdPemilikProfile,
					 		"pemilikProfile": $scope.item.pemilikProfile,
					 		"qPemilikProfile": $scope.item.qPemilikProfile,
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
					"class": "PemilikProfile",
					"listField": {
							"id": $scope.item.id,
							"kelompokPemilik": $scope.item.kelompokPemilik,
					 		"kelompokPemilikId": $scope.item.kelompokPemilikId,
					 		"kdPemilikProfile": $scope.item.kdPemilikProfile,
					 		"pemilikProfile": $scope.item.pemilikProfile,
					 		"qPemilikProfile": $scope.item.qPemilikProfile,
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