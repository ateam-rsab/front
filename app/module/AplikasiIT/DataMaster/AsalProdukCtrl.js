////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('AsalProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				// IPSRSService.getFieldsMasterTable("get-data-master?className=AsalProduk", true).then(function(dat){
				// 	$scope.dataSource = dat.data.data.AsalProduk;
				// 	debugger;                                   					
				// 	$scope.dataSource = new kendo.data.DataSource({
				// 		pageSize: 10,
				// 		data: $scope.dataSource,
				// 		autoSync: true

				// 	});

				// });
				 var asalProdukOb = [];
				 var departemen = [];
				 var kelompokProdukOb=[];
				 var dataLengkapAsalProduk = [];
				 var arrS = {};
				 var departemenS;
				 var kelompokProdukS;
				 var nomor = 0;

				 $q.all([
				 	IPSRSService.getFieldsMasterTable("get-data-master?className=AsalProduk", true),  
				 	IPSRSService.getFieldListData("Departemen&select=id,namaDepartemen",true),
				 	IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk",true)

				 	]).then(function(data) {
				 		asalProdukOb = data[0].data.data.AsalProduk;
				 		departemen = data[1].data;
				 		kelompokProdukOb= data[2].data;

				 		if (asalProdukOb != undefined) {
					 		for (var i = 0; i < asalProdukOb.length; i++) {
					 			nomor += 1

					 			for (var j = 0; j < departemen.length; j++) {
					 				if (asalProdukOb[i].departemenId!=null) {
						 				if (asalProdukOb[i].departemenId == departemen[j].id) {
						 					departemenS = departemen[j]
						 					break;
						 				}
						 			} else {
						 				departemenS ="-"
						 			};
					 			}

					 			for (var k = 0; k < kelompokProdukOb.length; k++) {
					 				if (asalProdukOb[i].kelompokProdukId!=null) {
						 				if (asalProdukOb[i].kelompokProdukId == kelompokProdukOb[k].id) {
						 					kelompokProdukS = kelompokProdukOb[k]
						 					break;
						 				}
						 			} else {
						 				kelompokProdukS ="-"
						 			};
					 			}



					 			arrS = {
					 				nomor: nomor,
					 				id: asalProdukOb[i].id,
					 				statusEnabled: asalProdukOb[i].statusEnabled,
					 				kodeExternal: asalProdukOb[i].kodeExternal,
					 				namaExternal: asalProdukOb[i].namaExternal,
					 				reportDisplay: asalProdukOb[i].reportDisplay, 
					 				kdAsalProduk: asalProdukOb[i].kdAsalProduk,
					 				asalProduk: asalProdukOb[i].asalProduk,
					 				departemen: departemenS,
					 				kelompokProdukOb: kelompokProdukS

					 			}
					 			dataLengkapAsalProduk.push(arrS)
					 		} 
				 		};

				 		$scope.listdepartemen = departemen;
				 		$scope.listkelompokproduk = kelompokProdukOb;

				 		$scope.dataSource = new kendo.data.DataSource({
				 			pageSize: 10,
				 			data: dataLengkapAsalProduk,
				 			autoSync: true
				 		});
				 	}); 

			}
			init();

			$scope.columnAsalProduk = [
			{
				"field": "nomor",
				"title": "No"
			},
			{
				"field": "kdAsalProduk",
				"title": "kd Asal Produk"
			},
			{
				"field": "asalProduk",
				"title": "asal Produk"
			},
			{
				"field": "departemen.namaDepartemen",
				"title": "departemen"
			},
			{
				"field": "kelompokProdukOb.kelompokProduk",
				"title": "kelompok Produk"
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
				columns: $scope.columnAsalProduk,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			////fungsi klik untuk edit
			$scope.klik = function(current){
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.asalProduk = current.asalProduk;
				$scope.item.kdAsalProduk = current.kdAsalProduk;
				$scope.item.departemen = current.departemen;
				$scope.item.kelompokProduk = current.kelompokProdukOb;
				$scope.item.id = current.id;
				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
				// for (var x=0;x<$scope.listdepartemen.length ;x++){
				// 	if ($scope.listdepartemen[x].id === current.departemenId){
				// 		$scope.item.departemen = $scope.listdepartemen[x];

				// 	}
				// }

				// for (var y=0;y<$scope.listkelompokproduk.length ;y++){
				// 	if ($scope.listkelompokproduk[y].id === current.kelompokProdukId){
				// 		$scope.item.kelompokProduk = $scope.listkelompokproduk[y];

				// 	}
				// }
			};

			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=AsalProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					init();
				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=AsalProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					init();

				});
			};

			$scope.tambah = function()
			{
				var data = {
					"class": "AsalProduk",
					"listField": {
						"asalProduk": $scope.item.asalProduk,
						"kdAsalProduk": $scope.item.kdAsalProduk,
						"departemen": $scope.item.departemen,

						"kelompokProduk": $scope.item.kelompokProduk,

						"qAsalProduk": $scope.item.qAsalProduk,

						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal,
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
					"class": "AsalProduk",
					"listField": {
						"asalProduk": $scope.item.asalProduk,
						"kdAsalProduk": $scope.item.kdAsalProduk,
						"departemen": $scope.item.departemen,
						"departemenId": $scope.item.departemenId,
						"kelompokProduk": $scope.item.kelompokProduk,
						"kelompokProdukId": $scope.item.kelompokProdukId,
						"qAsalProduk": $scope.item.qAsalProduk,
						"id": $scope.item.id,
						"noRec": $scope.item.noRec,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal,
						"statusEnabled": $scope.item.statusEnabled
					}
				}
				IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
					init();
				});
			}

			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}

			// IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
			// 	$scope.listdepartemen= dat.data;
			// });

			// IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
			// 	$scope.listkelompokproduk= dat.data;
			// });
		}
	]);
});