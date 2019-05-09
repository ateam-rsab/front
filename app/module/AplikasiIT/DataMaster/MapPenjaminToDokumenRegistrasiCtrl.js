define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MapPenjaminToDokumenRegistrasiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapPenjaminToDokumenRegistrasi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapPenjaminToDokumenRegistrasi;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnMapPenjaminToDokumenRegistrasi = [
{
"field": "No",
"title": "No"
},
{
"field": "dokumen",
"title": "dokumen"
},
{
"field": "dokumenId",
"title": "dokumen Id"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "kelompokPasienId",
"title": "kelompok Pasien Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
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
 columns: $scope.columnMapPenjaminToDokumenRegistrasi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.dokumen = current.dokumen;
$scope.item.dokumenId = current.dokumenId;
$scope.item.kelompokPasien = current.kelompokPasien;
$scope.item.kelompokPasienId = current.kelompokPasienId;
$scope.item.kdPenjaminPasien = current.kdPenjaminPasien;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapPenjaminToDokumenRegistrasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapPenjaminToDokumenRegistrasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "MapPenjaminToDokumenRegistrasi",
	"listField": {
"dokumen": $scope.item.dokumen,

"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
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
 "class": "MapPenjaminToDokumenRegistrasi",
	"listField": {
"dokumen": $scope.item.dokumen,
"dokumenId": $scope.item.dokumenId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
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
IPSRSService.getFieldListData("Dokumen&select=id,namaJudulDokumen", true).then(function(dat){
$scope.listdokumen= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});


















}
]);
});