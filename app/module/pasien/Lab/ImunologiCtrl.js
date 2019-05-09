define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ImunologiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Imunologi";
			
			$scope.item = {};
			ModelItem.get("Form/Lab/Imunologi").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Lab/Imunologi", false).then(function(data) {
				$scope.listImunologi = data;
			});
		}
	]);
});