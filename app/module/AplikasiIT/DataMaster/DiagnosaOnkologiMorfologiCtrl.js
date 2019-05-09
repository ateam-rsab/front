define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('DiagnosaOnkologiMorfologiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DiagnosaOnkologiMorfologi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DiagnosaOnkologiMorfologi;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnDiagnosaOnkologiMorfologi = [
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
"field": "qDiagnosaOnkologiMorfologi",
"title": "q Diagnosa Onkologi Morfologi"
},
{
"field": "kdDiagnosaOnkologiMorfologi",
"title": "kd Diagnosa Onkologi Morfologi"
},
{
"field": "struct",
"title": "struct"
},
{
"field": "namaDiagnosaOnkologiMorfologi",
"title": "nama Diagnosa Onkologi Morfologi"
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
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnDiagnosaOnkologiMorfologi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kategoryDiagnosa = current.kategoryDiagnosa;

$scope.item.qDiagnosaOnkologiMorfologi = current.qDiagnosaOnkologiMorfologi;
$scope.item.kdDiagnosaOnkologiMorfologi = current.kdDiagnosaOnkologiMorfologi;
$scope.item.struct = current.struct;
$scope.item.namaDiagnosaOnkologiMorfologi = current.namaDiagnosaOnkologiMorfologi;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaOnkologiMorfologi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaOnkologiMorfologi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "DiagnosaOnkologiMorfologi",
	"listField": {
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,

"qDiagnosaOnkologiMorfologi": $scope.item.qDiagnosaOnkologiMorfologi,
"kdDiagnosaOnkologiMorfologi": $scope.item.kdDiagnosaOnkologiMorfologi,
"struct": $scope.item.struct,
"namaDiagnosaOnkologiMorfologi": $scope.item.namaDiagnosaOnkologiMorfologi,
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
 "class": "DiagnosaOnkologiMorfologi",
	"listField": {
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,

"qDiagnosaOnkologiMorfologi": $scope.item.qDiagnosaOnkologiMorfologi,
"kdDiagnosaOnkologiMorfologi": $scope.item.kdDiagnosaOnkologiMorfologi,
"struct": $scope.item.struct,
"namaDiagnosaOnkologiMorfologi": $scope.item.namaDiagnosaOnkologiMorfologi,
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