define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StatusAbsensiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStatusAbsensi = new kendo.data.DataSource({
data: []
});
$scope.columnStatusAbsensi = [
{
"field": "No",
"title": "No"
},
{
"field": "kdStatusAbsensi",
"title": "kd Status Absensi"
},
{
"field": "qStatusAbsensi",
"title": "q Status Absensi"
},
{
"field": "statusAbsensi",
"title": "status Absensi"
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