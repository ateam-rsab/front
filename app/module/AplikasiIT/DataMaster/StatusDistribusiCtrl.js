define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StatusDistribusiCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStatusDistribusi = new kendo.data.DataSource({
data: []
});
$scope.columnStatusDistribusi = [
{
"field": "No",
"title": "No"
},
{
"field": "statusDistribusi",
"title": "status Distribusi"
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