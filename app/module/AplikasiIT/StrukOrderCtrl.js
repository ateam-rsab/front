define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('StrukOrderCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm',
		function ($rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			},

				function errorCallBack(err) { });

			ManageSdm.getItem("orderpelayanansistem/get-load-order-pelayanan-sistem", true).then(function (dat) {

				$scope.item.NoOrder = dat.data.data.noOrder;

			});
			ManageSdm.getItem("/orderpelayanansistem/get-load-rungan-jenisdok", true).then(function (dat) {

				$scope.listJenisDok = dat.data.data.data;

			});
			ManageSdm.getItem("orderpelayanansistem/get-load-rungan-tujuan", true).then(function (dat) {
				$scope.listRuangan = dat.data.data.data;
				$scope.listRuangan2 = dat.data.data.data;

			});

			ManageSdm.getItem("orderpelayanansistem/get-load-produk", true).then(function (dat) {
				$scope.listProduk = dat.data.data.data;
			});


			
			debugger;
			ManageSdm.getOrderList("orderpelayanansistem/get-order-sistem-all", true).then(function (dat) {
				debugger;
				$scope.daftarJabatan = new kendo.data.DataSource({
					data: dat.data.data.data
				});

			});

			$scope.no = 1;
			ModelItem.getDataDummyGeneric("Penandatangan", true).then(function (data) {
				$scope.listPenandatangan = data;
			})


			$scope.dataLaporanUjiHasil = new kendo.data.DataSource({
				data: []
			});


			$scope.pindah = function () {

				$state.go("RekamDataPegawai");

			}
			init();



			$scope.Listketerangan = [{
				"id": 1,
				"kode": "1",
				"name": "2016"
			}];


			$scope.ganti = function () {

				if ($scope.item.tahunUMR.name == "2016") {
					$scope.item.jumlahUMR = "2300000";

				}
				else {
					$scope.item.jumlahUMR = "";

				}

			}


			$scope.pindah1 = function () {

				$state.go("DataKeluarga");

			}

			$scope.refresh = function () {

				ManageSdm.getItem("orderpelayanansistem/get-load-order-pelayanan-sistem", true).then(function (dat) {
					$scope.item.NoOrder = dat.data.data.noOrder;

				});

				ManageSdm.getOrderList("orderpelayanansistem/get-order-sistem-all", true).then(function (dat) {
					$scope.daftarJabatan = new kendo.data.DataSource({
						data: dat.data.data.data
					});

				});
			}


			$scope.columnStruk = [
				{
					"field": "noOrder",
					"title": "<h3 aling='center'>No Order Intern</h3>",
					"width": "20%"
				},

				{
					"field": "tglOrder",
					"title": "<h3 aling='center'>Tanggal Order</h3>",
					"width": "20%"
				},

				{
					"field": "tlgOrderExp",
					"title": "<h3 aling='center'>Tanggal Order Exp</h3>",
					"width": "20%"
				},

				{
					"field": "jenisDok",
					"title": "<h3 aling='center'>Jenis Dokumen</h3>",
					"width": "20%"
				},

				{
					"field": "namaRuangan",
					"title": "<h3 aling='center'>Ruang Tujuan</h3>",
					"width": "20%"
				},
				{
					"field": "nmProduk",
					"title": "<h3 aling='center'>Produk</h3>",
					"width": "20%"
				},
				{
					"field": "ketKeperluan",
					"title": "<h3 aling='center'>Keterangan Lain</h3>",
					"width": "20%"
				}

			];

			$scope.reset = function () {

				$scope.item.NoOrder = "";
				$scope.item.TglOrder = "";
				$scope.item.TglOrderExp = "";
				$scope.item.jenisdokumen = "";
				$scope.item.RuangTujuan = "";
				$scope.item.Produk = "";
				$scope.item.keterangan = "";
			}


			// var aktif = false;
			var aktif = "true";
			$scope.check = function () {
				debugger;
				if (aktif)
					aktif = "false";

				else
					aktif = "true";

			}



			$scope.Save = function () {
				debugger;
				var listRawRequired = [
					"item.NoOrder|ng-model|No Order",
					"item.TglOrder|k-ng-model|Tanggal Order",
					"item.TglOrderExp|k-ng-model|Tanggal Order Exp",
					"item.jenisdokumen|k-ng-model|Jenis Dokumen",
					"item.RuangAsal|k-ng-model|Ruang Asal",
					"item.RuangTujuan|k-ng-model|Ruang Tujuan",
					"item.Produk|k-ng-model|Produk",
					"item.keterangan|ng-model|Keterangan"

				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);

				var data =

				{
					"strukOrder": {
						"noOrder": $scope.item.NoOrder,
						"isDelivered": 1,
						"qtyJenisProduk": 0,
						"tglOrder": $scope.item.TglOrder,
						"tglOrderExpired": $scope.item.TglOrderExp,
						"qtyProduk": 2,
						"totalBeaMaterai": 0,
						"totalBiayaKirim": 0,
						"totalBiayaTambahan": 0,
						"totalDiscount": 0,
						"totalHargaSatuan": 0,
						"totalHarusDibayar": 0,
						"totalPph": 0,
						"totalPpn": 0,
						"keteranganKeperluan": $scope.item.keterangan,
						"jenisDokumen": { "id": $scope.item.jenisdokumen.idJenisDok },
						"ruangan": { "id": $scope.item.RuangAsal.idRuangan },
						"ruanganTujuan": { "id": $scope.item.RuangTujuan.idRuangan }
					},
					"orderPelayanan": {
						"produk": { "id": $scope.item.Produk.idProduk },
						"qtyProduk": 0,
						"qtyProdukRetur": 0,
						"tglPelayanan": "2017-05-29",
						"isCito": 1
					}
				}


				ManageSdm.saveData(data, "/orderpelayanansistem/save-order-pelayanan-sistem").then(function (e) {
					console.log(JSON.stringify(e.data));
					//$scope.loadGrid();
					ManageSdm.getItem("orderpelayanansistem/get-load-order-pelayanan-sistem", true).then(function (dat) {

						$scope.item.NoOrder = dat.data.data.noOrder;

					});
					$scope.refresh();
					// $scope.item.NoOrder = "";
					$scope.item.TglOrder = "";
					$scope.item.TglOrderExp = "";
					$scope.item.keterangan = "";
					$scope.item.jenisdokumen = "";
					$scope.item.RuangAsal = "";
					$scope.item.ruanganTujuan = "";
					$scope.item.Produk = "";
				});

			}

			function init() {



			};

		}

	]);
});