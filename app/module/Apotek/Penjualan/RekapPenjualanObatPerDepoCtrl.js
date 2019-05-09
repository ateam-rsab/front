define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RekapPenjualanObatPerDepoCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Rekap Penjualan Obat Per Depo";
			$scope.dataVOloaded = true;
		}
	]);
}); 