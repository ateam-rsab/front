define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('KelompokPenyakitCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KasusPenyakit", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KasusPenyakit;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnKasusPenyakit = [
{
"field": "No",
"title": "No"
},
{
"field": "kasusPenyakit",
"title": "kasus Penyakit"
},
{
"field": "kdKasusPenyakit",
"title": "kd Kasus Penyakit"
},
{
"field": "pelayananProfile",
"title": "pelayanan Profile"
},
{
"field": "pelayananProfileId",
"title": "pelayanan Profile Id"
},
{
"field": "qKasusPenyakit",
"title": "q Kasus Penyakit"
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
 columns: $scope.columnKasusPenyakit,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kasusPenyakit = current.kasusPenyakit;
$scope.item.kdKasusPenyakit = current.kdKasusPenyakit;
$scope.item.pelayananProfile = current.pelayananProfile;

$scope.item.qKasusPenyakit = current.qKasusPenyakit;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KasusPenyakit&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KasusPenyakit&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "KasusPenyakit",
	"listField": {
"kasusPenyakit": $scope.item.kasusPenyakit,
"kdKasusPenyakit": $scope.item.kdKasusPenyakit,
"pelayananProfile": $scope.item.pelayananProfile,

"qKasusPenyakit": $scope.item.qKasusPenyakit,
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
 "class": "KasusPenyakit",
	"listField": {
"kasusPenyakit": $scope.item.kasusPenyakit,
"kdKasusPenyakit": $scope.item.kdKasusPenyakit,
"pelayananProfile": $scope.item.pelayananProfile,

"qKasusPenyakit": $scope.item.qKasusPenyakit,
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
IPSRSService.getFieldListData("PelayananProfile&select=id,namaExternal", true).then(function(dat){
$scope.listpelayananprofile= dat.data;
});

 var initx = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PelayananProfile", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PelayananProfile;
                                    					
$scope.dataSourcex = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initx();



///colom tabel
$scope.columnPelayananProfile = [
{
"field": "No",
"title": "No"
},
{
"field": "hariBukaDlmMinggu",
"title": "hari Buka Dlm Minggu"
},
{
"field": "jamBukaDlmHari",
"title": "jam Buka Dlm Hari"
},
{
"field": "jenisPelayananProfile",
"title": "jenis Pelayanan Profile"
},
{
"field": "jenisPelayananProfileId",
"title": "jenis Pelayanan Profile Id"
},
{
"field": "kdPelayananProfile",
"title": "kd Pelayanan Profile"
},
{
"field": "pelayananProfile",
"title": "pelayanan Profile"
},
{
"field": "qPelayananProfile",
"title": "q Pelayanan Profile"
},
{
"field": "qtyBukaDlmMinggu",
"title": "qty Buka Dlm Minggu"
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
 columns: $scope.columnPelayananProfile,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikx = function(currentx){
$scope.showEditx = true;
$scope.currentx = currentx;
$scope.item.hariBukaDlmMinggu = currentx.hariBukaDlmMinggu;
$scope.item.jamBukaDlmHari = currentx.jamBukaDlmHari;
$scope.item.jenisPelayananProfile = currentx.jenisPelayananProfile;

$scope.item.kdPelayananProfile = currentx.kdPelayananProfile;
$scope.item.pelayananProfile = currentx.pelayananProfile;
$scope.item.qPelayananProfile = currentx.qPelayananProfile;
$scope.item.qtyBukaDlmMinggu = currentx.qtyBukaDlmMinggu;
$scope.item.id = currentx.id;
$scope.item.noRec = currentx.noRec;
$scope.item.reportDisplay = currentx.reportDisplay;
$scope.item.kodeExternal = currentx.kodeExternal;
$scope.item.namaExternal = currentx.namaExternal;
$scope.item.statusEnabled = currentx.statusEnabled;
};
$scope.disableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PelayananProfile&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initx();
 });
 };
$scope.enableDatax=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PelayananProfile&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initx();

	});
};
//// save 
$scope.tambahx = function()
 {
var data = {
	"class": "PelayananProfile",
	"listField": {
"hariBukaDlmMinggu": $scope.item.hariBukaDlmMinggu,
"jamBukaDlmHari": $scope.item.jamBukaDlmHari,
"jenisPelayananProfile": $scope.item.jenisPelayananProfile,

"kdPelayananProfile": $scope.item.kdPelayananProfile,
"pelayananProfile": $scope.item.pelayananProfile,
"qPelayananProfile": $scope.item.qPelayananProfile,
"qtyBukaDlmMinggu": $scope.item.qtyBukaDlmMinggu,
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
////edit
 $scope.editx = function()
  {	
   var data = {
 "class": "PelayananProfile",
	"listField": {
"hariBukaDlmMinggu": $scope.item.hariBukaDlmMinggu,
"jamBukaDlmHari": $scope.item.jamBukaDlmHari,
"jenisPelayananProfile": $scope.item.jenisPelayananProfile,

"kdPelayananProfile": $scope.item.kdPelayananProfile,
"pelayananProfile": $scope.item.pelayananProfile,
"qPelayananProfile": $scope.item.qPelayananProfile,
"qtyBukaDlmMinggu": $scope.item.qtyBukaDlmMinggu,
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
IPSRSService.getFieldListData("JenisPelayananProfile&select=id,namaExternal", true).then(function(dat){
$scope.listjenispelayananprofile= dat.data;
});


var initc = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapRuanganToKasusPenyakit", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapRuanganToKasusPenyakit;
                                    					
$scope.dataSourcec = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initc();



$scope.columnMapRuanganToKasusPenyakit = [
{
"field": "No",
"title": "No"
},
{
"field": "kasusPenyakit",
"title": "kasus Penyakit"
},
{
"field": "kasusPenyakitId",
"title": "kasus Penyakit Id"
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
}
,
{
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableDatac()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatac()'>Disable</button>"
}
];
$scope.mainGridOptionsc = { 
 pageable: true,
 columns: $scope.columnMapRuanganToKasusPenyakit,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikc = function(currentc){
$scope.showEditc = true;
$scope.currentc = currentc;
$scope.item.kasusPenyakit = currentc.kasusPenyakit;
$scope.item.kasusPenyakitId = currentc.kasusPenyakitId;
$scope.item.ruangan = currentc.ruangan;
$scope.item.ruanganId = currentc.ruanganId;
$scope.item.id = currentc.id;
$scope.item.noRec = currentc.noRec;
$scope.item.reportDisplay = currentc.reportDisplay;
$scope.item.kodeExternal = currentc.kodeExternal;
$scope.item.namaExternal = currentc.namaExternal;
$scope.item.statusEnabled = currentc.statusEnabled;
};
$scope.disableDatac=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToKasusPenyakit&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initc();
 });
 };
$scope.enableDatac=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapRuanganToKasusPenyakit&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initc();

	});
};
//// save 
$scope.tambahc = function()
 {
var data = {
	"class": "MapRuanganToKasusPenyakit",
	"listField": {
"kasusPenyakit": $scope.item.kasusPenyakit,

"ruangan": $scope.item.ruangan,

"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initc();
$scope.item = {};
 });
  }
////edit
 $scope.editc = function()
  {	
   var data = {
 "class": "MapRuanganToKasusPenyakit",
	"listField": {
"kasusPenyakit": $scope.item.kasusPenyakit,
"kasusPenyakitId": $scope.item.kasusPenyakitId,
"ruangan": $scope.item.ruangan,

"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initc();
});
}
$scope.batalc = function () {
$scope.showEditc = false;
$scope.item = {};
}
IPSRSService.getFieldListData("KasusPenyakit&select=id,namaExternal", true).then(function(dat){
$scope.listkasuspenyakit= dat.data;
});
IPSRSService.getFieldListData("Ruangan&select=id,namaExternal", true).then(function(dat){
$scope.listruangan= dat.data;
});

var inita = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapKasusPenyakitToPegawai", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapKasusPenyakitToPegawai;
                                    					
$scope.dataSourcea = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
inita();




$scope.columnMapKasusPenyakitToPegawai = [
{
"field": "No",
"title": "No"
},
{
"field": "kasusPenyakit",
"title": "kasus Penyakit"
},
{
"field": "kasusPenyakitId",
"title": "kasus Penyakit Id"
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
	"template" : "<button class='btnEdit' ng-click='enableDataa()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDataa()'>Disable</button>"
}
];
$scope.mainGridOptionsa = { 
 pageable: true,
 columns: $scope.columnMapKasusPenyakitToPegawai,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klika = function(currenta){
$scope.showEdita = true;
$scope.currenta = currenta;
$scope.item.kasusPenyakit = currenta.kasusPenyakit;

$scope.item.pegawai = currenta.pegawai;

$scope.item.id = currenta.id;
$scope.item.noRec = currenta.noRec;
$scope.item.reportDisplay = currenta.reportDisplay;
$scope.item.kodeExternal = currenta.kodeExternal;
$scope.item.namaExternal = currenta.namaExternal;
$scope.item.statusEnabled = currenta.statusEnabled;
};
$scope.disableDataa=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapKasusPenyakitToPegawai&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 inita();
 });
 };
$scope.enableDataa=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapKasusPenyakitToPegawai&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 inita();

	});
};

$scope.tambaha = function()
 {
var data = {
	"class": "MapKasusPenyakitToPegawai",
	"listField": {
"kasusPenyakit": $scope.item.kasusPenyakit,

"pegawai": $scope.item.pegawai,

"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
inita();
$scope.item = {};
 });
  }

 $scope.edita = function()
  {	
   var data = {
 "class": "MapKasusPenyakitToPegawai",
	"listField": {
"kasusPenyakit": $scope.item.kasusPenyakit,

"pegawai": $scope.item.pegawai,

"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
inita();
});
}
$scope.batala = function () {
$scope.showEdita = false;
$scope.item = {};
}
IPSRSService.getFieldListData("KasusPenyakit&select=id,namaExternal", true).then(function(dat){
$scope.listkasuspenyakit= dat.data;
});
IPSRSService.getFieldListData("Pegawai&select=id,namaExternal", true).then(function(dat){
$scope.listpegawai= dat.data;
});
var initv = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapKasusPenyakitToDiagnosa", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapKasusPenyakitToDiagnosa;
                                    					
$scope.dataSourcev = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initv();




$scope.columnMapKasusPenyakitToDiagnosa = [
{
"field": "No",
"title": "No"
},
{
"field": "diagnosa",
"title": "diagnosa"
},
{
"field": "diagnosaId",
"title": "diagnosa Id"
},
{
"field": "kasusPenyakit",
"title": "kasus Penyakit"
},
{
"field": "kasusPenyakitId",
"title": "kasus Penyakit Id"
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
	"template" : "<button class='btnEdit' ng-click='enableDatav()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatav()'>Disable</button>"
}
];
$scope.mainGridOptionsv = { 
 pageable: true,
 columns: $scope.columnMapKasusPenyakitToDiagnosa,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikv = function(currentv){
$scope.showEditv = true;
$scope.currentv = currentv;
$scope.item.diagnosa = currentv.diagnosa;

$scope.item.kasusPenyakit = currentv.kasusPenyakit;

$scope.item.id = currentv.id;
$scope.item.noRec = currentv.noRec;
$scope.item.reportDisplay = currentv.reportDisplay;
$scope.item.kodeExternal = currentv.kodeExternal;
$scope.item.namaExternal = currentv.namaExternal;
$scope.item.statusEnabled = currentv.statusEnabled;
};
$scope.disableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapKasusPenyakitToDiagnosa&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initv();
 });
 };
$scope.enableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapKasusPenyakitToDiagnosa&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initv();

	});
};

$scope.tambahv = function()
 {
var data = {
	"class": "MapKasusPenyakitToDiagnosa",
	"listField": {
"diagnosa": $scope.item.diagnosa,

"kasusPenyakit": $scope.item.kasusPenyakit,

"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initv();
$scope.item = {};
 });
  }

 $scope.editv = function()
  {	
   var data = {
 "class": "MapKasusPenyakitToDiagnosa",
	"listField": {
"diagnosa": $scope.item.diagnosa,

"kasusPenyakit": $scope.item.kasusPenyakit,

"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initv();
});
}
$scope.batalv = function () {
$scope.showEditv = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Diagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listdiagnosa= dat.data;
});
IPSRSService.getFieldListData("KasusPenyakit&select=id,namaExternal", true).then(function(dat){
$scope.listkasuspenyakit= dat.data;
});
}
		]);
});