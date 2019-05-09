define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPengambilanLinenCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.daftarPencucianLinen = new kendo.data.DataSource({
				data: [

				]
			});

			$scope.klik = function (m) {
				debugger;
				$scope.m = m;
				if (m.statusAmbil == "Sudah Di Ambil") {
					$scope.item.namaPenerima = m.namaLengkapAmbil;
					$scope.item.statusAmbil = m.statusAmbil;
					$scope.item.jumlahPembayaran = m.grantTotalHargaSatuan;
					$scope.item.noRec = m.noRecStrukPelayanan;
					$scope.item.keterangan = m.keteranganAmbil;
					$scope.item.noStrukPelayanan = m.noStrukPelayanan;
					$scope.item.pelangganId = m.pelangganId;
					$scope.item.namaPelanggan = m.namaPelanggan;
					$scope.item.alamat = m.alamat;
					$scope.item.noRecStrukPelayanan = m.noRecStrukPelayanan;
					$scope.item.statusBayar = m.statusBayar;
				}
				else {
					$scope.item.namaPenerima = "";
					$scope.item.statusAmbil = m.statusAmbil;
					$scope.item.keterangan = "";
					$scope.item.jumlahPembayaran = m.grantTotalHargaSatuan;
					$scope.item.noRec = m.noRecStrukPelayanan;
					$scope.item.statusBayar = m.statusBayar;

				}




			};



			$scope.batton = function () {
				debugger;
				if ($scope.item.statusAmbil == 'Belum Di Ambil') {

					$scope.a = true;
					$scope.b = false;
				}
				else {

					$scope.a = false;
					$scope.b = true;

				}
			}







			$scope.pindah = function (current) {

				if ($scope.item.statusAmbil == undefined) {
					window.messageContainer.error('Pilih data terlebih dahulu')
				} else {

					$state.go("ReturLinenLaundry", { noStrukPelayanan: $scope.item.noStrukPelayanan, pelangganId: $scope.item.pelangganId, namaPelanggan: $scope.item.namaPelanggan, alamat: $scope.item.alamat, noRecStrukPelayanan: $scope.item.noRecStrukPelayanan });
				}
			}


			Proses();
			function Proses() {

				debugger
				var pelanggan = $scope.item.namaPelanggan;
				var awal = moment($scope.item.awal).format("YYYY-MM-DD 00:00:00");
				var akhir = moment($scope.item.akhir).format("YYYY-MM-DD hh:mm:ss");




				if (pelanggan === undefined) {
					ManageSarpras.getOrderList("laundry/get-all-pengambilan-eksternal?namaPelanggan=&startPeriode=" + awal + "&endPeriode=" + akhir).then(function (dat) {

						$scope.sourceOrder = dat.data.data;
					});

				} else {
					ManageSarpras.getOrderList("laundry/get-all-pengambilan-eksternal?namaPelanggan=" + pelanggan + "&startPeriode=" + awal + "&endPeriode=" + akhir).then(function (dat) {

						$scope.sourceOrder = dat.data.data;
					});
				}
			}



			$scope.Cari = function () {

				var pelanggan = $scope.item.namaPelanggan;
				var awal = moment($scope.item.awal).format("YYYY-MM-DD 00:00:00");
				var akhir = moment($scope.item.akhir).format("YYYY-MM-DD hh:mm:ss");

				if (pelanggan == undefined) {
					pelanggan = "";
				}
				else {
					pelanggan = $scope.item.namaPelanggan;
				}

				// debugger;
				ManageSarpras.getOrderList("laundry/get-all-pengambilan-eksternal?namaPelanggan=" + pelanggan + "&startPeriode=" + awal + "&endPeriode=" + akhir).then(function (dat) {
					// debugger;
					$scope.sourceOrder = dat.data.data;
					// debugger;
				});

			}
			Proses();
			var onChange = function (e) {
				//var inputId = this.element.attr("id");
				//  console.log(inputId);
				var grid = $(this).data("mainGridOptions");
			}

			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.mainGridOptions = {
				pageable: true,
				change: onChange,
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
				columns: [{
					"field": "noStrukPelayanan",
					"title": "No Order",
					"filterable": true
				}, {
					"field": "tglPencucianLinen",
					"title": "Tanggal",
					"width": "200px",
					"template": "#= new moment(new Date(tglPencucianLinen)).format('DD-MM-YYYY') #",
					"filterable": false

				}, {
					"field": "namaPelanggan",
					"title": "Nama Pelanggan"
				}, {
					"field": "grantQtyProduk",
					"title": "Jumlah"
				}, {
					"field": "grantTotalHargaSatuan",
					"title": "Grand Total",
					"template": "{{formatRupiah('#: grantTotalHargaSatuan #', 'Rp.')}}",
					"filterable": true
				}, {
					"field": "statusBayar",
					"title": "Status Bayar",
					"filterable": true
				}, {
					"command": [{
						name: "edit",
						text: "Detail",
						text: { cancel: "", edit: "Detail" },
						icon: { cancel: "" },
						button: { cancel: "" }
					}],
					"title": "Detail/Rincian Order",
					width: "200px"



				}, {
					"field": "statusAmbil",
					"title": "Status Ambil",
					"filterable": true
				}],
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


			$scope.mainGridOptions_1_2 = function (dataItem) {
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
			}


			$scope.mainGridOptions_1_3 = function (dataItem) {
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


						}, {
							field: "hargaSatuan",
							title: "Harga Satuan",
							width: "100px",
							template: "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}"

						}, {
							field: "totalHargaSatuan",
							title: "Total Harga Satuan",
							width: "200px",
							template: "{{formatRupiah('#: totalHargaSatuan #', 'Rp.')}}",
							footerTemplate: "<center>{{formatRupiah('#: sum #', 'Rp.')}}</center> "

						}

					],
					resizable: true

				}
			}

			$scope.Save = function () {

				var data1 = {


					"noRecStrukPelayanan": $scope.item.noRec,
					"tglAmbil": moment($scope.item.tglAmbil).format("YYYY-MM-DD hh:mm:ss"),
					"namaLengkapAmbil": $scope.item.namaPenerima,
					"keteranganAmbil": $scope.item.keterangan


				}

				if ($scope.item.statusBayar == "Belum Bayar") {
					window.messageContainer.error('Lakukan Pembayaran terlebih dahulu')
				} else {

					ManageSarpras.saveMasterAlatLaundry(data1, "laundry/save-pengambilan").then(function (e) {
						debugger;
						//    $scope.item= {};
						Proses();
						/*$state.go('dashboardpasien.TandaVital', {
						 noCM: $scope.noCM
						 });*/
					});
				}

			};





			//  $scope.pengeringan=function() {
			//  	$state.go("Pengeringan")
			//  }

		}
	]);
});