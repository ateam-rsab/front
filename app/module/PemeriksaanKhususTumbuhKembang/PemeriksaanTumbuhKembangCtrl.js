define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PemeriksaanTumbuhKembangCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','ManagePasien',
		function($rootScope, $scope, ModelItem, $state, managePasien) {
			$scope.title = "Pemeriksaan Tumbuh Kembang";
			$scope.item = {};
			
			ModelItem.get("PemeriksaanTumbuhKembang").then(function(data) {
				$scope.item = data;
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

			ModelItem.getDataDummyGeneric("KeadaanUmumPemeriksaanTumbuhKembang", false).then(function (data) {
				$scope.statKeadaanUmum = data;
			})

            ModelItem.getDataDummyGeneric("KontakInterpersonal", false).then(function (data) {
				$scope.statKontakInterpersonal = data;
			})

			ModelItem.getDataDummyGeneric("Keaktifan", false).then(function (data) {
				$scope.statKeaktifan = data;
			})

            ModelItem.getDataDummyGeneric("PerkembanganPsikomotor", false).then(function (data) {
				$scope.perkembanganPsikomotor = data;
			})

            ModelItem.getDataDummyGeneric("Kepala", false).then(function (data) {
				$scope.statKepala = data;
			})

            ModelItem.getDataDummyGeneric("Wajah", false).then(function (data) {
				$scope.statWajah = data;
			})
			
			$scope.Save = function() {
				debugger
				
				$scope.item.kepalaUbunUbunBesar={id:parseInt($scope.item.kepalaUbunUbunBesar)};
				$scope.item.wajah={id:parseInt($scope.item.wajah)};
				$scope.item.keaktifan={id:parseInt($scope.item.keaktifan)};
				$scope.item.kontakInterpersonal={id:parseInt($scope.item.kontakInterpersonal)};
				$scope.item.kondisiUmum={id:parseInt($scope.item.kondisiUmum)};
				if($scope.item.keteranganWajah===undefined)
					$scope.item.keteranganWajah="";
				//console.log(JSON.stringify($scope.item));
				managePasien.savePemeriksaanTumbuhKembang(ModelItem.beforePost($scope.item)).then(function() {
					debugger
				}, function(err) {debugger});
			};
		}
	]);
});