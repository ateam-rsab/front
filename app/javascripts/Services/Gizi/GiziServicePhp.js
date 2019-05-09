 define(['Configuration'], function(config) {

   var baseUrlApiAction = config.baseApiPostData_Akuntansi;
   var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
   var baseMaster = config.urlDataTableMaster_Akuntansi;
   var urlPrinting = config.urlPrinting;
   var urlDataGeneric = config.urlDataGeneric_Akuntansi;
   var akuntansiService = angular.module('GiziServicePhp', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   akuntansiService.service('ManageGiziPhp', ['R_Akuntansi', function( r) {
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

      postDataTableMaster:function(urlGet){
        return r.post({
              url: baseMaster + urlGet
          });
      },

      postpelayananapotik: function(data){
        return r.post({
          url: baseTransaksi + "logistik/save-pelayananobat"
        },data)
      },

      postpelayananapotikbebas: function(data){
        return r.post({
          url: baseTransaksi + "kasir/save-input-non-layanan-obat"
        },data)
      },

      
      postmasterbarangproduksi: function(data){
        return r.post({
          url: baseTransaksi + "produksi/save-master-barang-produksi"
        },data)
      },
      
      postubahharga: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/save-ubah-harga"
        },data)
      },

      poststockopname: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/save-stock-opname"
        },data)
      },

      postbridgingminir45: function(data){
        return r.post({
          url: baseTransaksi + "bridging/save-mini-r45"
        },data)
      },

      postbridgingconsisd: function(data){
        return r.post({
          url: baseTransaksi + "bridging/save-consis-d"
        },data)
      },

      postkirimbarang: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/save-kirim-barang"
        },data)
      },

      postproduksibarang: function(data){
        return r.post({
          url: baseTransaksi + "produksi/save-produksi-barang"
        },data)
      },

      postorderbarang: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/save-order-barang"
        },data)
      },


      postterimabarangsuplier: function(data){
        return r.post({
          url: baseTransaksi + "penerimaan-suplier/save-terima-barang-suplier"
        },data)
      },

      postorderlayanan: function(data){
        return r.post({
          url: baseTransaksi + "pelayanan/save-order-layanan"
        },data)
      },

      postregistrasipenunjang: function(data){
        return r.post({
          url: baseTransaksi + "pasien/save-registrasi-penunjang"
        },data)
      },

      posthapuspelayananapotik: function(data){
        return r.post({
          url: baseTransaksi + "logistik/hapus-pelayananobat"
        },data)
      },

      postorderpelayananapotik: function(data){
        return r.post({
          url: baseTransaksi + "logistik/simpan-order-pelayananobat"
        },data)
      },

      postorderproduksiobat: function(data){
        return r.post({
          url: baseTransaksi + "logistik/simpan-order-pproduksi-obat"
        },data)
      },

      postkonversisatuan: function(data){
        return r.post({
          url: baseTransaksi + "logistik/save-konversi-satuan"
        },data)
      },

      postaerocom_hisobatms: function(data){
        return r.post({
          url: baseTransaksi + "bridging-aerocom/simpan-his-obat-ms"
        },data)
      },


      posthapuskonversisatuan: function(data){
        return r.post({
          url: baseTransaksi + "logistik/hapus-konversi-satuan"
        },data)
      },

      getFieldListProduk: function(kode, kodeintern, kdBarcode, kdBmn, NamaProduk) {
                debugger;
                return r.get({
                    url: baseMaster + 'produk/list-produk?kdProduk=' + kode + '&kdInternal=' + kodeintern + '&kdBarcode='+kdBarcode+'&kdBmn='+kdBmn+'&nmProduk='+NamaProduk
                });
      },
       getFieldMapRuanganToProduk: function(NamaProduk) {
                debugger;
                return r.get({
                    url: baseMaster + 'produk/list-produk?nmProduk='+NamaProduk
                });
      },

      saveDataProduk: function(data, urlSave) {
                return r.post({
                    url: baseMaster + urlSave
                }, data);
      },
      

    }
  }]);


 });