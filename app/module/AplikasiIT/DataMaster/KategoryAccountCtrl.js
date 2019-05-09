define(['initialize'], function(initialize) {
'use strict';
initialize.controller('KategoryAccountCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KategoryAccount", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KategoryAccount;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnKategoryAccount = [
{
"field": "No",
"title": "No"
},
{
"field": "kategoryAccount",
"title": "kategory Account"
},
{
"field": "jenisAccount",
"title": "jenis Account"
},
{
"field": "jenisAccountId",
"title": "jenis Account Id"
},
{
"field": "kdKategoryAccount",
"title": "kd Kategory Account"
},
{
"field": "qKategoryAccount",
"title": "q Kategory Account"
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
 columns: $scope.columnKategoryAccount,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kategoryAccount = current.kategoryAccount;
$scope.item.jenisAccount = current.jenisAccount;
$scope.item.jenisAccountId = current.jenisAccountId;
$scope.item.kdKategoryAccount = current.kdKategoryAccount;
$scope.item.qKategoryAccount = current.qKategoryAccount;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KategoryAccount&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KategoryAccount&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "KategoryAccount",
	"listField": {
"kategoryAccount": $scope.item.kategoryAccount,
"jenisAccount": $scope.item.jenisAccount,

"kdKategoryAccount": $scope.item.kdKategoryAccount,
"qKategoryAccount": $scope.item.qKategoryAccount,
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
 "class": "KategoryAccount",
	"listField": {
"kategoryAccount": $scope.item.kategoryAccount,
"jenisAccount": $scope.item.jenisAccount,

"kdKategoryAccount": $scope.item.kdKategoryAccount,
"qKategoryAccount": $scope.item.qKategoryAccount,
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
IPSRSService.getFieldListData("JenisAccount&select=id,namaExternal", true).then(function(dat){
$scope.listjenisaccount= dat.data;
});
}
]);
});