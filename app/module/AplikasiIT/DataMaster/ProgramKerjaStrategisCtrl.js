define(['initialize'], function(initialize) {
'use strict';
initialize.controller('ProgramKerjaStrategisCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataProgramKerjaStrategis = new kendo.data.DataSource({
data: []
});
$scope.columnProgramKerjaStrategis = [
{
"field": "No",
"title": "No"
},
{
"field": "periode",
"title": "periode"
},
{
"field": "sasaranStrategis",
"title": "sasaran Strategis"
},
{
"field": "sasaranStrategisId",
"title": "sasaran Strategis Id"
},
{
"field": "programKerja",
"title": "program Kerja"
},
{
"field": "programKerjaId",
"title": "program Kerja Id"
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