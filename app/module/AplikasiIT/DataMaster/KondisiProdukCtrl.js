define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KondisiProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KondisiProduk", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KondisiProduk;
					
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
			$scope.columnKondisiProduk = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "serialVersionUID",
				"title": "serial Version UID"
			},
			{
				"field": "kdKondisiProduk",
				"title": "kd Kondisi Produk"
			},
			{
				"field": "kondisiProduk",
				"title": "kondisi Produk"
			},
			{
				"field": "qKondisiProduk",
				"title": "q Kondisi Produk"
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
                columns: $scope.columnKondisiProduk,
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
				$scope.item.serialVersionUID = current.serialVersionUID;
				$scope.item.kdKondisiProduk = current.kdKondisiProduk;
				$scope.item.kondisiProduk = current.kondisiProduk;
				$scope.item.qKondisiProduk = current.qKondisiProduk;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KondisiProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=KondisiProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "KondisiProduk",
					"listField": {
							"serialVersionUID": $scope.item.serialVersionUID,
					 		"kdKondisiProduk": $scope.item.kdKondisiProduk,
					 		"kondisiProduk": $scope.item.kondisiProduk,
					 		"qKondisiProduk": $scope.item.qKondisiProduk,
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
					"class": "KondisiProduk",
					"listField": {
							"id": $scope.item.id,
							"serialVersionUID": $scope.item.serialVersionUID,
					 		"kdKondisiProduk": $scope.item.kdKondisiProduk,
					 		"kondisiProduk": $scope.item.kondisiProduk,
					 		"qKondisiProduk": $scope.item.qKondisiProduk,
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