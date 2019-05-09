define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ReservasiPasienCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Selamat Datang di Rumah Sakit Harapan Kita";
			$scope.dataVOloaded = true;
		}
	]);
});