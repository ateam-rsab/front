define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisPetugasPelaksanaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisPetugasPelaksana", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisPetugasPelaksana;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnJenisPetugasPelaksana = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisPetugasPe",
"title": "jenis Petugas Pe"
},
{
"field": "kdJenisPetugasPe",
"title": "kd Jenis Petugas Pe"
},
{
"field": "komponenHarga",
"title": "komponen Harga"
},
{
"field": "komponenHargaId",
"title": "komponen Harga Id"
},
{
"field": "qJenisPetugasPe",
"title": "q Jenis Petugas Pe"
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
 columns: $scope.columnJenisPetugasPelaksana,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisPetugasPe = current.jenisPetugasPe;
$scope.item.kdJenisPetugasPe = current.kdJenisPetugasPe;
$scope.item.komponenHarga = current.komponenHarga;
$scope.item.komponenHargaId = current.komponenHargaId;
$scope.item.qJenisPetugasPe = current.qJenisPetugasPe;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPetugasPelaksana&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisPetugasPelaksana&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "JenisPetugasPelaksana",
	"listField": {
"jenisPetugasPe": $scope.item.jenisPetugasPe,
"kdJenisPetugasPe": $scope.item.kdJenisPetugasPe,
"komponenHarga": $scope.item.komponenHarga,

"qJenisPetugasPe": $scope.item.qJenisPetugasPe,
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
 "class": "JenisPetugasPelaksana",
	"listField": {
"jenisPetugasPe": $scope.item.jenisPetugasPe,
"kdJenisPetugasPe": $scope.item.kdJenisPetugasPe,
"komponenHarga": $scope.item.komponenHarga,

"qJenisPetugasPe": $scope.item.qJenisPetugasPe,
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
IPSRSService.getFieldListData("KomponenHarga&select=id,namaExternal", true).then(function(dat){
$scope.listkomponenharga= dat.data;
});
}
]);
});