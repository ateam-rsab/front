define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SuratCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSurat = new kendo.data.DataSource({
data: []
});
$scope.columnSurat = [
{
"field": "No",
"title": "No"
},
{
"field": "kode",
"title": "kode"
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