define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DiagramTowsCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Daftar Diagram Tows";

			ModelItem.get("PerencanaanDanPemasaran/DiagramTows").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("service/list-generic/?view=TOWS&select=id,jenisTOWS").then(function(dat){
				$scope.sourceDaftarTows= dat;
			});
			$scope.Save = function(){
            	var data = {
            		"tows": {
            			"id": $scope.item.jenisDiagramTows.id
            		},
            		"input": $scope.item.input
            	};
            	console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(ModelItem.beforePost(data),"tows/save/").then(function(e) {
				});
				$scope.item = {};
			};
			$scope.Batal = function(){
				$scope.item.jenisDiagramTows="",
				$scope.item.input=""
			}
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
				 $scope.source = data;

				 $scope.sourceDaftarDiagramTows = new kendo.data.DataSource({
    				pageSize: 10,
    				data:$scope.source
				});
				// debugger;
			})
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
                    "field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "20px",
					"attributes": {align:"center"}
				}, {
					"field": "tows.jenisTOWS",
					"title": "<h3 align=center>Jenis Diagram Tows</h3>",
					"width": "40px"
				}, {
					"field": "input",
					"title": "<h3 align=center>Input<h3>",
					"width": "500px"
		        }]
            };
			// });	
			// // $scope.daftarDiagramTows  = new kendo.data.DataSource({
			// // 	data: []
			// // });
			// $scope.columndaftarDiagramTows = [
			// {
			// 	"field": "no",
			// 	"title": "<h3 align=center>No<h3>",
			// 	"width": "20px",
			// 	"attributes": {align:"center"}
			// }, {
			// 	"field": "tows.jenisTOWS",
			// 	"title": "<h3 align=center>Jenis Diagram Tows</h3>",
			// 	"width": "100px"
			// }, {
			// 	"field": "input",
			// 	"title": "<h3 align=center>Input<h3>",
			// 	"width": "300px"
			// }];

			$scope.select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.jenisDiagramTows=data.tows,
				$scope.item.input=data.input
				// debugger;
			};
	}])
})