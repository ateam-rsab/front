define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CetakPengatarSuratCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Ketatausahaan/CetakPengatarSurat").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("TipeSurat", true).then(function(data) {
				$scope.listTipeSurat = data;
			})
			ModelItem.getDataDummyGeneric("StatusBerkas", true).then(function(data) {
				$scope.listStatusBerkas = data;
			})
			ModelItem.getDataDummyGeneric("StatusSurat", true).then(function(data) {
				$scope.listStatusSurat = data;
			})
			ModelItem.getDataDummyGeneric("NamaUser", true).then(function(data) {
				$scope.listPengirim = data;
			})
		}
	]);
});