define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', 'DaftarPegawaiService', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, $document, r, DaftarPegawaiService, $state) {
			
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.enableNoId = true;
			$scope.enableJenisPegawai = true;
			$scope.enableNamaLengkap = true;
			$scope.enableJenisKelamin = true;
			$scope.enableTempatLahir = true;
			$scope.enableTglLahir = true;
			$scope.enableTglMasuk = true;
			$scope.enableNip = true;
			$scope.enableJabatanStruktural = true;
			$scope.enableJabatanFungsional = true;
			$scope.enableNoBPJS = true;
			$scope.enableSatuanKerja = true;


			ModelItem.get("K3/DaftarPegawai").then(function (data) {
				$scope.item = {};
				$scope.item = data;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });
			$scope.item = {};
			$scope.mainGridOptions = {
                dataBound: function () { }
            };

			$scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }

			// ModelItem.getGridOption("pegawai/get-all-pegawai?page=0", $scope.columnDataPegawai).then(function(data) {
			// 	$scope.daftarDataPegawai = data.data.data;
			// 	$scope.mainGridOptions = data;
			// })

			$scope.daftarDataPegawai = new kendo.data.DataSource({
				data: [

				]

			});

			$scope.columnDataPegawai = [
				{
					"field": "id",
					"title": "ID Pegawai",
					"width": "100px"
				}, {
					"field": "jenisPegawai.jenisPegawai",
					"title": "Jenis Pegawai",
					"width": "100px"
				}, {
					"field": "namaLengkap",
					"title": "Nama Pegawai",
					"width": "200px"
				},
				{
					"field": "jenisKelamin.jenisKelamin",
					"title": "Jenis Kelamin",
					"width": "100px"
				},
				{
					"field": "tempatLahir",
					"title": "Tempat Lahir",
					"width": "100px"
				}, {
					"field": "tglLahir",
					"title": "Tanggal Lahir",
					"width": "100px"
				}, {
					"field": "tglMasuk",
					"title": "Tanggal Masuk",
					"width": "110px"
				}, {
					"field": "nipPns",
					"title": "NIP",
					"width": "150px"
				},
				{
					"field": "jabatanStruktural.namaJabatan",
					"title": "Jabatan Struktural",
					"width": "200px"
				},
				{
					"field": "jabatanFungsional.namaJabatan",
					"title": "Jabatan Fungsional",
					"width": "200px"
				},
				{
					"field": "noBpjs",
					"title": "No BPJS",
					"width": "150px"
				}, {
					"field": "satuanKerja.satuanKerja",
					"title": "Satuan Kerja",
					"width": "200px"
				}];

			


			$scope.navToRiwayat = function (selectedData) {
				debugger;
                $state.go('Riwayat', {
                    id: selectedData.id
                });
            };

			$scope.navToJadwalRencanaPemeriksaan = function () {
				debugger;
                $state.go('JadwalRencanaPemeriksaan', {
                });
            };

			var page = 0;
			DaftarPegawaiService.findAllPegawai("pegawai/get-all-pegawai?page=" + page).then(function success(dat) {
				$scope.daftarDataPegawai = dat.data.data;

				var i = 0;

				for (i = 0; i < $scope.daftarDataPegawai.length; i++) {

					if ($scope.daftarDataPegawai[i].jabatanStruktural == undefined || $scope.daftarDataPegawai[i].jabatanStruktural === null || $scope.daftarDataPegawai[i].jabatanStruktural == "null" || $scope.daftarDataPegawai[i].jabatanStruktural == "")
						$scope.daftarDataPegawai[i].jabatanStruktural = {
							"namaJabatan": ""
						};

					if ($scope.daftarDataPegawai[i].jabatanFungsional == undefined || $scope.daftarDataPegawai[i].jabatanFungsional === null || $scope.daftarDataPegawai[i].jabatanFungsional == "null" || $scope.daftarDataPegawai[i].jabatanFungsional == "")
						$scope.daftarDataPegawai[i].jabatanFungsional = {
							"namaJabatan": ""
						};

					if ($scope.daftarDataPegawai[i].satuanKerja == undefined || $scope.daftarDataPegawai[i].satuanKerja === null || $scope.daftarDataPegawai[i].satuanKerja == "null" || $scope.daftarDataPegawai[i].satuanKerja == "")
						$scope.daftarDataPegawai[i].satuanKerja = {
							"satuanKerja": ""
						};

					if ($scope.daftarDataPegawai[i].tglLahir == undefined)
						$scope.daftarDataPegawai[i].tglLahir = "";
					else
						$scope.daftarDataPegawai[i].tglLahir = DateHelper.getTanggalFormatted(new Date($scope.daftarDataPegawai[i].tglLahir))

					if ($scope.daftarDataPegawai[i].tglMasuk == undefined)
						$scope.daftarDataPegawai[i].tglMasuk = "";
					else
						$scope.daftarDataPegawai[i].tglMasuk = DateHelper.getTanggalFormatted(new Date($scope.daftarDataPegawai[i].tglMasuk))

					// if($scope.daftarDataPegawai[i].jabatanStruktural.namaJabatan == undefined || $scope.daftarDataPegawai[i].jabatanStruktural.namaJabatan =="")

				}
            }, function error(error) {
                console.log(error);
            });

			DaftarPegawaiService.getListPegawai("Pegawai&select=id,namaLengkap").then(function success(dat) {
				$scope.dataPegawai = dat.data;

			}, function error(error) {
                console.log(error);
            });

			$scope.selectPegawai = function (data) {
				$scope.item.noId = data.id;
				$scope.item.jenisPegawai = data.jenisPegawai.jenisPegawai;
				$scope.item.namaLengkap = data.namaLengkap;
				$scope.item.jenisKelamin = data.jenisKelamin.jenisKelamin;
				$scope.item.tempatLahir = data.tempatLahir;

				$scope.item.tglLahir = data.tglLahir;
				$scope.item.tglMasuk = data.tglMasuk;
				$scope.item.nipPns = data.nipPns;
				$scope.item.noBpjs = data.noBpjs;
				$scope.item.jabatanStruktural = data.jabatanStruktural.namaJabatan;
				$scope.item.jabatanFungsional = data.jabatanFungsional.namaJabatan;
				$scope.item.satuanKerja = data.satuanKerja.satuanKerja;
			}

			$scope.pegOptions = {
				dataTextField: "namaLengkap",
                dataValueField: "id",
			}

			$scope.findData = function () {
				DaftarPegawaiService.findPegawai("pegawai/get-all-pegawai?id=" + $scope.item.cariPegawai[0].id).then(function success(dat) {
					$scope.daftarDataPegawai = dat.data.data;

					var i = 0;

					for (i = 0; i < $scope.daftarDataPegawai.length; i++) {


						if ($scope.daftarDataPegawai[i].jabatanStruktural == undefined || $scope.daftarDataPegawai[i].jabatanStruktural === null || $scope.daftarDataPegawai[i].jabatanStruktural == "null" || $scope.daftarDataPegawai[i].jabatanStruktural == "")
							$scope.daftarDataPegawai[i].jabatanStruktural = {
								"namaJabatan": ""
							};

						if ($scope.daftarDataPegawai[i].jabatanFungsional == undefined || $scope.daftarDataPegawai[i].jabatanFungsional === null || $scope.daftarDataPegawai[i].jabatanFungsional == "null" || $scope.daftarDataPegawai[i].jabatanFungsional == "")
							$scope.daftarDataPegawai[i].jabatanFungsional = {
								"namaJabatan": ""
							};

						if ($scope.daftarDataPegawai[i].satuanKerja == undefined || $scope.daftarDataPegawai[i].satuanKerja === null || $scope.daftarDataPegawai[i].satuanKerja == "null" || $scope.daftarDataPegawai[i].satuanKerja == "")
							$scope.daftarDataPegawai[i].satuanKerja = {
								"satuanKerja": ""
							};

						if ($scope.daftarDataPegawai[i].tglLahir == undefined)
							$scope.daftarDataPegawai[i].tglLahir = "";
						else
							$scope.daftarDataPegawai[i].tglLahir = DateHelper.getTanggalFormatted(new Date($scope.daftarDataPegawai[i].tglLahir))

						if ($scope.daftarDataPegawai[i].tglMasuk == undefined)
							$scope.daftarDataPegawai[i].tglMasuk = "";
						else
							$scope.daftarDataPegawai[i].tglMasuk = DateHelper.getTanggalFormatted(new Date($scope.daftarDataPegawai[i].tglMasuk))

						// if($scope.daftarDataPegawai[i].jabatanStruktural.namaJabatan == undefined || $scope.daftarDataPegawai[i].jabatanStruktural.namaJabatan =="")

					}

				}, function error(error) {
					console.log(error);
				});
			}


		}
	]);
});