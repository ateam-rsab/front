define(['initialize'], function(initialize) {
'use strict';
initialize.controller('MapLoginUserToPengendaliCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataMapLoginUserToPengendali = new kendo.data.DataSource({
data: []
});
$scope.columnMapLoginUserToPengendali = [
{
"field": "No",
"title": "No"
},
{
"field": "pengendali",
"title": "pengendali"
},
{
"field": "pengendaliId",
"title": "pengendali Id"
},
{
"field": "loginUser",
"title": "login User"
},
{
"field": "loginUserId",
"title": "login User Id"
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