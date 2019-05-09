define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('TorCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Tor", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Tor;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnTor = [
{
"field": "No",
"title": "No"
},
{
"field": "noRab",
"title": "no Rab"
},
{
"field": "title1",
"title": "title1"
},
{
"field": "title2",
"title": "title2"
},
{
"field": "title3",
"title": "title3"
},
{
"field": "latarBelakang",
"title": "latar Belakang"
},
{
"field": "penerimaManfaat",
"title": "penerima Manfaat"
},
{
"field": "strategiPencapaiKeluaran",
"title": "strategi Pencapai Keluaran"
},
{
"field": "kurunWaktuPencapaiKeluaran",
"title": "kurun Waktu Pencapai Keluaran"
},
{
"field": "biayaYangDikeluarkan",
"title": "biaya Yang Dikeluarkan"
},
{
"field": "tanggal",
"title": "tanggal"
},
{
"field": "jabatan",
"title": "jabatan"
},
{
"field": "jabatanId",
"title": "jabatan Id"
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
 columns: $scope.columnTor,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.noRab = current.noRab;
$scope.item.title1 = current.title1;
$scope.item.title2 = current.title2;
$scope.item.title3 = current.title3;
$scope.item.latarBelakang = current.latarBelakang;
$scope.item.penerimaManfaat = current.penerimaManfaat;
$scope.item.strategiPencapaiKeluaran = current.strategiPencapaiKeluaran;
$scope.item.kurunWaktuPencapaiKeluaran = current.kurunWaktuPencapaiKeluaran;
$scope.item.biayaYangDikeluarkan = current.biayaYangDikeluarkan;
$scope.item.tanggal = current.tanggal;
$scope.item.jabatan = current.jabatan;

$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Tor&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Tor&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "Tor",
	"listField": {
"noRab": $scope.item.noRab,
"title1": $scope.item.title1,
"title2": $scope.item.title2,
"title3": $scope.item.title3,
"latarBelakang": $scope.item.latarBelakang,
"penerimaManfaat": $scope.item.penerimaManfaat,
"strategiPencapaiKeluaran": $scope.item.strategiPencapaiKeluaran,
"kurunWaktuPencapaiKeluaran": $scope.item.kurunWaktuPencapaiKeluaran,
"biayaYangDikeluarkan": $scope.item.biayaYangDikeluarkan,
"tanggal": $scope.item.tanggal,
"jabatan": $scope.item.jabatan,

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
 "class": "Tor",
	"listField": {
"noRab": $scope.item.noRab,
"title1": $scope.item.title1,
"title2": $scope.item.title2,
"title3": $scope.item.title3,
"latarBelakang": $scope.item.latarBelakang,
"penerimaManfaat": $scope.item.penerimaManfaat,
"strategiPencapaiKeluaran": $scope.item.strategiPencapaiKeluaran,
"kurunWaktuPencapaiKeluaran": $scope.item.kurunWaktuPencapaiKeluaran,
"biayaYangDikeluarkan": $scope.item.biayaYangDikeluarkan,
"tanggal": $scope.item.tanggal,
"jabatan": $scope.item.jabatan,

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
$scope.listjabatan= dat.data;
});
}
]);
});