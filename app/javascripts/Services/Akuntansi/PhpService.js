 define(['Configuration'], function (config) {

   var baseUrlApiAction = config.baseApiPostData_Akuntansi;
   var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
   var baseMaster = config.urlDataTableMaster_Akuntansi;
   var urlPrinting = config.urlPrinting;
   var urlDataGeneric = config.urlDataGeneric_Akuntansi;
   var urlDataMasterJava = config.urlDataMaster;
   var baseURLBridgingRSOnline = config.baseURLBridgingRSOnline;
   var akuntansiService = angular.module('PhpService', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   akuntansiService.service('ManageSarprasPhp', ['R_Akuntansi', function (r) {
     return {

       getDataMaster: function (url) {
         return r.get({
           url: urlDataMasterJava + url
         });
       },

       getDataTableMaster: function (urlGet) {
         return r.get({
           url: baseMaster + urlGet
         });
       },

       getDataTableTransaksi: function (urlGet) {
         return r.get({
           url: baseTransaksi + urlGet
         });
       },

       saveDataTransaksi: function (urlPost, data) {
         return r.post({
           url: baseTransaksi + urlPost
         }, data)
       },


       hapusDataTransaksi: function (urlPost) {
         return r.post({
           url: baseTransaksi + urlPost
         })
       },

       saveDataRekanan: function (data, urlSave) {
         return r.post({
           url: baseTransaksi + urlSave
         }, data);
       },
       postDataRuangan: function (data) {
         return r.post({
           url: baseTransaksi + "ruangan/simpan-data-ruangan"
         }, data)
       },

       postDataRekanan: function (data) {
         return r.post({
           url: baseTransaksi + "rekanan/save-rekanan"
         }, data)
       },

       postDataDiagnosa: function (data) {
         return r.post({
           url: baseTransaksi + "pasien/save-diagnosa-pasien"
         }, data)
       },
       deleteDataDiagnosa: function (data) {
         return r.post({
           url: baseTransaksi + "pasien/delete-diagnosa-pasien"
         }, data)
       },

       postOrderLabel: function (data) {
         return r.post({
           url: baseTransaksi + "orderlabel/save-order-label"
         }, data)
       },

       postDataDiagnosaTIndakan: function (data) {
         return r.post({
           url: baseTransaksi + "pasien/save-diagnosa-tindakan-pasien"
         }, data)
       },

       deleteDataDiagnosaTindakan: function (data) {
         return r.post({
           url: baseTransaksi + "pasien/delete-diagnosa-tindakan-pasien"
         }, data)
       },

       simpanDataMapping: function (data) {
         return r.post({
           url: baseTransaksi + "mapping/simpan-mapproduktolaporan"
         }, data)
       },

       deleteDataMapping: function (data) {
         return r.post({
           url: baseTransaksi + "mapping/delete-mapproduktolaporan"
         }, data)
       },

       postDataMapping: function (data) {
         return r.post({
           url: baseTransaksi + "mapping/save-mapproduktolaporan"
         }, data)
       },

       saveMutasiPindahPasien: function (data) {
         return r.post({
           url: baseTransaksi + "mutasi/simpan-mutasi-pindah"
         }, data)
       },

       savePenjaminUmum: function (data) {
         return r.post({
           url: baseTransaksi + "penjamin/simpan-penjamin-umum"
         }, data)
       },
       savePenjaminNonUmum: function (data) {
         return r.post({
           url: baseTransaksi + "penjamin/simpan-penjamin-nonumum"
         }, data)
       },
       pasienBatalPanggil: function (data) {
         return r.post({
           url: baseTransaksi + "pasien/batal-panggil"
         }, data)
       },

       updateDokters: function (data) {
         return r.post({
           url: baseTransaksi + "pasien/update-dokter-antrian"
         }, data)
       },

       saveKendaliDokumenRm: function (data) {
         return r.post({
           url: baseTransaksi + "dokumenrm/save-kendali-dokumen"
         }, data)
       },

       postDiagnosa: function (data) {
         return r.post({
           url: baseTransaksi + "diagnosa/save-diagnosa"
         }, data)
       },

       postDiagnosaTindakan: function (data) {
         return r.post({
           url: baseTransaksi + "diagnosatindakan/save-diagnosa"
         }, data)
       },


       updateFalseDT: function (data) {
         return r.post({
           url: baseTransaksi + "diagnosatindakan/update-statusenabled"
         }, data)
       },

       updateStatusEnabledDiagnosa: function (data) {
         return r.post({
           url: baseTransaksi + "diagnosa/update-statusenabled"
         }, data)
       },

       postSaveDataFixed: function (data) {
         return r.post({
           url: baseTransaksi + "settingdatafixed/post-settingdatafixe"
         }, data)
       },

       postHapusDataFixed: function (data) {
         return r.post({
           url: baseTransaksi + "settingdatafixed/hapus-settingdatafixe"
         }, data)
       },

       postSaveDepartemenRev: function (data) {
         return r.post({
           url: baseTransaksi + "settingdatafixed/post-departemenrev"
         }, data)
       },

       postHapusMerkProduk: function (data) {
         return r.post({
           url: baseTransaksi + "merkproduk/hapus-merkproduk"
         }, data)
       },

       postSaveMerkProduk: function (data) {
         return r.post({
           url: baseTransaksi + "merkproduk/post-merkproduk"
         }, data)
       },

     }
   }]);

   akuntansiService.service('ManagePhp', ['R_Akuntansi', function (r) {
     return {

       getDataBridgingRSOnline: function (url) {
         return r.get({
           url: baseURLBridgingRSOnline + url
         })
       },

       saveDataBridgingRSOnline: function (url, data) {
         return r.post({
           url: baseURLBridgingRSOnline + url
         }, data)
       },

       deleteDataBridgingRSOnline: function (url, data) {
         return r.delete({
           url: baseURLBridgingRSOnline + url
         }, data)
       },

       getData: function (urlGet) {
         return r.get({
           url: baseTransaksi + urlGet
         });
       },

       saveData: function (data) {
         return r.post({
           url: baseTransaksi + "rekam-medis/save-data-rekam-medis"
         }, data)
       },


       saveDataEMR: function (data) {
         return r.post({
           url: baseTransaksi + "rekam-medis/save-emr-dinamis"
         }, data)
       },

       postData: function (data, urlPost) {
         return r.post({
           url: baseTransaksi + urlPost
         }, data)
       },

       getMaster: function (urlGet) {
         return r.get({
           url: baseMaster + urlGet
         })
       },

       postMaster: function (data, urlPost) {
         return r.post({
           url: baseMaster + urlPost
         }, data)
       },

       postData2: function (urlPost, data) {
         return r.post({
           url: baseTransaksi + urlPost
         }, data)
       },

       putData: function (urlPost, data) {
         return r.put({
           url: baseTransaksi + urlPost
         }, data)
       },

       postOrderLaboratRad: function (data) {
         return r.post({
           url: baseTransaksi + "lab-radiologi/save-order-layanan"
         }, data)
       },

       postLogging: function (jenislog, referensi, noreff, keterangan) {
         return r.get({
           url: baseTransaksi + "logging/save-log-all?jenislog=" + jenislog + "&referensi=" +
             referensi + '&noreff=' + noreff + '&keterangan=' + keterangan
         });
       },

       postOrderIP3RS: function (data) {
         return r.post({
           url: baseTransaksi + "ip3rs/simpan-permintaan-perbaikan"
         }, data)
       },

       postPerbaikanIP3RS: function (data) {
         return r.post({
           url: baseTransaksi + "ip3rs/simpan-respon-perbaikan"
         }, data)
       },

       postSukuCadang: function (data) {
         return r.post({
           url: baseTransaksi + "ip3rs/simpan-suku-cadang"
         }, data)
       },

       postJadwalMaintenace: function (data) {
         return r.post({
           url: baseTransaksi + "ip3rs/simpan-jadwal-maintenance"
         }, data)
       },

       hapusJadwalMaintenace: function (data) {
         return r.post({
           url: baseTransaksi + "ip3rs/hapus-jadwalmaintenance"
         }, data)
       },

       postEmrICU: function (data) {
         return r.post({
           url: baseTransaksi + "emr/save-data-emr-icu"
         }, data)
       },

     }

   }]);

 });