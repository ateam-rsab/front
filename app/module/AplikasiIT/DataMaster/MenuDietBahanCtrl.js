define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('MenuDietBahanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=MenuDietBahan", true).then(function(dat){
$scope.listDataMaster = dat.data.data.MenuDietBahan;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnMenuDietBahan = [
{
"field": "No",
"title": "No"
},
{
"field": "formulasiRacikan",
"title": "formulasi Racikan"
},
{
"field": "produkBD",
"title": "produk BD"
},
{
"field": "produkBDId",
"title": "produk BDId"
},
{
"field": "produkMD",
"title": "produk MD"
},
{
"field": "produkMDId",
"title": "produk MDId"
},
{
"field": "satuanKecil",
"title": "satuan Kecil"
},
{
"field": "satuanKecilId",
"title": "satuan Kecil Id"
},
{
"field": "satuanStandar",
"title": "satuan Standar"
},
{
"field": "satuanStandarId",
"title": "satuan Standar Id"
},
{
"field": "keteranganLainnya",
"title": "keterangan Lainnya"
},
{
"field": "qtyProduk",
"title": "qty Produk"
},
{
"field": "satuan",
"title": "satuan"
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
 columns: $scope.columnMenuDietBahan,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.formulasiRacikan = current.formulasiRacikan;
$scope.item.produkBD = current.produkBD;
$scope.item.produkBDId = current.produkBDId;
$scope.item.produkMD = current.produkMD;
$scope.item.produkMDId = current.produkMDId;
$scope.item.satuanKecil = current.satuanKecil;
$scope.item.satuanKecilId = current.satuanKecilId;
$scope.item.satuanStandar = current.satuanStandar;
$scope.item.satuanStandarId = current.satuanStandarId;
$scope.item.keteranganLainnya = current.keteranganLainnya;
$scope.item.qtyProduk = current.qtyProduk;
$scope.item.satuan = current.satuan;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MenuDietBahan&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=MenuDietBahan&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "MenuDietBahan",
	"listField": {
"formulasiRacikan": $scope.item.formulasiRacikan,
"produkBD": $scope.item.produkBD,

"produkMD": $scope.item.produkMD,

"satuanKecil": $scope.item.satuanKecil,

"satuanStandar": $scope.item.satuanStandar,

"keteranganLainnya": $scope.item.keteranganLainnya,
"qtyProduk": $scope.item.qtyProduk,
"satuan": $scope.item.satuan,
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

 $scope.edit = function()
  {	
   var data = {
 "class": "MenuDietBahan",
	"listField": {
"formulasiRacikan": $scope.item.formulasiRacikan,
"produkBD": $scope.item.produkBD,

"produkMD": $scope.item.produkMD,

"satuanKecil": $scope.item.satuanKecil,

"satuanStandar": $scope.item.satuanStandar,

"keteranganLainnya": $scope.item.keteranganLainnya,
"qtyProduk": $scope.item.qtyProduk,
"satuan": $scope.item.satuan,
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
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listprodukbd= dat.data;
});
IPSRSService.getFieldListData("Produk&select=id,namaExternal", true).then(function(dat){
$scope.listprodukmd= dat.data;
});
IPSRSService.getFieldListData("SatuanKecil&select=id,namaExternal", true).then(function(dat){
$scope.listsatuankecil= dat.data;
});
IPSRSService.getFieldListData("SatuanStandar&select=id,namaExternal", true).then(function(dat){
$scope.listsatuanstandar= dat.data;
});
}
]);
});