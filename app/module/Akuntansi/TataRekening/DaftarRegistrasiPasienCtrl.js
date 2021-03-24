define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarRegistrasiPasienCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ManageTataRekening',
		function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, manageTataRekening) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal = new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.item.tanggalPulang = new Date();
			// $scope.dataPasienSelected = {};
			$scope.cboDokter = false;
			$scope.pasienPulang = false;
			$scope.cboUbahDokter = true;
			$scope.isRouteLoading = false;
			$scope.item.jmlRows = 50
			$scope.jmlRujukanMasuk = 0
			$scope.jmlRujukanKeluar = 0
			loadCombo();
			// loadData();
			getSisrute()
			postKunjunganYankes()

			function loadCombo() {
				var chacePeriode = cacheHelper.get('DaftarRegistrasiPasienCtrl');
				if (chacePeriode != undefined) {
					//debugger;
					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);
					$scope.item.tglpulang = new Date(arrPeriode[2]);
				} else {
					$scope.item.periodeAwal = $scope.now;
					$scope.item.periodeAkhir = $scope.now;
					$scope.item.tglpulang = $scope.now;
				}
				manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function (data) {
					$scope.listDepartemen = data.data.departemen;
					$scope.listKelompokPasien = data.data.kelompokpasien;
					$scope.listDokter = data.data.dokter;
					$scope.listDokter2 = data.data.dokter;
				})
				// $scope.listStatus = manageKasir.getStatus();
			}
			$scope.getIsiComboRuangan = function () {
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}

			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}

			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.columnDaftarPasienPulang = {
				toolbar: [
					"excel",

				],
				excel: {
					fileName: "DaftarRegistrasiPasien.xlsx",
					allPages: true,
				},
				excelExport: function (e) {
					var sheet = e.workbook.sheets[0];
					sheet.frozenRows = 2;
					sheet.mergedCells = ["A1:M1"];
					sheet.name = "Orders";

					var myHeaders = [{
						value: "Daftar Registrasi Pasien",
						fontSize: 20,
						textAlign: "center",
						background: "#ffffff",
						// color:"#ffffff"
					}];

					sheet.rows.splice(0, 0, {
						cells: myHeaders,
						type: "header",
						height: 70
					});
				},
				selectable: 'row',
				pageable: true,
				columns: [{
						"field": "tglregistrasi",
						"title": "Tgl Registrasi",
						"width": "80px",
						"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
					},
					{
						"field": "noregistrasi",
						"title": "NoReg",
						"width": "80px"
					},
					{
						"field": "nocm",
						"title": "NoRM",
						"width": "80px",
						"template": "<span class='style-center'>#: nocm #</span>"
					},
					{
						"field": "namapasien",
						"title": "Nama Pasien",
						"width": "150px",
						"template": "<span class='style-left'>#: namapasien #</span>"
					},
					{
						"field": "usia",
						"title": "Usia Pasien",
						"width": "150px"
					},
					{
						"field": "namaruangan",
						"title": "Nama Ruangan",
						"width": "150px",
						"template": "<span class='style-left'>#: namaruangan #</span>"
					},
					{
						"field": "namadokter",
						"title": "Nama Dokter",
						"width": "150px",
						"template": '# if( namadokter==null) {# - # } else {# #= namadokter # #} #'
					},
					{
						"field": "kelompokpasien",
						"title": "Kelompok Pasien",
						"width": "100px",
						"template": "<span class='style-left'>#: kelompokpasien #</span>"
					},
					{
						"field": "tglpulang",
						"title": "Tgl Pulang",
						"width": "80px",
						"template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
					},
					{
						"field": "statuspasien",
						"title": "Status",
						"width": "80px",
						"template": "<span class='style-center'>#: statuspasien #</span>"
					},
					{
						"field": "nostruk",
						"title": "NoStrukVerif",
						"width": "100px",
						"template": '# if( nostruk==null) {# - # } else {# #= nostruk # #} #'
					},
					{
						"field": "nosbm",
						"title": "NoSBM",
						"width": "100px",
						"template": '# if( nosbm==null) {# - # } else {# #= nosbm # #} #'
					},
					{
						"field": "kasir",
						"title": "Kasir",
						"width": "100px",
						"template": '# if( kasir==null) {# - # } else {# #= kasir # #} #'
					},
					{
						"field": "nosep",
						"title": "No SEP",
						"width": "150px",
						"template": '# if( nosep==null) {# - # } else {# #= nosep # #} #'
					},
					{
						command: [{
							text: "Cetak SEP",
							click: cetakSEP,
							imageClass: "k-icon k-i-excel"
						}],
						width: "120px",
					}
				]
			};

			function cetakSEP(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				console.log(dataItem);

				if(dataItem.kelompokpasien !== "BPJS") {
					toastr.error("Bukan kelompok pasien BPJS", "Gagal Cetak");
					return;
				}

				window.open("http://172.16.44.33:7777/service-reporting/cetak-sep/" + dataItem.norec , "_blank", "fullscreen=yes");
			}

			$scope.SearchData = function () {
				loadData()
			}

			function loadData() {
				$scope.isRouteLoading = true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var reg = ""
				if ($scope.item.noReg != undefined) {
					var reg = "&noreg=" + $scope.item.noReg
				}
				var rm = ""
				if ($scope.item.noRm != undefined) {
					var rm = "&norm=" + $scope.item.noRm
				}
				var nm = ""
				if ($scope.item.nama != undefined) {
					var nm = "&nama=" + $scope.item.nama
				}
				var ins = ""
				if ($scope.item.instalasi != undefined) {
					var ins = "&deptId=" + $scope.item.instalasi.id
				}
				var rg = ""
				if ($scope.item.ruangan != undefined) {
					var rg = "&ruangId=" + $scope.item.ruangan.id
				}
				var kp = ""
				if ($scope.item.kelompokpasien != undefined) {
					var kp = "&kelId=" + $scope.item.kelompokpasien.id
				}
				var dk = ""
				if ($scope.item.dokter != undefined) {
					var dk = "&dokId=" + $scope.item.dokter.id
				}

				var jmlRows = "";
				if ($scope.item.jmlRows != undefined) {
					jmlRows = $scope.item.jmlRows
				}
				$q.all([
					manageTataRekening.getDataTableTransaksi("tatarekening/get-daftar-registrasi-pasien?" +
						"tglAwal=" + tglAwal +
						"&tglAkhir=" + tglAkhir +
						reg + rm + nm + ins + rg + kp + dk +
						'&jmlRows=' + jmlRows),
				]).then(function (data) {
					$scope.isRouteLoading = false;
					for (var i = 0; i < data[0].data.length; i++) {

						let dataUsia = dateHelper.CountAge(new Date(data[0].data[i].tgllahir), new Date(data[0].data[i].tglregistrasi))
						data[0].data[i].usia = dataUsia.year + " Thn " + dataUsia.month + " Bln " + dataUsia.day + " Hr";

					}
					// $scope.dataDaftarPasienPulang = data[0].data;
					$scope.dataDaftarPasienPulang = new kendo.data.DataSource({
						data: data[0].data,
						pageSize: 10,
						total: data[0].data,
						serverPaging: false,
						schema: {
							model: {
								fields: {}
							}
						}
					});
					var chacePeriode = tglAwal + "~" + tglAkhir;
					cacheHelper.set('DaftarRegistrasiPasienCtrl', chacePeriode);
				});

			};
			$scope.UbahDokter = function () {
				$scope.cboDokter = true
				$scope.cboUbahDokter = false
			}
			$scope.batal = function () {
				$scope.cboDokter = false
				$scope.cboUbahDokter = true
			}
			$scope.PasienPulang = function () {
				// debugger;
				if (!$scope.dataPasienSelected) {
					toastr.error("Harap pilih pasien terlebih dahulu!");
					return;
				}
				if ($scope.dataPasienSelected.tglpulang != undefined) {
					window.messageContainer.error("Pasien Sudah Dipulangkan!!!");
					return;
				}
				if ($scope.dataPasienSelected == undefined) {
					toastr.error('Pilih Data Pasien dulu', 'Caution');
				} else {
					manageTataRekening.getDataTableTransaksi('registrasi/get-norec-apd?noreg=' + $scope.dataPasienSelected.noregistrasi +
						'&ruangId=' + $scope.dataPasienSelected.ruanganid).then(function (e) {
						if (e.data.length > 0) {
							$state.go('PindahPulangPasien', {
								norecPD: $scope.dataPasienSelected.norec,
								norecAPD: e.data[0].norec_apd
							});
							var CachePindah = $scope.dataPasienSelected.ruanganid
							cacheHelper.set('CachePindah', CachePindah);
						}

					})

				}
				// var tglpulang = moment($scope.item.tanggalPulang).format('YYYY-MM-DD HH:mm:ss');
				// $scope.cbopasienpulang = true
				// $scope.cboUbahDokter=false
				// if ($scope.dataPasienSelected.tglpulang != null){
				// 	$scope.item.tanggalPulang=$scope.dataPasienSelected.tglpulang
				// }else{
				// 	$scope.item.tanggalPulang=tglpulang
				// }				
			}

			$scope.batalsimpantglpulang = function () {
				$scope.cbopasienpulang = false
				$scope.cboUbahDokter = true
			}

			//debugger
			$scope.simpantglpulang = function () {
				//debugger
				var tglpulang = moment($scope.item.tanggalPulang).format('YYYY-MM-DD HH:mm:ss');
				var updateTanggal = {
					"noregistrasi": $scope.dataPasienSelected.noregistrasi,
					"tglpulang": tglpulang
				}
				manageTataRekening.saveupdatetglpulang(updateTanggal).then(function (e) {
					LoadData();
				})
				$scope.cbopasienpulang = false;
				$scope.cboUbahDokter = true;
			}

			$scope.klikGrid = function (dataPasienSelected) {
				if (dataPasienSelected != undefined) {
					$scope.item.namaDokter = {
						id: dataPasienSelected.pgid,
						namalengkap: dataPasienSelected.namadokter
					}
				}
			}
			$scope.simpan = function () {
				// debugger;
				var objSave = {
					norec: $scope.dataPasienSelected.norec,
					objectpegawaifk: $scope.item.namaDokter.id
				}

				manageTataRekening.postSaveDokter(objSave).then(function (e) {
					loadData();
					$scope.cboDokter = false
					$scope.cboUbahDokter = true
				})

				manageTataRekening.saveUpdateDokter(objSave).then(function (e) {
					loadData();
					$scope.cboDokter = false
					$scope.cboUbahDokter = true
				})

				/* update dokter pelayanan pasien yang kosong dokternya */
				var objPost = {
					"noregistrasi": $scope.dataPasienSelected.noregistrasi,
					"objectpegawaifk": $scope.item.namaDokter.id
				}
				manageTataRekening.updateDokterPelPasien(objPost).then(function (e) {

				})
				manageTataRekening.updateDokterPelPasienNew(objPost).then(function (e) {

				})



			}
			$scope.Detail = function () {
				if (!$scope.dataPasienSelected) {
					toastr.error("Harap pilih pasien terlebih dahulu!");
					return;
				}

				if ($scope.dataPasienSelected.noregistrasi != undefined) {
					var objSave = {
						noregistrasi: $scope.dataPasienSelected.noregistrasi
					}
					manageTataRekening.postJurnalAkuntansi(objSave).then(function (data) {

					});
					var obj = {
						noRegistrasi: $scope.dataPasienSelected.noregistrasi
					}

					$state.go('RincianTagihanTataRekening', {
						dataPasien: JSON.stringify(obj)
					});
				}
			}
			$scope.DaftarRuangan = function () {
				if (!$scope.dataPasienSelected) {
					toastr.error("Harap pilih pasien terlebih dahulu!");
					return;
				}
				console.log($scope.dataPasienSelected)
				if ($scope.dataPasienSelected.noregistrasi != undefined) {
					var obj = {
						noRegistrasi: $scope.dataPasienSelected.noregistrasi
					}


					cacheHelper.set('AntrianPasienDiperiksaNOREG', $scope.dataPasienSelected.noregistrasi);
					// cacheHelper.set('AntrianPasienDiperiksaNOREG', '');
					$state.go('AntrianPasienDiperiksa', {
						dataPasien: JSON.stringify(obj)
					});
				}
			}

			var HttpClient = function () {
				this.get = function (aUrl, aCallback) {
					var anHttpRequest = new XMLHttpRequest();
					anHttpRequest.onreadystatechange = function () {
						if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
							aCallback(anHttpRequest.responseText);
					}

					anHttpRequest.open("GET", aUrl, true);
					anHttpRequest.send(null);
				}
			}
			$scope.cetakKartu = function () {
				$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));

				if (!$scope.dataPasienSelected) {
					toastr.error("Harap pilih pasien terlebih dahulu!");
					return;
				}
				if ($scope.dataPasienSelected.tglpulang == undefined) {
					window.messageContainer.error("Pasien Belum Dipulangkan!!!");
					return;
				}
				if ($scope.dataPasienSelected.noregistrasi == undefined)
					var noReg = "";
				else
					var noReg = $scope.dataPasienSelected.noregistrasi;
				var stt = 'false'
				if (confirm('View Kartu Pulang? ')) {
					// Save it!
					stt = 'true';
				} else {
					// Do nothing!
					stt = 'false'
				}
				var client = new HttpClient();
				client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kip-pasien=1&noregistrasi=' + noReg + '&strIdPegawai=' + $scope.dataLogin.namaLengkap + '&view=' + stt, function (response) {
					// do something with response
				});
			}
			$scope.SuratKontrol = function () {
				if (!$scope.dataPasienSelected) {
					toastr.error("Harap pilih pasien terlebih dahulu!");
					return;
				}

				if ($scope.dataPasienSelected.noregistrasi != undefined) {
					var obj = {
						noRegistrasi: $scope.dataPasienSelected.noregistrasi
					}

					$state.go('RincianTagihanTataRekening', {
						dataPasien: JSON.stringify(obj)
					});
				}

				$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
				if ($scope.dataPasienSelected.noregistrasi == undefined)
					var noregistrasi = "";
				else

					var obj = {
						noRegistrasi: $scope.dataPasienSelected.noregistrasi
					}

				$state.go('PerjanjianPasien', {
					dataPasien: JSON.stringify(obj)
				});
				// var stt = 'false'
				// if (confirm('View Surat Kontrol? ')){
				//     // Save it!
				//     stt='true';
				// }else {
				//     // Do nothing!
				//     stt='false'
				// }
				// var client = new HttpClient();        
				// client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-suratPerjanjianbynocm=1&nocm='+nocm+'&strIdPegawai='+$scope.dataLogin.namaLengkap+'&view='+ stt, function(response) {
				//     // do something with response
				// });
			}
			$scope.EditSEP = function () {
				$scope.item.noPeserta = "";
				$scope.item.noSep = "";

				if (!$scope.dataPasienSelected) {
					toastr.error("Harap pilih pasien terlebih dahulu!");
					return;
				}

				// if ($scope.dataPasienSelected.norec == null) {
				// 	messageContainer.error("Pasien Belum Dipilih!!")
				// 	return;
				// }
				if ($scope.dataPasienSelected.kelompokpasien != "BPJS") {
					messageContainer.error("Input SEP hanya untuk pasien BPJS")
					return;
				}
				// if($scope.dataPasienSelected.norec_pa ==null){
				// 	messageContainer.error("Pemakaian Asuransi tidak ada")
				// 	return;
				// }

				if ($scope.dataPasienSelected.nokepesertaan != undefined) {
					$scope.item.noPeserta = $scope.dataPasienSelected.nokepesertaan;
				}

				if ($scope.dataPasienSelected.nokepesertaan != undefined) {
					$scope.item.noSep = $scope.dataPasienSelected.nosep;
				}


				$scope.cboSep = true
				$scope.cboUbahSEP = false
				$scope.cboDokter = false
				$scope.cboUbahDokter = false
			}
			$scope.simpanSep = function () {
				var norec_pa = ""
				if ($scope.dataPasienSelected.norec_pa != undefined)
					norec_pa = $scope.dataPasienSelected.norec_pa
				var updateSep = {
					"norec": $scope.dataPasienSelected.norec,
					"nokepesertaan": $scope.item.noPeserta,
					"nosep": $scope.item.noSep,
					"norec_pa": norec_pa,
					"nocm": $scope.dataPasienSelected.nocm,
				}

				manageTataRekening.postSaveSepTarek(updateSep).then(function (e) {
					loadData();
					$scope.saveLogInputSep()
				})

				$scope.cboSep = false
				$scope.cboUbahSEP = true
				$scope.cboDokter = false
				$scope.cboUbahDokter = true
			}
			$scope.saveLogInputSep = function () {
				var jenisLog = 'Input SEP'
				var referensi = 'Norec Pemakaian Asuransi'
				manageTataRekening.getDataTableTransaksi("logging/save-log-all?jenislog=" +
					jenisLog + "&referensi=" + referensi +
					"&noreff=" + $scope.dataPasienSelected.norec_pa +
					"&keterangan=" + $scope.item.noSep
				).then(function (data) {
					$scope.item.noPeserta = "";
					$scope.item.noSep = "";
				})
			}
			//end log
			$scope.batalSep = function () {
				$scope.item.noPeserta = "";
				$scope.item.noSep = "";
				$scope.cboSep = false
				$scope.cboUbahSEP = true
				$scope.cboDokter = false
				$scope.cboUbahDokter = true
			}

			$scope.resumeMedis = function () {
				if (!$scope.dataPasienSelected) {
					toastr.error('Pilih data terlebuh dahulu!');
					return;
				}
				manageTataRekening.getDataTableTransaksi('registrasipasien/get-apd?noregistrasi=' + $scope.dataPasienSelected.noregistrasi +
					'&objectruanganlastfk=' + $scope.dataPasienSelected.ruanganid).then(function (e) {
					if (e.data.data.length > 0) {

						var arrrStr = {
							0: $scope.dataPasienSelected.nocm,
							1: $scope.dataPasienSelected.namapasien,
							2: $scope.dataPasienSelected.jeniskelamin,
							3: $scope.dataPasienSelected.noregistrasi,
							// 4: $scope.dataPasienSelected.umur,
							5: $scope.dataPasienSelected.kelompokpasien,
							6: $scope.dataPasienSelected.tglregistrasi,
							7: e.data.data[0].norec_apd,
							8: $scope.dataPasienSelected.norec,
							// 9: $scope.dataPasienSelected.objectkelasfk,
							// 10: $scope.dataPasienSelected.namakelas,
							11: $scope.dataPasienSelected.ruanganid,
							12: $scope.dataPasienSelected.namaruangan
						}
						cacheHelper.set('cacheRekamMedis', arrrStr);
						$state.go('ResumeMedisRI', {
							noRec: e.data.data[0].norec_apd
						})
					}
				})

			}

			function postKunjunganYankes() {
				let status = false
				var tanggal = moment(new Date()).format('YYYY-MM-DD')
				manageTataRekening.getDataTableTransaksi('yankes/get-kunjungan?tgl=' + tanggal)
					.then(function (a) {
						var result = a
						if (result.data.list != undefined && result.data.list.length > 0) {
							for (var i = 0; i < result.data.list.length; i++) {
								if (moment(new Date()).format('YYYY-MM-DD') == result.data.list[i].tanggal) {
									status = true
									manageTataRekening.getDataTableTransaksi('yankes/count-kunjungan-pasien')
										.then(function (d) {
											let datt = d.data
											var jsonSave = {
												"data": {
													"kode_kirim": result.data.list[i].kode,
													"tanggal": moment(new Date()).format('YYYY-MM-DD'),
													"kunjungan_rj": datt.data.rawat_jalan,
													"kunjungan_igd": datt.data.igd,
													"pasien_ri": datt.masihDirawat // result.data.rawat_inap,
												}
											}

											manageTataRekening.postData('yankes/update-kunjungan', jsonSave)
												.then(function (c) {
													var resp = c.data
													if (resp.kode == 200) {
														toastr.success('Post Bridging Yankes')
													}

												}, error => {
													toastr.error('Post Bridging Yankes Gagal')
												});
										})
									break
								}
							}
						}
						if (status == false) {
							manageTataRekening.getDataTableTransaksi('yankes/count-kunjungan-pasien')
								.then(function (b) {
									let result = b.data
									var jsonSave = {
										"data": {
											"kode_kirim": null,
											"tanggal": moment(new Date()).format('YYYY-MM-DD'),
											"kunjungan_rj": result.data.rawat_jalan,
											"kunjungan_igd": result.data.igd,
											"pasien_ri": result.masihDirawat // result.data.rawat_inap,
										}
									}

									manageTataRekening.postData('yankes/insert-kunjungan', jsonSave)
										.then(function (c) {
											var resp = c.data
											if (resp.kode == 200) {
												toastr.success('Post Bridging Yankes')
											}

										}, error => {
											toastr.error('Post Bridging Yankes Gagal')
										});
								})
						}
					})

			}

			function getSisrute() {
				// debugger
				var now = moment(new Date()).format('YYYY-MM-DD')
				manageTataRekening.getDataTableTransaksi('sisrute/rujukan/get?tanggal=' + now).then(function (response) {
					$scope.jmlRujukanMasuk = response.data.total
					console.log('rujukan masuk : ' + response.data.total)
				})
				manageTataRekening.getDataTableTransaksi('sisrute/rujukan/get?tanggal=' + now + '&create=true').then(function (response) {
					$scope.jmlRujukanKeluar = response.data.total
					console.log('rujukan masuk : ' + response.data.total)
				})
			}
			postRujukanYankes()

			function postRujukanYankes() {
				// debugger
				let status = false
				manageTataRekening.getDataTableTransaksi('yankes/get-rujukan?tgl=' + moment(new Date()).format('YYYY-MM-DD')).then(function (res) {
					var resultData = res.data.list
					if (resultData != undefined && resultData.length > 0) {
						for (var i = 0; i < resultData.length; i++) {
							if (moment(new Date()).format('YYYY-MM-DD') == resultData[i].tanggal) {
								status = true
								var jsonSave = {
									"data": {
										"kode_kirim": resultData[i].kode,
										"tanggal": resultData[i].tanggal,
										"jumlah_rujukan": $scope.jmlRujukanMasuk,
										"jumlah_rujuk_balik": $scope.jmlRujukanKeluar,
									}
								}
								manageTataRekening.postData('yankes/update-rujukan', jsonSave)
									.then(function (response) {
										console.log('Update Yankes Rujukan')
									}, error => {});
								break
							}
						}
					}

					if (status == false) {
						var da = {
							"data": {
								"kode_kirim": null,
								"tanggal": moment(new Date()).format('YYYY-MM-DD'),
								"jumlah_rujukan": $scope.jmlRujukanMasuk,
								"jumlah_rujuk_balik": $scope.jmlRujukanKeluar,

							}
						}

						manageTataRekening.postData('yankes/insert-rujukan', da)
							.then(function (response) {
								console.log('Insert Yankes Rujukan')
							}, error => {});
					}
				})

			}

			// END ################

		}
	]);
});