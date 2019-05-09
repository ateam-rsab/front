define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ObjekModulAplikasiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=ObjekModulAplikasi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.ObjekModulAplikasi;
					
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
				$scope.listmodulAplikasi = dat.data;
			});

			IPSRSService.getFieldListData("JenisObjekModulAplikasi&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisObjekModul = dat.data;
			});

			IPSRSService.getFieldListData("ObjekModulAplikasi&select=id,objekModulAplikasi", true).then(function(dat){
				$scope.listobjekModulAplikasi = dat.data;
			});
			$scope.columnObjekModulAplikasi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "fungsi",
				"title": "fungsi"
			},
			{
				"field": "jenisObjekModul",
				"title": "jenis Objek Modul"
			},
			{
				"field": "jenisObjekModulId",
				"title": "jenis Objek Modul Id"
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
				"field": "kdObjekModulAplikasi",
				"title": "kd Objek Modul Aplikasi"
			},
			{
				"field": "objekModulAplikasiHead",
				"title": "objek Modul Aplikasi Head"
			},
			{
				"field": "objekModulAplikasiHeadId",
				"title": "objek Modul Aplikasi Head Id"
			},
			{
				"field": "keterangan",
				"title": "keterangan"
			},
			{
				"field": "objekModulAplikasi",
				"title": "objek Modul Aplikasi"
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
                columns: $scope.columnObjekModulAplikasi,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klik = function(current){
            	$scope.showEdit = true;
				$scope.current = current;
				// debugger;
				//$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.fungsi = current.fungsi;
				$scope.item.jenisObjekModul = current.jenisObjekModul;
				
				$scope.item.modulAplikasi = current.modulAplikasi;
				
				$scope.item.kdObjekModulAplikasi = current.kdObjekModulAplikasi;
				$scope.item.objekModulAplikasiHead = current.objekModulAplikasiHead;
				$scope.item.objekModulAplikasiHeadId = current.objekModulAplikasiHeadId;
				$scope.item.keterangan = current.keterangan;
				$scope.item.objekModulAplikasi = current.objekModulAplikasi;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=ObjekModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=ObjekModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "ObjekModulAplikasi",
					"listField": {
							"fungsi": $scope.item.fungsi,
					 		"jenisObjekModul": $scope.item.jenisObjekModul,
					 		
					 		"modulAplikasi": $scope.item.modulAplikasi,
					 		
					 		"kdObjekModulAplikasi": $scope.item.kdObjekModulAplikasi,
					 		"objekModulAplikasiHead": $scope.item.objekModulAplikasiHead,
					 		
					 		"keterangan": $scope.item.keterangan,
					 		"objekModulAplikasi": $scope.item.objekModulAplikasi,
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
					"class": "ObjekModulAplikasi",
					"listField": {
							"id": $scope.item.id,
							"fungsi": $scope.item.fungsi,
					 		"jenisObjekModul": $scope.item.jenisObjekModul,

					 		"modulAplikasi": $scope.item.modulAplikasi,
					 		
					 		"kdObjekModulAplikasi": $scope.item.kdObjekModulAplikasi,
					 		"objekModulAplikasiHead": $scope.item.objekModulAplikasiHead,
					 		
					 		"keterangan": $scope.item.keterangan,
					 		"objekModulAplikasi": $scope.item.objekModulAplikasi,
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