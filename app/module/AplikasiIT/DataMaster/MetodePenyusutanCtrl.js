define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MetodePenyusutanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MetodePenyusutan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MetodePenyusutan;
					
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
			$scope.columnMetodePenyusutan = [
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
				"field": "kdMetodePenyusutan",
				"title": "kd Metode Penyusutan"
			},
			{
				"field": "metodePenyusutan",
				"title": "metode Penyusutan"
			},
			{
				"field": "persenPenyusutan",
				"title": "persen Penyusutan"
			},
			{
				"field": "qMetodePenyusutan",
				"title": "q Metode Penyusutan"
			},
			{
				"field": "rumusPenyusutan",
				"title": "rumus Penyusutan"
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
                columns: $scope.columnMetodePenyusutan,
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
				$scope.item.kdMetodePenyusutan = current.kdMetodePenyusutan;
				$scope.item.metodePenyusutan = current.metodePenyusutan;
				$scope.item.persenPenyusutan = current.persenPenyusutan;
				$scope.item.qMetodePenyusutan = current.qMetodePenyusutan;
				$scope.item.rumusPenyusutan = current.rumusPenyusutan;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MetodePenyusutan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MetodePenyusutan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "MetodePenyusutan",
					"listField": {
							"departemen": $scope.item.departemen,
					 		
					 		"kdMetodePenyusutan": $scope.item.kdMetodePenyusutan,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qMetodePenyusutan": $scope.item.qMetodePenyusutan,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
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
					"class": "MetodePenyusutan",
					"listField": {
							"id": $scope.item.id,
							"departemen": $scope.item.departemen,

					 		"kdMetodePenyusutan": $scope.item.kdMetodePenyusutan,
					 		"metodePenyusutan": $scope.item.metodePenyusutan,
					 		"persenPenyusutan": $scope.item.persenPenyusutan,
					 		"qMetodePenyusutan": $scope.item.qMetodePenyusutan,
					 		"rumusPenyusutan": $scope.item.rumusPenyusutan,
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