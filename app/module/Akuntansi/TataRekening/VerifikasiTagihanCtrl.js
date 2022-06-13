define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('VerifikasiTagihanCtrl', ['$state', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageTataRekening', 'ManageSdmNew', '$mdDialog',
		function ($state, $q, $rootScope, $scope, modelItemAkuntansi, manageTataRekening, manageSdmNew, $mdDialog) {
			$scope.isRouteLoading = true
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.nowFormated = moment($scope.now).format('DD-MM-YYYY');
			$scope.pageCetak = false;
			$scope.showKelengkapanDokumen = false;

			$scope.item = {};
			$scope.tombolSaveIlang = true;
			$scope.isDiskonRSAB = false;
			$scope.isDiskonKaryawanKeluargaInti = false;
			$scope.isPenungguPasien = false
			$scope.isPasien = false

			$scope.dataParams = JSON.parse($state.params.dataPasien);
			$scope.item.diskonpegawai = $scope.dataParams.diskonpegawai;

			// $q.all([
			// 	modelItemAkuntansi.getDataTableTransaksi("tatarekening/verifikasi-tagihan2/"
			// 		+ $scope.dataParams.noRegistrasi + "?jenisdiskon=" + $scope.item.diskonpegawai)
			// ])
			// 	.then(function (data) {

			// 		if (data[0].statResponse) {
			// 			$scope.isDiskonRSAB = data[0].kelompokPasienID === 1;

			// 			$scope.item = data[0];
			// 			if (data[0].needDokument) {
			// 				$scope.showKelengkapanDokumen = true;
			// 				$scope.dataKelengkapanDokumen = new kendo.data.DataSource({
			// 					data: data[0].dokuments
			// 				});
			// 			}
			// 			if ($scope.item.jenisPasien == 'BPJS') {
			// 				// $scope.item.totalKlaim = $scope.item.jumlahBayar //Old
			// 				$scope.item.totalKlaim = $scope.item.jumlahBayarNew //New
			// 			}
			// 			$scope.showTtlKlaim = true
			// 			$scope.showTtlKlaim2 = false
			// 			if (data[0].isRawatInap == false) {
			// 				if (data[0].jenisPasien == 'Umum/Pribadi') {
			// 					$scope.showTtlKlaim = false
			// 					$scope.showTtlKlaim2 = true
			// 				}
			// 			}
			// 		}
			// 		$scope.isRouteLoading = false
			// 	});

			// function showButton(){
			// 	$scope.showBtnSimpan = true;
			// 	$scope.showBtnKembali = true;
			// 	// $scope.showBtnCetak = true;
			// }
			// showButton();

			$scope.loadDataVerif = function () {
				$scope.isRouteLoading = true

				manageTataRekening.getDataTableTransaksi("pegawai/data-pegawai").then(function (res) {
					$scope.listPegawaiMPP = res.data
				})

				modelItemAkuntansi.getDataTableTransaksi("tatarekening/verifikasi-tagihan2/"
					+ $scope.dataParams.noRegistrasi + "?jenisdiskon=" + ($scope.diskonpegawaiexisting ? $scope.diskonpegawaiexisting : $scope.item.diskonpegawai)).then(function (data) {
						if (data.statResponse) {
							$scope.kelompokPasienID = data.kelompokPasienID
							$scope.isDiskonRSAB = data.kelompokPasienID === 1;

							$scope.item = data;
							if ($scope.kelompokPasienID == 1 && $scope.item.totalDiskonPegawai > 0
								&& $scope.item.diskonpegawaiexisting == null && $scope.item.diskonpegawai == 0) {
								$scope.item.billing = $scope.item.billing + $scope.item.totalDiskonPegawai
								$scope.item.totalKlaim = $scope.item.totalDiskonPegawai
								$scope.awalbilling = $scope.item.billing
							} else if ($scope.kelompokPasienID == 1 && $scope.awalbilling
								&& $scope.item.totalDiskonPegawai > 0 && $scope.item.diskonpegawai != 0) {
								$scope.item.billing = $scope.awalbilling
								$scope.item.jumlahBayar = $scope.item.billing - $scope.item.totalDiskonPegawai - $scope.item.deposit;
							}

							if (data.diskonpegawaiexisting == 1 || data.diskonpegawaiexisting == 2
								|| data.diskonpegawaiexisting == 3 || data.diskonpegawaiexisting == 4
								|| data.diskonpegawaiexisting == 5) {
								$scope.isDiskonKaryawanKeluargaInti = true
								$scope.isAsPegOrKel = true
								$scope.item.diskonpegawai = data.diskonpegawaiexisting
								$scope.diskonpegawaiexisting = data.diskonpegawaiexisting
							}

							if ($scope.item.diskonpegawai == 1 || data.diskonpegawaiexisting == 1
								|| $scope.item.diskonpegawai == 2 || data.diskonpegawaiexisting == 2
								|| $scope.item.diskonpegawai == 5 || data.diskonpegawaiexisting == 5) {
								$scope.item.mppPenungguPasien = undefined
								$scope.item.mppPasien = undefined
								$scope.isPenungguPasien = false
								$scope.isPasien = false
							} else if ($scope.item.diskonpegawai == 3 || data.diskonpegawaiexisting == 3) {
								$scope.item.mppPenungguPasien = undefined
								$scope.isPenungguPasien = true
								$scope.isPasien = false
							} else if ($scope.item.diskonpegawai == 4 || data.diskonpegawaiexisting == 4) {
								$scope.item.mppPasien = undefined
								$scope.isPasien = true
								$scope.isPenungguPasien = false
							}

							if (data.needDokument) {
								$scope.showKelengkapanDokumen = true;
								$scope.dataKelengkapanDokumen = new kendo.data.DataSource({
									data: data.dokuments
								});
							}
							if ($scope.item.jenisPasien == 'BPJS') {
								// $scope.item.totalKlaim = $scope.item.jumlahBayar //Old
								$scope.item.totalKlaim = $scope.item.jumlahBayarNew //New
							}
							if (data.kelompokPasienID == 1) {
								$scope.showTtlKlaim = false
								$scope.showTtlKlaim2 = true
							} else {
								$scope.showTtlKlaim = true
								$scope.showTtlKlaim2 = false
							}

							if ($scope.item.diskonpegawai == 1 || $scope.item.diskonpegawai == 2
								|| $scope.item.diskonpegawai == 3 || $scope.item.diskonpegawai == 4
								|| $scope.item.diskonpegawai == 5) {
								if (data.jenisPasien == 'Umum/Pribadi') {
									$scope.item.totalKlaim = data.totalDiskonPegawai
								}
							}
						}
						$scope.isRouteLoading = false
					})
			}

			$scope.loadDataVerif()

			$scope.Cetak = function () {
				$scope.pageCetak = true;
				$scope.showBtnCetak = false;
				$scope.showBtnSimpan = false;

				$scope.totalBayarFormated = formatRupiah($scope.item.jumlahBayar, "Rp.");
			}
			$scope.DetailTagihan = function () {
				var obj = {
					noRegistrasi: $scope.dataParams.noRegistrasi
				}

				$state.go("RincianTagihanTataRekening", {
					dataPasien: JSON.stringify(obj)
				});
			}

			$scope.Save = function (e) {
				$scope.isRouteLoading = true
				$scope.tombolSaveIlang = false;
				var listRawRequired = [
					"item.totalKlaim|ng-model|Total klaim",
				];


				var isValid = modelItemAkuntansi.setValidation($scope, listRawRequired);

				if (isValid.status) {
					if ($scope.isDiskonRSAB && $scope.isDiskonKaryawanKeluargaInti) {
						// if ($scope.item.totalKlaim > $scope.item.billing / 2) {
						// 	$scope.isRouteLoading = false
						// 	$scope.tombolSaveIlang = true
						// 	toastr.warning("Total diskon karyawan/ keluarga inti tidak boleh lebih besar dari 50% Total Billing!")
						// 	return
						// } else {

						if ($scope.item.diskonpegawai && $scope.item.diskonpegawai == 3 && !$scope.item.mppPenungguPasien) {
							toastr.warning('Manager Pelayanan Pasien yang menyetujui harus diisi', 'Peringatan')
							$scope.isRouteLoading = false
							$scope.tombolSaveIlang = true
							return
						}

						if ($scope.item.diskonpegawai && $scope.item.diskonpegawai == 4 && !$scope.item.mppPasien) {
							toastr.warning('Manager Pelayanan Pasien yang menyetujui harus diisi', 'Peringatan')
							$scope.isRouteLoading = false
							$scope.tombolSaveIlang = true
							return
						}

						$scope.mppId = ""
						if ($scope.item.diskonpegawai && $scope.item.diskonpegawai == 3 && $scope.item.mppPenungguPasien) {
							$scope.mppId = $scope.item.mppPenungguPasien.pegawaiId
						} else if ($scope.item.diskonpegawai && $scope.item.diskonpegawai == 4 && $scope.item.mppPasien) {
							$scope.mppId = $scope.item.mppPasien.pegawaiId
						}

						$scope.isRouteLoading = false
						var confirm = $mdDialog.confirm()
							.title('Konfirmasi Diskon Karyawan')
							.textContent('Diskon karyawan sebesar ' + formatRupiah($scope.item.totalKlaim, "Rp"))
							.ariaLabel('Lucky day')
							.targetEvent(e)
							.ok('OK')
							.cancel('Cancel');
						$mdDialog.show(confirm).then(function () {
							$scope.isRouteLoading = true
							manageSdmNew.getListData("pelayanan/klaim-diskon?noRegistrasi=" + $scope.item.noRegistrasi
								+ "&totalKlaim=" + $scope.item.totalKlaim + "&jenisDiskon=" + $scope.item.diskonpegawai)
								.then(function (e) {
									//set nol kembali karena klaim ke diri sendiri bukan ke penjamin/ pihak ketiga
									$scope.item.totalKlaim = 0;
									$scope.item.isDiskon = $scope.item.diskonpegawai
									manageTataRekening.saveVerifikasiTagihan($scope.item)
										.then(function (e) {
											$scope.SaveLogUser();
											window.history.back();
											$scope.isRouteLoading = false
											$scope.tombolSaveIlang = true;
										}, function () {
											$scope.isRouteLoading = false
											$scope.tombolSaveIlang = true;
										});
								});
						}, function () {
							// error function
							$scope.isRouteLoading = false
							$scope.tombolSaveIlang = true
						});

						// }
					} else {
						if ($scope.kelompokPasienID == 1) {
							/**
							 * jika hanya jika pasien umum/ pribadi tidak diskon, 
							 * tetapi harga diskon pelayanan pasien > 0
							 * karena alasan lain seperti
							 * 
							 * 1. kemungkinan diskon saat input obat alkes
							 *  
							 **/
							$scope.item.totalKlaim = 0;
						}
						manageTataRekening.saveVerifikasiTagihan($scope.item)
							.then(function (e) {
								$scope.SaveLogUser();
								window.history.back();
								$scope.isRouteLoading = false
								$scope.tombolSaveIlang = true;
							}, function () {
								$scope.isRouteLoading = false
								$scope.tombolSaveIlang = true;
							});
					}
				}
				else {
					$scope.isRouteLoading = false
					$scope.tombolSaveIlang = true
					modelItemAkuntansi.showMessages(isValid.messages)
				}
			}
			$scope.SaveLogUser = function () {
				manageTataRekening.getDataTableTransaksi("logging/save-log-verifikasi-tarek?noregistrasi="
					+ $scope.item.noRegistrasi + "&mppid=" + $scope.mppId).then(function (data) {
						//
					})
			}
			$scope.Back = function () {
				if ($scope.pageCetak) {
					$scope.pageCetak = false;
					// $scope.showBtnCetak = true;
					$scope.showBtnSimpan = true;
				}
				else {
					window.history.back()
				}
			}

			$scope.dataKelengkapanDokumen = new kendo.data.DataSource({
				data: []
			});
			$scope.columnKelengkapanDokumen = [
				{
					"field": "No",
					"title": "No"
				},
				{
					"field": "Check",
					"title": "Check"
				},
				{
					"field": "Nama",
					"title": "Nama"
				},
				{
					"field": "Dokumen",
					"title": "Dokumen"
				}
			];

			//create pdf kwintans pembayaran
			$scope.getPDF = function (selector) {
				kendo.drawing.drawDOM($(selector)).then(function (group) {
					kendo.drawing.pdf.saveAs(group, "Kwintansi-Pembayaran-" + $scope.nowFormated + ".pdf");
				});
			}

			function formatRupiah(value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.$watch('item.totalKlaim', function (newValue, oldValue) {
				$scope.item.jumlahBayar = $scope.item.billing - newValue - $scope.item.deposit;
			});

			$scope.toogleClick = function (ev) {
				var checked = ev.target.checked;
				// var inputId = ev.currentTarget.id;
				if (checked) {
					$scope.isAsPegOrKel = true
				} else {
					if ($scope.diskonpegawaiexisting && $scope.diskonpegawaiexisting != 0) {
						$scope.isAsPegOrKel = true
						$scope.isDiskonKaryawanKeluargaInti = true
					} else {
						$scope.isAsPegOrKel = false
						$scope.item.totalKlaim = 0
						$scope.item.diskonpegawai = 0
						$scope.item.isPenungguPasien = false
						$scope.item.isPasien = false
					}
				}
				$scope.loadDataVerif();
			};
		}
	]);
});
