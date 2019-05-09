define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('CssdSetAlatCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=CssdSetAlat", true).then(function(dat){
$scope.listDataMaster = dat.data.data.CssdSetAlat;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnCssdSetAlat = [
{
"field": "No",
"title": "No"
},
{
"field": "serialVersionUID",
"title": "serial Version UID"
},
{
"field": "paket",
"title": "paket"
},
{
"field": "paketId",
"title": "paket Id"
},
{
"field": "cssdAlat",
"title": "cssd Alat"
},
{
"field": "cssdBmhp",
"title": "cssd Bmhp"
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
 columns: $scope.columnCssdSetAlat,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.serialVersionUID = current.serialVersionUID;
$scope.item.paket = current.paket;
$scope.item.paketId = current.paketId;
$scope.item.cssdAlat = current.cssdAlat;
$scope.item.cssdBmhp = current.cssdBmhp;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=CssdSetAlat&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=CssdSetAlat&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "CssdSetAlat",
	"listField": {
"serialVersionUID": $scope.item.serialVersionUID,
"paket": $scope.item.paket,
"paketId": $scope.item.paketId,
"cssdAlat": $scope.item.cssdAlat,
"cssdBmhp": $scope.item.cssdBmhp,
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
 "class": "CssdSetAlat",
	"listField": {
"serialVersionUID": $scope.item.serialVersionUID,
"paket": $scope.item.paket,
"paketId": $scope.item.paketId,
"cssdAlat": $scope.item.cssdAlat,
"cssdBmhp": $scope.item.cssdBmhp,
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
IPSRSService.getFieldListData("Paket&select=id,namaExternal", true).then(function(dat){
$scope.listpaket= dat.data;
});
IPSRSService.getFieldListData("Set&select=id,namaExternal", true).then(function(dat){
$scope.listcssdalat= dat.data;
});
IPSRSService.getFieldListData("Set&select=id,namaExternal", true).then(function(dat){
$scope.listcssdbmhp= dat.data;
});
}
]);
});