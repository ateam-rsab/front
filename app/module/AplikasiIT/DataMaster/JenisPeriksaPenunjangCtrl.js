////header nya
define(['initialize'], function(initialize) {
	'use strict';

initialize.controller('JenisPeriksaPenunjangCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPeriksaPenunjang", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisPeriksaPenunjang;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
$scope.columnJenisPeriksaPenunjang=[
{
"field": "No",
"title": "No"
},
{
"field": "jenisPeriksa",
"title": "jenis Periksa"
},
{
"field": "noUrut",
"title": "Nomor Urut"
},
{
"field": "departemen",
"title": "Departemen"
},
{
"field": "namaRange",
"title": "nama Range"
},
{
"field": "qRange",
"title": "q Range"
},
{
"field": "rangeMax",
"title": "range Max"
},
{
"field": "rangeMin",
"title": "range Min"
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
 columns: $scope.columnJenisPeriksaPenunjang,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisPeriksa = current.jenisPeriksa;
$scope.item.bahanSample = current.bahanSample;
$scope.item.bahanSampleId = current.bahanSampleId;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.kdJenisPeriksa = current.kdJenisPeriksa;
$scope.item.jenisPeriksaHead = current.jenisPeriksaHead;
$scope.item.jenisPeriksaHeadId = current.jenisPeriksaHeadId;
$scope.item.noUrut = current.noUrut;
$scope.item.qJenisPeriksa = current.qJenisPeriksa;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPeriksaPenunjang&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPeriksaPenunjang&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "JenisPeriksaPenunjang",
	"listField": {
"jenisPeriksa": $scope.item.jenisPeriksa,
"bahanSample": $scope.item.bahanSample,
"bahanSampleId": $scope.item.bahanSampleId,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisPeriksa": $scope.item.kdJenisPeriksa,
"jenisPeriksaHead": $scope.item.jenisPeriksaHead,
"jenisPeriksaHeadId": $scope.item.jenisPeriksaHeadId,
"noUrut": $scope.item.noUrut,
"qJenisPeriksa": $scope.item.qJenisPeriksa,
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
 "class": "JenisPeriksaPenunjang",
	"listField": {
"jenisPeriksa": $scope.item.jenisPeriksa,
"bahanSample": $scope.item.bahanSample,
"bahanSampleId": $scope.item.bahanSampleId,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisPeriksa": $scope.item.kdJenisPeriksa,
"jenisPeriksaHead": $scope.item.jenisPeriksaHead,
"jenisPeriksaHeadId": $scope.item.jenisPeriksaHeadId,
"noUrut": $scope.item.noUrut,
"qJenisPeriksa": $scope.item.qJenisPeriksa,
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
IPSRSService.getFieldListData("BahanSample&select=id,namaExternal", true).then(function(dat){
$scope.listbahansample= dat.data;
});
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("JenisPeriksaPenunjang&select=id,namaExternal", true).then(function(dat){
$scope.listjenisperiksahead= dat.data;
});
/////end
}
		]);
});


