define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PembatalanPerjanjianCtrl', ['$rootScope', '$scope', 'ModelItem', 
        function($rootScope, $scope, ModelItem) {
        	$scope.title = "Pembatalan Perjanjian";
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.showGridData=true;
			$scope.item = {}; 
			$scope.now = new Date();

			ModelItem.get("Sample/PembatalanPerjanjian").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});


        }
    ]);
});
  