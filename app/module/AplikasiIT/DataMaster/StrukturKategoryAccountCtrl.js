define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StrukturKategoryAccountCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStrukturKategoryAccount = new kendo.data.DataSource({
data: []
});
$scope.columnStrukturKategoryAccount = [
{
"field": "No",
"title": "No"
},
{
"field": "formatAccount",
"title": "format Account"
},
{
"field": "kategoryAccount",
"title": "kategory Account"
},
{
"field": "kategoryAccountId",
"title": "kategory Account Id"
},
{
"field": "strukturAccount",
"title": "struktur Account"
},
{
"field": "strukturAccountId",
"title": "struktur Account Id"
},
{
"field": "noUrutAkhir",
"title": "no Urut Akhir"
},
{
"field": "noUrutAwal",
"title": "no Urut Awal"
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