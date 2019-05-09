define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SasaranStrategisCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSasaranStrategis = new kendo.data.DataSource({
data: []
});
$scope.columnSasaranStrategis = [
{
"field": "No",
"title": "No"
},
{
"field": "perspektif",
"title": "perspektif"
},
{
"field": "perspektifId",
"title": "perspektif Id"
},
{
"field": "sasaranStrategis",
"title": "sasaran Strategis"
},
{
"field": "kdSasaranStrategis",
"title": "kd Sasaran Strategis"
},
{
"field": "awalPeriode",
"title": "awal Periode"
},
{
"field": "akhirPeriode",
"title": "akhir Periode"
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