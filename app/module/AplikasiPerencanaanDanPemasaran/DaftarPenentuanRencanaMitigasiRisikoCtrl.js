define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarPenentuanRencanaMitigasiRisikoCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};

			$scope.title = "Daftar Penentuan Rencana Mitigasi Risiko";
			ModelItem.get("PerencanaanDanPemasaran/DaftarAnalisaSwot").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.tahun= new Date($scope.now).getFullYear();
				$scope.yearSelected = { 
           			start: "decade", 
            		depth: "decade" 
          		};
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.Search = function(){
				var periode =  $scope.item.tahun;
				var url = "&periode=" + periode;
				// debugger;
				FindSarpras.getSarpras("rencana-mitigasi-risiko/find-all/?" + url).then(function(dat){
					 var data = []
					 var i = 1
					 dat.data.data.forEach(function(e){
					 	var Mitigasi = {
					 		"id": e.id,
					 		"sasaranStrategis": e.sasaranStrategis,
					 		"risiko": e.risiko,
					 		"kemungkinanResiko": e.kemungkinanResiko,
					 		"dampakRisiko": e.dampakRisiko,
					 		"periode": e.periode,
					 		"tingkatRisiko": e.tingkatRisiko,
					 		"warna": e.warna,
					 		"rencanaMitigasi": e.rencanaMitigasiRisiko,
					 		"penanggungJawab": e.penanggungJawab,
					 		"no":i
					 	}
					 	data[i-1]=Mitigasi
					 	i++;
					});
					$scope.source = data;
					 // debugger;
					$scope.sourceDaftarPenentuanRencanaMitigasiRisiko = new kendo.data.DataSource({
						pageSize: 10,
						data:$scope.source
					});
				});	
			};
	
			FindSarpras.getSarpras("rencana-mitigasi-risiko/find-all/").then(function(dat){
				 var data = []
				 var i = 1
				 dat.data.data.forEach(function(e){
				 	var Mitigasi = {
				 		"id": e.id,
				 		"sasaranStrategis": e.sasaranStrategis,
				 		"risiko": e.risiko,
				 		"kemungkinanResiko": e.kemungkinanResiko,
				 		"dampakRisiko": e.dampakRisiko,
				 		"periode": e.periode,
				 		"tingkatRisiko": e.tingkatRisiko,
				 		"warna": e.warna,
				 		"rencanaMitigasi": e.rencanaMitigasiRisiko,
				 		"penanggungJawab": e.penanggungJawab,
				 		"no":i
				 	}
				 	data[i-1]=Mitigasi
				 	i++;
				});
				$scope.source = data;
				 // debugger;
				$scope.sourceDaftarPenentuanRencanaMitigasiRisiko = new kendo.data.DataSource({
					pageSize: 10,
					data:$scope.source
				});
			});	
			// $scope.daftarDiagramTows  = new kendo.data.DataSource({
			// 	data: []
			// });
			$scope.mainGridOptions = {
                pageable: true,
                scrollable:true,
                columns: [{
                    "field": "no",
					"title": "<h3 align=center>No<h3>",
					"width": "50px",
					"attributes": {align:"center"}
				}, {
					"field": "sasaranStrategis.sasaranStrategis",
					"title": "<h3 align=center>Sasaran Strategis</h3>",
					"width": "300px"
				}, {
					"field": "risiko.risiko",
					"title": "<h3 align=center>Resiko<h3>",
					"width": "300px"
				}, {
					"field": "kemungkinanResiko.kemungkinanResiko",
					"title": "<h3 align=center>Kemungkinan<br>Resiko Terjadi<h3>",
					"width": "150px"
				}, {
					"field": "dampakRisiko.dampakResiko",
					"title": "<h3 align=center>Dampak Resiko<h3>",
					"width": "150px"
				}, {
					"field": "periode",
					"title": "<h3 align=center>Periode<h3>",
					"width": "100px",
					"attributes": {align:"center"}
				}, {
					"field": "tingkatRisiko.tingkatResiko",
					"title": "<h3 align=center>Tingkat Resiko<h3>",
					"width": "150px"
				}, {
					// "field": "warna",
					"title": "<h3 align=center>Warna<h3>",
					"width": "100px",
					// template:"<div style='background-color : #ff0000'></div>"
					"attributes": {style: "background-color: #: warna#"} 
					// template: "<input style='background-color:{{warna}}' class='checkbox' ng-model='item.check'/>",
				}, {
					"field": "rencanaMitigasi",
					"title": "<h3 align=center>Rencana Mitigasi Resiko<h3>",
					"width": "200px"
				}, {
					"field": "penanggungJawab.namaJabatan",
					"title": "<h3 align=center>Penanggung Jawab<h3>",
					"width": "200px"
		        }]
		    };
			// $scope.columnDaftarPenentuanRencanaMitigasiResiko = [
			// {
			// 	"field": "no",
			// 	"title": "<h3 align=center>No<h3>",
			// 	"width": "50px",
			// 	"attributes": {align:"center"}
			// }, {
			// 	"field": "sasaranStrategis.sasaranStrategis",
			// 	"title": "<h3 align=center>Sasaran Strategis</h3>",
			// 	"width": "300px"
			// }, {
			// 	"field": "risiko.risiko",
			// 	"title": "<h3 align=center>Resiko<h3>",
			// 	"width": "300px"
			// }, {
			// 	"field": "kemungkinanResiko.kemungkinanResiko",
			// 	"title": "<h3 align=center>Kemungkinan<br>Resiko Terjadi<h3>",
			// 	"width": "150px"
			// }, {
			// 	"field": "dampakRisiko.dampakResiko",
			// 	"title": "<h3 align=center>Dampak Resiko<h3>",
			// 	"width": "150px"
			// }, {
			// 	"field": "periode",
			// 	"title": "<h3 align=center>Periode<h3>",
			// 	"width": "100px",
			// 	"attributes": {align:"center"}
			// }, {
			// 	"field": "tingkatRisiko.tingkatResiko",
			// 	"title": "<h3 align=center>Tingkat Resiko<h3>",
			// 	"width": "150px"
			// }, {
			// 	// "field": "warna",
			// 	"title": "<h3 align=center>Warna<h3>",
			// 	"width": "100px",
			// 	// template:"<div style='background-color : #ff0000'></div>"
			// 	"attributes": {style: "background-color: #: warna#"} 
			// 	// template: "<input style='background-color:{{warna}}' class='checkbox' ng-model='item.check'/>",
			// }, {
			// 	"field": "rencanaMitigasi",
			// 	"title": "<h3 align=center>Rencana Mitigasi Resiko<h3>",
			// 	"width": "200px"
			// }, {
			// 	"field": "penanggungJawab.namaJabatan",
			// 	"title": "<h3 align=center>Penanggung Jawab<h3>",
			// 	"width": "200px"
			// }];
	}])
})