define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('EntryResepCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Entry Resep";

			$scope.dataVOloaded = true;
			$scope.item = {};


			$scope.isAdaAlergi = false;

			$scope.now = new Date();

			var arrColumnEntryResep = [{
				"field": "noResep",
				"title": "No Resep",
                "width": 200
			}, {
				"field": "qty",
				"title": "Qty",
                "width": 200
			}, {
				"field": "jenisKelamin",
				"title": "L/P",
                "width": 200
			}, {
				"field": "satuan",
				"title": "Satuan",
                "width": 200
			}, {
				"field": "harga",
				"title": "Harga",
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
				"field": "jasa",
				"title": "Jasa",
                "width": 200
			}, {
				"field": "subtotal",
				"title": "Subtotal",
                "width": 200
			}, {
				"field": "info",
				"title": "Etiket",
                "width": 200
			}];

			
			ModelItem.getGridOption("Apotek/Penjualan/DataEntryResep", arrColumnEntryResep).then(function(data) {
				$scope.mainGridOptions = data;
			})



			ModelItem.getDataDummyGeneric("Apotek/Penjualan/DataUnitLayanan", false).then(function(data) {
				$scope.listUnitLayanan = data;
			})

			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listYaTidak = data;
			})

		}
	]);
});