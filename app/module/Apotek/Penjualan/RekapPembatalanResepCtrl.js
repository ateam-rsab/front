define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapPembatalanResepCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Rekap Pembatalan Resep";	

			$scope.dataVOloaded = true;
			$scope.item = {};

			var arrColumnRekapPembatalanResep  = [{
				"field": "noResep",
				"title": "No Resep",
                "width": 200
			}, {
				"field": "pasienRs",
				"title": "Pasien RS",
                "width": 200
			}, {
				"field": "namaPasien",
				"title": "Nama Pasien",
                "width": 200
			}, {
				"field": "namaDokter",
				"title": "NamaDokter",
                "width": 200
			}, {
				"field": "jmlBarang",
				"title": "Jml Barang/Resep",
                "width": 200
			}, {
				"field": "subtotal",
				"title": "Subtotal",
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
				"field": "diskon",
				"title": "Diskon",
                "width": 200
			}, {
				"field": "ppn",
				"title": "PPN",
                "width": 200
			}, {
				"field": "pembulatan",
				"title": "Pembulatan",
                "width": 200
			}, {
				"field": "total",
				"title": "Total",
                "width": 200
			}, {
				"field": "totalnya",
				"title": "totalnya",
                "width": 200
			} ];


			ModelItem.getGridOption("Apotek/Penjualan/DataRekapPembatalanResep", arrColumnRekapPembatalanResep).then(function(data) {
				$scope.mainGridOptions = data;
			})

			$scope.now = new Date();

			ModelItem.getDataDummyGeneric("Apotek/Penjualan/DataUnitLayanan", false).then(function(data) {
				$scope.listUnitLayanan = data;
			})
		}
	]);
});