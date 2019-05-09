 define(['Configuration'], function(config) {


     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseApiUrlData;
     var pasienService = angular.module('ApotekService', ['ngResource', 'HttpServices', 'Services']);
     pasienService.service('FindPasienApotek', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getQueuePatien: function(tanggal, status) {
                 return r.get({
                     url: baseUrlApiAction + "Apotek/RekapPasien/" + tanggal + "/" + status
                 });
             },
             getListPatient: function(tanggalAwal, tanggalAkhir, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = "-";
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-list/?ruanganId=276"
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");

             },
            getListPatient2: function(status,tanggalAwal, tanggalAkhir, noCm, pegawai) {
                 if (noCm === undefined || noCm === '')
                     noCm = "-";
                 if (pegawai === undefined && status === true)
                    return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-penunjang-list/?ruanganId=18" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir
                     });
                 if (pegawai === undefined)
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-penunjang-list/?ruanganId=18" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir
                     });
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-penunjang-list/?ruanganId=" + pegawai.ruangan.id + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");
             },
             getOrder: function(noOrder) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-Apotek/?noOrder=" + noOrder
                 });
             },
             getOrderDetail: function(noOrder) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-detail-Apotek/?noOrder=" + noOrder
                 });
             }
         };
     }]);
     pasienService.service('ManageApotek', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveHasilPeriksa: function(noOrder, data) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/save-hasil-Apotek?noOrder=" + noOrder
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
                     url: baseUrlApiAction + "registrasi-pelayanan/ambil-hasil-Apotek?tanggal=" + tanggal + "&namaPengambil=" + namaPengambilPasien + "&noTelepon=" + noTelepon + "&noOrder=" + noOrder
                 });
             }
         };
     }]);
 });