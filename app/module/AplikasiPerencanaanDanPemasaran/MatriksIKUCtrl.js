define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('MatriksIKUCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper,FindSarpras, ManageSarpras){
			$scope.item = {};
			$scope.title = "Matriks Indikator";
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
			
			FindSarpras.getSarpras("matriks-indikator/find-all/?id=" + $state.params.id).then(function(dat){
				var a = 1;
				var daftarMatriks = [];
				var column= []
				var listKontrak = [];
				for(var i=dat.data.data[0].sasaran.awalPeriode;i<=dat.data.data[0].sasaran.akhirPeriode;i++){
					debugger;
					var data = {
						"tahun" : i,
						"targetIku" : "-"
					}
					listKontrak[i-dat.data.data[0].sasaran.awalPeriode] = data;
					debugger;
				}
				var mainData = {
						"sasaranStrategis" : "-",
						"Indikator": "-",
						"bobot": "-",
						"satuan": "-",
						"no": a
					}
					if(dat.data.data[0].sasaran != undefined)
						mainData.sasaranStrategis=dat.data.data[0].sasaran.sasaranStrategis;
					if(dat.data.data[0].indikator != undefined)
						mainData.Indikator=dat.data.data[0].indikator.indikator;
					if(dat.data.data[0].bobot != undefined)
						mainData.bobot=dat.data.data[0].bobot.bobotIKU;
					if(dat.data.data[0].satuan != undefined)
						mainData.satuan=dat.data.data[0].satuan.satuanIndikator;


				dat.data.data[0].listTarget.forEach(function(e){
					var idx = e.tahun - dat.data.data[0].sasaran.awalPeriode;
					listKontrak[idx].targetIku = e.targetIku;
				});

				daftarMatriks[0] = {
					"mainData" : mainData,
					"listKontrak" : listKontrak
				}
				$scope.sourceDaftarMatriksIKU = daftarMatriks;
			});

			$scope.columnDaftarMatriksIKU = function(){

			var mainColumn =[
					{
						"field": "mainData.no",
						"title": "<h3 align=center>No<h3>",
						"width": "50px",
						"attributes": {align: "center"}
					}, {
						"field": "mainData.sasaranStrategis",
						"title": "<h3 align=center>Sasaran Strategis</h3>",
						"width": "300px"
					}, {
						"field": "mainData.Indikator",
						"title": "<h3 align=center>Indikator Kinerja Utama<h3>",
						"width": "300px"
					}, {
						"field": "mainData.bobot",
						"title": "<h3 align=center>Bobot<h3>",
						"width": "80px",
						"attributes": {align: "center"}
					}, {
						"field": "mainData.satuan",
						"title": "<h3 align=center>Satuan<h3>",
						"width": "80px"
					}
					,{
						title: "<h3 align=center>Target</h3>",
						columns:[
						// {
						// 	"field": "2015",
						// 	"title": "<h3 align=center>2015</h3>"
						// },{
						// 	"field": "2016",
						// 	"title": "<h3 align=center>2016</h3>"
						// },{
						// 	"field": "2017",
						// 	"title": "<h3 align=center>2017</h3>"
						// },{
						// 	"field": "2018",
						// 	"title": "<h3 align=center>2018</h3>"
						// },{
						// 	"field": "2019",
						// 	"title": "<h3 align=center>2019</h3>"
						// }
						]
					}
					];
				var column = [];
				for(var i=$state.params.awalPeriode;i<=$state.params.akhirPeriode;i++){
					var colNum = {
						"field": "listRKO["+(i-$state.params.awalPeriode)+"].targetIku",
						"title": "<h3 align=center>"+i+"</h3>",
						"width": "70px",
						"attributes": {align:"center"}
					}
					column.push(colNum);
				}
				mainColumn[5].columns= column; 
				return mainColumn;
			// [{
			// 	"field": "no",
			// 	"title": "<h3 align=center>No<h3>",
			// 	"width": "30px",
			// 	"attributes": {align: "center"}
			// }, {
			// 	"field": "sasaran.sasaranStrategis",
			// 	"title": "<h3 align=center>Sasaran Strategis</h3>",
			// 	"width": "200px"
			// }, {
			// 	"field": "indikator.indikatorKinerjaUtama",
			// 	"title": "<h3 align=center>Indikator Kinerja Utama<h3>",
			// 	"width": "200px"
			// }, {
			// 	"field": "bobot.bobotIKU",
			// 	"title": "<h3 align=center>Bobot<h3>",
			// 	"width": "80px",
			// 	"attributes": {align: "center"}
			// },{
			// 	title: "<h3 align=center>Target</h3>",
			// 	column:[]

			// }]
			}

			// FindSarpras.getSasaranStrategis("matriks-iku/find-all/").then(function(dat){
			// 	var data = []
			// 	var i = 1
			// 	dat.data.data.forEach(function(e){
			// 	 	var matriks = {
			// 	 		"sasaran": e.sasaran.sasaranStrategis,
			// 	 		"indikator": e.indikator.indikatorKinerjaUtama,
			// 	 		"bobot": e.bobot.bobotIKU,
			// 	 		"satuan": e.satuan.satuanIndikator,
			// 	 		"no":i
			// 	 	}
			//  	data[i-1]=matriks
			//  	i++;
			// 	});
			// 	$scope.sourceDaftarMatriksIKU= data;
			// 	// debugger;
			// });
			// $scope.columnDaftarMatriksIKU = [
			// {
			// 	"field": "no",
			// 	"title": "<h3 align=center>No<h3>",
			// 	"width": "30px",
			// 	"attributes": {align: "center"}
			// }, {
			// 	"field": "sasaran.sasaranStrategis",
			// 	"title": "<h3 align=center>Sasaran Strategis</h3>",
			// 	"width": "200px"
			// }, {
			// 	"field": "indikator.indikatorKinerjaUtama",
			// 	"title": "<h3 align=center>Indikator Kinerja Utama<h3>",
			// 	"width": "200px"
			// }, {
			// 	"field": "bobot.bobotIKU",
			// 	"title": "<h3 align=center>Bobot<h3>",
			// 	"width": "80px",
			// 	"attributes": {align: "center"}
			// }, {
			// 	"field": "satuan.satuanIndikator",
			// 	"title": "<h3 align=center>Satuan<h3>",
			// 	"width": "80px"
			// }
			// ,{
			// 	title: "<h3 align=center>Target</h3>",
			// 	columns:[
			// 	{
			// 		"field": "2015",
			// 		"title": "<h3 align=center>2015</h3>"
			// 	},{
			// 		"field": "2016",
			// 		"title": "<h3 align=center>2016</h3>"
			// 	},{
			// 		"field": "2017",
			// 		"title": "<h3 align=center>2017</h3>"
			// 	},{
			// 		"field": "2018",
			// 		"title": "<h3 align=center>2018</h3>"
			// 	},{
			// 		"field": "2019",
			// 		"title": "<h3 align=center>2019</h3>"
			// 	}
			// 	]
			// }
			// ];
			$scope.Kembali = function(){
				$state.go("KamusIKU")
			}
	}])
})