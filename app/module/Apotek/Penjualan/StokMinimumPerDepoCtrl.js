define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('StokMinimumPerDepoCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Stok Minimum Per Depo";

			$scope.dataVOloaded = true;
			$scope.item = {};


			var arrColumnStock = [{
				"field": "kodeBarang",
				"title": "Kode Barang",
                "width": 200
			}, {
				"field": "namaBarang",
				"title": "Nama Barang",
                "width": 200
			}, {
				"field": "sediaan",
				"title": "Saldo Akhir",
                "width": 200
			}, {
				"field": "stokMinimal",
				"title": "Stok Minimal",
                "width": 200
			}, {
				"field": "stokMaksimal",
				"title": "Stok Maksimal",
                "width": 200
			}, {
				"field": "buatPermintaan",
				"title": "BuatPermintaan",
                "width": 200
			}, {
				"field": "jmlDiminta",
				"title": "Jumlah Diminta",
                "width": 200
			}, {
				"field": "saldoGudangTerminalFarmasi",
				"title": "Saldo Gudang Terminal Farmasi",
                "width": 200
			}];


			ModelItem.getGridOption("Apotek/Penjualan/DataStockMinimumPerDepo", arrColumnStock).then(function(data) {
				$scope.mainGridOptions = data;
			})

			$scope.now = new Date();

			ModelItem.getDataDummyGeneric("Apotek/Penjualan/DataUnitLayanan", false).then(function(data) {
				$scope.listUnitLayanan = data;
			})

		}
	]);
});