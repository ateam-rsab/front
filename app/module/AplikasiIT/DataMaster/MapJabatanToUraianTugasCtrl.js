define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MapJabatanToUraianTugasCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapJabatanToUraianTugas", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapJabatanToUraianTugas;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnMapJabatanToUraianTugas = [
{
"field": "No",
"title": "No"
},
{
"field": "noDokumen",
"title": "no Dokumen"
},
{
"field": "noRevisi",
"title": "no Revisi"
},
{
"field": "tglTerbit",
"title": "tgl Terbit"
},
{
"field": "pegawai",
"title": "pegawai"
},
{
"field": "pegawaiId",
"title": "pegawai Id"
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
"field": "ruangan",
"title": "ruangan"
},
{
"field": "ruanganId",
"title": "ruangan Id"
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
 columns: $scope.columnMapJabatanToUraianTugas,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.noDokumen = current.noDokumen;
$scope.item.noRevisi = current.noRevisi;
$scope.item.tglTerbit = current.tglTerbit;
$scope.item.pegawai = current.pegawai;
$scope.item.pegawaiId = current.pegawaiId;
$scope.item.jabatan = current.jabatan;
$scope.item.jabatanId = current.jabatanId;
$scope.item.ruangan = current.ruangan;
$scope.item.ruanganId = current.ruanganId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapJabatanToUraianTugas&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapJabatanToUraianTugas&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "MapJabatanToUraianTugas",
	"listField": {
"noDokumen": $scope.item.noDokumen,
"noRevisi": $scope.item.noRevisi,
"tglTerbit": $scope.item.tglTerbit,
"pegawai": $scope.item.pegawai,
"pegawaiId": $scope.item.pegawaiId,
"jabatan": $scope.item.jabatan,
"jabatanId": $scope.item.jabatanId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
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
 "class": "MapJabatanToUraianTugas",
	"listField": {
"noDokumen": $scope.item.noDokumen,
"noRevisi": $scope.item.noRevisi,
"tglTerbit": $scope.item.tglTerbit,
"pegawai": $scope.item.pegawai,
"pegawaiId": $scope.item.pegawaiId,
"jabatan": $scope.item.jabatan,
"jabatanId": $scope.item.jabatanId,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
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
$scope.listpegawai= dat.data;
});
IPSRSService.getFieldListData("Jabatan&select=id,namaExternal", true).then(function(dat){
$scope.listjabatan= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});
}
]);
});