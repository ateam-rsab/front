define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RespondPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIPSRS', 'DateHelper', '$state', '$location', 'socket', '$window', '$mdDialog',
		function ($rootScope, $scope, ModelItem, IPSRSService, ManageIPSRS, DateHelper, $state, $location, socket, $window, $mdDialog) {
			$scope.item = {};
			$scope.isRouteLoading = true;
			$scope.isAdmin = true;
			$scope.dataLogin = JSON.parse(localStorage.getItem("pegawai"));
			$scope.now = new Date();
			$scope.item.tglAwal = new Date();
			$scope.item.tglAkhir = new Date();
			$scope.item.tglAwal = DateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD");
			$scope.item.tglAkhir = DateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD");

			$scope.getDataPermintaan = () => {
				$scope.isRouteLoading = true;
				let urlByRuangan = "ip3rs/get-data-permintaan-perbaikan-by-ruangan?";
				let urlAll = "ip3rs/get-data-permintaan-perbaikan?";
				let url = $scope.dataLogin.ruangan.id === 276 ? urlAll : urlByRuangan;
				$scope.item.tglAwal = DateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD");
				$scope.item.tglAkhir = DateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD");
				ManageIPSRS.getItemIPSRS(url + "noorder=" + ($scope.item.noOrder ? $scope.item.noOrder : "") + "&tglawal=" + ($scope.item.tglAwal ? $scope.item.tglAwal : "") + "&tglakhir=" + ($scope.item.tglAkhir ? $scope.item.tglAkhir : "")).then(res => {
					$scope.isRouteLoading = false;
					$scope.dataSource = new kendo.data.DataSource({
						data: res.data,
						pageSize: 5
					})
				})
			}

			$scope.init = () => {
				$scope.getDataPermintaan();
				$scope.isAdmin = $scope.dataLogin.ruangan.id === 276;
				$scope.dataJenisOrder = [{
					"id": 1,
					"name": "Jadwal Pemeliharaan"
				}, {
					"id": 2,
					"name": "Permintaan Perbaikan"
				}, {
					"id": 3,
					"name": "Jadwal Kalibrasi"
				}, {
					"id": 4,
					"name": "Jadwal Kontrak Service"
				}];

				$scope.mainGridOptions = {
					pageable: true,
					filterable: {
						extra: false,
						operators: {
							string: {
								startsWith: "Pencarian"
								// eq: "Is equal to",
								// neq: "Is not equal to"
							}
						}
					},
					columns: [{
							field: "noOrder",
							title: "<h3 align=center>No Order<h3>"
						},
						{
							field: "tglPesan",
							template: "#= new moment(new Date(tglPesan)).format('DD-MM-YYYY') #",
							title: "<h3 align=center>Tanggal Order<h3>",
							filterable: false
						},
						{
							field: "ruangPemesan",
							title: "<h3 align=center>Ruangan Asal<h3>"
						},
						{
							field: "namaPelapor",
							title: "<h3 align=center>User Pelapor<h3>"
						},
						{
							// field: "noRespon",
							title: "<h3 align=center>Status Respon<h3>"
						},
						{
							// field: "noVerifikasi",
							title: "<h3 align=center>Status Verifikasi<h3>"
						},
						{
							field: "keluhan",
							title: "<h3 align=center>Keterangan<h3>"
						},
						// {
						// 	field: "asalSukuCadang",
						// 	title: "<h3 align=center>Asal Suku Cadang<h3>"
						// },
						// {
						// 	field: "keteranganOrder",
						// 	title: "<h3 align=center>Keterangan Order<h3>",
						// 	filterable: false
						// },
						// {
						// 	field: "namaTeknisi",
						// 	title: "<h3 align=center>Nama Teknisi<h3>"
						// },
						// {
						// 	field: "jenisProduk",
						// 	title: "<h3 align=center>Kategori Perbaikan<h3>"
						// }
					],
					editable: false
				};

				$scope.getDataPermintaan();
			}
			$scope.init();

			$scope.responPermintaan = () => {
				$scope.isRouteLoading = true;
				console.log($scope.gridModel);
				let data = {
					objectIpsrsPerbaikan: $scope.gridModel.norec,
					ketStatusRespon: "Respon",
					statusPengerjaan: 0,
					statusRespon: 1
				}

				ManageIPSRS.saveDataSarPras(data, "ip3rs/simpan-respon-perbaikan").then(function (e) {
					$scope.getDataPermintaan();
				});
			}

			$scope.permintaanSukuCadang = function () {
				//$scope.item.asalSukuCadang === null || 
				if ($scope.item.asalSukuCadang === undefined) {
					window.messageContainer.error('Silahkan Pilih Data')
				} else if ($scope.item.asalSukuCadang === null) {
					toastr.warning("Asal Suku Cadang Null")
				} else if ($scope.item.asalSukuCadang === "-" || $scope.item.asalSukuCadang === "Tidak Dengan Suku Cadang") {
					window.messageContainer.error('Perbaikan Tidak Memerlukan Suku Cadang')
				} else if ($scope.item.asalSukuCadang === "Suku Cadang") {
					$state.go('SukuCadangLogistik', {
						strukOrder: $scope.item.noRec
					})
				} else {
					$state.go('SukuCadangDariPihakLuar', {
						strukOrder: $scope.item.noRec
					})
				}
			}
		}
	]);
});

// function ($rootScope, $scope, ModelItem, IPSRSService, ManageIPSRS, DateHelper, $state, $location, socket, $window, $mdDialog) {
// 	$scope.isLoadingData = true;
// 	$scope.AllData = true;
// 	$scope.dataVOloaded = true;
// 	$scope.showUser = true;
// 	$scope.showAdmin = true;
// 	$scope.item = {};
// 	$scope.item.noOrder = "";

// 	$scope.now = new Date();
// 	var TanggalSekarang = new moment($scope.now).format('DD-MM-YYYY');
// 	$scope.item.dateStart = TanggalSekarang;
// 	$scope.item.dateEnd = TanggalSekarang;


// 	$scope.init = function () {
// 		$scope.cariData == false;
// 		$scope.isLoadingData = true;
// 		IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function (dat) {
// 			$scope.ruangan = dat.data.namaRuangan;
// 			$scope.idRuangan = dat.data.id;
// 			$scope.item.noOrder = "";
// 			$scope.item.jenisOrder = {
// 				"id": null,
// 				"name": ""
// 			};
// 			/*$scope.item.dateEnd = "";
// 			$scope.item.dateStart = "";	*/
// 			$scope.item.dateEnd = $scope.now;
// 			$scope.item.dateStart = $scope.now;
// 			if ($scope.idRuangan == 229) {
// 				$scope.showUser = false;
// 				$scope.showAdmin = true;
// 			} else {
// 				$scope.showUser = true;
// 				$scope.showAdmin = false;
// 			}
// 			if ($scope.idRuangan == 229) {

// 				var tanggalAwal = DateHelper.getTanggalFormattedNew($scope.item.dateStart);
// 				var tanggalAkhir = DateHelper.getTanggalFormattedNew($scope.item.dateEnd);
// 				//service Old
// 				// IPSRSService.getItem("psrsPermintaanPerbaikan/get-informasi-perbaikan-masuk/", true).then(function(dat){
// 				//IPSRSService.getItem("psrsPermintaanPerbaikan/get-lap-permintaan-perbaikan", true).then(function(dat){
// 				IPSRSService.getItem("psrsPermintaanPerbaikan/get-lap-permintaan-perbaikan-by-date?startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir, true).then(function (dat) {

// 					$scope.listData = dat.data.data;
// 					var datagrid = [];
// 					var i = 1;
// 					$scope.listData.forEach(function (data) {
// 						var date1 = new Date(data.tanggalOrder);
// 						data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
// 						// kalo kosong make setrip
// 						if (data.asalSukuCadang != null) {
// 							if (data.asalSukuCadang.asalSukuCadang == null) {
// 								data.asalSukuCadang.asalSukuCadang = "-";
// 							}
// 							if (data.asalSukuCadang == null) {
// 								data.asalSukuCadang = "-";
// 							}
// 							var sukdang = data.asalSukuCadang.asalSukuCadang;
// 						} else if (data.asalSukuCadang == null) {
// 							if (data.asalSukuCadang == null) {
// 								data.asalSukuCadang = "-";
// 							}
// 							var sukdang = data.asalSukuCadang;
// 						} else {
// 							var sukdang = data.asalSukuCadang;
// 						}
// 						var daftar = {
// 							"no": i,
// 							"noOrder": data.noOrder,
// 							"tglOrder": data.tglOrder,
// 							"ruanganPemesan": data.ruanganPemesan,
// 							"ruanganTujuan": data.ruanganTujuan,
// 							"userPemesan": data.userPemesan,
// 							"noRespon": data.noRespon,
// 							"noVerifikasi": data.noVerifikasi,
// 							"keteranganLainnya": data.keteranganLainnya,
// 							"asalSukuCadang": sukdang,
// 							"keteranganOrder": data.keteranganOrder,
// 							"namaTeknisi": data.namaTeknisi,
// 							"noRec": data.noRec,
// 							"noRecOrderPelayanan": data.noRecOrderPelayanan,
// 							"noRespon": data.noRespon,
// 							"keteranganOrder": data.keteranganOrder,
// 							"jenisProduk": data.jenisProduk,
// 							"idJenis": data.idJenis
// 						}
// 						datagrid[i - 1] = daftar;
// 						i++;
// 					});
// 					$scope.dataSource = new kendo.data.DataSource({
// 						pageSize: 10,
// 						// data: $scope.listData
// 						data: datagrid
// 					});
// 					$scope.isLoadingData = false;
// 					$scope.AllData = false;
// 				});
// 				$scope.mainGridOptions = {
// 					pageable: true,
// 					filterable: {
// 						extra: false,
// 						operators: {
// 							string: {
// 								startsWith: "Pencarian"
// 								// eq: "Is equal to",
// 								// neq: "Is not equal to"
// 							}
// 						}
// 					},
// 					columns: [{
// 							field: "no",
// 							title: "<h3 align=center>No<h3>",
// 							filterable: false
// 						},
// 						{
// 							field: "noOrder",
// 							title: "<h3 align=center>No Order<h3>"
// 						},
// 						{
// 							field: "tglOrder",
// 							template: "#= new moment(new Date(tglOrder)).format('DD-MM-YYYY') #",
// 							title: "<h3 align=center>Tanggal Order<h3>",
// 							filterable: false
// 						},
// 						{
// 							field: "ruanganPemesan",
// 							title: "<h3 align=center>Ruang Pemesan<h3>"
// 						},
// 						{
// 							field: "userPemesan",
// 							title: "<h3 align=center>User Pemesan<h3>"
// 						},
// 						{
// 							field: "noRespon",
// 							title: "<h3 align=center>No Respon<h3>"
// 						},
// 						{
// 							field: "noVerifikasi",
// 							title: "<h3 align=center>No Verifikasi<h3>"
// 						},
// 						{
// 							field: "keteranganLainnya",
// 							title: "<h3 align=center>Keterangan<h3>"
// 						},
// 						{
// 							field: "asalSukuCadang",
// 							title: "<h3 align=center>Asal Suku Cadang<h3>"
// 						},
// 						{
// 							field: "keteranganOrder",
// 							title: "<h3 align=center>Keterangan Order<h3>",
// 							filterable: false
// 						},
// 						{
// 							field: "namaTeknisi",
// 							title: "<h3 align=center>Nama Teknisi<h3>"
// 						},
// 						{
// 							field: "jenisProduk",
// 							title: "<h3 align=center>Kategori Perbaikan<h3>"
// 						}
// 					],
// 					editable: false
// 				};
// 			} else {

// 				//Ruangan Selain IP3RS
// 				var tanggalAwal = DateHelper.getTanggalFormattedNew($scope.item.dateStart);
// 				var tanggalAkhir = DateHelper.getTanggalFormattedNew($scope.item.dateEnd);
// 				IPSRSService.getItem("psrsPermintaanPerbaikan/get-informasi-perbaikan-keluar/?dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir + "&noOrder=&jenisOrder=", true).then(function (dat) {
// 					//IPSRSService.getItem("psrsPermintaanPerbaikan/get-informasi-perbaikan-keluar/", true).then(function(dat){

// 					$scope.listData = dat.data.data;
// 					$scope.nomor = 1
// 					$scope.listData.forEach(function (data) {
// 						var date1 = new Date(data.tanggalOrder);
// 						data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
// 						data.no = $scope.nomor++;
// 					});
// 					$scope.dataSource = new kendo.data.DataSource({
// 						pageSize: 10,
// 						data: $scope.listData
// 					});
// 					$scope.isLoadingData = false;
// 					$scope.AllData = false;
// 				});
// 				$scope.mainGridOptions = {
// 					pageable: true,
// 					filterable: {
// 						extra: false,
// 						operators: {
// 							string: {
// 								startsWith: "Pencarian"
// 								// eq: "Is equal to",
// 								// neq: "Is not equal to"
// 							}
// 						}
// 					},
// 					columns: [{
// 							field: "no",
// 							title: "<h3 align=center>No<h3>",
// 							filterable: false
// 						},
// 						{
// 							field: "noOrder",
// 							title: "<h3 align=center>No Order<h3>"
// 						},
// 						{
// 							field: "tanggalOrder",
// 							title: "<h3 align=center>Tanggal Order<h3>",
// 							filterable: false
// 						},
// 						{
// 							field: "ruanganPemesan",
// 							title: "<h3 align=center>Ruangan Pemesanan<h3>"
// 						},
// 						{
// 							field: "userPemesan",
// 							title: "<h3 align=center>User Pemesanan<h3>"
// 						},
// 						{
// 							field: "noRespon",
// 							title: "<h3 align=center>No Respon<h3>"
// 						},
// 						{
// 							field: "noVerifikasi",
// 							title: "<h3 align=center>No Verifikasi<h3>"
// 						},
// 						{
// 							field: "keteranganLainnya",
// 							title: "<h3 align=center>Keterangan<h3>"
// 						},
// 						{
// 							field: "asalSukuCadang",
// 							title: "<h3 align=center>Asal Suku Cadang<h3>"
// 						},
// 						{
// 							field: "keteranganOrder",
// 							title: "<h3 align=center>Keterangan Order<h3>"
// 						},
// 						{
// 							field: "namaTeknisi",
// 							title: "<h3 align=center>Nama Teknisi<h3>"
// 						},
// 						{
// 							field: "jenisProduk",
// 							title: "<h3 align=center>Kategori Perbaikan<h3>"
// 						}
// 					],
// 					editable: false
// 				};
// 			}
// 		});
// 		$scope.AllData = true;
// 	};
// 	$scope.init();

// 	$scope.klik = function (current) {

// 		$scope.current = current;
// 		$scope.userPemesan = current.userPemesan;
// 		$scope.item.noRecOrderPelayanan = current.noRecOrderPelayanan;
// 		$scope.item.statusRespon = current.noRespon;
// 		$scope.item.kedatangan = current.noVerifikasi;
// 		$scope.item.noRecKirim = current.noRecKirimProduk;
// 		$scope.item.keteranganOrder = current.keteranganOrder;
// 		$scope.item.noRec = current.noRec;
// 		$scope.item.asalSukuCadang = current.asalSukuCadang;
// 		$scope.item.noRecKirimProduk = current.noRecKirimProduk;
// 		$scope.item.noVerifikasi = current.noVerifikasi;
// 		$scope.item.keteranganLainnya = current.keteranganLainnya;
// 		$scope.item.IdJenis = current.idJenis;
// 		$scope.item.jenisProduk = current.jenisProduk;
// 	};

// 	$scope.batal = function () {
// 		// body...
// 		$location.path('home');
// 	}
// 	/*$scope.detail = function(current){
// 				$state.go("DetailOrder",
// 				{ 	
// 					noRec:$scope.item.noRec
// 				});
// 		}*/
// 	$scope.detail = function (current) {
// 		if ($scope.item.keteranganOrder == "Jadwal Pemeliharaan") {
// 			$state.go('ReadPreventiveMaintenance', {
// 				noRec: $scope.item.noRec,
// 				noRecKirimProduk: $scope.item.noRecKirimProduk
// 			});
// 		} else {
// 			$state.go('ReadFormPermintaanPerbaikan', {
// 				noRec: $scope.item.noRec,
// 				userPemesan: $scope.userPemesan,
// 				noRecKirimProduk: $scope.item.noRecKirimProduk,
// 				noRecOrderPelayanan: $scope.item.noRecOrderPelayanan,
// 				keteranganLainnya: $scope.item.keteranganLainnya
// 			});
// 		}
// 	}
// 	$scope.perbaikan = function () {
// 		if (($scope.item.statusRespon === null || $scope.item.kedatangan === null) || ($scope.item.statusRespon === undefined || $scope.item.kedatangan === undefined)) {
// 			if ($scope.item.statusRespon === undefined || $scope.item.kedatangan === undefined) {
// 				toastr.warning("Belum memiliki Properties dari Backend, noRespon, noVerifikasi & noRecKirimProduk undefined")
// 			} else {
// 				window.messageContainer.error('Permintaan Belum di Respon / Belum Diverifikasi User');
// 			}
// 		} else if ($scope.item.keteranganOrder == "Jadwal Pemeliharaan") {

// 			$state.go('PreventiveMaintenance', {
// 				noRec: $scope.item.noRec,
// 				noRecKirimProduk: $scope.item.noRecKirimProduk,
// 				noRecOrderPelayanan: $scope.item.noRecOrderPelayanan,
// 				IdJenis: $scope.item.IdJenis
// 			})
// 		} else {
// 			$state.go('FormPermintaanPerbaikan', {
// 				noRec: $scope.item.noRec,
// 				userPemesan: $scope.userPemesan,
// 				noRecKirimProduk: $scope.item.noRecKirimProduk,
// 				noRecOrderPelayanan: $scope.item.noRecOrderPelayanan,
// 				keteranganLainnya: $scope.item.keteranganLainnya,
// 				IdJenis: $scope.item.IdJenis
// 			})
// 		}
// 	}

// 	$scope.respon = function () {
// 		if ($scope.item.statusRespon === null || $scope.item.statusRespon === undefined) {
// 			var data = {
// 				"noRecOrderPelayanan": $scope.item.noRecOrderPelayanan
// 			}
// 			ManageIPSRS.saveDataSarPras(data, "psrsPermintaanPerbaikan/kirim-perbaikan/").then(function (e) {
// 				// $scope.init();
// 				if ($scope.cariData == true) {
// 					$scope.cari();
// 				} else {
// 					$scope.init()
// 				}
// 			});
// 		} else {
// 			window.messageContainer.error('Permintaan Sudah Direspon')
// 		}
// 	}
// 	$scope.verifKedatangan = function () {
// 		if ($scope.item.statusRespon === null || $scope.item.statusRespon === undefined) {
// 			window.messageContainer.error('Permintaan Belum Di Respon')
// 		} else if ($scope.item.kedatangan === null || $scope.item.kedatangan === undefined) {
// 			var data = {
// 				"noRecKirimProduk": $scope.item.noRecKirim
// 			}
// 			ManageIPSRS.saveDataSarPras(data, "psrsPermintaanPerbaikan/save-verifikasi-perbaikan/").then(function (e) {
// 				$scope.init();
// 			});
// 		} else {
// 			window.messageContainer.error('Kedatangan Sudah Diverifikasi')
// 		}
// 	};
// 	$scope.verifPekerjaan = function () {
// 		if ($scope.item.statusRespon === null || $scope.item.statusRespon === undefined) {
// 			window.messageContainer.error('Permintaan Belum Di Respon')
// 		} else if ($scope.item.kedatangan === null || $scope.item.kedatangan === undefined) {
// 			window.messageContainer.error('Kedatangan Belum Di Verifikasi')
// 		} else if ($scope.item.keteranganOrder == "Jadwal Pemeliharaan") {
// 			$state.go('PreventiveMaintenance', {
// 				noRec: $scope.item.noRec,
// 				noRecKirimProduk: $scope.item.noRecKirimProduk,
// 				IdJenis: $scope.item.IdJenis
// 			})
// 		} else {
// 			$state.go('FormPermintaanPerbaikan', {
// 				noRec: $scope.item.noRec,
// 				userPemesan: $scope.userPemesan,
// 				noRecKirimProduk: $scope.item.noRecKirimProduk,
// 				noRecOrderPelayanan: $scope.item.noRecOrderPelayanan,
// 				keteranganLainnya: $scope.item.keteranganLainnya,
// 				IdJenis: $scope.item.IdJenis
// 			})

// 		}
// 	};
// 	$scope.permintaanSukuCadang = function () {
// 		//$scope.item.asalSukuCadang === null || 
// 		if ($scope.item.asalSukuCadang === undefined) {
// 			window.messageContainer.error('Silahkan Pilih Data')
// 		} else if ($scope.item.asalSukuCadang === null) {
// 			toastr.warning("Asal Suku Cadang Null")
// 		} else if ($scope.item.asalSukuCadang === "-" || $scope.item.asalSukuCadang === "Tidak Dengan Suku Cadang") {
// 			window.messageContainer.error('Perbaikan Tidak Memerlukan Suku Cadang')
// 		} else if ($scope.item.asalSukuCadang === "Suku Cadang") {
// 			$state.go('SukuCadangLogistik', {
// 				strukOrder: $scope.item.noRec
// 			})
// 		} else {
// 			$state.go('SukuCadangDariPihakLuar', {
// 				strukOrder: $scope.item.noRec
// 			})
// 		}
// 	}

// 	$scope.dataJenisOrder = [{
// 		"id": 1,
// 		"name": "Jadwal Pemeliharaan"
// 	}, {
// 		"id": 2,
// 		"name": "Permintaan Perbaikan"
// 	}, {
// 		"id": 3,
// 		"name": "Jadwal Kalibrasi"
// 	}, {
// 		"id": 4,
// 		"name": "Jadwal Kontrak Service"
// 	}];

// 	$scope.cari = function () {
// 		$scope.cariData = true;
// 		$scope.isLoadingData = true;
// 		if ($scope.item.dateStart == "") {
// 			var tanggalAwal = ""
// 		} else {
// 			var tanggal1 = new Date($scope.item.dateStart);
// 			var tanggalAwal = DateHelper.getTanggalFormattedNew(tanggal1);
// 		}
// 		if ($scope.item.dateEnd == "") {
// 			var tanggalAkhir = ""
// 		} else {
// 			var tanggal2 = new Date($scope.item.dateEnd);
// 			var tanggalAkhir = DateHelper.getTanggalFormattedNew(tanggal2);
// 		}
// 		//$scope.nomor = 1;
// 		// $scope.listData.forEach(function(data){
// 		// 	data.tglOrder = data.tanggalOrder
// 		// 	var date1 = new Date(data.tglOrder);
// 		// 	data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
// 		// 	data.no = $scope.nomor++;
// 		// });
// 		//Old Permintaan Perbaikan Filter Pencarian
// 		// IPSRSService.getItem("psrsPermintaanPerbaikan/get-informasi-perbaikan-masuk/?dateStart="+tanggalAwal+"&dateEnd="+tanggalAkhir+"&noOrder="+$scope.item.noOrder+"&jenisOrder="+$scope.item.jenisOrder.name, true).then(function(dat){
// 		/*IPSRSService.getItem("psrsPermintaanPerbaikan/get-lap-permintaan-perbaikan?startDate="+tanggalAwal+"&endDate="+tanggalAkhir, true).then(function(dat){*/
// 		if ($scope.idRuangan == 229) {

// 			if ($scope.item.noOrder == "" && tanggalAwal != "" && tanggalAkhir != "") {

// 				if ($scope.item.jenisOrder === null || $scope.item.jenisOrder.id === null) {
// 					IPSRSService.getItem("psrsPermintaanPerbaikan/get-lap-permintaan-perbaikan-by-date?startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir, true).then(function (dat) {
// 						$scope.listData = dat.data.data;
// 						$scope.item.noOrder = "";
// 						var datagrid = [];
// 						var i = 1;

// 						$scope.listData.forEach(function (data) {

// 							var date1 = new Date(data.tanggalOrder);
// 							data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
// 							if (data.asalSukuCadang != null) {
// 								var sukdang = data.asalSukuCadang.asalSukuCadang;
// 							} else if (data.asalSukuCadang) {
// 								var sukdang = data.asalSukuCadang;
// 							}
// 							var daftar = {
// 								"no": i,
// 								"noOrder": data.noOrder,
// 								"tglOrder": data.tglOrder,
// 								"ruanganPemesan": data.ruanganPemesan,
// 								"ruanganTujuan": data.ruanganTujuan,
// 								"userPemesan": data.userPemesan,
// 								"noRespon": data.noRespon,
// 								"noVerifikasi": data.noVerifikasi,
// 								"keteranganLainnya": data.keteranganLainnya,
// 								"asalSukuCadang": sukdang,
// 								"keteranganOrder": data.keteranganOrder,
// 								"namaTeknisi": data.namaTeknisi,
// 								"noRec": data.noRec,
// 								"noRecOrderPelayanan": data.noRecOrderPelayanan,
// 								"noRespon": data.noRespon,
// 								"keteranganOrder": data.keteranganOrder,
// 								"idJenis": data.idJenis,
// 								"jenisProduk": data.jenisProduk

// 							}
// 							datagrid[i - 1] = daftar;
// 							i++;
// 						});
// 						$scope.dataSource = new kendo.data.DataSource({
// 							pageSize: 10,
// 							data: datagrid
// 						});
// 					});
// 				} else {

// 					IPSRSService.getItem("psrsPermintaanPerbaikan/get-lap-permintaan-perbaikan-by-jenis-order?startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir + "&jenisOrder=" + $scope.item.jenisOrder.name, true).then(function (dat) {
// 						$scope.listData = dat.data.data;
// 						$scope.item.noOrder = "";
// 						var datagrid = [];
// 						var i = 1;
// 						$scope.listData.forEach(function (data) {

// 							var date1 = new Date(data.tanggalOrder);
// 							data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
// 							if (data.asalSukuCadang != null) {
// 								var sukdang = data.asalSukuCadang.asalSukuCadang;
// 							} else if (data.asalSukuCadang) {
// 								var sukdang = data.asalSukuCadang;
// 							}
// 							var daftar = {
// 								"no": i,
// 								"noOrder": data.noOrder,
// 								"tglOrder": data.tglOrder,
// 								"ruanganPemesan": data.ruanganPemesan,
// 								"ruanganTujuan": data.ruanganTujuan,
// 								"userPemesan": data.userPemesan,
// 								"noRespon": data.noRespon,
// 								"noVerifikasi": data.noVerifikasi,
// 								"keteranganLainnya": data.keteranganLainnya,
// 								"asalSukuCadang": sukdang,
// 								"keteranganOrder": data.keteranganOrder,
// 								"namaTeknisi": data.namaTeknisi,
// 								"noRec": data.noRec,
// 								"noRecOrderPelayanan": data.noRecOrderPelayanan,
// 								"noRespon": data.noRespon,
// 								"keteranganOrder": data.keteranganOrder,
// 								"idJenis": data.idJenis,
// 								"jenisProduk": data.jenisProduk
// 							}
// 							datagrid[i - 1] = daftar;
// 							i++;
// 						});

// 						$scope.dataSource = new kendo.data.DataSource({
// 							pageSize: 10,
// 							data: datagrid
// 						});
// 					});
// 				}
// 			} else {
// 				if ($scope.item.noOrder != "" || $scope.item.jenisOrder === null) {
// 					IPSRSService.getItem("psrsPermintaanPerbaikan/get-lap-permintaan-perbaikan-by-noorder?noOrder=" + $scope.item.noOrder, true).then(function (dat) {

// 						$scope.listData = dat.data.data;
// 						var datagrid = [];
// 						var i = 1;
// 						$scope.listData.forEach(function (data) {
// 							var date1 = new Date(data.tanggalOrder);
// 							data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
// 							if (data.asalSukuCadang != null) {
// 								var sukdang = data.asalSukuCadang.asalSukuCadang;
// 							} else if (data.asalSukuCadang) {
// 								var sukdang = data.asalSukuCadang;
// 							}
// 							var daftar = {
// 								"no": i,
// 								"noOrder": data.noOrder,
// 								"tglOrder": data.tglOrder,
// 								"ruanganPemesan": data.ruanganPemesan,
// 								"ruanganTujuan": data.ruanganTujuan,
// 								"userPemesan": data.userPemesan,
// 								"noRespon": data.noRespon,
// 								"noVerifikasi": data.noVerifikasi,
// 								"keteranganLainnya": data.keteranganLainnya,
// 								"asalSukuCadang": sukdang,
// 								"keteranganOrder": data.keteranganOrder,
// 								"namaTeknisi": data.namaTeknisi,
// 								"noRec": data.noRec,
// 								"noRecOrderPelayanan": data.noRecOrderPelayanan,
// 								"noRespon": data.noRespon,
// 								"keteranganOrder": data.keteranganOrder,
// 								"idJenis": data.idJenis,
// 								"jenisProduk": data.jenisProduk
// 							}
// 							datagrid[i - 1] = daftar;
// 							i++;
// 						});
// 						$scope.dataSource = new kendo.data.DataSource({
// 							pageSize: 10,
// 							data: datagrid
// 						});
// 					});
// 				} else {
// 					window.messageContainer.error("Periode Tanggal harus dipilih terlebih dahulu !")
// 				}
// 			}
// 			//else Ruangan selain IP3RS 
// 		} else {

// 			IPSRSService.getItem("psrsPermintaanPerbaikan/get-informasi-perbaikan-keluar/?dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir + "&noOrder=" + $scope.item.noOrder + "&jenisOrder=" + $scope.item.jenisOrder.name, true).then(function (dat) {

// 				$scope.listData = dat.data.data;
// 				var tanggalAwal = "";
// 				var tanggalAkhir = "";
// 				$scope.nomor = 1;
// 				$scope.listData.forEach(function (data) {
// 					var date1 = new Date(data.tanggalOrder);
// 					data.tanggalOrder = DateHelper.getTanggalFormatted(date1);
// 					data.no = $scope.nomor++;
// 				});
// 				$scope.dataSource = new kendo.data.DataSource({
// 					pageSize: 10,
// 					data: $scope.listData
// 				});
// 			});
// 		}
// 		$scope.isLoadingData = false;
// 	}
// }