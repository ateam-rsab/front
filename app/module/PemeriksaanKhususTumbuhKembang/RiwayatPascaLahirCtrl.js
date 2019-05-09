define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatPascaLahirCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
		function($rootScope, $scope, ModelItem, $state) {
			$scope.title = "Riwayat Pasca Lahir";
			$scope.item = {};
			
			ModelItem.get("RiwayatPascaLahir").then(function(data) {
				$scope.item = data;
				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});

			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function (data) {
				$scope.statYaTidak = data;
			})

            ModelItem.getDataDummyGeneric("StatusBagianTubuh", false).then(function (data) {
				$scope.statBagianTubuh = data;
			})

			
			
			$scope.Save = function() {
				
				console.log(JSON.stringify($scope.item));

				// $scope.item.dataRiwayat = $scope.datariwayat;
				// if($scope.item.RiwayatDalamKeluarga == "Tidak")
				// {
				// 	$scope.item.PenyakitMayor = "";
				// }  
				// var dataVO = delete $scope.item.attributes;
				// console.log(JSON.stringify($scope.item));
				// //kirim data inputan dari frontend ke server
				// GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/PatologiAnatomik")
				// .then(function(res) {},function(err) {/*alert(err.data);*/})
			};
		}
	]);
});