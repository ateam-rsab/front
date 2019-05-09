define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SukuCadangLogistikCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'DateHelper', '$state', '$mdDialog',
		function($rootScope, $scope, ModelItem, IPSRSService, DateHelper, $state, $mdDialog) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.mainGridOptions = { 
				pageable: true,
				columns: [
				{ field:"no",title:"No", width:"70px" },
				{ field:"namaBarang",title:"Nama Barang" },
				{ field:"satuan",title:"Satuan" },
				{ field:"saldo",title:"Saldo" },
				{ field:"quantity",title:"Quantity" }],
				editable: false
			};
		 //Service Old
		 //$scope.dataBarang = ModelItem.kendoHttpSource('/psrsPermintaanPerbaikan/get-stok-ruangan', true);
	     
	     $scope.GetProdukByNorek = function(){
	     IPSRSService.getItem('/psrsPermintaanPerbaikan/get-stok-ruangan', true).then(function(f){
		 $scope.dataBarang = f.data.data;
	     IPSRSService.getItem("psrsPermintaanPerbaikan/get-suku-cadang-by-strukorder?strukOrder="+$state.params.strukOrder, true).then(function(f){
		 $scope.dataBarangByNorec = f.data.data;
		  var datatemps = []
		  for(var y = 0; y<$scope.dataBarang.length; y++){
		  		for(var x = 0; x<$scope.dataBarangByNorec.length; x++){
		  			if($scope.dataBarang[y].idProduk == $scope.dataBarangByNorec[x].idProduk){
		  			   $scope.dataBarang[y].noRec = $scope.dataBarangByNorec[x].noRec;
		  			  }
		  		  }
		  	   datatemps.push($scope.dataBarang[y])		
		    }
		    $scope.dataSourceBarang = datatemps;
		    });
		   });
		  }
		  $scope.GetProdukByNorek();
				
			
			$scope.dataKirim = [];
			$scope.dataMaster = [];
			var load = function () {
				$scope.number = 1;
				if ($scope.dataMaster == []){
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
				} else {
					$scope.dataMaster.forEach(function (data) {
						data.no = $scope.number++
					});
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
				}
			}
			load();
			$scope.tambah_data = function () {
				if ($scope.item.quantity > $scope.item.namaBarang.qtyProduk) {
					window.messageContainer.error('Quantity Melebihi Saldo Barang')
				} else {
					var data = {
						"strukOrder": {
	      				"noRec": $state.params.strukOrder
	        			},
	        			"produk": {
	        				"id":$scope.item.namaBarang.idProduk
	        			},
	        			"noRec" : $scope.item.namaBarang.noRec,
	        			"jumlah": $scope.item.quantity,
	        			"satuanStandadar": {
	        				"id":$scope.item.namaBarang.satuanStandarId
	        			},
	        			"namaBarang": $scope.item.namaBarang.namaProduk
					}
					var dataView = {
	        			"namaBarang": $scope.item.namaBarang.namaProduk,
	        			"satuan": $scope.item.namaBarang.satuanStandar,
	        			"saldo": $scope.item.namaBarang.qtyProduk,
	        			"quantity": $scope.item.quantity
					}
					$scope.dataKirim.push(data);
					$scope.dataMaster.push(dataView);
					$scope.item.namaBarang = "";
					$scope.item.quantity = "";
					load();
				}
			}

			$scope.batal_data = function () {
				$scope.item.namaBarang = "";
				$scope.item.quantity = "";
			}
			$scope.batal = function () {
				$scope.item.namaBarang = "";
				$scope.item.quantity = "";
			}
			$scope.kembali = function(){
			debugger
				$state.go("RespondPerbaikan")
			}
			$scope.simpan = function () {
				debugger
				IPSRSService.saveDataSarPras($scope.dataKirim, "psrsPermintaanPerbaikan/save-suku-cadang-luar/").then(function(e) {
				});
			}
			
		}
		]);
});