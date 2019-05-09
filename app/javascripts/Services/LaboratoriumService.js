 define(['Configuration'], function(config) {


     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseApiUrlData;
     var pasienService = angular.module('LaboratoriumService', ['ngResource', 'HttpServices', 'Services']);
     pasienService.service('FindPasienLaboratorium', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getHistoryPatient: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-histori-pasien/?noRec=" + noRec + "&code=L"
                 });
             },
             getHistoryOrder: function(tglOrder, idDetail, noCm) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-histori-laboratorium/?tglOrder=" + tglOrder + "&id=" + idDetail + "&noCm=" + noCm
                 });
             },
             getQueuePatien: function(tanggal, status) {
                 return r.get({
                     url: baseUrlApiAction + "Laboratorium/RekapPasien/" + tanggal + "/" + status
                 });
             },
             getListPatient: function(status,tanggalAwal, tanggalAkhir, noCm, pegawai) {
                 if (noCm === undefined || noCm === '')
                     noCm = "-";
                 if (pegawai === undefined && status === true)
                    return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-penunjang-list/?ruanganId=276" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir
                     });
                 if (pegawai === undefined)
                     return r.get({
                         url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-penunjang-list/?ruanganId=276" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir
                     });
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/antrian-pasien-penunjang-list/?ruanganId=" + pegawai.ruangan.id + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");

             },
             getOrder: function(noOrder) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-laboratorium/?noOrder=" + noOrder
                 });
             },
             getOrderDetail: function(noOrder) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-detail-laboratorium/?noOrder=" + noOrder
                 });
             },
             getReportPemeriksaan: function(tanggalAwal, tanggalAkhir, id) {

                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/hasil-laporan-by-pemeriksaan/?" + "&dateStart=" + tanggalAwal + "&dateEnd=" + tanggalAkhir + "&id=" + id
                 });
                 //   return modelItem.kendoHttpSource("registrasi-pelayanan/antrian-pasien-list/?ruanganId=276");

             }
         };
     }]);
     pasienService.service('ManageLaboratorium', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveInternalMessage: function(strukOrder) {
                 return r.post({
                     url: baseUrlApiAction + "registrasi-pelayanan/struk-order"
                 }, strukOrder);
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
                     tglRegistrasi: tanggal,
                     tanggalPendaftaran: "2010-01-01",
                     pasienDaftar: { noRec: data[0].noRecAntrian },
                     pengambilanSpesimen: data,
                     noRec: data[0].noRecAntrian
                 });
             },
             sysmex: function(noOrder) {
                 return r.get({
                     url: baseUrlApiAction + "lab/order-sysmex?noOrder=" + noOrder
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
             }
         };
     }]);
 });