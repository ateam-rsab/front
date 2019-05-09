define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPemakaianRuanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIPSRS',  'DateHelper', '$state',
		function ($rootScope, $scope, ModelItem, IPSRSService, ManageIPSRS, DateHelper, $state) {
			ModelItem.get("IPSRS/DaftarPemakaianRuangan").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				var init = function () {
					ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-ruangan/get-all-pemakaian-ruangan", true).then(function (dat) {
						$scope.dataPemakaianRuangan = dat.data.data.listPemakaianRuangan;
						//debugger;
					});
				};
				init();
				ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-ruangan/get-jenis-pemakaian", true).then(function (dat) {
					$scope.listJenisPemakaian = dat.data.data.jenisPemakaian;
					//debugger;
				});

				$scope.tutup = function () {
					$state.go("home");
				}

				$scope.cari = function () {
					if ($scope.item.periodeAwal == undefined && $scope.item.periodeAkhir == undefined) {
						init();
					} else {
						var awal = DateHelper.getTanggalFormattedNew($scope.item.periodeAwal);
						var akhir = DateHelper.getTanggalFormattedNew($scope.item.periodeAkhir);
						var idJenisPemakaian = $scope.item.jenisPemakaian.id;
						// debugger;
						ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-ruangan/find-by-periode?id=" + idJenisPemakaian + "&&periodeAwal=" + awal + "&&periodeAkhir=" + akhir, true).then(function (dat) {
							$scope.dataPemakaianRuangan = dat.data.data.ipsrsPemakaianRuangan;
							//debugger;
						});
					}
				}

				$scope.duit = function (value, currency) {
					return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
				};

				$scope.mainGridOptions = {
					pageable: true,
					filterable: {
						extra: false,
						operators: {
							string: {
								startsWith: "Pencarian"
							}
						}
					},
					sortable: true,
					//toolbar: ["excel"],
					//    excel: {
					//        fileName: "DashboardPerbaikan.xlsx",
					//        filterable: false
					// },
					// dataBound: onDataBound,
				}



				$scope.columnPemakaianRuangan = [
					{
						field: "jenisPemakaian",
						title: "Jenis Pemakaian",
						width: 120
					},
					{
						field: "periode",
						title: "Periode",
						width: 100,
						filterable: false
					},
					{
						field: "namaRuangan",
						title: "Ruangan",
						width: 150,

					},
					{
						field: "jumlahMeterAwal",
						title: "Jml Meter Awal",
						width: 100,
						filterable: false
					},
					{
						field: "jumlahMeterAhir",
						title: "Jml Meter Akhir",
						width: 100,
						filterable: false
					},
					{
						field: "jumlahPemakaian",
						title: "Jumlah Pemakaian",
						width: 100,
						filterable: false
					},
					{
						field: "satuan",
						title: "Satuan",
						width: 100,
						filterable: false
					},
					// {
					// 	field: "biayaPerBulan",
					// 	title: "Biaya/Bulan",
					// 	width: 100
					// }
					{
						field: "biayaPerBulan",
						title: "Biaya/Bulan",
						"template": "<span class='style-right'>{{duit('#: biayaPerBulan #', 'Rp.')}}</span>",
						width: 100,
						filterable: false,
						attributes: {
							style: "text-align: left"
						}
					}

				];

			}, function errorCallBack(err) { });
		}
	]);
});