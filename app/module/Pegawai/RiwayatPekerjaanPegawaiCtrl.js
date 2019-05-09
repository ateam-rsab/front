define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatPekerjaanPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			$scope.title = "Riwayat Pekerjaan Pegawai";
			ModelItem.get("Pegawai/RiwayatPekerjaanPegawai").then(function(data) {
			$scope.dataVOloaded = true;
			$scope.item = data;
			$scope.tempItem = {};
			$scope.DaftarRiwayatPekerjaan = new kendo.data.DataSource({
				data: []
			});

			$scope.columnRiwayatKerja = [{
				"field": "No_Urut",
				"title": "No Urut"	
			}, {
				"field": "nama_perusahaan",
				"title": "Data Tanggal"
			}, {
				"field": "jabatan",
				"title": "Jabatan Posisi"
			}, {
				"field": "Uraian",
				"title": "Uraian Pekerjaan"
			}, {
				"field": "Tgl_Mulai",
				"title": "Tgl Mulai"
			}, {
				"field": "Tgl_Akhir",
				"title": "Tgl Akhir"
			}, {
				"field": "Gaji",
				"title": "Gaji Pokok"	
		    }];

		    	$scope.now = new Date();
			})	

	ModelItem.get("Pegawai/Pegawai").then(function(data) {
				$scope.item = data;



				$scope.dataVOloaded = true;
				}, function errorCallBack(err) {});

		}
  


		
	]);
});