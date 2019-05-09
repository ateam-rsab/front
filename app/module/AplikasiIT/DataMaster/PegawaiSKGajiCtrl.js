define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PegawaiSKGajiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataPegawaiSKGaji = new kendo.data.DataSource({
data: []
});
$scope.columnPegawaiSKGaji = [
{
"field": "No",
"title": "No"
},
{
"field": "factorRate",
"title": "factor Rate"
},
{
"field": "hargaSatuan",
"title": "harga Satuan"
},
{
"field": "isByDay",
"title": "is By Day"
},
{
"field": "isByMonth",
"title": "is By Month"
},
{
"field": "isByWeek",
"title": "is By Week"
},
{
"field": "isByYear",
"title": "is By Year"
},
{
"field": "komponenHarga",
"title": "komponen Harga"
},
{
"field": "komponenHargaId",
"title": "komponen Harga Id"
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
"field": "keteranganLainnya",
"title": "keterangan Lainnya"
},
{
"field": "persenHargaSatuan",
"title": "persen Harga Satuan"
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