define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DataLimbahB3MasukCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindPasien', 'MasterLimbah', 'TampilDataLimbahKeluar', 'ManageSarpras', 'ManageKKKL', 'MasterWaktu',
		function ($rootScope, $scope, ModelItem, DateHelper, FindPasien, MasterLimbah, TampilDataLimbahKeluar, ManageSarpras, ManageKKKL, MasterWaktu) {
			$scope.isShowPopUp = false
			$scope.gridOptions = {
				pageable: true,
				selectable: "row",
				columns: [{
					title: "<h3 align=center>Data Limbah Masuk</h3>",
					columns: [{
						field: "tglstruk",
						title: "<h3 align=center>Tanggal</h3>",
						width: "100px",
						headerAttributes: { style: "text-align : center" },
						template: "#= kendo.toString(kendo.parseDate(new Date(tglstruk)), 'dd/MMM/yyyy') #",
						attributes: {
							style: "text-align:center;valign=middle"
						},
					},
					{
						field: "jenisLimbahB3masuk",
						title: "<h3 align=center>Jenis Limbah</h3>",
						width: "200px",
						headerAttributes: { style: "text-align : center" }
					},
					{
						field: "qtyproduk",
						title: "<h3 align=center>Berat<br/>(Kg)</h3>",
						width: "100px",
						attributes: {
							style: "text-align:center;align:middle"
						},
						headerAttributes: { style: "text-align : center;align:middle" }
					},
					{
						field: "satuanWaktuKesling",
						title: "<h3 align=center>Waktu</h3>",
						width: "80px",
						attributes: {
							style: "text-align:center;align:middle"
						},
						headerAttributes: { style: "text-align : center" }
					},
					{
						field: "ruanganTujuan",
						title: "<h3 align=center>Ruangan Tujuan</h3>",
						width: "280px",
						headerAttributes: { style: "text-align : center" }
					},
					{
						field: "ruanganAsal",
						title: "<h3 align=center>Ruangan Asal</h3>",
						width: "200px",
						headerAttributes: { style: "text-align : center" }
					},
					{
						field: "petugasPengirim",
						title: "<h3 align=center>Petugas Pengirim</h3>",
						width: "200px",
						headerAttributes: { style: "text-align : center" }
					},
					{
						field: "namaLengkap",
						title: "<h3 align=center>Petugas Input</h3>",
						width: "200px",
						headerAttributes: { style: "text-align : center" }
					},
					{
						field: "action",
						title: "<h3 align=center>Action</h3>",
						width: "180px",
						attributes: {
							style: "text-align:center;valign=middle"
						},
						command: [
							{
								name: 'Edit',
								click: function (e) {
									var grid = $('#gridlimbahmasuk').data('kendoGrid');
									var item = grid.dataItem($(e.target).closest('tr'));
									// service get by noRec
									ManageKKKL.getOrderList('struk-pelayanan/list-limbah-b3-masuk-bynorec?noRec=' + item.noRec).then(function (res) {
										$scope.selectedData = res.data
									});
									var popUp = $('#winPopUp').data('kendoWindow');
									popUp.open().center();
									e.preventDefault();
								}
							},
							{
								name: 'Hapus',
								click: function (e) {
									var grid = $('#gridlimbahmasuk').data('kendoGrid');
									var item = grid.dataItem($(e.target).closest('tr'));
									e.preventDefault();
									if (confirm('Apakah anda yakin akan menghapus data ini?') == true) {
										ManageKKKL.getOrderList('struk-pelayanan/delete-limbah-b3-masuk?noRec=' + item.noRec).then(function () {
											toastr.success('Data Berhasil Dihapus');
											grid.refresh();
											$scope.cari();
										});
									}
								}
							}
						]
					}]
				}],

			}
			MasterWaktu.getOrderList("service/list-generic/?view=SatuanWaktuKesling&select=id,namaSatuanWaktuKesling").then(function (res) {
				$scope.ListWaktu = res.data
				$('#ddlSatuanWaktuKesling').kendoDropDownList({
					dataSource: res.data,
					dataTextField: "namaSatuanWaktuKesling",
					dataValueField: "id",
				});
				// var ddlSatuanWaktuKesling = $("#ddlSatuanWaktuKesling").data('kendoDropDownList');
				// ddlSatuanWaktuKesling.select(2);
			})
			$scope.editdDataLimbahB3 = function () {
				var data = []
				if($scope.selectedData.satuanWaktuKeslingId.id) {
					data = {
						"strukPelayanan": {
							"noRec": $scope.selectedData.noRec,
							"jenisLimbahB3Masuk": {
								"id": $scope.selectedData.limbahB3masukId
							},
							"tglstruk": $scope.selectedData.tglStrukPelayanan,
							"kdruanganasal": {
								"id": $scope.selectedData.ruanganAsalId
							},
							"kdruangan": {
								"id": $scope.selectedData.ruanganTujuanId
							},
							"satuanWaktuKesling": {
								"id": $scope.selectedData.satuanWaktuKeslingId.id
							},
							"qtyproduk": $scope.selectedData.qtyproduk
						},
						"strukPelayananDetail": {
							"tglpelayanan": $scope.selectedData.tglStrukPelayanan
						}
					}
				} else if($scope.selectedData.satuanWaktuKeslingId.id == undefined) {
					data = {
						"strukPelayanan": {
							"noRec": $scope.selectedData.noRec,
							"jenisLimbahB3Masuk": {
								"id": $scope.selectedData.limbahB3masukId
							},
							"tglstruk": $scope.selectedData.tglStrukPelayanan,
							"kdruanganasal": {
								"id": $scope.selectedData.ruanganAsalId
							},
							"kdruangan": {
								"id": $scope.selectedData.ruanganTujuanId
							},
							"satuanWaktuKesling": {
								"id": $scope.selectedData.satuanWaktuKeslingId
							},
							"qtyproduk": $scope.selectedData.qtyproduk
						},
						"strukPelayananDetail": {
							"tglpelayanan": $scope.selectedData.tglStrukPelayanan
						}
					}
				}
				
				ManageKKKL.saveDataSarPras(data, 'struk-pelayanan/update-limbah-b3-masuk').then(function (res) {
					console.log(JSON.stringify(res));
					var popUp = $('#winPopUp').data('kendoWindow');
					popUp.close();
					$scope.cari();

				})
			}
			function initPage() {
				var date = new Date();
				$scope.isRouteLoading = true;
				$scope.dataVOloaded = true;
				$scope.item = {
					periodeAwal: new Date(),
					periodeAkhir: new Date()
				}
				$scope.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
				$scope.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				$scope.item.periodeAwal = $scope.firstDay;
				$scope.item.periodeAkhir = $scope.lastDay;
				MasterLimbah.getOrderList("service/list-generic/?view=JenisLimbahB3Masuk&select=*").then(function (dat) {
					$scope.ListLimbah = dat.data;
					$scope.isRouteLoading = false;
				}, (err) => {
					$scope.isRouteLoading = false;
					throw err;
				});
				$scope.cari();
			};

			$scope.columnMonitoringStatusPKS = [];

			$scope.reset = function () {
				TampilDataLimbahKeluar.getOrderList("struk-pelayanan/list-limbah-b3-masuk").then(function (dat) {
					var grid = $("#gridlimbahmasuk").data("kendoGrid");
					var ds = new kendo.data.DataSource({
						data: dat.data.data,
						pageSize: 20
					});
					grid.setDataSource(ds);
					grid.dataSource.fetch();
				});

				$scope.item = {};
				$scope.item.periodeAwal = new Date();
				$scope.item.periodeAkhir = new Date();
			}
			$scope.cari = function () {
				var listRawRequired = [
					"item.periodeAwal|k-ng-model|Tanggal awal",
					"item.periodeAkhir|k-ng-model|Tanggal akhir"
				]
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if (isValid.status) {
					var jenisLimbahDipilih = $scope.item.jenisLimbah ? $scope.item.jenisLimbah.id : "";
					ManageKKKL.getOrderList("struk-pelayanan/list-limbah-b3-masuk?dateStart=" + DateHelper.getPeriodeFormatted($scope.item.periodeAwal) + "&dateEnd=" + DateHelper.getPeriodeFormatted($scope.item.periodeAkhir) + "&jenisLimbah=" + jenisLimbahDipilih).then(function (dat) {
						var grid = $("#gridlimbahmasuk").data("kendoGrid");
						var ds = new kendo.data.DataSource({
							data: dat.data.data,
							pageSize: 20
						});
						grid.setDataSource(ds);
						grid.dataSource.fetch();
						$scope.sourceOrder = dat.data.data;
						// //debugger;	
						// $scope.sourceOrder.forEach(function(data){
						// 	var date = new Date(data.tglstruk);
						// 	data.tglstruk = DateHelper.getTanggalFormatted(date);
						// })
						// $scope.sourceOrder.forEach(function (datas) {
						// 	// console.log(datas);
						// 	// tglstruk
						// 	datas.tglstruk = new Date(datas.tglstruk)
						// 	var namaHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
						// 	var namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
						// 	var awal = new Date(datas.tglstruk),
						// 		hariAwal = namaHari[awal.getDay()],
						// 		tglAwal = awal.getDate(),
						// 		bulanAwal = namaBulan[awal.getMonth()],
						// 		tahunAwal = awal.getFullYear(),
						// 		startDate = hariAwal + ', ' + tglAwal + ' ' + bulanAwal + ' ' + tahunAwal;
						// 	datas.tglstruk = startDate;

						// 	// var akhir = new Date(datas.periodeAhir),
						// 	// 	hariAkhir = namaHari[akhir.getDay()],
						// 	// 	tglAkhir = akhir.getDate(),
						// 	// 	bulanAkhir = namaBulan[akhir.getMonth()],
						// 	// 	tahunAkhir = akhir.getFullYear(),
						// 	// 	endDate = hariAkhir + ', ' + tglAkhir + ' ' + bulanAkhir + ' ' + tahunAkhir;
						// 	// datas.periodeAhir = endDate;
						// })
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}

			}
			initPage();
		}
	]);
});