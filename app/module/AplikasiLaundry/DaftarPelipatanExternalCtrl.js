define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPelipatanExternalCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry', '$mdDialog', '$element',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry, $mdDialog, $element) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.Rubahdat = false;


			$scope.ChangeDat = function () {
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
					ManageLaundry.getOrderList("laundry/get-proses-pelipatan-external?startDate=" + tanggalawal + "&endDate=" + tanggalakhir).then(function (dat) {
						$scope.sourceOrder = dat.data.data;
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

							/*Set Total Waktu*/
							var tanggalAwalPencucian = new moment($scope.sourceOrder[i].tglplanning).format('YYYY-MM-DD');
							var tanggalAkhirPencucian = new moment($scope.sourceOrder[i].tglPlanningAkhir).format('YYYY-MM-DD');
							var JamAwalPencucian = new moment($scope.sourceOrder[i].tglplanning).format('HH:mm');
							var JamAkhirPencucian = new moment($scope.sourceOrder[i].tglPlanningAkhir).format('HH:mm');
							var TotalWaktu = DateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian + " " + JamAwalPencucian, tanggalAkhirPencucian + " " + JamAkhirPencucian);
							$scope.sourceOrder[i].totwaktu = TotalWaktu;
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
							filters: [{ field: "pegawai", operator: "contains", value: q }]
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
			}

			$scope.RollPress = function () {
				debugger
				if ($scope.noRecStrukPelayanan != undefined) {
					$state.go('RollPressExternal', {
						noRec: $scope.noRecStrukPelayanan
					})
				} else {
					window.messageContainer.error('Harap Pilih Data Terlebih dahulu')
				}
			}

			$scope.PelipatanInternal = function () {
				$state.go('PelipatanInternal');
			}

			$scope.getdata = {};
			$scope.openWindow = function (getdata) {
				/*if($scope.noRec != undefined){*/
				ManageLaundry.getOrderList("laundry/get-proses-pelipatan-external-by-norec?noRec=" + $scope.noRec).then(function (dat) {
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
					for (var i = 0; i < $scope.SourceDataDetail.length; i++) {
						$scope.SourceDataDetail[i].no = $scope.number++ + "."
					}
					var myWindow = $("#winPopUp");
					myWindow.data("kendoWindow").open();
					$scope.isShowPopUp = true;
					$scope.countTotal($scope.SourceDataDetail);
				});
				/* }else{
						toastr.warning('Data Harus dipilih terlebih dahulu')
				 }*/
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
						field: "TanggalPelipatan", title: "Tanggal Pelipatan", headerAttributes: { style: "text-align : center" },
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
						"title": "Jumlah Lipatan",
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
