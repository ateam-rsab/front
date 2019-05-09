define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SwabAlatPermukaanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSwabAlatPermukaan = new kendo.data.DataSource({
data: []
});
$scope.columnSwabAlatPermukaan = [
{
"field": "No",
"title": "No"
},
{
"field": "tanggal",
"title": "tanggal"
},
{
"field": "namaRuangan",
"title": "nama Ruangan"
},
{
"field": "namaRuanganId",
"title": "nama Ruangan Id"
},
{
"field": "jenisAlat",
"title": "jenis Alat"
},
{
"field": "hasilPemeriksaan",
"title": "hasil Pemeriksaan"
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