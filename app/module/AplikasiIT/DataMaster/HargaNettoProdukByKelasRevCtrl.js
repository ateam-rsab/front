define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('HargaNettoProdukByKelasRevCtrl', ['$q', '$rootScope', '$state', '$scope', 'IPSRSService', 'ModelItemAkuntansi', 'CacheHelper', 'ManageAkuntansi',
		function ($q, $rootScope, $state, $scope, IPSRSService, modelItemAkuntansi, cacheHelper, ManageAkuntansi) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var idSeterusnya = 0;
			$scope.isRouteLoading = false;
			var loginITI = true
			var init = function () {
				var datauserlogin = JSON.parse(window.localStorage.getItem("datauserlogin"));
				modelItemAkuntansi.getDataTableTransaksi("pegawai/get-kelompok-user?luId=" + datauserlogin.id, true).then(function (e) {
					if (e.data.id != 47)/* KEl USER ITI*/ {
						loginITI = false
					}

				})
				// IPSRSService.getFieldsMasterTable("get-data-master?className=HargaNettoProdukByKelas", true).then(function(dat){
				// 	$scope.listDataMaster = dat.data.data.HargaNettoProdukByKelas;

				// 	$scope.dataSource = new kendo.data.DataSource({
				// 		pageSize: 10,
				// 		data: $scope.listDataMaster,
				// 		autoSync: true 

				// 	});


				// });

				$scope.isRouteLoading = true;
				IPSRSService.getFieldListData("Kelas&select=id,namaKelas", true).then(function (dat) {
					$scope.listkelas = dat.data;
				});
				modelItemAkuntansi.getDataTableMaster("tarif/harganettoprodukbykelas", true).then(function (dat) {
					var no = 0;
					for (var i = 0; i < dat.length; i++) {
						no = no + 1;
						dat[i].no = no;
					}
					$scope.isRouteLoading = false;

					$scope.listDataMaster = dat//.data.data.HargaNettoProdukByKelas;
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true


					});

				});
			}
			init();



			$scope.mainGridOptions = {
				pageable: true,
				columns: $scope.gridColumn,
				editable: "popup",
				selectable: "row",
				scrollable: false,
				toolbar: ["excel"],
				excel: {
					allPages: true
				},
				columns: [
					{
						"field": "no",
						"title": "No",
						"width": "20px"
					},
					{
						"field": "objectprodukfk",
						"title": "Id Produk",
						"width": "30px"
					},
					{
						"field": "namaproduk",
						"title": "Nama Produk",
						"width": "240px"
					},
					{
						"field": "asalproduk",
						"title": "Asal Produk",
						"width": "200px"
					},
					{
						"field": "jenistarif",
						"title": "Jenis Tarif",
						"width": "120px"
					},
					{
						"field": "namakelas",
						"title": "Nama Kelas",
						"width": "100px"
					},
					{
						"field": "matauang",
						"title": "Mata Uang",
						"width": "60px"
					},
					{
						"field": "statusenabled",
						"title": "Status Enabled",
						"width": "20px"
					},
					{
						"field": "hargasatuan",
						"title": "Harga Satuan",
						"width": "100px",
						"template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #','')}}</span>",

					},
					// {
					// 	"field": "harganetto1",
					// 	"title": "harganetto1",
					// 	"width": "20px"
					// },
					// {
					// 	"field": "harganetto2",
					// 	"title": "harganetto2",
					// 	"width": "20px"
					// },
					// {
					// 	"field": "hargadiscount",
					// 	"title": "hargadiscount",
					// 	"width": "20px"
					// },
					// {
					// 	"field": "persendiscount",
					// 	"title": "persendiscount",
					// 	"width": "20px"
					// },
					// {
					// 	"field": "factorrate",
					// 	"title": "factorrate",
					// 	"width": "20px"
					// },
					// {
					// 	"field": "qtycurrentstok",
					// 	"title": "qtycurrentstok",
					// 	"width": "20px"
					// },
					// {
					// 	"field": "tglberlakuakhir",
					// 	"title": "tglberlakuakhir",
					// 	"width": "20px"
					// },
					// {
					// 	"field": "tglberlakuawal",
					// 	"title": "tglberlakuawal",
					// 	"width": "20px"
					// },
					// {
					// 	"field": "tglkadaluarsalast",
					// 	"title": "tglkadaluarsalast",
					// 	"width": "20px"
					// },
					{
						"command": [{
							text: "Hapus",
							click: hapusData,
							imageClass: "k-icon k-delete"
						}],
						title: "",
						width: "100px",
					}

				]
			};


			function hapusData(e) {
				if (loginITI ==false){
					toastr.error('Tidak Bisa Menghapus Data','Info')
					return
				}
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (!dataItem) {
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				var itemDelete = {
					"id": dataItem.id
				}

				ManageAkuntansi.hapusHargaNettoProdukByKelas(itemDelete).then(function (e) {
					if (e.status === 201) {
						init();

						grid.removeRow(row);
					}
				})

			}

			// $scope.Select=function(data)
			// {
			// 	console.log(JSON.stringify(data));
			// 	$scope.item.asalProduk= {id:data.objectasalprodukfk,asalProduk:data.asalproduk};
			// };
			////fungsi klik untuk edit


			$scope.klik = function (current) {
				idSeterusnya = current.id;
				// $scope.showEdit = true;
				// $scope.current = current;
				// $scope.item.factorRate = current.factorrate;
				// $scope.item.hargaDiscount = current.hargadiscount;
				// $scope.item.hargaNetto1 = current.harganetto1;
				// $scope.item.hargaNetto2 = current.harganetto2;
				// $scope.item.hargaSatuan = current.hargasatuan;
				// $scope.item.asalProduk ={id:current.objectasalprodukfk,asalProduk:current.asalproduk};// $asalP;
				// //$scope.item.asalProdukId = current.objectasalprodukfk;
				// $scope.item.jenisTarif ={id:current.objectjenistariffk,jenisTarif:current.jenistarif};//  current.jenistarif;
				// //$scope.item.jenisTarifId = current.objectjenistariffk;
				// $scope.item.kelas ={id: current.objectkelasfk ,namaKelas:current.namakelas};// current.kelas;
				// //$scope.item.kelasId = current.objectkelasfk;
				// $scope.item.mataUang = {id: current.objectmatauangfk ,mataUang:current.matauang};//current.matauang;
				// //$scope.item.mataUangId = current.objectmatauangfk;
				// $scope.item.produk = {id: current.objectprodukfk ,namaProduk:current.namaproduk};//current.produk;
				// //$scope.item.produkId = current.objectprodukfk;
				// $scope.item.persenDiscount = current.persendiscount;
				// $scope.item.qtyCurrentStok = current.qtycurrentstok;
				// $scope.item.tglBerlakuAkhir = current.tglberlakuakhir;
				// $scope.item.tglBerlakuAwal = current.tglberlakuawal;
				// $scope.item.tglKadaluarsaLast = current.tglkadaluarsalast;
				// $scope.item.id = current.id;
				// $scope.item.noRec = current.norec;
				// $scope.item.reportDisplay = current.reportdisplay;
				// $scope.item.kodeExternal = current.kodeexternal;
				// $scope.item.namaExternal = current.namaexternal;
				// $scope.item.statusEnabled = current.statusenabled;
			};
			$scope.disableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=HargaNettoProdukByKelas&&id=" + $scope.item.id + "&&statusEnabled=false").then(function (dat) {
					//init();
					Carii();
				});
			};
			$scope.enableData = function () {
				IPSRSService.getClassMaster("delete-master-table?className=HargaNettoProdukByKelas&&id=" + $scope.item.id + "&&statusEnabled=true").then(function (dat) {
					//init();
					Carii();
				});
			};

			function HakEditHapus (){
			
			}
			$scope.edit = function () {
				if (loginITI ==false){
					toastr.error('Tidak Bisa Merubah Data','Info')
					return
				}
				cacheHelper.set('HargaNettoProdukByKelasEditRev', idSeterusnya);
				$state.go('HargaNettoProdukByKelasEditRev')
			}
			$scope.tambah = function () {
				if (loginITI ==false){
					toastr.error('Tidak Bisa Menambah Data','Info')
					return
				}
				cacheHelper.set('HargaNettoProdukByKelasEditRev', 'fsdjhfkjdshfusfhsdfhsk');
				$state.go('HargaNettoProdukByKelasEditRev')
			}

			//// save 
			// $scope.tambah = function()
			// {
			// 	var data = {
			// 		"class": "HargaNettoProdukByKelas",
			// 		"listField": {
			// 			"factorRate": $scope.item.factorRate,
			// 			"hargaDiscount": $scope.item.hargaDiscount,
			// 			"hargaNetto1": $scope.item.hargaNetto1,
			// 			"hargaNetto2": $scope.item.hargaNetto2,
			// 			"hargaSatuan": $scope.item.hargaSatuan,
			// 			"asalProduk": $scope.item.asalProduk,
			// 			"asalProdukId": $scope.item.asalProdukId,
			// 			"jenisTarif": $scope.item.jenisTarif,
			// 			"jenisTarifId": $scope.item.jenisTarifId,
			// 			"kelas": $scope.item.kelas,
			// 			"kelasId": $scope.item.kelasId,
			// 			"mataUang": $scope.item.mataUang,
			// 			"mataUangId": $scope.item.mataUangId,
			// 			"produk": $scope.item.produk,
			// 			"produkId": $scope.item.produkId,
			// 			"persenDiscount": $scope.item.persenDiscount,
			// 			"qtyCurrentStok": $scope.item.qtyCurrentStok,
			// 			"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
			// 			"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
			// 			"tglKadaluarsaLast": $scope.item.tglKadaluarsaLast,
			// 			"id": $scope.item.id,
			// 			"reportDisplay": $scope.item.reportDisplay,
			// 			"kodeExternal": $scope.item.kodeExternal,
			// 			"namaExternal": $scope.item.namaExternal,
			// 		}
			// 	}
			// 	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
			// 		console.log(JSON.stringify(e.data));
			// 		init();
			// 		$scope.item = {};
			// 	});
			// }
			////edit
			// $scope.edit = function()
			// {	
			// 	var data = {
			// 		"class": "HargaNettoProdukByKelas",
			// 		"listField": {
			// 			"factorRate": $scope.item.factorRate,
			// 			"hargaDiscount": $scope.item.hargaDiscount,
			// 			"hargaNetto1": $scope.item.hargaNetto1,
			// 			"hargaNetto2": $scope.item.hargaNetto2,
			// 			"hargaSatuan": $scope.item.hargaSatuan,
			// 			"asalProduk": $scope.item.asalProduk,
			// 			"asalProdukId": $scope.item.asalProdukId,
			// 			"jenisTarif": $scope.item.jenisTarif,
			// 			"jenisTarifId": $scope.item.jenisTarifId,
			// 			"kelas": $scope.item.kelas,
			// 			"kelasId": $scope.item.kelasId,
			// 			"mataUang": $scope.item.mataUang,
			// 			"mataUangId": $scope.item.mataUangId,
			// 			"produk": $scope.item.produk,
			// 			"produkId": $scope.item.produkId,
			// 			"persenDiscount": $scope.item.persenDiscount,
			// 			"qtyCurrentStok": $scope.item.qtyCurrentStok,
			// 			"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
			// 			"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
			// 			"tglKadaluarsaLast": $scope.item.tglKadaluarsaLast,
			// 			"id": $scope.item.id,
			// 			"noRec": $scope.item.noRec,
			// 			"reportDisplay": $scope.item.reportDisplay,
			// 			"kodeExternal": $scope.item.kodeExternal,
			// 			"namaExternal": $scope.item.namaExternal,
			// 			"statusEnabled": $scope.item.statusEnabled
			// 		}
			// 	}
			// 	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
			// 		init();
			// 	});
			// }
			// $scope.batal = function () {
			// 	$scope.showEdit = false;
			// 	$scope.item = {};
			// }
			$scope.CariProduk = function () {
				Carii();
			}
			$scope.CariKodeProduk = function () {
				Carii();
			}
			$scope.CariProdukCombo = function () {
				debugger;
				var nmP = "";
				if ($scope.item.produk != undefined) {
					nmP = 'namaproduk=' + $scope.item.produk.namaProduk;
				}
				modelItemAkuntansi.getDataTableMaster("tarif/getProduk?" + nmP).then(function (dat) {
					$scope.listproduk = dat;
				});
			}
			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
			}
			$scope.Cari = function () {
				Carii();
			}

			function Carii() {
				$scope.isRouteLoading = true;
				var nmP = "";
				if ($scope.item.cariProduk != undefined) {
					nmP = 'namaproduk=' + $scope.item.cariProduk;
				}
				var nmkP = "";
				if ($scope.item.kodeProduk != undefined) {
					nmkP = '&objectprodukfk=' + $scope.item.kodeProduk;
				}
				var idKelas = "";
				if ($scope.item.kelas != undefined) {
					idKelas = '&objectkelasfk=' + $scope.item.kelas.id;
				}
				modelItemAkuntansi.getDataTableMaster("tarif/harganettoprodukbykelas?" + nmP + nmkP + idKelas, true).then(function (dat) {
					var no = 0;
					for (var i = 0; i < dat.length; i++) {
						no = no + 1;
						dat[i].no = no;
					}
					$scope.isRouteLoading = false;
					$scope.listDataMaster = dat//.data.data.HargaNettoProdukByKelas;
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}

			// IPSRSService.getFieldListData("AsalProduk&select=id,asalProduk", true).then(function(dat){
			// 	$scope.listasalproduk= dat.data;
			// });
			// IPSRSService.getFieldListData("JenisTarif&select=id,jenisTarif", true).then(function(dat){
			// 	$scope.listjenistarif= dat.data;
			// });
			// IPSRSService.getFieldListData("Kelas&select=id,namaKelas", true).then(function(dat){
			// 	$scope.listkelas= dat.data;
			// });
			// IPSRSService.getFieldListData("MataUang&select=id,mataUang", true).then(function(dat){
			// 	$scope.listmatauang= dat.data;
			// });
			// IPSRSService.getFieldListData("Produk&select=id,namaProduk", true).then(function(dat){
			// 	$scope.listproduk= dat.data;
			// });
			// modelItemAkuntansi.getDataTableMaster("tarif/getProduk", true).then(function(dat){
			// 	$scope.listproduk= dat;
			// });
		}
	]);
});

