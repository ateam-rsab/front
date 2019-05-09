define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LembarDisposisiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope, ModelItem, DateHelper,FindSarpras, ManageSarpras) {
			ModelItem.get("Ketatausahaan/Disposisi").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.tambah1=true;
			$scope.Tambah1 = function() {

				$scope.tambah2 = true;
				$scope.kepada2 = true;
				$scope.label2 = true;
				$scope.pegawai2 = true;
				$scope.tambah1 = false;
				
            };
            $scope.Tambah2 = function() {

				$scope.tambah3 = true;
				$scope.kepada3 = true;
				$scope.label3 = true;
				$scope.pegawai3 = true;
				$scope.tambah2 = false;

            };
            $scope.Tambah3 = function() {

				$scope.tambah4 = true;
				$scope.kepada4 = true;
				$scope.label4 = true;
				$scope.pegawai4 = true;
				$scope.tambah3 = false;

            };
            $scope.Tambah4 = function() {
            	$scope.kepada5 = true;
				$scope.label5 = true;
				$scope.pegawai5 = true;
				$scope.tambah4 = false;
			};
		}
	]);
});