define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MasterIndikatorCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Master Indikator";
			$scope.title2 = "Daftar Indikator";
			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("service/list-generic/?view=JenisIndikator&select=id,jenisIndikator").then(function(dat){
				$scope.sourceJenisIndikator= dat;
				// debugger;
			});
			$scope.IDPerspektif=function(){
				var ID = $scope.item.jenisIndikator.id;
				var url = "jenisIndikatorId=" + ID;
				// debugger;
				FindSarpras.getSarpras("perspektif/find-all/?"+url).then(function(dat){
					$scope.sourcePerspektif= dat.data.data;
				// debugger;
				});
			}
			$scope.IDSasaran=function(){
				var ID2 = $scope.item.perspektif.id;
				var url2 = "perspektifId=" + ID2;
				// debugger;
				FindSarpras.getSarpras("sasaran-strategis/find-all/?"+url2).then(function(dat){
					$scope.sourcedaftarSasaranStrategis= dat.data.data;
				// debugger;
				});
			}
			// FindSarpras.getProgramKerjaStrategis("service/list-generic/?view=SasaranStrategis&select=id,sasaranStrategis").then(function(dat){
			// 	$scope.sourcedaftarSasaranStrategis= dat;
			// 	// debugger;
			// });

			FindSarpras.getSarpras("indikator-rensar/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var indikator = {
				 		"sasaranStrategis": e.sasaranStrategis,
				 		"indikator": e.indikator,
				 		"definisiOperasional": e.definisiOperasional,
				 		"formula": e.formula,
				 		"no":i
				 	}
			 	data[i-1]=indikator
			 	i++;
				});
				$scope.source= data;
				// debugger;
				$scope.sourceMasterIndikator = new kendo.data.DataSource({
    				pageSize: 5,
    				data:$scope.source
				});
				// debugger;
			})
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:true,
                columns: [{
                    "field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "50px",
					"attributes": {align: "center"}
				}, {
					"field": "sasaranStrategis.sasaranStrategis",
					"title": "<h3 align=center>Sasaran Strategis</h3>",
					"width": "300px"
				}, {
					"field": "indikator",
					"title": "<h3 align=center>Indikator</h3>",
					"width": "300px"
				}, {
					"field": "definisiOperasional",
					"title": "<h3 align=center>Definisi Operasional</h3>",
					"width": "700px"
				}, {
					"field": "formula",
					"title": "<h3 align=center>Formula</h3>",
					"width": "500px"
	                }]
            };
			
			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.jenisIndikator=data.sasaranStrategis.perspektif.jenisIndikator
				var ID = $scope.item.jenisIndikator.id;
				var url = "jenisIndikatorId=" + ID;
				// debugger;
				FindSarpras.getSarpras("perspektif/find-all/?"+url).then(function(dat){
					$scope.sourcePerspektif= dat.data.data;
					$scope.item.perspektif=data.sasaranStrategis.perspektif
					var ID2 = $scope.item.perspektif.id;
					var url2 = "perspektifId=" + ID2;
					FindSarpras.getSarpras("sasaran-strategis/find-all/?"+url2).then(function(dat){
						$scope.sourcedaftarSasaranStrategis= dat.data.data;
					$scope.item.sasaranStrategis=data.sasaranStrategis
					});
				});
				$scope.item.indikator=data.indikator
				$scope.item.definisiOperasional=data.definisiOperasional
				$scope.item.formula=data.formula
				debugger;
			};
			$scope.Batal = function(){
				$scope.item.jenisIndikator="",
				$scope.item.perspektif="",
				$scope.item.sasaranStrategis="",
				$scope.item.indikator="",
				$scope.item.definisiOperasional="",
				$scope.item.formula=""
			}
			$scope.Save = function(){
            	var data = {
            		"sasaranStrategis":{
            			"id": $scope.item.sasaranStrategis.id
            		},
            		"indikator": $scope.item.indikator,
            		"definisiOperasional": $scope.item.definisiOperasional,
            		"formula": $scope.item.formula
            	};
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"indikator-rensar/save/").then(function(e) {
            		FindSarpras.getSarpras("indikator-rensar/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var indikator = {
						 		"sasaranStrategis": e.sasaranStrategis,
						 		"indikator": e.indikator,
						 		"definisiOperasional": e.definisiOperasional,
						 		"formula": e.formula,
						 		"no":i
						 	}
					 	data[i-1]=indikator
					 	i++;
						});
						$scope.sourceMasterIndikator= data;
						// debugger;
					});
					$scope.Batal();
				});
			};
	}])
})