define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPelipatanCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry', '$mdDialog', '$element',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry, $mdDialog, $element) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.Rubahdat = false;
			$scope.CheckOne = true;

			$scope.RubahDate = function () {
				$scope.Rubahdat = false;
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.Cari();
			}

			$scope.Cari = function (Pencarians) {
				var getPencarian = Pencarians;
				var tanggalawal = new moment(new Date($scope.item.awal)).format('YYYY-MM-DD');
				var tanggalakhir = new moment(new Date($scope.item.akhir)).format('YYYY-MM-DD');
				if ($scope.Rubahdat == false && getPencarian == undefined) {
					$scope.numbers = 1
					ManageLaundry.getOrderList("laundry/get-proses-pelipatan?startDate=" + tanggalawal + "&endDate=" + tanggalakhir).then(function (dat) {
						$scope.sourceOrder = dat.data.data;
						$scope.dataSourcePelipatan = new kendo.data.DataSource({
							data: $scope.sourceOrder,
							pageSize: 10
						})
						for (var i = 0; i < $scope.sourceOrder.length; i++) {
							var tanggalawal = new moment(new Date($scope.sourceOrder[i].tglplanning)).format('DD-MM-YYYY hh:mm:ss');
							var tanggalakhir = new moment(new Date($scope.sourceOrder[i].tglPlanningAkhir)).format('DD-MM-YYYY hh:mm:ss');
							if ($scope.sourceOrder[i].petugas[0] != undefined) {
								var petugas = $scope.sourceOrder[i].petugas[0].namapegawai;
							} else {
								var petugas = "....................";
							}
							$scope.sourceOrder[i].pegawai = petugas;
							$scope.sourceOrder[i].tanggalawal = tanggalawal;
							$scope.sourceOrder[i].tanggalakhir = tanggalakhir;
							$scope.sourceOrder[i].no = $scope.numbers++ + ".";

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
					});
					$scope.Rubahdat = true;
				} else {
					$scope.CariPegawai(getPencarian);
				}
			}
			$scope.Cari();

			$scope.ClearCari = function () {
				$scope.Pencarians = "";
				var gridData = $("#grid").data("kendoGrid");
				gridData.dataSource.filter({});
			}

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
			$scope.isShowPopUpLinen = false;
			$scope.nomor = 1;

			$scope.kl = function (current) {
				debugger
				$scope.current = current;
				$scope.item.keteranganlainnya = current.keteranganlainnya;
				$scope.item.no = current.no;
				$scope.noRec = current.noRec;
				$scope.noRecStrukPelayanan = current.noRecstrukPelayanan;
				$scope.item.pegawai = current.pegawai;
				$scope.item.petugas = current.petugas;
				$scope.item.tanggalakhir = current.tanggalakhir;
				$scope.item.tanggalawal = current.tanggalawal;
				$scope.CheckOne = false;
			}

			$scope.RollPress = function () {
				if ($scope.noRecStrukPelayanan) {
					$state.go('RollPressInternal', {
						noRecStrukPelayanan: $scope.noRecStrukPelayanan
					})
				} else {
					toastr.warning('Anda Belum Memilih Data Untuk di Roll')
				}
			}

			$scope.PelipatanInternal = function () {
				$state.go('PelipatanInternal');
			}

			$scope.getdata = {};
			$scope.openWindow = function (getdata) {
				if ($scope.noRec != undefined) {
					ManageLaundry.getOrderList("laundry/get-proses-pelipatan-by-norec?noRec=" + $scope.noRec).then(function (dat) {
						$scope.SourceData = dat.data.data[0];
						if ($scope.SourceData.petugas[0] != undefined) {
							$scope.item.petugasdet = $scope.SourceData.petugas[0].namapegawai;
						}
						$scope.item.tglplanningdet = $scope.item.tanggalawal;
						$scope.item.tglPlanningAkhirdet = $scope.item.tanggalakhir;
						$scope.SourceData.noRecstrukPelayanan;
						$scope.SourceData.noRec;
						$scope.number = 1
						$scope.SourceDataDetail = $scope.SourceData.detail;
						$scope.detailDaftarPelipatan = new kendo.data.DataSource({
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
				debugger
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

			$scope.openWindowLinen = function (getdata) {
				var myWindow = $("#winPopUpLinen");
				myWindow.data("kendoWindow").open();
				$scope.isShowPopUpLinen = true;
			}


			$scope.cancelData = function () {
				debugger
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
			}
			$scope.cancelDataLinen = function () {
				var myWindow = $("#winPopUpLinen");
				myWindow.data("kendoWindow").close();
			}

			$scope.closeWindow = function () {
				$scope.isShowPopUp = false;
			}

			$scope.closeWindowLinen = function () {
				$scope.isShowPopUpLinen = false;
			}

			var retrievedObject = localStorage.getItem('added-items');
			var itemPegawai = localStorage.getItem('added-namaPegawai');
			var titles = JSON.parse(itemPegawai);
			function namaFilter(element) {
				element.kendoAutoComplete({
					dataSource: titles
				});
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
						field: "TanggalPelipatan", title: "Tanggal Pelipatan", headerAttributes: { style: "text-align : center" },
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
						"title": "<h3 align=center>Jumlah Lipatan<h3>",
						"width": "70px",
						"filterable": false

					}
				]
			};
		}
	]);
});

/*========================================SOURCE OLD DATA==========================		
$scope.Proses = function () {
		debugger
		  var gaji = moment($scope.item.awal).format("YYYY-MM-DD 00:00:00") ;	
		  var kerja =  moment($scope.item.akhir).format("YYYY-MM-DD hh:mm:ss") ;		
		  ManageLaundry.getOrderList("laundry/get-all-pelipatan?startPeriode="+gaji+"&endPeriode="+kerja ).then(function(dat){
		  $scope.sourceOrder = dat.data.data;
		  });			
		}*/
