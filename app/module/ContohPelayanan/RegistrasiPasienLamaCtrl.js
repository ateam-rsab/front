
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RegistrasiPasienLamaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Silahkan Masukan Data Pasien";
			
			$scope.item = {};
			/*ModelItem.get("ContohPelayanan/PasienLama").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});*/

		}
	]);
});