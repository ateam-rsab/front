define(['initialize'], function(initialize) {
'use strict';
initialize.controller('DaftarBuktiPemungutanPPhPasal22Ctrl', ['$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageAkuntansi',
function($q, $rootScope, $scope, modelItemAkuntansi, manageAkuntansi) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataDaftarBuktiPemungutan = new kendo.data.DataSource({
data: []
});
$scope.columnDaftarBuktiPemungutan = [
{
"field": "No",
"title": "No"
},
{
"field": "NPWP",
"title": "NPWP"
},
{
"field": "Nama",
"title": "Nama"
},
{
"field": "BuktiPemotonganPemungutan",
"title": "Bukti Pemotongan Pemungutan"
},
{
"field": "NilaiObyekPajak",
"title": "Nilai Obyek Pajak"
},
{
"field": "PPhyangDipungutRp",
"title": "PPhyang Dipungut Rp"
}
];

}
]);
});