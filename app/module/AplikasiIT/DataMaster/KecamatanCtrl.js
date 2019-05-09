define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KecamatanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Kecamatan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Kecamatan;
					
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
			IPSRSService.getFieldListData("Propinsi&select=id,namaExternal", true).then(function(dat){
				$scope.listpropinsi = dat.data;
			});

			IPSRSService.getFieldListData("KotaKabupaten&select=id,namaExternal", true).then(function(dat){
				$scope.listkotaKabupaten = dat.data;
			});
			$scope.columnKecamatan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdKecamatan",
				"title": "kd Kecamatan"
			},
			{
				"field": "kotaKabupaten",
				"title": "kota Kabupaten"
			},
			{
				"field": "kotaKabupatenId",
				"title": "kota Kabupaten Id"
			},
			{
				"field": "propinsi",
				"title": "propinsi"
			},
			{
				"field": "propinsiId",
				"title": "propinsi Id"
			},
			{
				"field": "namaKecamatan",
				"title": "nama Kecamatan"
			},
			{
				"field": "qKecamatan",
				"title": "q Kecamatan"
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
                columns: $scope.columnKecamatan,
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
				$scope.item.kdKecamatan = current.kdKecamatan;
				$scope.item.kotaKabupaten = current.kotaKabupaten;
				$scope.item.kotaKabupatenId = current.kotaKabupatenId;
				$scope.item.propinsi = current.propinsi;
				$scope.item.propinsiId = current.propinsiId;
				$scope.item.namaKecamatan = current.namaKecamatan;
				$scope.item.qKecamatan = current.qKecamatan;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Kecamatan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Kecamatan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Kecamatan",
					"listField": {
							"kdKecamatan": $scope.item.kdKecamatan,
					 		"kotaKabupaten": $scope.item.kotaKabupaten,
					 		
					 		"propinsi": $scope.item.propinsi,
					 	
					 		"namaKecamatan": $scope.item.namaKecamatan,
					 		"qKecamatan": $scope.item.qKecamatan,
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
					"class": "Kecamatan",
					"listField": {
							"id": $scope.item.id,
							"kdKecamatan": $scope.item.kdKecamatan,
					 		"kotaKabupaten": $scope.item.kotaKabupaten,
					 		
					 		"propinsi": $scope.item.propinsi,
					 	
					 		"namaKecamatan": $scope.item.namaKecamatan,
					 		"qKecamatan": $scope.item.qKecamatan,
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