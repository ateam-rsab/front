define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DistribusibaranglaundryCtrl', ['$rootScope', '$scope', 'ModelItem', 'FindLaundry', 'FindSarpras', 'ManageLaundry', 'ManageSarpras', 'DateHelper', '$state', '$location', '$anchorScroll',
		function ($rootScope, $scope, ModelItem, FindLaundry, FindSarpras, ManageLaundry, ManageSarpras, dateHelper, $state, $location, $anchorScroll) {
			ModelItem.get("Laundry/MappingCycle").then(function (data) {
			}, function errorCallBack(err) { });
			$scope.item = {};
			$scope.isRouteLoading = false;
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.item.tglDistribusi = $scope.now;
			$scope.dataVOloaded = true;

			//Get Petugas
			ManageSarpras.getOrderList("user/get-user").then(function (dat) {
				$scope.item.petugas = dat.data.data.pegawai.namaLengkap;
				$scope.item.petugasx = dat.data.data.pegawai.id;
			});

			$scope.klik = function (argument) {
				debugger
				var nomor = 1;
				$scope.item.tujuanRuangan = argument.idRuanganAsal
				$scope.item.namatujuanRuangan = argument.namaRuanganAsal
				if (argument.noRec != undefined) {
					debugger
					$scope.noRecPermintaan = argument.noRec
					ManageLaundry.getOrderList("laundry/get-permintaan-linen-bersih-detail?noRec=" + argument.noRec, true).then(function (data) {

						$scope.DataDetail = data.data.item;
						$scope.dataSource = new kendo.data.DataSource({
							data: $scope.DataDetail,
							pageSize: 10,
							$scrollable: true,
							schema: {
								model: {
									namaExternal: { editable: false },
									stock: { editable: false },
									qtyProduk: { editable: false },
									qtykirim:{ type: "number", validation: { min: 0, required: true } },
									// ket: { editable: true }
								}
							}
						});

						var dataTempQtyKirim = [];
						//Looping data
						for (var i = 0; i < $scope.DataDetail.length; i++) {
							debugger
							if ($scope.DataDetail[i].stock[0] == undefined) {
								$scope.DataDetail[i].stock = 0;
							} else {
								$scope.DataDetail[i].stock = $scope.DataDetail[i].stock[0].qtyStokProduk;
							}
							$scope.DataDetail[i].no = nomor++;
							$scope.DataDetail[i].qtykirim = $scope.DataDetail[i].qtyProduk;
						}

						$scope.DataHeader = data.data.header[0];
						$scope.item.petugasAmbil = $scope.DataHeader.namaPenerima;
						$scope.item.BeratPengambilan = $scope.DataHeader.qtyproduk;
						$scope.item.NomorDistribusi = $scope.DataHeader.nostruk;
						$scope.item.Keterangan = $scope.DataHeader.ket;
						$scope.DataHeader.idPenerima;
						$scope.DataHeader.namaPenerima;

						$scope.noRecDetail = $scope.DataHeader.noRec;
						if ($scope.DataHeader.tglstruk == null) {
							$scope.item.tanggalPengambilan = "-"
						} else {
							$scope.item.tanggalPengambilan = new moment($scope.DataHeader.tglstruk).format('YYYY-MM-DD');
						}
						$scope.DataHeader.tglterimakiriman
					})
				} else {
					window.messageContainer.error('Data belum terpilih');
				}
			}

			$scope.cariReq = function () {
				debugger
				var tanggalAwal = new moment($scope.item.awal).format('YYYY-MM-DD');
				var tanggalAkhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
				ManageLaundry.getOrderList("laundry/get-permintaan-linen-bersih-dari-ruangan?startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir, true).then(function (dat) {
					var nomor = 1;
					$scope.DataSource = dat.data.data;
					for (var i = 0; i < $scope.DataSource.length; i++) {
						$scope.DataSource[i].no = nomor++
						if ($scope.DataSource[i].tglterimakiriman != null) {
							$scope.DataSource[i].tglterimakiriman = new moment($scope.DataSource[i].tglterimakiriman).format("YYYY-MM-DD");
						} else {
							$scope.DataSource[i].tglterimakiriman = "Belum Di Terima";
						}
						if ($scope.DataSource[i].tglstruk != null) {
							$scope.DataSource[i].tglstruk = new moment($scope.DataSource[i].tglstruk).format("YYYY-MM-DD");
						} else {
							$scope.DataSource[i].tglstruk = "-";
						}


					}
				});
			}

			var Init = function () {
				debugger
				var tanggalAwal = new moment($scope.item.awal).format('YYYY-MM-DD');
				var tanggalAkhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
				ManageLaundry.getOrderList("laundry/get-permintaan-linen-bersih-dari-ruangan?startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir, true).then(function (dat) {
					var nomor = 1;
					$scope.DataSource = dat.data.data;
					
					for (var i = 0; i < $scope.DataSource.length; i++) {
						$scope.DataSource[i].no = nomor++
						if ($scope.DataSource[i].tglterimakiriman != null) {
							$scope.DataSource[i].tglterimakiriman = new moment($scope.DataSource[i].tglterimakiriman).format("YYYY-MM-DD");
						} else {
							$scope.DataSource[i].tglterimakiriman = "Belum Di Terima";
						}
						if ($scope.DataSource[i].tglstruk != null) {
							$scope.DataSource[i].tglstruk = new moment($scope.DataSource[i].tglstruk).format("YYYY-MM-DD");
						} else {
							$scope.DataSource[i].tglstruk = "-";
						}
						$scope.DataSource = new kendo.data.DataSource({
							data: [],
							pageSize: 15
						})

					}
				});
			}
			Init();

			$scope.Batal = function () {
				$state.go('home');
			}

			ModelItem.getDataDummyGeneric("Ruangan", true, true, 10).then(function (data) {
				$scope.ruangans = data;
			});


			$scope.no = 1;
			$scope.GetListPegawai = function () {
				ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
					$scope.listdatapenerma = dat.data
				});
			}
			$scope.GetListPegawai();


			FindSarpras.getSarpras("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function (dat) {
				$scope.sourceMasterSatuan = dat.data;
			});

			$scope.DaftarLinen = function () {
				$state.go("DaftarDistribusi");
			}

			$scope.sourceLinenStok = function (argument) {
				FindLaundry.getLaundry("laundry/get-laundry-linen-bersih").then(function (dat) {
					$scope.sourceLinen = dat.data.data;
				});
			}
			$scope.sourceLinenStok();


			FindLaundry.getLaundry("laundry/get-satuan-potong").then(function (dat) {
				$scope.sourceSatuan = dat.data.data;
			});

			FindLaundry.getLaundry("laundry/get-all-satuan").then(function (dat) {
				$scope.sourceSatuanStandar = dat.data.data;
			});

			$scope.satuanBahan = function () {
				if ($scope.item.namaProduk != undefined) {
					var HargaSatuan = $scope.item.namaProduk.hargaSatuan;
					$scope.item.biayaSave = $scope.item.namaProduk.hargaSatuan;
					var parseHargauang = $scope.formatRupiah(HargaSatuan, 'Rp.');
					$scope.item.biaya = parseHargauang;
				}
			};

			$scope.$watch('item.pencarian', function (e) {

				var q = e;
				var grid = $("#kGrid").data("kendoGrid");
				grid.dataSource.query({
					page: 1,
					pageSize: 20,
					filter: {
						logic: "or",
						filters: [
							{ field: "nostruk", operator: "contains", value: q },
							{ field: "namaPenerima", operator: "contains", value: q }
						]
					}
				});
			});

			$scope.daftarorderlaundry = new kendo.data.DataSource({
				data: []
			});

			$scope.dataPenerimaanLinen = new kendo.data.DataSource({
				data: []
			})

			$scope.ClearCari = function () {
				$scope.item.pencarian = "";
				var gridData = $("#kGrid").data("kendoGrid");
				gridData.dataSource.filter({});
			}


			$scope.ChangeSatuan = function () {
				$scope.item.lipatan = $scope.item.JenisLinen.qtyProduk;
				$scope.item.satuan = $scope.item.JenisLinen.satuanStandar;
				$scope.item.berat = "700";

				//Cek Stok Penyimpanan dan cek  juga dari Inputan daftar distribusi
				if ($scope.dataPenerimaanLinen._data.length != 0) {
					var TotalLipat = 0;
					for (var i = 0; i < $scope.dataPenerimaanLinen._data.length; i++) {

						if ($scope.item.JenisLinen.idProduk == $scope.dataPenerimaanLinen._data[i].idProduk) {
							TotalLipat += parseInt($scope.dataPenerimaanLinen._data[i].JumlahPermintaan);
						}
					}
					var result = (parseInt($scope.item.lipatan) - TotalLipat);
					return $scope.item.lipatan = result
				}
			}

			$scope.nomor = 1;
			$scope.addDataPencucianLinen = function () {
				if (parseInt($scope.item.qtypermintaan) > parseInt($scope.item.lipatan)) {
					window.messageContainer.error('Data Melebihi Stok Permintaan')
					$scope.item.qtypermintaan = "";
				} else {
					var tempDataDistribusi = {
						"no": $scope.nomor++,
						"keterangan2": $scope.item.Keterangan2,
						"JumlahKirim": $scope.item.qtykirim,
						"namaLinen": $scope.item.JenisLinen.namaExternal,
						"idProduk": $scope.item.JenisLinen.idProduk,
						"satuan": $scope.item.satuan,
						"beratLinen": $scope.item.berat,
						"JumlahPermintaan": $scope.item.qtypermintaan
					}

					$scope.TotalLipatDaftar = $scope.item.qtypermintaan;

					if ($scope.TotalLipatDaftar > $scope.item.lipatan) {
						window.messageContainer.error('Jumlah Permintaan Melebihi Stok Lipat');
						return $scope.item.lipatan;
					}

					$scope.dataPenerimaanLinen.add(tempDataDistribusi);
					$scope.countMinusLipatan($scope.TotalLipatDaftar);
				}
			}

			$scope.removeDataBahanLinen = function (e) {
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var data = this.dataItem(tr);

				//SET stok
				if ($scope.item.JenisLinen.idProduk == data.idProduk) {
					var OldLipatan = $scope.item.lipatan;
					var BackLipatan = parseInt(data.JumlahPermintaan);
					$scope.item.lipatan = (OldLipatan + BackLipatan);
				}
				$scope.tempdataPencucianLinen = $scope.dataPenerimaanLinen
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				grid.removeRow(row);
			};

			$scope.countMinusLipatan = function (MinusLipatan) {
				var kurangistok = ($scope.item.lipatan - MinusLipatan);
				$scope.item.lipatan = kurangistok;
			}

			$scope.onDataBound = function () {
				debugger
				$('td').each(function () {
					if ($(this).text() == "Belum Di Terima") { $(this).addClass('yellow') }
				});
			};



			$scope.mainGridOptions = {
				pageable: true,
				pageSize: 5,
				selectable: 'row',
				scrollable: true,
				batch: true,
				schema: {
					model: {
						id: "namaLinen",
						fields: {
							namaLinen: { editable: true }
						}
					}
				},
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Dimulai dengan",
							contains: "mengandung kata",
							neq: "Tidak mengandung kata"
						}
					}
				},
				columns: [
					{
						"field": "no",
						"title": "<h3 align=center>No.<h3>",
						"width": "30px",
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						},
						"filterable": false
					},
					{
						"field": "namaLinen",
						"title": "<h3 align=center>Jenis Linen<h3>",
						"width": "100px",
						"filterable": true
					},
					{
						"field": "satuan",
						"title": "<h3 align=center>Satuan<h3>",
						"width": "60px",
						"filterable": false
					},
					{
						"field": "beratLinen",
						"title": "<h3 align=center>Berat Linen<h3>",
						"width": "80px",
						"filterable": false
					},
					{
						"field": "JumlahPermintaan",
						"title": "<h3 align=center>Jumlah Permintaan<h3>",
						"width": "40px",
						"filterable": false
					},
					{
						"field": "JumlahKirim",
						"title": "<h3 align=center>Jumlah Kirim<h3>",
						"width": "40px",
						"filterable": false,
						"editable": true
					},
					{
						"field": "keterangan2",
						"title": "<h3 align=center>Keterangan<h3>",
						"width": "70px",
						"filterable": false,
						"editable": true
					},
					{
						command: {
							text: "Hapus",
							width: "70px",
							align: "center",
							click: $scope.removeDataBahanLinen
						},
						title: "<h3 align=center>Action</h3>",
						width: "80px"
					}],
			};

			$scope.mainGridOptions2 = {
				pageable: true,
				// pageSize: 10,
				selectable: 'row',
				scrollable: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Dimulai dengan",
							contains: "mengandung kata",
							neq: "Tidak mengandung kata"
						}
					}
				},
				columns: [{
					field: "tanggal", title: "<h3 align=center>Data Permintaan Linen Bersih dari Ruangan<h3>", "headerAttributes": { "style": "text-align : center" },
					columns: [
						{
							"field": "no",
							"title": "<h3 align=center>No<h3>",
							"filterable": false,
							"width": "20px",
							"attributes": {
								"class": "table-cell",
								"style": "text-align: center;"
							}
						},
						{
							"field": "namaRuangan",
							"title": "<h3 align=center>Nama Ruangan<h3>",
							"width": "60px"
						},
						{
							"field": "nostruk",
							"title": "<h3 align=center>No Struk<h3>",
							"filterable": false,
							"width": "60px"
						},
						{
							"field": "tglstruk",
							"title": "<h3 align=center>Tanggal Struk<h3>",
							"filterable": false,
							"width": "40px"
						},
						{
							"field": "tglterimakiriman",
							"title": "<h3 align=center>Tanggal Terima<h3>",
							"filterable": false,
							"width": "40px"
						},
						{
							"field": "namaMenyerahkan",
							"title": "<h3 align=center>Yang Menyerahkan<h3>",
							"filterable": true,
							"width": "100px"
						},
						{
							"field": "namaPenerima",
							"title": "<h3 align=center>Petugas laundry<h3>",
							"filterable": false,
							"width": "100px"
						},
						{
							"field": "ket",
							"title": "<h3 align=center>Keterangan<h3>",
							"width": "80px",
							"filterable": false,
						}]
				}]
			};

			$scope.columnView = [{
				title: "<h3 align=center>View Detail Permintaan Linen<h3>", headerAttributes: { style: "text-align : center" },
				columns: [{
					"field": "namaExternal",
					"title": "<h3 align=center>Jenis Linen<h3>",
					"width": "120px",
					"filterable": true,
				},
				{
					"field": "stock",
					"title": "<h3 align=center>stok<h3>",
					"width": "50px",
					"filterable": false
				},
				{
					"field": "qtyProduk",
					"title": "<h3 align=center>Qty Minta<h3>",
					"width": "50px",
					"filterable": false
				}, {
					"field": "qtykirim",
					"title": "<h3 align=center>Qty Kirim<h3>",
					"width": "50px",
					"filterable": false,
				}, {
					"field": "ket",
					"title": "<h3 align=center>Keterangan<h3>",
					"width": "80px",
					"filterable": false
				}]
			}]

			$scope.mainGridOptionsKotor = {
				// pageable: true,
				height: 300,
				// pageSize: 10,
				selectable: 'row',
				scrollable: true,
				editable: true,
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Dimulai dengan",
							contains: "mengandung kata",
							neq: "Tidak mengandung kata"
						}
					}
				}
			};
			$scope.Save = function () {
				var TanggalDistribusi = dateHelper.formatDate($scope.item.tglDistribusi, "YYYY-MM-DD")
				var TemporarySave = [];
				$scope.dataSource._data.forEach(function (e) {
					if (e.qtykirim == undefined) { e.qtykirim = 0 }
					if (parseInt(e.qtykirim) > e.stock) {
						e.qtykirim = e.stock;
						return window.messageContainer.error('Qty Permintaan Tidak Boleh Melebihi Stok');
					} else {
						if (parseInt(e.qtykirim) > e.qtyProduk) {
							e.qtykirim = e.stock;
							window.messageContainer.error('Qty Tidak Boleh Melebih Permintaan')
						} else {
							var dataTemp = {
								"produkId": e.idProduk,
								"jumlah": parseInt(e.qtykirim),
								"keteranganLainnya": e.ket
							}
							TemporarySave.push(dataTemp);
						}
					}

				});
				if ($scope.item.Penerima == undefined) {
					toastr.warning('Penerima Belum diisi', 'Gagal Save')
				} else {
					var data = {
						"noStruk": $scope.item.NomorDistribusi,
						"tglOrder": TanggalDistribusi,
						"pegawaiOrderId": $scope.item.Penerima.id,
						"ruanganId": $scope.item.tujuanRuangan,
						"keterangan": $scope.item.keterangan,
						"noRecPengambilanLinenKotor": $scope.noRecPermintaan, //Maksudnya Norec permintaan
						"produkLinens": TemporarySave
					}
					ManageLaundry.saveSarpras(data, "laundry/save-distribusi-linen").then(function (e) {
						$scope.isRouteLoading = true;
						setTimeout(function () {
							window.location.href = '#/DaftarDistribusi';
						}, 300);
					});
				}
				console.log(JSON.stringify(data));


			}
		}
	]);
});