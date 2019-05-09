define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PemakaianRuanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'IPSRSService', 'ManageIPSRS', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, IPSRSService, ManageIPSRS, $state) {
			ModelItem.get("IPSRS/PemakaianRuangan").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.showMeter = false;
				$scope.showKg = true;
				$scope.disAwal = false;
				$scope.disAkhir = false;
				$scope.showJenisGas = true;
				ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-ruangan/get-jenis-pemakaian", true).then(function (dat) {
					$scope.listJenisPemakaian = dat.data.data.jenisPemakaian;

				});
				ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-ruangan/get-ruangan-pemakaian", true).then(function (dat) {
					$scope.listRuangan = dat.data.data.listRuangan;

				});

				$scope.$watch('item.jenisPemakaian', function () {
					$scope.label();
				});


				$scope.$watch('item.biayaPerBulan', function () {

					$scope.ArrayCurency = parseInt($scope.item.biayaPerBulan);
				});

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


				$scope.addPemakaianRuangan = function () {
					var tanggal = DateHelper.getTanggalFormatted($scope.item.periode);
					var tempPemakaianRuangan = {
						jenisPemakaian: $scope.item.jenisPemakaian.namaJenisPemakaian,
						periode: tanggal,
						ruangan: $scope.item.ruangan.namaRuangan,
						jumlahMeterAwal: $scope.item.jumlahMeterAwal,
						jumlahMeterAkhir: $scope.item.jumlahMeterAkhir,
						jumlahPemakaian: $scope.item.jumlahPemakaian,
						satuan: $scope.item.satuan.namaSatuan,
						biayaPerBulan: $scope.item.biayaPerBulan
					}
					$scope.dataPemakaianRuangan.add(tempPemakaianRuangan);
					$scope.item = {};
				};

				$scope.removePemakaianRuangan = function (e) {
					e.preventDefault();
					var grid = this;
					var row = $(e.currentTarget).closest("tr");
					grid.removeRow(row);
				};

				$scope.total = function () {
					var awal = parseInt($scope.item.jumlahMeterAwal);
					var akhir = parseInt($scope.item.jumlahMeterAkhir);
					$scope.item.jumlahPemakaian = akhir - awal;
				};
				var init = function () {
					ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-ruangan/get-all-pemakaian-ruangan", true).then(function (dat) {
						$scope.dataPemakaianRuangan = dat.data.data.listPemakaianRuangan;
					});
				};
				init();
				$scope.item.showMeter = true;
				$scope.item.showKg = false;

				$scope.label = function () {
					if ($scope.item.jenisPemakaian.jenisPemakaian == "Gas LPG") {
						$scope.showMeter = true;
						$scope.showKg = false;
						$scope.disAwal = false;
						$scope.disAkhir = false;
						$scope.showJenisGas = true;
						$scope.hideTelepon = false;
						$scope.hideTelepon = false;
					} else if ($scope.item.jenisPemakaian.jenisPemakaian == "Telepon") {
						$scope.showMeter = true;
						$scope.showKg = true;
						$scope.hideTelepon = true;
						$scope.showMeter = true;
						$scope.showKg = true;
						$scope.hideTelepon = true;
						$scope.disAwal = true;
						$scope.disAkhir = true;
						$scope.showJenisGas = true;
					} else if ($scope.item.jenisPemakaian.jenisPemakaian == "Gas Medis") {
						$scope.showMeter = false;
						$scope.showKg = true;
						$scope.disAwal = false;
						$scope.disAkhir = false;
						$scope.showJenisGas = false;
						$scope.hideTelepon = false;
						$scope.hideTelepon = false;
					} else {
						$scope.showMeter = false;
						$scope.showKg = true;
						$scope.disAwal = false;
						$scope.disAkhir = false;
						$scope.showJenisGas = true;
						$scope.hideTelepon = false;
						$scope.hideTelepon = false;
					}

					var jenisPemakaianId = $scope.item.jenisPemakaian.id;
					if (jenisPemakaianId != undefined) {
						ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-ruangan/get-kapasitas-jenis-pemakaian?id=" + jenisPemakaianId, true).then(function (dat) {
							$scope.listSatuan = dat.data.data.kapasitasJenisPemakaian;
							$scope.item.satuan = {
								jenisPemakaian: $scope.listSatuan[0].jenisPemakaian,
								satuan: $scope.listSatuan[0].satuan
							}
						});
					}
				}

				$scope.duit = function (value, currency) {
					return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
				};

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
						width: 150
					},

					{
						field: "jumlahMeterAhir",
						title: "Jml Pemakaian Awal",
						width: 120,
						filterable: false
					},
					{
						field: "jumlahMeterAwal",
						title: "Jml Pemakaian Akhir",
						width: 120,
						filterable: false
					},
					{
						field: "jumlahPemakaian",
						title: "Jumlah Pemakaian",
						width: 120,
						filterable: false
					},
					{
						field: "satuan",
						title: "Satuan",
						width: 100,
						filterable: false
					},
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

				$scope.kl = function (current) {

					//Variabel Idnya aja yang mirip satuan, tapi isinya untuk Jenis Pemakaian  
					$scope.current = current;
					$scope.NoRecInduk = current.noRec;
					$scope.item.jenisPemakaian = {
						id: current.idSatuan,
						jenisPemakaian: current.jenisPemakaian
					};
					$scope.item.satuan = {
						jenisPemakaian: current.jenisPemakaianId,
						satuan: current.satuan
					}
					$scope.item.ruangan = {
						id: current.idRuangan,
						namaRuangan: current.namaRuangan
					}
					$scope.item.periode = current.periode;
					$scope.item.jumlahMeterAwal = current.jumlahMeterAwal;
					$scope.item.jumlahMeterAkhir = current.jumlahMeterAhir;
					$scope.item.jumlahPemakaian = current.jumlahPemakaian;
					$scope.item.biayaPerBulan = current.biayaPerBulan;
					// $scope.item.jenisGasMedis =""


					$scope.hapus = function () {
						ManageIPSRS.getItemIPSRS("ipsrs-pemakaian-ruangan/delete-pemakaian-ruangan?noRec=" + current.noRec, true).then(function (dat) {
							init();
						});
						$scope.item.jenisPemakaian = "";
						$scope.item.satuan = "";
						$scope.item.ruangan = "";
						$scope.item.periode = "";
						$scope.item.jumlahMeterAwal = "";
						$scope.item.jumlahMeterAkhir = "";
						$scope.item.jumlahPemakaian = "";
						$scope.item.biayaPerBulan = "";
					};
				};

				$scope.baru = function () {
					$scope.item.jenisPemakaian = "";
					$scope.item.satuan = "";
					$scope.item.ruangan = "";
					$scope.item.periode = "";
					$scope.item.jumlahMeterAwal = "";
					$scope.item.jumlahMeterAkhir = "";
					$scope.item.jumlahPemakaian = "";
					$scope.item.biayaPerBulan = "";
					$scope.NoRecInduk = undefined;
				}

				$scope.simpan = function () {
					var data = {
						"biayaPerBulan": parseInt($scope.item.biayaPerBulan),
						"ipsrsKapasitasJenisPemakaian": {
							"id": $scope.item.jenisPemakaian.id
						},
						"noRec": $scope.NoRecInduk,
						"periode": $scope.item.periode,
						"ruangan": {
							"id": $scope.item.ruangan.id
						},
						"jumlahPemakaian": $scope.item.jumlahPemakaian,
						"jumlahMeterAhir": parseInt($scope.item.jumlahMeterAwal),
						"jumlahMeterAwal": parseInt($scope.item.jumlahMeterAkhir)
					}
					ManageIPSRS.saveDataSarPras(data, "ipsrs-pemakaian-ruangan/save-pemakaian-ruangan").then(function (e) {
						console.log(JSON.stringify(e.data));
						init();
					});
				};


			}, function errorCallBack(err) { });
		}
	]);
});
