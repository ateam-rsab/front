     define(['Configuration'], function(config) {


         var baseUrlAction = config.baseUrlAction;
         var baseUrlApiAction = config.baseApiUrlData;
         var baseBridiging = config.baseBridiging;
         var pasienService = angular.module('RadiologiService', ['ngResource', 'HttpServices', 'Services']);
         pasienService.service('FindPasienRadiologi', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
             return {
                 getHistoryPatient: function(noRec) {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/get-histori-radiolgi/?noRec=" + noRec
                     });
                 },
                 findPasienDevice: function(nama) {
                     return r.get({
                         url: baseBridiging + "pacs/?key=" + nama
                     });
                 },
                 saveMapping: function(StudyInstanceUID, NoMr, noRecAntrian) {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/mapaping-pasien-radiologi/?id=" + StudyInstanceUID + "&noMr=" + NoMr + "&noRec=" + noRecAntrian
                     });
                 },
                 getImage: function(noCm, fileName) {
                     return baseBridiging + "pacs/GetImage/?noMr=" + noCm + "&fileName=" + fileName
                 },
                 getImagesByStudy: function(noCm, studyId) {
                     return r.get({
                         url: baseBridiging + "pacs/GetListImages/?noMr=" + noCm + "&studyId=" + studyId
                     });
                 },
                 getQueuePatien: function(tanggal, status) {
                     return r.get({
                         url: baseUrlApiAction + "Radiologi/RekapPasien/" + tanggal + "/" + status
                     });
                 },
                 getListPatient: function(status,tanggalAwal, tanggalAkhir, noCm, pegawai) {
                 if (noCm === undefined || noCm === '')
                     noCm = "-";
                 if (pegawai === undefined && status === true)
                    return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-penunjang-list/?ruanganId=35" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir
                     });
                 if (pegawai === undefined)
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-penunjang-list/?ruanganId=35" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir
                     });
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-penunjang-list/?ruanganId=" + pegawai.ruangan.id + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");

             },
                 getListPatients: function(tanggalAwal, tanggalAkhir, noCm, namaPasien, produkId) {
                    debugger;
                     if (noCm === undefined || noCm === '')
                         noCm = "-";
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list-radiologi-new/?ruanganId=35&limit=100" + "&dateStart=" + tanggalAwal +"&dateEnd="+ tanggalAkhir +  "&namaPasien=" + namaPasien + "&noCm=" + noCm + "&jenisProduk=" + produkId
                     });
                 },
                 getOrder: function(noOrder) {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/get-order-radiologi/?noOrder=" + noOrder
                     });
                 },
                 getOrderDetail: function(noOrder) {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/get-order-detail-laboratorium/?noOrder=" + noOrder
                     });
                 },
                 getRisReport: function(from, until) {
                     return r.get({
                         url: baseUrlApiAction + "radiologi-ris/get-data-report?startDate=" + from + "&endDate=" + until
                     });
                 }
             };
         }]);
         pasienService.service('ManageRadiologi', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
             return {
                 saveUploadGambar: function(noOrder, images) {
                     return r.post({
                         url: baseUrlApiAction + "registrasi-pelayanan/save-upload-image?noOrder=" + noOrder
                     }, { data: images });
                 },
                 saveHasilPeriksa: function(noOrder, data) {
                     return r.post({
                         url: baseUrlApiAction + "registrasi-pelayanan/save-hasil-laboratorium?noOrder=" + noOrder
                     }, data);
                 },
                 saveSpesimen: function(pasien, tanggal, data) {
                     return r.post({
                         url: baseUrlApiAction + "papPengambilanSpesimen/save-pengambilan-spesimen/"
                     }, {
                         pasien: pasien,
                         tanggal: tanggal,
                         pengambilanSpesimen: data
                     });
                 },
                 verifikasiPemeriksaan: function(noRec) {
                     return r.get({
                         url: baseUrlApiAction + "papPengambilanSpesimen/verifikasi-pemeriksaan/" + noRec
                     });
                 },
                 ambilHasil: function(noOrder, namaPengambilPasien, noTelepon, tanggal) {
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/ambil-hasil-laboratorium?tanggal=" + tanggal + "&namaPengambil=" + namaPengambilPasien + "&noTelepon=" + noTelepon + "&noOrder=" + noOrder
                     });
                 },
                 verifikasiOrderRadiologi: function(data) {
                     return r.post({
                         url: baseUrlApiAction + "radiologi-ris/save-order-radiologi"
                     }, data)
                 }, 
                 updateOrderRadiologi: function(noRec, noOrder, detilOrder) {
                     return r.post({
                         url: baseUrlApiAction + "radiologi-ris/update-order-radiologi"
                     }, {
                        noRec: noRec,
                        noOrder: noOrder,
                        orderPelayanan: detilOrder
                    })
                 }
             };
         }]);
     });