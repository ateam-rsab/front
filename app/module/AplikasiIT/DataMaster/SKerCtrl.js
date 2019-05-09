define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SKerCtrl', ['$q', '$rootScope', '$scope','IPSRSService',
function($q, $rootScope, $scope) {
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

}
]);
});