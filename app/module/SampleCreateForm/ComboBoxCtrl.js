define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ComboBoxCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Page Combo Box";
			$scope.dataVOloaded = true;

			$scope.item = {};
			ModelItem.get("Sample/ComboBox").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("DataPenyakitMayor", true).then(function(data) {
				$scope.listPenyakitMayor = data;
			})

		}
	]);
});