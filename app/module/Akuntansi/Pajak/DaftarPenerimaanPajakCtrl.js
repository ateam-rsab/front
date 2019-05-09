define(['initialize'], function(initialize) {
'use strict';
initialize.controller('DaftarPenerimaanPajakCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataDaftarPenerimaanPajak = new kendo.data.DataSource({
data: []
});
$scope.columnDaftarPenerimaanPajak = [
{
"field": "No",
"title": "No"
},
{
"field": "Tanggal",
"title": "Tanggal"
},
{
"field": "JenisPajak",
"title": "Jenis Pajak"
},
{
"field": "NamaWajibPajak",
"title": "Nama Wajib Pajak"
},
{
"field": "Npwp",
"title": "Npwp"
},
{
"field": "NilaiObjekPajak",
"title": "Nilai Objek Pajak"
},
{
"field": "Status",
"title": "Status"
}
];

}
]);
});