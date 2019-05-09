define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BiopsiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state','GetPostOnPengkajianAwal',
		function($rootScope, $scope, ModelItem, $state,GetPostOnPengkajianAwal) {
			$scope.title = "Tanda Vital";
			
			
		
			
	ModelItem.getDataDummyGeneric("Diagnosa", false).then(function(data) {
				$scope.listStatusDiagnosa = data;
			})		
			
			
			
	ModelItem.getDataDummyGeneric("StatusMikroskopik", false).then(function(data) {
				$scope.listStatusMikroskopik = data;
			})
			
			$scope.now = new Date();
			
	    $scope.item = {};
			ModelItem.get("Biopsi").then(function(data) {
				$scope.item = data;

				$rootScope.dataVOloaded = true;
			}, function errorCallBack(err) {
			});
			
			$scope.Save = function() {
				$scope.item.dataRiwayat = $scope.datariwayat;

				if($scope.item.RiwayatDalamKeluarga == "Tidak")
				{
					$scope.item.PenyakitMayor = "";
				}  

				var dataVO = delete $scope.item.attributes;
				console.log(JSON.stringify($scope.item));

				//kirim data inputan dari frontend ke server
				GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/Biopsi")
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