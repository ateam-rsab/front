define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SatuanWaktuKeslingCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSatuanWaktuKesling = new kendo.data.DataSource({
data: []
});
$scope.columnSatuanWaktuKesling = [
{
"field": "No",
"title": "No"
},
{
"field": "namaSatuanWaktuKesling",
"title": "nama Satuan Waktu Kesling"
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