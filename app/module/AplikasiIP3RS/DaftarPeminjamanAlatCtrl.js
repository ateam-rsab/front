define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPeminjamanAlatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageIPSRS', 'DateHelper', '$state',
		function ($rootScope, $scope, ModelItem, ManageIPSRS, DateHelper, $state) {
			ModelItem.get("IPSRS/DaftarPeminjamanAlat").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.filter = [
					{ id: 1, name: "Dipinjam" },
					{ id: 2, name: "Dikembalikan" }
				]

				$scope.item.filter = {
					id: 1,
					name: "Dipinjam"
				}

				$scope.filterPeminjaman = function () {
					ManageIPSRS.getItemIPSRS("ipsrs-peminjaman-alat/get-all-peminjaman-alat?status=" + $scope.item.filter.name, true).then(function (dat) {
						$scope.dataPeminjamanAlat = dat.data.data.listIpsrsPeminjamanAlat;
						if ($scope.dataPeminjamanAlat == undefined) {
						} else {
							$scope.dataPeminjamanAlat.forEach(function (data) {
								var date1 = new Date(data.tglPeminjaman);
								var date2 = new Date(data.tglPengembalian);
								data.tglPeminjamanNew = DateHelper.getTanggalFormatted(date1);
								data.tglPengembalianNew = DateHelper.getTanggalFormatted(date2);
							});
						}

						$scope.dataSource = new kendo.data.DataSource({
							pageSize: 10,
							data: $scope.dataPeminjamanAlat,
							autoSync: true
						});

					});
					if ($scope.item.filter.name == "Dipinjam") {
						$scope.disPengembalian = false;
					} else {
						$scope.disPengembalian = true;
					}
				}
				$scope.filterPeminjaman();

				$scope.tutup = function () {
					$state.go("home")
				}

				$scope.mainGridPeminjaman = {
					pageable: true,
					columns: [
						{ field: "noPeminjaman", title: "No Peminjaman", width: 100 },
						{ field: "tglPeminjamanNew", title: "Tanggal Peminjaman", width: 150 },
						{ field: "peminjam", title: "Nama Peminjam", width: 150 },
						{ field: "ruangan", title: "Ruangan Peminjam", width: 150 },
						{ field: "petugas", title: "Nama Petugas", width: 150 },
						{ field: "namaProduk", title: "Nama Barang", width: 100 },
						{ field: "jumlah", title: "Jumlah", width: 100 },
						{ field: "tglPengembalianNew", title: "Tgl Pengembalian", width: 150 },
						{ field: "status", title: "Status", width: 100 }
					],
				};
				$scope.kl = function (selectedData) {
					$scope.selectedData = selectedData;
					$scope.item.noPeminjaman = selectedData.noPeminjaman;
					$scope.item.noRec = selectedData.noRec;
					$scope.item.peminjam = selectedData.peminjam;
					var date1 = new Date(selectedData.tglPeminjamanNew);
					$scope.item.tglPeminjamanNew = DateHelper.getTanggalFormattedNew(date1);
					$scope.item.ruangan = selectedData.ruangan;
					$scope.item.petugas = selectedData.petugas;
					$scope.item.namaProduk = selectedData.namaProduk;
					$scope.item.jumlah = selectedData.jumlah;
					var date2 = new Date(selectedData.tglPengembalianNew);
					$scope.item.tglPengembalianNew = DateHelper.getTanggalFormattedNew(date2);
					// $scope.item.idPelapor = 
				};
				$scope.pengembalian = function (selectedData) {
					if ($scope.selectedData == undefined) {
						window.messageContainer.error('Pilih 1 Daftar Peminjaman Terlebih dahulu!!')
					} else {
						$state.go("FormPengembalian",
							{
								noRec: $scope.item.noRec,
								noPeminjaman: $scope.item.noPeminjaman,
								peminjam: $scope.item.peminjam,
								tglPeminjamanNew: $scope.item.tglPeminjamanNew,
								ruangan: $scope.item.ruangan,
								petugas: $scope.item.petugas,
								namaProduk: $scope.item.namaProduk,
								jumlah: $scope.item.jumlah,
								tglPengembalianNew: $scope.item.tglPengembalianNew
							});
					}
				}



			}, function errorCallBack(err) { });
		}
	]);
});