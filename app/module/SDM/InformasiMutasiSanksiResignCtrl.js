define(['initialize'], function(initialize) {
'use strict';
initialize.controller('InformasiMutasiSanksiResignCtrl', ['$q', '$rootScope', '$scope', 'ManageSdm',
function($q, $rootScope, $scope, ManageSdm) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataInformasiMutasiSanksiResign = new kendo.data.DataSource({
data: []
});
$scope.columnInformasiMutasiSanksiResign = [
{
"field": "noUsulan",
"title": "no Usulan"
},
{
"field": "namaPegawai",
"title": "nama Pegawai"
},
{
"field": "deskripsiUsulan",
"title": "deskripsi Usulan"
},
{
"field": "noSk",
"title": "no Sk"
},
{
"field": "tanggalSk",
"title": "tanggal Sk"
},
{
"field": "judulSk",
"title": "judul Sk"
},
{
"field": "skDari",
"title": "sk Dari"
},
{
"field": "tanggalTmt",
"title": "tanggal Tmt"
},
{
"field": "tanggalBerlakuAkhir",
"title": "tanggal Berlaku Akhir"
}
];

}
]);
});