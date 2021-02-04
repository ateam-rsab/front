define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarOrderGiziCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'CacheHelper', 'DateHelper', 'ManageServicePhp',
		function ($mdDialog, $timeout, $state, $q, $rootScope, $scope, cacheHelper, dateHelper, manageServicePhp) {

			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.item.periodeAwal = new Date();
			$scope.item.periodeAkhir = new Date();
			$scope.item.tanggalPulang = new Date();
			$scope.dataPasienSelected = {};

			$scope.isRouteLoading = false;
			var dataMenuSiklus = [];
			var data2 = [];
			var addDataDetail = [];

			loadCombo();
			loadData();

			function loadCombo() {
				var chacePeriode = cacheHelper.get('cacheDaftarOrderGizi');
				if (chacePeriode != undefined) {

					var arrPeriode = chacePeriode.split('~');
					$scope.item.periodeAwal = new Date(arrPeriode[0]);
					$scope.item.periodeAkhir = new Date(arrPeriode[1]);
					$scope.item.tglpulang = new Date(arrPeriode[2]);
				} else {
					$scope.item.periodeAwal = dateHelper.setJamAwal(new Date());
					$scope.item.periodeAkhir = $scope.now;
					$scope.item.tglpulang = $scope.now;
				}
				manageServicePhp.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function (data) {
					$scope.listDepartemen = data.data.departemen;
					$scope.listKelompokPasien = data.data.kelompokpasien;
					$scope.listDokter = data.data.dokter;
					$scope.listDokter2 = data.data.dokter;
				})
				manageServicePhp.getDataTableTransaksi("gizi/get-combo", false).then(function (data) {
					$scope.listKelas = data.data.kelas;
					$scope.listJenisDiet = data.data.jenisdiet;
					$scope.listKategoriDiet = data.data.kategorydiet;
					$scope.listJenisWaktu = data.data.jeniswaktu;
					$scope.listMenu = data.data.produk;
				})
				// $scope.listStatus = manageKasir.getStatus();
			}
			$scope.getIsiComboRuangan = function () {
				$scope.listRuangan = $scope.item.instalasi.ruangan
			}

			$scope.formatTanggal = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY HH:mm');
			}
			$scope.formatTanggalNoTime = function (tanggal) {
				return moment(tanggal).format('DD-MMM-YYYY');
			}

			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.SearchData = function () {
				loadData()
			}

			function loadData() {
				dataMenuSiklus = [];
				$scope.isRouteLoading = true;
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

				var reg = ""
				if ($scope.item.noReg != undefined) {
					var reg = "&noreg=" + $scope.item.noReg
				}
				var rm = ""
				if ($scope.item.noRm != undefined) {
					var rm = "&norm=" + $scope.item.noRm
				}
				var nm = ""
				if ($scope.item.nama != undefined) {
					var nm = "&nama=" + $scope.item.nama
				}
				var ins = ""
				if ($scope.item.instalasi != undefined) {
					var ins = "&deptId=" + $scope.item.instalasi.id
				}
				var rg = ""
				if ($scope.item.ruangan != undefined) {
					var rg = "&ruangId=" + $scope.item.ruangan.id
				}
				var kp = ""
				if ($scope.item.kelompokpasien != undefined) {
					var kp = "&kelId=" + $scope.item.kelompokpasien.id
				}
				var dk = ""
				if ($scope.item.dokter != undefined) {
					var dk = "&dokId=" + $scope.item.dokter.id
				}
				var noorder = ""
				if ($scope.item.noOrder != undefined) {
					noorder = "&noorder=" + $scope.item.noOrder
				}
				var jenisDietId = ""
				if ($scope.item.jenisDiets != undefined) {
					jenisDietId = "&jenisDietId=" + $scope.item.jenisDiets.id
				}
				var jenisWaktuId = ""
				// if ($scope.item.jenisWaktu != undefined){
				// 	jenisWaktuId ="&jenisWaktuId=" +$scope.item.jenisWaktu.id
				// }



				manageServicePhp.getDataTableTransaksi("gizi/get-daftar-order?" +
					"tglAwal=" + tglAwal +
					"&tglAkhir=" + tglAkhir +
					reg + rm + nm + ins + rg + kp + dk + noorder
					+ jenisDietId + jenisWaktuId)
					.then(function (data) {
						$scope.isRouteLoading = false;
						var result = data.data.data
						for (var i = 0; i < result.length; i++) {
							result[i].no = i + 1
							result[i].statCheckbox = false
							var tanggal = new Date(result[i].tglregistrasi);
							var tanggalLahir = new Date(result[i].tgllahir);
							var umurzz = dateHelper.CountAge(tanggalLahir, tanggal);
							result[i].umurzz = umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'
							// if (result[i].strukkirimfk != null)
							// 	result[i].status= "✔" ;
							// else
							// 	result[i].status= "✘" ;
						}
						$scope.sourceGrid = new kendo.data.DataSource({
							data: result,
							pageSize: 10,
							total: result.length,
							serverPaging: true,


						});

						var chacePeriode = tglAwal + "~" + tglAkhir;
						cacheHelper.set('cacheDaftarOrderGizi', chacePeriode);
					});

			};

			$scope.cetakPermintaan = () => {
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');

				window.open("http://192.168.12.4:7777/service-reporting/lap-permintaan-makanan?idRu=" + ($scope.item.ruangan ? $scope.item.ruangan.id : '') +"&tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir, "_blank");
			}

			$scope.cetakRekap = () => {
				var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD');
				var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD');
				window.open("http://192.168.12.4:7777/service-reporting/lap-permintaan-makanan?idRu=" + ($scope.item.ruangan ? $scope.item.ruangan.id : '') + "&tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir, "_blank");
			}

			$scope.selectRow = function (dataItem) {
				var dataSelect = _.find($scope.sourceGrid._data, function (data) {
					return data.norec_op == dataItem.norec_op;
				});
				if (dataSelect.statCheckbox) {
					dataSelect.statCheckbox = false;
					for (let i = 0; i < $scope.selectedOnCheck.length; i++) {
						if (dataSelect.norec_op == $scope.selectedOnCheck[i].norec_op) {
							$scope.selectedOnCheck.splice([i], 1)
							break
						}
					}
				}
				else {
					dataSelect.statCheckbox = true;
					$scope.selectedOnCheck.push(dataSelect)
				}


				/*GET MENU */
				if (dataSelect.statCheckbox) {
					var tglMenu = moment(dataSelect.tglmenu).format('YYYY-MM-DD');
					var arrTgl = tglMenu.split('-');
					manageServicePhp.getDataTableTransaksi("gizi/get-produk-menudiet?jenisDietId="
						+ dataSelect.objectjenisdietfk
						+ "&kelasId=" + dataSelect.objectkelasfk
						+ "&siklusKe=" + arrTgl[2]
						+ "&jenisWaktuId=" + dataSelect.objectjeniswaktufk
						+ "&norec_op=" + dataSelect.norec_op
						+ "&norec_pd=" + dataSelect.norec_pd
					).then(function (e) {
						var result = e.data.data
						result.forEach(function (res) {
							dataMenuSiklus.push(res)

						})
						console.log(JSON.stringify(dataMenuSiklus));

					})
				} else {
					for (var i = dataMenuSiklus.length - 1; i >= 0; i--)
						if (dataMenuSiklus[i].norec_op === dataSelect.norec_op) {
							dataMenuSiklus.splice(i, 1);
							// break;
						}
					row.removeClass("k-state-selected");
					console.log(JSON.stringify(dataMenuSiklus));
				}

				/*end Get */
				console.log($scope.sourceGrid)
			}

			var isCheckAll = false
			$scope.selectUnselectAllRow = function () {
				var tempData = $scope.sourceGrid._data;
				if (isCheckAll) {
					isCheckAll = false;
					for (var i = 0; i < tempData.length; i++) {
						tempData[i].statCheckbox = false;
						$scope.selectedOnCheck = []
					}
				}
				else {
					isCheckAll = true;

					for (var i = 0; i < tempData.length; i++) {

						tempData[i].statCheckbox = true;
						$scope.selectedOnCheck.push(tempData[i])

						var tglMenu = moment(tempData[i].tglmenu).format('YYYY-MM-DD');
						var arrTgl = tglMenu.split('-');
						// manageServicePhp.getDataTableTransaksi("gizi/get-produk-menudiet?jenisDietId="
						// 	+ tempData[i].objectjenisdietfk
						// 	+ "&kelasId=" + tempData[i].objectkelasfk
						// 	+ "&siklusKe=" + arrTgl[2]
						// 	+ "&jenisWaktuId=" + tempData[i].objectjeniswaktufk
						// 	+ "&norec_op=" + tempData[i].norec_op
						// 	+ "&norec_pd=" + tempData[i].norec_pd
						// ).then(function (e) {
						// 	var result = e.data.data
						// 	result.forEach(function (res) {
						// 		dataMenuSiklus.push(res)

						// 	})
						// 	console.log(JSON.stringify(dataMenuSiklus));

						// })
					}
				}
				console.log($scope.selectedOnCheck)
				reloaddataSourceGrid(tempData);
			}

			function reloaddataSourceGrid(ds) {
				var newDs = new kendo.data.DataSource({
					data: ds,
					pageSize: 10,
					total: ds.length,
					serverPaging: true,
				});
				var grid = $('#kGrid').data("kendoGrid");
				grid.setDataSource(newDs);
				grid.refresh();
			}

			$scope.columnGrid = [
				// {
				// 	"template": "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
				// 	"width": 30
				// },
				{
					"title": "<input type='checkbox' class='checkbox' ng-click='selectUnselectAllRow()' />",
					template: "# if (statCheckbox) { #" +
						"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' checked />" +
						"# } else { #" +
						"<input type='checkbox' class='checkbox' ng-click='selectRow(dataItem)' />" +
						"# } #",
					width: "30px"
				},
				{
					"field": "tglorder",
					"title": "Tgl Order",
					"width": "80px",
					"template": "<span class='style-left'>{{formatTanggal('#: tglorder #')}}</span>"
				},
				{
					"field": "noorder",
					"title": "No Order",
					"width": "80px"
				},
				{
					"field": "tglmenu",
					"title": "Tgl Menu",
					"width": "80px",
					"template": "<span class='style-left'>{{formatTanggal('#: tglmenu #')}}</span>"
					// "template": "<span class='style-center'>{{formatTanggalNoTime('#: tglmenu #')}}</span>"
				},
				{
					"field": "noregistrasi",
					"title": "No Reg",
					"width": "80px",
				},
				{
					"field": "nocm",
					"title": "No RM",
					"width": "70px",
				},
				{
					"field": "namapasien",
					"title": "Nama Pasien",
					"width": "100px",
				},
				{
					"field": "umurzz",
					"title": "Umur",
					"width": "80px",
				},
				{
					"field": "tgllahir",
					"title": "Tgl Lahir",
					"width": "80px",
					"template": "<span class='style-left'>{{formatTanggal('#: tgllahir #')}}</span>"
				},
				{
					"field": "ruanganasal",
					"title": "Ruangan Asal",
					"width": "80px",
				},
				// {
				// 	"field": "namakelas",
				// 	"title": "Kelas",
				// 	"width" : "50px",
				// },
				{
					"field": "jenisdiet",
					"title": "Jenis Diet",
					"width": "80px"
				},
				// {
				// 	"field": "jeniswaktu",
				// 	"title": "Jenis Waktu",
				// 	"width":"60px"
				// },
				// {
				// 	"field": "pegawaiorder",
				// 	"title": "Pengorder",
				// 	"width":"100px",
				// 	"template": "<span class='style-left'>#: pegawaiorder #</span>"
				// },	
				{
					"field": "jenisorder",
					"title": "Jenis Order",
					"width": "70px"
				},
				{
					"field": "cc",
					"title": "CC",
					"width": "50px"
				},
				{
					"field": "volume",
					"title": "Frekuensi",
					"width": "50px"
				},
				{
					"field": "keterangan",
					"title": "Keterangan",
					"width": "80px"
				},
				{
					"field": "nokirim",
					"title": "No Kirim",
					"width": "80px",
					"template": '# if( nokirim==null) {# - # } else {# #= nokirim # #} #'
				},
			];

			$scope.kirim = function () {
				if ($scope.selectedOnCheck.length == 0) {
					toastr.error('Ceklis data yang mau dikirim !')
					return
				}
				if (dataMenuSiklus.length == 0) {
					toastr.info('Siklus Menu tidak ada !')

				}

				$scope.getSiklusMenus()
				$scope.popUpMenu.center().open();
				var actions = $scope.popUpMenu.options.actions;
				actions.splice(actions.indexOf("Close"), 1);
				$scope.popUpMenu.setOptions({ actions: actions });
			}

			$scope.columnGridMenu = [
				// {
				// 	"template": "<input type='checkbox' class='checkbox' ng-click='onClickDetails($event)' />",
				// 	"width": 30
				// },
				{
					"field": "no",
					"title": "No",
					"width": "10px",
				},
				{
					"field": "namaproduk",
					"title": "Nama Menu",
					"width": "100px"
				},
				{
					"field": "qtyproduk",
					"title": "Jumlah",
					"width": "40px",

				},

			];

			$scope.tambah = function () {
				if ($scope.item.qtyProduk == 0) {
					toastr.error("Qty harus di isi!")
					return;
				}

				if ($scope.item.namaProduk == undefined) {
					toastr.error("Pilih Menu terlebih dahulu!!")
					return;
				}
				var nomor = 0
				// if ($scope.souceGridMenu == undefined) {
				// 	nomor = 1
				// }else{
				nomor = data2.length + 1
				// }
				var data = {};
				if ($scope.item.no != undefined) {
					for (var i = data2.length - 1; i >= 0; i--) {
						if (data2[i].no == $scope.item.no) {
							data.no = $scope.item.no

							data.produkfk = $scope.item.namaProduk.id
							data.namaproduk = $scope.item.namaProduk.namaproduk
							data.qtyproduk = parseFloat($scope.item.qtyProduk)
							data2[i] = data;
							$scope.souceGridMenu = new kendo.data.DataSource({
								data: data2
							});
						}
					}

				} else {
					data = {
						no: nomor,
						produkfk: $scope.item.namaProduk.id,
						namaproduk: $scope.item.namaProduk.namaproduk,
						qtyproduk: parseFloat($scope.item.qtyProduk),
					}
					data2.push(data)
					$scope.souceGridMenu = new kendo.data.DataSource({
						data: data2
					});
				}
				clear();
			}
			$scope.klikMenu = function (dataSelectedMenu) {
				var dataMenu = [];

				$scope.item.no = dataSelectedMenu.no
				for (var i = $scope.listMenu.length - 1; i >= 0; i--) {
					if ($scope.listMenu[i].id == dataSelectedMenu.produkfk) {
						dataMenu = $scope.listMenu[i]
						break;
					}
				}
				$scope.item.namaProduk = dataMenu;
				$scope.item.qtyProduk = parseFloat(dataSelectedMenu.qtyproduk)
			}
			$scope.hapus = function () {
				if ($scope.item.qtyProduk == 0) {
					toastr.error("Qty harus di isi!")
					return;
				}

				if ($scope.item.namaProduk == undefined) {
					toastr.error("Pilih Data terlebih dahulu!!")
					return;
				}
				var nomor = 0
				// if ($scope.souceGridMenu == undefined) {
				// 	nomor = 1
				// }else{
				nomor = data2.length + 1
				// }
				var data = {};
				if ($scope.item.no != undefined) {
					for (var i = data2.length - 1; i >= 0; i--) {
						if (data2[i].no == $scope.item.no) {
							data2.splice(i, 1);
							for (var i = data2.length - 1; i >= 0; i--) {
								data2[i].no = i + 1
							}
							$scope.souceGridMenu = new kendo.data.DataSource({
								data: data2
							});
						}
					}

				} clear();
			}
			function clear() {
				delete $scope.item.namaProduk
				delete $scope.item.qtyProduk
				delete $scope.item.no
			}
			$scope.batal = function () {
				data2 = []
				$scope.souceGridMenu = new kendo.data.DataSource({
					data: data2
				});
				clear();
			}

			$scope.$watch('item.qtyProduk', function (newValue, oldValue) {
				if (newValue != oldValue) {
					if ($scope.item.qtyProduk < 0) {
						$scope.item.qtyProduk = "";
					}
				}
			})



			$scope.selectedOnCheck = [];
			$scope.onClick = function (e) {
				var element = $(e.currentTarget);

				var checked = element.is(':checked'),
					row = element.closest('tr'),
					grid = $("#kGrid").data("kendoGrid"),
					dataItem = grid.dataItem(row);


				/*GET MENU */
				if (checked) {
					var tglMenu = moment(dataItem.tglmenu).format('YYYY-MM-DD');
					var arrTgl = tglMenu.split('-');
					// manageServicePhp.getDataTableTransaksi("gizi/get-produk-menudiet?jenisDietId="
					// 	+ dataItem.objectjenisdietfk
					// 	+ "&kelasId=" + dataItem.objectkelasfk
					// 	+ "&siklusKe=" + arrTgl[2]
					// 	+ "&jenisWaktuId=" + dataItem.objectjeniswaktufk
					// 	+ "&norec_op=" + dataItem.norec_op
					// 	+ "&norec_pd=" + dataItem.norec_pd
					// ).then(function (e) {
					// 	var result = e.data.data
					// 	result.forEach(function (res) {
					// 		dataMenuSiklus.push(res)

					// 	})
					// 	console.log(JSON.stringify(dataMenuSiklus));

					// })
				} else {
					for (var i = dataMenuSiklus.length - 1; i >= 0; i--)
						if (dataMenuSiklus[i].norec_op === dataItem.norec_op) {
							dataMenuSiklus.splice(i, 1);
							// break;
						}
					row.removeClass("k-state-selected");
					console.log(JSON.stringify(dataMenuSiklus));
				}

				/*end Get */

				if (checked) {
					var result = $.grep($scope.selectedOnCheck, function (e) {
						return e.norec_op == dataItem.norec_op;
					});
					if (result.length == 0) {
						$scope.selectedOnCheck.push(dataItem);
					} else {
						for (var i = 0; i < $scope.selectedOnCheck.length; i++)
							if ($scope.selectedOnCheck[i].norec_op === dataItem.norec_op) {
								$scope.selectedOnCheck.splice(i, 1);
								break;
							}
						$scope.selectedOnCheck.push(dataItem);
					}
					row.addClass("k-state-selected");



				} else {
					for (var i = 0; i < $scope.selectedOnCheck.length; i++)
						if ($scope.selectedOnCheck[i].norec_op === dataItem.norec_op) {
							$scope.selectedOnCheck.splice(i, 1);
							break;
						}
					row.removeClass("k-state-selected");
				}
			}

			$scope.getSiklusMenus = function () {

				var qtyProduk = 0
				var totalMenu = 0;
				var dataDetail = [];
				var dataDetail2 = [];
				var adaDetail = 0;
				if (dataMenuSiklus.length > 0) {

					for (var i = 0; i < dataMenuSiklus.length; i++) {
						totalMenu = totalMenu + 1;
						adaDetail = 0
						for (var x = 0; x < dataDetail2.length; x++) {
							if (dataDetail2[x].produkfk == dataMenuSiklus[i].produkfk) {
								dataDetail2[x].qtyproduk = parseFloat(dataDetail2[x].qtyproduk) + parseFloat(dataMenuSiklus[i].qtyproduk)
								adaDetail = 1;
							}
						};
						if (adaDetail == 0) {
							dataDetail = {
								"produkfk": dataMenuSiklus[i].produkfk,
								"namaproduk": dataMenuSiklus[i].namaproduk,
								"qtyproduk": dataMenuSiklus[i].qtyproduk,
								"norec_op": dataMenuSiklus[i].norec_op,

							}
							dataDetail2.push(dataDetail)
						}
					}

				}

				for (var i = 0; i < dataDetail2.length; i++) {
					dataDetail2[i].no = i + 1
				}
				data2 = dataDetail2;
				$scope.souceGridMenu = new kendo.data.DataSource({
					data: data2
				});

			}


			$scope.selectedDetails = [];
			$scope.onClickDetails = function (e) {
				var element = $(e.currentTarget);

				var checked = element.is(':checked'),
					row = element.closest('tr'),
					grid = $("#kGridDetails").data("kendoGrid"),
					dataItem = grid.dataItem(row);


				if (checked) {
					var result = $.grep($scope.selectedDetails, function (e) {
						return e.norec_op == dataItem.norec_op;
					});
					if (result.length == 0) {
						$scope.selectedDetails.push(dataItem);
					} else {
						for (var i = 0; i < $scope.selectedDetails.length; i++)
							if ($scope.selectedDetails[i].norec_op === dataItem.norec_op) {
								$scope.selectedDetails.splice(i, 1);
								break;
							}
						$scope.selectedOnCheck.push(dataItem);
					}
					row.addClass("k-state-selected");
				} else {
					for (var i = 0; i < $scope.selectedDetails.length; i++)
						if ($scope.selectedDetails[i].norec_op === dataItem.norec_op) {
							$scope.selectedDetails.splice(i, 1);
							break;
						}
					row.removeClass("k-state-selected");
				}
			}

			$scope.saveKirimMenu = function () {
				// if (data2.length == 0) {
				// 	toastr.error("Pilih Menu terlebih dahulu!!")
				// 	return
				// }
				if ($scope.item.jenisWaktu == undefined) {
					toastr.error("Pilih Jenis Waktu terlebih dahulu!!")
					return
				}
				var norec_sk = "";
				if ($scope.norecSK != undefined) {
					norec_sk = $scope.norecSK
				}
				for (var i = 0; i < $scope.selectedOnCheck.length; i++) {
					$scope.selectedOnCheck[i].objectjeniswaktufk = $scope.item.jenisWaktu.id
				}
				var objSave = {
					"norec_sk": norec_sk,
					"objectruanganasalfk": $scope.selectedOnCheck[0].objectruangantujuanfk,
					// "objectruangantujuanfk" :$scope.dataPasienSelected.objectruanganfk,
					// "norec_pd" : $scope.item.pasien.norec_pd,
					"qtyproduk": data2.length,
					"objectjeniswaktufk": $scope.item.jenisWaktu.id,
					"details": data2,
					"datapasien": $scope.selectedOnCheck,
				}
				var post = {
					"strukkirim": objSave
				}
				manageServicePhp.saveKirimMenuMakanan(post).then(function (e) {
					if (e.status == 201) {
						$scope.noKirim = e.data.nokirim.norec
						var dataz = {};
						$scope.showLabel = true;
						loadData();
						$scope.selectedOnCheck = [];
						dataMenuSiklus = [];
					}

				})

			}

			$scope.tutup = function () {
				$scope.batal();
				$scope.popUpMenu.close();
			}



			// $scope.showCetak = function () {

			// 	if ($scope.dataPasienSelected == undefined) {
			// 		toastr.error('Pilih data terlebih dahulu')
			// 		return
			// 	}
			// 	$scope.popUpCetakLabel.center().open();
			// 	$scope.popUpCetakLabel.qty = 1;
			// }

			$scope.klikGrid = function (data) {
				console.log(data)
			}

			$scope.cetak = function () {

				// if ($scope.popUpCetakLabel.qty == 0) {
				// 	toastr.error('qty tidak boleh nol')
				// 	return
				// }
				// var noKirim = ""
				// if ($scope.noKirim != undefined) {
				// 	noKirim = $scope.noKirim
				// } else {
				// 	noKirim = $scope.dataPasienSelected.strukkirimfk
				// }

				// var client = new HttpClient();
				// client.get('http://127.0.0.1:1237/printvb/gizi?cetak-label-gizi=' + noKirim + '&view=false&qty=' + $scope.popUpCetakLabel.qty, function (response) {

				// });
				window.open("http://172.16.99.48:7777/service-reporting/label-gizi/" + $scope.dataPasienSelected.noregistrasi);
			}


			var HttpClient = function () {
				this.get = function (aUrl, aCallback) {
					var anHttpRequest = new XMLHttpRequest();
					anHttpRequest.onreadystatechange = function () {
						if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
							aCallback(anHttpRequest.responseText);
					}

					anHttpRequest.open("GET", aUrl, true);
					anHttpRequest.send(null);
				}
			}

			/*END */


		}
	]);
});