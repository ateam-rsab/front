define(['initialize'], function(initialize) { 
'use strict';
initialize.controller('DaftarRABctrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
$scope.dataVOloaded = true;
$scope.now = new Date();



$scope.dataPenyusunanTRPNBP = new kendo.data.DataSource({
data: []
});
$scope.columnPenyusunanTRPNBP = [
{
"field": "Kode",
"title": "Kode"
},
{
"field": "AkunPendapatan",
"title": "Akun Pendapatan"
},
{
"field": "RealisasiPendapatan1",
"title": "Realisasi Pendapatan 1"
},
{
"field": "Total",
"title": "Total"
},
{
"field": "RealisasiPendapatan2",
"title": "Realisasi Pendapatan 2"
},
{
"field": "Total",
"title": "Total"
},
{
"field": "RealisasiPendapatan3",
"title": "Realisasi Pendapatan 3"
},
{
"field": "TargetSetelahProsentase",
"title": "Target Setelah Prosentase"
}
];

}
]);
});