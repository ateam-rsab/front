define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MikrobiologiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Mikrobiologi";
			
			$scope.item = {};
			ModelItem.get("Form/Lab/Mikrobiologi").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Lab/Mikrobiologi_BiakanResistensiBahan", false).then(function(data) {
				$scope.listBiakanResistensiBahan = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Mikrobiologi_Mikroskopik", false).then(function(data) {
				$scope.listMikroskopik = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Mikrobiologi_PCR", false).then(function(data) {
				$scope.listPCR = data;
			});

		}
	]);
});