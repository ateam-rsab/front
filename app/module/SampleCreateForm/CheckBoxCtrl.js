define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('CheckBoxCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Page Check Box";
			$scope.dataVOloaded = true;

			$scope.item = {};
			ModelItem.get("Sample/CheckBox").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.arrKarateristikNyeri = [];
			$scope.cekArrKarateristikNyeri = function(listId) {
				var idx = $scope.arrKarateristikNyeri.indexOf(listId);

				// is currently selected
				if (idx > -1) {
					$scope.arrKarateristikNyeri.splice(idx, 1);
				}

				// is newly selected
				else {
					$scope.arrKarateristikNyeri.push(listId);
				}


				console.log('list arrKarateristikNyeri : ' + $scope.arrKarateristikNyeri);
			};
			
			ModelItem.getDataDummyGeneric("DataKarateristikNyeri", false).then(function(data) {
				$scope.listKarateristikNyeri = data;
			});
		}
	]);
});