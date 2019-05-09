 define(['Configuration'], function(config) {

   var baseUrlApiAction = config.baseApiPostData_Akuntansi;
   var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
   var baseMaster = config.urlDataTableMaster_Akuntansi;
   var urlPrinting = config.urlPrinting;
   var urlDataGeneric = config.urlDataGeneric_Akuntansi;
   var akuntansiService = angular.module('KasirService', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   akuntansiService.service('ManageKasir', ['R_Akuntansi', function( r) {
     return {
      getItem : function(urlGet) {
        return r.get({
          url: baseUrlApiAction + urlGet
        });
      },
      getStatus:function(){
        var data = [
        {id:1, namaExternal:"Lunas"},
        {id:2, namaExternal:"Belum Bayar"} 
        ];
        return data;
      },
      getDataGeneric:function(urlGet){
        return r.get({
          url: urlDataGeneric + urlGet
        });
      },
      
      getDataTableTransaksi:function(urlGet){
        return r.get({
          url: baseTransaksi + urlGet
        });
      },

      getDataTableMaster:function(urlGet){
        return r.get({
          url: baseMaster + urlGet
        });
      },

      postDataTableMaster:function(urlGet){
        return r.post({
          url: baseMaster + urlGet
        });
      },

      pembayaranTagihanPasien: function(data){
        return r.post({
          url: baseTransaksi + "kasir/simpan-pembayaran"
        },data)
      },

      postinputnonlayanan: function(data){
        return r.post({
          url: baseTransaksi + "kasir/save-input-non-layanan"
        },data)
      },

      postJurnalPenerimaanAkuntansi: function(data){
        return r.post({
          url: baseTransaksi + 'akuntansi/save-jurnal-pembayaran_tagihan'
        },data)
      },

      collecting: function(data){
        return r.post({
          url: baseTransaksi + "piutang/collecting-piutang-layanan"
        },data)
      },

      penerimaanBank: function(data){
        return r.post({
          url: baseTransaksi + "bendaharapenerimaan/simpan-penerimaan-bank"
        },data)
      },

      setoran: function(data){
        return r.post({
          url: baseTransaksi + "save-setoran-kasir"
        },data)
      },

      setoranKasir: function(data){
        return r.post({
          url: baseTransaksi + "kasir/setoran-kasir"
        },data)
      },

      unitcost: function(data){
        return r.post({
          url: baseMaster + "unit-cost/simpan-unitcost"
        },data)
      },

      unitcostdetail: function(data){
        return r.post({
          url: baseMaster + "unit-cost/simpan-unitcost-detail"
        },data)
      },


      kompensasiPiutang: function(data){
        return r.post({
          url: baseTransaksi + "piutang/kompensasi-piutang-layanan"
        },data)
      },

      SaveBed: function(data){
        return r.post({
          url: baseMaster + "tarif/save-bed"
        },data)
      },

      SaveHHHHHH: function(data){
        return r.post({
          url: baseMaster + "tarif/saveharganettoprodukbykelas_kelasD"
        },data)
      },


       saveUpdateRekanan: function(data){
         return r.post({
           url: baseTransaksi + "tatarekening/save-update-rekanan_pd"
         }, data)
       },

      UpdateHargaPelayananPasien: function(data){
        return r.post({
          url: baseTransaksi + "tatarekening/update-harga-pelayanan-pasien"
        },data)
      },

       HapusPelayananPasien: function(data){
        return r.post({
          url: baseTransaksi + "tatarekening/hapus-pelayanan-pasien"
        },data)
      },

      openPageKwitansi : function(noReg){
        var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
          //return urlPrinting+'reporting/lapKwitansi?noKwitansi='+noReg+'&X-AUTH-TOKEN='+token;
          return urlPrinting+'reporting/lapKwitansi?noSbm='+noReg+'&X-AUTH-TOKEN='+token;
          //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
        },

        openPageKwitansiDeposit : function(noSBM){
          var arr = document.cookie.split(';')
          var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
          
          for (var i = 0; i < arr.length; i++) {
           var element = arr[i].split('=');
           if (element[0].indexOf('authorization') > 0) {
             authorization = element[1];
           }
         }
          //var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
          return urlPrinting+'reporting/lapKwitansiDeposit?noSBM='+noSBM+'&X-AUTH-TOKEN='+authorization;
          //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
        },
        openPageKwitansiCicilanPiutang : function(noSBM){
          var arr = document.cookie.split(';')
          var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
          
          for (var i = 0; i < arr.length; i++) {
           var element = arr[i].split('=');
           if (element[0].indexOf('authorization') > 0) {
             authorization = element[1];
           }
         }
          //var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
          return urlPrinting+'reporting/lapKwitansiCicilan?noSBM='+noSBM+'&X-AUTH-TOKEN='+authorization;
          //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
        },
        openPageKwitansiNonLayanan : function(noSBM){
          var arr = document.cookie.split(';')
          var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
          
          for (var i = 0; i < arr.length; i++) {
           var element = arr[i].split('=');
           if (element[0].indexOf('authorization') > 0) {
             authorization = element[1];
           }
         }
          //var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
          return urlPrinting+'reporting/lapKwitansiUmum?noSbm='+noSBM+'&X-AUTH-TOKEN='+authorization;
          //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
        },
        openPageKwitansiTagihanByRegistrasi : function(noReg){
          var arr = document.cookie.split(';')
          var authorization = ""//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXN0ZXIifQ.N9hHxNwWtiKvGYpzaquS8PqFJ8E5yYVKIb48GoP4jQgowbKYJaUvSdSRdSqia-2VJyiwwatpJ7E-zleqcho2ng";
          
          for (var i = 0; i < arr.length; i++) {
           var element = arr[i].split('=');
           if (element[0].indexOf('authorization') > 0) {
             authorization = element[1];
           }
         }
          //var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
          return urlPrinting+'reporting/lapKwitansiNoRegistrasi?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+authorization;
          //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
        },
         SaveHargaNetto: function(data){
        return r.post({
          url: baseMaster + "tarif/saveharganettoprodukbykelas"
        },data)
      },

       postBatalBayar: function(data){
                return r.post({
                  url: baseTransaksi + "kasir/save-batal-bayar"
                },data)
        },

        postUbahCaraBayar: function(data){
                return r.post({
                  url: baseTransaksi + "kasir/save-ubah-cara-bayar"
                },data)
        },

      batalSetoranKasir: function(data){
        return r.post({
          url: baseTransaksi + "kasir/batal-setoran-kasir"
        },data)
      },

        postTransaksi: function(url,data){
          return r.post({
            url: baseTransaksi + url
          },data)
        },
      }
    }]);


});