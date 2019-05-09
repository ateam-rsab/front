define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatAsupanMakanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function($rootScope, $scope, ModelItem, $state) {
			$scope.title = "Riwayat Asupan Makan";
			$scope.item = {};
			
			ModelItem.get("RiwayatPascaLahir").then(function(data) {
				$scope.item = data;
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function (data) {
				$scope.statYaTidak = data;
			})

            ModelItem.getDataDummyGeneric("StatusMendapatIMD", false).then(function (data) {
				$scope.statMendapatIMD = data;
			})

			ModelItem.getDataDummyGeneric("ListKeteranganASI", false).then(function (data) {
				$scope.listASI = data;
			})
			
			$scope.Save = function() {
				debugger
				$scope.item.mendapatIMD={id:parseInt($scope.item.mendapatIMD)};
				$scope.item.listASI={id:parseInt($scope.item.listASI)};
				console.log(JSON.stringify($scope.item));

			};
		}
	]);
});