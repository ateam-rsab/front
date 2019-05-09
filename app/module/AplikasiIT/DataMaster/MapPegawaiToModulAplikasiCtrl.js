define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MapPegawaiToModulAplikasiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MapPegawaiToModulAplikasi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MapPegawaiToModulAplikasi;
					
					$scope.dataSource = new kendo.data.DataSource({
	                    pageSize: 10,
	                    data: $scope.listDataMaster,
	                    autoSync: true
	            	});
					
				});
			}
			init();
			IPSRSService.getFieldListData("ModulAplikasi&select=id,modulAplikasi", true).then(function(dat){
				$scope.listmodulAplikasi = dat.data;
			});

			IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listpegawai = dat.data;
			});
			$scope.columnMapPegawaiToModulAplikasi = [
			{
				"field": "No",
				"title": "No"
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
				"field": "pegawai",
				"title": "pegawai"
			},
			{
				"field": "pegawaiId",
				"title": "pegawai Id"
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
                columns: $scope.columnMapPegawaiToModulAplikasi,
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
				$scope.item.modulAplikasi = current.modulAplikasi;
				$scope.item.modulAplikasiId = current.modulAplikasiId;
				$scope.item.pegawai = current.pegawai;
				$scope.item.pegawaiId = current.pegawaiId;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MapPegawaiToModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=MapPegawaiToModulAplikasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "MapPegawaiToModulAplikasi",
					"listField": {
							"modulAplikasi": $scope.item.modulAplikasi,
					 		"pegawai": $scope.item.pegawai,
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
					"class": "MapPegawaiToModulAplikasi",
					"listField": {
							"id": $scope.item.id,
							"modulAplikasi": $scope.item.modulAplikasi,
					 		"pegawai": $scope.item.pegawai,
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