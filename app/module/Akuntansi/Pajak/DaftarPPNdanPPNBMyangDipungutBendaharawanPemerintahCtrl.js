define(['initialize'], function(initialize) {
'use strict';
initialize.controller('DaftarPPNdanPPNBMyangDipungutBendaharawanPemerintahCtrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataDaftarPPndanPPNBM = new kendo.data.DataSource({
data: []
});
$scope.columnDaftarPPndanPPNBM = [
{
"field": "No",
"title": "No"
},
{
"field": "NamaRekanan",
"title": "Nama Rekanan"
},
{
"field": "NPWPRekanan",
"title": "NPWPRekanan"
},
{
"field": "FakturPajak",
"title": "Faktur Pajak"
},
{
"field": "DPPRp",
"title": "DPPRp"
},
{
"field": "PPNRp",
"title": "PPNRp"
},
{
"field": "TangalBiayaTagihan",
"title": "Tangal Biaya Tagihan"
},
{
"field": "TanggalSetor",
"title": "Tanggal Setor"
}
];

}
]);
});