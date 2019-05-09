define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HormonCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Hormon";
			
			$scope.item = {};
			ModelItem.get("Form/Lab/Hormon").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Lab/Hormon_Tiroid", false).then(function(data) {
				$scope.listTiroid = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Hormon_Reproduksi", false).then(function(data) {
				$scope.listReproduksi = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Hormon_Lainlain", false).then(function(data) {
				$scope.listLainlain = data;
			});


		}
	]);
});