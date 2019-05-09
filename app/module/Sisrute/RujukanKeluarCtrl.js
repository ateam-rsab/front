define(['initialize', 'Configuration'], function (initialize, configuration) {
    'use strict';
    initialize.controller('RujukanKeluarCtrl', ['$q', '$scope', '$state', 'CacheHelper', 'ManagePhp', 'ModelItem', 'ModelItemAkuntansi',
        function ($q, $scope, $state, cacheHelper, managePhp, ModelItem, ModelItemAkuntansi) {
            $scope.now = new Date()
            $scope.item = {}
            $scope.title = 'Rujukan';
            $scope.isRouteLoading = false
            $scope.item.tglLahir = $scope.now
            $scope.item.tglRujukan = $scope.now
            $scope.listJenisRujukan = [{ 'id': 1, 'name': 'Rawat Inap' }, { 'id': 2, 'name': 'Rawat Jalan' }, { 'id': 3, 'name': 'Parsial' }]
            $scope.listNyeri = [{ 'id': 1, 'name': 'Tidak Nyeri', 'value': 0 }, { 'id': 2, 'name': 'Ringan', 'value': 1 },
            { 'id': 3, 'name': 'Sedang', 'value': 2 }, { 'id': 4, 'name': 'Berat', 'value': 3 }]
            $scope.showAndHide = function () {
                $('#contentCariPasien').fadeToggle("fast", "linear");
            }
            $scope.isRujukan = false

            getCombo()


            function getCombo() {
                $q.all([
                    managePhp.getData("sisrute/get-combo"),
                    // managePhp.getData("sisrute/referensi/faskes"),
                    managePhp.getData("sisrute/referensi/alasanrujukan"),
                    // managePhp.getData("sisrute/referensi/diagnosa")
                    // ManageSdm.findPegawaiById(ModelItem.getPegawai().id)
                ]).then(function (result) {
                    if (result[0].statResponse) {
                        $scope.listDokter = result[0].data.dokter
                        $scope.listPetugas = result[0].data.pegawai
                    }
                    // if (result[1].statResponse) {
                    //     $scope.listFaskes = result[1].data.data;
                    // }
                    if (result[1].statResponse) {
                        $scope.listAlasan = result[1].data.data;
                    }
                    // if (result[2].statResponse) {
                    //     var datas = result[3].data.data
                    //     for (let i = 0; i < datas.length; i++) {
                    //         datas[i].namadiagnosa = datas[i].KODE + ' - ' + datas[i].NAMA
                    //     }
                    //     $scope.listDiagnosa = datas
                    // }


                    getCache()
                })

            }
            ModelItemAkuntansi.getDataDummyPHP("sisrute/referensi/diagnosa-paging", true, true, 10).then(function (data) {
                $scope.listDiagnosa = data;
            });
            ModelItemAkuntansi.getDataDummyPHP("sisrute/referensi/faskes-paging", true, true, 10).then(function (data) {
                $scope.listFaskes = data;
            });


            function getCache() {
                var cache = cacheHelper.get('cacheEditRujukan');
                if (cache != undefined) {
                    $scope.item.noRujukan = cache.RUJUKAN.NOMOR
                    $scope.item.noCm = cache.PASIEN.NORM
                    $scope.item.nik = cache.PASIEN.NIK
                    $scope.item.noJKN = cache.PASIEN.NO_KARTU_JKN
                    $scope.item.namaPasien = cache.PASIEN.NAMA
                    $scope.item.jk = cache.PASIEN.JENIS_KELAMIN.KODE
                    $scope.item.tglLahir = new Date(cache.PASIEN.TANGGAL_LAHIR)
                    $scope.item.alamat = cache.PASIEN.ALAMAT
                    $scope.item.noKontak = cache.PASIEN.KONTAK
                    $scope.item.tempatLahir = cache.PASIEN.TEMPAT_LAHIR
                    $scope.item.jenisRujukan = cache.RUJUKAN.JENIS_RUJUKAN.KODE
                    $scope.item.tglRujukan = cache.RUJUKAN.TANGGAL
                    $scope.listFaskes.add({ KODE: cache.RUJUKAN.FASKES_TUJUAN.KODE, NAMA: cache.RUJUKAN.FASKES_TUJUAN.NAMA })
                    $scope.item.faskes = { KODE: cache.RUJUKAN.FASKES_TUJUAN.KODE, NAMA: cache.RUJUKAN.FASKES_TUJUAN.NAMA }
                    $scope.item.alasanRujukan = { KODE: cache.RUJUKAN.ALASAN.KODE, NAMA: cache.RUJUKAN.ALASAN.NAMA }
                    $scope.item.alasanTambahan = cache.RUJUKAN.ALASAN_LAINNYA
                    $scope.listDiagnosa.add({ KODE: cache.RUJUKAN.DIAGNOSA.KODE, NAMA: cache.RUJUKAN.DIAGNOSA.NAMA })
                    $scope.item.diagnosa = { KODE: cache.RUJUKAN.DIAGNOSA.KODE, NAMA: cache.RUJUKAN.DIAGNOSA.NAMA }
                    for (let i = 0; i < $scope.listDokter.length; i++) {
                        if ($scope.listDokter[i].namalengkap == cache.RUJUKAN.DOKTER.NAMA) {
                            $scope.item.dokter = { id: $scope.listDokter[i].id, namalengkap: cache.RUJUKAN.DOKTER.NAMA }
                            break
                        }
                    }
                    for (let i = 0; i < $scope.listPetugas.length; i++) {
                        if ($scope.listPetugas[i].namalengkap == cache.RUJUKAN.PETUGAS.NAMA) {
                            $scope.item.petugas = { id: $scope.listPetugas[i].id, namalengkap: cache.RUJUKAN.PETUGAS.NAMA }
                            break
                        }
                    }
                    $scope.item.anamnesis = cache.KONDISI_UMUM.ANAMNESIS_DAN_PEMERIKSAAN_FISIK
                    if (cache.KONDISI_UMUM.KESADARAN.KODE == "1")
                        $scope.item.sadar = "3"
                    else
                        $scope.item.sadar = "4"
                    $scope.item.tekananDarah = cache.KONDISI_UMUM.TEKANAN_DARAH
                    $scope.item.frekuensiNadi = cache.KONDISI_UMUM.FREKUENSI_NADI
                    $scope.item.suhu = cache.KONDISI_UMUM.SUHU
                    $scope.item.pernapasan = cache.KONDISI_UMUM.PERNAPASAN
                    $scope.item.keadaanUmum = cache.KONDISI_UMUM.KEADAAN_UMUM
                    if (cache.KONDISI_UMUM.NYERI.KODE == 0)
                        $scope.item.nyeri = 1
                    else if (cache.KONDISI_UMUM.NYERI.KODE == 1)
                        $scope.item.nyeri = 2
                    else if (cache.KONDISI_UMUM.NYERI.KODE == 2)
                        $scope.item.nyeri = 3
                    else if (cache.KONDISI_UMUM.NYERI.KODE == 3)
                        $scope.item.nyeri = 4
                    $scope.item.alergi = cache.KONDISI_UMUM.ALERGI
                    $scope.item.hasilLab = cache.PENUNJANG.LABORATORIUM
                    $scope.item.hasilRadiologi = cache.PENUNJANG.RADIOLOGI
                    $scope.item.terapi = cache.PENUNJANG.TERAPI_ATAU_TINDAKAN

                    cacheHelper.set('cacheEditRujukan', undefined)
                }
                var cache2 = cacheHelper.get('cacheRujukan');
                if (cache2 != undefined) {
                    if (cache2 == 'masuk') {
                        $scope.title = 'Rujukan Masuk'
                        $scope.isMasuk = true
                    }
                    cacheHelper.set('cacheRujukan', undefined)
                }
            }
            $scope.enableNoRujukan = function () {
                if ($scope.isRujukan) {
                    delete $scope.item.noRujukan
                    $scope.isRujukan = false
                }
                else {
                    delete $scope.item.noRujukan
                    $scope.isRujukan = true
                }

            }
            $scope.cariPasien = function () {
                $scope.isRouteLoading = true
                var nocm = ''
                if ($scope.item.cariNoCM != undefined)
                    nocm = $scope.item.cariNoCM
                managePhp.getData('sisrute/get-pasien-nocm?nocm=' + nocm).then(function (e) {
                    $scope.isRouteLoading = false
                    var result = e.data.data
                    if (result == null)
                        toastr.error('Data tidak ditemukan')
                    else {
                        toastr.info('Nama Pasien : ' + result.namapasien, 'Berhasil')
                        $scope.item.noCm = result.nocm
                        $scope.item.namaPasien = result.namapasien
                        $scope.item.nik = result.noidentitas
                        $scope.item.noJKN = result.nobpjs
                        $scope.item.tempatLahir = result.tempatlahir
                        $scope.item.tglLahir = result.tgllahir
                        $scope.item.noKontak = result.nohp
                        $scope.item.alamat = result.alamatlengkap
                        if (result.jeniskelamin.indexOf('Laki') > -1)
                            $scope.item.jk = "1"
                        else
                            $scope.item.jk = "2"
                    }
                })
            }

            $scope.Save = function () {


                var kesadaran = ''
                if ($scope.item.sadar == 3)
                    kesadaran = "1"
                else if ($scope.item.sadar == 4)
                    kesadaran = "2"
                var listRawRequired = [
                    "item.noCm|ng-model|No RM",
                    "item.namaPasien|ng-model|Nama Pasien",
                    "item.nik|ng-model|NIK",
                    "item.noJKN|ng-model|No JKN",
                    "item.tempatLahir|ng-model|Tempat Lahir",
                    "item.tglLahir|ng-model|Tgl Lahir",
                    "item.jenisRujukan|ng-model|Jenis Rujukan",
                    "item.faskes|k-ng-model|Faskes",
                    "item.alasanRujukan|k-ng-model|Alasan Rujukan",
                    "item.diagnosa|k-ng-model|Diagnosa",
                    "item.dokter|k-ng-model|Dokter",
                    "item.petugas|k-ng-model|Petugas",
                    // "item.anamnesis|ng-model|Anannesis & Pemeriksaan Fisik",
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if (isValid.status) {
                    var json = {
                        "PASIEN": {
                            "NORM": $scope.item.noCm,
                            "NIK": $scope.item.nik,
                            "NO_KARTU_JKN": $scope.item.noJKN,
                            "NAMA": $scope.item.namaPasien,
                            "JENIS_KELAMIN": $scope.item.jk,           // Jenis Kelamin 1. Laki - laki, 2. Perempuan
                            "TANGGAL_LAHIR": moment($scope.item.tglLahir).format('YYYY-MM-DD'),  //Tanggal Lahir Format yyyy-mm-dd
                            "TEMPAT_LAHIR": $scope.item.tempatLahir,
                            "ALAMAT": $scope.item.alamat != undefined ? $scope.item.alamat : '',
                            "KONTAK": $scope.item.noKontak != undefined ? $scope.item.noKontak : '',
                        },
                        "RUJUKAN": {
                            "JENIS_RUJUKAN": $scope.item.jenisRujukan,         // # Jenis Rujukan 1. Rawat Jalan, 2. Rawat Darurat/Inap, 3. Parsial
                            "TANGGAL": moment($scope.item.tglRujukan).format('YYYY-MM-DD HH:mm'), //# Tanggal Rujukan Format yyy-mm-dd hh:ii:ss
                            "FASKES_TUJUAN": $scope.item.faskes.KODE,
                            "ALASAN": $scope.item.alasanRujukan.KODE,                //  # Lihat Referensi Alasan Rujukan
                            "ALASAN_LAINNYA": $scope.item.alasanTambahan != undefined ? $scope.item.alasanTambahan : '',    // # Alasan Lainnya / Tambahan Alasan Rujukan
                            "DIAGNOSA": $scope.item.diagnosa.KODE,   //# Kode ICD10 Diagnosa Utama
                            "DOKTER": {                             // # Dokter DPJP
                                "NIK": $scope.item.dokter.noidentitas != null ? $scope.item.dokter.noidentitas : '-',      //# NIK Dokter
                                "NAMA": $scope.item.dokter.namalengkap,     // # Nama Dokter
                            },
                            "PETUGAS": {                   // # Petugas yang merujuk
                                "NIK": $scope.item.petugas.noidentitas != null ? $scope.item.petugas.noidentitas : '-', //NIK Petugas
                                "NAMA": $scope.item.petugas.namalengkap,            //# Nama Petugas
                            }
                        },
                        "KONDISI_UMUM": {
                            "ANAMNESIS_DAN_PEMERIKSAAN_FISIK": $scope.item.anamnesis != undefined ? $scope.item.anamnesis : '',
                            "KESADARAN": kesadaran,              // # Kondisi Kesadaran Pasien 1. Sadar, 2. Tidak Sadar
                            "TEKANAN_DARAH": $scope.item.tekananDarah != undefined ? $scope.item.tekananDarah : '',     // # Tekanan Darah Pasien dalam satuan mmHg
                            "FREKUENSI_NADI": $scope.item.frekuensiNadi != undefined ? $scope.item.frekuensiNadi : '',        // # Frekuensi Nadi Pasien (Kali/Menit)
                            "SUHU": $scope.item.suhu != undefined ? $scope.item.suhu : '', //# Suhu (Derajat Celcius)
                            "PERNAPASAN": $scope.item.pernapasan != undefined ? $scope.item.pernapasan : '',          // # Pernapasan (Kali/Menit)
                            "KEADAAN_UMUM": $scope.item.keadaanUmum != undefined ? $scope.item.keadaanUmum : '',  // # Keadaan Umum Pasien
                            "NYERI": $scope.item.nyeri != undefined ? $scope.item.nyeri.value : '',                   //  # Skala Nyeri 0. Tidak Nyeri, 1. Ringan, 2. Sedang, 3. Berat
                            "ALERGI": $scope.item.alergi != undefined ? $scope.item.alergi : ''             //  # Alergi Pasien
                        },
                        "PENUNJANG": {
                            "LABORATORIUM": $scope.item.hasilLab != undefined ? $scope.item.hasilLab : '',//"WBC:11,2;HB:15,6;PLT:215;", //# Hasil Laboratorium format: parameter:hasil;
                            "RADIOLOGI": $scope.item.hasilRadiologi != undefined ? $scope.item.hasilRadiologi : '', //"EKG:Sinus Takikardi;Foto Thorax:Cor dan pulmo normal;", //# Hasil Radiologi format: tindakan:hasil;
                            "TERAPI_ATAU_TINDAKAN": $scope.item.terapi != undefined ? $scope.item.terapi : ''// "TRP:LOADING NACL 0.9% 500 CC;INJ. RANITIDIN 50 MG;#TDK:TERPASANG INTUBASI ET NO 8 BATAS BIBIR 21CM;" # Terapi atau Tindakan yang diberikan format; TRP: Nama; #TDK: Nama;
                        }
                    }
                    var objSave = {
                        "data": json
                    }
                    if ($scope.item.noRujukan == undefined) {
                        managePhp.postData2('sisrute/rujukan/post', objSave).then(function (res) {
                            if (res.data.success == true)
                                toastr.success(res.data.detail + ' No. ' + res.data.data.RUJUKAN.NOMOR, 'Success')
                        })
                    } else {
                        var noRujukan = ''
                        if ($scope.item.noRujukan != undefined)
                            noRujukan = $scope.item.noRujukan
                        managePhp.putData('sisrute/rujukan/put?nomor=' + noRujukan, objSave).then(function (res) {
                            if (res.data.success == true)
                                toastr.success(res.data.detail + ' No. ' + res.data.data.RUJUKAN.NOMOR, 'Success')
                        })
                    }

                } else {
                    ModelItem.showMessages(isValid.messages);
                }

            }

        }
    ]);
});