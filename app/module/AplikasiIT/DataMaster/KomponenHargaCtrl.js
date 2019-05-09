////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KomponenHargaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenHarga", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KomponenHarga;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnKomponenHarga = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "golonganProduk",
				"title": "golongan Produk"
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
				"field": "kdGolonganProduk",
				"title": "kd Golongan Produk"
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
				"field": "qGolonganProduk",
				"title": "q Golongan Produk"
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
 columns: $scope.columnKomponenHarga,
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
$scope.item.jenisKomponenHarga = current.jenisKomponenHarga;
$scope.item.jenisKomponenHargaId = current.jenisKomponenHargaId;
$scope.item.kdKomponenHarga = current.kdKomponenHarga;
$scope.item.produkPK = current.produkPK;
$scope.item.produkPKId = current.produkPKId;
$scope.item.komponenHarga = current.komponenHarga;
$scope.item.nilaiNormal = current.nilaiNormal;
$scope.item.noUrut = current.noUrut;
$scope.item.qKomponenHarga = current.qKomponenHarga;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenHarga&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenHarga&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "KomponenHarga",
	"listField": {
"departemen": $scope.item.departemen,

"jenisKomponenHarga": $scope.item.jenisKomponenHarga,

"kdKomponenHarga": $scope.item.kdKomponenHarga,
"produkPK": $scope.item.produkPK,

"komponenHarga": $scope.item.komponenHarga,
"nilaiNormal": $scope.item.nilaiNormal,
"noUrut": $scope.item.noUrut,
"qKomponenHarga": $scope.item.qKomponenHarga,
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
 "class": "KomponenHarga",
	"listField": {
"departemen": $scope.item.departemen,

"jenisKomponenHarga": $scope.item.jenisKomponenHarga,

"kdKomponenHarga": $scope.item.kdKomponenHarga,
"produkPK": $scope.item.produkPK,

"komponenHarga": $scope.item.komponenHarga,
"nilaiNormal": $scope.item.nilaiNormal,
"noUrut": $scope.item.noUrut,
"qKomponenHarga": $scope.item.qKomponenHarga,
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
IPSRSService.getFieldListData("JenisKomponenHarga&select=id,jenisKomponenHarga", true).then(function(dat){
$scope.listjeniskomponenharga= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaProduk", true).then(function(dat){
$scope.listprodukpk= dat.data;
});
/////end
}
		]);
});

