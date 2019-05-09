define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('LaporanUjiHasilCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'MasterRekanan', 'TampilDataParameter', 'TampilDataSatuan', 'TampilDataBakuMutu', 'TampilDataLaporanUjiHasil', 'ManageSarpras',
		function ($q, $rootScope, $scope, ModelItem, MasterRekanan, TampilDataParameter, TampilDataSatuan, TampilDataBakuMutu, TampilDataLaporanUjiHasil, ManageSarpras) {
			$scope.isRouteLoading = true;
			var files;
            $scope.onSelectFile = function (e) {
                files = e.files
            }

			$scope.gridOptions = {
				dataSource: {
					data: [],
					schema: {
						model: {
							id: "rowNumber",
							fields: {
								rowNumber: { editable: false },
								parameter: {
									editable: true, validation: {
										validasiParameter: function (input) {
											if (input.is("[name='parameter']") && input.val() === "") {
												return false;
											}
											return true;
										}
									}, defaultValue: { id: 0, nama: "--Pilih parameter" }
								},
								satuanStandar: {
									editable: true, validation: {
										validasiSatuan: function (input) {
											if (input.is("[name='satuanStandar']") && input.val() === "") {
												return false;
											}
											return true;
										}
									}, defaultValue: { id: 0, satuanStandar: "--Pilih satuan" }
								},
								hasilUji: { editable: true, validation: { required: true } },
								bakumutu: {
									editable: true, validation: {
										validasiBakumutu: function (input) {
											if (input.is("[name='bakumutu']") && input.val() === "") {
												return false;
											}
											return true;
										}
									}, defaultValue: { id: 0, namaBakuMutu: "--Pilih baku mutu" }
								},
								metode: { editable: true, validation: { required: true } },
								keterangan: { editable: true, validation: { required: true } }
							}
						}
					}
				},
				toolbar: ['excel', 'pdf',
					{ name: "create", text: "Tambah" }
				],
				selectable: "row",
				scrollable: false,
				pageable: false,
				editable: { mode: "popup", window: { title: "Hasil Pengujian" } },
				columns: [
					{ field: "rowNumber", title: "#", hideMe: true },
					{ field: "parameter", title: "Parameter", width: "20%", editor: dropdownParameter, template: "#=parameter.nama#" },
					{ field: "satuanStandar", title: "Satuan", width: "20%", editor: dropdownSatuan, template: "#=satuanStandar.satuanStandar#" },
					{ field: "hasilUji", title: "Hasil Uji", width: "20%" },
					{ field: "bakumutu", title: "Baku Matu", width: "20%", editor: dropdownBakumutu, template: "#=bakumutu.namaBakuMutu#" },
					{ field: "metode", title: "Metode", width: "20%" },
					{ field: "keterangan", title: "Keterangan", width: "20%" }
				],
				dataBound: function (e) {
					e.sender._data.forEach(function (elemen, index) {
						elemen.rowNumber = ++index;
					});
				},
				edit: function (e) {
					var editWindow = this.editable.element.data("kendoWindow");
					editWindow.wrapper.css({ width: 600 });

					e.sender.columns.forEach(function (element, index /*, array */) {
						if (element.hideMe) {
							e.container.find(".k-edit-label:eq(" + index + "), "
								+ ".k-edit-field:eq( " + index + ")"
							).hide();
						}
					});
				}
			};
			function initPage() {
				$scope.now = new Date();
				$scope.item = {
					tanggalpengujiandari: $scope.now,
					tanggalpengujiansampai: $scope.now
				};
				$scope.dataVOloaded = true;
			};
			$q.all([
				TampilDataParameter.getOrderList("service/list-generic/?view=Parameter&select=id,nama"),
				MasterRekanan.getOrderList("limbah-b3-keluar/get-rekanan/"),
				TampilDataSatuan.getOrderList("service/list-generic/?view=SatuanStandar&select=id,satuanStandar"),
				TampilDataBakuMutu.getOrderList("baku-mutu/get-baku-mutu-child")
			]).then(function (res) {
				$scope.ListParameter = res[0].data;
				$scope.ListRekanan = res[1].data;
				$scope.ListSatuan = res[2].data;
				$scope.ListBakuMutu = res[3].data.data.bakuMutu;
				$scope.isRouteLoading = false;
			}, (err) => {
				$scope.isRouteLoading = false;
				throw err;
			});
			$scope.Save = function () {
				var listRawRequired = [
					"item.nomorContoh|ng-model|nomor contah",
					"item.uraianContoh|ng-model|jenis sample",
					"item.tanggalpengujiandari|k-ng-model|tanggal awal pengujian",
					"item.tanggalpengujiansampai|k-ng-model|tanggal akhir pengujian",
					"item.persero|k-ng-model|rekanan"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if (isValid.status) {
					var grid = $("#gridPengujian").data("kendoGrid");
					if (grid.dataSource._data.length > 0) {
						var dataSend = {
							"nomorContoh": $scope.item.nomorContoh,
							"contohDari": $scope.item.uraianContoh,
							"tipeLokasi": $scope.item.persero,
							// "rekanan": $scope.item.persero,
							"mapParameterToLaporanUjiHasil": grid.dataSource._data,
							"tanggalPengujianContohFrom": new Date($scope.item.tanggalpengujiandari).getTime(),
							"tanggalPengujianContohTo": new Date($scope.item.tanggalpengujiansampai).getTime(),
							"tanggalPenerimaanContoh": new Date().getTime() // di set default ke waktu save (karena inputan dihilangkan di UI 31/08/2018)
						};
						ManageSarpras.saveDataUji(dataSend, "laporan-uji-hasil/save-laporan-uji-hasil/").then(function (e) {
							grid.dataSource.data([]);
							initPage();
						});
					} else {
						
						return messageContainer.error("Data pengujian tidak boleh kosong");
					}
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};
			function dropdownParameter(container, options) {
				$('<input required name="' + options.field + '" style="width:100%"/>')
					.appendTo(container)
					.kendoDropDownList({
						dataTextField: "nama",
						dataValueField: "id",
						dataSource: $scope.ListParameter
					});
			};
			function dropdownSatuan(container, options) {
				$('<input required name="' + options.field + '" style="width:100%"/>')
					.appendTo(container)
					.kendoDropDownList({
						dataTextField: "satuanStandar",
						dataValueField: "id",
						dataSource: $scope.ListSatuan
					});
			};
			function dropdownBakumutu(container, options) {
				$('<input required name="' + options.field + '" style="width:100%"/>')
					.appendTo(container)
					.kendoDropDownList({
						dataTextField: "namaBakuMutu",
						dataValueField: "id",
						dataSource: $scope.ListBakuMutu
					});
			};
			initPage();
		}
	]);
});