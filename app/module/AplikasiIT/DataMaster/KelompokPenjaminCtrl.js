define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KelompokPenjaminCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PersenTanggunganPenjamin", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PersenTanggunganPenjamin;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnPersenTanggunganPenjamin = [
{
"field": "No",
"title": "No"
},
{
"field": "isPaket",
"title": "is Paket"
},
{
"field": "asalProduk",
"title": "asal Produk"
},
{
"field": "asalProdukId",
"title": "asal Produk Id"
},
{
"field": "kdGolonganAsuransi",
"title": "kd Golongan Asuransi"
},
{
"field": "golonganAsuransiId",
"title": "golongan Asuransi Id"
},
{
"field": "hubunganPeserta",
"title": "hubungan Peserta"
},
{
"field": "hubunganPesertaId",
"title": "hubungan Peserta Id"
},
{
"field": "jenisTransaksi",
"title": "jenis Transaksi"
},
{
"field": "jenisTransaksiId",
"title": "jenis Transaksi Id"
},
{
"field": "kelas",
"title": "kelas"
},
{
"field": "kelasId",
"title": "kelas Id"
},
{
"field": "kelasSelisihBerlaku",
"title": "kelas Selisih Berlaku"
},
{
"field": "kelasSelisihBerlakuId",
"title": "kelas Selisih Berlaku Id"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "kelompokPasienId",
"title": "kelompok Pasien Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
},
{
"field": "maxTPenjamin",
"title": "max TPenjamin"
},
{
"field": "maxTPenjaminAll",
"title": "max TPenjamin All"
},
{
"field": "noUrutKelasSelisihBerlaku",
"title": "no Urut Kelas Selisih Berlaku"
},
{
"field": "persenDiscount",
"title": "persen Discount"
},
{
"field": "persenTPenjamin",
"title": "persen TPenjamin"
},
{
"field": "persenTPenjamindrSelisih",
"title": "persen TPenjamindr Selisih"
},
{
"field": "persenTProfile",
"title": "persen TProfile"
},
{
"field": "persenTProfiledrSelisih",
"title": "persen TProfiledr Selisih"
},
{
"field": "qtyMaxKunjungan",
"title": "qty Max Kunjungan"
},
{
"field": "tglBerlakuAkhir",
"title": "tgl Berlaku Akhir"
},
{
"field": "tglBerlakuAwal",
"title": "tgl Berlaku Awal"
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
 columns: $scope.columnPersenTanggunganPenjamin,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.isPaket = current.isPaket;
$scope.item.asalProduk = current.asalProduk;
$scope.item.asalProdukId = current.asalProdukId;
$scope.item.kdGolonganAsuransi = current.kdGolonganAsuransi;
$scope.item.golonganAsuransiId = current.golonganAsuransiId;
$scope.item.hubunganPeserta = current.hubunganPeserta;
$scope.item.hubunganPesertaId = current.hubunganPesertaId;
$scope.item.jenisTransaksi = current.jenisTransaksi;
$scope.item.jenisTransaksiId = current.jenisTransaksiId;
$scope.item.kelas = current.kelas;
$scope.item.kelasId = current.kelasId;
$scope.item.kelasSelisihBerlaku = current.kelasSelisihBerlaku;
$scope.item.kelasSelisihBerlakuId = current.kelasSelisihBerlakuId;
$scope.item.kelompokPasien = current.kelompokPasien;
$scope.item.kelompokPasienId = current.kelompokPasienId;
$scope.item.kdPenjaminPasien = current.kdPenjaminPasien;
$scope.item.maxTPenjamin = current.maxTPenjamin;
$scope.item.maxTPenjaminAll = current.maxTPenjaminAll;
$scope.item.noUrutKelasSelisihBerlaku = current.noUrutKelasSelisihBerlaku;
$scope.item.persenDiscount = current.persenDiscount;
$scope.item.persenTPenjamin = current.persenTPenjamin;
$scope.item.persenTPenjamindrSelisih = current.persenTPenjamindrSelisih;
$scope.item.persenTProfile = current.persenTProfile;
$scope.item.persenTProfiledrSelisih = current.persenTProfiledrSelisih;
$scope.item.qtyMaxKunjungan = current.qtyMaxKunjungan;
$scope.item.tglBerlakuAkhir = current.tglBerlakuAkhir;
$scope.item.tglBerlakuAwal = current.tglBerlakuAwal;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PersenTanggunganPenjamin&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PersenTanggunganPenjamin&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "PersenTanggunganPenjamin",
	"listField": {
"isPaket": $scope.item.isPaket,
"asalProduk": $scope.item.asalProduk,

"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,

"hubunganPeserta": $scope.item.hubunganPeserta,

"jenisTransaksi": $scope.item.jenisTransaksi,

"kelas": $scope.item.kelas,

"kelasSelisihBerlaku": $scope.item.kelasSelisihBerlaku,

"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"maxTPenjamin": $scope.item.maxTPenjamin,
"maxTPenjaminAll": $scope.item.maxTPenjaminAll,
"noUrutKelasSelisihBerlaku": $scope.item.noUrutKelasSelisihBerlaku,
"persenDiscount": $scope.item.persenDiscount,
"persenTPenjamin": $scope.item.persenTPenjamin,
"persenTPenjamindrSelisih": $scope.item.persenTPenjamindrSelisih,
"persenTProfile": $scope.item.persenTProfile,
"persenTProfiledrSelisih": $scope.item.persenTProfiledrSelisih,
"qtyMaxKunjungan": $scope.item.qtyMaxKunjungan,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
"id": $scope.item.id,
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
 "class": "PersenTanggunganPenjamin",
	"listField": {
"isPaket": $scope.item.isPaket,
"asalProduk": $scope.item.asalProduk,

"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,

"hubunganPeserta": $scope.item.hubunganPeserta,

"jenisTransaksi": $scope.item.jenisTransaksi,

"kelas": $scope.item.kelas,

"kelasSelisihBerlaku": $scope.item.kelasSelisihBerlaku,

"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"maxTPenjamin": $scope.item.maxTPenjamin,
"maxTPenjaminAll": $scope.item.maxTPenjaminAll,
"noUrutKelasSelisihBerlaku": $scope.item.noUrutKelasSelisihBerlaku,
"persenDiscount": $scope.item.persenDiscount,
"persenTPenjamin": $scope.item.persenTPenjamin,
"persenTPenjamindrSelisih": $scope.item.persenTPenjamindrSelisih,
"persenTProfile": $scope.item.persenTProfile,
"persenTProfiledrSelisih": $scope.item.persenTProfiledrSelisih,
"qtyMaxKunjungan": $scope.item.qtyMaxKunjungan,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
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
IPSRSService.getFieldListData("AsalProduk&select=id,namaExternal", true).then(function(dat){
$scope.listasalproduk= dat.data;
});
IPSRSService.getFieldListData("GolonganAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listkdgolonganasuransi= dat.data;
});
IPSRSService.getFieldListData("HubunganPesertaAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listhubunganpeserta= dat.data;
});
IPSRSService.getFieldListData("JenisTransaksi&select=id,namaExternal", true).then(function(dat){
$scope.listjenistransaksi= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelasselisihberlaku= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});

var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PersenTanggunganPenjaminD", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PersenTanggunganPenjaminD;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();



///colom tabel
$scope.columnPersenTanggunganPenjaminD = [
{
"field": "No",
"title": "No"
},
{
"field": "kdGolonganAsuransi",
"title": "kd Golongan Asuransi"
},
{
"field": "golonganAsuransiId",
"title": "golongan Asuransi Id"
},
{
"field": "kdHubunganAsuransi",
"title": "kd Hubungan Asuransi"
},
{
"field": "jenisPerawatan",
"title": "jenis Perawatan"
},
{
"field": "jenisPerawatanId",
"title": "jenis Perawatan Id"
},
{
"field": "kelas",
"title": "kelas"
},
{
"field": "kelasId",
"title": "kelas Id"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "kelompokPasienId",
"title": "kelompok Pasien Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
},
{
"field": "maxTPenjamin",
"title": "max TPenjamin"
},
{
"field": "qtyMaxKunjungan",
"title": "qty Max Kunjungan"
},
{
"field": "tglBerlakuAkhir",
"title": "tgl Berlaku Akhir"
},
{
"field": "tglBerlakuAwal",
"title": "tgl Berlaku Awal"
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
	"template" : "<button class='btnEdit' ng-click='enableDatax()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatax()'>Disable</button>"
}
];
$scope.mainGridOptionsx = { 
 pageable: true,
 columns: $scope.columnPersenTanggunganPenjaminD,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.kdGolonganAsuransi = currentx.kdGolonganAsuransi;
$scope.item.golonganAsuransiId = currentx.golonganAsuransiId;
$scope.item.kdHubunganAsuransi = currentx.kdHubunganAsuransi;
$scope.item.jenisPerawatan = currentx.jenisPerawatan;
$scope.item.jenisPerawatanId = currentx.jenisPerawatanId;
$scope.item.kelas = currentx.kelas;
$scope.item.kelasId = currentx.kelasId;
$scope.item.kelompokPasien = currentx.kelompokPasien;
$scope.item.kelompokPasienId = currentx.kelompokPasienId;
$scope.item.kdPenjaminPasien = currentx.kdPenjaminPasien;
$scope.item.maxTPenjamin = currentx.maxTPenjamin;
$scope.item.qtyMaxKunjungan = currentx.qtyMaxKunjungan;
$scope.item.tglBerlakuAkhir = currentx.tglBerlakuAkhir;
$scope.item.tglBerlakuAwal = currentx.tglBerlakuAwal;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};
$scope.disableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PersenTanggunganPenjaminD&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initx();
 });
 };
$scope.enableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PersenTanggunganPenjaminD&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initx();

	});
};
//// save 
$scope.tambahx = function()
 {
var data = {
	"class": "PersenTanggunganPenjaminD",
	"listField": {
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,

"kdHubunganAsuransi": $scope.item.kdHubunganAsuransi,
"jenisPerawatan": $scope.item.jenisPerawatan,

"kelas": $scope.item.kelas,

"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"maxTPenjamin": $scope.item.maxTPenjamin,
"qtyMaxKunjungan": $scope.item.qtyMaxKunjungan,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initx();
$scope.item = {};
 });
  }
////edit
 $scope.editx = function()
  {	
   var data = {
 "class": "PersenTanggunganPenjaminD",
	"listField": {
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,

"kdHubunganAsuransi": $scope.item.kdHubunganAsuransi,
"jenisPerawatan": $scope.item.jenisPerawatan,

"kelas": $scope.item.kelas,

"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"maxTPenjamin": $scope.item.maxTPenjamin,
"qtyMaxKunjungan": $scope.item.qtyMaxKunjungan,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initx();
});
}
$scope.batalx = function () {
$scope.showEditx = false;
$scope.item = {};
}
IPSRSService.getFieldListData("GolonganAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listkdgolonganasuransi= dat.data;
});
IPSRSService.getFieldListData("JenisPerawatan&select=id,namaExternal", true).then(function(dat){
$scope.listjenisperawatan= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});

	}
		]);
});