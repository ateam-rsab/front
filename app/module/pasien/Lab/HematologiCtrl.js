define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HematologiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Hematologi";

			$scope.item = {};
			ModelItem.get("Form/Lab/Hematologi").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("Lab/Hematologi_Anemia", false).then(function(data) {
				$scope.listAnemia = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Hematologi_BankDarah", false).then(function(data) {
				$scope.listBankDarah = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Hematologi_Khusus", false).then(function(data) {
				$scope.listKhusus = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Hematologi_Koagulasi", false).then(function(data) {
				$scope.listKoagulasi = data;
			});

			ModelItem.getDataDummyGeneric("Lab/Hematologi_Rutin", false).then(function(data) {
				$scope.listRutin = data;
			});

		}
	]);
});