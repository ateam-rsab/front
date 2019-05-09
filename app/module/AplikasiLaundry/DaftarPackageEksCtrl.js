define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPackageEksCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.Rubahdata = false;
			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: []
			});


			$scope.ChangePeriode = function () {
				debugger
				$scope.Rubahdata = false;
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Cari();
			}

			$scope.nomor = 1;
			$scope.Cari = function (Pencarians) {
				debugger
				var getPencarian = Pencarians;
				var tanggalawal = new moment(new Date($scope.item.awal)).format('YYYY-MM-DD');
				var tanggalakhir = new moment(new Date($scope.item.akhir)).format('YYYY-MM-DD');
				if (getPencarian == undefined && $scope.Rubahdata == false) {
					$scope.nomors = 1;
					ManageLaundry.getOrderList("laundry/get-proses-rollpress-external?startDate=" + tanggalawal + "&endDate=" + tanggalakhir).then(function (dat) {
						$scope.sourceOrder = dat.data.data;
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

							/*Set Total Waktu*/
							var tanggalAwalPencucian = new moment($scope.sourceOrder[i].tglplanning).format('YYYY-MM-DD');
							var tanggalAkhirPencucian = new moment($scope.sourceOrder[i].tglPlanningAkhir).format('YYYY-MM-DD');
							var JamAwalPencucian = new moment($scope.sourceOrder[i].tglplanning).format('HH:mm');
							var JamAkhirPencucian = new moment($scope.sourceOrder[i].tglPlanningAkhir).format('HH:mm');
							var TotalWaktu = DateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian + " " + JamAwalPencucian, tanggalAkhirPencucian + " " + JamAkhirPencucian);
							$scope.sourceOrder[i].totwaktu = TotalWaktu;
						}
					})
					$scope.Rubahdata = true;
				} else {
					$scope.CariPegawai(getPencarian)
				}
			}
			$scope.Cari();

			$scope.CariPegawai = function (getPencarian) {
				debugger
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
				debugger
				if ($scope.noRec != undefined) {
					ManageLaundry.getOrderList("laundry/get-proses-rollpress-external-by-norec?noRec=" + $scope.noRec).then(function (dat) {
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
				pageable: true,
				pageSize: 10,
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
						"width": "20px",
						"filterable": false,
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						}

					},
					{
						field: "TanggalRollPress", title: "Tanggal Hasil Roll Press", headerAttributes: { style: "text-align : center" },
						columns: [
							{
								field: "tanggalawal",
								title: "Tanggal Awal",
								width: 70, filterable: false,
								attributes: {
									"class": "table-cell",
									style: "text-align: center;"
								},
							},
							{
								field: "tanggalakhir",
								title: "Tanggal Akhir", width: 70, filterable: false,
								attributes: {
									"class": "table-cell",
									stle: "text-align : center"
								}
							}],
						width: "200px", filterable: false
					},
					{
						"field": "totwaktu",
						"title": "Total Waktu",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "pegawai",
						"title": "Pegawai",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "keteranganlainnya",
						"title": "Keterangan",
						"width": "70px",
						"filterable": false
					}
				]
			};


			$scope.mainGridOptionsDetail = {
				editable: "popup",
				pageable: true,
				pageSize: 10,
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
						"title": "Nama Linen",
						"width": "100px",
						"filterable": false

					},
					{
						"field": "beratLinen",
						"title": "Berat Linen",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "jmlLipatan",
						"title": "Jumlah Roll Press",
						"width": "70px",
						"filterable": false

					}
				]
			};


		}
	]);
});