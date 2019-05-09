define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarTingkatRisikoCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};

			$scope.title = "Daftar Tingkat Resiko";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			
			FindSarpras.getSarpras("tows/find-all/").then(function(dat){
				 var data = []
				 var i = 1
				 dat.data.data.forEach(function(e){
				 	var tows = {
				 		"id": e.id,
				 		"tows": e.tows,
				 		"input": e.input,
				 		"no":i
				 	}
				 	data[i-1]=tows
				 	i++;
				 });
				 $scope.sourceDaftarDiagramTows = data;
			});	
			// $scope.daftarDiagramTows  = new kendo.data.DataSource({
			// 	data: []
			// });
			$scope.columndaftarTingkatResiko = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "50px"
			}, {
				"field": "sasaranStrategis",
				"title": "<h3 align=center>Sasaran Strategis</h3>",
				"width": "200px"
			}, {
				"field": "resiko",
				"title": "<h3 align=center>Resiko<h3>",
				"width": "200px"
			}, {
				"field": "kemungkinanResiko",
				"title": "<h3 align=center>Kemungkinan Resiko<br>Terjadi<h3>",
				"width": "200px"
			}, {
				"field": "DampakResiko",
				"title": "<h3 align=center>Dampak Resiko<h3>",
				"width": "200px"
			}, {
				"field": "tingkatResiko",
				"title": "<h3 align=center>Tingkat Resiko<h3>",
				"width": "200px",
			}, {
				"field": "warna",
				"title": "<h3 align=center>Warna<h3>",
				"width": "200px"
			}, {
				"field": "rencanaMitigasi",
				"title": "<h3 align=center>Rencana Mitigasi Resiko<h3>",
				"width": "200px"
			}, {
				"field": "penggungjawab",
				"title": "<h3 align=center>Penanggung Jawab<h3>",
				"width": "200px"
			}];
	}])
})