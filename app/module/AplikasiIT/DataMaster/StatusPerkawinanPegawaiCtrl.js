define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StatusPerkawinanPegawaiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStatusPerkawinanPegawai = new kendo.data.DataSource({
data: []
});
$scope.columnStatusPerkawinanPegawai = [
{
"field": "No",
"title": "No"
},
{
"field": "kdStatusPerkawinan",
"title": "kd Status Perkawinan"
},
{
"field": "qStatusPerkawinan",
"title": "q Status Perkawinan"
},
{
"field": "statusPerkawinan",
"title": "status Perkawinan"
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