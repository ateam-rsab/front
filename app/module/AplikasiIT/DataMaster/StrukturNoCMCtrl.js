define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StrukturNoCMCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStrukturNoCM = new kendo.data.DataSource({
data: []
});
$scope.columnStrukturNoCM = [
{
"field": "No",
"title": "No"
},
{
"field": "automaticNoCMMember",
"title": "automatic No CMMember"
},
{
"field": "automaticNoCMNonMember",
"title": "automatic No CMNon Member"
},
{
"field": "formatNoCMMember",
"title": "format No CMMember"
},
{
"field": "formatNoCMNonMember",
"title": "format No CMNon Member"
},
{
"field": "isDefault",
"title": "is Default"
},
{
"field": "departemen",
"title": "departemen"
},
{
"field": "departemenId",
"title": "departemen Id"
},
{
"field": "kdStrukturNoCM",
"title": "kd Struktur No CM"
},
{
"field": "noUrutAkhirMember",
"title": "no Urut Akhir Member"
},
{
"field": "noUrutAkhirNonMember",
"title": "no Urut Akhir Non Member"
},
{
"field": "noUrutAwalMember",
"title": "no Urut Awal Member"
},
{
"field": "noUrutAwalNonMember",
"title": "no Urut Awal Non Member"
},
{
"field": "strukturNoCM",
"title": "struktur No CM"
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