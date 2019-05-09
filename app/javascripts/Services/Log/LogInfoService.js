 define(['Configuration'], function(config) {

     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseApiPostData;
     var baseApiPostData = config.baseApiPostData;
	  var baseUrlListData = config.baseUrlListData;
     var e = config.baseUrlListData;
     var LogInfoService = angular.module('LogInfoService', ['ngResource', 'HttpServices', 'Services']);
     LogInfoService.service('ManageLogInfo', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveAbsensi: function(e) {
                 var arr = [];
                 for (var key in e) {
                     if (e.hasOwnProperty(key)) {
                         var element = e[key];
                         arr.push({
                             pegawai: element.pegawai,
                             jamMasuk: element.tglMasuk,
                             jamKeluar: element.tglKeluar
                         });
                     }
                 }
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-absen"
                 }, { data: arr });
             },
             savePir: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-simulasi-pendapatan"
                 }, item);
             },
			 
			 saveGajiPegawaiHonor: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
			 
			  saveGajiPegawaiHarianLepas: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
			 
			 saveUangMakanPegawai: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
			 
			 
             uploadFile: function(e) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/upload-absen"
                 }, { fileInput: e });
             },
             saveBerkasLamaran: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-berkas-lamaran"
                 }, item);
             },
             saveJadwalOrientasi: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-jadwal-orientasi"
                 }, item);
             },
             findPegawai: function() {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-all-pegawai"
                 });
             },

              findPegawaiUser: function() {
                 return r.get({
                     url: baseUrlApiAction + "user/get-all-user/"
                 });
             },

             findlogging: function(kdUser) {
                 //debugger
                 return r.get({

                     url: baseUrlApiAction + "logging/get-all-history-login-on-modul?kdUser="+kdUser
                 });
             },

              findlogging2: function(kdHistoryLogin){
               debugger
                 return r.get({
                     url: baseUrlApiAction + "logging/get-all-history-login-activity?kdHistoryLogin="+kdHistoryLogin
                 });
             },

             findPegawaiNoPaging: function() {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-all-pegawai-no-paging/"
                 });
             },
             findPegawaiByNama: function(namaPegawai) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-all-pegawai-no-paging-search?namaPegawai="+namaPegawai
                 });
             },
             findPegawaiById: function(idPegawai) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai-by-id/"+idPegawai
                 });
             },
             findPegawaiByNik: function(nikPegawai) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai-by-nik/"+nikPegawai
                 });
             },

             findPegawaiByInternalAndJabatan: function() {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai/"
                 });
             },

             hitungMasterEvaluasiJabatan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/hitung-master-evaluasi-jabatan/"
                 },data);
             },
             hitungEvaluasiJabatan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/hitung-grade-evaluasi-jabatan/"
                 },data);
             },
             findDatafaktorEvaluasiJabatan: function(idPegawai,bulan,tahun) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-list-by-jabatan/"+idPegawai+"/"+bulan+"/"+tahun
                 });
             },
             saveSurvei: function(items) {
                 for (var key in items) {
                     if (items.hasOwnProperty(key)) {
                         var element = items[key];
                         element.pegawai = modelItem.getPegawai();
                         element.tglInput = new Date();
                     }
                 }

                 return r.post({
                     url: baseUrlApiAction + "survei/"
                 }, modelItem.beforePost(items));
             },
             savePerhitunganSdk: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-perhitungan-abk"
                 }, modelItem.beforePost(item));
             },
             saveShiftKerja: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-shift-kerja"
                 }, modelItem.beforePost(item));
             },

            /* saveRekamDataPegawai: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "pegawai/save-pegawai"
                 }, data);
             },*/

             saveDataKeluarga: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-data-keluarga"
                 }, {
                     nip: data.nip,
                     namaPegawai: data.namaPegawai,
                     nama: data.nama,
                     hubunganKeluarga: data.hubunganKeluarga1 + data.hubunganKeluarga2.id,
                     tanggalLahir: data.tanggalLahir,
                     pekerjaan: data.pekerjaan,
                     statusKawin: data.statusKawin,
                     tertanggung: data.tertanggung1 + data.tertanggung2,
                     nomorSurat: data.nomorSurat,
                     tanggalSurat: data.tanggalSurat,
                     ayah: data.ayah,
                     ibu: data.ibu,
                     nipStatus: data.nipStatus,
                     alamat: data.alamat,
                     keterangan: data.keterangan

                 });
             },


            saveKeluargaPegawai: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "keluarga-pegawai/save-keluarga-pegawai"
                 }, data);
             },


             saveDataPermohonanCutiPegawai: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-permohonan-cuti-pegawai"
                 }, {
                     nomorPermohonan: data.nomorPermohonan,
                     nip: data.nip,
                     namaPegawai: data.namaPegawai,
                     unitKerja: data.unitKerja,
                     polaJadwal: data.polaJadwal,
                     jenisCuti: data.jenisCuti,
                     tahun: data.tahun,
                     jatahCuti: data.jatahCuti,
                     tanggalAwalCuti: data.tanggalAwalCuti,
                     tanggalAkhirCuti: data.tanggalAkhirCuti,
                     jumlahHari: data.jumlahHari,
                     sisaCuti: data.sisaCuti,
                     keterangan: data.keterangan




                 });
             },

             saveMutasiPegawai: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "keteranganSurvey/save-keterangan/"
                 }, {
                     nomorAgenda: data.nomorAgenda,
                     jenisSK: data.jenisSK1 + data.jenisSK2.id,

                     tanggalSK: data.tanggalSK,
                     nomor: data.nomor,
                     uraian: data.uraian,
                     skDari: data.skDari,
                     statusPegawai: data.statusPegawai,
                     kedudukan: data.kedudukan,
                     tanggalMeninggal: data.tanggalMeninggal,
                     kodeGapok: data.kodeGapok1 + data.kodeGapok2 + data.kodeGapok3 + data.kodeGapok4,
                     kodeGol: data.kodeGol1 + data.kodeGol2,
                     kodeJabatan: data.kodeJabatan1 + data.kodeJabatan2 + data.kodeJabatan3,
                     pensiun: data.pensiun,
                     tunjanganFungsional: data.tunjanganFungsional1 + data.tunjanganFungsional2 + data.tunjanganFungsional3,
                     tunjanganUmum: data.tunjanganUmum1 + data.tunjanganUmum2 + data.tunjanganUmum3,
                     tunjanganPapua: data.tunjanganPapua1 + data.tunjanganPapua2 + data.tunjanganPapua3,
                     wilayahTerperinci: data.wilayahTerperinci1 + data.wilayahTerperinci2 + data.wilayahTerperinci3,
                     statusKawin: data.statusKawin1 + data.statusKawin2.id,
                     beras: data.beras1 + data.beras2 + data.beras3 + data.beras4,
                     jumlah: data.jumlah,
                     grade: data.grade,
                     tanggalTMT: data.tanggalTMT,
                     tanggalRekam: data.tanggalRekam,
                     defauld: data.defauld












                 });
             },

             saveDataPegawai2: function(data) {

                 return r.post({
                         url: baseUrlApiAction + "mapping-pertanyaan/save-all-mapping-pertanyaan/"
                     }, data







                 );
             },

             saveIsianPelamar: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
			 
			 
			 saveDataUji: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
             saveImportGaji: function(data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
             },
             cetakLaporanAbsensi: function(idPegawai, tanggalAwal, tanggalAkhir) {
                return r.get({
                    url: baseUrlApiAction + "reporting/lapMonitoringAbsensi?idPegawai=" + idPegawai + "&startDate=" + tanggalAwal + "&endDate=" + tanggalAkhir
                });
             },
			 

             saveAsuransiNaker: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },

             saveHonorTim: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },


             saveReservasiOk: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },


             saveRekananMouPks: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },


             saveJenisSantunan: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },





             saveDataPegawai: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pegawai/save-pegawai"
                 }, data);
             },



             saveUangLembur: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorUangLembur: data.nomorUang,
                     tanggalProses: data.tanggalProses,
                     keterangan: data.keterangan



                 });
             },

            saveMasterJabatan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "jabatan/save-jabatan-internal/"
                 }, data);
             },

             savePremiKesehatan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-perhitungan-premi-b-p-j-s-kesehatan"
                 }, {
                     nomorGaji: data.nomorGaji,
                     satuanKerja: data.satuanKerja,
                     tanggalProses: data.tanggalProses,
                     jenisGaji: data.jenisGaji,
                     tahunUMR: data.tahunUMR,
                     jumlahUMR: data.jumlahUMR,
                     namaAsuransi: data.namaAsuransi,
                     keterangan: data.keterangan



                 });
             },
             savePremiKetenagakerjaan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorGaji: data.nomorGaji,
                     satuanKerja: data.satuanKerja,
                     tanggalProses: data.tanggalProses,
                     jenisGaji: data.jenisGaji,
                     tahunUMR: data.tahunUMR,
                     jumlahUMR: data.jumlahUMR,
                     namaAsuransi: data.namaAsuransi,
                     keterangan: data.keterangan

                 });
             },

             saveDataSantunan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorSantunan: data.nomorSantunan,
                     tanggalProses: data.tanggalProses,
                     statusMeninggal: data.statusMeninggal,
                     nama: data.nama,
                     jumlahOrang: data.jumlahOrang,
                     jenisSantunan: data.jenisSantunan,
                     jumlahSantunan: data.jumlahSantunan,
                     jumlahBunga: data.jumlahBunga,
                     total: data.total



                 });
             },

             savePesertaDidik: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nim: data.nim,
                     nama: data.nama,
                     jenisKelamin: data.jenisKelamin,
                     agama: data.agama,
                     nomorHP: data.nomorHP,
                     tempatLahir: data.tempatLahir,
                     tanggalLahir: data.tanggalLahir,
                     alamat: data.alamat,
                     periodePengajar: data.periodePengajar,
                     institusiPendidikan: data.institusiPendidikan,
                     jurursanPeminatan: data.jurusanPeminatan,
                     fakultas: data.fakultas



                 });
             },


             saveDaftarPaketPelatihan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     JenisPelatihan: data.jenisPelatihan,
                     NamaPelatihan: data.namaPelatihan,
                     Penyelenggara: data.penyelenggara,
                     Tempat: data.tempat,
                     TanggalMulai: data.tanggalMulai,
                     TanggalSelesai: data.tanggalSelesai,
                     AkreditasiPelatihan: data.akreditasiPelatihan,
                     TanggalAkreditasi: data.tanggalAkreditasi,
                     Pembicara: data.pembicara,
                     Moderator: data.moderator,
                     Panitia: data.panitia,
                     Peserta: data.peserta,
                     JPL: data.jpl,
                     BiayaPelatihan: data.biayaPelatihan



                 });
             },



             saveDaftarPaketSeminar: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {

                     NamaSeminar: data.namaSeminar,
                     Penyelenggara: data.penyelenggara,
                     Tempat: data.tempat,
                     TanggalPelaksanaan: data.tanggalPelaksanaan,
                     Waktu: data.waktu,
                     Pembicara: data.pembicara,
                     Moderator: data.moderator,
                     Panitia: data.panitia,
                     Peserta: data.peserta,
                     BiayaSeminar: data.biayaSeminar


                 });
             },


             saveRegistrasiKeanggotaan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-registrasi-keanggotaan"
                 }, {
                     nomorAnggota: data.nomorAnggota,
                     tipeKeanggotaan: data.tipeKeanggotaan,
                     tanggal: data.tanggal,
                     nama: data.nama,
                     nomorHP: data.nomorHP,
                     jenisKelamin: data.jenisKelamin,
                     tempatLahir: data.tempatLahir,
                     tanggalLahir: data.tanggalLahir,
                     asalInstansi: data.asalInstansi,
                     nomorHP: data.nomorHP,
                     email: data.email,
                     alamat: data.alamat




                 });
             },
             saveTimPegawai: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorHonor: data.nomorHonor,
                     tanggalProses: data.tanggalProses,
                     jenisHonor: data.jenisHonor,
                     keterangan: data.keterangan




                 });
             },
             saveEvaluasiJabatan: function(items) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-evaluasi-jabatan"
                 }, items);
             },saveMasterEvaluasiJabatan: function(items) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-master-evaluasi-jabatan"
                 }, items);
             },
             updateUraian: function(id, bobot, target, isCustom, title, item, jabatanId, idPegawai, group, value, tanggal) {
                 if (isCustom === undefined)
                     return r.get({
                         url: baseUrlApiAction + "sdm/set-uraian-tugas/" + id + "/" + bobot + "/" + target
                     });
                 var model = {
                     "uraianTugas": {
                         "id": id,
                         "bobot": bobot,
                         "targer": target,
                         "judul": title,
                         "pegawai": {
                             id: idPegawai
                         },
                         "kelompok": group
                     },

                 };
                 if (tanggal !== undefined) {
                     model.value = value;
                     model.tanggal = tanggal;
                 }
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-custom-uraian-kerja/"
                 }, model);

             },
             saveBuku: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-bibliography"
                 }, {
                     nomor: data.nomor,
                     judulBuku: data.judulBuku,
                     kodeEksemplar: data.kodeEksemplar,
                     namaPengarang: data.namaPengarang,
                     tipeKoleksi: data.tipeKoleksi,
                     edisi: data.edisi,
                     issn: data.issn,
                     tahunTerbit: data.tahunTerbit,
                     jumlahHalaman: data.jumlahHalaman




                 });
             },




             saveAturanPeminjaman: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-aturan-peminjaman"
                 }, {
                     tipeKeanggotaan: data.tipeKeanggotaan,
                     tipeKoleksi: data.tipeKoleksi,
                     jumlahPinjaman: data.jumlahPinjaman,
                     periodePinjaman: data.periodePinjaman,
                     dendaHarian: data.dendaHarian





                 });
             },



             savePengembalian: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorAnggota: data.nomorAnggota,
                     tipeKeanggotaan: data.tipeKeanggotaan,
                     nama: data.nama,
                     ISSN: data.ISSN,
                     kodeEksemplar: data.kodeEksemplar,
                     tanggalPinjam: data.tanggalPinjam,
                     tanggalPengembalian: data.tanggalPengembalian,
                     jumlahPinjaman: data.jumlahPinjaman,
                     jumlahPengembalian: data.jumlahPengembalian,
                     dendaHarian: data.dendaHarian,
                     jumlahDenda: data.jumlahDenda






                 });
             },




             saveDaftarKeanggotaan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-daftar-keanggotaan"
                 }, {
                     nama: data.nama,
                     email: data.email,
                     kunci: data.kunci,
                     ulangiPassword: data.ulangiPassword





                 });
             },
















             saveLimbah: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "struk-pelayanan/simpan-limbah-b3-masuk/"
                 }, {
                     strukPelayanan: { jenisLimbahB3Masuk: data.jenisLimbahB3Masuk, tglstruk: data.tanggalAwal, kdruanganasal: data.kdruanganasal, kdruangan: { id: 318 }, satuanWaktuKesling: data.satuanWaktuKesling, qtyproduk: data.qty },
                     strukPelayananDetail: { tglpelayanan: data.tanggalAwal, petugasString: data.petugaspengiriman }
                     //strukPelayananDPetugas:[{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab},{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab}]
                     //mapParameterToLaporanUjiHasil:[{parameter:data.parameter,satuanStandar:data.satuanStandar,bakuMutu:data.bakuMutu,hasilUji:data.hasilUji}],	

                 });
             },


             saveKeluar: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "limbah-b3-keluar/save-limbah-b3-keluar/"
                 }, {
                     maksimalPenyimpanan: data.maksimalPenyimpanan,
                     jenisLimbahB3Masuk: data.jenisLimbah,
                     rekanan: data.rekanan,
                     tujuanPenyerahan: data.tujuanPenyerahan,
                     total: data.sampah.total,
                     periodeAwal: data.periodeAwal,
                     sisaLimbahB3: data.sisaLimbah,
                     periodeAhir: data.periodeAkhir,
                     jumlahLimbahB3Keluar: data.jumlah,
                     tanggal: data.tanggal

                     //strukPelayananDPetugas:[{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab},{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab}]
                     //mapParameterToLaporanUjiHasil:[{parameter:data.parameter,satuanStandar:data.satuanStandar,bakuMutu:data.bakuMutu,hasilUji:data.hasilUji}],	

                 });
             },


             saveReservasi: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "limbah-b3-keluar/save-limbah-b3-keluar/"
                 }, {



                     //strukPelayananDPetugas:[{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab},{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab}]
                     //mapParameterToLaporanUjiHasil:[{parameter:data.parameter,satuanStandar:data.satuanStandar,bakuMutu:data.bakuMutu,hasilUji:data.hasilUji}],	

                 });
             },



             saveKeluhanPelanggan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "keluhan-pelanggan/save-keluhan-pelanggan/"
                 }, {
                     namaPasien: data.namaPasien,
                     umur: data.umur,
                     email: data.email,
                     keluhan: data.keluhan,
                     noRm: data.noRm,
                     noTlp: data.noTlp,
                     alamat: data.alamat,
                     saran: data.saran,
                     ruangan: data.ruangan,
                     pekerjaan: data.pekerjaan


                 });
             },


             saveDataPerusahaanBekerjasama: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "data-peserta-perusahaan-yang-bekerja-sama/save-data-peserta-perusahaan-yang-bekerja-sama/"
                 }, {
                     dataPerusahaanYangBekerjaSama: { noRec: data.noRec.noRec },
                     jenisKelamin: data.jenisKelamin,
                     namaPeserta: data.namaPeserta,
                     jumlahKeluarga: data.jumlahKeluarga,
                     plafonYangDijamin: data.plafonYangDijamin,
                     alamat: data.alamat,
                     noTlp: data.noTlp



                 });
             },


             savePenangananKeluhanPelanggan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "penanganan-keluhan-pelanggan/save-penanganan-keluhan-pelanggan/"
                 }, {

                     email: data.orderPelanggan.email,
                     reply: data.saran,
                     namaPetugas: data.orderPelanggan.name



                 });
             },


















             saveMasterBahan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "jenis-bahan/save-jenis-bahan"
                 }, {
                     jenisBahan: data.jenisBahan


                 });
             },



             savePembatalan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pembatalan-pasien/save-pembatalan-pasien"
                 }, {

                     keteranganAlasan: data.keteranganAlasan,
                     tglRetur: data.tglRetur,
                     antrianPasienDiPeriksa: data.antrianPasienDiPeriksa
                 });
             },


             savePeralatan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "transfer-pasien-internal/save-peralatan-detail/"
                 }, {
                     transferPasienInternal: data.transferPasienInternal,
                     peralatanDetail: data.listPeralatan,


                 });
             },

             saveMuskuloskeletal: function(pasien, tanggal, data) {

                 return r.post({
                     url: baseUrlApiAction + "muskuloskeletal/save-muskuloskeletal/"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     gerakanAnak: data.gerakanAnak,
                     kelainanTulang: data.kelainanTulang
                 });
             },

             saveDataPantau: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },


             saveDataUji: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },


             saveGenetalia: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "genatalia/save-genatalia/"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     status: data.status,
                     keterangan: data.keterangan
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
                     isNormal: data.isNormal
                 });
             },

             savePemakaianRuangRapat: function(data, daftarPenambahanKebutuhanSarana) {
                 return r.post({
                     url: baseUrlApiAction + "order-pemakaian-ruang-rapat/save-order-pemakaian-ruang-rapat"
                 }, {
                     noOrder: data.noOrder,
                     unitPemesan: data.unitPemesan,
                     temaRapat: data.temaRapat,
                     tglRapat: data.tglRapat,
                     cHari: data.cHari,
                     waktu: data.waktu,
                     lamaPenggunaan: data.lamaPenggunaan,
                     jumlahPeserta: data.jumlahPeserta,
                     namaRuanganRapat: data.namaRuanganRapat,
                     jenisKonsumsi: data.listJenisKonsumsi,
                     daftarPenambahanKebutuhanSarana: daftarPenambahanKebutuhanSarana
                 });
             },

             saveSasaranStrategis: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sasaran-strategis/find-all-sasaran-strategis"
                 }, {
                     sasaranStrategis: data.sasaranStrategis
                 });
             },

             saveProgram: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "program/save-program/"
                 }, {
                     program: data.namaProgram
                 });
             },
             saveMasterIndikatorKinerjaUtama: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "indikator-kinerja-utama/save-indikator-kinerja-utama/"
                 }, {
                     sasaranStrategis: data.sasaranStrategis,
                     indikatorKinerjaUtama: data.indikatorKinerjaUtama,
                     tahun: data.tahun,
                     bobot: data.bobot,
                     satuan: data.satuan,
                     targetIku: data.targetIku
                 });
             },
             saveDataSarPras: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },


             saveDataNeracaLimbah: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },

            postData: function(urlPost,data) {
                 return r.post({
                     url: baseUrlApiAction + urlPost
                 },data);
             },
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             },

             getListData: function(urlGet) {
                 return r.get({
                     url: baseUrlListData + urlGet
                 });
             },

             getIndikatorList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             },

             getProgramList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             },
            getItem : function(urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            saveData: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            }
         }
     }]);

     LogInfoService.service('FindSdm', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getPir: function(tahun) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-save-simulasi-pendapatan/" + tahun
                 });
             },
             getEvaluasiPegawai: function(tahun, idPegawai) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-evaluasi-pegawai/?tahun=" + tahun + "&idPegawai=" + idPegawai + "&bulan=0"
                 });
             },
             getBerkasPelamar: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-berkas-lamaran/" + noRec
                 });
             },
             getRekapEvaluasi: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-rekap/?tahun=" + noRec
                 });
             },
             getSimulasi: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-save-simulasi-pendapatan/" + noRec
                 });
             },
             findJadwalOrientasi: function(nama) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-save-jadwal-orientasi/" + nama
                 });
             },
             getPerhitunganAbk: function(tahun) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-perhitungan-abk?tahun=" + tahun
                 });
             },
             getDataPelamar: function() {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-isian-pelamar/"
                 });
             },
             getShiftKerja: function() {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-shift-kerja"
                 });
             },
             getSurvei: function(group) {

                 return r.get({
                     url: baseUrlApiAction + "survei/get-survei/?group=" + group
                 });
             },
             getRekapSurvei: function(group, groupId) {

                 return r.get({
                     url: baseUrlApiAction + "survei/get-rekap-survei/?group=" + group + "&groupId=" + groupId
                 });
             },
             getRekapSurvei: function(start, until, groupBy) {
                 return r.get({
                     url: baseUrlApiAction + "survei/get-rekap-survei/?group=" + groupBy
                 });
             },
             getRekapAll: function(start, until, groupBy) {
                 return r.get({
                     url: baseUrlApiAction + "survei/get-rekap-survei-kuisioner"
                 });
             }
         }
     }]);
	 
	 
	 LogInfoService.service('PengajuanUsulanAnggaranService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getPengendaliList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getKegiatanList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getKegiatanDetailList: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getOutput: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getKomponen: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getAkun: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getJenisBelanja: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getJenisPengadaan: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getRuanganUnitKerja: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getSumberDana: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getUnit: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getTujuanPengiriman: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getNamaProduk: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getGetData: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                })
            },

            getKomponen: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                })
            },

            savePengajuan: function (data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
            },

            getDataSpek: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "sppb/detail-kontrak?noRec=" + noRec
                });
            },

            getDetilSppb: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "sppb/detail-sppb?noRec=" + noRec
                });
            },

            getDetilPphp: function (noRec) {
                return r.get({
                    url: baseUrlApiAction + "pphp/detail-sppb?noRec=" + noRec
                });
            },
        };
    }]); 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	
     LogInfoService.service('DataKeluarga', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('HonorTimService', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveHonorTim: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
             findAllHonorTim: function(urlGet) {
                 return r.get({
                     url: baseUrlAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('JenisSantunanService', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveJenisSantunan: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
             findAllJenisSantunan: function(urlGet) {
                 return r.get({
                     url: baseUrlAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('JenisPns', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);



     LogInfoService.service('InstitusiPendidikan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('RekamDataPegawai', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('StatusPerkawinan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('TipeKeanggotaan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('JenisCuti', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('PosisiLamaran', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('JenisSk', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);



     LogInfoService.service('HubunganKeluarga', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);
	 
	  LogInfoService.service('TampilDataPelayanan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);



     LogInfoService.service('Tanggungan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

    LogInfoService.service('JadwalRencanaPemeriksaanService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getListSatuanKerja: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            getListPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);
	
	

     LogInfoService.service('TipeKoleksi', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('PeriodePengajar', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('ProgramPengajaran', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('ProgramPendidikan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('RiwayatService', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);




     LogInfoService.service('SantunanMeninggal', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('NamaAsuransi', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('StatusPegawai', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);



     LogInfoService.service('JenisHonor', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);



     LogInfoService.service('TampilDataBuku', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('RiwayatService', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             findPegawai: function(urlGet, data) {
                 return r.get({
                     url: baseUrlAction + urlGet + data
                 });
             },
             findPegawaiId: function(urlGet) {
                 return r.get({
                     url: baseUrlAction + urlGet
                 });
             },
             getRiwayatPenyakit: function(urlGet) {
                 return r.get({
                     url: baseUrlAction + urlGet
                 });
             }
         };
     }]);



     LogInfoService.service('PeriodePinjaman', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);




     LogInfoService.service('JenisKelamin', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);
     LogInfoService.service('Pendidikan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

 }); define(['Configuration'], function(config) {

     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseApiPostData;
     var baseApiPostData = config.baseApiPostData;
	  var baseUrlListData = config.baseUrlListData;
     var e = config.baseUrlListData;
     var LogInfoService = angular.module('LogInfoService', ['ngResource', 'HttpServices', 'Services']);
     LogInfoService.service('ManageLogInfo', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveAbsensi: function(e) {
                 var arr = [];
                 for (var key in e) {
                     if (e.hasOwnProperty(key)) {
                         var element = e[key];
                         arr.push({
                             pegawai: element.pegawai,
                             jamMasuk: element.tglMasuk,
                             jamKeluar: element.tglKeluar
                         });
                     }
                 }
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-absen"
                 }, { data: arr });
             },
             savePir: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-simulasi-pendapatan"
                 }, item);
             },
             uploadFile: function(e) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/upload-absen"
                 }, { fileInput: e });
             },
             saveBerkasLamaran: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-berkas-lamaran"
                 }, item);
             },
             saveJadwalOrientasi: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-jadwal-orientasi"
                 }, item);
             },
             findPegawai: function() {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-all-pegawai"
                 });
             },
             findPegawaiNoPaging: function() {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-all-pegawai-no-paging/"
                 });
             },
             findPegawaiById: function(idPegawai) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/find-pegawai-by-id-custom/"+idPegawai
                 });
             },
             findPegawaiByNik: function(nikPegawai) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai-by-nik/"+nikPegawai
                 });
             },
             findPegawaiByInternalAndJabatan: function() {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai/"
                 });
             },
             hitungEvaluasiJabatan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/hitung-master-evaluasi-jabatan/"
                 },data);
             },
             findDatafaktorEvaluasiJabatan: function(idPegawai,bulan,tahun) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-list-by-jabatan/"+idPegawai+"/"+bulan+"/"+tahun
                 });
             },
             saveSurvei: function(items) {
                 for (var key in items) {
                     if (items.hasOwnProperty(key)) {
                         var element = items[key];
                         element.pegawai = modelItem.getPegawai();
                         element.tglInput = new Date();
                     }
                 }

                 return r.post({
                     url: baseUrlApiAction + "survei/"
                 }, modelItem.beforePost(items));
             },
             savePerhitunganSdk: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-perhitungan-abk"
                 }, modelItem.beforePost(item));
             },
             saveShiftKerja: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-shift-kerja"
                 }, modelItem.beforePost(item));
             },

             saveRekamDataPegawai: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-rekam-data-pegawai"
                 }, data);
             },

             saveDataKeluarga: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-data-keluarga"
                 }, {
                     nip: data.nip,
                     namaPegawai: data.namaPegawai,
                     nama: data.nama,
                     hubunganKeluarga: data.hubunganKeluarga1 + data.hubunganKeluarga2.id,
                     tanggalLahir: data.tanggalLahir,
                     pekerjaan: data.pekerjaan,
                     statusKawin: data.statusKawin,
                     tertanggung: data.tertanggung1 + data.tertanggung2,
                     nomorSurat: data.nomorSurat,
                     tanggalSurat: data.tanggalSurat,
                     ayah: data.ayah,
                     ibu: data.ibu,
                     nipStatus: data.nipStatus,
                     alamat: data.alamat,
                     keterangan: data.keterangan

                 });
             },
            saveKeluargaPegawai: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "keluarga-pegawai/save-keluarga-pegawai"
                 }, data);
             },

             saveDataPermohonanCutiPegawai: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/save-permohonan-cuti-pegawai"
                 }, {
                     nomorPermohonan: data.nomorPermohonan,
                     nip: data.nip,
                     namaPegawai: data.namaPegawai,
                     unitKerja: data.unitKerja,
                     polaJadwal: data.polaJadwal,
                     jenisCuti: data.jenisCuti,
                     tahun: data.tahun,
                     jatahCuti: data.jatahCuti,
                     tanggalAwalCuti: data.tanggalAwalCuti,
                     tanggalAkhirCuti: data.tanggalAkhirCuti,
                     jumlahHari: data.jumlahHari,
                     sisaCuti: data.sisaCuti,
                     keterangan: data.keterangan
                 });
             },

             saveMutasiPegawai: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "keteranganSurvey/save-keterangan/"
                 }, {
                     nomorAgenda: data.nomorAgenda,
                     jenisSK: data.jenisSK1 + data.jenisSK2.id,

                     tanggalSK: data.tanggalSK,
                     nomor: data.nomor,
                     uraian: data.uraian,
                     skDari: data.skDari,
                     statusPegawai: data.statusPegawai,
                     kedudukan: data.kedudukan,
                     tanggalMeninggal: data.tanggalMeninggal,
                     kodeGapok: data.kodeGapok1 + data.kodeGapok2 + data.kodeGapok3 + data.kodeGapok4,
                     kodeGol: data.kodeGol1 + data.kodeGol2,
                     kodeJabatan: data.kodeJabatan1 + data.kodeJabatan2 + data.kodeJabatan3,
                     pensiun: data.pensiun,
                     tunjanganFungsional: data.tunjanganFungsional1 + data.tunjanganFungsional2 + data.tunjanganFungsional3,
                     tunjanganUmum: data.tunjanganUmum1 + data.tunjanganUmum2 + data.tunjanganUmum3,
                     tunjanganPapua: data.tunjanganPapua1 + data.tunjanganPapua2 + data.tunjanganPapua3,
                     wilayahTerperinci: data.wilayahTerperinci1 + data.wilayahTerperinci2 + data.wilayahTerperinci3,
                     statusKawin: data.statusKawin1 + data.statusKawin2.id,
                     beras: data.beras1 + data.beras2 + data.beras3 + data.beras4,
                     jumlah: data.jumlah,
                     grade: data.grade,
                     tanggalTMT: data.tanggalTMT,
                     tanggalRekam: data.tanggalRekam,
                     defauld: data.defauld
                 });
             },

             saveDataPegawai2: function(data) {
                 return r.post({
                         url: baseUrlApiAction + "mapping-pertanyaan/save-all-mapping-pertanyaan/"
                     }, data
                 );
             },

             saveIsianPelamar: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
			 saveFileGaji: function(data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave
                }, data);
             },			 
			 saveDataUji: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
             saveUjiData: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
             saveImportGaji: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
             getDaftarDetailPNS: function(idPNS, noRec) {
                return r.get({
                    url: baseUrlApiAction + "sdm/get-detail-gaji-pns?noRec=" + noRec + "&id=" +idPNS
                });
             },
			 
             saveAsuransiNaker: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },

             saveHonorTim: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },


             saveReservasiOk: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
             saveFile :function(data, urlSave) {
                return r.post({
                    url: baseApiPostData + urlSave,
                    headers: {'Content-Type': 'multi-part/form-data'}
                }, {
                    filename: data.filename
                });
             },
             saveJenisSantunan: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },

             saveDataPegawai: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nip: data.nip,
                     namaPegawai: data.namaPegawai,
                     statusPegawai: data.statusPegawai,
                     tempatLahir: data.tempatLahir,
                     tanggalLahir: data.lahir,
                     golongan: data.golongan,
                     statusKawin: data.statusKawin,
                     jabatan: data.jabatan,
                     tunjanganJabatan: data.tunjanganJabatan,
                     gajiPokok: data.gajiPokok
                 });
             },

             saveUangLembur: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorUangLembur: data.nomorUang,
                     tanggalProses: data.tanggalProses,
                     keterangan: data.keterangan

                 });
             },

             savePremiKesehatan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-perhitungan-premi-b-p-j-s-kesehatan"
                 }, {
                     nomorGaji: data.nomorGaji,
                     satuanKerja: data.satuanKerja,
                     tanggalProses: data.tanggalProses,
                     jenisGaji: data.jenisGaji,
                     tahunUMR: data.tahunUMR,
                     jumlahUMR: data.jumlahUMR,
                     namaAsuransi: data.namaAsuransi,
                     keterangan: data.keterangan
                 });
             },
             savePremiKetenagakerjaan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorGaji: data.nomorGaji,
                     satuanKerja: data.satuanKerja,
                     tanggalProses: data.tanggalProses,
                     jenisGaji: data.jenisGaji,
                     tahunUMR: data.tahunUMR,
                     jumlahUMR: data.jumlahUMR,
                     namaAsuransi: data.namaAsuransi,
                     keterangan: data.keterangan
                 });
             },

             saveDataSantunan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorSantunan: data.nomorSantunan,
                     tanggalProses: data.tanggalProses,
                     statusMeninggal: data.statusMeninggal,
                     nama: data.nama,
                     jumlahOrang: data.jumlahOrang,
                     jenisSantunan: data.jenisSantunan,
                     jumlahSantunan: data.jumlahSantunan,
                     jumlahBunga: data.jumlahBunga,
                     total: data.total
                 });
             },

             savePesertaDidik: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nim: data.nim,
                     nama: data.nama,
                     jenisKelamin: data.jenisKelamin,
                     agama: data.agama,
                     nomorHP: data.nomorHP,
                     tempatLahir: data.tempatLahir,
                     tanggalLahir: data.tanggalLahir,
                     alamat: data.alamat,
                     periodePengajar: data.periodePengajar,
                     institusiPendidikan: data.institusiPendidikan,
                     jurursanPeminatan: data.jurusanPeminatan,
                     fakultas: data.fakultas
                 });
             },


             saveDaftarPaketPelatihan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     JenisPelatihan: data.jenisPelatihan,
                     NamaPelatihan: data.namaPelatihan,
                     Penyelenggara: data.penyelenggara,
                     Tempat: data.tempat,
                     TanggalMulai: data.tanggalMulai,
                     TanggalSelesai: data.tanggalSelesai,
                     AkreditasiPelatihan: data.akreditasiPelatihan,
                     TanggalAkreditasi: data.tanggalAkreditasi,
                     Pembicara: data.pembicara,
                     Moderator: data.moderator,
                     Panitia: data.panitia,
                     Peserta: data.peserta,
                     JPL: data.jpl,
                     BiayaPelatihan: data.biayaPelatihan
                 });
             },

             saveDaftarPaketSeminar: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {

                     NamaSeminar: data.namaSeminar,
                     Penyelenggara: data.penyelenggara,
                     Tempat: data.tempat,
                     TanggalPelaksanaan: data.tanggalPelaksanaan,
                     Waktu: data.waktu,
                     Pembicara: data.pembicara,
                     Moderator: data.moderator,
                     Panitia: data.panitia,
                     Peserta: data.peserta,
                     BiayaSeminar: data.biayaSeminar
                 });
             },

             saveRegistrasiKeanggotaan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-registrasi-keanggotaan"
                 }, {
                     nomorAnggota: data.nomorAnggota,
                     tipeKeanggotaan: data.tipeKeanggotaan,
                     tanggal: data.tanggal,
                     nama: data.nama,
                     nomorHP: data.nomorHP,
                     jenisKelamin: data.jenisKelamin,
                     tempatLahir: data.tempatLahir,
                     tanggalLahir: data.tanggalLahir,
                     asalInstansi: data.asalInstansi,
                     nomorHP: data.nomorHP,
                     email: data.email,
                     alamat: data.alamat
                 });
             },

             saveTimPegawai: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorHonor: data.nomorHonor,
                     tanggalProses: data.tanggalProses,
                     jenisHonor: data.jenisHonor,
                     keterangan: data.keterangan
                 });
             },

             saveMasterEvaluasiJabatan: function(items) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-master-evaluasi-jabatan"
                 }, items);
             },

             updateUraian: function(id, bobot, target, isCustom, title, item, jabatanId, idPegawai, group, value, tanggal) {
                 if (isCustom === undefined)
                     return r.get({
                         url: baseUrlApiAction + "sdm/set-uraian-tugas/" + id + "/" + bobot + "/" + target
                     });
                 var model = {
                     "uraianTugas": {
                         "id": id,
                         "bobot": bobot,
                         "targer": target,
                         "judul": title,
                         "pegawai": {
                             id: idPegawai
                         },
                         "kelompok": group
                     },

                 };
                 if (tanggal !== undefined) {
                     model.value = value;
                     model.tanggal = tanggal;
                 }
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-custom-uraian-kerja/"
                 }, model);

             },

             saveBuku: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-bibliography"
                 }, {
                     nomor: data.nomor,
                     judulBuku: data.judulBuku,
                     kodeEksemplar: data.kodeEksemplar,
                     namaPengarang: data.namaPengarang,
                     tipeKoleksi: data.tipeKoleksi,
                     edisi: data.edisi,
                     issn: data.issn,
                     tahunTerbit: data.tahunTerbit,
                     jumlahHalaman: data.jumlahHalaman
                 });
             },

             saveAturanPeminjaman: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-aturan-peminjaman"
                 }, {
                     tipeKeanggotaan: data.tipeKeanggotaan,
                     tipeKoleksi: data.tipeKoleksi,
                     jumlahPinjaman: data.jumlahPinjaman,
                     periodePinjaman: data.periodePinjaman,
                     dendaHarian: data.dendaHarian
                 });
             },

             savePengembalian: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "satuan-standar/save-satuan-standar/"
                 }, {
                     nomorAnggota: data.nomorAnggota,
                     tipeKeanggotaan: data.tipeKeanggotaan,
                     nama: data.nama,
                     ISSN: data.ISSN,
                     kodeEksemplar: data.kodeEksemplar,
                     tanggalPinjam: data.tanggalPinjam,
                     tanggalPengembalian: data.tanggalPengembalian,
                     jumlahPinjaman: data.jumlahPinjaman,
                     jumlahPengembalian: data.jumlahPengembalian,
                     dendaHarian: data.dendaHarian,
                     jumlahDenda: data.jumlahDenda
                 });
             },

             saveDaftarKeanggotaan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-daftar-keanggotaan"
                 }, {
                     nama: data.nama,
                     email: data.email,
                     kunci: data.kunci,
                     ulangiPassword: data.ulangiPassword
                 });
             },

             saveLimbah: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "struk-pelayanan/simpan-limbah-b3-masuk/"
                 }, {
                     strukPelayanan: { jenisLimbahB3Masuk: data.jenisLimbahB3Masuk, tglstruk: data.tanggalAwal, kdruanganasal: data.kdruanganasal, kdruangan: { id: 318 }, satuanWaktuKesling: data.satuanWaktuKesling, qtyproduk: data.qty },
                     strukPelayananDetail: { tglpelayanan: data.tanggalAwal, petugasString: data.petugaspengiriman }
                     //strukPelayananDPetugas:[{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab},{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab}]
                     //mapParameterToLaporanUjiHasil:[{parameter:data.parameter,satuanStandar:data.satuanStandar,bakuMutu:data.bakuMutu,hasilUji:data.hasilUji}],	

                 });
             },

             saveKeluar: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "limbah-b3-keluar/save-limbah-b3-keluar/"
                 }, {
                     maksimalPenyimpanan: data.maksimalPenyimpanan,
                     jenisLimbahB3Masuk: data.jenisLimbah,
                     rekanan: data.rekanan,
                     tujuanPenyerahan: data.tujuanPenyerahan,
                     total: data.sampah.total,
                     periodeAwal: data.periodeAwal,
                     sisaLimbahB3: data.sisaLimbah,
                     periodeAhir: data.periodeAkhir,
                     jumlahLimbahB3Keluar: data.jumlah,
                     tanggal: data.tanggal
                     //strukPelayananDPetugas:[{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab},{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab}]
                     //mapParameterToLaporanUjiHasil:[{parameter:data.parameter,satuanStandar:data.satuanStandar,bakuMutu:data.bakuMutu,hasilUji:data.hasilUji}],	
                 });
             },

             saveReservasi: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "limbah-b3-keluar/save-limbah-b3-keluar/"
                 }, {
                     //strukPelayananDPetugas:[{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab},{kdpegawai:data.kdpegawai,deskripsitugasfungsi:data.deskripsitugasfungsi,ispetugaspepjawab:data.ispetugaspepjawab}]
                     //mapParameterToLaporanUjiHasil:[{parameter:data.parameter,satuanStandar:data.satuanStandar,bakuMutu:data.bakuMutu,hasilUji:data.hasilUji}],	
                 });
             },

             saveKeluhanPelanggan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "keluhan-pelanggan/save-keluhan-pelanggan/"
                 }, {
                     namaPasien: data.namaPasien,
                     umur: data.umur,
                     email: data.email,
                     keluhan: data.keluhan,
                     noRm: data.noRm,
                     noTlp: data.noTlp,
                     alamat: data.alamat,
                     saran: data.saran,
                     ruangan: data.ruangan,
                     pekerjaan: data.pekerjaan
                 });
             },

             saveDataPerusahaanBekerjasama: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "data-peserta-perusahaan-yang-bekerja-sama/save-data-peserta-perusahaan-yang-bekerja-sama/"
                 }, {
                     dataPerusahaanYangBekerjaSama: { noRec: data.noRec.noRec },
                     jenisKelamin: data.jenisKelamin,
                     namaPeserta: data.namaPeserta,
                     jumlahKeluarga: data.jumlahKeluarga,
                     plafonYangDijamin: data.plafonYangDijamin,
                     alamat: data.alamat,
                     noTlp: data.noTlp
                 });
             },

             savePenangananKeluhanPelanggan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "penanganan-keluhan-pelanggan/save-penanganan-keluhan-pelanggan/"
                 }, {
                     email: data.orderPelanggan.email,
                     reply: data.saran,
                     namaPetugas: data.orderPelanggan.name
                 });
             },

             saveMasterBahan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "jenis-bahan/save-jenis-bahan"
                 }, {
                     jenisBahan: data.jenisBahan
                 });
             },

             savePembatalan: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pembatalan-pasien/save-pembatalan-pasien"
                 }, {

                     keteranganAlasan: data.keteranganAlasan,
                     tglRetur: data.tglRetur,
                     antrianPasienDiPeriksa: data.antrianPasienDiPeriksa
                 });
             },

             savePeralatan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "transfer-pasien-internal/save-peralatan-detail/"
                 }, {
                     transferPasienInternal: data.transferPasienInternal,
                     peralatanDetail: data.listPeralatan,
                 });
             },

             saveMuskuloskeletal: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "muskuloskeletal/save-muskuloskeletal/"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     gerakanAnak: data.gerakanAnak,
                     kelainanTulang: data.kelainanTulang
                 });
             },

             saveDataPantau: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },

             saveDataUji: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },

             saveGenetalia: function(pasien, tanggal, data) {
                 return r.post({
                     url: baseUrlApiAction + "genatalia/save-genatalia/"
                 }, {
                     pasien: pasien,
                     tglInput: tanggal,
                     status: data.status,
                     keterangan: data.keterangan
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
                     isNormal: data.isNormal
                 });
             },

             savePemakaianRuangRapat: function(data, daftarPenambahanKebutuhanSarana) {
                 return r.post({
                     url: baseUrlApiAction + "order-pemakaian-ruang-rapat/save-order-pemakaian-ruang-rapat"
                 }, {
                     noOrder: data.noOrder,
                     unitPemesan: data.unitPemesan,
                     temaRapat: data.temaRapat,
                     tglRapat: data.tglRapat,
                     cHari: data.cHari,
                     waktu: data.waktu,
                     lamaPenggunaan: data.lamaPenggunaan,
                     jumlahPeserta: data.jumlahPeserta,
                     namaRuanganRapat: data.namaRuanganRapat,
                     jenisKonsumsi: data.listJenisKonsumsi,
                     daftarPenambahanKebutuhanSarana: daftarPenambahanKebutuhanSarana
                 });
             },

             saveSasaranStrategis: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sasaran-strategis/find-all-sasaran-strategis"
                 }, {
                     sasaranStrategis: data.sasaranStrategis
                 });
             },

             saveProgram: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "program/save-program/"
                 }, {
                     program: data.namaProgram
                 });
             },

             saveMasterIndikatorKinerjaUtama: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "indikator-kinerja-utama/save-indikator-kinerja-utama/"
                 }, {
                     sasaranStrategis: data.sasaranStrategis,
                     indikatorKinerjaUtama: data.indikatorKinerjaUtama,
                     tahun: data.tahun,
                     bobot: data.bobot,
                     satuan: data.satuan,
                     targetIku: data.targetIku
                 });
             },

             saveDataSarPras: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },

             saveDataNeracaLimbah: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },

             saveDataPenilaianKompetensiPegawai: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + "sdm/save-penilaian-kompetensi-pegawai/"
                 }, data);
             },

             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             },
             getDaftarDetailPNS: function(idPNS, noRec) {
                return r.get({
                    url: baseUrlApiAction + "sdm/get-detail-gaji-pns?noRec=" + noRec + "&id=" +idPNS
                });
             },

             getListData: function(urlGet) {
                 return r.get({
                     url: baseUrlListData + urlGet
                 });
             },
             getIndikatorList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             },

             getProgramList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         }
     }]);

     LogInfoService.service('FindSdm', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getPir: function(tahun) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-save-simulasi-pendapatan/" + tahun
                 });
             },
             getEvaluasiPegawai: function(tahun, idPegawai) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-evaluasi-pegawai/?tahun=" + tahun + "&idPegawai=" + idPegawai + "&bulan=0"
                 });
             },
             getBerkasPelamar: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-berkas-lamaran/" + noRec
                 });
             },
             getRekapEvaluasi: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-rekap/?tahun=" + noRec
                 });
             },
             getSimulasi: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-save-simulasi-pendapatan/" + noRec
                 });
             },
             findJadwalOrientasi: function(nama) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-save-jadwal-orientasi/" + nama
                 });
             },
             getPerhitunganAbk: function(tahun) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-perhitungan-abk?tahun=" + tahun
                 });
             },
             getDataPelamar: function() {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-isian-pelamar/"
                 });
             },
             getShiftKerja: function() {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-shift-kerja"
                 });
             },
             getSurvei: function(group) {

                 return r.get({
                     url: baseUrlApiAction + "survei/get-survei/?group=" + group
                 });
             },
             getRekapSurvei: function(group, groupId) {

                 return r.get({
                     url: baseUrlApiAction + "survei/get-rekap-survei/?group=" + group + "&groupId=" + groupId
                 });
             },
             getRekapSurvei: function(start, until, groupBy) {
                 return r.get({
                     url: baseUrlApiAction + "survei/get-rekap-survei/?group=" + groupBy
                 });
             },
             getRekapAll: function(start, until, groupBy) {
                 return r.get({
                     url: baseUrlApiAction + "survei/get-rekap-survei-kuisioner"
                 });
             }
         }
     }]);

     LogInfoService.service('DataKeluarga', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);


     LogInfoService.service('HonorTimService', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveHonorTim: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
             findAllHonorTim: function(urlGet) {
                 return r.get({
                     url: baseUrlAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('JenisSantunanService', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveJenisSantunan: function(data, urlSave) {
                 return r.post({
                     url: baseApiPostData + urlSave
                 }, data);
             },
             findAllJenisSantunan: function(urlGet) {
                 return r.get({
                     url: baseUrlAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('JenisPns', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('InstitusiPendidikan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('RekamDataPegawai', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('StatusPerkawinan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('TipeKeanggotaan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('JenisCuti', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('PosisiLamaran', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('JenisSk', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('HubunganKeluarga', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);
	 
	  LogInfoService.service('TampilDataPelayanan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('Tanggungan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

    LogInfoService.service('JadwalRencanaPemeriksaanService', ['ModelItem', 'R', 'DateHelper', function (modelItem, r, dateHelper) {
        return {
            getListSatuanKerja: function (urlGet) {
                return r.get({
                    url: baseUrlListData + urlGet
                });
            },
            getListPegawai: function (urlGet) {
                return r.get({
                    url: baseUrlAction + urlGet
                });
            }
        };
    }]);
	
     LogInfoService.service('TipeKoleksi', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('PeriodePengajar', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('ProgramPengajaran', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('ProgramPendidikan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('RiwayatService', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('SantunanMeninggal', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('NamaAsuransi', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('StatusPegawai', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('JenisHonor', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('TampilDataBuku', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('RiwayatService', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             findPegawai: function(urlGet, data) {
                 return r.get({
                     url: baseUrlAction + urlGet + data
                 });
             },
             findPegawaiId: function(urlGet) {
                 return r.get({
                     url: baseUrlAction + urlGet
                 });
             },
             getRiwayatPenyakit: function(urlGet) {
                 return r.get({
                     url: baseUrlAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('PeriodePinjaman', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('JenisKelamin', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);

     LogInfoService.service('Pendidikan', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getOrderList: function(urlGet) {
                 return r.get({
                     url: baseUrlApiAction + urlGet
                 });
             }
         };
     }]);
     
 });