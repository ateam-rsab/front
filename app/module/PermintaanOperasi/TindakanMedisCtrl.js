define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TindakanMedisCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.cek = "TindakanMedisCtrl";
			$scope.dataVOloaded = true;

			var arrColumnTindakanMedis = [{
				"field": "kodeTindakan",
				"title": "kodeTindakan",
                "width": 200
			}, {
				"field": "tindakan",
				"title": "Tindakan",
                "width": 600
			}];
			
			ModelItem.getGridOption("Apotek/Penjualan/DataEntryResep", arrColumnTindakanMedis).then(function(data) {
				$scope.mainGridOptions = data;
			})
		}
	]);
});