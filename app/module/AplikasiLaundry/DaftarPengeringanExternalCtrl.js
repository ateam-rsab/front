define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPengeringanExternalCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.Rubahdata = false;
			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: []
			});
			$scope.no = 1;
			$scope.isShowPopUp = false;
			$scope.pindah = function (current) {
				if ($scope.item.status == undefined) {
					window.messageContainer.error('Pilih data terlebih dahulu')
				} else {
					$state.go("Pelipatan", { noRecStrukPelayanan: $scope.item.noRecStrukPelayanan, namaPelanggan: $scope.item.namaPelanggan, ruanganAsalId: $scope.item.ruanganAsalId });
				}
			}


			$scope.kl = function (current) {
				debugger
				$scope.BeratLinen = current.beratLinen;
				$scope.idMesin = current.idMesin;
				$scope.kapasitasAlat = current.kapasitasAlat;
				$scope.keteranganlainnya = current.keteranganlainnya;
				$scope.namaAlat = current.namaAlat;
				$scope.no = current.no;
				$scope.noRec = current.noRec;
				$scope.noRecstrukPelayanan = current.noRecstrukPelayanan;
				$scope.satuanStandar = current.satuanStandar
				$scope.tglPlanningAkhir = moment(current.tglPlanningAkhir).format("YYYY-MM-DD hh:mm:ss"),
					$scope.tglplanning = moment(current.tglplanning).format("YYYY-MM-DD hh:mm:ss")
			}

			$scope.Pelipatan = function () {
				debugger
				if ($scope.noRecstrukPelayanan != undefined) {
					$state.go('PelipatanExternal', {
						noRec: $scope.noRecstrukPelayanan
					})
				} else {
					window.messageContainer.error('Harap Pilih data terlebih dahulu')
				}
			}

			$scope.ChangeDat = function () {
				$scope.Rubahdata = false;
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Cari();
			}

			$scope.Cari = function (Pencarians) {
				var getPencarian = Pencarians;
				var tanggalawal = new moment($scope.item.awal).format('YYYY-MM-DD');
				var tanggalakhir = new moment($scope.item.akhir).format('YYYY-MM-DD');
				if (getPencarian == undefined && $scope.Rubahdata == false) {
					$scope.nomors = 1;
					ManageLaundry.getOrderList("laundry/get-proses-pengeringan-external?startDate=" + tanggalawal + "&endDate=" + tanggalakhir).then(function (dat) {
						debugger
						$scope.sourceOrder = dat.data.data
						for (var i = 0; i < $scope.sourceOrder.length; i++) {
							$scope.sourceOrder[i].no = $scope.nomors++ + ".";



							/*Set Total Waktu*/
							var tanggalAwalPencucian = new moment($scope.sourceOrder[i].tglplanning).format('YYYY-MM-DD');
							var tanggalAkhirPencucian = new moment($scope.sourceOrder[i].tglPlanningAkhir).format('YYYY-MM-DD');
							var JamAwalPencucian = new moment($scope.sourceOrder[i].tglplanning).format('HH:mm');
							var JamAkhirPencucian = new moment($scope.sourceOrder[i].tglPlanningAkhir).format('HH:mm');
							var TotalWaktu = DateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian + " " + JamAwalPencucian, tanggalAkhirPencucian + " " + JamAkhirPencucian);
							$scope.sourceOrder[i].totwaktu = TotalWaktu;
						}
					});
					$scope.Rubahdata = true;
				} else {
					$scope.CariPegawai(getPencarian);
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
								{ field: "namaAlat", operator: "contains", value: q },
								{ field: "satuanStandar", operator: "contains", value: q }
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


			$scope.openWindow = function () {
				if ($scope.noRec == undefined) {
					toastr.warning('Pilih "1" Data Terlebih Dahulu')
				} else {
					$scope.nomor = 1;
					ManageLaundry.getOrderList('laundry/get-proses-pengeringan-external-by-norec?noRec=' + $scope.noRec).then(function (dat) {
						$scope.SourceDataDetail = dat.data.data;
						for (var i = 0; i < $scope.SourceDataDetail.length; i++) {
							var dataSources = $scope.SourceDataDetail[i];
							$scope.SourceDataDetail[i].no = $scope.nomor++ + ".";
							$scope.SourceDataDetail[i].pegawai = (dataSources.petugas[0].namapegawai);
						}
					})
					$scope.item.JamAwal = $scope.tglplanning;
					$scope.item.JamAkhir = $scope.tglPlanningAkhir;
					$scope.item.NamaMesindet = $scope.namaAlat;
					$scope.item.kapasitasdet = $scope.kapasitasAlat;
					$scope.item.satuandet = $scope.satuanStandar;
					var myWindow = $("#winPopUp");
					myWindow.data("kendoWindow").open();
					$scope.isShowPopUp = true;
				}
			}

			$scope.cancelData = function () {
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
			}

			$scope.closeWindow = function () {
				$scope.isShowPopUp = false;
			}

			$scope.mainGridOptions = {
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
						attributes: {
							"class": "table-cell",
							style: "text-align: center;"
						},
						"filterable": false
					},
					{
						field: "TanggalPengeringan", title: "Tanggal Pencucian", headerAttributes: { style: "text-align : center" },
						columns: [
							{
								field: "tglplanning",
								title: "Jam Mulai",
								width: 100, filterable: false,
								"template": "#= new moment(new Date(tglplanning)).format('DD-MM-YYYY hh:mm:ss') #"
							},
							{
								field: "tglPlanningAkhir",
								title: "Jam Selesai", width: 100, filterable: false,
								"template": "#= new moment(new Date(tglPlanningAkhir)).format('DD-MM-YYYY hh:mm:ss') #"
							}],
						width: "200px", filterable: false
					},
					{
						"field": "totwaktu",
						"title": "Total Waktu",
						"width": "120px",
						"filterable": true
					},
					{
						"field": "namaAlat",
						"title": "Nama Mesin",
						"width": "120px",
						"filterable": true
					},
					{
						"field": "kapasitasAlat",
						"title": "Kapasitas Mesin",
						"width": "70px",
						"filterable": false
					},
					{
						"field": "satuanStandar",
						"title": "Satuan",
						"width": "80px",
						"filterable": false
					},
					{
						"field": "beratLinen",
						"title": "Berat Linen",
						"width": "70px",
						"filterable": false
					},
					{
						"field": "keteranganlainnya",
						"title": "Keterangan",
						"width": "150px",
						"filterable": false
					}],
			};

			$scope.mainGridOptions2 = {
				editable: "popup",
				pageable: true,
				pageSize: 5,
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
						"field": "namaAlat",
						"title": "Nama Mesin",
						"width": "70px",
						"filterable": false

					},
					{
						"field": "jumlahCycle",
						"title": "Jumlah Cycle",
						"width": "70px",
						"filterable": false
					},
					{
						"field": "beratLinen",
						"title": "Berat Linen",
						"width": "80px",
						"filterable": false
					},
					{
						"field": "pegawai",
						"title": "Petugas",
						"width": "120px"
					}
				]
			};
		}
	]);
});


/*======================================SOURCE OLD DATA =======================================================================			
$scope.mainGridOptions_1_2 = function(dataItem) {
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


/*			$scope.mainGridOptions_1_3 = function(dataItem) {
               return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.produkLinens,
						aggregate: [
									{ field: "totalHargaSatuan", aggregate: "sum" }
	                               ]
						
					}),
                    columns: [
                    {
	                    field: "namaProduk",
	                    title: "Nama Linen",
						width: "100px"
					
	                },
	                {
	                    field: "jumlah",
	                    title: "Jumlah",
						width: "100px"
					   
	                },
					    {
	                    field: "namaSatuan",
	                    title: "Satuan",
						width: "100px"
						
					   
	                },{
	                    field: "hargaSatuan",
	                    title: "Harga Satuan",
						width: "100px",
					    template: "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}"	
						
					},{
	                    field: "totalHargaSatuan",
	                    title: "Total Harga Satuan",
						width: "200px",
						template: "{{formatRupiah('#: totalHargaSatuan #', 'Rp.')}}",	
						footerTemplate: "<center>{{formatRupiah('#: sum #', 'Rp.')}}</center> "	
					   
					}
					
					],     
        resizable: true
					
                }
			}*/
