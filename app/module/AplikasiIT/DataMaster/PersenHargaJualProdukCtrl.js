////header nya
initialize.controller('PersenHargaJualProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PersenHargaJualProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PersenHargaJualProduk;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
,
{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnPersenHargaJualProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisHargaNetto = current.jenisHargaNetto;
$scope.item.asalProduk = current.asalProduk;
$scope.item.asalProdukId = current.asalProdukId;
$scope.item.jenisTransaksi = current.jenisTransaksi;
$scope.item.jenisTransaksiId = current.jenisTransaksiId;
$scope.item.kelas = current.kelas;
$scope.item.kelasId = current.kelasId;
$scope.item.kelasPembanding = current.kelasPembanding;
$scope.item.kelasPembandingId = current.kelasPembandingId;
$scope.item.kelasTarif = current.kelasTarif;
$scope.item.kelasTarifId = current.kelasTarifId;
$scope.item.kelompokPasien = current.kelompokPasien;
$scope.item.kelompokPasienId = current.kelompokPasienId;
$scope.item.kdPenjaminPasien = current.kdPenjaminPasien;
$scope.item.range = current.range;
$scope.item.rangeId = current.rangeId;
$scope.item.persenUpHargaSatuan = current.persenUpHargaSatuan;
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
 IPSRSService.getClassMaster("delete-master-table?className=PersenHargaJualProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PersenHargaJualProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "PersenHargaJualProduk",
	"listField": {
"jenisHargaNetto": $scope.item.jenisHargaNetto,
"asalProduk": $scope.item.asalProduk,
"asalProdukId": $scope.item.asalProdukId,
"jenisTransaksi": $scope.item.jenisTransaksi,
"jenisTransaksiId": $scope.item.jenisTransaksiId,
"kelas": $scope.item.kelas,
"kelasId": $scope.item.kelasId,
"kelasPembanding": $scope.item.kelasPembanding,
"kelasPembandingId": $scope.item.kelasPembandingId,
"kelasTarif": $scope.item.kelasTarif,
"kelasTarifId": $scope.item.kelasTarifId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"range": $scope.item.range,
"rangeId": $scope.item.rangeId,
"persenUpHargaSatuan": $scope.item.persenUpHargaSatuan,
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
 "class": "PersenHargaJualProduk",
	"listField": {
"jenisHargaNetto": $scope.item.jenisHargaNetto,
"asalProduk": $scope.item.asalProduk,
"asalProdukId": $scope.item.asalProdukId,
"jenisTransaksi": $scope.item.jenisTransaksi,
"jenisTransaksiId": $scope.item.jenisTransaksiId,
"kelas": $scope.item.kelas,
"kelasId": $scope.item.kelasId,
"kelasPembanding": $scope.item.kelasPembanding,
"kelasPembandingId": $scope.item.kelasPembandingId,
"kelasTarif": $scope.item.kelasTarif,
"kelasTarifId": $scope.item.kelasTarifId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"range": $scope.item.range,
"rangeId": $scope.item.rangeId,
"persenUpHargaSatuan": $scope.item.persenUpHargaSatuan,
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
IPSRSService.getFieldListData("JenisTransaksi&select=id,namaExternal", true).then(function(dat){
$scope.listjenistransaksi= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelaspembanding= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelastarif= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});
IPSRSService.getFieldListData("Range&select=id,namaExternal", true).then(function(dat){
$scope.listrange= dat.data;
});
/////end
