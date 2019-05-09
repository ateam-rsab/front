define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StatusBarangCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStatusBarang = new kendo.data.DataSource({
data: []
});
$scope.columnStatusBarang = [
{
"field": "No",
"title": "No"
},
{
"field": "name",
"title": "name"
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