define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterDaftarMenuCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Gizi/MasterDaftarMenu").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("JenisDiet", true).then(function(data) {
				$scope.listJenisBahanDiet = data;
			})
			ModelItem.getDataDummyGeneric("SatuanPorsi", true).then(function(data) {
				$scope.listSatuanPorsi = data;
			})
			$scope.daftarMenu = new kendo.data.DataSource({
				data: []
			});
			$scope.columnMenu = [
			{
				"field": "jenisDiet",
				"title": "Jenis Diet",
				"width": "15%"
			},
			{
				"field": "namaMenu",
				"title": "Nama Menu",
				"width": "20%"
			},
			{
				"field": "satuanPorsi",
				"title": "Satuan Porsi",
				"width": "10%"
			},
			{
				"field": "jmlPorsi",
				"title": "Jml Porsi",
				"width": "10%"
			},
			{
				"field": "jumlahKh",
				"title": "Jumlah KH",
				"width": "10%"
			},
			{
				"field": "jumlahKalori",
				"title": "Jumlah Kalori",
				"width": "10%"
			},
			{
				"field": "jumlahProtein",
				"title": "Jumlah Protein",
				"width": "10%"
			},
			{
				"field": "jumlahLemak",
				"title": "Jumlah Lemak",
				"width": "10%"
			},
			{
				command: { text: "Hapus", click: $scope.removeMenu },
		        title: "hapus",
		        width: "10%"
			}

			];

			$scope.addMenu = function() {

				// 
				var tempMenu = {
					"jenisDiet":$scope.item.jenisDiet.jenisDiet,
					"namaMenu":$scope.item.namaMenu,
					"satuanPorsi":$scope.item.satuanPorsi.name,
					"jmlPorsi":$scope.item.jmlPorsi,
					"jumlahKh":$scope.item.jumlahKh,
					"jumlahKalori":$scope.item.jumlahKalori,
					"jumlahProtein":$scope.item.jumlahProtein,
					"jumlahLemak":$scope.item.jumlahLemak
				}

				$scope.daftarMenu.add(tempMenu);
			}

			$scope.removeBahanMakanan = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempMenu== $scope.daftarMenu
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			};
		}
	]);
});