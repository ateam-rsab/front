define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TanggalJadwalCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("IPSRS/TanggalJadwal").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
		}
	]);
});