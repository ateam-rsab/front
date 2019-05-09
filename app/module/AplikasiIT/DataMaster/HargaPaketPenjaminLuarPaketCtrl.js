define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('HargaPaketPenjaminLuarPaketCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=HargaPaketPenjaminLuarPaket", true).then(function(dat){
$scope.listDataMaster = dat.data.data.HargaPaketPenjaminLuarPaket;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnHargaPaketPenjaminLuarPaket = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "namaAkun",
				"title": "nama Akun"
			},
			{
				"field": "kodeAkun",
				"title": "kode Akun"
			},
			{
				"field": "ketAkun",
				"title": "ket Akun"
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
 columns: $scope.columnHargaPaketPenjaminLuarPaket,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.factorRate = current.factorRate;
$scope.item.hargaSatuan = current.hargaSatuan;
$scope.item.isPaketByProduk = current.isPaketByProduk;
$scope.item.kdGolonganAsuransi = current.kdGolonganAsuransi;
$scope.item.golonganAsuransiId = current.golonganAsuransiId;
$scope.item.hubunganPeserta = current.hubunganPeserta;
$scope.item.hubunganPesertaId = current.hubunganPesertaId;
$scope.item.kelas = current.kelas;
$scope.item.kelasId = current.kelasId;
$scope.item.kelompokPasien = current.kelompokPasien;
$scope.item.kelompokPasienId = current.kelompokPasienId;
$scope.item.paket = current.paket;
$scope.item.paketId = current.paketId;
$scope.item.kdPenjaminPasien = current.kdPenjaminPasien;
$scope.item.produk = current.produk;
$scope.item.produkId = current.produkId;
$scope.item.maxTPenjamin = current.maxTPenjamin;
$scope.item.persenHargaSatuan = current.persenHargaSatuan;
$scope.item.persenTPenjamindrSelisih = current.persenTPenjamindrSelisih;
$scope.item.persenTProfiledrSelisih = current.persenTProfiledrSelisih;
$scope.item.qtyMaxProduk = current.qtyMaxProduk;
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
 IPSRSService.getClassMaster("delete-master-table?className=HargaPaketPenjaminLuarPaket&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HargaPaketPenjaminLuarPaket&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "HargaPaketPenjaminLuarPaket",
	"listField": {
"factorRate": $scope.item.factorRate,
"hargaSatuan": $scope.item.hargaSatuan,
"isPaketByProduk": $scope.item.isPaketByProduk,
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"golonganAsuransiId": $scope.item.golonganAsuransiId,
"hubunganPeserta": $scope.item.hubunganPeserta,
"hubunganPesertaId": $scope.item.hubunganPesertaId,
"kelas": $scope.item.kelas,
"kelasId": $scope.item.kelasId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"paket": $scope.item.paket,
"paketId": $scope.item.paketId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"produk": $scope.item.produk,
"produkId": $scope.item.produkId,
"maxTPenjamin": $scope.item.maxTPenjamin,
"persenHargaSatuan": $scope.item.persenHargaSatuan,
"persenTPenjamindrSelisih": $scope.item.persenTPenjamindrSelisih,
"persenTProfiledrSelisih": $scope.item.persenTProfiledrSelisih,
"qtyMaxProduk": $scope.item.qtyMaxProduk,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
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
 "class": "HargaPaketPenjaminLuarPaket",
	"listField": {
"factorRate": $scope.item.factorRate,
"hargaSatuan": $scope.item.hargaSatuan,
"isPaketByProduk": $scope.item.isPaketByProduk,
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"golonganAsuransiId": $scope.item.golonganAsuransiId,
"hubunganPeserta": $scope.item.hubunganPeserta,
"hubunganPesertaId": $scope.item.hubunganPesertaId,
"kelas": $scope.item.kelas,
"kelasId": $scope.item.kelasId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"paket": $scope.item.paket,
"paketId": $scope.item.paketId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"produk": $scope.item.produk,
"produkId": $scope.item.produkId,
"maxTPenjamin": $scope.item.maxTPenjamin,
"persenHargaSatuan": $scope.item.persenHargaSatuan,
"persenTPenjamindrSelisih": $scope.item.persenTPenjamindrSelisih,
"persenTProfiledrSelisih": $scope.item.persenTProfiledrSelisih,
"qtyMaxProduk": $scope.item.qtyMaxProduk,
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
IPSRSService.getFieldListData("GolonganAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listkdgolonganasuransi= dat.data;
});
IPSRSService.getFieldListData("HubunganPesertaAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listhubunganpeserta= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});
IPSRSService.getFieldListData("Paket&select=id,namaExternal", true).then(function(dat){
$scope.listpaket= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listproduk= dat.data;
});
	}
		]);
});
/////end
