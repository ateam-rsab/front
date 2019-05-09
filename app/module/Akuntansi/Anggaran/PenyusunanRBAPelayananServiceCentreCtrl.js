define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PenyusunanRBAPelayananServiceCentreCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
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
"field": "RealisasiBiayaSebelumnya",
"title": "Realisasi Biaya Sebelumnya"
},
{
"field": "RealisasiBiayaTahunBerjalan",
"title": "Realisasi Biaya Tahun Berjalan"
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