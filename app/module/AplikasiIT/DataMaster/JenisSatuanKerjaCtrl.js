define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisSatuanKerjaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisSatuanKerja", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisSatuanKerja;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisSatuanKerja = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisSatuanKerja",
"title": "jenis Satuan Kerja"
},
{
"field": "kdJenisSatuanKerja",
"title": "kd Jenis Satuan Kerja"
},
{
"field": "kdPimpinan",
"title": "kd Pimpinan"
},
{
"field": "unitKerja",
"title": "unit Kerja"
},
{
"field": "unitKerjaId",
"title": "unit Kerja Id"
},
{
"field": "noJenisSatuanKerja",
"title": "no Jenis Satuan Kerja"
},
{
"field": "qJenisSatuanKerja",
"title": "q Jenis Satuan Kerja"
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
 columns: $scope.columnJenisSatuanKerja,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisSatuanKerja = current.jenisSatuanKerja;
$scope.item.kdJenisSatuanKerja = current.kdJenisSatuanKerja;
$scope.item.kdPimpinan = current.kdPimpinan;
$scope.item.unitKerja = current.unitKerja;
$scope.item.unitKerjaId = current.unitKerjaId;
$scope.item.noJenisSatuanKerja = current.noJenisSatuanKerja;
$scope.item.qJenisSatuanKerja = current.qJenisSatuanKerja;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisSatuanKerja&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisSatuanKerja&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisSatuanKerja",
	"listField": {
"jenisSatuanKerja": $scope.item.jenisSatuanKerja,
"kdJenisSatuanKerja": $scope.item.kdJenisSatuanKerja,
"kdPimpinan": $scope.item.kdPimpinan,
"unitKerja": $scope.item.unitKerja,

"noJenisSatuanKerja": $scope.item.noJenisSatuanKerja,
"qJenisSatuanKerja": $scope.item.qJenisSatuanKerja,
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
 "class": "JenisSatuanKerja",
	"listField": {
"jenisSatuanKerja": $scope.item.jenisSatuanKerja,
"kdJenisSatuanKerja": $scope.item.kdJenisSatuanKerja,
"kdPimpinan": $scope.item.kdPimpinan,
"unitKerja": $scope.item.unitKerja,

"noJenisSatuanKerja": $scope.item.noJenisSatuanKerja,
"qJenisSatuanKerja": $scope.item.qJenisSatuanKerja,
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
IPSRSService.getFieldListData("UnitKerja&select=id,namaExternal", true).then(function(dat){
$scope.listunitkerja= dat.data;
});
}
]);
});