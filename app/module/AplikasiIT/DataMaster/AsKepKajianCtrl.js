define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('AsKepKajianCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=AsKepKajian", true).then(function(dat){
$scope.listDataMaster = dat.data.data.AsKepKajian;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();
$scope.columnAsKepKajian = [
			{
				"field": "No",
				"title": "No"
			},
			{
				"field": "deskripsiKajian",
				"title": "deskripsi Kajian"
			},
			{
				"field": "kajian",
				"title": "kajian"
			},
			{
				"field": "jenisKajian",
				"title": "jenis Kajian"
			},
			{
				"field": "jenisKajianId",
				"title": "jenis Kajian Id"
			},
			{
				"field": "kdKajian",
				"title": "kd Kajian"
			},
			{
				"field": "kategoryKajian",
				"title": "kategory Kajian"
			},
			{
				"field": "kategoryKajianId",
				"title": "kategory Kajian Id"
			},
			{
				"field": "nilaiNormal",
				"title": "nilai Normal"
			},
			{
				"field": "qKajian",
				"title": "q Kajian"
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
	"title" : "Action",
	"width" : "200px",
	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
}
];
$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnAsKepKajian,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.deskripsiKajian = current.deskripsiKajian;
$scope.item.kajian = current.kajian;
$scope.item.jenisKajian = current.jenisKajian;

$scope.item.kdKajian = current.kdKajian;
$scope.item.kategoryKajian = current.kategoryKajian;

$scope.item.nilaiNormal = current.nilaiNormal;
$scope.item.qKajian = current.qKajian;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
for (var x=0;x<  $scope.listjeniskajian.length ;x++){
					if ($scope.listjeniskajian[x].id === current.jenisKajianId){
						$scope.item.jenisKajian = $scope.listjeniskajian[x];
						
					}
				}
				
for (var y=0;y<  $scope.listkategorykajian.length ;y++){
					if ($scope.listkategorykajian[y].id === current.kategoryKajianId){
						$scope.item.kategoryKajian = $scope.listkategorykajian[y];
						
					}
				}				
				
				
				
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsKepKajian&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=AsKepKajian&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};
//// save 
$scope.tambah = function()
 {
var data = {
	"class": "AsKepKajian",
	"listField": {
"deskripsiKajian": $scope.item.deskripsiKajian,
"kajian": $scope.item.kajian,
"jenisKajian": $scope.item.jenisKajian,

"kdKajian": $scope.item.kdKajian,
"kategoryKajian": $scope.item.kategoryKajian,

"nilaiNormal": $scope.item.nilaiNormal,
"qKajian": $scope.item.qKajian,
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
 "class": "AsKepKajian",
	"listField": {
"deskripsiKajian": $scope.item.deskripsiKajian,
"kajian": $scope.item.kajian,
"jenisKajian": $scope.item.jenisKajian,

"kdKajian": $scope.item.kdKajian,
"kategoryKajian": $scope.item.kategoryKajian,

"nilaiNormal": $scope.item.nilaiNormal,
"qKajian": $scope.item.qKajian,
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
IPSRSService.getFieldListData("AsKepJenisKajian&select=id,namaExternal", true).then(function(dat){
$scope.listjeniskajian= dat.data;
});
IPSRSService.getFieldListData("AsKepKategoryKajian&select=id,namaExternal", true).then(function(dat){
$scope.listkategorykajian= dat.data;
});
}
		]);
});
