define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('PerpektifCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Perspektif";
			$scope.dataVOloaded = true;
			
			FindSarpras.getSarpras("perspektif/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var perspektif = {
				 		"id": e.id,
				 		"jenisIndikator": e.jenisIndikator,
				 		"perspektif": e.perspektif,
				 		"kdPerspektif": e.kdPerspektif,
				 		"no":i
				 	}
				 	data[i-1]=perspektif
				 	i++;
				 });
				 $scope.source = data;

				 $scope.sourcedaftarPerpektif = new kendo.data.DataSource({
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
					"width": "50px",
					"attributes": {align: "center"}
				}, {
					"field": "jenisIndikator.jenisIndikator",
					"title": "<h3 align=center>Jenis Indikator</h3>",
					"width": "200px"
				}, {
					"field": "perspektif",
					"title": "<h3 align=center>Perspektif</h3>",
					"width": "300px"
				}, {
					"field": "kdPerspektif",
					"title": "<h3 align=center>Kode Perspektif</h3>",
					"width": "200px"
	            }]
            };

			FindSarpras.getSarpras("service/list-generic/?view=JenisIndikator&select=id,jenisIndikator").then(function(dat){
				$scope.sourceJenisIndikator= dat;
				// debugger;
			});
			$scope.Select=function(data)
			{	
				console.log(JSON.stringify(data));
				$scope.item.perspektif=data.perspektif;
				$scope.item.jenisIndikator=data.jenisIndikator;
				$scope.item.kodePerspektif=data.kdPerspektif
			};
			$scope.Batal = function(){
				$scope.item.jenisIndikator="";
				$scope.item.perspektif = "";
				$scope.item.kodePerspektif=""
			}

			$scope.Save = function(){
            	var data = {
            		"jenisIndikator":{
            			"id": $scope.item.jenisIndikator.id
            		},
            		"perspektif": $scope.item.perspektif,
            		"kdPerspektif": $scope.item.kodePerspektif
            	};
            	console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(data,"perspektif/save/").then(function(e) {
            		FindSarpras.getSarpras("perspektif/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var perspektif = {
						 		"id": e.id,
						 		"jenisIndikator": e.jenisIndikator,
						 		"perspektif": e.perspektif,
						 		"kdPerspektif": e.kdPerspektif,
						 		"no":i
						 	}
						 	data[i-1]=perspektif
						 	i++;
						 });
						 $scope.sourcedaftarPerpektif = data;
					});
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""
				});
				$scope.Batal();
			};
	}])
})