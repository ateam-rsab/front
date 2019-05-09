define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('DetailSWOTCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=DetailSWOT", true).then(function(dat){
$scope.listDataMaster = dat.data.data.DetailSWOT;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();



$scope.columnDetailSWOT = [
{
"field": "No",
"title": "No"
},
{
"field": "swot",
"title": "swot"
},
{
"field": "swotFk",
"title": "swot Fk"
},
{
"field": "detailFaktor",
"title": "detail Faktor"
},
{
"field": "bobot",
"title": "bobot"
},
{
"field": "rating",
"title": "rating"
},
{
"field": "skor",
"title": "skor"
},
{
"field": "awalPeriode",
"title": "awal Periode"
},
{
"field": "akhirPeriode",
"title": "akhir Periode"
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
 columns: $scope.columnDetailSWOT,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.swot = current.swot;
$scope.item.swotFk = current.swotFk;
$scope.item.detailFaktor = current.detailFaktor;
$scope.item.bobot = current.bobot;
$scope.item.rating = current.rating;
$scope.item.skor = current.skor;
$scope.item.awalPeriode = current.awalPeriode;
$scope.item.akhirPeriode = current.akhirPeriode;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DetailSWOT&&id="+$scope.item.id+"&&statusEnabled=false").then

(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=DetailSWOT&&id="+$scope.item.id+"&&statusEnabled=true").then

(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "DetailSWOT",
	"listField": {
"swot": $scope.item.swot,
"swotFk": $scope.item.swotFk,
"detailFaktor": $scope.item.detailFaktor,
"bobot": $scope.item.bobot,
"rating": $scope.item.rating,
"skor": $scope.item.skor,
"awalPeriode": $scope.item.awalPeriode,
"akhirPeriode": $scope.item.akhirPeriode,
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
 "class": "DetailSWOT",
	"listField": {
"swot": $scope.item.swot,
"swotFk": $scope.item.swotFk,
"detailFaktor": $scope.item.detailFaktor,
"bobot": $scope.item.bobot,
"rating": $scope.item.rating,
"skor": $scope.item.skor,
"awalPeriode": $scope.item.awalPeriode,
"akhirPeriode": $scope.item.akhirPeriode,
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
IPSRSService.getFieldListData("SWOT&select=id,namaFaktor", true).then(function(dat){
$scope.listswot= dat.data;
});
}
		]);
});