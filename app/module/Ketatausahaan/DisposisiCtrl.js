define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DisposisiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Ketatausahaan/Disposisi").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

		}
		]);
});