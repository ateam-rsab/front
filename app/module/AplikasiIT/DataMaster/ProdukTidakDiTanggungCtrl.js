////header nya
initialize.controller('ProdukTidakDiTanggungCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=ProdukTidakDiTanggung", true).then(function(dat){
$scope.listDataMaster = dat.data.data.ProdukTidakDiTanggung;
                                    					
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
 columns: $scope.columnProdukTidakDiTanggung,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.asalProduk = current.asalProduk;
$scope.item.asalProdukId = current.asalProdukId;
$scope.item.kdGolonganAsuransi = current.kdGolonganAsuransi;
$scope.item.golonganAsuransiId = current.golonganAsuransiId;
$scope.item.hubunganPeserta = current.hubunganPeserta;
$scope.item.hubunganPesertaId = current.hubunganPesertaId;
$scope.item.kelas = current.kelas;
$scope.item.kelasId = current.kelasId;
$scope.item.kelasSelisihBerlaku = current.kelasSelisihBerlaku;
$scope.item.kelasSelisihBerlakuId = current.kelasSelisihBerlakuId;
$scope.item.kelompokPasien = current.kelompokPasien;
$scope.item.kelompokPasienId = current.kelompokPasienId;
$scope.item.kdPenjaminPasien = current.kdPenjaminPasien;
$scope.item.produk = current.produk;
$scope.item.produkId = current.produkId;
$scope.item.noUrutKelasSelisihBerlaku = current.noUrutKelasSelisihBerlaku;
$scope.item.persenTPenjamin = current.persenTPenjamin;
$scope.item.persenTPenjamindrSelisih = current.persenTPenjamindrSelisih;
$scope.item.persenTProfile = current.persenTProfile;
$scope.item.persenTProfiledrSelisih = current.persenTProfiledrSelisih;
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
 IPSRSService.getClassMaster("delete-master-table?className=ProdukTidakDiTanggung&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=ProdukTidakDiTanggung&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "ProdukTidakDiTanggung",
	"listField": {
"asalProduk": $scope.item.asalProduk,
"asalProdukId": $scope.item.asalProdukId,
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"golonganAsuransiId": $scope.item.golonganAsuransiId,
"hubunganPeserta": $scope.item.hubunganPeserta,
"hubunganPesertaId": $scope.item.hubunganPesertaId,
"kelas": $scope.item.kelas,
"kelasId": $scope.item.kelasId,
"kelasSelisihBerlaku": $scope.item.kelasSelisihBerlaku,
"kelasSelisihBerlakuId": $scope.item.kelasSelisihBerlakuId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"produk": $scope.item.produk,
"produkId": $scope.item.produkId,
"noUrutKelasSelisihBerlaku": $scope.item.noUrutKelasSelisihBerlaku,
"persenTPenjamin": $scope.item.persenTPenjamin,
"persenTPenjamindrSelisih": $scope.item.persenTPenjamindrSelisih,
"persenTProfile": $scope.item.persenTProfile,
"persenTProfiledrSelisih": $scope.item.persenTProfiledrSelisih,
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
 "class": "ProdukTidakDiTanggung",
	"listField": {
"asalProduk": $scope.item.asalProduk,
"asalProdukId": $scope.item.asalProdukId,
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"golonganAsuransiId": $scope.item.golonganAsuransiId,
"hubunganPeserta": $scope.item.hubunganPeserta,
"hubunganPesertaId": $scope.item.hubunganPesertaId,
"kelas": $scope.item.kelas,
"kelasId": $scope.item.kelasId,
"kelasSelisihBerlaku": $scope.item.kelasSelisihBerlaku,
"kelasSelisihBerlakuId": $scope.item.kelasSelisihBerlakuId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"produk": $scope.item.produk,
"produkId": $scope.item.produkId,
"noUrutKelasSelisihBerlaku": $scope.item.noUrutKelasSelisihBerlaku,
"persenTPenjamin": $scope.item.persenTPenjamin,
"persenTPenjamindrSelisih": $scope.item.persenTPenjamindrSelisih,
"persenTProfile": $scope.item.persenTProfile,
"persenTProfiledrSelisih": $scope.item.persenTProfiledrSelisih,
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
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelasselisihberlaku= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listproduk= dat.data;
});
/////end
