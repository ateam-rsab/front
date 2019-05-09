define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterAgamaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Master/MasterAgama").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
		}
	]);
});