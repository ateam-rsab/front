define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('DiagnosaOnkologiTopologiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DiagnosaOnkologiTopologi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DiagnosaOnkologiTopologi;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnDiagnosaOnkologiTopologi = [
{
"field": "No",
"title": "No"
},
{
"field": "kategoryDiagnosa",
"title": "kategory Diagnosa"
},
{
"field": "idKategoryDiagnosa",
"title": "id Kategory Diagnosa"
},
{
"field": "qDiagnosaOnkologiTopologi",
"title": "q Diagnosa Onkologi Topologi"
},
{
"field": "kdDiagnosaOnkologiTopologi",
"title": "kd Diagnosa Onkologi Topologi"
},
{
"field": "level",
"title": "level"
},
{
"field": "namaDiagnosaOnkologiTopologi",
"title": "nama Diagnosa Onkologi Topologi"
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
 columns: $scope.columnDiagnosaOnkologiTopologi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kategoryDiagnosa = current.kategoryDiagnosa;
$scope.item.idKategoryDiagnosa = current.idKategoryDiagnosa;
$scope.item.qDiagnosaOnkologiTopologi = current.qDiagnosaOnkologiTopologi;
$scope.item.kdDiagnosaOnkologiTopologi = current.kdDiagnosaOnkologiTopologi;
$scope.item.level = current.level;
$scope.item.namaDiagnosaOnkologiTopologi = current.namaDiagnosaOnkologiTopologi;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaOnkologiTopologi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaOnkologiTopologi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "DiagnosaOnkologiTopologi",
	"listField": {
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,

"qDiagnosaOnkologiTopologi": $scope.item.qDiagnosaOnkologiTopologi,
"kdDiagnosaOnkologiTopologi": $scope.item.kdDiagnosaOnkologiTopologi,
"level": $scope.item.level,
"namaDiagnosaOnkologiTopologi": $scope.item.namaDiagnosaOnkologiTopologi,
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
 "class": "DiagnosaOnkologiTopologi",
	"listField": {
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,

"qDiagnosaOnkologiTopologi": $scope.item.qDiagnosaOnkologiTopologi,
"kdDiagnosaOnkologiTopologi": $scope.item.kdDiagnosaOnkologiTopologi,
"level": $scope.item.level,
"namaDiagnosaOnkologiTopologi": $scope.item.namaDiagnosaOnkologiTopologi,
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
IPSRSService.getFieldListData("KategoryDiagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listkategorydiagnosa= dat.data;
});
}
]);
});