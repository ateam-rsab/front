////header nya
define(['initialize'], function(initialize) {
	'use strict';

initialize.controller('DetailJenisProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DetailJenisProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DetailJenisProduk;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
$scope.columnDetailJenisProduk = [
{
"field": "No",
"title": "No"
},
{
"field": "detailJenisProduk",
"title": "Detail Jenis Produk"
},
{
"field": "kdDetailJenisProduk",
"title": "kd Detail Jenis Produk"
},
{
"field": "persenHargaCito",
"title": "persen Harga Cito"
},
{
"field": "id",
"title": "Id"
},
{
"field": "isRegistrasiAset",
"title": "is Registrasi Aset"
},
{
"field": "qDetailJenisProduk",
"title": "qDetailJenisProduk"
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
 columns: $scope.columnDetailJenisProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.detailJenisProduk = current.detailJenisProduk;
$scope.item.isRegistrasiAset = current.isRegistrasiAset;
$scope.item.account = current.account;

$scope.item.departemen = current.departemen;

$scope.item.kdDetailJenisProduk = current.kdDetailJenisProduk;
$scope.item.jenisProduk = current.jenisProduk;

$scope.item.persenHargaCito = current.persenHargaCito;
$scope.item.qDetailJenisProduk = current.qDetailJenisProduk;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DetailJenisProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DetailJenisProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "DetailJenisProduk",
	"listField": {
"detailJenisProduk": $scope.item.detailJenisProduk,
"isRegistrasiAset": $scope.item.isRegistrasiAset,
"account": $scope.item.account,

"departemen": $scope.item.departemen,

"kdDetailJenisProduk": $scope.item.kdDetailJenisProduk,
"jenisProduk": $scope.item.jenisProduk,

"persenHargaCito": $scope.item.persenHargaCito,
"qDetailJenisProduk": $scope.item.qDetailJenisProduk,
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
 "class": "DetailJenisProduk",
	"listField": {
"detailJenisProduk": $scope.item.detailJenisProduk,
"isRegistrasiAset": $scope.item.isRegistrasiAset,
"account": $scope.item.account,

"departemen": $scope.item.departemen,

"kdDetailJenisProduk": $scope.item.kdDetailJenisProduk,
"jenisProduk": $scope.item.jenisProduk,

"persenHargaCito": $scope.item.persenHargaCito,
"qDetailJenisProduk": $scope.item.qDetailJenisProduk,
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
IPSRSService.getFieldListData("ChartOfAccount&select=id,namaAccount", true).then(function(dat){
$scope.listaccount= dat.data;
});
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("JenisProduk&select=id,jenisProduk", true).then(function(dat){
$scope.listjenisproduk= dat.data;
});
/////end
}
]);
});