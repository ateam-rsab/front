////header nya
define(['initialize'], function(initialize) {
	'use strict';

initialize.controller('ProdusenProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=ProdusenProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.ProdusenProduk;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
$scope.columnProdusenProduk = [
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
 columns: $scope.columnProdusenProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikr = function(currentr){
$scope.showEditr = true;
$scope.currentr = currentr;
$scope.item.departemen = currentr.departemen;
$scope.item.departemenId = currentr.departemenId;
$scope.item.negara = currentr.negara;
$scope.item.negaraId = currentr.negaraId;
$scope.item.kdProdusenProduk = currentr.kdProdusenProduk;
$scope.item.namaProdusenProduk = currentr.namaProdusenProduk;
$scope.item.qProdusenProduk = currentr.qProdusenProduk;
$scope.item.id = currentr.id;
$scope.item.noRec = currentr.noRec;
$scope.item.reportDisplay = currentr.reportDisplay;
$scope.item.kodeExternal = currentr.kodeExternal;
$scope.item.namaExternal = currentr.namaExternal;
$scope.item.statusEnabled = currentr.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=ProdusenProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=ProdusenProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "ProdusenProduk",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"negara": $scope.item.negara,
"negaraId": $scope.item.negaraId,
"kdProdusenProduk": $scope.item.kdProdusenProduk,
"namaProdusenProduk": $scope.item.namaProdusenProduk,
"qProdusenProduk": $scope.item.qProdusenProduk,
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
 "class": "ProdusenProduk",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"negara": $scope.item.negara,
"negaraId": $scope.item.negaraId,
"kdProdusenProduk": $scope.item.kdProdusenProduk,
"namaProdusenProduk": $scope.item.namaProdusenProduk,
"qProdusenProduk": $scope.item.qProdusenProduk,
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
IPSRSService.getFieldListData("Negara&select=id,namaExternal", true).then(function(dat){
$scope.listnegara= dat.data;
});
/////end
}
]);
});