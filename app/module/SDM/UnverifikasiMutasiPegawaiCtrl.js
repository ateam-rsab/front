define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('UnverifikasiMutasiPegawai', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.item = data;
			$scope.now = new Date();
			$scope.dataVOloaded = true;
		}
		]);
});