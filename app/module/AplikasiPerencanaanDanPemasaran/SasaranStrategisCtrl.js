define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('SasaranStrategisCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Sasaran Strategis";
			$scope.titled = "Daftar Sasaran Strategis";
			
			ModelItem.get("PerencanaanDanPemasaran/SasaranStrategis").then(function(data) {
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
			// FindSarpras.getProgramKerjaStrategis("service/list-generic/?view=Perspektif&select=id,perspektif").then(function(dat){
			// 	$scope.sourcePerspektif= dat;
			// 	// debugger;
			// });
			FindSarpras.getSarpras("service/list-generic/?view=JenisIndikator&select=id,jenisIndikator").then(function(dat){
				$scope.sourceJenisIndikator= dat;
				// debugger;
			});
			$scope.IDPerspektif=function(){
				var ID2 = $scope.item.jenisIndikator.id;
				var url2 = "jenisIndikatorId=" + ID2;
				// debugger;
				FindSarpras.getSarpras("perspektif/find-all/?"+url2).then(function(dat){
					$scope.sourcePerspektif= dat.data.data;
				// debugger;
				});
			}
			$scope.KDSasaran=function(){
				var ID = $scope.item.perspektif.id;
				var url = "perspektifId=" + ID;
				FindSarpras.getSarpras("sasaran-strategis/generate-kode/?"+url).then(function(dat){
					$scope.item.kodeSasaranStrategis = dat.data.data.result;
					// debugger;
				});
			}	
			
			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}
			$scope.Save = function(){
            	var data = {
            		"perspektif":{
            			"id": $scope.item.perspektif.id
            		},
            		"sasaranStrategis": $scope.item.sasaranStrategis,
            		"kdSasaranStrategis": $scope.item.kodeSasaranStrategis,
            		"awalPeriode": $scope.item.awal,
            		"akhirPeriode": $scope.item.akhir
            	};
            	console.log(JSON.stringify(data));
				ManageSarpras.saveSarpras(data,"sasaran-strategis/save-sasaran-strategis/").then(function(e) {
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""
				});
			};
			$scope.Batal = function(){
				$scope.item.jenisIndikator="",
				$scope.item.perspektif="",
				$scope.item.sasaranStrategis="",
				$scope.item.kodeSasaranStrategis="",
				$scope.item.awal= new Date($scope.now).getFullYear(),
				$scope.item.akhir= $scope.item.awal+4
			};
			// $scope.select=function(data){
			// 	console.log(JSON.stringify(data));
			// 	$scope.item.jenisIndikator=data.jenisIndikator.jenisIndikator,
			// 	$scope.item.perspektif=data.Perspektif.Perspektif,
			// 	$scope.item.sasaranStrategis=data.sasaranStrategis,
			// 	$scope.item.kodeSasaranStrategis=data.kdSasaranStrategis,
			// 	$scope.item.awal= data.awalPeriode,
			// 	$scope.item.akhir= data.akhirPeriode
			// 	debugger;
			// };

			FindSarpras.getSarpras("sasaran-strategis/find-all/").then(function(dat){
				var data = []
				var i = 1
				dat.data.data.forEach(function(e){
				 	var sasaranStrategis = {
				 		"perspektif": e.perspektif,
				 		"sasaranStrategis": e.sasaranStrategis,
				 		"kdSasaranStrategis": e.kdSasaranStrategis,
				 		"awalPeriode": e.awalPeriode,
				 		"akhirPeriode": e.akhirPeriode,
				 		"no":i
				 	}
				 	data[i-1]=sasaranStrategis
				 	i++;
				});
			    $scope.source = data;
			    debugger;
			    $scope.sourceDaftarSasaranStrategis = new kendo.data.DataSource({
					pageSize: 10,
					data:$scope.source
				});
			});
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
					 		"perspektif": e.perspektif,
					 		"sasaranStrategis": e.sasaranStrategis,
					 		"kdSasaranStrategis": e.kdSasaranStrategis,
					 		"awalPeriode": e.awalPeriode,
					 		"akhirPeriode": e.akhirPeriode,
					 		"no":i
					 	}
					 	data[i-1]=sasaranStrategis
					 	i++;
					});
				    $scope.source = data;
				    debugger;
				    $scope.sourceDaftarSasaranStrategis = new kendo.data.DataSource({
						pageSize: 10,
						data:$scope.source
					});
				});
			};
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
                    "field": "no",
					"title": "<h3 align=center>No</h3>",
					"width": "30px",
					"attributes": {"align": "center"}
				}, {
					"field": "perspektif.perspektif",
					"title": "<h3 align=center>Perspektif</h3>",
					"width": "200px"
				}, {
					"field": "sasaranStrategis",
					"title": "<h3 align=center>Sasaran Strategis</h3>",
					"width": "200px"
				}, {
					"field": "kdSasaranStrategis",
					"title": "<h3 align=center>Kode<br>Sasaran Strategis</h3>",
					"width": "100px"
				}, {
					"field": "awalPeriode",
					"title": "<h3 align=center>Awal<br>Periode</h3>",
					"width": "70px",
					"attributes": {"align": "center"}
				}, {
					"field": "akhirPeriode",
					"title": "<h3 align=center>Akhir<br>Periode</h3>",
					"width": "70px",
					"attributes": {"align": "center"}
		        }]
		    };

			// $scope.columndaftarSasaranStrategis = [
			// {
			// 	"field": "no",
			// 	"title": "<h3 align=center>No</h3>",
			// 	"width": "30px",
			// 	"attributes": {"align": "center"}
			// }, {
			// 	"field": "perspektif.perspektif",
			// 	"title": "<h3 align=center>Perspektif</h3>",
			// 	"width": "200px"
			// }, {
			// 	"field": "sasaranStrategis",
			// 	"title": "<h3 align=center>Sasaran Strategis</h3>",
			// 	"width": "200px"
			// }, {
			// 	"field": "kdSasaranStrategis",
			// 	"title": "<h3 align=center>Kode<br>Sasaran Strategis</h3>",
			// 	"width": "100px"
			// }, {
			// 	"field": "awalPeriode",
			// 	"title": "<h3 align=center>Awal<br>Periode</h3>",
			// 	"width": "70px",
			// 	"attributes": {"align": "center"}
			// }, {
			// 	"field": "akhirPeriode",
			// 	"title": "<h3 align=center>Akhir<br>Periode</h3>",
			// 	"width": "70px",
			// 	"attributes": {"align": "center"}
			// }];
			
	}])
})