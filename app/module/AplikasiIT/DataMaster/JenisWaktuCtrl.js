define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisWaktuCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisWaktu", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisWaktu;
					
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

			IPSRSService.getFieldListData("kelompokProduk&select=id,namaExternal", true).then(function(dat){
				$scope.listkelompokProduk = dat.data;
			});
			$scope.columnJenisWaktu = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jamAkhir",
				"title": "jam Akhir"
			},
			{
				"field": "jamAwal",
				"title": "jam Awal"
			},
			{
				"field": "jenisWaktu",
				"title": "jenis Waktu"
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
				"field": "kdJenisWaktu",
				"title": "kd Jenis Waktu"
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
				"field": "noUrut",
				"title": "no Urut"
			},
			{
				"field": "qJenisWaktu",
				"title": "q Jenis Waktu"
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
                columns: $scope.columnJenisWaktu,
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
				$scope.item.jamAkhir = current.jamAkhir;
				$scope.item.jamAwal = current.jamAwal;
				$scope.item.jenisWaktu = current.jenisWaktu;
				$scope.item.departemen = current.departemen;
				
				$scope.item.kdJenisWaktu = current.kdJenisWaktu;
				$scope.item.kelompokProduk = current.kelompokProduk;
				
				$scope.item.noUrut = current.noUrut;
				$scope.item.qJenisWaktu = current.qJenisWaktu;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 

					
			};
			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisWaktu&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=JenisWaktu&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};
			$scope.tambah = function()
		    {
		        var data = {
					"class": "JenisWaktu",
					"listField": {
							"jamAkhir": $scope.item.jamAkhir,
					 		"jamAwal": $scope.item.jamAwal,
					 		"jenisWaktu": $scope.item.jenisWaktu,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisWaktu": $scope.item.kdJenisWaktu,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		
					 		"noUrut": $scope.item.noUrut,
					 		"qJenisWaktu": $scope.item.qJenisWaktu,
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
					"class": "JenisWaktu",
					"listField": {
							"id": $scope.item.id,
							"jamAkhir": $scope.item.jamAkhir,
					 		"jamAwal": $scope.item.jamAwal,
					 		"jenisWaktu": $scope.item.jenisWaktu,
					 		"departemen": $scope.item.departemen,
					 		
					 		"kdJenisWaktu": $scope.item.kdJenisWaktu,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		
					 		"noUrut": $scope.item.noUrut,
					 		"qJenisWaktu": $scope.item.qJenisWaktu,
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