define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TumorMarkerCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "TumorMarker";
			
			$scope.item = {};
			ModelItem.get("Form/Lab/TumorMarker").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Lab/TumorMarker", false).then(function(data) {
				$scope.listTumorMarker = data;
			});

		}
	]);
});