
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PemeriksaanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.cek = "PemeriksaanCtrl";
			$scope.dataVOloaded = true;

			var arrColumnPemeriksaan = [{
				"field": "jenisPemeriksaan",
				"title": "Jenis Pemeriksaan",
                "width": 200
			}, {
				"field": "namaPemeriksaan",
				"title": "Nama Pemeriksaan",
                "width": 200
			}];
			
			ModelItem.getGridOption("Apotek/Penjualan/DataEntryResep", arrColumnPemeriksaan).then(function(data) {
				$scope.mainGridOptions = data;
			})
		}
	]);
});