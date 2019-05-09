define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PeriksaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("LaporanPembedahanInstruksi/InstruksiPascaBedah").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
		}
	]);
});