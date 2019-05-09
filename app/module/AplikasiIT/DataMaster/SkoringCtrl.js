define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SkoringCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSkoring = new kendo.data.DataSource({
data: []
});
$scope.columnSkoring = [
{
"field": "No",
"title": "No"
},
{
"field": "skoring",
"title": "skoring"
},
{
"field": "nama",
"title": "nama"
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