define(['initialize'], function(initialize) {
'use strict';
initialize.controller('PasienCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService',
function($q, $rootScope, $scope, IPSRSService) {
$scope.dataVOloaded = true;
$scope.now = new Date();


$scope.dataPasien = new kendo.data.DataSource({
data: []
});
$scope.columnPasien = [
{
"field": "No",
"title": "No"
},
{
"field": "umur",
"title": "umur"
},
{
"field": "tanggalMeninggal",
"title": "tanggal Meninggal"
},
{
"field": "dokumenRekamMedis",
"title": "dokumen Rekam Medis"
},
{
"field": "dokumenRekamMedisId",
"title": "dokumen Rekam Medis Id"
},
{
"field": "agama",
"title": "agama"
},
{
"field": "agamaId",
"title": "agama Id"
},
{
"field": "golonganDarah",
"title": "golongan Darah"
},
{
"field": "golonganDarahId",
"title": "golongan Darah Id"
},
{
"field": "jenisKelamin",
"title": "jenis Kelamin"
},
{
"field": "jenisKelaminId",
"title": "jenis Kelamin Id"
},
{
"field": "pekerjaan",
"title": "pekerjaan"
},
{
"field": "pekerjaanId",
"title": "pekerjaan Id"
},
{
"field": "negara",
"title": "negara"
},
{
"field": "negaraId",
"title": "negara Id"
},
{
"field": "kebangsaan",
"title": "kebangsaan"
},
{
"field": "kebangsaanId",
"title": "kebangsaan Id"
},
{
"field": "pendidikan",
"title": "pendidikan"
},
{
"field": "pendidikanId",
"title": "pendidikan Id"
},
{
"field": "statusPerkawinan",
"title": "status Perkawinan"
},
{
"field": "statusPerkawinanId",
"title": "status Perkawinan Id"
},
{
"field": "titlePasien",
"title": "title Pasien"
},
{
"field": "titlePasienId",
"title": "title Pasien Id"
},
{
"field": "namaPasien",
"title": "nama Pasien"
},
{
"field": "namaIbu",
"title": "nama Ibu"
},
{
"field": "noTelepon",
"title": "no Telepon"
},
{
"field": "noCm",
"title": "no Cm"
},
{
"field": "qPasien",
"title": "q Pasien"
},
{
"field": "tglDaftar",
"title": "tgl Daftar"
},
{
"field": "tglLahir",
"title": "tgl Lahir"
},
{
"field": "alamats",
"title": "alamats"
},
{
"field": "catatanPasien",
"title": "catatan Pasien"
},
{
"field": "antrianPasienRegistrasis",
"title": "antrian Pasien Registrasis"
},
{
"field": "noIdentitas",
"title": "no Identitas"
},
{
"field": "paspor",
"title": "paspor"
},
{
"field": "noAditional",
"title": "no Aditional"
},
{
"field": "namaDepan",
"title": "nama Depan"
},
{
"field": "namaBelakang",
"title": "nama Belakang"
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