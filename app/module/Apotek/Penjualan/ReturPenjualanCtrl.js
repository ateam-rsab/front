define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReturPenjualanCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			$scope.title = "Retur Penjulan";	

			$scope.dataVOloaded = true;
			$scope.item = {};

			$scope.headerTemplatePengembalian = kendo.template("Pengembalian/Retur");

			$scope.headerTemplatePenjualan = kendo.template("Penjualan/Sales");
			$scope.columnResep = [{
				"field": "deskripsi",
				"title": "Deskripsi"
			}, {
				"field": "qty",
				"title": "Qty"
			}, {
				"field": "satuan",
				"title": "Satuan"
			}, {
				"field": "harga",
				"title": "Harga"
			}, {
				"field": "embalace",
				"title": "Embalace"
			}, {
				"field": "diskon",
				"title": "Diskon"
			}, {
				"field": "jasa",
				"title": "Jasa"
			}];

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
