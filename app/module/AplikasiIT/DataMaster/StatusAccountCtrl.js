define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StatusAccountCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStatusAccount = new kendo.data.DataSource({
data: []
});
$scope.columnStatusAccount = [
{
"field": "No",
"title": "No"
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
"field": "kdStatusAccount",
"title": "kd Status Account"
},
{
"field": "qStatusAccount",
"title": "q Status Account"
},
{
"field": "statusAccount",
"title": "status Account"
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