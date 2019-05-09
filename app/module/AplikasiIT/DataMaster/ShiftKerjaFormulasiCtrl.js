define(['initialize'], function(initialize) {
'use strict';
initialize.controller('ShiftKerjaFormulasiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataShiftKerjaFormulasi = new kendo.data.DataSource({
data: []
});
$scope.columnShiftKerjaFormulasi = [
{
"field": "No",
"title": "No"
},
{
"field": "departemen",
"title": "departemen"
},
{
"field": "departemenId",
"title": "departemen Id"
},
{
"field": "shiftNextNotAllowed",
"title": "shift Next Not Allowed"
},
{
"field": "shiftNextNotAllowedId",
"title": "shift Next Not Allowed Id"
},
{
"field": "shiftStart",
"title": "shift Start"
},
{
"field": "shiftStartId",
"title": "shift Start Id"
},
{
"field": "qtyHariKerjaPerBulan",
"title": "qty Hari Kerja Per Bulan"
},
{
"field": "qtyHariKerjaToLibur",
"title": "qty Hari Kerja To Libur"
},
{
"field": "qtyHariKerjaToNewShift",
"title": "qty Hari Kerja To New Shift"
},
{
"field": "qtyHariLiburPerBulan",
"title": "qty Hari Libur Per Bulan"
},
{
"field": "qtyHariLiburPerSiklus",
"title": "qty Hari Libur Per Siklus"
},
{
"field": "qtyPegawaiPerShift",
"title": "qty Pegawai Per Shift"
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
}
];

}
]);
});