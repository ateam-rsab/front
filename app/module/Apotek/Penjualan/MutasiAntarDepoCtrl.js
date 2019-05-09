define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MutasiAntarDepoCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Mutasi Antar Depo";			

			$scope.dataVOloaded = true;
			$scope.item = {};

			var arrColumnMutasiAntarDepo = [{
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
				"field": "saldoAkhir",
				"title": "SaldoAkhir",
                "width": 200
			}, {
				"field": "tanggal",
				"title": "Tanggal/Jam Masuk",
                "width": 200
			}, {
				"field": "jml",
				"title": "Jumlah yang dikirim",
                "width": 200
			}];

			$scope.now = new Date();


			ModelItem.getGridOption("Apotek/Penjualan/DataMutasiAntarDepo", arrColumnMutasiAntarDepo).then(function(data) {
				$scope.mainGridOptions = data;
			})


			ModelItem.getDataDummyGeneric("Apotek/Penjualan/DataUnitLayanan", false).then(function(data) {
				$scope.listUnitLayanan = data;
			})

			$scope.dataResep = new kendo.data.DataSource({
				data: []
			});
		}
	]);
});