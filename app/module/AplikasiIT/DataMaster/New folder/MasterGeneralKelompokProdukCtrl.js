////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MasterGeneralKelompokProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AsalProduk", true).then(function(dat){
$scope.dataSource = dat.data.data.AsalProduk;
 debugger;                                   					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.dataSource,
autoSync: true

});

});
}
init();




$scope.columnAsalProduk = [
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
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnAsalProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.asalProduk = current.asalProduk;
$scope.item.kdAsalProduk = current.kdAsalProduk;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.kelompokProduk = current.kelompokProduk;
$scope.item.kelompokProdukId = current.kelompokProdukId;
$scope.item.qAsalProduk = current.qAsalProduk;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "MapRuanganToDetailJenisProduk",
	"listField": {
"detailJenisProduk": $scope.item.detailJenisProduk,
"detailJenisProdukId": $scope.item.detailJenisProdukId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
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
 "class": "MapRuanganToDetailJenisProduk",
	"listField": {
"detailJenisProduk": $scope.item.detailJenisProduk,
"detailJenisProdukId": $scope.item.detailJenisProdukId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
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
IPSRSService.getFieldListData("DetailJenisProduk&select=id,namaExternal", true).then(function(dat){
$scope.listdetailjenisproduk= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});
}
]);
});
/////end