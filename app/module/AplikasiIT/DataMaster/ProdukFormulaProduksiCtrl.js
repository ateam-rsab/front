define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ProdukFormulaProduksiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=ProdukFormulaProduksi", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.ProdukFormulaProduksi;
					
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
			IPSRSService.getFieldListData("ProdukAsal&select=id,namaExternal", true).then(function(dat){
				$scope.listprodukAsal = dat.data;
			});

			IPSRSService.getFieldListData("ProdukHasil&select=id,namaExternal", true).then(function(dat){
				$scope.listprodukHasil = dat.data;
			});
			$scope.columnProdukFormulaProduksi = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "formulaProduksi",
				"title": "formula Produksi"
			},
			{
				"field": "produkAsal",
				"title": "produk Asal"
			},
			{
				"field": "produkAsalId",
				"title": "produk Asal Id"
			},
			{
				"field": "produkHasil",
				"title": "produk Hasil"
			},
			{
				"field": "produkHasilId",
				"title": "produk Hasil Id"
			},
			{
				"field": "keteranganLainnya",
				"title": "keterangan Lainnya"
			},
			{
				"field": "qtyProdukAsal",
				"title": "qty Produk Asal"
			},
			{
				"field": "satuanProdukAsal",
				"title": "satuan Produk Asal"
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
                columns: $scope.columnProdukFormulaProduksi,
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
				$scope.item.formulaProduksi = current.formulaProduksi;
				$scope.item.produkAsal = current.produkAsal;
				$scope.item.produkAsalId = current.produkAsalId;
				$scope.item.produkHasil = current.produkHasil;
				$scope.item.produkHasilId = current.produkHasilId;
				$scope.item.keteranganLainnya = current.keteranganLainnya;
				$scope.item.qtyProdukAsal = current.qtyProdukAsal;
				$scope.item.satuanProdukAsal = current.satuanProdukAsal;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=ProdukFormulaProduksi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=ProdukFormulaProduksi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "ProdukFormulaProduksi",
					"listField": {
							"formulaProduksi": $scope.item.formulaProduksi,
					 		"produkAsal": $scope.item.produkAsal,
					 		"produkAsalId": $scope.item.produkAsalId,
					 		"produkHasil": $scope.item.produkHasil,
					 		"produkHasilId": $scope.item.produkHasilId,
					 		"keteranganLainnya": $scope.item.keteranganLainnya,
					 		"qtyProdukAsal": $scope.item.qtyProdukAsal,
					 		"satuanProdukAsal": $scope.item.satuanProdukAsal,
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
					"class": "ProdukFormulaProduksi",
					"listField": {
							"id": $scope.item.id,
							"agama": $scope.item.namaProdukFormulaProduksi,
					 		"kdProdukFormulaProduksi": $scope.item.kdProdukFormulaProduksi,
					 		"qProdukFormulaProduksi": $scope.item.qProdukFormulaProduksi,
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