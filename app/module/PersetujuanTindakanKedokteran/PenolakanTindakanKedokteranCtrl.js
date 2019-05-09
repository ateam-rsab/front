define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenolakanTindakanKedokteranCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("PenolakanTindakanKedokteran/PenolakanTindakanKedokteran").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("umur", false).then(function(data) {
				$scope.listUmur = data;
			})
			ModelItem.getDataDummyGeneric("JenisKelamin", false).then(function(data) {
				$scope.listJenisKelamin = data;
			})
			ModelItem.getDataDummyGeneric("TindakanMedis", false).then(function(data) {
				$scope.listTindakanMedis = data;
			})
			ModelItem.getDataDummyGeneric("Pasien", false).then(function(data) {
				$scope.listNamaPasien = data;
			})
		}
	]);
});