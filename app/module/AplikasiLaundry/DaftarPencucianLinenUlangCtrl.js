define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPencucianLinenUlangCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
		$scope.item = {};
		$scope.daftarPencucianLinenUlang = new kendo.data.DataSource({
			data: [
					{ 
						"jenisLinen":"Warna",
						"jumlah":"1",
						"noMesin":"5",
						"kapasitas":"10",
						"namaBahan":"MD. Pine",
						"jumlah":"320",
						"satuan":"ML",
						"status":"Cuci Ulang"
					},
					{ 
						"jenisLinen":"Warna",
						"jumlah":"1",
						"noMesin":"5",
						"kapasitas":"10",
						"namaBahan":"MD. Pine",
						"jumlah":"320",
						"satuan":"ML",
						"status":"Cuci Ulang"
					}

				]
			});
			$scope.columndaftarPencucianLinenUlang = [{
				"field": "jenisLinen",
				"title": "<h3 align=center>Jenis Linen</h3>",
				"width": "100px"
			}, {
				"field": "jumlah",
				"title": "<h3 align=center>Jumlah</h3>",
				"width": "100px"
			},{
				"field": "noMesin",
				"title": "<h3 align=center>No. Mesin</h3>",
				"width": "100px"
			}, {
				"field": "kapisitas",
				"title": "<h3 align=center>Kapasitas</h3>",
				"width": "100px"
			},{
				"field": "namaBahan",
				"title": "<h3 align=center>Nama Bahan</h3>",
				"width": "200px"
			}, {
				"field": "jumlah",
				"title": "<h3 align=center>Jumlah</h3>",
				"width": "100px"
			},{
				"field": "satuan",
				"title": "<h3 align=center>Satuan</h3>",
				"width": "100px"
			}, {
				"field": "status",
				"title": "<h3 align=center>Status</h3>",
				"width": "200px"
		    }];

		}
	]);
});