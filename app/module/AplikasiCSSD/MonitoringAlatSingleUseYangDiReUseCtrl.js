define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MonitoringAlatSingleUseYangDiReUseCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper){
			$scope.title = "";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.batasPensterilan = [
				{
					"batas": "1",
					"value": 1
				},
				{
					"batas": "2",
					"value": 2
				},
				{
					"batas": "3",
					"value": 3
				}
			];

			$scope.columnUjiVisual = [
			// {
			// 	"template": "<input type=\"checkbox\" class=\"k-checkbox\" name=\"\" id=\"\" value=\"\" ng-click=\"\">",
			// 	width: "50px"
			// },
				{
					"field": "no",
					"title": "No",
					width: "50px"
				},
				{
					"field": "ujiVisual",
					"title": "Uji Visual"
				},
				{
					"field": "hasil",
					"title": "Hasil / Baik",
					"template": '<input type="checkbox" ng-model="dataItem.hasil" ng-change="klik(dataItem)">'
				}
			];

			$scope.sourceRuangan = [
				{
					"id": "1",
					"ruangan": "ANNEX"
				}
			];

			$scope.sourceAlat = [
				{
					"id": "1",
					"name": "Kursi"
				}
			];

			$scope.item = {};

			$scope.sourceUjiVisual = [
				{
					"no": 1,
					"ujiVisual": "Uji Visual",
					"hasil": "hasil baik"
				},
				{
					"no": 2,
					"ujiVisual": "Uji Visual",
					"hasil": "hasil baik"
				}
			];

			$scope.klik = function(idx){
				console.log(JSON.stringify(idx));
			}

			$scope.Save = function(){
				var data = {
					"tanggal": DateHelper.getTanggalFormatted($scope.item.tanggal),
					"idRuangan": $scope.item.ruangan.id,
					"idAlat": $scope.item.namaAlat.id,
					"jumlah": $scope.item.jumlah,
					"batas": $scope.item.batas,
					"catatan": $scope.item.catatan
				}
				console.log(JSON.stringify(data));
			}
	}])
})