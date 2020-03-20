define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('LaporanGeneralCtrl', ['ReportHelper', '$state', '$q', '$scope',
		function(reportHelper, $state, $q, $scope) {

			$scope.title = $state.params.NamaLaporan.replace(/([A-Z])/g, ' $1').trim();

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal = $scope.now;
			$scope.item.periodeAkhir = $scope.now;

			$scope.isLoadingData = false;
			$scope.keteranganLoading = "Harap tunggu sedang memproses data laporan"

			$scope.ShowLaporan = function(){
				var periodeAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
				var periodeAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');
				var urlNamaLaporan = "";
				switch($state.params.NamaLaporan) {
				    case "LaporanBukuRegisterMasukRi":
				        urlNamaLaporan = "reporting/lapBukuRegisterMasukRi";
				        break;
				    case "LaporanBukuRegisterPelayananRi":
				        urlNamaLaporan = "reporting/lapBukuRegisterPelayananRi";
				        break;
				    case "LaporanKunjungan":
				        urlNamaLaporan = "reporting/lapKunjunganBds";
				        break;
				    case "LaporanSensusHarian":
				        urlNamaLaporan = "reporting/lapSensusHarian";
				        break;
				    
				}

				if($scope.isLaporanKunjungan)
				{
					urlNamaLaporan = urlNamaLaporan + $scope.item.berdasarkan.urlName;
				}

				$scope.urlLaporan = reportHelper.open(urlNamaLaporan+"?startDate="+periodeAwal+"&endDate="+periodeAkhir);
				
				$scope.isLoadingData = true;

				reportHelper.get($scope.urlLaporan).then(function(data){
					$scope.isLoadingData = false;
				}, function(reason) {
					$scope.isLoadingData = false;
				    window.messageContainer.error("Gagal menampilkan laporan");
				});
			}

			
			$scope.listTipeKunjungan = [
			{ "id":1, "name":"Ruangan, Jenis pasien dan Status", "urlName":"RuanganJenisPasienStatus" },
			{ "id":2, "name":"Jenis Diagnosa", "urlName":"JenisDiagnosa" },
			{ "id":3, "name":"Status dan Jenis Operasi", "urlName":"StatusDanJenisOperasi" },
			{ "id":4, "name":"Status dan Jenis Pasien", "urlName":"StatusDanJenisPasien" },
			{ "id":5, "name":"Status dan Kasus Penyakit Pasien", "urlName":"StatusDanKasusPenyakitPasien" },
			{ "id":6, "name":"Status dan Kelas", "urlName":"StatusDanKelas" },
			{ "id":7, "name":"Status dan Kondisi Pulang", "urlName":"StatusDanKondisiPulang" },
			{ "id":8, "name":"Status dan Rujukan", "urlName":"StatusDanRujukan" },
			{ "id":9, "name":"Wilayah", "urlName":"Wilayah" }
			];

			$scope.isLaporanKunjungan = false;
			if($state.params.NamaLaporan == "LaporanKunjungan"){
				$scope.isLaporanKunjungan = true;
				$scope.item.berdasarkan = $scope.listTipeKunjungan[0];
			}

			$scope.ShowLaporan();

		}
	]);
});