define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PenyusunanRBAPelayananMissionCentreCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataPenyusunanRBANPelayanan = new kendo.data.DataSource({
data: []
});
$scope.columnPenyusunanRBANPelayanan = [
{
"field": "MissionCentre",
"title": "Mission Centre"
},
{
"field": "RealisasiPendapatanSebelumnya",
"title": "Realisasi Pendapatan Sebelumnya"
},
{
"field": "RealisasiPendapatanTahunBerjalan",
"title": "Realisasi Pendapatan Tahun Berjalan"
},
{
"field": "KenaikanPenurunan",
"title": "Kenaikan Penurunan"
},
{
"field": "Prognosa",
"title": "Prognosa"
},
{
"field": "Proyeksi",
"title": "Proyeksi"
}
];

}
]);
});