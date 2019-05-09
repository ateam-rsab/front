 define(['Configuration'], function(config) {


     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseUrlData;
     var pengkajianAwalService = angular.module('PengkajianAwalPasienService', ['ngResource', 'HttpServices']);

     pengkajianAwalService.service('GetPostOnPengkajianAwal', ['$q', '$http', 'R',
         function($q, $http, r) {
             return {
                 getListCppt: function() {
                     return r.get({
                         url: baseUrlApiAction + "Pemeriksaan/Cppt/anak"
                     });
                 },
                 getListTht: function(noCm, tanggal) {
                     return r.get({
                         url: baseUrlApiAction + "Pemeriksaan/Tht/" + noCm + "/" + tanggal
                     });
                 },
                 getListPemeriksaanIKFR: function(noCm, tanggal) {
                     return r.get({
                         url: baseUrlApiAction + "Pemeriksaan/IFKR/" + noCm + "/" + tanggal
                     });
                 },
                 getListTumbuhKembang: function(noCm, tanggal) {
                     return r.get({
                         url: baseUrlApiAction + "Pemeriksaan/TumbuhKembang/" + noCm + "/" + tanggal
                     });
                 },
                 SendData: function(dataVO, urlDetail) {
                     var deffer = $q.defer();

                     $http({
                         method: 'POST',
                         url: baseUrlAction + urlDetail,
                         headers: {
                             'Content-Type': 'application/json'
                                 //'Authorization': 'Basic ' + authorization
                         },
                         data: dataVO
                     }).then(function successCallback(response) {
                         if (response.status === 200)
                             deffer.resolve(response);
                     }, function errorCallback(response) {
                         deffer.reject(response);
                     });
                     return deffer.promise;

                 }
             };
         }
     ]);

     pengkajianAwalService.service('ManagePengkajianAwal', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveRiwayatKesehatan: function(pasien, tanggal, riwayatKesehatan) {
                 return r.post({
                     url: baseUrlApiAction + "Pasien/PengkajianAwal/RiwayatKesehatan/"
                 }, {
                     pasien: pasien,
                     tglRegistrasi: tanggal,
                     riwayatKesehatan: riwayatKesehatan
                 });
             },
             saveRiwayatPsikososial: function(pasien, tanggal, riwayatPsikososial) {
                 return r.post({
                     url: baseUrlApiAction + "Pasien/PengkajianAwal/RiwayatPsikososial/"
                 }, {
                     pasien: pasien,
                     tglRegistrasi: tanggal,
                     riwayatPsikososial: riwayatPsikososial
                 });
             },
             saveTandaVital: function(pasien, tanggal, tandaVital) {
                 return r.post({
                     url: baseUrlApiAction + "Pasien/PengkajianAwal/RiwayatPsikososial/"
                 }, {
                     pasien: pasien,
                     tglRegistrasi: tanggal,
                     tandaVital: tandaVital
                 });
             },
             saveSkriningNyeri: function(pasien, tanggal, skriningNyeri) {
                 return r.post({
                     url: baseUrlApiAction + "Pasien/PengkajianAwal/SkriningNyeri/"
                 }, {
                     pasien: pasien,
                     tglRegistrasi: tanggal,
                     skriningNyeri: skriningNyeri
                 });
             },
             saveSkriningGizi: function(pasien, tanggal, skriningGizi) {
                 return r.post({
                     url: baseUrlApiAction + "Pasien/PengkajianAwal/SkriningGizi/"
                 }, {
                     pasien: pasien,
                     tglRegistrasi: tanggal,
                     skriningGizi: skriningGizi
                 });
             },
             saveKebutuhanEdukasi: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "kebutuhan-edukasi/save-kebutuhan-edukasi/"
                 },data);
             }
         }
     }]);

 });