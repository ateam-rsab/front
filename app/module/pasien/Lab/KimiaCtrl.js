define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KimiaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Kimia";

			$scope.item = {};
			ModelItem.get("Form/Lab/Kimia").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Lab/Kimia_Diabetes", false).then(function(data) {
				$scope.listDiabetes = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_FaalHati", false).then(function(data) {
				$scope.listFaalHati = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_ProfilLemak", false).then(function(data) {
				$scope.listProfilLemak = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_FaalGinjal", false).then(function(data) {
				$scope.listFaalGinjal = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_Tinja", false).then(function(data) {
				$scope.listTinja = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_Elektrolit", false).then(function(data) {
				$scope.listElektrolit = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_AnalisaGasDarah", false).then(function(data) {
				$scope.listAnalisaGasDarah = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_Urine", false).then(function(data) {
				$scope.listUrine = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_FaalPankreas", false).then(function(data) {
				$scope.listFaalPankreas = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_FaalJantung", false).then(function(data) {
				$scope.listFaalJantung = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Kimia_KadarObat", false).then(function(data) {
				$scope.listKadarObat = data;
			});




		}
	]);
});