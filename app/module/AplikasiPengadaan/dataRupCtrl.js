define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('dataRupCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'dataRupService',
		function($rootScope, $scope, $state, ModelItem, DateHelper, dataRupService) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;

			dataRupService.getData("Pengendali&select=*", true).then(function(dat){
				$scope.listPengendali = dat.data;
			});

			$scope.listFilters = [
				{"kd": "noRec", "name": "No. Record"},
				{"kd": "detail", "name": "Detail"},
				{"kd": "spek", "name": "Spesifikasi"},
				{"kd": "kegiatan", "name": "Kegiatan"}
			];

			dataRupService.getDataRUP("detail-rup/list-rup", true).then(function(dat){
				$scope.dataRupLengkap = dat.data.data;
				$scope.dataRupLengkap.forEach(function(data){
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
				
				var tglAwal = DateHelper.getPeriodeFormatted($scope.item.dari);
				var tglAkhir = DateHelper.getPeriodeFormatted($scope.item.sampai);

				if ($scope.item.pengendali.id !== undefined) {
					var paramPengendali = "pengendaliId=" + $scope.item.pengendali.id;
				} else {
					var paramPengendali = "pengendaliId=";
				}

				dataRupService.getDataRUP("detail-rup/list-rup?take=5&page=1&dateStart="+tglAwal+"&dateEnd="+tglAkhir+"&"+paramPengendali, true).then(function(dat){
					$scope.dataRupLengkap = dat.data.data;

					$scope.dataRupLengkap.forEach(function(data){
					var date6 = new Date(data.pelaksanaanPemilihanAwal);
					var date7 = new Date(data.pelaksanaanPemilihanAhir);
					var date8 = new Date(data.pelaksanaanPekerjaanAwal);
					var date9 = new Date(data.pelaksanaanPekerjaanAhir);
					var date10 = new Date(data.tanggalPengajuan);


					data.pelaksanaanPemilihanAwal = DateHelper.getTanggalFormatted(date6);
					data.pelaksanaanPemilihanAhir = DateHelper.getTanggalFormatted(date7);
					data.pelaksanaanPekerjaanAwal = DateHelper.getTanggalFormatted(date8);
					data.pelaksanaanPekerjaanAhir = DateHelper.getTanggalFormatted(date9);
					data.tanggalPengajuan = DateHelper.getTanggalFormatted(date10);

				})
				});	
			}

			$scope.mainGridOptions = {
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
					field: "jumlahBiaya",
					title: "Total Biaya",
					width: 130,
					format: "{0:n0}",
					attributes: {
						style: "text-align:right"
					}
				}]
			};

			$scope.kl = function(current){
				$scope.current = current;
			}

			$scope.handleChange = function(data, dataItem, columns) {
		      	$scope.data = data;
		      	$scope.columns = columns;
		      	$scope.dataItem = dataItem;
		    };

		    $scope.verifikasiBaru = function(data) {
		    	$state.go('PenyusunanRUP', {
					noRec: data.noRec
	            });
		    }

		    $scope.lihatRup = function(data) {
				$state.go('dataRUPVerified');
		    }
		}
	]);
});