define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KajiMedisCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
    	function($rootScope, $scope, ModelItem, $state) {
	        var isNotClick = true;
			$scope.noCM = $state.params.noCM;
			$rootScope.showMenuDetail = false;
			$scope.item = {};

			$scope.title = "page pengkajian Awal Pasien Rawat Jalan Anak - Catatan";
			$rootScope.showMenuPengkajianMedis = false;
            $rootScope.showMenu = true;
            $scope.pasien = {};

			$scope.item = {};
			ModelItem.get("PengkajianAwalMedis").then(function(data) {
				$scope.item = data;

				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});
            
			$scope.now = new Date();
		
			ModelItem.getDataDummyGeneric("StatusBayi", false).then(function(data) {
				$scope.listStatusBayi = data;
			})
			
				ModelItem.getDataDummyGeneric("StatusLahir", false).then(function(data) {
				$scope.listStatusLahir = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusKehamilan", false).then(function(data) {
				$scope.listStatusKehamilan = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusResusitasi", false).then(function(data) {
				$scope.listStatusResusitasi = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusNormalAbnormal", false).then(function(data) {
				$scope.listStatusNormalAbnormal = data;
			})


			$scope.Save = function() {
                debugger;
            }
			
    }]);
});
