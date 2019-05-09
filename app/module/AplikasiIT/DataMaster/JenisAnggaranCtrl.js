define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisAnggaranCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisAnggaran", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisAnggaran;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisAnggaran = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisAnggaran",
"title": "jenis Anggaran"
},
{
"field": "kdJenisAnggaran",
"title": "kd Jenis Anggaran"
},
{
"field": "keterangan",
"title": "keterangan"
},
{
"field": "qJenisAnggaran",
"title": "q Jenis Anggaran"
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
 columns: $scope.columnJenisAnggaran,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisAnggaran = current.jenisAnggaran;
$scope.item.kdJenisAnggaran = current.kdJenisAnggaran;
$scope.item.keterangan = current.keterangan;
$scope.item.qJenisAnggaran = current.qJenisAnggaran;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisAnggaran&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisAnggaran&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisAnggaran",
	"listField": {
"jenisAnggaran": $scope.item.jenisAnggaran,
"kdJenisAnggaran": $scope.item.kdJenisAnggaran,
"keterangan": $scope.item.keterangan,
"qJenisAnggaran": $scope.item.qJenisAnggaran,
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
 "class": "JenisAnggaran",
	"listField": {
"jenisAnggaran": $scope.item.jenisAnggaran,
"kdJenisAnggaran": $scope.item.kdJenisAnggaran,
"keterangan": $scope.item.keterangan,
"qJenisAnggaran": $scope.item.qJenisAnggaran,
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