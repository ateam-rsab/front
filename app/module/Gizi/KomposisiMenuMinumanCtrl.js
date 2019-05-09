define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomposisiMenuMinumanCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {		

			$scope.dataVOloaded = true;
			$scope.item = {};


			//define column untuk grid
			var arrColumnGridResepElektronik = [{
				"field": "kode",
				"title": "Kode Bahan",
				"width": "100px"
			},{
				"field": "nama",
				"title": "Nama Bahan",
				"width": "300px"
			}, {
				"field": "asal",
				"title": "Asal Barang",
				"width": "100px"
			}, {
				"field": "jumlah",
				"title": "Jumlah Bahan",
				"width": "100px"
			}, {
				"field": "satuan",
				"title": "Satuan",
				"width": "100px"
		    }];
		    ModelItem.getGridOption("Gizi/GridKomposisiMenuMakanan", arrColumnGridResepElektronik).then(function(data) {
				$scope.mainGridOptions = data;
			})

			ModelItem.get("Gizi/KomposisiMenuMakanan").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("jenisDiet", false).then(function(data) {
				$scope.ListjenisDiet = data;
			})

			ModelItem.getDataDummyGeneric("SatuanPorsi", false).then(function(data) {
				$scope.ListsatuanPorsi = data;
			})
		}
	]);
});