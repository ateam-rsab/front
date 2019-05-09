define(['initialize'], function(initialize) {
'use strict';
initialize.controller('DetailKategoryPegawaiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DetailKategoryPegawai", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DetailKategoryPegawai;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnDetailKategoryPegawai = [
{
"field": "No",
"title": "No"
},
{
"field": "detailKategoryPegawai",
"title": "detail Kategory Pegawai"
},
{
"field": "kdDetailKategoryPegawai",
"title": "kd Detail Kategory Pegawai"
},
{
"field": "kategoryPegawai",
"title": "kategory Pegawai"
},
{
"field": "kategoryPegawaiId",
"title": "kategory Pegawai Id"
},
{
"field": "qDetailKategoryPegawai",
"title": "q Detail Kategory Pegawai"
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
}
,
{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnDetailKategoryPegawai,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.detailKategoryPegawai = current.detailKategoryPegawai;
$scope.item.kdDetailKategoryPegawai = current.kdDetailKategoryPegawai;
$scope.item.kategoryPegawai = current.kategoryPegawai;

$scope.item.qDetailKategoryPegawai = current.qDetailKategoryPegawai;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DetailKategoryPegawai&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DetailKategoryPegawai&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "DetailKategoryPegawai",
	"listField": {
"detailKategoryPegawai": $scope.item.detailKategoryPegawai,
"kdDetailKategoryPegawai": $scope.item.kdDetailKategoryPegawai,
"kategoryPegawai": $scope.item.kategoryPegawai,

"qDetailKategoryPegawai": $scope.item.qDetailKategoryPegawai,
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
 "class": "DetailKategoryPegawai",
	"listField": {
"detailKategoryPegawai": $scope.item.detailKategoryPegawai,
"kdDetailKategoryPegawai": $scope.item.kdDetailKategoryPegawai,
"kategoryPegawai": $scope.item.kategoryPegawai,

"qDetailKategoryPegawai": $scope.item.qDetailKategoryPegawai,
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
IPSRSService.getFieldListData("KategoryPegawai&select=id,namaExternal", true).then(function(dat){
$scope.listkategorypegawai= dat.data;
});
}
]);
});
