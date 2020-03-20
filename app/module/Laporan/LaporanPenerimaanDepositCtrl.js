define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('LaporanPenerimaanDepositCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ManageTataRekening',
		function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, manageTataRekening) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal = new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.item.tanggalPulang = new Date();
			$scope.dataPasienSelected = {};
			$scope.isRouteLoading = false;

			loadCombo();

			function loadCombo() {
				var chacePeriode = cacheHelper.get('DaftarDepositPasienCtrl');
				if (chacePeriode != undefined) {

					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);
					$scope.item.tglpulang = new Date(arrPeriode[2]);
				} else {
					$scope.item.periodeAwal = $scope.now;
					$scope.item.periodeAkhir = $scope.now;
					$scope.item.tglpulang = $scope.now;
				}
				manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function (data) {
					$scope.listDepartemen = data.data.departemen;
					$scope.listKelompokPasien = data.data.kelompokpasien;
					$scope.listDokter = data.data.dokter;
					$scope.listDokter2 = data.data.dokter;
				})

			}
			$scope.getIsiComboRuangan = function () {
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}

			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}

			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.SearchData = function () {
				loadData()
			}
			function loadData() {
				$scope.isRouteLoading = true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var reg = ""
				if ($scope.item.noReg != undefined) {
					var reg = "&noreg=" + $scope.item.noReg
				}
				var rm = ""
				if ($scope.item.noRm != undefined) {
					var reg = "&norm=" + $scope.item.noRm
				}
				var nm = ""
				if ($scope.item.nama != undefined) {
					var nm = "&nama=" + $scope.item.nama
				}
				var ins = ""
				if ($scope.item.instalasi != undefined) {
					var ins = "&deptId=" + $scope.item.instalasi.id
				}
				var rg = ""
				if ($scope.item.ruangan != undefined) {
					var rg = "&ruangId=" + $scope.item.ruangan.id
				}
				var kp = ""
				if ($scope.item.kelompokpasien != undefined) {
					var kp = "&kelId=" + $scope.item.kelompokpasien.id
				}
				var dk = ""
				if ($scope.item.dokter != undefined) {
					var dk = "&dokId=" + $scope.item.dokter.id
				}


				$q.all([
					manageTataRekening.getDataTableTransaksi("deposit/get-penerimaan-deposit?" +
						"tglAwal=" + tglAwal +
						"&tglAkhir=" + tglAkhir +
						reg + rm + nm + ins + rg + kp + dk),
				]).then(function (data) {
					$scope.isRouteLoading = false;
					let result = data[0].data.daftar
					let totalAll = 0
					for (let index = 0; index < result.length; index++) {
						totalAll = parseFloat(result[index].totaldeposit) + totalAll;
						result[index].totaldeposit = parseFloat(result[index].totaldeposit);

					}
					$scope.totalAll = totalAll
					$scope.dataDaftarPasienPulang = {
						data: result,
						_data: result,
						selectable: true,
						refresh: true,
						total: result.length,
						serverPaging: false,
						pageSize: 10,
						aggregate: [
							{ field: 'totaldeposit', aggregate: 'sum' },
						]
					}

					var chacePeriode = tglAwal + "~" + tglAkhir;
					cacheHelper.set('DaftarRegistrasiPasienCtrl', chacePeriode);
				});

			};
			$scope.columnDaftarPasienPulang = {
				columns: [
					{
						"field": "tglregistrasi",
						"title": "Tgl Registrasi",
						"width": "80px",
						"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
					},
					{
						"field": "noregistrasi",
						"title": "NoReg",
						"width": "80px"
					},
					{
						"field": "nocm",
						"title": "NoRM",
						"width": "80px",
						"template": "<span class='style-center'>#: nocm #</span>"
					},
					{
						"field": "namapasien",
						"title": "Nama Pasien",
						"width": "150px",
						"template": "<span class='style-left'>#: namapasien #</span>"
					},
					{
						"field": "namaruangan",
						"title": "Nama Ruangan",
						"width": "150px",
						"template": "<span class='style-left'>#: namaruangan #</span>"
					},
					{
						"field": "namadokter",
						"title": "Nama Dokter",
						"width": "130px",
						"template": "<span class='style-left'>#: namadokter #</span>"
					},
					{
						"field": "kelompokpasien",
						"title": "Kelompok Pasien",
						"width": "100px",
						"template": "<span class='style-left'>#: kelompokpasien #</span>"
					},
					{
						"field": "tglpulang",
						"title": "Tgl Pulang",
						"width": "80px",
						"template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
					},
	
					{
						"field": "nostruk",
						"title": "NoStrukVerif",
						"width": "100px",
						"template": "<span class='style-center'>#: nostruk #</span>",
						footerTemplate: "<span class='style-center'>Total</span>",
					},
					{
						"field": "hari",
						"title": "Hari Rawat",
						"width": "50px",
						"template": "<span class='style-left'>#: hari #</span>"
					},
					// {
					// 	"field": "nosbm",
					// 	"title": "NoSBM",
					// 	"width": "100px",
					// 	"template": "<span class='style-center'>#: nosbm #</span>",
					// 	footerTemplate: "<span class='style-center'>Total</span>",
					// },
					{
						"field": "totaldeposit",
						"title": "Total Deposit",
						"width": "130px",
						"template": "<span class='style-center'>{{formatRupiah('#: totaldeposit #', 'Rp.')}}</span>",
						aggregates: ["sum"],
						footerTemplate: "<span >Rp. {{formatRupiah('#: totaldeposit.sum #', '')}}</span>"
					}
				],
				sortable: {
					mode: "single",
					allowUnsort: false,
				},
				pageable: {
					messages: {
						display: "Menampilkan {0} - {1} data dari {2} data"
					},
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				}
			}
			$scope.data2 = function (dataItem) {
				for (var i = 0; i < dataItem.details.length; i++) {
					dataItem.details[i].no = i + 1

				}
				return {
					dataSource: new kendo.data.DataSource({
						data: dataItem.details,

					}),
					columns: [
						{
							"field": "no",
							"title": "No",
							"width": "5px",
						},
						{
							"field": "tglpelayanan",
							"title": "Tgl Deposit",
							"width": "50px",
							"template": "<span class='style-center'>{{formatTanggal('#: tglpelayanan #')}}</span>"
						},

						{
							"field": "hargasatuan",
							"title": "Deposit",
							"width": "50px",
							"template": "<span class='style-center'>{{formatRupiah('#: hargasatuan #', 'Rp.')}}</span>"
						}

					]
				}
			};

			$scope.pegawai = JSON.parse(window.localStorage.getItem('pegawai'));

			$scope.cetak = function () {
				var ruanganId = ''
				if ($scope.item.ruangan != undefined) {
					ruanganId = $scope.item.ruangan.id
				}
				var kelompokPasien = ''
				if ($scope.item.kelompokpasien != undefined) {
					kelompokPasien = $scope.item.kelompokpasien.id
				}
				var namaPasien = ''
				if ($scope.item.nama != undefined) {
					namaPasien = $scope.item.nama
				}
				var noReg = ''
				if ($scope.item.noReg != undefined) {
					noReg = $scope.item.noReg
				}
				var noMr = ''
				if ($scope.item.noRm != undefined) {
					noMr = $scope.item.noRm
				}
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');
				var client = new HttpClient();
				client.get('http://127.0.0.1:1237/printvb/kasir?cetak-penerimaan-deposit-pasienpulang=' + tglAwal + '&tglAkhir=' + tglAkhir
					+ '&idRuangan=' + ruanganId + '&idKelompok=' + kelompokPasien
					+ '&noReg=' + noReg + '&noRm=' + noMr
					+ '&namaPasien=' + namaPasien
					+ '&namaLogin=' + $scope.pegawai.namaLengkap + '&view=true', function (response) {

					});
			}
			var HttpClient = function () {
				this.get = function (aUrl, aCallback) {
					var anHttpRequest = new XMLHttpRequest();
					anHttpRequest.onreadystatechange = function () {
						if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
							aCallback(anHttpRequest.responseText);
					}

					anHttpRequest.open("GET", aUrl, true);
					anHttpRequest.send(null);
				}
			}
		}
	]);
});