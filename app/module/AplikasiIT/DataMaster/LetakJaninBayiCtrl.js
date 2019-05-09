define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('LetakJaninBayiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=LetakJaninBayi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.LetakJaninBayi;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnLetakJaninBayi = [
{
"field": "No",
"title": "No"
},
{
"field": "kdLetakJaninBayi",
"title": "kd Letak Janin Bayi"
},
{
"field": "letakJaninBayi",
"title": "letak Janin Bayi"
},
{
"field": "qLetakJaninBayi",
"title": "q Letak Janin Bayi"
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
 columns: $scope.columnLetakJaninBayi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kdLetakJaninBayi = current.kdLetakJaninBayi;
$scope.item.letakJaninBayi = current.letakJaninBayi;
$scope.item.qLetakJaninBayi = current.qLetakJaninBayi;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=LetakJaninBayi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=LetakJaninBayi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "LetakJaninBayi",
	"listField": {
"kdLetakJaninBayi": $scope.item.kdLetakJaninBayi,
"letakJaninBayi": $scope.item.letakJaninBayi,
"qLetakJaninBayi": $scope.item.qLetakJaninBayi,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal
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
 "class": "LetakJaninBayi",
	"listField": {
"kdLetakJaninBayi": $scope.item.kdLetakJaninBayi,
"letakJaninBayi": $scope.item.letakJaninBayi,
"qLetakJaninBayi": $scope.item.qLetakJaninBayi,
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