define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KebiasaanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
		$scope.now = new Date();
		$scope.item = {};
		ModelItem.get("FormulirPraAnastesiSedasi/Kebiasaan").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
		ModelItem.getDataDummyGeneric("DiagnosaTindakan", true).then(function(data) {
			$scope.ListDiagnosa = data;
        })
        ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listYaTidak = data;
		})

		$scope.Save = function() {
 			console.log(JSON.stringify($scope.item));

        };

		}
	]);
});