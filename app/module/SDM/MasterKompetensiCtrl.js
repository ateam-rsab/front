define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterKompetensiCtrl', ['$rootScope', '$scope',
		'ModelItem', '$state', 'InstitusiPendidikan', 'JenisSantunanService', 'ManageSdm',
		function ($rootScope, $scope, ModelItem, $state,
			InstitusiPendidikan, JenisSantunanService, ManageSdm) {

			ModelItem.get("Kesling/LaporanUjiHasil").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });
			$scope.no = 1;

			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function (data) {
				$scope.listPenandatangan = data;
			})

			ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=jenisJabatan&values=3", true).then(function (dat) {
				$scope.ListJabatan = dat.data;
			});
			ManageSdm.getOrderList("service/list-generic/?view=KelompokKompetensi&select=id,kelompokKompetensi&criteria=jenisJabatan&values=3", true).then(function (dat) {
				$scope.ListKelompokKompetensi = dat.data;
			});


			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: [{}]
			});

			$scope.pindah = function () {

				$state.go("RekamDataPegawai");

			}

			$scope.Listketerangan = [
				//   {
				// 	"id": 1,
				// 	"kode": "1",
				// 	"keterangan": "Kepala Instalasi"
				// },{"id": 2,
				// 	"kode": "2",
				// 	"keterangan": "Pengelola Urusan"
				// },{
				// 	"id": 3,
				// 	"kode": "3",
				// 	"keterangan": "Pegawai Administrasi"					
				// }

			];


			InstitusiPendidikan.getOrderList("service/list-generic/?view=InstitusiPendidikan&select=*", true).then(function (dat) {
				$scope.ListInstitusiPendidikan = dat.data;

			});


			$scope.pindah1 = function () {

				$state.go("DataKeluarga");

			}




			$scope.Listpublikasi = [
				{
					"id": 1,
					"kode": "1",
					"keterangan": "Ya"
				}, {
					"id": 2,
					"kode": "2",
					"keterangan": "Tidak"




				}

			];


			InstitusiPendidikan.getOrderList("service/list-generic/?view=InstitusiPendidikan&select=*", true).then(function (dat) {
				$scope.ListInstitusiPendidikan = dat.data;

			});


			$scope.pindah1 = function () {

				$state.go("DataKeluarga");

			}


			$scope.daftarJenisBahan = new kendo.data.DataSource({
				data: [
					{
						"kodeJenis": "BHN001",
						"JenisBahan": "Aldet"
					},
					{
						"kodeJenis": "BHN002",
						"JenisBahan": "Laudet"
					},
					{
						"kodeJenis": "BHN003",
						"JenisBahan": "MC. Bleach"
					},
					{
						"kodeJenis": "BHN004",
						"JenisBahan": "OXO. Bleach"
					},
					{
						"kodeJenis": "BHN005",
						"JenisBahan": "E. 951"
					},
					{
						"kodeJenis": "BHN006",
						"JenisBahan": "M. Saur"
					},
					{
						"kodeJenis": "BHN007",
						"JenisBahan": "M. Soft"
					}

				]
			});


			$scope.daftarBahanLinen = new kendo.data.DataSource({
				data: [
					{
						"kodeJenis": "BHN001",
						"JenisBahan": "Aldet"
					},
					{
						"kodeJenis": "BHN002",
						"JenisBahan": "Laudet"
					},
					{
						"kodeJenis": "BHN003",
						"JenisBahan": "MC. Bleach"
					},
					{
						"kodeJenis": "BHN004",
						"JenisBahan": "OXO. Bleach"
					},
					{
						"kodeJenis": "BHN005",
						"JenisBahan": "E. 951"
					},
					{
						"kodeJenis": "BHN006",
						"JenisBahan": "M. Saur"
					},
					{
						"kodeJenis": "BHN007",
						"JenisBahan": "M. Soft"
					}

				]
			});

			$scope.columnLaporanUjiHasil = [
				{
					"field": "no",
					"title": "Jabatan",
					"width": "20%"
				},
				{
					"field": "nama",
					"title": "Kelompok Kompetensi",
					"width": "20%"
				},
				{
					"field": "satuan",
					"title": "Jenis Kompetensi",
					"width": "20%"
				},
				{
					"field": "hasilUji",
					"title": "Definisi",
					"width": "20%"
				},
				{
					"field": "hasilUji",
					"title": "Standar Nilai",
					"width": "20%"
				},
				{
					"field": "hasilUji",
					"title": "Pendidikan",
					"width": "20%"
				},
				{
					"field": "hasilUji",
					"title": "Pengalaman",
					"width": "20%"
				},
				{
					"field": "hasilUji",
					"title": "Pelatihan",
					"width": "20%"
				}
			];




			$scope.Save = function () {
				// debugger;
				var data = {
					"nim": $scope.item.nim,
					"namaPeneliti": $scope.item.namaPeneliti,
					"periodePengajaran": $scope.item.periodePengajaran,
					"institusiPendidikan": $scope.item.institusiPendidikan,
					"jurusanPeminatan": $scope.item.jurusanPeminatan,
					"fakultas": $scope.item.fakultas,
					"judulPeneltian": $scope.item.judulPenelitian,
					"lokasiPenelitian": $scope.item.lokasiPenelitian,
					"tanggalMulai": $scope.item.tanggalMulai,
					"NamaPendamping": $scope.item.namaPendamping,
					"biayaPenelitian": $scope.item.biayaPenelitian,
					"tanggalPembayaran": $scope.item.tanggalPembayaran,
					"nomorKwitansi": $scope.item.nomorKwitansi,
					"tanggalSelesai": $scope.item.tanggalSelesai,
					"tanggalPresentasi": $scope.item.tanggalPresentasi,
					"laporanPenelitian": $scope.item.laporanPenelitian


				};
				JenisSantunanService.saveJenisSantunan(ModelItem.beforePost(data), "baku-mutu/save-baku-mutu/").then(
					function (e) {
						$scope.item = {};
					});
			};





















		}
	]);
});