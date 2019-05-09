define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarProgramKerjaStrategisCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.title = "Daftar Program Kerja Strategis";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};
			$scope.item.awal=$scope.now;
			$scope.item.akhir=$scope.now;

			FindSarpras.getSarpras("program-kerja-strategis/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var tows = {
				 		"id": e.id,
				 		"periode": e.periode,
				 		"sasaranStrategis": e.sasaranStrategis,
				 		"programKerja": e.programKerja
				 	}
				 	data[i-1]=tows
				 	i++;
				 });
				$scope.sourceDaftarProgramKerjaStrategis= data;
				// debugger;
			});	
			$scope.columnDaftarProgramKerjaStrategis = [
			{
				// "field": "new Date(periode).getFullYear()",
				"field": "periode",
				"title": "<h3 align=center>Periode Tahun<h3>",
				"width": "100px"
			}, {
				"field": "sasaranStrategis.sasaranStrategis",
				"title": "<h3 align=center>Sasaran Strategis</h3>",
				"width": "200px"
			}, {
				"field": "programKerja.programKerjaStrategis",
				"title": "<h3 align=center>Program Kerja Strategis Tiap Tahun<h3>",
				"width": "300px"
			}];

	}])
})