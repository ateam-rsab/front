define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PemeriksaanFisikAnastesiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','GetPostOnPengkajianAwal',
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
			
			
		
			
			
			
			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listApproval = data;
			})
			
			ModelItem.getDataDummyGeneric("Agama", false).then(function(data) {
				$scope.listAgama = data;
			})
			
			ModelItem.getDataDummyGeneric("GolonganDarah", false).then(function(data) {
				$scope.listgoldar = data;
			})
			
			ModelItem.getDataDummyGeneric("JenisKelamin", false).then(function(data) {
				$scope.listkelamin = data;
			})
			
			ModelItem.getDataDummyGeneric("Jabatan", false).then(function(data) {
				$scope.listjabatan = data;
			})
			
			ModelItem.getDataDummyGeneric("Negara", false).then(function(data) {
				$scope.listNegara = data;
			})
			
			
			ModelItem.getDataDummyGeneric("Pendidikan", false).then(function(data) {
				$scope.listPendidikan = data;
			})
			
			
			ModelItem.getDataDummyGeneric("Eselon", false).then(function(data) {
				$scope.listEselon = data;
			})
			
			
				ModelItem.getDataDummyGeneric("StatusPerkawinan", false).then(function(data) {
				$scope.listStatusPerkawinan = data;
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