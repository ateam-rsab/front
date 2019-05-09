define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KontraksiHitsCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
		$scope.now = new Date();
		$scope.item = {};
		ModelItem.get("ProgramPerinatologi/KontraksiHits").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
        ModelItem.getDataDummyGeneric("ProgramPerinatologi/AkselerasiRadio", false).then(function(data) {
				$scope.ListAkselerasi = data;
		})

		$scope.Save = function() {
 			console.log(JSON.stringify($scope.item));

        };

		}
	]);
});