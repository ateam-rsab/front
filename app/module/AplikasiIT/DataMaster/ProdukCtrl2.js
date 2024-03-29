define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('ProdukCtrl2', ['$q', '$rootScope', '$scope', '$state', 'ManageLogistikPhp', 'ManageSarprasPhp', 'CacheHelper',
		function ($q, $rootScope, $scope, $state, manageLogistikPhp, manageSarprasPhp, cacheHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.pegawai = JSON.parse(localStorage.getItem('pegawai'));

			var init = function () {
				// //debugger;
				//   ManageLogistikPhp.getDataTableMaster("produk/list-produk/100",true).then(function(e) {
				//        			////debugger;;
				//        			$scope.listDataMaster = e.data;
				//        			for (var i = 0; i < e.data.length; i++) {
				// 		e.data[i].no = i+1
				// 	}
				// 	$scope.listDataMaster = e.data;
				// 	$scope.dataSource = new kendo.data.DataSource({
				// 		pageSize: 10,
				// 		data: $scope.listDataMaster,
				// 		autoSync: true
				// 	});
				// });
				$scope.listDataStatus = [{
					id: 1,
					status: 'Aktif'
				}, {
					id: 2,
					status: 'Tidak Aktif'
				}]
				var chacePeriode = cacheHelper.get('ProdukCtrl2');
				if (chacePeriode != undefined) {
					////debugger;;
					var arrPeriode = chacePeriode.split('~');
					if (arrPeriode[0] != 'undefined') {
						$scope.item.kdProdukScr = arrPeriode[0];
					}
					if (arrPeriode[1] != 'undefined') {
						$scope.item.namaProdukScr = arrPeriode[1];
					}
					if (arrPeriode[2] != 'undefined') {
						$scope.item.kdProdukInternScr = arrPeriode[2];
					}
					if (arrPeriode[3] != 'undefined') {
						$scope.item.kdBarcodeScr = arrPeriode[3];
					}
					if (arrPeriode[4] != 'undefined') {
						$scope.item.kodeBmnScr = arrPeriode[4];
					}
					loadData()

					// $scope.item.namaProdukScr = arrPeriode[1];
					// $scope.item.kdProdukInternScr = arrPeriode[2];
					// $scope.item.kdBarcodeScr = arrPeriode[3];
					// $scope.item.kodeBmnScr = arrPeriode[4];
				} else {
					loadData()
				}
			}
			init();

			$scope.cariFilter = function () {
				loadData()
			}

			function loadData() {
				//debugger;
				var kode, kodeintern, kdBarcode, kdBmn, NamaProduk, StatuProduk;
				if ($scope.item.kdProdukScr === undefined) {
					kode = "";
				} else {
					kode = $scope.item.kdProdukScr
				}
				if ($scope.item.kdProdukInternScr === undefined) {
					kodeintern = "";
				} else {
					kodeintern = $scope.item.kdProdukInternScr
				}

				if ($scope.item.kdBarcodeScr === undefined) {
					kdBarcode = "";
				} else {
					kdBarcode = $scope.item.kdBarcodeScr
				}
				if ($scope.item.kodeBmnScr === undefined) {
					kdBmn = "";
				} else {
					kdBmn = $scope.item.kodeBmnScr
				}
				if ($scope.item.namaProdukScr === undefined) {
					NamaProduk = "";
				} else {
					NamaProduk = $scope.item.namaProdukScr
				}
				if ($scope.item.StatusEnb == undefined) {
					StatuProduk = ""
				} else {
					StatuProduk = $scope.item.StatusEnb.id
				}

				manageSarprasPhp.getDataTableTransaksi("settingdatafixed/get-settingdatafixed?idDataFixed=1204").then(function (data) {
					var sdfData = data.data.settingdatafixed[0].nilaifield
					if (sdfData.includes("," + $scope.pegawai.id + ",")) {
						// syntax ",idPegawai," untuk memastikan tidak ada pengecekan pada idPegawai yang redundant
						$scope.authorized = true;
					} else {
						$scope.authorized = false;
					}
				})

				manageLogistikPhp.getFieldListProduk(kode, kodeintern, kdBarcode, kdBmn, NamaProduk, StatuProduk).then(function (e) {
					// debugger;
					for (var i = 0; i < e.data.length; i++) {
						e.data[i].no = i + 1
						if (e.data[i].statusenabled == true) {
							e.data[i].status = "Aktif"
						} else if (e.data[i].statusenabled == false) {
							e.data[i].status = "Tidak Aktif"
						}
					}
					$scope.dataSource = new kendo.data.DataSource({
						data: e.data,

						schema: {
							model: {
								id: "id",
								fields: {
									kdproduk: {
										editable: false,
										type: "number"
									},
									kdbarcode: {
										editable: false,
										type: "number"
									},
									deskripsiproduk: {
										editable: false,
										type: "string"
									},
									namaproduk: {
										editable: false,
										type: "string"
									}
								}
							}
						},
						pageSize: 20,
					});
				})
				var chacePeriode = $scope.item.kdProdukScr + "~" + $scope.item.namaProdukScr + "~" + $scope.item.kdProdukInternScr +
					"~" + $scope.item.kdBarcodeScr + "~" + $scope.item.kodeBmnScr;
				cacheHelper.set('ProdukCtrl2', chacePeriode);
			}


			$scope.klik = function (current) {
				$scope.item.idx = current.id;
			}

			function disableData(e) {
				// debugger;
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (dataItem == undefined) {
					alert("Data Belum Dipilih!")
					return;
				};

				var objsave = {
					"statusenabled": "false",
					"IdProduk": dataItem.id
				};
				manageLogistikPhp.postData(objsave, 'produk/updateproduk-statusenabled').then(function (e) {
					init();
				});
				// IPSRSService.getClassMaster("delete-master-table?className=Produk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
				// 	init();
				// });
			};

			function enableData(e) {
				// debugger;
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (dataItem == undefined) {
					alert("Data Belum Dipilih!")
					return;
				};

				var objsave = {
					"statusenabled": "true",
					"IdProduk": dataItem.id
				};
				manageLogistikPhp.postData(objsave, 'produk/updateproduk-statusenabled').then(function (e) {
					init();
				});
			};

			$scope.edit = function () {
				if ($scope.authorized) {
					if ($scope.item.idx == undefined) {
						alert("Pilih 1 Data Untuk di edit!!")
					} else {
						$state.go("Produk", {
							idx: $scope.item.idx
						})
					}
				} else {
					alert("Tidak punya akses!")
					return;
				}
			}

			$scope.tambah = function () {
				if ($scope.authorized) {
					$state.go("Produk")
				} else {
					alert("Tidak punya akses!")
					return;
				}
			}


			$scope.columnProduk = [{
				"field": "id",
				"title": "Id",
				"width": "100px",
			}, {
				"field": "status",
				"title": "Status",
				"width": "100px",
			}, {
				"field": "namaproduk",
				"title": "Nama Produk",
				"width": "300px",
			}, {
				"field": "kdproduk",
				"title": "Kd Produk",
				"width": "100px",
			}, {
				"field": "kdbarcode",
				"title": "kd Barcode",
				"width": "100px",
			}, {
				"field": "detailjenisproduk",
				"title": "Detail Jenis",
				"width": "150px",
			}];
			
			$scope.mainGridOptions = {
				toolbar: [{
					text: "export",
					name: "Export detail",
					template: '<button ng-click="exportData()" class="k-button k-button-icontext k-grid-upload"><span class="k-icon k-i-excel"></span>Export to Excel</button>'
				}, ],
				pageable: true,
				columns: $scope.columnProduk,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			$scope.KelBPJS = function () {
				$state.go('KelompokProdukBPJS')
			}

			$scope.exportData = () => {
				var tempDataExport = [];
				var rows = [{
					cells: [{
						value: "ID"
					}, {
						value: "Status"
					}, {
						value: "Nama Produk"
					}, {
						value: "Kode Produk"
					}, {
						value: "Kode Barcode"
					}, {
						value: "Detail Jenis"
					}]
				}];

				tempDataExport = $scope.dataSource;
				tempDataExport.fetch(function () {
					var data = this.data();
					console.log(data);
					for (var i = 0; i < data.length; i++) {
						//push single row for every record
						rows.push({
							cells: [{
								value: data[i].id
							}, {
								value: data[i].status
							}, {
								value: data[i].namaproduk
							}, {
								value: data[i].kdproduk
							}, {
								value: data[i].kdbarcode
							}, {
								value: data[i].detailjenisproduk
							}]
						})
					}
					var workbook = new kendo.ooxml.Workbook({
						sheets: [{
							freezePane: {
								rowSplit: 1
							},
							columns: [{
								autoWidth: true
							}, {
								autoWidth: true
							}, {
								autoWidth: true
							}, {
								autoWidth: true
							}, {
								autoWidth: true
							}, {
								autoWidth: true
							}, ],
							// Title of the sheet
							title: "Daftar Produk",
							// Rows of the sheet
							rows: rows
						}]
					});
					//save the file as Excel file with extension xlsx
					kendo.saveAs({
						dataURI: workbook.toDataURL(),
						fileName: "daftar-produk.xlsx"
					});
				});


			}

		}
	]);
});