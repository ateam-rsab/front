define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('JenisResepCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=JenisResep", true).then(function(dat){
$scope.listDataMaster = dat.data.data.JenisResep;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();

$scope.columnJenisResep = [
			{
				"field": "jenisResep",
				"title": "Jenis Resep</h3>",
				"width": "200px"
			},
			{
				"field": "kdJenisResep",
				"title": "Kode Jenis Resep",
				"width": "100px"
			},
			{
				"field": "qJenisResep",
				"title": "q Jenis Resep",
				"width": "200px"
			},
			{
				"field": "reportDisplay",
				"title": "reportDisplay",
				"width": "200px"
			},
			{
				"field": "kodeExternal",
				"title": "Kode External",
				"width": "200px"
			},
			{
				"field": "namaExternal",
				"title": "Nama External",
				"width": "200px"
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
 columns: $scope.columnJenisResep,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jenisResep = current.jenisResep;
$scope.item.kdJenisResep = current.kdJenisResep;
$scope.item.qJenisResep = current.qJenisResep;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisResep&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=JenisResep&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "JenisResep",
	"listField": {
"jenisResep": $scope.item.jenisResep,
"kdJenisResep": $scope.item.kdJenisResep,
"qJenisResep": $scope.item.qJenisResep,
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
////edit
 $scope.edit = function()
  {	
   var data = {
 "class": "JenisResep",
	"listField": {
"jenisResep": $scope.item.jenisResep,
"kdJenisResep": $scope.item.kdJenisResep,
"qJenisResep": $scope.item.qJenisResep,
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
}
		]);
});