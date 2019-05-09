define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SitogenetikaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Sitogenetika";
			
			$scope.item = {};
			ModelItem.get("Form/Lab/Sitogenetika").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Lab/Sitogenetika_AnalisaKromoson", false).then(function(data) {
				$scope.listAnalisaKromoson = data;
			});

			

		}
	]);
});