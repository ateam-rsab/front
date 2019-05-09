define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PelipatanInternalCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry', 'ManageSarpras', 'FindLaundry', 'FindSarpras', '$timeout', '$window',
		function ($rootScope, $scope, $state, ModelItem, dateHelper, ManageLaundry, ManageSarpras, FindLaundry, FindSarpras, $timeout, $window) {
			$scope.item = {};
			$scope.disabledSave = false;
			$scope.now = new Date();
			$scope.tanggalawal = $scope.now;
			$scope.tanggalakhir = $scope.now;
			$scope.dataPost = [];
			$scope.getdata = {};
			$scope.isShowPopUp = false;
			$scope.isRouteLoading = false;
			$scope.noRecStrukPelayanan = $state.params.noRecStrukPelayanan;
			$scope.namaPelanggan = $state.params.namaPelanggan;
			$scope.ruanganAsalId = $state.params.ruanganAsalId;
			$scope.no = 1;

			$scope.initPegawai = function () {
				$scope.tanggalawal
				$scope.tanggalakhir
				var tanggalawal = new moment(new Date($scope.tanggalawal)).format('YYYY-MM-DD');
				var tanggalakhir = new moment(new Date($scope.tanggalakhir)).format('YYYY-MM-DD');
				ManageLaundry.getOrderList("laundry/get-proses-pelipatan?startDate=" + tanggalawal + "&endDate=" + tanggalakhir).then(function (dat) {
					$scope.dataPegawai = dat.data.data;
					$scope.nomor = 1;
					for (var i = 0; i < $scope.dataPegawai.length; i++) {
						var tanggalawal = new moment(new Date($scope.dataPegawai[i].tglplanning)).format('DD-MM-YYYY hh:mm:ss');
						var tanggalakhir = new moment(new Date($scope.dataPegawai[i].tglPlanningAkhir)).format('DD-MM-YYYY hh:mm:ss');
						if ($scope.dataPegawai[i].petugas[0] != undefined) {
							var petugas = $scope.dataPegawai[i].petugas[0].namapegawai;
						} else {
							var petugas = "....................";
						}
						$scope.dataPegawai[i].pegawai = petugas;
						$scope.dataPegawai[i].tanggalawal = tanggalawal;
						$scope.dataPegawai[i].tanggalakhir = tanggalakhir;
						$scope.dataPegawai[i].no = $scope.nomor++ + ".";
						$scope.dataPegawai[i].statCheckbox = false;

						/*Generate CountTotalWaktu*/
						var TanggalMulaiwkt = new moment($scope.dataPegawai[i].tglplanning).format('DD');
						var TanggalSelesaiwkt = new moment($scope.dataPegawai[i].tglPlanningAkhir).format('DD');
						var LamaSelesaiwkt = TanggalSelesaiwkt - TanggalMulaiwkt;
						var MulaiFormatJam = new moment($scope.dataPegawai[i].tglplanning).format('HH');
						var SelesaiFormatJam = new moment($scope.dataPegawai[i].tglPlanningAkhir).format('HH');
						var formatLamaJam = SelesaiFormatJam - MulaiFormatJam;
						var MulaiFormatMenit = new moment($scope.dataPegawai[i].tglplanning).format('mm');
						var SelesaiFormatMenit = new moment($scope.dataPegawai[i].tglPlanningAkhir).format('mm');
						var formatLamaMenit = SelesaiFormatMenit - MulaiFormatMenit;
						var totalwaktu = LamaSelesaiwkt + " Hari, " + formatLamaJam + " Jam, " + formatLamaMenit + " Menit";
						/*End Generate*/

						$scope.dataPegawai[i].totwaktu = totalwaktu;
					}
				});
			}
			$scope.initPegawai();

			$scope.SetTotalJam = function () {
				debugger
				var tanggalAwalPencucian = new moment($scope.item.tglPencucian).format('YYYY-MM-DD');
				var tanggalAkhirPencucian = new moment($scope.item.tglSelesaiPencucian).format('YYYY-MM-DD');
				var JamAwalPencucian = new moment($scope.item.jamAwal).format('HH:mm');
				var JamAkhirPencucian = new moment($scope.item.jamAkhir).format('HH:mm');
				var TotalWaktu = DateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian + " " + JamAwalPencucian, tanggalAkhirPencucian + " " + JamAkhirPencucian);
				return $scope.item.TotalJam = TotalWaktu;
			}


			$scope.SetTotalJam = function () {
				debugger
				var tanggalAwalPencucian = new moment($scope.item.tanggalPelipatan).format('YYYY-MM-DD');
				var tanggalAkhirPencucian = new moment($scope.item.tanggalKerja).format('YYYY-MM-DD');
				var JamAwalPencucian = new moment($scope.item.jamAwal).format('HH:mm');
				var JamAkhirPencucian = new moment($scope.item.jamAkhir).format('HH:mm');
				var TotalWaktu = dateHelper.CountDifferenceDayHourMinute(tanggalAwalPencucian + " " + JamAwalPencucian, tanggalAkhirPencucian + " " + JamAkhirPencucian);
				return $scope.item.totalwaktu = TotalWaktu;
			}

			//GET SERVICE
			ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
				$scope.dataMasterPetugas = dat.data;
			});

			FindLaundry.getLaundry("laundry/get-produk-pelipatan").then(function (dat) {
				$scope.sourceLinen = dat.data.data;
			});

			$scope.ClearCari = function () {
				$scope.Pencarians = "";
				var gridData = $("#gridpegawai").data("kendoGrid");
				gridData.dataSource.filter({});
			}

			$scope.$watchGroup(['item.qtylipat'], function (newValued, OldValue) {
				/* fungsi convert kg
				$scope.item.kg = ($scope.item.gram/1000) * $scope.item.qtylipat*/

				/*fungsi total gram*/
				$scope.item.kg = ($scope.item.gram * $scope.item.qtylipat);
			})

			if ($scope.item.gram == undefined) {
				$scope.item.gram = "..../gram"
			}

			$scope.RubahSatuan = function () {
				$scope.item.satuan = "potong";
				$scope.item.gram = 700;
			}

			$scope.DaftarPengeringan = function () {
				$state.go("DaftarPengeringan")
			}

			FindSarpras.getSarpras("user/get-user").then(function (dat) {
				$scope.item.petugas = dat.data.data.namaUser;
				$scope.item.petugasid = dat.data.data.pegawai.id;
			});

			$scope.dataPenerimaanLinen = new kendo.data.DataSource({
				data: []
			});

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
					"field": "no",
					"title": "<h3 align=center>No.<h3>",
					"width": "30px",
					attributes: {
						"class": "table-cell",
						style: "text-align: center"
					},
					"filterable": false
				}, {
					"field": "Linen.namaProduk",
					"title": "<h3 align=center>Linen<h3>",
					"width": "250px",
					"filterable": true
				},
				{
					"field": "satuan",
					"title": "<h3 align=center>Satuan<h3>",
					"width": "170px",
					"filterable": false
				},
				{
					"field": "gram",
					"title": "<h3 align=center>Per-Gram<h3>",
					"width": "90px",
					"filterable": false
				},
				{
					"field": "kg",
					"title": "<h3 align=center>Total Gram<h3>",
					"width": "150px",
					"filterable": false
				},
				{
					"field": "lipat",
					"title": "<h3 align=center>Jumlah Lipat<h3>",
					"width": "80px",
					"filterable": false
				}, {
					command: {
						text: "Hapus",
						width: "50px",
						align: "center",
						attributes: { align: "center" },
						click: $scope.removeDataPenerimaanLinen
					},
					title: "<h3 align=center>Action<h3>",
					width: "80px"
				}],
				pageable: true,
				sortable: false,
				selectable: "row",
				editable: "popup"
			};





			$scope.Cari = function (caripetugas) {
				debugger
				var q = caripetugas.namaLengkap;
				var grid = $("#gridpegawai").data("kendoGrid");
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

			$scope.DaftarPelipatan = function () {
				$state.go('DaftarPelipatan')
			}




			$scope.mainGridOptionsPegawai = {
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
						title: "<h3 align=center>✔<h3>",
						template: "# if (statCheckbox) { #" +
							"<input type='checkbox' class='checkbox' ng-disabled='statdisabled' ng-click='selectRow(dataItem)' checked />" +
							"# } else { #" +
							"<input type='checkbox' class='checkbox' ng-disabled='statdisabled' ng-click='selectRow(dataItem)' />" +
							"# } #",
						width: "10px"
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

			$scope.mainGridOptionsPegawaiDetail = {
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




			$scope.selectRow = function (dataItem) {
				$scope.statdisabled = true;
				var dataSelect = _.find($scope.dataPegawai, function (data) {
					return data.noRec == dataItem.noRec;
				});
				if (dataSelect.statCheckbox) {
					dataSelect.statCheckbox = false;
				}
				else {
					dataSelect.statCheckbox = true;
				}
				$scope.item.tglplanningdet = new moment(new Date(dataItem.tglplanning)).format('DD-MM-YYYY hh:mm:ss');
				$scope.item.tglPlanningAkhirdet = new moment(new Date(dataItem.tglPlanningAkhir)).format('DD-MM-YYYY hh:mm:ss');
				var myWindow = $("#winPopUp");
				myWindow.parent().find(".k-window-action").css("visibility", "hidden");
				myWindow.data("kendoWindow").open();
				$scope.isShowPopUp = true;
				$scope.noRec = dataItem.noRec;
				if ($scope.noRec != undefined) {
					ManageLaundry.getOrderList("laundry/get-proses-pelipatan-by-norec?noRec=" + $scope.noRec).then(function (dat) {
						debugger
						$scope.SourceData = dat.data.data[0];
						if ($scope.SourceData.petugas[0] != undefined) {
							$scope.item.petugasdet = $scope.SourceData.petugas[0].namapegawai;
						}
						$scope.SourceData.noRecstrukPelayanan;
						$scope.SourceData.noRec;
						$scope.number = 1
						$scope.SourceDataDetail = $scope.SourceData.detail;
						for (var i = 0; i < $scope.SourceDataDetail.length; i++) {
							debugger
							$scope.SourceDataDetail[i].no = $scope.number++ + "."
						}
						var myWindow = $("#winPopUp");
						myWindow.data("kendoWindow").open();
						$scope.isShowPopUp = true;
						$scope.countTotalPegawai($scope.SourceDataDetail);
					});
					refreshGrid($scope.dataPegawai);
				} else {
					toastr.warning('Data Harus dipilih terlebih dahulu')
					refreshGrid($scope.dataPegawai);
				}
			}


			$scope.countTotalPegawai = function (GetDataDetail) {
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
				debugger
				$scope.statdisabled = false;
				$scope.noRec;
				var dataSelect = _.find($scope.dataPegawai, function (data) {
					return data.noRec == $scope.noRec;
				});
				if (dataSelect.statCheckbox) {
					dataSelect.statCheckbox = false;
				}
				else {
					dataSelect.statCheckbox = true;
				}
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
				refreshGridpegawai($scope.dataPegawai);
			}


			function refreshGridpegawai(ds) {
				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});

				var grid = $('#gridpegawai').data("kendoGrid");
				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
			}

			var onChange = function (e) {
				var grid = $(this).data("mainGridOptions");

			}

			$scope.addDataPenerimaanLinen = function () {
				if ($scope.item.Linen == null || $scope.item.Linen == undefined) {
					toastr.warning('Produk Tidak Ada')
				} else if($scope.item.qtylipat == null || $scope.item.qtylipat == undefined) {
					toastr.warning('Qty Belum di isi')
				} else {
					var tempDataPenerimaanLinen = {
						"no": $scope.no++ + ".",
						"Linen": $scope.item.Linen,
						"lipat": $scope.item.qtylipat,
						"satuan": $scope.item.satuan,
						"gram": $scope.item.gram,
						"kg": $scope.item.kg
					}
					$scope.dataPenerimaanLinen.add(tempDataPenerimaanLinen);
					$scope.item.Linen = "";
					$scope.item.jumlahLipat = "";
					$scope.item.qtylipat = "";
					$scope.countTotal(tempDataPenerimaanLinen);
					refreshGrid($scope.dataPenerimaanLinen._data);
				}
			}

			function refreshGrid(ds) {
				debugger
				$scope.noRefresh = 1;
				for (var i = 0; i < ds.length; i++) {
					ds[i].no = $scope.noRefresh++;
				}
				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: false,
				});

				var grid = $('#grid').data("kendoGrid");
				grid.setDataSource(newDs);
				grid.refresh();
				$scope.dataVOloaded = true;
			}

			var TotalLipatresult = 0;
			var TotalKiloresult = 0;
			$scope.countTotal = function (argument) {
				// body...
				debugger
				if (argument != undefined) {
					TotalLipatresult += parseInt(parseInt(argument.lipat));
					TotalKiloresult += parseInt(argument.kg)
				}
				if ($scope.remove == true) {
					TotalLipatresult = parseInt($("#TOTli").val());
					TotalKiloresult = parseInt($("#TOTrat").val());
					TotalLipatresult += parseInt(argument.lipat);
					TotalKiloresult += parseInt(argument.kg);
					$scope.item.totalLipat = TotalLipatresult;
					$scope.item.totalkilo = TotalKiloresult;
				} else {
					$scope.item.totalLipat = TotalLipatresult;
					$scope.item.totalkilo = TotalKiloresult;
				}

			}
			$scope.countTotal();

			$scope.removeDataPenerimaanLinen = function (e) {
				debugger
				$scope.remove = true;
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var data = this.dataItem(tr);
				var qTotalLipat = $("#TOTli").val();
				var qTotalBerat = $("#TOTrat").val();
				$scope.item.totalLipat = (parseInt(qTotalLipat) - parseInt(data.lipat))
				$scope.item.totalkilo = (parseInt(qTotalBerat) - parseInt(data.kg))

				document.getElementById("TOTli").value = $scope.item.totalLipat;
				document.getElementById("TOTrat").value = $scope.item.totalkilo

				$scope.tempDataPenerimaanLinen = $scope.dataPenerimaanLinen
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				$scope.countTotalminus(data);
				grid.removeRow(row);
			};

			$scope.countTotalminus = function (data) {
				debugger
				var kurangBeratlipat = ($scope.item.totalkilo - data.kg);
				$scope.item.totalkilo = kurangBeratlipat;

				var kurangtotlipat = ($scope.item.totalLipat - data.lipat);
				$scope.item.totalLipat = kurangtotlipat;

			}


			$scope.Save = function () {
				debugger
				$scope.disabledSave = true;
				var TanggalPelipatan = dateHelper.formatDate($scope.item.tanggalPelipatan, "YYYY-MM-DD")
				var TanggalKerja = dateHelper.formatDate($scope.item.tanggalKerja, "YYYY-MM-DD")
				var JamAwal = dateHelper.formatDate($scope.item.jamAwal, "HH:mm:ss");
				var JamAkhir = dateHelper.formatDate($scope.item.jamAkhir, "HH:mm:ss");
				var dat = $scope.dataPenerimaanLinen._data;
				var i = 0;
				var mapLinen = [];
				dat.forEach(function (data) {
					var data = {
						"produkDetailId": data.Linen.id,
						"beratLinen": data.kg,
						"jumlahLipat": data.lipat
					}
					mapLinen[i] = data;
					i++;
				})
				var listRawRequired = [
					"item.tanggalPelipatan|k-ng-model|Tanggal Pelipatan",
					"item.tanggalKerja|k-ng-model|Tanggal Kerja",
					"item.jamAwal|k-ng-model|Jam Awal",
					"item.jamAkhir|k-ng-model|Jam Akhir"
				];
				var isValid = ModelItem.setValidation($scope, listRawRequired);
				if (isValid.status) {
					var data = {
						"tgl": TanggalPelipatan + " " + JamAwal,
						"tglKerja": TanggalKerja + " " + JamAkhir,
						"petugasId": $scope.item.petugas.id,
						"jumlahCycle": $scope.item.totalLipat,
						"produkDetails": mapLinen
					}
					console.log(data)
					$scope.isRouteLoading = true;
					ManageLaundry.savePengeringan(data, "laundry/save-proses-pelipatan").then(function (e) {
						$scope.initPegawai();
						$scope.isRouteLoading = true;
						setTimeout(function () {
							window.location.href = '#/DaftarPelipatan'
						}, 5000)

					});
				} else {
					$scope.disabledSave = false;
					ModelItem.showMessages(isValid.messages);
				}
			};

			/*======================================================// OLD SOURCE CODE //================================================          
					   $scope.addDataPegawai = function() {
						   $scope.no2 = 1;s
						if($scope.item.totalLipat == undefined){
							 toastr.warning('Total Lipatan kosong, Isi Daftar Pelipatan Terlebih dahulu')
						}else{
						   if($scope.dataPegawai._data.length == 0){
							   if($scope.item.totalLipat < $scope.item.jumlahLipat){
								   window.messageContainer.error('Jumlah Lipat Pegawai Melebihi Total Lipat');
								   return $scope.item.jumlahLipat;
							   }  
						   }else{
							   var sumLipat = 0;
							   for(var x = 0; x<$scope.dataPegawai._data.length; x++){
								   var jumlahMelipat = $scope.dataPegawai._data[x].jumlahMelipat;
								   sumLipat += (jumlahMelipat * 1); 
							   }
						   }
						   var TotalLipat = (sumLipat + parseInt($scope.item.jumlahLipat));
						   if($scope.item.totalLipat < TotalLipat){
							   toastr.warning('Pegawai Melebihi Jumlah Total Lipatan')
							   return $scope.item.totalLipat;
						   }else{
							   var tempDataPenerimaanLinen = {
								   "no": $scope.no2+++" .",
								   "namaPegawai" : $scope.item.petugas.namaLengkap,
								   "jumlahMelipat" : $scope.item.jumlahLipat
							   }
							   $scope.dataPegawai.add(tempDataPenerimaanLinen);
							   $scope.item.petugas = "";
							   $scope.item.jumlahLipat = "";
							   $scope.countLipatanPegawai();
						   }
						 }
					   }*/
			//       ManageSarpras.savePengeringan(data1,"laundry/save-pelipatan").then(function (e) {
			//			 debugger;
			//  $scope.item= {};
			//            init();  
			/*$state.go('dashboardpasien.TandaVital', {
			 noCM: $scope.noCM
			 });*/
			//        });

			/*     
						$scope.countLipatanPegawai = function(){
							var totalLipatanPegawai = 0;
							for(var y = 0; y<$scope.dataPegawai._data.length; y++){
								var jumlahmelipat = $scope.dataPegawai._data[y].jumlahMelipat
								totalLipatanPegawai += (jumlahmelipat * 1);
							}
							$scope.item.totalLipatPegawai = totalLipatanPegawai;
							return totalLipatanPegawai;
						}
						$scope.countLipatanPegawai();
			*/
		}
	])
})