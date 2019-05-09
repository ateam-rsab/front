define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SatuanBesarCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=SatuanBesar", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.SatuanBesar;
					
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
			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
				$scope.listdepartemen = dat.data;
			});

			IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
				$scope.listkelompokProduk = dat.data;
			});
			$scope.columnSatuanBesar = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "departemen",
				"title": "departemen"
			},
			{
				"field": "departemenId",
				"title": "departemen Id"
			},
			{
				"field": "kelompokProduk",
				"title": "kelompok Produk"
			},
			{
				"field": "kelompokProdukId",
				"title": "kelompok Produk Id"
			},
			{
				"field": "kdSatuanBesar",
				"title": "kd Satuan Besar"
			},
			{
				"field": "qSatuanBesar",
				"title": "q Satuan Besar"
			},
			{
				"field": "satuanBesar",
				"title": "satuan Besar"
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
                columns: $scope.columnSatuanBesar,
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
				$scope.item.departemen = current.departemen;
				$scope.item.departemenId = current.departemenId;
				$scope.item.kelompokProduk = current.kelompokProduk;
				$scope.item.kelompokProdukId = current.kelompokProdukId;
				$scope.item.kdSatuanBesar = current.kdSatuanBesar;
				$scope.item.qSatuanBesar = current.qSatuanBesar;
				$scope.item.satuanBesar = current.satuanBesar;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=SatuanBesar&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=SatuanBesar&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "SatuanBesar",
					"listField": {
							"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		"kelompokProdukId": $scope.item.kelompokProdukId,
					 		"kdSatuanBesar": $scope.item.kdSatuanBesar,
					 		"qSatuanBesar": $scope.item.qSatuanBesar,
					 		"satuanBesar": $scope.item.satuanBesar,
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
					"class": "SatuanBesar",
					"listField": {
							"id": $scope.item.id,
							"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		"kelompokProdukId": $scope.item.kelompokProdukId,
					 		"kdSatuanBesar": $scope.item.kdSatuanBesar,
					 		"qSatuanBesar": $scope.item.qSatuanBesar,
					 		"satuanBesar": $scope.item.satuanBesar,
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