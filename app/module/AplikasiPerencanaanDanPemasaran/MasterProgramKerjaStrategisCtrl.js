define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MasterProgramKerjaStrategisCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Master Program Kerja Strategis";
			ModelItem.get("PerencanaanDanPemasaran/Master").then(function(data) {
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("master-program-kerja-strategis/find-all/").then(function(dat){
				 var data = []
					 var i = 1
					 dat.data.data.forEach(function(e){
					 	var programKerja = {
					 		"programKerjaStrategis": e.programKerjaStrategis,
					 		"no":i
					 	}
				 	data[i-1]=programKerja
				 	i++;
					});
				$scope.source= data;
				// debugger;
				$scope.sourceMasterProgramKerjaStrategis = new kendo.data.DataSource({
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
					"field": "programKerjaStrategis",
					"title": "<h3 align=center>Program Kerja Strategis</h3>",
					"width": "500px"
                }
                ]
            };

			$scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.programKerjaStrategis=data.programKerjaStrategis
			};
			$scope.Batal = function(){
				$scope.item.programKerjaStrategis = ""
			}
			$scope.Save = function(){
            	var data = {
            		"programKerjaStrategis": $scope.item.programKerjaStrategis
            	};
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"master-program-kerja-strategis/save/").then(function(e) {
            		$scope.item = {};
				});
			};
	}])
})