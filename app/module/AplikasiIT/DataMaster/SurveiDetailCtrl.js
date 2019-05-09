define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SurveiDetailCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSurveiDetail = new kendo.data.DataSource({
data: []
});
$scope.columnSurveiDetail = [
{
"field": "No",
"title": "No"
},
{
"field": "survei",
"title": "survei"
},
{
"field": "surveiId",
"title": "survei Id"
},
{
"field": "name",
"title": "name"
},
{
"field": "report",
"title": "report"
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