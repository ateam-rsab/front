define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterAlatCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
		$scope.item = {};
		$scope.daftarMasterAlat = new kendo.data.DataSource({
			data: [
					{ 
						"kodeBarang" : "BRG001",
						"namaAlat":"AC"
					},
					{ 
						"kodeBarang" : "BRG002",
						"namaAlat":"Printer"
					}
				]
			});
			$scope.columnMasterAlat = [{
				"field": "kodeBarang",
				"title": "Kode Barang",
				"width": "150px"
			}, {
				"field": "namaAlat",
				"title": "Nama Alat",
				"width": "300px"
		    }];
		ModelItem.get("CSSD/MasterAlat").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
		}
	]);
});