define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PengukuranKinerjaKegiatan(PKK)Ctrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.PengukuranKinerjaKegiatan = new kendo.data.DataSource({
				data: [
				{
					"sasaranStrategis": "Terpenuhinya SDM yang kompeten",
					"program": "Rekruitmen SDM sesuai kempetensi",
					"uraian": "Mereview kompetensi tenaga kesehatan",
					"indikatorKinerja": "Input : Tenaga kesehatan yang ada",
					"satuan": "%",
					"rkotwi": "25",
					"realisasitwi": "-",
					"tingkatCapaianKinerja": "-",
					"pic": "",
					"keterangan": ""
				}
				]
			});

			$scope.columnPengukuranKinerjaKegiatan= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "sasaranStrategis",
				"title": "<h3 align = center>Sasaran Strategis</h3>",
				"width": "250px"
			},{
				"field": "program",
				"title": "<h3 align = center>Program</h3>",
				"width": "300px"
			},{
				"field": "uraian",
				"title": "<h3 align = center>Uraian</h3>",
				"width": "300px"
			},{
				"field": "indikatorKinerja",
				"title": "<h3 align = center>Indikator Kinerja</h3>",
				"width": "300px"
			},{
				"field": "satuan",
				"title": "<h3 align = center>Satuan</h3>",
				"width": "60px"
			},{
				"field": "rkotwi",
				"title": "<h3 align = center>RKO TW I</h3>",
				"width": "80px"
			},{
				"field": "realisasitwi",
				"title": "<h3 align = center>Realisasi TW I</h3>",
				"width": "150px"
			},{
				"field": "tingkatCapaianKinerja",
				"title": "<h3 align = center>Tingkat Capaian Kinerja</h3>",
				"width": "200px"
			},{
				"field": "pic",
				"title": "<h3 align = center>PIC</h3>",
				"width": "80px"
			},{
				"field": "keterangan",
				"title": "<h3 align = center>Keterangan</h3>",
				"width": "150px"
		    }];

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;
			// })

			$scope.now = new Date();
			ModelItem.get("InformasidanPerencanaanRumahSakit/PengukuranKinerjaKegiatan(PKK)").then(function(data) {
				$scope.item = data;
				scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("InformasidanPerencanaanRumahSakit/comboBoxSasaranStrategis", true).then(function(data) {
			$scope.ListSasaranStrategis = data;
			})

			ModelItem.getDataDummyGeneric("InformasidanPerencanaanRumahSakit/comboBoxProgram", true).then(function(data) {
			$scope.ListProgram = data;
			})

			$scope.enableTahun = true;
			$scope.enableBobot = true;
			$scope.enableSatuan = true;
			$scope.enableTargetIku = true;
		}
	]);
});