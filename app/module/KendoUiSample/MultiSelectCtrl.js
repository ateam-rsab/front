define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MultiSelectCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Page Check Box";
			
			//$scope.selectedHobi = [];
			$scope.listHobis = [
				{ "id": "1", "namaExternal": "Basket" },
				{ "id": "2", "namaExternal": "Futsal" },
				{ "id": "3", "namaExternal": "Badminton" },
				{ "id": "4", "namaExternal": "Tenis" },
				{ "id": "5", "namaExternal": "Renang" },
				{ "id": "6", "namaExternal": "Billyard" },
				{ "id": "7", "namaExternal": "Voli" },
				{ "id": "8", "namaExternal": "Sepak Takraw" }
					
			]

			$scope.listHobi = new kendo.data.DataSource({
						data: $scope.listHobis,
						
					});

			
			$scope.Save = function(){
				console.log(JSON.stringify($scope.selectedHobi));
			}

		}
	]);
});