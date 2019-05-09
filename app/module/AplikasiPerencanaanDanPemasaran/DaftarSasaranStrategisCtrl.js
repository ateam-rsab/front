define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarSasaranStrategisCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Daftar Sasaran Strategis";
			ModelItem.get("PerencanaanDanPemasaran/DaftarAnalisaSwot").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.awal= new Date($scope.now).getFullYear();
				$scope.item.akhir= $scope.item.awal+4
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}
			
			$scope.search = function(){
				var awal =  $scope.item.awal;
				var akhir = $scope.item.akhir+1;
				var url = "awalPeriode=" + awal + "&akhirPeriode=" + akhir;
				// debugger;
				FindSarpras.getSarpras("sasaran-strategis/find-all/?" + url).then(function(dat){
					var data = []
					var i = 1
					dat.data.data.forEach(function(e){
					 	var sasaranStrategis = {
					 		"sasaranStrategis": e.sasaranStrategis,
					 		"awalPeriode": e.awalPeriode,
					 		"akhirPeriode": e.akhirPeriode,
					 		"no":i
					 	}
				 	data[i-1]=sasaranStrategis
				 	i++;
					});
				    $scope.sourceDaftarSasaranStrategis = data;
				    debugger;
				});
			};

			FindSarpras.getSarpras("sasaran-strategis/find-all/?").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var sasaranStrategis = {
				 		"sasaranStrategis": e.sasaranStrategis,
				 		"awalPeriode": e.awalPeriode,
				 		"akhirPeriode": e.akhirPeriode,
				 		"no":i
				 	}
			 	data[i-1]=sasaranStrategis
			 	i++;
				});
			   $scope.sourceDaftarSasaranStrategis = data;
				    // debugger;
			});
			$scope.columndaftarSasaranStrategis = [
			{
				"field": "no",
				"title": "<h3 align=center>No</h3>",
				"width": "30px",
				"attributes": {align: "center"}
			}, {
				"field": "sasaranStrategis",
				"title": "<h2 align=center>Sasaran Strategis</h2>",
				"width": "300px"
			}, {
				"field": "awalPeriode",
				"title": "<h3 align=center>Awal<br>Periode</h3>",
				"width": "50px",
				"attributes": {align: "center"}
			}, {
				"field": "akhirPeriode",
				"title": "<h3 align=center>Akhir<br>Periode</h3>",
				"width": "50px",
				"attributes": {align: "center"}
			}];
	}])
})