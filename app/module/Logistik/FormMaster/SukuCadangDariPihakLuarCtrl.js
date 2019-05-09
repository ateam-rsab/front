define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SukuCadangDariPihakLuarCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'DateHelper', '$state', '$mdDialog',
		function($rootScope, $scope, ModelItem, IPSRSService, DateHelper, $state, $mdDialog) {
			$scope.item = data;
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {};
			
		}
		]);
});
