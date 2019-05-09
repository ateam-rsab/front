define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SurveiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSurvei = new kendo.data.DataSource({
data: []
});
$scope.columnSurvei = [
{
"field": "No",
"title": "No"
},
{
"field": "kelompok",
"title": "kelompok"
},
{
"field": "deskripsi",
"title": "deskripsi"
},
{
"field": "report",
"title": "report"
},
{
"field": "question",
"title": "question"
},
{
"field": "subGroup",
"title": "sub Group"
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