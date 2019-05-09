define(['initialize'], function(initialize) {
'use strict';
initialize.controller('ProdukDetailLaboratoriumCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataProdukDetailLaboratorium = new kendo.data.DataSource({
data: []
});
$scope.columnProdukDetailLaboratorium = [
{
"field": "No",
"title": "No"
},
{
"field": "satuanStandar",
"title": "satuan Standar"
},
{
"field": "satuanStandarFk",
"title": "satuan Standar Fk"
},
{
"field": "produkNilaiNormal",
"title": "produk Nilai Normal"
},
{
"field": "produk",
"title": "produk"
},
{
"field": "produkFk",
"title": "produk Fk"
},
{
"field": "detailPemeriksaan",
"title": "detail Pemeriksaan"
},
{
"field": "metodePemeriksaanPenunjang",
"title": "metode Pemeriksaan Penunjang"
},
{
"field": "metodePemeriksaanPenunjangId",
"title": "metode Pemeriksaan Penunjang Id"
},
{
"field": "produkDetailHasilSet",
"title": "produk Detail Hasil Set"
},
{
"field": "qCharDetailPemeriksaan",
"title": "q Char Detail Pemeriksaan"
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