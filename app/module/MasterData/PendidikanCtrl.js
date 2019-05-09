define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PendidikanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=Pendidikan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.Pendidikan;
					var data = [];
					var i = 1;
					$scope.listDataMaster.forEach(function(e){
						var daftar = {
						 		"agama": e.agama,
						 		"kdPendidikan": e.kdPendidikan,
						 		"qPendidikan": e.qPendidikan,
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
			IPSRSService.getFieldListData("JenisPendidikan&select=id,namaExternal", true).then(function(dat){
				$scope.listjenisPendidikan = dat.data;
			});
			$scope.columnPendidikan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisPendidikan",
				"title": "jenis Pendidikan"
			},
			{
				"field": "jenisPendidikanId",
				"title": "jenis Pendidikan Id"
			},
			{
				"field": "kdPendidikan",
				"title": "kd Pendidikan"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
			},
			{
				"field": "namaPendidikan",
				"title": "nama Pendidikan"
			},
			{
				"field": "qPendidikan",
				"title": "q Pendidikan"
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
                columns: $scope.columnPendidikan,
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
				$scope.item.jenisPendidikan = current.jenisPendidikan;
				$scope.item.jenisPendidikanId = current.jenisPendidikanId;
				$scope.item.kdPendidikan = current.kdPendidikan;
				$scope.item.noUrut = current.noUrut;
				$scope.item.namaPendidikan = current.namaPendidikan;
				$scope.item.qPendidikan = current.qPendidikan;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Pendidikan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=Pendidikan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "Pendidikan",
					"listField": {
							"jenisPendidikan": $scope.item.jenisPendidikan,
					 		"jenisPendidikanId": $scope.item.jenisPendidikanId,
					 		"kdPendidikan": $scope.item.kdPendidikan,
					 		"noUrut": $scope.item.noUrut,
					 		"namaPendidikan": $scope.item.namaPendidikan,
					 		"qPendidikan": $scope.item.qPendidikan,
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
					"class": "Pendidikan",
					"listField": {
							"id": $scope.item.id,
							"jenisPendidikan": $scope.item.jenisPendidikan,
					 		"jenisPendidikanId": $scope.item.jenisPendidikanId,
					 		"kdPendidikan": $scope.item.kdPendidikan,
					 		"noUrut": $scope.item.noUrut,
					 		"namaPendidikan": $scope.item.namaPendidikan,
					 		"qPendidikan": $scope.item.qPendidikan,
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