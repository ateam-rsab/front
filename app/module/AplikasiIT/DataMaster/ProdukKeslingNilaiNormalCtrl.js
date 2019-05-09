define(['initialize'], function(initialize) {
'use strict';
initialize.controller('ProdukKeslingNilaiNormalCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataProdukKeslingNilaiNormal = new kendo.data.DataSource({
data: []
});
$scope.columnProdukKeslingNilaiNormal = [
{
"field": "No",
"title": "No"
},
{
"field": "rangeMin",
"title": "range Min"
},
{
"field": "rangeMax",
"title": "range Max"
},
{
"field": "refrange",
"title": "refrange"
},
{
"field": "nilaiNormalTeks",
"title": "nilai Normal Teks"
},
{
"field": "kdKeslingNilaiNormal",
"title": "kd Kesling Nilai Normal"
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
"field": "QkeslingNilaiNormal",
"title": "Qkesling Nilai Normal"
},
{
"field": "nilaiTeks",
"title": "nilai Teks"
},
{
"field": "jenisPemeriksaan",
"title": "jenis Pemeriksaan"
},
{
"field": "jenisPemeriksaanId",
"title": "jenis Pemeriksaan Id"
},
{
"field": "satuanStandar",
"title": "satuan Standar"
},
{
"field": "satuanStandarId",
"title": "satuan Standar Id"
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