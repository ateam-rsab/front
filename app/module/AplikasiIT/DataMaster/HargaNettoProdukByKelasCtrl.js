define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HargaNettoProdukByKelasCtrl', ['$q', '$rootScope', '$state','$scope', 'IPSRSService','ModelItemAkuntansi','CacheHelper',
		function($q, $rootScope,$state, $scope,IPSRSService,modelItemAkuntansi,cacheHelper) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var idSeterusnya = 0;
			var init = function () {
				// IPSRSService.getFieldsMasterTable("get-data-master?className=HargaNettoProdukByKelas", true).then(function(dat){
				// 	$scope.listDataMaster = dat.data.data.HargaNettoProdukByKelas;

				// 	$scope.dataSource = new kendo.data.DataSource({
				// 		pageSize: 10,
				// 		data: $scope.listDataMaster,
				// 		autoSync: true 

				// 	});

				// });

			IPSRSService.getFieldListData("Kelas&select=id,namaKelas", true).then(function(dat){
				$scope.listkelas= dat.data;
			});
				modelItemAkuntansi.getDataTableMaster("tarif/harganettoprodukbykelas", true).then(function(dat){
					var no = 0;
					for (var i = 0; i < dat.length; i++) {
						no = no + 1;
						dat[i].no = no;
					}
					$scope.listDataMaster = dat//.data.data.HargaNettoProdukByKelas;
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true
						

					});

				});
			}
			init();



			$scope.gridColumn = [
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
				"width": "120px"
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
				"width": "20px"
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
				"title" : "Action",
				"width" : "200px",
				"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.gridColumn,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

// $scope.Select=function(data)
// {
// 	console.log(JSON.stringify(data));
// 	$scope.item.asalProduk= {id:data.objectasalprodukfk,asalProduk:data.asalproduk};
// };
////fungsi klik untuk edit


$scope.klik = function(current){
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
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=HargaNettoProdukByKelas&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		//init();
		Carii();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=HargaNettoProdukByKelas&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		//init();
		Carii();
	});
};

$scope.edit =function(){
	cacheHelper.set('HargaNettoProdukByKelasEdit',idSeterusnya );
	$state.go('HargaNettoProdukByKelasEdit')
}
$scope.tambah =function(){
	cacheHelper.set('HargaNettoProdukByKelasEdit','fsdjhfkjdshfusfhsdfhsk' );
	$state.go('HargaNettoProdukByKelasEdit')
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
$scope.CariProduk = function(){
	Carii();
}
$scope.CariKodeProduk = function(){
	Carii();
}
$scope.CariProdukCombo = function(){
	debugger;
	var nmP = "";
	if ($scope.item.produk != undefined) {
		nmP ='namaproduk=' + $scope.item.produk.namaProduk;
	}
	modelItemAkuntansi.getDataTableMaster("tarif/getProduk?" + nmP ).then(function(dat){
		$scope.listproduk= dat;
	});
}

$scope.Cari =function(){
	Carii();
}

function Carii(){
	var nmP = "";
	if ($scope.item.cariProduk != undefined) {
		nmP ='namaproduk=' + $scope.item.cariProduk;
	}
	var nmkP = "";
	if ($scope.item.kodeProduk != undefined) {
		nmkP ='&objectprodukfk=' + $scope.item.kodeProduk;
	}
	var idKelas = "";
	if ($scope.item.kelas != undefined) {
		idKelas ='&objectkelasfk=' + $scope.item.kelas.id;
	}
	modelItemAkuntansi.getDataTableMaster("tarif/harganettoprodukbykelas?"+nmP+nmkP+idKelas, true).then(function(dat){
		var no = 0;
		for (var i = 0; i < dat.length; i++) {
			no = no + 1;
			dat[i].no = no;
		}
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

