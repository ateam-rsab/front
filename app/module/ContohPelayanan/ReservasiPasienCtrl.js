define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReservasiPasienCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Selamat Datang di Rumah Sakit Harapan Kita";
			ModelItem.get("ContohPelayanan/PasienLama").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true; 
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("ContohPelayanan/datacombobox", true).then(function(data) {
				$scope.listDataCombobox = data;
			})
			ModelItem.getDataDummyGeneric("ContohPelayanan/DataCheckbox", false).then(function(data) {
				$scope.listDataCheckbox = data;

			})
			ModelItem.getDataDummyGeneric("ContohPelayanan/DataRadio", false).then(function(data) {
				$scope.listYaTidak = data;
			})
			$scope.now = new Date();
		}
	]);
});