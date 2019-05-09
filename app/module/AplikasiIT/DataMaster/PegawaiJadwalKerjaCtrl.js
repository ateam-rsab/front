define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PegawaiJadwalKerjaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataPegawaiJadwalKerja = new kendo.data.DataSource({
data: []
});
$scope.columnPegawaiJadwalKerja = [
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
"field": "pegawaiGanti",
"title": "pegawai Ganti"
},
{
"field": "pegawaiGantiId",
"title": "pegawai Ganti Id"
},
{
"field": "ruangan",
"title": "ruangan"
},
{
"field": "ruanganId",
"title": "ruangan Id"
},
{
"field": "shift",
"title": "shift"
},
{
"field": "shiftId",
"title": "shift Id"
},
{
"field": "tanggal",
"title": "tanggal"
},
{
"field": "tanggalId",
"title": "tanggal Id"
},
{
"field": "keteranganAlasan",
"title": "keterangan Alasan"
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