define(['initialize'], function(initialize) {
	'use strict';

initialize.controller('KelompokRangeCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisRange", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisRange;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



///colom tabel
	$scope.columnJenisRange = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "golonganProduk",
				"title": "golongan Produk"
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
				"field": "kdGolonganProduk",
				"title": "kd Golongan Produk"
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
				"field": "qGolonganProduk",
				"title": "q Golongan Produk"
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
 columns: $scope.columnJenisRange,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisRange = current.jenisRange;
$scope.item.kdJenisRange = current.kdJenisRange;
$scope.item.jenisRangeHead = current.jenisRangeHead;

$scope.item.qJenisRange = current.qJenisRange;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisRange&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisRange&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "JenisRange",
	"listField": {
"jenisRange": $scope.item.jenisRange,
"kdJenisRange": $scope.item.kdJenisRange,
"jenisRangeHead": $scope.item.jenisRangeHead,

"qJenisRange": $scope.item.qJenisRange,
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
 "class": "JenisRange",
	"listField": {
"jenisRange": $scope.item.jenisRange,
"kdJenisRange": $scope.item.kdJenisRange,
"jenisRangeHead": $scope.item.jenisRangeHead,

"qJenisRange": $scope.item.qJenisRange,
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
IPSRSService.getFieldListData("JenisRange&select=id,namaExternal", true).then(function(dat){
$scope.listjenisrangehead= dat.data;
});
/////end
var initv = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Range", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Range;
                                    					
$scope.dataSourcev = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
initv();




$scope.columnRange = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisRange",
"title": "jenis Range"
},
{
"field": "jenisRangeId",
"title": "jenis Range Id"
},
{
"field": "kdRange",
"title": "kd Range"
},
{
"field": "namaRange",
"title": "nama Range"
},
{
"field": "qRange",
"title": "q Range"
},
{
"field": "rangeMax",
"title": "range Max"
},
{
"field": "rangeMin",
"title": "range Min"
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
 columns: $scope.columnRange,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klikv = function(currentv){
$scope.showEditv = true;
$scope.currentv = currentv;
$scope.item.jenisRange = currentv.jenisRange;

$scope.item.kdRange = currentv.kdRange;
$scope.item.namaRange = currentv.namaRange;
$scope.item.qRange = currentv.qRange;
$scope.item.rangeMax = currentv.rangeMax;
$scope.item.rangeMin = currentv.rangeMin;
$scope.item.id = currentv.id;
$scope.item.noRec = currentv.noRec;
$scope.item.reportDisplay = currentv.reportDisplay;
$scope.item.kodeExternal = currentv.kodeExternal;
$scope.item.namaExternal = currentv.namaExternal;
$scope.item.statusEnabled = currentv.statusEnabled;
};
$scope.disableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Range&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 initv();
 });
 };
$scope.enableDatav=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Range&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 initv();

	});
};

$scope.tambahv = function()
 {
var data = {
	"class": "Range",
	"listField": {
"jenisRange": $scope.item.jenisRange,
"kdRange": $scope.item.kdRange,
"namaRange": $scope.item.namaRange,
"qRange": $scope.item.qRange,
"rangeMax": $scope.item.rangeMax,
"rangeMin": $scope.item.rangeMin,
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
 "class": "Range",
	"listField": {
"jenisRange": $scope.item.jenisRange,

"kdRange": $scope.item.kdRange,
"namaRange": $scope.item.namaRange,
"qRange": $scope.item.qRange,
"rangeMax": $scope.item.rangeMax,
"rangeMin": $scope.item.rangeMin,
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
IPSRSService.getFieldListData("JenisRange&select=id,namaExternal", true).then(function(dat){
$scope.listjenisrange= dat.data;
});



	}
		]);
});
