define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BahanProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope, IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				// IPSRSService.getFieldsMasterTable("get-data-master?className=BahanProduk", true).then(function(dat){
				// 	$scope.listDataMaster = dat.data.data.BahanProduk;
					
				// 	$scope.dataSource = new kendo.data.DataSource({
	   //                  pageSize: 10,
	   //                  data: $scope.listDataMaster,
	   //                  autoSync: true
	   //          	});
					
				// });
				var asalProdukOb = [];
				var departemen = [];
				var kelompokProdukOb=[];
				var dataLengkapBahanProduk = [];
				var arrS = {};
				var departemenS;
				var kelompokProdukS;
				var nomor = 0;

				$q.all([
					IPSRSService.getFieldsMasterTable("get-data-master?className=BahanProduk", true),  
					IPSRSService.getFieldListData("Departemen&select=id,namaDepartemen",true),
					IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk",true)

					]).then(function(data) {
						asalProdukOb = data[0].data.data.BahanProduk;
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
									kdBahanProduk: asalProdukOb[i].kdBahanProduk,
									namaBahanProduk: asalProdukOb[i].namaBahanProduk,
									departemen: departemenS,
									kelompokProdukOb: kelompokProdukS

								}
								dataLengkapBahanProduk.push(arrS)
							} 
						};

						$scope.listdepartemen = departemen;
						$scope.listkelompokproduk = kelompokProdukOb;

						$scope.dataSource = new kendo.data.DataSource({
							pageSize: 10,
							data: dataLengkapBahanProduk,
							autoSync: true
						});
				});
			}

			init();


			$scope.columnBahanProduk = [
			{
				"field": "nomor",
				"title": "No"
			},
			{
				"field": "kdBahanProduk",
				"title": "kd Bahan Produk"
			},
			{
				"field": "namaBahanProduk",
				"title": "nama Bahan Produk"
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
                columns: $scope.columnBahanProduk,
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
				$scope.item.kdBahanProduk = current.kdBahanProduk;
				$scope.item.departemen = current.departemen;
				// $scope.item.departemenId = current.departemenId;
				$scope.item.kelompokProduk = current.kelompokProdukOb;
				// $scope.item.kelompokProdukId = current.kelompokProdukId;
				$scope.item.namaBahanProduk = current.namaBahanProduk;
				$scope.item.qBahanProduk = current.qBahanProduk;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				// $scope.item.idPelapor = 
					
			};

			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=BahanProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=BahanProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					// debugger;
					init();

				});
			};

			$scope.tambah = function()
		    {
		        var data = {
					"class": "BahanProduk",
					"listField": {
							"kdBahanProduk": $scope.item.kdBahanProduk,
					 		"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		"kelompokProdukId": $scope.item.kelompokProdukId,
					 		"namaBahanProduk": $scope.item.namaBahanProduk,
					 		"qBahanProduk": $scope.item.qBahanProduk,
					 		"reportDisplay": $scope.item.reportDisplay,
					 		"kodeExternal": $scope.item.kodeExternal,
					 		"namaExternal": $scope.item.namaExternal
					}
				}

		        IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					inity();
					$scope.item = {};
		        });
		    }

		    $scope.edit = function()
		    {	
		        var data = {
					"class": "BahanProduk",
					"listField": {
							"id": $scope.item.id,
							"kdBahanProduk": $scope.item.kdBahanProduk,
					 		"departemen": $scope.item.departemen,
					 		"departemenId": $scope.item.departemenId,
					 		"kelompokProduk": $scope.item.kelompokProduk,
					 		"kelompokProdukId": $scope.item.kelompokProdukId,
					 		"namaBahanProduk": $scope.item.namaBahanProduk,
					 		"qBahanProduk": $scope.item.qBahanProduk,
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
			
/*			IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
			$scope.listdepartemen= dat.data;
			});
			IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
			$scope.listkelompokproduk= dat.data;
			});
*/
		}
		]);
});