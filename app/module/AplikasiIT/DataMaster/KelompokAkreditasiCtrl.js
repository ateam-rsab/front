define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelompokAkreditasiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=TahapanAkreditasi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.TahapanAkreditasi;
					
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
			$scope.columnTahapanAkreditasi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdTahapanAkreditasi",
				"title": "kd Tahapan Akreditasi"
			},
			{
				"field": "qTahapanAkreditasi",
				"title": "q Tahapan Akreditasi"
			},
			{
				"field": "qtyUnitDiAkreditasi",
				"title": "qty Unit Di Akreditasi"
			},
			{
				"field": "tahapanAkreditasi",
				"title": "tahapan Akreditasi"
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
                columns: $scope.columnTahapanAkreditasi,
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
				$scope.item.kdTahapanAkreditasi = current.kdTahapanAkreditasi;
				$scope.item.qTahapanAkreditasi = current.qTahapanAkreditasi;
				$scope.item.qtyUnitDiAkreditasi = current.qtyUnitDiAkreditasi;
				$scope.item.tahapanAkreditasi = current.tahapanAkreditasi;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=TahapanAkreditasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=TahapanAkreditasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "TahapanAkreditasi",
					"listField": {
							"kdTahapanAkreditasi": $scope.item.kdTahapanAkreditasi,
					 		"qTahapanAkreditasi": $scope.item.qTahapanAkreditasi,
					 		"qtyUnitDiAkreditasi": $scope.item.qtyUnitDiAkreditasi,
					 		"tahapanAkreditasi": $scope.item.tahapanAkreditasi,
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
					"class": "TahapanAkreditasi",
					"listField": {
							"id": $scope.item.id,
							"kdTahapanAkreditasi": $scope.item.kdTahapanAkreditasi,
					 		"qTahapanAkreditasi": $scope.item.qTahapanAkreditasi,
					 		"qtyUnitDiAkreditasi": $scope.item.qtyUnitDiAkreditasi,
					 		"tahapanAkreditasi": $scope.item.tahapanAkreditasi,
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
var inits = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=StatusAkreditasi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.StatusAkreditasi;
					
					$scope.dataSources = new kendo.data.DataSource({
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
			inits();
			$scope.columnStatusAkreditasi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdStatusAkreditasi",
				"title": "kd Status Akreditasi"
			},
			{
				"field": "qStatusAkreditasi",
				"title": "q Status Akreditasi"
			},
			{
				"field": "statusAkreditasi",
				"title": "status Akreditasi"
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
    			"template" : "<button class='btnEdit' ng-click='enableDatas()'>Enable</button>"+
                        	 "<button class='btnHapus' ng-click='disableDatas()'>Disable</button>"
			}
			];

			$scope.mainGridOptionss = { 
                pageable: true,
                columns: $scope.columnStatusAkreditasi,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.kliks = function(currents){
            	$scope.showEdits = true;
				$scope.currents = currents;
				// debugger;
				$scope.item.id = currents.id;
				$scope.item.noRec = currents.noRec;
				$scope.item.statusEnabled = currents.statusEnabled;
				$scope.item.kdStatusAkreditasi = currents.kdStatusAkreditasi;
				$scope.item.qStatusAkreditasi = currents.qStatusAkreditasi;
				$scope.item.statusAkreditasi = currents.statusAkreditasi;
				$scope.item.reportDisplay = currents.reportDisplay;
				$scope.item.kodeExternal = currents.kodeExternal;
				$scope.item.namaExternal = currents.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableDatas=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StatusAkreditasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					inits();

				});
			};

			$scope.enableDatas=function(){
				IPSRSService.getClassMaster("delete-master-table?className=StatusAkreditasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					inits();

				});
			};
			$scope.tambahs = function()
		    {
		        var data = {
					"class": "StatusAkreditasi",
					"listField": {
							"kdStatusAkreditasi": $scope.item.kdStatusAkreditasi,
					 		"qStatusAkreditasi": $scope.item.qStatusAkreditasi,
					 		"statusAkreditasi": $scope.item.statusAkreditasi,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					inits();
					$scope.item = {};
		        });
		    }

		    $scope.edits = function()
		    {	
		        var data = {
					"class": "StatusAkreditasi",
					"listField": {
							"id": $scope.item.id,
							"kdStatusAkreditasi": $scope.item.kdStatusAkreditasi,
					 		"qStatusAkreditasi": $scope.item.qStatusAkreditasi,
					 		"statusAkreditasi": $scope.item.statusAkreditasi,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal,
					 		"statusEnabled": $scope.item.statusEnabled,
					 		"noRec": $scope.item.noRec
					}
				}
		        IPSRSService.saveDataMaster(data,"update-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					inits();
		        });
		    }
		    $scope.batals = function () {
		    	$scope.showEdits = false;
		    	$scope.item = {};
		    }			
			

		}
		]);
});
/////end