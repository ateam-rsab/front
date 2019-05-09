
define(['initialize'], function(initialize) {
	
	'use strict';
	initialize.controller('FormPertamaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Page Form Pertama";
			$scope.dataVOloaded = true;

			// TextInput Conntroller
			$scope.item = {};
			ModelItem.get("Sample/TextInput").then(function(data) {
				$scope.item = data;
				
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			// Radio Button
			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listYaTidak = data;
			})

			// Combo box
			ModelItem.getDataDummyGeneric("DataPenyakitMayor", true).then(function(data) {
				$scope.listPenyakitMayor = data;
			})

			//Check box
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