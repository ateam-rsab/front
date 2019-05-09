
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KeteranganAnastesiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.cek = "KeteranganAnastesiCtrl";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
		}
	]);
});