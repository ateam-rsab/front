define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('MonitoringRekeningKoranBendaharaPenerimaanCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageSdm', '$state', 'CacheHelper', 'DateHelper', 'MnKeu', 'ManageKasir', 'ManageServicePhp',
		function ($q, $rootScope, $scope, modelItemAkuntansi, manageSdm, $state, cacheHelper, dateHelper, mnKeu, manageKasir, manageServicePhp) {
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item = {};
			$scope.isRouteLoading = false;
			var sourceDataGrid = [];
			$scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
			$scope.item.tglAwal = new Date();
			$scope.item.tglbku = new Date();
			$scope.item.tglAkhir = new Date();
			$scope.kas = {}
			$scope.bank = {}
			$scope.lampiran = {}
			$scope.kas.periode = new Date()
			loadCombo();
			showButton();
			loadCache();
			// modelItemAkuntansi.getDataDummyPHP("bendaharapenerimaan/get-mataanggaran-part", true, true, 10).then(function(data) {
			//            $scope.listMataAnggaran= data;
			//        });
			function showButton() {
				$scope.showBtnTerima = true;
				$scope.showBtnDetail = true;
			};

			function loadCombo() {
				// $scope.listJenisTransaksi=new kendo.data.DataSource({
				// 	data:[{"jenis":"Pembayaran Piutang"},{"jenis":"Setoran Kasir"},{"jenis":"Bunga"},{"jenis":"Belum teridentifikasi"}]
				// });
				mnKeu.getDataTableTransaksi("kasir/laporan-penerimaan-kasir-datacombo")
					.then(function (data) {
						$scope.listJenisTransaksi = data.data.mapkelompoktransaksi;
					});
				manageKasir.getDataGeneric("Bank&select=id,nama").then(function (data) {
					$scope.listNoRekening = data;
				});
				// $scope.listNoRekening=new kendo.data.DataSource({
				// 	data:[{"id":"1","nama":"Bank BRI"},{"id":"2","nama":"Bank BCA"},{"id":"3","nama":"Bank BNI"},{"id":"4","nama":"BANK DKI"}]
				// });
				//listJenisTransaksi
				//listNoRekening
				$scope.listKdPerkiraan = [{
					"id": 1, "name": "41112100000000"
				}, {
					"id": 2, "name": "4111001"
				}];
			};

			$scope.formatRupiah = function (value, currency) {
				if (value == "undefined" || value == "null") {
					value = 0;
					return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
				} else {
					return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
				}
			};

			function simpanCache() {
				//SIMPAN CAHCE
				var tglAwal1 = dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD");
				var tglAkhir1 = dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD");
				//item.jenisTransaksi
				// if($scope.item.jenisTransaksi != undefined){
				// 	var jt = $scope.item.jenisTransaksi.jenis
				// };
				// if($scope.item.noRekening != undefined){
				// 	var nr = $scope.item.noRekening.namaExternal
				// };
				var chaceFilter = tglAwal1 + "~" + tglAkhir1 + "~"// + jt + "~" + nr + "~"
				cacheHelper.set('filterHistory', chaceFilter);
				///END
			};
			function loadCache() {
				//ON LOAD with Params
				var chaceFilter = cacheHelper.get('filterHistory');
				if (chaceFilter != undefined) {

					var arrPeriode = chaceFilter.split('~');
					$scope.item.tglAwal = new Date(arrPeriode[0]);
					$scope.item.tglAkhir = new Date(arrPeriode[1]);

					// if (arrPeriode[2] != "undefined"){
					// 	$scope.item.jenisTransaksi.jenis = arrPeriode[2];
					// };
					// if (arrPeriode[3] != "undefined"){
					// 	$scope.item.noRekening.namaExternal = arrPeriode[3];
					// };

					loadData()
				}
				else {
					$scope.item.tanggalAwal = $scope.now;
					$scope.item.tanggalAkhir = $scope.now;
				};
				///END/// ON LOAD with Params
			}


			function loadData() {
				var tglAwal1 = dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD");
				var tglAkhir1 = dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD");

				if ($scope.item.kelompokTransaksi != undefined) {
					var jt = $scope.item.kelompokTransaksi.id
				};
				if ($scope.item.noRekening != undefined) {
					var nr = $scope.item.noRekening.nama
				};
				var namaPerkiraan =""
				if ($scope.item.namaPerkiraan!= undefined){
					namaPerkiraan=$scope.item.namaPerkiraan
				}
				$scope.isRouteLoading = true;
				modelItemAkuntansi.getDataTableTransaksi("bendaharapenerimaan/daftar-penerimaan-bank?tglAwal=" + tglAwal1 + "&tglAkhir=" +
					tglAkhir1
					+ "&jenisTransaksi=" + jt
					+ "&noRekening=" + nr
					+ "&namaPerkiraan="+namaPerkiraan
				).then(function (data) {
					$scope.isRouteLoading = false;
					$scope.saldoLama = data.saldolama
					$scope.saldoAkhir = data.saldoAkhir

					for (var i = 0; i < data.data.length; i++) {
						data.data[i].no = i + 1
						if (data.data[i].penyetor != null)
						data.data[i].kettransaksi = 'a.n ' +data.data[i].penyetor 
					}
					sourceDataGrid = data.data;

					$scope.dataSource = {
						data: data.data,
						_data: data.data,
						pageSize: 10,
						selectable: true,
						refresh: true,
						total: data.data.length,
						serverPaging: false,
					};
				});
			};

			$scope.columnGrid = {
				toolbar: [
					"excel",
					{
						name: "penerimaan", text: "Penerimaan",
						template: '<button ng-click="Terima()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Penerimaan</button>'
					},
					{
						name: "create", text: "Pengeluaran",
						template: '<button ng-click="Pengeluaran()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-cancel"></span>Pengeluaran</button>'
					},
					{
						name: "saldoLama", text: "Saldo Lama",
						template: '<button ng-click="" class="k-button k-button-icontext k-grid-upload">Saldo Awal : {{formatRupiah(saldoLama,"Rp. ")}}</button>'
					},
				],
				excel: {
					fileName: "Buku Kas UMUM " + moment($scope.item.tglAwal).format('DD/MMM/YYYY') + "-"
						+ moment($scope.item.tglAwal).format('DD/MMM/YYYY') + ".xlsx",
					allPages: true,
				},
				excelExport: function (e) {
					var sheet = e.workbook.sheets[0];
					sheet.frozenRows = 2;
					sheet.mergedCells = ["A1:H1"];
					sheet.name = "Orders";

					var myHeaders = [{
						value: "Buku Kas Umum",
						fontSize: 20,
						textAlign: "center",
						background: "#ffffff",
						// color:"#ffffff"
					}];

					sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70 });
				},
				sortable: false,
				reorderable: true,
				filterable: false,
				pageable: true,
				columnMenu: false,
				resizable: true,
				selectable: 'row',
				columns: [
					// { 
					// 	field: "no", title: "No", width:"60px", 
					// },
					{
						field: "tglStruk", title: "Tanggal", width: "100px",
						// template: "#= kendo.toString(new Date(tglStruk), 'MM-dd-yyyy') #", 
					},
					{
						field: "nobukti", title: "No. Bukti", width: "130px"
					},
					// {  
					// 	field: "noclosing",title: "No Bukti",width:"100px"  
					// },
					// {  
					// 	field: "kdmataanggaran",title: "MAK",width:"100px"  
					// },
					{
						field: "kdperkiraan", title: "Kd. Perkiraan", width: "150px"
					},
					{
						field: "namaperkiraan", title: "Nama Perkiraan", width: "230px"
					},
					{
						field: "jenisTransaksi", title: "Jenis Transaksi", width: "150px",
						template: "<span class='style-left'>#: jenisTransaksi #</span>"
					},
					{
						field: "kettransaksi", title: "Keterangan Transaksi", width: "150px",
						template: "<span class='style-left'>#: kettransaksi #</span>"
					},
					{
						field: "debit", title: "Penerimaan (Debit)", width: "180px",
						template: "<span class='style-right'>{{formatRupiah('#: debit #', 'Rp. ')}}</span>",
					},
					{
						field: "kredit", title: "Pengeluaran (Kredit)", width: "180px",
						template: "<span class='style-right'>{{formatRupiah('#: kredit #', 'Rp. ')}}</span>",
						footerTemplate: "<span class='style-right'>Saldo Akhir</span>"
					},
					{
						field: "saldo", title: "Saldo", width: "180px",
						template: "<span class='style-right'>{{formatRupiah('#: saldo #', 'Rp. ')}}</span>",
						footerTemplate: "<span class='style-right'>{{formatRupiah(saldoAkhir,'Rp. ')}}</span>"
					},
					{
						command: {
							text: "Hapus", width: "40px", align: "center",
							attributes: { align: "center" },
							click: removeRow,
							imageClass: "k-icon k-delete"
							// template: "<div class='k-button  k-button-icontext k-grid-upload'><span class='k-icon k-delete'></span>Hapus</div>"
						},
						title: "",
						width: "100px",
					}
				],
				sortable: {
					mode: "single",
					allowUnsort: false,
				},
				pageable: {
					messages: {
						display: "Menampilkan {0} - {1} data dari {2} data"
					},
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				}
			};
			function removeRow(e) {
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var dataItem = this.dataItem(tr);

				var itemDelete = {
					"norec_struk_histori": dataItem.norec_sh
				}
				// var tempData=[];
				// tempData.push(itemDelete);
				manageServicePhp.deleteBKU(itemDelete).then(function (e) {
					if (e.status === 201) {
						loadData();
						grid.removeRow(row);
					}
				})

			}

			$scope.SearchData = function () {
				loadData();
				simpanCache()
			};

			$scope.$watch('item.caraBayar', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.caraBayarNonTunai = false
					if ($scope.item.caraBayar.caraBayar != "TUNAI") {
						$scope.caraBayarNonTunai = true
					}
				}
			});


			$scope.handleInputBlur = function () {
				// debugger;
				//if (newValue != "" && newValue.caraBayar !="" ) {
				var duit = $scope.item.jumlah
				modelItemAkuntansi.getDataGlobal("valet/terbilang/" + duit).then(
					function (data) {
						$scope.item.terbilang = data.terbilang;
					})
				//}
				$scope.item.jumlah = duit// parseFloat(duit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}
		
			
			$scope.Terima = function () {
				kosongkan()
				$scope.txtDisable = false
				$scope.penerimaan = true
				$scope.popUpPenerimaan.center().open();
				// Get current actions
				var actions = $scope.popUpPenerimaan.options.actions;
				// Remove "Close" button
				actions.splice(actions.indexOf("Close"), 1);
				// Set the new options
				$scope.popUpPenerimaan.setOptions({ actions: actions });
				loadComboPopup()
			};
			$scope.Pengeluaran = function () {
				kosongkan()
				$scope.penerimaan = false
				$scope.txtDisable = false
				$scope.popUpPengeluaran.center().open();
				// Get current actions
				var actions = $scope.popUpPengeluaran.options.actions;
				// Remove "Close" button
				actions.splice(actions.indexOf("Close"), 1);
				// Set the new options
				$scope.popUpPengeluaran.setOptions({ actions: actions });
				loadComboPopup()
			};
			$scope.batalPenerimaan = function () {
				kosongkan()
				$scope.popUpPengeluaran.close();
				$scope.popUpPenerimaan.close();
				loadCombo()
			}
			function loadComboPopup() {
				var ket = ""
				if ($scope.penerimaan == true) {
					ket = "Penerimaan"
					mnKeu.getDataTableTransaksi("kasir/laporan-penerimaan-kasir-datacombo?keterangan="
						+ ket)
						.then(function (data) {
							$scope.listJenisTransaksi = data.data.mapkelompoktransaksi;
							$scope.listMataAnggaran = data.data.mataanggaran;

						});
				} else {
					ket = "Pengeluaran"
					mnKeu.getDataTableTransaksi("kasir/laporan-penerimaan-kasir-datacombo?keterangan="
						+ ket)
						.then(function (data) {
							$scope.listJenisTransaksi = data.data.mapkelompoktransaksi;
							$scope.listMataAnggaran = data.data.mataanggaran;
						});

				}

				mnKeu.getListGeneric("BankAccount&select=id,bankAccountNama,bankAccountNomor").then(function (data) {
					$scope.listNamaBank = data;
				});
				mnKeu.getListGeneric("CaraBayar&select=id,caraBayar").then(function (data) {
					$scope.listCaraBayar = data;
				});
				manageKasir.getDataGeneric("Bank&select=id,nama").then(function (data) {
					$scope.listnamaBankTransfer = data;
				});
			}
			$scope.SavePenerimaan = function () {
				// debugger;
				if ($scope.item.jumlah == "") {
					toastr.error("Jumlah belum diisi!");
					return;
				}
				if ($scope.item.keterangan == "") {
					toastr.error("Nama Perkiraan belum diisi!");
					return;
				}
				if ($scope.item.jenisTransaksi == undefined) {
					toastr.error("Keompok Transaksi belum di pilih!");
					return;
				}

				// if($scope.item.caraBayar == undefined){
				// 	alert("Cara Bayar belum di pilih!");
				// 	return;
				// }else{
				// 	if ($scope.item.caraBayar.caraBayar != 'TUNAI') {
				// 		if($scope.item.namaBank == undefined){
				// 			alert("Nama Bank belum di pilih!");
				// 			return;
				// 		}
				// 		if($scope.item.namaBankTransfer == undefined){
				// 			alert("Nama Bank Transfer belum di pilih!");
				// 			return;
				// 		}
				// 		if($scope.item.namaKartu == ""){
				// 			alert("Nama Pemilik Rekening belum di isi!");
				// 			return;
				// 		}
				// 	}
				// }
				var kdPerkiraan = ""
				if ($scope.item.kdPerkiraan != undefined)
					kdPerkiraan = $scope.item.kdPerkiraan

				var ketTransaksi = ""
				if ($scope.item.ketTransaksi != undefined)
					ketTransaksi = $scope.item.ketTransaksi

				var dataObjPost = {};
				// if ($scope.item.caraBayar.caraBayar != 'TUNAI') {
				// 	dataObjPost = {
				// 		keterangan: $scope.item.keterangan,
				// 		tglbku: moment($scope.item.tglbku).format('YYYY-MM-DD HH:mm'),
				// 		totalSetor: $scope.item.jumlah,
				// 		jenisTransaksi: $scope.item.jenisTransaksi.id,
				// 		caraBayar: $scope.item.caraBayar.id,
				// 		penerimaan:$scope.penerimaan,
				// 		keterangantransaksi:$scope.item.ketTransaksi,
				// 		kdperkiraan:$scope.item.kdPerkiraan,
				// 		nobukti:$scope.item.noBukti,
				// 		// objectmataanggaranfk:$scope.item.mataAnggaran.norec,
				// 		detailBank : {
				// 			id : $scope.item.namaBank.id,
				// 			namaBank : $scope.item.namaBankTransfer.nama,
				// 			namaKartu : $scope.item.namaKartu
				// 		}
				// 	}
				// }else{
				dataObjPost = {
					keterangan: $scope.item.keterangan,
					tglbku: moment($scope.item.tglbku).format('YYYY-MM-DD HH:mm'),
					totalSetor: $scope.item.jumlah,
					jenisTransaksi: $scope.item.jenisTransaksi.id,
					caraBayar: 1,//$scope.item.caraBayar.id,
					detailBank: 'KOSONG',
					penerimaan: $scope.penerimaan,
					keterangantransaksi: $scope.item.ketTransaksi,
					kdperkiraan: $scope.item.kdPerkiraan,
					nobukti: $scope.item.noBukti,
					// objectmataanggaranfk:$scope.item.mataAnggaran.norec,
				}
				// }
				manageKasir.penerimaanBank(dataObjPost).then(function (e) {
				})
				// Kembali();
				kosongkan();
				loadData()
				// loadCombo()
			}
			function kosongkan() {
				// $scope.item.tglbku ='';
				$scope.item.keterangan = '';
				$scope.item.ketTransaksi = '';
				$scope.item.ketTransaksi = '';
				$scope.item.kdPerkiraan = '';
				$scope.item.jumlah = '';
				$scope.item.jenisTransaksi = undefined;
				$scope.item.caraBayar = undefined;
				$scope.item.namaBank = undefined;
				$scope.item.namaBankTransfer = undefined;
				$scope.item.namaKartu = '';
				$scope.item.terbilang = '';

			}

			$scope.Detail = function () {
				$scope.txtDisable = false
				// $scope.showBtnSimpan = true
				$scope.showJenisTransaksi1 = true
				$scope.showJenisTransaksi2 = false
				$scope.showCaraBayar1 = true
				$scope.showCaraBayar2 = false
				$scope.showNamaBank1 = true
				$scope.showNamaBank2 = false
				loadComboPopup()
				$scope.listJenisTransaksi = ([{ id: $scope.dataSelected.idJenisTransaksi, kelompokTransaksi: $scope.dataSelected.jenisTransaksi }])

				$scope.item.keterangan = $scope.dataSelected.keterangan
				$scope.item.jumlah = $scope.dataSelected.totalSetor
				$scope.item.jenisTransaksi = { id: $scope.dataSelected.idJenisTransaksi, kelompokTransaksi: $scope.dataSelected.jenisTransaksi }
				$scope.popUpPenerimaan.center().open();

			};
			$scope.changePage2 = function (stateName) {
				var noSetorr = "No Data !!"
				if ($scope.dataSelected != undefined) {
					noSetorr = $scope.dataSelected.noStruk
				};
				var obj = {
					splitString: "MonitoringRekeningKoranBendaharaPenerimaan" + "~" + noSetorr + "~Detail~"
				};

				$state.go(stateName, {
					dataFilter: JSON.stringify(obj)
				});
			};
			$scope.ClearData = function () {
				$scope.item.kelompokTransaksi = ''
				$scope.item.noRekening = ''
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

			$scope.cetakLapHarianKasBank = function () {
				$scope.isRouteLoading = true;
				var tglawal = moment($scope.item.tglAwal).format('YYYY-MM-DD 00:00');
				var tglakhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD 23:59');


				var data =
				{
					tempbku: sourceDataGrid,
					saldoakhir: $scope.saldoAkhir,
					saldoawal: $scope.saldoLama

				}
				manageServicePhp.saveTempBku(data).then(function (e) {
					$scope.isRouteLoading = false;
					var kelompokTransaksi = 'BANK BENDAHARA PENERIMAAN';
					if ($scope.item.kelompokTransaksi != undefined) {
						kelompokTransaksi = $scope.item.kelompokTransaksi.kelompokTransaksi
					}
					var idBKU = e.data.data.idbukukasumum
					if (confirm('View Lapopra Harian Kas Bank? ')) {
						stt = 'true';
					} else {
						var stt = 'false'
					}
					// Do nothing!
					var client = new HttpClient();
					client.get('http://127.0.0.1:1237/printvb/kasir?cetak-laporan-harian-kasbank=' + idBKU
						+ '&tglAwal=' + tglawal
						+ '&tglAkhir=' + tglakhir
						+ '&view=' + stt + '&user=' + $scope.dataLogin.namaLengkap
						+ '&judul=' + kelompokTransaksi, function (response) {
						});
				})
			}

			$scope.cetakBerita = function () {
				var tmp = []
				tmp.push({
					'jenis': 'kas',
					'penerimaan': parseFloat($scope.kas.penerimaan),
					'pengeluaran': parseFloat($scope.kas.pengeluaran),
					'jumlah': parseFloat($scope.kas.jumlah),
					'saldoawal': parseFloat($scope.kas.saldoAwal),
					'saldoakhir': parseFloat($scope.kas.saldoAkhir),
				})
				tmp.push({
					'jenis': 'bank',
					'penerimaan': parseFloat($scope.bank.penerimaan),
					'pengeluaran': parseFloat($scope.bank.pengeluaran),
					'jumlah': parseFloat($scope.bank.jumlah),
					'saldoawal': parseFloat($scope.bank.saldoAwal),
					'saldoakhir': parseFloat($scope.bank.saldoAkhir),
				})

				var obj = {
					tempdata: tmp
				}
				manageServicePhp.saveDataTransaksi('bendaharapenerimaan/save-temp-beritaacara', obj).then(function (e) {
					var idTemp = e.data.data.idtempberita
					var now = $scope.kas.periode
					var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
					var _hari = now.getDay();
					var hari = hari[_hari]
					var tgl = dateHelper.getTanggalFormatted(now)
					var jam = moment(now).format('HH:mm') + ' WIB'
					if (confirm('View Berita Acara? ')) {
						var stt = 'true';
					} else {
						var stt = 'false'
					}
					// Do nothing!
					var client = new HttpClient();
					client.get('http://127.0.0.1:1237/printvb/kasir?cetak-berita-acara-kasbank=' + hari
						+ '&tgl=' + tgl
						+ '&jam=' + jam
						+ '&idTemp=' + idTemp
						+ '&view=' + stt
						, function (response) {
						});
				})
				// var now = $scope.kas.periode
				// var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu']
				// var _hari = new Date().getDay();
				// var hari = hari[_hari]
				// var tgl = dateHelper.getTanggalFormatted(new Date())
				// var tglAkhir = moment(new Date()).format('YYYY-MM-DD HH:mm')

				// var tglAwal = now.setMonth(now.getMonth() - 1)
				// tglAwal = moment(new Date(tglAwal)).format('YYYY-MM-01 00:00')
				// var yM = moment(new Date(tglAwal)).format('YYYYMM')
				// var jam = moment(new Date()).format('HH:mm') + ' WIB'



				// if (confirm('View Berita Acara? ')) {
				// 	stt = 'true';
				// } else {
				// 	var stt = 'false'
				// }
				// // Do nothing!
				// var client = new HttpClient();
				// client.get('http://127.0.0.1:1237/printvb/kasir?cetak-berita-acara-kasbank=' + hari
				// 	+ '&tgl=' + tgl
				// 	+ '&jam=' + jam
				// 	+ '&tglAwal=' + tglAwal
				// 	+ '&tglAkhir=' + tglAkhir
				// 	+ '&yM=' + yM
				// 	+ '&view=' + stt
				// 	, function (response) {
				// 	});
			}
			$scope.$watch('kas.periode', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.calculateKasBank(newValue)
				}
			});
			$scope.calculateKasBank = function (newValue) {
				var now = newValue
				var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
				var _hari = new Date().getDay();
				var hari = hari[_hari]

				var tglAwal = now.setMonth(now.getMonth())
				tglAwal = moment(new Date(tglAwal)).format('YYYY-MM-01')
				var tglAkhir = moment(now).format('YYYY-MM-DD')

				var sKreditAkhir = 0
				var sDebetAkhir = 0
				var kasPenerimaan = 0
				var kasPengeluaran = 0
				var kasJumlah = 0
				var kasSaldoAwal = 0
				var kasSaldoAkhir = 0

				var bankPenerimaan = 0
				var bankPengeluaran = 0
				var bankJumlah = 0
				var bankSaldoAwal = 0
				var bankSaldoAkhir = 0
				manageServicePhp.getDataTableTransaksi('bendaharapenerimaan/get-trial-balance?tglAwal='
					+ tglAwal
					+ '&tglAkhir=' + tglAkhir).then(function (e) {
						if (e.statResponse) {
							for (let i in e.data) {
								e.data[i].debetAwal = parseFloat(e.data[i].debetAwal)
								e.data[i].kreditAwal = parseFloat(e.data[i].kreditAwal)
								e.data[i].debetMutasi = parseFloat(e.data[i].debetMutasi)
								e.data[i].kreditMutasi = parseFloat(e.data[i].kreditMutasi)
								sDebetAkhir = parseFloat(e.data[i].debetAwal) + parseFloat(e.data[i].debetMutasi)
								sKreditAkhir = parseFloat(e.data[i].kreditAwal) + parseFloat(e.data[i].kreditMutasi)
								if (sDebetAkhir > sKreditAkhir) {
									e.data[i].debetAkhir = sDebetAkhir - sKreditAkhir
									e.data[i].kreditAkhir = 0
								} else {
									e.data[i].debetAkhir = 0
									e.data[i].kreditAkhir = sKreditAkhir - sDebetAkhir
								}
							}
							var res = e.data
							for (let i in res) {
								if (res[i].idaccount = 1754) {
									kasPenerimaan = res[i].debetMutasi
									kasPengeluaran = res[i].kreditMutasi
									kasJumlah = kasPenerimaan - kasPengeluaran
									kasSaldoAwal = res[i].debetAwal
									kasSaldoAkhir = res[i].debetAkhir
									break
								}
								if (res[i].idaccount = 1760) {//Bank
									bankPenerimaan = res[i].debetMutasi
									bankPengeluaran = res[i].kreditMutasi
									bankJumlah = bankPenerimaan - bankJumlah
									bankSaldoAwal = res[i].debetAwal
									bankSaldoAkhir = res[i].debetAkhir
									break
								}
							}
							$scope.kas.penerimaan = parseFloat(kasPenerimaan).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.kas.pengeluaran = parseFloat(kasPengeluaran).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.kas.jumlah = parseFloat(kasJumlah).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.kas.saldoAwal = parseFloat(kasSaldoAwal).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.kas.saldoAkhir = parseFloat(kasSaldoAkhir).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

							$scope.bank.penerimaan = parseFloat(bankPenerimaan).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.bank.pengeluaran = parseFloat(bankPengeluaran).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.bank.jumlah = parseFloat(bankJumlah).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.bank.saldoAwal = parseFloat(bankSaldoAwal).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.bank.saldoAkhir = parseFloat(bankSaldoAkhir).toFixed(2)//.replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

						}

					})
			}
			$scope.showPopUpBerita = function () {
				$scope.calculateKasBank($scope.kas.periode)
				$scope.popUpBeritaAca.center().open()
			}
			$scope.batal = function () {
				$scope.popUpBeritaAca.close()
				$scope.popUpLampiran.close()
			}
			$scope.showLampiran = function () {
				$scope.popUpLampiran.center().open()
			}

			$scope.cetakLampiran = function () {
				var data = {
					pecahan100k: $scope.lampiran.seratusK != undefined ? $scope.lampiran.seratusK : 0,
					pecahan50k: $scope.lampiran.limaPuluhK != undefined ? $scope.lampiran.limaPuluhK : 0,
					pecahan20k: $scope.lampiran.duaPuluhK != undefined ? $scope.lampiran.duaPuluhK : 0,
					pecahan10k: $scope.lampiran.sepuluhK != undefined ? $scope.lampiran.sepuluhK : 0,
					pecahan5k: $scope.lampiran.limaK != undefined ? $scope.lampiran.limaK : 0,
					pecahan2k: $scope.lampiran.duaK != undefined ? $scope.lampiran.duaK : 0,
					pecahan1k: $scope.lampiran.satuK != undefined ? $scope.lampiran.satuK : 0,
					pecahan500: $scope.lampiran.limaRatus != undefined ? $scope.lampiran.limaRatus : 0,
					pecahan200: $scope.lampiran.duaRatus != undefined ? $scope.lampiran.duaRatus : 0,
					pecahan100: $scope.lampiran.seratus != undefined ? $scope.lampiran.seratus : 0,
					bribank: $scope.lampiran.briBank != undefined ? $scope.lampiran.briBank : 0,
					depositobank: $scope.lampiran.depositoBank != undefined ? $scope.lampiran.depositoBank : 0,
					terbilangbank: $scope.lampiran.terbilangBank != undefined ? $scope.lampiran.terbilangBank : null,
				}
				var objsave = {
					'tempdata': data
				}
				manageServicePhp.saveDataTransaksi('bendaharapenerimaan/save-lampiran-beritaacara', objsave).then(function (e) {
					var idTemp = e.data.data.idtemplampiran
					if (confirm('View  Lampiran Berita Acara? ')) {
						var stt = 'true';
					} else {
						var stt = 'false'
					}
					// Do nothing!
					var client = new HttpClient();
					client.get('http://127.0.0.1:1237/printvb/kasir?cetak-lampiran-berita-acara-kasbank=' + idTemp
						+ '&view=' + stt
						, function (response) {
						});
				})
			}
			$scope.$watch('lampiran.depositoBank', function (newValue, oldValue) {
				if (newValue != oldValue) {
					if ($scope.lampiran.briBank != undefined)
						$scope.lampiran.totalBank = parseFloat(newValue) + parseFloat($scope.lampiran.briBank)
					else
						$scope.lampiran.totalBank = parseFloat(newValue) + 0
				}
			});
			$scope.getTerbilang = function () {
				var duit =$scope.lampiran.totalBank
				modelItemAkuntansi.getDataGlobal("valet/terbilang/" + duit).then(
					function (data) {
						$scope.lampiran.terbilangBank = data.terbilang;
					})
			
				$scope.lampiran.totalBank = duit// parseFloat(duit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}
			////////////// -TAMAT- ////////////////////

		}
	]);
});