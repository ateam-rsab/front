define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('AgamaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService', 
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.object = {};

			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Agama", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Agama;
					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						var daftar = {
						 		"agama": e.agama,
						 		"kdAgama": e.kdAgama,
						 		"qAgama": e.qAgama,
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
	                    data: $scope.source,
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
			
			
			$scope.columnAgama = [
			{
				"field": "no",
				"title": "No"
			},
			{
				"field": "id",
				"title": "ID"
			},
			{
				"field": "agama",
				"title": "agama"
			},
			{
				"field": "kdAgama",
				"title": "kd Agama"
			},
			// {
			// 	"field": "qAgama",
			// 	"title": "q Agama"
			// },
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
                columns: $scope.columnAgama,
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
				$scope.item.namaAgama = current.agama;
				$scope.item.kdAgama = current.kdAgama;
				$scope.item.qAgama = current.qAgama;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Agama&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Agama&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Agama",
					"listField": {
							"agama": $scope.item.namaAgama,
					 		"kdAgama": $scope.item.kdAgama,
					 		"qAgama": $scope.item.qAgama,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}
				// adding object for security role
				$scope.object = data;
				$scope.object.module = 'ITI';
				$scope.object.form = 'Agama';
				$scope.object.action = 'Simpan';
		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
				}, function(e) {
					if (!e.hak_user) {
						$scope.showContWindowLoginSupervisor = true;
						$scope.windowLoginSuperUser = $("#windowLoginSupervisor");
						$scope.windowLoginSuperUser.data("kendoWindow").open();
					}
				});
		    }

			$scope.loginSupervisor = function(){
				$rootScope.loginSuperUser($scope.object, "save-master-table").then(function(e) {
                    $scope.showContWindowLoginSupervisor = false;
					$scope.windowLoginSuperUser = $("#windowLoginSupervisor");
					$scope.windowLoginSuperUser.data("kendoWindow").close();
                }, function(e) {
                    
                });
				
			}

			$scope.closeWindowLoginSupervisor = function(){
				$scope.showContWindowLoginSupervisor = false;
			}

		    $scope.edit = function()
		    {	
		        var data = {
					"class": "Agama",
					"listField": {
							"id": $scope.item.id,
							"agama": $scope.item.namaAgama,
					 		"kdAgama": $scope.item.kdAgama,
					 		"qAgama": $scope.item.qAgama,
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