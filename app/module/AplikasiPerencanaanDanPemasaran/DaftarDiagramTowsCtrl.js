define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarDiagramTowsCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};

			$scope.title = "Daftar Diagram Tows";
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
			$scope.columndaftarDiagramTows = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "20px",
				"attributes": {align:"center"}
			}, {
				"field": "tows.jenisTOWS",
				"title": "<h3 align=center>Jenis Diagram Tows</h3>",
				"width": "70px"
			}, {
				"field": "input",
				"title": "<h3 align=center>Input<h3>",
				"width": "300px"
			}];
	}])
})