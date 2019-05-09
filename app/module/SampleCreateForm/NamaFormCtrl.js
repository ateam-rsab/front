


define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('NamaFormCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.cek = "Berhasil Create Template Form";
			$scope.dataVOloaded = true;
		}
	]);
});