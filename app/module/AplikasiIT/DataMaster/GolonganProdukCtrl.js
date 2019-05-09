define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('GolonganProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=GolonganProduk", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.GolonganProduk;
					
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

			IPSRSService.getFieldListData("KelompokProduk&select=id,namaExternal", true).then(function(dat){
				$scope.listkelompokProduk = dat.data;
			});
			$scope.columnGolonganProduk = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "golonganProduk",
				"title": "golongan Produk"
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
				"field": "kdGolonganProduk",
				"title": "kd Golongan Produk"
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
				"field": "qGolonganProduk",
				"title": "q Golongan Produk"
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
                columns: $scope.columnGolonganProduk,
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
				$scope.item.golonganProduk = current.golonganProduk;
				$scope.item.departemen = current.departemen;
				$scope.item.departemenId = current.departemenId;
				$scope.item.kdGolonganProduk = current.kdGolonganProduk;
				$scope.item.kelompokProduk = current.kelompokProduk;
				$scope.item.kelompokProdukId = current.kelompokProdukId;
				$scope.item.qGolonganProduk = current.qGolonganProduk;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=GolonganProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=GolonganProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "GolonganProduk",
					"listField": {
							"golonganProduk": $scope.item.golonganProduk,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdGolonganProduk": $scope.item.kdGolonganProduk,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		
					 		"qGolonganProduk": $scope.item.qGolonganProduk,
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
					"class": "GolonganProduk",
					"listField": {
							"id": $scope.item.id,
							"golonganProduk": $scope.item.golonganProduk,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdGolonganProduk": $scope.item.kdGolonganProduk,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		
					 		"qGolonganProduk": $scope.item.qGolonganProduk,
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