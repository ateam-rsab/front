define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('LimbahB3MasukCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'MasterLimbah', 'MasterRuangan', 'MasterWaktu', 'MasterPetugas', 'TampilDataLimbah', 'ManageSarpras',
		function ($q, $rootScope, $scope, ModelItem, DateHelper, MasterLimbah, MasterRuangan, MasterWaktu, MasterPetugas, TampilDataLimbah, ManageSarpras) {
			function initPage() {
				$scope.dataVOloaded = true;
				$scope.item = {
					tanggalAwal: new Date()
				};
				$scope.isRouteLoading = true;
				$q.all([
					ManageSarpras.getOrderList("penanganan-keluhan-pelanggan/get-login-user/"),
					MasterRuangan.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan"),
					MasterWaktu.getOrderList("service/list-generic/?view=SatuanWaktuKesling&select=id,namaSatuanWaktuKesling"),
					ModelItem.getPegawai()
				]).then(function (res) {
					if (res[0].statResponse) $scope.item.namaPengirim = res[0].data.data;
					if (res[1].statResponse) $scope.ListRuangan = res[1].data;
					if (res[2].statResponse) $scope.ListWaktu = res[2].data;
					if (res[3]) {
						var pegawai = res[3];
						$scope.item.kdruanganasal = {
							id: pegawai.ruangan.id,
							namaRuangan: pegawai.ruangan.namaRuangan
						}
					}
					var ruanganTujuan = _.find($scope.ListRuangan, function (items) {
						return items.id == 318
					});
					if (ruanganTujuan) $scope.item.ruanganTujuan = ruanganTujuan;
					$scope.isRouteLoading = false;
				}, (err) => {
					$scope.isRouteLoading = false;
					throw err;
				});
			}
			initPage();
			$scope.$watch('item.kategoriLimbah', function (newVal) {
				if (!newVal) return;
				$scope.item.jenisLimbah = {};
				// alert("kategori saat ini adalah : "+$scope.item.kategoriLimbah);
				MasterLimbah.getOrderList("jenis-limbah-b3-masuk/get-jenis-limbah-b3-masuk?kategori=" + $scope.item.kategoriLimbah).then(function (dat) {
					$scope.ListLimbah = dat.data.data.jenisLimbahB3Masuk;
					// debugger;
				});
			});

			$scope.columndataJenisLimbahB3Masuk = [{
				"field": "kdproduk.namaProduk",
				"title": "Jenis Limbah B3 Masuk",

			}, {
				"field": "tglpelayanan",
				"title": "Tanggal",

			}, {
				"field": "qtyproduk",
				"title": "Berat Sampah Medis ",

			}, {
				"field": "satuanWaktuKesling.namaSatuanWaktuKesling",
				"title": "Waktu",

			}, {
				"field": "kdruangan.namaRuangan",
				"title": "Ruangan",

			}, {
				"field": "petugasString",
				"title": "Ruangan Asal",

			}, {
				"field": "maksimalPenyimpanan",
				"title": "Petugas",

			}, {
				"field": "maksimalPenyimpanan",
				"title": "PetugasPengiriman",

			}];

			$scope.batal = function () {
				$scope.item = {};
				$scope.item.tanggalAwal = new Date();
				$scope.item.jenisLimbah = {};
				$scope.item.kategoriLimbah = "medis";

				ManageSarpras.getOrderList("penanganan-keluhan-pelanggan/get-login-user/").then(function (data) {
					$scope.item.namaPengirim = data.data.data;
				});
				$scope.item.namaRuangan = "TPS LB3";
			};


			$scope.Save = function () {
				var listRawRequired = [
					"item.jenisLimbah|k-ng-model|Jenis limbah",
					"item.tanggalAwal|k-ng-model|Tanggal",
					"item.satuanWaktuKesling|k-ng-model|Waktu",
					"item.qty|k-ng-model|Berat sampah"
				];
				if ($scope.item.jenisLimbah == undefined || $scope.item.jenisLimbah == null) {
					toastr.warning('Jenis Limbah Tidak Ada', 'Jenis Limbah Salah');
				} else if ($scope.item.satuanWaktuKesling == undefined || $scope.item.satuanWaktuKesling == null) {
					toastr.warning('Salah Memasukan Waktu', 'Waktu Tidak Tersedia');
				} else if ($scope.item.kdruanganasal == undefined || $scope.item.kdruanganasal == null) {
					toastr.warning('Ruangan Asal Tidak Ada', 'Ruangan Asal Salah');
				} else {
					var isValid = ModelItem.setValidation($scope, listRawRequired);
					if (isValid.status) {
						ManageSarpras.saveLimbah(ModelItem.beforePost($scope.item)).then(function (e) {
							// console.log(JSON.stringify($scope.item));
							// $scope.item = {};
							for (var key in $scope.item) {
								if ($scope.item.hasOwnProperty(key)) {
									if (key.indexOf('jenisLimbah') >= 0 || key.indexOf('satuanWaktuKesling') >= 0 || key.indexOf('qty') >= 0) delete $scope.item[key];
								}
							}
							$scope.item.tanggalAwal = new Date();
							// init();  
							/*$state.go('dashboardpasien.TandaVital', {
							noCM: $scope.noCM
							});*/
						});
					} else {
						ModelItem.showMessages(isValid.messages);
					}
				}
			};

		}
	]);
});