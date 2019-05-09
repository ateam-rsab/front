define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("NewForm/Riwayat").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
				$scope.listYaTidak = data;
			})
			ModelItem.getDataDummyGeneric("StatusPemeriksaanKehamilan", false).then(function(data) {
				$scope.listPemeriksaanKehamilan = data;
			})
			ModelItem.getDataDummyGeneric("PemeriksaanKehamilan", false).then(function(data) {
				$scope.listPemeriksaKehamilan = data;
			})
			ModelItem.getDataDummyGeneric("KebiasaanIbu", false).then(function(data) {
				$scope.listKebiasaanIbu = data;
			})
			$scope.arrkebiasaanIbu = [];
			$scope.cekArrkebiasaanIbu = function(data) {
				$scope.item.CheckBox = $scope.arrkebiasaanIbu; 
				var isExist = _.find($scope.arrkebiasaanIbu, function(dataExist){ return dataExist == data; });

				if(isExist == undefined)
				{
					$scope.arrkebiasaanIbu.push(data);
				}
				else
				{
					$scope.arrkebiasaanIbu = _.without($scope.arrkebiasaanIbu, data);
				}
			
				console.log('list kebiasaanIbu : ' + JSON.stringify($scope.arrkebiasaanIbu));
				var islainlain = _.find($scope.arrkebiasaanIbu, function(arr){ return arr.name  == "Menggunakan Obat"; });
				if (islainlain) {
					$scope.showObatDigunakan = true;
				}else {
					$scope.showObatDigunakan = false;
				}

			};
			$scope.showTextArea = false;
			$scope.$watch('item.RiwayatKeguguran', function(newValue, oldValue) {
				if (newValue == "Ya") {
					$scope.showTextArea = true;
				} else {
					$scope.showTextArea = false;
				}
			});
		}
	]);
});