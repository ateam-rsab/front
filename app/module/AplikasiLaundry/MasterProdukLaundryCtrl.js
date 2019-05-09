define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MasterProdukLaundryCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Produk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Produk;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnProduk = [
{
"field": "No",
"title": "No"
},
{
"field": "produkDetail",
"title": "produk Detail"
},
{
"field": "bahanSample",
"title": "bahan Sample"
},
{
"field": "bahanSampleId",
"title": "bahan Sample Id"
},
{
"field": "deskripsiProduk",
"title": "deskripsi Produk"
},
{
"field": "isProdukIntern",
"title": "is Produk Intern"
},
{
"field": "account",
"title": "account"
},
{
"field": "accountId",
"title": "account Id"
},
{
"field": "bahanProduk",
"title": "bahan Produk"
},
{
"field": "bahanProdukId",
"title": "bahan Produk Id"
},
{
"field": "keterangan",
"title": "keterangan"
},
{
"field": "kdBarcode",
"title": "kd Barcode"
},
{
"field": "bentukProduk",
"title": "bentuk Produk"
},
{
"field": "bentukProdukId",
"title": "bentuk Produk Id"
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
"field": "detailGolonganProduk",
"title": "detail Golongan Produk"
},
{
"field": "detailGolonganProdukId",
"title": "detail Golongan Produk Id"
},
{
"field": "detailJenisProduk",
"title": "detail Jenis Produk"
},
{
"field": "detailJenisProdukId",
"title": "detail Jenis Produk Id"
},
{
"field": "fungsiProduk",
"title": "fungsi Produk"
},
{
"field": "fungsiProdukId",
"title": "fungsi Produk Id"
},
{
"field": "golonganProduk",
"title": "golongan Produk"
},
{
"field": "golonganProdukId",
"title": "golongan Produk Id"
},
{
"field": "gProduk",
"title": "g Produk"
},
{
"field": "gProdukId",
"title": "g Produk Id"
},
{
"field": "jenisPeriksaPenunjang",
"title": "jenis Periksa Penunjang"
},
{
"field": "jenisPeriksaPenunjangId",
"title": "jenis Periksa Penunjang Id"
},
{
"field": "kategoryProduk",
"title": "kategory Produk"
},
{
"field": "kategoryProdukId",
"title": "kategory Produk Id"
},
{
"field": "levelProduk",
"title": "level Produk"
},
{
"field": "levelProdukId",
"title": "level Produk Id"
},
{
"field": "kdProduk",
"title": "kd Produk"
},
{
"field": "spesifikasi",
"title": "spesifikasi"
},
{
"field": "kodeBmn",
"title": "kode Bmn"
},
{
"field": "kdProdukIntern",
"title": "kd Produk Intern"
},
{
"field": "produsenProduk",
"title": "produsen Produk"
},
{
"field": "produsenProdukId",
"title": "produsen Produk Id"
},
{
"field": "satuanBesar",
"title": "satuan Besar"
},
{
"field": "satuanBesarId",
"title": "satuan Besar Id"
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
"field": "satuanStandar",
"title": "satuan Standar"
},
{
"field": "satuanStandarId",
"title": "satuan Standar Id"
},
{
"field": "statusProduk",
"title": "status Produk"
},
{
"field": "statusProdukId",
"title": "status Produk Id"
},
{
"field": "typeProduk",
"title": "type Produk"
},
{
"field": "typeProdukId",
"title": "type Produk Id"
},
{
"field": "unitLaporan",
"title": "unit Laporan"
},
{
"field": "unitLaporanId",
"title": "unit Laporan Id"
},
{
"field": "warnaProduk",
"title": "warna Produk"
},
{
"field": "warnaProdukId",
"title": "warna Produk Id"
},
{
"field": "kekuatan",
"title": "kekuatan"
},
{
"field": "namaProduk",
"title": "nama Produk"
},
{
"field": "nilaiNormal",
"title": "nilai Normal"
},
{
"field": "qProduk",
"title": "q Produk"
},
{
"field": "qtyJualTerkecil",
"title": "qty Jual Terkecil"
},
{
"field": "qtyKalori",
"title": "qty Kalori"
},
{
"field": "qtyKarbohidrat",
"title": "qty Karbohidrat"
},
{
"field": "qtyLemak",
"title": "qty Lemak"
},
{
"field": "qtyPorsi",
"title": "qty Porsi"
},
{
"field": "qtyProtein",
"title": "qty Protein"
},
{
"field": "qtySatuKemasan",
"title": "qty Satu Kemasan"
},
{
"field": "qtyTerkecil",
"title": "qty Terkecil"
},
{
"field": "tglProduksi",
"title": "tgl Produksi"
},
{
"field": "generik",
"title": "generik"
},
{
"field": "generikId",
"title": "generik Id"
},
{
"field": "sediaan",
"title": "sediaan"
},
{
"field": "sediaanId",
"title": "sediaan Id"
},
{
"field": "detailObat",
"title": "detail Obat"
},
{
"field": "detailObatId",
"title": "detail Obat Id"
},
{
"field": "statusBarang",
"title": "status Barang"
},
{
"field": "statusBarangId",
"title": "status Barang Id"
},
{
"field": "rekanan",
"title": "rekanan"
},
{
"field": "rekananId",
"title": "rekanan Id"
},
{
"field": "merkProduk",
"title": "merk Produk"
},
{
"field": "golonganDarah",
"title": "golongan Darah"
},
{
"field": "golonganDarahId",
"title": "golongan Darah Id"
},
{
"field": "rhesus",
"title": "rhesus"
},
{
"field": "rhesusId",
"title": "rhesus Id"
},
{
"field": "merkProdukId",
"title": "merk Produk Id"
},
{
"field": "status",
"title": "status"
},
{
"field": "verifikasiAnggaran",
"title": "verifikasi Anggaran"
},
{
"field": "isNarkotika",
"title": "is Narkotika"
},
{
"field": "isPsikotropika",
"title": "is Psikotropika"
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
 columns: $scope.columnProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.produkDetail = current.produkDetail;
$scope.item.bahanSample = current.bahanSample;
$scope.item.bahanSampleId = current.bahanSampleId;
$scope.item.deskripsiProduk = current.deskripsiProduk;
$scope.item.isProdukIntern = current.isProdukIntern;
$scope.item.account = current.account;
$scope.item.accountId = current.accountId;
$scope.item.bahanProduk = current.bahanProduk;
$scope.item.bahanProdukId = current.bahanProdukId;
$scope.item.keterangan = current.keterangan;
$scope.item.kdBarcode = current.kdBarcode;
$scope.item.bentukProduk = current.bentukProduk;
$scope.item.bentukProdukId = current.bentukProdukId;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.detailGolonganProduk = current.detailGolonganProduk;
$scope.item.detailGolonganProdukId = current.detailGolonganProdukId;
$scope.item.detailJenisProduk = current.detailJenisProduk;
$scope.item.detailJenisProdukId = current.detailJenisProdukId;
$scope.item.fungsiProduk = current.fungsiProduk;
$scope.item.fungsiProdukId = current.fungsiProdukId;
$scope.item.golonganProduk = current.golonganProduk;
$scope.item.golonganProdukId = current.golonganProdukId;
$scope.item.gProduk = current.gProduk;
$scope.item.gProdukId = current.gProdukId;
$scope.item.jenisPeriksaPenunjang = current.jenisPeriksaPenunjang;
$scope.item.jenisPeriksaPenunjangId = current.jenisPeriksaPenunjangId;
$scope.item.kategoryProduk = current.kategoryProduk;
$scope.item.kategoryProdukId = current.kategoryProdukId;
$scope.item.levelProduk = current.levelProduk;
$scope.item.levelProdukId = current.levelProdukId;
$scope.item.kdProduk = current.kdProduk;
$scope.item.spesifikasi = current.spesifikasi;
$scope.item.kodeBmn = current.kodeBmn;
$scope.item.kdProdukIntern = current.kdProdukIntern;
$scope.item.produsenProduk = current.produsenProduk;
$scope.item.produsenProdukId = current.produsenProdukId;
$scope.item.satuanBesar = current.satuanBesar;
$scope.item.satuanBesarId = current.satuanBesarId;
$scope.item.satuanKecil = current.satuanKecil;
$scope.item.satuanKecilId = current.satuanKecilId;
$scope.item.satuanStandar = current.satuanStandar;
$scope.item.satuanStandarId = current.satuanStandarId;
$scope.item.statusProduk = current.statusProduk;
$scope.item.statusProdukId = current.statusProdukId;
$scope.item.typeProduk = current.typeProduk;
$scope.item.typeProdukId = current.typeProdukId;
$scope.item.unitLaporan = current.unitLaporan;
$scope.item.unitLaporanId = current.unitLaporanId;
$scope.item.warnaProduk = current.warnaProduk;
$scope.item.warnaProdukId = current.warnaProdukId;
$scope.item.kekuatan = current.kekuatan;
$scope.item.namaProduk = current.namaProduk;
$scope.item.nilaiNormal = current.nilaiNormal;
$scope.item.qProduk = current.qProduk;
$scope.item.qtyJualTerkecil = current.qtyJualTerkecil;
$scope.item.qtyKalori = current.qtyKalori;
$scope.item.qtyKarbohidrat = current.qtyKarbohidrat;
$scope.item.qtyLemak = current.qtyLemak;
$scope.item.qtyPorsi = current.qtyPorsi;
$scope.item.qtyProtein = current.qtyProtein;
$scope.item.qtySatuKemasan = current.qtySatuKemasan;
$scope.item.qtyTerkecil = current.qtyTerkecil;
$scope.item.tglProduksi = current.tglProduksi;
$scope.item.generik = current.generik;
$scope.item.generikId = current.generikId;
$scope.item.sediaan = current.sediaan;
$scope.item.sediaanId = current.sediaanId;
$scope.item.detailObat = current.detailObat;
$scope.item.detailObatId = current.detailObatId;
$scope.item.statusBarang = current.statusBarang;
$scope.item.statusBarangId = current.statusBarangId;
$scope.item.rekanan = current.rekanan;
$scope.item.rekananId = current.rekananId;
$scope.item.merkProduk = current.merkProduk;
$scope.item.golonganDarah = current.golonganDarah;
$scope.item.golonganDarahId = current.golonganDarahId;
$scope.item.rhesus = current.rhesus;
$scope.item.rhesusId = current.rhesusId;
$scope.item.merkProdukId = current.merkProdukId;
$scope.item.status = current.status;
$scope.item.verifikasiAnggaran = current.verifikasiAnggaran;
$scope.item.isNarkotika = current.isNarkotika;
$scope.item.isPsikotropika = current.isPsikotropika;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Produk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Produk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "Produk",
	"listField": {
"produkDetail": $scope.item.produkDetail,
"bahanSample": $scope.item.bahanSample,

"deskripsiProduk": $scope.item.deskripsiProduk,
"isProdukIntern": $scope.item.isProdukIntern,
"account": $scope.item.account,

"bahanProduk": $scope.item.bahanProduk,

"keterangan": $scope.item.keterangan,
"kdBarcode": $scope.item.kdBarcode,
"bentukProduk": $scope.item.bentukProduk,

"departemen": $scope.item.departemen,

"detailGolonganProduk": $scope.item.detailGolonganProduk,

"detailJenisProduk": $scope.item.detailJenisProduk,

"fungsiProduk": $scope.item.fungsiProduk,

"golonganProduk": $scope.item.golonganProduk,

"gProduk": $scope.item.gProduk,

"jenisPeriksaPenunjang": $scope.item.jenisPeriksaPenunjang,

"kategoryProduk": $scope.item.kategoryProduk,

"levelProduk": $scope.item.levelProduk,

"kdProduk": $scope.item.kdProduk,
"spesifikasi": $scope.item.spesifikasi,
"kodeBmn": $scope.item.kodeBmn,
"kdProdukIntern": $scope.item.kdProdukIntern,
"produsenProduk": $scope.item.produsenProduk,

"satuanBesar": $scope.item.satuanBesar,

"satuanKecil": $scope.item.satuanKecil,

"satuanStandar": $scope.item.satuanStandar,

"statusProduk": $scope.item.statusProduk,

"typeProduk": $scope.item.typeProduk,

"unitLaporan": $scope.item.unitLaporan,

"warnaProduk": $scope.item.warnaProduk,

"kekuatan": $scope.item.kekuatan,
"namaProduk": $scope.item.namaProduk,
"nilaiNormal": $scope.item.nilaiNormal,
"qProduk": $scope.item.qProduk,
"qtyJualTerkecil": $scope.item.qtyJualTerkecil,
"qtyKalori": $scope.item.qtyKalori,
"qtyKarbohidrat": $scope.item.qtyKarbohidrat,
"qtyLemak": $scope.item.qtyLemak,
"qtyPorsi": $scope.item.qtyPorsi,
"qtyProtein": $scope.item.qtyProtein,
"qtySatuKemasan": $scope.item.qtySatuKemasan,
"qtyTerkecil": $scope.item.qtyTerkecil,
"tglProduksi": $scope.item.tglProduksi,
"generik": $scope.item.generik,

"sediaan": $scope.item.sediaan,

"detailObat": $scope.item.detailObat,

"statusBarang": $scope.item.statusBarang,

"rekanan": $scope.item.rekanan,

"merkProduk": $scope.item.merkProduk,
"golonganDarah": $scope.item.golonganDarah,

"rhesus": $scope.item.rhesus,


"status": $scope.item.status,
"verifikasiAnggaran": $scope.item.verifikasiAnggaran,
"isNarkotika": $scope.item.isNarkotika,
"isPsikotropika": $scope.item.isPsikotropika,
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
 "class": "Produk",
	"listField": {
"produkDetail": $scope.item.produkDetail,
"bahanSample": $scope.item.bahanSample,

"deskripsiProduk": $scope.item.deskripsiProduk,
"isProdukIntern": $scope.item.isProdukIntern,
"account": $scope.item.account,

"bahanProduk": $scope.item.bahanProduk,

"keterangan": $scope.item.keterangan,
"kdBarcode": $scope.item.kdBarcode,
"bentukProduk": $scope.item.bentukProduk,

"departemen": $scope.item.departemen,

"detailGolonganProduk": $scope.item.detailGolonganProduk,

"detailJenisProduk": $scope.item.detailJenisProduk,

"fungsiProduk": $scope.item.fungsiProduk,

"golonganProduk": $scope.item.golonganProduk,

"gProduk": $scope.item.gProduk,

"jenisPeriksaPenunjang": $scope.item.jenisPeriksaPenunjang,

"kategoryProduk": $scope.item.kategoryProduk,

"levelProduk": $scope.item.levelProduk,

"kdProduk": $scope.item.kdProduk,
"spesifikasi": $scope.item.spesifikasi,
"kodeBmn": $scope.item.kodeBmn,
"kdProdukIntern": $scope.item.kdProdukIntern,
"produsenProduk": $scope.item.produsenProduk,

"satuanBesar": $scope.item.satuanBesar,

"satuanKecil": $scope.item.satuanKecil,

"satuanStandar": $scope.item.satuanStandar,

"statusProduk": $scope.item.statusProduk,

"typeProduk": $scope.item.typeProduk,

"unitLaporan": $scope.item.unitLaporan,

"warnaProduk": $scope.item.warnaProduk,

"kekuatan": $scope.item.kekuatan,
"namaProduk": $scope.item.namaProduk,
"nilaiNormal": $scope.item.nilaiNormal,
"qProduk": $scope.item.qProduk,
"qtyJualTerkecil": $scope.item.qtyJualTerkecil,
"qtyKalori": $scope.item.qtyKalori,
"qtyKarbohidrat": $scope.item.qtyKarbohidrat,
"qtyLemak": $scope.item.qtyLemak,
"qtyPorsi": $scope.item.qtyPorsi,
"qtyProtein": $scope.item.qtyProtein,
"qtySatuKemasan": $scope.item.qtySatuKemasan,
"qtyTerkecil": $scope.item.qtyTerkecil,
"tglProduksi": $scope.item.tglProduksi,
"generik": $scope.item.generik,

"sediaan": $scope.item.sediaan,

"detailObat": $scope.item.detailObat,

"statusBarang": $scope.item.statusBarang,

"rekanan": $scope.item.rekanan,

"merkProduk": $scope.item.merkProduk,
"golonganDarah": $scope.item.golonganDarah,

"rhesus": $scope.item.rhesus,


"status": $scope.item.status,
"verifikasiAnggaran": $scope.item.verifikasiAnggaran,
"isNarkotika": $scope.item.isNarkotika,
"isPsikotropika": $scope.item.isPsikotropika,
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
IPSRSService.getFieldListData("Set&select=id,namaExternal", true).then(function(dat){
$scope.listprodukdetail= dat.data;
});
IPSRSService.getFieldListData("BahanSample&select=id,namaExternal", true).then(function(dat){
$scope.listbahansample= dat.data;
});
IPSRSService.getFieldListData("ChartOfAccount&select=id,namaExternal", true).then(function(dat){
$scope.listaccount= dat.data;
});
IPSRSService.getFieldListData("BahanProduk&select=id,namaExternal", true).then(function(dat){
$scope.listbahanproduk= dat.data;
});
IPSRSService.getFieldListData("BentukProduk&select=id,namaExternal", true).then(function(dat){
$scope.listbentukproduk= dat.data;
});
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("DetailGolonganProduk&select=id,namaExternal", true).then(function(dat){
$scope.listdetailgolonganproduk= dat.data;
});
IPSRSService.getFieldListData("DetailJenisProduk&select=id,namaExternal", true).then(function(dat){
$scope.listdetailjenisproduk= dat.data;
});
IPSRSService.getFieldListData("FungsiProduk&select=id,namaExternal", true).then(function(dat){
$scope.listfungsiproduk= dat.data;
});
IPSRSService.getFieldListData("GolonganProduk&select=id,namaExternal", true).then(function(dat){
$scope.listgolonganproduk= dat.data;
});
IPSRSService.getFieldListData("GeneralProduk&select=id,namaExternal", true).then(function(dat){
$scope.listgproduk= dat.data;
});
IPSRSService.getFieldListData("JenisPeriksaPenunjang&select=id,namaExternal", true).then(function(dat){
$scope.listjenisperiksapenunjang= dat.data;
});
IPSRSService.getFieldListData("KategoryProduk&select=id,namaExternal", true).then(function(dat){
$scope.listkategoryproduk= dat.data;
});
IPSRSService.getFieldListData("LevelProduk&select=id,namaExternal", true).then(function(dat){
$scope.listlevelproduk= dat.data;
});
IPSRSService.getFieldListData("ProdusenProduk&select=id,namaExternal", true).then(function(dat){
$scope.listprodusenproduk= dat.data;
});
IPSRSService.getFieldListData("SatuanBesar&select=id,namaExternal", true).then(function(dat){
$scope.listsatuanbesar= dat.data;
});
IPSRSService.getFieldListData("SatuanKecil&select=id,namaExternal", true).then(function(dat){
$scope.listsatuankecil= dat.data;
});
IPSRSService.getFieldListData("SatuanStandar&select=id,namaExternal", true).then(function(dat){
$scope.listsatuanstandar= dat.data;
});
IPSRSService.getFieldListData("StatusProduk&select=id,namaExternal", true).then(function(dat){
$scope.liststatusproduk= dat.data;
});
IPSRSService.getFieldListData("TypeProduk&select=id,namaExternal", true).then(function(dat){
$scope.listtypeproduk= dat.data;
});
IPSRSService.getFieldListData("UnitLaporan&select=id,namaExternal", true).then(function(dat){
$scope.listunitlaporan= dat.data;
});
IPSRSService.getFieldListData("WarnaProduk&select=id,namaExternal", true).then(function(dat){
$scope.listwarnaproduk= dat.data;
});
IPSRSService.getFieldListData("Generik&select=id,namaExternal", true).then(function(dat){
$scope.listgenerik= dat.data;
});
IPSRSService.getFieldListData("Sediaan&select=id,namaExternal", true).then(function(dat){
$scope.listsediaan= dat.data;
});
IPSRSService.getFieldListData("DetailObat&select=id,namaExternal", true).then(function(dat){
$scope.listdetailobat= dat.data;
});
IPSRSService.getFieldListData("StatusBarang&select=id,namaExternal", true).then(function(dat){
$scope.liststatusbarang= dat.data;
});
IPSRSService.getFieldListData("Rekanan&select=id,namaExternal", true).then(function(dat){
$scope.listrekanan= dat.data;
});
IPSRSService.getFieldListData("MerkProduk&select=id,namaExternal", true).then(function(dat){
$scope.listmerkproduk= dat.data;
});
IPSRSService.getFieldListData("GolonganDarah&select=id,namaExternal", true).then(function(dat){
$scope.listgolongandarah= dat.data;
});
IPSRSService.getFieldListData("Rhesus&select=id,namaExternal", true).then(function(dat){
$scope.listrhesus= dat.data;
});
}
		]);
});
