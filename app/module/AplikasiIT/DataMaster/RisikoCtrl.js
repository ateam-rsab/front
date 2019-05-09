define(['initialize'], function(initialize) {
'use strict';
initialize.controller('RisikoCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataRisiko = new kendo.data.DataSource({
data: []
});
$scope.columnRisiko = [
{
"field": "No",
"title": "No"
},
{
"field": "risiko",
"title": "risiko"
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