////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisTransaksiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisTransaksi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisTransaksi;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisTransaksi = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisPersenCito",
"title": "jenis Persen Cito"
},
{
"field": "jenisTransaksi",
"title": "jenis Transaksi"
},
{
"field": "kdJenisTransaksi",
"title": "kd Jenis Transaksi"
},
{
"field": "kelasDefault",
"title": "kelas Default"
},
{
"field": "kelasDefaultId",
"title": "kelas Default Id"
},
{
"field": "kelompokPelayanan",
"title": "kelompok Pelayanan"
},
{
"field": "kelompokPelayananId",
"title": "kelompok Pelayanan Id"
},
{
"field": "produkCito",
"title": "produk Cito"
},
{
"field": "produkCitoId",
"title": "produk Cito Id"
},
{
"field": "produkDeposit",
"title": "produk Deposit"
},
{
"field": "produkDepositId",
"title": "produk Deposit Id"
},
{
"field": "produkRetur",
"title": "produk Retur"
},
{
"field": "produkReturId",
"title": "produk Retur Id"
},
{
"field": "metodeAmbilHargaNetto",
"title": "metode Ambil Harga Netto"
},
{
"field": "metodeHargaNetto",
"title": "metode Harga Netto"
},
{
"field": "metodeStokHargaNetto",
"title": "metode Stok Harga Netto"
},
{
"field": "qJenisTransaksi",
"title": "q Jenis Transaksi"
},
{
"field": "sistemHargaNetto",
"title": "sistem Harga Netto"
},
{
"field": "tglBerlakuTarif",
"title": "tgl Berlaku Tarif"
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
 columns: $scope.columnJenisTransaksi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisPersenCito = current.jenisPersenCito;
$scope.item.jenisTransaksi = current.jenisTransaksi;
$scope.item.kdJenisTransaksi = current.kdJenisTransaksi;
$scope.item.kelasDefault = current.kelasDefault;
$scope.item.kelasDefaultId = current.kelasDefaultId;
$scope.item.kelompokPelayanan = current.kelompokPelayanan;
$scope.item.kelompokPelayananId = current.kelompokPelayananId;
$scope.item.produkCito = current.produkCito;
$scope.item.produkCitoId = current.produkCitoId;
$scope.item.produkDeposit = current.produkDeposit;
$scope.item.produkDepositId = current.produkDepositId;
$scope.item.produkRetur = current.produkRetur;
$scope.item.produkReturId = current.produkReturId;
$scope.item.metodeAmbilHargaNetto = current.metodeAmbilHargaNetto;
$scope.item.metodeHargaNetto = current.metodeHargaNetto;
$scope.item.metodeStokHargaNetto = current.metodeStokHargaNetto;
$scope.item.qJenisTransaksi = current.qJenisTransaksi;
$scope.item.sistemHargaNetto = current.sistemHargaNetto;
$scope.item.tglBerlakuTarif = current.tglBerlakuTarif;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisTransaksi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisTransaksi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisTransaksi",
	"listField": {
"jenisPersenCito": $scope.item.jenisPersenCito,
"jenisTransaksi": $scope.item.jenisTransaksi,
"kdJenisTransaksi": $scope.item.kdJenisTransaksi,
"kelasDefault": $scope.item.kelasDefault,
"kelasDefaultId": $scope.item.kelasDefaultId,
"kelompokPelayanan": $scope.item.kelompokPelayanan,
"kelompokPelayananId": $scope.item.kelompokPelayananId,
"produkCito": $scope.item.produkCito,
"produkCitoId": $scope.item.produkCitoId,
"produkDeposit": $scope.item.produkDeposit,
"produkDepositId": $scope.item.produkDepositId,
"produkRetur": $scope.item.produkRetur,
"produkReturId": $scope.item.produkReturId,
"metodeAmbilHargaNetto": $scope.item.metodeAmbilHargaNetto,
"metodeHargaNetto": $scope.item.metodeHargaNetto,
"metodeStokHargaNetto": $scope.item.metodeStokHargaNetto,
"qJenisTransaksi": $scope.item.qJenisTransaksi,
"sistemHargaNetto": $scope.item.sistemHargaNetto,
"tglBerlakuTarif": $scope.item.tglBerlakuTarif,
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

 $scope.edit = function()
  {	
   var data = {
 "class": "JenisTransaksi",
	"listField": {
"jenisPersenCito": $scope.item.jenisPersenCito,
"jenisTransaksi": $scope.item.jenisTransaksi,
"kdJenisTransaksi": $scope.item.kdJenisTransaksi,
"kelasDefault": $scope.item.kelasDefault,
"kelasDefaultId": $scope.item.kelasDefaultId,
"kelompokPelayanan": $scope.item.kelompokPelayanan,
"kelompokPelayananId": $scope.item.kelompokPelayananId,
"produkCito": $scope.item.produkCito,
"produkCitoId": $scope.item.produkCitoId,
"produkDeposit": $scope.item.produkDeposit,
"produkDepositId": $scope.item.produkDepositId,
"produkRetur": $scope.item.produkRetur,
"produkReturId": $scope.item.produkReturId,
"metodeAmbilHargaNetto": $scope.item.metodeAmbilHargaNetto,
"metodeHargaNetto": $scope.item.metodeHargaNetto,
"metodeStokHargaNetto": $scope.item.metodeStokHargaNetto,
"qJenisTransaksi": $scope.item.qJenisTransaksi,
"sistemHargaNetto": $scope.item.sistemHargaNetto,
"tglBerlakuTarif": $scope.item.tglBerlakuTarif,
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
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelasdefault= dat.data;
});
IPSRSService.getFieldListData("KelompokPelayanan&select=id,kelompokPelayanan", true).then(function(dat){
$scope.listkelompokpelayanan= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listprodukcito= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listprodukdeposit= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listprodukretur= dat.data;
});
}
]);
});
/////end
