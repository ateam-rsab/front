define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('EditOrderGiziCtrl', ['$q','$rootScope', '$scope', 'ModelItem', 'ModelItemAkuntansi', 'ManageServicePhp', '$window', '$timeout', 'DateHelper', 'CacheHelper',
		function ($q,$rootScope, $scope, ModelItem, ModelItemAkuntansi, manageServicePhp, $window, $timeout, dateHelper, cacheHelper) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.isRouteLoading = false;
			
			$scope.item.tglMenu =	$scope.now 
			$scope.item.tglOrder = 	$scope.now 
			var norecSO = ''
			var data2 = []
			loadCombo();
			loadCache();

			function loadCache(){
				var cacheGet = cacheHelper.get('cacheEditOrderGizi');
				if(cacheGet != undefined){
					norecSO = cacheGet.norec_so
					var data = $scope.item

					data.noOrder =cacheGet.noorder
					data.tglOrder =cacheGet.tglorder
					data.ruanganTujuan =cacheGet.ruangantujuan
					data.pegawai =cacheGet.pegawaiorder
					if (cacheGet.details.length > 0)
						data.tglMenu =cacheGet.details[0].tglmenu
					data.jenisWaktu ={id : cacheGet.objectjeniswaktufk , jeniswaktu : cacheGet.jeniswaktu}
					data.jenisDiet ={id : cacheGet.objectjenisdietfk , jenisdiet : cacheGet.jenisdiet}
					data.kategoriDiet ={id : cacheGet.objectkategorydietfk , kategorydiet : cacheGet.kategorydiet}
					data2 = cacheGet.details;

					init()
					var cacheGet =undefined
					cacheHelper.set('cacheEditOrderGizi', cacheGet);
				}else{
					init()
				}
			}


			function init() {
				$scope.isRouteLoading = true;
				for (var i = 0; i < data2.length; i++) {
					data2[i].no = i +1
				}
				$scope.dataSource = new kendo.data.DataSource({
					data: data2
				});
			}


			function loadCombo() {
				manageServicePhp.getDataTableTransaksi("gizi/get-combo", false).then(function(data) {
					$scope.listRuangan = data.data.ruanginap;
					$scope.listKelas = data.data.kelas;
					$scope.listJenisDiet = data.data.jenisdiet;
					$scope.listKategoriDiet = data.data.kategorydiet;
					$scope.listJenisWaktu = data.data.jeniswaktu;
				})
			}

			function loadDataPasien(){


				$q.all([
					manageServicePhp.getDataTableTransaksi("gizi/get-daftar-pasien"),
					]).then(function(data) {
						if (data[0].statResponse){
							var result =data[0].data.data
							for (var i = 0; i < result.length; i++) {

									// var tanggal = $scope.now;
									// var tanggalLahir = new Date(result[i].tgllahir);
									// var umur = dateHelper.CountAge(tanggalLahir, tanggal);
									// result[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
								}
								$scope.sourceGridPasien = new kendo.data.DataSource({
									data:result,
									pageSize: 10,
									total: result.length,
									serverPaging: true,
								});
							}
						});

				}

				$scope.columnGrid = {
					toolbar: [
					{
						name: "add", text: "Tambah",
						template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
					},
					],
					pageable: true,
					scrollable: true,
					columns: [
					{ field: "no", title: "No", width: 25, "attributes": { align: "left" } },
					{ field: "tglregistrasi", title: "Tgl Registrasi", width: 100, "attributes": { align: "left" } },
					{ field: "noregistrasi", title: "No Registrasi", width: 80, "attributes": { align: "left" } },
					{ field: "nocm", title: "No RM", width: 60, "attributes": { align: "left" } },
					{ field: "namapasien", title: "Nama Pasien", width: 120, "attributes": { align: "left" } },
					{ field: "ruanganasal", title: "Ruangan", width: 100, "attributes": { align: "left" } },
					{ field: "namakelas", title: "Kelas", width: 80, "attributes": { align: "left" } },
					{
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
				$scope.formatTanggal = function(tanggal){
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
					"width":"130px",
					"template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
				},

				{
					"field": "nocm",
					"title": "No RM",
					"width":"80px",
					"template": "<span class='style-center'>#: nocm #</span>"
				},
				{
					"field": "noregistrasi",
					"title": "No Registrasi",
					"width":"100px",
					"template": "<span class='style-center'>#: noregistrasi #</span>"
				},
				{
					"field": "namapasien",
					"title": "Nama Pasien",
					"width":"200px",
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
					"width":"150px",

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
					"width":"150px",
					"template": "<span class='style-left'>#: namaruangan #</span>"
				},
				{
					"field": "namakelas",
					"title": "Kelas",
					"width":"80px",
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
				$scope.onClick = function(e){
					var element =$(e.currentTarget);

					var checked = element.is(':checked'),
					row = element.closest('tr'),
					grid = $("#kGrid").data("kendoGrid"),
					dataItem = grid.dataItem(row);


					if (checked) {
						var result = $.grep($scope.selectedData, function(e) { 
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
							$scope.norecAP =undefined;
							loadDataPasien();
							$scope.popUps.center().open();

							var actions = $scope.popUps.options.actions;
							actions.splice(actions.indexOf("Close"), 1);
							$scope.popUps.setOptions({ actions : actions });
						}
						


						function hapusData(e) {
							e.preventDefault();
							var grid = this;
							var row = $(e.currentTarget).closest("tr");
							var tr = $(e.target).closest("tr");
							var dataItem = this.dataItem(tr); 

							if (dataItem != undefined){
								for (var i = data2.length - 1; i >= 0; i--) {
									if (data2[i].no ==  dataItem.no){ 
										data2.splice(i, 1);
										

									}
								}
								for (var i = 0; i < data2.length; i++) {
									data2[i].no = i+1
								}
								grid.removeRow(row);
								$scope.dataSource = new kendo.data.DataSource({
									data: data2
								});
							}


						}

						$scope.tutup = function () {
							$scope.popUps.close();
							$scope.norecAP =undefined

						}

						var timeoutPromise;
						$scope.$watch('popup.noReg', function (newVal, oldVal) {
							if (newVal  && newVal !== oldVal) {
								applyFilter("noregistrasi", newVal)
							}
						})
						$scope.$watch('popup.noRm', function (newVal, oldVal) {
							if (newVal  && newVal !== oldVal) {
								applyFilter("nocm", newVal)
							}
						})

						$scope.$watch('popup.nama', function (newVal, oldVal) {
							if (newVal  && newVal !== oldVal) {
								applyFilter("namapasien", newVal)
							}
						})
						$scope.$watch('popup.ruangan', function (newVal, oldVal) {
							if (newVal  && newVal !== oldVal) {
								applyFilter("namaruangan", newVal)
							}
						})
						$scope.$watch('popup.kelas', function (newVal, oldVal) {
							if (newVal  && newVal !== oldVal) {
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
						$scope.Add = function(){
							if ($scope.dataPasienSelected ==undefined){
								toastr.error('Pilih data dulu')
								return
							}
							var nomor =0
							if ($scope.dataSource == undefined) {
								nomor = 1
							}else{
								nomor = data2.length + 1
							}

							var data={
								"no": nomor,
								"norec_pd": $scope.dataPasienSelected.norec_pd,
								"tglregistrasi":$scope.dataPasienSelected.tglregistrasi,
								"noregistrasi":$scope.dataPasienSelected.noregistrasi,
								"nocm":$scope.dataPasienSelected.nocm,
								"namapasien":$scope.dataPasienSelected.namapasien,
								"ruanganasal":$scope.dataPasienSelected.namaruangan,
								"namakelas":$scope.dataPasienSelected.namakelas,
								"objectkelasfk":$scope.dataPasienSelected.objectkelasfk,
								"objectruanganlastfk":$scope.dataPasienSelected.objectruanganlastfk,
								"nocmfk":$scope.dataPasienSelected.nocmfk,
							}
							data2.push(data)
							$scope.dataSource = new kendo.data.DataSource({
								data: data2
							});
							toastr.info('Pasien ' + $scope.dataPasienSelected.namapasien+' ditambahkan')


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
						$scope.Save=function(){
							if ($scope.item.jenisDiet==undefined){
								toastr.error('Jenis Diet belum di pilih !')
								return
							}
							if ($scope.item.kategoriDiet==undefined){
								toastr.error('Kategori Diet belum di pilih !')
								return
							}
							if ($scope.item.jenisWaktu==undefined){
								toastr.error('Jenis Waktu belum di pilih !')
								return
							}
							$scope.tombolSimpanVis = true;

							var objSave = {
								"norec_so" : norecSO,
								"tglnow" : new moment($scope.item.tglOrder).format('YYYY-MM-DD HH:mm:ss'),
								"tglorder" : new moment($scope.item.tglMenu).format('YYYY-MM-DD'),
								"objectjenisdietfk" :$scope.item.jenisDiet.id,
								"objectkategorydietfk" :$scope.item.kategoriDiet.id,
								"objectjeniswaktufk" :$scope.item.jenisWaktu.id,
								"details" :data2,
								"qtyproduk" :data2.length,
							}

							var data ={
								"strukorder" :objSave
							}

							manageServicePhp.saveOrderGizi(data).then(function(result) {
								if (result.status == 201){
									$scope.tombolSimpanVis = false;
									$scope.selectedData =[];
								}

								window.history.back();

							})
						}

					}
					]);
});

