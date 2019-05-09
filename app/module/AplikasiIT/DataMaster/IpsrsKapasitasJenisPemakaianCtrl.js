define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('IpsrsKapasitasJenisPemakaianCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=IpsrsKapasitasJenisPemakaian", true).then(function(dat){
$scope.listDataMaster = dat.data.data.IpsrsKapasitasJenisPemakaian;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnIpsrsKapasitasJenisPemakaian = [
{
"field": "No",
"title": "No"
},
{
"field": "ipsrsJenisPemakaian",
"title": "ipsrs Jenis Pemakaian"
},
{
"field": "ipsrsJenisPemakaianId",
"title": "ipsrs Jenis Pemakaian Id"
},
{
"field": "produk",
"title": "produk"
},
{
"field": "produkId",
"title": "produk Id"
},
{
"field": "satuan",
"title": "satuan"
},
{
"field": "kapasitas",
"title": "kapasitas"
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
 columns: $scope.columnIpsrsKapasitasJenisPemakaian,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.ipsrsJenisPemakaian = current.ipsrsJenisPemakaian;
$scope.item.ipsrsJenisPemakaianId = current.ipsrsJenisPemakaianId;
$scope.item.produk = current.produk;
$scope.item.produkId = current.produkId;
$scope.item.satuan = current.satuan;
$scope.item.kapasitas = current.kapasitas;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=IpsrsKapasitasJenisPemakaian&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=IpsrsKapasitasJenisPemakaian&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "IpsrsKapasitasJenisPemakaian",
	"listField": {
"ipsrsJenisPemakaian": $scope.item.ipsrsJenisPemakaian,

"produk": $scope.item.produk,

"satuan": $scope.item.satuan,
"kapasitas": $scope.item.kapasitas,
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
 "class": "IpsrsKapasitasJenisPemakaian",
	"listField": {
"ipsrsJenisPemakaian": $scope.item.ipsrsJenisPemakaian,

"produk": $scope.item.produk,

"satuan": $scope.item.satuan,
"kapasitas": $scope.item.kapasitas,
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
IPSRSService.getFieldListData("IpsrsJenisPemakaian&select=id,namaExternal", true).then(function(dat){
$scope.listipsrsjenispemakaian= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listproduk= dat.data;
});
}
]);
});