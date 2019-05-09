define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RadioButtonCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Page Radio Button";
			$scope.dataVOloaded = true;

			$scope.item = {};
			ModelItem.get("Sample/RadioButton").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listYaTidak = data;
			})
		}
	]);
});