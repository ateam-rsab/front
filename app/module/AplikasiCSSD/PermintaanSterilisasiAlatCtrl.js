define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PermintaanSterilisasiAlatCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'IPSRSService', 'ManageCSSD', 'DateHelper', '$mdDialog',
		function ($rootScope, $scope, ModelItem, ManageSarpras, IPSRSService, ManageCSSD, DateHelper, $mdDialog) {
			$scope.item = {};
			$scope.item.tglPermintaan = new Date();
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item.jenisPermintaan = 1;
			$scope.jenisPermintaan = [
				{ "id": 1, "name": "Internal" },
				{ "id": 2, "name": "Eksternal" }]
			ManageCSSD.getItem("cssd-sterilisasi/get-no-urut").then(function (dat) {
				$scope.item.noBundel = dat.data.noUrut;
			});
			$scope.NoOrderFresh = function () {
				ManageCSSD.getItem("cssd-sterilisasi/get-no-order").then(function (dat) {
					$scope.item.noOrder = dat.data.noOrderPerbaikan;
				});
			}
			$scope.NoOrderFresh();
			ManageCSSD.getItem("cssd-sterilisasi/get-paket/").then(function (dat) {
				$scope.listPaket = dat.data.data;
			});
			ManageCSSD.getItem("cssd-sterilisasi/get-produk-non-paket").then(function (dat) {
				$scope.listNonPaket = dat.data.data;
			});
			$scope.listRuangan = ModelItem.kendoHttpSource('service/list-generic/?view=Ruangan&select=namaRuangan,id', true);
			$scope.listPegawai = ModelItem.kendoHttpSource('service/list-generic/?view=Pegawai&select=namaLengkap,id', true);
			$scope.item.waktuSerahTerima = new Date();
			IPSRSService.getItem("service/list-generic/?view=CssdCaraSterilisasi&select=namaExternal,id").then(function (dat) {
				$scope.dataCheckbox = dat.data;
			});
			IPSRSService.getItem("service/list-generic/?view=CssdProsesSterilisasi&select=name,id").then(function (dat) {
				$scope.jenisBarang = dat.data;
			});
			$scope.dataPost = [];
			$scope.arrCaraSterilisasi = [];
			$scope.cekCaraSterilisasi = function (listId) {
				var idx = $scope.arrCaraSterilisasi.indexOf(listId);

				// is currently selected
				if (idx > -1) {
					$scope.arrCaraSterilisasi.splice(idx, 1);
				}

				// is newly selected
				else {
					$scope.arrCaraSterilisasi.push({ "idCaraSterilisasi": listId });
				}

				console.log(JSON.stringify($scope.arrCaraSterilisasi));
			};
			$scope.prosesSterilisasiEksternal = [
				{ id: 1, name: "Kemasan Siap Steril" },
				{ id: 2, name: "Pengemasan s/d Steril" },
				{ id: 3, name: "Dekontaminasi s/d Sterilisasi" }]
			$scope.arrInternal = [];
			$scope.arrBarangBersih = [];
			$scope.arrBarangKotor = [];
			$scope.cekArrInternal = function (listId) {
				var idx = $scope.arrInternal.indexOf(listId);

				// is currently selected
				if (idx > -1) {
					$scope.arrInternal.splice(idx, 1);
				}

				// is newly selected
				else {
					$scope.arrInternal.push(listId);
				}
				console.log('list arrInternal : ' + $scope.arrInternal);
			};


			$scope.detailPaket = function () {
				$scope.dataPost = [];
				ManageCSSD.getItem("cssd-sterilisasi/get-produk-by-paket/?paketId=" + $scope.item.paket.id, true).then(function (dat) {
					$scope.item.hargaSet = dat.data.data[0].harga;
					$scope.dataPost = [];
					$scope.dataSourcePaket = dat.data.data;
				});
			}


			$scope.toggleSelectAll = function (ev) {
				// debugger
				var grids = $('#kGrid').data("kendoGrid");
				var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
				var items = grid.dataSource.data();
				items.forEach(function (item) {
					item.selected = ev.target.checked;
					if (item.selected == true) {
						$scope.pilihBaris(item);
					} else {
						$scope.pilihBaris(item);
					}

				});
			};
			$scope.pilihBaris = function (dataItem) {
				var dataObj = {
					id: dataItem.id,
					namaProduk: dataItem.namaProduk,
					jumlah: dataItem.qtyProduk,
					satuan: dataItem.satuanStandar,
					satuanId: dataItem.satuanId,
					harga: dataItem.hargaSatuan
				}

				var isExist = _.find($scope.dataPost, function (dataExist) {
					if (
						dataExist.id == dataObj.id &&
						dataExist.namaProduk == dataObj.namaProduk &&
						dataExist.jumlah == dataObj.jumlah &&
						dataExist.satuan == dataObj.satuan &&
						dataExist.harga == dataObj.harga) {
						return true;
					} else {
						return undefined;
					}
				});

				if (isExist == undefined) {
					//if exist undefined add new array to datapost
					$scope.dataPost.push(dataObj);
				} else {
					//if exist remove array where datapost match
					$scope.dataPost = _.without($scope.dataPost, _.findWhere($scope.dataPost, {
						id: dataObj.id,
						namaProduk: dataObj.namaProduk,
						jumlah: dataObj.jumlah,
						satuan: dataObj.satuan,
						satuanId: dataObj.satuanId,
						harga: dataObj.harga
					}));
				}
			};
			$scope.getProduk = function () {
				// debugger
				$scope.dataId = [];
				$scope.dataNamaProduk = [];
				$scope.dataSatuan = [];
				$scope.dataSatuanId = []
				$scope.dataJumlah = [];
				$scope.dataHarga = [];
				for (var key in $scope.dataPost) {
					if ($scope.dataPost.hasOwnProperty(key)) {
						var element = $scope.dataPost[key];
						if (element.id != undefined) {
							$scope.dataId.push({ "id": element.id }),
								$scope.dataNamaProduk.push({ "namaProduk": element.namaProduk }),
								$scope.dataSatuan.push({ 
									"satuan": element.satuan,
									"satuanId": element.satuanId
								}),
								
								$scope.dataJumlah.push({ "jumlah": element.jumlah }),
								$scope.dataHarga.push({ "harga": element.harga })
						} else {
							var confirm = $mdDialog.confirm()
								.title('Peringatan!')
								.textContent('Data belum di pilih?')
								.ariaLabel('Lucky day')
								.ok('OK')

							$mdDialog.show(confirm).then(function () {
								//$scope.findData();
							});
						}
					}
				}
			};
			$scope.tambahPaket = function () {
				// debugger
				$scope.getProduk();
				// debugger
				if ($scope.item.jenisBarang == undefined) {
					window.messageContainer.error('Pilih Proses Sterilisasi')
				} else if ($scope.item.paket == undefined) {
					window.messageContainer.error('Harap Pilih Paket')
				} else if ($scope.item.spesifikasiPaket == undefined) {
					window.messageContainer.error('Harap Isi Spesifikasi')
				} else if ($scope.dataId.length == 0) {
					window.messageContainer.error('Harap Pilih Barang Yang Akan DiStrerilisasi')
				} else {
					for (var i = 0; i < $scope.dataId.length; i++) {
						/*	if(dataTemp.produkId == $scope.dataId[i].id){*/
						if ($scope.item.jenisBarang == 1) {
							var prosesSteril = "Dekontaminasi s/d Sterilisasi";
						} else if ($scope.item.jenisBarang == 2) {
							var prosesSteril = "Pengemasan s/d Steril";
						} else {
							var prosesSteril = "Kemasan Siap Steril";
						}
						var dataTemp = {
							"produkId": $scope.dataId[i].id,
							"noOrder": $scope.item.noOrder,
							"namaPaket": $scope.item.paket.namaPaket,
							"namaBarang": $scope.dataNamaProduk[i].namaProduk,
							"jumlah": $scope.dataJumlah[i].jumlah,
							"satuan": $scope.dataSatuan[i].satuan,
							"satuanId": $scope.dataSatuan[i].satuanId,
							"harga": $scope.dataHarga[i].harga,
							"prosesSterilisasi": prosesSteril,
							"spesifikasi": $scope.item.spesifikasiPaket
						};
						$scope.dataSourceSterelisasi.add(dataTemp);
					}
				}
			};




			$scope.tambahNonPaket = function () {
				// // debugger
				if ($scope.item.jenisBarang == undefined || $scope.item.jenisBarang == "") {
					window.messageContainer.error('Pilih Proses Sterilisasi');
				}
				else if ($scope.item.barangNonPaket == undefined || $scope.item.barangNonPaket == "") {
					window.messageContainer.error('Pilih Barang Non Paket');
				}
				else if ($scope.item.spesifikasiNonPaket == undefined || $scope.item.spesifikasiNonPaket == "") {
					window.messageContainer.error('Harap Isi spesifikasi');
				}
				else {
					var dataNonPaket = {
						"produkId": $scope.item.barangNonPaket.id,
						"noOrder": $scope.item.noOrder,
						"namaPaket": "NON PAKET",
						"namaBarang": $scope.item.barangNonPaket.namaProduk,
						"jumlah": $scope.item.jumlah,
						"harga": $scope.item.hargaInternal,
						"satuan": $scope.item.barangNonPaket.satuanStandar,
						"prosesSterilisasi": $scope.item.jenisBarang,
						"spesifikasi": $scope.item.spesifikasiNonPaket
					};
					$scope.dataSourceSterelisasi.add(dataNonPaket);
					$scope.item.barangNonPaket = "";
					$scope.item.jumlah = "";
					$scope.item.hargaInternal = "";
					$scope.item.spesifikasiNonPaket = "";
				}
			}
			$scope.gridPaket = {
				pageable: true,
				columns: [
					{
						width: "50px",
						title: "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
						template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='pilihBaris(dataItem)' </div>"
					},
					{ field: "namaProduk", title: "<h3 align=center>Nama Barang Re-Use<h3>" },
					{ field: "qtyProduk", title: "<h3 align=center>Jumlah<h3>" },
					{ field: "satuanStandar", title: "<h3 align=center>Satuan<h3>" },
					// { field: "harga", title: "<h3 align=center>Harga<h3>" }
				],
				editable: true
			};
			$scope.dataSourceSterelisasi = new kendo.data.DataSource({
				pageSize: 5,
				data: [],
				batch: true,
				schema: {
					model: {
						fields: {
							noOrder: { editable: false },
							namaPaket: { editable: false },
							namaBarang: { editable: false },
							jumlah: { type: "number", validation: { min: 0, required: true } },
							satuan: { editable: false },
							harga: { editable: false },
							spesifikasi: { editable: false },
							prosesSterilisasi: { editable: false }

						}
					}
				}
			});
			$scope.gridPermintaanSterilisasi = {
				pageable: true,
				toolbar: ["cancel"],
				columns: [
					{ field: "noOrder", title: "<h3 align=center>No Order<h3>", width: 100 },
					{ field: "namaPaket", title: "<h3 align=center>Nama Paket<h3>", width: 100 },
					{ field: "namaBarang", title: "<h3 align=center>Nama Barang<h3>", width: 200 },
					{ field: "jumlah", title: "<h3 align=center>Jumlah<h3>", width: 100 },
					{ field: "satuan", title: "<h3 align=center>Satuan<h3>", width: 100 },
					{ field: "harga", title: "<h3 align=center>Harga<h3>", width: 100 },
					{ field: "spesifikasi", title: "<h3 align=center>Spesifikasi<h3>", width: 100 },
					{ field: "prosesSterilisasi", title: "<h3 align=center>Proses Sterelisasi<h3>", width: 150 },
					{
						command:
						{
							text: "Hapus",
							click: $scope.removeItemGrid
						}, title: "", width: 100
					}
				],
				editable: true,
				selectable: true
			};
			$scope.removeItemGrid = function (e) {
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				grid.removeRow(row);
			};
			$scope.simpanInternal = function () {
				var listRawRequired = [
					"item.ruangan|k-ng-model|Ruangan",
					"item.linenBS|ng-model|Linen BS",
					"item.linenB|ng-model|Linen B",
					"item.linenS|ng-model|Linen S",
					"item.linenK|ng-model|Linen K",
					"item.pouchesBS|ng-model|Pouches BS",
					"item.pouchesB|ng-model|Pouches B",
					"item.pouchesS|ng-model|Pouches S",
					"item.pouchesK|ng-model|Pouches K",
					"item.namaPegawai|k-ng-model|Pegawai"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				var tanggal = DateHelper.getTanggalFormattedNew($scope.item.tglPermintaan)

				if ($scope.arrCaraSterilisasi.length == 0) {
					window.messageContainer.error('Cara Sterilisasi Belum Dipilih')
				} else {
					if (isValid.status) {
						var itemSterilisasi = [];
						for (var i = 0; i < $scope.dataSourceSterelisasi._data.length; i++) {
							var dataTemp =
							{
								"produkId":$scope.dataSourceSterelisasi._data[i].produkId,
								"qtyProduk": $scope.dataSourceSterelisasi._data[i].jumlah,
								"satuanId":$scope.dataSourceSterelisasi._data[i].satuanId,
								// "harga": $scope.dataSourceSterelisasi._data[i].harga,
								"spesifikasi": $scope.dataSourceSterelisasi._data[i].spesifikasi
							}
							itemSterilisasi.push(dataTemp);
						}
						// {
						// 	"ruanganAsalId":93,
						// 	"noOrder":"000088912",
						// 	"tanggal":"2018-10-29",
						// 	"cssdProsesSterilisasi" : {"id":1},
						// 	"petugasYangMenyerahkan" : {"id":567},
						// 	"cssdSterilisasiDetail": [
						// 		{"produkId":16386,"satuanId":179,"qtyProduk":1}, 
						// 		{"produkId":16447,"satuanId":179,"qtyProduk":1}
						// 	],
						// 	"cssdCaraSterilisasi":[
						// 		{"idCaraSterilisasi":1},
						// 		{"idCaraSterilisasi":2}
						// 	]
						// }
						var data = {
							"linenBs": $scope.item.linenBS,
							"linenB": $scope.item.linenB,
							"linenS": $scope.item.linenS,
							"linenK": $scope.item.linenK,
							"poucesBs": $scope.item.pouchesBS,
							"poucesB": $scope.item.pouchesB,
							"poucesS": $scope.item.pouchesS,
							"poucesK": $scope.item.pouchesK,
							"noOrder": $scope.item.noOrder,
							"ruanganAsalId": $scope.item.ruangan.id,
							"tanggal": tanggal,
							"cssdProsesSterilisasi": {
								"id": parseInt($scope.item.jenisBarang)
							},
							"petugasYangMenyerahkan": {
								"id": $scope.item.namaPegawai.id
							},
							"cssdCaraSterilisasi": $scope.arrCaraSterilisasi,
							"cssdSterilisasiDetail": itemSterilisasi
						}
						console.log(JSON.stringify(data))
						ManageCSSD.saveDataLocal(data, "cssd-sterilisasi/save-cssd-permintaan-sterilisasi-dari-ruangan/").then(function (e) {
							$scope.NoOrderFresh();
						});
					} else {
						ModelItem.showMessages(isValid.messages);
					}
				}
			}
			$scope.simpanEksternal = function () {
				var listRawRequired = [
					"item.namaRumahSakit|ng-model|Nama Rumah Sakit",
					"item.nama|ng-model|Nama",
					"item.alamat|ng-model|Alamat",
					"item.noTelepon|ng-model|No Telepon",
					"item.linenBS|ng-model|Linen BS",
					"item.linenB|ng-model|Linen B",
					"item.linenS|ng-model|Linen S",
					"item.linenK|ng-model|Linen K",
					"item.pouchesBS|ng-model|Pouches BS",
					"item.pouchesB|ng-model|Pouches B",
					"item.pouchesS|ng-model|Pouches S",
					"item.pouchesK|ng-model|Pouches K",
					"item.namaPegawai|k-ng-model|Pegawai"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
				var tanggal = DateHelper.getTanggalFormattedNew($scope.item.tglPermintaan)

				if ($scope.arrCaraSterilisasi.length == 0) {
					window.messageContainer.error('Cara Sterilisasi Belum Dipilih')
				} else {
					if (isValid.status) {
						var itemSterilisasi = [];
						for (var i = 0; i < $scope.dataSourceSterelisasi._data.length; i++) {
							var dataTemp =
							{
								"produk": {
									"id": $scope.dataSourceSterelisasi._data[i].produkId
								},
								"qtyProduk": $scope.dataSourceSterelisasi._data[i].jumlah,
								"harga": $scope.dataSourceSterelisasi._data[i].harga,
								"spesifikasi": $scope.dataSourceSterelisasi._data[i].spesifikasi
							}
							itemSterilisasi.push(dataTemp);
						}
						if ($scope.item.jenisPermintaan == 1) {
							var jenisCustomer = "internal"
						} else {
							var jenisCustomer = "exsternal"
						}
						var data = {
							"jenisCustomer": jenisCustomer,
							"namaRumahSakit": $scope.item.namaRumahSakit,
							"nama": $scope.item.nama,
							"alamat": $scope.item.alamat,
							"noTelepon": $scope.item.noTelepon,
							"tanggal": tanggal,
							"linenBs": $scope.item.linenBS,
							"linenB": $scope.item.linenB,
							"linenS": $scope.item.linenS,
							"linenK": $scope.item.linenK,
							"poucesBs": $scope.item.pouchesBS,
							"poucesB": $scope.item.pouchesB,
							"poucesS": $scope.item.pouchesS,
							"poucesK": $scope.item.pouchesK,
							"petugasYangMenyerahkan": {
								"id": $scope.item.namaPegawai.id
							},
							"ruangan": {
								"id": ""
							},
							"cssdProsesSterilisasi": {
								"id": parseInt($scope.item.jenisBarang)
							},
							"cssdCaraSterilisasi": $scope.arrCaraSterilisasi,
							"cssdSterilisasiDetail": itemSterilisasi
						}
						ManageCSSD.saveDataSarPras(data, "cssd-sterilisasi/save-cssd-sterilisasi/").then(function (e) {
							$scope.NoOrderFresh();
						});
					} else {
						ModelItem.showMessages(isValid.messages);
					}
				}
			}
			$scope.simpan = function () {
				if ($scope.item.jenisPermintaan == 1) {
					$scope.simpanInternal();
				} else {
					$scope.simpanEksternal();
				}
			}
		}
	]);
});


//======================================SOURCE DATA OLD=======================================================//
//ListPaket
/* ManageCSSD.getItem("cssd-permintaan-sterilisasi/get-reload-page", true).then(function(dat){
$scope.listPaket = dat.data.data.comboPaket.listPaket;
});*/

//List Ruangan
/*ManageCSSD.getItem("cssd-permintaan-sterilisasi/find-ruangan-pelayanan/", true).then(function(dat){
$scope.listRuangan = dat.data.data.data;
});*/

/*$scope.dataSourcePaket = new kendo.data.DataSource({
pageSize: 5,
data: $scope.listBarangPaket,
autoSync: true
});*/