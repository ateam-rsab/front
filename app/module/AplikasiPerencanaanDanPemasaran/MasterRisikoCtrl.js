define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MasterRisikoCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Master Risiko";
			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("risiko/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var risiko = {
				 		"risiko": e.risiko,
				 		"no":i
				 	}
			 	data[i-1]=risiko
			 	i++;
				});
				$scope.source= data;
				// debugger;
				$scope.sourceMasterResiko = new kendo.data.DataSource({
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
					"title": "<h3 align=center>No</h3>",
					"width": "10px",
					"attributes": {align: "center"}
				}, {
					"field": "risiko",
					"title": "<h3 align=center>Risiko</h3>",
					"width": "600px"
                }
                ]
            };
			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.risiko=data.risiko
			};
			$scope.Batal=function(){
				$scope.item.risiko="";
			}
			$scope.Save = function(){
            	var data = {
            		"risiko": $scope.item.risiko
            	};
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"risiko/save/").then(function(e) {
            		FindSarpras.getSarpras("risiko/find-all/").then(function(dat){
						var data = []
						var i = 1
						dat.data.data.forEach(function(e){
						 	var risiko = {
						 		"risiko": e.risiko,
						 		"no":i
						 	}
					 	data[i-1]=risiko
					 	i++;
						});
						$scope.sourceMasterResiko= data;
						// debugger;
					});
					$scope.item.resiko="";
				});
			};
	}])
})