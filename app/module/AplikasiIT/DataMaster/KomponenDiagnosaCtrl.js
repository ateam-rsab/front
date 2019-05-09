define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('KomponenDiagnosaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
		function($q, $rootScope, $scope,IPSRSService) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			var init = function () {
				IPSRSService.getFieldsMasterTable("get-data-master?className=JenisDiagnosa", true).then(function(dat){
					$scope.listDataMaster = dat.data.data.JenisDiagnosa;
					
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.listDataMaster,
						autoSync: true

					});

				});
			}
			init();




			$scope.columnJenisDiagnosa = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "jenisDiagnosa",
				"title": "jenis Diagnosa"
			},
			{
				"field": "kdJenisDiagnosa",
				"title": "kd Jenis Diagnosa"
			},
			{
				"field": "qJenisDiagnosa",
				"title": "q Jenis Diagnosa"
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
				columns: $scope.columnJenisDiagnosa,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};
////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	$scope.item.jenisDiagnosa = current.jenisDiagnosa;
	$scope.item.kdJenisDiagnosa = current.kdJenisDiagnosa;
	$scope.item.qJenisDiagnosa = current.qJenisDiagnosa;
	$scope.item.id = current.id;
	$scope.item.noRec = current.noRec;
	$scope.item.reportDisplay = current.reportDisplay;
	$scope.item.kodeExternal = current.kodeExternal;
	$scope.item.namaExternal = current.namaExternal;
	$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=JenisDiagnosa&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
		init();
	});
};
$scope.enableData=function(){
	IPSRSService.getClassMaster("delete-master-table?className=JenisDiagnosa&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
		init();

	});
};

$scope.tambah = function()
{
	var data = {
		"class": "JenisDiagnosa",
		"listField": {
			"jenisDiagnosa": $scope.item.jenisDiagnosa,
			"kdJenisDiagnosa": $scope.item.kdJenisDiagnosa,
			"qJenisDiagnosa": $scope.item.qJenisDiagnosa,
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
		"class": "JenisDiagnosa",
		"listField": {
			"jenisDiagnosa": $scope.item.jenisDiagnosa,
			"kdJenisDiagnosa": $scope.item.kdJenisDiagnosa,
			"qJenisDiagnosa": $scope.item.qJenisDiagnosa,
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

var inits = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KategoryDiagnosa", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KategoryDiagnosa;
                                    					
$scope.dataSources = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
inits();

$scope.columnKategoryDiagnosa = [
{
"field": "No",
"title": "No"
},
{
"field": "kategoryDiagnosa",
"title": "kategory Diagnosa"
},
{
"field": "kdKategoryDiagnosa",
"title": "kd Kategory Diagnosa"
},
{
"field": "qKategoryDiagnosa",
"title": "q Kategory Diagnosa"
},
{
"field": "rincianKodeDiagnosa",
"title": "rincian Kode Diagnosa"
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
	"template" : "<button class='btnedits' ng-click='enableDatas()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatas()'>Disable</button>"
}
];
$scope.mainGridOptionss = { 
 pageable: true,
 columns: $scope.columnKategoryDiagnosa,
 editsable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edits
 $scope.kliks = function(currents){
$scope.showEdits = true;
$scope.currents = currents;
$scope.item.kategoryDiagnosa = currents.kategoryDiagnosa;
$scope.item.kdKategoryDiagnosa = currents.kdKategoryDiagnosa;
$scope.item.qKategoryDiagnosa = currents.qKategoryDiagnosa;
$scope.item.rincianKodeDiagnosa = currents.rincianKodeDiagnosa;
$scope.item.id = currents.id;
$scope.item.noRec = currents.noRec;
$scope.item.reportDisplay = currents.reportDisplay;
$scope.item.kodeExternal = currents.kodeExternal;
$scope.item.namaExternal = currents.namaExternal;
$scope.item.statusEnabled = currents.statusEnabled;
};
$scope.disableDatas=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KategoryDiagnosa&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 inits();
 });
 };
$scope.enableDatas=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KategoryDiagnosa&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 inits();

	});
};
//// save 
$scope.tambahs = function()
 {
var data = {
	"class": "KategoryDiagnosa",
	"listField": {
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,
"kdKategoryDiagnosa": $scope.item.kdKategoryDiagnosa,
"qKategoryDiagnosa": $scope.item.qKategoryDiagnosa,
"rincianKodeDiagnosa": $scope.item.rincianKodeDiagnosa,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
inits();
$scope.item = {};
 });
  }
////edits
 $scope.edits = function()
  {	
   var data = {
 "class": "KategoryDiagnosa",
	"listField": {
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,
"kdKategoryDiagnosa": $scope.item.kdKategoryDiagnosa,
"qKategoryDiagnosa": $scope.item.qKategoryDiagnosa,
"rincianKodeDiagnosa": $scope.item.rincianKodeDiagnosa,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
inits();
});
}
$scope.batals = function () {
$scope.showEdits = false;
$scope.item = {};
}
var initk = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Diagnosa", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Diagnosa;
                                    					
$scope.dataSourcek = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initk();



///colom tabel

$scope.columnDiagnosa = [
{
"field": "No",
"title": "No"
},
{
"field": "kdDiagnosa",
"title": "kd Diagnosa"
},
{
"field": "jenisKelamin",
"title": "jenis Kelamin"
},
{
"field": "kategoryDiagnosa",
"title": "kategory Diagnosa"
},
{
"field": "namaDiagnosa",
"title": "nama Diagnosa"
},
{
"field": "qDiagnosa",
"title": "q Diagnosa"
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
	"template" : "<button class='btneditk' ng-click='enableDatak()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatak()'>Disable</button>"
}
];
$scope.mainGridOptionsk = { 
 pageable: true,
 columns: $scope.columnDiagnosa,
 editkable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk editk
 $scope.klikk = function(currentk){
$scope.showeditk = true;
$scope.currentk = currentk;
$scope.item.kdDiagnosa = currentk.kdDiagnosa;
$scope.item.jenisKelamin = currentk.jenisKelamin;

$scope.item.kategoryDiagnosa = currentk.kategoryDiagnosa;

$scope.item.namaDiagnosa = currentk.namaDiagnosa;
$scope.item.qDiagnosa = currentk.qDiagnosa;
$scope.item.id = currentk.id;
$scope.item.noRec = currentk.noRec;
$scope.item.reportDisplay = currentk.reportDisplay;
$scope.item.kodeExternal = currentk.kodeExternal;
$scope.item.namaExternal = currentk.namaExternal;
$scope.item.statusEnabled = currentk.statusEnabled;
};
$scope.disableDatak=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Diagnosa&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initk();
 });
 };
$scope.enableDatak=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Diagnosa&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initk();

	});
};
//// save 
$scope.tambahk = function()
 {
var data = {
	"class": "Diagnosa",
	"listField": {
"kdDiagnosa": $scope.item.kdDiagnosa,
"jenisKelamin": $scope.item.jenisKelamin,

"kategoryDiagnosa": $scope.item.kategoryDiagnosa,

"namaDiagnosa": $scope.item.namaDiagnosa,
"qDiagnosa": $scope.item.qDiagnosa,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initk();
$scope.item = {};
 });
  }
////editk
 $scope.editk = function()
  {	
   var data = {
 "class": "Diagnosa",
	"listField": {
"kdDiagnosa": $scope.item.kdDiagnosa,
"jenisKelamin": $scope.item.jenisKelamin,

"kategoryDiagnosa": $scope.item.kategoryDiagnosa,

"namaDiagnosa": $scope.item.namaDiagnosa,
"qDiagnosa": $scope.item.qDiagnosa,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initk();
});
}
$scope.batalk = function () {
$scope.showeditk = false;
$scope.item = {};
}
IPSRSService.getFieldListData("JenisKelamin&select=id,namaExternal", true).then(function(dat){
$scope.listjeniskelamin= dat.data;
});
IPSRSService.getFieldListData("KategoryDiagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listkategorydiagnosa= dat.data;
});


 var initm = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DiagnosaTindakan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DiagnosaTindakan;
                                    					
$scope.dataSourcem = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initm();



$scope.columnDiagnosaTindakan = [
{
"field": "No",
"title": "No"
},
{
"field": "kdDiagnosaTindakan",
"title": "kd Diagnosa Tindakan"
},
{
"field": "namaDiagnosaTindakan",
"title": "nama Diagnosa Tindakan"
},
{
"field": "diagnosaTindakan",
"title": "diagnosa Tindakan"
},
{
"field": "diagnosaTindakanId",
"title": "diagnosa Tindakan Id"
},
{
"field": "kategoryDiagnosa",
"title": "kategory Diagnosa"
},
{
"field": "kategoryDiagnosaId",
"title": "kategory Diagnosa Id"
},
{
"field": "qDiagnosaTindakan",
"title": "q Diagnosa Tindakan"
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
	"template" : "<button class='btneditm' ng-click='enableDatam()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatam()'>Disable</button>"
}
];
$scope.mainGridOptionsm = { 
 pageable: true,
 columns: $scope.columnDiagnosaTindakan,
 editmable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk editm
 $scope.klikm = function(currentm){
$scope.showEditm = true;
$scope.currentm = currentm;
$scope.item.kdDiagnosaTindakan = currentm.kdDiagnosaTindakan;
$scope.item.namaDiagnosaTindakan = currentm.namaDiagnosaTindakan;
$scope.item.diagnosaTindakan = currentm.diagnosaTindakan;
$scope.item.diagnosaTindakanId = currentm.diagnosaTindakanId;
$scope.item.kategoryDiagnosa = currentm.kategoryDiagnosa;
$scope.item.kategoryDiagnosaId = currentm.kategoryDiagnosaId;
$scope.item.qDiagnosaTindakan = currentm.qDiagnosaTindakan;
$scope.item.id = currentm.id;
$scope.item.noRec = currentm.noRec;
$scope.item.reportDisplay = currentm.reportDisplay;
$scope.item.kodeExternal = currentm.kodeExternal;
$scope.item.namaExternal = currentm.namaExternal;
$scope.item.statusEnabled = currentm.statusEnabled;
};
$scope.disableDatam=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaTindakan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initm();
 });
 };
$scope.enableDatam=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DiagnosaTindakan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initm();

	});
};
//// save 
$scope.tambahm = function()
 {
var data = {
	"class": "DiagnosaTindakan",
	"listField": {
"kdDiagnosaTindakan": $scope.item.kdDiagnosaTindakan,
"namaDiagnosaTindakan": $scope.item.namaDiagnosaTindakan,
"diagnosaTindakan": $scope.item.diagnosaTindakan,
"diagnosaTindakanId": $scope.item.diagnosaTindakanId,
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,
"kategoryDiagnosaId": $scope.item.kategoryDiagnosaId,
"qDiagnosaTindakan": $scope.item.qDiagnosaTindakan,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initm();
$scope.item = {};
 });
  }
////editm
 $scope.editm = function()
  {	
   var data = {
 "class": "DiagnosaTindakan",
	"listField": {
"kdDiagnosaTindakan": $scope.item.kdDiagnosaTindakan,
"namaDiagnosaTindakan": $scope.item.namaDiagnosaTindakan,
"diagnosaTindakan": $scope.item.diagnosaTindakan,
"diagnosaTindakanId": $scope.item.diagnosaTindakanId,
"kategoryDiagnosa": $scope.item.kategoryDiagnosa,
"kategoryDiagnosaId": $scope.item.kategoryDiagnosaId,
"qDiagnosaTindakan": $scope.item.qDiagnosaTindakan,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initm();
});
}
$scope.batalm = function () {
$scope.showEditm = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Diagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listdiagnosatindakan= dat.data;
});
IPSRSService.getFieldListData("KategoryDiagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listkategorydiagnosa= dat.data;
});

 var inito = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=KelompokPenyebabDiagnosa", true).then(function(dat){
$scope.listDataMaster = dat.data.data.KelompokPenyebabDiagnosa;
                                    					
$scope.dataSourceo = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
inito();



///colom tabel
$scope.columnKelompokPenyebabDiagnosa = [
{
"field": "No",
"title": "No"
},
{
"field": "kdKelompokPDiagnosa",
"title": "kd Kelompok PDiagnosa"
},
{
"field": "kelompokPDiagnosa",
"title": "kelompok PDiagnosa"
},
{
"field": "qKelompokPDiagnosa",
"title": "q Kelompok PDiagnosa"
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
	"template" : "<button class='btnEdit' ng-click='enableDatao()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDatao()'>Disable</button>"
}
];
$scope.mainGridOptionso = { 
 pageable: true,
 columns: $scope.columnKelompokPenyebabDiagnosa,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.kliko = function(currento){
$scope.showEdito = true;
$scope.currento = currento;
$scope.item.kdKelompokPDiagnosa = currento.kdKelompokPDiagnosa;
$scope.item.kelompokPDiagnosa = currento.kelompokPDiagnosa;
$scope.item.qKelompokPDiagnosa = currento.qKelompokPDiagnosa;
$scope.item.id = currento.id;
$scope.item.noRec = currento.noRec;
$scope.item.reportDisplay = currento.reportDisplay;
$scope.item.kodeExternal = currento.kodeExternal;
$scope.item.namaExternal = currento.namaExternal;
$scope.item.statusEnabled = currento.statusEnabled;
};
$scope.disableDatao=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokPenyebabDiagnosa&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 inito();
 });
 };
$scope.enableDatao=function(){
 IPSRSService.getClassMaster("delete-master-table?className=KelompokPenyebabDiagnosa&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 inito();

	});
};
//// save 
$scope.tambaho = function()
 {
var data = {
	"class": "KelompokPenyebabDiagnosa",
	"listField": {
"kdKelompokPDiagnosa": $scope.item.kdKelompokPDiagnosa,
"kelompokPDiagnosa": $scope.item.kelompokPDiagnosa,
"qKelompokPDiagnosa": $scope.item.qKelompokPDiagnosa,
"id": $scope.item.id,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
inito();
$scope.item = {};
 });
  }
////edit
 $scope.edito = function()
  {	
   var data = {
 "class": "KelompokPenyebabDiagnosa",
	"listField": {
"kdKelompokPDiagnosa": $scope.item.kdKelompokPDiagnosa,
"kelompokPDiagnosa": $scope.item.kelompokPDiagnosa,
"qKelompokPDiagnosa": $scope.item.qKelompokPDiagnosa,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
inito();
});
}
$scope.batalo = function () {
$scope.showEdito = false;
$scope.item = {};
}

var initz = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PenyebabDiagnosa", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PenyebabDiagnosa;
                                    					
$scope.dataSourcez = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initz();




$scope.columnPenyebabDiagnosa = [
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
"field": "kelompokPDiagnosa",
"title": "kelompok PDiagnosa"
},
{
"field": "kelompokPDiagnosaId",
"title": "kelompok PDiagnosa Id"
},
{
"field": "kdPenyebabDiagnosa",
"title": "kd Penyebab Diagnosa"
},
{
"field": "penyebabDiagnosa",
"title": "penyebab Diagnosa"
},
{
"field": "qPenyebabDiagnosa",
"title": "q Penyebab Diagnosa"
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
	"template" : "<button class='btnEdit' ng-click='enableDataz()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableDataz()'>Disable</button>"
}
];
$scope.mainGridOptionsz = { 
 pageable: true,
 columns: $scope.columnPenyebabDiagnosa,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikz = function(currentz){
$scope.showEditz = true;
$scope.currentz = currentz;
$scope.item.diagnosa = currentz.diagnosa;

$scope.item.kelompokPDiagnosa = currentz.kelompokPDiagnosa;

$scope.item.kdPenyebabDiagnosa = currentz.kdPenyebabDiagnosa;
$scope.item.penyebabDiagnosa = currentz.penyebabDiagnosa;
$scope.item.qPenyebabDiagnosa = currentz.qPenyebabDiagnosa;
$scope.item.id = currentz.id;
$scope.item.noRec = currentz.noRec;
$scope.item.reportDisplay = currentz.reportDisplay;
$scope.item.kodeExternal = currentz.kodeExternal;
$scope.item.namaExternal = currentz.namaExternal;
$scope.item.statusEnabled = currentz.statusEnabled;
};
$scope.disableDataz=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PenyebabDiagnosa&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initz();
 });
 };
$scope.enableDataz=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PenyebabDiagnosa&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initz();

	});
};

$scope.tambahz = function()
 {
var data = {
	"class": "PenyebabDiagnosa",
	"listField": {
"diagnosa": $scope.item.diagnosa,

"kelompokPDiagnosa": $scope.item.kelompokPDiagnosa,

"kdPenyebabDiagnosa": $scope.item.kdPenyebabDiagnosa,
"penyebabDiagnosa": $scope.item.penyebabDiagnosa,
"qPenyebabDiagnosa": $scope.item.qPenyebabDiagnosa,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
}
	}
 IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
console.log(JSON.stringify(e.data));
initz();
$scope.item = {};
 });
  }

 $scope.editz = function()
  {	
   var data = {
 "class": "PenyebabDiagnosa",
	"listField": {
"diagnosa": $scope.item.diagnosa,

"kelompokPDiagnosa": $scope.item.kelompokPDiagnosa,

"kdPenyebabDiagnosa": $scope.item.kdPenyebabDiagnosa,
"penyebabDiagnosa": $scope.item.penyebabDiagnosa,
"qPenyebabDiagnosa": $scope.item.qPenyebabDiagnosa,
"id": $scope.item.id,
"noRec": $scope.item.noRec,
"reportDisplay": $scope.item.reportDisplay,
"kodeExternal": $scope.item.kodeExternal,
"namaExternal": $scope.item.namaExternal,
"statusEnabled": $scope.item.statusEnabled
 }
 }
IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
initz();
});
}
$scope.batalz = function () {
$scope.showEditz = false;
$scope.item = {};
}
IPSRSService.getFieldListData("Diagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listdiagnosa= dat.data;
});
IPSRSService.getFieldListData("KelompokPenyebabDiagnosa&select=id,namaExternal", true).then(function(dat){
$scope.listkelompokPDiagnosa= dat.data;
});

}
]);
});