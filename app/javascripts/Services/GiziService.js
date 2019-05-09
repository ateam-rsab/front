 define(['Configuration'], function(config) {


     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseApiUrlData;
     var pasienService = angular.module('GiziService', ['ngResource', 'HttpServices', 'Services']);
     pasienService.service('FindPasienGizi', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getQueuePatien: function(tanggal, status) {
                 return r.get({
                     url: baseUrlApiAction + "Gizi/RekapPasien/" + tanggal + "/" + status
                 });
             },
             getListPatient: function(tanggalAwal, tanggalAkhir, noCm) {
                 if (noCm === undefined || noCm === '')
                     noCm = "-";
                 return modelItem.kendoHttpSource("Gizi/ListPasien/" + tanggalAwal + "/" + tanggalAkhir + "/" + noCm);

             },
             getOrder: function(noOrder) {

                 return r.get({
                     url: baseUrlApiAction + "Gizi/Order/" + noOrder
                 });
             },
             getGizi: function (urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getDataOrderMakananGizi: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan-gizi-makanan/?"
                 });
             },
             getDataOrderMakananGiziByRuangan: function(ruanganId, jenisWaktuId, tglCariAwal, tglCariAkhir) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan-gizi-makanan/?ruanganId="+ruanganId + "&jenisWaktuId="+ jenisWaktuId + "&startDate=" + tglCariAwal + "&endDate=" + tglCariAkhir
                 });
             },
             getDataOrderMinumanGiziByRuangan: function(ruanganId, jenisWaktuId, tglCariAwal, tglCariAkhir) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan-gizi-minuman/?ruanganId="+ruanganId + "&jenisWaktuId="+ jenisWaktuId + "&startDate=" + tglCariAwal + "&endDate=" + tglCariAkhir
                 });
             },
             getDataOrderMinumanGizi: function() {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-order-pelayanan-gizi-minuman/?"
                 });
             },
             getKalori: function (produkId) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-kalori/?produkId=" + produkId
                });
            },
            getKomposisiFormula: function (produkId) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-komposisi-formula/?produkId=" + produkId
                });
            },
            getKomposisiMakanan: function (produkId) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-komposisi-makanan/?produkId=" + produkId
                });
            },
            getKomposisiMinuman: function (produkId) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-komposisi-minuman/?produkId=" + produkId
                });
            },
            getProduksiGizi: function (produkId, noRecOrder, jenisWaktu) {
                return r.get({
                    url: baseUrlApiAction + "registrasi-pelayanan/get-produksi?produks=" + produkId + "&noRecOrders=" + noRecOrder + "&jenisWaktus=" + jenisWaktu
                });
            },
            getItem : function(urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            saveDataGizi: function (data, urlSave) {
                return r.post({
                    url: baseUrlApiAction + urlSave
                }, data);
            },
            cetakEtiket : function(norec, tanggal){
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return baseUrlAction+'registrasi-pelayanan/etiketPersetujuanUmum?noCm='+norec+'&tglRegistrasi='+tanggal+'&X-AUTH-TOKEN=' + token;
            }
         };
     }]);
     pasienService.service('ManageGizi', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
            saveAssementAwal: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "asesmen-gizi-awal/save-asesmen-gizi-awal"
                 }, item);
             },
            saveAssementLanjut: function(item) {
                 return r.post({
                     url: baseUrlApiAction + "asesmen-gizi-lanjut/save-asesmen-gizi-lanjut"
                 }, item);
             },
            saveFormPermintaanMakananPasien: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "asesmen-gizi-lanjut/save-order-gizi"
                 }, data);
             },
            saveGizi: function (data, urlSave) {
                return r.post({
                    url: baseUrlApiAction + urlSave
                }, data);
            },
         };
     }]);
 });