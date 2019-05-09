////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KelompokPemeriksaanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=MetodePemeriksaanPenunjang", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.MetodePemeriksaanPenunjang;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnMetodePemeriksaanPenunjang = [
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
				"field": "kdMetodePeriksa",
				"title": "kd Metode Periksa"
			},
			{
				"field": "keteranganMetode",
				"title": "keterangan Metode"
			},
			{
				"field": "metodePeriksa",
				"title": "metode Periksa"
			},
			{
				"field": "qMetodePeriksa",
				"title": "q Metode Periksa"
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
				columns: $scope.columnMetodePemeriksaanPenunjang,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.departemen = current.departemen;
	$scope.item.departemenId = current.departemenId;
	$scope.item.kdMetodePeriksa = current.kdMetodePeriksa;
	$scope.item.keteranganMetode = current.keteranganMetode;
	$scope.item.metodePeriksa = current.metodePeriksa;
	$scope.item.qMetodePeriksa = current.qMetodePeriksa;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=MetodePemeriksaanPenunjang&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=MetodePemeriksaanPenunjang&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "MetodePemeriksaanPenunjang",
		"listField": {
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"kdMetodePeriksa": $scope.item.kdMetodePeriksa,
			"keteranganMetode": $scope.item.keteranganMetode,
			"metodePeriksa": $scope.item.metodePeriksa,
			"qMetodePeriksa": $scope.item.qMetodePeriksa,
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
		"class": "MetodePemeriksaanPenunjang",
		"listField": {
			"departemen": $scope.item.departemen,
			"departemenId": $scope.item.departemenId,
			"kdMetodePeriksa": $scope.item.kdMetodePeriksa,
			"keteranganMetode": $scope.item.keteranganMetode,
			"metodePeriksa": $scope.item.metodePeriksa,
			"qMetodePeriksa": $scope.item.qMetodePeriksa,
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

var initc = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenPemeriksaan", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenPemeriksaan;
					
					$scope.dataSourcec = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initc();




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
				"template" : "<button class='btnEdit' ng-click='enableDatac()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatac()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsc = { 
				pageable: true,
				columns: $scope.columnKomponenPemeriksaan,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikc = function(currentc){
	$scope.showEditc = true;
	$scope.currentc = currentc;
	$scope.item.departemen = currentc.departemen;
	
	$scope.item.kdKomponenPeriksa = currentc.kdKomponenPeriksa;
	$scope.item.produk = currentc.produk;
	
	$scope.item.satuanHasil = currentc.satuanHasil;
	
	$scope.item.memoHasilPeriksa = currentc.memoHasilPeriksa;
	$scope.item.namaKomponenPeriksa = currentc.namaKomponenPeriksa;
	$scope.item.noUrutKomponenPeriksa = currentc.noUrutKomponenPeriksa;
	$scope.item.noUrutProduk = currentc.noUrutProduk;
	$scope.item.qKomponenPeriksa = currentc.qKomponenPeriksa;
	$scope.item.id = currentc.id;
	$scope.item.noRec = currentc.noRec;
	$scope.item.reportDisplay = currentc.reportDisplay;
	$scope.item.kodeExternal = currentc.kodeExternal;
	$scope.item.namaExternal = currentc.namaExternal;
	$scope.item.statusEnabled = currentc.statusEnabled;
};
$scope.disableDatac=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initc();
	});
};
$scope.enableDatac=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initc();

	});
};

$scope.tambahc = function()
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
		initc();
		$scope.item = {};
	});
}

$scope.editc = function()
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
IPSRSService.getFieldListData("Produk&select=id,namaProduk", true).then(function(dat){
	$scope.listproduk= dat.data;
});
IPSRSService.getFieldListData("SatuanHasil&select=id,namaExternal", true).then(function(dat){
	$scope.listsatuanhasil= dat.data;
});


var initv = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenPemeriksaanRangeNilai", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenPemeriksaanRangeNilai;

					$scope.dataSourcev = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initv();




			$scope.columnKomponenPemeriksaanRangeNilai = [
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
				"field": "jenisKelamin",
				"title": "jenis Kelamin"
			},
			{
				"field": "jenisKelaminId",
				"title": "jenis Kelamin Id"
			},
			{
				"field": "kelompokUmur",
				"title": "kelompok Umur"
			},
			{
				"field": "kelompokUmurId",
				"title": "kelompok Umur Id"
			},
			{
				"field": "komponenPeriksa",
				"title": "komponen Periksa"
			},
			{
				"field": "komponenPeriksaId",
				"title": "komponen Periksa Id"
			},
			{
				"field": "metodePeriksa",
				"title": "metode Periksa"
			},
			{
				"field": "metodePeriksaId",
				"title": "metode Periksa Id"
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
				"field": "keteranganLainnya",
				"title": "keterangan Lainnya"
			},
			{
				"field": "rangeNilaiMax",
				"title": "range Nilai Max"
			},
			{
				"field": "rangeNilaiMin",
				"title": "range Nilai Min"
			},
			{
				"field": "rangeNilaiNormal",
				"title": "range Nilai Normal"
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
				"template" : "<button class='btnEdit' ng-click='enableDatav()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatav()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsv = { 
				pageable: true,
				columns: $scope.columnKomponenPemeriksaanRangeNilai,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikv = function(currentv){
	$scope.showEditv = true;
	$scope.currentv = currentv;
	$scope.item.departemen = currentv.departemen;
	
	$scope.item.jenisKelamin = currentv.jenisKelamin;
	
	$scope.item.kelompokUmur = currentv.kelompokUmur;

	$scope.item.komponenPeriksa = currentv.komponenPeriksa;
	
	$scope.item.metodePeriksa = currentv.metodePeriksa;
	
	$scope.item.satuanHasil = currentv.satuanHasil;
	
	$scope.item.keteranganLainnya = currentv.keteranganLainnya;
	$scope.item.rangeNilaiMax = currentv.rangeNilaiMax;
	$scope.item.rangeNilaiMin = currentv.rangeNilaiMin;
	$scope.item.rangeNilaiNormal = currentv.rangeNilaiNormal;
	$scope.item.id = currentv.id;
	$scope.item.noRec = currentv.noRec;
	$scope.item.reportDisplay = currentv.reportDisplay;
	$scope.item.kodeExternal = currentv.kodeExternal;
	$scope.item.namaExternal = currentv.namaExternal;
	$scope.item.statusEnabled = currentv.statusEnabled;
};
$scope.disableDatav=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanRangeNilai&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initv();
	});
};
$scope.enableDatav=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanRangeNilai&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initv();

	});
};

$scope.tambahv = function()
{
	var data = {
		"class": "KomponenPemeriksaanRangeNilai",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"jenisKelamin": $scope.item.jenisKelamin,
			
			"kelompokUmur": $scope.item.kelompokUmur,
			
			"komponenPeriksa": $scope.item.komponenPeriksa,
			
			"metodePeriksa": $scope.item.metodePeriksa,
			
			"satuanHasil": $scope.item.satuanHasil,
			
			"keteranganLainnya": $scope.item.keteranganLainnya,
			"rangeNilaiMax": $scope.item.rangeNilaiMax,
			"rangeNilaiMin": $scope.item.rangeNilaiMin,
			"rangeNilaiNormal": $scope.item.rangeNilaiNormal,

			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		initv();
		$scope.item = {};
	});
}

$scope.editv = function()
{	
	var data = {
		"class": "KomponenPemeriksaanRangeNilai",
		"listField": {
			"departemen": $scope.item.departemen,
			
			"jenisKelamin": $scope.item.jenisKelamin,
		
			"kelompokUmur": $scope.item.kelompokUmur,
			
			"komponenPeriksa": $scope.item.komponenPeriksa,
			
			"metodePeriksa": $scope.item.metodePeriksa,
			
			"satuanHasil": $scope.item.satuanHasil,
			
			"keteranganLainnya": $scope.item.keteranganLainnya,
			"rangeNilaiMax": $scope.item.rangeNilaiMax,
			"rangeNilaiMin": $scope.item.rangeNilaiMin,
			"rangeNilaiNormal": $scope.item.rangeNilaiNormal,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		initv();
	});
}
$scope.batalv = function () {
	$scope.showEditv = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
	$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("JenisKelamin&select=id,namaExternal", true).then(function(dat){
	$scope.listjenisKelamin= dat.data;
});
IPSRSService.getFieldListData("KelompokUmur&select=id,namaExternal", true).then(function(dat){
	$scope.listkelompokUmur= dat.data;
});
IPSRSService.getFieldListData("KomponenPemeriksaan&select=id,namaExternal", true).then(function(dat){
	$scope.listkomponenPeriksa= dat.data;
});
IPSRSService.getFieldListData("MetodePemeriksaanPenunjang&select=id,namaExternal", true).then(function(dat){
	$scope.listmetodePeriksa= dat.data;
});
IPSRSService.getFieldListData("SatuanHasil&select=id,namaExternal", true).then(function(dat){
	$scope.listsatuanHasil= dat.data;
});

var initd = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenPemeriksaanRangeNilaiK", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.KomponenPemeriksaanRangeNilaiK;

					$scope.dataSourced = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			initd();




			$scope.columnKomponenPemeriksaanRangeNilaiK = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisKelamin",
				"title": "jenis Kelamin"
			},
			{
				"field": "jenisKelaminId",
				"title": "jenis Kelamin Id"
			},
			{
				"field": "kelompokUmur",
				"title": "kelompok Umur"
			},
			{
				"field": "kelompokUmurId",
				"title": "kelompok Umur Id"
			},
			{
				"field": "komponenPeriksa",
				"title": "komponen Periksa"
			},
			{
				"field": "komponenPeriksaId",
				"title": "komponen Periksa Id"
			},
			{
				"field": "metodePeriksa",
				"title": "metode Periksa"
			},
			{
				"field": "metodePeriksaId",
				"title": "metode Periksa Id"
			},
			{
				"field": "keteranganRangeNilai",
				"title": "keterangan Range Nilai"
			},
			{
				"field": "noUrut",
				"title": "no Urut"
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
				"template" : "<button class='btnEdit' ng-click='enableDatad()'>Enable</button>"+
				"<button class='btnHapus' ng-click='disableDatad()'>Disable</button>"
			}
			];
			$scope.mainGridOptionsd = { 
				pageable: true,
				columns: $scope.columnKomponenPemeriksaanRangeNilaiK,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klikd = function(currentd){
	$scope.showEditd = true;
	$scope.currentd = currentd;
	$scope.item.jenisKelamin = currentd.jenisKelamin;
	
	$scope.item.kelompokUmur = currentd.kelompokUmur;
	
	$scope.item.komponenPeriksa = currentd.komponenPeriksa;
	
	$scope.item.metodePeriksa = currentd.metodePeriksa;
	
	$scope.item.keteranganRangeNilai = currentd.keteranganRangeNilai;
	$scope.item.noUrut = currentd.noUrut;
	$scope.item.id = currentd.id;
	$scope.item.noRec = currentd.noRec;
	$scope.item.reportDisplay = currentd.reportDisplay;
	$scope.item.kodeExternal = currentd.kodeExternal;
	$scope.item.namaExternal = currentd.namaExternal;
	$scope.item.statusEnabled = currentd.statusEnabled;
};
$scope.disableDatad=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanRangeNilaiK&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		initd();
	});
};
$scope.enableDatad=function(){
	IPSRSService.getClassMaster("delete-master-table?className=KomponenPemeriksaanRangeNilaiK&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		initd();

	});
};

$scope.tambahd = function()
{
	var data = {
		"class": "KomponenPemeriksaanRangeNilaiK",
		"listField": {
			"jenisKelamin": $scope.item.jenisKelamin,
		
			"kelompokUmur": $scope.item.kelompokUmur,
		
			"komponenPeriksa": $scope.item.komponenPeriksa,
		
			"metodePeriksa": $scope.item.metodePeriksa,
		
			"keteranganRangeNilai": $scope.item.keteranganRangeNilai,
			"noUrut": $scope.item.noUrut,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
		}
	}
	IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
		console.log(JSON.stringify(e.data));
		initd();
		$scope.item = {};
	});
}

$scope.editd = function()
{	
	var data = {
		"class": "KomponenPemeriksaanRangeNilaiK",
		"listField": {
			"jenisKelamin": $scope.item.jenisKelamin,
		
			"kelompokUmur": $scope.item.kelompokUmur,
		
			"komponenPeriksa": $scope.item.komponenPeriksa,
			
			"metodePeriksa": $scope.item.metodePeriksa,
		
			"keteranganRangeNilai": $scope.item.keteranganRangeNilai,
			"noUrut": $scope.item.noUrut,
			"id": $scope.item.id,
			"noRec": $scope.item.noRec,
			"reportDisplay": $scope.item.reportDisplay,
			"kodeExternal": $scope.item.kodeExternal,
			"namaExternal": $scope.item.namaExternal,
			"statusEnabled": $scope.item.statusEnabled
		}
	}
	IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
		initd();
	});
}
$scope.batald = function () {
	$scope.showEditd = false;
	$scope.item = {};
}
IPSRSService.getFieldListData("JenisKelamin&select=id,namaExternal", true).then(function(dat){
	$scope.listjenisKelamin= dat.data;
});
IPSRSService.getFieldListData("KelompokUmur&select=id,namaExternal", true).then(function(dat){
	$scope.listkelompokUmur= dat.data;
});
IPSRSService.getFieldListData("KomponenPemeriksaan&select=id,namaExternal", true).then(function(dat){
	$scope.listkomponenPeriksa= dat.data;
});
IPSRSService.getFieldListData("MetodePemeriksaanPenunjang&select=id,namaExternal", true).then(function(dat){
	$scope.listmetodePeriksa= dat.data;
});


}
]);
});
/////end