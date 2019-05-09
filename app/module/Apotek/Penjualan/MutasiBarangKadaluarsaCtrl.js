define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MutasiBarangKadaluarsaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Mutasi Barang Kadaluarsa";		

			$scope.dataVOloaded = true;
			$scope.item = {};

			var arrColumnBarangKadaluarsa = [{
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
				"field": "jumlah",
				"title": "Jumlah",
                "width": 200
			}, {
				"field": "tanggalExpiredData",
				"title": "Tanggal Expired Data",
                "width": 200
			}, {
				"field": "dokter",
				"title": "Dokter",
                "width": 200
			}, {
				"field": "tipePasien",
				"title": "Tipe Pasien",
                "width": 200
			}, {
				"field": "keluarkan",
				"title": "Keluarkan",
                "width": 200
			}];


			ModelItem.getGridOption("Apotek/Penjualan/DataMutasiBarangKadaluarsa", arrColumnBarangKadaluarsa).then(function(data) {
				$scope.mainGridOptions = data;
			})

			$scope.now = new Date();

			ModelItem.getDataDummyGeneric("Apotek/Penjualan/DataUnitLayanan", false).then(function(data) {
				$scope.listUnitLayanan = data;
			})

		}
	]);
});