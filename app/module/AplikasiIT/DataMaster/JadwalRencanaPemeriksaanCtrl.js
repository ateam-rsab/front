define(['initialize'], function(initialize) {
'use strict';
initialize.controller('JadwalRencanaPemeriksaanCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataJadwalRencanaPemeriksaan = new kendo.data.DataSource({
data: []
});
$scope.columnJadwalRencanaPemeriksaan = [
{
"field": "No",
"title": "No"
},
{
"field": "pegawai",
"title": "pegawai"
},
{
"field": "pegawaiId",
"title": "pegawai Id"
},
{
"field": "pemeriksaan",
"title": "pemeriksaan"
},
{
"field": "tglPemeriksaan",
"title": "tgl Pemeriksaan"
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