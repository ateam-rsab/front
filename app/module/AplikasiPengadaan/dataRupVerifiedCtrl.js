define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('dataRupVerifiedCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'dataRupService',
		function($rootScope, $scope, $state, ModelItem, DateHelper, dataRupService) {
			// ModelItem.get("PengajuanUsulan/dataRup").then(function(data) {
			// }, function errorCallBack(err) {});

			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			dataRupService.getDataRUP("detail-rup/find-rup-list", true).then(function(dat){
				$scope.dataRupVerified = dat.data.data;
				$scope.dataRupVerified.forEach(function(data){
					var date1 = data.pelaksanaanPemilihanAwal;
					var date2 = data.pelaksanaanPemilihanAhir;
					var date3 = data.pelaksanaanPekerjaanAwal;
					var date4 = data.pelaksanaanPekerjaanAhir;
					var date5 = new Date(data.tanggalPengajuan);

					if (date1 == 0 ) {
						data.pelaksanaanPemilihanAwal = '-';
					} else {
						data.pelaksanaanPemilihanAwal = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPemilihanAwal));
					}

					if (date2 == 0) {
						data.pelaksanaanPemilihanAhir = '-';
					} else {
						data.pelaksanaanPemilihanAhir = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPemilihanAhir));
					}

					if (date3 == 0) {
						data.pelaksanaanPekerjaanAwal = '-';
					} else {
						data.pelaksanaanPekerjaanAwal = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPekerjaanAwal));
					}

					if (date4 == 0) {
						data.pelaksanaanPekerjaanAhir = '-';
					} else {
						data.pelaksanaanPekerjaanAhir = DateHelper.getPeriodeFormatted(new Date(data.pelaksanaanPekerjaanAhir));
					}

					data.tanggalPengajuan = DateHelper.getPeriodeFormatted(date5);

				})
			});

			$scope.cariRup = function() {
				
				var tgl;

				if ($scope.item.dari !== undefined && $scope.item.sampai !== undefined) {
					tgl = "dateStart="+DateHelper.getPeriodeFormatted(new Date($scope.item.dari))+"&dateEnd="+DateHelper.getPeriodeFormatted(new Date($scope.item.sampai));
				} else {
					tgl = "dateStart=&dateEnd=";
				}

				dataRupService.getDataRUP("detail-rup/find-rup-list?"+tgl, true).then(function(dat){
					$scope.dataRupVerified = dat.data.data;
					//debugger;

					// $scope.dataRupVerified.forEach(function(data){
					// 	var date6 = new Date(data.pelaksanaanPemilihanAwal);
					// 	var date7 = new Date(data.pelaksanaanPemilihanAhir);
					// 	var date8 = new Date(data.pelaksanaanPekerjaanAwal);
					// 	var date9 = new Date(data.pelaksanaanPekerjaanAhir);
					// 	var date10 = new Date(data.tanggalPengajuan);


					// 	data.pelaksanaanPemilihanAwal = DateHelper.getTanggalFormatted(date6);
					// 	data.pelaksanaanPemilihanAhir = DateHelper.getTanggalFormatted(date7);
					// 	data.pelaksanaanPekerjaanAwal = DateHelper.getTanggalFormatted(date8);
					// 	data.pelaksanaanPekerjaanAhir = DateHelper.getTanggalFormatted(date9);
					// 	data.tanggalPengajuan = DateHelper.getTanggalFormatted(date10);

					// })
				});	
			}
			
			$scope.mainGridOptionsVerified = {
				pageable: true,
				columns: [
				{
					field: "namaKegiatan",
					title: "Kegiatan",
					width: 400
				},
				{
					field: "kegiatanDetail",
					title: "Detail Kegiatan",
					width: 275
				},
				{
					field: "spesifikasi",
					title: "Nama Paket Pengadaan",
					width: 250
				},
				{
					field: "namaKomponen",
					title: "Komponen",
					width: 150
				},
				{
					field: "sumberDana",
					title: "Sumber Dana",
					width: 200
				},
				{
					field: "namPengadaan",
					title: "Pengadaan",
					width: 100,
					attributes: {
						style: "text-align:center"
					}
				},
				{
					field: "jumlahBiaya",
					title: "Total Biaya",
					width: 130,
					format: "{0:n0}",
					attributes: {
						style: "text-align:right"
					}
				}
				// {
				// 	field: "namaProduk",
				// 	title: "Spek",
				// 	width: 150
				// },
				// {
				// 	field: "tahunAnggaran",
				// 	title: "Tahun<br/>Anggaran",
				// 	width: 100
				// },
				// {
				// 	field: "namaSatuan",
				// 	title: "Satuan",
				// 	width: 100
				// },
				// {
				// 	field: "jumlahBiaya",
				// 	title: "Total Biaya",
				// 	width: 100,
				// 	format: "{0:n0}",
				// 	attributes: {
				// 		style: "text-align:right"
				// 	}
				// },
				// {
				// 	field: "tanggalPengajuan",
				// 	title: "Tanggal Pengajuan",
				// 	width: 100
				// },
				// {	title: "Pelaksanaan Pemilihan",
				// 	columns: [{
				// 		field: "pelaksanaanPemilihanAwal",
				// 		title: "Awal",
				// 		width: 100
				// 	},
				// 	{
				// 		field: "pelaksanaanPemilihanAhir",
				// 		title: "Akhir",
				// 		width: 100
				// 	}]
				// },
				// {
				// 	title: "Pelaksanaan Pekerjaan",
				// 	columns: [
				// 	{
				// 		field: "pelaksanaanPekerjaanAwal",
				// 		title: "Awal",
				// 		width: 100
				// 	},
				// 	{
				// 		field: "pelaksanaanPekerjaanAhir",
				// 		title: "Akhir",
				// 		width: 100
				// 	}]
				// },
				// {
				// 	field: "keteranganRup",
				// 	title: "Keterangan",
				// 	width: 300
				// }
				],
				//editable: true
			};

			$scope.kl = function(current){
				$scope.current = current;
			}

			$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;
		    };

		    $scope.lihatDetil = function(data) {

				$state.go('detailRUP', {
	                noRec: $scope.current.noRec
	            });

		    };

			$scope.batal = function() {
			  	window.history.back();
			};
		}
	]);
});