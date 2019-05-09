define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('SterilisasiAlatEksternalCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.item = {},
			$scope.cycle = [
				{
					"id": "1",
					"jmlCycle": "1"
				},
				{
					"id": "2",
					"jmlCycle": "2"
				},
				{
					"id": "3",
					"jmlCycle": "3"
				}
			];

			$scope.satuan = [
				{
					"id": "1",
					"satuan": "Cycle"
				}
			];

			$scope.metode = [
				{
					"id": "1",
					"satuan": "Suhu Tinggi"
				},
				{
					"id": "2",
					"satuan": "Suhu Rendah"
				}
			];

			$scope.item.hargaPerCycle = "Rp. " + 500000;
			$scope.item.hargaTotal = "Rp. " + 500000;

			$scope.Save = function(){
				var data = {
					"alatEksternal": $scope.item.alatEksternal,
					"jmlCycle": $scope.item.jmlCycle.jmlCycle,
					"idSatuan": $scope.item.satuan.id,
					"idMetode": $scope.item.metode.id,
					"hargaPerCycle": $scope.item.hargaPerCycle,
					"hargaTotal": $scope.item.hargaTotal
				}

				console.log(JSON.stringify(data));
			}
	}])
})