////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('AuditDataCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AuditData", true).then(function(dat){
$scope.listDataMaster = dat.data.data.AuditData;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnAuditData = [
{
"field": "No",
"title": "No"
},
{
"field": "id",
"title": "id"
},
{
"field": "serialVersionUID",
"title": "serial Version UID"
},
{
"field": "id",
"title": "id"
},
{
"field": "timestamp",
"title": "timestamp"
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
 columns: $scope.columnAuditData,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.id = current.id;
$scope.item.serialVersionUID = current.serialVersionUID;
$scope.item.id = current.id;
$scope.item.timestamp = current.timestamp;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AuditData&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AuditData&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "AuditData",
	"listField": {
"id": $scope.item.id,
"serialVersionUID": $scope.item.serialVersionUID,
"id": $scope.item.id,
"timestamp": $scope.item.timestamp,
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
 "class": "AuditData",
	"listField": {
"id": $scope.item.id,
"serialVersionUID": $scope.item.serialVersionUID,
"id": $scope.item.id,
"timestamp": $scope.item.timestamp,
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