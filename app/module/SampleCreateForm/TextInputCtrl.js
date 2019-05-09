define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TextInputCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Page Text Input";

			$scope.item = {};
			ModelItem.get("Sample/TextInput").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
		}
	]);
});