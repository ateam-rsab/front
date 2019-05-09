define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('VerifikasiTerimaCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSarpras', 'ManageGizi', 'ManageLaundry', 'FindSarpras',
		function ($rootScope, $scope, $state, ModelItem, DateHelper, ManageSarpras, ManageGizi, ManageLaundry, FindSarpras) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.awal = $scope.now;
			$scope.item.akhir = $scope.now;
			$scope.title = "Produksi Bahan";
			$scope.titled = "Daftar Produk Formula";
			$scope.isShowPopUp = false;
			$scope.isShowPopUpDetail = false;
			$scope.Rubahdat = false;

			FindSarpras.getSarpras("user/get-user").then(function (dat) {
				$scope.item.yangmenerima = dat.data.data.pegawai.namaLengkap;
				$scope.item.idPetugasLogin = dat.data.data.pegawai.id;
			});
			var init = function () {
				ManageSarpras.getOrderList("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function (dat) {
					$scope.item.ruangan = dat.data.namaRuangan;
				});
			}
			init();

			ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
				$scope.dataMasterPetugas = dat.data;
			});

			$scope.ChangeDate = function () {
				debugger
				$scope.Rubahdat = false;
				$scope.Pencarians = "";
				$scope.Pencarians = undefined;
				$scope.GetLinenBersih();
			}

			$scope.GetLinenBersih = function (Pencarians) {
				debugger
				var getPencarian = Pencarians;
				if (getPencarian == undefined && $scope.Rubahdat == false) {
					debugger
					var tanggalAwal = new moment(new Date($scope.item.awal)).format('YYYY-MM-DD');
					var tanggalAkhir = new moment(new Date($scope.item.akhir)).format('YYYY-MM-DD');
					ManageLaundry.getOrderList("laundry/get-distribusi-linen-bersih-by-ruangan?startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir, true).then(function (dat) {
						$scope.number = 1;
						$scope.sourceVerifikasi = dat.data.data;
						for (var i = 0; i < $scope.sourceVerifikasi.length; i++) {
							$scope.sourceVerifikasi[i].tglPengiriman = new moment(new Date($scope.sourceVerifikasi[i].tglPengiriman)).format('DD-MM-YYYY hh:mm:ss');
							$scope.sourceVerifikasi[i].no = $scope.number++;
							$scope.sourceVerifikasi[i].statCheckbox = false;
							if ($scope.sourceVerifikasi[i].tglterimakiriman != null) {
								$scope.sourceVerifikasi[i].disabledCheck = true;
							} else {
								$scope.sourceVerifikasi[i].disabledCheck = false;
							}

							if ($scope.sourceVerifikasi[i].tglterimakiriman == null) {
								$scope.sourceVerifikasi[i].tglterimakiriman = "Belum diverifikasi"
							} else {
								$scope.sourceVerifikasi[i].tglterimakiriman = new moment(new Date($scope.sourceVerifikasi[i].tglterimakiriman)).format('DD-MM-YYYY hh:mm:ss');
							}
						}
					});
					$scope.Rubahdat = true;
				} else {
					$scope.CariPegawai(getPencarian);
				}
			}
			$scope.GetLinenBersih();

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
								{ field: "nostruk", operator: "contains", value: q },
								{ field: "namaPegawaiPenerima", operator: "contains", value: q }
							]
						}
					});
				}
			}



			$scope.kl = function (current) {
				if (current != undefined) {
					$scope.Petugas = current.Petugas;
					$scope.disabledCheck = current.disabledCheck;
					$scope.tglterimakiriman = current.tglterimakiriman;
					$scope.tglPengiriman = current.tglPengiriman;
					$scope.statCheckbox = current.statCheckbox
					$scope.ruanganPenerima = current.ruanganPenerima
					$scope.nostruk = current.nostruk
					$scope.noRec = current.noRec
					$scope.no = current.no
					$scope.namaPegawaiPenerima = current.namaPegawaiPenerima
					$scope.idRuanganPenerima = current.idRuanganPenerima
					$scope.idPetugas = current.idPetugas
					$scope.idPegawaiPenerima = current.idPegawaiPenerima
				}
			}

			$scope.openWindow = function () {
				debugger
				$scope.numberx = 1;
				if ($scope.noRec != undefined) {
					ManageLaundry.getOrderList("laundry/get-distribusi-linen-bersih-detail?noRec=" + $scope.noRec).then(function (dat) {
						$scope.SourceData = dat.data.data[0]
						$scope.SourceDataDetail = dat.data.data[0].detail;
						$scope.item.tanggalpengiriman = new moment(new Date($scope.SourceData.tglPengiriman)).format('DD-MM-YYYY hh:mm:ss');
						$scope.item.petugas = $scope.SourceData.Petugas;
						for (var i = 0; i < $scope.SourceDataDetail.length; i++) {
							$scope.SourceDataDetail[i].number = $scope.numberx++;
						}
					});
					var myWindow = $("#winPopUpDetail");
					myWindow.data("kendoWindow").open();
					$scope.isShowPopUpDetail = true;
				} else {
					window.messageContainer.error("Pilih Data Terlebih dahulu !!")
				}
			}

			$scope.temCekVerified = [];
			$scope.plhCheck = function (dataItem) {
				var myWindow = $('#winPopUp');
				myWindow.parent().find(".k-window-action").css("visibility", "hidden");
				myWindow.data("kendoWindow").open();
				$scope.isShowPopUp = true;
				var dataSelect = _.find($scope.sourceVerifikasi, function (data) {
					return data.no == dataItem.no;
				});
				if (dataSelect.statCheckbox) {
					dataSelect.statCheckbox = false;
				} else {
					dataSelect.statCheckbox = true;
				}
				var tempData = $scope.sourceVerifikasi;
				for (var i = 0; i < tempData.length; i++) {
					tempData[i].disabledCheck = true;
				}

				$scope.item.nostruk = dataItem.nostruk;
				// $scope.item.yangmenerima = dataItem.namaPegawaiPenerima;
				$scope.noRecStrukPelayanan = dataItem.noRec;
				$scope.nom = dataItem.no;
				refreshGrid($scope.sourceVerifikasi)
				return $scope.item.yangmenerima;
			}


			$scope.cancelData = function () {
				debugger
				var dataSelect = _.find($scope.sourceVerifikasi, function (data) {
					return data.no == $scope.nom;
				});


				if (dataSelect.statCheckbox) {
					dataSelect.statCheckbox = false;
				} else {
					dataSelect.statCheckbox = true;
				}
				for (var i = 0; i < $scope.sourceVerifikasi.length; i++) {
					if ($scope.sourceVerifikasi[i].tglterimakiriman != "Belum diverifikasi") {
						$scope.sourceVerifikasi[i].disabledCheck = true
					} else {
						$scope.sourceVerifikasi[i].disabledCheck = false
					}
				}

				$scope.GetLinenBersih();
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
				refreshGrid($scope.sourceVerifikasi);
			}


			$scope.closeWindow = function () {
				$scope.isShowPopUp = false;
			}


			$scope.cancelDatadetail = function () {
				var myWindow = $("#winPopUpDetail");
				myWindow.data("kendoWindow").close();
			}


			$scope.closeWindowDetail = function () {
				$scope.isShowPopUp = false;
			}

			$scope.Save = function () {
				debugger
				var dataSelect = _.find($scope.sourceVerifikasi, function (data) {
					return data.no == $scope.nom;
				});
				if (dataSelect.disabledCheck) {
					dataSelect.disabledCheck = false;
				} else {
					dataSelect.disabledCheck = true;
				}
				var myWindow = $("#winPopUp");
				myWindow.data("kendoWindow").close();
				refreshGrid($scope.sourceVerifikasi);
				/*toastr.success('Verifikasi Berhasil');*/
				$scope.disabledCheck = false;
				var data = {
					"noRecStrukPelayanan": $scope.noRecStrukPelayanan,
					"noStruk": $scope.item.nostruk,
					"tglTerima": new moment($scope.item.terima).format('YYYY-MM-DD')
				}
				ManageLaundry.saveDataUji(data, "laundry/save-verifikasi-penerimaan-linenbersih").then(function (e) {
					debugger
					$scope.Rubahdat = false;
					$scope.GetLinenBersih();
				});
			}

			function refreshGrid(ds) {
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


			$scope.ClearCari = function () {
				$scope.Pencarians = "";
				var gridData = $("#grid").data("kendoGrid");
				gridData.dataSource.filter({});
			}


			var onDataBound = function () {
				$('td').each(function () {
					if ($(this).text() == "Belum diverifikasi") { $(this).addClass('green') }
				});
			};


			$scope.mainGridOptions = {
				dataBound: onDataBound,
				pageable: true,
				scrollable: false,
				columns: [
					{
						"field": "no",
						"title": "<h3 align=center>No.</h3>",
						"width": "20px"
					},
					{
						"field": "nostruk",
						"title": "<h3 align=center>No Struk</h3>",
						"width": "20px"
					},
					{
						"field": "Petugas",
						"title": "<h3 align=center>Yang Menyerahkan</h3>",
						"width": "20px"
					},
					{
						"field": "namaPegawaiPenerima",
						"title": "<h3 align=center>Yang Menerima</h3>",
						"width": "20px"
					},
					{
						"field": "tglPengiriman",
						"title": "<h3 align=center>Tanggal Pengiriman</h3>",
						"width": "20px"
					},
					{
						"field": "tglterimakiriman",
						"title": "<h3 align=center>Tanggal Terima</h3>",
						"width": "100px"
					},
					{
						title: "<h3 align=center>Verifikasi<h3>",
						template: "# if (statCheckbox) { #" +
							"# if (disabledCheck) { #" +
							"<input type='checkbox' class='checkbox'  ng-click='plhCheck(dataItem)' checked disabled/>" +
							"# } else { #" +
							"<input type='checkbox' class='checkbox'  ng-click='plhCheck(dataItem)' checked/>" +
							"# } #" +
							"# } else { #" +
							"# if (disabledCheck) { #" +
							"<input type='checkbox' class='checkbox'  ng-click='plhCheck(dataItem)' disabled/>" +
							"# } else { #" +
							"<input type='checkbox' class='checkbox'  ng-click='plhCheck(dataItem)'/>" +
							"# } #" +
							"# } #",
						width: "10px"
					}
				],
			};

			$scope.mainGridOptions2 = {
				pageable: true,
				scrollable: false,
				columns: [
					{
						"field": "number",
						"title": "<h3 align=center>No</h3>",
						"width": "20px"
					},
					{
						"field": "namaProduk",
						"title": "<h3 align=center>Nama Linen</h3>",
						"width": "100px"
					},
					{
						"field": "namaExternal",
						"title": "<h3 align=center>Satuan</h3>",
						"width": "100px"
					},
					{
						"field": "qtyproduk",
						"title": "<h3 align=center>Qty<h3>",
						"width": "70px"
					}
				],
			};


			$scope.Batal = function () {
				$state.go('DaftarPasienOrder')
			}


			$scope.goToDaftarPasien = function () {
				$state.go('Dashboard')
			}
		}
	])
})



/*============================================================================SOURCE OLD ====================================================		

ModelItem.get("PerencanaanDanPemasaran/DiagramTows").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});


			FindPasienGizi.getGizi("service/list-generic/?view=JenisWaktu&select=id,jenisWaktu").then(function(dat){
				$scope.SourceJenisWaktu = dat.data;
				debugger;
			})

			$scope.DaftarProduksi=function(){
				var id = $scope.item.jenisWaktu.id;
				var url = "noOrder=" + $state.params.noKirimOrder + "&jenisWaktu=" + id;
				debugger;

				FindPasienGizi.getGizi("order-gizi/get-bahan-order/?" + url).then(function(dat){
					$scope.source= dat.data.data.data;
				// $scope.Stok();
				debugger;
				$scope.sourceDaftarVerifikasi = new kendo.data.DataSource({
    				pageSize: 10,
    				data:$scope.source,
    				schema: {
                            model: {
                                fields: {
                                    "bahanProduk.namaProduk": { editable: false},
                                    standarPorsi: { editable: false},
                                    qty: { editable: false},
                                    stok: { editable: false},
                                    "satuanStandar.satuanStandar": { editable: false},
                                    pesananProduk: { type: "number", validation: { required: true}}
                                }
                            }
                        }
				});
				// debugger;
			});
			}
*/



		// $scope.Stok=function(){
		// 	$scope.source.forEach(function(e){
		// 		var stok = FindPasienGizi.getGizi("stok-produk-global/list-stok?ruanganId=54&produkId="+e.bahanId).then(function(result){
		// 	 		return result.data.data[0];
		// 		});	
		// 		e.stok = stok.qtyProduk;
		// 	})

		// }

// FindPasienGizi.getGizi("order-gizi/get-bahan-order/?noOrder="+$state.params.noKirimOrder+).then(function(dat){
// 	 // var data = []
// 	 // var i = 1
// 	 // dat.data.data.data.forEach(function(e){

// 	 // 	var detail = {
// 	 // 		"bahanId": e.bahanId,
// 	 // 		"bahanProduk": e.bahanProduk,
// 	 // 		"standarPorsi": e.standarPorsi,
// 	 // 		"satuanStandar": e.satuanStandar,
// 	 // 		"pesananProduk": e.pesananProduk,
// 	 // 		"keterangan": e. keterangan,
// 	 // 		"qty" : e.qty,
// 	 // 		"stok": ""

// 	 // 	}
// 	 // 	data[i-1]=detail
// 	 // 	i++;
// 	 // });
// 	$scope.source= dat.data.data.data;
// 	// $scope.Stok();
// 	debugger;
// 	$scope.sourceDaftarPemesananLogistik = new kendo.data.DataSource({
//  				pageSize: 10,
//  				data:$scope.source,
//  				schema: {
//                          model: {
//                              fields: {
//                                  "bahanProduk.namaProduk": { editable: false},
//                                  standarPorsi: { editable: false},
//                                  qty: { editable: false},
//                                  stok: { editable: false},
//                                  "satuanStandar.satuanStandar": { editable: false},
//                                  pesananProduk: { type: "number", validation: { required: true}}
//                              }
//                          }
//                      }
// 	});
// 	// debugger;
// });

			// $scope.columnDaftarPemesananLogistik = [
			// {
			// 	"field": "no",
			// 	"title": "<h3 align=center>No<h3>",
			// 	"width": "50px",
			// 	"attributes": {align:"center"}
			// }, {
			// 	"field": "bahanProduk.namaProduk",
			// 	"title": "<h3 align=center>Nama Bahan</h3>",
			// 	"width": "300px"
			// }, {
			// 	"field": "standarPorsi",
			// 	"title": "<h3 align=center>Standar Porsi<h3>",
			// 	"width": "100px"
			// }, {
			// 	"field": "qty",
			// 	"title": "<h3 align=center>Qty<h3>",
			// 	"width": "100px"
			// }, {
			// 	"field": "satuanStandar.satuanStandar",
			// 	"title": "<h3 align=center>Satuan<h3>",
			// 	"width": "100px"
			// }, {
			// 	"field": "pesananProduk",
			// 	"title": "<h3 align=center>Total<h3>",
			// 	"width": "200px"
			// },{

			// }
			// }];
