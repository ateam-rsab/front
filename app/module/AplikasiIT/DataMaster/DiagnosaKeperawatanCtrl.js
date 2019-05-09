define(['initialize'], function(initialize) {
'use strict';
initialize.controller('DiagnosaKeperawatanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DiagnosaKeperawatan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DiagnosaKeperawatan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnDiagnosaKeperawatan = [
{
"field": "No",
"title": "No"
},
{
"field": "deskripsiDiagnosaKep",
"title": "deskripsi Diagnosa Kep"
},
{
"field": "namaDiagnosaKep",
"title": "nama Diagnosa Kep"
},
{
"field": "diagnosaKep",
"title": "diagnosa Kep"
},
{
"field": "diagnosaKepId",
"title": "diagnosa Kep Id"
},
{
"field": "qDiagnosaKep",
"title": "q Diagnosa Kep"
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
 columns: $scope.columnDiagnosaKeperawatan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.deskripsiDiagnosaKep = current.deskripsiDiagnosaKep;
$scope.item.namaDiagnosaKep = current.namaDiagnosaKep;
$scope.item.diagnosaKep = current.diagnosaKep;
$scope.item.diagnosaKepId = current.diagnosaKepId;
$scope.item.qDiagnosaKep = current.qDiagnosaKep;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaKeperawatan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaKeperawatan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "DiagnosaKeperawatan",
	"listField": {
"deskripsiDiagnosaKep": $scope.item.deskripsiDiagnosaKep,
"namaDiagnosaKep": $scope.item.namaDiagnosaKep,
"diagnosaKep": $scope.item.diagnosaKep,

"qDiagnosaKep": $scope.item.qDiagnosaKep,
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
 "class": "DiagnosaKeperawatan",
	"listField": {
"deskripsiDiagnosaKep": $scope.item.deskripsiDiagnosaKep,
"namaDiagnosaKep": $scope.item.namaDiagnosaKep,
"diagnosaKep": $scope.item.diagnosaKep,

"qDiagnosaKep": $scope.item.qDiagnosaKep,
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
IPSRSService.getFieldListData("Diagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listdiagnosakep= dat.data;
});
}
]);
});