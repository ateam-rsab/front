define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('EditOrderGiziCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ModelItemAkuntansi', 'ManageServicePhp', '$window', '$timeout', 'DateHelper', 'CacheHelper',
		function ($q, $rootScope, $scope, ModelItem, ModelItemAkuntansi, manageServicePhp, $window, $timeout, dateHelper, cacheHelper) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.isRouteLoading = false;

			$scope.item.tglMenu = $scope.now
			$scope.item.tglOrder = $scope.now
			let norecSO = ''
			let data2 = []
			loadCombo();
			loadCache();

			$scope.showEditInput = false;
			$scope.isOrderSusu = false;

			function loadCache() {
				var cacheGet = cacheHelper.get('cacheEditOrderGizi');
				if (cacheGet != undefined) {
					norecSO = cacheGet.norec_so
					var data = $scope.item

					data.noOrder = cacheGet.noorder
					data.tglOrder = cacheGet.tglorder
					data.ruanganTujuan = cacheGet.ruangantujuan
					data.pegawai = cacheGet.pegawaiorder
					if (cacheGet.details.length > 0)
						data.tglMenu = cacheGet.details[0].tglmenu
					data.jenisWaktu = {
						id: cacheGet.objectjeniswaktufk,
						jeniswaktu: cacheGet.jeniswaktu
					}
					data.jenisDiet = {
						id: cacheGet.objectjenisdietfk,
						jenisdiet: cacheGet.jenisdiet
					}
					data.kategoriDiet = {
						id: cacheGet.objectkategorydietfk,
						kategorydiet: cacheGet.kategorydiet
					}
					data2 = cacheGet.details;

					init();
					// var cacheGet = undefined;
					// cacheHelper.set('cacheEditOrderGizi', cacheGet);
				} else {
					init()
				}
			}

			function init() {
				$scope.isRouteLoading = true;
				for (var i = 0; i < data2.length; i++) {
					data2[i].no = i + 1
				}
				$scope.dataSource = new kendo.data.DataSource({
					data: data2
				});
			}


			function loadCombo() {
				manageServicePhp.getDataTableTransaksi("gizi/get-combo", false).then(function (data) {
					$scope.listRuangan = data.data.ruanginap;
					$scope.listKelas = data.data.kelas;
					$scope.listJenisDiet = data.data.jenisdiet;
					$scope.listKategoriDiet = data.data.kategorydiet;
					$scope.listJenisWaktu = data.data.jeniswaktu;
				})
			}

			function loadDataPasien() {
				$q.all([
					manageServicePhp.getDataTableTransaksi("gizi/get-daftar-pasien"),
				]).then(function (data) {
					if (data[0].statResponse) {
						var result = data[0].data.data
						for (var i = 0; i < result.length; i++) {

							// var tanggal = $scope.now;
							// var tanggalLahir = new Date(result[i].tgllahir);
							// var umur = dateHelper.CountAge(tanggalLahir, tanggal);
							// result[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
						}
						$scope.sourceGridPasien = new kendo.data.DataSource({
							data: result,
							pageSize: 10,
							total: result.length,
							serverPaging: true,
						});
					}
				});

			}

			$scope.klikGrid = (data) => {
				$scope.isOrderSusu = data.jenisorder === "Order Susu" ? true : false;
				$scope.showEditInput = true;

				$scope.item.jenisDiet = {
					jenisdiet: data.jenisdiet,
					id: data.objectjenisdietfk,
				}

				$scope.item.kategoriDiet = {
					kategorydiet: data.kategorydiet,
					id: data.objectkategorydietfk,
				}
				$scope.item.cc = data.cc;
				$scope.item.volume = data.volume;
			}

			$scope.editData = (data) => {
				let indexDataEdit = data2.findIndex(x => x.jenisorder === data.jenisorder)
				console.log(indexDataEdit);

				for (let i = 0; i < data2.length; i++) {
					if (data2[i].jenisorder === data.jenisorder) {
						let dataEdit = {
							cc: $scope.item.cc,
							jenisdiet: $scope.item.jenisDiet.jenisdiet,
							kategorydiet: $scope.item.kategoriDiet.kategorydiet,
							volume: $scope.item.volume,
							objectjenisdietfk: $scope.item.jenisDiet.id,
							objectkategorydietfk: $scope.item.kategoriDiet.id,

							jeniskelamin: data2[i].jeniskelamin,
							jenisorder: data2[i].jenisorder,
							jeniswaktu: data2[i].jeniswaktu,
							keterangan: data2[i].keterangan,
							namakelas: data2[i].namakelas,
							namapasien: data2[i].namapasien,
							no: data2[i].no,
							nocm: data2[i].nocm,
							nocmfk: data2[i].nocmfk,
							nokirim: data2[i].nokirim,
							noorder: data2[i].noorder,
							norec_op: data2[i].norec_op,
							norec_pd: data2[i].norec_pd,
							noregistrasi: data2[i].noregistrasi,
							objectjeniswaktufk: data2[i].objectjeniswaktufk,
							objectkelasfk: data2[i].objectkelasfk,
							objectruanganlastfk: data2[i].objectruanganlastfk,
							parent: data2[i].parent,
							qtyproduk: data2[i].qtyproduk,
							ruanganasal: data2[i].ruanganasal,
							strukorderfk: data2[i].strukorderfk,
							tgllahir: data2[i].tgllahir,
							tglmenu: data2[i].tglmenu,
							tglorder: data2[i].tglorder,
							tglregistrasi: data2[i].tglregistrasi,
						}

						data2[i] = dataEdit;

						$scope.dataSource = new kendo.data.DataSource({
							data: data2
						});
					}
				}


			}

			$scope.resetEdit = () => {
				$scope.showEditInput = false;
				$scope.item.jenisDiet = null;
				$scope.item.kategoriDiet = null;
				$scope.item.cc = "";
				$scope.item.volume = "";
			}

			$scope.columnGrid = {
				// toolbar: [{
				// 	name: "add",
				// 	text: "Tambah",
				// 	template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
				// }, ],
				pageable: true,
				scrollable: true,
				columns: [{
						field: "no",
						title: "No",
						width: 25,
						"attributes": {
							align: "left"
						}
					}, {
						field: "tglregistrasi",
						title: "Tgl Registrasi",
						width: 100,
						"attributes": {
							align: "left"
						}
					}, {
						field: "noregistrasi",
						title: "No Registrasi",
						width: 80,
						"attributes": {
							align: "left"
						}
					}, {
						field: "nocm",
						title: "No RM",
						width: 60,
						"attributes": {
							align: "left"
						}
					}, {
						field: "namapasien",
						title: "Nama Pasien",
						width: 120,
						"attributes": {
							align: "left"
						}
					}, {
						field: "ruanganasal",
						title: "Ruangan",
						width: 100,
						"attributes": {
							align: "left"
						}
					}, {
						field: "namakelas",
						title: "Kelas",
						width: 80,
						"attributes": {
							align: "left"
						}
					}, {
						field: "jenisdiet",
						title: "Jenis Diet",
						width: "80px",
					}, {
						field: "jenisorder",
						title: "Jenis Order",
						width: "80px",
					}, {
						field: "volume",
						title: "Frekuensi",
						width: "80px",
					}, {
						field: "cc",
						title: "CC",
						width: "80px",
					}, {
						"command": [{
								text: "Hapus",
								click: hapusData,
								imageClass: "k-icon k-delete"
							},
							// {
							// 	text: "Edit",
							// 	click: editData,
							// 	imageClass: "k-icon k-i-pencil"
							// }
						],
						title: "",
						width: 50,
					}

				]
			};

			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}

			$scope.columnGridPasien = [
				// {
				// 	"template": "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
				// 	"width": 30
				// },

				{
					"field": "tglregistrasi",
					"title": "Tgl Registrasi",
					"width": "130px",
					"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
				},

				{
					"field": "nocm",
					"title": "No RM",
					"width": "80px",
					"template": "<span class='style-center'>#: nocm #</span>"
				},
				{
					"field": "noregistrasi",
					"title": "No Registrasi",
					"width": "100px",
					"template": "<span class='style-center'>#: noregistrasi #</span>"
				},
				{
					"field": "namapasien",
					"title": "Nama Pasien",
					"width": "200px",
					"template": "<span class='style-left'>#: namapasien #</span>"
				},
				// {
				// 	"field": "umur",
				// 	"title": "Umur",
				// 	"width":"150px",
				// 	"template": "<span class='style-left'>#: umur #</span>"
				// },
				{
					"field": "namadokter",
					"title": "Dokter",
					"width": "150px",

					"template": '# if( namadokter==null) {# - # } else {# #= namadokter # #} #'
				},
				// {
				// 	"field": "jeniskelamin",
				// 	"title": "JK",
				// 	"width":"80px",
				// 	"template": "<span class='style-left'>#: jeniskelamin #</span>"
				// },
				{
					"field": "namaruangan",
					"title": "Ruangan",
					"width": "150px",
					"template": "<span class='style-left'>#: namaruangan #</span>"
				},
				{
					"field": "namakelas",
					"title": "Kelas",
					"width": "80px",
					"template": "<span class='style-left'>#:  namakelas #</span>"
				},

				// {
				// 	"field": "kelompokpasien",
				// 	"title": "Tipe Pembayaran",
				// 	"width":"150px",
				// 	"template": "<span class='style-center'>#: kelompokpasien #</span>"
				// },

			];

			$scope.selectedData = [];
			$scope.onClick = function (e) {
				var element = $(e.currentTarget);

				var checked = element.is(':checked'),
					row = element.closest('tr'),
					grid = $("#kGrid").data("kendoGrid"),
					dataItem = grid.dataItem(row);


				if (checked) {
					var result = $.grep($scope.selectedData, function (e) {
						return e.norec_pd == dataItem.norec_pd;
					});
					if (result.length == 0) {
						$scope.selectedData.push(dataItem);
					} else {
						for (var i = 0; i < $scope.selectedData.length; i++)
							if ($scope.selectedData[i].norec_pd === dataItem.norec_pd) {
								$scope.selectedData.splice(i, 1);
								break;
							}
						$scope.selectedData.push(dataItem);
					}
					row.addClass("k-state-selected");
				} else {
					for (var i = 0; i < $scope.selectedData.length; i++)
						if ($scope.selectedData[i].norec_pd === dataItem.norec_pd) {
							$scope.selectedData.splice(i, 1);
							break;
						}
					row.removeClass("k-state-selected");
				}
			}

			$scope.Tambah = function () {
				$scope.norecAP = undefined;
				loadDataPasien();
				$scope.popUps.center().open();

				var actions = $scope.popUps.options.actions;
				actions.splice(actions.indexOf("Close"), 1);
				$scope.popUps.setOptions({
					actions: actions
				});
			}

			function hapusData(e) {
				e.preventDefault();
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var dataItem = this.dataItem(tr);
				var grid = this;

				if (!dataItem) {
					for (var i = data2.length - 1; i >= 0; i--) {
						if (data2[i].no == dataItem.no) {
							data2.splice(i, 1);
						}
					}
					for (var i = 0; i < data2.length; i++) {
						data2[i].no = i + 1
					}
					grid.removeRow(row);
					$scope.dataSource = new kendo.data.DataSource({
						data: data2
					});
				}


			}

			$scope.tutup = function () {
				$scope.popUps.close();
				$scope.norecAP = undefined

			}

			var timeoutPromise;
			$scope.$watch('popup.noReg', function (newVal, oldVal) {
				if (newVal && newVal !== oldVal) {
					applyFilter("noregistrasi", newVal)
				}
			})
			$scope.$watch('popup.noRm', function (newVal, oldVal) {
				if (newVal && newVal !== oldVal) {
					applyFilter("nocm", newVal)
				}
			})

			$scope.$watch('popup.nama', function (newVal, oldVal) {
				if (newVal && newVal !== oldVal) {
					applyFilter("namapasien", newVal)
				}
			})
			$scope.$watch('popup.ruangan', function (newVal, oldVal) {
				if (newVal && newVal !== oldVal) {
					applyFilter("namaruangan", newVal)
				}
			})
			$scope.$watch('popup.kelas', function (newVal, oldVal) {
				if (newVal && newVal !== oldVal) {
					applyFilter("namakelas", newVal)
				}
			})

			function applyFilter(filterField, filterValue) {
				var dataGrid = $("#kGrid").data("kendoGrid");
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

				if (filterValue.id) {
					currentFilters.push({
						field: filterField,
						operator: "eq",
						value: filterValue.id
					});
				} else {
					currentFilters.push({
						field: filterField,
						operator: "contains",
						value: filterValue
					})
				}

				dataGrid.dataSource.filter({
					logic: "and",
					filters: currentFilters
				})
			}
			$scope.resetFilter = function () {
				var dataGrid = $("#kGrid").data("kendoGrid");
				dataGrid.dataSource.filter({});
				$scope.popup = {};
			}
			$scope.Add = function () {
				if ($scope.dataPasienSelected == undefined) {
					toastr.error('Pilih data dulu')
					return
				}
				var nomor = 0
				if ($scope.dataSource == undefined) {
					nomor = 1
				} else {
					nomor = data2.length + 1
				}

				var data = {
					"no": nomor,
					"norec_pd": $scope.dataPasienSelected.norec_pd,
					"tglregistrasi": $scope.dataPasienSelected.tglregistrasi,
					"noregistrasi": $scope.dataPasienSelected.noregistrasi,
					"nocm": $scope.dataPasienSelected.nocm,
					"namapasien": $scope.dataPasienSelected.namapasien,
					"ruanganasal": $scope.dataPasienSelected.namaruangan,
					"namakelas": $scope.dataPasienSelected.namakelas,
					"objectkelasfk": $scope.dataPasienSelected.objectkelasfk,
					"objectruanganlastfk": $scope.dataPasienSelected.objectruanganlastfk,
					"nocmfk": $scope.dataPasienSelected.nocmfk,
				}
				data2.push(data)
				$scope.dataSource = new kendo.data.DataSource({
					data: data2
				});
				toastr.info('Pasien ' + $scope.dataPasienSelected.namapasien + ' ditambahkan')


				/* add by ceklis */

				// if ($scope.selectedData.length == 0){
				// 	toastr.error('Ceklis data dulu')
				// 	return
				// }
				// for (var i = 0; i < $scope.selectedData.length; i++) {
				// 	var nomor =0
				// 	if ($scope.dataSource == undefined) {
				// 		nomor = 1
				// 	}else{
				// 		nomor = data2.length + 1
				// 	}

				// 	var data={
				// 		"no":nomor,
				// 		"norec_pd": $scope.selectedData[i].norec_pd,
				// 		"tglregistrasi":$scope.selectedData[i].tglregistrasi,
				// 		"noregistrasi":$scope.selectedData[i].noregistrasi,
				// 		"nocm":$scope.selectedData[i].nocm,
				// 		"namapasien":$scope.selectedData[i].namapasien,
				// 		"ruanganasal":$scope.selectedData[i].namaruangan,
				// 		"namakelas":$scope.selectedData[i].namakelas,
				// 		"objectkelasfk":$scope.selectedData[i].objectkelasfk,
				// 		"objectruanganlastfk":$scope.selectedData[i].objectruanganlastfk,
				// 		"nocmfk":$scope.selectedData[i].nocmfk,
				// 	}
				// 	data2.push(data)
				// }

				// $scope.dataSource = new kendo.data.DataSource({
				// 	data: data2
				// });

				// $scope.popUps.close();

			}
			$scope.Save = function () {
				if ($scope.item.jenisDiet == undefined) {
					toastr.error('Jenis Diet belum di pilih !')
					return
				}
				if ($scope.item.kategoriDiet == undefined) {
					toastr.error('Kategori Diet belum di pilih !')
					return
				}
				// if ($scope.item.jenisWaktu == undefined) {
				// 	toastr.error('Jenis Waktu belum di pilih !')
				// 	return
				// }
				$scope.tombolSimpanVis = true;

				// var objSave = {
				// 	"norec_so": norecSO,
				// 	"tglnow": new moment($scope.item.tglOrder).format('YYYY-MM-DD HH:mm:ss'),
				// 	"tglorder": new moment($scope.item.tglMenu).format('YYYY-MM-DD'),
				// 	"objectjenisdietfk": $scope.item.jenisDiet.id,
				// 	"objectkategorydietfk": $scope.item.kategoriDiet.id,
				// 	"objectjeniswaktufk": $scope.item.jenisWaktu.id,
				// 	"jenisorder": data2[0].jenisorder,
				// 	"details": data2,
				// 	"qtyproduk": data2.length,
				// }

				let dataSave = {
					strukorder: {
						norec_so: "",
						tglnow: dateHelper.formatDate(new Date(), "YYYY-DD-MM HH:mm:ss"),
						tglorder: dateHelper.formatDate($scope.item.tglOrder, "YYYY-DD-MM HH:mm:ss"),
						objectjeniswaktufk: null,
						details: [],
						qtyproduk: 1
					}
				}

				for (let i = 0; i < data2.length; i++) {
					dataSave.strukorder.details.push({
						tglregistrasi: data2[i].tglregistrasi,
						jenisorder: data2[i].jenisorder,
						nocmfk: data2[i].nocmfk,
						nocm: data2[i].nocm,
						noregistrasi: data2[i].noregistrasi,
						namaruangan: data2[i].namaruangan,
						namapasien: data2[i].namapasien,
						kelompokpasien: data2[i].kelompokpasien,
						namakelas: data2[i].namakelas,
						jeniskelamin: data2[i].jeniskelamin,
						namadokter: data2[i].namadokter,
						norec_pd: data2[i].norec_pd,
						norecorder: data2[i].norec_op,
						keteranganlainnya_quo: data2[i].keteranganlainnya_quo,
						tglpulang: data2[i].tglpulang,
						statuspasien: data2[i].statuspasien,
						tgllahir: data2[i].tgllahir,
						objectruanganlastfk: data2[i].objectruanganlastfk,
						objectkelasfk: data2[i].objectkelasfk,
						statusorder: data2[i].statusorderfk,
						statCheckbox: true,
						umur: data2[i].umur,
						keterangan: data2[i].keterangan,
						volume: data2[i].volume,
						cc: data2[i].cc,
						objectjenisdietfk: data2[i].objectjenisdietfk,
						objectkategorydietfk: data2[i].objectkategorydietfk
					})
				}

				// for (let i = 0; i < data2.length; i++) {
				// 	objSave.details[i]['jenisdiet'] = $scope.item.jenisDiet.jenisdiet;
				// 	objSave.details[i]['objectjenisdietfk'] = $scope.item.jenisDiet.id;

				// 	objSave.details[i]['objectkategorydietfk'] = $scope.item.kategoriDiet.kategorydiet;
				// 	objSave.details[i]['objectkategorydietfk'] = $scope.item.kategoriDiet.id;
				// 	// let data = {
				// 	// 	"nocmfk": data2[i].nocmfk,
				// 	// 	"norec_pd": data2[i].norec_pd,
				// 	// 	"objectkelasfk": data2[i].objectkelasfk,
				// 	// 	"objectruanganlastfk": data2[i].objectruanganlastfk,
				// 	// 	"objectjenisdietfk": data2[i].objectjenisdietfk,
				// 	// 	"objectkategorydietfk": data2[i].objectkategorydietfk,
				// 	// 	"volume": data2[i].cc,
				// 	// 	"cc": data2[i].cc,
				// 	// 	"objectjenisdietfk": $scope.item.jenisDiet,
				// 	// 	"objectkategorydietfk": $scope.item.kategoriDiet,
				// 	// 	"keterangan": data2[i].keterangan,
				// 	// 	// item.jenisDiet
				// 	// }
				// 	// objSave.details.push(data);
				// }
				// var data = {
				// 	"strukorder": objSave
				// }
				console.log(dataSave)

				manageServicePhp.saveOrderGizi(dataSave).then(function (result) {
					if (result.status == 201) {
						$scope.tombolSimpanVis = false;
						$scope.selectedData = [];
					}

					window.history.back();

				})
			}

			$scope.Back = function () {
				window.history.back();
			}

		}
	]);
});