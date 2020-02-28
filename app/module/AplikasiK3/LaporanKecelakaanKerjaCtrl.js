define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('LaporanKecelakaanKerjaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', 'ManageSarpras', 'ManageKKKL',
		function ($rootScope, $scope, ModelItem, DateHelper, $document, r, ManageSarpras, ManageKKKL) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.showRawatInap = false;
			$scope.item = {};
			$scope.item.tglKejadian = $scope.now;
			$scope.item.satuan = {
				"satuan": "Jam"
			};
			var arrKorban = [];

			$scope.listSaksi = new kendo.data.DataSource({
				data: [],
				schema: {
					model: {
						id: "namaSaksi",
						fields: {

							namaSaksi: { editable: true, nullable: false, validation: { required: true } },
							pekerjaan: { editable: true, nullable: false, validation: { required: true } },
							noKontak: {
								editable: true, nullable: false, validation: { required: true }
							},
						}
					}
				}
			});

			$scope.columnSaksi = [

				{
					"field": "namaSaksi",
					"title": "Nama Saksi",
					"width": "100px"
				},
				{
					"field": "pekerjaan",
					"title": "Pekerjaan",
					"width": "100px"

				},
				{
					"field": "noKontak",
					"title": "Nomor Telepon/HP",
					"width": "100px"

				},
				{
					command: [{
						name: "edit",
						text: { edit: "Edit", cancel: "Batal", update: "Simpan" }
					}, { name: "destroy", text: "Hapus" }],
					title: "&nbsp;",
					width: "75px"
				}
			];

			$scope.listKorban = new kendo.data.DataSource({
				data: [

				],
				schema: {
					model: {
						id: "namaKorban",
						fields: {

							namaKorban: { editable: false, nullable: false, validation: { required: true } },
							niKependudukan: { editable: false, nullable: false, validation: { required: true } },
							tempatLahir: { editable: false, nullable: false, validation: { required: true } },
							tglLahir: { editable: false, nullable: false, validation: { required: true } },
							jenisKelamin: { editable: false, nullable: false, validation: { required: true } },
							statusPekerjaan: { editable: false, nullable: false, validation: { required: true } },
							statusJabatan: { editable: false, nullable: false, validation: { required: true } },
							namaRuangan: { editable: false, nullable: false, validation: { required: true } },
							tindakanPenolong: { editable: false, nullable: false, validation: { required: true } },


						}
					}
				}

			});

			$scope.columnKorban = [
				{
					"field": "namaKorban",
					"title": "<h3 align='center'>Nama Korban</h3>",
					width: "150px"
				},
				{
					"field": "niKependudukan",
					"title": "<h3 align='center'>N.I.K</h3>",
					width: "100px"

				},
				{
					"field": "tempatLahir",
					"title": "<h3 align='center'>Tempat Lahir</h3>",
					width: "100px"

				},
				{
					"field": "tglLahir",
					"title": "<h3 align='center'>Tanggal Lahir</h3>",
					template: '#= kendo.toString(tglLahir, "dd/MM/yyyy") #',
					width: "100px"

				},
				{
					"field": "jenisKelamin",
					"title": "<h3 align='center'>Jenis Kelamin</h3>",
					width: "100px"

				},
				// {
				// 	"field": "statusPekerjaan",
				// 	"title": "<h3 align='center'>Status<br>Pekerjaan</h3>",
				// 	width: "100px"

				// },
				{
					"field": "statusJabatan",
					"title": "<h3 align='center'>Status Jabatan</h3>",
					width: "100px"

				},
				{
					"field": "namaRuangan",
					"title": "<h3 align='center'>Unit<br>Ruangan<br>Kerja</h3>",
					width: "100px"

				},
				{
					"field": "tindakanPenolong",
					"title": "<h3 align='center'>Tindakan<br>Penolongan</h3>",
					"width": "100px"
				},
				{
					command: ["destroy"],
					title: "&nbsp;",
					width: "100px"
				}
			];
			$scope.optionsSaksi = {
				dataSource: $scope.listSaksi,
				pageable: false,
				toolbar: [{ name: "create", text: "Tambah Data" }],
				editable: {
					mode: "inline",
					// template: kendo.template($("#popup-editor").html())
				},
				columns: $scope.columnSaksi,

			};

			$scope.optionsKorban = {
				dataSource: $scope.listKorban,
				pageable: false,
				scrollable: true,
				editable: {
					mode: "inline",
					// template: kendo.template($("#popup-editor").html())
				},
				columns: $scope.columnKorban,

			};			

			ManageSarpras.getOrderList("k3-laporan-kecelakaan-kerja/get-unit-ruangan").then(function (dat) {
				
				$scope.listUnitRuangan = dat.data.data.unitRuangan;
			});

			ManageKKKL.getOrderList('k3-laporan-kecelakaan-kerja/get-unit-ruangan').then(function (dat) {
				$scope.listDdlRuangan = dat.data.unitRuangan;
			});

			ManageSarpras.getOrderList("k3-laporan-kecelakaan-kerja/get-login-pelapor").then(function (dat) {
				
				$scope.pelapor = dat.data.data;
			});

			$scope.listJenisKelamin = [
				{
					"id": 1,
					"jenisKelamin": "Laki-laki"
				},
				{
					"id": 2,
					"jenisKelamin": "Perempuan"
				}
			]

			$scope.listRawatInap = [
				{
					"id": 0,
					"rawatInap": "Tidak"
				},
				{
					"id": 1,
					"rawatInap": "Ya"
				}
			]

			$('#ddlRawatInap').kendoDropDownList({
				dataSource: $scope.listRawatInap,
				dataTextField: "rawatInap",
				dataValueField: "id",
				change: function (e) {
					var dataItem = e.sender.selectedIndex;
					if (dataItem === 1) {
						$('#idTindakanRawatInap').show();
					} else {
						$('#idTindakanRawatInap').hide();
					}
				}
			});

			var ddlRawatInap = $("#ddlRawatInap").data('kendoDropDownList');
			ddlRawatInap.select(0);

			$scope.listRawatJalan = [
				{
					"id": 0,
					"rawatJalan": "Tidak"
				},
				{
					"id": 1,
					"rawatJalan": "Ya"
				}
			]
			$('#ddlRawatJalan').kendoDropDownList({
				dataSource: $scope.listRawatJalan,
				dataTextField: "rawatJalan",
				dataValueField: "id",
				change: function (e) {
					var dataItem = e.sender.selectedIndex;
					if (dataItem === 1) {
						$('#idRawatJalan').show();
					} else {
						$('#idRawatJalan').hide();
					}
				}
			})

			$scope.listPengobatanDiLuar = [
				{
					"id": 0,
					"pengobatanDiLuar": "Tidak"
				},
				{
					"id": 1,
					"pengobatanDiLuar": "Ya"
				}
			]
			$('#pengobatanDiLuar').kendoDropDownList({
				dataSource: $scope.listPengobatanDiLuar,
				dataTextField: "pengobatanDiLuar",
				dataValueField: "id",
				change: function (e) {
					var dataItem = e.sender.selectedIndex;
					if (dataItem === 1) {
						$('#idTindakanDiLuar').show();
					} else {
						$('#idTindakanDiLuar').hide();
					}
				}
			})
			var ddlTindakanDiluar = $('#pengobatanDiLuar').data('kendoDropDownList');
			ddlTindakanDiluar.select(0);

			$scope.listStatusAda = [
				{
					"id": 0,
					"statusAda": "Tidak Ada"
				},
				{
					"id": 1,
					"statusAda": "Ada"
				}
			]
			$('#ddlBiayaYgDikeluarkan').kendoDropDownList({
				dataSource: $scope.listStatusAda,
				dataTextField: "statusAda",
				dataValueField: "id",
				change: function (e) {
					var dataItem = e.sender.selectedIndex;
					if (dataItem === 1) {
						$('#idBiayaSesaat').show();
					} else {
						$('#idBiayaSesaat').hide();
					}
				}
			})
			var ddlBiayaYgDikeluarkan = $('#ddlBiayaYgDikeluarkan').data('kendoDropDownList');
			ddlBiayaYgDikeluarkan.select(0);

			$('#ddlBiayaPengobatan').kendoDropDownList({
				dataSource: $scope.listStatusAda,
				dataTextField: "statusAda",
				dataValueField: "id",
				change: function (e) {
					var dataItem = e.sender.selectedIndex;
					if (dataItem === 1) {
						$('#idBiayaPengobatan').show();
					} else {
						$('#idBiayaPengobatan').hide();
					}
				}
			});

			var ddlBiayaPengobatan = $('#ddlBiayaPengobatan').data('kendoDropDownList');
			ddlBiayaPengobatan.select(0);

			$('#ddlPengobatanDibutuhkan').kendoDropDownList({
				dataSource: $scope.listStatusAda,
				dataTextField: "statusAda",
				dataValueField: "id",
				change: function (e) {
					var dataItem = e.sender.selectedIndex;
					if (dataItem === 1) {
						$('#idBiayaPemulihan').show();
					} else {
						$('#idBiayaPemulihan').hide();
					}
				}
			});

			var ddlLamaIstirahat = $('#ddlLamaIstirahat').data('kendoDropDownList');
			// ddlLamaIstirahat.select(0);
			$('#ddlLamaIstirahat').kendoDropDownList({
				dataSource: $scope.listStatusAda,
				dataTextField: "statusAda",
				dataValueField: "id",
				change: function (e) {
					var dataItem = e.sender.selectedIndex;
					if (dataItem === 1) {
						$('#lamaIstirahat').show();
					} else {
						$('#lamaIstirahat').hide();
					}
				}
			});

			var ddlPengobatanDibutuhkan = $('#ddlPengobatanDibutuhkan').data('kendoDropDownList');
			ddlPengobatanDibutuhkan.select(0);
			$scope.listSatuan = [
				{
					"id": 0,
					"satuan": "Jam"
				},
				{
					"id": 1,
					"satuan": "Hari"
				}
			]
			
			$scope.listSatuanPemulihan = [
				{
					"id": 0,
					"satuanPemulihan": "Hari"
				},
				{
					"id": 1,
					"satuanPemulihan": "Minggu"
				},
				{
					"id": 1,
					"satuanPemulihan": "Bulan"
				}
			]

			$scope.listStatusPekerjaan = [
				{
					"id": 1,
					"statusPekerjaan": "Pasien"
				},
				{
					"id": 2,
					"statusPekerjaan": "Keluarga Pasien"
				},
				{
					"id": 3,
					"statusPekerjaan": "Pengunjung Pasien"
				},
				{
					"id": 4,
					"statusPekerjaan": "Karyawan RSAB"
				},
				{
					"id": 5,
					"statusPekerjaan": "Keluarga Karyawan RSAB"
				},
				{
					"id": 6,
					"statusPekerjaan": "Siswa (PPDS-KOAS-AKPER-AKBID-SMA/SMK PRAKTEK)"
				},
				{
					"id": 7,
					"statusPekerjaan": "Lainnya"
				}
			]

			$scope.listStatusJabatan = [
				{
					"id": 1,
					"statusJabatan": "Dewas"
				},
				{
					"id": 2,
					"statusJabatan": "Direksi"
				},
				{
					"id": 3,
					"statusJabatan": "Ka. Komite"
				},
				{
					"id": 4,
					"statusJabatan": "Ka. SMF"
				},
				{
					"id": 5,
					"statusJabatan": "Ka. Satuan"
				},
				{
					"id": 6,
					"statusJabatan": "Ka. Bidang"
				},
				{
					"id": 7,
					"statusJabatan": "Ka. Bag"
				},
				{
					"id": 8,
					"statusJabatan": "Ka. Instalasi"
				},
				{
					"id": 9,
					"statusJabatan": "Ka. Unit"
				},
				{
					"id": 10,
					"statusJabatan": "Ka. Sub. Bid"
				},
				{
					"id": 11,
					"statusJabatan": "Ka. Sub. Bag"
				},
				{
					"id": 12,
					"statusJabatan": "Pengelola Urusan"
				},
				{
					"id": 13,
					"statusJabatan": "Staf"
				},
				{
					"id": 14,
					"statusJabatan": "Fungsional"
				},
				{
					"id": 15,
					"statusJabatan": "Lainnya"
				}
			]

			$scope.tambahKorban = function () {
				
				if(!$scope.item.jenisKelamin && !$scope.item.namaKorban && !$scope.item.tglLahir) {
					toastr.warning('Anda belum memasukan identitas korban');
					return;
				}

				var lkkKerugian = {
					"lamaIstirahatPerJam": $scope.item.lamaIstirahat ? $scope.item.lamaIstirahat + " hari": "-",
					"lamaTidakKerjaPerJam": $scope.item.lamaTidakBekerja ? + " " + $scope.item.satuan.satuan : null,
					"lamaPemulihanPerHari": $scope.item.lamaPemulihan ? $scope.item.lamaPemulihan + " " + $scope.item.satuanPemulihan.satuanPemulihan : '-',
					"ketKerugianWaktu": $scope.item.ketKerugianWaktu ? $scope.item.ketKerugianWaktu : '-',
					"biayaPostKecelakaan": $scope.item.biayaSesaat ? $scope.item.biayaSesaat : 0,
					"biayaPengobatan": $scope.item.biayaPengobatan ? $scope.item.biayaPengobatan : 0,
					"biayaPemulihan": $scope.item.biayaPemulihan ? $scope.item.biayaPemulihan :0,
					"ketKerugianKesehatan": $scope.item.kerugianKesehatan ? $scope.item.kerugianKesehatan : '-',
					"tindakanPertolongan": $scope.item.tindakanPertolongan ? $scope.item.tindakanPertolongan : '-'
				}
				// if ($scope.item.lamaTidakBekerja == undefined || $scope.item.lamaTidakBekerja == '') {
				// 	lkkKerugian = {
				// 		"biayaPostKecelakaan": $scope.item.biayaSesaat,
				// 		"biayaPengobatan": $scope.item.biayaPengobatan,
				// 		"biayaPemulihan": $scope.item.biayaPemulihan,
				// 		"ketKerugianKesehatan": $scope.item.kerugianKesehatan
				// 	}
				// } else if ($scope.item.kerugianKesehatan == undefined || $scope.item.kerugianKesehatan == '') {
				// 	lkkKerugian = {
				// 		"lamaIstirahatPerJam": $scope.item.lamaIstirahat + " hari",
				// 		"lamaTidakKerjaPerJam": $scope.item.lamaTidakBekerja + " " + $scope.item.satuan.satuan,
				// 		"lamaPemulihanPerHari": $scope.item.lamaPemulihan + " " + $scope.item.satuanPemulihan.satuanPemulihan,
				// 		"ketKerugianWaktu": $scope.item.ketKerugianWaktu,
				// 		"biayaPostKecelakaan": $scope.item.biayaSesaat,
				// 		"biayaPengobatan": $scope.item.biayaPengobatan,
				// 		"biayaPemulihan": $scope.item.biayaPemulihan,
				// 		// "ketKerugianKesehatan": $scope.item.kerugianKesehatan
				// 	}
				// } else {
				// 	lkkKerugian = {
				// 		"lamaIstirahatPerJam": $scope.item.lamaIstirahat + " hari",
				// 		"lamaTidakKerjaPerJam": $scope.item.lamaTidakBekerja + " " + $scope.item.satuan.satuan,
				// 		"lamaPemulihanPerHari": $scope.item.lamaPemulihan + " " + $scope.item.satuanPemulihan.satuanPemulihan,
				// 		"ketKerugianWaktu": $scope.item.ketKerugianWaktu,
				// 		"biayaPostKecelakaan": $scope.item.biayaSesaat,
				// 		"biayaPengobatan": $scope.item.biayaPengobatan,
				// 		"biayaPemulihan": $scope.item.biayaPemulihan,
				// 		"ketKerugianKesehatan": $scope.item.kerugianKesehatan,
				// 		"tindakanPertolongan": $scope.item.tindakanPertolongan
				// 	}
				// }

				if ($scope.item.statusPekerjaan != undefined) {
					if ($scope.item.statusPekerjaan.id == 7) {
						$scope.item.statusPekerjaan.statusPekerjaan = $scope.item.keteranganPekerjaan
					}
				} else {
					$scope.item.statusPekerjaan = {
						"statusPekerjaan": ""
					}
				}

				if ($scope.item.statusJabatan != undefined) {
					if ($scope.item.statusJabatan.id == 15) {
						$scope.item.statusJabatan.statusJabatan = $scope.item.keteranganJabatan
					}
				} else {
					$scope.item.statusJabatan = {
						"statusJabatan": ""
					}
				}

				if ($scope.item.unitRuangan == undefined) {
					$scope.item.unitRuangan = {
						"namaRuangan": "",
						"ruanganId": ""
					}
				}

				var lkkIdentifikasiKorban = {
					"namaKorban": $scope.item.namaKorban,
					"niKependudukan": $scope.item.niKependudukan ? $scope.item.niKependudukan : '-',
					"tempatLahir": $scope.item.tempatLahir ? $scope.item.tempatLahir : '-',
					"tglLahir": $scope.item.tglLahir ? $scope.item.tglLahir : '-',
					"jenisKelamin": $scope.item.jenisKelamin ? $scope.item.jenisKelamin.jenisKelamin: "",
					"statusPekerjaan": $scope.item.statusPekerjaan ? $scope.item.statusPekerjaan.statusPekerjaan : "",
					"statusJabatan": $scope.item.statusJabatan ? $scope.item.statusJabatan.statusJabatan : "",
					"namaRuangan": $scope.item.unitRuangan ? $scope.item.unitRuangan.namaRuangan : "",
					"unitRuangan": $scope.item.unitRuangan ? { "id": $scope.item.unitRuangan.ruanganId } : "",
					"lkkRencanaTindakLanjut": {
						"bagianTubuh": $scope.item.bagianTubuhYangCedera ? $scope.item.bagianTubuhYangCedera : '-',
						"jenisCedera": $scope.item.jenisCederaYangDiderita ? $scope.item.jenisCederaYangDiderita : "-",
						"jenisPengobatan": $scope.item.pengobatanYangDiterima ? $scope.item.pengobatanYangDiterima : "-",
						"tindakanRawatInap": $scope.item.tindakanRawatInap ? $scope.item.tindakanRawatInap : "-",
						"tindakanRawatJalan": $scope.item.tindakanRawatJalan ? $scope.item.tindakanRawatJalan : "-",
						"tindakanDiLuarRsab": $scope.item.tindakanPengobatanDiLuar ? $scope.item.tindakanPengobatanDiLuar : "-",
					},
					"lkkPerkiraanKerugian": lkkKerugian
				}
				arrKorban.push(lkkIdentifikasiKorban);
				$scope.listKorban.add(lkkIdentifikasiKorban);
				clearKorban();
			}

			$scope.Save = function () {
				var arrKorban2 = [];
				arrKorban.forEach(function (datas) {
					datas.namaRuangan = datas.namaRuangan === "" ? 0: datas.namaRuangan;
					datas.statusJabatan = datas.statusJabatan === "" ? 0 : datas.statusJabatan;
					datas.unitRuangan.id = datas.unitRuangan.id === "" ? 0 : datas.unitRuangan.id;
					// if (datas.namaRuangan == "")
					// 	datas.namaRuangan = 0;
					// if (datas.statusJabatan == "")
					// 	datas.statusJabatan = 0;
					// if (datas.unitRuangan.id == "")
					// 	datas.unitRuangan.id = 0;
					arrKorban2.push(datas);
				})
				var data = {
					"verifikasi": 1,
					"pelapor": {
						"id": $scope.pelapor.idPegawai
					},
					"lkkIdentifikasiKejadian": {
						"tempatKejadian": $scope.item.tempatKejadian ? $scope.item.tempatKejadian : "-",
						"awalKejadian": $scope.item.awalKejadian ? $scope.item.awalKejadian : "-",
						"tanggal": $scope.item.tglKejadian ? $scope.item.tglKejadian : "-",
						"kondisiSaatKejadian": $scope.item.kondisiSaatKejadian ? $scope.item.kondisiSaatKejadian : "-",
						"tindakanPenolong": $scope.item.tindakanPertolongan ? $scope.item.tindakanPertolongan : "-",
						"jamKejadian": $scope.item.waktu ? $scope.item.waktu : "-",
						"penolongPertama": $scope.item.penolongPertama ? $scope.item.penolongPertama : "-",
						"lkkIdentifikasiKorban": arrKorban2,
						"lkkSaksiKejadian": $scope.listSaksi._data,
						"tindakanLanjutan": $scope.item.tindakanLanjutan ? $scope.item.tindakanLanjutan : "-"
					}
				}

				if(arrKorban2.length == 0) {
					toastr.warning('Belum Menambahkan Korban');
				} else {
					console.log(arrKorban2)
					ManageKKKL.saveDataSarPras(data, "k3-laporan-kecelakaan-kerja/save-data-lkk").then(function (e) {
						clear();
					});
				}
			};
			

			var clearGrid = function () {
				$scope.listSaksi = new kendo.data.DataSource({
					data:[]
				});

				$scope.listKorban = new kendo.data.DataSource({
					data:[]
				});
			}

			var clearKorban = function () {
				$scope.item.namaKorban = '';
				$scope.item.niKependudukan = '';
				$scope.item.tempatLahir = '';
				$scope.item.tglLahir = null;
				$scope.item.jenisKelamin = null;
				$scope.item.statusPekerjaan = '';
				$scope.item.statusJabatan = '';
				$scope.item.unitRuangan = null;
				// $scope.item.tindakanPertolongan = '';
				// $scope.item.kondisiSaatKejadian = '';
			}

			var clear = function () {
				$scope.item.tempatKejadian = '';
				$scope.item.tglKejadian = new Date();
				$scope.item.waktu = '';
				$scope.item.awalKejadian = '';
				$scope.item.penolongPertama = '';
				$scope.item.kondisiSaatKejadian = '';
				
				
				
				$scope.item.bagianTubuhYangCedera = '';
				$scope.item.jenisCederaYangDiderita = '';
				$scope.item.pengobatanYangDiterima = '';
				$scope.item.tindakanRawatInap = '';
				$scope.item.tindakanRawatJalan = '';
				$scope.item.tindakanPengobatanDiLuar
				
				$scope.item.lamaIstirahat = '';
				$scope.item.lamaTidakBekerja = '';
				$scope.item.lamaPemulihan = '';
				$scope.item.ketKerugianWaktu = '';
				$scope.item.biayaSesaat = '';
				$scope.item.biayaPengobatan = '';
				$scope.item.biayaPemulihan = '';
				$scope.item.kerugianKesehatan = '';
				$scope.item.satuan = "";
				$scope.item.satuanPemulihan = "";
				
				$scope.item.rawatInap = "";
				$scope.item.rawatJalan = "";
				$scope.item.pengobatanDiLuar = "";
				$scope.item.isIstirahat = "";
				$scope.item.isBiayaSesaat = "";
				$scope.item.isBiayaPengobatan = "";
				$scope.item.isBiayaPemulihan = "";
			}
		}
	]);
});