define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MapUraianToJabatanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapUraianToJabatan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapUraianToJabatan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnMapUraianToJabatan = [
{
"field": "No",
"title": "No"
},
{
"field": "uraianTugas",
"title": "uraian Tugas"
},
{
"field": "uraianTugasId",
"title": "uraian Tugas Id"
},
{
"field": "jabatan",
"title": "jabatan"
},
{
"field": "jabatanId",
"title": "jabatan Id"
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
 columns: $scope.columnMapUraianToJabatan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.uraianTugas = current.uraianTugas;
$scope.item.uraianTugasId = current.uraianTugasId;
$scope.item.jabatan = current.jabatan;
$scope.item.jabatanId = current.jabatanId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapUraianToJabatan&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapUraianToJabatan&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "MapUraianToJabatan",
	"listField": {
"uraianTugas": $scope.item.uraianTugas,
"uraianTugasId": $scope.item.uraianTugasId,
"jabatan": $scope.item.jabatan,
"jabatanId": $scope.item.jabatanId,
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
 "class": "MapUraianToJabatan",
	"listField": {
"uraianTugas": $scope.item.uraianTugas,
"uraianTugasId": $scope.item.uraianTugasId,
"jabatan": $scope.item.jabatan,
"jabatanId": $scope.item.jabatanId,
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
IPSRSService.getFieldListData("UraianTugas&select=id,namaExternal", true).then(function(dat){
$scope.listuraiantugas= dat.data;
});
IPSRSService.getFieldListData("Jabatan&select=id,namaExternal", true).then(function(dat){
$scope.listjabatan= dat.data;
});
}
		]);
});