define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LembarKonsultasiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("LembarKonsultasi/LembarKonsultasi").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("LembarKonsultasi/NamaDokter", true).then(function(data) {
				$scope.listNamaDokter = data;
			})
		}
	]);
});