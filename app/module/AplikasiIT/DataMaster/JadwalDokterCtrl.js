define(['initialize'], function(initialize) {
'use strict';
initialize.controller('JadwalDokterCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataJadwalDokter = new kendo.data.DataSource({
data: []
});
$scope.columnJadwalDokter = [
{
"field": "No",
"title": "No"
},
{
"field": "statusKehadiran",
"title": "status Kehadiran"
},
{
"field": "statusKehadiranId",
"title": "status Kehadiran Id"
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
"field": "ruangan",
"title": "ruangan"
},
{
"field": "ruanganId",
"title": "ruangan Id"
},
{
"field": "dokter",
"title": "dokter"
},
{
"field": "dokterId",
"title": "dokter Id"
},
{
"field": "quota",
"title": "quota"
},
{
"field": "tanggalJadwal",
"title": "tanggal Jadwal"
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