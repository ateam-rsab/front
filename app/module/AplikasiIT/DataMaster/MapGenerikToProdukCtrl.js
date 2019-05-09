define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MapGenerikToProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MapGenerikToProduk", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MapGenerikToProduk;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnMapGenerikToProduk = [
{
"field": "No",
"title": "No"
},
{
"field": "generik",
"title": "generik"
},
{
"field": "generikId",
"title": "generik Id"
},
{
"field": "produk",
"title": "produk"
},
{
"field": "produkId",
"title": "produk Id"
},
{
"field": "satuanDosis",
"title": "satuan Dosis"
},
{
"field": "satuanDosisId",
"title": "satuan Dosis Id"
},
{
"field": "satuanSediaan",
"title": "satuan Sediaan"
},
{
"field": "satuanSediaanId",
"title": "satuan Sediaan Id"
},
{
"field": "satuanVolume",
"title": "satuan Volume"
},
{
"field": "satuanVolumeId",
"title": "satuan Volume Id"
},
{
"field": "kekuatanDosis",
"title": "kekuatan Dosis"
},
{
"field": "volume",
"title": "volume"
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
 columns: $scope.columnMapGenerikToProduk,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.generik = current.generik;
$scope.item.generikId = current.generikId;
$scope.item.produk = current.produk;
$scope.item.produkId = current.produkId;
$scope.item.satuanDosis = current.satuanDosis;
$scope.item.satuanDosisId = current.satuanDosisId;
$scope.item.satuanSediaan = current.satuanSediaan;
$scope.item.satuanSediaanId = current.satuanSediaanId;
$scope.item.satuanVolume = current.satuanVolume;
$scope.item.satuanVolumeId = current.satuanVolumeId;
$scope.item.kekuatanDosis = current.kekuatanDosis;
$scope.item.volume = current.volume;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapGenerikToProduk&&id="+$scope.item.id

+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MapGenerikToProduk&&id="+$scope.item.id

+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "MapGenerikToProduk",
	"listField": {
"generik": $scope.item.generik,

"produk": $scope.item.produk,

"satuanDosis": $scope.item.satuanDosis,

"satuanSediaan": $scope.item.satuanSediaan,

"satuanVolume": $scope.item.satuanVolume,

"kekuatanDosis": $scope.item.kekuatanDosis,
"volume": $scope.item.volume,
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
 "class": "MapGenerikToProduk",
	"listField": {
"generik": $scope.item.generik,

"produk": $scope.item.produk,

"satuanDosis": $scope.item.satuanDosis,

"satuanSediaan": $scope.item.satuanSediaan,

"satuanVolume": $scope.item.satuanVolume,

"kekuatanDosis": $scope.item.kekuatanDosis,
"volume": $scope.item.volume,
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
IPSRSService.getFieldListData("Generik&select=id,namaExternal", true).then(function(dat){
$scope.listgenerik= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listproduk= dat.data;
});
IPSRSService.getFieldListData("SatuanStandar&select=id,namaExternal", true).then(function(dat){
$scope.listsatuandosis= dat.data;
});
IPSRSService.getFieldListData("Sediaan&select=id,namaExternal", true).then(function(dat){
$scope.listsatuansediaan= dat.data;
});
IPSRSService.getFieldListData("SatuanStandar&select=id,namaExternal", true).then(function(dat){
$scope.listsatuanvolume= dat.data;
});
	}
		]);
});