define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarSuratKeluarCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindSarpras','ManageSarpras',
		function($rootScope, $scope,$state, ModelItem, DateHelper, FindSarpras, ManageSarpras){
			$scope.title = "Daftar Surat Keluar";
			$scope.dataVOloaded = true;

			$scope.now = new Date();
			$scope.item = {};
			$scope.item.awal=$scope.now;
			$scope.item.akhir=$scope.now;
			$scope.search = function(){
				var awal =  DateHelper.getPeriodeFormatted($scope.item.awal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.akhir);
				var nomor = $scope.item.noTerima;
				var url = "dateStart=" + awal + "&dateEnd=" + akhir + "&noTerima=" + nomor;
				FindSarpras.getSarpras("dokumen-internal/get-dokumen?" + url).then(function(dat){
				    $scope.sourceDaftarSuratMasuk = dat.data;
				});
			}
			$scope.search();

			FindSarpras.getSarpras("dokumen-internal/get-dokumen").then(function(dat){
				$scope.sourceDaftarSuratMasuk= dat.data;
				// debugger;
			});	
			$scope.columnSuratMasuk = [
				{
					"field": "tglSurat",
					"title": "<center>Tanggal Surat</center>",
					"width": "100px"
				},
				{
					"field": "tipeSurat.tipeSurat",
					"title": "<center>Tipe Surat</center>",
					"width": "150px"
				},
				{
					"field": "namaSurat.namaSurat",
					"title": "<center>Nama Surat</center>",
					"width": "200px"
				},
				{
					"field": "nomorSurat.nomorSurat",
					"title": "<center>Nomor Surat</center>",
					"width": "200px"
				},
				{
					"field": "penerimaSurat.penerimaSurat",
					"title": "<center>Penerima Surat</center>",
					"width": "200px"
				},
				{
					"field": "ruanganPengirim.namaRuangan",
					"title": "<center>Ruangan Pengirim</center>",
					"width": "200px"
				},
				{
					"field": "ruanganPenerima.ruanganPenerima",
					"title": "<center>Ruangan Penerima</center>",
					"width": "200px"
				},
				{
					"field": "sifatSurat.sifatSurat",
					"title": "<center>Sifat Surat</center>",
					"width": "200px"
				},
				{
					"field": "statusBerkas.statusBerkas",
					"title": "<center>Status Berkas</center>",
					"width": "200px"
				},
				{
					"field": "JenisSurat.JenisSurat",
					"title": "<center>Jenis Surat</center>",
					"width": "200px"
				}
			];

			$scope.Search = function(){
				var data = {
					"awal": DateHelper.getTanggalFormatted($scope.item.awal),
					"akhir": DateHelper.getTanggalFormatted($scope.item.akhir)
				}
				console.log(JSON.stringify(data));
			}

			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
			}

			$scope.navToDistribusiSurat = function(current){
				debugger;
				$state.go("DistribusiKirimSuratMasukdariExternalKirimSurat", {
					noRec: $scope.current
				})
			}
	}])
})