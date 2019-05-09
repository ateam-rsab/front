define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KelompokRujukanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AsalRujukan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.AsalRujukan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnAsalRujukan = [
{
"field": "No",
"title": "No"
},
{
"field": "asalRujukan",
"title": "asal Rujukan"
},
{
"field": "kdAsalRujukan",
"title": "kd Asal Rujukan"
},
{
"field": "qAsalRujukan",
"title": "q Asal Rujukan"
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
 columns: $scope.columnAsalRujukan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.asalRujukan = current.asalRujukan;
$scope.item.kdAsalRujukan = current.kdAsalRujukan;
$scope.item.qAsalRujukan = current.qAsalRujukan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalRujukan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalRujukan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "AsalRujukan",
	"listField": {
"asalRujukan": $scope.item.asalRujukan,
"kdAsalRujukan": $scope.item.kdAsalRujukan,
"qAsalRujukan": $scope.item.qAsalRujukan,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal
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
 "class": "AsalRujukan",
	"listField": {
"asalRujukan": $scope.item.asalRujukan,
"kdAsalRujukan": $scope.item.kdAsalRujukan,
"qAsalRujukan": $scope.item.qAsalRujukan,
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

 var initn = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AsalProduk", true).then(function(dat){
$scope.dataSourcen = dat.data.data.AsalProduk;
 debugger;                                   					
$scope.dataSourcen = new kendo.data.DataSource({
pageSize: 10,
data: $scope.dataSourcen,
autoSync: true

});

});
}
initn();




$scope.columnAsalProduk = [
{
"field": "No",
"title": "No"
},
{
"field": "asalProduk",
"title": "asal Produk"
},
{
"field": "kdAsalProduk",
"title": "kd Asal Produk"
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
"field": "kelompokProduk",
"title": "kelompok Produk"
},
{
"field": "kelompokProdukId",
"title": "kelompok Produk Id"
},
{
"field": "qAsalProduk",
"title": "q Asal Produk"
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
	"template" : "<button class='btnEdit' ng-click='enableDatan()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatan()'>Disable</button>"
}
];
$scope.mainGridOptionsn = { 
 pageable: true,
 columns: $scope.columnAsalProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikn = function(currentn){
$scope.showEditn = true;
$scope.currentn = currentn;
$scope.item.asalProduk = currentn.asalProduk;
$scope.item.kdAsalProduk = currentn.kdAsalProduk;
$scope.item.departemen = currentn.departemen;
$scope.item.departemenId = currentn.departemenId;
$scope.item.kelompokProduk = currentn.kelompokProduk;
$scope.item.kelompokProdukId = currentn.kelompokProdukId;
$scope.item.qAsalProduk = currentn.qAsalProduk;
$scope.item.id = currentn.id;
$scope.item.noRec = currentn.noRec;
$scope.item.reportDisplay = currentn.reportDisplay;
$scope.item.kodeExternal = currentn.kodeExternal;
$scope.item.namaExternal = currentn.namaExternal;
$scope.item.statusEnabled = currentn.statusEnabled;
};
$scope.disableDatan=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initn();
 });
 };
$scope.enableDatan=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initn();

	});
};

$scope.tambahn = function()
 {
var data = {
	"class": "AsalProduk",
	"listField": {
"asalProduk": $scope.item.asalProduk,
"kdAsalProduk": $scope.item.kdAsalProduk,
"departemen": $scope.item.departemen,

"kelompokProduk": $scope.item.kelompokProduk,

"qAsalProduk": $scope.item.qAsalProduk,

"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initn();
$scope.item = {};
 });
  }

 $scope.editn = function()
  {	
   var data = {
 "class": "AsalProduk",
	"listField": {
"asalProduk": $scope.item.asalProduk,
"kdAsalProduk": $scope.item.kdAsalProduk,
"departemen": $scope.item.departemen,
"departemenId": $scope.item.departemenId,
"kelompokProduk": $scope.item.kelompokProduk,
"kelompokProdukId": $scope.item.kelompokProdukId,
"qAsalProduk": $scope.item.qAsalProduk,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initn();
});
}
$scope.bataln = function () {
$scope.showEditn = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});
IPSRSService.getFieldListData("KelompokProduk&select=id,kelompokProduk", true).then(function(dat){
$scope.listkelompokproduk= dat.data;
});
 var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AsalPeserta", true).then(function(dat){
$scope.listDataMaster = dat.data.data.AsalPeserta;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();




$scope.columnAsalPeserta = [
{
"field": "No",
"title": "No"
},
{
"field": "asalPeserta",
"title": "asal Peserta"
},
{
"field": "kdAsalPeserta",
"title": "kd Asal Peserta"
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
"field": "qAsalPeserta",
"title": "q Asal Peserta"
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
	"template" : "<button class='btnEdit' ng-click='enableDatax()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatax()'>Disable</button>"
}
];
$scope.mainGridOptionsx = { 
 pageable: true,
 columns: $scope.columnAsalPeserta,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.asalPeserta = currentx.asalPeserta;
$scope.item.kdAsalPeserta = currentx.kdAsalPeserta;
$scope.item.departemen = currentx.departemen;

$scope.item.qAsalPeserta = currentx.qAsalPeserta;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};
$scope.disableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalPeserta&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initx();
 });
 };
$scope.enableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalPeserta&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initx();

	});
};

$scope.tambahx = function()
 {
var data = {
	"class": "AsalPeserta",
	"listField": {
"asalPeserta": $scope.item.asalPeserta,
"kdAsalPeserta": $scope.item.kdAsalPeserta,
"departemen": $scope.item.departemen,

"qAsalPeserta": $scope.item.qAsalPeserta,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initx();
$scope.item = {};
 });
  }

 $scope.editx = function()
  {	
   var data = {
 "class": "AsalPeserta",
	"listField": {
"asalPeserta": $scope.item.asalPeserta,
"kdAsalPeserta": $scope.item.kdAsalPeserta,
"departemen": $scope.item.departemen,

"qAsalPeserta": $scope.item.qAsalPeserta,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initx();
});
}
$scope.batalx = function () {
$scope.showEditx = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Departemen&select=id,namaExternal", true).then(function(dat){
$scope.listdepartemen= dat.data;
});


var initf = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AsalAnggaran", true).then(function(dat){
$scope.listDataMaster = dat.data.data.AsalAnggaran;
                                    					
$scope.dataSourcef = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initf();




$scope.columnAsalAnggaran = [
{
"field": "No",
"title": "No"
},
{
"field": "asalAnggaran",
"title": "asal Anggaran"
},
{
"field": "kdAsalAnggaran",
"title": "kd Asal Anggaran"
},
{
"field": "keterangan",
"title": "keterangan"
},
{
"field": "qAsalAnggaran",
"title": "q Asal Anggaran"
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
	"template" : "<button class='btnEdit' ng-click='enableDataf()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDataf()'>Disable</button>"
}
];
$scope.mainGridOptionsf = { 
 pageable: true,
 columns: $scope.columnAsalAnggaran,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikf = function(currentf){
$scope.showEditf = true;
$scope.currentf = currentf;
$scope.item.asalAnggaran = currentf.asalAnggaran;
$scope.item.kdAsalAnggaran = currentf.kdAsalAnggaran;
$scope.item.keterangan = currentf.keterangan;
$scope.item.qAsalAnggaran = currentf.qAsalAnggaran;
$scope.item.id = currentf.id;
$scope.item.noRec = currentf.noRec;
$scope.item.reportDisplay = currentf.reportDisplay;
$scope.item.kodeExternal = currentf.kodeExternal;
$scope.item.namaExternal = currentf.namaExternal;
$scope.item.statusEnabled = currentf.statusEnabled;
};
$scope.disableDataf=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalAnggaran&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initf();
 });
 };
$scope.enableDataf=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsalAnggaran&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initf();

	});
};

$scope.tambahf = function()
 {
var data = {
	"class": "AsalAnggaran",
	"listField": {
"asalAnggaran": $scope.item.asalAnggaran,
"kdAsalAnggaran": $scope.item.kdAsalAnggaran,
"keterangan": $scope.item.keterangan,
"qAsalAnggaran": $scope.item.qAsalAnggaran,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initf();
$scope.item = {};
 });
  }

 $scope.editf = function()
  {	
   var data = {
 "class": "AsalAnggaran",
	"listField": {
"asalAnggaran": $scope.item.asalAnggaran,
"kdAsalAnggaran": $scope.item.kdAsalAnggaran,
"keterangan": $scope.item.keterangan,
"qAsalAnggaran": $scope.item.qAsalAnggaran,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initf();
});
}
$scope.batalf = function () {
$scope.showEditf = false;
$scope.item = {};
}

}
]);
});