define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UsulanPermintaanBarangCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Usulan Permintaan Barang";		

			$scope.dataVOloaded = true;
			$scope.item = {};

			var arrColumnPermintaanMutasiBarang = [{
				"field": "kodeBarang",
				"title": "Kode Barang",
                "width": 200
			}, {
				"field": "namaBarang",
				"title": "Nama Barang",
                "width": 200
			}, {
				"field": "satuan",
				"title": "Satuan",
                "width": 200
			}, {
				"field": "stokMinimal",
				"title": "Stok Minimal",
                "width": 200
			}, {
				"field": "saldoAkhir",
				"title": "Saldo Akhir",
                "width": 200
			}, {
				"field": "jml",
				"title": "Jumlah diminta",
                "width": 200
			}];

			ModelItem.getGridOption("Apotek/Penjualan/DataPermintaanMutasiBarang", arrColumnPermintaanMutasiBarang).then(function(data) {
				$scope.mainGridOptions = data;
			})

			$scope.now = new Date();

			ModelItem.getDataDummyGeneric("Apotek/Penjualan/DataUnitLayanan", false).then(function(data) {
				$scope.listUnitLayanan = data;
			})

			$scope.dataResep = new kendo.data.DataSource({
				data: []
			});
		}
	]);
});