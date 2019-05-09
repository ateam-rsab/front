define(['initialize'], function(initialize) { 
	'use strict';
	initialize.controller('detailRUPCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', 'dataRupService',
		function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, dataRupService){
			$scope.title = "";
			$scope.dataVOloaded = true;
			$scope.dataItem = {};

			$scope.item = {};

			ManageSarpras.getDataRUPVerified($state.params.noRec).then(function(data){
				$scope.spek = data.data.detailRup;

				var i = 1;
				$scope.spek.forEach(function(spek){
					spek.tanggalPengajuan = DateHelper.getTanggalFormatted(new Date(spek.tanggalPengajuan));
					spek.pelaksanaanPemilihanAwal = DateHelper.getTanggalFormatted(new Date(spek.pelaksanaanPemilihanAwal));
					spek.pelaksanaanPemilihanAhir = DateHelper.getTanggalFormatted(new Date(spek.pelaksanaanPemilihanAhir));

					spek.pelaksanaanPekerjaanAwal = DateHelper.getTanggalFormatted(new Date(spek.pelaksanaanPekerjaanAwal));
					spek.pelaksanaanPekerjaanAhir = DateHelper.getTanggalFormatted(new Date(spek.pelaksanaanPekerjaanAhir));

					spek.noRec = {
						"noRec": spek.noRec,
						"kdProfile": spek.kdProfile
					}
					spek.no = i;
					i++;
				})

				$scope.dataSpek = new kendo.data.DataSource({
					data: $scope.spek,
					editable: false
				});
			});

			$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;
		    };

			dataRupService.getData("Pengadaan&select=*", true).then(function(dat){
				$scope.listPengadaan = dat.data;
			});

			$scope.item.pengadaan = [];

			$scope.pengadaanArray = function() {

				console.log('list item.pengadaan : ' + $scope.item.pengadaan);
			};

			$scope.columnPenyusunanRUP = [
				{
					"title": "No",
					"field": "no",
					width: "50px"
				},
				{
					"field": "tanggalPengajuan",
					"title": "Tgl Pengajuan",
					width: "150px"
				},
				{
					"title": "Kegiatan",
					"field": "namaKegiatan",
					width: "400px"
				},
				{
					"title": "Detail Kegiatan",
					"field": "kegiatanDetail",
					width: "300px"
				},
				{
					"title": "Tanggal Pengajuan",
					"field": "tanggalPengajuan",
					width: "150px"
				},
				{
					"title": "Output",
					"field": "output",
					width: "170px"
				},
				{
					"title": "Komponen",
					"field": "namaKomponen",
					width: "170px"
				},
				{
					"title": "Nama Akun",
					"field": "namaAkun",
					width: "150px"
				},
				{
					"title": "Sumber Dana",
					"field": "sumberDana",
					width: "200px"
				},
				{
					"title": "Cara Pengadaan",
					"field": "namaPengadaan",
					width: "150px"
				},
				{
					"title": "Nama Paket Pengadaan",
					"field": "spesifikasi",
					width: "300px"
				},
				{
					"title": "Produk",
					"field": "namaProduk",
					"format": "{0:n}",
					width: "300px"
				},
				{
					"title": "Jadwal Pelaksanaan",
					headerAttributes: {
						style: "text-align:center"
					},
					columns: [{
						"field": "pelaksanaanPemilihanAwal",
						"title": "Pemilihan Awal",
						width: "150px"
					}, {
						"field": "pelaksanaanPemilihanAhir",
						"title": "Pemilihan Akhir",
						width: "150px"
					},{
						"field": "pelaksanaanPekerjaanAwal",
						"title": "Pekerjaan Awal",
						width: "150px"
					}, {
						"field": "pelaksanaanPekerjaanAhir",
						"title": "Pekerjaan Akhir",
						width: "150px"
					}]
				},
				{
					"title": "Volume",
					"field": "volumeBarang",
					"format": "{0:n}",
					"template": "<div class=\"pull-right\">#=kendo.toString(volumeBarang, \"n0\")#</div>",
					width: "80px"
				},
				{
					"title": "Harga",
					"field": "hargaSatuanBarang",
					"format": "{0:n}",
					"template": "<div class=\"pull-right\">#=kendo.toString(hargaSatuanBarang, \"n0\")#</div>",
					width: "100px"
				},
				{
					"title": "Sub Total",
					"format": "{0:n0}",
					"template": "<div class=\"pull-right\">#=kendo.toString(jumlahBiaya, \"n0\")#</div>",
					width: "150px"
				}
			];

			$scope.Save = function() {

			};

			$scope.batal = function() {
			  	window.history.back();
			};
		}
	]);
});