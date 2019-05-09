define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PegawaiJadwalKerjaDokterDCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataPegawaiJadwalKerjaDokterD = new kendo.data.DataSource({
data: []
});
$scope.columnPegawaiJadwalKerjaDokterD = [
{
"field": "No",
"title": "No"
},
{
"field": "jamAkhir",
"title": "jam Akhir"
},
{
"field": "jamAwal",
"title": "jam Awal"
},
{
"field": "hari",
"title": "hari"
},
{
"field": "hariId",
"title": "hari Id"
},
{
"field": "kamar",
"title": "kamar"
},
{
"field": "kamarId",
"title": "kamar Id"
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
"field": "statusAbsensi",
"title": "status Absensi"
},
{
"field": "statusAbsensiId",
"title": "status Absensi Id"
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
"field": "keteranganLainnya",
"title": "keterangan Lainnya"
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