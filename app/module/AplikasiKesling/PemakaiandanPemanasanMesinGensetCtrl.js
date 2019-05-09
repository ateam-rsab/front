define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemakaiandanPemanasanMesinGensetCtrl', ['$rootScope', '$scope', '$window', 'ModelItem', 'DateHelper', 'PemakaiandanPemanasanMesinService',
		function ($rootScope, $scope, $window, ModelItem, DateHelper, PemakaiandanPemanasanMesinService) {
			ModelItem.get("Kesling/PemakaiandanPemanasanMesinGensetatauBoiler").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.periodeAwal = new Date();
				$scope.item.periodeAkhir = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			var init = function () {
				PemakaiandanPemanasanMesinService.findAllPemakaianMesin("ipsrs-pemakaian-mesin/pemakaian-mesin-genset").then(function success(dat) {
					$scope.dataPemanasanGenset = dat.data.data;
					// debugger;

					var i = 1;
					$scope.dataPemanasanGenset.forEach(function (data) {
						var date1 = new Date(data.pemakaianAwal);
						data.pemakaianAwal = DateHelper.getTanggalFormatted(date1);

						var date2 = new Date(data.pemakaianAhir);
						data.pemakaianAhir = DateHelper.getTanggalFormatted(date2);

						data.no = i;
						i++;
					})
					// console.log(JSON.stringify($scope.dataPemanasanGenset))

				}, function error(error) {
					console.log(error);
				});
			}

			init();

			$scope.reset = function () {
				PemakaiandanPemanasanMesinService.findAllPemakaianMesin("ipsrs-pemakaian-mesin/pemakaian-mesin-genset").then(function success(dat) {
					$scope.dataPemanasanGenset = dat.data.data;
					// debugger;

					var i = 1;
					$scope.dataPemanasanGenset.forEach(function (data) {
						var date1 = new Date(data.pemakaianAwal);
						data.pemakaianAwal = DateHelper.getTanggalFormatted(date1);

						var date2 = new Date(data.pemakaianAhir);
						data.pemakaianAhir = DateHelper.getTanggalFormatted(date2);

						data.no = i;
						i++;
					})
					// console.log(JSON.stringify($scope.dataPemanasanGenset))

				}, function error(error) {
					console.log(error);
				});
			}

			$scope.dataPemanasanGenset = new kendo.data.DataSource({
				data: []
			});

			$scope.columnPemanasanGenset = [
				{
					"field": "no",
					"title": "<center>nomor</center>",
					width: "60px"

				},
				{
					"field": "tanggal",
					"title": "<center>Tanggal</center>",

				},
				{
					"field": "petugas",
					"title": "<center>Petugas</center>",
					width: "300px"

				},
				{
					"field": "jenisMesin",
					"title": "<center>Jenis Mesin</center>",

				},
				{
					"field": "namaMesin",
					"title": "<center>Nama Mesin</center>",

				},
				{
					"title": "<center>Liter Pemakaian</center>",
					"columns": [{
							"field": "pemakaianAwal",
							"title": "<center>Awal</center>",
						}, {

							"field": "pemakaianAhir",
							"title": "<center>Akhir</center>",
						}]
				}
			];

			$scope.tambah = function () {

				// //debugger;
				var tanggalBaru = DateHelper.getTanggalFormatted($scope.item.tanggal);

				var tempDataPemanasanGenset = {
					"tanggal": tanggalBaru,
					"namaMesin": $scope.item.namaMesin.name,
					"lamaPemakaian": $scope.item.lamaPemakaian,
					"keterangan": $scope.item.keterangan
				}

				$scope.dataPemanasanGenset.add(tempDataPemanasanGenset);

            };

			PemakaiandanPemanasanMesinService.getListMesin("service/list-generic/?view=Mesin&select=*").then(function (dat) {
				$scope.listMesin = dat.data;
				//debugger;
			});

			// PemakaiandanPemanasanMesinService.findAllPemakaianMesin("pemakaian-mesin/find-all-pemakaian-mesin/").then(function success(dat) {
			// 	$scope.dataPemanasanGenset = dat.data.data.pemakaianMesin;
			// 	$scope.dataPemanasanGenset.forEach(function (data) {
			// 		var date = new Date(data.tanggal);
			// 		data.tanggal = DateHelper.getTanggalFormatted(date);
			// 	})

			// 	console.log(JSON.stringify($scope.dataPemanasanGenset))
   //          }, function error(error) {
   //              console.log(error);
   //          });

			$scope.save = function () {
				var data = {
					"mesin": {
						"id": $scope.item.namaMesin.id
					},
					"tanggal": $scope.item.tanggal,
					"keterangan": $scope.item.keterangan,
					"lamaPemakaianPemanasanMesin": $scope.item.lamaPemakaian
				}
				console.log(JSON.stringify(data));
				PemakaiandanPemanasanMesinService.savePemakaian(ModelItem.beforePost(data), "pemakaian-mesin/save-pemakaian-mesin/").then(function (dat) {
					init();
					$scope.item = {};
					$scope.item.tanggal = new Date();

					$scope.dataPemanasanGenset.read();
					$scope.dataPemanasanGenset.sync();
				});

			}

			$scope.hapus = function (selectedData) {
				console.log(selectedData);
				PemakaiandanPemanasanMesinService.deletePemakaian("pemakaian-mesin/delete-pemakaian-mesin?noRec=" + selectedData.noRec).then(function (dat) {
					init();
				});
			}

			$scope.cari = function () {
				var awal = DateHelper.getPeriodeFormatted($scope.item.periodeAwal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);

				if (awal !== undefined || akhir !== undefined) {
					var url = "tanggalAwal=" + awal + "&tanggalAhir=" + akhir;
				} else {
					var url = "tanggalAwal=&tanggalAhir=";
				}
				PemakaiandanPemanasanMesinService.findAllPemakaianMesin("ipsrs-pemakaian-mesin/pemakaian-mesin-genset?" + url).then(function (dat) {
					$scope.dataPemanasanGenset = dat.data.data;
					// //debugger;

					var i = 1;
					$scope.dataPemanasanGenset.forEach(function (data) {
						var date1 = new Date(data.pemakaianAwal);
						data.pemakaianAwal = DateHelper.getTanggalFormatted(date1);

						var date2 = new Date(data.pemakaianAhir);
						data.pemakaianAhir = DateHelper.getTanggalFormatted(date2);

						data.no = i;
						i++;
					})
					// //debugger;
				});
			}


            $scope.hapusDataPemakaianGenset = function (e) {

				e.preventDefault();

				var grid = this;
				var row = $(e.currentTarget).closest("tr");

				$scope.tempDataPemanasanGenset = $scope.dataPemanasanGenset
					.filter(function (el) {
						return el.name !== grid._data[0].name;
					});
				grid.removeRow(row);

			};


		}
	]);
});