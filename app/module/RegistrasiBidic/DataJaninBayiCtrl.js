define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DataJaninBayiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Data Janin / Bayi / Anak";
			ModelItem.get("RegistrasiBidic/DataJaninBayi").then(function(data) {
			$scope.dataVOloaded = true;
			$scope.item = data;
			

			










				$scope.now = new Date();


				})

			ModelItem.get("RegistrasiBidic/RegistrasiBidic").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
				}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("RegistrasiBidic/HasilPersalinan", true).then(function(data) {
				$scope.listHasilPersalinan = data;
			})
			ModelItem.getDataDummyGeneric("RegistrasiBidic/CheckEstimasiUmur", false).then(function(data) {
				$scope.listEstimasi = data;

			})
			ModelItem.getDataDummyGeneric("RegistrasiBidic/PengambilanFoto", false).then(function(data) {
				$scope.listPengambilanFoto = data;
			})
			ModelItem.getDataDummyGeneric("RegistrasiBidic/HubunganDarah", false).then(function(data) {
				$scope.listHubunganDarah = data;
			})
			ModelItem.getDataDummyGeneric("RegistrasiBidic/Autopsi", false).then(function(data) {
				$scope.listAutopsi = data;
			})
			ModelItem.getDataDummyGeneric("RegistrasiBidic/JenisKelaminBayi", true).then(function(data) {
				$scope.listJenisKelaminBayi = data;
			})
			ModelItem.getDataDummyGeneric("RegistrasiBidic/DataKelurahan", true).then(function(data) {
				$scope.listDataKelurahan = data;
			})
			ModelItem.getDataDummyGeneric("RegistrasiBidic/DataKecamatan", true).then(function(data) {
				$scope.listDataKecamatan = data;
			})
			ModelItem.getDataDummyGeneric("RegistrasiBidic/LahirKembar", false).then(function(data) {
				$scope.listLahirKembar = data;
			})
			ModelItem.getDataDummyGeneric("RegistrasiBidic/BayiMeninggal", false).then(function(data) {
				$scope.listBayiMeninggal = data;
			})


			// menampilkan combobox ketika di klik detail
			 $scope.alamatDetailIsShow=false;
			 $scope.showAlamatDetail = function() {
                if ($scope.alamatDetailIsShow) {
                    $scope.alamatDetailIsShow = false;
                } else {
                    $scope.alamatDetailIsShow = true;
                }
            }


			
		
		}
	]);
});