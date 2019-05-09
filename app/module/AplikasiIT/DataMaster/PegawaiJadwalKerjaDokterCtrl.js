define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PegawaiJadwalKerjaDokterCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PegawaiJadwalKerjaDokter", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PegawaiJadwalKerjaDokter;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnPegawaiJadwalKerjaDokter = [
{
"field": "No",
"title": "No"
},
{
"field": "jamAkhir",
"title": "jam Akhir"
},
{
"field": "jamAwal",
"title": "jam Awal"
},
{
"field": "hari",
"title": "hari"
},
{
"field": "hariId",
"title": "hari Id"
},
{
"field": "kamar",
"title": "kamar"
},
{
"field": "kamarId",
"title": "kamar Id"
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
"field": "ruangan",
"title": "ruangan"
},
{
"field": "ruanganId",
"title": "ruangan Id"
},
{
"field": "statusAbsensi",
"title": "status Absensi"
},
{
"field": "statusAbsensiId",
"title": "status Absensi Id"
},
{
"field": "keteranganLainnya",
"title": "keterangan Lainnya"
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
 columns: $scope.columnPegawaiJadwalKerjaDokter,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jamAkhir = current.jamAkhir;
$scope.item.jamAwal = current.jamAwal;
$scope.item.hari = current.hari;
$scope.item.hariId = current.hariId;
$scope.item.kamar = current.kamar;
$scope.item.kamarId = current.kamarId;
$scope.item.pegawai = current.pegawai;
$scope.item.pegawaiId = current.pegawaiId;
$scope.item.ruangan = current.ruangan;
$scope.item.ruanganId = current.ruanganId;
$scope.item.statusAbsensi = current.statusAbsensi;
$scope.item.statusAbsensiId = current.statusAbsensiId;
$scope.item.keteranganLainnya = current.keteranganLainnya;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PegawaiJadwalKerjaDokter&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PegawaiJadwalKerjaDokter&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "PegawaiJadwalKerjaDokter",
	"listField": {
"jamAkhir": $scope.item.jamAkhir,
"jamAwal": $scope.item.jamAwal,
"hari": $scope.item.hari,

"kamar": $scope.item.kamar,

"pegawai": $scope.item.pegawai,

"ruangan": $scope.item.ruangan,

"statusAbsensi": $scope.item.statusAbsensi,

"keteranganLainnya": $scope.item.keteranganLainnya,
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
 "class": "PegawaiJadwalKerjaDokter",
	"listField": {
"jamAkhir": $scope.item.jamAkhir,
"jamAwal": $scope.item.jamAwal,
"hari": $scope.item.hari,

"kamar": $scope.item.kamar,

"pegawai": $scope.item.pegawai,
"ruangan": $scope.item.ruangan,

"statusAbsensi": $scope.item.statusAbsensi,

"keteranganLainnya": $scope.item.keteranganLainnya,
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
IPSRSService.getFieldListData("Hari&select=id,namaExternal", true).then(function(dat){
$scope.listhari= dat.data;
});
IPSRSService.getFieldListData("Kamar&select=id,namaExternal", true).then(function(dat){
$scope.listkamar= dat.data;
});
IPSRSService.getFieldListData("LoginUser&select=id,namaExternal", true).then(function(dat){
$scope.listpegawai= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});
IPSRSService.getFieldListData("StatusAbsensi&select=id,namaExternal", true).then(function(dat){
$scope.liststatusabsensi= dat.data;
});
}
]);
});