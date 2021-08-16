define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('HargaNettoProdukByKelasEditRevCtrl', ['$q', '$rootScope', '$state', '$scope', 'IPSRSService', 'ModelItem', 'ModelItemAkuntansi', 'CacheHelper', 'ManageKasir', 'DateHelper',
		function ($q, $rootScope, $state, $scope, IPSRSService, ModelItem, modelItemAkuntansi, cacheHelper, manageKasir, dateHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var Idsakarepmu = '';
			var idDetail = '';
			$scope.isRouteLoading = false;

			$scope.item.tglBerlakuAwal = $scope.now;
			$scope.item.tglKadaluarsaLast = $scope.now;
			$scope.item.tglBerlakuAkhir = $scope.now;

			var data2 = [];
			$scope.item.persenDiscount = 0;
			$scope.item.hargaDiscount = 0;
			$scope.item.hargaSatuan = 0;
			$scope.item.factorRate = 0;
			$scope.item.qtyCurrentStok = 1;
			$scope.item.factorRate2 = 0;
			$scope.item.hargaDiscount2 = 0;
			$scope.item.persenDiscount2 = 0;
			$scope.item.hargaNetto22 = 0;
			$scope.item.hargaNetto12 = 0;
			$scope.item.hargaNetto2 = 0;
			$scope.item.hargaNetto1 = 0;

			var chacePeriode = cacheHelper.get('HargaNettoProdukByKelasEditRev');
			if (chacePeriode != undefined) {
				var objectprodukfkS = 0;
				var objectkelasfkS = 0;
				var objectasalprodukfkS = 0;
				var objectjenistariffkS = 0;
				var objectmatauangfkS = 0;
				//var arrPeriode = chacePeriode.split('~');
				Idsakarepmu = chacePeriode;//arrPeriode(0);
				if (Idsakarepmu != 'fsdjhfkjdshfusfhsdfhsk') {
					$scope.produkInput = false;
					$scope.produkCombo = true;
					LoadData();


				} else {
					$scope.produkInput = false;
					$scope.produkCombo = true;

					// IPSRSService.getFieldListData("Produk&select=id,namaProduk", true,true,10).then(function(dat){
					// 	$scope.listproduk= dat.data;
					// });
					// ModelItem.getDataDummyGeneric("tarif/get-produk-combo", true, true, 10).then(function(data) {
					//                 $scope.listproduk= data;
					//             });
					modelItemAkuntansi.getDataDummyPHP("pasien/get-produk-combos", true, true, 10).then(function (data) {
						$scope.listproduk = data;

					});
				}
			}

			function LoadData() {
				$scope.isRouteLoading = true;
				modelItemAkuntansi.getDataTableMaster("tarif/harganettoprodukbykelas?id=" + Idsakarepmu, true).then(function (dat) {
					$scope.disabledProduk = true;
					$scope.disabledJenisTarif = true;
					$scope.disabledAsalProduk = true;
					$scope.disabledKelas = true;
					$scope.disabledMataUang = true;


					$scope.item.factorRate = dat[0].factorrate;
					$scope.item.hargaDiscount = dat[0].hargadiscount;
					$scope.item.hargaNetto1 = dat[0].harganetto1;
					$scope.item.hargaNetto2 = dat[0].harganetto2;
					$scope.item.hargaSatuan = dat[0].hargasatuan;
					$scope.item.asalProduk = { id: dat[0].objectasalprodukfk, asalProduk: dat[0].asalproduk };
					$scope.item.jenisTarif = { id: dat[0].objectjenistariffk, jenisTarif: dat[0].jenistarif };;
					$scope.item.kelas = { id: dat[0].objectkelasfk, namaKelas: dat[0].namakelas };
					$scope.item.mataUang = { id: dat[0].objectmatauangfk, mataUang: dat[0].matauang };
					//$scope.item.produk = {id: dat[0].objectprodukfk ,namaProduk:dat[0].namaproduk};
					$scope.item.produkNama = dat[0].namaproduk;
					$scope.item.produk = { id: dat[0].objectprodukfk, namaProduk: dat[0].namaproduk };

					$scope.item.persenDiscount = dat[0].persendiscount;
					$scope.item.qtyCurrentStok = dat[0].qtycurrentstok;
					$scope.item.tglBerlakuAkhir = dat[0].tglberlakuakhir;
					$scope.item.tglBerlakuAwal = dat[0].tglberlakuawal;
					$scope.item.tglKadaluarsaLast = dat[0].tglkadaluarsalast;
					$scope.item.id = dat[0].id;
					$scope.item.noRec = dat[0].norec;
					$scope.item.reportDisplay = dat[0].reportdisplay;
					$scope.item.kodeExternal = dat[0].kodeexternal;
					$scope.item.namaExternal = dat[0].namaexternal;
					$scope.item.statusEnabled = dat[0].statusenabled;
					objectprodukfkS = dat[0].objectprodukfk;
					objectkelasfkS = dat[0].objectkelasfk;
					objectasalprodukfkS = dat[0].objectasalprodukfk;
					objectjenistariffkS = dat[0].objectjenistariffk;
					objectmatauangfkS = dat[0].objectmatauangfk;

					$scope.item.id_hn_m = dat[0].id_hn_m;

					modelItemAkuntansi.getDataTableMaster("tarif/harganettoprodukbykelas_d?" +
						"objectprodukfk=" + objectprodukfkS +
						"&objectkelasfk=" + objectkelasfkS +
						"&objectasalprodukfk=" + objectasalprodukfkS +
						"&objectjenistariffk=" + objectjenistariffkS +
						"&objectmatauangfk=" + objectmatauangfkS
						, true).then(function (dat1) {
							for (var i = 0; i < dat1.length; i++) {
								dat1[i].no = i + 1
								dat1[i].total = dat1[i].hargasatuan
							}
							$scope.isRouteLoading = false;
							$scope.dataKomponen = dat1;
							data2 = dat1;



							var subTotal = 0;

							for (var i = data2.length - 1; i >= 0; i--) {
								subTotal = subTotal + parseFloat(data2[i].hargasatuan)
							}
							// $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.item.hargaNetto1 = subTotal;
							$scope.item.hargaNetto2 = subTotal;
							$scope.item.hargaSatuan = subTotal;
						});
				});


			}


			IPSRSService.getFieldListData("AsalProduk&select=id,asalProduk", true).then(function (dat) {
				$scope.listasalproduk = dat.data;
				$scope.item.asalProduk = { id: dat.data[0].id, asalProduk: dat.data[0].asalProduk }

			});
			IPSRSService.getFieldListData("JenisTarif&select=id,jenisTarif", true).then(function (dat) {
				$scope.listjenistarif = dat.data;
				$scope.item.jenisTarif = { id: dat.data[3].id, jenisTarif: dat.data[3].jenisTarif }
			});
			IPSRSService.getFieldListData("Kelas&select=id,namaKelas", true).then(function (dat) {
				$scope.listkelas = dat.data;
			});
			IPSRSService.getFieldListData("MataUang&select=id,mataUang", true).then(function (dat) {
				$scope.listmatauang = dat.data;
				$scope.item.mataUang = { id: dat.data[0].id, mataUang: dat.data[0].mataUang }
			});

			modelItemAkuntansi.getDataTableMaster("tarif/list-master?jenis=komponenharga", true).then(function (dat) {
				$scope.listKomponen = dat;
			});
			// ModelItem.getDataDummyGeneric("Produk", true, true, 10).then(function(data) {
			//                      $scope.listproduk= data;
			//     });
			modelItemAkuntansi.getDataDummyPHP("pasien/get-produk-combos", true, true, 10).then(function (data) {
				$scope.listproduk = data;
			});
			$scope.batal = function () {
				$state.go('HargaNettoProdukByKelasRev')
			}

			$scope.save = function () {
				// if (Idsakarepmu == '') {
				// 	alert("Ada kesalahan loading data!!");
				// }else{
				// 	if (Idsakarepmu == 'fsdjhfkjdshfusfhsdfhsk') {
				SimpanHead()//alert("under construction!!");
				// 	}else{
				// 		Simpan('update');
				// 		kosongKan();
				// 	}
				// }
			}
			$scope.tambah = function () {
				if ($scope.item.komponen == undefined) {
					alert("Komponen Harga harus di isi!")
					return;
				}
				if ($scope.item.hargaNetto12 == 0) {
					alert("Harga Netto 1 tidak boleh nol!")
					return;
				}
				if ($scope.item.hargaNetto22 == 0) {
					alert("Harga Netto 2 tidak boleh nol!")
					return;
				}
				if ($scope.item.hargaSatuan2 == 0) {
					alert("Harga Satuan tidak boleh nol!")
					return;
				}


				var nomor = 0
				if ($scope.dataKomponen == undefined) {
					nomor = 1
				} else {
					nomor = data2.length + 1
				}
				var data = {};
				var id_hn_d = '';



				if ($scope.item.no != undefined) {
					for (var i = data2.length - 1; i >= 0; i--) {
						if (data2[i].no == $scope.item.no) {

							data.id_hn_d = data2[i].id_hn_d
							data.no = $scope.item.no
							data.komponenharga = $scope.item.komponen.komponenharga
							data.objectkomponenhargafk = $scope.item.komponen.id
							data.factorrate = String($scope.item.factorRate2)
							data.hargadiscount = String($scope.item.hargaDiscount2)
							data.harganetto1 = String($scope.item.hargaNetto12)
							data.harganetto2 = String($scope.item.hargaNetto22)
							data.hargasatuan = String($scope.item.hargaSatuan2)
							data.persendiscount = String($scope.item.persenDiscount2)
							data.total = $scope.item.hargaSatuan2

							data2[i] = data;
							$scope.dataKomponen = new kendo.data.DataSource({
								data: data2
							});
							var subTotal = 0;
							for (var i = data2.length - 1; i >= 0; i--) {
								subTotal = subTotal + parseFloat(data2[i].hargasatuan)
							}
							// $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.item.hargaNetto1 = subTotal
							$scope.item.hargaNetto2 = subTotal
							$scope.item.hargaSatuan = subTotal
						}
						// break;
					}

				} else {
					data = {
						no: nomor,
						id_hn_d: id_hn_d,
						// noregistrasifk:norec_apd,//$scope.item.noRegistrasi,                  
						komponenharga: $scope.item.komponen.komponenharga,
						objectkomponenhargafk: $scope.item.komponen.id,
						factorrate: String($scope.item.factorRate2),
						hargadiscount: String($scope.item.hargaDiscount2),
						harganetto1: String($scope.item.hargaNetto12),
						harganetto2: String($scope.item.hargaNetto22),
						hargasatuan: String($scope.item.hargaSatuan2),
						persendiscount: String($scope.item.persenDiscount2),
						total: $scope.item.hargaSatuan2,

					}
					data2.push(data)
					// $scope.dataGrid.add($scope.dataSelected)
					$scope.dataKomponen = new kendo.data.DataSource({
						data: data2
					});
					var subTotal = 0;
					for (var i = data2.length - 1; i >= 0; i--) {
						subTotal = subTotal + parseFloat(data2[i].total)
					}
					$scope.item.hargaNetto1 = subTotal
					$scope.item.hargaNetto2 = subTotal
					$scope.item.hargaSatuan = subTotal
					// $scope.item.hargaSatuan=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
					//  $scope.item.hargaNetto2=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
					//   $scope.item.hargaNetto1=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
				}
				// if ($scope.item.jenisKemasan.jeniskemasan != 'Racikan') {
				//     $scope.item.rke = parseFloat($scope.item.rke) + 1
				// }
				// 26  0   t       jasa produksi non steril
				// 27  0   t       jasa pelayanan TPN
				// 28  0   t       jasa pelayanan handling cytotoxic
				// 29  0   t       jasa pelayanan IV Admixture
				// 30  0   t       jasa pelayanan Repacking obat injeksi
				// strStatus= $scope.item.produk.id

				Kosongkan()

			}

			$scope.hapus = function () {
				if ($scope.item.hargaSatuan == 0) {
					alert("Harga Satuan harus di isi!")
					return;
				}

				if ($scope.item.komponen == undefined) {
					alert("Pilih Komponen Harga terlebih dahulu!!")
					return;
				}

				// var nomor =0
				// if ($scope.dataGrid == undefined) {
				//     nomor = 1
				// }else{
				//     nomor = data2.length+1
				// }
				var data = {};
				if ($scope.item.no != undefined) {
					for (var i = data2.length - 1; i >= 0; i--) {
						if (data2[i].no == $scope.item.no) {

							//data2[i] = data;
							// delete data2[i]
							data2.splice(i, 1);

							var subTotal = 0;
							for (var i = data2.length - 1; i >= 0; i--) {
								subTotal = subTotal + parseFloat(data2[i].hargasatuan)
								data2[i].no = i + 1
							}
							// data2.length = data2.length -1
							$scope.dataKomponen = new kendo.data.DataSource({
								data: data2
							});
							// for (var i = data2.length - 1; i >= 0; i--) {
							//     subTotal=subTotal+ parseFloat(data2[i].total)
							// }
							// $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
							$scope.item.hargaSatuan = subTotal
							$scope.item.harganetto1 = subTotal
							$scope.item.harganetto2 = subTotal
						}
						// break;
					}

				}
				Kosongkan()
			}
			$scope.formatRupiah = function (value, currency) {
				return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}
			function Kosongkan() {
				$scope.item.no = undefined
				$scope.item.komponen = ''
				$scope.item.factorRate2 = 0
				$scope.item.hargaDiscount2 = 0
				$scope.item.hargaNetto12 = 0
				$scope.item.hargaNetto22 = 0
				$scope.item.hargaSatuan2 = 0
				$scope.item.persenDiscount2 = 0

			}
			$scope.saveHead = function () {
				if (Idsakarepmu == 'fsdjhfkjdshfusfhsdfhsk') {

				} else {
					alert("Ada kesalahan loading data!!");
				}
			}

			$scope.delete = function () {
				if (Idsakarepmu == '') {
					alert("Ada kesalahan loading data!!");
				} else {
					if (Idsakarepmu == 'fsdjhfkjdshfusfhsdfhsk') {
						alert("Fitur tambah tidak bisa hapus");
					} else {
						if (idDetail == '') {
							alert("Pilih komponen yg akan di hapus!!");
						} else {
							Simpan('delete');
							kosongKan();
						}
					}
				}
			}
			$scope.cancel = function () {
				kosongKan();
			}

			function kosongKan() {
				idDetail = '';
				$scope.item.komponen = $scope.listKomponen[0];
				$scope.item.factorRate2 = '';
				$scope.item.hargaDiscount2 = '';
				$scope.item.hargaNetto12 = '';
				$scope.item.hargaNetto22 = '';
				$scope.item.hargaSatuan2 = '';
				$scope.item.persenDiscount2 = '';
			}
			function SimpanHead() {
				var validasi = true;
				// if (Idsakarepmu != 'fsdjhfkjdshfusfhsdfhsk') {
				// 	var validasi = false;
				// }
				if (validasi == true) {

					var objectprodukfkS = "";
					if ($scope.item.produk != undefined) { objectprodukfkS = $scope.item.produk.id }
					else {
						alert("Produk Harus di pilih!")
						return
					};

					var STR_asalProduk = "";
					if ($scope.item.asalProduk != undefined) { STR_asalProduk = $scope.item.asalProduk.id };
					var STR_jenisTarif = "";
					if ($scope.item.jenisTarif != undefined) { STR_jenisTarif = $scope.item.jenisTarif.id };
					var STR_kelas = "";
					if ($scope.item.kelas != undefined) { STR_kelas = $scope.item.kelas.id };

					var STR_mataUang = "";
					if ($scope.item.mataUang != undefined) { STR_mataUang = $scope.item.mataUang.id };
					var STR_persenDiscount = "";
					if ($scope.item.persenDiscount != undefined) { STR_persenDiscount = $scope.item.persenDiscount };
					var STR_factorRate = "";
					if ($scope.item.factorRate != undefined) { STR_factorRate = $scope.item.factorRate };
					var STR_qtyCurrentStok = "";
					if ($scope.item.qtyCurrentStok != undefined) { STR_qtyCurrentStok = $scope.item.qtyCurrentStok };
					var STR_tglBerlakuAkhir = "";
					if ($scope.item.tglBerlakuAkhir != undefined) { STR_tglBerlakuAkhir = dateHelper.formatDate($scope.item.tglBerlakuAkhir, "YYYY-MM-DD") };//
					var STR_tglBerlakuAwal = "";
					if ($scope.item.tglBerlakuAwal != undefined) { STR_tglBerlakuAwal = dateHelper.formatDate($scope.item.tglBerlakuAwal, "YYYY-MM-DD") };//$scope.item.tglBerlakuAwal};
					var STR_tglKadaluarsaLast = "";
					if ($scope.item.tglKadaluarsaLast != undefined) { STR_tglKadaluarsaLast = dateHelper.formatDate($scope.item.tglKadaluarsaLast, "YYYY-MM-DD") };//$scope.item.tglKadaluarsaLast};
					var STR_reportDisplay = "";
					if ($scope.item.reportDisplay != undefined) { STR_reportDisplay = $scope.item.reportDisplay };
					var STR_kodeExternal = "";
					if ($scope.item.kodeExternal != undefined) { STR_kodeExternal = $scope.item.kodeExternal };
					var STR_namaExternal = "";
					if ($scope.item.namaExternal != undefined) { STR_namaExternal = $scope.item.namaExternal };

					var STR_hargaSatuan = "";
					if ($scope.item.hargaSatuan != undefined) { STR_hargaSatuan = $scope.item.hargaSatuan };
					var STR_hargaNetto1 = "";
					if ($scope.item.hargaNetto1 != undefined) { STR_hargaNetto1 = $scope.item.hargaNetto1 };

					var STR_hargaNetto2 = "";
					if ($scope.item.hargaNetto2 != undefined) { STR_hargaNetto2 = $scope.item.hargaNetto2 };

					var STR_hargaDiscount = "";
					if ($scope.item.hargaDiscount != undefined) { STR_hargaDiscount = $scope.item.hargaDiscount };

					var STR_Id_hargaNetto_M = "";
					if ($scope.item.id_hn_m != undefined) { STR_Id_hargaNetto_M = $scope.item.id_hn_m };

					var dataObjPostH = {};
					var dataObjPostD = {};
					var dataObjPost = [];
					dataObjPostD = {}
					dataObjPostH = {
						"id_hn_m": STR_Id_hargaNetto_M,
						"idHead": Idsakarepmu,
						"objectprodukfk": objectprodukfkS,
						"objectjenistariffk": STR_jenisTarif,
						"objectasalprodukfk": STR_asalProduk,
						"objectkelasfk": STR_kelas,
						"objectmatauangfk": STR_mataUang,
						"persendiscount": STR_persenDiscount,
						"factorrate": STR_factorRate,
						"qtycurrentstok": STR_qtyCurrentStok,
						"tglberlakuakhir": STR_tglBerlakuAkhir,
						"tglberlakuawal": STR_tglBerlakuAwal,
						"tglkadaluarsalast": STR_tglKadaluarsaLast,
						"reportdisplay": STR_reportDisplay,
						"kodeexternal": STR_kodeExternal,
						"namaexternal": STR_namaExternal,
						"harganetto1": STR_hargaNetto1,
						"harganetto2": STR_hargaNetto2,
						"hargasatuan": STR_hargaSatuan,
						"hargadiscount": STR_hargaDiscount
					};
					dataObjPost = {
						"jenis": 'simpan',
						"head": dataObjPostH,
						// "detail":dataObjPostD
						"detail": data2
					};
					manageKasir.SaveHargaNetto(dataObjPost).then(function (e) {
						// debugger;
						Idsakarepmu = e.data.id;//arrPeriode(0);
						// $scope.produkInput = true;
						// $scope.produkCombo = false;
						LoadData();
					})

					$state.go("HargaNettoProdukByKelasRev");
				}
			}
			// function Simpan(jenis){
			// 	// debugger;
			// 	var validasi = true;
			// 	if ($scope.item.factorRate2 == '') {
			// 		var validasi = false;
			// 	};
			// 	if ($scope.item.hargaDiscount2 == '') {
			// 		var validasi = false;
			// 	};
			// 	if ($scope.item.hargaNetto12 == '') {
			// 		var validasi = false;
			// 	};
			// 	if ($scope.item.hargaNetto22 == '') {
			// 		var validasi = false;
			// 	};
			// 	if ($scope.item.hargaSatuan2 == '') {
			// 		var validasi = false;
			// 	};
			// 	if ($scope.item.persenDiscount2 == ''){
			// 		var validasi = false;
			// 	};
			// 	if (validasi == true) {
			// 		var nm1 = 0;
			// 		if ($scope.item.komponen != undefined) {nm1 =$scope.item.komponen.id};
			// 		var nm2 = 0;
			// 		if ($scope.item.factorRate2 != undefined) {nm2 =parseFloat($scope.item.factorRate2)};
			// 		var nm3 = 0;
			// 		if ($scope.item.hargaDiscount2 != undefined) {nm3 =parseFloat($scope.item.hargaDiscount2)};
			// 		var nm4 = 0;
			// 		if ($scope.item.hargaNetto12 != undefined) {nm4 =parseFloat($scope.item.hargaNetto12)};
			// 		var nm5 = 0;
			// 		if ($scope.item.hargaNetto22 != undefined) {nm5 =parseFloat($scope.item.hargaNetto22)};
			// 		var nm6 = 0;
			// 		if ($scope.item.hargaSatuan2 != undefined) {nm6 =parseFloat($scope.item.hargaSatuan2)};
			// 		var nm7 = 0;
			// 		if ($scope.item.persenDiscount2 != undefined) {nm7 =parseFloat($scope.item.persenDiscount2)};
			// 		var STR_asalProduk = "";
			// 		if ($scope.item.asalProduk != undefined) {STR_asalProduk =$scope.item.asalProduk.id};
			// 		var STR_jenisTarif = "";
			// 		if ($scope.item.jenisTarif != undefined) {STR_jenisTarif =$scope.item.jenisTarif.id};
			// 		var STR_kelas = "";
			// 		if ($scope.item.kelas != undefined) {STR_kelas =$scope.item.kelas.id};
			// 		var STR_mataUang = "";
			// 		if ($scope.item.mataUang != undefined) {STR_mataUang =$scope.item.mataUang.id};
			// 		var STR_persenDiscount = "";
			// 		if ($scope.item.persenDiscount != undefined) {STR_persenDiscount =$scope.item.persenDiscount};
			// 		var STR_factorRate = "";
			// 		if ($scope.item.factorRate != undefined) {STR_factorRate =$scope.item.factorRate};
			// 		var STR_qtyCurrentStok ="" ;
			// 		if ($scope.item.qtyCurrentStok != undefined) {STR_qtyCurrentStok =$scope.item.qtyCurrentStok};
			// 		var STR_tglBerlakuAkhir = "";
			// 		if ($scope.item.tglBerlakuAkhir != undefined) {STR_tglBerlakuAkhir =dateHelper.formatDate($scope.item.tglBerlakuAkhir,"YYYY-MM-DD")};//
			// 		var STR_tglBerlakuAwal = "";
			// 		if ($scope.item.tglBerlakuAwal != undefined) {STR_tglBerlakuAwal =dateHelper.formatDate($scope.item.tglBerlakuAwal,"YYYY-MM-DD")};//$scope.item.tglBerlakuAwal};
			// 		var STR_tglKadaluarsaLast = "";
			// 		if ($scope.item.tglKadaluarsaLast != undefined) {STR_tglKadaluarsaLast =dateHelper.formatDate($scope.item.tglKadaluarsaLast,"YYYY-MM-DD")};//$scope.item.tglKadaluarsaLast};
			// 		var STR_reportDisplay = "";
			// 		if ($scope.item.reportDisplay != undefined) {STR_reportDisplay =$scope.item.reportDisplay};
			// 		var STR_kodeExternal = "";
			// 		if ($scope.item.kodeExternal != undefined) {STR_kodeExternal =$scope.item.kodeExternal};
			// 		var STR_namaExternal = "";
			// 		if ($scope.item.namaExternal != undefined) {STR_namaExternal =$scope.item.namaExternal};
			// 		var HH1 =0;
			// 		var HH2 =0;
			// 		var HH3 =0;
			// 		var HH4 =0;
			// 		for (var i = 0; i < $scope.dataKomponen.length; i++) {
			// 			HH1=HH1 + parseFloat($scope.dataKomponen[i].hargadiscount);
			// 			HH2=HH2 + parseFloat($scope.dataKomponen[i].harganetto1);
			// 			HH3=HH3 + parseFloat($scope.dataKomponen[i].harganetto2);
			// 			HH4=HH4 + parseFloat($scope.dataKomponen[i].hargasatuan);
			// 		}

			// 		var dataObjPostH = {};
			// 		var dataObjPostD = {};
			// 		var dataObjPost = [];
			// 		dataObjPostD = {"idDetail": idDetail,
			// 						"objectkomponenhargafk":nm1,
			// 						"factorrate":nm2,
			// 						"hargadiscount": nm3,
			// 					    "harganetto1": nm4,
			// 					    "harganetto2": nm5,
			// 					    "hargasatuan": nm6,
			// 					    "persendiscount":nm7
			// 					};
			// 		dataObjPostH = {"idHead":Idsakarepmu,
			// 						"objectprodukfk":objectprodukfkS,
			// 						"objectjenistariffk":STR_jenisTarif,
			// 					    "objectasalprodukfk":STR_asalProduk,
			// 					    "objectkelasfk":STR_kelas,
			// 					    "objectmatauangfk":STR_mataUang,
			// 					    "persendiscount":STR_persenDiscount,
			// 					    "factorrate":STR_factorRate,
			// 					    "qtycurrentstok":STR_qtyCurrentStok,
			// 					    "tglberlakuakhir":STR_tglBerlakuAkhir,
			// 					    "tglberlakuawal":STR_tglBerlakuAwal,
			// 					    "tglkadaluarsalast":STR_tglKadaluarsaLast,
			// 					    "reportdisplay":STR_reportDisplay,
			// 					    "kodeexternal":STR_kodeExternal,
			// 					    "namaexternal":STR_namaExternal
			// 					};
			// 			dataObjPost = {"jenis": jenis,
			// 						"head":dataObjPostH,
			// 						"detail":dataObjPostD
			// 					};
			// 		manageKasir.SaveHHHHHH(dataObjPost).then(function(e) {
			// 		})
			// 		LoadData();
			// 	}else{
			// 		alert("Lengkapi data!!");
			// 	}
			// }
			$scope.columnKomponen = [
				{
					"field": "no",
					"title": "No",
					"width": "30px",
				},
				{
					"field": "komponenharga",
					"title": "Komponen Harga",
					"width": "100px"
				},
				{
					"field": "factorrate",
					"title": "Factor Rate",
					"width": "50px"
				},
				{
					"field": "hargadiscount",
					"title": "Harga Discount",
					"width": "70px",
					"template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
				},
				{
					"field": "harganetto1",
					"title": "Harga Netto1",
					"width": "70px",
					"template": "<span class='style-right'>{{formatRupiah('#: harganetto1 #', '')}}</span>"
				},
				{
					"field": "harganetto2",
					"title": "Harga Netto2",
					"width": "70px",
					"template": "<span class='style-right'>{{formatRupiah('#: harganetto2 #', '')}}</span>"
				},
				{
					"field": "hargasatuan",
					"title": "Harga Satuan",
					"width": "70px",
					"template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
				},
				{
					"field": "persendiscount",
					"title": "Persen Discount",
					"width": "50px"
				}
			];

			$scope.klik = function (current) {
				// debugger;
				// idDetail = current.id;
				$scope.item.komponen = { id: current.objectkomponenhargafk, komponenharga: current.komponenharga };
				$scope.item.factorRate2 = current.factorrate;
				$scope.item.hargaDiscount2 = current.hargadiscount;
				$scope.item.hargaNetto12 = current.harganetto1;
				$scope.item.hargaNetto22 = current.harganetto2;
				$scope.item.hargaSatuan2 = current.hargasatuan;
				$scope.item.persenDiscount2 = current.persendiscount;
				$scope.item.no = current.no
			}

			// modelItemAkuntansi.getDataTableMaster("tarif/getProduk", true).then(function(dat){
			// 	$scope.listproduk= dat;
			// });
		}
	]);
});

