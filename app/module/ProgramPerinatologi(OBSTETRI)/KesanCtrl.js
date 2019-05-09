define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KesanCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
		$scope.now = new Date();
		$scope.item = {};
		ModelItem.get("ProgramPerinatologi/Kesan").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
        ModelItem.getDataDummyGeneric("ProgramPerinatologi/AkselerasiRadio", false).then(function(data) {
				$scope.ListAkselerasi = data;
		})
		ModelItem.getDataDummyGeneric("ProgramPerinatologi/Radio_1", false).then(function(data) {
			$scope.ListRadio_1 = data;
		})

		$scope.Save = function() {
 			console.log(JSON.stringify($scope.item));

        };

		}
	]);
});