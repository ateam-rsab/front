define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPencucianLinenCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'ManageLaundry', '$mdDialog',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, ManageLaundry, $mdDialog) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.Rubahdat = false;
			$scope.klikdaftar = true;

			$scope.ChangeDate = function () {
				$scope.Rubahdat = false;
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Cari();
			}

			$scope.Cari = function (Pencarians) {
				var GetPencarian = Pencarians;
				if (GetPencarian == undefined && $scope.Rubahdat == false) {
					var TanggalAwal = new moment($scope.item.awal).format('YYYY-MM-DD');
					var TanggalAkhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
					ManageLaundry.getOrderList("laundry/get-proses-cuci?startDate=" + TanggalAwal + "&endDate=" + TanggalAkhir).then(function (dat) {
						$scope.sourceDataGrid = dat.data.data;
						$scope.dataGrid = new kendo.data.DataSource({
							data:$scope.sourceDataGrid,
							pageSize: 10
						})
						$scope.no = 1;
						for (var i = 0; i < $scope.sourceDataGrid.length; i++) {
							$scope.sourceDataGrid[i].no = $scope.no++ + ".";
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
							$scope.PencarianPegawai(GetPencarian);
						}
					});
					$scope.Rubahdat = true;
				} else {
					$scope.PencarianPegawai(GetPencarian);
				}
			}
			$scope.Cari();

			$scope.PencarianPegawai = function (GetPencarian) {
				debugger
				if (GetPencarian != undefined) {
					var q = GetPencarian;
					var grid = $("#grid").data("kendoGrid");
					grid.dataSource.query({
						// page: 1,
						// pageSize: 10,
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


			$scope.ClearCari = function () {
				$scope.Pencarians = "";
				var gridData = $("#grid").data("kendoGrid");
				gridData.dataSource.filter({});
			}


			$scope.Proses = function () {
				var gaji = moment($scope.item.awal).format("YYYY-MM-DD 00:00:00");
				var kerja = moment($scope.item.akhir).format("YYYY-MM-DD hh:mm:ss");
				ManageLaundry.getOrderList("laundry/get-all-pencucian?startPeriode=" + gaji + "&endPeriode=" + kerja).then(function (dat) {
					$scope.sourceDataGrid = new kendo.data.DataSource({
						data: dat.data.data,
						pageSize: 5
					});
				});
			}

			$scope.kl = function (current) {
				$scope.current = current;
				$scope.beratLinen = current.beratLinen;
				$scope.idMesin = current.idMesin;
				$scope.namaAlat = current.namaAlat;
				$scope.no = current.no;
				$scope.noRec = current.noRec;
				$scope.namaPetugas = current.petugasname;
				$scope.tglPlanningAkhir = current.tglPlanningAkhir;
				$scope.tglplanning = current.tglplanning
				$scope.noRecstrukPelayanan = current.noRecstrukPelayanan;
				$scope.ruanganAsalId = current.ruanganAsalId;
				$scope.IdPetugas = current.petugas[0].idPegawai
				$scope.klikdaftar = false;
			}

			$scope.detailPencucian = function () {
				if ($scope.noRec == undefined) {
					window.messageContainer.error("Data Harus Di Pilih Terlebih dahulu !!");
				} else {
					$state.go("DaftarPencucianLinendet", {
						noRec: $scope.noRecstrukPelayanan,
						namaAlat: $scope.namaAlat,
						beratLinen: $scope.beratLinen
					})
				}
			}

			$scope.Pengeringan = function () {
				if ($scope.noRecstrukPelayanan == undefined) {
					window.messageContainer.error("Harap Pilih Data terlebih dahulu !")
				} else {
					$state.go('PengeringanInternal', {
						noRecStrukPelayanan: $scope.noRecstrukPelayanan,
						namaPetugas: $scope.namaPetugas,
						beratLinen: $scope.beratLinen,
						IdPetugas: $scope.IdPetugas
					});
				}
			}




			var onChange = function (e) {
				var grid = $(this).data("mainGridOptions");
			}

			$scope.input = function () {
				$state.go('RevPencucianLinen');
			}

			$scope.mainGridOptions = {
				pageable: true,
				change: onChange,
				scrollable: true,
				selectable: 'row',
				toolbar: ["excel", "pdf"],
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
						"title": "<h3 align=center>No.<h3>",
						"filterable": true,
						"width": "30px",
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						},
						"filterable": false
					},
					{
						field: "TanggalPencucian",
						title: "<h3 align=center>Tanggal Pencucian<h3>",
						headerAttributes: { style: "text-align : center" },
						columns: [
							{
								field: "tanggalawal",
								title: "<h3 align=center>Tanggal Awal<h3>",
								width: 100,
								filterable: false
							},
							{
								field: "tanggalakhir",
								title: "<h3 align=center>Tanggal Akhir<h3>",
								width: 100, filterable: false
							}],
						width: "200px", filterable: false
					},
					{
						"field": "petugasname",
						"title": "<h3 align=center>Nama Petugas<h3>",
						"width": "120px",
						"filterable": false
					},
					{
						"field": "namaAlat",
						"title": "<h3 align=center>Nama Mesin<h3>",
						"filterable": false,
						"width": "100px"
					},
					{
						"field": "kapasitasAlat",
						"title": "<h3 align=center>Kapasitas Mesin<h3>",
						"filterable": false,
						"width": "70px",
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						},
					},
					{
						"field": "beratLinen",
						"title": "<h3 align=center>Berat Linen<h3>",
						"width": "70px",
						"filterable": false,
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						},
					},
					{
						"field": "satuanStandar",
						"title": "<h3 align=center>Satuan<h3>",
						"width": "70px",
						"filterable": false
					},
					{
						"field": "totwaktu",
						"title": "<h3 align=center>Total Waktu<h3>",
						"filterable": true,
						"width": "100px",
						"filterable": false
					}
					/*,
					{
						"field": "keteranganlainnya",
						"title": "<h3 align=center>Keterangan<h3>",
						"width": "100px",
						"filterable":false		
					}*/
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


//=================================================================================== 
// $scope.pengeringan=function() {
//  	$state.go("Pengeringan")
//  }
/*data: [{
"no" : "1",
"namaMesin" : "Mesin Nomor 1",
"nostruk" : "001A",
"prosesCuci" : "Bilas I",
"tglawal" : "2017-01-01",
"tglakhir" : "2017-01-01",
"KapasitasMesin" : "20",
"satuan" : "ML",
"Jumlah" : "20",
"keterangan" : "20"
}]*/


/*$scope.mainGridOptions_1_3 = function(dataItem) {
return {
dataSource: new kendo.data.DataSource({
data: dataItem.produkLinens
}),
columns: [
{
field: "namaProduk",
title: "Nama Linen"
},
{
field: "jumlah",
title: "Jumlah"

},
{
field: "namaSatuan",
title: "Satuan"

},{
field: "hargaSatuan",
title: "Biaya" 
}
]
}
}
*/
/*		$scope.mainGridOptions_1_2 = function(dataItem) {
return {
dataSource: new kendo.data.DataSource({
data: dataItem.kapasitasBahanMesins
}),
columns: [
{
field: "namaProdukBahan",
title: "Nama Bahan"
},
{
field: "jumlahBahan",
title: "Jumlah"
},
{
field: "namaSatuanBahan",
title: "Satuan"
}]
}
}*/

/*				 $scope.pindah = function(current){ 
$state.go("PembilasanLinen",{nmmesin:$scope.item.nmmesin,kapasitas:$scope.item.kapasitas,namaPetugas:$scope.item.namaPetugas,beratLinen:$scope.item.beratLinen,prosesCuci:$scope.item.prosesCuci,mesinId:$scope.item.mesinId,petugasId:$scope.item.petugasId,ruanganAsalId:$scope.item.ruanganAsalId,noRecStrukPelayanan:$scope.item.noRecStrukPelayanan});
}*/
