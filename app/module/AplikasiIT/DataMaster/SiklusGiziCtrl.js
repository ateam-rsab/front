define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SiklusGiziCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSiklusGizi = new kendo.data.DataSource({
data: []
});
$scope.columnSiklusGizi = [
{
"field": "No",
"title": "No"
},
{
"field": "siklusKe",
"title": "siklus Ke"
},
{
"field": "jenisWaktu",
"title": "jenis Waktu"
},
{
"field": "jenisWaktuId",
"title": "jenis Waktu Id"
},
{
"field": "jenisDiet",
"title": "jenis Diet"
},
{
"field": "jenisDietId",
"title": "jenis Diet Id"
},
{
"field": "kelas",
"title": "kelas"
},
{
"field": "kelasId",
"title": "kelas Id"
},
{
"field": "kategoriProduk",
"title": "kategori Produk"
},
{
"field": "kategoriProdukId",
"title": "kategori Produk Id"
},
{
"field": "produk",
"title": "produk"
},
{
"field": "produkId",
"title": "produk Id"
},
{
"field": "bentukProduk",
"title": "bentuk Produk"
},
{
"field": "bentukProdukId",
"title": "bentuk Produk Id"
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