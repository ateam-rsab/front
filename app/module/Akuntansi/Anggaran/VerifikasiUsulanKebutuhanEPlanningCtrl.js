define(['initialize'], function(initialize) {
'use strict';
initialize.controller('VerifikasiUsulanKebutuhanEPlanningCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataVerifikasiUsulanKebutuhanEPlanning = new kendo.data.DataSource({
data: []
});
$scope.columnVerifikasiUsulanKebutuhanEPlanning = [
{
"field": "No",
"title": "No"
},
{
"field": "UnitKerja",
"title": "Unit Kerja"
},
{
"field": "TanggalUsulan",
"title": "Tanggal Usulan"
},
{
"field": "KodeBarang",
"title": "Kode Barang"
},
{
"field": "NamaBarang",
"title": "Nama Barang"
},
{
"field": "Qty",
"title": "Qty"
},
{
"field": "Harga",
"title": "Harga"
},
{
"field": "Total",
"title": "Total"
},
{
"field": "RencanaStrategiBisnis",
"title": "Rencana Strategi Bisnis"
},
{
"field": "Keterangan",
"title": "Keterangan"
}
];

}
]);
});