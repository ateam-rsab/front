define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('AsesmenGiziAwalCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'ManagePhp', 'ManageSarprasPhp', '$timeout',
		function ($q, $rootScope, $scope, ModelItem, $state, cacheHelper, ManagePhp, ManageSarprasPhp, $timeout) {
			$scope.onInit=()=>{
                var datauserlogin = JSON.parse(window.localStorage.getItem('pegawai'));
                (datauserlogin['id']=="320263") ? $scope.isVedika=true : $scope.isVedika=false;
            }
            $scope.onInit();
			$scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'));
			$scope.isEdit = false;
			$scope.txtSimpan = 'Simpan';
			$scope.isDietKhusus = false;
			$scope.isDewasa = true;
			$scope.dataUmur = [];
			// $scope.item.umurPasien = [];
			$scope.showInput = false;
			$scope.item = {};
			// $scope.item.number = ["1", "2", "3", "4", "5"]
			$scope.listJenisPasien = [{
				name: 'Anak',
				id: 1
			},
			{
				name: 'Dewasa',
				id: 2
			}
			]

			$scope.isAnak = function () {
				// if ($scope.item.selectedJenisPasien.name === "Dewasa") {
				// 	$scope.isDewasa = true;
				// } else {
				// 	$scope.isDewasa = false;
				// }
			}

			$scope.yesOrNo = [{
				id: 1,
				name: 'Ya'
			},
			{
				id: 2,
				name: 'Tidak'
			},
			];

			$scope.listOfAlergiMakanan = [{
				name: 'Telur',
				key: 'telur',
				id: 1,
			},
			{
				name: 'Susu sapi & produk olahannya',
				key: 'susu',
				id: 2,
			},
			{
				name: 'Kacang kedelai / Tanah',
				key: 'kacang',
				id: 3
			},
			{
				name: 'Gluten / Gandum',
				key: 'gluten',
				id: 4
			},
			{
				name: 'Udang',
				key: 'udang',
				id: 5
			},
			{
				name: 'Ikan',
				key: 'ikan',
				id: 6
			},
			{
				name: 'Hazelnut / Almond',
				key: 'almond',
				id: 7
			},
			]

			$scope.listOfRisikoMalnutrisi = [{
				id: 122,
				name: 'Risiko Ringan (Nilai Strong Kids 0)'
			},
			{
				id: 222,
				name: 'Risiko Sedang (Nilai Strong Kids 1 - 3)'
			},
			{
				id: 322,
				name: 'Risiko Tinggi (Nilai Strong Kids 4 - 5)'
			}
			];

			$scope.listOfRisikoMalnutrisiDewasa = [{
				id: 11,
				name: 'Risiko Ringan (Nilai MST 0)'
			},
			{
				id: 12,
				name: 'Risiko Sedang (Nilai MST 1 - 3)'
			},
			{
				id: 13,
				name: 'Risiko Tinggi (Nilai MST 4 - 5)'
			}
			];


			let dataTempMakanan = [];

			$scope.getDataAsesmenGizi = function () {
				let dataVerif = [];
				let dataUnverif = [];
				ManagePhp.getData('rekam-medis/get-asesmen-gizi-awal?nocm=' + $scope.item.noRegistrasi).then(function (dat) {

					for (let i = 0; i < dat.data.data.length; i++) {
						if (dat.data.data[i].isverifikasi) {
							dataVerif.push(dat.data.data[i])
						} else {
							dataUnverif.push(dat.data.data[i])
						}
					}
					$scope.dataAsesmenGiziUnverif = new kendo.data.DataSource({
						data: dataUnverif,
						pageSize: 5
					});
					$scope.dataAsesmenGizi = new kendo.data.DataSource({
						data: dataVerif,
						pageSize: 5
					})

				});
			}

			let initPage = function () {
				$scope.item = {};
				let dataUmur = [];
				$scope.cache = cacheHelper.get('cacheAsesmenGizi');
				let umur = $scope.cache[4];
				$scope.item.umurPasien = umur.split(' ')
				$scope.item.umurPasien.forEach(function (el) {
					let temp = '';
					if (el !== '') {
						temp = el.replace(/\D/g, '');
						$scope.dataUmur.push(temp);
					}
				})

				if (parseInt($scope.dataUmur[0]) > 17) {
					$scope.isDewasa = true;
				} else {
					$scope.isDewasa = false;
				}

				// console.log(dataUmur);
				$scope.item.umur = $scope.dataUmur[0];
				$scope.item.bulan = $scope.dataUmur[1];
				// $('#iptTahun').val(dataUmur[0]);
				// $('#iptBulan').val(dataUmur[1]);
				console.log($scope.item.umur);
				$scope.item.noRegistrasi = $scope.cache[0];
				if($scope.isVedika){
					$scope.optGridAsesmenGizi = {
						filterable: {
							extra: false,
							operators: {
								string: {
									startswith: "Dimulai dengan",
									contains: "mengandung kata",
									neq: "Tidak mengandung kata"
								}
							}
						},
						pageable: true,
						scrollable: true,
						columns: [{
							field: "tglinput",
							title: "<h3>Tanggal/Jam</h3>",
							width: 100
						},
						{
							field: "namalengkap",
							title: "<h3>Dokter Penanggung <br>Jawab Pelayanan</h3>",
							width: 150
						},
						{
							field: "pegawaiasal",
							title: "<h3>Ahli Gizi</h3>",
							template: '# if( pegawaiasal==null) {# - # } else {# #= pegawaiasal # #} #',
							"width": "120px"
						},
						{
							field: "namaruangan",
							title: "<h3>Ruangan</h3>",
							width: 120
						},
						{
							field: "noregistrasi",
							title: "<h3>No Registrasi</h3>",
							width: 100
						}]
					};
					$scope.optGridAsesmenGiziNotVerif = {
						filterable: {
							extra: false,
							operators: {
								string: {
									startswith: "Dimulai dengan",
									contains: "mengandung kata",
									neq: "Tidak mengandung kata"
								}
							}
						},
						pageable: true,
						scrollable: true,
						columns: [{
							field: "tglinput",
							title: "<h3>Tanggal/Jam</h3>",
							width: 100
						},
						// { field: "namalengkap", title: "<h3>Dokter Penanggung <br>Jawab Pelayanan</h3>", width: 150 },
						{
							field: "pegawaiasal",
							title: "<h3>Ahli Gizi</h3>",
							width: 100
						},
						{
							field: "namaruangan",
							title: "<h3>Ruangan</h3>",
							width: 120
						},
						{
							field: "noregistrasi",
							title: "<h3>No Registrasi</h3>",
							width: 100
						}]
					}
				}else{
					$scope.optGridAsesmenGizi = {
						filterable: {
							extra: false,
							operators: {
								string: {
									startswith: "Dimulai dengan",
									contains: "mengandung kata",
									neq: "Tidak mengandung kata"
								}
							}
						},
						toolbar: [{
							name: "create",
							text: "Input Baru",
							template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
						}],
						pageable: true,
						scrollable: true,
						columns: [{
							field: "tglinput",
							title: "<h3>Tanggal/Jam</h3>",
							width: 100
						},
						{
							field: "namalengkap",
							title: "<h3>Dokter Penanggung <br>Jawab Pelayanan</h3>",
							width: 150
						},
						{
							field: "pegawaiasal",
							title: "<h3>Ahli Gizi</h3>",
							template: '# if( pegawaiasal==null) {# - # } else {# #= pegawaiasal # #} #',
							"width": "120px"
						},
						{
							field: "namaruangan",
							title: "<h3>Ruangan</h3>",
							width: 120
						},
						{
							field: "noregistrasi",
							title: "<h3>No Registrasi</h3>",
							width: 100
						},
						{
							command: [{
								text: "Detail",
								click: showDetailAsesmenGizi,
								imageClass: "k-icon k-i-pencil"
							},],
							title: "",
							width: 90,
							attributes: {
								style: "text-align:center;valign=middle"
							}
						}
						]
					};
					$scope.optGridAsesmenGiziNotVerif = {
						filterable: {
							extra: false,
							operators: {
								string: {
									startswith: "Dimulai dengan",
									contains: "mengandung kata",
									neq: "Tidak mengandung kata"
								}
							}
						},
						pageable: true,
						scrollable: true,
						columns: [{
							field: "tglinput",
							title: "<h3>Tanggal/Jam</h3>",
							width: 100
						},
						// { field: "namalengkap", title: "<h3>Dokter Penanggung <br>Jawab Pelayanan</h3>", width: 150 },
						{
							field: "pegawaiasal",
							title: "<h3>Ahli Gizi</h3>",
							width: 100
						},
						{
							field: "namaruangan",
							title: "<h3>Ruangan</h3>",
							width: 120
						},
						{
							field: "noregistrasi",
							title: "<h3>No Registrasi</h3>",
							width: 100
						},
						{
							command: [{
								text: "Detail",
								click: showDetailAsesmenGizi,
								imageClass: "k-icon k-i-pencil"
							},
							{
								text: "Verifikasi Dokter",
								click: verif,
								imageClass: "k-icon k-i-pencil"
							},
							],
							title: "",
							width: 90,
							attributes: {
								style: "text-align:center;valign=middle"
							}
						}
						]
					}
				}
				

			
				$scope.getDataAsesmenGizi();
			}
			initPage();

			$scope.inputBaru = function () {
				$('.cbAlergi').prop('checked', false);
				$scope.showInput = true;
				$scope.txtSimpan = 'Simpan';
				$scope.item = {};
				$scope.item.umur = $scope.dataUmur[0];
				$scope.item.bulan = $scope.dataUmur[1];
				$timeout(function () {
					window.scrollBy({
						top: 1000,
						behavior: 'smooth'
					});
				}, 100);
			}

			$scope.Batal = function () {
				$scope.showInput = false;
				$timeout(function () {
					window.scrollBy({
						top: -630,
						behavior: 'smooth'
					});
				}, 100);
				$scope.item = {};
			};

			$scope.isPerluLanjutan = function (condition) {
				if (condition) {
					$scope.showGiziLanjutan = true;
				} else {
					$scope.showGiziLanjutan = false;
					// $scope.item.umur = ''
					// $scope.item.bulan = ''
					$scope.item.statusGizi = ''
					$scope.item.beratBadan = ''
					$scope.item.tbU = ''
					$scope.item.tb = ''
					$scope.item.bbtb = ''
					$scope.item.biokimia = ''
					$scope.item.klinisFisik = ''
					$scope.item.riwayatDiet = ''
					$scope.item.riwayatPersonal = ''
					$scope.item.lila = ''
					$scope.item.lilau = ''
				}
			}

			$scope.showDietKhusus = function (condition) {
				if (condition) {
					$scope.isDietKhusus = condition;
					$scope.item.preskripsiDiet = '';
				} else {
					$scope.isDietKhusus = condition;
					$scope.item.preskripsiDiet = 'Makan Biasa';
				}
			}

			$scope.saveDataAsesmen = function () {
				let dataAlergi = [];
				dataTempMakanan = [];
				$.each($('.cbAlergi:checked'), function () {
					dataTempMakanan.unshift({
						value: $(this).val(),
						checked: true
					})
				});
				$.each($('.cbAlergi:not(:checked)'), function () {
					dataTempMakanan.unshift({
						value: $(this).val(),
						checked: false
					})
				});

				for (let i = 0; i < $scope.listOfAlergiMakanan.length; i++) {
					let find = dataTempMakanan.find(function (el) {
						return el.value === $scope.listOfAlergiMakanan[i].name;
					})
					dataAlergi.push(find);
				}

				if ($scope.dataLogin.jenisPegawai.id === 1) {
					$scope.isDokter = true;
				} else {
					$scope.isDokter = false;
				}

				let umur = `${$scope.item.umur ? $scope.item.umur : 0} tahun ${$scope.item.bulan ? $scope.item.bulan : 0} bulan`;
				let dataSave = {
					diagnosa: $scope.item.diagnosaMedis,
					norec: $scope.item.norecGizi ? $scope.item.norecGizi : '',
					noregistrasifk: $scope.cache[7],
					pegawaifk: $scope.isDokter ? $scope.dataLogin.id : null,
					pegawaiasalfk: $scope.isDokter ? $scope.item.pegawaiFk : $scope.dataLogin.id,
					ruanganfk: $scope.cache[11],
					pasienfk: $scope.cache[0],
					risiko_malutrisi: $scope.item.risikoMalnutrisi,
					kondisi_khusus: $scope.item.pasienKondisiKhusus,
					alergi_1: dataAlergi[0].checked ? 'Ya' : 'Tidak',
					alergi_2: dataAlergi[1].checked ? 'Ya' : 'Tidak',
					alergi_3: dataAlergi[2].checked ? 'Ya' : 'Tidak',
					alergi_4: dataAlergi[3].checked ? 'Ya' : 'Tidak',
					alergi_5: dataAlergi[4].checked ? 'Ya' : 'Tidak',
					alergi_6: dataAlergi[5].checked ? 'Ya' : 'Tidak',
					alergi_7: dataAlergi[6].checked ? 'Ya' : 'Tidak',
					diet: $scope.item.preskripsiDiet,
					tindak_lanjut: $scope.item.tindakLanjut,
					antro_umur: umur,
					isverifikasi: $scope.isDokter ? true : false,
					antro_bb: $scope.item.beratBadan,
					antro_tb: $scope.item.tb,
					antro_status_gizi: $scope.item.statusGizi,
					antro_tb_u: $scope.item.tbU,
					antro_bb_tb: $scope.item.bbtb,
					biokimia: $scope.item.biokimia,
					klinis_fisik: $scope.item.klinisFisik,
					riwayat_diet: $scope.item.riwayatDiet,
					riwayat_personal: $scope.item.riwayatPersonal,
					diagnosis_gizi: $scope.item.diagnosisGizi,
					intervensi_gizi: $scope.item.intervensiGizi,
					monitoring: $scope.item.monitoring,
					monitoring_ket: $scope.item.ketMonitoring,
					lila: $scope.item.lila,
					imt: $scope.item.imt,
					lila_u: $scope.item.lilau,
					jenis_pasien: $scope.isDewasa ? 'Dewasa' : 'Anak'
				}

				console.log(dataSave);
				ManagePhp.postData(dataSave, `rekam-medis/post-asesmen-gizi-awal/save`).then(function (res) {
					initPage();
					$scope.showInput = false;
				});

				ManageSarprasPhp.postApi("Composition", dataSave).then(function (res) {
					console.log(res)
				})
			}

			function showDetailAsesmenGizi(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				console.log(dataItem);

				$timeout(function () {
					$scope.showInput = true;
					window.scrollBy({
						top: 1000,
						behavior: 'smooth'
					});
				}, 100);
				$scope.isEdit = true;
				// if($scope.dataLogin.jenisPegawai.id === 1) {
				// 	$scope.isDokter = true;
				// 	$scope.isEdit = true;
				// } else {
				// 	$scope.isDokter = false;
				// 	$scope.isEdit = false;
				// }
				let umurDanBulan = dataItem.antro_umur.split(' ');
				// radio button
				$scope.item.risikoMalnutrisi = dataItem.risiko_malutrisi;
				$scope.item.pasienKondisiKhusus = dataItem.kondisi_khusus;
				$scope.item.preskripsiDiet = dataItem.diet;
				$scope.item.tindakLanjut = dataItem.tindak_lanjut;
				$scope.item.monitoring = dataItem.monitoring;
				$scope.item.diagnosaMedis = dataItem.diagnosa;
				$scope.item.lila = dataItem.lila;
				$scope.item.lila = dataItem.lila;
				$scope.item.lilau = dataItem.lila_u;
				$scope.item.imt = dataItem.imt;
				if ($scope.item.tindakLanjut === "Perlu Asuhan Gizi (Lanjutkan ke Asesmen Gizi)") {
					$scope.showGiziLanjutan = true;
				} else {
					$scope.showGiziLanjutan = false;
				}

				if (dataItem.diet !== 'Makan Biasa') {
					$('input#makanBiasa').prop('checked', false);
					$('input#dietKhusus').prop('checked', true);
					$scope.item.preskripsiDiet = dataItem.diet;
					$scope.isDietKhusus = true;
				} else {
					$('input#makanBiasa').prop('checked', true);
					$('input#dietKhusus').prop('checked', false);
					$scope.isDietKhusus = false;
				}

				$timeout(function () {
					$scope.showInput = true;
					window.scrollBy({
						top: 580,
						behavior: 'smooth'
					});
				}, 100);
				// checkboxes
				if (dataItem.alergi_1 === "Ya") {
					$('#telur').prop('checked', true);
				} else {
					$('#telur').prop('checked', false);
				}
				if (dataItem.alergi_2 === "Ya") {
					$('#susu').prop('checked', true);
				} else {
					$('#susu').prop('checked', false);
				}
				if (dataItem.alergi_3 === "Ya") {
					$('#kacang').prop('checked', true);
				} else {
					$('#kacang').prop('checked', false);
				}
				if (dataItem.alergi_4 === "Ya") {
					$('#gluten').prop('checked', true);
				} else {
					$('#gluten').prop('checked', false);
				}
				if (dataItem.alergi_5 === "Ya") {
					$('#udang').prop('checked', true);
				} else {
					$('#udang').prop('checked', false);
				}
				if (dataItem.alergi_6 === "Ya") {
					$('#ikan').prop('checked', true);
				} else {
					$('#ikan').prop('checked', false);
				}
				if (dataItem.alergi_7 === "Ya") {
					$('#almond').prop('checked', true);
				} else {
					$('#almond').prop('checked', false);
				}

				$scope.item.umur = umurDanBulan[0];
				$scope.item.bulan = umurDanBulan[2];
				$scope.item.statusGizi = dataItem.antro_status_gizi;
				$scope.item.beratBadan = dataItem.antro_bb;
				$scope.item.tbU = dataItem.antro_tb_u;
				$scope.item.tb = dataItem.antro_tb;
				$scope.item.bbtb = dataItem.antro_bb_tb;
				$scope.item.biokimia = dataItem.biokimia;
				$scope.item.klinisFisik = dataItem.klinis_fisik;
				$scope.item.riwayatDiet = dataItem.riwayat_diet;
				$scope.item.riwayatPersonal = dataItem.riwayat_personal;
				$scope.item.diagnosisGizi = dataItem.diagnosis_gizi;
				$scope.item.intervensiGizi = dataItem.intervensi_gizi;
				$scope.item.ketMonitoring = dataItem.monitoring_ket;
				$scope.item.pegawaiFk = dataItem.pegawaiasalfk;
				$scope.item.norecGizi = dataItem.norec
			}

			function verif(e) {
				e.preventDefault();
				$scope.isEdit = false;
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				if ($scope.dataLogin.jenisPegawai) {
					if ($scope.dataLogin.jenisPegawai.jenispegawai.toLowerCase() !== "dokter") {
						toastr.warning('Verifikasi hanya oleh Dokter Penanggung Jawab Pelayanan');
						return
					}
				} else {
					toastr.warning('Anda tidak memiliki hak akses untuk verifikasi')
				}

				// showDetailAsesmenGizi(e);
				$timeout(function () {
					$scope.showInput = true;
					window.scrollBy({
						top: 1000,
						behavior: 'smooth'
					});
				}, 100);

				let umurDanBulan = dataItem.antro_umur.split(' ');
				// radio button
				$scope.item.risikoMalnutrisi = dataItem.risiko_malutrisi;
				$scope.item.pasienKondisiKhusus = dataItem.kondisi_khusus;
				$scope.item.preskripsiDiet = dataItem.diet;
				$scope.item.tindakLanjut = dataItem.tindak_lanjut;
				$scope.item.monitoring = dataItem.monitoring;
				$scope.item.diagnosaMedis = dataItem.diagnosa;
				if ($scope.item.tindakLanjut === "Perlu Asuhan Gizi (Lanjutkan ke Asesmen Gizi)") {
					$scope.showGiziLanjutan = true;
				} else {
					$scope.showGiziLanjutan = false;
				}
				if (dataItem.diet !== 'Makan Biasa') {
					$('input#makanBiasa').prop('checked', false);
					$('input#dietKhusus').prop('checked', true);
					$scope.item.preskripsiDiet = dataItem.diet;
					$scope.isDietKhusus = true;
				} else {
					$('input#makanBiasa').prop('checked', true);
					$('input#dietKhusus').prop('checked', false);
					$scope.isDietKhusus = false;
				}

				// checkboxes
				if (dataItem.alergi_1 === "Ya") {
					$('#telur').prop('checked', true);
				} else {
					$('#telur').prop('checked', false);
				}
				if (dataItem.alergi_2 === "Ya") {
					$('#susu').prop('checked', true);
				} else {
					$('#susu').prop('checked', false);
				}
				if (dataItem.alergi_3 === "Ya") {
					$('#kacang').prop('checked', true);
				} else {
					$('#kacang').prop('checked', false);
				}
				if (dataItem.alergi_4 === "Ya") {
					$('#gluten').prop('checked', true);
				} else {
					$('#gluten').prop('checked', false);
				}
				if (dataItem.alergi_5 === "Ya") {
					$('#udang').prop('checked', true);
				} else {
					$('#udang').prop('checked', false);
				}
				if (dataItem.alergi_6 === "Ya") {
					$('#ikan').prop('checked', true);
				} else {
					$('#ikan').prop('checked', false);
				}
				if (dataItem.alergi_7 === "Ya") {
					$('#almond').prop('checked', true);
				} else {
					$('#almond').prop('checked', false);
				}

				$scope.item.umur = umurDanBulan[0];
				$scope.item.bulan = umurDanBulan[2];
				$scope.item.statusGizi = dataItem.antro_status_gizi;
				$scope.item.beratBadan = dataItem.antro_bb;
				$scope.item.tbU = dataItem.antro_tb_u;
				$scope.item.tb = dataItem.antro_tb;
				$scope.item.bbtb = dataItem.antro_bb_tb;
				$scope.item.biokimia = dataItem.biokimia;
				$scope.item.klinisFisik = dataItem.klinis_fisik;
				$scope.item.riwayatDiet = dataItem.riwayat_diet;
				$scope.item.riwayatPersonal = dataItem.riwayat_personal;
				$scope.item.diagnosisGizi = dataItem.diagnosis_gizi;
				$scope.item.intervensiGizi = dataItem.intervensi_gizi;
				$scope.item.ketMonitoring = dataItem.monitoring_ket;
				$scope.item.pegawaiFk = dataItem.pegawaiasalfk;
				$scope.item.norecGizi = dataItem.norec;
				$scope.txtSimpan = 'Verifikasi';


			}
		}
	]);
});