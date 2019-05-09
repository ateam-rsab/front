define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarObatGenerikCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Farmasi/DaftarObatGenerik").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("NamaGenerik", false).then(function(data) {
				$scope.listNamaGenerik = data;
			})
			$scope.daftarObat = new kendo.data.DataSource({
				data: [{
					"kodebarang":"00001",
					"namaGenerik":"Generik 1",
					"namaBarang":"Obat 1",
					"kekuatan":"Kuat",
					"pabrik":"Biofarma"
				}]
			});
			$scope.columnObat = [
			{
				"field": "kodebarang",
				"title": "Kode Barang",
				"width": "100px"
			},
			{
				"field": "namaGenerik",
				"title": "Nama Generik",
				"width": "150px"
			},
			{
				"field": "namaBarang",
				"title": "Nama Barang",
				"width": "150px"
			},
			{
				"field": "kekuatan",
				"title": "Kekuatan",
				"width": "100px"
			},
			{
				"field": "pabrik",
				"title": "Pabrik",
				"width": "100px"
			}
			];
		}
	]);
});