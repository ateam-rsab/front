define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SWOTCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSWOT = new kendo.data.DataSource({
data: []
});
$scope.columnSWOT = [
{
"field": "No",
"title": "No"
},
{
"field": "namaFaktor",
"title": "nama Faktor"
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