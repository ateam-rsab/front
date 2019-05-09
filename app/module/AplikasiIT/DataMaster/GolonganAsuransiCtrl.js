////header nya
define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('GolonganAsuransiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=GolonganAsuransi", true).then(function(dat){
$scope.listDataMaster = dat.data.data.GolonganAsuransi;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnGolonganAsuransi = [
{
"field": "No",
"title": "No"
},
{
"field": "golonganAsuransi",
"title": "golongan Asuransi"
},
{
"field": "kdGolonganAsuransi",
"title": "kd Golongan Asuransi"
},
{
"field": "qGolonganAsuransi",
"title": "q Golongan Asuransi"
},
{
"field": "totalPremiBulan",
"title": "total Premi Bulan"
},
{
"field": "totalPremiTahun",
"title": "total Premi Tahun"
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
 columns: $scope.columnGolonganAsuransi,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.golonganAsuransi = current.golonganAsuransi;
$scope.item.kdGolonganAsuransi = current.kdGolonganAsuransi;
$scope.item.qGolonganAsuransi = current.qGolonganAsuransi;
$scope.item.totalPremiBulan = current.totalPremiBulan;
$scope.item.totalPremiTahun = current.totalPremiTahun;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=GolonganAsuransi&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=GolonganAsuransi&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "GolonganAsuransi",
	"listField": {
"golonganAsuransi": $scope.item.golonganAsuransi,
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"qGolonganAsuransi": $scope.item.qGolonganAsuransi,
"totalPremiBulan": $scope.item.totalPremiBulan,
"totalPremiTahun": $scope.item.totalPremiTahun,
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
 "class": "GolonganAsuransi",
	"listField": {
"golonganAsuransi": $scope.item.golonganAsuransi,
"kdGolonganAsuransi": $scope.item.kdGolonganAsuransi,
"qGolonganAsuransi": $scope.item.qGolonganAsuransi,
"totalPremiBulan": $scope.item.totalPremiBulan,
"totalPremiTahun": $scope.item.totalPremiTahun,
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