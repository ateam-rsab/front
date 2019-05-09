define(['initialize'], function(initialize) {
'use strict';
initialize.controller('ObatCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataObat = new kendo.data.DataSource({
data: []
});
$scope.columnObat = [
{
"field": "No",
"title": "No"
},
{
"field": "namaObat",
"title": "nama Obat"
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