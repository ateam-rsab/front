define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MasterDefinisiCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Master Definisi Operasional";
			$scope.title2 = "Daftar Definisi Operasional";
			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
				$scope.simpanData = true;
				$scope.cheked = false;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("definisi-operasional/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var definisiOperasional = {
				 		"indikator": e.indikator,
				 		"definisiOperasional": e.definisiOperasional,
				 		"no":i
				 	}
			 	data[i-1]=definisiOperasional
			 	i++;
				});
				$scope.sourceMasterDefinisiOperasional= data;
				// debugger;
			});
			$scope.columnMasterDefinisiOperasional = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "30px",
				"attributes": {align: "center"}
			}, {
				"field": "indikator",
				"title": "<h3 align=center>Indikator</h3>",
				"width": "300px"
			}, {
				"field": "definisiOperasional",
				"title": "<h3 align=center>Definisi</h3>",
				"width": "300px"
			}];
			$scope.SelectGrid=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.definisiOperasional=data.definisiOperasional;
				$scope.simpanData = false;
				$scope.cheked = true;
			};
			$scope.Batal = function(){
				$scope.item.indikator = "";
				$scope.item.definisiOperasional = "";
				$scope.simpanData = true;
				$scope.cheked = false;
			}
			$scope.Save = function(){
            	var data = {
            		"indikator": {
            			"id": $scope.item.indikator.id
            		},
            		"definisiOperasional": $scope.item.definisiOperasional
            	};
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"definisi-operasional/save/").then(function(e) {
            		FindSarpras.getSarpras("definisi-operasional/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var definisiOperasional = {
						 		"definisiOperasional": e.definisiOperasional,
						 		"no":i
						 	}
					 	data[i-1]=definisiOperasional
					 	i++;
						});
						$scope.sourceMasterDefinisiOperasional= data;
						// debugger;
					});
					$scope.Batal();
				});
			};
	}])
})