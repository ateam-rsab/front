define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MapPaketToProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService', 'ManageSdmNew',
		function ($q, $rootScope, $scope, IPSRSService, ManageSdmNew) {
			$scope.item = {};
			$scope.isRouteLoading = false;
			$scope.isEdit = false;
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				ManageSdmNew.getListData("pelayanan/all-paket-produk", true).then(function (dat) {
					$scope.listDataMaster = dat.data.data;

					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true
					});
				})
				// IPSRSService.getFieldsMasterTable("get-data-master?className=MapPaketToProduk", true).then(function (dat) {
				// 	$scope.listDataMaster = dat.data.data.MapPaketToProduk;
				// 	$scope.dataSource = new kendo.data.DataSource({
				// 		pageSize: 10,
				// 		data: $scope.listDataMaster,
				// 		autoSync: true
				// 	});
				// });
			}

			init();

			$scope.columnProduk = [
				{
					"field": "No",
					"title": "No"
				},
				{
					"field": "namaAkun",
					"title": "nama Akun"
				},
				{
					"field": "kodeAkun",
					"title": "kode Akun"
				},
				{
					"field": "ketAkun",
					"title": "ket Akun"
				},
				{
					"field": "reportDisplay",
					"title": "report Display"
				},
				{
					"field": "kodeExternal",
					"title": "kode External"
				},
				{
					"field": "namaExternal",
					"title": "nama External"
				},
				{
					"field": "statusEnabled",
					"title": "status Enabled"
				},
				{
					"title": "Action",
					"width": "200px",
					"template": "<button class='btnEdit' ng-click='enableData()'>Enable</button>" +
						"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				}
			];

			$scope.mainGridOptions = {
				pageable: true,
				columns: $scope.columnMapPaketToProduk,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			$scope.klikFunction = function () {
				ManageSdmNew.getListData("pelayanan/paket-to-produk?idMapping=" + $scope.current.idMapping, true).then(function (rs) {
					if (rs.data.data.idKelompokProduk) {
						$scope.item.kelompokproduk = {
							id: rs.data.data.idKelompokProduk,
							kelompokProduk: rs.data.data.kelompokProduk
						}
						$scope.idKelompokProduk = rs.data.data.idKelompokProduk;
					}

					if (rs.data.data.idJenisPaket) {
						$scope.item.jenispaket = {
							id: rs.data.data.idJenisPaket,
							jenisPaket: rs.data.data.jenisPaket
						}
						$scope.idJenisPaket = rs.data.data.idJenisPaket;
					}

					if (rs.data.data.idPaket) {
						$scope.idPaket = rs.data.data.idPaket;
						$scope.namaPaket = rs.data.data.namaPaket;
					}

					if (rs.data.data.idKelompokProduk) {
						$scope.idKelompokProduk = rs.data.data.idKelompokProduk;
						$scope.kelompokProduk = rs.data.data.kelompokProduk;
					}

					if (rs.data.data.idJenisProduk) {
						$scope.idJenisProduk = rs.data.data.idJenisProduk;
						$scope.jenisProduk = rs.data.data.jenisProduk;
					}

					if (rs.data.data.idDetailJenisProduk) {
						$scope.idDetailJenisProduk = rs.data.data.idDetailJenisProduk;
						$scope.detailJenisProduk = rs.data.data.detailJenisProduk;
					}

					if (rs.data.data.idProduk) {
						$scope.idProduk = rs.data.data.idProduk;
						$scope.namaProduk = rs.data.data.namaProduk;
					}

					if (rs.data.data.idSatuanStandar) {
						$scope.item.satuan = {
							id: rs.data.data.idSatuanStandar,
							satuanStandar: rs.data.data.satuanStandar
						}
					}

					$scope.defineList();
				})
			};

			$scope.defineList = function () {
				IPSRSService.getFieldListData("Paket&select=id,namaPaket&criteria=statusEnabled,jenisPaketId&values=true," + $scope.idJenisPaket + "&order=namaPaket:asc", true).then(function (dat) {
					$scope.listpaket = dat.data;
					$scope.item.paket = {
						id: $scope.idPaket,
						namaPaket: $scope.namaPaket
					}
				});
				IPSRSService.getFieldListData("JenisProduk&select=id,jenisProduk&criteria=statusEnabled,kelompokProduk.id&values=true," + $scope.idKelompokProduk + "&order=jenisProduk:asc", true).then(function (dat) {
					$scope.listjenisproduk = dat.data;
					$scope.item.jenisproduk = {
						id: $scope.idJenisProduk,
						jenisProduk: $scope.jenisProduk
					}
				});
				IPSRSService.getFieldListData("DetailJenisProduk&select=id,detailJenisProduk&criteria=statusEnabled,jenisProduk.id&values=true," + $scope.idJenisProduk + "&order=detailJenisProduk:asc", true).then(function (dat) {
					$scope.listdetailjenisproduk = dat.data;
					$scope.item.detailjenisproduk = {
						id: $scope.idDetailJenisProduk,
						detailJenisProduk: $scope.detailJenisProduk
					}
				});
				IPSRSService.getFieldListData("Produk&select=id,namaProduk&criteria=statusEnabled,detailJenisProduk.jenisProduk.kelompokProduk.id&values=true," + $scope.idKelompokProduk + "&order=namaProduk:asc", true).then(function (dat) {
					$scope.listproduk = dat.data;
					$scope.item.produk = {
						id: $scope.idProduk,
						namaProduk: $scope.namaProduk
					}

					$scope.isRouteLoading = false;
				});
			};

			//fungsi klik untuk edit
			$scope.klik = function (current) {
				$scope.isRouteLoading = true;
				$scope.isEdit = true;
				$scope.showEdit = true;
				$scope.current = current;
				// $scope.item.paket = current.paket;
				// $scope.item.paketId = current.paketId;
				// $scope.item.produk = current.produk;
				// $scope.item.produkId = current.produkId;
				// $scope.item.qtyProduk = current.qtyProduk;
				// $scope.item.satuan = current.satuan;
				// $scope.item.satuanId = current.satuanId;
				// $scope.item.id = current.id;
				// $scope.item.noRec = current.noRec;
				// $scope.item.reportDisplay = current.reportDisplay;
				// $scope.item.kodeExternal = current.kodeExternal;
				// $scope.item.namaExternal = current.namaExternal;
				// $scope.item.statusEnabled = current.statusEnabled;

				$scope.klikFunction();
			};

			$scope.disableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=MapPaketToProduk&&id=" + $scope.item.id + "&&statusEnabled=false").then(function (dat) {
					init();
				});
			};

			$scope.enableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=MapPaketToProduk&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
					init();
				});
			};

			$scope.activate = function () {
				if ($scope.current.statusAktif == "Aktif") {
					IPSRSService.getClassMaster("delete-master-table?className=MapPaketToProduk&&id=" + $scope.current.idMapping + "&&statusEnabled=false").then(function (dat) {
						init();
					});
				} else {
					IPSRSService.getClassMaster("delete-master-table?className=MapPaketToProduk&&id=" + $scope.current.idMapping + "&&statusEnabled=true").then(function (dat) {
						init();
					});
				}

			};

			// save 
			$scope.tambah = function () {
				if (!$scope.item.produk.satuanStandarId || $scope.item.produk.satuanStandarId == null) {
					toastr.warning('Belum setting satuan di master produk!');
					return
				}
					
				var data = {
					"class": "MapPaketToProduk",
					"listField": {
						"paket": $scope.item.paket,
						"paketId": $scope.item.paket.id,
						"produk": $scope.item.produk,
						"produkId": $scope.item.produk.id,
						// "qtyProduk": $scope.item.qtyProduk,
						"satuan": {
							"id": $scope.item.produk.satuanStandarId
						},
						"satuanId": $scope.item.produk.satuanStandarId,
						// "id": $scope.item.id,
						"reportDisplay": $scope.item.produk.namaProduk,
						// "kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.produk.namaProduk,
					}
				}
				IPSRSService.saveDataMaster(data, "save-master-table").then(function (e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};

				}, function (error) {
					toastr.warning('Mapping telah tersedia!');
					init();
					return
				});
			}

			// edit
			$scope.edit = function () {
				var data = {
					"class": "MapPaketToProduk",
					"listField": {
						"paket": $scope.item.paket,
						"paketId": $scope.item.paket.id,
						"produk": $scope.item.produk,
						"produkId": $scope.item.produk.id,
						// "qtyProduk": $scope.current.idMapping,
						"satuan": $scope.item.satuan,
						"satuanId": $scope.item.satuan.id,
						"id": $scope.current.idMapping,
						// "noRec": null,
						"reportDisplay": $scope.item.produk.namaProduk,
						// "kodeExternal": null,
						"namaExternal": $scope.item.produk.namaProduk,
						"statusEnabled": true
					}
				}
				IPSRSService.saveDataMaster(data, "update-master-table").then(function (e) {
					console.log(JSON.stringify(e.data));
					init();
				});
			}

			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.isEdit = false;

				$scope.item = {};
				$scope.listpaket = [];
				$scope.listjenisproduk = [];
				$scope.listdetailjenisproduk = [];
				$scope.listproduk = [];
			}

			IPSRSService.getFieldListData("JenisPaket&select=id,jenisPaket&criteria=statusEnabled&values=true&order=jenisPaket:asc", true).then(function (dat) {
				$scope.listjenispaket = dat.data;
			});

			IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk&criteria=statusEnabled&values=true&order=kelompokProduk:asc", true).then(function (dat) {
				$scope.listkelompokproduk = dat.data;
			});

			IPSRSService.getFieldListData("SatuanStandar&select=id,satuanStandar&criteria=statusEnabled&values=true&order=satuanStandar:asc", true).then(function (dat) {
				$scope.listsatuan = dat.data;
			});

			$scope.$watch('item.jenispaket', function (e) {
				if (!e) return;
				IPSRSService.getFieldListData("Paket&select=id,namaPaket&criteria=statusEnabled,jenisPaketId&values=true," + $scope.item.jenispaket.id + "&order=namaPaket:asc", true).then(function (dat) {
					$scope.listpaket = dat.data;
				});
			})

			$scope.$watch('item.kelompokproduk', function (e) {
				if (!e) return;
				IPSRSService.getFieldListData("JenisProduk&select=id,jenisProduk&criteria=statusEnabled,kelompokProduk.id&values=true," + $scope.item.kelompokproduk.id + "&order=jenisProduk:asc", true).then(function (dat) {
					$scope.listjenisproduk = dat.data;
				});
			})

			$scope.$watch('item.jenisproduk', function (e) {
				if (!e) return;
				IPSRSService.getFieldListData("DetailJenisProduk&select=id,detailJenisProduk&criteria=statusEnabled,jenisProduk.id&values=true," + $scope.item.jenisproduk.id + "&order=detailJenisProduk:asc", true).then(function (dat) {
					$scope.listdetailjenisproduk = dat.data;
				});
			})

			$scope.$watch('item.detailjenisproduk', function (e) {
				if (!e) return;
				IPSRSService.getFieldListData("Produk&select=id,namaProduk,satuanStandarId&criteria=statusEnabled,detailJenisProduk.id&values=true," + $scope.item.detailjenisproduk.id + "&order=namaProduk:asc", true).then(function (dat) {
					$scope.listproduk = dat.data;
				});
			})
		}
	]);
});
