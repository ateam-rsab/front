define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PermintaanBarangMedisatauNonMedisdariRuanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.dataPermintaanBahanMakanandariRuangan = new kendo.data.DataSource({
				data: [
				{
					"namaBarang": "Meja",
					"stok": "100",
					"qty": "10",
					"satuan": "buah"
				},
				{
					"namaBarang": "Kursi",
					"stok": "50",
					"qty": "10",
					"satuan": "buah"
				}
				]
			});

			$scope.columnPermintaanBahanMakanandariRuangan= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "namaBarang",
				"title": "<h3 align=center>Nama Barang</h3>",
				"width": "250px"
			}, {
				"field": "stok",
				"title": "<h3 align=center>Stok</h3>",
				"width": "80px"
			}, {
				"field": "qty",
				"title": "<h3 align=center>Jumlah</h3>",
				"width": "80px"
			}, {
				"field": "satuan",
				"title": "<h3 align=center>Satuan</h3>",
				"width": "100px"
			
		    }];

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;
			// })

			$scope.now = new Date();
			ModelItem.get("Logistik/PermintaanBarangMedisatauNonMedisdariRuangan").then(function(data) {
				$scope.item = data;
				scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Gizi/PermintaanBahanMakanandariRuangan/statusBarang", true).then(function(data) {
			$scope.ListstatusBarang = data;
			})

			$scope.item = {};
			$scope.addDataPermintaanBahanMakanandariRuangan = function() {

				var tempDataBarang = {
					"namaBarang": $scope.item.namaBarang,
					"stok" : $scope.item.stok,
					"qty" : $scope.item.qty,
					"satuan" : $scope.item.satuan
				}

				$scope.dataPermintaanBahanMakanandariRuangan.add(tempDataBarang);
				$scope.item.namaBarang = "";
				$scope.item.stok = "";
				$scope.item.qty = "";
				$scope.item.satuan = ""

			}

			$scope.removeDataPermintaanBahanMakanandariRuangan = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.tempDataBarang = $scope.dataPermintaanBahanMakanandariRuangan
			    .filter(function(el){
			    	return el.name !== grid[0].name;
			    });
			    grid.removeRow(row);
			};
		}
	]);
});