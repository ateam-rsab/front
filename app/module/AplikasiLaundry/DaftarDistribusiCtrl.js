define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarDistribusiCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageLaundry',
		function ($rootScope, $scope, ModelItem, DateHelper, ManageLaundry) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.isShowPopUp = false;
			$scope.rubahdat = false;
			$scope.daftarDistrubusi = new kendo.data.DataSource({
				data: []
			});

			$scope.ChangeDate = function () {
				debugger
				$scope.rubahdat = false;
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Cari();
			}

			$scope.number = 1;
			$scope.Cari = function (Pencarians) {
				// debugger
				var getPencarian = Pencarians;
				if ($scope.rubahdat == false && getPencarian == undefined) {
					var tanggalAwal = new moment(new Date($scope.item.awal)).format('YYYY-MM-DD');
					var tanggalAkhir = new moment(new Date($scope.item.akhir)).format('YYYY-MM-DD');
					ManageLaundry.getOrderList("laundry/get-distribusi-linen-bersih?startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir).then(function (dat) {
						$scope.sourceDistribusi = dat.data.data;
						for (var i = 0; i < $scope.sourceDistribusi.length; i++) {
							$scope.sourceDistribusi[i].number = $scope.number++;
							$scope.sourceDistribusi[i].tglPengiriman = new moment(new Date($scope.sourceDistribusi[i].tglPengiriman)).format('DD-MM-YYYY hh:mm:ss');
						}
					});
					$scope.rubahdat = true;
				} else {
					$scope.CariPegawai(getPencarian);
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
								{ field: "Petugas", operator: "contains", value: q },
								{ field: "ruanganPenerima", operator: "contains", value: q }
							]
						}
					});
				}
			}


			$scope.kl = function (current) {
				$scope.no = current.no;
				$scope.Petugas = current.Petugas;
				$scope.idPegawaiPenerima = current.idPegawaiPenerima;
				$scope.idPetugas = current.idPetugas;
				$scope.idRuanganPenerima = current.idRuanganPenerima;
				$scope.namaPegawaiPenerima = current.namaPegawaiPenerima;
				$scope.noRec = current.noRec;
				$scope.nostruk = current.nostruk;
				$scope.number = current.number;
				$scope.ruanganPenerima = current.ruanganPenerima;
				$scope.tglPengiriman = current.tglPengiriman;
				$scope.tglterimakiriman = current.tglterimakiriman;
			}



			$scope.ClearCari = function () {
				$scope.Pencarians = "";
				var gridData = $("#grid").data("kendoGrid");
				gridData.dataSource.filter({});
			}



			$scope.cancelData = function () {
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
			}

			$scope.closeWindow = function () {
				$scope.isShowPopUp = false;
			}


			$scope.openWindow = function () {
				$scope.numberx = 1;
				if ($scope.noRec != undefined) {
					ManageLaundry.getOrderList("laundry/get-distribusi-linen-bersih-detail?noRec=" + $scope.noRec).then(function (dat) {
						$scope.SourceData = dat.data.data[0]
						$scope.SourceDataDetail = dat.data.data[0].detail;
						$scope.item.tanggalpengiriman = new moment(new Date($scope.SourceData.tglPengiriman)).format('DD-MM-YYYY hh:mm:ss');
						$scope.item.petugas = $scope.SourceData.Petugas;
						for (var i = 0; i < $scope.SourceDataDetail.length; i++) {
							$scope.SourceDataDetail[i].number = $scope.numberx++;
						}
					});
					var myWindow = $("#winPopUp");
					myWindow.data("kendoWindow").open();
					$scope.isShowPopUp = true;
				} else {
					window.messageContainer.error("Pilih Data Terlebih dahulu !!")
				}
			}

			$scope.mainGridOptions = {
				pageable: true,
				
				/*selectable:'row',*/
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
						"field": "number",
						"title": "<h3 align=center>No.</h3>",
						"width": "10px",
						"filterable": false

					},
					{
						"field": "nostruk",
						"title": "<h3 align=center>Nomor Struk</h3>",
						"width": "40px",
						"filterable": false,
						"attributes": {
							"class": "table-cell",
							"style": "text-align : center"
						}

					},
					{
						"field": "tglPengiriman",
						"title": "<h3 align=center>Tanggal Pengiriman</h3>",
						"width": "50px",
						"filterable": false,
						attributes: {
							"class": "table-cell",
							style: "text-align : center"
						}
					},
					{
						"field": "Petugas",
						"title": "<h3 align=center>Petugas</h3>",
						"width": "100px",
						"filterable": false
					},
					{
						"field": "namaPegawaiPenerima",
						"title": "<h3 align=center>Yang Menerima</h3>",
						"width": "100px",
						"filterable": false
					},
					{
						"field": "ruanganPenerima",
						"title": "<h3 align=center>Ruang Tujuan</h3>",
						"width": "100px",
						"filterable": false
					}
				],
			};

			$scope.mainGridOptions2 = {
				pageable: true,
				scrollable: false,
				columns: [
					{
						"field": "number",
						"title": "<h3 align=center>No</h3>",
						"width": "20px"
					},
					{
						"field": "namaProduk",
						"title": "<h3 align=center>Nama Linen</h3>",
						"width": "100px"
					},
					{
						"field": "namaExternal",
						"title": "<h3 align=center>Satuan</h3>",
						"width": "100px"
					},
					{
						"field": "qtyproduk",
						"title": "<h3 align=center>Qty<h3>",
						"width": "70px"
					}
				],
			};

		}
	]);
});