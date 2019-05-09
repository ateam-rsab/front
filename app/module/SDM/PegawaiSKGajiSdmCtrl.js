define(['initialize'], function(initialize) {
    'use strict';
initialize.controller('PegawaiSKGajiSdmCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PegawaiSKGaji", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PegawaiSKGaji;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnPegawaiSKGaji = [
{
"field": "No",
"title": "No"
},
{
"field": "factorRate",
"title": "factor Rate"
},
{
"field": "hargaSatuan",
"title": "harga Satuan"
},
{
"field": "isByDay",
"title": "is By Day"
},
{
"field": "isByMonth",
"title": "is By Month"
},
{
"field": "isByWeek",
"title": "is By Week"
},
{
"field": "isByYear",
"title": "is By Year"
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
"field": "pegawai",
"title": "pegawai"
},
{
"field": "pegawaiId",
"title": "pegawai Id"
},
{
"field": "keteranganLainnya",
"title": "keterangan Lainnya"
},
{
"field": "persenHargaSatuan",
"title": "persen Harga Satuan"
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
 columns: $scope.columnPegawaiSKGaji,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.factorRate = current.factorRate;
$scope.item.hargaSatuan = current.hargaSatuan;
$scope.item.isByDay = current.isByDay;
$scope.item.isByMonth = current.isByMonth;
$scope.item.isByWeek = current.isByWeek;
$scope.item.isByYear = current.isByYear;
$scope.item.komponenHarga = current.komponenHarga;
$scope.item.komponenHargaId = current.komponenHargaId;
$scope.item.pegawai = current.pegawai;
$scope.item.pegawaiId = current.pegawaiId;
$scope.item.keteranganLainnya = current.keteranganLainnya;
$scope.item.persenHargaSatuan = current.persenHargaSatuan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PegawaiSKGaji&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PegawaiSKGaji&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "PegawaiSKGaji",
	"listField": {
"factorRate": $scope.item.factorRate,
"hargaSatuan": $scope.item.hargaSatuan,
"isByDay": $scope.item.isByDay,
"isByMonth": $scope.item.isByMonth,
"isByWeek": $scope.item.isByWeek,
"isByYear": $scope.item.isByYear,
"komponenHarga": $scope.item.komponenHarga,
"komponenHargaId": $scope.item.komponenHargaId,
"pegawai": $scope.item.pegawai,
"pegawaiId": $scope.item.pegawaiId,
"keteranganLainnya": $scope.item.keteranganLainnya,
"persenHargaSatuan": $scope.item.persenHargaSatuan,
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
 "class": "PegawaiSKGaji",
	"listField": {
"factorRate": $scope.item.factorRate,
"hargaSatuan": $scope.item.hargaSatuan,
"isByDay": $scope.item.isByDay,
"isByMonth": $scope.item.isByMonth,
"isByWeek": $scope.item.isByWeek,
"isByYear": $scope.item.isByYear,
"komponenHarga": $scope.item.komponenHarga,
"komponenHargaId": $scope.item.komponenHargaId,
"pegawai": $scope.item.pegawai,
"pegawaiId": $scope.item.pegawaiId,
"keteranganLainnya": $scope.item.keteranganLainnya,
"persenHargaSatuan": $scope.item.persenHargaSatuan,
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
IPSRSService.getFieldListData("LoginUser&select=id,namaExternal", true).then(function(dat){
$scope.listpegawai= dat.data;
});
		}
		]);
});