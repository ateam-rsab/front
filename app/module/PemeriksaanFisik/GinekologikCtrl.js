define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('GinekologikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','GetPostOnPengkajianAwal',
		function($rootScope, $scope, ModelItem, $state,GetPostOnPengkajianAwal) {
			$scope.title = "Tanda Vital";
			
			
			 $scope.isShowForm = false;
			
			$scope.isAdaGangguan = false;
			$scope.$watch('item.Genetalia', function(newValue, oldValue) {
			  if(newValue == "Ya")
			  {
			  	$scope.isAdaGangguan = true;
			  }
			  else
			  {
			  	$scope.isAdaGangguan = false;
			  }
			});
			




			$scope.item = {};
			ModelItem.get("PatalogiAnatomik").then(function(data) {
				$scope.item = data;

				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});
			





















			ModelItem.getDataDummyGeneric("StatusMikroskopik", false).then(function(data) {
				$scope.listStatusMikroskopik = data;
			})
			
			
			ModelItem.getDataDummyGeneric("StatusPengambilan", false).then(function(data) {
				$scope.listStatusPengambilan = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusGinekologik", false).then(function(data) {
				$scope.listStatusGinekologik = data;
			})
			
			
			ModelItem.getDataDummyGeneric("StatusFiksasi", false).then(function(data) {
				$scope.listStatusFiksasi = data;
			})
			
			
			
			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listStatusYaTidak = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusImageGawatDarurat", false).then(function(data) {
				$scope.listStatusImageGawatDarurat = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusBawa", false).then(function(data) {
				$scope.listStatusBawa = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusKesadaran", false).then(function(data) {
				$scope.listStatusKesadaran = data;
			})
			
				ModelItem.getDataDummyGeneric("StatusJalanNapas", false).then(function(data) {
				$scope.listStatusJalanNapas = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusPernapasan", false).then(function(data) {
				$scope.listStatusPernapasan= data;
			})
			
			
			ModelItem.getDataDummyGeneric("StatusSirkulasi", false).then(function(data) {
				$scope.listStatusSirkulasi= data;
			})
			
			
				ModelItem.getDataDummyGeneric("StatusKelamin", false).then(function(data) {
				$scope.listKelamin = data;
			})
			
			
			ModelItem.getDataDummyGeneric("StatusPasien", false).then(function(data) {
				$scope.listStatusPasien = data;
			})
			
			
			
			
			ModelItem.getDataDummyGeneric("StatusKontras", false).then(function(data) {
				$scope.listStatusKontras = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusNonKontras", false).then(function(data) {
				$scope.listStatusNonKontras = data;
			})
            
			ModelItem.getDataDummyGeneric("StatusScan", false).then(function(data) {
				$scope.listStatusScan= data;
			})
			
			ModelItem.getDataDummyGeneric("StatusBrain", false).then(function(data) {
				$scope.listStatusBrain= data;
			})
			
			ModelItem.getDataDummyGeneric("StatusPenunjang", false).then(function(data) {
				$scope.listStatusPenunjang= data;
			})
			
			
			$scope.now = new Date();
			
			$scope.Save = function() {
				$scope.item.dataRiwayat = $scope.datariwayat;

				if($scope.item.RiwayatDalamKeluarga == "Tidak")
				{
					$scope.item.PenyakitMayor = "";
				}  

				var dataVO = delete $scope.item.attributes;
				console.log(JSON.stringify($scope.item));

				//kirim data inputan dari frontend ke server
				GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/PatologiAnatomik")
				.then(
					function(res) {

					},
					function(err) {
						/*alert(err.data);*/
					})
			};
			
			
			

		}
	]);
});