define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapReturPenjualanCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Rekap Retur Penjualan";		

			$scope.dataVOloaded = true;
			$scope.item = {};

			var arrColumnRekapReturPenjualan = [{
				"field": "noReg",
				"title": "No Reg",
                "width": 200
			}, {
				"field": "rs",
				"title": "RS",
                "width": 200
			}, {
				"field": "noRetur",
				"title": "No Retur",
                "width": 200
			}, {
				"field": "noResep",
				"title": "NoResep",
                "width": 200
			}, {
				"field": "namaPasien",
				"title": "Nama Pasien",
                "width": 200
			}, {
				"field": "jenisKelamin",
				"title": "L/P",
                "width": 200
			}, {
				"field": "umur",
				"title": "Umur",
                "width": 200
			}, {
				"field": "namaDokter",
				"title": "Nama Dokter",
                "width": 200
			}, {
				"field": "unitLayanan",
				"title": "Unit Layanan",
                "width": 200
			}, {
				"field": "jmlResep",
				"title": "Jumlah Resep",
                "width": 200
			}, {
				"field": "harga",
				"title": "Harga",
                "width": 200
			}, {
				"field": "diskon",
				"title": "Diskon",
                "width": 200
			}, {
				"field": "jasa",
				"title": "Jasa",
                "width": 200
			}, {
				"field": "embalace",
				"title": "Embalace",
                "width": 200
			}, {
				"field": "total",
				"title": "Total",
                "width": 200
			}, {
				"field": "status",
				"title": "Status",
                "width": 200
			} ];


			ModelItem.getGridOption("Apotek/Penjualan/DataRekapReturPenjualan", arrColumnRekapReturPenjualan).then(function(data) {
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