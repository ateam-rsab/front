define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JadwalMenuDietPeriodeCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
		$scope.now = new Date();
		$scope.item = {};
		ModelItem.get("Gizi/JadwalMenuDietPeriode").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
		ModelItem.getDataDummyGeneric("Gizi/JadwalMenuDietPeriode/NamaSiklus", true).then(function(data) {
			$scope.ListNamaSiklus = data;
		})
		ModelItem.getDataDummyGeneric("Gizi/JadwalMenuDietPeriode/hariKe", true).then(function(data) {
			$scope.ListhariKe = data;
		})
		ModelItem.getDataDummyGeneric("jenisWaktu", true).then(function(data) {
			$scope.ListjenisWaktu = data;
		})
		ModelItem.getDataDummyGeneric("jenisDiet", true).then(function(data) {
			$scope.ListjenisDiet = data;
		})
		ModelItem.getDataDummyGeneric("Gizi/JadwalMenuDietPeriode/MenuDiet", false).then(function(data) {
			$scope.ListMenuMakanan = data;
		})
		}
	]);
});