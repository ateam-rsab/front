define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPencucianLinenEksCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.no = 1;
			$scope.Rubahdat = false;

			$scope.RubahDate = function () {
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Rubahdat = false;
				$scope.Cari();
			}

			$scope.Cari = function (Pencarians) {
				debugger
				var getPencarian = Pencarians;
				var tanggalawal = new moment($scope.item.awal).format('YYYY-MM-DD');
				var tanggalakhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
				if ($scope.Rubahdat == false && getPencarian == undefined) {
					ManageLaundry.getOrderList("laundry/get-proses-cuci-external?startDate=" + tanggalawal + "&endDate=" + tanggalakhir).then(function (dat) {
						$scope.sourceDataGrid = dat.data.data;
						// Looping Hanya untuk mngkompetiblekan dengan grid untuk petugas dan memberi auto number saja
						for (var i = 0; i < $scope.sourceDataGrid.length; i++) {
							$scope.sourceDataGrid[i].no = $scope.no++;
							if ($scope.sourceDataGrid[i].noRecstrukPelayanan == null) {
								$scope.sourceDataGrid[i].noRecstrukPelayanan = "---"
							}
							if ($scope.sourceDataGrid[i].petugas[0] != undefined) {
								var namaPetugas = $scope.sourceDataGrid[i].petugas[0].namapegawai;
								$scope.sourceDataGrid[i].petugasname = namaPetugas;
							} else {
								var NamaPetugas = "";
								$scope.sourceDataGrid[i].petugasname = namaPetugas;
							}
							var parseTanggalAwal = new moment($scope.sourceDataGrid[i].tglplanning).format('DD-MM-YYYY hh:mm:ss');
							var parseTanggalAkhir = new moment($scope.sourceDataGrid[i].tglPlanningAkhir).format('DD-MM-YYYY hh:mm:ss');

							$scope.sourceDataGrid[i].tanggalawal = parseTanggalAwal;
							$scope.sourceDataGrid[i].tanggalakhir = parseTanggalAkhir;
							/*Set Total Waktu*/
							var tanggalAwalPencucian = new moment($scope.sourceDataGrid[i].tglplanning).format('YYYY-MM-DD');
							var tanggalAkhirPencucian = new moment($scope.sourceDataGrid[i].tglPlanningAkhir).format('YYYY-MM-DD');
							var JamAwalPencucian = new moment($scope.sourceDataGrid[i].tglplanning).format('HH:mm');
							var JamAkhirPencucian = new moment($scope.sourceDataGrid[i].tglPlanningAkhir).format('HH:mm');
							var TotalWaktu = DateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian + " " + JamAwalPencucian, tanggalAkhirPencucian + " " + JamAkhirPencucian);
							$scope.sourceDataGrid[i].totwaktu = TotalWaktu;
							$scope.Rubahdat = true;
						}
					});
				} else {
					$scope.FilterdataSource(getPencarian);
				}

			}
			$scope.Cari();

			$scope.FilterdataSource = function (getPencarian) {
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
								{ field: "namaAlat", operator: "contains", value: q },
								{ field: "satuanStandar", operator: "contains", value: q },
								{ field: "petugasname", operator: "contains", value: q }
							]
						}
					});
				}
			}

			/*  $scope.Cari();*/

			$scope.ClearCari = function () {
				$scope.Pencarians = "";
				var gridData = $("#grid").data("kendoGrid");
				gridData.dataSource.filter({});
			}


			$scope.kl = function (current) {
				debugger
				$scope.current = current;
				$scope.beratLinen = current.beratLinen;
				$scope.idMesin = current.idMesin;
				$scope.namaAlat = current.namaAlat;
				$scope.no = current.no;
				$scope.noRec = current.noRecstrukPelayanan;
				$scope.namaPetugas = current.petugasname;
				$scope.tglPlanningAkhir = current.tglPlanningAkhir;
				$scope.tglplanning = current.tglplanning
				$scope.noRecstrukPelayanan = current.noRecstrukPelayanan;
				$scope.ruanganAsalId = current.ruanganAsalId;
				$scope.IdPetugas = current.petugas[0].idPegawai
			}

			$scope.Pengeringan = function () {
				debugger
				if ($scope.noRecstrukPelayanan != undefined) {
					$state.go('PengeringanExternal', {
						"noRec": $scope.noRecstrukPelayanan,
						"Petugas": $scope.namaPetugas,
						"beratLinen": $scope.beratLinen,
						"IdPetugas": $scope.IdPetugas
					});
				} else {
					window.messageContainer.error('Harap Pilih Data Terlebih dahulu')
				}

			}


			$scope.detailPencucian = function () {
				debugger
				if ($scope.noRec == undefined) {
					window.messageContainer.error("Data Harus Di Pilih Terlebih dahulu !!");
				} else {
					$state.go("DaftarPencucianLinenDetEks", {
						noRec: $scope.noRecstrukPelayanan,
						namaAlat: $scope.namaAlat,
						beratLinen: $scope.beratLinen
					})
				}
			}


			var onChange = function (e) {
				var grid = $(this).data("mainGridOptions");
			}

			$scope.mainGridOptions = {
				pageable: true,
				change: onChange,
				pageSize: 10,
				selectable: 'row',
				scrollable: true,
				schema: {
					model: {
						fields: {
							no: { type: "number" },
							tanggalawal: { type: "date" },
							tanggalakhir: { type: "date" },
							totwaktu: { type: "string" },
							namaAlat: { type: "string" },
							kapasitasAlat: { type: "string" },
							beratLinen: { type: "string" },
							satuanStandar: { type: "string" },
							petugasname: { type: "string" },
							keteranganlainnya: { type: "string" }
						}
					}
				},
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
						"filterable": true,
						"width": "30px",
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						},
						"filterable": false
					},
					{
						field: "TanggalPencucian", title: "Tanggal Pencucian", headerAttributes: { style: "text-align : center" },
						columns: [
							{
								field: "tanggalawal",
								title: "Tanggal Awal",
								width: 100,
								filterable: false
							},
							{
								field: "tanggalakhir",
								title: "Tanggal Akhir",
								width: 100, filterable: false
							}],
						width: "200px", filterable: false
					},
					{
						"field": "totwaktu",
						"title": "Total Waktu",
						"filterable": true,
						"width": "100px",
						"filterable": false
					},
					{
						"field": "namaAlat",
						"title": "Nama Mesin",
						"filterable": false,
						"width": "100px"
					},
					{
						"field": "kapasitasAlat",
						"title": "Kapasitas Mesin",
						"filterable": false,
						"width": "50px",
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						},
					},
					{
						"field": "beratLinen",
						"title": "Berat Linen",
						"width": "70px",
						"filterable": false,
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						},
					},
					{
						"field": "satuanStandar",
						"title": "Satuan",
						"width": "70px",
						"filterable": false
					},
					{
						"field": "petugasname",
						"title": "Nama Petugas",
						"width": "120px",
						"filterable": false
					},
					{
						"field": "keteranganlainnya",
						"title": "Keterangan",
						"width": "100px",
						"filterable": false
					}

				],
				editable: {
					mode: "popup",
					window: {
						title: "confirmation form"
					},
					template: kendo.template($("#template").html())
				},
				//Change kendo window title
				edit: function (e) {
					e.container.kendoWindow("title", "Detail");
				},
				dataBound: function (e) {
					$("#grid tbody tr .k-grid-edit").each(function () {
						var currentDataItem = $("#grid").data("kendoGrid").dataItem($(this).closest("tr"));
						debugger;
						if (currentDataItem.status == "Internal") {
							$(this).closest("tr").find(".k-grid-edit").hide();
						} else {

						}
					})
				}
			};
		}
	]);
});
