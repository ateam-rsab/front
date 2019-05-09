define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('FormPeminjamanAlatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageIPSRS', 'DateHelper', '$state',
		function ($rootScope, $scope, ModelItem, ManageIPSRS, DateHelper, $state) {
			ModelItem.get("IPSRS/FormPeminjamanAlat").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.dataSource = new kendo.data.DataSource({
					pageSize: 2,
					data: [],
					autoSync: true
				});
				$scope.disKodeBarang = true;
				var init = function () {
					ManageIPSRS.getItemIPSRS("ipsrs-peminjaman-alat/get-no-peminjaman-alat", true).then(function (dat) {
						// debugger;
						$scope.item.noPeminjaman = dat.data.data.noPeminjaman;
						$scope.item.tglPeminjaman = new Date();
						$scope.item.tglPengembalian = new Date();
					});
					ManageIPSRS.getItemIPSRS("ipsrs-peminjaman-alat/get-login-user/").then(function (data) {
						$scope.item.namaPetugas = data.data.data.name;
						$scope.item.petugasId = data.data.data.idPegawai;
						var ruanganId = data.data.data.idRuangan;

						// data.data.data.idRuangan;
						// debugger;
						ManageIPSRS.getItemIPSRS("ipsrs-peminjaman-alat/get-aset-peminjaman-alat?id=" + ruanganId, true).then(function (dat) {
							debugger;
							$scope.listBarang = dat.data.data.dataAset;
						});
					});
					ManageIPSRS.getItemIPSRS("ipsrs-peminjaman-alat/get-all-peminjaman-alat?status=Dipinjam", true).then(function (dat) {
						// debugger;
						$scope.dataPeminjamanAlat = dat.data.data.listIpsrsPeminjamanAlat;
						$scope.dataPeminjamanAlat.forEach(function (data) {
							var date1 = new Date(data.tglPeminjaman);
							var date2 = new Date(data.tglPengembalian);
							data.tglPeminjamanNew = DateHelper.getTanggalFormatted(date1);
							data.tglPengembalianNew = DateHelper.getTanggalFormatted(date2);
						});

					});
				};
				init();

				ManageIPSRS.getItemIPSRS("ipsrs-peminjaman-alat/get-ruangan-peminjaman-alat", true).then(function (dat) {
					// debugger;
					$scope.listRuangan = dat.data.data.listRuangan;

				});


				ManageIPSRS.getItemIPSRS("ipsrs-peminjaman-alat/get-petugas-peminjaman-alat", true).then(function (dat) {
					// debugger;
					$scope.listPegawai = dat.data.data.listTeknisi;
				});



				$scope.autoComplite = function () {
					$scope.item.kodeBarang = $scope.item.namaBarang.kdProduk;
				}
				$scope.disNoPeminjaman = true;
				$scope.disNamaPetugas = true;


				$scope.listSatuan = [
					{ id: 1, namaSatuan: "Unit" },
					{ id: 2, namaSatuan: "Paket" },
					{ id: 3, namaSatuan: "Buah" }
				];

				$scope.addPeminjamanAlat = function () {

					var tanggalPeminjaman = DateHelper.getTanggalFormatted($scope.item.tglPeminjaman);
					var tanggalPengembalian = DateHelper.getTanggalFormatted($scope.item.tglPengembalian);
					// debugger;
					var tempPeminjamanAlat = {
						noPeminjaman: $scope.item.noPeminjaman,
						tanggalPeminjaman: tanggalPeminjaman,
						namaPeminjam: $scope.item.namaPeminjam.namaLengkap,
						ruanganPeminjam: $scope.item.ruangan.namaRuangan,
						namaPetugas: $scope.item.namaPetugas,
						kodeBarang: $scope.item.kodeBarang,
						namaBarang: $scope.item.namaBarang.namaBarang,
						jumlah: $scope.item.jumlah,
						satuan: $scope.item.satuan.namaSatuan,
						tglPengembalian: tanggalPengembalian
					}

					$scope.dataPeminjamanAlat.add(tempPeminjamanAlat);
					$scope.item = {};
				};

				$scope.batal = function () {
					$scope.item.tglPeminjaman = new Date();
					$scope.item.tglPengembalian = new Date();
					$scope.item.namaPeminjam = "";
					$scope.item.ruangan = "";
					$scope.item.namaBarang = "";
					$scope.item.kodeBarang = "";
					$scope.item.jumlahBarang = "";
					$scope.item.satuan = "";
				}
				$scope.tutup = function () {
					$state.go("home");
				}

				$scope.removePeminjamanAlat = function (e) {
					e.preventDefault();
					var grid = this;
					var row = $(e.currentTarget).closest("tr");
					grid.removeRow(row);
				};
				$scope.columnPeminjamanAlat = [
					{
						field: "noPeminjaman",
						title: "No Peminjaman",
						width: 100
					},
					{
						field: "tglPeminjamanNew",
						title: "Tanggal Peminjaman",
						width: 150
					},
					{
						field: "peminjam",
						title: "Nama Peminjam",
						width: 150
					},
					{
						field: "ruangan",
						title: "Ruangan Peminjam",
						width: 150
					},
					{
						field: "petugas",
						title: "Nama Petugas",
						width: 150
					},
					{
						field: "namaProduk",
						title: "Nama Barang",
						width: 100
					},
					{
						field: "jumlah",
						title: "Jumlah",
						width: 100
					},
					{
						field: "tglPengembalianNew",
						title: "Tgl Pengembalian",
						width: 150
					}
					// ,
					// {
					// 	command: {text: "Delete", click:$scope.removePeminjamanAlat},
					// 	title : "&nbsp;",
					// 	width: 100
					// }
				];
				$scope.simpan = function () {
					var data = {
						"petugas": {
							"id": $scope.item.petugasId
						},
						"ruanganPeminjam": {
							"id": $scope.item.ruangan.id
						},
						// mapping ke asset
						"registrasiAset": {
							"noRec": $scope.item.namaBarang.noRec
						},
						"peminjam": {
							"id": $scope.item.namaPeminjam.id
						},
						"tglPeminjaman": $scope.item.tglPeminjaman,
						"tglPengembalian": $scope.item.tglPengembalian,
						"jumlah": $scope.item.jumlahBarang,
						"status": "Dipinjam"
					}
					//OLD SAVE
					// var data = {
					// 			"petugas": {
					// 				"id" : $scope.item.petugasId
					// 			},
					// 			"ruanganPeminjam": {
					// 			    "id": $scope.item.ruangan.id
					// 			},
					// 			"produk": {
					// 		    	"id": $scope.item.namaBarang.kdProduk
					// 			},
					// 			"peminjam": {
					// 			  	"id": $scope.item.namaPeminjam.id
					// 			},
					// 			"tglPeminjaman": $scope.item.tglPeminjaman,
					// 			"tglPengembalian": $scope.item.tglPengembalian,
					// 			"jumlah": $scope.item.jumlahBarang,
					// 			"status": "Dipinjam"
					// 	}

					ManageIPSRS.saveDataSarPras(data, "ipsrs-peminjaman-alat/save-peminjaman-alat").then(function (e) {
						console.log(JSON.stringify(e.data));
						$scope.item.namaPeminjam = "";
						$scope.item.ruangan = "";
						$scope.item.namaBarang = "";
						$scope.item.kodeBarang = "";
						$scope.item.jumlahBarang = "";
						$scope.item.satuan = "";
						init();
					});

				};



			}, function errorCallBack(err) { });
		}
	]);
});