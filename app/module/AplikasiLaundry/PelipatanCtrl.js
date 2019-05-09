define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PelipatanCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageLaundry', 'FindLaundry', '$timeout', '$window',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageLaundry, FindLaundry, $timeout, $window) {

			$scope.item = {};
			$scope.now = new Date();
			$scope.item.tglCariAwal = $scope.now;
			$scope.item.tglCariAkhir = $scope.now;
			$scope.dataPost = [];

			$scope.noRecStrukPelayanan = $state.params.noRecStrukPelayanan;
			$scope.namaPelanggan = $state.params.namaPelanggan;
			$scope.ruanganAsalId = $state.params.ruanganAsalId;

			FindLaundry.getLaundry("laundry/get-produk-pelipatan").then(function (dat) {
				$scope.sourceLinen = dat.data.data;
			});
			Proses();

			function Proses() {
				var rec = $scope.noRecStrukPelayanan;
				//	 var period =  moment($scope.item.Periode).format("MM-YYYY");
				ManageLaundry.getOrderList("laundry/get-pengeringan-to-pelipatan?noRecStrukPelayanan=" + rec).then(function (dat) {

					$scope.sourceOrder = new kendo.data.DataSource({
						data: dat.data.data.produkLinens
					});
					debugger;
				});

			}

			FindLaundry.getLaundry("user/get-user").then(function (dat) {
				$scope.item.petugas = dat.data.data.namaUser;
				$scope.item.petugasx = dat.data.data.pegawai.id;
				debugger;
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
					"field": "Linen.namaProduk",
					"title": "Linen",
					"filterable": false
				}, {
					"field": "lipat",
					"title": "Jumlah Lipat",
					"filterable": false
				}, {
					command: {
						text: "Hapus",
						width: "50px",
						align: "center",
						attributes: { align: "center" },
						click: $scope.removeDataPenerimaanLinen
					},
					title: "Action",
					width: "80px"



				}],
				pageable: true,
				sortable: false,
				selectable: "row",
				editable: "popup"
			};

			$scope.removeDataPenerimaanLinen = function (e) {
				e.preventDefault();
				debugger;
				var grid = this;
				var row = $(e.currentTarget).closest("tr");

				$scope.tempDataPenerimaanLinen = $scope.dataPenerimaanLinen
					.filter(function (el) {
						return el.name !== grid[0].name;
					});
				grid.removeRow(row);
			};

			var onChange = function (e) {
				//var inputId = this.element.attr("id");
				//  console.log(inputId);
				var grid = $(this).data("mainGridOptions");

			}


			$scope.addDataPenerimaanLinen = function () {
				// var tgl = DateHelper.getTanggalFormatted($scope.item.tanggal);
				var tempDataPenerimaanLinen = {
					"Linen": $scope.item.Linen,
					"lipat": $scope.item.jumlahLipat

				}

				$scope.dataPenerimaanLinen.add(tempDataPenerimaanLinen);
				$scope.item.Linen = "",
					$scope.item.jumlahLipat = ""


			}




			$scope.mainGridOptions_1_1 = {
				pageable: true,
				scrollable: false,
				shortable: true,
				dataBound: function () {
					var data = this.dataSource.view();
					for (var i = 0; i < data.length; i++) {
						if (data[i].status == "MENUNGGU") {
							var row = this.tbody.find("tr[data-uid='" + data[i].uid + "']");
							/*data[i].set("LastName", true);*/ //if the field is boolean and the column contains a checkbox it will be checked
							row.css("background-color", "red");
							this.expandRow(row).first();
						}
					}
				},
				columns: [
					{
						width: "50px",
						title: "<center><input id='detailSelectAll' type='checkbox' title='Select all' ng-click='selectAllPesananPasien($event)' />",
						template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectPesananPasien($event)' </div>"
					},
					{
						"field": "noCm",
						"title": "No.CM",
						"width": "100px"
					}, {
						"field": "namaPasien",
						"title": "Nama Pasien",
						"width": "300px",
					}, {
						"field": "jenisKelamin",
						"title": "Jenis Kelamin",
						"width": "100px"
					}, {
						"field": "namaKelas",
						"title": "Kelas",
						"width": "100px"
					}, {
						"field": "umur",
						"title": "Umur",
						"width": "150px"
					}, {
						"field": "namaRuangan",
						"title": "Nama Ruangan",
						"width": "200px"
					}, {
						"field": "alergis",
						"title": "Alergi",
						"width": "200px"
					}, {
						"field": "diagnosis",
						"title": "Diagnosis",
						"width": "200px"
					}
				]
			};

			$scope.mainGridOptions_1_2 = function (dataItem) {
				return {
					dataSource: {
						data: $scope.modifikasi,
						pageSize: 5,
						filter: { field: "namaPasien", operator: "eq", value: dataItem.namaPasien }
					},
					pageable: true,
					scrollable: true,
					shortable: true,
					columns: [
						{
							width: "50px",
							title: "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
							template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRow(dataItem)' </div>"
						},
						{
							"field": "namaPasien",
							"title": "Nama Pasien",
							"width": "300px",
							hidden: true
						}, {
							"field": "jenisDiet",
							"title": "Jenis Diet",
							filterable: false,
							"width": "120px"
						}, {
							"field": "namaBentukProduk",
							"title": "Tipe Makanan",
							filterable: false,
							"width": "120px"
						}, {
							"field": "jenisWaktu",
							"title": "Waktu Makan",
							filterable: false,
							"width": "100px"
						}, {
							"field": "namaProduk",
							"title": "Nama Menu Makanan",
							filterable: false,
							"width": "250px"
						}, {
							"field": "jumlah",
							"title": "Jumlah",
							filterable: false,
							"width": "70px"
						}, {
							"field": "dokter",
							"title": "Nama Petugas Pemesan",
							filterable: false,
							"width": "250px"
						}, {
							"field": "flag",
							"title": "Menu",
							filterable: false,
							"width": "100px"
						}, {
							"field": "status",
							"title": "Status",
							filterable: false,
							"width": "120px"
						}
					]
				}
			};

			$scope.mainGridOptions_2_1 = {
				pageable: true,
				scrollable: false,
				shortable: true,
				dataBound: function () {
					var data = this.dataSource.view();
					for (var i = 0; i < data.length; i++) {
						if (data[i].status == "MENUNGGU") {
							var row = this.tbody.find("tr[data-uid='" + data[i].uid + "']");
							/*data[i].set("LastName", true);*/ //if the field is boolean and the column contains a checkbox it will be checked
							row.css("background-color", "red");
							this.expandRow(row).first();
						}
					}
				},
				columns: [
					{
						"field": "namaProduk",
						"title": "Nama Linen",
						"width": "100px"
					}, {
						"field": "jumlah",
						"title": "Jumlah",
						"width": "300px",
					}, {
						"field": "namaSatuan",
						"title": "Satuan",
						"width": "100px"
					}, {
						"field": "jumlah",
						"title": "Jumlah Lipat",
						"width": "100px"
					}, {
						"field": "hargaSatuan",
						"title": "Harga Satuan",
						"width": "100px",
						"template": "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}"
					}, {
						"field": "totalHargaSatuan",
						"title": "Total Harga",
						"width": "150px",
						"template": "{{formatRupiah('#: totalHargaSatuan #', 'Rp.')}}"
					}
				]
			};

			$scope.mainGridOptions_2_2 = function (dataItem) {
				return {
					dataSource: {
						data: $scope.modifikasiMinuman,
						pageSize: 5,
						filter: { field: "namaPasien", operator: "eq", value: dataItem.namaPasien }
					},
					pageable: true,
					scrollable: true,
					shortable: true,
					columns: [
						{
							"field": "namaPasien",
							"title": "Nama Linen",
							"width": "300px",
							hidden: true
						}, {
							"field": "jenisDiet",
							"title": "Jumlah",
							filterable: false,
							"width": "120px"
						}, {
							"field": "namaBentukProduk",
							"title": "Satuan",
							filterable: false,
							"width": "120px"
						}, {
							"field": "jenisWaktu",
							"title": "Harga Satuan",
							filterable: false,
							"width": "100px"
						}, {
							"field": "namaProduk",
							"title": "Total Harga",
							filterable: false,
							"width": "250px"
						}
					]
				}
			};
			$scope.toggleSelectAll = function (ev) {
				var grids = $('#kGrid').data("kendoGrid");
				var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
				var items = grid.dataSource.data();
				items.forEach(function (item) {
					item.selected = ev.target.checked;
					if (item.selected == true) {
						$scope.selectRow(item);
					} else {
						$scope.selectRow(item);
					}

				});
			};


			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}



			$scope.dataOrderMakanan = [];

			$scope.selectRowMakanan = function (dataItem) {
				var dataObj = {
					produkId: dataItem.produkId,
					noRecOrder: dataItem.noRecOrder
				}

				var isExist = _.find($scope.dataOrderMakanan, function (dataExist) {
					if (
						dataExist.produkId == dataObj.produkId &&
						dataExist.noRecOrder == dataObj.noRecOrder) {
						return true;
					} else {
						return undefined;
					}
				});

				if (isExist == undefined) {
					$scope.dataOrderMakanan.push(dataObj);
				}
				else {
					$scope.dataOrderMakanan = _.without($scope.dataOrderMakanan, _.findWhere($scope.dataOrderMakanan, {
						produkId: dataObj.produkId,
						noRecOrder: dataObj.noRecOrder
					}));
				}

			};

			$scope.dataOrderMinuman = [];

			$scope.selectRowMinuman = function (dataItem) {
				var dataObj = {
					produkId: dataItem.produkId,
					noRecOrder: dataItem.noRecOrder
				}

				var isExist = _.find($scope.dataOrderMinuman, function (dataExist) {
					return
					dataExist.produkId == dataObj.produkId;
					dataExist.noRecOrder == dataObj.noRecOrder;
				});

				if (isExist == undefined) {
					$scope.dataOrderMinuman.push(dataObj);
				}
				else {
					$scope.dataOrderMinuman = _.without($scope.dataOrderMinuman, _.findWhere($scope.dataOrderMinuman, {
						produkId: dataObj.produkId,
						noRecOrder: dataObj.noRecOrder
					}));
				}

			};

			$scope.selectRow = function (dataItem) {
				var dataObj = {
					produkId: dataItem.produkId,
					jenisWaktuId: dataItem.jenisWaktuId,
					noRecOrder: dataItem.noRecOrder,
					status: dataItem.status
				}

				var isExist = _.find($scope.dataPost, function (dataExist) {
					if (
						dataExist.produkId == dataObj.produkId &&
						dataExist.jenisWaktuId == dataObj.jenisWaktuId &&
						dataExist.noRecOrder == dataObj.noRecOrder &&
						dataExist.status == dataObj.status) {
						return true;
					} else {
						return undefined;
					}
				});

				if (isExist == undefined) {
					$scope.dataPost.push(dataObj);
				}
				else {
					$scope.dataPost = _.without($scope.dataPost, _.findWhere($scope.dataPost, {
						produkId: dataObj.produkId,
						jenisWaktuId: dataObj.jenisWaktuId,
						noRecOrder: dataObj.noRecOrder,
						status: dataItem.status
					}));
				}


			};

			$scope.selectProduk = function (data) {
				// $scope.produkId = "";
				//    for (var key in data.produkId) {
				//        if (data.produkId.hasOwnProperty(key)) {
				//            var element = data.produkId[key];
				//            if ( element === true) {
				//                $scope.produkId += "," + element.produkId;
				//            }
				//        }
				//    }
				$scope.produkId = data.produkId;
				$scope.kelasId = data.kelasId;
			}






			$scope.navToInfo = function () {
				$state.go('InformasiGizi', {
					produkId: $scope.produkId
				})
			};

			$scope.navToKalori = function () {
				$state.go('Kalori', {
					produkId: $scope.produkId
				})
			};

			$scope.navToKomposisiMakanan = function () {
				$state.go('KomposisiMakanan', {
					produkId: $scope.produkId
				})
			};

			$scope.navToKomposisiMinuman = function () {
				$state.go('KomposisiMinuman', {
					produkId: $scope.produkId
				})
			};

			$scope.navToKomposisiFormula = function () {
				$state.go('KomposisiFormula', {
					produkId: $scope.produkId
				})
			};


			$scope.toggleSelectAllData = function (ev) {
				var data = $scope.kirimMenuMakananNew;
				var dataPasien = $scope.sourceDataKirimMenuMakanan_1._data;
				dataPasien.forEach(function (item) {
					item.selected = ev.target.checked;
				});
				data.forEach(function (item) {
					item.selected = ev.target.checked;
					if (item.selected == true) {
						$scope.selectRowMakanan(item);
					} else {
						$scope.selectRowMakanan(item);
					}
				});
			};


			$scope.mainGridOptions_3_1 = {
				pageable: true,
				scrollable: true,
				sortable: false,
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Starts with"
						}
					}
				},
				columns: [
					{
						width: "50px",
						title: "<center><input id='detailSelectAll' type='checkbox' title='Select all' ng-click='toggleSelectAllData($event)' />",
						template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectDataPasien($event)' </div>"
					},
					{
						"field": "namaPasien",
						"width": "90%",
						"title": "Nama Pasien",
						filterable: false
					}
				]
			};
			$scope.mainGridOptions_3_2 = function (dataItem) {
				return {
					dataSource: {
						data: $scope.kirimMenuMakananNew,
						pageSize: 5,
						filter: { field: "namaPasien", operator: "eq", value: dataItem.namaPasien }
					},
					pageable: true,
					scrollable: true,
					shortable: true,
					filterable: {
						extra: false,
						operators: {
							string: {
								startswith: "Starts with"
							}
						}
					},
					columns: [
						{
							width: "50px",
							title: "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)'  />",
							template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRowMakanan(dataItem)' </div>",
							filterable: false
						},
						{
							"field": "jenisDiet",
							"title": "Tipe Makanan",
							"width": "100px",
							filterable: false
						},
						{
							"field": "namaProduk",
							"title": "Menu Makanan",
							"width": "300px",
							filterable: false
						},
						{
							"field": "jenisWaktu",
							"title": "Waktu Makan",
							"width": "100px",
						},
						{
							"field": "status",
							"title": "Status",
							"width": "100px",
							filterable: false
						}
					]
				}
			};

			$scope.mainGridOptions_4_1 = {
				pageable: true,
				scrollable: true,
				sortable: false,
				filterable: {
					extra: false,
					operators: {
						string: {
							startswith: "Starts with"
						}
					}
				},
				columns: [

					{
						"field": "namaPasien",
						"width": "90%",
						"title": "Nama Pasien",
						filterable: false
					}
				]
			};
			$scope.mainGridOptions_4_2 = function (dataItem) {
				return {
					dataSource: {
						data: $scope.kirimMenuMinumanNew,
						pageSize: 5,
						filter: { field: "namaPasien", operator: "eq", value: dataItem.namaPasien }
					},
					pageable: true,
					scrollable: true,
					shortable: true,
					filterable: {
						extra: false,
						operators: {
							string: {
								startswith: "Starts with"
							}
						}
					},
					columns: [
						{
							width: "50px",
							title: "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
							template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRowMakanan(dataItem)' </div>"
						},
						{
							"field": "jenisDiet",
							"title": "Tipe Makanan",
							"width": "100px",
							filterable: false
						},
						{
							"field": "namaProduk",
							"title": "Menu Makanan",
							"width": "300px",
							filterable: false
						},
						{
							"field": "jenisWaktu",
							"title": "Waktu Makan",
							"width": "100px",
						},
						{
							"field": "status",
							"title": "Status",
							"width": "100px",
							filterable: false
						}
					]
				}
			};
			$scope.listJenisWaktu = [
				{
					jenisWaktu: "Pagi"
				},
				{
					jenisWaktu: "Siang"
				},
				{
					jenisWaktu: "Sore"
				}]
			/*function cityFilter(element) {
					   debugger;
				   element.kendoDropDownList({
					   dataSource: $scope.listJenisWaktu,
					   dataTextField : "jenisWaktu",
					   optionLabel: "--Select Value--"
				   });
			   }*/
			$scope.selectRow2 = function (dataItem) {
				debugger;
				var dataObj = {
					produkId: dataItem.produkId,
					noRecOrder: dataItem.noRecOrder
				}

				var isExist = _.find($scope.dataPost, function (dataExist) {
					return
					dataExist.produkId == dataObj.produkId;
					dataExist.noRecOrder == dataObj.noRecOrder;
				});

				if (isExist == undefined) {
					$scope.dataPost.push(dataObj);
				}
				else {
					$scope.dataPost = _.without($scope.dataPost, _.findWhere($scope.dataPost, {
						produkId: dataObj.produkId,
						noRecOrder: dataObj.noRecOrder
					}));
				}

			};

			$scope.daftarStokGrid = {
				pageable: true,
				columns: [
					{ field: "namaMenu", title: "Nama Menu", width: 300 },
					{ field: "stok", title: "Jumlah Stok", width: 100 }],
				editable: false
			};



			$scope.buttonAktif = function () {
				$scope.getProduk();
				var data = $scope.dataNoRecorder;
				findPasien.saveDataItem(data, "registrasi-pelayanan/save-verifikasi").then(function (dat) {
					$scope.findData();
					$scope.dataPost = [];
					console.log(JSON.stringify(dat.data));
					//debugger;
				});
			};
			$scope.click = function (current) {
				$scope.current = current;
				$scope.item.tglRegistrasi = current.tglRegistrasi;
				$scope.item.noCm = current.noCm;
			};
			$scope.cetakEtiket = function () {
				var tanggalReg = new Date($scope.item.tglRegistrasi);
				var tanggalRegistrasi = DateHelper.getTanggalFormattedNew(tanggalReg);
				if ($scope.item.noCm == undefined) {
					window.messageContainer.error('Pilih data yang ingin di Cetak')
				} else {
					var link = "http://192.168.0.21:8080/jasamedika-web/registrasi-pelayanan/etiketPersetujuanUmum?noCm=" + $scope.item.noCm + "&tglRegistrasi=" + tanggalRegistrasi + "&X-AUTH-TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A"
					window.open(link);
				}
			};



			$scope.Save = function () {
				debugger;
				var dat = $scope.dataPenerimaanLinen._data;;
				var i = 0;
				var mapLinen = [];
				dat.forEach(function (data) {
					var data = {
						"produkDetailId": data.Linen.id,
						"namaProdukDetail": data.Linen.namaProduk,
						"jumlahLipat": data.lipat
					}
					mapLinen[i] = data;
					i++;
				})

				var data1 = {
					"tgl": moment($scope.item.tanggalPengeringan).format("YYYY-MM-DD hh:mm:ss"),
					"tglKerja": moment($scope.item.tanggalKerja).format("YYYY-MM-DD hh:mm:ss"),
					"petugasId": $scope.item.petugasx,
					"namaPetugas": $scope.item.petugas,
					"jumlahCycle": $scope.item.jumlahLipat,
					"noRecStrukPelayanan": $scope.noRecStrukPelayanan,
					"ruanganAsalId": $scope.ruanganAsalId,
					"produkDetails": mapLinen





				}




				debugger;
				//	   ManageLaundry.saveDataUji(data1, "laundry/cek-produk-pelipatan").then(function (enak) {



				//		var yat = enak.data.data.produkDetails;
				//		var i=0;

				//		var mapData = [];
				//		yat.forEach(function(data){
				//			var data ={
				//				
				//				"produk" : data.produk,
				//				"produkDetailLess" : data.produkDetailLess,
				//				"produkGlobalLess" : data.produkGlobalLess

				//			}
				//			$scope.produkDetailLess = false;
				//			$scope.produkGlobalLess= false;
				//			$scope.produk = data.produk;
				//			$scope.produkDetailLessd = data.produkDetailLess;
				//			$scope.produkGlobalLessd = data.produkGlobalLess;
				//			if (($scope.produkDetailLessd == true) || ($scope.produkGlobalLessd == true))  {
				//		    window.messageContainer.error('Tolong Lakukan Pemesanan Produk '+$scope.produk)
				//			$scope.produkDetailLess = true;
				//			$scope.produkGlobalLess = true;
				//			}
				//			mapData[i] =data;

				//			i++;

				//		})

				//		if (($scope.produkDetailLessd == true) || ($scope.produkGlobalLessd == true))  {
				//		    window.messageContainer.error('Tolong Lakukan Pemesanan Produk '+$scope.produk)
				//			$scope.produkDetailLess = true;
				//			$scope.produkGlobalLess = true;
				//			}else{
				//			  ManageLaundry.savePengeringan(data1, "laundry/save-pelipatan").then(function (e) {
				//		 });					

				//			}





				//     });





				ManageLaundry.savePengeringan(data1, "laundry/save-pelipatan").then(function (e) {
					debugger;
					//  $scope.item= {};
					init();
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
				});


			};




			$scope.SaveOK = function () {

				var kat = $scope.sourceOrder._data;
				//console.log(JSON.stringify(dat));
				var i = 0;
				var mapyes = [];
				kat.forEach(function (data) {
					var data = {

						"produkDetailId": data.produkId,
						"namaProdukDetail": data.namaProduk,
						"jumlahLipat": data.jumlah
					}
					mapyes[i] = data;
					i++;
				})

				debugger;
				var data1 = {




					"tgl": moment($scope.item.tanggalPengeringan).format("YYYY-MM-DD hh:mm:ss"),
					"tglKerja": moment($scope.item.tanggalKerja).format("YYYY-MM-DD hh:mm:ss"),
					"petugasId": $scope.item.petugasx,
					"namaPetugas": $scope.item.petugas,
					"jumlahCycle": $scope.item.jumlahLipat,
					"noRecStrukPelayanan": $scope.noRecStrukPelayanan,
					"ruanganAsalId": $scope.ruanganAsalId,
					"produkDetails": mapyes




				}



				ManageLaundry.saveSarpras(data1, "laundry/save-pelipatan").then(function (e) {
				});











				//       ManageLaundry.savePengeringan(data1,"laundry/save-pelipatan").then(function (e) {
				//			 debugger;
				//  $scope.item= {};
				//            init();  
				/*$state.go('dashboardpasien.TandaVital', {
				 noCM: $scope.noCM
				 });*/
				//        });


			};





















		}
	])
})