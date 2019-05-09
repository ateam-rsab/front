define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KirimBarang2Ctrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.dataKirimBarang2 = new kendo.data.DataSource({
				data: [
				{ 
					"kodeBarang" : "",
					"namaBarang":"",
					"asalBarang":"",
					"stok":"",
					"order" : "",
					"kirim":"1"
				}
				]
			});

			$scope.columndataKirimBarang2= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "kodeBarang",
				"title": "<h3 align=center>Kode Barang</h3>",
				"width": "100px"
			}, {
				"field": "namaBarang",
				"title": "<h3 align=center>Nama Barang</h3>",
				"width": "200px"
			}, {
				"field": "asalBarang",
				"title": "<h3 align=center>Asal Barang</h3>",
				"width": "100px"
			}, {
				"field": "stok",
				"title": "<h3 align=center>Stok</h3>",
				"width": "70px"
			}, {
				"field": "order",
				"title": "<h3 align=center>Order</h3>",
				"width": "70px"
			}, {
				"field": "kirim",
				"title": "<h3 align=center>Kirim</h3>",
				"width": "100px"
		    }];

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;
			// })

			$scope.now = new Date();
			ModelItem.get("Logistik/KirimBarang").then(function(data) {
				$scope.item = data;
				scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Logistik/KirimBarang/checkboxNoOrder", false).then(function(data) {
			$scope.ListNoFaktur = data;
			})
			ModelItem.getDataDummyGeneric("Ruangan", true).then(function(data) {
			$scope.ListRuangan = data;
			})
			$scope.enableNoOrder = true;
		}

	]);
});