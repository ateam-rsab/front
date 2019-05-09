define(['initialize'], function(initialize) {
	'use strict';
initialize.controller('AkunsCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
 function($q, $rootScope, $scope,IPSRSService) {
 $scope.item = {};
 $scope.dataVOloaded = true;
 $scope.now = new Date();
 var init = function () {
IPSRSService.getFieldsMasterTable("get-data-master?className=ShiftKerja", true).then(function(dat){
$scope.listDataMaster = dat.data.data.ShiftKerja;
                                    					
$scope.dataSource = new kendo.data.DataSource({
pageSize: 10,
data: $scope.listDataMaster,
autoSync: true

});

});
}
init();




$scope.columnShiftKerja = [
{
"field": "No",
"title": "No"
},
{
"field": "jadwalPraktek",
"title": "jadwal Praktek"
},
{
"field": "jadwalPraktekId",
"title": "jadwal Praktek Id"
},
{
"field": "namaShift",
"title": "nama Shift"
},
{
"field": "jamPraktek",
"title": "jam Praktek"
},
{
"field": "jamPraktekId",
"title": "jam Praktek Id"
},
{
"field": "kelompokShift",
"title": "kelompok Shift"
},
{
"field": "kelompokShiftId",
"title": "kelompok Shift Id"
},
{
"field": "kdShift",
"title": "kd Shift"
},
{
"field": "jamMasuk",
"title": "jam Masuk"
},
{
"field": "jamPulang",
"title": "jam Pulang"
},
{
"field": "jamBreakAkhir",
"title": "jam Break Akhir"
},
{
"field": "jamBreakAwal",
"title": "jam Break Awal"
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
 columns: $scope.columnShiftKerja,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };
////fungsi klik untuk edit
 $scope.klik = function(current){
$scope.showEdit = true;
$scope.current = current;
$scope.item.jadwalPraktek = current.jadwalPraktek;

$scope.item.namaShift = current.namaShift;
$scope.item.jamPraktek = current.jamPraktek;

$scope.item.kelompokShift = current.kelompokShift;

$scope.item.kdShift = current.kdShift;
$scope.item.jamMasuk = current.jamMasuk;
$scope.item.jamPulang = current.jamPulang;
$scope.item.jamBreakAkhir = current.jamBreakAkhir;
$scope.item.jamBreakAwal = current.jamBreakAwal;
$scope.item.id = current.id;
$scope.item.noRec = current.noRec;
$scope.item.reportDisplay = current.reportDisplay;
$scope.item.kodeExternal = current.kodeExternal;
$scope.item.namaExternal = current.namaExternal;
$scope.item.statusEnabled = current.statusEnabled;
for (var x=0;x<  $scope.listjadwalpraktek.length ;x++){
					if ($scope.listjadwalpraktek[x].id === current.jadwalPraktekId){
						$scope.item.jadwalPraktek = $scope.listjadwalpraktek[x];
					
					}
				}

for (var y=0;y<  $scope.listkelompokshift.length ;y++){
					if ($scope.listkelompokshift[y].id === current.kelompokShiftId){
						$scope.item.kelompokShift = $scope.listkelompokshift[y];
					
					}
				}

for (var z=0;z <  $scope.listjampraktek.length;z++){
					if ($scope.listjampraktek[z].id === current.jamPraktekId){
						$scope.item.jamPraktek = $scope.listjampraktek[z];
					
					}
				}				
				
				


};
$scope.disableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=ShiftKerja&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
 init();
 });
 };
$scope.enableData=function(){
 IPSRSService.getClassMaster("delete-master-table?className=ShiftKerja&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
 init();

	});
};

$scope.tambah = function()
 {
var data = {
	"class": "ShiftKerja",
	"listField": {
"jadwalPraktek": $scope.item.jadwalPraktek,

"namaShift": $scope.item.namaShift,
"jamPraktek": $scope.item.jamPraktek,

"kelompokShift": $scope.item.kelompokShift,

"kdShift": $scope.item.kdShift,
"jamMasuk": $scope.item.jamMasuk,
"jamPulang": $scope.item.jamPulang,
"jamBreakAkhir": $scope.item.jamBreakAkhir,
"jamBreakAwal": $scope.item.jamBreakAwal,
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
 "class": "ShiftKerja",
	"listField": {
"jadwalPraktek": $scope.item.jadwalPraktek,

"namaShift": $scope.item.namaShift,
"jamPraktek": $scope.item.jamPraktek,

"kelompokShift": $scope.item.kelompokShift,

"kdShift": $scope.item.kdShift,
"jamMasuk": $scope.item.jamMasuk,
"jamPulang": $scope.item.jamPulang,
"jamBreakAkhir": $scope.item.jamBreakAkhir,
"jamBreakAwal": $scope.item.jamBreakAwal,
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
IPSRSService.getFieldListData("JadwalPraktek&select=id,namaExternal", true).then(function(dat){
$scope.listjadwalpraktek= dat.data;
});
IPSRSService.getFieldListData("JamPraktek&select=id,jamPraktek", true).then(function(dat){
$scope.listjampraktek= dat.data;
});
IPSRSService.getFieldListData("KelompokShift&select=id,kelompokShiftKerja", true).then(function(dat){
$scope.listkelompokshift= dat.data;
});
}
]);
});