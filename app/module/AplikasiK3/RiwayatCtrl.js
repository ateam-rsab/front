define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RiwayatCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$state', 'RiwayatService',
		function ($rootScope, $scope, ModelItem, DateHelper, $state, RiwayatService) {
			$scope.tab1 = "Hasil Pemeriksaan Pra - Kerja";
			$scope.tab2 = "General Check - Up";
			$scope.tab3 = "Laboratorium";
			$scope.tab4 = "Radiologi";
			$scope.tab5 = "Riwayat Penyakit";
			$scope.dataVOloaded = true;

			$scope.item = {};
			// $scope.columnHasilPemeriksaan = [
			// 	{
			// 		"field": "dataPemeriksaanPraKerjaSet[0].tglPemeriksaan",
			// 		"title": "Tanggal Pemeriksaan"
			// 	},
			// 	{
			// 		"field": "dataPemeriksaanPraKerjaSet[0].tekananDarah",
			// 		"title": "Tekanan Darah"
			// 	},
			// 	{
			// 		"field": "dataPemeriksaanPraKerjaSet[0].pernapasan",
			// 		"title": "Pernapasan"
			// 	},
			// 	{
			// 		"field": "dataPemeriksaanPraKerjaSet[0].nadi",
			// 		"title": "Nadi"
			// 	},
			// 	{
			// 		"field": "dataPemeriksaanPraKerjaSet[0].suhu",
			// 		"title": "Suhu"
			// 	},
			// 	{
			// 		"field": "dataPemeriksaanPraKerjaSet[0].berat",
			// 		"title": "Berat"
			// 	},
			// 	{
			// 		"field": "dataPemeriksaanPraKerjaSet[0].tinggiBadan",
			// 		"title": "Tinggi Badan"
			// 	}
			// ];
			$scope.columnHasilPemeriksaan = [
				{
					"field": "tglPemeriksaan",
					"title": "Tanggal Pemeriksaan"
				},
				{
					"field": "tekananDarah",
					"title": "Tekanan Darah"
				},
				{
					"field": "pernapasan",
					"title": "Pernapasan"
				},
				{
					"field": "nadi",
					"title": "Nadi"
				},
				{
					"field": "suhu",
					"title": "Suhu"
				},
				{
					"field": "berat",
					"title": "Berat"
				},
				{
					"field": "tinggiBadan",
					"title": "Tinggi Badan"
				}
			];
			$scope.columnCheckUp = [
				{
					"field": "dataGeneralCheckUpSet[0].noPemeriksaan",
					"title": "No Pemeriksaan"
				},
				{
					"field": "dataGeneralCheckUpSet[0].namaPemeriksaan",
					"title": "Nama Pemeriksaan"
				},
				{
					"field": "dataGeneralCheckUpSet[0].dokterPemeriksa.namaLengkap",
					"title": "Dokter Pemeriksa"
				},
				{
					"field": "dataGeneralCheckUpSet[0].hasilPemeriksaan",
					"title": "Hasil Pemeriksaan"
				}
				
				// {
				// 	command: { text: "Cetak Hasil", click: $scope.cetak },
				// 	title: "&nbsp;",
				// 	width: "110px"
				// },
				// {
				// 	command: { text: "Upload Hasil", click: $scope.upload },
				// 	title: "&nbsp;",
				// 	width: "110px"
				//
				// }
			];
			$scope.columnVaksin = [
				{
					"field": "dataVaksinSet[0].tglPeriksa",
					"title": "Tanggal Pemeriksaan"
				},
				{
					"field": "dataVaksinSet[0].namaPemeriksaan",
					"title": "Nama Pemeriksaan"
				},
				{
					"field": "dataVaksinSet[0].dokterPemeriksa.namaLengkap",
					"title": "Dokter Pemeriksa"
				},
				{
					"field": "dataVaksinSet[0].hasilPemeriksaan",
					"title": "Hasil Pemeriksaan"
				}
				
			];
			$scope.columnPap = [
				{
					"field": "dataPapSmearSet[0].noPemeriksaan",
					"title": "No Pemeriksaan"
				},
				{
					"field": "dataPapSmearSet[0].namaPemeriksaan",
					"title": "Nama Pemeriksaan"
				},
				{
					"field": "dataPapSmearSet[0].dokterPemeriksa.namaLengkap",
					"title": "Dokter Pemeriksa"
				},
				{
					"field": "dataPapSmearSet[0].hasilPemeriksaan",
					"title": "Hasil Pemeriksaan"
				},
				
				// {
				// 	command: { text: "Cetak Hasil", click: $scope.cetak },
				// 	title: "&nbsp;",
				// 	width: "110px"
				// },
				// {
				// 	command: { text: "Upload Hasil", click: $scope.upload },
				// 	title: "&nbsp;",
				// 	width: "110px"
				// }
			];
			$scope.columnRiwayatPenyakit = [
				{
					"field": "tanggalPemeriksaan",
					"title": "Tanggal Pemeriksaan"
				},
				{
					"field": "namaDiagnosa",
					"title": "Penyakit"
				},
				{
					"field": "namaDokter",
					"title": "Dokter Pemeriksa"
				}
			];
			$scope.dataSourceHasilPeriksa = [
				{
					"tglPemeriksaan": DateHelper.getTanggalFormatted(new Date()),
					"tekananDarah": "90/120",
					"pernapasan": "5 liter",
					"nadi": "normal",
					"suhu": "27",
					"berat": "85 kg",
					"tinggiBadan": "180 Cm"
				}
			];
			$scope.dataSourceCheckUp = [
				{
					"noLab": "01",
					"tglHasil": DateHelper.getTanggalFormatted(new Date()),
					"dokterPemeriksa": "Reisa"
				}
			];
			$scope.dataSourceVaksin = [
				{
					"tglPeriksa": DateHelper.getTanggalFormatted(new Date()),
					"namaVaksin": "Vaksin Asli",
					"dokter": "Reisa"
				}
			];
			$scope.dataSourcePap = [
				{
					"noPeriksa": "99",
					"tglHasil": DateHelper.getTanggalFormatted(new Date()),
					"dokter": "Ryan"
				}
			];
			$scope.dataSourceRiwayat = [
				{
					"tglPeriksa": DateHelper.getTanggalFormatted(new Date()),
					"penyakit": "Gagal Jantung",
					"dokter": "Ryan"
				}
			];

			$scope.item.id = $state.params.id;

			RiwayatService.findPegawaiId("pegawai/get-all-pegawai?id=" + $state.params.id).then(function success(dat) {
				console.log("asd" + JSON.stringify(dat.data.data[0].namaLengkap));
				$scope.item.id = dat.data.data[0].id;
				$scope.item.namaPegawai = dat.data.data[0].namaLengkap;
				$scope.item.jenisKelamin = dat.data.data[0].jenisKelamin.jenisKelamin;
				$scope.item.jenisPegawai = dat.data.data[0].jenisPegawai.jenisPegawai;
				$scope.item.jabatan = dat.data.data[0].jabatanStruktural.namaJabatan;

            }, function error(error) {
                console.log(error);
            });


			// RiwayatService.findPegawai("hasil-pemeriksaan-pra-kerja/find-by-pegawai-id/?pegawaiId=", $state.params.id).then(function success(dat) {

			// 	$scope.dataSourceHasilPeriksa = dat.data.data.data;
			// 	var i;
			// 	for (i = 0; i < $scope.dataSourceHasilPeriksa.length; i++) {
			// 		if ($scope.dataSourceHasilPeriksa[i].dataPemeriksaanPraKerjaSet[0].tglPeriksa == undefined)
			// 			$scope.dataSourceHasilPeriksa[i].dataPemeriksaanPraKerjaSet[0].tglPeriksa = "";
			// 		else
			// 			$scope.dataSourceHasilPeriksa[i].dataPemeriksaanPraKerjaSet[0].tglPeriksa = DateHelper.getTanggalFormatted(new Date($scope.dataSourceHasilPeriksa[i].dataPemeriksaanPraKerjaSet[0].tglPeriksa))

			// 	}
            // }, function error(error) {
            //     console.log(error);
            // });

			// RiwayatService.findPegawai("general-checkup/find-by-pegawai-id/?pegawaiId=", $state.params.id).then(function success(dat) {
			// 	$scope.dataSourceCheckUp = dat.data.data.data;
			// 	var i;
			// 	for (i = 0; i < $scope.dataSourceCheckUp.length; i++) {

			// 		if ($scope.dataSourceCheckUp[i].dataGeneralCheckUpSet[0].tglHasil == undefined)
			// 			$scope.dataSourceCheckUp[i].dataGeneralCheckUpSet[0].tglHasil = "";
			// 		else
			// 			$scope.dataSourceCheckUp[i].dataGeneralCheckUpSet[0].tglHasil = DateHelper.getTanggalFormatted(new Date($scope.dataSourceCheckUp[i].dataGeneralCheckUpSet[0].tglHasil))
			// 	}
            // }, function error(error) {
            //     console.log(error);
            // });

			// RiwayatService.findPegawai("vaksin/find-by-pegawai-id/?pegawaiId=", $state.params.id).then(function success(dat) {
			// 	$scope.dataSourceVaksin = dat.data.data.data;
			// 	var i;
			// 	for (i = 0; i < $scope.dataSourceVaksin.length; i++) {

			// 		if ($scope.dataSourceVaksin[i].dataVaksinSet[0].tglPeriksa == undefined)
			// 			$scope.dataSourceVaksin[i].dataVaksinSet[0].tglPeriksa = "";
			// 		else
			// 			$scope.dataSourceVaksin[i].dataVaksinSet[0].tglPeriksa = DateHelper.getTanggalFormatted(new Date($scope.dataSourceVaksin[i].dataVaksinSet[0].tglPeriksa))
			// 	}
            // }, function error(error) {
            //     console.log(error);
            // });

			// RiwayatService.findPegawai("pap-smear/find-by-pegawai-id/?pegawaiId=", $state.params.id).then(function success(dat) {
			// 	$scope.dataSourcePap = dat.data.data.data;
			// 	var i;
			// 	for (i = 0; i < $scope.dataSourcePap.length; i++) {

			// 		if ($scope.dataSourcePap[i].dataPapSmearSet[0].tglHasil == undefined)
			// 			$scope.dataSourcePap[i].dataPapSmearSet[0].tglHasil = "";
			// 		else
			// 			$scope.dataSourcePap[i].dataPapSmearSet[0].tglHasil = DateHelper.getTanggalFormatted(new Date($scope.dataSourcePap[i].dataPapSmearSet[0].tglHasil))

			// 	}
            // }, function error(error) {
            //     console.log(error);
            // });

			// RiwayatService.getRiwayatPenyakit("diagnosa-pasien/get-by-no-cm?noCM=00000003").then(function success(dat) {
			// 	$scope.dataSourceRiwayat = dat.data.data.diagnosaPasien;
			// 	var i;
			// 	for (i = 0; i < $scope.dataSourceRiwayat.length; i++) {
			// 		if ($scope.dataSourceRiwayat[i].tanggalPendaftaran == undefined)
			// 			$scope.dataSourceRiwayat[i].tanggalPendaftaran = "";
			// 		else {
			// 			$scope.dataSourceRiwayat[i].tanggalPendaftaran = DateHelper.getTanggalFormatted(new Date($scope.dataSourceRiwayat[i].tanggalPendaftaran))
			// 		}

			// 	}
            // }, function error(error) {
            //     console.log(error);
            // });

		}])
})