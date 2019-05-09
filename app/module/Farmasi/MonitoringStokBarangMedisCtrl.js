define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringStokBarangMedisCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Farmasi/MonitoringStokBarangMedis").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.daftarStokBarangMedisRuangan = new kendo.data.DataSource({
				data: []
			});
			$scope.columnStokBarangMedisRuangan = [{
				"field": "namaBarang",
				"title": "Nama Barang",
				"width" : "40%"
			}, {
				"field": "asalBarang",
				"title": "Asal Barang",
				"width" : "20%"
			}, {
				"field": "jmlMinimun",
				"title": "Jml Minimun",
				"width" : "10%"
			}, {
				"field": "jmlStok",
				"title": "Jml Stok",
				"width" : "10%"
			}, {
				"field": "satuan",
				"title": "Satuan",
				"width" : "20%"
			}];
			ModelItem.getDataDummyGeneric("RuanganRawatJalanPenunjang", true).then(function(data) {
				$scope.listMonitorStokRuanganr = data;
			});
		}
	]);
});