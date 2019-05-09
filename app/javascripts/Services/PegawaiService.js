 define(['Configuration'], function(config) {


     var baseUrlAction = config.baseUrlAction;
     var baseUrlApiAction = config.baseApiUrlData;
     var baseUrlDataMaster = config.urlDataMaster;
     var pasienService = angular.module('PegawaiService', ['ngResource', 'HttpServices', 'Services']);
     pasienService.service('ManagePegawai', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             saveIndexKinerja: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "sdm/save-indek-kinerja/"
                 }, data);
             },
             savePegawai: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "jadwalDokter/save-jadwal-dokter/"
                 }, data);
             },
             savePegawaiDpjp: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "jadwal-kerja-dokter/save-jadwal-kerja-dokter/"
                 }, data);
             },
             savePegawais: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "jadwalDokter/save-all-jadwal-dokter/"
                 }, data);
             },
             savejadwalPegawai: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "pegawai/save-all-jadwal-pegawai-rev2/"
                 }, data);
             },
             updateAbsensi: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "jadwalDokter/update-all-jadwal-dokter/"
                 }, data);
             },
             saveJadwalDpjp: function(data) {
                 return r.post({
                     url: baseUrlApiAction + "jadwal-dpjp/save-jadwal-dpjp"
                 }, data);
             },
             hapusDokterDPJP: function(noRec) {
                 return r.get({
                     url: baseUrlApiAction + "/registrasi-pelayanan/delete-dokter-jadwal-dpjp?noRec=" + noRec
                 });
             },
             saveMasterData: function(url, data) {
                 return r.post({
                     url: baseUrlApiAction + url
                 }, data);
             },
             saveGenerateDataMaster: function(data, urlSave) {
                 return r.post({
                     url: baseUrlDataMaster + urlSave
                 }, data);
             }
         }
     }]);
     pasienService.service('FindPegawai', ['ModelItem', 'R', 'DateHelper', function(modelItem, r, dateHelper) {
         return {
             getDataEvaluasi: function(pegawai, tahun, bulan) {
                 if (bulan === null || bulan === undefined)
                     bulan = 0;
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-evaluasi-jabatan/?tahun=" + tahun + "&bulan=" + bulan + "&ruangan=" + pegawai
                 });
             },
             getIndekKinerja: function(pegawai, tahun, bulan) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-indek-kinerja/" + tahun + "/" + bulan + "/" + pegawai
                 });
             },
             getCustomUraianKerja: function(pegawai, tahun, bulan) {
                 return r.get({
                     url: baseUrlApiAction + "sdm/get-custom-uraian-kerja/" + pegawai + "/" + tahun + "-" + bulan + "-01"
                 });
             },
             findUraianKerja: function(id, idPegawai) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-uraian/" + id + "/" + idPegawai
                 });
             },
             getJadwalDokterAll: function() {
                 return r.get({
                     url: baseUrlApiAction + "Dokter/Jadwal"
                 });
             },
             getDiagnosaTindakanTop: function(idPegawai, top) {
                 return r.get({
                     url: baseUrlApiAction + "Dokter/GetDiagnosaTindakanTop/" + idPegawai
                 });
             },
             getDiagnosaTop: function(idPegawai, top) {
                 return r.get({
                     url: baseUrlApiAction + "Dokter/GetDiagnosaTop/" + idPegawai
                 });
             },
             getDokterRawatJalan: function(tanggal, ruangan) {
                debugger;
                 return modelItem.kendoHttpSource('jadwalDokter/find-by-ruangan-tanggal/?id=' + ruangan.id + "&tglJadwal=" + dateHelper.formatDate(tanggal, 'YYYY-MM-DD'));
                 //return modelItem.kendoHttpSource("Dokter/RawatJalan/" + ruangan.id + "/" + dateHelper.formatDate(tanggal, 'DD-MM-YYYY'));
                 //  return r.get({
                 //      url: 
                 //  });
             },
             getDokterIGD: function(tanggal, ruangan) {
                debugger;
                 return modelItem.kendoHttpSource('jadwalDokter/find-by-ruangan-tanggal/?id=' + ruangan.idRuangan + "&tglJadwal=" + dateHelper.formatDate(tanggal, 'YYYY-MM-DD'));
                 //return modelItem.kendoHttpSource("Dokter/RawatJalan/" + ruangan.id + "/" + dateHelper.formatDate(tanggal, 'DD-MM-YYYY'));
                 //  return r.get({
                 //      url: 
                 //  });
             },
             getDokterBaru: function(noRec, tanggal) {
                return r.get({
                    url: baseUrlApiAction + "jadwalDokter/find-by-antrian-tanggal/?noRec="+noRec+"&tglJadwal="+tanggal
                })
             },
             getDokterRuangan: function(ruangan, tahun, bulan, pegawai) {
                 if (pegawai === undefined)
                     return r.get({
                         url: baseUrlApiAction + "pegawai/get-pegawai-by-ruangan/" + ruangan + "/" + tahun + "/" + bulan
                     });
                 else
                     return r.get({
                         url: baseUrlApiAction + "pegawai/get-pegawai-by-jadwal/" + tahun + "/" + bulan + "/" + pegawai
                     });
             },
             getjadwalPegawai: function(ruangan, tahun, bulan, pegawai) {
                return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai-by-ruangan-rev2/" + ruangan + "/" + tahun + "/" + bulan
                });
             },
             getPegawaiRuangan: function(ruangan) {
                     return r.get({
                         url: baseUrlApiAction + "pegawai/get-pegawai-by-ruangan/" + ruangan
                     });
             },
             getDokterJadwal: function(pegawai, tahun, bulan) {

                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai-by-jadwal/" + tahun + "/" + bulan + "/" + pegawai
                 });
             },
             getJabatan: function() {

                 return r.get({
                     url: baseUrlApiAction + "sdm/get-list-jabatan/"
                 });
             },postCalculateMasterEvaluasiJabatan: function(data) {

                 return r.post({
                     url: baseUrlApiAction + "sdm/hitung-master-evaluasi-jabatan/"
                 },data);
             },saveMasterEvaluasiJabatan:function(data){
                return r.post({
                    url:baseUrlApiAction +"sdm/save-evaluasi-jabatan/"
                },data)
             },
             getDokter: function(tanggal, ruangan) {

                 return modelItem.kendoHttpSource("Dokter");
                 //  return r.get({
                 //      url: 
                 //  });
             },
             findDokterDPJP: function(ruanganId) {
                 return r.get({
                     url: baseUrlApiAction + "registrasi-pelayanan/get-dokter-jadwal-dpjp?id=" + ruanganId 
                 });
             },
             findPegawaiById: function(pegawaiId) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/find-pegawai-by-id-custom/" + pegawaiId
                 })
             },
             getPensiun: function(idJabatan, tgl) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-tgl-pensiun/" + tgl + "/" + idJabatan
                 })
             },
             getDaftarPensiun: function(startDate, endDate) {
                 return r.get({
                     url: baseUrlApiAction + "pegawai/get-pegawai-pensiun/"+startDate+"/" + endDate 
                 })
             },
             getListData: function(url){
                 return r.get({
                     url: baseUrlApiAction + url
                 })
             },
             getFieldsMasterTable: function(url) {
                 return r.get({
                     url: baseUrlDataMaster + url
                 });
             }
         };
     }]);
     pasienService.service('RegistrasiPasienBaru', ['$q', '$http',
         function($q, $http) {
             return {

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

 });