define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MapPegawaiToKatPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'IPSRSService', '$mdDialog', 'ManageIPSRS',
		function ($rootScope, $scope, ModelItem, $state, IPSRSService, $mdDialog, ManageIPSRS) {
			ModelItem.get("Kesling/LaporanUjiHasil").then(function (data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			},
				function errorCallBack(err) { });
			ManageIPSRS.getItemIPSRS("ipsrs-data-alat/get-jenis-produk", true).then(function (dat) {
				$scope.listKategoriPerbaikan = dat.data.data.listData;
			});

			$scope.mainGridOptions = {
				editable: "popup",
				pageable: true,
				height: 300,
				selectable: "row",
				columns: $scope.columnProduk,
				filterable: {
					extra: false,
					operators: {
						string: {
							startsWith: "Cari Pegawai",
						}
					}
				},
			};


			$scope.klikmapping = function (ambildata) {
				$scope.userName = ambildata.userName;
				$scope.idJenisProduk = ambildata.idJenisProduk;
				$scope.nameJenisProduk = ambildata.jenisProduk;
				$scope.idPegawai = ambildata.id;
				$scope.NorecGrid = ambildata.noRec;
				toastr.info("Username : " + $scope.userName + " Terpilih");
			}

			$scope.disableData = function () {
				var data = [];
				data.push({
					"pegawai": { id: this.dataItem.id },
					"jenisProduk": { "id": this.dataItem.idJenisProduk },
					"statusEnabled": false,
					"noRec": this.dataItem.noRec
				})
				console.log(JSON.stringify(data));
				ManageIPSRS.saveDataSarPras(data, "map-pegawai-ipsrs/save-map-pegawai-ipsrs").then(function (e) {
					$scope.fetchgridMapping();
				});

			}

			$scope.enableData = function () {
				debugger
				if ($scope.userName != undefined) {
					var data = [];
					data.push({
						"pegawai": { id: $scope.idPegawai },
						"jenisProduk": { "id": $scope.idJenisProduk },
						"statusEnabled": true,
						"noRec": $scope.NorecGrid
					})
					console.log(JSON.stringify(data));
					ManageIPSRS.saveDataSarPras(data, "map-pegawai-ipsrs/save-map-pegawai-ipsrs").then(function (e) {
						$scope.fetchgridMapping();
					});
				} else {
					window.messageContainer.error('Pilih Username terlebih dahulu !!!')
				}
			}


			$scope.enableData = function () {
				debugger;
				if ($scope.NamaLengkap != null || $scope.namaLengkap != undefined) {
					var data = [];
					for (var i = 0; i < $scope.dataSource._data.length; i++) {
						debugger
						if ($scope.dataSource._data[i].statCheckbox == true) {
							data.push({
								"pegawai": { id: $scope.dataSource._data[i].id },
								"jenisProduk": { "id": $scope.item.KategoriPerbaikan.id },
								"statusEnabled": $scope.dataSource._data[i].statCheckbox
							})
						}
					}
					console.log(JSON.stringify(data));
					ManageIPSRS.saveDataSarPras(data, "map-pegawai-ipsrs/save-map-pegawai-ipsrs").then(function (e) {
					});
				}
			}


			$scope.columnDataPegawai = [
				{
					"title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
					template: "# if (statCheckbox) { #" +
						"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
						"# } else { #" +
						"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
						"# } #",
					width: "50px"
				},
				{
					"field": "userName",
					"title": "<center style='font-size: 14px; font-weight: bold'><h3 align=center>User Name</h3></center>",
					"width": "350px"

				}
			];

			$scope.columnDataMapping = [
				{
					"field": "userName",
					"title": "<center style='font-size: 14px; font-weight: bold'><h3 align=center>User Name</h3></center>",
					"width": "150px"

				},
				{
					"field": "jenisProduk",
					"title": "<center style='font-size: 14px; font-weight: bold'><h3 align=center>Kategori</h3></center>",
					"width": "150px"

				},
				{
					"title": "<center style='font-size: 14px; font-weight: bold'><h3 align=center>Action</h3></center>",
					"width": "100px",
					"template": "<button class='btnHapus' ng-click='disableData()'>Unmapping</button>"
				}
				// {
				// "title": "<center style='font-size: 14px; font-weight: bold'>Action</center>",
				//  "width" : "100px",
				// 	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
				//           "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
				//     }
			];

			$scope.tutup = function () {
				$state.go("home")
			}

			$scope.fetchgridPegawai = function () {
				ManageIPSRS.getItemIPSRS("map-pegawai-ipsrs/get-group-pegawai-ipsrs", true).then(function (dat) {
					var daftarteknisi = dat.data.data.listData;
					for (var i = 0; i < daftarteknisi.length; i++) {
						daftarteknisi[i].statCheckbox = false;
						daftarteknisi[i].idplh = null;
					}
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 50,
						data: daftarteknisi,
						$scrollable: true,
						total: daftarteknisi.length
					});
					var grid = $('#kGrid').data("kendoGrid");
					grid.setDataSource($scope.dataSource);
					grid.refresh();
				})
			}
			$scope.fetchgridPegawai();


			$scope.fetchgridMapping = function () {
				$scope.isLoadingData = true;
				if ($scope.item.KategoriPerbaikan.id != undefined) {
					ManageIPSRS.getItemIPSRS("map-pegawai-ipsrs/get-list-pegawai-by-kategori?idJenis=" + $scope.item.KategoriPerbaikan.id, true).then(function (dat) {
						var daftarMapping = dat.data.data.listData;
						if (daftarMapping != undefined) {
							for (var i = 0; i < daftarMapping.length; i++) {
								daftarMapping[i].statCheckbox = false;
							}
							$scope.dataSourceMapping = new kendo.data.DataSource({
								pageSize: 50,
								data: daftarMapping,
								$scrollable: true,
							});


							for (var i = 0; i < daftarMapping.length; i++) {
								var tempId = daftarMapping[i].id;
								for (var y = 0; y < $scope.dataSource._data.length; y++) {
									if ($scope.dataSource._data[y].id != tempId) {
										var temps = $scope.dataSource._data[y].statCheckbox = false;
										$scope.dataSource._data[y].noRec = undefined;
									};
								}
							}
							for (var i = 0; i < daftarMapping.length; i++) {
								var tempNorec = daftarMapping[i].noRec
								var tempId = daftarMapping[i].id;
								for (var y = 0; y < $scope.dataSource._data.length; y++) {
									if ($scope.dataSource._data[y].id == tempId) {
										var temps = $scope.dataSource._data[y].statCheckbox = true;
										$scope.dataSource._data[y].noRec = tempNorec;
									};
								}
							}
							reloadDataGrid($scope.dataSource._data);
						} else {
							$scope.fetchgridPegawai();
							$scope.dataSourceMapping = [];
						}
					})
				}
				$scope.isLoadingData = false
			}

			$scope.selectRow = function (dataItem) {
				debugger;
				var dataSelect = _.find($scope.dataSource._data, function (data) {
					return data.id == dataItem.id;
				});

				if (dataSelect.statCheckbox) {
					dataSelect.statCheckbox = false;
					dataSelect.idplh = true;
				}
				else {
					dataSelect.statCheckbox = true;
					dataSelect.idplh = true;
				}


				reloadDataGrid($scope.dataSource._data);
			}

			var isCheckAll = false
			$scope.selectUnselectAllRow = function () {
				var tempData = $scope.dataSource._data;

				if (isCheckAll) {
					isCheckAll = false;
					for (var i = 0; i < tempData.length; i++) {
						tempData[i].statCheckbox = false;
						tempData[i].idplh = true;
					}
				}
				else {
					isCheckAll = true;
					for (var i = 0; i < tempData.length; i++) {
						tempData[i].statCheckbox = true;
						tempData[i].idplh = true;
					}
				}

				reloadDataGrid(tempData);

			}


			function reloadDataGrid(ds) {

				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});

				var grid = $('#kGrid').data("kendoGrid");

				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
			}

			var aktif = false;
			var aktif = 0;
			$scope.check = function () {
				debugger;
				if (aktif)
					aktif = 0;

				else
					aktif = 1;
			}


			$scope.Simpan = function () {
				if (($scope.item.KategoriPerbaikan != undefined)) {
					var confirm = $mdDialog.confirm()
						.title('Peringatan!')
						.textContent('Apakah anda akan Mapping data ini?')
						.ariaLabel('Lucky day')
						.ok('Ya')
						.cancel('Tidak')

					$mdDialog.show(confirm).then(function () {
						$scope.Save();
					})
				} else {
					window.messageContainer.error('Pilih Kategori Terlebih dahulu');
				}
			}

			$scope.Save = function () {
				var data = [];
				for (var i = 0; i < $scope.dataSource._data.length; i++) {
					if (($scope.dataSource._data[i].statCheckbox) && ($scope.dataSource._data[i].idplh == true)) {
						data.push({
							"pegawai": { id: $scope.dataSource._data[i].id },
							"jenisProduk": { "id": $scope.item.KategoriPerbaikan.id },
							"statusEnabled": $scope.dataSource._data[i].statCheckbox,
							"noRec": $scope.dataSource._data[i].noRec
						})
					} else if (($scope.dataSource._data[i].statCheckbox == false) && ($scope.dataSource._data[i].idplh == true)) {
						data.push({
							"pegawai": { id: $scope.dataSource._data[i].id },
							"jenisProduk": { "id": $scope.item.KategoriPerbaikan.id },
							"statusEnabled": $scope.dataSource._data[i].statCheckbox,
							"noRec": $scope.dataSource._data[i].noRec
						})
					}
				}
				console.log(JSON.stringify(data));
				ManageIPSRS.saveDataSarPras(data, "map-pegawai-ipsrs/save-map-pegawai-ipsrs").then(function (e) {
					$scope.fetchgridMapping();
				});
			}
		}

	]);
});