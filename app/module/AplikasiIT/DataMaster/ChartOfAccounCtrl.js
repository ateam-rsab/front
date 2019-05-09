define(['initialize'], function(initialize) {
'use strict';
initialize.controller('ChartOfAccounCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=ChartOfAccount", true).then(function(dat){
$scope.listDataMaster = dat.data.data.ChartOfAccount;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();


$scope.columnChartOfAccount = [
{
"field": "No",
"title": "No"
},
{
"field": "kdAccount",
"title": "kd Account"
},
{
"field": "kdAccountEffectAdd",
"title": "kd Account Effect Add"
},
{
"field": "kdAccountEffectMin",
"title": "kd Account Effect Min"
},
{
"field": "accountHead",
"title": "account Head"
},
{
"field": "accountHeadId",
"title": "account Head Id"
},
{
"field": "jenisAccount",
"title": "jenis Account"
},
{
"field": "jenisAccountId",
"title": "jenis Account Id"
},
{
"field": "kategoryAccount",
"title": "kategory Account"
},
{
"field": "kategoryAccountId",
"title": "kategory Account Id"
},
{
"field": "statusAccount",
"title": "status Account"
},
{
"field": "statusAccountId",
"title": "status Account Id"
},
{
"field": "strukturAccount",
"title": "struktur Account"
},
{
"field": "strukturAccountId",
"title": "struktur Account Id"
},
{
"field": "namaAccount",
"title": "nama Account"
},
{
"field": "noAccount",
"title": "no Account"
},
{
"field": "qAccount",
"title": "q Account"
},
{
"field": "saldoAkhirDTahunBerjalan",
"title": "saldo Akhir DTahun Berjalan"
},
{
"field": "saldoAkhirKTahunBerjalan",
"title": "saldo Akhir KTahun Berjalan"
},
{
"field": "saldoAwalDTahunBerjalan",
"title": "saldo Awal DTahun Berjalan"
},
{
"field": "saldoAwalKTahunBerjalan",
"title": "saldo Awal KTahun Berjalan"
},
{
"field": "saldoNormalAdd",
"title": "saldo Normal Add"
},
{
"field": "saldoNormalEffectAdd",
"title": "saldo Normal Effect Add"
},
{
"field": "saldoNormalEffectMin",
"title": "saldo Normal Effect Min"
},
{
"field": "saldoNormalMin",
"title": "saldo Normal Min"
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
 columns: $scope.columnChartOfAccount,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kdAccount = current.kdAccount;
$scope.item.kdAccountEffectAdd = current.kdAccountEffectAdd;
$scope.item.kdAccountEffectMin = current.kdAccountEffectMin;
$scope.item.accountHead = current.accountHead;
$scope.item.accountHeadId = current.accountHeadId;
$scope.item.jenisAccount = current.jenisAccount;
$scope.item.jenisAccountId = current.jenisAccountId;
$scope.item.kategoryAccount = current.kategoryAccount;
$scope.item.kategoryAccountId = current.kategoryAccountId;
$scope.item.statusAccount = current.statusAccount;
$scope.item.statusAccountId = current.statusAccountId;
$scope.item.strukturAccount = current.strukturAccount;
$scope.item.strukturAccountId = current.strukturAccountId;
$scope.item.namaAccount = current.namaAccount;
$scope.item.noAccount = current.noAccount;
$scope.item.qAccount = current.qAccount;
$scope.item.saldoAkhirDTahunBerjalan = current.saldoAkhirDTahunBerjalan;
$scope.item.saldoAkhirKTahunBerjalan = current.saldoAkhirKTahunBerjalan;
$scope.item.saldoAwalDTahunBerjalan = current.saldoAwalDTahunBerjalan;
$scope.item.saldoAwalKTahunBerjalan = current.saldoAwalKTahunBerjalan;
$scope.item.saldoNormalAdd = current.saldoNormalAdd;
$scope.item.saldoNormalEffectAdd = current.saldoNormalEffectAdd;
$scope.item.saldoNormalEffectMin = current.saldoNormalEffectMin;
$scope.item.saldoNormalMin = current.saldoNormalMin;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=ChartOfAccount&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=ChartOfAccount&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "ChartOfAccount",
	"listField": {
"kdAccount": $scope.item.kdAccount,
"kdAccountEffectAdd": $scope.item.kdAccountEffectAdd,
"kdAccountEffectMin": $scope.item.kdAccountEffectMin,
"accountHead": $scope.item.accountHead,

"jenisAccount": $scope.item.jenisAccount,

"kategoryAccount": $scope.item.kategoryAccount,

"statusAccount": $scope.item.statusAccount,

"strukturAccount": $scope.item.strukturAccount,

"namaAccount": $scope.item.namaAccount,
"noAccount": $scope.item.noAccount,
"qAccount": $scope.item.qAccount,
"saldoAkhirDTahunBerjalan": $scope.item.saldoAkhirDTahunBerjalan,
"saldoAkhirKTahunBerjalan": $scope.item.saldoAkhirKTahunBerjalan,
"saldoAwalDTahunBerjalan": $scope.item.saldoAwalDTahunBerjalan,
"saldoAwalKTahunBerjalan": $scope.item.saldoAwalKTahunBerjalan,
"saldoNormalAdd": $scope.item.saldoNormalAdd,
"saldoNormalEffectAdd": $scope.item.saldoNormalEffectAdd,
"saldoNormalEffectMin": $scope.item.saldoNormalEffectMin,
"saldoNormalMin": $scope.item.saldoNormalMin,
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
 "class": "ChartOfAccount",
	"listField": {
"kdAccount": $scope.item.kdAccount,
"kdAccountEffectAdd": $scope.item.kdAccountEffectAdd,
"kdAccountEffectMin": $scope.item.kdAccountEffectMin,
"accountHead": $scope.item.accountHead,

"jenisAccount": $scope.item.jenisAccount,

"kategoryAccount": $scope.item.kategoryAccount,

"statusAccount": $scope.item.statusAccount,

"strukturAccount": $scope.item.strukturAccount,

"namaAccount": $scope.item.namaAccount,
"noAccount": $scope.item.noAccount,
"qAccount": $scope.item.qAccount,
"saldoAkhirDTahunBerjalan": $scope.item.saldoAkhirDTahunBerjalan,
"saldoAkhirKTahunBerjalan": $scope.item.saldoAkhirKTahunBerjalan,
"saldoAwalDTahunBerjalan": $scope.item.saldoAwalDTahunBerjalan,
"saldoAwalKTahunBerjalan": $scope.item.saldoAwalKTahunBerjalan,
"saldoNormalAdd": $scope.item.saldoNormalAdd,
"saldoNormalEffectAdd": $scope.item.saldoNormalEffectAdd,
"saldoNormalEffectMin": $scope.item.saldoNormalEffectMin,
"saldoNormalMin": $scope.item.saldoNormalMin,
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
IPSRSService.getFieldListData("ChartOfAccount&select=id,namaAccount", true).then(function(dat){
$scope.listaccounthead= dat.data;
});
IPSRSService.getFieldListData("JenisAccount&select=id,namaExternal", true).then(function(dat){
$scope.listjenisaccount= dat.data;
});
IPSRSService.getFieldListData("KategoryAccount&select=id,namaExternal", true).then(function(dat){
$scope.listkategoryaccount= dat.data;
});
IPSRSService.getFieldListData("StatusAccount&select=id,namaExternal", true).then(function(dat){
$scope.liststatusaccount= dat.data;
});
IPSRSService.getFieldListData("StrukturAccount&select=id,namaExternal", true).then(function(dat){
$scope.liststrukturaccount= dat.data;
});
}
]);
});
