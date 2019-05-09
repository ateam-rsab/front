define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisDokumenCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisDokumen", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisDokumen;
					
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

			IPSRSService.getFieldListData("JenisDokumen&select=id,jenisDokumen", true).then(function(dat){
				$scope.listjenisDokumen = dat.data;
			});
			$scope.columnJenisDokumen = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisDokumen",
				"title": "jenis Dokumen"
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
				"field": "kdJenisDokumen",
				"title": "kd Jenis Dokumen"
			},
			{
				"field": "jenisDokumenHead",
				"title": "jenis Dokumen Head"
			},
			{
				"field": "jenisDokumenHeadId",
				"title": "jenis Dokumen Head Id"
			},
			{
				"field": "qJenisDokumen",
				"title": "q Jenis Dokumen"
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
                columns: $scope.columnJenisDokumen,
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
				$scope.item.jenisDokumen = current.jenisDokumen;
				$scope.item.departemen = current.departemen;
			
				$scope.item.kdJenisDokumen = current.kdJenisDokumen;
				$scope.item.jenisDokumenHead = current.jenisDokumenHead;
				
				$scope.item.qJenisDokumen = current.qJenisDokumen;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisDokumen&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisDokumen&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisDokumen",
					"listField": {
							"jenisDokumen": $scope.item.jenisDokumen,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisDokumen": $scope.item.kdJenisDokumen,
					 		"jenisDokumenHead": $scope.item.jenisDokumenHead,
					 	
					 		"qJenisDokumen": $scope.item.qJenisDokumen,
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
					"class": "JenisDokumen",
					"listField": {
							"id": $scope.item.id,
							"jenisDokumen": $scope.item.jenisDokumen,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisDokumen": $scope.item.kdJenisDokumen,
					 		"jenisDokumenHead": $scope.item.jenisDokumenHead,
					 		
					 		"qJenisDokumen": $scope.item.qJenisDokumen,
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