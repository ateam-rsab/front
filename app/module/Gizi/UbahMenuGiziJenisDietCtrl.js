define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UbahMenuGiziJenisDietCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
		$scope.now = new Date();
		$scope.item = {};
		ModelItem.get("Gizi/UbahMenuGiziJenisDiet").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
		ModelItem.getDataDummyGeneric("jenisKelamin", true).then(function(data) {
			$scope.ListjenisKelamin = data;
		})
		ModelItem.getDataDummyGeneric("kelas", true).then(function(data) {
			$scope.Listkelas = data;
		})
		ModelItem.getDataDummyGeneric("Gizi/UbahMenuGiziJenisDiet/jenisPasien", true).then(function(data) {
			$scope.ListjenisPasien = data;
		})
		ModelItem.getDataDummyGeneric("jenisDiet", true).then(function(data) {
			$scope.ListjenisDiet = data;
		})
		ModelItem.getDataDummyGeneric("kategoryDiet", true).then(function(data) {
			$scope.ListkategoryDiet = data;
		})
		ModelItem.getDataDummyGeneric("jenisWaktu", true).then(function(data) {
			$scope.ListjenisWaktu = data;
		})
		ModelItem.getDataDummyGeneric("Alergi", true).then(function(data) {
			$scope.ListAlergi = data;
		})
		}
	]);
});