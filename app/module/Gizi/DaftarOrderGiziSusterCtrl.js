define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarOrderGiziSusterCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ManageServicePhp',
		function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, manageServicePhp) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal = new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.item.tanggalPulang = new Date();
			// $scope.dataPasienSelected = {};

			$scope.isRouteLoading = false;
			var dataMenuSiklus = [];
			var data2 = [];
			var addDataDetail = [];

			loadCombo();
			loadData();

			function loadCombo() {
				var chacePeriode = cacheHelper.get('cacheDaftarOrderGizi');
				if (chacePeriode != undefined) {

					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);
					$scope.item.tglpulang = new Date(arrPeriode[2]);
				} else {
					$scope.item.periodeAwal = dateHelper.setJamAwal(new Date());
					$scope.item.periodeAkhir = $scope.now;
					$scope.item.tglpulang = $scope.now;
				}
				manageServicePhp.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function (data) {
					$scope.listDepartemen = data.data.departemen;
					$scope.listKelompokPasien = data.data.kelompokpasien;
					$scope.listDokter = data.data.dokter;
					$scope.listDokter2 = data.data.dokter;
				})
				manageServicePhp.getDataTableTransaksi("gizi/get-combo", false).then(function (data) {
					$scope.listKelas = data.data.kelas;
					$scope.listJenisDiet = data.data.jenisdiet;
					$scope.listKategoriDiet = data.data.kategorydiet;
					$scope.listJenisWaktu = data.data.jeniswaktu;
					$scope.listMenu = data.data.produk;
				})
				// $scope.listStatus = manageKasir.getStatus();
			}
			$scope.getIsiComboRuangan = function () {
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}
			$scope.ClearSearch = function () {
				$scope.item = {};
				$scope.item.periodeAwal = $scope.now;
				$scope.item.periodeAkhir = $scope.now;

				$scope.SearchData();
			}

			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}
			$scope.formatTanggalNoTime = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY');
			}

			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.SearchData = function () {
				loadData()
			}
			function loadData() {
				dataMenuSiklus = [];
				$scope.isRouteLoading = true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var reg = ""
				if ($scope.item.noReg != undefined) {
					var reg = "&noreg=" + $scope.item.noReg
				}
				var rm = ""
				if ($scope.item.noRm != undefined) {
					var rm = "&norm=" + $scope.item.noRm
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
				var noorder = ""
				if ($scope.item.noOrder != undefined) {
					noorder = "&noorder=" + $scope.item.noOrder
				}
				var jenisDietId = ""
				if ($scope.item.jenisDiets != undefined) {
					jenisDietId = "&jenisDietId=" + $scope.item.jenisDiets.id
				}
				var jenisWaktuId = ""
				if ($scope.item.jenisWaktu != undefined) {
					jenisWaktuId = "&jenisWaktuId=" + $scope.item.jenisWaktu.id
				}



				manageServicePhp.getDataTableTransaksi("gizi/get-daftar-order-gizi2?" +
					"tglAwal=" + tglAwal +
					"&tglAkhir=" + tglAkhir +
					reg + rm + nm + ins + rg + kp + dk + noorder
					+ jenisDietId + jenisWaktuId)
					.then(function (data) {
						$scope.isRouteLoading = false;
						var result = data.data.data
						for (var i = 0; i < result.length; i++) {
							result[i].no = i + 1

						}
						$scope.sourceGrid = new kendo.data.DataSource({
							data: result,
							pageSize: 10,
							total: result.length,
							serverPaging: true,


						});

						var chacePeriode = tglAwal + "~" + tglAkhir;
						cacheHelper.set('cacheDaftarOrderGizi', chacePeriode);
					});

			};

			$scope.columnGrid = [

				{
					"field": "no",
					"title": "No",
					"width": "20px",
				},
				{
					"field": "tglorder",
					"title": "Tgl Order",
					"width": "80px",
					"template": "<span class='style-left'>{{formatTanggal('#: tglorder #')}}</span>"
				},
				{
					"field": "noorder",
					"title": "No Order",
					"width": "100px"
				},

				{
					"field": "jenisdiet",
					"title": "Jenis Diet",
					"width": "100px"
				},

				{
					"field": "kategorydiet",
					"title": "Kategory Diet",
					"width": "100px"
				},

				{
					"field": "jeniswaktu",
					"title": "Jenis Waktu",
					"width": "100px"
				},
				{
					"field": "pegawaiorder",
					"title": "Pengorder",
					"width": "100px",
					"template": "<span class='style-left'>#: pegawaiorder #</span>"
				},

				{
					"field": "ruangantujuan",
					"title": "Ruangan Tujuan",
					"width": "100px"
				},

			];
			$scope.data2 = function (dataItem) {
				for (var i = 0; i < dataItem.details.length; i++) {
					dataItem.details[i].no = i + 1

				}
				return {
					dataSource: new kendo.data.DataSource({
						data: dataItem.details,

					}),

					selectable: true,
					columns: [
						{
							"field": "tglmenu",
							"title": "Tgl Menu",
							"width": "50px",
							"template": "<span class='style-center'>{{formatTanggalNoTime('#: tglmenu #')}}</span>"
						},
						{
							"field": "noregistrasi",
							"title": "No Reg",
							"width": "60px",
						},
						{
							"field": "nocm",
							"title": "No RM",
							"width": "50px",
						},
						{
							"field": "namapasien",
							"title": "Nama Pasien",
							"width": "100px",
						},
						{
							"field": "ruanganasal",
							"title": "Ruangan Asal",
							"width": "80px",
						},
						{
							"field": "namakelas",
							"title": "Kelas",
							"width": "50px",
						},
						{
							"field": "nokirim",
							"title": "No Kirim",
							"width": "80px",
							"template": '# if( nokirim==null) {# - # } else {# #= nokirim # #} #'
						},

						{
							"command": [{
								text: "Hapus",
								click: hapusOrder,
								imageClass: "k-icon k-delete"
							}
								// ,{
								// 	text: "Edit", 
								// 	click: editOrder, 
								// 	imageClass: "k-icon k-i-pencil"
								// }
							],
							title: "",
							width: "50px",
						}


					]
				}
			};
			function hapusOrder(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (!dataItem) {
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				if (dataItem.nokirim != null) {
					toastr.error("Menu sudah dikirim tidak bisa dihapus");
					return;
				}
				var confirm = $mdDialog.confirm()
					.title('Peringatan')
					.textContent('Apakah anda yakin mau menghapus data ? ')
					.ariaLabel('Lucky day')
					.cancel('Tidak')
					.ok('Ya')
				$mdDialog.show(confirm).then(function () {

					var itemDelete = {
						"norec_op": dataItem.norec_op
					}
					manageServicePhp.deleteOrderPelayananGizi(itemDelete).then(function (e) {
						if (e.status === 201) {
							loadData();

						}
					})

				})

			}

			$scope.klikGrid = function (dataPasienSelected) {
				$scope.dataPasienSelected = dataPasienSelected
			}
			$scope.Edit = function () {
				if (!$scope.dataPasienSelected) {
					toastr.error('Pilih data dulu')
					return
				}
				for (var i = 0; i < $scope.dataPasienSelected.details.length; i++) {
					if ($scope.dataPasienSelected.details[i].nokirim !== null) {
						var status = true
						break
					}
				}

				if (status) {
					toastr.error('Menu sudah dikirim, tidak bisa diedit')
					return
				}
				var cache = $scope.dataPasienSelected
				cacheHelper.set('cacheEditOrderGizi', cache);
				$state.go('EditOrderGizi')

			}
			/*END */


		}
	]);
});