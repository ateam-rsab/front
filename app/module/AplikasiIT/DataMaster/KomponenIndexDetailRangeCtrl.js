define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KomponenIndexDetailRangeCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenIndexDetailRange", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KomponenIndexDetailRange;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnKomponenIndexDetailRange = [
{
"field": "No",
"title": "No"
},
{
"field": "factorRateIndexRange",
"title": "factor Rate Index Range"
},
{
"field": "komponenIndexDetail",
"title": "komponen Index Detail"
},
{
"field": "komponenIndexDetailId",
"title": "komponen Index Detail Id"
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
"field": "nilaiIndexRange",
"title": "nilai Index Range"
},
{
"field": "persenNilaiIndexRange",
"title": "persen Nilai Index Range"
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
 columns: $scope.columnKomponenIndexDetailRange,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.factorRateIndexRange = current.factorRateIndexRange;
$scope.item.komponenIndexDetail = current.komponenIndexDetail;
$scope.item.komponenIndexDetailId = current.komponenIndexDetailId;
$scope.item.range = current.range;
$scope.item.rangeId = current.rangeId;
$scope.item.nilaiIndexRange = current.nilaiIndexRange;
$scope.item.persenNilaiIndexRange = current.persenNilaiIndexRange;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenIndexDetailRange&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenIndexDetailRange&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "KomponenIndexDetailRange",
	"listField": {
"factorRateIndexRange": $scope.item.factorRateIndexRange,
"komponenIndexDetail": $scope.item.komponenIndexDetail,
"komponenIndexDetailId": $scope.item.komponenIndexDetailId,
"range": $scope.item.range,
"rangeId": $scope.item.rangeId,
"nilaiIndexRange": $scope.item.nilaiIndexRange,
"persenNilaiIndexRange": $scope.item.persenNilaiIndexRange,
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
 "class": "KomponenIndexDetailRange",
	"listField": {
"factorRateIndexRange": $scope.item.factorRateIndexRange,
"komponenIndexDetail": $scope.item.komponenIndexDetail,
"komponenIndexDetailId": $scope.item.komponenIndexDetailId,
"range": $scope.item.range,
"rangeId": $scope.item.rangeId,
"nilaiIndexRange": $scope.item.nilaiIndexRange,
"persenNilaiIndexRange": $scope.item.persenNilaiIndexRange,
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
IPSRSService.getFieldListData("KomponenIndex&select=id,namaExternal", true).then(function(dat){
$scope.listkomponenindexdetail= dat.data;
});
IPSRSService.getFieldListData("Range&select=id,namaExternal", true).then(function(dat){
$scope.listrange= dat.data;
});
}
]);
});