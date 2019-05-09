define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PengambilanLinenIntCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.isShowPopUp = false;
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;

			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: []
			});

			$scope.ChangeDat = function () {
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Rubahdat = false;
				$scope.Init();
			}




			//Get No Struk
			$scope.NoStruks = function () {
				ManageLaundry.getOrderList("laundry/generate-no-struk/", true).then(function (dat) {
					$scope.item.noOrder = dat.data.data.noStruk;
				});
			}
			$scope.NoStruks();


			//Get Ruangan
			ModelItem.getDataDummyGeneric("Ruangan", true, true, 10).then(function (data) {
				$scope.ruangans = data;
			});


			//Get All Satuan
			ManageSarpras.getOrderList("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function (dat) {
				$scope.sourceSatuanStandar = dat;
			});

			//Pegawai
			ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
				$scope.dataMasterPetugas = dat.data;
			});


			$scope.Init = function () {
				// Get All Daftar 
				debugger
				var tanggalAwal = new moment($scope.item.awal).format('YYYY-MM-DD');
				var tanggalAkhir = new moment($scope.item.akhir).format('YYYY-MM-DD');

				ManageLaundry.getOrderList("laundry/get-pengambilan-linen-kotor?startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir).then(function (dat) {
					var nomor = 1;
					$scope.DataSource = dat.data.data;
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

			var onDataBound = function () {
				debugger
				$('td').each(function () {
					if ($(this).text() == "Belum Di Terima") { $(this).addClass('yellow') }
				});

			};

			$scope.mainGridOptions = {
				toolbar: ["excel", "pdf"],
				pageable: true,
				pageSize: 10,
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
						"field": "no",
						"title": "<h3 align=center>No<h3>",
						"filterable": false,
						"width": "10px",
						"attributes": { class: "text-center" }
					},
					{
						"field": "nostruk",
						"title": "<h3 align=center>No Struk<h3>",
						"filterable": false,
						"width": "30px"
					},
					{
						"field": "tglstruk",
						"title": " Tamggal Pengamnilan",
						"filterable": false,
						"width": "60px",
						// headerTemplate: '<label for="check-all"><h3 align=center>Tanggal Pengambilan<h3></label><input style="width: 100%" kendo-date-picker value="now" k-ng-model="item.tglstruk" k-on-change="tanggalChange(item.tglstruk, 1)" placeholer="dd-MM-yyyy" k-format="dd-MM-yyyy" />'
					},
					{
						"field": "namaPenerima",
						"title": "<h3 align=center>Petugas laundry<h3>",
						"filterable": false,
						"width": "100px"
					},
					{
						"field": "qtyproduk",
						"title": "<h3 align=center>Berat<h3>",
						"width": "15px",
						"filterable": false,
						"attributes": {
							class: "text-center"
						}
					},
					{
						"field": "ket",
						"title": "<h3 align=center>Keterangan<h3>",
						"width": "50px",
						"filterable": false,
						"attributes": {
							class: "text-left"
						}
					}]
			};

			$scope.tanggalChange = function (a, b) {
				var q = new moment(a).format("YYYY-MM-DD");
				var grid = $("#kGrid").data("kendoGrid");
				if (b == 1) {
					debugger
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
				$scope.item.awal = new Date();
				$scope.item.akhir = new Date();
				$scope.Init();
				$scope.item.pencarian = "";
				var gridData = $("#kGrid").data("kendoGrid");
				gridData.dataSource.filter({});
			}

			$scope.ChangeDataParentandRemoveRow = function (e) {
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var data = this.dataItem(tr);
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



			$scope.Save = function () {
				debugger
				var Tanggal = new moment($scope.item.tglambil).format('YYYY-MM-DD');
				var data = {
					"noRecStrukPelayanan": $scope.noRecStrukPelayanan,
					"noStruk": $scope.item.noOrder,
					"tglOrder": Tanggal,
					"pegawaiOrderId": $scope.item.Pegawai.id,
					"ruanganAsalId": $scope.item.ruanganAsal.id,
					"berat": $scope.item.berat,
					"satuanId": $scope.item.satuan.id,
					"namaSatuan": $scope.item.satuan.satuanStandar
					//"produkLinens": DataTmpProdukLinen
				}
				//ManageSarpras.saveMasterAlatLaundry(data,"laundry/save-penerimaan-linen-internal").then(function (e) {
				ManageLaundry.saveMasterAlatLaundry(data, "laundry/save-pengambilan-linen-internal").then(function (e) {
					$scope.item.awal = new Date();
					$scope.item.akhir = new Date();
					$scope.item = {};
					$scope.Init();
					$scope.NoStruks();
				});
			};
		}
	]);
});