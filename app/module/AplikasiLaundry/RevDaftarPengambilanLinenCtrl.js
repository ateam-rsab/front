define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('RevDaftarPengambilanLinenCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.Rubahdat = false;
			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: []
			});

			ManageSarpras.getOrderList("user/get-user").then(function (dat) {
				$scope.item.petugas = dat.data.data.namaUser;
				$scope.item.petugasid = dat.data.data.pegawai.id;
			});

			$scope.ChangeDat = function () {
				$scope.Rubahdat = false;
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Cari();
			}

			$scope.Cari = function (Pencarians) {
				var getPencarian = Pencarians;
				if (getPencarian == undefined && $scope.Rubahdat == false) {
					var tanggalawal = new moment(new Date($scope.item.awal)).format('YYYY-MM-DD');
					var tanggalakhir = new moment(new Date($scope.item.akhir)).format('YYYY-MM-DD');
					$scope.Numbers = 1;
					ManageLaundry.getOrderList("laundry/get-distribusi-linen-external?startDate=" + tanggalawal + "&endDate=" + tanggalakhir, true).then(function (dat) {
						$scope.sourceOrder = dat.data.data;
						for (var x = 0; x < $scope.sourceOrder.length; x++) {
							$scope.sourceOrder[x].no = $scope.Numbers++;
						}
					});
					$scope.Rubahdat = true;
				} else {
					$scope.CariPegawai(getPencarian);
				}
			}
			$scope.Cari();

			$scope.CariPegawai = function (getPencarian) {
				if (getPencarian != undefined) {
					var q = getPencarian;
					var grid = $("#grid").data("kendoGrid");
					grid.dataSource.query({
						page: 1,
						pageSize: 20,
						filter: {
							logic: "or",
							filters: [{ field: "noStruk", operator: "contains", value: q },
							{ field: "namaPelanggan", operator: "contains", value: q }]
						}
					});
				}
			}

			$scope.ClearCari = function () {
				$scope.Pencarians = "";
				var gridData = $("#grid").data("kendoGrid");
				gridData.dataSource.filter({});
			}

			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}
			$scope.Batal = function () {
				$state.go('home')
			}

			$scope.kl = function (current) {
				// debugger
				$scope.addData = [];
				$scope.statusBayar = current.statusBayar;
				$scope.totalHarga = 0;
				$scope.totalQty = 0;
				$scope.statusAmbil = current.statusAmbil
				$scope.item.noOrder = current.noStruk;
				$scope.item.qty = current.qtyProduk;
				$scope.item.tglOrder = current.tglOrder;
				$scope.item.penerima = current.namaPelanggan;
				$scope.item.berat = current.beratLinen;
				$scope.noRecStrukPelayanan = current.noRecStrukPelayanan;
				ManageLaundry.getOrderList("laundry/get-distribusi-linen-external-by-norec?noRec=" + $scope.noRecStrukPelayanan, true).then(function (dat) {
					var TempDataLinen = []
					$scope.sourceDetail = dat.data.detail
					$scope.Nomorss = 1;
					var TotalHarga = 0;
					var TotalQuantity = 0;
					for (var x = 0; x < $scope.sourceDetail.length; x++) {
						var jmlharga = ($scope.sourceDetail[x].qtyProduk * $scope.sourceDetail[x].hargasatuan);
						TotalHarga += (jmlharga * 1);
						TotalQuantity += ($scope.sourceDetail[x].qtyProduk * 1);
						var DataTemporary =
						{
							"no": $scope.Nomorss++,
							"idProduk": $scope.sourceDetail[x].produkId,
							"namaExternal": $scope.sourceDetail[x].satuanStandar,
							"namaProduk": $scope.sourceDetail[x].namaProduk,
							"qtyproduk": $scope.sourceDetail[x].qtyProduk,
							"idSatuan": $scope.sourceDetail[x].idSatuan,
							"hargasatuan": $scope.sourceDetail[x].hargasatuan,
							"jumlahHarga": jmlharga,
							"noRecStrukPelayananDetail": $scope.sourceDetail[x].noRecStrukPelayananDetail,
							"noRecStrukPelayanan": $scope.sourceDetail[x].noRecStrukPelayanan,
							"statCheckbox": false
						}
						TempDataLinen.push(DataTemporary);
						$scope.datalinen = TempDataLinen;
						$scope.Init();
					}
					var parseHargauang = $scope.formatRupiah(TotalHarga, 'Rp.');
					$scope.item.totalqty = TotalQuantity;
					$scope.item.totharga = parseHargauang;
				});
			}

			$scope.Init = function () {
				$scope.SourceOrderLinen = new kendo.data.DataSource({
					data: $scope.datalinen,
					batch: true,
					schema: {
						model: {
							id: "qtyProduk",
							fields: {
								qtyProduk: { editable: false }
							}
						}
					},
				});
				return $scope.SourceOrderLinen;
			}



			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.$watchGroup(['item.jmlpembayaran'], function (newValued) {
				var JumlahBayarKetik = newValued[0];
				var jmlBayar = parseInt(JumlahBayarKetik);
				var parseHargauang = $scope.formatRupiah(jmlBayar, 'Rp.');
				$scope.item.jmlpembayaran = parseHargauang;
			})

			$scope.$watch('item.biayaPerBulan', function () {
				$scope.ArrayCurency = parseInt($scope.item.biayaPerBulan);
			});

			var onDataBound = function () {
				$('td').each(function () {
					if ($(this).text() == "Belum Bayar") { $(this).addClass('green') }
				}
				);
				$('td').each(function () {
					if ($(this).text() == "Belum Di Ambil") { $(this).addClass('yellow') }
				})
			};


			$scope.mainGridOptions = {
				pageable: true,
				dataBound: onDataBound,
				pageSize: 10,
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
				columns: [
					{
						"field": "no",
						"title": "<h3 align=center>No. </h3>",
						"filterable": true,
						"width": "20px",
						"filterable": false
					},
					{
						field: "pelanggan", title: "<h2 align=center>Data Pelanggan Laundry Eksternal</h2>", headerAttributes: { style: "text-align : center" },
						columns: [
							{
								"field": "noStruk",
								"title": "<h3 align=center>No Order</h3>",
								"filterable": true,
								"width": "40px",
								"filterable": false
							},
							{
								"field": "tglOrder",
								"title": "<h3 align=center>Tanggal Order</h3>",
								"width": "100px",
								"filterable": false,
								"width": "100px",
								"filterable": false

							},
							{
								"field": "namaPelanggan",
								"title": "<h3 align=center>Nama Pelanggan</h3>",
								"width": "140px",
								"filterable": false
							},
							{
								"field": "beratLinen",
								"title": "<h3 align=center>Berat Linen</h3>",
								"width": "90px",
								"filterable": false
							},
							{
								"field": "statusAmbil",
								"title": "<h3 align=center>Status Ambil</h3>",
								"filterable": { search: true, multi: true },
								"width": "40px"
							},
							{
								"field": "statusBayar",
								"title": "<h3 align=center>Status Bayar</h3>",
								"width": "40px",
								"filterable": { search: true, multi: true }
							},
						],
						width: "200px",
						filterable: false
					},
				]
			};


			$scope.addData = [];
			$scope.CountTotal = function () {
				// debugger
				var quantityProduk = 0;
				var quantityJmlHarga = 0;
				for (var y = 0; y < $scope.addData.length; y++) {
					quantityProduk += ($scope.addData[y].qtyproduk * 1);
					quantityJmlHarga += ($scope.addData[y].jumlahHarga * 1);
				}
				$scope.totalHarga = quantityJmlHarga;
				$scope.totalQty = quantityProduk;
			}
			$scope.CountTotal();

			$scope.selectRow = function (dataItem) {
				//Jika Data Sama Disabled
				// debugger
				for (var y = 0; y < $scope.addData.length; y++) {
					if ($scope.addData[y].no == dataItem.no) {
						$scope.addData.splice(y, 1);
						return $scope.CountTotal();
					} else {
						$scope.CountTotal();
					}
				}


				var dataSelect = _.find($scope.SourceOrderLinen._data, function (data) {
					return data.no == dataItem.no;
				});

				if (dataSelect.statCheckbox) {
					dataSelect.statCheckbox = false;
				} else {
					dataSelect.statCheckbox = true;
				}

				var data = {
					"no": dataItem.no,
					"idProduk": dataItem.idProduk,
					"idSatuan": dataItem.idSatuan,
					"namaExternal": dataItem.namaExternal,
					"namaProduk": dataItem.namaProduk,
					"qtyproduk": dataItem.qtyproduk,
					"hargasatuan": dataItem.hargasatuan,
					"jumlahHarga": dataItem.jumlahHarga

				}
				$scope.addData.push(data);
				$scope.CountTotal();
			}


			$scope.mainGridOptions2 = {
				pageable: true,
				pageSize: 10,
				editable: false,
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
				columns: [
					{
						title: "<h3 align=center>✔<h3>",
						template: "# if (statCheckbox) { #" +
							"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
							"# } else { #" +
							"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
							"# } #",
						width: "6px"
					},
					{
						field: "no",
						title: "<h3 align=center>No.</h3>",
						width: "8px"
					},
					{
						field: "namaProduk",
						title: "<h3 align=center>Nama Bahan</h3>",
						width: "50px",
						editable: false,
					},
					{
						field: "namaExternal",
						title: "<h3 align=center>Satuan</h3>",
						width: "20px"
					},
					{
						field: "qtyproduk",
						title: "<h3 align=center>Qty</h3>",
						width: "15px"
					},
					{
						field: "hargasatuan",
						title: "<h3 align=center>Harga Satuan</h3>",
						width: "15px",
						"template": "{{formatRupiah('#: hargasatuan #', 'Rp.')}}"
					},
					{
						field: "jumlahHarga",
						title: "<h3 align=center>Jumlah Harga</h3>",
						width: "25px",
						"template": "{{formatRupiah('#: jumlahHarga #', 'Rp.')}}"
					}

				]

			};


			$scope.Save = function () {
				// debugger;
				if ($scope.statusBayar != undefined) {
					if ($scope.statusBayar == "Belum Bayar") {
						window.messageContainer.error('Transaksi Harus Di Bayar Terlebih dahulu !!');
					} else {
						if ($scope.statusAmbil == "Sudah Di Ambil") {
							window.messageContainer.error("Linen Sudah diambil");
						} else {
							$scope.addData.forEach(function (e) {
								var x = {
									"produkId": e.idProduk,
									"jumlah": e.qtyproduk
								}
								dataTempProduk.push(x);
							})
							//Cek Apakah Data Yang disimpan harus = jumlah yang di keluarkan??
							if (dataTempProduk.length == lengthdataLinen) {
								var data1 = {
									"noRecStrukPelayanan": $scope.noRecStrukPelayanan,
									"tglTerima": TanggalAmbil,
									"produkLinens": dataTempProduk
								}
								console.log(data1);
								if ($scope.item.tglambil != undefined) {
									ManageLaundry.saveMasterAlatLaundry(data1, "laundry/save-distribusi-linen-external").then(function (e) {
										$scope.Rubahdat = false;
										$scope.Cari();
										$scope.statusAmbil = "Sudah Di Ambil";
									});
								} else {
									window.messageContainer.error("Isi Tanggal Ambil terlebih dahulu");
								}

							} else {
								window.messageContainer.error("Data harus semua diambil");
							}
						}
					}
					var lengthdataLinen = $scope.SourceOrderLinen._data.length;
					var TanggalAmbil = new moment($scope.item.tglambil).format("YYYY-MM-DD");
					var dataTempProduk = [];
				} else {
					window.messageContainer.error('Pilih Data Pelanggan yang akan diambil terlebih dahulu');
				}
			};

		}
	]);
});