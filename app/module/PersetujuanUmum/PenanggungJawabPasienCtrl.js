define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenanggungJawabPasienCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Selamat Datang di Rumah Sakit Harapan Kita";	
			$scope.item = {};
			$scope.dataVOloaded = true;
			ModelItem.get("PersetujuanUmum/PenanggungJawabPasien").then(function(data) {
				$scope.item = data;

			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("PersetujuanUmum/Pekerjaan", true).then(function(data) {
				$scope.listDataPekerjaan = data;


			})
			$scope.Save = function() {
						
				console.log(JSON.stringify($scope.item));
				alert("Data Berhasil DiSimpan");

				$scope.item.Nama="";
				$scope.item.Pekerjaan="";
				$scope.item.Alamat="";
				$scope.item.NoTelp="";


			}
		}
	]);
});