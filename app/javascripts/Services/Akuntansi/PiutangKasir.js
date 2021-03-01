 define(['Configuration'], function(config) {

   var baseUrlApiAction = config.baseApiPostData_Akuntansi;
   var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
   var akuntansiService = angular.module('PiutangService', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   akuntansiService.service('ManagePiutang', ['R_Akuntansi', function(r) {
       return {

      getDataTableMaster:function(urlGet){
        return r.get({
              url: baseMaster + urlGet
          });
      },

      getDataTableTransaksi:function(urlGet){
        return r.get({
              url: baseTransaksi + urlGet
          });
      },

     saveVerifikasiTagihan: function(data){
      return r.post({
        url: baseTransaksi + "tatarekening/simpan-verifikasi-tagihan/"+data.noRegistrasi
      }, {
        jumlahBayar: data.jumlahBayar,
        totalKlaim: data.totalKlaim,
        jumlahPiutang: data.jumlahPiutang,
        isDiskon: data.isDiskon
      })
     },


       }
   }]);


});