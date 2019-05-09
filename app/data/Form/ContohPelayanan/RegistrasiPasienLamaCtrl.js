
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RegistrasiPasienLamaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Silahkan Masukan Data Pasien";
			$scope.dataVOloaded = true;
		}
	]);
});