define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DataHasilPemeriksaanSwaPantauLimbahCairCtrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'FindPasien', 'MasterLimbah', 'TampilDataLimbahKeluar', 'CetakHelper',
		function ($q, $rootScope, $scope, $state, ModelItem, DateHelper, FindPasien, MasterLimbah, TampilDataLimbahKeluar, cetakHelper) {
			$scope.gridOptions = {
				selectable: "row",
				pageable: false,
				editable: false,
				toolbar: ['excel', 'pdf'],
				columns: [
					{
						field: "rowNumber",
						title: "<h3 align=center>#</h3>",
						headerAttributes: { style: "text-align : center" },
						attributes: {
							style: "text-align:center;"
						},
						width: '50px'
					},
					{
						field: "hasilPemeriksaanSwaPantauLimbahCair.tanggal",
						title: "<h3 align=center>Tanggal</h3>",
						width: "150px",
						template: "#= kendo.toString(kendo.parseDate(new Date(hasilPemeriksaanSwaPantauLimbahCair.tanggal)), 'dd-MM-yyyy') #",
						headerAttributes: { style: "text-align : center" },
						attributes: {
							style: "text-align:center;"
						}
					},
					{
						title: "<h3 align=center>Parameter</h3>",
						columns: [
							{
								// DO
								field: "hasilPemeriksaanSwaDetail[1].nilai",
								title: "<h3 align=center>DO<br/>(ppm)</h3>",
								headerAttributes: { style: "text-align : center" },
								attributes: {
									style: "text-align:center;"
								},
							},
							{
								// Suhu
								field: "hasilPemeriksaanSwaDetail[4].nilai",
								title: "<h3 align=center>SUHU<br/>(C)</h3>",
								width: "200px",
								headerAttributes: { style: "text-align : center" },
								attributes: {
									style: "text-align:center;"
								},
							},
							{
								// PH
								field: "hasilPemeriksaanSwaDetail[0].nilai",
								title: "<h3 align=center>PH</h3>",
								headerAttributes: { style: "text-align : center" },
								attributes: {
									style: "text-align:center;"
								},
							},
							{
								// TDS
								field: "hasilPemeriksaanSwaDetail[3].nilai",
								title: "<h3 align=center>TDS<br/>(ppm)</h3>",
								headerAttributes: { style: "text-align : center" },
								attributes: {
									style: "text-align:center;"
								},
							},
							{
								// Conductivity
								field: "hasilPemeriksaanSwaDetail[2].nilai",
								title: "<h3 align=center>Conductivity</h3>",
								width: "200px",
								headerAttributes: { style: "text-align : center" },
								attributes: {
									style: "text-align:center;"
								},
							}														
						],
						headerAttributes: { style: "text-align : center" }
					},
					{
						title: "<h3 align=center>Debit</h3>",
						columns: [
							{
								field: "hasilPemeriksaanSwaPantauLimbahCair.inletDebit",
								title: "<h3 align=center>Inlet<br/>m3</h3>",
								headerAttributes: { style: "text-align : center" },
								attributes: {
									style: "text-align:center;"
								}
							},
							{
								field: "hasilPemeriksaanSwaPantauLimbahCair.outletDebit",
								title: "<h3 align=center>Outlet<br/>m3</h3>",
								headerAttributes: { style: "text-align : center" },
								attributes: {
									style: "text-align:center;"
								}
							}
						],
						headerAttributes: { style: "text-align : center" }
					},
					{
						field: "hasilPemeriksaanSwaPantauLimbahCair.keterangan",
						title: "<h3 align=center>Keterangan</h3>",
						width: "200px",
						headerAttributes: { style: "text-align : center" },
						attributes: {
							style: "text-align:center;"
						}
					},
				],

				dataBound: function (e) {
					e.sender._data.forEach(function (elemen, index) {
						elemen.rowNumber = ++index;
					});
				}
			};
			$scope.parameterCari = [
				{ name: "Bulan", value: "bulan" },
				{ name: "Tanggal", value: "tanggal" }
			];
			$scope.monthSelectorOptions = {
				start: "year",
				depth: "year"
			};
			function initPage() {
				ModelItem.get("Humas/MonitoringStatusPks").then(function (data) {
					$scope.item = data;
					var date = new Date();
					$scope.item.tglAwal = new Date();
					$scope.item.tglAkhir = new Date();

					$scope.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
					$scope.lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
					
					$scope.item.tglAwal = $scope.firstDay;
					$scope.item.tglAkhir = $scope.lastDay;
					$scope.item.paramsCari = $scope.parameterCari[1];
					$scope.now = new Date();
					$scope.dataVOloaded = true;
					var urlService = "hasil-pemeriksaan-swa-pantau-limbah-cair/list-hasil-pemeriksaan-limbah-cair?dateStart=" + DateHelper.getDateTimeFormatted3($scope.item.tglAwal) + "&dateEnd=" + DateHelper.getDateTimeFormatted3($scope.item.tglAkhir);
					TampilDataLimbahKeluar.getOrderList(urlService).then(function (dat) {
					// for (var i = 0; i < dat.data.data.length; i++) {
					// 	// console.log(dat.data.data[i].hasilPemeriksaanSwaDetail);
					// 	for(var ii = 0;ii <  dat.data.data[ii].hasilPemeriksaanSwaDetail.length; ii++){
					// 		console.log(dat.data.data[i].hasilPemeriksaanSwaDetail[ii].parameter);
					// 	}
					// }
					var grid = $("#gridSwaPantau").data("kendoGrid");
					var ds = new kendo.data.DataSource({
						data: dat.data.data,
						pageSize: 12
					});
					grid.setDataSource(ds);
					grid.dataSource.fetch();
				});
				}, function errorCallBack(err) { });
				
				$q.all([
					MasterLimbah.getOrderList("service/list-generic/?view=JenisLimbahB3Masuk&select=*"),
					// TampilDataLimbahKeluar.getOrderList("hasil-pemeriksaan-swa-pantau-limbah-cair/list-hasil-pemeriksaan-limbah-cair")
				]).then(function (res) {
					$scope.ListLimbah = res[0].data;
					// if(res[1].data.data.length>0){
					// 	var grid = $('#gridSwaPantau').data("kendoGrid");
					// 	var ds = new kendo.data.DataSource({
					// 		data: res[1].data.data
					// 	});
					// 	grid.setDataSource(ds);
					// 	grid.dataSource.fetch();
					// }
				}, (err) => {
					throw err;
				});

			};
			$scope.cari = function () {
				var url;
				var listRawRequiredTgl = [
					"item.tglAwal|k-ng-model|Tanggal awal",
					"item.tglAkhir|k-ng-model|Tanggal akhir"
				];
				var listRawRequiredBln = [
					"item.periode|k-ng-model|Periode"
				];
				if ($scope.item.paramsCari && $scope.item.paramsCari.value === "tanggal") {
					var isValid = ModelItem.setValidation($scope, listRawRequiredTgl);
					if (isValid.status) {
						var url = "hasil-pemeriksaan-swa-pantau-limbah-cair/list-hasil-pemeriksaan-limbah-cair?dateStart=" + DateHelper.getDateTimeFormatted3($scope.item.tglAwal) + "&dateEnd=" + DateHelper.getDateTimeFormatted3($scope.item.tglAkhir);
					} else {
						ModelItem.showMessages(isValid.messages);
					}
				} else if ($scope.item.paramsCari && $scope.item.paramsCari.value === "bulan") {
					var isValid = ModelItem.setValidation($scope, listRawRequiredBln);
					if (isValid.status) {
						var daysOfMonth = DateHelper.getDaysofMonth($scope.item.periode);
						for (var i = 0; i < daysOfMonth.length; i++) {
							daysOfMonth[i] = daysOfMonth[i].split("/").join("-");
						}
						var url = "hasil-pemeriksaan-swa-pantau-limbah-cair/list-hasil-pemeriksaan-limbah-cair?dateStart=" + daysOfMonth[0] + "&dateEnd=" + daysOfMonth[1];
					} else {
						ModelItem.showMessages(isValid.messages);
					}
				} else {
					messageContainer.error("Parameter pencarian undefined");
				}
				TampilDataLimbahKeluar.getOrderList(url).then(function (dat) {
					// for (var i = 0; i < dat.data.data.length; i++) {
					// 	// console.log(dat.data.data[i].hasilPemeriksaanSwaDetail);
					// 	for(var ii = 0;ii <  dat.data.data[ii].hasilPemeriksaanSwaDetail.length; ii++){
					// 		console.log(dat.data.data[i].hasilPemeriksaanSwaDetail[ii].parameter);
					// 	}
					// }
					var grid = $("#gridSwaPantau").data("kendoGrid");
					var ds = new kendo.data.DataSource({
						data: dat.data.data,
						pageSize: 12
					});
					grid.setDataSource(ds);
					grid.dataSource.fetch();
				});
			};
			$scope.cetak = function () {
				var token = '&X-AUTH-TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGUubWFjaG11ciJ9.UNSWMl8JN0hwrt7_hcdkH_qH9lAohc4erzz1ZmgIREQLVIJKvvJ2zkvqdThTw36nMQGDGAAd5xodSPfJKPTtow'
				var url;
				var listRawRequiredTgl = [
					"item.tglAwal|k-ng-model|Tanggal awal",
					"item.tglAkhir|k-ng-model|Tanggal akhir"
				];
				var listRawRequiredBln = [
					"item.periode|k-ng-model|Periode"
				];
				if ($scope.item.paramsCari && $scope.item.paramsCari.value === "tanggal") {
					var isValid = ModelItem.setValidation($scope, listRawRequiredTgl);
					if (isValid.status) {
						var url = "hasil-pemeriksaan-swa-pantau-limbah-cair/lapHasilPemeriksaanSWAPantauLimbahCair?startDate=" + DateHelper.getDateTimeFormatted3($scope.item.tglAwal) + "&endDate=" + DateHelper.getDateTimeFormatted3($scope.item.tglAkhir) + token;
						var urlLaporan = cetakHelper.openURLReporting(url);
						window.open(urlLaporan, '', 'width:600, height:500');
					} else {
						ModelItem.showMessages(isValid.messages);
					}
				} else if ($scope.item.paramsCari && $scope.item.paramsCari.value === "bulan") {
					var isValid = ModelItem.setValidation($scope, listRawRequiredBln);
					if (isValid.status) {
						var daysOfMonth = DateHelper.getDaysofMonth($scope.item.periode);
						for (var i = 0; i < daysOfMonth.length; i++) {
							daysOfMonth[i] = daysOfMonth[i].split("/").join("-");
						}
						var url = "hasil-pemeriksaan-swa-pantau-limbah-cair/lapHasilPemeriksaanSWAPantauLimbahCairstartDate=" + daysOfMonth[0] + "&endDate=" + daysOfMonth[1] + token;
						var urlLaporan = cetakHelper.openURLReporting(url);
						window.open(urlLaporan, '', 'width:600, height:500');
					} else {
						return ModelItem.showMessages(isValid.messages);
					}
				} else {
					return messageContainer.error("Parameter pencarian undefined");
				}
			};
			$scope.kl = function (current) {
				$scope.current = current;
				console.log(current)
			}

			$scope.navToDetail = function () {
				$state.go('SwaPantauLimbahCairDetail', {
					noRec: $scope.current.noRec
				});
				// debugger;
			};
			initPage();
		}
	]);
});