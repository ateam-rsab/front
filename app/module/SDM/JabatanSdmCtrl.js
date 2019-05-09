define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JabatanSdmCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Jabatan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Jabatan;
					
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
			IPSRSService.getFieldListData("JenisJabatan&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisJabatan = dat.data;
			});
			$scope.columnJabatan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdJabatan",
				"title": "kd Jabatan"
			},
			{
				"field": "jenisJabatan",
				"title": "jenis Jabatan"
			},
			{
				"field": "jenisJabatanId",
				"title": "jenis Jabatan Id"
			},
			{
				"field": "levelJabatan",
				"title": "level Jabatan"
			},
			{
				"field": "masaJabatan",
				"title": "masa Jabatan"
			},
			{
				"field": "namaJabatan",
				"title": "nama Jabatan"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
			},
			{
				"field": "qJabatan",
				"title": "q Jabatan"
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
                columns: $scope.columnJabatan,
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
				$scope.item.kdJabatan = current.kdJabatan;
				$scope.item.jenisJabatan = current.jenisJabatan;
				$scope.item.jenisJabatanId = current.jenisJabatanId;
				$scope.item.levelJabatan = current.levelJabatan;
				$scope.item.masaJabatan = current.masaJabatan;
				$scope.item.namaJabatan = current.namaJabatan;
				$scope.item.noUrut = current.noUrut;
				$scope.item.qJabatan = current.qJabatan;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Jabatan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Jabatan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Jabatan",
					"listField": {
							"kdJabatan": $scope.item.kdJabatan,
					 		"jenisJabatan": $scope.item.jenisJabatan,
					 		"jenisJabatanId": $scope.item.jenisJabatanId,
					 		"levelJabatan": $scope.item.levelJabatan,
					 		"masaJabatan": $scope.item.masaJabatan,
					 		"namaJabatan": $scope.item.namaJabatan,
					 		"noUrut": $scope.item.noUrut,
					 		"qJabatan": $scope.item.qJabatan,
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
					"class": "Jabatan",
					"listField": {
							"id": $scope.item.id,
							"kdJabatan": $scope.item.kdJabatan,
					 		"jenisJabatan": $scope.item.jenisJabatan,
					 		"jenisJabatanId": $scope.item.jenisJabatanId,
					 		"levelJabatan": $scope.item.levelJabatan,
					 		"masaJabatan": $scope.item.masaJabatan,
					 		"namaJabatan": $scope.item.namaJabatan,
					 		"noUrut": $scope.item.noUrut,
					 		"qJabatan": $scope.item.qJabatan,
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