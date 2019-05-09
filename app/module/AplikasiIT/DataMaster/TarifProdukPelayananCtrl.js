define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('TarifProdukPelayananCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=Alat", true).then(function(dat){
$scope.listDataMaster = dat.data.data.Alat;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnAlat = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "kdAlat",
				"title": "Komponen"
			},
			{
				"field": "namaAlat",
				"title": "Harga"
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
 columns: $scope.columnAlat,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.kdAlat = current.kdAlat;
$scope.item.namaAlat = current.namaAlat;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Alat&&id="+$scope.item.id+"&&statusEnabled=false").then

(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=Alat&&id="+$scope.item.id+"&&statusEnabled=true").then

(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "Alat",
	"listField": {
"kdAlat": $scope.item.kdAlat,
"namaAlat": $scope.item.namaAlat,
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
 "class": "Alat",
	"listField": {
"kdAlat": $scope.item.kdAlat,
"namaAlat": $scope.item.namaAlat,
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

IPSRSService.getFieldListData("Produk&select=id,namaProduk", true).then(function(dat){
$scope.listproduk= dat.data;
});

IPSRSService.getFieldListData("AsalProduk&select=id,asalProduk", true).then(function(dat){
$scope.listasalproduk= dat.data;
});

IPSRSService.getFieldListData("Kelas&select=id,namaKelas", true).then(function(dat){
$scope.listkelas= dat.data;
});

IPSRSService.getFieldListData("JenisTarif&select=id,jenisTarif", true).then(function(dat){
$scope.listjenistarif= dat.data;
});

IPSRSService.getFieldListData("KomponenHarga&select=id,komponenHarga", true).then(function(dat){
$scope.listkomponenharga= dat.data;
});

IPSRSService.getFieldListData("MataUang&select=id,mataUang", true).then(function(dat){
$scope.listmatauang= dat.data;
});






}
		]);
});