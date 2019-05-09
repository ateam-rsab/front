define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KotaKabupatenCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KotaKabupaten", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KotaKabupaten;
					
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
			$scope.columnKotaKabupaten = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdKotaKabupaten",
				"title": "kd Kota Kabupaten"
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
				"field": "namaKotaKabupaten",
				"title": "nama Kota Kabupaten"
			},
			{
				"field": "qKotaKabupaten",
				"title": "q Kota Kabupaten"
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
                columns: $scope.columnKotaKabupaten,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };
            $scope.klik = function(current){
            	$scope.showEdit = true;
				
				console.log(JSON.stringify(current));
				$scope.current = current;
				
				debugger;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.statusEnabled = current.statusEnabled;
				$scope.item.kdKotaKabupaten = current.kdKotaKabupaten;
				//$scope.item.propinsi = current.propinsiId = $scope.item.id = $scope.item.namaExternal;
				$scope.item.propinsiId= current.propinsiId;
				$scope.item.namaKotaKabupaten = current.namaKotaKabupaten;
				$scope.item.qKotaKabupaten = current.qKotaKabupaten;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				//$scope.item.propinsi =  current.propinsiId = $scope.item.id
				for (var x=0;x<  $scope.listpropinsi.length ;x++){
					if ($scope.listpropinsi[x].id === current.propinsiId){
						$scope.item.propinsi = $scope.listpropinsi[x];
						return;
					}
				}
	 
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KotaKabupaten&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KotaKabupaten&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "KotaKabupaten",
					"listField": {
							"kdKotaKabupaten": $scope.item.kdKotaKabupaten,
					 		"propinsi": $scope.item.propinsi,
					 		
					 		"namaKotaKabupaten": $scope.item.namaKotaKabupaten,
					 		"qKotaKabupaten": $scope.item.qKotaKabupaten,
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
					"class": "KotaKabupaten",
					"listField": {
							"id": $scope.item.id,
							"kdKotaKabupaten": $scope.item.kdKotaKabupaten,
					 		"propinsi": $scope.item.propinsi,
					 		
					 		"namaKotaKabupaten": $scope.item.namaKotaKabupaten,
					 		"qKotaKabupaten": $scope.item.qKotaKabupaten,
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