define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InformasiStokBahanDietCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {
			$scope.title = "Resep elektronik";			

			$scope.dataVOloaded = true;
			$scope.item = {};


			//define column untuk grid
			var arrColumnGridResepElektronik = [{
				"field": "kodeBahanDiet",
				"title": "Kode Bahan Diet",
				"width": "100px"
			}, {
				"field": "namaBahanDiet",
				"title": "Nama Bahan Diet",
				"width": "300px"
			}, {
				"field": "asalBahanDiet",
				"title": "Asal Bahan Diet",
				"width": "100px"
			}, {
				"field": "jmlStok",
				"title": "Jumlah Stok",
				"width": "100px"
		    }];
		   	ModelItem.getGridOption("Gizi/InformasiStokBahanDiet/InformasiStokBahanDiet", arrColumnGridResepElektronik).then(function(data) {
				$scope.mainGridOptions = data;
			})

			$scope.now = new Date();
			ModelItem.get("Gizi/InformasiStokBahanDiet").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
		}
			
	]);
});

