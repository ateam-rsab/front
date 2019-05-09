define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PenjadwalanPemeliharaanCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'ManageIT', 'DateHelper', '$window', '$mdDialog', '$state',
		function ($rootScope, $scope, ModelItem, IPSRSService, ManageIT, DateHelper, $window, $mdDialog, $state) {
			ModelItem.get("IT/PenjadwalanPemeliharaan").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.item.tanggalJadwal = $scope.now;
				$scope.item.tglPemeliharaan = $scope.now;
				$scope.item.awal = $scope.now;
				$scope.item.akhir = $scope.now;

				IPSRSService.getItem("ipsrs-maintenance/get-ruangan-maintenance", true).then(function (dat) {
					$scope.listLokasi = dat.data.data.listRuangan;
				});
				IPSRSService.getItem('pegawai/get-pegawai-by-ruangan/1').then(function (dat) {
					$scope.listTeknisi = dat.data.data;
				  })
				IPSRSService.getItem("ipsrs-maintenance/get-rekanan-maintenance", true).then(function (dat) {
					$scope.listRekanan = dat.data.data.listRekanan;
				});


				$scope.dataSource = new kendo.data.DataSource({
					data: [],
					pageSize: 10
				});


				$scope.OnInitRuangan = function () {
					IPSRSService.getItem("service/list-generic/?view=Ruangan&select=*", true).then(function (dat) {
						$scope.listRuangan = dat;
					});
				}
				$scope.OnInitRuangan();

				$scope.OnInitPegawaiLogin = function () {
					IPSRSService.getItem("user/get-user", true).then(function (dat) {
						$scope.item.user = dat.data.data.namaUser;
						$scope.item.Iduser = dat.data.data.id;
					});
				}
				$scope.OnInitPegawaiLogin();

				$scope.batal = function () {
					$state.go('DaftarJadwalPemeliharaan');
				}

				$scope.OnChangeBarang = function () {
					$scope.item.merk = $scope.item.namaBarang.merkProduk
					$scope.item.noSeri = $scope.item.namaBarang.noSeri
					$scope.item.type = $scope.item.namaBarang.typeProduk

				}

				$scope.columnJadwal = [
					{
						"field": "no",
						"title": "<h3 align=center>No<h3>",
						"width": "20px"
					},
					{
						"field": "noOrder",
						"title": "<h3 align=center>No Order<h3>",
						"width": "80px"
					},
					{
						"field": "tglJadwal",
						"title": "<h3 align=center>Tanggal Jadwal<h3>",
						"width": "70px"
					},
					{
						"field": "tanggalInput",
						"title": "<h3 align=center>Tanggal Input<h3>",
						"width": "70px"
					},
					{
						"field": "namaRuangan",
						"title": "<h3 align=center>Nama Ruangan<h3>",
						"width": "100px"
					},
					{
						"field": "statusPengerjaan",
						"title": "<h3 align=center>Status Pengerjaan<h3>",
						"width": "50px"
					}];


				$scope.Cari = function (GetPencarian) {
					if (GetPencarian != undefined) {
						var q = GetPencarian;
						var grid = $("#gridBarang").data("kendoGrid");
						grid.dataSource.query({
							page: 1,
							//   pageSize:20,
							filter: {
								logic: "or",
								filters: [
									{ field: "noOrder", operator: "contains", value: q },
									{ field: "namaRuangan", operator: "contains", value: q },
									{ field: "statusPengerjaan", operator: "contains", value: q }
								]
							}
						});
					}
				}

				$scope.ClearCari = function () {
					$scope.item.Pencarians = "";
					var gridData = $("#gridBarang").data("kendoGrid");
					gridData.dataSource.filter({});
				}

				$scope.removeDataBahanLinen = function (e) {
					e.preventDefault();
					var grid = this;
					var viewDataCurrent = grid.dataItem(grid.tbody.find(">tr"));
					var row = $(e.currentTarget).closest("tr");
					$scope.dataTemp = $scope.dataSource
						.filter(function (el) {
							return el.namaBarang !== grid[0].namaBarang;
						});
					grid.removeRow(row);
				}


				$scope.columnsBarang = [
					{
						"field": "no",
						"title": "<h3 align=center>No<h3>",
						"width": "20px"
					}, {
						"field": "namaBarang",
						"title": "<h3 align=center>Nama Barang<h3>",
						"width": "70px"
					},
					{
						"field": "type",
						"title": "<h3 align=center>Type<h3>",
						"width": "40px"
					},
					{
						"field": "merk",
						"title": "<h3 align=center>Merk<h3>",
						"width": "40px"
					},
					{
						"field": "noSeri",
						"title": "<h3 align=center>No Seri<h3>",
						"width": "40px"
					},
					{
						command: {
							text: "Hapus",
							width: "20px",
							align: "center",
							click: $scope.removeDataBahanLinen
						},
						title: "<h3 align=center>Action</h3>",
						width: "40px"
					}];

				var onDataBound = function () {
					$('td').each(function () {
						if ($(this).text() == "Sudah Dikerjakan") {
							$(this).addClass('yellow')
						}
					});
					$('td').each(function () {
						if ($(this).text() == "Belum Dikerjakan") {
							$(this).addClass('red')
						}
					});
				};


				$scope.mainGridOptions1 = {
					dataBound: onDataBound,
					// dataSource: $scope.dataPenjadwalan,
					pageable: true,
					// columns: $scope.columnJadwal
				};

				$scope.mainGridOptions2 = {
					dataSource: $scope.dataSource,
					pageable: true,
					columns: $scope.columnsBarang
				};

				$scope.OnChangeBarangDate = function () {
					var TanggalAwal = new moment($scope.item.awal).format('YYYY-MM-DD');
					var TanggalAkhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
					$scope.nomor = 1;
					ManageIT.getItem("it-jadwal-perawatan/get-jadwal-perawatan?startDate=" + TanggalAwal + "&endDate=" + TanggalAkhir, true).then(function (dat) {
						$scope.dataAllRow = dat.data.data;
						for (var i = 0; i < $scope.dataAllRow.length; i++) {
							$scope.dataAllRow[i].no = $scope.nomor++
						}
					});
				}


				var init = function function_name(argument) {
					var TanggalAwal = new moment($scope.item.awal).format('YYYY-MM-DD');
					var TanggalAkhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
					$scope.nomor = 1;
					// IPSRSService.getItem("it-jadwal-perawatan/get-jadwal-perawatan?startDate=" + TanggalAwal + "&endDate=" + TanggalAkhir, true).then(function (dat) {
					// 	debugger
					// 	$scope.dataAllRow = dat.data.data;
					// 	$scope.dataPenjadwalan = new kendo.data.DataSource({
					// 		data: $scope.dataAllRow,
					// 		pageSize: 10
					// 	});
					// 	for (var i = 0; i < $scope.dataAllRow.length; i++) {
					// 		debugger
					// 		var TglAwal = new moment($scope.dataAllRow[i].tglJadwal).format('YYYY-MM-DD');
					// 		$scope.dataAllRow[i].no = $scope.nomor++;
					// 		$scope.dataAllRow[i].tglJadwal = TglAwal;
					// 	}
					// });
				}
				init();

				let numberAdd = 1;
				$scope.AddDataBarang = function () {
					if($scope.item.namaBarang) {
						var dataTemp = {
							"no": numberAdd++,
							"namaBarang": $scope.item.namaBarang.namaProduk,
							"type": $scope.item.type,
							"merk": $scope.item.merk,
							"noSeri": $scope.item.noSeri,
							"registrasiAsetId": $scope.item.namaBarang.noRec
						};
						$scope.dataSource.add(dataTemp);
						$scope.item.namaBarang = '';
					} else { 
						toastr.warning('Harap pilih salah satu barang')
					}
				}
				$scope.barang = function () {
					// var ruanganId = $scope.item.lokasi.id;
					var ruanganId = $scope.item.Ruangan.id
					console.log($scope.item.Ruangan.id)
					ManageIT.getItem('it-perbaikan/find-asset-by-ruangan?id=' + ruanganId, true).then(function (dat) {
						$scope.listNamaBarang = dat.data.data.dataAset;
					});
				};

				$scope.arrTeknisi = [
					{
						"teknisi": {
							"id": ""
						}
					}
				];

				$scope.addTeknisi = function () {
					var newData = {
						"teknisi": {
							"id": ""
						}
					}
					$scope.arrTeknisi.push(newData);

				}

				$scope.removeTeknisi = function (data) {
					$scope.arrTeknisi.splice(data, 1);
				};

				$scope.arrTeknisiPendampingKalibrasi = [
					{
						"teknisi": {
							"id": ""
						}
					}
				];

				$scope.simpan = function () {
					var tanggalPemeliharaan = new moment($scope.item.tglPemeliharaan).format('YYYY-MM-DD')
					var tanggalJadwal = new moment($scope.item.tanggalJadwal).format('YYYY-MM-DD')
					var DataRegistrasi = [];
					var DataTeknisi = [];
					$scope.arrTeknisi.forEach(function (e) {
						var dataTempTeknisi = { teknisiId: e.teknisi.idPegawai }
						DataTeknisi.push(dataTempTeknisi);
					})
					$scope.dataSource._data.forEach(function (e) {
						var dataTemp = {
							"registrasiAsetId": e.registrasiAsetId
						}
						DataRegistrasi.push(dataTemp);
					});

					var data = {
						"ruanganId": $scope.item.Ruangan.id,
						"pegawaiId": $scope.item.Iduser,
						"tanggal": tanggalPemeliharaan,
						"tglJadwal": tanggalJadwal,
						"keterangan": $scope.item.keterangan,
						"itJadwalItem": DataRegistrasi,
						"itJadwalTeknisi": DataTeknisi
					}
					console.log(JSON.stringify(data));
					ManageIT.saveDataIT(data, "it-jadwal-perawatan/save-jadwal").then(function (e) {
						var konfirmasi = $mdDialog.confirm()
							.title('Peringatan!')
							.textContent('Kembali ke Daftar Penerimaan Pemakaian Ruang Rapat?')
							.ariaLabel('Lucky Day')
							.ok('Ya')
							.cancel('Tidak');
					  	$mdDialog.show(konfirmasi).then(function () {
							$state.go('DaftarOrderPemakaianRuangRapat');
						});
						$scope.resetData();
						init();
					});
				};
				$scope.jadwalPemeliharaan = "Kerusakan";
				$scope.jadwalPemeliharaan2 = "Kerusakan 2";
				$scope.resetData = function () {
					$scope.item.Ruangan = '';
					$scope.item.tanggalJadwal = new Date();
					$scope.item.tglPemeliharaan = new Date();
					$scope.item.namaBarang = '';
					$scope.item.merk = '';
					$scope.item.type = '';
					$scope.item.noSeri = '';
					$scope.arrTeknisi = [
						{
							"teknisi": {
								"id": ""
							}
						}
					];
					$("#gridBarang").data('kendoGrid').dataSource.data([]);					
				}

				$scope.showAlert = function (ev) {
					$mdDialog.show(
						$mdDialog.alert()
							.parent(angular.element(document.querySelector('#popupContainer')))
							.clickOutsideToClose(false)
							.title('This is an alert title')
							.textContent($scope.jadwalPemeliharaan +
								$scope.jadwalPemeliharaan2)
							.ariaLabel('Alert Dialog Demo')
							.ok('Got it!')
							.targetEvent(ev)
					);
				};
				$scope.showAdvanced = function (ev) {
					$mdDialog.show({
						controller: DialogController,
						templateUrl: 'module/AplikasiIP3RS/alertPenjadwalan.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose: false,
						fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
					})
				};

				$scope.showTabDialog = function (ev) {
					$mdDialog.show({
						controller: DialogController,
						templateUrl: 'tabDialog.tmpl.html',
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose: true
					})
						.then(function (answer) {
							$scope.status = 'You said the information was "' + answer + '".';
						}, function () {
							$scope.status = 'You cancelled the dialog.';
						});
				};

				$scope.showPrerenderedDialog = function (ev) {
					$mdDialog.show({
						controller: DialogController,
						contentElement: '#myDialog',
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose: true
					});
				};

				function DialogController($scope, $mdDialog) {
					$scope.hide = function () {
						$mdDialog.hide();
					};

					$scope.cancel = function () {
						$mdDialog.cancel();
					};

					$scope.answer = function (answer) {
						$mdDialog.hide(answer);
					};
				}

			}, function errorCallBack(err) { });
		}
	]);
});