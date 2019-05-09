define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PemeriksaanTumbuhKembangCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataPemeriksaanTumbuhKembang = new kendo.data.DataSource({
data: []
});
$scope.columnPemeriksaanTumbuhKembang = [
{
"field": "No",
"title": "No"
},
{
"field": "kondisiUmum",
"title": "kondisi Umum"
},
{
"field": "kondisiUmumId",
"title": "kondisi Umum Id"
},
{
"field": "kontakInterpersonal",
"title": "kontak Interpersonal"
},
{
"field": "kontakInterpersonalId",
"title": "kontak Interpersonal Id"
},
{
"field": "keaktifan",
"title": "keaktifan"
},
{
"field": "keaktifanId",
"title": "keaktifan Id"
},
{
"field": "kepalaUbunUbunBesar",
"title": "kepala Ubun Ubun Besar"
},
{
"field": "kepalaUbunUbunBesarId",
"title": "kepala Ubun Ubun Besar Id"
},
{
"field": "wajah",
"title": "wajah"
},
{
"field": "wajahId",
"title": "wajah Id"
},
{
"field": "kelainanTingkahLaku",
"title": "kelainan Tingkah Laku"
},
{
"field": "motorikKasar",
"title": "motorik Kasar"
},
{
"field": "motorikKasarUmur",
"title": "motorik Kasar Umur"
},
{
"field": "motorikHalus",
"title": "motorik Halus"
},
{
"field": "motorikHalusUmur",
"title": "motorik Halus Umur"
},
{
"field": "bicaraExspresif",
"title": "bicara Exspresif"
},
{
"field": "bicaraExspresifUmur",
"title": "bicara Exspresif Umur"
},
{
"field": "reseptif",
"title": "reseptif"
},
{
"field": "reseptifUmur",
"title": "reseptif Umur"
},
{
"field": "kognisis",
"title": "kognisis"
},
{
"field": "kognisisUmur",
"title": "kognisis Umur"
},
{
"field": "sosialisasi",
"title": "sosialisasi"
},
{
"field": "sosialisasiUmur",
"title": "sosialisasi Umur"
},
{
"field": "perilaku",
"title": "perilaku"
},
{
"field": "perilakuUmur",
"title": "perilaku Umur"
},
{
"field": "organArtikulasiBibir",
"title": "organ Artikulasi Bibir"
},
{
"field": "organArtikulasiLidah",
"title": "organ Artikulasi Lidah"
},
{
"field": "organArtikulasiPelatum",
"title": "organ Artikulasi Pelatum"
},
{
"field": "gigiGeligi",
"title": "gigi Geligi"
},
{
"field": "keteranganWajah",
"title": "keterangan Wajah"
},
{
"field": "statusEnabled",
"title": "status Enabled"
}
];

}
]);
});