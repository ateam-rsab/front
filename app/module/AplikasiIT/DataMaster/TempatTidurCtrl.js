define(['initialize'], function(initialize) {
'use strict';
initialize.controller('TempatTidurCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=TempatTidur", true).then(function(dat){
$scope.listDataMaster = dat.data.data.TempatTidur;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnTempatTidur = [
{
"field": "No",
"title": "No"
},
{
"field": "kamar",
"title": "kamar"
},
{
"field": "kamarId",
"title": "kamar Id"
},
{
"field": "statusBed",
"title": "status Bed"
},
{
"field": "statusBedId",
"title": "status Bed Id"
},
{
"field": "nomorBed",
"title": "nomor Bed"
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
 columns: $scope.columnTempatTidur,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kamar = current.kamar;
$scope.item.kamarId = current.kamarId;
$scope.item.statusBed = current.statusBed;
$scope.item.statusBedId = current.statusBedId;
$scope.item.nomorBed = current.nomorBed;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=TempatTidur&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=TempatTidur&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "TempatTidur",
	"listField": {
"kamar": $scope.item.kamar,

"statusBed": $scope.item.statusBed,

"nomorBed": $scope.item.nomorBed,
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
 "class": "TempatTidur",
	"listField": {
"kamar": $scope.item.kamar,

"statusBed": $scope.item.statusBed,

"nomorBed": $scope.item.nomorBed,
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
IPSRSService.getFieldListData("Kamar&select=id,namaExternal", true).then(function(dat){
$scope.listkamar= dat.data;
});
IPSRSService.getFieldListData("StatusBed&select=id,namaExternal", true).then(function(dat){
$scope.liststatusbed= dat.data;
});
}
]);
});
