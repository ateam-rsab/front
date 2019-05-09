define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SubKlasifikasiArsipCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSubKlasifikasiArsip = new kendo.data.DataSource({
data: []
});
$scope.columnSubKlasifikasiArsip = [
{
"field": "No",
"title": "No"
},
{
"field": "klasifikasiArsip",
"title": "klasifikasi Arsip"
},
{
"field": "klasifikasiArsipId",
"title": "klasifikasi Arsip Id"
},
{
"field": "subKlasifikasiArsip",
"title": "sub Klasifikasi Arsip"
},
{
"field": "subKlasifikasiArsipId",
"title": "sub Klasifikasi Arsip Id"
},
{
"field": "name",
"title": "name"
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