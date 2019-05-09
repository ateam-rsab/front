define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('FormKalibrasiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("IPSRS/FormKalibrasi").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.listSukuCadang = [
					{"id":1, "name":"Suku Cadang"},
					{"id":2, "name":"Tidak Dengan Suku Cadang"}
				];
				$scope.showSukuCadang = false;
				$scope.$watch('item.sukuCadang', function(newValue, oldValue) {
					if (newValue == "Suku Cadang") {
						$scope.showSukuCadang = true;
					} else {
						$scope.showSukuCadang = false;
					}
				});
				$scope.listStatusPengerjaan = [
					{"id":0, "statusPengerjaan":"Belum dikerjakan"},
					{"id":1, "statusPengerjaan":"Sedang dikerjakan"},
					{"id":2, "statusPengerjaan":"Sudah dikerjakan"}
				]
			}, function errorCallBack(err) {});
		}
	]);
});