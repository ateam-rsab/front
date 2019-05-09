define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RevPencucianLinenCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'FindSarpras', 'CacheHelper', 'ManageLaundry', 'FindLaundry',
		function ($rootScope, $scope, $state, ModelItem, dateHelper, ManageSarpras, FindSarpras, CacheHelper, ManageLaundry, FindLaundry) {
			$scope.item = {};
			$scope.no = 1;
			$scope.isRouteLoading = false;
			$scope.bahan1 = "Laudet";
			$scope.berat1 = 100;
			$scope.satuan1 = "Gram";
			$scope.namaBahan2 = "Aldet";
			$scope.dataVOloaded = true;
			$scope.tooltipDay = true;
			$scope.tooltip = true;
			$scope.disabledSave = false;


			FindLaundry.getLaundry("laundry/get-jenis-linen", true).then(function (dat) {
				$scope.sourceJenislinen = dat.data.data;
			});

			$scope.OnChangeJenisLinen = function (newValue) {
				FindSarpras.getSarpras("laundry/get-mesin-by-jenis-linen?idJenis=" + newValue.id, true).then(function (e) {
					$scope.sourceMasterMesin = e.data.data;
					$scope.tooltip = false;
				})
			}


			$scope.OnChangeMesin = function (newValue) {
				FindSarpras.getSarpras("laundry/get-produk-by-mesin-jenis-linen?idJenis=" + $scope.item.jenisLinen.id + "&idMesin=" + newValue.id).then(function (dat) {
					$scope.Callgrid(dat.data.data);
				})
				$scope.item.kapasitas = newValue.kapasitasAlat
				$scope.item.satuan = newValue.satuanStandar

			}


			$scope.Callgrid = function (argument) {
				$scope.DaftarPencucianLinen = new kendo.data.DataSource({
					data: argument,
					pageSize: 10,
					batch: true,
					schema: {
						model: {
							id: "namaProduk",
							fields: {
								namaProduk: { editable: true },
								qty: { editable: true },
								namaSatuanBahan: { editable: true },
								no: { editable: false }
							}
						}
					}
				});
			}
			$scope.Callgrid();


			ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
				$scope.dataMasterPetugas = dat.data;
			});


			FindSarpras.getSarpras("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function (dat) {
				$scope.item.ruangan = dat.data.namaRuangan;
				$scope.item.idRuangan = dat.data.id;
			});



			$scope.mainGridOptions = {
				pageable: true,
				filterable: {
					extra: false, operators: { string: { startsWith: "Pencarian" } }
				},
				sortable: true,
				editable: true
			}

			FindSarpras.getSarpras("user/get-user").then(function (dat) {
				$scope.item.petugas = dat.data.data.namaUser;
				$scope.item.petugasx = dat.data.data.pegawai.id;
			});

			$scope.ChangeDataParentandRemoveRow = function (e) {
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var data = this.dataItem(tr);
				$scope.CurrentIdprosesCuci = data.idprosesCuci;
				$scope.CurrentprosesCuci = data.prosesCuci;
				$scope.tempdataPencucianLinen = $scope.DaftarPencucianLinen
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				grid.removeRow(row);
				var isi = false;
				for (var i = 0; i < $scope.DaftarPencucianLinen._data.length; i++) {
					if (($scope.DaftarPencucianLinen._data[i].idprosesCuci == $scope.CurrentIdprosesCuci) && $scope.CurrentprosesCuci != "") {
						if (isi == false) {
							$scope.DaftarPencucianLinen._data[i].prosesCuci = $scope.CurrentprosesCuci;
							isi = true
						} else {
							$scope.DaftarPencucianLinen._data[i].prosesCuci = "";
						}
					}
				}
				refreshGrid($scope.DaftarPencucianLinen._data)
			};

			function refreshGrid(ds) {
				$scope.noRefresh = 1;
				for (var i = 0; i < ds.length; i++) {
					ds[i].no = $scope.noRefresh++;
				}
				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});

				var grid = $('#grid').data("kendoGrid");
				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
			}


			$scope.SetTotalJam = function () {
				$scope.tooltipDay = false;
				var tanggalAwalPencucian = new moment($scope.item.tglPencucian).format('YYYY-MM-DD');
				var tanggalAkhirPencucian = new moment($scope.item.tglSelesaiPencucian).format('YYYY-MM-DD');
				var JamAwalPencucian = new moment($scope.item.jamAwal).format('HH:mm');
				var JamAkhirPencucian = new moment($scope.item.jamAkhir).format('HH:mm');
				var TotalWaktu = dateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian + " " + JamAwalPencucian, tanggalAkhirPencucian + " " + JamAkhirPencucian);
				return $scope.item.TotalJam = TotalWaktu;
			}

			$scope.$watchGroup(['item.bobots'], function (newValued, OldValue) {
				if ($scope.item.bobots > $scope.item.kapasitas) {
					window.messageContainer.error('Bobot Tidak Boleh Melebihi Kapasitas Mesin');
					$scope.item.bobots = ""
				}
			})

			$scope.ChecklistDropdownProduk = function (container, options) {
				$('<input required name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
					autoBind: false,
					dataTextField: "namaProduk",
					dataValueField: "id",
					dataSource: $scope.listbahan
				});
			}

			$scope.ChecklistDropdownSatuanStandar = function (container, options) {
				debugger
				$('<input required name="' + options.field + '"/>').appendTo(container).kendoDropDownList({
					autoBind: false,
					dataTextField: "namaSatuanStandar",
					dataValueField: "id",
					dataSource: $scope.sourceSatuan
				});
			}



			$scope.columndataBahan = [
				{
					field: "bahanBaku", title: "<h3 align=center>Proses Cuci. <h3>", headerAttributes: { style: "text-align : center" },
					columns: [
						{
							"field": "namaProduk",
							"title": "<h3 align=center>Nama Bahan<h3>",
							"width": "100px",
							"filterable": { search: true, multi: true }
						},
						{
							"field": "qty",
							"title": "<h3 align=center>Jumlah<h3>",
							"width": "50px",
							"filterable": { search: true, multi: true }
						},
						{
							"field": "satuanStandar",
							"title": "<h3 align=center>Satuan<h3>",
							"width": "50px",
							"filterable": { search: true, multi: true }
						}
					]
				},
				{
					command: {
						text: "Delete Bahan",
						width: "70px",
						align: "center",
						click: $scope.ChangeDataParentandRemoveRow
					},
					title: "<h3 align=center>Action</h3>",
					width: "80px"
				}
			];




			$scope.daftar = function () {
				$state.go("DaftarPencucianLinen")
			}

			$scope.satuan = function () {
				if ($scope.item.mesin != undefined) {
					$scope.item.kapasitas = $scope.item.mesin.kapasitasMesin;
					$scope.item.satuan = $scope.item.mesin.namaSatuanStandar;
				}
			};


			$scope.batal = function () {
				$state.go('DaftarPenerimaanLinen');
			}

			ManageLaundry.getOrderList("laundry/get-bahan-laundry", true).then(function (dat) {
				$scope.listbahan = dat.data;
			});


			$scope.Save = function () {
				// debugger
				$scope.disabledSave = true;
				var TanggalMulai = dateHelper.formatDate($scope.item.tglPencucian, "YYYY-MM-DD")
				var TanggalSelesai = dateHelper.formatDate($scope.item.tglSelesaiPencucian, "YYYY-MM-DD")
				var jamAwaldet = dateHelper.formatDate($scope.item.jamAwal, "HH:mm:ss")
				var jamAkhirdet = dateHelper.formatDate($scope.item.jamAkhir, "HH:mm:ss")
				$scope.item.jamAkhir
				var kapasitasBahanMesins = [];
				var detail = $scope.DaftarPencucianLinen._data;
				var listRawRequired = [
					"item.tglPencucian|k-ng-model|Tanggal Awal",
					"item.tglSelesaiPencucian|k-ng-model|Tanggal Selesai",
					"item.jamAwal|k-ng-model|Jam Awal",
					"item.jamAkhir|k-ng-model|Jam Akhir",
					"item.mesin|k-ng-model|Mesin",
					"item.bobots|ng-model|Berat Linen",
					"item.petugas|k-ng-model|Petugas",
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);

				detail.forEach(function (dataTemp) {
					var dataBahanMesin = {
						//"bilas" : dataTemp.prosesCuciSave,
						"bilas": "1",
						"produkBahanId": dataTemp.idProduk,
						"jumlahBahan": dataTemp.qty,
						"satuanBahanId": dataTemp.idSatuan
					}
					kapasitasBahanMesins.push(dataBahanMesin)
				})

				if (isValid.status) {
					var data = {
						"ruanganAsalId": $scope.item.idRuangan,
						// "ruanganAsalId" :144,
						"tglPencucianLinen": TanggalMulai + " " + jamAwaldet,
						"tglSelesaiPencucianLinen": TanggalSelesai + " " + jamAkhirdet,
						"beratLinen": $scope.item.bobots,
						"mesinId": $scope.item.mesin.id,
						"kapasitasBahanMesins": kapasitasBahanMesins,
						"petugasId": $scope.item.petugas.id,
					}
					console.log(JSON.stringify(data));
					ManageLaundry.saveDataUji(data, "laundry/save-proses-cuci-internal").then(function (e) {
						if ($scope.item.ruangan == 'Laundry') {
							$scope.isRouteLoading = true;
							setTimeout(function () {
								window.location.href = '#/DaftarPencucianLinen'
							}, 5000)
						}

					});
				} else {
					$scope.disabledSave = false;
					ModelItem.showMessages(isValid.messages);
				}
			}
		}
	]);
});

