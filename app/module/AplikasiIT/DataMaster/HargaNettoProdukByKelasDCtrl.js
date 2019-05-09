define(['initialize'], function(initialize) {
'use strict';
initialize.controller('HargaNettoProdukByKelasDCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=HargaNettoProdukByKelasD", true).then(function(dat){
$scope.listDataMaster = dat.data.data.HargaNettoProdukByKelasD;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnJenisHVA = [
{
"field": "No",
"title": "No"
},
{
"field": "nama",
"title": "nama"
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
 columns: $scope.columnHargaNettoProdukByKelasD,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.factorRate = current.factorRate;
$scope.item.hargaDiscount = current.hargaDiscount;
$scope.item.hargaNetto1 = current.hargaNetto1;
$scope.item.hargaNetto2 = current.hargaNetto2;
$scope.item.hargaSatuan = current.hargaSatuan;
$scope.item.asalProduk = current.asalProduk;
$scope.item.asalProdukId = current.asalProdukId;
$scope.item.jenisTarif = current.jenisTarif;
$scope.item.jenisTarifId = current.jenisTarifId;
$scope.item.kelas = current.kelas;
$scope.item.kelasId = current.kelasId;
$scope.item.komponenHarga = current.komponenHarga;
$scope.item.komponenHargaId = current.komponenHargaId;
$scope.item.mataUang = current.mataUang;
$scope.item.mataUangId = current.mataUangId;
$scope.item.produk = current.produk;
$scope.item.produkId = current.produkId;
$scope.item.persenDiscount = current.persenDiscount;
$scope.item.qtyCurrentStok = current.qtyCurrentStok;
$scope.item.tglBerlakuAkhir = current.tglBerlakuAkhir;
$scope.item.tglBerlakuAwal = current.tglBerlakuAwal;
$scope.item.tglKadaluarsaLast = current.tglKadaluarsaLast;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HargaNettoProdukByKelasD&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HargaNettoProdukByKelasD&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "HargaNettoProdukByKelasD",
	"listField": {
"factorRate": $scope.item.factorRate,
"hargaDiscount": $scope.item.hargaDiscount,
"hargaNetto1": $scope.item.hargaNetto1,
"hargaNetto2": $scope.item.hargaNetto2,
"hargaSatuan": $scope.item.hargaSatuan,
"asalProduk": $scope.item.asalProduk,
"jenisTarif": $scope.item.jenisTarif,
"kelas": $scope.item.kelas,
"komponenHarga": $scope.item.komponenHarga,
"mataUang": $scope.item.mataUang,
"produk": $scope.item.produk,
"persenDiscount": $scope.item.persenDiscount,
"qtyCurrentStok": $scope.item.qtyCurrentStok,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
"tglKadaluarsaLast": $scope.item.tglKadaluarsaLast,
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
 "class": "HargaNettoProdukByKelasD",
	"listField": {
"factorRate": $scope.item.factorRate,
"hargaDiscount": $scope.item.hargaDiscount,
"hargaNetto1": $scope.item.hargaNetto1,
"hargaNetto2": $scope.item.hargaNetto2,
"hargaSatuan": $scope.item.hargaSatuan,
"asalProduk": $scope.item.asalProduk,
"jenisTarif": $scope.item.jenisTarif,
"kelas": $scope.item.kelas,
"komponenHarga": $scope.item.komponenHarga,
"mataUang": $scope.item.mataUang,
"produk": $scope.item.produk,
"persenDiscount": $scope.item.persenDiscount,
"qtyCurrentStok": $scope.item.qtyCurrentStok,
"tglBerlakuAkhir": $scope.item.tglBerlakuAkhir,
"tglBerlakuAwal": $scope.item.tglBerlakuAwal,
"tglKadaluarsaLast": $scope.item.tglKadaluarsaLast,
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
IPSRSService.getFieldListData("JenisTarif&select=id,namaExternal", true).then(function(dat){
$scope.listjenistarif= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("KomponenHarga&select=id,namaExternal", true).then(function(dat){
$scope.listkomponenharga= dat.data;
});
IPSRSService.getFieldListData("MataUang&select=id,namaExternal", true).then(function(dat){
$scope.listmatauang= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listproduk= dat.data;
});
}
]);
});

/////end
