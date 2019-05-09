define(['initialize'], function(initialize) {
'use strict';
initialize.controller('RuanganPosisiCurrentCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataRuanganPosisiCurrent = new kendo.data.DataSource({
data: []
});
$scope.columnRuanganPosisiCurrent = [
{
"field": "No",
"title": "No"
},
{
"field": "ruanganPosisiCurrent",
"title": "ruangan Posisi Current"
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