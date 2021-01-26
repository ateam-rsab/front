define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PermintaanPerbaikandariRuanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageIPSRS', 'IPSRSService', '$state', '$location', '$mdDialog', 'DateHelper',
		function ($rootScope, $scope, ModelItem, ManageIPSRS, IPSRSService, $state, $location, $mdDialog, DateHelper) {
			ModelItem.get("IP3RS/PermintaanPerbaikandariRuangan").then(function (data) {
				$scope.item = data;
				$scope.item.tanggalPesan = new Date();
				$scope.dataVOloaded = true;
				$scope.Nongedung = true;;
				let dataLogin = JSON.parse(localStorage.getItem("pegawai"));

				$scope.noOrderr = function () {
					ManageIPSRS.getItemIPSRS("ip3rs/get-no-order-perbaikan", true).then(function (dat) {
						$scope.item.noOrder = dat.data.noOrderPerbaikan;
					});
				}
				$scope.noOrderr();

				let init = () => {
					console.log(dataLogin);
					$scope.item.userPelapor = dataLogin.namaLengkap;
					
				}
				init();

				// IPSRSService.getItem("psrsPermintaanPerbaikan/get-user-login", true).then(function (dat) {
				// 	$scope.item.userPelapor = dat.data.namaPegawai;
				// });

				IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function (dat) {
					$scope.item.ruangan = dat.data.namaRuangan;
					$scope.item.idRuangan = dat.data.id;
				});

				ManageIPSRS.getItemIPSRS("ip3rs/get-ruangan-tujuan", true).then(function (dat) {
					$scope.item.ruanganTujuan = dat.data.namaRuangan;
					$scope.item.idRuanganTujuan = dat.data.id;
				});

				$scope.onChangeKategoriPerbaikan = function () {

					var idJenis = $scope.item.KategoriPerbaikan.id;
					if (idJenis == 79) {
						// Khusus Gedung
						$scope.Jenis = idJenis;
						$scope.gedung = false;
						$scope.Nongedung = true;
						ManageIPSRS.getItemIPSRS("ip3rs/get-asset-gedung-by-jenis-asset", true).then(function (res) {
							$scope.listNamaBarang = res.data.daftar;
						})
					} else {
						//  Khusus Non Gedung

						$scope.Jenis = undefined;
						$scope.gedung = true;
						$scope.Nongedung = false;
						ManageIPSRS.getItemIPSRS("ip3rs/get-asset-non-gedung-by-jenis-asset/?idJenis=" + idJenis, true).then(function (res) {
							$scope.listNamaBarang = res.data.daftar;
						})
					}
				}

				$scope.getDung = function () {
					console.log($scope.item.namaBarang);
					// if ($scope.Jenis == 79) {
					// 	$scope.NorecGedung = $scope.item.namaBarang.noRec;
					// }
				}

				// http://172.16.111.18:8001/service/transaksi/ip3rs/get-jenis-produk
				ManageIPSRS.getItemIPSRS("ip3rs/get-jenis-produk").then(function (dat) {
					$scope.listKategoriPerbaikan = dat.data;
				});

				$scope.showConfirm = function (ev) {
					// Appending dialog to document.body to cover sidenav in docs app
					var confirm = $mdDialog.confirm()
						.title('Permintaan Perbaikan')
						.textContent('Ada Perminaan \n Perbaikan' + 'Data')
						.ariaLabel('Lucky day')
						.ok('Oke')

					$mdDialog.show(confirm).then(function () {
						$state.go("RespondPerbaikan");
					});
				};
				$scope.keteranganAsset = [{
						"nama": "Asset"
					},
					{
						"nama": "Non Asset"
					}
				]


				$scope.mainGridOptions = {
					pageable: true,
					columns: [{
							field: "noRegisterAset",
							title: "Nomor Asset"
						},
						{
							field: "namaProduk",
							title: "Nama Barang"
						},
						{
							field: "merkProduk",
							title: "Merk Barang"
						},
						{
							field: "noSeri",
							title: "No Seri"
						},
						{
							field: "typeProduk",
							title: "Type"
						}
					],
					editable: false
				};

				$scope.klik = function (current) {
					$scope.current = current;
					$scope.ModeClick = true;
					$scope.item.nomorAsset = current.noRegisterAset;
					$scope.item.barang = current.namaProduk;
					$scope.item.barangMerk = current.merkProduk;
					$scope.item.noSeri = current.noSeri;
					$scope.item.tipeBarang = current.typeProduk;
					$scope.item.noRec = current.noRec;
					$scope.item.idProduk = current.idProduk;
				};

				$scope.autoComplite = function () {
					$scope.item.namaBarang = $scope.item.noSeri.namaProduk;
					$scope.item.kodeBarang = $scope.item.noSeri.kdProduk;
					$scope.item.merk = $scope.item.noSeri.merkProduk;
					$scope.item.type = $scope.item.noSeri.typeProduk;
				};

				$scope.simpan = function () {
					var tanggal = DateHelper.getTanggalFormattedNew($scope.item.tanggalPesan);
					let data = {
						kdProfile: 4,
						keluhan: $scope.item.kerusakan,
						noOrder: $scope.item.noOrder,
						idPelapor: dataLogin.id,
						registrasiAset: $scope.item.namaBarang.norecRegAset,
						tglOrder: tanggal,
					}
					// if ($scope.Jenis != 79) {
					// 	var data = {
					// 		"tglOrder": tanggal,
					// 		"ruanganAsal": {
					// 			"id": $scope.item.idRuangan
					// 		},
					// 		"ruanganTujuan": {
					// 			"id": $scope.item.idRuanganTujuan
					// 		},
					// 		"registrasiAset": {
					// 			// "noRec": $scope.item.noRec
					// 			"noRec": "ff8081815bad81e8015bb26f08840070"
					// 		},
					// 		"keteranganOrder": $scope.item.kerusakan
					// 	}
					// } else {
					// 	var data = {
					// 		"tglOrder": tanggal,
					// 		"ruanganAsal": {
					// 			"id": $scope.item.idRuangan
					// 		},
					// 		"ruanganTujuan": {
					// 			"id": $scope.item.idRuanganTujuan
					// 		},
					// 		"registrasiAset": {
					// 			"noRec": $scope.NorecGedung
					// 		},
					// 		"keteranganOrder": $scope.item.kerusakan
					// 	}
					// }

					ManageIPSRS.saveDataSarPras(data, "ip3rs/save-permintaan-perbaikan").then(function (e) {
						$scope.reset();
						$scope.noOrderr();
					});
				};

				$scope.reset = () => {
					$scope.item.tanggalPesan = new Date();
					$scope.item.kerusakan = "";
					$scope.item.KategoriPerbaikan = null;
					$scope.item.namaBarang = null;
					
				}

				$scope.batal = function () {
					// body...
					$scope.item.ruangan = "";
					$scope.item.noSeri = "";
					$scope.item.namaBarang = "";
					$scope.item.kodeBarang = "";
					$scope.item.merk = "";
					$scope.item.type = "";
					$scope.item.kerusakan = "";
					$scope.item.user = "";
				}

			}, function errorCallBack(err) {});
		}
	]);
});