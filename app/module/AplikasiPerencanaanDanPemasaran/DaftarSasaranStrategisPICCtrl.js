define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarSasaranStrategisPICCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.title = "Daftar Sasaran StrategisPIC";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};

			FindSarpras.getSarpras("dokumen-internal/get-dokumen-by").then(function(dat){
				$scope.sourceDaftarSuratMasuk= dat.data;
				// debugger;
			});	
			$scope.daftarSasaranStrategisPIC  = new kendo.data.DataSource({
				data: []
			});
			$scope.columndaftarSasaranStrategisPIC = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "50px"
			}, {
				"field": "SasaranStrategis",
				"title": "<h3 align=center>Sasaran Strategis</h3>",
				"width": "200px"
			}, {
				"field": "IndikatorKinerjaUtama",
				"title": "<h3 align=center>Indikator Kinerja Utama</h3>",
				"width": "200px"
			}, {
				"field": "bobot",
				"title": "<h3 align=center>Bobot<h3>",
				"width": "100px"
			}, {
				"field": "satuan",
				"title": "<h3 align=center>Satuan<h3>",
				"width": "100px"
			}, {
				"field": "periodeTahun",
				"title": "<h3 align=center>Periode Tahun<h3>",
				"width": "150px"
			}];

	}])
})