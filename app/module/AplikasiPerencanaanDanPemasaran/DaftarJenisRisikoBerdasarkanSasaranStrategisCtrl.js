define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarJenisRisikoBerdasarkanSasaranStrategisCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Daftar Jenis Resiko Berdasarkan Sasaran Strategis";
			ModelItem.get("PerencanaanDanPemasaran/DaftarAnalisaSwot").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.periode= new Date($scope.now).getFullYear();
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			FindSarpras.getSarpras("jenis-risiko-sasaran-strategis/find-all/").then(function(dat){
				 var data = []
				 var i = 1
				 dat.data.data.forEach(function(e){
				 	var jenisRisiko = {
						"sasaranStrategis": e.sasaranStrategis,
						"risiko": e.risiko,
				 		"no":i
				 	}
			 	data[i-1]=jenisRisiko
			 	i++;
				});
				$scope.source = data;
				// debugger;
				$scope.sourceDaftarJenisRisiko = new kendo.data.DataSource({
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
					"width": "30px",
					"attributes": {align: "center"}
				},{
					"field": "sasaranStrategis.sasaranStrategis",
					"title": "<h3 align=center>Sasaran Strategis<h3>",
					"width": "300px"
				}, {
					"field": "risiko.risiko",
					"title": "<h3 align=center>Risiko</h3>",
					"width": "300px"
			    }]
            };
			// });

			// // FindSarpras.getSasaranStrategis("sasaran-strategis/get-sasaran-strategis-by").then(function(dat){
			// // 	$scope.sourcedaftarSasaranStrategiss= dat.data;
			// // 	// debugger;
			// // });
			// $scope.columnDaftarJenisRisiko = [
			// {
			// 	"field": "no",
			// 	"title": "<h3 align=center>No<h3>",
			// 	"width": "30px",
			// 	"attributes": {align: "center"}
			// },{
			// 	"field": "sasaranStrategis.sasaranStrategis",
			// 	"title": "<h3 align=center>Sasaran Strategis<h3>",
			// 	"width": "300px"
			// }, {
			// 	"field": "risiko.risiko",
			// 	"title": "<h3 align=center>Risiko</h3>",
			// 	"width": "300px"
			// }];
		}
	])
})