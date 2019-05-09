define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RadiologiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function($rootScope, $scope, ModelItem, $state) {
			$scope.title = "Tanda Vital";
			
			
			
			
			
			ModelItem.getDataDummyGeneric("StatusUsg", false).then(function(data) {
				$scope.listStatusUsg = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusKontras", false).then(function(data) {
				$scope.listStatusKontras = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusNonKontras", false).then(function(data) {
				$scope.listStatusNonKontras = data;
			})
            
			ModelItem.getDataDummyGeneric("StatusScan", false).then(function(data) {
				$scope.listStatusScan= data;
			})
			
			ModelItem.getDataDummyGeneric("StatusBrain", false).then(function(data) {
				$scope.listStatusBrain= data;
			})
			
			ModelItem.getDataDummyGeneric("StatusPenunjang", false).then(function(data) {
				$scope.listStatusPenunjang= data;
			})
			
			
			$scope.now = new Date();
			
			
			
			

		}
	]);
});