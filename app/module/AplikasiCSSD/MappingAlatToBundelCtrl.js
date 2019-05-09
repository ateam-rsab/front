define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MappingAlatToBundelCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
		$scope.item = {};
		$scope.daftarMasterAlat = new kendo.data.DataSource({
			data: [
					{ 
						"namaAlat":"AC",
						"jumlah":"1",
						"satuan":"buah"
					},
					{ 
						"namaAlat":"Printer",
						"jumlah":"2",
						"satuan":"buah"
					}
				]
			});
			$scope.columnMasterAlat = [{
				command: { text: "Y", click: $scope.removeDaftarPenyakit },
		        title: "&nbsp;",
		        width: "100px"
			}, {
				"field": "namaAlat",
				"title": "Nama Alat",
				"width": "300px"
			}, {
				"field": "jumlah",
				"title": "Jumlah",
				"width": "100px"
			}, {
				"field": "satuan",
				"title": "Satuan",
				"width": "100px"
		    }];
		ModelItem.get("CSSD/MappingAlatToBundel").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
		}
	]);
});