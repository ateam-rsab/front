define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisPajakCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPajak", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisPajak;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisPajak = [
{
"field": "No",
"title": "No"
},
{
"field": "deskripsi",
"title": "deskripsi"
},
{
"field": "jenisPajak",
"title": "jenis Pajak"
},
{
"field": "kdJenisPajak",
"title": "kd Jenis Pajak"
},
{
"field": "jenisPajakHead",
"title": "jenis Pajak Head"
},
{
"field": "jenisPajakHeadId",
"title": "jenis Pajak Head Id"
},
{
"field": "qJenisPajak",
"title": "q Jenis Pajak"
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
 columns: $scope.columnJenisPajak,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.deskripsi = current.deskripsi;
$scope.item.jenisPajak = current.jenisPajak;
$scope.item.kdJenisPajak = current.kdJenisPajak;
$scope.item.jenisPajakHead = current.jenisPajakHead;

$scope.item.qJenisPajak = current.qJenisPajak;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPajak&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPajak&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisPajak",
	"listField": {
"deskripsi": $scope.item.deskripsi,
"jenisPajak": $scope.item.jenisPajak,
"kdJenisPajak": $scope.item.kdJenisPajak,
"jenisPajakHead": $scope.item.jenisPajakHead,

"qJenisPajak": $scope.item.qJenisPajak,
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
 "class": "JenisPajak",
	"listField": {
"deskripsi": $scope.item.deskripsi,
"jenisPajak": $scope.item.jenisPajak,
"kdJenisPajak": $scope.item.kdJenisPajak,
"jenisPajakHead": $scope.item.jenisPajakHead,

"qJenisPajak": $scope.item.qJenisPajak,
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
IPSRSService.getFieldListData("JenisPajak&select=id,namaExternal", true).then(function(dat){
$scope.listjenispajakhead= dat.data;
});
}
]);
});