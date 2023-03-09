define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MasterJadwalDokterCtrl', ['$q', '$rootScope', '$scope', 'R', 'ManageSarprasPhp', '$state', 'CacheHelper', 'DateHelper', 'ModelItemAkuntansi',
		function ($q, $rootScope, $scope, r, manageSarprasPhp, $state, cacheHelper, dateHelper, modelItemAkuntansi) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.item.id = "";
			loadComboPopup();
			loadData();
			$scope.isRouteLoading = false;

			$scope.listJenisJadwal = [{
				nama: "Daftar Online",
				id: 1
			}, {
				nama: "Telekonsultasi",
				id: 2
			}]

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
					sheet.mergedCells = ["A1:G1"];

					var myHeaders = [{
						value: "Jadwal Dokter",
						fontSize: 20,
						textAlign: "center",
						background: "#ffffff",
					}];

					sheet.rows.splice(0, 0, {
						cells: myHeaders,
						type: "header",
						height: 70
					});
				},
				filterable: false,
				pageable: true,
				columnMenu: false,
				resizable: true,
				selectable: 'row',
				columns: [{
					field: "namaruangan",
					title: "Ruangan",
					width: "250px"
				}, {
					field: "namahari",
					title: "Hari",
					width: "100px"
				}, {
					field: "jampraktek",
					title: "Jam Praktek",
					width: "100px"
				}, {
					field: "namalengkap",
					title: "Dokter",
					width: "300px"
				}, {
					field: "jenis_jadwal",
					title: "Jenis Jadwal",
					width: "100px"
				}, {
					field: "quota",
					title: "quota",
					width: "75px"
				}, {
					field: "statusenabled_text",
					title: "Status",
					width: "75px"
				}, {
					command: [{
						text: "Edit",
						width: "40px",
						align: "center",
						attributes: { align: "center" },
						click: changeRow,
						imageClass: "k-icon k-i-pencil"
					}],
					title: "",
					width: "60px",
				}],
				pageable: {
					messages: { display: "Menampilkan {0} - {1} data dari {2} data" },
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				}
			};

			$scope.ubatStatus = function () {
				if ($scope.dataSelected == undefined) {
					window.messageContainer.error("Pilih jadwal terlebih dahulu!");
					return;
				}
				var dataObjPost = {
					id: $scope.dataSelected.id
				}
				if ($scope.dataSelected.statusenabled) {
					manageSarprasPhp.saveDataTransaksi("jadwaldokter/delete-jadwal", dataObjPost).then(function (e) {
						loadData();
					})
				} else {
					manageSarprasPhp.saveDataTransaksi("jadwaldokter/open-jadwal", dataObjPost).then(function (e) {
						loadData();
					})
				}
				$scope.dataSelected = undefined;
			}

			$scope.lihatBatalPraktek = function () {
				if ($scope.dataSelected == undefined) {
					window.messageContainer.error("Pilih jadwal terlebih dahulu!");
					return;
				}
				daftarBatalPraktek($scope.dataSelected);
				$scope.popUpBatal.center().open();
			}

			function daftarBatalPraktek(dataSelected) {
				let idDokter = dataSelected.idpeg;
				let jamPraktek = dataSelected.jampraktek;
				let hari = dataSelected.idhari;
				let idRuangan = dataSelected.idruangan;
				r.get({
					url: "https://pelayanan.rsabhk.co.id/pelayanan-service/praktek/batal?"
						+ "idDokter=" + idDokter + "&idRuangan=" + idRuangan + "&hari=" + hari + "&jamPraktek=" + jamPraktek
				}).then(function (data) {
					$scope.bDataSource = new kendo.data.DataSource({
						data: data.data,
						pageSize: 7,
					});
				});
			}

			$scope.bColumnGrid = {
				filterable: false,
				pageable: true,
				columnMenu: false,
				resizable: true,
				selectable: 'row',
				columns: [{
					field: "tglpraktek",
					title: "Tanggal Praktek",
					width: "100px"
				}, {
					field: "statusenabled",
					title: "Status Batal",
					width: "60px",
					template: "#if(statusenabled===true){# Batal #} else if(statusenabled===false){# Cancel Batal #}#"
				}, {
					command: [{
						text: "Cancel Batal",
						click: cancelBatal
					}],
					title: "",
					width: "50px",
				}],
				pageable: {
					messages: { display: "Menampilkan {0} - {1} data dari {2} data" },
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				}
			};

			$scope.klikGrid = function (dataSelected) {
				$scope.popUpBatal.close();
				$scope.popUpJadwal.close();
			}

			function cancelBatal(e) {
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
				if (dataItem.statusenabled === false) {
					toastr.warning("Sudah cancel batal praktek!");
					return;
				}
				cancelBatalPraktek(dataItem.norec);
			}

			function cancelBatalPraktek(norec) {
				var jsonSave = { "norec": norec };
				r.post({
					url: "https://pelayanan.rsabhk.co.id/pelayanan-service/praktek/batal/cancel"
				}, jsonSave).then(function (res) {
					$scope.popUpBatal.close();
				});
			}

			function changeRow(e) {
				e.preventDefault();
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
				$scope.item.isAktif = true;
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
			};

			$scope.Save = function () {
				$scope.isRouteLoading = true;
				if ($scope.item.ruangan2 == "") {
					window.messageContainer.error("ruangan belum diisi!");
					return;
				}
				if ($scope.item.hari2 == "") {
					window.messageContainer.error("hari belum diisi!");
					return;
				}
				if ($scope.item.dokter == "") {
					window.messageContainer.error("dokter belum diisi!");
					return;
				}
				if ($scope.item.jam == "") {
					window.messageContainer.error("jam belum diisi!");
					return;
				}
				if ($scope.item.quota == "") {
					window.messageContainer.error("quota belum diisi!");
					return;
				}
				var dataObjPost = {
					id: $scope.item.id,
					quota: $scope.item.quota,
					idruangan: $scope.item.ruangan2.id,
					idjadwalpraktek: $scope.item.jam.id,
					jenisjadwal: $scope.item.jenisJadwals.nama,
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
				var rd = $scope.item.ruangan != undefined ? $scope.item.ruangan.id : '';
				var hr = $scope.item.hari != undefined ? $scope.item.hari.id : '';
				var dr = $scope.item.dokter ? $scope.item.dokter.id : '';
				var jj = $scope.item.jenisJadwal ? $scope.item.jenisJadwal.nama : '';
				$scope.isRouteLoading = true;
				manageSarprasPhp.getDataTableTransaksi("humas/get-data-jadwal?ruangan=" + rd + "&hari=" + hr + "&dokterId=" + dr + "&jenisjadwal=" + jj)
					.then(function (data) {
						$scope.isRouteLoading = false;
						$scope.dataSource = new kendo.data.DataSource({
							data: data.data,
							pageSize: 30,
						});
					});
			};
		}
	]);
});
