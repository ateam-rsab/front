define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PengeringanInternalCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindLaundry', 'FindSarpras',
		function ($rootScope, $scope, $state, ModelItem, dateHelper, ManageSarpras, FindLaundry, FindSarpras) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.tanggalPengeringan = $scope.now;
			$scope.item.tanggalKerja = $scope.now;
			$scope.isRouteLoading = false;
			$scope.disabledSave = false;
			$scope.item.jumlahCycle = 1;
			$scope.item.beratlinen = $state.params.beratLinen
			$scope.satuan = function () {
				if ($scope.item.mesin != undefined) {
					$scope.item.kapasitas = $scope.item.mesin.kapasitasMesin;
					$scope.item.satuan = $scope.item.mesin.namaSatuanStandar;
				}
			};
			ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
				$scope.dataMasterPetugas = dat.data;
			});
			FindSarpras.getSarpras("user/get-user").then(function (dat) {
				$scope.item.petugas = dat.data.data.namaUser;
				$scope.item.petugasid = dat.data.data.pegawai.id;
			});
			// set data fix Pengeringan
			$scope.item.satuanlinen = "Kilogram";
			// State Parameter dari Pencucian linen
			$scope.noRecStrukPelayanan = $state.params.noRecStrukPelayanan;
			$scope.item.petugas = $state.params.namaPetugas;
			$scope.item.beratlinen = $state.params.beratLinen;
			$scope.item.IdPetugas = parseInt($state.params.IdPetugas);

			ManageSarpras.getOrderList("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function (dat) {
				$scope.item.IdRuangan = dat.data.id;
				$scope.item.ruangan = dat.data.namaRuangan;
			});

			$scope.SetTotalJam = function () {
				var tanggalAwalPencucian = new moment($scope.item.tanggalPengeringan).format('YYYY-MM-DD');
				var tanggalAkhirPencucian = new moment($scope.item.tanggalKerja).format('YYYY-MM-DD');
				var JamAwalPencucian = new moment($scope.item.jamAwal).format('HH:mm');
				var JamAkhirPencucian = new moment($scope.item.jamAkhir).format('HH:mm');
				var TotalWaktu = dateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian + " " + JamAwalPencucian, tanggalAkhirPencucian + " " + JamAkhirPencucian);
				return $scope.item.TotalJam = TotalWaktu;
			}

			FindLaundry.getLaundry("alat/get-mesin-laundry").then(function (dat) {
				$scope.sourceMasterMesin = dat.data.data
			});


			$scope.Pengeringan = function () {
				$state.go('DaftarPengeringan')
			}

			$scope.kembali = function () {
				$state.go("DaftarPencucianLinen");
			}

			$scope.DaftarPengeringan = function () {
				$state.go('DaftarPengeringan')
			}


			$scope.Save = function () {
				$scope.disabledSave = true;
				var TanggalMulai = dateHelper.formatDate($scope.item.tanggalPengeringan, "YYYY-MM-DD")
				var TanggalSelesai = dateHelper.formatDate($scope.item.tanggalKerja, "YYYY-MM-DD")
				var JamAwal = dateHelper.formatDate($scope.item.jamAwal, "HH:mm:ss");
				var JamAkhir = dateHelper.formatDate($scope.item.jamAkhir, "HH:mm:ss")
				var listRawRequired = [
					"item.tanggalPengeringan|k-ng-model|Tanggal Awal",
					"item.tanggalKerja|k-ng-model|Tanggal Kerja",
					"item.jamAwal|k-ng-model|Jam Awal",
					"item.jamAkhir|k-ng-model|Jam Akhir",
					"item.mesin|k-ng-model|Mesin",
					"item.beratlinen|ng-model|Berat",
					"item.jumlahCycle|ng-model|Jumlah Cycle"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if (isValid.status) {
					var data = {
						"tgl": TanggalMulai + " " + JamAwal,
						"tglKerja": TanggalSelesai + " " + JamAkhir,
						"beratLinen": parseInt($scope.item.beratlinen),
						"mesinId": $scope.item.mesin.alatId,
						"petugasId": $scope.item.IdPetugas,
						"noRecStrukPelayanan": $scope.noRecStrukPelayanan,
						"jumlahCycle": parseInt($scope.item.jumlahCycle)
					}
					ManageSarpras.savePengeringan(data, "laundry/save-proses-pengeringan-internal").then(function (e) {
						if($scope.item.ruangan == 'Laundry') {
							$scope.isRouteLoading = true;
							setTimeout(function(){
								window.location.href = '#/DaftarPengeringan'
							}, 5000)					
						} else {
							toastr.success('Terima Kasih Telah Menggunakan Layanan Kami, Proses Selesai')
							window.location.href = '#/home'
						}
					});
				} else {
					ModelItem.showMessages(isValid.messages);
					$scope.disabledSave = false;
				}
			};
		}
	])
})