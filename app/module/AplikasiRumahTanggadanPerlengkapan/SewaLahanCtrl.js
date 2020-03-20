define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('SewaLahanCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state) {
			ModelItem.get("RumahTangga/SewaLahan").then(function (data) {
				$scope.ite = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			$scope.item = {};

			$scope.$watch("item.tglPelayananAwal", function () {
				if ($scope.item.tglPelayananAwal != undefined && $scope.item.tglPelayananAkhir != undefined) {
					var d1 = moment($scope.item.tglPelayananAwal);
					var d2 = moment($scope.item.tglPelayananAkhir);
					var days = moment.duration(d2.diff(d1)).asDays();
					$scope.item.lamaSewa = days;
				}

			});

			$scope.$watch("item.tglPelayananAkhir", function () {
				if ($scope.item.tglPelayananAwal != undefined && $scope.item.tglPelayananAkhir != undefined) {
					var d1 = moment($scope.item.tglPelayananAwal);
					var d2 = moment($scope.item.tglPelayananAkhir);
					var days = moment.duration(d2.diff(d1)).asDays();
					$scope.item.lamaSewa = days;
				}
			});

			$scope.monthSelectorOptions = {
				start: "year",
				depth: "month"
			};

			if ($state.current.name == "KeluarLahan") {
				$scope.isOut = true;
				debugger;
				ManageSarpras.getOrderList("daftar-sewa-lahan/find-by-no-order/?noOrder=" + $state.params.noOrder).then(function (data) {
					$scope.order = data.data.data.data[0];
					$scope.item = $scope.order;
					$scope.item.noTelpMobile = $scope.item.noTelp;
					$scope.item.lahan = {
						"namaProduk":$scope.item.namaLahan
					};
					$scope.item.lamaSewa = parseInt($scope.item.lamaSewa);
					$scope.item.satuan = {
						"satuanWaktu":$scope.item.satuan
					}
 					$scope.item.tglPelayananAwal = new Date($scope.item.tglSewaAwal);
					$scope.item.tglPelayananAkhir = new Date($scope.item.tglSewaAkhir);
					$scope.item.totalHargaSatuan = $scope.item.harga;
					
				

				})
				$scope.Save = function () {
					var saveData = {
						"strukOrder": {
							"tglKeluar": $scope.item.tglKeluar.getTime()
						}
					}
					ManageSarpras.saveDataSarPras(saveData, "daftar-sewa-lahan/save-status-sewa-lahan/?noOrder=" + $state.params.noOrder ).then(function (e) {
						console.log(JSON.stringify(e.data));
						$state.go("DaftarSewaLahanRsab");
					})
				}
			} else {
				$scope.Save = function () {
					debugger;
					var data = {
						"strukOrder": $scope.item,
						"orderPelayanan": {
							"ruangan": {
								"id": $scope.item.lahan.idRuangan
							},
							"ruanganTujuan": {
								"id": $scope.item.lahan.idRuangan
							},
							"produk": {
								"id": $scope.item.lahan.idProduk
							},
							"satuanWaktu": $scope.item.satuan,
							"hargaSatuan": $scope.item.totalHargaSatuan
						},
					}

					ManageSarpras.saveDataSarPras(ModelItem.beforePost(data), "sewa-lahan/save-sewa-lahan/").then(function (e) {
						console.log(JSON.stringify(e.data));
						$scope.item = {};
						$scope.item.totalHargaSatuan = $scope.harga;
					});

				};
			}

			$scope.$watch("item.lahan", function () {
				debugger;
				var monthStart = new Date($scope.item.tglPelayananAwal);
				var monthEnd = new Date($scope.item.tglPelayananAkhir)
				var countBulan = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
				console.log(countBulan);
				if ($scope.item.lamaSewa != undefined && $scope.item.satuan.id != undefined) {
					if ($scope.item.satuan.id == 3) {
						$scope.item.totalHargaSatuan = $scope.item.lahan.hargaSatuan * ($scope.item.lamaSewa * countBulan);
					} else if ($scope.item.satuan.id == 4) {
						$scope.item.totalHargaSatuan = $scope.item.lahan.hargaSatuan * ($scope.item.lamaSewa * 12);
					} else if ($scope.item.satuan.id == 2) {
						$scope.item.totalHargaSatuan = $scope.item.lahan.hargaSatuan * $scope.item.lamaSewa;
					}
				}

			});
			$scope.$watch("item.lamaSewa", function () {
				debugger;
				var monthStart = new Date($scope.item.tglPelayananAwal);
				var monthEnd = new Date($scope.item.tglPelayananAkhir)
				var countBulan = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
				console.log(countBulan);
				if ($scope.item.lahan != undefined && $scope.item.satuan.id != undefined) {
					if ($scope.item.satuan.id == 3) {
						$scope.item.totalHargaSatuan = $scope.item.lahan.hargaSatuan * ($scope.item.lamaSewa * countBulan);
					} else if ($scope.item.satuan.id == 4) {
						$scope.item.totalHargaSatuan = $scope.item.lahan.hargaSatuan * ($scope.item.lamaSewa * 12);
					} else if ($scope.item.satuan.id == 2) {
						$scope.item.totalHargaSatuan = $scope.item.lahan.hargaSatuan * $scope.item.lamaSewa;
					}
				}

			});
			$scope.$watch("item.satuan", function () {
				debugger;
				var monthStart = new Date($scope.item.tglPelayananAwal);
				var monthEnd = new Date($scope.item.tglPelayananAkhir)
				var countBulan = (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
				console.log(countBulan);
				if ($scope.item.lamaSewa != undefined && $scope.item.lahan != undefined) {
					if ($scope.item.satuan.id == 3) {
						$scope.item.totalHargaSatuan = $scope.item.lahan.hargaSatuan * ($scope.item.lamaSewa * countBulan);
					} else if ($scope.item.satuan.id == 4) {
						$scope.item.totalHargaSatuan = $scope.item.lahan.hargaSatuan * ($scope.item.lamaSewa * 12);
					} else if ($scope.item.satuan.id == 2) { 
						$scope.item.totalHargaSatuan = $scope.item.lahan.hargaSatuan * $scope.item.lamaSewa;
					}
				}

			});

			$scope.NavToDaftarSewaLahan = function () {
				$state.go("DaftarSewaLahanRsab")
			}

			$scope.hargaSewa = function () {

				var lama = $scope.item.lamaSewaLahan;
				var harga = $scope.item.hargaSewaLahan;
				var total = lama * harga;
				$scope.item.total = total;

			}

			$scope.satuanWaktu = [
				{
					"id": 2,
					"satuanWaktu": "HARI"
				},
				{
					"id": 3,
					"satuanWaktu": "BULAN"
				},
				{
					"id": 4,
					"satuanWaktu": "TAHUN"
				}
			]

			// ManageSarpras.getListData("SatuanWaktu&select=id,satuanWaktu").then(function (data) {

			// })

			ManageSarpras.getOrderList("sewa-lahan/find-sewa-lahan/").then(function (data) {
				$scope.sourceLahan = data.data.data;
				debugger;
			})



			$scope.Back = function () {
				$scope.item.noOrder ="";
				$scope.item.namaPenyewa ="";
				$scope.item.lahan = "";
				$scope.item.tglPelayananAwal = "";
				$scope.item.tglPelayananAkhir = "";
				$scope.item.alamat = "";
				$scope.item.noTelpMobile = "";
				$scope.item.noKtp = "";
				$scope.item.totalHargaSatuan ="";
				$scope.item.lamaSewa ="";
				$scope.item.satuan = "";

				// $scope.item = {};
				$scope.item.totalHargaSatuan = $scope.harga;
			}


		}
	]);
});