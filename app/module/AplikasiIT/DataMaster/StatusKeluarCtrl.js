define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StatusKeluarCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStatusKeluar = new kendo.data.DataSource({
data: []
});
$scope.columnStatusKeluar = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisKondisiPasien",
"title": "jenis Kondisi Pasien"
},
{
"field": "jenisKondisiPasienId",
"title": "jenis Kondisi Pasien Id"
},
{
"field": "kdStatusKeluar",
"title": "kd Status Keluar"
},
{
"field": "qStatusKeluar",
"title": "q Status Keluar"
},
{
"field": "statusKeluar",
"title": "status Keluar"
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