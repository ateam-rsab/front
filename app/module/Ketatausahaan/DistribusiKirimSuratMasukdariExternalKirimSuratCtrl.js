define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DistribusiKirimSuratMasukdariExternalKirimSuratCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Ketatausahaan/DistribusiKirimSuratMasukdariExternalKirimSurat").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("Departemen", true).then(function(data) {
				$scope.listDepartemen = data;
			})
			ModelItem.getDataDummyGeneric("Pegawai", true).then(function(data) {
				$scope.listPegawai = data;
			})
		}
	]);
});