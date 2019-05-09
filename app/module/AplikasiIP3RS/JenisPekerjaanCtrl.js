define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('JenisPekerjaanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("IPSRS/JenisPekerjaan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
		}
	]);
});