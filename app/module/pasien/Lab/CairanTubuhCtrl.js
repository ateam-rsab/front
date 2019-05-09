define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CairanTubuhCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "CairanTubuh";
			
			$scope.item = {};
			ModelItem.get("Form/Lab/CairanTubuh").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Lab/CairanTubuh", false).then(function(data) {
				$scope.listCairanTubuh = data;
			});

		}
	]);
});