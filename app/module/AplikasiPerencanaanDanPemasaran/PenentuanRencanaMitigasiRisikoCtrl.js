define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('PenentuanRencanaMitigasiRisikoCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Penentuan Rencana Mitigasi Risiko";
			
			ModelItem.get("PerencanaanDanPemasaran/TingkatResiko").then(function(data) {
				$scope.item = data;
				$scope.no = 1;
				$scope.now =new Date();
				$scope.item.periode= new Date($scope.now).getFullYear();
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.daftarPenentuanRencanaMitigasiResiko = new kendo.data.DataSource({
				data: []
			});	
			$scope.columndaftarPenentuanRencanaMitigasiResiko = [
			{
				"field": "no",
				"title": "<h3 align=center>No<h3>",
				"width": "50px"
			}, {
				"field": "sasaranStrategis.sasaranStrategis",
				"title": "<h3 align=center>Sasaran Strategis</h3>",
				"width": "400px"
			}, {
				"field": "risiko.risiko",
				"title": "<h3 align=center>Resiko<h3>",
				"width": "400px"
			}, {
				"field": "kemungkinanResiko.kemungkinanResiko",
				"title": "<h3 align=center>Kemungkinan Resiko Terjadi<h3>",
				"width": "200px"
			}, {
				"field": "dampakResiko.dampakResiko",
				"title": "<h3 align=center>Dampak Resiko<h3>",
				"width": "150px"
			}, {
				"field": "periode",
				"title": "<h3 align=center>Periode<h3>",
				"width": "100px"
			}, {
				"field": "tingkatResiko.tingkatResiko",
				"title": "<h3 align=center>Tingkat Resiko<h3>",
				"width": "200px",
			}, {
				// "field": "tingkatResiko.warna",
				"title": "<h3 align=center>Warna<h3>",
				"width": "200px",
				"attributes": {style: "background-color: #: tingkatResiko.warna#"} 
			}, {
				"field": "rencanaMitigasi",
				"title": "<h3 align=center>Rencana Mitigasi Resiko<h3>",
				"width": "200px"
			}, {
				"field": "penanggungJawab.satuanKerja",
				"title": "<h3 align=center>Penanggung Jawab<h3>",
				"width": "200px"
			}];
			$scope.addData = function() {
				var tempData = {
					"no": $scope.no++,
					"sasaranStrategis" : $scope.item.sasaranStrategis,
					"risiko" : $scope.item.resiko,
					"kemungkinanResiko" : $scope.item.kemungkinanResiko,
					"dampakResiko" : $scope.item.dampakResiko,
					"periode" : $scope.item.periode,
					"tingkatResiko" : $scope.item.tingkatResiko,
					"warna" : $scope.item.warna,
					"rencanaMitigasi" : $scope.item.rencanaMitigasi,
					"penanggungJawab" : $scope.item.penanggungJawab
				}

				$scope.daftarPenentuanRencanaMitigasiResiko.add(tempData);

				$scope.item.sasaranStrategis = "";
				$scope.item.resiko = "";
				$scope.item.kemungkinanResiko = "";
				$scope.item.dampakResiko = "";
				$scope.item.tingkatResiko = "";
				$scope.item.warna = "";
				$scope.item.rencanaMitigasi = "";
				$scope.item.penanggungJawab = "";	
			}
			FindSarpras.getSarpras("service/list-generic/?view=SasaranStrategis&select=id,sasaranStrategis").then(function(dat){
				$scope.sourceMasterSasaranStrategis= dat;
				// debugger;
			});	
			FindSarpras.getSarpras("service/list-generic/?view=Risiko&select=id,risiko").then(function(dat){
				$scope.sourceMasterResiko= dat;
				// debugger;
			});	
			FindSarpras.getSarpras("service/list-generic/?view=KemungkinanResikoTerjadi&select=id,kemungkinanResiko").then(function(dat){
				$scope.sourceMasterKemungkinanResiko= dat;
				// debugger;
			});	
			FindSarpras.getSarpras("service/list-generic/?view=DampakResiko&select=id,dampakResiko").then(function(dat){
				$scope.sourceMasterDampakResiko= dat;
				// debugger;
			});	
			FindSarpras.getSarpras("service/list-generic/?view=TingkatResiko&select=id,tingkatResiko,warna").then(function(dat){
				$scope.sourceMasteTingkatResiko= dat.data;
				// debugger;
			});	
			FindSarpras.getSarpras("service/list-generic/?view=SatuanKerja&select=id,satuanKerja").then(function(dat){
				$scope.sourceSatuanKerja= dat;
				// debugger;
			});	
			$scope.palette = ["red","yellow","orange"]//["#ff0000", "#ffff00", "#ffa500"];
			$scope.warnaPalette = [
			{
				"id":1,
				"nama" : "Merah",
				"warna": "#ff0000"
				},{
				"id":2,
				"nama" : "Kuning Muda",
				"warna": "#ffff00"
			},{
				"id":3,
				"nama" :"Kuning Tua",
				"warna": "#ffa500"
			}]
			$scope.Save = function(){
				var dat = $scope.daftarPenentuanRencanaMitigasiResiko._data;
				console.log(JSON.stringify(dat));
				// debugger;
				var i=0;
				var mitigasi = [];
				dat.forEach(function(data){
	            	var data = {
	            		"sasaranStrategis": {
	            			"id": data.sasaranStrategis.id
	            		},
	            		"risiko": {
	            			"id": data.risiko.id
	            		},
	            		"kemungkinanResiko": {
	            			"id": data.kemungkinanResiko.id
	            		},
	            		"dampakRisiko": {
	            			"id": data.dampakResiko.id
	            		},
	            		"periode" : data.periode,
	            		"tingkatRisiko": {
	            			"id": data.tingkatResiko.id
	            		},
	            		"rencanaMitigasiRisiko": data.rencanaMitigasi,
	            		"penanggungJawab": {
	            			"id": data.penanggungJawab.id
	            		}
	            	}
	            	mitigasi[i] =data;
						i++;
					})	
            	// debugger;
            	console.log(JSON.stringify(mitigasi));
				ManageSarpras.saveSarpras(mitigasi,"rencana-mitigasi-risiko/save/").then(function(e) {
            		$scope.item = {};
            		// $scope.item.noMesin="",
            		// $scope.item.jenisLinen="",
            		// $scope.item.kapasitas="",
            		// $scope.daftarBahanLinen._data=""
				});
			};
			$scope.DaftarPenentuan=function(){
				$state.go('DaftarPenentuanRencanaMitigasiRisiko')
			}
	}])
})