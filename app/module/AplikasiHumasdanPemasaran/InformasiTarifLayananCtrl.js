define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InformasiTarifLayananCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.DaftarKeterangan = new kendo.data.DataSource({
				data: [
				{ 
					"keterangan" : "Karcis/Pemeriksaan Rawat Jalan",
					"tarif":"25.000"
				}
				]
			});
			$scope.columnDaftarKeterangan = [
			{
				"field": "keterangan",
				"title": "<h3 align=center>Keterangan</h3>",
				"width": "200px"
			},
			{
				"field": "tarif",
				"title": "<h3 align=center>Tarif</h3>",
				"width": "100px"
			}
			];

			$scope.DaftarKelas = new kendo.data.DataSource({
				data: [
				{ 
					"kelas" : "Akomodasi",
					"III":"100.000",
					"II":"150.000",
					"I":"250.000",
					"VIP":"350.000",
				},
				{ 
					"kelas" : "Visite",
					"III":"15.000",
					"II":"40.000",
					"I":"60.000",
					"VIP":"100.000",
				}
				]
			});
			$scope.columnDaftarKelas = [
			{
				"field": "kelas",
				"title": "<h3 align=center>Uraian/ Kelas</h3>",
				"width": "200px"
			},
			{
				"field": "III",
				"title": "<h3 align=center>III</h3>",
				"width": "100px"
			},
			{
				"field": "II",
				"title": "<h3 align=center>II</h3>",
				"width": "100px"
			},
			{
				"field": "I",
				"title": "<h3 align=center>I</h3>",
				"width": "100px"
			},
			{
				"field": "VIP",
				"title": "<h3 align=center>VIP</h3>",
				"width": "100px"
			}
			];

		}
	]);
});