define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DetailPengajuanUYHDBPCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
		function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();

			function showButton(){
				$scope.showBtnTutup = true;
				$scope.showBtnVerifikasi = true;
				$scope.showBtnUnverifikasi = true;
			}
			showButton();

		}
		]);
});