////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisKomponenHargaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisKomponenHarga", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisKomponenHarga;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisKomponenHarga = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisKomponenHarga",
"title": "jenis Komponen Harga"
},
{
"field": "departemen",
"title": "departemen"
},
{
"field": "departemenId",
"title": "departemen Id"
},
{
"field": "kdJenisKomponenHarga",
"title": "kd Jenis Komponen Harga"
},
{
"field": "jenisKomponenHargaHead",
"title": "jenis Komponen Harga Head"
},
{
"field": "jenisKomponenHargaHeadId",
"title": "jenis Komponen Harga Head Id"
},
{
"field": "noUrut",
"title": "no Urut"
},
{
"field": "qJenisKomponenHarga",
"title": "q Jenis Komponen Harga"
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
 columns: $scope.columnJenisKomponenHarga,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisKomponenHarga = current.jenisKomponenHarga;
$scope.item.departemen = current.departemen;
$scope.item.departemenId = current.departemenId;
$scope.item.kdJenisKomponenHarga = current.kdJenisKomponenHarga;
$scope.item.jenisKomponenHargaHead = current.jenisKomponenHargaHead;
$scope.item.jenisKomponenHargaHeadId = current.jenisKomponenHargaHeadId;
$scope.item.noUrut = current.noUrut;
$scope.item.qJenisKomponenHarga = current.qJenisKomponenHarga;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisKomponenHarga&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisKomponenHarga&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisKomponenHarga",
	"listField": {
"jenisKomponenHarga": $scope.item.jenisKomponenHarga,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisKomponenHarga": $scope.item.kdJenisKomponenHarga,
"jenisKomponenHargaHead": $scope.item.jenisKomponenHargaHead,
"jenisKomponenHargaHeadId": $scope.item.jenisKomponenHargaHeadId,
"noUrut": $scope.item.noUrut,
"qJenisKomponenHarga": $scope.item.qJenisKomponenHarga,
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
 "class": "JenisKomponenHarga",
	"listField": {
"jenisKomponenHarga": $scope.item.jenisKomponenHarga,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kdJenisKomponenHarga": $scope.item.kdJenisKomponenHarga,
"jenisKomponenHargaHead": $scope.item.jenisKomponenHargaHead,
"jenisKomponenHargaHeadId": $scope.item.jenisKomponenHargaHeadId,
"noUrut": $scope.item.noUrut,
"qJenisKomponenHarga": $scope.item.qJenisKomponenHarga,
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
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("JenisKomponenHarga&select=id,jenisKomponenHarga", true).then(function(dat){
$scope.listjeniskomponenhargahead= dat.data;
});
}
]);
});
/////end