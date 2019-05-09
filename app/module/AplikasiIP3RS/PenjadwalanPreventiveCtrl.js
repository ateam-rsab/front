define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PenjadwalanPreventiveCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIPSRS', 'DateHelper', '$state', '$mdDialog',
		function ($rootScope, $scope, ModelItem, IPSRSService, ManageIPSRS, DateHelper, $state, $mdDialog) {
			ModelItem.get("IPSRS/PenjadwalanPreventive").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.item = {};
				$scope.NonGedung = true;
				$scope.Gedung = true;
				// $scope.visible === true;
				$scope.item.tanggalJadwal = new Date();
				IPSRSService.getItem("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function (dat) {
					$scope.item.ruanganTujuan = dat.data.namaRuangan;
					$scope.item.idRuanganTujuan = dat.data.id;
				});
				IPSRSService.getItem("psrsPermintaanPerbaikan/find-ruangan-asset/", true).then(function (dat) {
					$scope.listLokasi = dat.data.data.ruanganAset;
				});
				IPSRSService.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
					$scope.listTeknisiPemeliharaan = dat.data;
				});
				IPSRSService.getItem("service/list-generic/?view=Rekanan&select=id,namaRekanan", true).then(function (dat) {
					$scope.listRekanan = dat.data;
				});

				$scope.barang = function () {
					var IdRuangan = $scope.item.lokasi.id;
					IPSRSService.getItem("psrsPermintaanPerbaikan/find-produk-by-ruangan/?id=" + IdRuangan, true).then(function (dat) {
						$scope.listNamaBarang = dat.data.data.ruanganAset;
					});
				};


				IPSRSService.getItem("ipsrs-data-alat/get-jenis-produk", true).then(function (dat) {
					$scope.listKategoriPerbaikan = dat.data.data.listData;
				});

				$scope.getNorecGedung = function () {
					$scope.item.noRec = $scope.item.namaBarang.noRec;
				}

				$scope.listJenisGedung = [{ "id": 1, "Jenis": "Gedung" }, { "id": 2, "Jenis": "Non Gedung" }]

				$scope.ChangeJenisGedung = function () {
					debugger
					if ($scope.item.Jenis.id == 2) {
						$scope.NonGedung = false;
						$scope.Gedung = true;
					} else {
						IPSRSService.getItem("psrsPermintaanPerbaikan/get-asset-gedung-by-jenis-asset/?idJenis=79", true).then(function (dataBarang) {
							$scope.listNamaBarang = dataBarang.data.data
						})
						$scope.NonGedung = true;
						$scope.Gedung = false;
					}
				}

				$scope.tutup = function () {
					$state.go("home");
				}
				$scope.state_pemeliharaan = function () {
					$state.go("DaftarPemeliharaan")
				}

				$scope.getAset = function () {
					var idRuangan = $scope.item.lokasi.id;
					var idProduk = $scope.item.namaBarang.idProduk;
					IPSRSService.getItem("psrsPermintaanPerbaikan/get-aset-by-produk-and-ruangan?produkId=" + idProduk + "&ruanganId=" + idRuangan, true).then(function (dat) {
						var dataGrid = dat.data.aset;
						$scope.dataSource = new kendo.data.DataSource({
							pageSize: 10,
							data: dataGrid
						});
					});
				}
				$scope.mainGridOptions = {
					pageable: true,
					columns: [
						{ field: "noRegisterAset", title: "Nomor Asset" },
						{ field: "namaProduk", title: "Nama Barang" },
						{ field: "merkProduk", title: "Merk" },
						{ field: "typeProduk", title: "Tipe" },
						{ field: "noSeri", title: "No Seri" },
						{ field: "tahunPerolehan", title: "Tahun Perolehan" },
						{ field: "teknologi", title: "Teknologi" }],
					editable: false
				};
				$scope.penjadwalanKerjaDetail = []
				$scope.dataGrid_2 = []
				$scope.loadGrid = function () {
					$scope.dataSource_2 = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataGrid_2
					});
				}
				$scope.loadGrid();
				$scope.mainGridOptions_2 = {
					pageable: true,
					columns: [
						{ field: "ruangan", title: "Ruangan" },
						{ field: "nomorAsset", title: "Nomor Asset" },
						{ field: "namaBarang", title: "Nama Barang" },
						{ field: "merkBarang", title: "Merk" },
						{ field: "tipeBarang", title: "Tipe" },
						{ field: "noSeri", title: "No Seri" },
						{ field: "tahunPerolehan", title: "Tahun Perolehan" },
						{ field: "teknologi", title: "Teknologi" },
						{ field: "tanggal", title: "Tanggal Pemeliharaan/Kontrak Service/Kalibrasi" }],
					editable: false
				};
				$scope.klik = function (current) {
					$scope.current = current;
					$scope.item.nomorAsset = current.noRegisterAset;
					$scope.item.noRec = current.noRec;
					$scope.item.namaBarang = current.namaProduk;
					$scope.item.merkProduk = current.merkProduk;
					$scope.item.typeProduk = current.typeProduk;
					$scope.item.noSeri = current.noSeri;
					$scope.item.tahunPerolehan = current.tahunPerolehan;
					$scope.item.teknologi = current.teknologi;
				};
				$scope.save_pemeliharaan = function () {
					if ($scope.item.Jenis.id == 2) {
						var listRawRequired = [
							"item.tglPemeliharaan|k-ng-model|Tanggal Pemeliharaan",
							"item.namaTeknisiPemeliharaan|k-ng-model|Nama Teknisi",
							"item.lokasi|k-ng-model|Lokasi",
							"item.namaBarang|k-ng-model|Nama Barang",
							"item.ketPemeliharaan|ng-model|Keterangan"
						];
						$scope.tutup = function () {
							$state.go("home")
						}
						var isValid = ModelItem.setValidation($scope, listRawRequired);

						if (isValid.status) {
							var tanggalPemeliharaan = DateHelper.getTanggalFormattedNew($scope.item.tglPemeliharaan);
							var data = {
								"ruangan": $scope.item.lokasi.namaRuangan,
								"nomorAsset": $scope.item.nomorAsset,
								"namaBarang": $scope.item.namaBarang,
								"merkBarang": $scope.item.merkProduk,
								"tipeBarang": $scope.item.typeProduk,
								"noSeri": $scope.item.noSeri,
								"tahunPerolehan": $scope.item.tahunPerolehan,
								"teknologi": $scope.item.teknologi,
								"tanggal": tanggalPemeliharaan
							};

							var data_simpan =
							{
								"jenisPenjadwalan": "PEMELIHARAAN",
								"tglPemeliharaan": tanggalPemeliharaan,
								"keteranganOrder": $scope.item.ketPemeliharaan,
								"rekanan": {
									"id": 0
								},
								"pegawai": {
									"id": $scope.item.namaTeknisiPemeliharaan.id
								}
							};
							if ($scope.item.nomorAsset == undefined) {
								window.messageContainer.error('Silahkan Pilih Asset')
							} else {
								$scope.penjadwalanKerjaDetail.push(data_simpan);
								$scope.dataGrid_2.push(data);
								$scope.loadGrid();
							}
						} else {
							ModelItem.showMessages(isValid.messages);
						}


					} else {
						var tanggalPemeliharaan = DateHelper.getTanggalFormattedNew($scope.item.tglPemeliharaan);
						var data = {
							"ruangan": "-",
							"nomorAsset": $scope.item.namaBarang.noRegisterAset,
							"namaBarang": $scope.item.namaBarang.namaProduk,
							"merkBarang": "-",
							"tipeBarang": "-",
							"noSeri": "-",
							"tahunPerolehan": "-",
							"teknologi": "-",
							"tanggal": tanggalPemeliharaan
						};
						var data_simpan =
						{
							"jenisPenjadwalan": "PEMELIHARAAN",
							"tglPemeliharaan": tanggalPemeliharaan,
							"keteranganOrder": $scope.item.ketPemeliharaan,
							"rekanan": {
								"id": 0
							},
							"pegawai": {
								"id": $scope.item.namaTeknisiPemeliharaan.id
							}
						}
						$scope.penjadwalanKerjaDetail.push(data_simpan);
						$scope.dataGrid_2.push(data);
						$scope.loadGrid();
					}
				}


				$scope.save_kontrakService = function () {
					if ($scope.item.Jenis.id == 2) {
						var listRawRequired = [
							"item.tglKontrakService|k-ng-model|Tanggal Kontrak Service",
							"item.teknisiPendampingKontrakService|k-ng-model|Nama Teknisi",
							"item.namaPt|k-ng-model|Nama PT",
							"item.lokasi|k-ng-model|Lokasi",
							"item.namaBarang|k-ng-model|Nama Barang",
							"item.ketKontrakService|ng-model|Keterangan"
						];
						var isValid = ModelItem.setValidation($scope, listRawRequired);

						if (isValid.status) {
							var tanggalPemeliharaan = DateHelper.getTanggalFormattedNew($scope.item.tglKontrakService);
							var data = {
								"ruangan": $scope.item.lokasi.namaRuangan,
								"nomorAsset": $scope.item.nomorAsset,
								"namaBarang": $scope.item.namaBarang,
								"merkBarang": $scope.item.merkProduk,
								"tipeBarang": $scope.item.typeProduk,
								"noSeri": $scope.item.noSeri,
								"tahunPerolehan": $scope.item.tahunPerolehan,
								"teknologi": $scope.item.teknologi,
								"tanggal": tanggalPemeliharaan
							};
							var data_simpan =
							{
								"jenisPenjadwalan": "KONTRAK SERVICE",
								"tglPemeliharaan": tanggalPemeliharaan,
								"keteranganOrder": $scope.item.ketKontrakService,
								"rekanan": {
									"id": $scope.item.namaPt.id
								},
								"pegawai": {
									"id": $scope.item.teknisiPendampingKontrakService.id
								}
							};
							if ($scope.item.nomorAsset == undefined) {
								window.messageContainer.error('Silahkan Pilih Asset')
							} else {
								$scope.penjadwalanKerjaDetail.push(data_simpan);
								$scope.dataGrid_2.push(data);
								$scope.loadGrid();
							}
						} else {
							ModelItem.showMessages(isValid.messages);
						}
					} else {
						var tanggalPemeliharaan = DateHelper.getTanggalFormattedNew($scope.item.tglPemeliharaan);
						var data = {
							"ruangan": "-",
							"nomorAsset": $scope.item.namaBarang.noRegisterAset,
							"namaBarang": $scope.item.namaBarang.namaProduk,
							"merkBarang": "-",
							"tipeBarang": "-",
							"noSeri": "-",
							"tahunPerolehan": "-",
							"teknologi": "-",
							"tanggal": tanggalPemeliharaan
						};
						var data_simpan =
						{
							"jenisPenjadwalan": "KONTRAK SERVICE",
							"tglPemeliharaan": tanggalPemeliharaan,
							"keteranganOrder": $scope.item.ketKontrakService,
							"rekanan": {
								"id": $scope.item.namaPt.id
							},
							"pegawai": {
								"id": $scope.item.teknisiPendampingKontrakService.id
							}
						}
						$scope.penjadwalanKerjaDetail.push(data_simpan);
						$scope.dataGrid_2.push(data);
						$scope.loadGrid();
					}

				}
				$scope.save_kalibrasi = function () {
					debugger
					if ($scope.item.Jenis.id == 2) {
						var listRawRequired = [
							"item.tglKalibrasi|k-ng-model|Tanggal Kalibrasi",
							"item.teknisiPendampingKalibrasi|k-ng-model|Nama Teknisi",
							"item.namaPtKalibrasi|k-ng-model|Nama PT",
							"item.lokasi|k-ng-model|Lokasi",
							"item.namaBarang|k-ng-model|Nama Barang",
							"item.ketKalibrasi|ng-model|Keterangan"
						];
						// for(var i=0; i<$scope.dataGrid_2.length; i++){
						//  var dataNoRegisterAsset = $scope.dataGrid_2[i].nomorAsset
						//  if($scope.item.nomorAsset==dataNoRegisterAsset){
						//  	return toastr.warning('Nomor Asset Tidak Boleh Sama!!');
						//  }
						// }
						var isValid = ModelItem.setValidation($scope, listRawRequired);
					}
					if (isValid.status) {
						var tanggalPemeliharaan = DateHelper.getTanggalFormattedNew($scope.item.tglKalibrasi);
						var data = {
							"ruangan": $scope.item.lokasi.namaRuangan,
							"nomorAsset": $scope.item.nomorAsset,
							"namaBarang": $scope.item.namaBarang,
							"merkBarang": $scope.item.merkProduk,
							"tipeBarang": $scope.item.typeProduk,
							"noSeri": $scope.item.noSeri,
							"tahunPerolehan": $scope.item.tahunPerolehan,
							"teknologi": $scope.item.teknologi,
							"tanggal": tanggalPemeliharaan
						};
						var data_simpan =
						{
							"jenisPenjadwalan": "KALIBRASI",
							"tglPemeliharaan": tanggalPemeliharaan,
							"keteranganOrder": $scope.item.ketKalibrasi,
							"rekanan": {
								"id": $scope.item.namaPtKalibrasi.id
							},
							"pegawai": {
								"id": $scope.item.teknisiPendampingKalibrasi.id
							}
						};
						if ($scope.item.nomorAsset == undefined) {
							window.messageContainer.error('Silahkan Pilih Asset')
						} else {
							$scope.penjadwalanKerjaDetail.push(data_simpan);
							$scope.dataGrid_2.push(data);
							$scope.loadGrid();
						}
					} else {
						ModelItem.showMessages(isValid.messages);
					}

				}

				$scope.save_data = function () {
					debugger
					if ($scope.item.Jenis.id == 2) {
						var listRawRequired = [
							"item.lokasi|k-ng-model|Lokasi",
							"item.namaBarang|k-ng-model|Nama Barang"
						];
						var isValid = ModelItem.setValidation($scope, listRawRequired);
					} else {
						var listRawRequired = [
							"item.namaBarang|k-ng-model|Nama Barang"
						];
						var isValid = ModelItem.setValidation($scope, listRawRequired);

					}

					if (isValid.status) {
						var tanggal = DateHelper.getTanggalFormattedNew($scope.item.tanggalJadwal);
						if ($scope.penjadwalanKerjaDetail.length == 0) {
							window.messageContainer.error('Jadwal Masih Kosong')
						} else {
							if ($scope.item.Jenis.id == 2) {
								var data =
								{
									"tglOrder": tanggal,
									"ruanganAsal": {
										"id": $scope.item.lokasi.id
									},
									"ruanganTujuan": {
										"id": $scope.item.idRuanganTujuan
									},
									"registrasiAset": {
										"noRec": $scope.item.noRec
									},

									"penjadwalanKerjaDetail": $scope.penjadwalanKerjaDetail
								}
								ManageIPSRS.saveDataSarPras(data, "psrsPermintaanPerbaikan/save-penjadwalan/").then(function (e) {
									$scope.item.lokasi = "";
									$scope.item.namaBarang = "";
									$scope.dataGrid_2 = [];
									$scope.loadGrid();
									$scope.dataSource = new kendo.data.DataSource({
										pageSize: 10,
										data: []
									});
								});
							} else {
								var data =
								{
									"tglOrder": tanggal,
									"ruanganAsal": {
										/*"id":50 //LOGISTIK*/
										"id": $scope.item.lokasi2.id
									},
									"ruanganTujuan": {
										/*"id":229 // IP3RS*/
										"id": $scope.item.idRuanganTujuan
									},
									"registrasiAset": {
										"noRec": $scope.item.noRec
									},
									"penjadwalanKerjaDetail": $scope.penjadwalanKerjaDetail,
									"keterangan": $scope.item.keterangans
								}

								ManageIPSRS.saveDataSarPras(data, "ceklistgedungbangunan/save-jadwal-perawatan-gedung-v1/").then(function (e) {
									$scope.item.lokasi = "";
									$scope.item.namaBarang = "";
									$scope.dataGrid_2 = [];
									$scope.loadGrid();
									$scope.dataSource = new kendo.data.DataSource({
										pageSize: 10,
										data: []
									});
								});
							}
						}
					} else {
						ModelItem.showMessages(isValid.messages);
					}
				};

			}, function errorCallBack(err) { });
		}
	]);
});
