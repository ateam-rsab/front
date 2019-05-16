define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisPerawatanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPerawatan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisPerawatan;
					
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
			IPSRSService.getFieldListData("JenisPerawatanHead&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisPerawatanHead = dat.data;
			});
			$scope.columnJenisPerawatan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisPerawatan",
				"title": "jenis Perawatan"
			},
			{
				"field": "kdJenisPerawatan",
				"title": "kd Jenis Perawatan"
			},
			{
				"field": "jenisPerawatanHead",
				"title": "jenis Perawatan Head"
			},
			{
				"field": "jenisPerawatanHeadId",
				"title": "jenis Perawatan Head Id"
			},
			{
				"field": "qJenisPerawatan",
				"title": "q Jenis Perawatan"
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
                columns: $scope.columnJenisPerawatan,
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
				$scope.item.jenisPerawatan = current.jenisPerawatan;
				$scope.item.kdJenisPerawatan = current.kdJenisPerawatan;
				$scope.item.jenisPerawatanHead = current.jenisPerawatanHead;
				$scope.item.jenisPerawatanHeadId = current.jenisPerawatanHeadId;
				$scope.item.qJenisPerawatan = current.qJenisPerawatan;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisPerawatan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisPerawatan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisPerawatan",
					"listField": {
							"jenisPerawatan": $scope.item.jenisPerawatan,
					 		"kdJenisPerawatan": $scope.item.kdJenisPerawatan,
					 		"jenisPerawatanHead": $scope.item.jenisPerawatanHead,
					 		
					 		"qJenisPerawatan": $scope.item.qJenisPerawatan,
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
					"class": "JenisPerawatan",
					"listField": {
							"id": $scope.item.id,
							"jenisPerawatan": $scope.item.jenisPerawatan,
					 		"kdJenisPerawatan": $scope.item.kdJenisPerawatan,
					 		"jenisPerawatanHead": $scope.item.jenisPerawatanHead,
					 		
					 		"qJenisPerawatan": $scope.item.qJenisPerawatan,
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