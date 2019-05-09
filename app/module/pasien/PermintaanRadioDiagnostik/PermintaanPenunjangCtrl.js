define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PermintaanPenunjangCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "PermintaanPenunjang";
			
			$scope.item = {};
			ModelItem.get("Form/PermintaanRadioDiagnostik/PermintaanRadioDiagnostik").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("PermintaanRadioDiagnostik/DataPermintaanPenunjang", false).then(function(data) {
				$scope.listPermintaanPenunjang = data;
			});

		}
	]);
});