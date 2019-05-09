define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MasterFormulaRensarCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Master Formula";
			$scope.title2 = "Daftar Formula";
			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("formula/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var formula = {
				 		"definisiOperasional": e.definisiOperasional,
				 		"formula": e.formula,
				 		"no":i
				 	}
			 	data[i-1]=formula
			 	i++;
				});
				$scope.SourceMasterFormulaRensar= data;
				// debugger;
			});
			$scope.columnSourceMasterFormulaRensar = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "30px",
				"attributes": {align: "center"}
			}, {
				"field": "definisi",
				"title": "<h3 align=center>Definisi Operasional</h3>",
				"width": "300px"
			}, {
				"field": "formula",
				"title": "<h3 align=center>Formula</h3>",
				"width": "300px"
			}];
			$scope.SelectGrid=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.definisiOperasional=data.definisiOperasional,
				$scope.item.formula=data.formula
			};
			$scope.Batal = function(){
				$scope.item.definisiOperasional ="",
				$scope.item.formula =""
			}
			$scope.Save = function(){
            	var data = {
            		"definisi": {
            			"id": $scope.item.definisiOperasional.id
            		},
            		"formula": $scope.item.formula
            	};
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"formula/save/").then(function(e) {
            		FindSarpras.getSarpras("formula/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var formula = {
						 		"formula": e.formula,
						 		"no":i
						 	}
					 	data[i-1]=formula
					 	i++;
						});
						$scope.sourceMasterFormula= data;
						// debugger;
					});
					$scope.Batal();
				});
			};
	}])
})