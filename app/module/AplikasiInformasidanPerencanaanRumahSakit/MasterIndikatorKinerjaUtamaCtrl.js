define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MasterIndikatorKinerjaUtamaCtrl', ['$rootScope', '$scope', 'ModelItem', 'dataSasaranStrategis', 'DataIndikatorKinerjaUtama', 'ManagePasien',
		function($rootScope, $scope, ModelItem, dataSasaranStrategis, DataIndikatorKinerjaUtama, ManagePasien) {		

			$scope.dataVOloaded = true;
			$scope.item = {};
			// $scope.MasterIndikatorKinerjaUtama = new kendo.data.DataSource({
			// 	data: [
			// 	{
			// 		"sasaranStrategis": "Terpenuhinya SDM yang kompeten",
			// 		"indikatorKinerjaUtama": "Persentase Karyawan yang memiliki kompetensi sesuai jabatan",
			// 		"bobot": "4",
			// 		"tahun": "2015",
			// 		"satuan": "%",
			// 		"targetIku": "80"
			// 	}
			// 	]
			// });
			dataSasaranStrategis.getOrderList("sasaran-strategis/find-all-sasaran-strategis/", true).then(function(dat){
				$scope.ListSasaranStrategis = dat.data.data;
			});

			DataIndikatorKinerjaUtama.getIndikatorList("indikator-kinerja-utama/find-all-indikator-kinerja-utama/").then(function(dat){
				$scope.sourceIndikator = dat.data.data.data;

				
			});

			$scope.columnMasterIndikatorKinerjaUtama= [{

			//define column untuk grid
			// var arrColumnGridResepElektronik = [{
				"field": "sasaranStrategis",
				"title": "<h3 align = center>Sasaran Strategis</h3>",
				"width": "300px"
			},{
				"field": "namaIndikatorKinerjaUtama",
				"title": "<h3 align = center>Indikator Kinerja Utama</h3>",
				"width": "300px"
			},{
				"field": "bobot",
				"title": "<h3 align = center>Bobot</h3>",
				"width": "100px"
			},{
				"field": "tahun",
				"title": "<h3 align = center>Tahun</h3>",
				"width": "100px"
			},{
				"field": "satuan",
				"title": "<h3 align = center>Satuan</h3>",
				"width": "100px"
			},{
				"field": "targetIku",
				"title": "<h3 align = center>Target IKU</h3>",
				"width": "100px"
			
		    }];


			ModelItem.get("InformasidanPerencanaanRumahSakit/MasterIndikatorKinerjaUtama").then(function(data) {
				$scope.item = data;
				scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			// ModelItem.getDataDummyGeneric("InformasidanPerencanaanRumahSakit/comboBoxSasaranStrategis", true).then(function(data) {
			// $scope.ListSasaranStrategis = data;
			// })

			// ModelItem.getDataDummyGeneric("InformasidanPerencanaanRumahSakit/comboBoxTahun", true).then(function(data) {
			// $scope.ListTahun = data;
			// })

			$scope.Save=function()
			{
				ManagePasien.saveMasterIndikatorKinerjaUtama(ModelItem.beforePost($scope.item)).then(function(e) {
                });
			};
		}
	]);
});