////header nya

define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('StatusProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=StatusProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.StatusProduk;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();



///colom tabel
$scope.columnStatusProduk = [
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
$scope.mainGridOptionsx = { 
 pageable: true,
 columns: $scope.columnStatusProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.departemen = currentx.departemen;
$scope.item.departemenId = currentx.departemenId;
$scope.item.kelompokProduk = currentx.kelompokProduk;
$scope.item.kelompokProdukId = currentx.kelompokProdukId;
$scope.item.kdStatusProduk = currentx.kdStatusProduk;
$scope.item.qStatusProduk = currentx.qStatusProduk;
$scope.item.statusProduk = currentx.statusProduk;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};

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
 IPSRSService.getClassMaster("delete-master-table?className=StatusProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initx();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=StatusProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initx();

	});
};
//// save 
$scope.tambahx = function()
 {
var data = {
	"class": "StatusProduk",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"kdStatusProduk": $scope.item.kdStatusProduk,
"qStatusProduk": $scope.item.qStatusProduk,
"statusProduk": $scope.item.statusProduk,
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
 "class": "StatusProduk",
	"listField": {
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"kdStatusProduk": $scope.item.kdStatusProduk,
"qStatusProduk": $scope.item.qStatusProduk,
"statusProduk": $scope.item.statusProduk,
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
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
$scope.listkelompokProduk= dat.data;
});
/////end
 }
]);
});