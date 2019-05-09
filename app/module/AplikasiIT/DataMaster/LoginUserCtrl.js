define(['initialize'], function(initialize) {
'use strict';
initialize.controller('LoginUserCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataLoginUser = new kendo.data.DataSource({
data: []
});
$scope.columnLoginUser = [
{
"field": "No",
"title": "No"
},
{
"field": "kataSandi",
"title": "kata Sandi"
},
{
"field": "kelompokUser",
"title": "kelompok User"
},
{
"field": "kelompokUserId",
"title": "kelompok User Id"
},
{
"field": "pegawai",
"title": "pegawai"
},
{
"field": "pegawaiId",
"title": "pegawai Id"
},
{
"field": "namaUser",
"title": "nama User"
},
{
"field": "statusLogin",
"title": "status Login"
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