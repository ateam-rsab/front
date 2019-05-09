define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterSiklusMenuCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Gizi/MasterSiklusMenu").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.daftarSiklus = new kendo.data.DataSource({
				data: []
			});
			$scope.columnSiklus = [
			{
				"field": "kodeSiklus",
				"title": "Kode Siklus",
				"width": "10%"
			},
			{
				"field": "namaSiklus",
				"title": "Nama Siklus",
				"width": "30%"
			},
			{
				"field": "jmlHariSiklus",
				"title": "Jumlah Hari",
				"width": "10%"
			},
			{
				"field": "deskripsi",
				"title": "Deskripsi",
				"width": "30%"
			},
			{
				"field": "statusAktif",
				"title": "Status Aktif",
				"width": "10%"
			},
			{
				command: { text: "Hapus", click: $scope.removeSiklus },
		        title: "hapus",
		        width: "10%"
			}

			];

			$scope.addSiklus = function() {

				// 
				var tempSiklus = {
					"kodeSiklus":$scope.item.kodeSiklus,
					"namaSiklus":$scope.item.namaSiklus,
					"jmlHariSiklus":$scope.item.jmlHariSiklus,
					"deskripsi":$scope.item.deskripsi
				}

				$scope.daftarSiklus.add(tempSiklus);
			}

			$scope.removeSiklus = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempSiklus== $scope.daftarSiklus
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			};
		}
	]);
});