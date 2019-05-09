define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PropinsiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Propinsi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Propinsi;
					
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
			IPSRSService.getFieldListData("KotaKabupaten&select=id,namaExternal", true).then(function(dat){
				$scope.listkotaKabupaten = dat.data;
			});
			$scope.columnPropinsi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdPropinsi",
				"title": "kd Propinsi"
			},
			{
				"field": "namaPropinsi",
				"title": "nama Propinsi"
			},
			{
				"field": "qPropinsi",
				"title": "q Propinsi"
			},
			{
				"field": "kotaKabupaten",
				"title": "kota Kabupaten"
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
                columns: $scope.columnPropinsi,
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
				$scope.item.kdPropinsi = current.kdPropinsi;
				$scope.item.namaPropinsi = current.namaPropinsi;
				$scope.item.qPropinsi = current.qPropinsi;
				$scope.item.kotaKabupaten = current.kotaKabupaten;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Propinsi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Propinsi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Propinsi",
					"listField": {
							"kdPropinsi": $scope.item.kdPropinsi,
					 		"namaPropinsi": $scope.item.namaPropinsi,
					 		"qPropinsi": $scope.item.qPropinsi,
					 		"kotaKabupaten": $scope.item.kotaKabupaten,
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
					"class": "Propinsi",
					"listField": {
							"id": $scope.item.id,
							"kdPropinsi": $scope.item.kdPropinsi,
					 		"namaPropinsi": $scope.item.namaPropinsi,
					 		"qPropinsi": $scope.item.qPropinsi,
					 		"kotaKabupaten": $scope.item.kotaKabupaten,
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