define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterBahanMakananCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Gizi/MasterBahanMakanan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("JenisDiet", true).then(function(data) {
				$scope.listJenisBahanDiet = data;
			})
			ModelItem.getDataDummyGeneric("SatuanHasil", true).then(function(data) {
				$scope.listSatuan = data;
			})
			$scope.daftarBahanMakanan = new kendo.data.DataSource({
				data: []
			});
			$scope.columnBahanMakanan = [
			{
				"field": "namaBahanDiet",
				"title": "Nama Bahan Diet",
				"width": "20%"
			},
			{
				"field": "spesifikasiBahanDiet",
				"title": "Spesifikasi Bahan Diet",
				"width": "20%"
			},
			{
				"field": "jenisBahanDiet",
				"title": "Jenis Bahan Diet",
				"width": "15%"
			},
			{
				"field": "satuan",
				"title": "Satuan",
				"width": "10%"
			},
			{
				"field": "jmlKemasan",
				"title": "Jml Kemasan",
				"width": "15%"
			},
			{
				"field": "jmlTerkecil",
				"title": "Jml Terkecil",
				"width": "15%"
			},
			{
				"field": "statusAktif",
				"title": "Status Aktif",
				"width": "15%"
			},
			{
				command: { text: "Hapus", click: $scope.removeBahanMakanan },
		        title: "hapus",
		        width: "10%"
			}

			];

			$scope.addBahanMakanan = function() {

				// 
				var tempBahanMakanan = {
					"namaBahanDiet" : $scope.item.namaBahanDiet,
					"spesifikasiBahanDiet": $scope.item.spesifikasiBahanDiet,
					"jenisBahanDiet": $scope.item.jenisBahanDiet.jenisDiet,
					"satuan": $scope.item.satuan.satuanHasil,
					"jmlKemasan": $scope.item.jmlKemasan,
					"jmlTerkecil": $scope.item.jmlTerkecil
				}

				$scope.daftarBahanMakanan.add(tempBahanMakanan);
			}

			$scope.removeBahanMakanan = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempBahanMakanan== $scope.daftarBahanMakanan
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			};
		}
	]);
});