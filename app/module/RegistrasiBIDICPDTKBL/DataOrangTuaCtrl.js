define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DataOrangTuaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("RegistrasiBIDICPDTKBL/DataOrangTua").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("Suku", true).then(function(data) {
				$scope.listSuku = data;
			})
			ModelItem.getDataDummyGeneric("Pekerjaan", true).then(function(data) {
				$scope.listPekerjaan = data;
			})
			ModelItem.getDataDummyGeneric("StatusMasuk", false).then(function(data) {
				$scope.listStatusMasuk = data;
			})
			ModelItem.getDataDummyGeneric("StatusKeluar", false).then(function(data) {
				$scope.listStatusKeluar = data;
			})
			$scope.alamatDetailIsShow = false;
			$scope.showHIdeAlamatDetail = function() {
                if ($scope.alamatDetailIsShow) {
                    $scope.alamatDetailIsShow = false;
                } else {
                    $scope.alamatDetailIsShow = true;
                }
            }
            $scope.alamatDetailIsShow1 = false;
			$scope.showHIdeAlamatDetail1 = function() {
                if ($scope.alamatDetailIsShow1) {
                    $scope.alamatDetailIsShow1 = false;
                } else {
                    $scope.alamatDetailIsShow1 = true;
                }
            }
            $scope.isRujukanDari = false;
			$scope.$watch('item.StatusMasuk', function(newValue, oldValue) {
				if (newValue == "Rujukan Dari") {
					$scope.isRujukanDari = true;
				} else {
					$scope.isRujukanDari = false;
				}
			});
		}
	]);
});