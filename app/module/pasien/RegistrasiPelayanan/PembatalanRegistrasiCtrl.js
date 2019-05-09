define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PembatalanRegistrasiCtrl', ['$rootScope', '$scope', 'ModelItem', 
        function($rootScope, $scope, ModelItem) {
        	$scope.title = "Pembatalan Registrasi";
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.showGridData=true;
			$scope.item = {}; 
			$scope.now = new Date();

			ModelItem.get("Sample/PembatalanRegistrasi").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});


        }
    ]);
});
  