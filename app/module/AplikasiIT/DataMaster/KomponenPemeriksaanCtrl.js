////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomponenPemeriksaanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenPemeriksaan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenPemeriksaan;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnKomponenPemeriksaan = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "departemen",
				"title": "departemen"
			},
			{
				"field": "departemenId",
				"title": "departemen Id"
			},
			{
				"field": "kdKomponenPeriksa",
				"title": "kd Komponen Periksa"
			},
			{
				"field": "produk",
				"title": "produk"
			},
			{
				"field": "produkId",
				"title": "produk Id"
			},
			{
				"field": "satuanHasil",
				"title": "satuan Hasil"
			},
			{
				"field": "satuanHasilId",
				"title": "satuan Hasil Id"
			},
			{
				"field": "memoHasilPeriksa",
				"title": "memo Hasil Periksa"
			},
			{
				"field": "namaKomponenPeriksa",
				"title": "nama Komponen Periksa"
			},
			{
				"field": "noUrutKomponenPeriksa",
				"title": "no Urut Komponen Periksa"
			},
			{
				"field": "noUrutProduk",
				"title": "no Urut Produk"
			},
			{
				"field": "qKomponenPeriksa",
				"title": "q Komponen Periksa"
			},
			{
				"field": "id",
				"title": "id"
			},
			{
				"field": "reportDisplay",
				"title": "report Display"
			},
			{
				"field": "kodeExternal",
				"title": "kode External"
			},
			{
				"field": "namaExternal",
				"title": "nama External"
			},
			{
				"field": "statusEnabled",
				"title": "status Enabled"
			},

			{
				"title" : "Action",
				"width" : "200px",
				"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
			}
			];
			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnKomponenPemeriksaan,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.departemen = current.departemen;
	
	$scope.item.kdKomponenPeriksa = current.kdKomponenPeriksa;
	$scope.item.produk = current.produk;
	
	$scope.item.satuanHasil = current.satuanHasil;
	
	$scope.item.memoHasilPeriksa = current.memoHasilPeriksa;
	$scope.item.namaKomponenPeriksa = current.namaKomponenPeriksa;
	$scope.item.noUrutKomponenPeriksa = current.noUrutKomponenPeriksa;
	$scope.item.noUrutProduk = current.noUrutProduk;
	$scope.item.qKomponenPeriksa = current.qKomponenPeriksa;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "KomponenPemeriksaan",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"kdKomponenPeriksa": $scope.item.kdKomponenPeriksa,
			"produk": $scope.item.produk,
			
			"satuanHasil": $scope.item.satuanHasil,
			
			"memoHasilPeriksa": $scope.item.memoHasilPeriksa,
			"namaKomponenPeriksa": $scope.item.namaKomponenPeriksa,
			"noUrutKomponenPeriksa": $scope.item.noUrutKomponenPeriksa,
			"noUrutProduk": $scope.item.noUrutProduk,
			"qKomponenPeriksa": $scope.item.qKomponenPeriksa,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		init();
		$scope.item = {};
	});
}

$scope.edit = function()
{	
	var data = {
		"class": "KomponenPemeriksaan",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"kdKomponenPeriksa": $scope.item.kdKomponenPeriksa,
			"produk": $scope.item.produk,
			
			"satuanHasil": $scope.item.satuanHasil,
			
			"memoHasilPeriksa": $scope.item.memoHasilPeriksa,
			"namaKomponenPeriksa": $scope.item.namaKomponenPeriksa,
			"noUrutKomponenPeriksa": $scope.item.noUrutKomponenPeriksa,
			"noUrutProduk": $scope.item.noUrutProduk,
			"qKomponenPeriksa": $scope.item.qKomponenPeriksa,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		init();
	});
}
$scope.batal = function () {
	$scope.showEdit = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaProduk", true).then(function(dat){
	$scope.listproduk= dat.data;
});
IPSRSService.getFieldListData("SatuanHasil&select=id,namaExternal", true).then(function(dat){
	$scope.listsatuanhasil= dat.data;
});
}
]);
});