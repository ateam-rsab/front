define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterFormulaCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem, DateHelper, $document, r) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.MasterKontrakKerja = new kendo.data.DataSource({
				data: [
				{
					"sasaranStrategis": "Terpenuhinya SDM yang kompeten",
					"indikatorKinerjaUtama": "Persentase Karyawan yang memiliki kompetensi sesuai jabatan",
					"bobot": "4",
					"tahun": "2015",
					"satuan": "%",
					"targetIku": "80",
					"periodePelaporan": "Triwulan"
				}
				]
			});

			$scope.columnMasterKontrakKerja= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "sasaranStrategis",
				"title": "<h3 align = center>Sasaran Strategis</h3>",
				"width": "250px"
			},{
				"field": "indikatorKinerjaUtama",
				"title": "<h3 align = center>Indikator Kinerja Utama</h3>",
				"width": "300px"
			},{
				"field": "bobot",
				"title": "<h3 align = center>Bobot</h3>",
				"width": "60px"
			},{
				"field": "tahun",
				"title": "<h3 align = center>Tahun</h3>",
				"width": "60px"
			},{
				"field": "satuan",
				"title": "<h3 align = center>Satuan</h3>",
				"width": "60px"
			},{
				"field": "targetIku",
				"title": "<h3 align = center>Target IKU</h3>",
				"width": "80px"
			},{
				"field": "periodePelaporan",
				"title": "<h3 align = center>Periode Pelaporan</h3>",
				"width": "150px"
		    }];

			// ModelItem.getGridOption("Gizi/PermintaanBahanMakanandariRuangan/PermintaanBahanMakananDariRuangan", arrColumnGridResepElektronik).then(function(data) {
			// 	$scope.mainGridOptions = data;
			// })

			$scope.now = new Date();
			ModelItem.get("InformasidanPerencanaanRumahSakit/MasterFormula").then(function(data) {
				$scope.item = data;
				scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			ModelItem.getDataDummyGeneric("InformasidanPerencanaanRumahSakit/comboBoxSasaranStrategis", true).then(function(data) {
			$scope.ListSasaranStrategis = data;
			})

			ModelItem.getDataDummyGeneric("InformasidanPerencanaanRumahSakit/comboBoxIndikatorKinerjaUtama", true).then(function(data) {
			$scope.ListIndikatorKinerjaUtama = data;
			})
			
			$scope.enableTahun = true;
			$scope.enableBobot = true;
			$scope.enableSatuan = true;
			$scope.enableTargetIku = true;
			$scope.enablePeriodePelaporan = true;
		}
	]);
});