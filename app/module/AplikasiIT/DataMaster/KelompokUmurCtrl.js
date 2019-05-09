define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KelompokUmurCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokUmur", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KelompokUmur;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnKelompokUmur = [
{
"field": "No",
"title": "No"
},
{
"field": "kdKelompokUmur",
"title": "kd Kelompok Umur"
},
{
"field": "kelompokUmur",
"title": "kelompok Umur"
},
{
"field": "qKelompokUmur",
"title": "q Kelompok Umur"
},
{
"field": "statusUmur",
"title": "status Umur"
},
{
"field": "umurMax",
"title": "umur Max"
},
{
"field": "umurMin",
"title": "umur Min"
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
 columns: $scope.columnKelompokUmur,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kdKelompokUmur = current.kdKelompokUmur;
$scope.item.kelompokUmur = current.kelompokUmur;
$scope.item.qKelompokUmur = current.qKelompokUmur;
$scope.item.statusUmur = current.statusUmur;
$scope.item.umurMax = current.umurMax;
$scope.item.umurMin = current.umurMin;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokUmur&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokUmur&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "KelompokUmur",
	"listField": {
"kdKelompokUmur": $scope.item.kdKelompokUmur,
"kelompokUmur": $scope.item.kelompokUmur,
"qKelompokUmur": $scope.item.qKelompokUmur,
"statusUmur": $scope.item.statusUmur,
"umurMax": $scope.item.umurMax,
"umurMin": $scope.item.umurMin,
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
 "class": "KelompokUmur",
	"listField": {
"kdKelompokUmur": $scope.item.kdKelompokUmur,
"kelompokUmur": $scope.item.kelompokUmur,
"qKelompokUmur": $scope.item.qKelompokUmur,
"statusUmur": $scope.item.statusUmur,
"umurMax": $scope.item.umurMax,
"umurMin": $scope.item.umurMin,
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
}
]);
});