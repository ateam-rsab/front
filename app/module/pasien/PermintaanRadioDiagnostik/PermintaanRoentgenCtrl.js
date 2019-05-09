define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PermintaanRoentgenCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Permintaan Roentgen";
			
			$scope.item = {};
			ModelItem.get("Form/PermintaanRadioDiagnostik/PermintaanRoentgen").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("PermintaanRadioDiagnostik/DataPermintaanRoentgen_PemeriksaanKontras", false).then(function(data) {
				$scope.listPemeriksaanKontras = data;
			});

			ModelItem.getDataDummyGeneric("PermintaanRadioDiagnostik/DataPermintaanRoentgen_PemeriksaanNonKontras", false).then(function(data) {
				$scope.listPemeriksaanNonKontras = data;
			});

		}
	]);
});