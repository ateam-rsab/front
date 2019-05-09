define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SerologiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Serologi";
			
			$scope.item = {};
			ModelItem.get("Form/Lab/Serologi").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Lab/Serologi_Hepatitis", false).then(function(data) {
				$scope.listHepatitis= data;
			});

			ModelItem.getDataDummyGeneric("Lab/Serologi_SkriningHIV", false).then(function(data) {
				$scope.listSkriningHIV = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Serologi_Torch", false).then(function(data) {
				$scope.listTorch = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Serologi_Umum", false).then(function(data) {
				$scope.listUmum = data;
			});

		}
	]);
});