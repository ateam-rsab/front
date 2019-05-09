define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisPemeriksaanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPemeriksaan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisPemeriksaan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnJenisPemeriksaan = [
{
"field": "No",
"title": "No"
},
{
"field": "name",
"title": "name"
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
 columns: $scope.columnJenisPemeriksaan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.name = current.name;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPemeriksaan&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPemeriksaan&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "JenisPemeriksaan",
	"listField": {
"name": $scope.item.name,
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
 "class": "JenisPemeriksaan",
	"listField": {
"name": $scope.item.name,
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

var initv = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPemeriksaan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisPemeriksaan;
                                    					
$scope.dataSourcev = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initv();



$scope.columnJenisPemeriksaan = [
{
"field": "No",
"title": "No"
},
{
"field": "name",
"title": "name"
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
	"template" : "<button class='btnEdit' ng-click='enableDatav()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatav()'>Disable</button>"
}
];
$scope.mainGridOptionsv = { 
 pageable: true,
 columns: $scope.columnJenisPemeriksaan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikv = function(currentv){
$scope.showEditv = true;
$scope.currentv = currentv;
$scope.item.name = currentv.name;
$scope.item.id = currentv.id;
$scope.item.noRec = currentv.noRec;
$scope.item.reportDisplay = currentv.reportDisplay;
$scope.item.kodeExternal = currentv.kodeExternal;
$scope.item.namaExternal = currentv.namaExternal;
$scope.item.statusEnabled = currentv.statusEnabled;
};
$scope.disableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPemeriksaan&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 initv();
 });
 };
$scope.enableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPemeriksaan&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 initv();

	});
};
//// save 
$scope.tambahv = function()
 {
var data = {
	"class": "JenisPemeriksaan",
	"listField": {
"name": $scope.item.name,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initv();
$scope.item = {};
 });
  }
////edit
 $scope.editv = function()
  {	
   var data = {
 "class": "JenisPemeriksaan",
	"listField": {
"name": $scope.item.name,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initv();
});
}
$scope.batalv = function () {
$scope.showEditv = false;
$scope.item = {};
}






















	}
		]);
});