define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PerencanaanAnastesiSedasiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','GetPostOnPengkajianAwal',
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
			
			ModelItem.getDataDummyGeneric("StatusRegional", false).then(function(data) {
				$scope.listRegional = data;
			})
			
			
				ModelItem.getDataDummyGeneric("StatusTekhnikKhusus", false).then(function(data) {
				$scope.listTekhnikKhusus = data;
			})
			
				ModelItem.getDataDummyGeneric("StatusMonitoring", false).then(function(data) {
				$scope.listMonitoring = data;
			})
			
			
				ModelItem.getDataDummyGeneric("StatusAlatKhusus", false).then(function(data) {
				$scope.listAlatKhusus = data;
			})
			
			ModelItem.getDataDummyGeneric("StatusPascaAnestesi", false).then(function(data) {
				$scope.listPascaAnestesi = data;
			})
			
			
			ModelItem.getDataDummyGeneric("DataKajianSistem", false).then(function(data) {
				$scope.listKajianSistem = data;
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