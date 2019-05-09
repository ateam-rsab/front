 define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterKomponenCtrl', ['$rootScope', '$scope', 'ModelItem','ManagePasien',
		function($rootScope, $scope, ModelItem, ManagePasien) {
			ModelItem.get("PengajuanUsulan/MasterKomponen").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.simpan = function() {
				ManagePasien.saveMasterKomponen(ModelItem.beforePost($scope.item)).then(function(e) {
				});
			};
		}
	]);
});