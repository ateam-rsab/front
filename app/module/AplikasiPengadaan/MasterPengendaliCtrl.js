define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterPengendaliCtrl', ['$rootScope', '$scope', 'ModelItem','ManagePasien',
		function($rootScope, $scope, ModelItem, ManagePasien) {
			ModelItem.get("PengajuanUsulan/MasterPengendali").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.simpan = function() {
				ManagePasien.saveMasterPengendali(ModelItem.beforePost($scope.item)).then(function(e) {
				});
			};
			
		}
	]);
});