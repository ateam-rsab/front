define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPackageCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.Rubahdata = false;
			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: []
			});

			$scope.ChangeData = function () {
				$scope.Rubahdata = false;
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Cari();
			}

			$scope.nomor = 1;
			$scope.Cari = function (Pencarians) {
				var getPencarian = Pencarians;
				var tanggalawal = new moment(new Date($scope.item.awal)).format('YYYY-MM-DD');
				var tanggalakhir = new moment(new Date($scope.item.akhir)).format('YYYY-MM-DD');
				if (getPencarian == undefined && $scope.Rubahdata == false) {
					$scope.nomors = 1;
					ManageLaundry.getOrderList("laundry/get-proses-rollpress?startDate=" + tanggalawal + "&endDate=" + tanggalakhir).then(function (dat) {
						$scope.sourceOrder = dat.data.data;
						$scope.dataSourceHasilRollPress = new kendo.data.DataSource({
							data: $scope.sourceOrder,
							pageSize: 15
						})
						for (var i = 0; i < $scope.sourceOrder.length; i++) {
							if ($scope.sourceOrder[i].petugas[0] != undefined) {
								var petugas = $scope.sourceOrder[i].petugas[0].namapegawai;
							} else {
								var petugas = "....................";
							}
							var tanggalawal = new moment(new Date($scope.sourceOrder[i].tglplanning)).format('DD-MM-YYYY hh:mm:ss');
							var tanggalakhir = new moment(new Date($scope.sourceOrder[i].tglPlanningAkhir)).format('DD-MM-YYYY hh:mm:ss');
							$scope.sourceOrder[i].tanggalawal = tanggalawal;
							$scope.sourceOrder[i].tanggalakhir = tanggalakhir;
							$scope.sourceOrder[i].pegawai = petugas;
							$scope.sourceOrder[i].no = $scope.nomors++ + ".";

							/*Generate CountTotalWaktu*/
							var TanggalMulaiwkt = new moment($scope.sourceOrder[i].tglplanning).format('DD');
							var TanggalSelesaiwkt = new moment($scope.sourceOrder[i].tglPlanningAkhir).format('DD');
							var LamaSelesaiwkt = TanggalSelesaiwkt - TanggalMulaiwkt;
							var MulaiFormatJam = new moment($scope.sourceOrder[i].tglplanning).format('HH');
							var SelesaiFormatJam = new moment($scope.sourceOrder[i].tglPlanningAkhir).format('HH');
							var formatLamaJam = SelesaiFormatJam - MulaiFormatJam;
							var MulaiFormatMenit = new moment($scope.sourceOrder[i].tglplanning).format('mm');
							var SelesaiFormatMenit = new moment($scope.sourceOrder[i].tglPlanningAkhir).format('mm');
							var formatLamaMenit = SelesaiFormatMenit - MulaiFormatMenit;
							var totalwaktu = LamaSelesaiwkt + " Hari, " + formatLamaJam + " Jam, " + formatLamaMenit + " Menit";
							/*End Generate*/

							$scope.sourceOrder[i].totwaktu = totalwaktu;
						}
					})
					$scope.Rubahdata = true;
				} else {
					$scope.CariPegawai(getPencarian)
				}
			}
			$scope.Cari();


			$scope.CariPegawai = function (getPencarian) {
				if (getPencarian != undefined) {
					var q = getPencarian;
					var grid = $("#grid").data("kendoGrid");
					grid.dataSource.query({
						page: 1,
						pageSize: 20,
						filter: {
							logic: "or",
							filters: [
								{ field: "pegawai", operator: "contains", value: q }
							]
						}
					});
				}
			}



			$scope.isShowPopUp = false;
			$scope.kl = function (current) {
				$scope.current = current;
				$scope.noRec = current.noRec;
				$scope.noRecstrukPelayanan = current.noRecstrukPelayanan;
				$scope.no = current.no;
				$scope.tanggalawal = current.tanggalawal;
				$scope.tanggalakhir = current.tanggalakhir;
				$scope.totwaktu = current.totwaktu;
				$scope.pegawai = current.pegawai;
				$scope.keteranganlainnya = current.keteranganlainnya;
			}

			$scope.number = 1;
			$scope.openWindow = function (getdata) {
				if ($scope.noRec != undefined) {
					ManageLaundry.getOrderList("laundry/get-proses-rollpress-by-norec?noRec=" + $scope.noRec).then(function (dat) {
						$scope.SourceData = dat.data.data[0];
						if ($scope.SourceData.petugas[0] != undefined) {
							$scope.item.petugasdet = $scope.SourceData.petugas[0].namapegawai;
						}
						$scope.item.tglplanningdet = $scope.tanggalawal;
						$scope.item.tglPlanningAkhirdet = $scope.tanggalakhir;
						$scope.SourceData.noRecstrukPelayanan;
						$scope.SourceData.noRec;
						$scope.number = 1
						$scope.SourceDataDetail = $scope.SourceData.detail;
						$scope.dataSourceHasilRollPressDetail = new kendo.data.DataSource({
							data: $scope.SourceDataDetail,
							pageSize: 5
						})
						for (var i = 0; i < $scope.SourceDataDetail.length; i++) {
							$scope.SourceDataDetail[i].no = $scope.number++ + "."
						}
						var myWindow = $("#winPopUp");
						myWindow.data("kendoWindow").open();
						$scope.isShowPopUp = true;
						$scope.countTotal($scope.SourceDataDetail);
					});
				} else {
					toastr.warning('Data Harus dipilih terlebih dahulu')
				}
			}

			$scope.countTotal = function (GetDataDetail) {
				var TotalBerat = 0;
				var TotalLinen = 0;
				for (var i = 0; i < GetDataDetail.length; i++) {
					var BeratLinen = GetDataDetail[i].beratLinen
					var JumlahLinen = GetDataDetail[i].jmlLipatan
					TotalBerat += (BeratLinen * 1);
					TotalLinen += (JumlahLinen * 1);
				}
				$scope.item.totalBerat = TotalBerat;
				$scope.item.totalLipatan = TotalLinen;
				return $scope.item.totalBerat;
			}

			$scope.cancelData = function () {
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
			}

			$scope.ClearCari = function () {
				$scope.Pencarians = "";
				var gridData = $("#grid").data("kendoGrid");
				gridData.dataSource.filter({});
			}



			$scope.mainGridOptions = {
				editable: "popup",
				toolbar: ["excel", "pdf"],
				pageable: true,
				// pageSize: 10,
				selectable: 'row',
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
						"title": "<h3 align=center>No.<h3>",
						"width": "20px",
						"filterable": false,
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						}

					},
					{
						field: "TanggalRollPress", title: "<h3 align=center>Tanggal Hasil Roll Press<h3>", headerAttributes: { style: "text-align : center" },
						columns: [
							{
								field: "tanggalawal",
								title: "<h3 align=center>Tanggal Awal<h3>",
								width: 70, filterable: false,
								attributes: {
									"class": "table-cell",
									style: "text-align: center;"
								},
							},
							{
								field: "tanggalakhir",
								title: "<h3 align=center>Tanggal Akhir<h3>", width: 70, filterable: false,
								attributes: {
									"class": "table-cell",
									stle: "text-align : center"
								}
							}],
						width: "200px", filterable: false
					},
					{
						"field": "totwaktu",
						"title": "<h3 align=center>Total Waktu<h3>",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "pegawai",
						"title": "<h3 align=center>Pegawai<h3>",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "keteranganlainnya",
						"title": "<h3 align=center>Keterangan<h3>",
						"width": "70px",
						"filterable": false
					}
				]
			};


			$scope.mainGridOptionsDetail = {
				editable: "popup",
				pageable: true,
				// pageSize: 10,
				selectable: 'row',
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
						"title": "No.",
						"width": "30px",
						"filterable": false,
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						}

					},
					{
						"field": "namaLinen",
						"title": "<h3 align=center>Nama Linen<h3>",
						"width": "100px",
						"filterable": false

					},
					{
						"field": "beratLinen",
						"title": "<h3 align=center>Berat Linen<h3>",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "jmlLipatan",
						"title": "<h3 align=center>Jumlah Roll Press<h3>",
						"width": "70px",
						"filterable": false

					}
				]
			};


		}
	]);
});