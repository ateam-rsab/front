define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarMappingDOCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};

			$scope.title = "Daftar Mapping DO (Definisi Operasional)";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			
			FindSarpras.getSarpras("mapping-do/find-all/").then(function(dat){
				 var data = []
				 var i = 1
				 dat.data.data.forEach(function(e){
				 	var mappingDO = {
				 		"id": e.id,
				 		"indikatorKinerjaUtama": e.indikatorKinerjaUtama,
				 		"definisiOperasional": e.definisiOperasional,
				 		"formula": e.formula,
				 		"no":i
				 	}
				 	data[i-1]=mappingDO
				 	i++;
				 });
				 $scope.sourceDaftarMappingDO = data;
				 // debugger;
			});	
			// $scope.daftarDiagramTows  = new kendo.data.DataSource({
			// 	data: []
			// });
			$scope.columnDaftarMappingDO = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "50px"
			}, {
				"field": "indikatorKinerjaUtama.indikatorKinerjaUtama",
				"title": "<h3 align=center>Indikator (IKU)</h3>",
				"width": "400px"
			}, {
				"field": "definisiOperasional.definisiOperasional",
				"title": "<h3 align=center>Definisi Operasional (DO)<h3>",
				"width": "600px"
			}, {
				"field": "formula.formula",
				"title": "<h3 align=center>Formula<h3>",
				"width": "400px"
			}];
	}])
})