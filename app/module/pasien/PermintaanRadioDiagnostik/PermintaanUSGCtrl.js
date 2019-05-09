define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PermintaanUSGCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Permintaan USG";
			
			$scope.item = {};
			ModelItem.get("Form/PermintaanRadioDiagnostik/PermintaanUSG").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("PermintaanRadioDiagnostik/DataPermintaanUSG", false).then(function(data) {
				$scope.listPermintaanUSG = data;
			});

		}
	]);
});