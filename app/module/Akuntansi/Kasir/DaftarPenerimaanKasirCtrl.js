define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPenerimaanKasirCtrl', ['$state', '$mdDialog', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'MnKeu', 'CacheHelper', 'ManageKasir', 'ManageServicePhp',
		function ($state, $mdDialog, $q, $rootScope, $scope, modelItemAkuntansi, mnKeu, cacheHelper, manageKasir, manageServicePhp) {
			let dataUserLogin = JSON.parse(localStorage.getItem('datauserlogin'));
			let dataPegawai = JSON.parse(localStorage.getItem('pegawai'));
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.dataSbnSelected = {};

			$scope.btn_1 = false;
			$scope.btn_0 = true;

			var NRG = "";
			var dataLogin = {}
			// function showButton(){
			// 	$scope.showBtnCetak = false;
			// 	$scope.showBtnCetakReg = true;
			// }
			$scope.pegawai = modelItemAkuntansi.getPegawai();



			////debugger;


			// showButton();
			loadCombo();
			loadData();



			function loadData() {
				// $q.all([
				// 	modelItemAkuntansi.getDataTableTransaksi("kasir/daftar-penerimaan-kasir?kasir="+ $scope.item.kasir +"&caraBayar=" + $scope.item.caraBayar +"&jenisPenerimaan=" + $scope.item.jenisPenerimaan +"&tglAwal="+ $scope.item.periodeAwal +"&tglAkhir="+ $scope.item.periodeAkhir)
				// 	]).then(function(data) {
				// 		if (data[0].statResponse){
				// 			$scope.item = data[0];

				// 			$scope.dataDaftarPenerimaan = new kendo.data.DataSource({
				// 				data: data[0].list,
				// 				pageSize: 10,
				// 				total: data[0].length,
				// 				serverPaging: false,
				// 				schema:  {
				// 					model: {
				// 						fields: {
				//                   //tanggalMasuk: { type: "date" },
				//                   //tanggalPulang: { type: "date" }
				// 						}
				// 					}
				// 				}  
				// 			});
				// 		}
				// 	});
				//debugger;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');
				var chacePeriode = tglAwal + "~" + tglAkhir//+":"+$scope.item.noFaktur+":"+$scope.item.NamaSupplier;
				cacheHelper.set('DaftarPenerimaanKasirCtrl', chacePeriode);
				//////debugger;
				var Skasir = "";
				if ($scope.item.kasir != undefined) {
					Skasir = $scope.item.kasir.id;
				}

				var ScaraBayar = "";
				if ($scope.item.caraBayar != undefined) {
					ScaraBayar = $scope.item.caraBayar.id;
				}

				var SkelompokTransaksi = "";
				if ($scope.item.kelompokTransaksi != undefined) {
					SkelompokTransaksi = $scope.item.kelompokTransaksi.id;
				}
				var Sins = "";
				if ($scope.item.ins != undefined) {
					Sins = $scope.item.ins.id;
				}
				var SnoSbm = $scope.item.nosbm;
				//       modelItemAkuntansi.getDataTableTransaksi("kasir/get-noregistrasi-nosbm?nosbm=" + current.noRec).then(function(data) {
				// 	NRG = data[0];
				// })
				$q.all([
					modelItemAkuntansi.getDataTableTransaksi("kasir/daftar-sbm?"
						+ "dateStartTglSbm=" + tglAwal
						+ "&dateEndTglSbm=" + tglAkhir
						+ "&idPegawai=" + Skasir
						+ "&ins=" + Sins
						+ "&idCaraBayar=" + ScaraBayar
						+ "&idKelTransaksi=" + SkelompokTransaksi
						+ "&nosbm=" + SnoSbm
						+ "&nocm=" + $scope.item.norm
						+ "&nama=" + $scope.item.nama
						+ "&desk=" + $scope.item.desk)
				]).then(function (data) {
					if (data[0].statResponse) {
						var result = data[0]//.data.result;
						for (var x = 0; x < result.length; x++) {
							var element = result[x];
							element.tglSbm = moment(result[x].tglSbm).format('DD-MM-YYYY HH:mm');
							if (element.nocm == null) {
								element.nocm = '-'
							}
							if (element.namapasien == null) {
								element.namapasien = '-'
							}
							if (element.namapasien_klien == null) {
								element.namapasien_klien = '-'
							}
							element.namapasien = element.nocm + ' ' + element.namapasien
							if (element.namaruangan == null) {
								element.namaruangan = "-"
							}
							if (element.noClosing != null) {
								element.status = "Setor";
							} else {
								element.status = "Belum Setor";
							}

						}
						$scope.dataDaftarPenerimaan = new kendo.data.DataSource({
							data: result,
							pageSize: 10,
							total: result.length,
							serverPaging: false,
							/*schema:  {
							 model: {
								fields: {
									tglTerima: { type: "date" },
									tglJatuhTempo: { type: "date" }
										}
								   }
							   }  */
						});

					}
				});
			}
			function loadCombo() {
				var chacePeriode = cacheHelper.get('DaftarPenerimaanKasirCtrl');
				if (chacePeriode != undefined) {
					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);
				}
				else {
					$scope.item.periodeAwal = $scope.now;
					$scope.item.periodeAkhir = $scope.now;

				}
				// mnKeu.getListGeneric("KelompokTransaksi&select=id,kelompokTransaksi&criteria=statusEnabled&values=true").then(function(data){
				// 	$scope.listKelompokTransaksi=data;
				// });

				// mnKeu.getListGeneric("CaraBayar&select=id,caraBayar").then(function(data){
				// 	$scope.listCaraBayar=data;
				// });

				// mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=700").then(function(data){
				// 	$scope.listKasir=data;
				// });
				//#############
				mnKeu.getDataTableTransaksi("kasir/daftar-kasir").then(function (data) {
					$scope.listKasir = data.data.datakasir;
					$scope.listInstalasi = data.data.dataInstalasi;
					$scope.listKelompokTransaksi = data.data.dataKP;
					$scope.listCaraBayar = data.data.dataCB;
					dataLogin = data.data.datalogin;
				});
				//           	var objKasir = {}
				// $q.all([
				// 	mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=697"),
				// 	mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=699"),
				// 	mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=700"),
				// 	mnKeu.getListGeneric("Pegawai&select=id,namaLengkap&criteria=jabatanInternalId&values=701")	     
				// 	]).then(function(data) {
				// 		objKasir = data[0]
				// 		for (var y=1;y<4;y++){
				// 			for (var x=0;x < data[y].data.length;x++){
				// 				objKasir.data.push(data[y].data[x])
				// 			}
				// 		}
				// 		$scope.listKasir = objKasir.data;
				// 	})
				//           	//#############
				// 	// $q.all([
				// 	// 	modelItemAkuntansi.getDataGeneric("jenisKartu", false),
				// 	// 	modelItemAkuntansi.getDataGeneric("caraBayar", false)
				// 	// 	]).then(function(data) {
				// 	// 		if (data[0].statResponse){
				// 	// 			$scope.listJenisPenerimaan = data[1]
				// 	// 		}
				// 	// 		if (data[1].statResponse){
				// 	// 			$scope.listCaraBayar = data[2]
				// 	// 		}
				// 	// 	});
			}

			$scope.klik = function (current) {

			};


			$scope.columnDaftarPenerimaan = [
				{
					"field": "noSbm",
					"title": "NoSbm",
					"template": "<span class='style-center'>#: noSbm #</span>",
					"width": "60px"
				},
				{
					"field": "namaruangan",
					"title": "Nama Ruangan",
					"template": "<span class='style-left'>#: namaruangan #</span>",
					"width": "100px"
				},
				{
					"field": "tglSbm",
					"title": "Tanggal",
					"template": "<span class='style-center'>#: tglSbm #</span>",
					"width": "50px"
				},
				{
					"field": "namapasien",
					"title": "Nama",
					"template": "<span class='style-left'>#: namapasien #</span>",
					"width": "80px"
				},
				{
					"field": "namapasien_klien",
					"title": "Deskripsi",
					"template": "<span class='style-left'>#: namapasien_klien #</span>",
					"width": "80px"
				},
				{
					"field": "keterangan",
					"title": "Keterangan",
					"template": "<span class='style-left'>#: keterangan #</span>",
					"width": "80px"
				},
				{
					"field": "caraBayar",
					"title": "Cara Bayar",
					"template": "<span class='style-center'>#: caraBayar #</span>",
					"width": "70px"
				},
				{
					"field": "totalPenerimaan",
					"title": "Total Penerimaan",
					"template": "<span class='style-right'>{{formatRupiah('#: totalPenerimaan #', 'Rp.')}}</span>",
					"width": "60px"

				},
				{
					"field": "namaPenerima",
					"title": "Kasir",
					"template": "<span class='style-center'>#: namaPenerima #</span>",
					"width": "80px"
				},
				{
					"field": "status",
					"title": "Status",
					"template": "<span class='style-center'>#: status #</span>",
					"width": "50px"
				}
			];

			$scope.CetakReg = function () {
				//debugger;
				if ($scope.dataSbnSelected.noSbm == undefined) {
					var alertDialog = modelItemAkuntansi.showAlertDialog("Informasi",
						"transaksi belum dipilih", "Ok");
					$mdDialog.show(alertDialog).then(function () {
					});
				}
				else {
					switch ($scope.dataSbnSelected.keterangan) {
						case "Pembayaran Tagihan Pasien":
							var stt = 'false'
							if (confirm('View Kwitansi? ')) {
								// Save it!
								stt = 'true';
							} else {
								// Do nothing!
								stt = 'false'
							}
							var sudahTerimaDari = ''
							if ($scope.item.STD != undefined) {
								sudahTerimaDari = $scope.item.STD
							}
							var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi=' + $scope.dataSbnSelected.noregistrasi + $scope.dataSbnSelected.norec_sp + '&idPegawai=' + $scope.pegawai.namaLengkap + '&STD=' + sudahTerimaDari + '&view=' + stt, function (response) {
								// do something with response
							});

							break;
						case "Pembayaran Tagihan Non Layanan":
							var stt = 'false'
							if (confirm('View Kwitansi? ')) {
								// Save it!
								stt = 'true';
							} else {
								// Do nothing!
								stt = 'false'
							}
							var sudahTerimaDari = ''
							if ($scope.item.STD != undefined) {
								sudahTerimaDari = $scope.item.STD
							}
							var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi=' + $scope.dataSbnSelected.noSbm + '&idPegawai=' + $scope.pegawai.namaLengkap + '&STD=' + sudahTerimaDari + '&view=' + stt, function (response) {
								// do something with response
							});

							break;
						case "Pembayaran Deposit Pasien":
							var stt = 'false'
							if (confirm('View Kwitansi? ')) {
								// Save it!
								stt = 'true';
							} else {
								// Do nothing!
								stt = 'false'
							}
							var sudahTerimaDari = ''
							if ($scope.item.STD != undefined) {
								sudahTerimaDari = $scope.item.STD
							}
							var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi=DEPOSIT' + $scope.dataSbnSelected.noSbm + '&idPegawai=' + $scope.pegawai.namaLengkap + '&STD=' + sudahTerimaDari + '&view=' + stt, function (response) {
								// do something with response
							});

							break;
						case "Pengembalian Deposit Pasien":
							var stt = 'false'
							if (confirm('View Kwitansi? ')) {
								// Save it!
								stt = 'true';
							} else {
								// Do nothing!
								stt = 'false'
							}
							var sudahTerimaDari = ''
							if ($scope.item.STD != undefined) {
								sudahTerimaDari = $scope.item.STD
							}
							var client = new HttpClient();
							client.get('http://127.0.0.1:1237/printvb/kasir?cetak-kwitansiv2=1&noregistrasi=KEMBALIDEPOSIT' + $scope.dataSbnSelected.noSbm + '&idPegawai=' + $scope.pegawai.namaLengkap + '&STD=' + sudahTerimaDari + '&view=' + stt, function (response) {
								// do something with response
							});

							break;
					}

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
			$scope.Cetak = function () {
				if ($scope.dataSbnSelected.noSbm == undefined) {

					var alertDialog = modelItemAkuntansi.showAlertDialog("Informasi",
						"transaksi belum dipilih", "Ok");

					$mdDialog.show(alertDialog).then(function () {

					});
				}
				else {
					////debugger;


					switch ($scope.dataSbnSelected.keterangan) {
						case "Pembayaran Tagihan Pasien":

							var obj = {
								noRegistrasi: [$scope.dataSbnSelected.noSbm],
								backPage: "DaftarPenerimaanKasir"
							}

							$state.go("CetakDokumenKasir", {
								dataPasien: JSON.stringify(obj)
							});
							break;
						case "Pembayaran Tagihan Non Layanan":
							var obj = {
								noRegistrasi: [$scope.dataSbnSelected.noSbm],
								backPage: 'DaftarPenerimaanKasir',
								jenis: 'PembayaranTagihanNonLayananKasir'
							}

							$state.go("CetakKwitansi", {
								dataPasien: JSON.stringify(obj)
							});
							break;
						case "DaftarNonLayananKasir":
							var obj = {
								noRegistrasi: [$scope.dataSbnSelected.noSbm],
								backPage: 'DaftarPenerimaanKasir',
								jenis: 'DaftarNonLayananKasir'
							}

							$state.go("CetakKwitansi", {
								dataPasien: JSON.stringify(obj)
							});
							break;
						case "DaftarPenjualanApotekKasir/terimaUmum":
						// $state.go("DaftarPenjualanApotekKasir",{dataFilter: "terimaUmum"});
						// break;
						case "DaftarPenjualanApotekKasir/obatBebas":
						// $state.go("DaftarPenjualanApotekKasir",{dataFilter: "obatBebas"});
						// break;
						case "Pembayaran Deposit Pasien":
							var obj = {
								noRegistrasi: [$scope.dataSbnSelected.noSbm],
								backPage: 'DaftarPenerimaanKasir',
								jenis: 'PenyetoranDepositKasir'
							}

							$state.go("CetakKwitansi", {
								dataPasien: JSON.stringify(obj)
							});
							break;
						case "Pembayaran Cicilan Tagihan Pasien":
							var obj = {
								noRegistrasi: [$scope.dataSbnSelected.noSbm],
								backPage: 'DaftarPenerimaanKasir',
								jenis: 'PembayaranPiutangKasir'
							}

							$state.go("CetakKwitansi", {
								dataPasien: JSON.stringify(obj)
							});
							break;
					}
				}
			}

			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.SearchData = function () {
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm');
				var objSave = {
					tglAwal: tglAwal,
					tglAkhir: tglAkhir
				}
				manageKasir.postJurnalPenerimaanAkuntansi(objSave).then(function (data) {

				});
				loadData();
			}
			$scope.HapusSBM = function () {
				// 23 = Edy
				// 22 = Irna
				// 21 = Kris Hartining
				// 18984 = Juhrati
				if (dataUserLogin.id === 23 || dataUserLogin.id === 22 || dataUserLogin.id === 21 || dataUserLogin.id === 18984) {
					if ($scope.dataSbnSelected.status != 'Setor') {
						// var stt = 'true';
						var isDeposit = '';
						if ($scope.dataSbnSelected.keterangan == 'Pembayaran Deposit Pasien')
							isDeposit = true
						else
							isDeposit = false
						var objSave = {
							norec_sp: $scope.dataSbnSelected.norec_sp,
							noregistrasi: $scope.dataSbnSelected.noregistrasi,
							isdeposit: isDeposit
						}
						var confirm = $mdDialog.confirm()
							.title('Apakah anda yakin akan membatalkan pembayaran pasien?')
							.textContent(`Anda akan menghapus data pembayaran pasien`)
							.ariaLabel('Lucky day')
							// .targetEvent(e)
							.ok('Ya')
							.cancel('Tidak');
						$mdDialog.show(confirm).then(function () {
							manageServicePhp.postBatalBayar(objSave).then(function (data) {
								// jurnal bataal bayar
								var dataSave = {
									"nosbm": $scope.dataSbnSelected.noSbm,
								}
								manageKasir.postTransaksi('kasir/hapus-jurnal-pembayarantagihan', dataSave).then(function (e) {

								})
								// end jurnal batal bayar
								loadData();
								$scope.saveLogBatalBayar();
							});

						}, function () {
							console.warn('tidak jadi batal bayar');
						});
						// if (confirm('Batalkan pembayaran ? ')) {
						// 	stt = 'true';
						// } else {
						// 	stt = 'false'
						// }
						// if (stt == 'true') {
						// 	var isDeposit = '';
						// 	if ($scope.dataSbnSelected.keterangan == 'Pembayaran Deposit Pasien')
						// 		isDeposit = true
						// 	else
						// 		isDeposit = false

						// 	var objSave = {
						// 		norec_sp: $scope.dataSbnSelected.norec_sp,
						// 		noregistrasi: $scope.dataSbnSelected.noregistrasi,
						// 		isdeposit: isDeposit
						// 	}
						// 	manageServicePhp.postBatalBayar(objSave).then(function (data) {
						// 		// jurnal bataal bayar
						// 		var dataSave = {
						// 			"nosbm": $scope.dataSbnSelected.noSbm,
						// 		}
						// 		manageKasir.postTransaksi('kasir/hapus-jurnal-pembayarantagihan', dataSave).then(function (e) {

						// 		})
						// 		// end jurnal batal bayar
						// 		loadData();
						// 		$scope.saveLogBatalBayar();
						// 	});
						// }
					} else {
						alert('Sudah di setor tidak dapat di batalkan!')
					}					
				} else {
					toastr.warning('Anda tidak memiliki hak akses untuk membatalkan pembayaran')
					return;
				}


			}

			//*log Batal Bayar
			$scope.saveLogBatalBayar = function () {
				modelItemAkuntansi.getDataTableTransaksi("logging/save-log-batal-bayar?noregistrasi="
					+ $scope.dataSbnSelected.noregistrasi
					+ "&nosbm="
					+ $scope.dataSbnSelected.noSbm).then(function (data) {
					})
			}
			//*endlog Batal Bayar*

			$scope.ubahCarabayar = function () {
				if ($scope.dataSbnSelected.status != 'Setor') {
					$scope.btn_0 = false;
					$scope.btn_1 = true;
				} else {
					alert('Sudah di setor tidak dapat di batalkan!')
				}

			}
			$scope.saveCarabayar = function () {
				var stt = 'true';
				if (confirm('Ubah cara bayar ? ')) {
					stt = 'true';
				} else {
					// Do nothing!
					stt = 'false'
				}
				if (stt == 'true') {
					var objSave = {
						norec_sbm: $scope.dataSbnSelected.noRec,
						idCaraBayar: $scope.item.caraBayar1.id
					}
					manageServicePhp.postUbahCaraBayar(objSave).then(function (data) {
						loadData();
						$scope.btn_0 = true;
						$scope.btn_1 = false;
					});
				}
			}
			$scope.batal = function () {
				$scope.btn_0 = true;
				$scope.btn_1 = false;
			}
			$scope.CetakLaporanKasir = function () {
				var dokter = ''
				// if ($scope.item.namaPegawai != undefined) {
				//     dokter = $scope.item.namaPegawai.id
				// }
				var ruanganId = ''
				// if ($scope.item.ruangan != undefined) {
				//     ruanganId=$scope.item.ruangan.id
				// }
				var idPegawai = ''
				if ($scope.item.kasir != undefined) {
					idPegawai = $scope.item.kasir.id
				}
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');
				var client = new HttpClient();
				client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-penerimaan-kasir=' + dataLogin.userData.namauser + '&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idPegawai=' + idPegawai + '&idRuangan=' + ruanganId + '&idDokter=' + dokter + '&view=true', function (response) {
				});
			}

		}
	]);
});