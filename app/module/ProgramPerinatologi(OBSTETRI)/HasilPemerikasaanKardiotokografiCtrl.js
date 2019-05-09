define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HasilPemerikasaanKardiotokografiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
		$scope.now = new Date();
		$scope.item = {};
		ModelItem.get("ProgramPerinatologi/Kardiotokografi").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
		ModelItem.getDataDummyGeneric("ProgramPerinatologi/nstRadio", false).then(function(data) {
			$scope.ListNST = data;
        })
        ModelItem.getDataDummyGeneric("ProgramPerinatologi/AkselerasiRadio", false).then(function(data) {
				$scope.ListAkselerasi = data;
		})

		$scope.Save = function() {
 			console.log(JSON.stringify($scope.item));

        };

		}
	]);
});