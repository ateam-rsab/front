define(['initialize'], function(initialize) {
'use strict';
initialize.controller('ProdukDetailLaboratoriumNilaiNormalCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataProdukDetailLaboratoriumNilaiNormal = new kendo.data.DataSource({
data: []
});
$scope.columnProdukDetailLaboratoriumNilaiNormal = [
{
"field": "No",
"title": "No"
},
{
"field": "ageMin",
"title": "age Min"
},
{
"field": "ageMax",
"title": "age Max"
},
{
"field": "ageUnit",
"title": "age Unit"
},
{
"field": "panicRange",
"title": "panic Range"
},
{
"field": "jenisKelamin",
"title": "jenis Kelamin"
},
{
"field": "jenisKelaminFk",
"title": "jenis Kelamin Fk"
},
{
"field": "produkDetailLaboratorium",
"title": "produk Detail Laboratorium"
},
{
"field": "produkFk",
"title": "produk Fk"
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
"field": "refRange",
"title": "ref Range"
},
{
"field": "tipeDataHasil",
"title": "tipe Data Hasil"
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