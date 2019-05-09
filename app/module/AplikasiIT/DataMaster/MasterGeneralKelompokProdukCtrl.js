////header nya
define(['initialize'], function(initialize) {
	'use strict';

initialize.controller('MasterGeneralKelompokProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPeriksaPenunjang", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisPeriksaPenunjang;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
$scope.columnJenisPeriksaPenunjang=[
{
"field": "No",
"title": "No"
},
{
"field": "jenisPeriksa",
"title": "jenis Periksa"
},
{
"field": "noUrut",
"title": "Nomor Urut"
},
{
"field": "departemen",
"title": "Departemen"
},
{
"field": "namaRange",
"title": "nama Range"
},
{
"field": "qRange",
"title": "q Range"
},
{
"field": "rangeMax",
"title": "range Max"
},
{
"field": "rangeMin",
"title": "range Min"
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
 columns: $scope.columnJenisPeriksaPenunjang,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisPeriksa = current.jenisPeriksa;
$scope.item.bahanSample = current.bahanSample;
$scope.item.bahanSampleId = current.bahanSampleId;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.kdJenisPeriksa = current.kdJenisPeriksa;
$scope.item.jenisPeriksaHead = current.jenisPeriksaHead;
$scope.item.jenisPeriksaHeadId = current.jenisPeriksaHeadId;
$scope.item.noUrut = current.noUrut;
$scope.item.qJenisPeriksa = current.qJenisPeriksa;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPeriksaPenunjang&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPeriksaPenunjang&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "JenisPeriksaPenunjang",
	"listField": {
"jenisPeriksa": $scope.item.jenisPeriksa,
"bahanSample": $scope.item.bahanSample,
"bahanSampleId": $scope.item.bahanSampleId,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisPeriksa": $scope.item.kdJenisPeriksa,
"jenisPeriksaHead": $scope.item.jenisPeriksaHead,
"jenisPeriksaHeadId": $scope.item.jenisPeriksaHeadId,
"noUrut": $scope.item.noUrut,
"qJenisPeriksa": $scope.item.qJenisPeriksa,
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
////edit
 $scope.edit = function()
  {	
   var data = {
 "class": "JenisPeriksaPenunjang",
	"listField": {
"jenisPeriksa": $scope.item.jenisPeriksa,
"bahanSample": $scope.item.bahanSample,
"bahanSampleId": $scope.item.bahanSampleId,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisPeriksa": $scope.item.kdJenisPeriksa,
"jenisPeriksaHead": $scope.item.jenisPeriksaHead,
"jenisPeriksaHeadId": $scope.item.jenisPeriksaHeadId,
"noUrut": $scope.item.noUrut,
"qJenisPeriksa": $scope.item.qJenisPeriksa,
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
IPSRSService.getFieldListData("BahanSample&select=id,namaExternal", true).then(function(dat){
$scope.listbahansample= dat.data;
});
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("JenisPeriksaPenunjang&select=id,namaExternal", true).then(function(dat){
$scope.listjenisperiksahead= dat.data;
});
/////end
var initc = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=LevelProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.LevelProduk;
                                    					
$scope.dataSourcec = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initc();



///colom tabel

$scope.columnLevelProduk = [
{
"field": "No",
"title": "No"
},
{
"field": "asalProduk",
"title": "asal Produk"
},
{
"field": "kdAsalProduk",
"title": "kd Asal Produk"
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
"field": "kelompokProduk",
"title": "kelompok Produk"
},
{
"field": "kelompokProdukId",
"title": "kelompok Produk Id"
},
{
"field": "qAsalProduk",
"title": "q Asal Produk"
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
	"template" : "<button class='btnEdit' ng-click='enableDatac()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatac()'>Disable</button>"
}
];
$scope.mainGridOptionsc = { 
 pageable: true,
 columns: $scope.columnLevelProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikc = function(currentc){
$scope.showEditc = true;
$scope.currentc = currentc;
$scope.item.departemen = currentc.departemen;

$scope.item.kelompokProduk = currentc.kelompokProduk;

$scope.item.kdLevelProduk = currentc.kdLevelProduk;
$scope.item.levelProduk = currentc.levelProduk;
$scope.item.qLevelProduk = currentc.qLevelProduk;
$scope.item.id = currentc.id;
$scope.item.noRec = currentc.noRec;
$scope.item.reportDisplay = currentc.reportDisplay;
$scope.item.kodeExternal = currentc.kodeExternal;
$scope.item.namaExternal = currentc.namaExternal;
$scope.item.statusEnabled = currentc.statusEnabled;
};
$scope.disableDatac=function(){
 IPSRSService.getClassMaster("delete-master-table?className=LevelProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initc();
 });
 };
$scope.enableDatac=function(){
 IPSRSService.getClassMaster("delete-master-table?className=LevelProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initc();

	});
};
//// save 
$scope.tambahc = function()
 {
var data = {
	"class": "LevelProduk",
	"listField": {
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"kdLevelProduk": $scope.item.kdLevelProduk,
"levelProduk": $scope.item.levelProduk,
"qLevelProduk": $scope.item.qLevelProduk,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initc();
$scope.item = {};
 });
  }
////edit
 $scope.editc = function()
  {	
   var data = {
 "class": "LevelProduk",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"kdLevelProduk": $scope.item.kdLevelProduk,
"levelProduk": $scope.item.levelProduk,
"qLevelProduk": $scope.item.qLevelProduk,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initc();
});
}
$scope.batalc = function () {
$scope.showEditc = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
$scope.listkelompokproduk= dat.data;
});

var initf = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=BahanSample", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.BahanSample;

					$scope.dataSourcef = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initf();




			$scope.columnBahanSample = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdBahanSample",
				"title": "kd Bahan Sample"
			},
			{
				"field": "satuanKecil",
				"title": "satuan Kecil"
			},
			{
				"field": "satuanKecilId",
				"title": "satuan Kecil Id"
			},
			{
				"field": "namaBahanSample",
				"title": "nama Bahan Sample"
			},
			{
				"field": "qBahanSample",
				"title": "q Bahan Sample"
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
				"template" : "<button class='btnEdit' ng-click='enableDataf()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDataf()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsf = { 
				pageable: true,
				columns: $scope.columnBahanSample,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikf = function(currentf){
	$scope.showEditf = true;
	$scope.currentf = currentf;
	$scope.item.kdBahanSample = currentf.kdBahanSample;
	$scope.item.satuanKecil = currentf.satuanKecil;
	
	$scope.item.namaBahanSample = currentf.namaBahanSample;
	$scope.item.qBahanSample = currentf.qBahanSample;
	$scope.item.id = currentf.id;
	$scope.item.noRec = currentf.noRec;
	$scope.item.reportDisplay = currentf.reportDisplay;
	$scope.item.kodeExternal = currentf.kodeExternal;
	$scope.item.namaExternal = currentf.namaExternal;
	$scope.item.statusEnabled = currentf.statusEnabled;
};
$scope.disableDataf=function(){
	IPSRSService.getClassMaster("delete-master-table?className=BahanSample&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initf();
	});
};
$scope.enableDataf=function(){
	IPSRSService.getClassMaster("delete-master-table?className=BahanSample&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initf();

	});
};

$scope.tambahf = function()
{
	var data = {
		"class": "BahanSample",
		"listField": {
			"kdBahanSample": $scope.item.kdBahanSample,
			"satuanKecil": $scope.item.satuanKecil,
			
			"namaBahanSample": $scope.item.namaBahanSample,
			"qBahanSample": $scope.item.qBahanSample,
			"id": $scope.item.id,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		initf();
		$scope.item = {};
	});
}

$scope.editf = function()
{	
	var data = {
		"class": "BahanSample",
		"listField": {
			"kdBahanSample": $scope.item.kdBahanSample,
			"satuanKecil": $scope.item.satuanKecil,
			
			"namaBahanSample": $scope.item.namaBahanSample,
			"qBahanSample": $scope.item.qBahanSample,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		initf();
	});
}
$scope.batalf = function () {
	$scope.showEditf = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("SatuanKecil&select=id,reportDisplay", true).then(function(dat){
	$scope.listsatuanKecil= dat.data;
});

 var initn = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=FungsiProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.FungsiProduk;
                                    					
$scope.dataSourcen = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initn();



///colom tabel
$scope.columnFungsiProduk = [
{
"field": "No",
"title": "No"
},
{
"field": "asalProduk",
"title": "asal Produk"
},
{
"field": "kdAsalProduk",
"title": "kd Asal Produk"
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
"field": "kelompokProduk",
"title": "kelompok Produk"
},
{
"field": "kelompokProdukId",
"title": "kelompok Produk Id"
},
{
"field": "qAsalProduk",
"title": "q Asal Produk"
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
	"template" : "<button class='btnEdit' ng-click='enableDatan()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatan()'>Disable</button>"
}
];
$scope.mainGridOptionsn = { 
 pageable: true,
 columns: $scope.columnFungsiProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikn = function(currentn){
$scope.showEditn = true;
$scope.currentn = currentn;
$scope.item.fungsiProduk = currentn.fungsiProduk;
$scope.item.departemen = currentn.departemen;
$scope.item.departemenId = currentn.departemenId;
$scope.item.kdFungsiProduk = currentn.kdFungsiProduk;
$scope.item.kelompokProduk = currentn.kelompokProduk;
$scope.item.kelompokProdukId = currentn.kelompokProdukId;
$scope.item.qFungsiProduk = currentn.qFungsiProduk;
$scope.item.id = currentn.id;
$scope.item.noRec = currentn.noRec;
$scope.item.reportDisplay = currentn.reportDisplay;
$scope.item.kodeExternal = currentn.kodeExternal;
$scope.item.namaExternal = currentn.namaExternal;
$scope.item.statusEnabled = currentn.statusEnabled;
};
$scope.disableDatan=function(){
 IPSRSService.getClassMaster("delete-master-table?className=FungsiProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initn();
 });
 };
$scope.enableDatan=function(){
 IPSRSService.getClassMaster("delete-master-table?className=FungsiProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initn();

	});
};
//// save 
$scope.tambahn = function()
 {
var data = {
	"class": "FungsiProduk",
	"listField": {
"fungsiProduk": $scope.item.fungsiProduk,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdFungsiProduk": $scope.item.kdFungsiProduk,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"qFungsiProduk": $scope.item.qFungsiProduk,

"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initn();
$scope.item = {};
 });
  }
////edit
 $scope.editn = function()
  {	
   var data = {
 "class": "FungsiProduk",
	"listField": {
"fungsiProduk": $scope.item.fungsiProduk,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdFungsiProduk": $scope.item.kdFungsiProduk,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"qFungsiProduk": $scope.item.qFungsiProduk,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initn();
});
}
$scope.bataln = function () {
$scope.showEditn = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
$scope.listkelompokproduk= dat.data;
});

}
		]);
});


