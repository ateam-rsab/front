define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('StokOpnameBarangMedisCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Farmasi/NilaiPersediaanBarangMedis").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("GroupBy", false).then(function(data) {
				$scope.listGroupBy = data;
			})
			ModelItem.getDataDummyGeneric("JenisBarang", true).then(function(data) {
				$scope.listJenisBarang = data;
			})
			ModelItem.getDataDummyGeneric("AsalProduk", true).then(function(data) {
				$scope.listAsalBarang = data;
			})
			$scope.showJenisBarang = true;
			$scope.showAsalBarang = true;
			$scope.$watch('item.groupBy', function(newValue, oldValue) {
				if (newValue == "Jenis Barang") {
					$scope.showJenisBarang = true;
					$scope.showAsalBarang = false;
				}else {
					$scope.showJenisBarang = false;
					$scope.showAsalBarang = true;
				}
			});
			$scope.daftarStokOpnameBarangMedis = new kendo.data.DataSource({
				data: [{
					"jenisBarang":"Alkes",
					"namaBarang":"Silkam 2/0",
					"asalBarang":"BLUD",
					"stokSystem":"10",
					"stokReal":"10",
					"tglKadaluarsa":"10-10-2016",
					"hargaNetto1":"50.000",
					"hargaNetto2":"50.000",
					"discount":"5%",
					"jmlMinimum":"10",
					"selisih":"-",
				}]
			});
			$scope.columnStokOpnameBarangMedis = [
			{
				"field": "jenisBarang",
				"title": "Jenis Barang",
				"width": "100px"
			},
			{
				"field": "namaBarang",
				"title": "Nama Barang",
				"width": "150px"
			},
			{
				"field": "asalBarang",
				"title": "Asal Barang",
				"width": "150px"
			},
			{
				"field": "stokSystem",
				"title": "Stok System",
				"width": "100px"
			},
			{
				"field": "stokReal",
				"title": "Stok Real",
				"width": "100px"
			},
			{
				"field": "tglKadaluarsa",
				"title": "Tgl Kadaluarsa",
				"width": "150px"
			},
			{
				"field": "hargaNetto1",
				"title": "Harga Netto 1",
				"width": "150px"
			},
			{
				"field": "hargaNetto2",
				"title": "Harga Netto 2",
				"width": "150px"
			},
			{
				"field": "discount",
				"title": "Discount",
				"width": "100px"
			},
			{
				"field": "jmlMinimum",
				"title": "Jml Minimum",
				"width": "100px"
			},
			{
				"field": "selisih",
				"title": "Selisih",
				"width": "100px"
			}
			];
		}
	]);
});