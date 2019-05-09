define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('EselonCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Eselon", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Eselon;
					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						var daftar = {
						 		"agama": e.agama,
						 		"kdEselon": e.kdEselon,
						 		"qEselon": e.qEselon,
						 		"reportDisplay": e.reportDisplay,
						 		"kodeExternal": e.kodeExternal,
						 		"namaExternal": e.namaExternal,
						 		"statusEnabled": e.statusEnabled,
						 		"id": e.id,
						 		"noRec": e.noRec,
						 		"no": i
						 	}
					 	data[i-1]=daftar
					 	i++;
					});
					$scope.source = data;
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

			$scope.columnEselon = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "eselon",
				"title": "eselon"
			},
			{
				"field": "kdEselon",
				"title": "kd Eselon"
			},
			{
				"field": "qEselon",
				"title": "q Eselon"
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
                columns: $scope.columnEselon,
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
				$scope.item.eselon = current.eselon;
				$scope.item.kdEselon = current.kdEselon;
				$scope.item.qEselon = current.qEselon;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Eselon&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Eselon&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};


			$scope.tambah = function()
		    {
		        var data = {
					"class": "Eselon",
					"listField": {
							"eselon": $scope.item.eselon,
					 		"kdEselon": $scope.item.kdEselon,
					 		"qEselon": $scope.item.qEselon,
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
					"class": "Eselon",
					"listField": {
							"id": $scope.item.id,
							"eselon": $scope.item.eselon,
					 		"kdEselon": $scope.item.kdEselon,
					 		"qEselon": $scope.item.qEselon,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
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