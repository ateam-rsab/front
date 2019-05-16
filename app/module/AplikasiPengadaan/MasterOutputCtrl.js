 define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterOutputCtrl', ['$rootScope', '$scope', 'ModelItem','ManagePasien',
		function($rootScope, $scope, ModelItem, ManagePasien) {
			ModelItem.get("PengajuanUsulan/MasterOutput").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.simpan = function() {
				ManagePasien.saveMasterOutput(ModelItem.beforePost($scope.item)).then(function(e) {
				});
			};
		}
	]);
});