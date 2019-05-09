define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MerkProduk2Ctrl', ['$q', '$rootScope', '$scope', 'ManageSarprasPhp', 'CacheHelper', '$state',
		function($q, $rootScope, $scope, manageSarprasPhp, cacheHelper, $state) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			LoadData() ;

			LoadCombo();

			function LoadCombo() {
				manageSarprasPhp.getDataTableTransaksi("merkproduk/get-datacombo").then(function (data) {
				
				//buat variabel buat dihtml == data.data.jeniskeperawaratan dari departemencontroller.php
						$scope.listnamaDepartemen =  data.data.namadepartemen
							
					})
			}

			$scope.cariFilter = function () {
				$scope.isRouteLoading = true;
				LoadData()
			}
			$scope.clearSearch = function () {
				$scope.ClearSearch();
			}

			//fungsi clear kriteria search
			$scope.ClearSearch = function () {
				$scope.item = {};
				loadData()
			}

			// var init = function () {
			// 	IPSRSService.getFieldsMasterTable("get-data-master?className=MerkProduk", true).then(function(dat){
			// 		$scope.listDataMaster = dat.data.data.MerkProduk;
					
			// 		$scope.dataSource = new kendo.data.DataSource({
	  //                   pageSize: 10,
	  //                   data: $scope.listDataMaster,
	  //                   autoSync: true
	  //                   /*schema: {
	  //                     	model: {
	  //                       	id: "asetId",
	  //                       	fields: {
	                            	
	  //                       	}   
	  //                   	}
	  //               	}	*/
	  //           	});
					
			// 	});
			// }
			// init();

			// function LoadData() {
			// 	cacheHelper.set('RekananCtrl2');
			// 	manageSarprasPhp.getDataTableTransaksi("merkproduk/get-merkproduk", true).then(function (data) {
			// 			$scope.isRouteLoading = false;
			// 			//harus sama denagan html k-data-source
			// 			$scope.dataSourceMerkProduk = new kendo.data.DataSource({
			// 				data: data.data.merkproduk,
			// 				pageSize: 10,
			// 				total: data.length,
			// 				serverPaging: false,
			// 				schema: {
			// 					model: {
			// 						fields: {
			// 						}
			// 					}
			// 				}
			// 			});
			// 		})
			// }

			function LoadData() {

				var idMerkProduk = "";
				if ($scope.item.idMerkProduk != undefined) {
					idMerkProduk = "&idMerkProduk=" + $scope.item.idMerkProduk;
				}

				var listnamaDepartemen = "";
				if ($scope.item.listnamaDepartemen != undefined) {
					listnamaDepartemen = "&listnamaDepartemen=" + $scope.item.listnamaDepartemen.id;
				}
				var merkProduk = "";
				if ($scope.item.merkProduk != undefined) {
					merkProduk = "&merkProduk=" + $scope.item.merkProduk;
				}
				
				// cacheHelper.set('RekananCtrl2');
				manageSarprasPhp.getDataTableTransaksi("merkproduk/get-merkproduk?"
					+ idMerkProduk
					+ listnamaDepartemen
					+ merkProduk
					).then(function (data) {
						$scope.isRouteLoading = false;
							for (var i = 0; i < data.data.merkproduk.length; i++) {
								data.data.merkproduk[i].no = i+1;
							}
						//harus sama denagan html k-data-source
						$scope.dataSourceMerkProduk = new kendo.data.DataSource({
							data: data.data.merkproduk,
							pageSize: 10,
							total: data.length,
							serverPaging: false,
							schema: {
								model: {
									fields: {
									}
								}
							}
						});
					})
			}
			//
			// IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
			// 	$scope.listdepartemen = dat.data;
			// });
			$scope.columnMerkProduk = [
			{
				"field": "no",
				"title": "No"
			},
			{
				"field": "idp",
				"title": "ID Departemen"
			},
			{
				"field": "namadepartemen",
				"title": "Nama Departemen"
			},
			
			{
				"field": "kdmerkproduk",
				"title": "KD Merk Produk"
			},
			{
				"field": "merkproduk",
				"title": "Merk Produk"
			},
			{
				"field": "qmerkproduk",
				"title": "Q Merk Produk"
			},
			{
				"field": "reportdisplay",
				"title": "Report Display"
			},
			{
				"field": "kodeexternal",
				"title": "Kode External"
			},
			{
				"field": "namaexternal",
				"title": "Nama External"
			},
			{
				"field": "statusenabled",
				"title": "Status Enabled"
			},
			// {
			// 	"title" : "Action",
   //  			"width" : "200px",
   //  			"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
   //                      	 "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			// }
			];

			$scope.mainGridOptions = { 
                pageable: true,
                columns: $scope.columnMerkProduk,
                editable: "popup",
                selectable: "row",
                scrollable: false
            };

            //fungsi clear kriteria search
			$scope.ClearSearch = function () {
				$scope.item = {};
				loadData()
			}

   //          $scope.klik = function(current){
   //          	$scope.showEdit = true;
			// 	$scope.current = current;
			// 	// debugger;
			// 	$scope.item.id = current.id;
			// 	$scope.item.noRec = current.noRec;
			// 	$scope.item.statusEnabled = current.statusEnabled;
			// 	$scope.item.departemen = current.departemen;
			// 	$scope.item.departemenId = current.departemenId;
			// 	$scope.item.kdMerkProduk = current.kdMerkProduk;
			// 	$scope.item.merkProduk = current.merkProduk;
			// 	$scope.item.qMerkProduk = current.qMerkProduk;
			// 	$scope.item.reportDisplay = current.reportDisplay;
			// 	$scope.item.kodeExternal = current.kodeExternal;
			// 	$scope.item.namaExternal = current.namaExternal;
			// 	// $scope.item.idPelapor = 

					
			// };

			$scope.disableData=function(){
				// IPSRSService.getClassMaster("delete-master-table?className=MerkProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
				// 	// debugger;
				// 	init();

				// });
			};

			$scope.enableData=function(){
				// IPSRSService.getClassMaster("delete-master-table?className=MerkProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
				// 	// debugger;
				// 	init();

				// });
			};
			

			// $scope.tambah = function()
		 //    {
		 //        var data = {
			// 		"class": "MerkProduk",
			// 		"listField": {
			// 				"departemen": $scope.item.departemen,
			// 		 		"departemenId": $scope.item.departemenId,
			// 		 		"kdMerkProduk": $scope.item.kdMerkProduk,
			// 		 		"merkProduk": $scope.item.merkProduk,
			// 		 		"qMerkProduk": $scope.item.qMerkProduk,
			// 		 		"reportDisplay": $scope.item.reportDisplay,
			// 		 		"kodeExternal": $scope.item.kodeExternal,
			// 		 		"namaExternal": $scope.item.namaExternal
			// 		}
			// 	}
		 //   //      IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
			// 		// console.log(JSON.stringify(e.data));
			// 		// init();
			// 		// $scope.item = {};
		 //   //      });
		 //    }


		 $scope.click = function (dataPasienSelected) {
		  //   	$scope.item.listjenisKeperawatan = dataPasienSelected.namadepartemen
		  //   		///dari html                           dari fild yang akan ditampilkan
				// $scope.item.merkProduk = dataPasienSelected.merkproduk
				// $scope.item.kdMerkProduk = dataPasienSelected.kdmerkproduk
				// $scope.item.reportDisplay = dataPasienSelected.reportdisplay
				// $scope.item.qMerkProduk = dataPasienSelected.qmerkproduk
				// $scope.item.namaExternal = dataPasienSelected.namaexternal
				// $scope.item.kodeExternal = dataPasienSelected.kodeexternal


			};


		 $scope.tambah = function () {
				$state.go("MerkProduk2Edit",)
			}

		    
		    $scope.edit = function () {
				if ($scope.dataPasienSelected == undefined) {
					alert("Pilih 1 Data Untuk di edit!!")
				} else {
					$state.go("MerkProduk2Edit",
						{
							idx: $scope.dataPasienSelected.id
						})
				}
			}

		    $scope.batal = function () {
		    	$scope.showEdit = false;
		    	$scope.item = {};
		    }

		    $scope.hapus = function () {
				if ($scope.dataPasienSelected == undefined) {
					alert("Pilih 1 Data Untuk di Hapus!!")
				} else {				
					var data = {
					"idmerkproduk": $scope.dataPasienSelected.id,
					
					}
					manageSarprasPhp.postHapusMerkProduk(data).then(function (e) {
						//  console.log(JSON.stringify(e.rekanan));
					LoadData()
					});
				}
			}

		 //    $scope.hapus = function () {
			// 	if ($scope.dataPasienSelected == undefined) {
			// 		alert("Pilih 1 Data Untuk di Hapus!!")
			// 	} else {				
			// 		var data = {
			// 		"idmerkproduk": $scope.dataPasienSelected.id,
					
			// 		}
			// 		manageSarprasPhp.postHapusDataFixed(data).then(function (e) {
			// 			//  console.log(JSON.stringify(e.rekanan));
			// 		LoadData()
			// 		});
			// 	}
			// }

		}
		]);
});