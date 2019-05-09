define(['initialize'], function(initialize) {
'use strict';
initialize.controller('LimbahB3MasukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataLimbahB3Masuk = new kendo.data.DataSource({
data: []
});
$scope.columnLimbahB3Masuk = [
{
"field": "No",
"title": "No"
},
{
"field": "jenisLimbahB3Masuk",
"title": "jenis Limbah B3Masuk"
},
{
"field": "jenisLimbahB3MasukId",
"title": "jenis Limbah B3Masuk Id"
},
{
"field": "tanggal",
"title": "tanggal"
},
{
"field": "beratSampahMedis",
"title": "berat Sampah Medis"
},
{
"field": "waktu",
"title": "waktu"
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
"field": "mapPegawaiLimbah",
"title": "map Pegawai Limbah"
},
{
"field": "maksimalPenyimpanan",
"title": "maksimal Penyimpanan"
},
{
"field": "qtyKeluar",
"title": "qty Keluar"
},
{
"field": "statusEnabled",
"title": "status Enabled"
}
];

}
]);
});