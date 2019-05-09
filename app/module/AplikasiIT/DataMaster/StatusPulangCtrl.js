define(['initialize'], function(initialize) {
'use strict';
initialize.controller('StatusPulangCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataStatusPulang = new kendo.data.DataSource({
data: []
});
$scope.columnStatusPulang = [
{
"field": "No",
"title": "No"
},
{
"field": "isSendOut",
"title": "is Send Out"
},
{
"field": "kdStatusPulang",
"title": "kd Status Pulang"
},
{
"field": "qStatusPulang",
"title": "q Status Pulang"
},
{
"field": "statusPulang",
"title": "status Pulang"
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