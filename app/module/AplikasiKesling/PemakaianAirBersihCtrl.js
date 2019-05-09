define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemakaianAirBersihCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'PemakaianAirBersihService',
		function ($rootScope, $scope, ModelItem, DateHelper, PemakaianAirBersihService) {
			ModelItem.get("Kesling/PemakaianAirBersih").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.item.bulan = new Date();
				$scope.item.periodeAwal = new Date();
				$scope.item.periodeAkhir = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });


			$scope.totalPemakaian = function () {

				$scope.item.pemakaian = $scope.item.standMeterAkhir - $scope.item.standMeterLalu;

			};


			$scope.$watch("item.standMeterAkhir", function () {
				$scope.item.pemakaian = $scope.item.standMeterAkhir - $scope.item.standMeterLalu;
			});

			$scope.$watch("item.standMeterLalu", function () {
				$scope.item.pemakaian = $scope.item.standMeterAkhir - $scope.item.standMeterLalu;
			});

			// ModelItem.getDataDummyGeneric("Ruangan", true).then(function (data) {
			// 	$scope.listRuangan = data;
			// })
			$scope.dataPemakaianAirBersih = new kendo.data.DataSource({
				data: []
			});
			$scope.columnPemakaianAirBersih = [
				{
					"field": "bulan",
					"title": "Bulan",
					"width": "10%"
				},
				{
					"field": "ruangan.namaRuangan",
					"title": "Nama/Ruangan",
					"width": "13%"
				},
				{
					"field": "standMeterAkhir",
					"title": "Stand Meter (Akhir)",
					"width": "15%"
				},
				{
					"field": "standMeterLalu",
					"title": "Stand Meter (Lalu)",
					"width": "15%"
				},
				{
					"field": "pemakaian",
					"title": "Pemakaian",
					"width": "10%"
				},
				{
					"field": "keterangan",
					"title": "Keterangan",
					"width": "10%"
				}
			];
			$scope.tambah = function () {

				// //debugger;
				var bulanBaru = DateHelper.getBulanFormatted($scope.item.bulan);

				var tempDataPemakaianAirBersih = {
					"bulan": bulanBaru,
					"namaRuangan": $scope.item.namaRuangan.namaRuangan,
					"standMeterAkhir": $scope.item.standMeterAkhir,
					"standMeterLalu": $scope.item.standMeterLalu,
					"pemakaian": $scope.item.pemakaian,
					"keterangan": $scope.item.keterangan



				}
				$scope.dataPemakaianAirBersih.add(tempDataPemakaianAirBersih);


            };
            $scope.removeDataPemakaianAirBersih = function () {

				e.preventDefault();

                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                $scope.tempDataPemakaianAirBersih = $scope.dataPemakaianAirBersih
                    .filter(function (el) {
                        return el.bulan !== grid._data[0].bulan;
                    });

                grid.removeRow(row);

            };
			$scope.monthSelectorOptions = {
				start: "year",
				depth: "year"
			};
			$scope.getType = function (x) {
				return typeof x;
			};
			$scope.isDate = function (x) {
				return x instanceof Date;
			};

			PemakaianAirBersihService.getListRuangan("Ruangan&select=id,namaRuangan").then(function (dat) {
				$scope.listRuangan = dat.data;
			});

			var init = function () {
				PemakaianAirBersihService.findAllPemakaianAirBersih("pemakaian-air-bersih/find-all-pemakaian-air-bersih/").then(function success(dat) {
					$scope.dataPemakaianAirBersih = dat.data.data.pemakaianAirBersih;
					$scope.dataPemakaianAirBersih.forEach(function (data) {
						// var date = new Date(data.bulan);
						// console.log(data.bulan)
						if (data.bulan == undefined)
							data.bulan = "";
						else
							data.bulan = DateHelper.getBulanFormatted(new Date(data.bulan));
					})

					// console.log(JSON.stringify($scope.dataPemakaianAirBersih))
				}, function error(error) {
					console.log(error);
				});
			}
			init();

			$scope.save = function () {
				//debugger;
				var data = {
					"ruangan": {
						"id": $scope.item.namaRuangan.id
					},
					"bulan": $scope.item.bulan.getTime(),
					"standMeterAkhir": $scope.item.standMeterAkhir,
					"standMeterLalu": $scope.item.standMeterLalu,
					"keterangan": $scope.item.keterangan
				}
				// console.log(JSON.stringify(data));
				PemakaianAirBersihService.savePemakaianAirBersih(ModelItem.beforePost(data), "pemakaian-air-bersih/save-pemakaian-air-bersih/").then(function (dat) {
					init();
					$scope.item.namaRuangan = "";
					$scope.item.bulan = "";
					$scope.item.standMeterAkhir = "";
					$scope.item.standMeterLalu = "";
					$scope.item.pemakaian = "";
					$scope.item.keterangan = "";
				});
			}

			

			$scope.hapus = function (selectedData) {
				// console.log(selectedData.noRec);
				PemakaianAirBersihService.deletePemakaianAirBersih("pemakaian-air-bersih/delete-pemakaian-air-bersih?noRec=" + selectedData.noRec).then(function (dat) {
					init();
				});
			}

			$scope.cari = function () {
				var awal = DateHelper.getPeriodeFormatted($scope.item.periodeAwal);
				var akhir = DateHelper.getPeriodeFormatted($scope.item.periodeAkhir);
				var url = "periodeAwal=" + awal + "&periodeAkhir=" + akhir;
				PemakaianAirBersihService.findPeriode("pemakaian-air-bersih/find-by-periode/?" + url).then(function (dat) {
					$scope.dataPemakaianAirBersih = dat.data.data.pemakaianAirBersih;
					// //debugger;
					for (var i = $scope.dataPemakaianAirBersih.length - 1; i >= 0; i--) {
						var date = new Date($scope.dataPemakaianAirBersih[i].bulan);
						$scope.dataPemakaianAirBersih[i].bulan = DateHelper.getBulanFormatted(date)
					}
					// //debugger;
				});
			}
		}

	]);
});