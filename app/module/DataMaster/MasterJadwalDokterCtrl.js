define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterJadwalDokterCtrl', ['$q', '$rootScope', '$scope', 'ManageSarprasPhp', '$state', 'CacheHelper', 'DateHelper', 'ModelItemAkuntansi',
		function ($q, $rootScope, $scope, manageSarprasPhp, $state, cacheHelper, dateHelper, modelItemAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.item.id = "";
			loadComboPopup();
			loadData();
			$scope.isRouteLoading = false;

			modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai", true, true, 20).then(function (data) {
				$scope.listdokter = data;
			});

			$scope.columnGrid = {
				toolbar: [
					"excel",
					{
						name: "create",
						text: "Buat Jadwal",
						template: '<button ng-click="createNew()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Jadwal</button>'
					},
				],
				excel: {
					fileName: "Jadwal Dokter.xlsx",
					allPages: true,
				},
				excelExport: function (e) {
					var sheet = e.workbook.sheets[0];
					sheet.frozenRows = 2;
					sheet.mergedCells = ["A1:D1"];
					sheet.name = "Orders";

					var myHeaders = [{
						value: "Jadwal Dokter",
						fontSize: 20,
						textAlign: "center",
						background: "#ffffff",
						// color:"#ffffff"
					}];

					sheet.rows.splice(0, 0, {
						cells: myHeaders,
						type: "header",
						height: 70
					});
				},
				sortable: false,
				reorderable: true,
				filterable: false,
				pageable: true,
				columnMenu: false,
				resizable: true,
				selectable: 'row',
				columns: [{
						field: "namaruangan",
						title: "Ruangan",
						width: "250px"
					},
					{
						field: "namahari",
						title: "Hari",
						width: "100px"
					},
					{
						field: "jampraktek",
						title: "Jam Praktek",
						width: "100px"
					},
					{
						field: "namalengkap",
						title: "Dokter",
						width: "300px"
					},
					{
						field: "quota",
						title: "quota",
						width: "75px"
					},
					{
						field: "status",
						title: "Status",
						width: "75px"
					},
					{
						command: [{
							text: "Edit",
							width: "40px",
							align: "center",
							attributes: {
								align: "center"
							},
							click: changeRow,
							imageClass: "k-icon k-i-pencil"
						}, {
							text: "Hapus",
							width: "40px",
							align: "center",
							attributes: {
								align: "center"
							},
							click: removeRow,
							imageClass: "k-icon k-delete"
						}],
						title: "",
						width: "100px",
					}
				],
				sortable: {
					mode: "single",
					allowUnsort: false,
				},
				pageable: {
					messages: {
						display: "Menampilkan {0} - {1} data dari {2} data"
					},
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				}
			};


			function removeRow(e) {

				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var dataItem = this.dataItem(tr);

				var dataObjPost = {};

				dataObjPost = {
					id: dataItem.id
				}
				manageSarprasPhp.saveDataTransaksi("jadwaldokter/delete-jadwal", dataObjPost).then(function (e) {
					if (e.status === 201) {
						loadData();
						grid.removeRow(row);
					}
					$scope.ClearData();
				})
			}

			function changeRow(e) {
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var dataItem = this.dataItem(tr);
				$scope.item.id = dataItem.id;
				$scope.item.ruangan2 = {
					id: dataItem.idruangan,
					namaruangan: dataItem.namaruangan
				};
				$scope.item.isAktif = dataItem.status === "Aktif" ? true : false;
				$scope.item.hari2 = {
					id: dataItem.idhari,
					namahari: dataItem.namahari
				};
				// $scope.listDokter.add({
				// 	id: dataItem.idpeg,
				// 	namalengkap: dataItem.namalengkap
				// });
				$scope.item.dokter = {
					id: dataItem.idpeg,
					namalengkap: dataItem.namalengkap
				};
				$scope.item.jam = {
					id: dataItem.idjampraktek,
					jampraktek: dataItem.jampraktek
				};
				$scope.item.quota = dataItem.quota;
				$scope.popUpJadwal.center().open();

			}


			$scope.ClearData = function () {
				$scope.item = {};
				loadData();
			}

			$scope.SearchData = function () {
				loadData();
			}

			$scope.createNew = function () {
				clearField();
				$scope.popUpJadwal.center().open();
				// Get current actions
				var actions = $scope.popUpJadwal.options.actions;
				// Remove "Close" button
				actions.splice(actions.indexOf("Close"), 1);
				// Set the new options
				$scope.popUpJadwal.setOptions({
					actions: actions
				});
			};

			function loadComboPopup() {

				clearField();
				manageSarprasPhp.getDataTableMaster("jadwaldokter/get-drop-down-jadwal")
					.then(function (data) {
						$scope.listRuangan = data.data.dataruangan;
						$scope.listHari = data.data.datahari;
						$scope.listJam = data.data.datajadwal;
					});

				modelItemAkuntansi.getDataDummyPHP("jadwaldokter/get-drop-down-pegawai", true, true, 10).then(function (data) {
					$scope.listDokter = data;
				});
			}

			function clearField() {
				$scope.item.id = "";
				$scope.item.ruangan2 = "";
				$scope.item.hari2 = "";
				$scope.item.dokter = "";
				$scope.item.jam = "";
				$scope.item.quota = "";
			}

			$scope.batal = function () {
				clearField();
				$scope.popUpJadwal.close();
				//loadCombo()
			};

			$scope.Save = function () {
				$scope.isRouteLoading = true;
				if ($scope.item.ruangan2 == "") {
					toastr.error("ruangan belum diisi!");
					return;
				}
				if ($scope.item.hari2 == "") {
					toastr.error("hari belum diisi!");
					return;
				}
				if ($scope.item.dokter == "") {
					toastr.error("dokter belum diisi!");
					return;
				}
				if ($scope.item.jam == "") {
					toastr.error("jam belum diisi!");
					return;
				}
				if ($scope.item.quota == "") {
					toastr.error("quota belum diisi!");
					return;
				}

				var dataObjPost = {};

				dataObjPost = {
					id: $scope.item.id,
					quota: $scope.item.quota,
					idruangan: $scope.item.ruangan2.id,
					idjadwalpraktek: $scope.item.jam.id,
					idpegawai: $scope.item.dokter.id,
					idhari: $scope.item.hari2.id,
					status: $scope.item.isAktif ? "Aktif" : "Tdk Aktif"
				}
				manageSarprasPhp.saveDataTransaksi("jadwaldokter/save-jadwal", dataObjPost).then(function (e) {
					$scope.isRouteLoading = false;
					$scope.popUpJadwal.close();
				})
				$scope.ClearData();
				loadData()
			}

			function loadData() {
				$scope.isRouteLoading = true;
				var rd = ""
				if ($scope.item.ruangan != undefined) {
					rd = $scope.item.ruangan.id
				};
				var hr = ""
				if ($scope.item.hari != undefined) {
					hr = $scope.item.hari.id
				};
				$scope.isRouteLoading = true;
				manageSarprasPhp.getDataTableTransaksi("humas/get-data-jadwal?ruangan=" + rd + "&hari=" + hr + "&dokterId=" + ($scope.item.dokter ? $scope.item.dokter.id : '')).then(function (data) {
					$scope.isRouteLoading = false;

					$scope.dataSource = {
						data: data.data,
						_data: data.data,
						pageSize: 30,
						selectable: true,
						refresh: true,
						total: data.data.length,
						serverPaging: false,
					};
				});
			};

			///end
		}
	]);
});