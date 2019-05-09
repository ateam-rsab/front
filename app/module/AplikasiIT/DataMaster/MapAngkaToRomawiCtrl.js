define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapAngkaToRomawiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MapAngkaToRomawi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MapAngkaToRomawi;
					
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
			IPSRSService.getFieldListData("MapAngkaToBulan&select=id,namaExternal", true).then(function(dat){
				$scope.listmapping = dat.data;
			});
			$scope.columnMapAngkaToRomawi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "formatAngka",
				"title": "format Angka"
			},
			{
				"field": "formatRomawi",
				"title": "format Romawi"
			},
			{
				"field": "mapping",
				"title": "mapping"
			},
			{
				"field": "mappingId",
				"title": "mapping Id"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
			},
			{
				"field": "qMapping",
				"title": "q Mapping"
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
                columns: $scope.columnMapAngkaToRomawi,
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
				$scope.item.formatAngka = current.formatAngka;
				$scope.item.formatRomawi = current.formatRomawi;
				$scope.item.mapping = current.mapping;
				$scope.item.mappingId = current.mappingId;
				$scope.item.noUrut = current.noUrut;
				$scope.item.qMapping = current.qMapping;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MapAngkaToRomawi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MapAngkaToRomawi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "MapAngkaToRomawi",
					"listField": {
							"formatAngka": $scope.item.formatAngka,
					 		"formatRomawi": $scope.item.formatRomawi,
					 		"mapping": $scope.item.mapping,
					 		
					 		"noUrut": $scope.item.noUrut,
					 		"qMapping": $scope.item.qMapping,
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
					"class": "MapAngkaToRomawi",
					"listField": {
							"id": $scope.item.id,
							"formatAngka": $scope.item.formatAngka,
					 		"formatRomawi": $scope.item.formatRomawi,
					 		"mapping": $scope.item.mapping,
					 		
					 		"noUrut": $scope.item.noUrut,
					 		"qMapping": $scope.item.qMapping,
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