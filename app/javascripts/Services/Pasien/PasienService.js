  define(['Configuration'], function(config) {

     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseApiPostData;
     var baseApiPostData = config.baseApiPostData;
     var pasienService = angular.module('PasienService', ['ngResource', 'HttpServices', 'Services']);
     pasienService.service('ManagePasien', ['socket', 'ModelItem', 'R', 'DateHelper', function(socket, modelItem, r, dateHelper) {
         return {
             saveRencanaOperasi: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-rencana-operasi/"
                 }, item);
             },
             kirimDokumenRekammedis: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/kirim-dokumen-rekammedis/"
                 }, data);
             },
             kirimDokumenRekammediss: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "kirim-dokumen-pasien/save-kirim-dokumen-pasien"
                 }, data);
             },

             akomodasiOtomatis: function(url,data) {
                 return r.post({
                     url: baseUrlApiAction + url
                 }, data);
             },
			 
			 saveDataGawat: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
			 
             terimaDokumenRekammedis: function(listDokumen) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/terima-dokumen-rekammedis/?listTerimaDokumen=" + listDokumen
                 });
             },
             ambilObat: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-pengambil-order/"
                 }, data);
             },
             saveTindakan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-pelayanan"
                 }, data);
             },
             savePenyusunanTRPNB: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "penyusunan-trpnbp/save-penyusunan-trpnbp"
                 }, data);
             },
             saveTumbuhKembang: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "riwayat-tumbuh-kembang/save-riwayat-tumbuh-kembang/"
                 }, data);
             },
             saveCatatan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "catatan/save-catatan"
                 }, data);
             },
             migrasiDataSirs: function(awal, akhir) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-from-sirs/?dateStart=" + awal + "&dateEnd=" + akhir
                 }, {});
             },
             kirimDarahKeRuangan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "struk-pelayanan/kirim-produk-ke-ruangan/"
                 }, data);
             },
             saveKantungDarah: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "struk-pelayanan/simpan-kantong-darah/"
                 }, data);
             },
             saveKonselingPasien: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pio/save-pio/"
                 }, data);
             },
             savePio: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pio/save-pio/"
                 }, data);
             },
             saveRepacking: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-verifikasi-pelayanan-obat/"
                 }, data);
             },
             saveTpn: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pelayanan-tpn/save-pelayanan-tpn/"
                 }, data);
             },
             saveTHT: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "tht/save-tht/"
                 }, data);
             },

             saveAdmixture: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pelayanan-admixture/save-pelayanan-admixture/"
                 }, data);
             },
             saveCytotoxic: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pelayanan-cytotoxic/save-pelayanan-cytotoxic/"
                 }, data);
             },
             saveKesehatanNifas: function(data) {
                 debugger;
                 console.log(data)
                 return r.post({
                     url: baseUrlApiAction + "riwayat-kehamilan-persalinan-nifas-yang-lalu/save-riwayat-kehamilan-persalinan-nifas-yang-lalu/"
                 }, data);
             },
             updateStatusOrder: function(noOrder, statusOrder) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/update-status-order/?noOrder=" + noOrder + "&status=" + statusOrder
                 }, {

                 });
             },
             saveVerifikasiObat: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-verifikasi-pelayanan-obat/"
                 }, data);
             },
             saveObat: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-pelayanan-obat/"
                 }, data);
             },
             saveKonsultasi: function(data) {
                debugger;
                 return r.post({
                     url: baseUrlApiAction + "konsultasi/save-konsultasi/"
                 }, data);
             },
             savePemakaianAsuransi: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "asuransi/save-pemakaian-asuransi/"
                 }, data);
             },
             generateSep: function(data) {
                 return r.get({
                     url: baseApiPostData + "asuransi/generate-sep?noBpjs=" + data.nokartu + "&tanggalRujukan=" + data.tanggalRujukan + "&noRujukan=" + data.noRujukan + "&ppkRujukan=" + data.ppkRujukan + "&isRawatJalan=" + data.isRawatJalan + "&catatan=" + data.catatan + "&kodeDiagnosa=" + data.kdDiagnosa + "&poliTujuan="+data.poliTujuan+"&kelasRawat=" + data.kelasRawat + "&lakaLantas=" + data.lakaLantas + "&noCm=" + data.noCm + "&tanggalSep=" + data.tglSep
                 });
             },
             savePersetujuanUmum: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-persetujuan-umum/"
                 }, data);
             },
             savePindahKamar: function(data) {
                 debugger;
                 console.log(data);
                 return r.post({
                     url: baseUrlApiAction + "admisi-rencana-pasien/update-admisi-rencana"
                 }, data);
             },
             saveMasukKamar: function(data) {
                 debugger;
                 console.log(data);
                 return r.post({
                     url: baseUrlApiAction + "masuk-kamar/save-masuk-kamar/"
                 }, data);
             },
             saveSuratPermintaanMasuk: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-surat-permintaan-masuk/"
                 }, data);
             },
             saveTriage: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "triase/save-hasil-triase"
                 }, data);
             },
             saveGawatDarurat: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pasien-gawat-darurat/save-registrasi-pasien/"
                 }, data);
             },
             saveRegistrasiPasienGawatDarurat: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pasien-gawat-darurat/save-registrasi-pasien-gawat-darurat/"
                 }, data);
             },
             saveKeluhanUtama: function(pasien, tanggal, keluhanUtama, noRec) {
                 return r.post({
                     url: baseUrlApiAction + "keluhan-utama/save-keluhan-utama"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     keluhanUtama: keluhanUtama,
                     tglMerasaKeluhan: tanggal,
                     noRec: noRec
                 });
             },
             editKeluhanUtama: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "keluhan-utama/edit-keluhan-utama"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     keluhanUtama: data.keluhanUtama,
                     tglMerasaKeluhan: tanggal,
                     noRec: data.noRec
                 });
             },
             saveKeluhanTambahan: function(pasien, tanggal, keluhanTambahan, noRec) {
                 var tgl = new Date();
                 var tglInput = dateHelper.getTanggalFormattedNew(tgl);
                 return r.post({
                     url: baseUrlApiAction + "keluhan-tambahan/save-keluhan-tambahan/"
                 }, {
                     tglInput: tglInput + " 00:00:00",
                     tglRegistrasi: tanggal,
                     pasien: { noRec: keluhanTambahan.noRecAntrian },
                     keluhanTambahan: keluhanTambahan.keluhan,
                     tglMerasaKeluhan: keluhanTambahan.tanggalKeluhan + " 00:00:00",
                     noRec: noRec
                 });
             },
             saveAnamesisDokter: function(pasien, tanggal, model) {
                 model.pasien = pasien;
                 model.tanggalPendaftaran = tanggal;
                 return r.post({
                     url: baseUrlApiAction + "anamesis/save-anamesis/"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     papRiwayatPenyakitPengobatanSet: model.riwayatPenyakitPengobatan,
                     keluhan: model.keluhanKhusus
                 });
             },
             saveAnamesisDokterUmum: function(pasien, tanggal, model) {
                 return r.post({
                     url: baseUrlApiAction + "anamansis/save-anamansis/"
                 }, {
                     pasien: pasien,
                     tanggalPendaftaran: tanggal,
                     anamansisDokter: model.anamesisDokter,
                     anamansisSuster: model.anamansisSuster,
                     riwayatPenyakitPengobatan: model.riwayatPenyakitPengobatan
                 });
             },
             orderTindakanRadiologi: function(pasien, tanggal, order) {

                 order.pasien = pasien;
                 order.tanggalPendaftaran = tanggal;
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-order-produk"
                 }, order);
             },
             saveOrderDarah: function(pasien, tanggal, order) {
                debugger;
                 order.pasien = pasien;
                 order.tanggalPendaftaran = tanggal;
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-order-produk"
                 }, order);
             },
             terimaProduk: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-kirim-produk"
                 }, data);
             },
             orderTindakanGizi: function(pasien, tanggal, orderLab) {
                 orderLab.pasien = pasien;

                 orderLab.tanggalPendaftaran = tanggal;
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-order-produk"
                 }, orderLab);
             },
             orderTindakanBedah: function(pasien, tanggal, orderLab) {
                 orderLab.pasien = pasien;
                 debugger;
                 orderLab.tanggalPendaftaran = tanggal;
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-order-produk"
                 }, orderLab);
             },
             orderTindakanLaboratorium: function(cito,penunjang, pasien, tanggal, orderLab) {
                 debugger;
                 orderLab.pasien = pasien;
                 /*add_251016*/
                 orderLab.ruanganPenunjang = penunjang;
                 /*end*/
                 orderLab.tanggalPendaftaran = tanggal;
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-order-produk-lab/?cito="+cito
                 }, orderLab);
             },
             saveDiagnosa: function(pasien, tanggal, diagnosa) {
                 return r.post({
                     url: baseUrlApiAction + "diagnosa-pasien/save-diagnosa-pasien"
                 }, {
                     pasien: pasien,
                     tanggalPendaftaran: tanggal,
                     diagnosis: diagnosa.diagnosis,
                     noRecPasienDaftar: diagnosa.noRec
                 });
             },
             saveDiagnosaRmk: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "diagnosa-pasien/save-diagnosa-pasien"
                 },data);
             },
             saveDiagnosaTindakan: function(pasien, tanggal, diagnosa) {
                 debugger;
                 diagnosa.pasien = pasien;
                 diagnosa.tanggalPendaftaran = tanggal;
                 return r.post({
                     url: baseUrlApiAction + "diagnosa-tindakan-pasien/save-diagnosa-tindakan-pasien"
                 }, diagnosa);
             },
             saveDiagnosaTindakanICD: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "diagnosa-tindakan-pasien/save-diagnosa-tindakan-pasien"
                 }, data);
             },
             saveAlergi: function(pasien, tanggal, data) {

                 return r.post({
                     url: baseUrlApiAction + "alergi/save-alergi"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     alergi: data.dataAlergi,
                     keteranganData: data.keteranganData,
                     reaksi: data.reaksi,
                 });
             },
             savePerjanjian: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "instruksi-perjanjian/save-instruksi-perjanjian/"
                 }, data);
             },
             savePulang: function(pasien, tanggal, data) {
                debugger;
                 return r.post({
                     url: baseUrlApiAction + "pasien-pulang/save-pasien-pulang"
                 }, {
                     pasien: pasien.pasien,
                     pasienDaftar: pasien.pasienDaftar,
                     kondisiPasien: data.kondisiKeluar,
                     statusPulang: data.statusPulang,
                     hubunganKeluarga: data.hubunganKeluarga,
                     namaLengkapAmbilPasien: data.namaPembawaPulang,
                     noRec: data.pasienDaftar.noRec,
                     statusKeluar: data.statusKeluar,
                     tanggal: tanggal,                         
                     tglRegistrasi: pasien.pasien.tglDaftar,                    
                     tglPulang: data.tglKeluar
                 });
             },
             savePasienPulang: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "pasien-meninggal/save-master-table"
                 }, data);
             },
             savePasienPindah: function(data) {
                debugger;
                 return r.post({
                     url: baseUrlApiAction + "admisi-rencana-pasien/save-admisi-rencana"
                 }, data);
             },
             saveSirkulasi: function(pasien, tanggal, data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "sirkulasi/save-sirkulasi"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     crt: data.crt,
                     sianosis: data.sianosis,
                     edema: data.edema,
                     iramaNadi: data.iramaNadi,
                     pucat: data.pucat,
                     clubbingFinger: data.clubbingFinger,
                     intensitasNadi: data.intensitasNadi,
                     akral: data.akral,
                     isNormal: data.isNormal,
                     turgorKulit: data.turgorkulit
                 });
             },
             saveRegistrasiPelayanan: function(data) {
                 return r.post({
                     url: baseApiPostData + "registrasi-pelayanan/save-registrasi-pelayanan/"
                 }, data);
             },
             editRegistrasiPelayanan: function(data) {
                 return r.post({
                     url: baseApiPostData + "registrasi-pelayanan/edit-registrasi-pelayanan"
                 }, data)
             },
             saveLayanan: function(data) {
                 return r.post({
                     url: baseApiPostData + "observasiIGD/save-layanan/"
                 }, data);
             },
             saveObservasiIGD: function(data) {
                 return r.post({
                     url: baseApiPostData + "observasiIGD/save-observasi-igd/"
                 }, data);
             },
             updateStatusAntrian: function(noRegistrasi, statusAntrian, tglPanggilSuster, tglPanggilDokter) {
                 socket.emit('DaftarAntrian', "asdasdsad", function(a, b, c, d, e, f) {})
                 socket.emit('DaftarAntrianLaboratorium', "asdasdsad", function(a, b, c, d, e, f) {})

                 //caun
                 return r.get({
                     url: baseApiPostData + "registrasi-pelayanan/update-status-antrian/?noRegistrasi=" + noRegistrasi + "&statusAntrian=" + statusAntrian + "&tglDipanggilSuster=" + tglPanggilSuster + "&tglDipanggilDokter=" + tglPanggilDokter
                 });
             },
             updateDokterPelayanan: function(data) {
                return r.post({
                     url: baseApiPostData + "registrasi-pelayanan/update-dokter-pelayanan"
                 }, data);
             },
             saveReservasiOnline: function(data) {
                 return r.post({
                     url: baseApiPostData + "registrasi-pasien-online/save-registrasi-pasien-online/"
                 }, data);
             },
             saveAntrianTouchScreen: function(data) {
                 return r.post({
                     url: baseApiPostData + "registrasi-pelayanan/save-touch-old-screen"
                 }, data);
             },
             getAntrianTouchScreen: function(data) {
                 return r.post({
                     url: baseApiPostData + "registrasi-pelayanan/save-touch-screen"
                 }, data);
             },
             saveStatusKemandirianTransferInternal: function(model) {
                 return r.post({
                     url: baseApiPostData + "registrasi-pelayanan/status-kemandirian"
                 }, model);

             },
             savePernafasan: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "pernapasan/save-pernapasan"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     alatBantuNafas: data.alatBantuNafas,
                     bentukDada: data.bentukDada,
                     irama: data.irama,
                     nafasKupingHidung: data.nafasKupingHidung,
                     suaraNapas: data.suaraNapas,
                     polaNapas: data.polaNapas,
                     sianosis: data.sianosis,
                     retraksiDada: data.retraksiDada,
                     isNormal: true,
                     noRec: data.noRec
                 });
             },
             saveGastrointestinal: function(pasien, tanggal, data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "gastrointestinal/save-gastrointestinal"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     nyeriUluHati: data.nyeriUluHati,
                     mual: data.mual,
                     ascites: data.ascites,
                     peristaltikUsus: data.peristaltikUsus,
                     mulut: data.mulut,
                     muntah: data.muntah,
                     lingkarPerut: data.lingkarPerut,
                     isNormal: data.isNormal,
                     polaMakan: data.teraturtidak,
                     nafsuMakan: data.nafsumakan
                 });

             },
             saveNeurologi: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "neurologi/save-neurologi"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     gangguanNeorologis: data.gangguanNeorologis,
                     kesadaran: data.kesadaran,
                     isNormal: true
                 });
             },
             saveEliminasi: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "eliminasi/save-eliminasi"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     kelainanUrin: data.kelainanUrin,
                     pengeluaranDefeaksi: data.pengeluaranDefeaksi,
                     diuresisUrin: data.diuresisUrin,
                     konsistensiDefeaksi: data.konsistensiDefeaksi,
                     frekuensiDefeaksi: data.frekuensiDefeaksi,
                     karakteristikFeses: data.karakteristikFeses,
                     pengeluaranUrin: data.pengeluaranUrin,
                     isNormal: data.isNormal,
                     konsistensi: data.konsistensi
                 });
             },
             saveRehabilitas: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "rehabilitasi-asesmen/save-rehabilitasi-formulir-klaim"
                 }, data);
             },
             saveRehabilitasiAsesmen: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "rehabilitasi-asesmen/save-rehabilitasi-asesmen"
                 }, data);
             },
             saveGinekologiKhusus: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "ginekologi/save-ginekologi"
                 }, {
                     umurSuami: data.umurSuami,
                     tglInput: tanggal,
                     sakitWaktuHaid: data.tidakDapatBekerja,
                     bauKeputihan: data.bauKeputihan,
                     umurKawinKedua: data.umuKawinKedua,
                     umurHaidPertama: data.umurHaidPertama,
                     banyaknya: data.banyaknyaHaid,
                     lamanya: data.lamanyaHaid,
                     inspekulo: data.inspekulo,
                     kehamilan: data.kehamilan,
                     masihKawin: data.masihKawin,
                     sakitKeputihan: data.SakitKeputihan,
                     umurKawinPertama: data.umurKawinPetama,
                     noRec: data.noRec,
                     tglHaidPertama: data.tglHaidTerkahir,
                     gatalKeputihan: data.gatalKeputihan,
                     vaginalToucher: data.vaginalToucher,
                     banyaknyaHaid: data.banyaknyaHaid,
                     kawin: data.kawin,
                     teratur: data.teratur,
                     laboratoriumSet: data.laboratoriumSet,
                     kejadianKe9: data.listKehamilan[8].keterangan,
                     warnaKeputihan: data.warnaKeputihan,
                     kejadianKe5: data.listKehamilan[4].keterangan,
                     isBertambah: data.isBertambah,
                     kejadianKe6: data.listKehamilan[5].keterangan,
                     kejadianKe7: data.listKehamilan[6].keterangan,
                     kejadianKe8: data.listKehamilan[7].keterangan,
                     abortus: data.abortus,
                     kejadianKe1: data.listKehamilan[0].keterangan,
                     kejadianKe10: data.listKehamilan[9].keterangan,
                     kejadianKe2: data.listKehamilan[1].keterangan,
                     inspeksi: data.inspeksi,
                     kejadianKe3: data.listKehamilan[2].keterangan,
                     kejadianKe4: data.listKehamilan[3].keterangan,
                     pengobatan: data.Pengobatan,
                     pasien: pasien,
                     papDataTandaVitalSet: data.tandaVital
                 });
             },
             saveTandavital: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "tanda-vital/save-tanda-vital"
                 }, data);
                 // }, {

                 //     tglInput: tanggal,
                 //     noRec: data.noRec,
                 //     kesadaran: data.kesadaran,
                 //     gcs: data.GCS,
                 //     papDataTandaVitalSet: data.tandaVital,
                 //     pasien: pasien,
                 //     rasiOksigen: data.rasioksigen
                 // });
             },
             /*saveSuratPermintaanMasukRumahSakit: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "tanda-vital/save-tanda-vital"
                 }, {
                     tglInput: tanggal,
                     noRec: data.noRec,
                     pasien: pasien,
                     instruksi: data.instruksi
                 });
             },*/
             /*saveSuratPermintaanMasukRumahSakit: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "tanda-vital/save-tanda-vital"
                 }, {
                     tglInput: tanggal,
                     noRec: data.noRec,
                     pasien: pasien,
                     instruksi: data.instruksi
                 });
             },*/

             saveIntegumen: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "integumen/save-integumen/"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     luka: data.luka,
                     kelainan: data.kelainan,
                     warnaKulit: data.warnaKulit,
                     resikoDekubitos: data.resikoDekubitos,
                     isNormal: data.isNormal,
                     keutuhanKulit: data.keutuhankulit
                 });
             },
			 saveDataGawatDarurat: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-data-keluarga"
                 }, {
                     skorNyeri: data.skorNyeri,
                     skalaNyeri:data.skalaNyeri,
                     lokasi: data.Lokasi,
                     durasi: data.durasi,
                     pencetus: data.Pencetus,
                     statusPasien: data.statusPasien,
                     tandaKehidupan:data.tandaKehidupan,
                     SkorNyeri: data.SkorNyeri,
					 psikologis:data.psikologis,
					 resikoJatuh:data.resikoJatuh,
                     SkorResikoJatuh:data.SkorResikoJatuh,
					 diagnosaKeperawatan:data.diagnosaKeperawatan,
                     lainlaindiagnosaKeperawatan:data.lainlaindiagnosaKeperawatan,
					 IsapLendir:data.IsapLendir,
					 PasangOroPharsingAirway:data.PasangOroPharsingAirway,
					 AturPosisi:data.AturPosisi,
					 pasangEtt2:data.pasangEtt2,
					 MonitorIntakeOutput:data.MonitorIntakeOutput,
					 jamMonitorTtvdanSp02:data.jamMonitorTtvdanSp02,
					 berikanOksigen1:data.berikanOksigen1,
					 berikanOksigen2:data.berikanOksigen2,
					 pasangInfus1:data.pasangInfus1,
					 pasangInfus2:data.pasangInfus2,
					 pasangEtt1:data.pasangEtt1,
					 pasangEtt2:data.pasangEtt2,
					 defibrasi1:data.defibrasi1,
					 defibrasi2:data.defibrasi2,
					 MonitorIntakeOutput:data.MonitorIntakeOutput,
					 PemberianObat:data.PemberianObat,
					 lainnya:data.lainnya,
					 Skor:data.Skor,
					 ruangPerawat:data.ruangPerawat,
					 lainlainruangPerawat:data.lainlainruangPerawat
                 });
             },
             saveMuskuloskeletal: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "muskuloskeletal/save-muskuloskeletal/"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     gerakanAnak: data.gerakanAnak,
                     kelainanTulang: data.kelainanTulang,
                     isNormal: data.isNormal,
                     statusAktifitas: data.statusaktifitas
                 });
             },
             saveGenetalia: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "genatalia/save-genatalia/"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     status: data.status,
                     keterangan: data.keterangan,
                     isNormal: data.isNormal
                 });
             },
             saveRiwayatPsikososial: function(pasien, tanggal, data) {

                 return r.post({
                     url: baseUrlApiAction + "riwayat-psikososial/save-riwayat-psikososial"
                 }, {
                     pengkajianAwalBaru: data.pengkajianAwalBaru,
                     pasien: pasien,
                     tglInput: tanggal,
                     hubunganPasien: data.hubunganPasien,
                     papStatusPsikososialSet: data.StatusPsikososialSet,
                     papTempatTinggalSet: data.tempatTinggal,
                     keteranganStatusPsikologiLainnya: data.KetStatusPsikologiLainnya,
                     keteranganStatusSosialLainnya: data.keteranganStatusSosial,
                     noRec: data.noRec

                 });
             },
             saveLaporanBedah: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "laporan-pembedahan-instruksi/save-laporan-pembedahan-instruksi"
                 }, data);
             },
             saveHistopatalogi: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "laboratorium-anatomi/save-laboratorium-anatomi"
                 }, data);
             },
             saveObstetri: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "obstetri/save-obstetri"
                 }, data);
             },
             saveObstetri: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "obstetri/save-obstetri"
                 }, data);
             },
             saveKebutuhanDasarSuster: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "kebutuhan-dasar/save-kebutuhan-dasar"
                 }, data);
             },
            savePengkajianKebutuhanDasarSuster: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "pengkajian-kebutuhan-dasar/save-pengkajian-kebutuhan-dasar"
                 }, data);
             },
             saveKebutuhanDasarDokter: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "fisis-dokter/save-fisis-dokter"
                 }, data);
             },
             SavePersepsiKognisi: function(pasienDaftar, pasien, tanggal, data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "persepsi-kognisi/save-persepsi-kognisi"
                 }, {
                     pasienDaftar: pasienDaftar,
                     pasien: pasien,
                     tglInput: tanggal,
                     penglihatan: data.TanyaPengelihatan,
                     pendengaran: data.TanyaPendengaran,
                     dayaIngat: data.TanyaDayaIngat

                 });
             },
             saveTidurIstirahat: function(pasienDaftar, pasien, tanggal, data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "tidur-istirahat/save-tidur-istirahat"
                 }, {
                     pasienDaftar: pasienDaftar,
                     pasien: pasien,
                     tglInput: tanggal,
                     lamaTidur: data.TanyalamaTidur

                 });
             },
             saveKonsepDiri: function(pasienDaftar, pasien, tanggal, data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "konsep-diri/save-konsep-diri"
                 }, {
                     pasienDaftar: pasienDaftar,
                     pasien: pasien,
                     tglInput: tanggal,
                     gambaranDiri: data.KonsepDiri

                 });
             },
             savePeranHubungan: function(pasienDaftar, pasien, tanggal, data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "peran-hubungan/save-peran-hubungan"
                 }, {
                     pasienDaftar: pasienDaftar,
                     pasien: pasien,
                     tglInput: tanggal,
                     penyakitTerhadapKeluarga: data.penyakitTerhadapKeluarga,
                     masalahDalamKeluarga: data.masalahDalamKeluarga

                 });
             },
             saveKoping: function(pasienDaftar, pasien, tanggal, data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "koping/save-koping"
                 }, {
                     pasienDaftar: pasienDaftar,
                     pasien: pasien,
                     tglInput: tanggal,
                     penangananStress: data.TanyaKoping

                 });
             },
             saveNilainilai: function(pasienDaftar, pasien, tanggal, data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "nilai-nilai/save-nilai-nilai"
                 }, {
                     pasienDaftar: pasienDaftar,
                     pasien: pasien,
                     tglInput: tanggal,
                     harapanPasien: data.TanyaHarapanPasien,
                     mengatasiPenyakit: data.MengatasiPenyakit

                 });
             },
             savePersepsiPasien: function(pasienDaftar, pasien, tanggal, data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "persepsi-pasien/save-persepsi-pasien"
                 }, {
                     pasienDaftar: pasienDaftar,
                     pasien: pasien,
                     tglInput: tanggal,
                     kesehatan: data.TanyaStatusKesehatan,
                     penyebabPenyakit: data.TanyaPenyebabPenyakit,
                     yangDilakukan: data.TanyaStatusYangDilakukan

                 });
             },
             saveRiwayatImunisasiDasar: function(noRec, pasien, tanggal, data) {
                 debugger;

                 return r.post({
                     url: baseUrlApiAction + "riwayat-imunisasi/save-riwayat-imunisasi"
                 }, {
                     noRec: noRec,
                     pasien: pasien,
                     tglInput: tanggal,
                     noRec: "",
                     tglRegistrasi: tanggal,
                     hasilImunisasi: data.HasilImunisasi,
                     keteranganLainnya: data.KetImunisasiLainnya,
                     papImunisasiDetailSet: data.StatusImunisasiSet
                         /*tglRegistrasi: data.data.data.pasienDaftar.tglRegistrasi,
                         pasien: data.data.data.pasienDaftar.pasien,
                         kdProfile: data.data.data.kdProfile,
                         noRec: data.data.data.pasienDaftar.noRec*/
                 });
             },
             saveRiwayatKelahiran: function(norecpasien, pasien, tanggal, data) {

                 return r.post({
                     url: baseUrlApiAction + "pap-riwayat-kelahiran/save-pap-riwayat-kelahiran/"
                 }, {
                     pasien: norecpasien,
                     tglInput: tanggal,
                     usiaKehamilan: data.UsiaKehamilan,
                     panjangBadanLahir: data.PanjangBadanLahir,
                     dataPersalinan: data.persalinan,
                     menangis: data.Menangis,
                     beratBadanLahir: data.BeratBadanLahir,
                     riwayatKuning: data.RiwayatKuning

                 });
             },
             saveInformasiMedis: function(pasien, tanggal, data) {

                 return r.post({
                     url: baseUrlApiAction + "riwayat-psikososial/save-riwayat-psikososial"
                 }, {

                     detailInformasiMedis: data.StatusPsikososialSet

                 });
             },
             saveTransferPasien: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "transfer-pasien-internal/save-transfer-pasien-internal/"
                 }, {

                     pasien: pasien,
                     tglInput: tanggal,
                     tanggalMasuk: data.tanggaljammasuk,
                     lainLain: data.lainlain,
                     asalRuanganRawat: data.asalruangrawat,
                     namaKeluarga: data.NamaKeluargaPasien,
                     fasilitas: data.fasilitas,
                     keadaanPasien: data.kondisipasien,
                     isKeluargaDiberiTahuAlasanPemindahan: data.rbhubunganPasien,
                     ruangRawatSelanjutnya: data.ruangrawatlanjut,
                     dokterJaga: data.dokterjagaruang,
                     tenaga: data.tenaga,
                     tanggalPindah: data.tanggaljampindah,
                     pasienDaftar: {
                         "noRec": "2c9090ad56014d2c0156014f2cf40000"
                     }
                 });
             },
             saveMasalahKeperawatan: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "masalah-keperawatan/save-masalah-keperawatan"
                 }, {
                     pasien: pasien,
                     pasienDaftar: data.pasienDaftar,
                     tglInput: tanggal,
                     masalahKeperawatanDetail: data.dataRiwayat,
                     noRec: data.noRec
                 });
             },
             saveInformsiIbu: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-pap-informasi-ibu/"
                 }, data);
             },
             saveStatusFungsional: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "status-fungsional/save-status-fungsional/"
                 }, data);
             },
             saveKebutuhanEdukasi: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "kebutuhan-edukasi/save-kebutuhan-edukasi/"
                 }, data);
             },
             saveRiwayatKesehatan: function(pasien, pasienDaftar, tanggal, data) {
                 if (data.riwayatDalamKeluarga.name === "Ya") {
                     data.riwayatPenyakitMayor = true;
                 } else {
                     data.riwayatPenyakitMayor = false;
                 }

                 if (data.alatImplant.name === "Ya") {
                     data.terpasangAlatImplan = true;
                 } else {
                     data.terpasangAlatImplan = false;
                 }

                 if (data.pernahDirawat.name === "Ya") {
                     data.pernahDirawat = true;
                 } else {
                     data.pernahDirawat = false;
                 }
                 return r.post({
                     url: baseUrlApiAction + "riwayat-kesehatan/save-riwayat-kesehatan"
                 }, {
                     pasien: pasien,
                     // tanggalPendaftaran: data.tglRegistrasi,
                     pasienDaftar: pasienDaftar,
                     dataPenyakitMayor: data.penyakitMayor,

                     tglRegistrasi: tanggal,
                     riwayatPenyakitMayor: data.riwayatPenyakitMayor,
                     pernahDirawatDetail: data.dataRiwayat,
                     keterangan: data.keteranganAlatImplant,
                     terpasangAlatImplan: data.terpasangAlatImplan,
                     pernahDirawat: data.pernahDirawat,
                     noRec: data.noRec
                 });
             },
             saveSkriningNyeri: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "skrining-nyeri/save-skrining-nyeri"
                 }, {
                     pengkajianAwalBaru: data.pengkajianAwalBaru,
                     pasien: pasien,
                     tglInput: tanggal,
                     karakteristikNyeriSet: data.karakteristikNyeriSet,
                     pengaruhNyeriSet: data.pengaruhNyeriSet,
                     frekuensi: data.frekuensi,
                     rasaNyeri: data.rasaNyeri,
                     skalaNyeri: data.skalaNyeri,
                     typeNyeri: data.typeNyeri,
                     lokasiNyeri: data.lokasiNyeri,
                     durasi: data.durasi,
                     noRec: data.noRec

                 });
             },
             saveSkriningGizi: function(pasienku, totalscore, pasieni, tanggal, data) {
                 debugger
                 return r.post({
                     url: baseUrlApiAction + "skrining-gizi/save-skrining-gizi"
                 }, {
                     pengkajianAwalBaru: data.pengkajianAwalBaru,
                     pasien: pasienku,
                     totalSkor: totalscore,
                     tglInput: tanggal,
                     tinggiBadan: data.tinggiBadan,
                     beratBadan: data.beratBadan,
                     papSkriningGiziDetailSet: data.papSkriningGiziDetailSet,
                     lingkarKepala: data.lingkarKepala,
                     tglInputData: tanggal,
                     noRec: data.noRec
                 });
             },
             saveSkriningGiziEdit: function(pasienpap, pasienku, totalscore, pasieni, tanggal, data) {
                 debugger
                 return r.post({
                     url: baseUrlApiAction + "skrining-gizi/save-skrining-gizi"
                 }, {
                     pasien: pasienku,
                     papSkriningGizi: pasienpap,
                     totalSkor: totalscore,
                     tglInput: tanggal,
                     tinggiBadan: data.tinggiBadan,
                     beratBadan: data.beratBadan,
                     papSkriningGiziDetailSet: data.papSkriningGiziDetailSet,
                     lingkarKepala: data.lingkarKepala,
                     tglInputData: data.tglinput,
                     noRec: ""
                 });
             },
             saveFinishAssasmenent: function(pasien, noRec, beratbadan, lingkarkepala, tinggibadan, tanggal, asesmentulang, skor, tglinput) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "skrining-gizi/save-skrining-gizi"
                 }, {
                     pasien: pasien,
                     noRec: noRec,
                     asesmentUlang: asesmentulang,
                     tglInput: tanggal,
                     tinggiBadan: tinggibadan,
                     beratBadan: beratbadan,
                     lingkarKepala: lingkarkepala,
                     totalSkor: skor,
                     tglInputData: tglinput
                 });
             },
             saveKlinikMata: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "mata/save-mata"
                 }, {
                     dataKacamataSet: data.dataKacamataSet,
                     streak: data.streak,
                     tglInput: tanggal,
                     dataVisusSet: data.dataVisusSet,
                     noRec: data.noRec,
                     keterangan: data.ketMata,
                     dataKoreksiSet: data.dataKoreksiSet,
                     dataAplasnasiSet: data.dataAplasnasiSet,
                     dataTonometriSet: data.dataTonometriSet,
                     pasien: pasien
                 });
             },
             saveKlinikMataBaru: function(pasien, tanggal, pegawai, arrKacamata, arrKategoriKlinik, data) {
                 return r.post({
                     url: baseUrlApiAction + "mata/save-mata"
                 }, {
                     pasien: {
                         noRec: pasien
                     },
                     tglInput: tanggal,
                     dataKacamataSet: arrKacamata,
                     kedudukanBolaMataOD: data.kedudukanMataOD,
                     gerakMataOD: data.gerakMataOD,
                     gerakMataOS: data.gerakMataOS,
                     kategoriKlinikMataSet: arrKategoriKlinik,
                     visusOD: data.visusOD,
                     visusOS: data.visusOS,
                     koreksiOD: data.koreksiOD,
                     koreksiOS: data.koreksiOS,
                     koreksiBaca: data.koreksiBaca,
                     kacamataLamaBaca: data.kacamataLamaBaca,
                     kacamataLamaOD: data.kacamataLamaOD,
                     kacamataLamaOS: data.kacamataLamaOS,
                     streakMata: data.streakMata,
                     streakMata_K: data.keteranganStreak,
                     tonometriOD: data.tonometriOD,
                     tonometriOS: data.tonometriOS,
                     aplanasiOD: data.aplanasiOD,
                     aplanasiOS: data.aplanasiOS,
                     anelOD: data.anelOD,
                     anelOS: data.anelOS,
                     sistemLacrimal: data.sistemLacrimal,
                     diagnosaKlinik: data.diagnosaKlinik,
                    //  kodePenyakit: data.kodePenyakit,
                     pengobatanPoliklinik: data.pengobatanPoliklinik,
                     pengobatanDiRumah: data.pengobatanDiRumah,
                     dokterKonsulen: {
                         id: pegawai.id
                     }
                 });
             },
             savePemeriksaanKhususBedah: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "bedah/save-bedah"
                 }, {
                     tglInput: tanggal,
                     produkSet: data.produkSet,
                     ruanganTujuan: data.ruanganTujuan,
                     ruangan: data.ruangan,
                     pasien: pasien
                 });
             },
             /*savePengambilanOvum: function(pasien, tanggal, data) {
             return r.post({
                 url: baseUrlApiAction + "bedah/save-bedah"
             }, {
                 tglInput: tanggal,
                 produkSet: data.produkSet,
                 ruanganTujuan: data.ruanganTujuan,
                 ruangan: data.ruangan,
                 pasien: pasien
             });
         },*/
             saveGigiMulut: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "gigi-mulut/save-gigi-mulut"
                 }, {
                     tglInput: tanggal,
                     papKeadaanGigi: data.papKeadaanGigi,
                     papRestorasi: data.papRestorasi,
                     papBahanRestorasi: data.papBahanRestorasi,
                     papProtesa: data.papProtesa,
                     papGigiKananTiga: data.papGigiKananTiga,
                     papGigiKananEmpat: data.papGigiKananEmpat,
                     papGigiKananDua: data.papGigiKananDua,
                     papGigiKananSatu: data.papGigiKananSatu,
                     papGigiKiriEmpat: data.papGigiKiriEmpat,
                     papGigiKiriDua: data.papGigiKiriDua,
                     papGigiKiriTiga: data.papGigiKiriTiga,
                     papGigiKiriSatu: data.papGigiKiriSatu,
                     pasien: pasien
                 });
             },
             saveTranferPasienInternalRisikoJatuh: function(tranferPasienInternal, data) {
                 return r.post({
                     url: baseUrlApiAction + "transfer-pasien-internal/save-resiko-jatuh/"
                 }, {
                     transferPasienInternal: tranferPasienInternal,
                     resikoJatuhDetail: data.resikoJatuhDetail
                 });
             },
             saveTranferPasienInternalPsikologis: function(tranferPasienInternal, data) {
                 return r.post({
                     url: baseUrlApiAction + "transfer-pasien-internal/save-detail-psikologis/"
                 }, {
                     transferPasienInternal: tranferPasienInternal,
                     detailPsikologis: data.detailPsikologis
                 });
             },
             saveTranferPasienInternalStatusKemandirian: function(tranferPasienInternal, data) {
                 return r.post({
                     url: baseUrlApiAction + "transfer-pasien-internal/save-aktivitas-kemandirian/"
                 }, {
                     transferPasienInternal: tranferPasienInternal,
                     detailAktivitasKemandirian: data.detailAktivitasKemandirian
                 });
             },
             saveSOAP: function(pasienDaftar, tanggal, data, pegawaiDaftar) {
                 debugger;
                 console.log(data);
                 return r.post({
                     url: baseUrlApiAction + "soap/save-soap/"
                 }, {
                     
                     tglInput: tanggal,
                     noRec: "",
                     s: data.s,
                     o: data.o,
                     a: data.a,
                     p: data.p,
                     pasienDaftar: pasienDaftar,
                     pegawai: pegawaiDaftar
                 });
             },
            saveSOAPMedik: function(data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
             },
            saveCheckIn: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "check-in/save-check-in/"
                 }, data);
             },
            saveCheckOut: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "operation/save-checkout-operation/"
                 }, data);
             },
             saveSignIn: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "signin-operation/save-signin-operation/"
                 }, data);
             },
            saveSignOut: function(data) {
            debugger;
                 return r.post({
                     url: baseUrlApiAction + "signout-operation/save-signout-operation/"
                 }, data);
             },
             saveTimeOut: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "time-out-control/save-time-out-control/"
                 }, data);
             },

            saveLaporanPerhitunganKasa: function(data) {
                debugger
                 return r.post({
                     url: baseUrlApiAction + "penghitungan-Kassa-dan-alat-operasi/save-penghitungan-Kassa-dan-alat-operasi"
                 }, data);
             },
            savePenjualanResepPasienBaru: function(data, urlSave) {
                 return r.post({
                    url: baseApiPostData + urlSave
                 }, data);
             },
             saveAsuransiPasien: function(data, urlSave) {
                 return r.post({
                    url: baseUrlApiAction + "registrasi-pelayanan/save-data-asuransi"
                 }, data);
             },
             editDataAsuransiPasien: function(data) {
                 return r.post({
                    url: baseUrlApiAction + "registrasi-pelayanan/edit-data-asuransi"
                 }, data);
             },
             saveOrderGizi: function(data, urlSave) {
                 return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             },
             saveRencana: function(data, urlSave) {
                 return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             },
             saveReturObat: function(data, urlSave) {
                 return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             }, 
             saveReturPelayanan: function(data, urlSave) {
                 return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             }, 
             deleteOrderLaborat: function(norec,data) {
                 return r.post({
                    url: baseUrlApiAction + "registrasi-pelayanan/delete-order-laborat/?noRec=" + norec
                 },data);
             }, 
             updateOrderLaborat: function(data,cito) {
                 return r.post({
                    url: baseUrlApiAction + "registrasi-pelayanan/save-tambahan-order/?cito="+ cito
                 },data);
             },
             saveRiwayatPAP: function(data) {
                return r.post({
                    url: baseUrlApiAction + "pengkajian-awal-baru/save-pengkajian"
                 }, data);
             },
             savePemeriksaanUmum: function(data, urlSave) {
                return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             },
             saveAnamnesis: function(data, urlSave) {
                return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             },
             saveRencanaOperasiBedah: function(data, urlSave) {
                return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             },
            savePerhitunganKassa: function(data, urlSave) {
                return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             },
             simpanPengkajianAwalPasien: function(data, currentState) {
                 debugger;
                 if (currentState) {
                    return r.post({
                        url: baseUrlApiAction + "pengkajian-lanjutan/save-pengkajian-lanjutan"
                    }, data);
                 } else {
                    return r.post({
                        url: baseUrlApiAction + "pengkajian-awal/save-pengkajian-awal"
                    }, data);
                 }
             },
             updatePengkajianAwalPasien: function(data, currentState) {
                 debugger;
                 if (currentState) {
                    return r.post({
                        url: baseUrlApiAction + "pengkajian-lanjutan/update-pengkajian-lanjutan"
                    }, data);
                 } else {
                    return r.post({
                        url: baseUrlApiAction + "pengkajian-awal/update-pengkajian-awal"
                    }, data);
                 }
             },
             saveRencanaOperasi: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-rencana-operasi"
                 }, data);
             },
             saveDiagnosisKeperawatan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "diagnosa-keperawatan/save-diagnosa-keperawatan"
                 }, data)
             },
             saveAlergiPAP: function(data) {
                 debugger;
                 return r.post({
                     url: baseUrlApiAction + "tanda-vital/save-tanda-vital"
                 }, data);
             },
             saveDaftarPermintaanOperasi: function(data, urlSave) {
                return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             },
             saveUSCOM: function(data, urlSave) {
                return r.post({
                    url: baseUrlApiAction + urlSave
                 }, data);
             },
             saveObservasiIntCare: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "observasi/save-observasi"
                 }, data)
             },
             batalPeriksa: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "batalRegistrasi/save-pembatalan-registrasi"
                 }, data)
             },
             updatePasienDaftar: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pasien/update-pasien-daftar"
                 }, data)
             },
             saveFormulirAnestesiPasien: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pra-anestesi-pasien-bedah/save-anestesi-pasien-bedah"
                 }, data)
             },

             saveFormulirAnestesiPasienRev1: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pra-anestesi-pasien-bedah/save-anestesi-pasien-bedah-rev1"
                 }, data)
             },
             saveFormulirAnestesiDokterRev1: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pra-anestesi-dokter-bedah/save-anestesi-dokter-bedah-rev1"
                 }, data)
             },
             saveAsuhanKeperawatan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "asuhan-keperawatan-peri-operasi/save-asuhan-perawat"
                 }, data)
             },

             SavePemantauaAnestesi : function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pemantauan-anestesi-lokal/save-pemantauan-anestesi"
                 }, data)
             },

            saveLaporanPembedahanInstruksiPasca: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "laporan-pembedahan-instruksi-pasca-bedah/save-pasca-bedah"
                 }, data)
             },

             
             saveIntraPerawatBedah: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "post-operasi-perawat-bedah/save-post-operasi-bedah"
                 }, data)
             },

             saveIntraPerawatBedahRev1: function(data) {
              debugger;
                 return r.post({
                     url: baseUrlApiAction + "intra-operasi-perawat-bedah/save-intra-operasi-bedah"
                 }, data)
             },

             saveIntraAnestesiRevisi: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "intra-operasi-anestesi/save-intra-operasi-anestesi"
                 }, data)
             },

             
             saveIntraAnestesi: function(data) {
                debugger;
                 return r.post({
                     url: baseUrlApiAction + "asuhan-keperawatan-peri-operasi/save-asuhan-perawat"
                 }, data)
             },
              savePostAnestesi: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "asuhan-keperawatan-peri-operasi/save-asuhan-perawat"
                 }, data)
             },
             savePostAnestesiRev: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "post-operasi-anestesi/save-post-operasi-anestesi"
                 }, data)
             },
             
             Savepraanestesidokter: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pra-anestesi-dokter-bedah/save-anestesi-dokter-bedah"
                 }, data)
             },
              savePostOperasiPerawatBedah: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "post-operasi-perawat-bedah/save-post-operasi-bedah"
                 }, data)
             },

             hapusTindakan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/delete-order-pelayanan"
                 }, data)
             },
             saveKendaliDokumen: function(data){
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-kendali-dokumen-rekam-medis"
                 }, data)
             }

             
         };
     }]);
     pasienService.service('FindPasien', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderGizi: function(produkId) {
                 return r.get({
                     url: baseUrlApiAction + "http://localhost:8989/jasamedika-web/registrasi-pelayanan/get-pemesanan-bahan?produks="+produkId
                 });
             },
             getPasienTelpon: function() {
                 return r.post({
                     url: baseApiPostData + "registrasi-pasien-online/antrian-pasien-list/"
                 });
             },
             findKekuatan: function(id) {
                 return r.get({
                     url: baseUrlApiAction + "product/find-kekuatan/?idGenerik=" + id
                 });
             },
             getAmbilObat: function(id) {
                 return r.get({
                     /*url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapSkriningGizi&noCm=" + noCm + "&tglInput=" + tglInput*/
                     url: baseUrlApiAction + "stok-produk-global/find-produk-obat-stok/?generikId=" + id
                 });
             },
             getObat: function() {
                 return r.get({
                     /*url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapSkriningGizi&noCm=" + noCm + "&tglInput=" + tglInput*/
                     url: baseUrlApiAction + "stok-produk-global/find-produk-obat-stok-no-generik/?"
                 });
             },
             getOrderBankDarah: function(noOrder) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-pelayanan-darah/?noOrder=" + noOrder
                 });
             },
             getOrderDetail: function(noOrder) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-detail/?noOrder=" + noOrder
                 });
             },
             getListBedahPatient: function(tanggalAwal, tanggalAkhir, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = "";
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?ruanganId=44" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir + "&noCm=" + noCm
                 });
                 //   Ruangan di patok 44 khusus menampilkan data pasien yang hanya di ruangan bedah sentral
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");
             },
             getListPatientDarah: function(tanggalAwal, tanggalAkhir, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = "";
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?ruanganId=41" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir + "&noCm=" + noCm
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");
             },
             getListGolonganDarah: function(data) {
                 return r.get({
                     url: baseUrlApiAction + "gol-darah-rhesus/find-all/"
                 });
             },
             getOrder: function(noOrder) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-darah/?noOrder=" + noOrder
                 });
             },
             getListPatientGizi: function(tanggalAwal, tanggalAkhir, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = "";
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?ruanganId=54" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir + "&noCm=" + noCm
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");
             },
             getListMonitorSkor: function(tanggalAwal, tanggalAkhir, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = "";
                 return r.get({
                     url: baseUrlApiAction + "skrining-gizi/findskoring/?" + "dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir + "&noCm=" + noCm
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");
             },
             GetRadioSkoring: function(tanggalAwal, tanggalAkhir, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = "";
                 return r.get({
                     url: baseUrlApiAction + "service/list-generic/?view=StatusSkoring&select=*"
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");
             },
             getListMonitorSkorSearch: function(tanggalAwal, tanggalAkhir, namaPasen, skoring) {
                 return r.get({
                     url: baseUrlApiAction + "skrining-gizi/find-skoring/?dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir + "&namaPasien=" + namaPasen + "&pilih=" + skoring
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");
             },
             saveSuratPermintaanMasuk: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-surat-permintaan-masuk/"
                 }, data);
             },
             findAll: function(noRegistrasi) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan/?noRegistrasi=" + noRegistrasi
                 });
             },
             findRuanganPelayanan: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/find-ruangan-pelayanan/?noRec=" + noRec
                 });
             },

             findDetailPelayananByPegawai: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan-by-pegawai/?noRec=" + noRec + "&idPegawai=" + modelItem.getPegawai().id
                 });
             },
             findDetailPelayanan: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan-all/?noRec=" + noRec
                 });
             },
             findDetailOrderObat: function(noOrder) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan-obat/?noOrder=" + noOrder
                 });
             },
             findOrderObat: function(noCm, ruanganId, startDate, untilDate) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/find-order-pelayanan-obat/?noCm=" + noCm + "&ruanganId=" + modelItem.getPegawai().ruangan.id + "&dateStart=" + dateHelper.formatDate(startDate, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(untilDate, 'YYYY-MM-DD')
                 });
             },
             getKeluhanUtama: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "keluhan-utama/find-by-noCm-and-tglInput/" + noCm + "/" + tglInput
                 });
             },
             getPulangMeninggal: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/load-pasien-meninggal?noRec=" + noRec
                 });
             },
             getKelasRencana: function() {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/get-kelas-rencana"
                 });
             },
             getPasienEdit: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pasien/get-pasien-by-nocm?noCm=" + noCm
                 });
             },
             getKelompokPasien: function() {
                 return r.get({
                     url: baseUrlApiAction + "/registrasi-pelayanan/get-kelompok-pasien"
                 });
             },
             checkRujukanBpjs: function(noKepesertaan) {
                 return r.get({
                     url: baseUrlApiAction + "asuransi/check-rujukan-bpjs/" + new Date().getTime() + "?id=" + noKepesertaan
                 });
             },
             checkNomorRujukanBpjs: function(noKepesertaan) {
                 return r.get({
                     url: baseUrlApiAction + "asuransi/data-rujukan-rs/?noRujukan=" + noKepesertaan
                 });
             },
             checkRujukanByNoKartu: function(noKartu) {
                 return r.get({
                     url: baseUrlApiAction + "asuransi/data-rujukan-byNoKartu-rs/?noKartu=" + noKartu
                 });
             },
             checkKepesertaan: function(noKepesertaan) {
                 return r.get({
                     url: baseUrlApiAction + "asuransi/check-kepesertaan/" + new Date().getTime() + "?id=" + noKepesertaan
                 });
             },
             checkKepesertaanByNik: function(nik) {
                 return r.get({
                     url: baseUrlApiAction + "asuransi/check-kepesertaan-by-nik/?nik=" + nik
                 });
             },
             getHistroyGinekologi: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "Pasien/Pemeriksaan/Ginekologi/" + noCm
                 });
             },
             ReconfirmRegistrasion: function(noReconfirm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pasien-online/confirm-pendaftaran/?noReservasi=" + noReconfirm
                 });
             },
             CheckNoReconfirm: function(noReconfirm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pasien-online/confirm-registrasi-online/?noReservasi=" + noReconfirm
                 });
             },
             getPasienDaftar: function(noRec) {
             
                 if (noRec !== undefined)
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/get/?noRec=" + noRec
                     });
             },
             getDataPelayananPasien: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-data-pasien-daftar?noRec=" + noRec
                });
             },
             getPasienDaftarDua: function(noCm) {

                 return r.get({
                     url: baseUrlApiAction + "pasien/get/?noCm=" + noCm
                 });
             },
             findNoRegistrasi: function(noCm, tanggal) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-nomor-registrasi/?noCm=" + noCm + "&tglInput" + tanggal
                 });
             },
             findByNoRegistrasi: function(noRegistrasi) {
                 return modelItem.kendoHttpSource("registrasi-pelayanan/get-registrasi/?noRegistrasi=" + noRegistrasi);
             },
             getAnamesisPasien: function(noCm, tanggal) {
                 return r.get({
                     url: baseUrlApiAction + "Pasien/GetAnamesis/" + noCm + "/" + tanggalPemeriksaanSelanjutnyaandah
                 });
             },
             getPersetujuanUmum: function(noCm, tanggal) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noCm-and-tglInput/?i=PersetujuanUmum&noCm=" + noCm + "&tglInput=" + tanggal
                 });
             },
             getSuratPermintaanMasukRumahSakit: function(noRec) {
                 return r.get({
                     //  url: baseUrlApiAction + "papgeneric/find-medical-record-noCm-and-tglInput/?i=SuratPermintaanMasuk&noCm=" + noCm + "&tglInput=" + tanggal
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=SuratPermintaanMasuk&noRec=" + noRec
                 });
             },
             getSuratPermintaanMasukRumahSakitAll: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             },
             getPersetujuan: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-persetujuan-rawat-inap/?noCm=" + noCm
                 });
             },
             saveDeposit: function(noRec, jumlah, tanggal) {
                 return r.get({
                     url: baseUrlApiAction + "product/save-deposit/?deposite=" + jumlah + "&noRec=" + noRec + "&tanggal=" + moment(tanggal).format('YYYY-MM-DD hh:mm:ss')
                 })
             },
             saveTotalBiaya: function(noRec, jumlah) {
                 return r.get({
                     url: baseUrlApiAction + "product/update-total-biaya/?total=" + jumlah + "&noRec=" + noRec
                 })
             },
             getPersetujuanUmumAll: function(from, until) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-tglInput/?i=PersetujuanUmum&from=" + moment(from).format('YYYY-MM-DD hh:mm:ss') + "&until=" + moment(until).format('YYYY-MM-DD hh:mm:ss')
                 });
             },
             getPersetujuan: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-persetujuan-rawat-inap/?noCm=" + noCm
                 });
             },
             getPersetujuanUmumAll: function(from, until) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-tglInput/?i=PersetujuanUmum&from=" + moment(from).format('YYYY-MM-DD hh:mm:ss') + "&until=" + moment(until).format('YYYY-MM-DD hh:mm:ss')
                 });
             },
             getDiagnosisTindakan: function(noCm, tanggal) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noCm-and-tglInput/?i=DiagnosaTindakanPasien&noCm=" + noCm + "&tglInput=" + tanggal
                 });
             },
             getDiagnosisKerja: function(noCm, tanggal) {
                 return r.get({
                     url: baseUrlApiAction + ("Pasien/GetDiagnosisKerja/" + noCm + "/" + tanggal)
                 });
             },
             checkPemeriksaanPasien: function(noCm, tanggal, desc) {
                 return r.get({
                     url: baseUrlApiAction + ("Pasien/CheckKajianAwal/?noC=" + noCm + "&tanggal=" + tanggal + "&desc=" + desc)
                 });
             },
             findByNoCM: function(noCm) {
                 //  return modelItem.kendoHttpSource("Pasien/GetByNoCM/?noCM=" + noCm);
                 return r.get({
                     url: baseUrlApiAction + "pasien/get/?noCm=" + noCm
                 });
             },
             findDokterPenanggungJawab: function(tanggal, noCm) {
                 return r.get({
                     url: baseUrlApiAction + "Pasien/GetDokterPenanggungJawab/" + noCm + "/" + tanggal
                 });
             },
             findGawatDarurat: function(from, until) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pasien/antrian-pasien-gawat-darurat/?dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                 });
             },
             getInformasi: function(pasienId, ruanganId) {
                 return r.get({
                     url: baseUrlApiAction + "instruksi-perjanjian/get-informasi-perjanjian?pasienId=" + pasienId + "&ruanganId=" + ruanganId
                 });
             },
             findPerjanjian: function(from, until, kodeReservasi) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pasien-online/antrian-pasien-list/?noReservasi=" + kodeReservasi + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                 });
             },
             getReservasiPasienById: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pasien-online/get-pasien/?id=" + noRec
                 });
             },
             findAntrianPasienBaru: function(from, until, ruangan, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = '';
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-baru-list/?namaPasien=" + noCm + "&&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                 });
             },
             findOperation: function(from, until, ruangan, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = '-';
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?dateStart=" + dateHelper.formatDate(new Date(2015, 1, 1), 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                         //  url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?ruanganId=" + ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                 });
             },
             findDokumenRekammedis: function(from, until, ruangan, namaPasien) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-dokumen-rekammedis/?namaPasien=" + namaPasien + "&idRuangan=" + modelItem.getPegawai().ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                 });
             },
             findDokumenRekammediss: function(from, until, ruangan, namaPasien) {
                 return r.get({
                     url: baseUrlApiAction + "kirim-dokumen-pasien/daftar-dokumen-rekam-medis-pasien?namaPasien=" + namaPasien + "&idRuangan=" + ruangan + "&dateStart=" + from + "&dateEnd=" + until
                 });
             },

             findQueue: function(from, until, ruangan, noCm, pegawai) {
                 if (noCm === undefined || noCm === '')
                     noCm = '';
                  if (ruangan === undefined || ruangan === '')
                    ruangan = '';
                 //untuk by pass antrian ruangan
                 if (window.byPassId !== undefined) {
                    debugger;
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-jalan/?noCm=" + noCm + "&ruanganId=" + window.byPassId + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD HH:mm') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD HH:mm')
                     });
                 }
                 if (modelItem.getStatusUser() === 'suster') {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-jalan/?noCm=" + noCm + "&ruanganId=" + ruangan + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD HH:mm') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD HH:mm')
                     });
                 } else if (modelItem.getStatusUser() === 'dokter') {
                    debugger;
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-jalan/?noCm=" + noCm + "&pegawaiId=" + pegawai.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD HH:mm') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD HH:mm')
                     });
                 }
                 if (ruangan === undefined)
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-jalan/?noCm=" + noCm + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD HH:mm') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD HH:mm')
                     });
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-jalan/?noCm=" + noCm + "&ruanganId=" + ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD HH:mm') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD HH:mm')
                 });
             },
             findQueueInap: function(from, until, ruangan, noCm, pegawai) {
                debugger;
                 if (noCm === undefined || noCm === '')
                     noCm = '';
                 if (ruangan === undefined || ruangan === '')
                    ruangan = '';
                 //untuk by pass antrian ruangan
                 if (window.byPassId !== undefined) {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-inap/?noCm=" + noCm + "&ruanganId=" + window.byPassId + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                     });
                 }
                 if (modelItem.getStatusUser() === 'suster') {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-inap/?noCm=" + noCm + "&ruanganId=" + ruangan + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD HH:mm') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD HH:mm')
                        //  url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-inap/?noCm=" + noCm + "&ruanganId=" + ruangan + 
                     });
                 } else if (modelItem.getStatusUser() === 'dokter') {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-inap/?noCm=" + noCm + "&pegawaiId=" + pegawai.id
                     });
                 }
                 if (ruangan === undefined)
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-inap/?noCm=" + noCm + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                     });
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-inap/?noCm=" + noCm + "&ruanganId=" + ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                 });
             },
             findQueueTatarekening: function(from, until, ruangan, noCm, pegawai) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-rawat-inap/?noCm=" + noCm + "&ruanganId=" + ruangan + "&dateStart=" + from + "&dateEnd=" + until
                 });
             },
             findQueuePulang: function(from, until, ruangan, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = '';

                 //untuk by pass antrian ruangan
                 if (window.byPassId !== undefined) {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-pulang-list/?noCm=" + noCm + "&ruanganId=" + window.byPassId + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                     });
                 }
                 if (modelItem.getStatusUser() === 'suster') {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-pulang-list/?noCm=" + noCm + "&ruanganId=" + modelItem.getPegawai().ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                     });
                 } else if (modelItem.getStatusUser() === 'dokter') {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-pulang-list/?noCm=" + noCm + "&pegawaiId=" + modelItem.getPegawai().id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                     });
                 }
                 if (ruangan === undefined)
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-pulang-list/?noCm=" + noCm + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                     });
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-pulang-list/?noCm=" + noCm + "&ruanganId=" + ruangan.id + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                 });
             },
             findQueueSemua: function(from, until, noCm, ruanganId) {
                from = dateHelper.formatDate(from, 'YYYY-MM-DD HH:mm');
                until = dateHelper.formatDate(until, 'YYYY-MM-DD HH:mm');
                if(!noCm) {
                    noCm = '';
                }
                if(!ruanganId){ruanganId = '';}
                //untuk by pass antrian ruangan
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?noCm=" + noCm + "&dateStart=" + from + "&dateEnd=" + until + "&ruanganId=" + ruanganId
                });
             },
             findQueueKonsul: function(from, until, ruangan, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = '';

                 //untuk by pass antrian ruangan
                     return r.get({
                         url: baseUrlApiAction + "konsultasi/antrian-pasien-list-konsul/?noCm=" + noCm + "&dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                     });
             },
             findReconfirmBpjs: function(from, until) {

                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-bpjs-list/?dateStart=" + dateHelper.formatDate(from, 'YYYY-MM-DD') + "&dateEnd=" + dateHelper.formatDate(until, 'YYYY-MM-DD')
                 });
             },

             getDataPasien: function(namaAyahKandug, namaPasien, tglLahir, from, until, isKendo) {
                var url = baseUrlApiAction + "pasien/pasien-list/?noCm=" + namaPasien + "&namaAyah=" + namaAyahKandug + "&tanggalLahir=" + tglLahir + "&dateStart=" + from + "&dateEnd=" + until;
                if (isKendo)
                    return modelItem.kendoHttpSource(url);
                return r.get({
                    url: url
                });
             },
            getDataPasienOperasi: function(datax) {
                 return r.get({
                     url: baseUrlApiAction + "pranestesi/get-pasien-by-rencanoperasi"
                 })
             },
             getByNoCM: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "pasien/get/?noCm=" + noCm
                 });
             },
             lalala: function(tahunPriode) {
                 return r.get({
                     url: baseUrlApiAction + "daftar-pengajuan-anggaran/get-pengajuan-anggaran/?tahun=" + tahunPriode
                 });
             },
             getByNoBpjs: function(noBpjs) {
                 return r.get({
                     url: baseUrlApiAction + "pasien/get-by-no-bpjs/?noBpjs=" + noBpjs
                 });
             },
             getByNoRegistrasi: function(noRegistrasi) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-registrasi/?noRegistrasi=" + noRegistrasi
                 });
             },
              getListKesadaraan: function() {
                 return r.get({
                     url: baseUrlApiAction + "operation/get-list-kesadaran-check-out"
                 });
             },
             getListKelengkapan: function() {
                 return r.get({
                     url: baseUrlApiAction + "operation/get-list-kelengkapan-check-out"
                 });
             },
             getPegawaiPelaksana: function() {
                 return r.get({
                     url: baseUrlApiAction + "pelaksana/get-jenis-pelaksana"
                 });
             },
             getPegawaiByPelaksana: function(id) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai-by-pelaksana?id=" + id
                 });
             },
             getAlergy: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "Pasien/GetAlergyByNoCM/" + noCm
                 });
             },
             getAlergyTop: function(noCm, top) {
                 return r.get({
                     url: baseUrlApiAction + "Pasien/GetAlergyByNoCM/" + noCm + "?top=" + top
                 });
             },
            //  countAntrianReservasi: function(ruanganId, tgl) {
             countAntrianReservasi: function(pasienId) {
                 return r.get({
                    //  url: baseUrlApiAction + "registrasi-pelayanan/sum-antrian-registrasi/?ruanganId=" + ruanganId + "&dateStart=" + dateHelper.formatDate(tgl, 'YYYY-MM-DD')
                    url: baseUrlApiAction + "registrasi-pelayanan/sum-antrian-registrasi/?pasienId=" + pasienId
                 });
             },
             getHasilTriage: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pasien-gawat-darurat/get-hasil-triage/?noRec=" + noRec
                 });
             },
             getKesehatanNifas: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec-antrian-pasien-diperiksa/?i=RiwayatKehamilanPersalinanNifasYangLalu&noRec=" + noRec
                 });
             },
             getStatusFungsional: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec-antrian-pasien-diperiksa/?i=PapStatusFungsional&noRec=" + noRec
                 });
             },
             getStatusTumbuhKembang: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=PapRiwayatTumbuhKembang&noRec=" + noRec
                 });
             },

             getInformasiPerjanjian: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=PapInstruksiPerjanjian&noRec=" + noRec
                 });
             },
             getDiagnosisTindakanByNoRec: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=DiagnosaTindakanPasien&noRec=" + noRec
                 });
             },
             getDiagnosisaByNoRec: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=DiagnosaPasien&noRec=" + noRec
                 });
             },
             getDiagnosaNyNoRec: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=DiagnosaPasien&noRec=" + noRec
                 });
             },
             getDiagnosa: function(noCm, tanggal) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noCm-and-tglInput/?i=DiagnosaPasien&noCm=" + noCm + "&tglInput=" + tanggal
                 });
             },
             getDiagnosaTop: function(noCm, top) {
                 return r.get({
                     url: baseUrlApiAction + "Pasien/GetDiagnosaByNoCM/" + noCm + "?top=" + top
                 });
             },
             getPelayananByNoCM: function(noCm, top) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-pelayanan-rawat-jalan/?noCm=" + noCm
                 });
             },
             getPelayananRawatInap: function(noCm, top) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-pelayanan-rawat-inap/?noCm=" + noCm
                 });
             },
             getKeluhan: function(noCm, tanggal) {
                 var date = tanggal.getFullYear();
                 if (tanggal.getMonth() <= 9)
                     date = date + "0" + (tanggal.getMonth() + 1);
                 else
                     date = date + (tanggal.getMonth() + 1);
                 if (tanggal.getDate() < 10)
                     date = date + "0" + (tanggal.getDate());
                 else
                     date = date + tanggal.getDate();
                 return r.get({
                     url: baseUrlApiAction + "keluhan-tambahan/find-noCm-and-tglKeluhan/?noCm=" + noCm + "&tglInput=" + moment(tanggal).format('YYYY-MM-DD hh:mm:ss')
                 });
             },
             checkInput: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/check-input-pasien/?noRec=" + noRec
                 });
             },
             getTimeOut: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=TimeOutControl&noRec=" + noRec
                 });
             },
             getCheckIn: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=CheckIn&noRec=" + noRec
                 });
             },
             getSignIn: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=SignInOperation&noRec=" + noRec
                 });
             },
             getAlergiByNoCm: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm/?i=PapAlergi&noCm=" + noRec
                 });
             },
             getAlergi: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=PapAlergi&noRec=" + noRec
                 });
             },
             getKebutuhanDasar: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "kebutuhan-dasar/find-kebutuhan-dasar?noRec=" + noRec
                 });
             },
             getKebutuhanEdukasi: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=PapKebutuhanEdukasi&noRec=" + noRec
                 });
             },
             getMasalahKeperawatan: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=MasalahKeperawatan&noRec=" + noRec
                 });
             },
             geticdnine: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "diagnosa-tindakan-pasien/get-diagnosa-tindakan-by-antrian?noRec=" + noRec
                 });
             },
             geticdten: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "diagnosa-pasien/get-diagnosa-by-antrian?noRec=" + noRec
                 });
             },
             getRiwayatKelahiran: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=PapRiwayatKelahiran&noRec=" + noRec
                 });
             },
             getRiwayatAnggaran: function() {
                 return r.get({
                     url: baseUrlApiAction + "daftar-pengajuan-anggaran/get-pengajuan-anggaran/?tahun=2017"
                 });
             },
             getInformasiIbu: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=PapInformasiIbu&noRec=" + noRec
                 });
             },
             getAsesmenGiziLanjut: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=AsesmenGiziLanjut&noRec=" + noRec
                 });
             },
             getAsesmentGiziAwal: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=AsesmenGiziAwal&noRec=" + noRec
                 });
             },
             getRiwayatKesehatan: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=RiwayatKesehatan&noRec=" + noRec
                 });
             },
             getRiwayatImunisasi: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec-pasien-antrian-pasien-diperiksa/?i=PapRiwayatImunisasi&noRec=" + noRec
                 });
             },
             getDataKeluhanTambahan: function(noRec, tanggal) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=PapKeluhanTambahan&noRec=" + noRec
                 });
             },
             getRiwayatPsikososialByNoRec: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=PapRiwayatPsikososial&noRec=" + noRec
                 });
             },
             getRiwayatPsikososial: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapRiwayatPsikososial&noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             getDataFromSuster: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "kebutuhan-dasar/find-kebutuhan-dasar?noRec=" + noRec
                 });
             },
             getTandaVitalAll: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm/?i=PapDataTandaVital&noCm=" + noCm
                 });
             },
             getTandaVital: function(noRec) {
                 return r.get({
                     //  url: baseUrlApiAction + "tanda-vital/find-noCm-and-tglInput/?noCm=" + noCm + "&tglInput=" + tglInput
                     url: baseUrlApiAction + "tanda-vital/find-noRec/?noRec=" + noRec
                 });
             },

             getMasterTandaVital: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pemantauan-anestesi-lokal/get-tanda-vital"
                 });
             },

             GetAntrianPemantauanAnestesi : function(noRec) {
                debugger
                 return r.get({
                     url: baseUrlApiAction + "pemantauan-anestesi-lokal/get-pasien-operasi?noRec=" + noRec
                 });
             },

             getSubPemantauanAnestesi : function(noRec) {
                debugger
                 return r.get({
                     url: baseUrlApiAction + "pemantauan-anestesi-lokal/get-list-by-notrans?notrans=" + noRec
                 });
             },

             getSkriningNyeri: function(noRec, tglInput) {
                 return r.get({
                     //  url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapSkriningNyeri&noCm=" + noCm + "&tglInput=" + tglInput
                     /*url: baseUrlApiAction + "papgeneric/find-medical-record-noRec/?i=PapSkriningNyeri&noRec=" + noRec*/
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec-and-tglinput-pasien/?i=PapSkriningNyeri&noRec=" + noRec + "&tglInput=" + tglInput
                 });
             },
             getSkriningGizi: function(noRec, tglInput) {
                 return r.get({
                     /*url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapSkriningGizi&noCm=" + noCm + "&tglInput=" + tglInput*/
                     url: baseUrlApiAction + "papgeneric/find-medical-record-noRec-and-tglinput-pasien/?i=PapSkriningGizi&noRec=" + noRec + "&tglInput=" + tglInput
                 });
             },
             getPernafasan: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapPernapasan&noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },

             getSirkulasi: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapSirkulasi&noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             getNeurologi: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapNeurologi&noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             getGastrointestinal: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapGastrointestinal&noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             getEliminasi: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapEliminasi&noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             getIntegumen: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapIntegumen&noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             getMuskuloskeletal: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapMuskuloskeletal&noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             getGenetalia: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "papgeneric/find-noCm-and-tglInput/?i=PapGenatalia&noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             getKognisi: function(noCm, tglInput) {
                 debugger;
                 return r.get({
                     url: baseUrlApiAction + "jasamedika-web/papgeneric/find-medical-record-noRec-and-tglinput/?i=PersepsiKognisi&noRec=" + noRec + "&tglInput=" + tglInput
                 });
             },
             getGinekologi: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "ginekologi/find-noCm-and-tglInput/?noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             W: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-persetujuan-rawat-inap/?noCm=" + noCm
                 });
             },
             getSoap: function(noCm, tglInput) {
                 return r.get({
                     url: baseUrlApiAction + "soap/select-for-soap/?noCm=" + noCm + "&tglInput=" + tglInput
                 });
             },
             getDetailSoap: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "soap/select-detail-for-soap/?noRec=" + noRec
                 });
             },
             getPasienPulang: function(start, until) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-list-pasien-daftar/?start=" + start + "&until=" + until
                 });
             },
             getBilling: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-billing/?noRec=" + noRec
                 });
             },
             getRencanaKelas: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getRencanaPindah: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/load-rencana-pindah?noRec=" + noRec
                 });
            },
            getLoadData: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/load-rencana-pindah?noRec=" + noRec
                 });
            },
            getKelasPindah: function() {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/get-kelas-rencana"
                 });
            },
            getRuanganPindah: function(kelasId) {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/get-ruangan-by-kelas?id=" + kelasId
                 });
            },
            getKamarPindah: function(ruanganId) {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/get-kamar-by-ruangan?id=" + ruanganId
                 });
            },
            getNoBedPindah: function(kamarId) {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/get-bed-by-kamar?id=" + kamarId
                 });
            },
            getKelas: function() {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/get-kelas-rencana"
                 });
            },
            getKelasByRuangan: function(ruanganId) {
                 return r.get({
                     url: baseUrlApiAction + "mapRuanganToKelas/get-kelas-by-ruangan?ruanganId=" + ruanganId
                 });
            },
             getKamarId: function(ruanganId) {
                 return r.get({
                     url: baseUrlApiAction + "/ruangan/get-jml-tempattidur-byruangan?idRuangan=" + ruanganId
                 });
            },
            getRuangan: function(kelasId) {
                 return r.get({
                     url: baseUrlApiAction + "mapRuanganToKelas/get-ruangan-by-kelas?kelasId=" + kelasId
                 });
            },
            getKamar: function(id) {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/get-kamar-by-ruangan?id=" + id
                 });
            },
            getKamarByKelas: function(kelasId, ruanganId) {
                 return r.get({
                     url: baseUrlApiAction + "mapRuanganToKelas/get-kamar-by-kelas?kelasId=" + kelasId +"&ruanganId=" + ruanganId
                 });
            },
            getNoBed: function(kamarId) {
                 return r.get({
                     url: baseUrlApiAction + "pasien-meninggal/get-bed-by-kamar?id=" + kamarId
                 });
            },
            getDaftarPindahRuanganAll: function(dateStart, dateEnd) {
                 return r.get({
                     url: baseUrlApiAction + "admisi-rencana-pasien/get-admisi-rencana?startDate=" +dateStart+ "&endDate=" +dateEnd
                 });
            },
            getHargaNetto: function(noRecRegistrasi, produckId) {
                 return r.get({
                     url: baseUrlApiAction + "pelayanan-piutang-rekanan/get-piutang-rekanan?noRegistrasi=" + noRecRegistrasi +"&produkId=" + produckId +"&cito=0"
                 });
            },
            getJenisPembiayaan: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-jenis-pembiayaan"
                 });
            },
            getItem : function(urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getDataDaftarTRPNBP: function() {
                 return r.get({
                     url: baseUrlApiAction + "penyusunan-trpnbp/get-daftar-penyusunan-trpnbp"
                 });
            },
            getDataTRPNBP: function(tglawal,tglakhir) {
                 return r.get({
                     url: baseUrlApiAction + "penyusunan-trpnbp/get-penyusunan-trpnbp?dateStart=" + tglawal + "&dateEnd=" + tglakhir
                 });
            },
            getDataTRPNBPHead: function(tahun) {
                 return r.get({
                     url: baseUrlApiAction + "penyusunan-trpnbp/get-daftar-penyusunan-trpnbp/?tahun=" + tahun
                 });
            },
            getEditUsulanAnggaran: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "anggaran/get-pengajuan-usulan-anggaran-by-norec/?noRec=" + noRec
                 });
            },
            getDataDaftarRKAKL: function(tahun) {
                 return r.get({
                     url: baseUrlApiAction + "daftar-rka-kl/get-detail-rka-kl/?tahun=" + tahun
                 });
            },
            getDataDetail: function(tahun) {
                 return r.get({
                     url: baseUrlApiAction + "daftar-rka-kl/get-detail-rka-kl/?tahun=" + tahun
                 });
            },
            getHargaSatuan: function(a, b, c) {
                 return r.get({
                     url: baseUrlApiAction + "pelayanan-piutang-rekanan/get-piutang-rekanan?noRegistrasi=" + a + "&produkId=" + b + "&cito=" + c
                 });
            },
            getPenyusunanEPlanning: function() {
                 return r.get({
                     url: baseUrlApiAction + "penyusunan-eplanning/get-penyusunan-eplanning/?isVerifikasi=PENGAJUAN"
                 });
            },
            getDataAsuransi: function(id, noCm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-data-asuransi?id=" + id + "&noCm=" + noCm
                 });
            },
            getDataRekanan: function(id) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-rekanan-by-kelompok-user?id=" + id
                 });
            },
            getJenisObat: function(id) {
                 return r.get({
                     url: baseUrlApiAction + "service/list-generic/?view=JenisKemasan&select=*"
                 });
            },
            getNamaObat: function(id) {
                 return r.get({
                     url: baseUrlApiAction + "service/list-generic/?view=StokProdukGlobal&select=*"
                 });
            },
            getAllRuangan: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-all-ruangan"
                 });
            },
            getPegawaiDokter: function() {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai-by-pelaksana?id=1"
                 });
             },
             getDokter: function() {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-all-dokter2"
                 });
             },
            getDataGolonganAsuransi: function(id, noCm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-data-asuransi?id=" + id + "&noCm=" + noCm
                 });
             },
             getDiagnosa: function() {
                 return r.get({
                     url: baseUrlApiAction + "service/list-generic/?view=Diagnosa&select=id,kdDiagnosa,namaDiagnosa"
                 });
             },
            getDataAsuransiPasien: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-load-data-asuransi"
                 });
             },
             getAsalRujukan: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-all-asal-rujukan"
                 });
             },
             getAturanPakai: function() {
                 return r.get({
                     url: baseUrlApiAction + "service/list-generic/?view=Stigma&select=id,name"
                 });
             },
             getDaftarPenjualanObatPesanBaru: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-pelayanan-obat-luar/?"
                 });
             },
             getJenisWaktu: function() {
                 return r.get({
                     url: baseUrlApiAction + "service/list-generic/?view=JenisWaktu&select=*"
                 });
             },
             getMenuTambahan: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-gizi-menu-tambahan?"
                 });
             },
             getDataOrderMakananGizi: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan-gizi-makanan/?"
                 });
             },
             getDataOrderMinumanGizi: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan-gizi-minuman/?"
                 });
             },
            saveDataItem: function (data, urlSave) {
                return r.post({
                    url: baseUrlApiAction + urlSave
                }, data);
             },
             getRuanganRJ: function() {
                 return r.get({
                     url: baseUrlApiAction + "ruangan/get-all-ruangan-rawat-jalan?"
                 });
             },
             getRuanganRI: function() {
                 return r.get({
                     url: baseUrlApiAction + "ruangan/get-all-ruangan-rawat-inap?"
                 });
             },
             getRuanganOperator: function() {
                 return r.get({
                     url: baseUrlApiAction + "ruangan/get-all-ruangan-operator?"
                 });
             },
             getListData: function(url) {
                 return r.get({
                     url: baseUrlApiAction + url
                 });
             },
             getListRiwayatPap: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "pengkajian-awal-baru/get-all-pengkajian?noCm=" + noCm
                 });
             },
             getRencana: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "rencana/get-rencana/" + noCm
                 });
             },
             getInstruksi: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "instruksi/get-instruksi/" + noCm
                 });
             },
             getProdukRetur: function(noRecStruk) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-produk-penjualan-bebas?noRecStrukPelayanan=" + noRecStruk
                 });
             },
             getEdukasiPasien: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "edukasi/get-edukasi/" + noCm
                 });
             },
             getPengkajianKebutuhanDasar: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pengkajian-kebutuhan-dasar/get-pengkajian-kebutuhan-dasar?noRec=" + noRec
                 });
             },
             getPemeriksaanUmum: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "pemeriksaanUmum/get-pemeriksaan-umum/" + noCm
                 });
             },
             getAnamnesis: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "anamnesis/get-anamnesis/" + noCm
                 });
             },
             getRiwayatAnamnesis: function(noCm) {
                 return r.get({
                     url: baseUrlApiAction + "riwayat-penyakit-pengobatan/get-riwayat-penyakit-pengobatan/" + noCm
                 });
             },
            getHistoriKonsultasi: function(noCm, tanggalAwal, tanggalAkhir) {
                 return r.get({
                     url: baseUrlApiAction + "konsultasi/get-riwayat-konsultasi/" + noCm + "/" + tanggalAwal + "/" + tanggalAkhir
                 });
            },
            getPermintaanOperasi: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-permintaan-operasi/"
                });
            },
            getPermintaanOperasiAll: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                });
            },
            getPermintaanOperasiByDateNoCm: function(tglawal, tglakhir, noCm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-permintaan-operasi-by-nocm-and-date/" + tglawal + "/" + tglakhir+ "/" + noCm 
                });
            },
            getPermintaanOperasiByNoRec: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-permintaan-operasi/" + noRec 
                });
            },
            getRencanaOperasiAll: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                });
            },
            getRencanaOperasiByDateNoCm: function(tglawal, tglakhir, noCm) {
                if (noCm === undefined || noCm === '')
                     noCm = '';
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-rencana-operasi-by-nocm-and-date/" + tglawal + "/" + tglakhir+ "/" + noCm 
                });
            },
             getMasterDataPAP: function(id, noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pengkajian-awal/load-pengkajian-awal?id=" + id + "&noRec=" + noRec
                 });
             },
             getDataKajianLanjutan: function(id, noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pengkajian-lanjutan/load-pengkajian-lanjutan?id=" + id + "&noRec=" + noRec
                 });
             },
             getMasterDiagnosis: function() {
                 return r.get({
                     url: baseUrlApiAction + "diagnosa-keperawatan/get-all-master"
                 });
             },
             getDetailDiagnosis: function(id) {
                 return r.get({
                     url: baseUrlApiAction + "diagnosa-keperawatan/get-detail-by-master?id=" + id
                 });
             },
             getTransaksiDiagnosis: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "diagnosa-keperawatan/get-detail-by-transaction?noRec=" + noRec
                 });
             },
             getTandaVitals: function(noCm, tglAwal, tglAkhir, status) {
                 return r.get({
                     //  url: baseUrlApiAction + "tanda-vital/find-noCm-and-tglInput/?noCm=" + noCm + "&tglInput=" + tglInput
                     url: baseUrlApiAction + "tanda-vital/get-tanda-vital?noCm=" + noCm + "&startDate=" + tglAwal + "&endDate=" + tglAkhir + "&status="+ status 
                 });
             },
            getAlergiPAP: function(noCm) {
                 return r.get({
                     //  url: baseUrlApiAction + "tanda-vital/find-noCm-and-tglInput/?noCm=" + noCm + "&tglInput=" + tglInput
                     url: baseUrlApiAction + "tanda-vital/get-tanda-vital?noCm=" + noCm
                 });
             },
             getDokterDPJP: function(noCm) {
                 return r.get({
                     //  url: baseUrlApiAction + "tanda-vital/find-noCm-and-tglInput/?noCm=" + noCm + "&tglInput=" + tglInput
                     url: baseUrlApiAction + "jadwal-dpjp/get-jadwal-dpjp"
                 });
             },
             findDokterDPJP: function(ruanganId) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-dokter-jadwal-dpjp?id=" + ruanganId 
                 });
             },
             findImageCapKakiBayi: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "image/download?noRegistrasi=" + noRec 
                 });
            },
             getListGeneric: function(namaTabel) {
                 return r.get({
                     url: baseUrlApiAction + "service/list-generic/?view=" + namaTabel
                 });
             },
             getDataUrl: function(url) {
                 return r.get({
                     url: baseUrlApiAction + "retur-obat/get-ruangan-instalasi-farmasi"
                 });
             },
             getDaftarPenjualanObatPesanLama: function(ruanganId, noResep, noCm, tanggalAwal, tanggalAkhir) {
                 return r.get({
                     url: baseUrlApiAction + "retur-obat/find-retur-by-struk?ruanganId=" + ruanganId + "&noResep=" + noResep + "&noCm=" + noCm + "&tglAwal=" + tanggalAwal + "&tglAhir=" + tanggalAkhir
                 });
             },
             getStatusRetur: function(noRec, noStruk, noSbmLast) {
                 return r.get({
                     url: baseUrlApiAction + "retur-obat/get-detail-retur?noRec=" + noRec + "&noStruk=" + noStruk + "&noSbmLast=" + noSbmLast
                });
             },
             getNamaDokter: function(){
                return r.get({
                    url: baseUrlApiAction + "jadwal-dpjp/get-load-data-dpjp"
                });
             },
             getJadwalDpjp: function(){
                return r.get({
                    url: baseUrlApiAction + "jadwal-dpjp/get-jadwal-dpjp"
                });
             },
             getUscom: function(noRec){
                return r.get({
                    url: baseUrlApiAction + "uskom/load-data?noRec=" + noRec
                });
             },
             getNilaiNormalUscom: function(noRec){
                return r.get({
                    url: baseUrlApiAction + "uskom/get-nilai-normal?noRec=" + noRec
                });
             },
             getParameterObservasi: function(){
                 return r.get({
                     url: baseUrlApiAction + "observasi/get-observasi"
                 })
             },
             getDokumenKirim: function(dateStart, dateEnd, ruanganId, namaPasien){
                 return r.get({
                     url: baseUrlApiAction + "/kirim-dokumen-pasien/daftar-dokumen-rekam-medis-pasien-terima?namaPasien=" + namaPasien + "&idRuangan=" + ruanganId + "&dateStart="+ dateStart + "&dateEnd=" + dateEnd
                 })
             },
             getValueObservasi: function(dateStart, dateEnd, noReg){
                 return r.get({
                     url: baseUrlApiAction + "observasi/get-value-observasi/"+dateStart+"/"+dateEnd+"/"+noReg
                 })
             },
             findPasienIGD: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pasien/get-one-antrian-pasien-gawat-darurat/?noRec=" + noRec
                 });
             },
             findBatalPeriksa: function(tglAwal, tglAkhir) {
                 return r.get({
                     url: baseUrlApiAction + "batalRegistrasi/get-pembatalan/" + tglAwal + "/" + tglAkhir
                 });
             },
             getRencanaAdmisi: function(noRec){
                 return r.get({
                     url: baseUrlApiAction + "admisi-rencana-pasien/get-one-admisi-rencana?noRec=" + noRec
                 })
             },
             getDataMata: function(url) {
                return r.get({
                    url: baseUrlApiAction + "mata/" + url
                })
             },
             getNorecKajianLanjutan: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "pengkajian-lanjutan/get-pap?noRegistrasi=" + noRec
                })
             },
             getRuanganPenunjang: function() {
                 return r.get({
                     url: baseUrlApiAction + "/ruangan/get-all-ruangan-penunjang"
                 })
             },

             getPemantauanAnestesi: function() {
                return r.get({
                    url: baseUrlApiAction + "pemantauan-anestesi-lokal/get-pemantauan-anestesi"
                })
             },

             getPasienBedah: function() {
                return r.get({
                    url: baseUrlApiAction + "pranestesi/get-pasien-by-rencanoperasi"
                })
             },
             getMasterAsuhanKeperawatan: function() {
                return r.get({
                    url: baseUrlApiAction + "asuhan-keperawatan-master/get-list-data"
                })
             },

            getLoadAskepPeriOperatif: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "asuhan-keperawatan-peri-operasi/get-pasien-operasi?noRec=" + noRec
                })
             },

           getSubLoadAskepPeriOperatif: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "asuhan-keperawatan-peri-operasi/get-list-by-notrans?notrans=" + noRec
                })
             },

             getLoadAntrianLaporanPembedahanInstruksi: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "laporan-pembedahan-instruksi-pasca-bedah/get-pasien-operasi?noRec=" + noRec
                })
             },

             getSubLoadAntrianLaporanPembedahanInstruksi: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "laporan-pembedahan-instruksi-pasca-bedah/get-list-by-notrans?notrans=" + noRec
                })
             },

            getMasterInfus: function() {
                return r.get({
                    url: baseUrlApiAction + "laporan-pembedahan-instruksi-pasca-bedah/get-macam-infus"
                })
             },
             
             getLoadIntraOperasiAnestesi: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "post-operasi-perawat-bedah/get-pasien-operasi?noRec="+ noRec
                })
             },

            getLoadSubIntraOperasiAnestesi: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "post-operasi-perawat-bedah/get-list-post-operasi-perawat-bedah-by-notrans?notrans=" + noRec
                })
             },
             
             getAntrianIntraOperasiAnestesi: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "post-operasi-perawat-bedah/get-pasien-operasi?noRec=" + noRec
                })
             },

             getAntrianPostOperasiPerawatBedah: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "post-operasi-perawat-bedah/get-pasien-operasi?noRec=" + noRec
                })
             },
             getSubAntrianIntraOperasiAnestesi: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "post-operasi-perawat-bedah/get-list-post-operasi-perawat-bedah-by-notrans?notrans=" + noRec
                })
             },
            getAntrianIntraOperasiAnestesiRevs: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "intra-operasi-anestesi/get-pasien-operasi?noRec=" + noRec
                })
             },
             getSubAntrianIntraOperasiAnestesiRevs: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "intra-operasi-anestesi/get-list-intra-operasi-anestesi-by-notrans?notrans=" + noRec
                })
             },
             getSubAntrianPostPerawatBedah: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "post-operasi-perawat-bedah/get-list-post-operasi-perawat-bedah-by-notrans?notrans=" + noRec
                })
             },
            getLoadIntraOperasi: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "intra-operasi-perawat-bedah/get-pasien-operasi?noRec=" + noRec
                })
             },

            getSubLoadIntraOperasi: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "intra-operasi-perawat-bedah/get-list-intra-operasi-perawat-bedah-by-notrans?notrans=" + noRec
                })
             },

             getLoadLaporanPembedahanInstruksiPasca: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "intra-operasi-perawat-bedah/get-pasien-operasi?noRec=" + noRec
                })
             },
             getSubLoadLaporanPembedahanInstruksiPasca: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "intra-operasi-perawat-bedah/get-pasien-operasi?noRec=" + noRec
                })
             },

            getPerawat: function() {
                 return r.get({
                     url: baseUrlApiAction + "service/list-generic/?view=Pegawai&select=id,namaExternal"
                 });
             },

             getLoadCheckIn: function(noRec) {
                debugger
                 return r.get({
                     url: baseUrlApiAction + "check-in/get-check-in-by-norec-antrian?noRec=" + noRec
                 });
             },


            getLoadSubCheckIn: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "check-in/get-check-in-by-norec?noRec=" + noRec
                 });
             },
             
            getLoadTimeout: function(noRec) {
    
                 return r.get({
                     url: baseUrlApiAction + "time-out-control/get-time-out-by-norec-antrian?noRec=" + noRec
                 });
             },

             getLoadSubTimeout: function(noRec) {
    
                 return r.get({
                     url: baseUrlApiAction + "time-out-control/get-time-out-by-norec?noRec=" + noRec
                 });
             },

             getPegawaiTen: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "planningdiklathumasmarketpeserta/get-list-all-pegawai"
                 });
             },

             getLoadCheckOut: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "operation/get-check-out-by-norec-antrian?noRec=" + noRec
                 });
             },

             getLoadSubCheckOut: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "operation/get-check-out-by-norec?noRec=" + noRec
                 });
             },

             getLoadSignIn: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "signin-operation/get-sign-in-by-norec-antrian?noRec=" + noRec
                 });
             },
             getLoadSubSignIn: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "signin-operation/get-sign-in-by-norec?noRec=" + noRec
                 });
             },
             getLoadSignOut: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "signout-operation/get-sign-out-by-norec-antrian?noRec=" + noRec
                 });
             },
             getLoadSubSignOut: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "signout-operation/get-sign-out-by-norec?noRec=" + noRec
                 });
             },

            getLoadlapKassa: function(noRec) {
                debugger
                 return r.get({
                     url: baseUrlApiAction + "penghitungan-Kassa-dan-alat-operasi/get-hit-kassa?noRec=" + noRec
                 });
             },

             getLoadlapSubKassa: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "penghitungan-Kassa-dan-alat-operasi/get-hit-kassa-by-norec?noRec=" + noRec
                 });
             },
            getLoadFormulirPasien: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pra-anestesi-pasien-bedah/get-pranestesi-pasien-norec-antrian?noRec=" + noRec
                 });
             },

            getLoadSubFormulirPasien: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pra-anestesi-pasien-bedah/get-pranestesi-pasien-by-norec?noRec=" + noRec
                 });
             },
            getLoadFormulirDokter: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pra-anestesi-dokter-bedah/get-pranestesi-dokter-norec-antrian?noRec=" + noRec
                 });
            },
             getLoadSubFormulirDokter: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "pra-anestesi-dokter-bedah/get-pranestesi-dokter-by-norec?noRec=" + noRec
                 });
            },

             getLoadDaftarCheckIn: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "check-in/get-check-in-by-norec?noRec=" + noRec
                 });
             },
             getAsuhanKeperawatan: function() {
                return r.get({
                    url: baseUrlApiAction + "asuhan-keperawatan-master/get-list-data"
                })
             },
              getIntraPerawatBedah: function() {
                return r.get({
                    url: baseUrlApiAction + "asuhan-keperawatan-master/get-list-data-intra-operasi-perawat-bedah-v1"
                })
             },
             getIntraAnestesi: function() {
                return r.get({
                    url: baseUrlApiAction + "asuhan-keperawatan-master/get-list-data-intra-operasi-anestesi"
                })
             },
             getIntraOperasi: function() {
                debugger;
                return r.get({
                    url: baseUrlApiAction + "asuhan-keperawatan-master/get-list-data-intra-operasi"
                })
             },
             getPostOperasi: function() {
                return r.get({
                    url: baseUrlApiAction + "asuhan-keperawatan-master/get-list-data-post-operasi-anestesi"
                })
             },
            getPostOperasiAnestesiRevs: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "post-operasi-anestesi/get-pasien-operasi?noRec="+ noRec
                })
             },
            getSubPostOperasiAnestesiRevs: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "post-operasi-anestesi/get-list-post-operasi-anestesi-by-notrans?notrans="+ noRec
                })
             },
            getPostOperasiPerawatBedah: function() {
                return r.get({
                    url: baseUrlApiAction + "asuhan-keperawatan-master/get-list-data-post-operasi"
                })
             },

             getDataPasienAnastesi: function() {
                return r.get({
                    url: baseUrlApiAction + "pra-anestesi-pasien-bedah/get-list-pasien-bedah"
                })
             },
             getRehabilitasiAsesmen: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "rehabilitasi-asesmen/get-list-rehabilitasi-asesmen?norec=" + noRec
                })
             },
             getRehabilitasKlaimFormulir: function(noRec) {
                return r.get({
                    url: baseUrlApiAction + "rehabilitasi-asesmen/get-list-rehabilitasi-formulir-klaim?norec=" + noRec
                })
             },
             getMonitoringKlaim: function(from, until, klsRawat, jnsLayanan, qCari, status) {
                 return r.get({
                     url: baseUrlApiAction + "asuransi/get-monitor-klaim/?tglMasuk="+from+"&tglKeluar="+until+"&kelasRawat="+klsRawat+"&jnsPelayanan="+jnsLayanan+"&cari="+qCari+"&status="+status
                 })
             },
             getDetailSep: function(noSep){
                 return r.get({
                    url: baseUrlApiAction + "asuransi/detail-sep-peserta/?noSep=" +noSep
                 })
             },
             getDataKunjungan: function(noSep){
                 return r.get({
                    url: baseUrlApiAction + "asuransi/data-kunjungan-peserta/?noSep=" +noSep
                 })
             },
             getDataRiwayatPelayanan: function(noKartu){
                 return r.get({
                    url: baseUrlApiAction + "asuransi/data-riwayat-pelayanan-peserta/?noKartu=" + noKartu
                 })
             },
             getDataByNorecAntrian: function(noRec){
                 return r.get({
                    url: baseUrlApiAction + "pasien/get-by-noRec-antrian?noRec=" + noRec
                 })
             },
             findDiagnosabyKode: function(kdDiagnosa){
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/find-obat?kodeDiagnosa=" + kdDiagnosa
                 })
             },
             hapusSep: function(noSep){
                 return r.get({
                     url: baseUrlApiAction + "asuransi/delete-sep/?noSep=" + noSep
                 })
             },
             updateSep: function(data){
                 return r.get({
                     url: baseUrlApiAction + "asuransi/update-sep?noSep=" + data.noSep + "&noBpjs=" + data.noKartu + "&tanggalRujukan=" + data.tanggalRujukan + "&noRujukan=" + data.noRujukan + "&ppkRujukan=" + data.ppkRujukan + "&isRawatJalan=" + data.isRawatJalan + "&catatan=" + data.catatan + "&kodeDiagnosa=" + data.kdDiagnosa + "&poliTujuan="+data.poliTujuan+"&kelasRawat=" + data.kelasRawat + "&lakaLantas=" + data.lakaLantas +"&noCm=" + data.noCm + "&tanggalSep=" + data.tglSep
                 })
             },
             updatetglPulang: function(data){
                 return r.get({
                     url: baseUrlApiAction + "asuransi/update-tglPulang?noSep=" + data.noSep + "&tglPulang=" + data.tglPulang
                 })
             },
             getAntrianKendali: function(noCm, dateStart, dateEnd){
                if (currentState.indexOf('KendaliDokumenRekamMedis') > 0){
                    return r.get({
                        url: baseUrlApiAction + "registrasi-pelayanan/get-antrian-kendali-dokumen-RM?noCm=" + noCm
                    })
                } else {
                    return r.get({
                        url: baseUrlApiAction + "registrasi-pelayanan/get-antrian-kendali-dokumen-RM?noCm=" + noCm + "&startDate=" + dateStart + "&endDate=" + dateEnd
                    })
                }
             },
             getDaftarKendali: function(noCm, start, end, ruangan, status){
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-daftar-kendali-dokumen-RM?noCm=" +noCm+ "&start=" +start+ "&end=" +end+ "&ruangan="+ruangan+"&idStatus=" + status
                })
             },
             getDaftarRegistrasi: function(noCm, noRegistrasi, start, end){
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-riwayat-registrasi-pasien?noCm=" +noCm+ "&noRegistrasi=" +noRegistrasi+ "&startDate=" +start+ "&endDate=" +end
                })
             },
             getAntrianRegistrasi: function(noRegistrasi){
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-riwayat-antrian-pasien?noRegistrasi=" + noRegistrasi
                })
             }
             
        };
     }]);
	 
	  pasienService.service('RekamDataPegawai', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);
	 
	 pasienService.service('pengkajiangd', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);
	 
	 
     pasienService.service('RegistrasiPasienBaru', ['$q', '$http', 'R',
         function($q, $http, r) {
             return {
                 SendData: function(dataVO, urlDetail) {
                     var deffer = $q.defer();

                     var authorization = "";
                     var arr = document.cookie.split(';')
                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     r.post({
                         url: baseUrlApiAction + urlDetail
                     }, dataVO).then(function successCallback(response) {
                         if (response.status === 200)
                             deffer.resolve(response);
                         else if (response.status === 201)
                             deffer.resolve(response);
                     }, function errorCallback(response) {
                         deffer.reject(response);
                     });
                     return deffer.promise;

                 },
                 SendDataBayi: function(data, url) {
                     return r.post({
                         url: baseUrlApiAction + url
                     }, data);
                }
             };
         }
     ]);

 });