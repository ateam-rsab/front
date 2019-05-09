define(['initialize'], function(initialize) {
'use strict';
initialize.controller('KeluhanPelangganCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataKeluhanPelanggan = new kendo.data.DataSource({
data: []
});
$scope.columnKeluhanPelanggan = [
{
"field": "No",
"title": "No"
},
{
"field": "namaPasien",
"title": "nama Pasien"
},
{
"field": "noRm",
"title": "no Rm"
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
"field": "alamat",
"title": "alamat"
},
{
"field": "email",
"title": "email"
},
{
"field": "noTlp",
"title": "no Tlp"
},
{
"field": "pekerjaan",
"title": "pekerjaan"
},
{
"field": "pekerjaanId",
"title": "pekerjaan Id"
},
{
"field": "keluhan",
"title": "keluhan"
},
{
"field": "saran",
"title": "saran"
},
{
"field": "umur",
"title": "umur"
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