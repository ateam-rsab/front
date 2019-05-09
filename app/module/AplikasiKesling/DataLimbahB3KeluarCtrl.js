define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DataLimbahB3KeluarCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'MasterLimbah', 'TampilDataLimbahKeluar', 'ManageKKKL', 'CetakHelper', '$mdDialog',
		function ($q, $rootScope, $scope, ModelItem, DateHelper, FindPasien, MasterLimbah, ManageKKKL, cetakHelper, TampilDataLimbahKeluar, $mdDialog) {
			$scope.isShowPopUp = false;
			$scope.gridOptions = {
				selectable: "row",
				pageable: true,
				toolbar: ['excel', 'pdf'],
				columns: [
					{
						field: "",
						title: "<h3 align=center>Limbah Keluar</h3>",
						columns: [
							{
								field: "buktiNomerDokumen",
								title: "<h3 align=center>No. Order</h3>",
								width: "150px",
								attributes: {
									style: "text-align:center;valign=middle"
								},
								headerAttributes: { style: "text-align : center" }

							},
							{
								field: "tanggal",
								title: "<h3 align=center>Tanggal</h3>",
								width: "150px",
								attributes: {
									style: "text-align:center;valign=middle"
								},
								headerAttributes: { style: "text-align : center" },
								template: "#= kendo.toString(new Date(tanggal), \"dd/MM/yyyy\") #"
							},
							{
								field: "jenisLimbahB3masuk",
								title: "<h3 align=center>Jenis Limbah<br>B3 Masuk</h3>",
								width: "250px",
								headerAttributes: { style: "text-align : center" }
							},
							{
								field: "jumlahLimbahB3Keluar",
								title: "<h3 align=center>Jumlah Limbah<br>B3 Keluar</h3>",
								width: "130px",
								attributes: {
									style: "text-align:center;valign=middle"
								},
								headerAttributes: { style: "text-align : center" }

							},
							{
								field: "tujuanPenyerahan",
								title: "<h3 align=center>Rekanan</h3>",
								width: "250px",
								headerAttributes: { style: "text-align : center" }

							},
							{
								field: "sisaLimbah",
								title: "<h3 align=center>Sisa</h3>",
								width: "70px",
								attributes: {
									style: "text-align:center;valign=middle"
								},
								headerAttributes: { style: "text-align : center" }

							},
							{
								field: "maksimalPenyimpnan",
								title: "<h3 align=center>Maks. Penyimpanan<br>(Hari)</h3>",
								width: "160px",
								attributes: {
									style: "text-align:center;valign=middle"
								},
								headerAttributes: { style: "text-align : center; height: 30px" }

							},
							{
								field: 'action',
								title: '<h3 align=center>Action</h3>',
								attributes: {
									style: "text-align:center;valign=middle"
								},
								width: '200px',
								command: [
									{
										name: 'Edit',
										click: function (e) {
											var grid = $('#gridlimbahkeluar').data('kendoGrid');
											var item = grid.dataItem($(e.target).closest('tr'));
											var popUp = $('#winPopUp').data('kendoWindow');
											e.preventDefault();
											ManageKKKL.getOrderList('limbah-b3-keluar/get-limbah-b3-keluar-bynorec?noRec=' + item.noRec).then(function (res) {
												$scope.selectedData = res.data;
												// getJenisLimbahMasukById(res.data.jenisLimbahB3masukId);
												console.log($scope.selectedData);
											});

											popUp.open().center();
										}
									},
									{
										name: 'Hapus',
										click: function (e) {
											e.preventDefault();
											var grid = $('#gridlimbahkeluar').data('kendoGrid');
											var item = grid.dataItem($(e.target).closest('tr'));
											if (confirm('Apakah anda yakin akan menghapus data ini?') == true) {
												ManageKKKL.getOrderList('limbah-b3-keluar/delete-limbah-b3-keluar?noRec=' + item.noRec).then(function () {
													$scope.cari();
												});
											}
										}
									}

								],
								headerAttributes: { style: "text-align : center" }
							}

						],
						headerAttributes: { style: "text-align : center" }
					}
				]
			}
			// var getJenisLimbahMasukById = function (id) {
			// 	if (id != undefined) {
			// 		ManageKKKL.getOrderList("limbah-b3-keluar/get-sisa-limbah-di-tps-by-jenis-limbah?jenisLimbah=" + id).then(function (dat) {
			// 			var data = dat;
			// 		});
			// 	}
			// }
			$scope.editdDataLimbahB3Keluar = function () {
				var data = {
					"noRec": $scope.selectedData.noRec,
					"buktiNomerDokumen": $scope.selectedData.buktiNomerDokumen,
					"tanggal": $scope.selectedData.tanggal,
					"jenisLimbahB3Masuk": {
						"id": $scope.selectedData.jenisLimbahB3masukId
					},
					"jumlahLimbahB3Keluar": $scope.selectedData.jumlahLimbahB3Keluar,
					"tujuanPenyerahan": $scope.selectedData.tujuanPenyerahan,
					"sisaLimbahB3": $scope.selectedData.sisaLimbah,
					"maksimalPenyimpanan": $scope.selectedData.maksimalPenyimpnan,
					"perlakuanId": $scope.selectedData.perlakuanId,
					// "rekanan": {
					// 	"id": $scope.selectedData.rekananId
					// }
				}
				ManageKKKL.saveDataSarPras(data, 'limbah-b3-keluar/update-limbah-b3-keluar').then(function (res) {
					console.log(JSON.stringify(res.data));
					var popUp = $('#winPopUp').data('kendoWindow');
					popUp.close()
					$scope.cari();
				})
			}


			// var jml, sisa, total;
			// $scope.countSisa = function () {
			// 	jml = parseInt($scope.selectedData.jumlahLimbahB3Keluar);
			// 	sisa = $scope.selectedData.sisaLimbah;
			// 	$scope.selectedData.total = sisa + jml;

			// 	$scope.selectedData.sisaLimbah = $scope.selectedData.total - jml;

			// 	console.log($scope.selectedData.sisaLimbah)
			// }


			function initPage() {
				var date = new Date();
				MasterLimbah.getListGeneric("service/list-generic/?view=JenisLimbahB3Masuk&select=*").then(function (res) {
					$scope.ListLimbah = res.data;
				})
				$scope.item = {
					periodeAwal: new Date(),
					periodeAkhir: new Date()
				};
				$scope.dataVOloaded = true;
				$scope.isRouteLoading = true;
				$scope.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
				$scope.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				$scope.item.periodeAwal = $scope.firstDay;
				$scope.item.periodeAkhir = $scope.lastDay;
				$q.all([
					// MasterLimbah.getListGeneric("service/list-generic/?view=JenisLimbahB3Masuk&select=*"),
					ManageKKKL.getOrderList("limbah-b3-keluar/list-limbah-b3-keluar?dateStart=" + $scope.item.periodeAwal + "&dateEnd=" + $scope.item.periodeAkhir)
				]).then(function (res) {
					if (res[0].statResponse) {
						$scope.ListLimbah = res[0].data;
					}
					if (res[1].statResponse) {
						$scope.sourceOrder = res[1].data.data;
					}
					$scope.isRouteLoading = false;
					$scope.cari();
				}, (err) => {
					$scope.isRouteLoading = false;
					throw err;
				});
				$scope.cari();
			};

			$scope.reset = function () {
				ManageKKKL.getOrderList("limbah-b3-keluar/list-limbah-b3-keluar?").then(function (dat) {
					var grid = $("#gridlimbahkeluar").data("kendoGrid");
					var ds = new kendo.data.DataSource({
						data: dat.data.data,
						pageSize: 12
					});
					grid.setDataSource(ds);
					grid.dataSource.fetch();
				});
				$scope.item = {};
				$scope.item.periodeAwal = new Date();
				$scope.item.periodeAkhir = new Date();
			};
			$scope.cetak = function () {
				// 01/08/2018
				var monthS, dayS, yearS;
				var monthE, dayE, yearE;
				var startDate = new Date($scope.item.periodeAwal);
				var endDate = new Date($scope.item.periodeAkhir);
				monthS = (startDate.getMonth() + 1);
				if (monthS < 10) {
					monthS = '0' + (startDate.getMonth() + 1)
				}
				dayS = startDate.getDate();
				if (dayS < 10) {
					dayS = '0' + startDate.getDate();
				}
				yearS = startDate.getFullYear();

				monthE = (endDate.getMonth() + 1);
				if (monthE < 10) {
					monthE = '0' + (endDate.getMonth() + 1)
				}
				dayE = endDate.getDate();
				if (dayE < 10) {
					dayE = '0' + endDate.getDate();
				}
				yearE = endDate.getFullYear();
				var fullStartDate = yearS + '/' + monthS + '/' + dayS;
				var fullEndDate = yearE + '/' + monthE + '/' + dayE;
				var url = 'reporting/laporanLogbookLimbahB3?startDate=' + fullStartDate + '&endDate=' + fullEndDate;
				var urlLaporan = cetakHelper.openURLReporting(url);
				window.open(
					urlLaporan, 
					'LaporanLogbook', 
					'width='+ screen.availWidth +', height=' + screen.availHeight);


			}
			$scope.cari = function () {
				var listRawRequired = [
					"item.periodeAwal|k-ng-model|Tanggal awal",
					"item.periodeAkhir|k-ng-model|Tanggal akhir"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if (isValid.status) {
					var jenisLimbahDipilih = $scope.item.jenisLimbah ? $scope.item.jenisLimbah.id : "";
					ManageKKKL.getOrderList("limbah-b3-keluar/list-limbah-b3-keluar?dateStart=" + DateHelper.getPeriodeFormatted($scope.item.periodeAwal) + "&dateEnd=" + DateHelper.getPeriodeFormatted($scope.item.periodeAkhir) + "&jenisLimbah=" + jenisLimbahDipilih).then(function (dat) {
						// var tgl = dat.data.tanggal;
						// dat.data.tanggal.forEach(function(data){
						// 	data.tanggal = new Date(data.tanggal);
						// });
						var grid = $("#gridlimbahkeluar").data("kendoGrid");
						var ds = new kendo.data.DataSource({
							data: dat.data.data,
							pageSize: 12
						})
						// dat.data.data.tanggal.forEach(function(data){
						// 	data.tanggal = new Date(data.tanggal)
						// });

						grid.setDataSource(ds);
						grid.dataSource.fetch();
					});
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			};
			// $scope.cari();
			initPage();
		}
	]);
});