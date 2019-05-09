define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MapPegawaiToObjekPajakCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapPegawaiToObjekPajak", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapPegawaiToObjekPajak;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnMapPegawaiToObjekPajak = [
{
"field": "No",
"title": "No"
},
{
"field": "objekPajak",
"title": "objek Pajak"
},
{
"field": "objekPajakId",
"title": "objek Pajak Id"
},
{
"field": "pegawai",
"title": "pegawai"
},
{
"field": "pegawaiId",
"title": "pegawai Id"
},
{
"field": "range",
"title": "range"
},
{
"field": "rangeId",
"title": "range Id"
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
 columns: $scope.columnMapPegawaiToObjekPajak,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.objekPajak = current.objekPajak;
$scope.item.objekPajakId = current.objekPajakId;
$scope.item.pegawai = current.pegawai;
$scope.item.pegawaiId = current.pegawaiId;
$scope.item.range = current.range;
$scope.item.rangeId = current.rangeId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapPegawaiToObjekPajak&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapPegawaiToObjekPajak&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
 	debugger;
var data = {
	"class": "MapPegawaiToObjekPajak",
	"listField": {
"objekPajak": $scope.item.objekPajak,
"objekPajakId": $scope.item.objekPajakId,
"pegawai": $scope.item.pegawai,
"pegawaiId": $scope.item.pegawaiId,
"range": $scope.item.range,
"rangeId": $scope.item.rangeId,
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
 "class": "MapPegawaiToObjekPajak",
	"listField": {
"objekPajak": $scope.item.objekPajak,
"objekPajakId": $scope.item.objekPajakId,
"pegawai": $scope.item.pegawai,
"pegawaiId": $scope.item.pegawaiId,
"range": $scope.item.range,
"rangeId": $scope.item.rangeId,
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
IPSRSService.getFieldListData("ObjekPajak&select=id,namaExternal", true).then(function(dat){
$scope.listobjekpajak= dat.data;
});
IPSRSService.getFieldListData("LoginUser&select=id,namaExternal", true).then(function(dat){
$scope.listpegawai= dat.data;
});
IPSRSService.getFieldListData("Range&select=id,namaExternal", true).then(function(dat){
$scope.listrange= dat.data;
});
}
]);
});