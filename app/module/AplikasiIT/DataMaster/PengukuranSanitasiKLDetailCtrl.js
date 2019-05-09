define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PengukuranSanitasiKLDetailCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataPengukuranSanitasiKLDetail = new kendo.data.DataSource({
data: []
});
$scope.columnPengukuranSanitasiKLDetail = [
{
"field": "No",
"title": "No"
},
{
"field": "sanitasiKesehatanLingkungan",
"title": "sanitasi Kesehatan Lingkungan"
},
{
"field": "sanitasiKesehatanLingkunganId",
"title": "sanitasi Kesehatan Lingkungan Id"
},
{
"field": "parameterCheckSanitasiDetail",
"title": "parameter Check Sanitasi Detail"
},
{
"field": "parameterCheckSanitasiDetailId",
"title": "parameter Check Sanitasi Detail Id"
},
{
"field": "hasilPengukuran",
"title": "hasil Pengukuran"
},
{
"field": "keterangan",
"title": "keterangan"
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