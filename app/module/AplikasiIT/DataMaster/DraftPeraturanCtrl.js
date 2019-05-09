define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('DraftPeraturanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DraftPeraturan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DraftPeraturan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnDraftPeraturan = [
{
"field": "No",
"title": "No"
},
{
"field": "user",
"title": "user"
},
{
"field": "userId",
"title": "user Id"
},
{
"field": "noPeraturan",
"title": "no Peraturan"
},
{
"field": "namaPeraturan",
"title": "nama Peraturan"
},
{
"field": "tglPeraturan",
"title": "tgl Peraturan"
},
{
"field": "draftPeraturan",
"title": "draft Peraturan"
},
{
"field": "tglPengesahan",
"title": "tgl Pengesahan"
},
{
"field": "penanggungJawab",
"title": "penanggung Jawab"
},
{
"field": "penanggungJawabId",
"title": "penanggung Jawab Id"
},
{
"field": "detailDraftSet",
"title": "detail Draft Set"
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
 columns: $scope.columnDraftPeraturan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.user = current.user;
$scope.item.userId = current.userId;
$scope.item.noPeraturan = current.noPeraturan;
$scope.item.namaPeraturan = current.namaPeraturan;
$scope.item.tglPeraturan = current.tglPeraturan;
$scope.item.draftPeraturan = current.draftPeraturan;
$scope.item.tglPengesahan = current.tglPengesahan;
$scope.item.penanggungJawab = current.penanggungJawab;
$scope.item.penanggungJawabId = current.penanggungJawabId;
$scope.item.detailDraftSet = current.detailDraftSet;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DraftPeraturan&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DraftPeraturan&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "DraftPeraturan",
	"listField": {
"user": $scope.item.user,
"userId": $scope.item.userId,
"noPeraturan": $scope.item.noPeraturan,
"namaPeraturan": $scope.item.namaPeraturan,
"tglPeraturan": $scope.item.tglPeraturan,
"draftPeraturan": $scope.item.draftPeraturan,
"tglPengesahan": $scope.item.tglPengesahan,
"penanggungJawab": $scope.item.penanggungJawab,
"penanggungJawabId": $scope.item.penanggungJawabId,
"detailDraftSet": $scope.item.detailDraftSet,
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
 "class": "DraftPeraturan",
	"listField": {
"user": $scope.item.user,
"userId": $scope.item.userId,
"noPeraturan": $scope.item.noPeraturan,
"namaPeraturan": $scope.item.namaPeraturan,
"tglPeraturan": $scope.item.tglPeraturan,
"draftPeraturan": $scope.item.draftPeraturan,
"tglPengesahan": $scope.item.tglPengesahan,
"penanggungJawab": $scope.item.penanggungJawab,
"penanggungJawabId": $scope.item.penanggungJawabId,
"detailDraftSet": $scope.item.detailDraftSet,
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
IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
$scope.listuser= dat.data;
});
IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
$scope.listpenanggungjawab= dat.data;
});
IPSRSService.getFieldListData("Set&select=id,namaExternal", true).then(function(dat){
$scope.listdetaildraftset= dat.data;
});

}
		]);
});