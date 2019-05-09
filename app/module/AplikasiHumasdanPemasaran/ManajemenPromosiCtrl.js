define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('ManajemenPromosiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras){
			$scope.title = "";
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.item.namaFilePks = "aw/aw/aweu"

			$scope.columnJadwal = [
				{
					"field": "tanggal",
					"title": "Tanggal dan Jam"
				},
				{
					"field": "jumlah",
					"title": "Durasi"
				}
			];

			$scope.canEdit = false;

			$scope.tambah = function(){
				// $scope.dat = {
				// 	"tanggal": new Date(),
				// 	"jamBaru": new Date(),
				// 	"durasi": 0
				// };
				$scope.dat = {};
				$scope.canEdit = true;
			}
			$scope.dataJadwal = new kendo.data.DataSource({
				data: [],
				editable: true
			});

			$scope.arrDataJadwal = [];

			$scope.parser = {};
			$scope.edit = function(data){
				if($scope.parser === data) $scope.canEdit = true;
				else {
					$scope.canEdit = false;
					$scope.parser = data;
				}
			}

			ManageSarpras.getListData("JenisMedia&select=id,namaJenisMedia").then(function(data){
				$scope.sourceJenisMedia = data;
				// debugger;
			});

			$scope.selesai = function(dataBaru){
				// var idx = _.indexOf(_.pluck($scope.arrDataJadwal), dataBaru);
				// console.log(idx);
				var HH = dataBaru.tanggal.getHours();
				var mm = dataBaru.tanggal.getMinutes();
				if(HH < 10) HH = "0" + HH;
				if(mm < 10) mm = "0" + mm;
				var newData = {
					"tanggal": DateHelper.getTanggalFormatted(dataBaru.tanggal) + ", Jam " + HH + ":" + mm,
					"jumlah": dataBaru.jumlah
				};
				$scope.dataJadwal.add(newData);
				$scope.arrDataJadwal.push(dataBaru);
				$scope.canEdit = false;
				console.log(JSON.stringify($scope.arrDataJadwal));
			}
			
			$scope.batal = function()
			{
			  $scope.item= {};
			}

			$scope.Save = function(){
				$scope.item.jadwalPromosiSet = $scope.arrDataJadwal;
				ManageSarpras.saveDataSarPras(ModelItem.beforePost($scope.item),"manajemen-promosi/save-manajemen-promosi/").then(function(e){

				});
				// console.log(JSON.stringify($scope.item));
			}
	}])
})