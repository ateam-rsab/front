////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KelompokAsuransiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapKelompokPasienToPenjamin", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapKelompokPasienToPenjamin;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnMapKelompokPasienToPenjamin = [
{
"field": "No",
"title": "No"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "kelompokPasienId",
"title": "kelompok Pasien Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
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
 columns: $scope.columnMapKelompokPasienToPenjamin,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kelompokPasien = current.kelompokPasien;
$scope.item.kelompokPasienId = current.kelompokPasienId;
$scope.item.kdPenjaminPasien = current.kdPenjaminPasien;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapKelompokPasienToPenjamin&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapKelompokPasienToPenjamin&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "MapKelompokPasienToPenjamin",
	"listField": {
"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
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
 "class": "MapKelompokPasienToPenjamin",
	"listField": {
"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
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
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});

 var initr = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=HubunganPesertaAsuransi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.HubunganPesertaAsuransi;
                                    					
$scope.dataSourcer = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initr();




$scope.columnHubunganPesertaAsuransi = [
{
"field": "No",
"title": "No"
},
{
"field": "hubunganPeserta",
"title": "hubungan Peserta"
},
{
"field": "kdHubunganPeserta",
"title": "kd Hubungan Peserta"
},
{
"field": "qHubunganPeserta",
"title": "q Hubungan Peserta"
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
	"template" : "<button class='btnEdit' ng-click='enableDatar()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatar()'>Disable</button>"
}
];
$scope.mainGridOptionsr = { 
 pageable: true,
 columns: $scope.columnHubunganPesertaAsuransi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikr = function(currentr){
$scope.showEditr = true;
$scope.currentr = currentr;
$scope.item.hubunganPeserta = currentr.hubunganPeserta;
$scope.item.kdHubunganPeserta = currentr.kdHubunganPeserta;
$scope.item.qHubunganPeserta = currentr.qHubunganPeserta;
$scope.item.id = currentr.id;
$scope.item.noRec = currentr.noRec;
$scope.item.reportDisplay = currentr.reportDisplay;
$scope.item.kodeExternal = currentr.kodeExternal;
$scope.item.namaExternal = currentr.namaExternal;
$scope.item.statusEnabled = currentr.statusEnabled;
};
$scope.disableDatar=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HubunganPesertaAsuransi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initr();
 });
 };
$scope.enableDatar=function(){
 IPSRSService.getClassMaster("delete-master-table?className=HubunganPesertaAsuransi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initr();

	});
};

$scope.tambahr = function()
 {
var data = {
	"class": "HubunganPesertaAsuransi",
	"listField": {
"hubunganPeserta": $scope.item.hubunganPeserta,
"kdHubunganPeserta": $scope.item.kdHubunganPeserta,
"qHubunganPeserta": $scope.item.qHubunganPeserta,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initr();
$scope.item = {};
 });
  }

 $scope.editr = function()
  {	
   var data = {
 "class": "HubunganPesertaAsuransi",
	"listField": {
"hubunganPeserta": $scope.item.hubunganPeserta,
"kdHubunganPeserta": $scope.item.kdHubunganPeserta,
"qHubunganPeserta": $scope.item.qHubunganPeserta,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initr();
});
}
$scope.batalr = function () {
$scope.showEditr = false;
$scope.item = {};
}

 var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=GolonganAsuransi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.GolonganAsuransi;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();




$scope.columnGolonganAsuransi = [
{
"field": "No",
"title": "No"
},
{
"field": "golonganAsuransi",
"title": "golongan Asuransi"
},
{
"field": "kdGolonganAsuransi",
"title": "kd Golongan Asuransi"
},
{
"field": "qGolonganAsuransi",
"title": "q Golongan Asuransi"
},
{
"field": "totalPremiBulan",
"title": "total Premi Bulan"
},
{
"field": "totalPremiTahun",
"title": "total Premi Tahun"
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
 columns: $scope.columnGolonganAsuransi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.golonganAsuransi = currentx.golonganAsuransi;
$scope.item.kdGolonganAsuransi = currentx.kdGolonganAsuransi;
$scope.item.qGolonganAsuransi = currentx.qGolonganAsuransi;
$scope.item.totalPremiBulan = currentx.totalPremiBulan;
$scope.item.totalPremiTahun = currentx.totalPremiTahun;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};
$scope.disableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=GolonganAsuransi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initx();
 });
 };
$scope.enableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=GolonganAsuransi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initx();

	});
};

$scope.tambahx = function()
 {
var data = {
	"class": "GolonganAsuransi",
	"listField": {
"golonganAsuransi": $scope.item.golonganAsuransi,
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"qGolonganAsuransi": $scope.item.qGolonganAsuransi,
"totalPremiBulan": $scope.item.totalPremiBulan,
"totalPremiTahun": $scope.item.totalPremiTahun,
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
 "class": "GolonganAsuransi",
	"listField": {
"golonganAsuransi": $scope.item.golonganAsuransi,
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"qGolonganAsuransi": $scope.item.qGolonganAsuransi,
"totalPremiBulan": $scope.item.totalPremiBulan,
"totalPremiTahun": $scope.item.totalPremiTahun,
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




var initp = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapGolonganAsuransiToKelas", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapGolonganAsuransiToKelas;
                                    					
$scope.dataSourcep = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initp();




$scope.columnMapGolonganAsuransiToKelas = [
{
"field": "No",
"title": "No"
},
{
"field": "kdGolonganAsuransi",
"title": "kd Golongan Asuransi"
},
{
"field": "golonganAsuransiId",
"title": "golongan Asuransi Id"
},
{
"field": "hubunganPeserta",
"title": "hubungan Peserta"
},
{
"field": "hubunganPesertaId",
"title": "hubungan Peserta Id"
},
{
"field": "kelas",
"title": "kelas"
},
{
"field": "kelasId",
"title": "kelas Id"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "kelompokPasienId",
"title": "kelompok Pasien Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
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
	"template" : "<button class='btnEdit' ng-click='enableDatap()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatap()'>Disable</button>"
}
];
$scope.mainGridOptionsp = { 
 pageable: true,
 columns: $scope.columnMapGolonganAsuransiToKelas,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikp = function(currentp){
$scope.showEditp = true;
$scope.currentp = currentp;
$scope.item.kdGolonganAsuransi = currentp.kdGolonganAsuransi;

$scope.item.hubunganPeserta = currentp.hubunganPeserta;

$scope.item.kelas = currentp.kelas;

$scope.item.kelompokPasien = currentp.kelompokPasien;

$scope.item.kdPenjaminPasien = currentp.kdPenjaminPasien;
$scope.item.id = currentp.id;
$scope.item.noRec = currentp.noRec;
$scope.item.reportDisplay = currentp.reportDisplay;
$scope.item.kodeExternal = currentp.kodeExternal;
$scope.item.namaExternal = currentp.namaExternal;
$scope.item.statusEnabled = currentp.statusEnabled;
};
$scope.disableDatap=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapGolonganAsuransiToKelas&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initp();
 });
 };
$scope.enableDatap=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapGolonganAsuransiToKelas&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initp();

	});
};

$scope.tambahp = function()
 {
var data = {
	"class": "MapGolonganAsuransiToKelas",
	"listField": {
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,

"hubunganPeserta": $scope.item.hubunganPeserta,

"kelas": $scope.item.kelas,

"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initp();
$scope.item = {};
 });
  }

 $scope.editp = function()
  {	
   var data = {
 "class": "MapGolonganAsuransiToKelas",
	"listField": {
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,

"hubunganPeserta": $scope.item.hubunganPeserta,

"kelas": $scope.item.kelas,

"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initp();
});
}
$scope.batalp = function () {
$scope.showEditp = false;
$scope.item = {};
}
IPSRSService.getFieldListData("GolonganAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listkdgolonganasuransi= dat.data;
});
IPSRSService.getFieldListData("HubunganPesertaAsuransi&select=id,namaExternal", true).then(function(dat){
$scope.listhubunganpeserta= dat.data;
});
IPSRSService.getFieldListData("DetailKamar&select=id,namaExternal", true).then(function(dat){
$scope.listkelas= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});

var initt = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapPenjaminToDokumenRegistrasi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapPenjaminToDokumenRegistrasi;
                                    					
$scope.dataSourcet = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initt();




$scope.columnMapPenjaminToDokumenRegistrasi = [
{
"field": "No",
"title": "No"
},
{
"field": "dokumen",
"title": "dokumen"
},
{
"field": "dokumenId",
"title": "dokumen Id"
},
{
"field": "kelompokPasien",
"title": "kelompok Pasien"
},
{
"field": "kelompokPasienId",
"title": "kelompok Pasien Id"
},
{
"field": "kdPenjaminPasien",
"title": "kd Penjamin Pasien"
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
	"template" : "<button class='btnEdit' ng-click='enableDatat()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatat()'>Disable</button>"
}
];
$scope.mainGridOptionst = { 
 pageable: true,
 columns: $scope.columnMapPenjaminToDokumenRegistrasi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikt = function(currentt){
$scope.showEditt = true;
$scope.currentt = currentt;
$scope.item.dokumen = currentt.dokumen;
$scope.item.dokumenId = currentt.dokumenId;
$scope.item.kelompokPasien = currentt.kelompokPasien;
$scope.item.kelompokPasienId = currentt.kelompokPasienId;
$scope.item.kdPenjaminPasien = currentt.kdPenjaminPasien;
$scope.item.id = currentt.id;
$scope.item.noRec = currentt.noRec;
$scope.item.reportDisplay = currentt.reportDisplay;
$scope.item.kodeExternal = currentt.kodeExternal;
$scope.item.namaExternal = currentt.namaExternal;
$scope.item.statusEnabled = currentt.statusEnabled;
};
$scope.disableDatat=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapPenjaminToDokumenRegistrasi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initt();
 });
 };
$scope.enableDatat=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapPenjaminToDokumenRegistrasi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initt();

	});
};

$scope.tambaht = function()
 {
var data = {
	"class": "MapPenjaminToDokumenRegistrasi",
	"listField": {
"dokumen": $scope.item.dokumen,

"kelompokPasien": $scope.item.kelompokPasien,

"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initt();
$scope.item = {};
 });
  }

 $scope.editt = function()
  {	
   var data = {
 "class": "MapPenjaminToDokumenRegistrasi",
	"listField": {
"dokumen": $scope.item.dokumen,
"dokumenId": $scope.item.dokumenId,
"kelompokPasien": $scope.item.kelompokPasien,
"kelompokPasienId": $scope.item.kelompokPasienId,
"kdPenjaminPasien": $scope.item.kdPenjaminPasien,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initt();
});
}
$scope.batalt = function () {
$scope.showEditt = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Dokumen&select=id,namaJudulDokumen", true).then(function(dat){
$scope.listdokumen= dat.data;
});
IPSRSService.getFieldListData("KelompokPasien&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokpasien= dat.data;
});




}
]);
});
/////end