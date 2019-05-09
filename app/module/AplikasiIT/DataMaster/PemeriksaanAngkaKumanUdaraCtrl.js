define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PemeriksaanAngkaKumanUdaraCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataPemeriksaanAngkaKumanUdara = new kendo.data.DataSource({
data: []
});
$scope.columnPemeriksaanAngkaKumanUdara = [
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
"field": "volume",
"title": "volume"
},
{
"field": "bakuMutu",
"title": "baku Mutu"
},
{
"field": "bakuMutuId",
"title": "baku Mutu Id"
},
{
"field": "hasilPengukuran",
"title": "hasil Pengukuran"
},
{
"field": "fileName",
"title": "file Name"
},
{
"field": "file",
"title": "file"
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