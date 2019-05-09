define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PermintaanMakananPasienDariRuanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper',
		function($rootScope, $scope, ModelItem, DateHelper) {
			ModelItem.get("Gizi/PermintaanMakananPasienDariRuangan").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("JenisDiet", true).then(function(data) {
				$scope.listJenisDiet = data;
			})
			ModelItem.getDataDummyGeneric("KategoryDiet", true).then(function(data) {
				$scope.listKategoryDiet = data;
			})
			ModelItem.getDataDummyGeneric("JenisWaktu", true).then(function(data) {
				$scope.listJenisWaktu = data;
			})
			ModelItem.getDataDummyGeneric("KeteranganDiet", true).then(function(data) {
				$scope.listKeterangan = data;
			})
			ModelItem.getDataDummyGeneric("FrekuensiDiet", true).then(function(data) {
				$scope.listFrekuensiDiet = data;
			})
			ModelItem.getDataDummyGeneric("NamaPemesan", true).then(function(data) {
				$scope.listNamaPemesan = data;
			})
			$scope.daftarPasien = new kendo.data.DataSource({
				data: []
			});
			$scope.columnPasien = [
			{
				"field": "noPendaftaran",
				"title": "No Pendaftaran",
				"width": "15%"
			},
			{
				"field": "noCm",
				"title": "No. CM",
				"width": "10%"
			},
			{
				"field": "namaPasien",
				"title": "Nama Pasien",
				"width": "25%"
			},
			{
				"field": "jk",
				"title": "JK",
				"width": "10%"
			},
			{
				"field": "kelas",
				"title": "Kelas",
				"width": "10%"
			},
			{
				"field": "jenisPasien",
				"title": "Jenis Pasien",
				"width": "10%"
			},
			{
				"field": "tglPendaftaran",
				"title": "Tgl Pendaftaran",
				"width": "10%"
			}
			];
			$scope.daftarPemesananMakanan = new kendo.data.DataSource({
				data: []
			});
			$scope.columnPemesananMakanan = [
			{
				"field": "tanggalPesan",
				"title": "Tanggal Pesan",
				"width": "100px"
			},
			{
				"field": "jenisDiet",
				"title": "Jenis Diet",
				"width": "150px"
			},
			{
				"field": "kategoryDiet",
				"title": "Kategory Diet",
				"width": "150px"
			},
			{
				"field": "jenisWaktu",
				"title": "Jenis Waktu",
				"width": "100px"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
				"width": "100px"
			},
			{
				"field": "jumlahMenu",
				"title": "Jumlah Menu",
				"width": "100px"
			},
			{
				"field": "minum",
				"title": "Minum",
				"width": "75px"
			},
			{
				"field": "frekuensi",
				"title": "Frekuensi",
				"width": "75px"
			},
			{
				"field": "volume",
				"title": "Volume",
				"width": "75px"
			},
			
			{
				"field": "namaPemesan",
				"title": "Nama Pemesan",
				"width": "150px"
			}, {
		        command: { text: "Hapus", click: $scope.hapusDaftarPesanan },
		        title: "&nbsp;",
		        width: "100px"
		    }
			];
			$scope.Tambah = function() {
				
				var TglGrid = DateHelper.getTanggalFormatted($scope.item.tanggalPesan);

				// 
				var tempDaftarPemesananMakanan= {
					"tanggalPesan": TglGrid,
					"jenisDiet":$scope.item.jenisDiet.jenisDiet,
					"kategoryDiet":$scope.item.kategoryDiet.kategoryDiet,
					"jenisWaktu":$scope.item.jenisWaktu.jenisWaktu,
					"keterangan":$scope.item.keteranganDiet.keteranganDiet,
					"jumlahMenu":$scope.item.jumlahMenu,
					"minum":$scope.item.minum,
					"frekuensi":$scope.item.frekuensiDiet.name,
					"volume":$scope.item.volume,
					"namaPemesan":$scope.item.namaPemesan.name
				}

				$scope.daftarPemesananMakanan.add(tempDaftarPemesananMakanan);
			}
			$scope.hapusDaftarPesanan = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempDaftarPemesananMakanan== $scope.daftarPemesananMakanan
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			};
		}
	]);
});