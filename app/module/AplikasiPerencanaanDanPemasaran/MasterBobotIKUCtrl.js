define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MasterBobotIKUCtrl', ['$rootScope', '$scope', '$state', 'ModelItem','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Master Bobot Indikator";
			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("bobot-indikator/find-all/").then(function(dat){
				var data = []
				var i = 1
				 dat.data.data.forEach(function(e){
				 	var bobotIndikator = {
				 		"bobotIndikator": e.bobotIndikator,
				 		"no":i
				 	}
			 	data[i-1]=bobotIndikator
			 	i++;
				});
				$scope.source= data;
				// debugger;
				$scope.sourceMasterBobotIKU = new kendo.data.DataSource({
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
					"width": "30px",
					"attributes": {align: "center"}
				}, {
					"field": "bobotIndikator",
					"title": "<h3 align=center>Bobot Indikator</h3>",
					"width": "300px"
                }
                ]
            };
			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.bobotIndikator=data.bobotIndikator
			};

			$scope.Batal = function () {
                // debugger;
                $scope.item.bobotIndikator=""
            };
			$scope.Save = function(){
            	var data = {
            		"bobotIndikator": $scope.item.bobotIndikator
            	};
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"bobot-indikator/save/").then(function(e) {
            		FindSarpras.getSarpras("bobot-indikator/find-all/").then(function(dat){
						var data = []
						var i = 1
						 dat.data.data.forEach(function(e){
						 	var bobotIndikator = {
						 		"bobotIndikator": e.bobotIndikator,
						 		"no":i
						 	}
					 	data[i-1]=bobotIndikator
					 	i++;
						});
						$scope.sourceMasterBobotIKU= data;
						// debugger;
					});
					$scope.item.bobotIndikator="";
				});
			};
	}])
})