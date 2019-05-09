define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('UnitPengelolaPrakarsaSuratCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=UnitPengelolaPrakarsaSurat", true).then(function(dat){
$scope.listDataMaster = dat.data.data.UnitPengelolaPrakarsaSurat;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnUnitPengelolaPrakarsaSurat = [
{
"field": "No",
"title": "No"
},
{
"field": "unitPengelolaPrakarsaSurat",
"title": "unit Pengelola Prakarsa Surat"
},
{
"field": "unitPengelolaPrakarsaSuratId",
"title": "unit Pengelola Prakarsa Surat Id"
},
{
"field": "unitKerja",
"title": "unit Kerja"
},
{
"field": "kodeUnitPengelolaPrakarsaSurat",
"title": "kode Unit Pengelola Prakarsa Surat"
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
 columns: $scope.columnUnitPengelolaPrakarsaSurat,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.unitPengelolaPrakarsaSurat = current.unitPengelolaPrakarsaSurat;
$scope.item.unitPengelolaPrakarsaSuratId = current.unitPengelolaPrakarsaSuratId;
$scope.item.unitKerja = current.unitKerja;
$scope.item.kodeUnitPengelolaPrakarsaSurat = current.kodeUnitPengelolaPrakarsaSurat;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=UnitPengelolaPrakarsaSurat&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=UnitPengelolaPrakarsaSurat&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "UnitPengelolaPrakarsaSurat",
	"listField": {
"unitPengelolaPrakarsaSurat": $scope.item.unitPengelolaPrakarsaSurat,

"unitKerja": $scope.item.unitKerja,
"kodeUnitPengelolaPrakarsaSurat": $scope.item.kodeUnitPengelolaPrakarsaSurat,
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
 "class": "UnitPengelolaPrakarsaSurat",
	"listField": {
"unitPengelolaPrakarsaSurat": $scope.item.unitPengelolaPrakarsaSurat,

"unitKerja": $scope.item.unitKerja,
"kodeUnitPengelolaPrakarsaSurat": $scope.item.kodeUnitPengelolaPrakarsaSurat,
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
IPSRSService.getFieldListData("UnitPengelolaPrakarsaSurat&select=id,namaExternal", true).then(function(dat){
$scope.listunitpengelolaprakarsasurat= dat.data;
});
}
		]);
});
