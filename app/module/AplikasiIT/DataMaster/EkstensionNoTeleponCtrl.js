define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('EkstensionNoTeleponCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=EkstensionNoTelepon", true).then(function(dat){
$scope.listDataMaster = dat.data.data.EkstensionNoTelepon;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnEkstensionNoTelepon = [
{
"field": "No",
"title": "No"
},
{
"field": "counterNumber",
"title": "counter Number"
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
"field": "noEkstension",
"title": "no Ekstension"
},
{
"field": "statusSemuaRuangan",
"title": "status Semua Ruangan"
},
{
"field": "statusSemuaRuanganId",
"title": "status Semua Ruangan Id"
},
{
"field": "statusPelanggan",
"title": "status Pelanggan"
},
{
"field": "statusPelangganId",
"title": "status Pelanggan Id"
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
 columns: $scope.columnEkstensionNoTelepon,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.counterNumber = current.counterNumber;
$scope.item.ruangan = current.ruangan;
$scope.item.ruanganId = current.ruanganId;
$scope.item.noEkstension = current.noEkstension;
$scope.item.statusSemuaRuangan = current.statusSemuaRuangan;
$scope.item.statusSemuaRuanganId = current.statusSemuaRuanganId;
$scope.item.statusPelanggan = current.statusPelanggan;
$scope.item.statusPelangganId = current.statusPelangganId;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=EkstensionNoTelepon&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=EkstensionNoTelepon&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "EkstensionNoTelepon",
	"listField": {
"counterNumber": $scope.item.counterNumber,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
"noEkstension": $scope.item.noEkstension,
"statusSemuaRuangan": $scope.item.statusSemuaRuangan,
"statusSemuaRuanganId": $scope.item.statusSemuaRuanganId,
"statusPelanggan": $scope.item.statusPelanggan,
"statusPelangganId": $scope.item.statusPelangganId,
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
 "class": "EkstensionNoTelepon",
	"listField": {
"counterNumber": $scope.item.counterNumber,
"ruangan": $scope.item.ruangan,
"ruanganId": $scope.item.ruanganId,
"noEkstension": $scope.item.noEkstension,
"statusSemuaRuangan": $scope.item.statusSemuaRuangan,
"statusSemuaRuanganId": $scope.item.statusSemuaRuanganId,
"statusPelanggan": $scope.item.statusPelanggan,
"statusPelangganId": $scope.item.statusPelangganId,
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
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});
IPSRSService.getFieldListData("StatusYaTidak&select=id,namaExternal", true).then(function(dat){
$scope.liststatussemuaruangan= dat.data;
});
IPSRSService.getFieldListData("StatusYaTidak&select=id,namaExternal", true).then(function(dat){
$scope.liststatuspelanggan= dat.data;
});
}
		]);
});