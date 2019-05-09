define(['initialize'], function(initialize) {
'use strict';
initialize.controller('CssdKemasanPouchesCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=CssdKemasanPouches", true).then(function(dat){
$scope.listDataMaster = dat.data.data.CssdKemasanPouches;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnCssdKemasanPouches = [
{
"field": "No",
"title": "No"
},
{
"field": "cssdPenyerahanBarang",
"title": "cssd Penyerahan Barang"
},
{
"field": "cssdPenyerahanBarangId",
"title": "cssd Penyerahan Barang Id"
},
{
"field": "pouchesBs",
"title": "pouches Bs"
},
{
"field": "pouchesB",
"title": "pouches B"
},
{
"field": "pouchesS",
"title": "pouches S"
},
{
"field": "pouchesK",
"title": "pouches K"
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
 columns: $scope.columnCssdKemasanPouches,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.cssdPenyerahanBarang = current.cssdPenyerahanBarang;

$scope.item.pouchesBs = current.pouchesBs;
$scope.item.pouchesB = current.pouchesB;
$scope.item.pouchesS = current.pouchesS;
$scope.item.pouchesK = current.pouchesK;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=CssdKemasanPouches&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=CssdKemasanPouches&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "CssdKemasanPouches",
	"listField": {
"cssdPenyerahanBarang": $scope.item.cssdPenyerahanBarang,
"pouchesBs": $scope.item.pouchesBs,
"pouchesB": $scope.item.pouchesB,
"pouchesS": $scope.item.pouchesS,
"pouchesK": $scope.item.pouchesK,
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
////edit
 $scope.edit = function()
  {	
   var data = {
 "class": "CssdKemasanPouches",
	"listField": {
"cssdPenyerahanBarang": $scope.item.cssdPenyerahanBarang,

"pouchesBs": $scope.item.pouchesBs,
"pouchesB": $scope.item.pouchesB,
"pouchesS": $scope.item.pouchesS,
"pouchesK": $scope.item.pouchesK,
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
IPSRSService.getFieldListData("CssdPenyerahanBarang&select=id,namaExternal", true).then(function(dat){
$scope.listcssdpenyerahanbarang= dat.data;
});
}
]);
});