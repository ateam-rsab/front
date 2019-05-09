define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatPenyakitCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
		$scope.now = new Date();
		$scope.item = {};
		ModelItem.get("FormulirPraAnastesiSedasi/RiwayatPenyakit").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
        ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listYaTidak = data;
		})

		$scope.Save = function() {
 			console.log(JSON.stringify($scope.item));

        };

		}
	]);
});