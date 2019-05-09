define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PermintaanLinenByRuanganCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.isRouteLoading = false;
			$scope.isShowPopUp = false;
			$scope.isShowPopUpDetail = false;
			$scope.item.tglambil = new Date();
			$scope.item.awal = new Date();
			$scope.item.akhir = new Date();
			$scope.item.tglstruk = new Date();
			$scope.item.tglterimakiriman = new Date();

			// $scope.declareAwal = function () {
			// 	ManageLaundry.getOrderList("laundry/get-permintaan-linen-bersih-detail?noRec=40288c8363afbc550163cde0088800af", true).then(function (dat) {
			// 		$scope.SubdataGrid = dat.data.item;
			// 	});
			// }
			// $scope.declareAwal();

			ManageSarpras.getOrderList("user/get-user").then(function (dat) {
				$scope.item.Pegawai = dat.data.data.pegawai.namaLengkap;
				$scope.item.petugasId = dat.data.data.pegawai.id;
			});

			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: []
			});

			$scope.daftarTempLinen = new kendo.data.DataSource({
				data: [],
				pageSize: 1,
				schema: {
					no: { type: "number" },
					namaProduk: { type: "string" },
					jumlah: { type: "number" },
					namaSatuan: { type: "string" },
				},
				columns: $scope.mainGridOptionsLinen
			});

			//Get No Struk
			$scope.NoStruks = function () {
				ManageLaundry.getOrderList("laundry/generate-no-struk/", true).then(function (dat) {
					$scope.item.noOrder = dat.data.data.noStruk;
				});
			}
			$scope.NoStruks();

			//Get All Satuan
			ManageSarpras.getOrderList("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function (dat) {
				var dataSatuanLaundry = [];
				var dataTemp = [];
				for(var i = 0; i < dat.data.length; i++) {					
					if(dat.data[i].satuanStandar == 'Lembar' || dat.data[i].satuanStandar == 'lembar' ||
					   dat.data[i].satuanStandar == 'Stel' || dat.data[i].satuanStandar == 'stel') {
						   dataTemp = {
							   id: dat.data[i].id,
							   satuanStandar: dat.data[i].satuanStandar
						   }
						   dataSatuanLaundry.push(dataTemp);
					   }
					
				}
				console.log(dataSatuanLaundry);
				$scope.sourceSatuanStandar = dataSatuanLaundry;
			});


			//Get All Nama Linen For Pop Up
			ManageLaundry.getOrderList("laundry/get-produk-pelipatan").then(function (dat) {
				$scope.sourceLinen = dat.data.data;
			});

			//Pegawai
			ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
				$scope.dataMasterPetugas = dat.data;
			});

			$scope.ChangeDat = function () {
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Rubahdat = false;
				$scope.Init();
			}


			$scope.Init = function () {
				ManageSarpras.getOrderList("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function (dat) {
					// debugger
					$scope.item.IdRuangan = dat.data.id;
					$scope.item.ruangan = dat.data.namaRuangan;
				});
				// Get All Daftar				
				var awal = new moment($scope.item.awal).format('YYYY-MM-DD')
				var akhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
				ManageLaundry.getOrderList("laundry/get-permintaan-linen-bersih-oleh-ruangan?startDate=" + awal + "&endDate=" + akhir + '&idRuanganAsal=' + $scope.item.IdRuangan, true).then(function (dat) {
					var nomor = 1;
					// $scope.DataSource = dat.data.data;
					$scope.DataSource = new kendo.data.DataSource({
						data: dat.data.data,
						pageSize: 5
					})
					for (var i = 0; i < $scope.DataSource.length; i++) {
						$scope.DataSource[i].no = nomor++ + "."
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
			$scope.Init();



			$scope.number = 1;
			$scope.AddProduk = function (argument) {
				// debugger;
				if ($scope.item.Linen == undefined) {
					toastr.warning('Linen Tidak Tersedia')
				} else if($scope.item.satuanPop == undefined) {
					toastr.warning('Satuan Tidak Tersedia')
				}else {
					var DataTemp = {
						"no": $scope.number++,
						"noRecStrukPelayananDetail": $scope.noRecStrukPelayanan,
						"produkId": $scope.item.Linen.id,
						"namaProduk": $scope.item.Linen.namaProduk,
						"jumlah": $scope.item.jumlahPop,
						"satuanId": $scope.item.satuanPop.id,
						"namaSatuan": $scope.item.satuanPop.satuanStandar
					}
					if ($scope.item.Linen.id == undefined || $scope.item.Linen.id == '' && $scope.item.satuanPop.id == '' || $scope.item.satuanPop.id == undefined) {
						toastr.warning('Anda Belum Memilih Nama Linen atau Satuan');
					} else if ($scope.item.jumlahPop == '' || $scope.item.jumlahPop == undefined) {
						toastr.warning('Anda Belum Mengisi Qty Linen');
					} else {
						$scope.daftarTempLinen.add(DataTemp);
						$scope.item.jumlahPop = '';
						$scope.item.Linen = '';
					}
				}
			}

			ManageLaundry.getOrderList("laundry/get-produk-pelipatan").then(function (dat) {
				$scope.sourceLinen = dat.data.data;
			});

			ModelItem.getDataDummyGeneric("Ruangan", true, true, 10).then(function (data) {
				$scope.ruangans = data;
			});

			$scope.cancelData = function () {
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
			}

			var onDataBound = function () {
				$('td').each(function () {
					if ($(this).text() == "Belum Di Terima") { $(this).addClass('yellow') }
				});

			};

			//https://medium.com/coderupa/panduan-komplit-asynchronous-programming-pada-javascript-part-2-callback-3a717df6cfdf
			$scope.mainGridOptions = {
				toolbar: ["excel", "pdf"],
				pageable: true,
				// pageSize: 10,
				selectable: 'row',
				dataBound: onDataBound,
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
						"field": "nostruk",
						"title": "<h3 align=center>No Struk<h3>",
						"filterable": false,
						"width": "40px"
					},
					{
						"field": "namaRuanganAsal",
						"title": "<h3 align=center>Nama Ruangan<h3>",
						"filterable": false,
						"width": "40px"
					},
					{
						"field": "tglstruk",
						"title": "<h3 align=center>Tanggal Struk<h3>",
						"filterable": false,
						"width": "60px",
						// headerTemplate: '<label for="check-all"><h3 align=center>Tanggal Struk<h3></label><input style="width: 100%" kendo-date-picker k-ng-model="item.tglstruk" k-on-change="tanggalChange(item.tglstruk, 1)" placeholer="dd-MM-yyyy" k-format="dd-MM-yyyy" />'
						//headerTemplate: '<label for="check-all"><h3 align=center>Tanggal Struk<h3></label><input style="width: 100%" kendo-date-picker k-ng-model="item.tglstruk" placeholer="dd-mm-yyyy" k-format="dd-MM-yyyy" k-on-change="tanggalChange(item.tglstruk, 1)"/>'	
					},
					{
						"field": "tglterimakiriman",
						"title": "<h3 align=center>Tanggal Terima<h3>",
						"filterable": false,
						"width": "60px",
						// headerTemplate: '<label for="check-all"><h3 align=center>Tanggal Terima<h3></label><input style="width: 100%" kendo-date-picker k-ng-model="item.tglterimakiriman" k-on-change="tanggalChange(item.tglterimakiriman, 2)" placeholer="dd-MM-yyyy" />'
					},
					{
						"field": "namaMenyerahkan",
						"title": "<h3 align=center>Pegawai Ruangan<h3>",
						"filterable": true,
						"width": "90px"
					},
					{
						"field": "namaPenerima",
						"title": "<h3 align=center>Petugas laundry<h3>",
						"filterable": false,
						"width": "90px"
					},
					/*			{
									"field": "qtyproduk",
									"title": "<h3 align=center>Qty<h3>",	
									"width" : "30px",
									"filterable":false,
								}, */
					{
						"field": "ket",
						"title": "<h3 align=center>Keterangan<h3>",
						"width": "80px",
						"filterable": false,
					},
					{
						"field": 'detail',
						"width": "50px",
						"title": "<h3 align=center>Detail<h3>",
						attributes: {
							style: "text-align:center;valign=middle"
						},
						command: [
							{
								name: 'Detail Linen',
								click: function (e) {
									e.preventDefault();
									var grid = $('#kGrid').data('kendoGrid');
									var item = grid.dataItem($(e.target).closest('tr'));
									var popUp = $('#popUpDetail').data('kendoWindow');
									console.log(item);
									ManageLaundry.getOrderList("laundry/get-permintaan-linen-bersih-detail?noRec=" + item.noRec, true).then(function (dat) {

										$scope.detailPermintaanLinen = new kendo.data.DataSource({
											data: dat.data.item,
											pageSize: 15
										})
										
									});
									popUp.open().center();
								}
							},
						]
					}
				]
			};

			$scope.mainGridOptions_1_2 = function (dataItem) {
				// debugger
				$rootScope.$apply(function () {
					ManageLaundry.getOrderList("laundry/get-permintaan-linen-bersih-detail?noRec=" + dataItem.noRec, true).then(function (dat) {
						// debugger
						$scope.SubdataGrid = dat.data.item;
					});
				})

				return {
					dataSource: {
						data: $scope.SubdataGrid,
						pageSize: 20,
					},
					filterable: {
						extra: false, operators: { string: { startsWith: "Pencarian" } }
					},
					pageable: true,
					scrollable: true,
					shortable: true,
					columns:
						$scope.columns = [
							{
								"field": "namaExternal",
								"title": "<h3 align=center>Jenis Linen<h3>",
								"width": "120px",
								"filterable": true,
								editable: false
							},
							{
								"field": "qtyProduk",
								"title": "<h3 align=center>Qty Permintaan<h3>",
								"width": "50px",
								"filterable": false
							},
							{
								"field": "satuan",
								"title": "<h3 align=center>Satuan<h3>",
								"width": "60px",
								"filterable": false
							}
						]
				}

			};

			$scope.mainGridOptionsDetailLinen = {
				pageable: true,
				selectable: 'row',
				scrollable: true,
				columns: $scope.columnsDetail
			}

			$scope.columnsDetail = [
				{
					"field": "namaExternal",
					"title": "<h3 align=center>Jenis Linen<h3>",
					"width": "120px",
					"filterable": true,
					"editable": false
				},
				{
					"field": "qtyProduk",
					"title": "<h3 align=center>Qty Permintaan<h3>",
					"width": "50px",
					"filterable": false
				},
				{
					"field": "satuan",
					"title": "<h3 align=center>Satuan<h3>",
					"width": "60px",
					"filterable": false
				}
			]

			$scope.tanggalChange = function (a, b) {
				var q = new moment(a).format("YYYY-MM-DD");
				var grid = $("#kGrid").data("kendoGrid");
				if (b == 1) {
					// debugger
					grid.dataSource.query({
						filter: {
							logic: "or",
							filters: [
								{ field: "tglstruk", operator: "contains", value: q },
							]
						}
					})
				} else {
					grid.dataSource.query({
						filter: {
							logic: "or",
							filters: [
								{ field: "tglterimakiriman", operator: "contains", value: q },
							]
						}
					})
				}
			}
			

			$scope.mainGridOptionsLinen = {
				// pageSize: 5,
				pageable: true,
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
						"title": "<h3 align=center>No<h3>",
						"filterable": false,
						"width": "20px"
					},
					{
						"field": "namaProduk",
						"title": "<h3 align=center>Nama Linen<h3>",
						"filterable": true,
						"width": "100px"
					},
					{
						"field": "jumlah",
						"title": "<h3 align=center>jumlah<h3>",
						"filterable": true,
						"width": "100px",
					},
					{
						"field": "namaSatuan",
						"title": "<h3 align=center>Satuan<h3>",
						"filterable": false,
						"width": "40px"
					},
					{
						command: {
							text: "Hapus",
							width: "70px",
							align: "center",
							click: $scope.ChangeDataParentandRemoveRow
						},
						title: "<h3 align=center>Action</h3>",
						width: "80px"
					}
				]
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


			$scope.ClearCari = function () {
				$scope.item.awal = $scope.now;
				$scope.item.akhir = $scope.now;
				$scope.item.pencarian = "";
				var gridData = $("#kGrid").data("kendoGrid");
				gridData.dataSource.filter({});
				$scope.Init();
			}

			$scope.ChangeDataParentandRemoveRow = function (e) {
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var data = this.dataItem(tr);
				$scope.CurrentIdprosesCuci = data.idprosesCuci;
				$scope.CurrentprosesCuci = data.prosesCuci;
				$scope.tempData = $scope.daftarTempLinen
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				grid.removeRow(row);
			};

			$scope.Batal = function (argument) {
				// body...
				$state.go("home");
				$scope.item = {};
			}

			$scope.OpenWindow = function () {
				// debugger
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").open();
				$scope.isShowPopUp = true;

			}


			$scope.Save = function () {
				// debugger
				var DataTmpProdukLinen = []
				var Tanggal = new moment($scope.item.tglambil).format('YYYY-MM-DD');
				$scope.daftarTempLinen._data.forEach(function (e) {
					// debugger

					var ProdukLinen = {
						//"noRecStrukPelayananDetail":"2c90e3e5614ba5b401614ba9bd710001", 
						"produkId": e.produkId,
						"namaProduk": e.namaProduk,
						"jumlah": e.jumlah,
						"satuanId": e.satuanId,
						"namaSatuan": e.namaSatuan
					}
					DataTmpProdukLinen.push(ProdukLinen);
				});

				var data = {
					"noRecStrukPelayanan": $scope.noRecStrukPelayanan,
					"noStruk": $scope.item.noOrder,
					"tglOrder": Tanggal,
					"pegawaiOrderId": $scope.item.petugasId,
					// "ruanganAsalId":$scope.item.ruanganAsal.id,
					"ruanganAsalId": $scope.item.IdRuangan,
					"berat": 0, //<== Berat belum di pakai
					"satuanId": $scope.item.satuan.id,
					"namaSatuan": $scope.item.satuan.satuanStandar,
					"produkLinens": DataTmpProdukLinen
				}

				ManageLaundry.saveMasterAlatLaundry(data, "laundry/save-penerimaan-linen-internal").then(function (e) {
					$scope.item = {};
					$scope.item.awal = $scope.now;
					$scope.item.akhir = $scope.now;
					$scope.item.tglambil = $scope.now;
					// $scope.Init();					
					$scope.NoStruks();
					if ($scope.item.ruangan == 'Laundry') {
						$scope.isRouteLoading = true;
						setTimeout(function () {
							window.location.href = '#/DaftarPermintaanLinenDariRuangan'
						}, 5000)

					} else {
						$scope.isRouteLoading = true;
						toastr.success('Terima Kasih Telah Menggunakan Layanan Kami, Proses Permintaan Linen Selesai')
						window.location.href = '#/home'
					}

				});
			};
		}
	]);
});