define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('ProgramKerjaStrategisCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Program Kerja Strategis";
			$scope.titled = "Daftar Program Kerja Strategis";
			ModelItem.get("PerencanaanDanPemasaran/programKerjaStrategis").then(function(data) {
				$scope.item = data;
				$scope.item.total = 0;
				$scope.now = new Date();
				$scope.item.periode= new Date($scope.now).getFullYear();
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindSarpras.getSarpras("service/list-generic/?view=SasaranStrategis&select=id,sasaranStrategis").then(function(dat){
				$scope.sourcedaftarSasaranStrategiss= dat;
				// debugger;
			});
			FindSarpras.getSarpras("service/list-generic/?view=MasterProgramKerjaStrategis&select=id,programKerjaStrategis").then(function(dat){
				$scope.sourceMasterProgramKerjaStrategis= dat.data;
				// debugger;
			});
			$scope.tahun = function(){
				$scope.item.periode= $scope.item.periode.getFullYear();
			}
			$scope.Batal = function(){
				$scope.item.sasaranStrategis = "";
				$scope.item.programKerjaStrategis = "";
			}
			$scope.Save = function(){
            	var data = {
            		"periode": $scope.item.periode,
            		"sasaranStrategis": {
            			"id": $scope.item.sasaranStrategis.id
            		},
            		"programKerja": {
            			"id": $scope.item.programKerjaStrategis.id
            		}
            	};
            	// debugger;
            	console.log(JSON.stringify(data)); 
				ManageSarpras.saveSarpras(data,"program-kerja-strategis/save/").then(function(e) {
				});
				$scope.Batal();
			};
			//grid

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
				$scope.source= data;
				// debugger;
				$scope.sourceDaftarProgramKerjaStrategis = new kendo.data.DataSource({
    				pageSize: 10,
    				data:$scope.source
				});
				// debugger;
			})
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
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
	            }]
            };
            $scope.Select=function(data)
			{
				console.log(JSON.stringify(data));
				$scope.item.sasaranStrategis=data.sasaranStrategis
				$scope.item.programKerjaStrategis=data.programKerja
			};
			// });	
			// $scope.columnDaftarProgramKerjaStrategis = [
			// {
			// 	// "field": "new Date(periode).getFullYear()",
			// 	"field": "periode",
			// 	"title": "<h3 align=center>Periode Tahun<h3>",
			// 	"width": "100px"
			// }, {
			// 	"field": "sasaranStrategis.sasaranStrategis",
			// 	"title": "<h3 align=center>Sasaran Strategis</h3>",
			// 	"width": "200px"
			// }, {
			// 	"field": "programKerja.programKerjaStrategis",
			// 	"title": "<h3 align=center>Program Kerja Strategis Tiap Tahun<h3>",
			// 	"width": "300px"
			// }];
	}])
})