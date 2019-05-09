define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InformasiJadwalPoliklinikCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.DaftarInformasiJadwalPoliklinik = new kendo.data.DataSource({
				data: [
				{ 
					"namaDokter" : "",
					"hari":"",
					"jamPraktik":""
				},
				{ 
					"namaDokter" : "",
					"hari":"",
					"jamPraktik":""
				}
				]
			});
			$scope.columnDaftarInformasiJadwalPoliklinik = [
			{
				"field": "namaDokter",
				"title": "<h3 align=center>Nama Dokter</h3>",
				"width": "200px"
			},
			{
				"field": "hari",
				"title": "<h3 align=center>Hari</h3>",
				"width": "100px"
			},
			{
				"field": "jamPraktik",
				"title": "<h3 align=center>Jam Praktek</h3>",
				"width": "100px"
			}
			];

		}
	]);
});