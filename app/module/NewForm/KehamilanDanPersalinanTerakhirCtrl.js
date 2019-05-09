define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KehamilanDanPersalinanTerakhirCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			ModelItem.get("NewForm/KehamilanDanPersalinanTerakhir").then(function(data) {
				$scope.item = data;

				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/KehamilanIni", false).then(function(data) {
				$scope.listKehamilanIni = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/UsahaPenguguran", false).then(function(data) {
				$scope.listPenguguran = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/KeadaanSekarang", false).then(function(data) {
				$scope.listKeadaanSekarang = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/ANC", false).then(function(data) {
				$scope.listANC = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/PerawatanPutingSusu", false).then(function(data) {
				$scope.listPerawatanPutingSusu = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/KelainanPayudara", false).then(function(data) {
				$scope.listKelainanPayudara = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/TempatPersalinan", false).then(function(data) {
				$scope.listTempatPersalinan = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/CaraLahir", false).then(function(data) {
				$scope.listCaraLahir = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/SkorApgar", false).then(function(data) {
				$scope.listSkorApgar = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/JumlahBayi", false).then(function(data) {
				$scope.listJumlahBayi = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/RawatGabung", false).then(function(data) {
				$scope.listRawatGabung = data;
			})
			ModelItem.getDataDummyGeneric("KehamilanDanPersalinanTerakhir/MinumanBayi", false).then(function(data) {
				$scope.listMinumanBayi = data;
			})
			$scope.showPenguguran = false;
			$scope.$watch('item.Penguguran', function(newValue, oldValue) {
				if (newValue == "ada, dengan cara") {
					$scope.showPenguguran = true;
				} else {
					$scope.showPenguguran = false;
				}
			});
			$scope.showMasihHamil = false;
			$scope.showTanggalMelahirkan = false;
			$scope.$watch('item.KeadaanSekarang', function(newValue, oldValue) {
				if (newValue == "masih hamil") {
					$scope.showMasihHamil = true;
					$scope.showTanggalMelahirkan = false;
				} 
				else if(newValue == "sudah melahirkan") {
					$scope.showMasihHamil = false;
					$scope.showTanggalMelahirkan = true;
				}
				else{
					$scope.showMasihHamil = false;
					$scope.showTanggalMelahirkan = false;

				}
			});
			$scope.showANC = false;
			$scope.$watch('item.ANC', function(newValue, oldValue) {
				if (newValue == "ya") {
					$scope.showANC = true;
				} else {
					$scope.showANC = false;
				}
			});
			$scope.showAdaKelainanPayudara = false;
			$scope.$watch('item.KelainanPayudara', function(newValue, oldValue) {
				if (newValue == "ada, usaha perbaikan") {
					$scope.showAdaKelainanPayudara = true;
				} else {
					$scope.showAdaKelainanPayudara = false;
				}
			});
			$scope.showRS = false;
			$scope.showLainLain = false;
			$scope.$watch('item.TempatPersalinan', function(newValue, oldValue) {
				if (newValue == "RS") {
					$scope.showRS = true;
					$scope.showLainLain = false;
				} 
				else if(newValue == "lain-lain") {
					$scope.showRS = false;
					$scope.showLainLain = true;
				}
				else{
					$scope.showRS = false;
					$scope.showLainLain = false;

				}
			});
			$scope.showSkorApgar = false;
			$scope.$watch('item.SkorApgar', function(newValue, oldValue) {
				if (newValue == "tahu") {
					$scope.showSkorApgar = true;
				} else {
					$scope.showSkorApgar = false;
				}
			});
			$scope.showAlasanRawatGabung = false;
			$scope.$watch('item.RawatGabung', function(newValue, oldValue) {
				if (newValue == "tidak") {
					$scope.showAlasanRawatGabung = true;
				} else {
					$scope.showAlasanRawatGabung = false;
				}
			});
			$scope.showJumlahBayi = false;
			$scope.$watch('item.JumlahBayi', function(newValue, oldValue) {
				if (newValue == "kembar") {
					$scope.showJumlahBayi = true;
				} else {
					$scope.showJumlahBayi = false;
				}
			});
		}
	]);
});