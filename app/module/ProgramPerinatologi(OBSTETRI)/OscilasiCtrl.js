define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('OscilasiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
		$scope.now = new Date();
		$scope.item = {};
		ModelItem.get("ProgramPerinatologi/Oscilasi").then(function(data) {
			$scope.item = data;
			$scope.dataVOloaded = true;
		}, function errorCallBack(err) {});
		ModelItem.getDataDummyGeneric("ProgramPerinatologi/VariabilitasRadio", false).then(function(data) {
			$scope.ListVariabilitas = data;
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