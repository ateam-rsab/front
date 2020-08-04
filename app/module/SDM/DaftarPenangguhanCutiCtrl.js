define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarPenangguhanCutiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'DateHelper', '$state', '$mdDialog', 'CetakHelper', '$timeout',
		function ($q, $rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, DateHelper, $state, $mdDialog, CetakHelper, $timeout) {
			$scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));
			$scope.item = {};
			$scope.filter = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.monthSelectorOptions = {
				start: "year",
				depth: "year"
			};
			$scope.yearSelected = {
				start: "year",
				depth: "year",
				format: "MMMM yyyy"
			};
			// $scope.filter.tglPermohonan = $scope.now;
			// $scope.listStatusPermohonan = [
			// 	{id:0, name: "Belum diputuskan"},
			// 	// {id:1, name: "Disetujui"},
			// 	{id:2, name: "Ditolak"},
			// 	{id:3, name: "Ditangguhkan"},
			// ]
			$scope.listCutiLuarNegeri = [
				{id:1, name: "Ya"},
				{id:0, name: "Tidak"},
			]
			$scope.listCutiLuarKota = [
				{id:1, name: "Ya"},
				{id:0, name: "Tidak"},
			]

			$scope.mainGridOptions = {
				// pageable: true,
				toolbar: [
					{ text: "export", name: "Export detail", template: '<button ng-click="exportDetail()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>' }
				],
				excel: {
					allPages: true,
					fileName: "RSAB HK Export Daftar Penangguhan Cuti - " + DateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx"
				},
				excelExport: function (e) {
					var columns = e.workbook.sheets[0].columns;
					columns.forEach(function (column) {
						delete column.width;
						column.autoWidth = true;
					});
				},
				selectable: true,
				columns: [
					{ "field": "noPlanning", "title": "No Usulan", width: 100 },
					{ "field": "namaPegawai", "title": "Nama Pegawai" },
					{ "field": "nipPns", "title": "NIP" },
					// {
					// 	"field": "namaJabatan",
					// 	"title": "Jabatan"
					// },
					{ "field": "tglPengajuan", "title": "Pengajuan", "template": "#= kendo.toString(kendo.parseDate(new Date(tglPengajuan)), 'dd-MM-yyyy') #", width: 100 },
					// {
					// 	"field": "tglAwalPlan",
					// 	"title": "Tanggal Rencana Awal",
					// 	"template": "#= kendo.toString(kendo.parseDate(new Date(tglAwalPlan)), 'dd MM yyyy') #"
					// },{
					// 	"field": "tglAkhirPlan",
					// 	"title": "Tanggal Rencana Akhir",
					// 	"template": "#= kendo.toString(kendo.parseDate(new Date(tglAkhirPlan)), 'dd MM yyyy') #"
					// },
					// {
					// 	"field": "unitKerja",
					// 	"title": "Unit Kerja"
					// },
					{ "field": "statusPegawai", "title": "Status", width: 100 },
					{ "field": "deskripsiStatusPegawaiPlan", "title": "Deskripsi" },
					{ "field": "lisTanggal", "title": "Tanggal Permohonan", "template": "# for(var i=0; i < lisTanggal.length;i++){# <button class=\"k-button custom-button\" style=\"margin:0 0 5px\">#= kendo.toString(new Date(lisTanggal[i].tgl), \"dd-MM-yyyy\") #</button> #}#", "width": 280 },
					{ "field": "isCutiLuarNegeri", "title": "Cuti<br/>Luar<br/>Negeri", "template": "#if(isCutiLuarNegeri==false){# Tidak #} else if(isCutiLuarNegeri==true) {# Ya #} else {# Tidak #}#", width: 75 },
					{ "field": "isCutiLuarKota", "title": "Cuti<br/>Luar Kota", "template": "#if(isCutiLuarKota==false){# Tidak #} else if(isCutiLuarKota==true) {# Ya #} else {# Tidak #}#", width: 75 },
					{ "field": "keteranganLainyaPlan", "title": "Keterangan" },
					{ "field": "approvalStatus", "title": "Persetujuan", "template": "#if(approvalStatus===0){# Belum diputuskan #} else if(approvalStatus===1) {# Disetujui #} else if(approvalStatus===2) {# Ditolak #} else {# Ditangguhkan #}#", width: 100 }
				],
				scrollable: true
			};

			$scope.exportDetail = function (e) {
				var tempDataExport = [];
				var rows = [{
					cells: [
						{ value: "Nama Pegawai" },
						{ value: "NIP" },
						{ value: "No Usulan" },
						{ value: "Deskripsi Usulan" },
						{ value: "Tanggal Usulan" },
						{ value: "Status Usulan" },
						{ value: "Tanggal Permohonan" },
						{ value: "Keterangan" }
					]
				}];
				tempDataExport = $scope.dataSource;
				tempDataExport.fetch(function () {
					var data = this.data();
					for (var i = 0; i < data.length; i++) {
						var listTglPengajuan = "";
						for (var j = 0; j < data[i].lisTanggal.length; j++) {
							if (j === data[i].lisTanggal.length - 1) {
								listTglPengajuan = listTglPengajuan + DateHelper.formatDate(data[i].lisTanggal[j].tgl, 'DD-MM-YYYY')
							} else {
								listTglPengajuan = listTglPengajuan + DateHelper.formatDate(data[i].lisTanggal[j].tgl, 'DD-MM-YYYY') + ", "
							}
						};
						rows.push({
							cells: [
								{ value: data[i].namaPegawai },
								{ value: data[i].nipPns },
								{ value: data[i].noPlanning },
								{ value: data[i].deskripsiStatusPegawaiPlan },
								{ value: DateHelper.formatDate(data[i].tglPengajuan, 'DD-MM-YYYY') },
								{ value: data[i].statusPegawai },
								{ value: listTglPengajuan },
								{ value: data[i].keteranganLainyaPlan }
							]
						})
					};
					var workbook = new kendo.ooxml.Workbook({
						sheets: [
							{
								freezePane: {
									rowSplit: 1
								},
								frozenRows: 1,
								filter: { from: 0, to: 7 },
								columns: [
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true },
									{ autoWidth: true }
								],
								title: "Daftar Pengajuan",
								rows: rows
							}
						]
					});
					kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "RSAB HK Export Daftar Pengajuan Disetujui - " + DateHelper.formatDate(new Date(), 'DD-MMM-YYYY HH:mm:ss') + ".xlsx" });
				})
			}

			$q.all([
				ManageSdmNew.getListData("sdm/get-login-user-permohonan-status?idPegawai=" + $scope.dataPegawaiLogin.id),
				ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true"),
				// ModelItem.getPegawai()
				ManageSdmNew.getListData("pegawai/find-pegawai-by-id-custom/" + ModelItem.getPegawai().id),
				ManageSdmNew.getListData("sdm/get-list-penandatangan-surat-izin-cuti")
			]).then(function (result) {
				$scope.isLoginKesja = false;
				if (result[0].data.data.idSubUnitKerja === 26 || result[0].data.data.idSubUnitKerja === 27) $scope.isLoginKesja = true;
				$scope.listPegawai = result[1].data;
				$scope.pegawai = result[2];
				$scope.listPejabat = result[3].data.data;
			}, function (error) {
				console.log(error);
			}).then(function () {
				$scope.loadGrid();
			})

			$scope.loadGrid = function (page) {
				$scope.isRouteLoading = true;
				var rows;
				var nama;
				var tglPermohonan;
				$scope.statusRowsFilterChanged;

				if ($scope.filter.rows == undefined) {
					$scope.rows = 5;
					$scope.statusRowsFilterChanged = true;
				} else {
					if ($scope.rows != $scope.filter.rows) {
						$scope.statusRowsFilterChanged = true;
					} else {
						$scope.statusRowsFilterChanged = false;
					}
					$scope.rows = $scope.filter.rows;
				}

				if (page == undefined) {
					page = 1;
				}

				if ($scope.filter.tglPermohonan == undefined) {
					tglPermohonan = "";
					$scope.rows = $scope.filter.rows;
				} else {
					tglPermohonan = DateHelper.formatDate($scope.filter.tglPermohonan, "YYYY-MM");
					$scope.rows = "";
				}

				if ($scope.filter.namaPegawai == undefined) {
					nama = "";
				} else {
					nama = $scope.filter.namaPegawai;
				}

				if ($scope.filter.statusPegawai == undefined) {
					$scope.jenisPermohonan = "";
				} else {
					$scope.jenisPermohonan = $scope.filter.statusPegawai;
				}

				// if($scope.filter.status==undefined){
				// 	$scope.statusPermohonan="";
				// }else{
				// 	$scope.statusPermohonan=$scope.filter.status.id;
				// }

				if ($scope.filter.cutiLuarNegeri == undefined) {
					$scope.isCutiLuarNegeri = "";
				} else {
					$scope.isCutiLuarNegeri = $scope.filter.cutiLuarNegeri.id == 1 ? true : false;
				}

				if ($scope.filter.cutiLuarKota == undefined) {
					$scope.isCutiLuarKota = "";
				} else {
					$scope.isCutiLuarKota = $scope.filter.cutiLuarKota.id == 1 ? true : false;
				}

				ManageSdmNew.getListData("sdm/get-list-permohonan-status-cuti-paging/?idPegawai=" + "&isSdm=" + $scope.isLoginKesja
					+ "&take=" + $scope.rows + "&page=" + page + "&sort=tglPengajuan&dir=desc" + "&nama=" + nama
					+ "&jenisPermohonan=" + $scope.jenisPermohonan
					+ "&statusPermohonan=" //+ $scope.statusPermohonan
					+ "&tglPermohonan=" + tglPermohonan
					+ "&isCutiLuarNegeri=" + $scope.isCutiLuarNegeri
					+ "&isCutiLuarKota=" + $scope.isCutiLuarKota
				).then(function (result) {

					//Data yang masuk kesini sudah dipaging di server	
					if (result.data.data.listData != undefined) {
						$scope.pages = []

						//Untuk tombol halaman
						var i;
						$scope.totalPages = result.data.data.totalPages;
						for (i = page; i <= page+4; i++) {
							if (i <= $scope.totalPages) {
								$scope.pages.push({
									pageNumber: i,
									value: i
								})
							}
						}

						$scope.filter.rows = result.data.data.listData.length;
					}
					$scope.dataSource = new kendo.data.DataSource({
						// pageSize: 6,
						data: result.data.data.listData,
						autoSync: true
					});

					$scope.isRouteLoading = false;
				})
			}

			$scope.filter.rows = 5;
			$scope.totalPages = 0;

			// $scope.pages = [
			// 			    {pageNumber:1, value:1},
			// 			    {pageNumber:2, value:2},
			// 			    {pageNumber:3, value:3},
			// 			    {pageNumber:4, value:4},
			// 			    {pageNumber:5, value:5},
			// 						];

			// 		$scope.next=function(){		
			// 			var i=0;		
			// 			for (i = 0; i < $scope.pages.length; i++) { 
			// 		$scope.pages[i].pageNumber=$scope.pages[i].pageNumber+5
			// 	}		
			// }

			// $scope.back=function(){		
			// 			var i=0;	
			// 			for (i = 0; i < $scope.pages.length; i++) { 
			// 				if($scope.pages[i].pageNumber==1){
			// 					return;
			// 				}
			// 		$scope.pages[i].pageNumber=$scope.pages[i].pageNumber-5
			// 	}		
			// }

			$scope.next = function () {
				var i = 0;
				var pageNumberInLastIndex;
				pageNumberInLastIndex = $scope.pages[$scope.pages.length - 1].pageNumber;

				if (pageNumberInLastIndex < $scope.totalPages) {
					$scope.pages = [];
					for (i = pageNumberInLastIndex + 1; i < pageNumberInLastIndex + 6; i++) {
						if (i <= $scope.totalPages) {
							$scope.pages.push({
								pageNumber: i,
								value: i
							})
						}
					}
				}
			}

			$scope.back = function () {
				var i = 0;
				var pageNumberInFirstIndex;
				pageNumberInFirstIndex = $scope.pages[0].pageNumber;

				if (pageNumberInFirstIndex > 1) {
					$scope.pages = [];
					for (i = (pageNumberInFirstIndex - 1) - 4; i <= pageNumberInFirstIndex - 1; i++) {
						if (i > 0) {
							$scope.pages.push({
								pageNumber: i,
								value: i
							})
						}
					}
				}
			}

			$scope.getDataPegawai = function () {
				$scope.pegawaiId = $scope.item.pegawai1.id;
				ManageSdmNew.getListData("sdm/get-data-pegawai?pegawaiId=" + $scope.pegawaiId).then(function (dat) {
					$scope.item.jabatan = dat.data.data.jabatan;
				});
			}

			$scope.getDataPegawai2 = function () {
				$scope.pegawaiId2 = $scope.item.pegawai2.id;
				ManageSdmNew.getListData("sdm/get-data-pegawai?pegawaiId=" + $scope.pegawaiId2).then(function (dat) {
					$scope.item.jabatan2 = dat.data.data.jabatan;
				});
			}

			$scope.disKeputusan = true;
			$scope.disUnverif = true;
			$scope.click = function (current) {
				$scope.currentData = current;
			}

			// $scope.tangguhkan=function(){
			// 	if(!$scope.currentData) {
			// 		messageContainer.error('Data belum dipilih');
			// 		return;
			// 	}
			//     var confirm = $mdDialog.confirm()
			//           .title('Peringatan!')
			//           .textContent('Apakah data cuti anda akan ditangguhkan?')
			//           .ariaLabel('Lucky day')
			//           .ok('Ya')
			//           .cancel('Tidak')
			//     $mdDialog.show(confirm).then(function() {
			//         $scope.Simpan();
			//     })
			// };

			$scope.cancelData = function () {
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
				//isi codingan buat cancel data yang di edit
			}

			// $scope.Simpan = function () {
			// 	if($scope.currentData){
			// 		var data = {
			// 			"noRec": $scope.currentData.noRec
			// 		}
			// 		ManageSdm.saveData(data,"sdm/menangguhkan-permohonan-status").then(function(e) {
			// 			// console.log(JSON.stringify(e.data));
			// 			$scope.loadGrid();
			// 		});
			// 	}
			// }

			$scope.isShowPopUp = false;
			$scope.openWindow = function () {
				if ($scope.item.noRec == undefined) {
					alert("Pilih Daftar Terlebih dahulu!!")
				} else {
					var myWindow = $("#winPopUp");
					myWindow.data("kendoWindow").open();
					$scope.isShowPopUp = true;
				}
			}

			$scope.Cetak = function () {
				var atasan1 = $scope.item.pegawai1.id;
				var atasan2 = $scope.item.pegawai2.id;
				var periode = DateHelper.formatDate($scope.item.until, "YYYY-MM");
				var urlLaporan = CetakHelper.openURLReporting("reporting/lapPermohonanCuti?noRecPlanning=" + $scope.item.noRec + "&idAtasan1=" + $scope.item.pegawai1.id + "&idAtasan2=" + $scope.item.pegawai2.id + "&periode=" + periode);
				window.open(urlLaporan, "SKCutiPegawai", "width:800, height:600");
			};

			$scope.cetak2 = function (data) {
				if (!$scope.currentData && !data) {
					messageContainer.error("Data tidak dapat diproses");
				} else {
					$scope.pilihPejabat.close();
					var urlLaporan = CetakHelper.openURLReporting("reporting/lapSuratIzinCuti?noRecPlanning=" + $scope.currentData.noRec + "&idAtasan=" + data.id);
					window.open(urlLaporan, '', 'width:600, height:500');
				}
			};

			$scope.cetakSuratIzin = function () {
				if (!$scope.currentData) {
					messageContainer.error('Data belum di pilih');
				} else {
					$scope.items = {};
					$scope.pilihPejabat.center().open();
				}
			}

			$scope.tangguhkan = function (current) {
				if (!current) return;
				localStorage.setItem('tempPenangguhanCutiPegawai', JSON.stringify(current));
				$state.go("PenangguhanPerubahanStatus", {
					namaPegawai: current.namaPegawai,
					noPlanning: current.noPlanning,
					nip: current.nip
				});
			};

			var timeoutPromise;
			$scope.$watch('filter.namaPegawai', function (newVal, oldVal) {
				if (!newVal) return;
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal && newVal !== oldVal) {
						// applyFilter("namaPegawai", newVal)
						$scope.loadGrid();
					}
				}, 1000);
			});

			$scope.$watch('filter.statusPegawai', function (newVal, oldVal) {
				if (!newVal) return;
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal && newVal !== oldVal) {
						// applyFilter("statusPegawai", newVal)
						$scope.loadGrid();
					}
				}, 1000);
			});

			$scope.$watch('filter.tglPermohonan', function (newVal, oldVal) {
				if (!newVal) return;
				$timeout.cancel(timeoutPromise);
				timeoutPromise = $timeout(function () {
					if (newVal && newVal !== oldVal) {
						// applyFilter("namaPegawai", newVal)
						$scope.loadGrid();
					}
				}, 1000);
			});

			// $scope.$watch('filter.status', function(newVal, oldVal){
			// 	if(!newVal) return;
			// 	if (newVal && newVal !== oldVal){
			// 		// applyFilter("approvalStatus", newVal.id)
			// 		$scope.loadGrid();
			// 	}
			// })

			$scope.$watch('filter.cutiLuarNegeri', function(newVal, oldVal){
				if(!newVal) return;
				if (newVal && newVal !== oldVal){
					// applyFilter("approvalStatus", newVal.id)
					$scope.loadGrid();
				}
			})

			$scope.$watch('filter.cutiLuarKota', function(newVal, oldVal){
				if(!newVal) return;
				if (newVal && newVal !== oldVal){
					// applyFilter("approvalStatus", newVal.id)
					$scope.loadGrid();
				}
			})

			function applyFilter(filterField, filterValue) {
				var dataGrid = $("#gridPerubahanStatus").data("kendoGrid");
				var currFilterObject = dataGrid.dataSource.filter();
				var currentFilters = currFilterObject ? currFilterObject.filters : [];

				if (currentFilters && currentFilters.length > 0) {
					for (var i = 0; i < currentFilters.length; i++) {
						if (currentFilters[i].field == filterField) {
							currentFilters.splice(i, 1);
							break;
						}
					}
				}

				currentFilters.push({
					field: filterField,
					operator: "contains",
					value: filterValue
				});

				dataGrid.dataSource.filter({
					logic: "and",
					filters: currentFilters
				});
			}

			$scope.resetFilters = function () {
				$scope.isRouteLoading = true;
				var dataGrid = $("#gridPerubahanStatus").data("kendoGrid");
				dataGrid.dataSource.filter({});
				$scope.filter = {};
				$scope.filter.rows = 5;
				$scope.isRouteLoading = false;
			}
		}
	]);
});
