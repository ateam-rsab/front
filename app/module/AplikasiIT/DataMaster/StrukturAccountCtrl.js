define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StrukturAccountCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStrukturAccount = new kendo.data.DataSource({
data: []
});
$scope.columnStrukturAccount = [
{
"field": "No",
"title": "No"
},
{
"field": "formatAccount",
"title": "format Account"
},
{
"field": "historyLoginI",
"title": "history Login I"
},
{
"field": "historyLoginIId",
"title": "history Login IId"
},
{
"field": "historyLoginS",
"title": "history Login S"
},
{
"field": "historyLoginSId",
"title": "history Login SId"
},
{
"field": "historyLoginU",
"title": "history Login U"
},
{
"field": "historyLoginUId",
"title": "history Login UId"
},
{
"field": "jenisAccount",
"title": "jenis Account"
},
{
"field": "jenisAccountId",
"title": "jenis Account Id"
},
{
"field": "kdStrukturAccount",
"title": "kd Struktur Account"
},
{
"field": "levelAccount",
"title": "level Account"
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
"field": "strukturAccount",
"title": "struktur Account"
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