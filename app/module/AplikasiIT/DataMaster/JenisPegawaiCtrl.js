define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisPegawaiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPegawai", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisPegawai;
					
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
			IPSRSService.getFieldListData("DetailKelompokPegawai&select=id,namaExternal", true).then(function(dat){
				$scope.listdetailKelompokPegawai = dat.data;
			});
			$scope.columnJenisPegawai = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisPegawai",
				"title": "jenis Pegawai"
			},
			{
				"field": "detailKelompokPegawai",
				"title": "detail Kelompok Pegawai"
			},
			{
				"field": "detailKelompokPegawaiId",
				"title": "detail Kelompok Pegawai Id"
			},
			{
				"field": "kdJenisPegawai",
				"title": "kd Jenis Pegawai"
			},
			{
				"field": "qJenisPegawai",
				"title": "q Jenis Pegawai"
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
                columns: $scope.columnJenisPegawai,
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
				$scope.item.jenisPegawai = current.jenisPegawai;
				$scope.item.detailKelompokPegawai = current.detailKelompokPegawai;
				$scope.item.detailKelompokPegawaiId = current.detailKelompokPegawaiId;
				$scope.item.kdJenisPegawai = current.kdJenisPegawai;
				$scope.item.qJenisPegawai = current.qJenisPegawai;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisPegawai&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisPegawai&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisPegawai",
					"listField": {
							"jenisPegawai": $scope.item.jenisPegawai,
					 		"detailKelompokPegawai": $scope.item.detailKelompokPegawai,
					 		
					 		"kdJenisPegawai": $scope.item.kdJenisPegawai,
					 		"qJenisPegawai": $scope.item.qJenisPegawai,
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
					"class": "JenisPegawai",
					"listField": {
							"id": $scope.item.id,
							"jenisPegawai": $scope.item.jenisPegawai,
					 		"detailKelompokPegawai": $scope.item.detailKelompokPegawai,
					 		
					 		"kdJenisPegawai": $scope.item.kdJenisPegawai,
					 		"qJenisPegawai": $scope.item.qJenisPegawai,
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