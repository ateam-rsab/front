define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('PenghasilanTidakKenaPajakCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=PenghasilanTidakKenaPajak", true).then(function(dat){
$scope.listDataMaster = dat.data.data.PenghasilanTidakKenaPajak;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnPenghasilanTidakKenaPajak = [
{
"field": "No",
"title": "No"
},
{
"field": "deskripsi",
"title": "deskripsi"
},
{
"field": "kdPTKP",
"title": "kd PTKP"
},
{
"field": "statusPerkawinan",
"title": "status Perkawinan"
},
{
"field": "statusPerkawinanId",
"title": "status Perkawinan Id"
},
{
"field": "qPTKP",
"title": "q PTKP"
},
{
"field": "qtyAnak",
"title": "qty Anak"
},
{
"field": "statusPTKP",
"title": "status PTKP"
},
{
"field": "totalHargaPTKP",
"title": "total Harga PTKP"
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
 columns: $scope.columnPenghasilanTidakKenaPajak,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.deskripsi = current.deskripsi;
$scope.item.kdPTKP = current.kdPTKP;
$scope.item.statusPerkawinan = current.statusPerkawinan;
$scope.item.statusPerkawinanId = current.statusPerkawinanId;
$scope.item.qPTKP = current.qPTKP;
$scope.item.qtyAnak = current.qtyAnak;
$scope.item.statusPTKP = current.statusPTKP;
$scope.item.totalHargaPTKP = current.totalHargaPTKP;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PenghasilanTidakKenaPajak&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=PenghasilanTidakKenaPajak&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "PenghasilanTidakKenaPajak",
	"listField": {
"deskripsi": $scope.item.deskripsi,
"kdPTKP": $scope.item.kdPTKP,
"statusPerkawinan": $scope.item.statusPerkawinan,
"statusPerkawinanId": $scope.item.statusPerkawinanId,
"qPTKP": $scope.item.qPTKP,
"qtyAnak": $scope.item.qtyAnak,
"statusPTKP": $scope.item.statusPTKP,
"totalHargaPTKP": $scope.item.totalHargaPTKP,
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
 "class": "PenghasilanTidakKenaPajak",
	"listField": {
"deskripsi": $scope.item.deskripsi,
"kdPTKP": $scope.item.kdPTKP,
"statusPerkawinan": $scope.item.statusPerkawinan,
"statusPerkawinanId": $scope.item.statusPerkawinanId,
"qPTKP": $scope.item.qPTKP,
"qtyAnak": $scope.item.qtyAnak,
"statusPTKP": $scope.item.statusPTKP,
"totalHargaPTKP": $scope.item.totalHargaPTKP,
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
IPSRSService.getFieldListData("StatusPerkawinan&select=id,namaExternal", true).then(function(dat){
$scope.liststatusperkawinan= dat.data;
});
}
		]);
});
