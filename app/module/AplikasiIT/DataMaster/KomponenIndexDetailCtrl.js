define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KomponenIndexDetailCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KomponenIndexDetail", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KomponenIndexDetail;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnKomponenIndexDetail = [
{
"field": "No",
"title": "No"
},
{
"field": "factorRateIndex",
"title": "factor Rate Index"
},
{
"field": "jabatanStruktural",
"title": "jabatan Struktural"
},
{
"field": "jabatanStrukturalId",
"title": "jabatan Struktural Id"
},
{
"field": "komponenIndex",
"title": "komponen Index"
},
{
"field": "komponenIndexId",
"title": "komponen Index Id"
},
{
"field": "pendidikan",
"title": "pendidikan"
},
{
"field": "pendidikanId",
"title": "pendidikan Id"
},
{
"field": "namaKomponenIndexDetail",
"title": "nama Komponen Index Detail"
},
{
"field": "nilaiIndexStandar",
"title": "nilai Index Standar"
},
{
"field": "noUrut",
"title": "no Urut"
},
{
"field": "qKomponenIndexDetail",
"title": "q Komponen Index Detail"
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
 columns: $scope.columnKomponenIndexDetail,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.factorRateIndex = current.factorRateIndex;
$scope.item.jabatanStruktural = current.jabatanStruktural;
$scope.item.jabatanStrukturalId = current.jabatanStrukturalId;
$scope.item.komponenIndex = current.komponenIndex;
$scope.item.komponenIndexId = current.komponenIndexId;
$scope.item.pendidikan = current.pendidikan;
$scope.item.pendidikanId = current.pendidikanId;
$scope.item.namaKomponenIndexDetail = current.namaKomponenIndexDetail;
$scope.item.nilaiIndexStandar = current.nilaiIndexStandar;
$scope.item.noUrut = current.noUrut;
$scope.item.qKomponenIndexDetail = current.qKomponenIndexDetail;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenIndexDetail&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KomponenIndexDetail&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "KomponenIndexDetail",
	"listField": {
"factorRateIndex": $scope.item.factorRateIndex,
"jabatanStruktural": $scope.item.jabatanStruktural,

"komponenIndex": $scope.item.komponenIndex,

"pendidikan": $scope.item.pendidikan,

"namaKomponenIndexDetail": $scope.item.namaKomponenIndexDetail,
"nilaiIndexStandar": $scope.item.nilaiIndexStandar,
"noUrut": $scope.item.noUrut,
"qKomponenIndexDetail": $scope.item.qKomponenIndexDetail,
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
 "class": "KomponenIndexDetail",
	"listField": {
"factorRateIndex": $scope.item.factorRateIndex,
"jabatanStruktural": $scope.item.jabatanStruktural,

"komponenIndex": $scope.item.komponenIndex,

"pendidikan": $scope.item.pendidikan,

"namaKomponenIndexDetail": $scope.item.namaKomponenIndexDetail,
"nilaiIndexStandar": $scope.item.nilaiIndexStandar,
"noUrut": $scope.item.noUrut,
"qKomponenIndexDetail": $scope.item.qKomponenIndexDetail,
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
IPSRSService.getFieldListData("Jabatan&select=id,namaExternal", true).then(function(dat){
$scope.listjabatanstruktural= dat.data;
});
IPSRSService.getFieldListData("KomponenIndex&select=id,namaExternal", true).then(function(dat){
$scope.listkomponenindex= dat.data;
});
IPSRSService.getFieldListData("Pendidikan&select=id,namaExternal", true).then(function(dat){
$scope.listpendidikan= dat.data;
});
}
]);
});