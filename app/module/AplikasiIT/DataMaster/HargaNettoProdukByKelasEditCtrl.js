define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HargaNettoProdukByKelasEditCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','ModelItemAkuntansi','CacheHelper','ManageKasir','DateHelper',
		function($q, $rootScope,$state, $scope,IPSRSService,modelItemAkuntansi,cacheHelper,manageKasir,dateHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var Idsakarepmu = '';
			var idDetail = '';
			

			var chacePeriode = cacheHelper.get('HargaNettoProdukByKelasEdit');
			if(chacePeriode != undefined){
				var objectprodukfkS =0;
				var objectkelasfkS=0;
				var objectasalprodukfkS=0;
				var objectjenistariffkS=0;
				var objectmatauangfkS=0;
				//var arrPeriode = chacePeriode.split('~');
				Idsakarepmu = chacePeriode;//arrPeriode(0);
				if (Idsakarepmu != 'fsdjhfkjdshfusfhsdfhsk') {
					$scope.produkInput = true;
					$scope.produkCombo = false;
					LoadData();
					
					
				}else{
					$scope.produkInput = false;
					$scope.produkCombo = true;
					IPSRSService.getFieldListData("Produk&select=id,namaProduk", true).then(function(dat){
						$scope.listproduk= dat.data;
					});
				}
			}

			function LoadData(){
				modelItemAkuntansi.getDataTableMaster("tarif/harganettoprodukbykelas?id=" +Idsakarepmu , true).then(function(dat){
						$scope.item.factorRate = dat[0].factorrate;
						$scope.item.hargaDiscount = dat[0].hargadiscount;
						$scope.item.hargaNetto1 = dat[0].harganetto1;
						$scope.item.hargaNetto2 = dat[0].harganetto2;
						$scope.item.hargaSatuan = dat[0].hargasatuan;
						$scope.item.asalProduk ={id:dat[0].objectasalprodukfk,asalProduk:dat[0].asalproduk};
						$scope.item.jenisTarif ={id:dat[0].objectjenistariffk,jenisTarif:dat[0].jenistarif};;
						$scope.item.kelas ={id: dat[0].objectkelasfk ,namaKelas:dat[0].namakelas};
						$scope.item.mataUang = {id: dat[0].objectmatauangfk ,mataUang:dat[0].matauang};
						//$scope.item.produk = {id: dat[0].objectprodukfk ,namaProduk:dat[0].namaproduk};
						$scope.item.produkNama = dat[0].namaproduk;
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
						objectkelasfkS=dat[0].objectkelasfk;
						objectasalprodukfkS=dat[0].objectasalprodukfk;
						objectjenistariffkS=dat[0].objectjenistariffk;
						objectmatauangfkS=dat[0].objectmatauangfk;
						modelItemAkuntansi.getDataTableMaster("tarif/harganettoprodukbykelas_d?" +
						"objectprodukfk=" + objectprodukfkS +
						"&objectkelasfk=" + objectkelasfkS +
						"&objectasalprodukfk=" + objectasalprodukfkS +
						"&objectjenistariffk=" + objectjenistariffkS +
						"&objectmatauangfk=" + objectmatauangfkS
						, true).then(function(dat1){
							$scope.dataKomponen = dat1;
					});
					});
			}
			IPSRSService.getFieldListData("AsalProduk&select=id,asalProduk", true).then(function(dat){
				$scope.listasalproduk= dat.data;
			});
			IPSRSService.getFieldListData("JenisTarif&select=id,jenisTarif", true).then(function(dat){
				$scope.listjenistarif= dat.data;
			});
			IPSRSService.getFieldListData("Kelas&select=id,namaKelas", true).then(function(dat){
				$scope.listkelas= dat.data;
			});
			IPSRSService.getFieldListData("MataUang&select=id,mataUang", true).then(function(dat){
				$scope.listmatauang= dat.data;
			});
			
			modelItemAkuntansi.getDataTableMaster("tarif/list-master?jenis=komponenharga", true).then(function(dat){
				$scope.listKomponen= dat;
			});

			$scope.batal = function(){
				$state.go('HargaNettoProdukByKelas')
			}

			$scope.save =function(){
				if (Idsakarepmu == '') {
					alert("Ada kesalahan loading data!!");
				}else{
					if (Idsakarepmu == 'fsdjhfkjdshfusfhsdfhsk') {
						SimpanHead()//alert("under construction!!");
					}else{
						Simpan('update');
						kosongKan();
					}
				}
			}

			$scope.saveHead = function(){
				if (Idsakarepmu == 'fsdjhfkjdshfusfhsdfhsk') {
					SimpanHead()
				}else{
					alert("Ada kesalahan loading data!!");
				}	
			}

			$scope.delete =function(){
				if (Idsakarepmu == '') {
					alert("Ada kesalahan loading data!!");
				}else{
					if (Idsakarepmu == 'fsdjhfkjdshfusfhsdfhsk') {
						alert("Fitur tambah tidak bisa hapus");
					}else{
						if (idDetail== '') {
							alert("Pilih komponen yg akan di hapus!!");
						}else{
							Simpan('delete');
							kosongKan();
						}
					}
				}
			}
			$scope.cancel = function(){
				kosongKan();
			}

			function kosongKan(){
				idDetail = '';
				$scope.item.komponen = $scope.listKomponen[0];
				$scope.item.factorRate2 = '';
				$scope.item.hargaDiscount2 = '';
				$scope.item.hargaNetto12 = '';
				$scope.item.hargaNetto22 = '';
				$scope.item.hargaSatuan2 = '';
				$scope.item.persenDiscount2 = '';
			}
			function SimpanHead(){
				var validasi = true;
				if (Idsakarepmu != 'fsdjhfkjdshfusfhsdfhsk') {
					var validasi = false;
				}
				if (validasi == true) {

					var objectprodukfkS = "";
					if ($scope.item.produk != undefined) {objectprodukfkS =$scope.item.produk.id};
					var STR_asalProduk = "";
					if ($scope.item.asalProduk != undefined) {STR_asalProduk =$scope.item.asalProduk.id};
					var STR_jenisTarif = "";
					if ($scope.item.jenisTarif != undefined) {STR_jenisTarif =$scope.item.jenisTarif.id};
					var STR_kelas = "";
					if ($scope.item.kelas != undefined) {STR_kelas =$scope.item.kelas.id};
					var STR_mataUang = "";
					if ($scope.item.mataUang != undefined) {STR_mataUang =$scope.item.mataUang.id};
					var STR_persenDiscount = "";
					if ($scope.item.persenDiscount != undefined) {STR_persenDiscount =$scope.item.persenDiscount};
					var STR_factorRate = "";
					if ($scope.item.factorRate != undefined) {STR_factorRate =$scope.item.factorRate};
					var STR_qtyCurrentStok ="" ;
					if ($scope.item.qtyCurrentStok != undefined) {STR_qtyCurrentStok =$scope.item.qtyCurrentStok};
					var STR_tglBerlakuAkhir = "";
					if ($scope.item.tglBerlakuAkhir != undefined) {STR_tglBerlakuAkhir =dateHelper.formatDate($scope.item.tglBerlakuAkhir,"YYYY-MM-DD")};//
					var STR_tglBerlakuAwal = "";
					if ($scope.item.tglBerlakuAwal != undefined) {STR_tglBerlakuAwal =dateHelper.formatDate($scope.item.tglBerlakuAwal,"YYYY-MM-DD")};//$scope.item.tglBerlakuAwal};
					var STR_tglKadaluarsaLast = "";
					if ($scope.item.tglKadaluarsaLast != undefined) {STR_tglKadaluarsaLast =dateHelper.formatDate($scope.item.tglKadaluarsaLast,"YYYY-MM-DD")};//$scope.item.tglKadaluarsaLast};
					var STR_reportDisplay = "";
					if ($scope.item.reportDisplay != undefined) {STR_reportDisplay =$scope.item.reportDisplay};
					var STR_kodeExternal = "";
					if ($scope.item.kodeExternal != undefined) {STR_kodeExternal =$scope.item.kodeExternal};
					var STR_namaExternal = "";
					if ($scope.item.namaExternal != undefined) {STR_namaExternal =$scope.item.namaExternal};

					var dataObjPostH = {};
					var dataObjPostD = {};
					var dataObjPost = [];
					dataObjPostD ={} 
					dataObjPostH = {"idHead":Idsakarepmu,
									"objectprodukfk":objectprodukfkS,
									"objectjenistariffk":STR_jenisTarif,
								    "objectasalprodukfk":STR_asalProduk,
								    "objectkelasfk":STR_kelas,
								    "objectmatauangfk":STR_mataUang,
								    "persendiscount":STR_persenDiscount,
								    "factorrate":STR_factorRate,
								    "qtycurrentstok":STR_qtyCurrentStok,
								    "tglberlakuakhir":STR_tglBerlakuAkhir,
								    "tglberlakuawal":STR_tglBerlakuAwal,
								    "tglkadaluarsalast":STR_tglKadaluarsaLast,
								    "reportdisplay":STR_reportDisplay,
								    "kodeexternal":STR_kodeExternal,
								    "namaexternal":STR_namaExternal
								};
						dataObjPost = {"jenis": 'simpan',
									"head":dataObjPostH,
									"detail":dataObjPostD
								};
					manageKasir.SaveHHHHHH(dataObjPost).then(function(e) {
						debugger;
						Idsakarepmu = e.data.id;//arrPeriode(0);
						$scope.produkInput = true;
						$scope.produkCombo = false;
						LoadData();
					})
				}
			}
			function Simpan(jenis){
				debugger;
				var validasi = true;
				if ($scope.item.factorRate2 == '') {
					var validasi = false;
				};
				if ($scope.item.hargaDiscount2 == '') {
					var validasi = false;
				};
				if ($scope.item.hargaNetto12 == '') {
					var validasi = false;
				};
				if ($scope.item.hargaNetto22 == '') {
					var validasi = false;
				};
				if ($scope.item.hargaSatuan2 == '') {
					var validasi = false;
				};
				if ($scope.item.persenDiscount2 == ''){
					var validasi = false;
				};
				if (validasi == true) {
					var nm1 = 0;
					if ($scope.item.komponen != undefined) {nm1 =$scope.item.komponen.id};
					var nm2 = 0;
					if ($scope.item.factorRate2 != undefined) {nm2 =parseFloat($scope.item.factorRate2)};
					var nm3 = 0;
					if ($scope.item.hargaDiscount2 != undefined) {nm3 =parseFloat($scope.item.hargaDiscount2)};
					var nm4 = 0;
					if ($scope.item.hargaNetto12 != undefined) {nm4 =parseFloat($scope.item.hargaNetto12)};
					var nm5 = 0;
					if ($scope.item.hargaNetto22 != undefined) {nm5 =parseFloat($scope.item.hargaNetto22)};
					var nm6 = 0;
					if ($scope.item.hargaSatuan2 != undefined) {nm6 =parseFloat($scope.item.hargaSatuan2)};
					var nm7 = 0;
					if ($scope.item.persenDiscount2 != undefined) {nm7 =parseFloat($scope.item.persenDiscount2)};
					var STR_asalProduk = "";
					if ($scope.item.asalProduk != undefined) {STR_asalProduk =$scope.item.asalProduk.id};
					var STR_jenisTarif = "";
					if ($scope.item.jenisTarif != undefined) {STR_jenisTarif =$scope.item.jenisTarif.id};
					var STR_kelas = "";
					if ($scope.item.kelas != undefined) {STR_kelas =$scope.item.kelas.id};
					var STR_mataUang = "";
					if ($scope.item.mataUang != undefined) {STR_mataUang =$scope.item.mataUang.id};
					var STR_persenDiscount = "";
					if ($scope.item.persenDiscount != undefined) {STR_persenDiscount =$scope.item.persenDiscount};
					var STR_factorRate = "";
					if ($scope.item.factorRate != undefined) {STR_factorRate =$scope.item.factorRate};
					var STR_qtyCurrentStok ="" ;
					if ($scope.item.qtyCurrentStok != undefined) {STR_qtyCurrentStok =$scope.item.qtyCurrentStok};
					var STR_tglBerlakuAkhir = "";
					if ($scope.item.tglBerlakuAkhir != undefined) {STR_tglBerlakuAkhir =dateHelper.formatDate($scope.item.tglBerlakuAkhir,"YYYY-MM-DD")};//
					var STR_tglBerlakuAwal = "";
					if ($scope.item.tglBerlakuAwal != undefined) {STR_tglBerlakuAwal =dateHelper.formatDate($scope.item.tglBerlakuAwal,"YYYY-MM-DD")};//$scope.item.tglBerlakuAwal};
					var STR_tglKadaluarsaLast = "";
					if ($scope.item.tglKadaluarsaLast != undefined) {STR_tglKadaluarsaLast =dateHelper.formatDate($scope.item.tglKadaluarsaLast,"YYYY-MM-DD")};//$scope.item.tglKadaluarsaLast};
					var STR_reportDisplay = "";
					if ($scope.item.reportDisplay != undefined) {STR_reportDisplay =$scope.item.reportDisplay};
					var STR_kodeExternal = "";
					if ($scope.item.kodeExternal != undefined) {STR_kodeExternal =$scope.item.kodeExternal};
					var STR_namaExternal = "";
					if ($scope.item.namaExternal != undefined) {STR_namaExternal =$scope.item.namaExternal};
					var HH1 =0;
					var HH2 =0;
					var HH3 =0;
					var HH4 =0;
					for (var i = 0; i < $scope.dataKomponen.length; i++) {
						HH1=HH1 + parseFloat($scope.dataKomponen[i].hargadiscount);
						HH2=HH2 + parseFloat($scope.dataKomponen[i].harganetto1);
						HH3=HH3 + parseFloat($scope.dataKomponen[i].harganetto2);
						HH4=HH4 + parseFloat($scope.dataKomponen[i].hargasatuan);
					}

					var dataObjPostH = {};
					var dataObjPostD = {};
					var dataObjPost = [];
					dataObjPostD = {"idDetail": idDetail,
									"objectkomponenhargafk":nm1,
									"factorrate":nm2,
									"hargadiscount": nm3,
								    "harganetto1": nm4,
								    "harganetto2": nm5,
								    "hargasatuan": nm6,
								    "persendiscount":nm7
								};
					dataObjPostH = {"idHead":Idsakarepmu,
									"objectprodukfk":objectprodukfkS,
									"objectjenistariffk":STR_jenisTarif,
								    "objectasalprodukfk":STR_asalProduk,
								    "objectkelasfk":STR_kelas,
								    "objectmatauangfk":STR_mataUang,
								    "persendiscount":STR_persenDiscount,
								    "factorrate":STR_factorRate,
								    "qtycurrentstok":STR_qtyCurrentStok,
								    "tglberlakuakhir":STR_tglBerlakuAkhir,
								    "tglberlakuawal":STR_tglBerlakuAwal,
								    "tglkadaluarsalast":STR_tglKadaluarsaLast,
								    "reportdisplay":STR_reportDisplay,
								    "kodeexternal":STR_kodeExternal,
								    "namaexternal":STR_namaExternal
								};
						dataObjPost = {"jenis": jenis,
									"head":dataObjPostH,
									"detail":dataObjPostD
								};
					manageKasir.SaveHHHHHH(dataObjPost).then(function(e) {
					})
					LoadData();
				}else{
					alert("Lengkapi data!!");
				}
			}
			$scope.columnKomponen = [
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
				"width": "70px"
			},
			{
				"field": "harganetto1",
				"title": "Harga Netto1",
				"width": "70px"
			},
			{
				"field": "harganetto2",
				"title": "Harga Netto2",
				"width": "70px"
			},
			{
				"field": "hargasatuan",
				"title": "Harga Satuan",
				"width": "70px"
			},
			{
				"field": "persendiscount",
				"title": "Persen Discount",
				"width": "50px"
			}
			];

			$scope.klik = function(current){
				debugger;
				idDetail = current.id;
				$scope.item.komponen = {id:current.objectkomponenhargafk,komponenharga:current.komponenharga};
				$scope.item.factorRate2 = current.factorrate;
				$scope.item.hargaDiscount2 = current.hargadiscount;
				$scope.item.hargaNetto12 = current.harganetto1;
				$scope.item.hargaNetto22 = current.harganetto2;
				$scope.item.hargaSatuan2 = current.hargasatuan;
				$scope.item.persenDiscount2 = current.persendiscount;

			}	

// modelItemAkuntansi.getDataTableMaster("tarif/getProduk", true).then(function(dat){
// 	$scope.listproduk= dat;
// });
}
]);
});

