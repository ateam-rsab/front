define(['initialize'], function(initialize) {
'use strict';
initialize.controller('MappingBmhpToSetAlatCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MappingBmhpToSetAlat", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MappingBmhpToSetAlat;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnMappingBmhpToSetAlat = [
{
"field": "No",
"title": "No"
},
{
"field": "bmhp",
"title": "bmhp"
},
{
"field": "alatId",
"title": "alat Id"
},
{
"field": "bundleSetAlat",
"title": "bundle Set Alat"
},
{
"field": "bundleSetAlatId",
"title": "bundle Set Alat Id"
},
{
"field": "jumlah",
"title": "jumlah"
},
{
"field": "satuan",
"title": "satuan"
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
 columns: $scope.columnMappingBmhpToSetAlat,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.bmhp = current.bmhp;
$scope.item.alatId = current.alatId;
$scope.item.bundleSetAlat = current.bundleSetAlat;
$scope.item.bundleSetAlatId = current.bundleSetAlatId;
$scope.item.jumlah = current.jumlah;
$scope.item.satuan = current.satuan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MappingBmhpToSetAlat&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MappingBmhpToSetAlat&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "MappingBmhpToSetAlat",
	"listField": {
"bmhp": $scope.item.bmhp,
"alatId": $scope.item.alatId,
"bundleSetAlat": $scope.item.bundleSetAlat,
"bundleSetAlatId": $scope.item.bundleSetAlatId,
"jumlah": $scope.item.jumlah,
"satuan": $scope.item.satuan,
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
 "class": "MappingBmhpToSetAlat",
	"listField": {
"bmhp": $scope.item.bmhp,
"alatId": $scope.item.alatId,
"bundleSetAlat": $scope.item.bundleSetAlat,
"bundleSetAlatId": $scope.item.bundleSetAlatId,
"jumlah": $scope.item.jumlah,
"satuan": $scope.item.satuan,
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
IPSRSService.getFieldListData("Alat&select=id,namaExternal", true).then(function(dat){
$scope.listbmhp= dat.data;
});
IPSRSService.getFieldListData("BundleSetAlat&select=id,namaExternal", true).then(function(dat){
$scope.listbundlesetalat= dat.data;
});
}
]);
});