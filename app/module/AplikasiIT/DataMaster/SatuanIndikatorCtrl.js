define(['initialize'], function(initialize) {
'use strict';
initialize.controller('SatuanIndikatorCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataSatuanIndikator = new kendo.data.DataSource({
data: []
});
$scope.columnSatuanIndikator = [
{
"field": "No",
"title": "No"
},
{
"field": "satuanIndikator",
"title": "satuan Indikator"
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