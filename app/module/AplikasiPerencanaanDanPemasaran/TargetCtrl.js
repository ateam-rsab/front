define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('TargetCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.title = "Target";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};

			FindSarpras.getSarpras("dokumen-internal/get-dokumen-by").then(function(dat){
				$scope.sourceDaftarSuratMasuk= dat.data;
				// debugger;
			});	
			$scope.daftarTarget  = new kendo.data.DataSource({
				data: []
			});
			$scope.columndaftarTarget = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "50px"
			}, {
				"field": "tahun",
				"title": "<h3 align=center>Tahun</h3>",
				"width": "150px"
			}, {
				"field": "target",
				"title": "<h3 align=center>Target<h3>",
				"width": "150px"
			}, {
				"field": "realisasi",
				"title": "<h3 align=center>Realisasi<h3>",
				"width": "200px"
			}];

	}])
})