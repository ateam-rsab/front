 define(['Configuration'], function(config) {

   var baseUrlApiAction = config.baseApiPostData_Akuntansi;
   var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
   var baseMaster = config.urlDataTableMaster_Akuntansi;
   var urlPrinting = config.urlPrinting;
   var urlDataGeneric = config.urlDataGeneric_Akuntansi;
   var akuntansiService = angular.module('LogistikServicePhp', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   akuntansiService.service('ManageLogistikPhp', ['R_Akuntansi', function( r) {
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

      postpost: function(url,data){
        return r.post({
          url: baseTransaksi + url
        },data)
      },

      postclosingpersediaan: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/save-closing-persediaan"
        },data)
      },

      postpelayananapotik: function(data){
        return r.post({
          url: baseTransaksi + "logistik/save-pelayananobat"
        },data)
      },

      poststockmerger: function(data){
        return r.post({
          url: baseTransaksi + "farmasi/save-stock-merger"
        },data)
      },

      postpelayananapotikbebas: function(data){
        return r.post({
          url: baseTransaksi + "kasir/save-input-non-layanan-obat"
        },data)
      },

      postusulanpermintaanbarangjasa: function(data){
        return r.post({
          url: baseTransaksi + "usulan-permintaan/ruangan/save-data"
        },data)
      },

      postkelompokprodukbpjs: function(data){
        return r.post({
          url: baseTransaksi + "BPJS/save-kelompok-produk-bpjs"
        },data)
      },

      postconsiscounterid: function(data){
        return r.post({
          url: baseTransaksi + "bridging-aerocom/save-counterID-consis"
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
      postperbaikikartustok: function(data){
        return r.post({
          url: baseTransaksi + "kartu-stok/save-perbaiki"
        },data)
      },
      postsofromfile: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/get-stok-ruangan-so-from-file"
        },data)
      },

      postbridgingminir45: function(data){
        return r.post({
          url: baseTransaksi + "bridging/save-mini-r45"
        },data)
      },

      postbpjsklaim: function(data){
        return r.post({
          url: baseTransaksi + "bpjs/save-bpjs-klaim"
        },data)
      },


      postgagalhitungbpjsklaim: function(data){
        return r.post({
          url: baseTransaksi + "bpjs/save-bpjs-klaim-gagal-hitung"
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

      postinputsisaproduksibarang: function(data){
        return r.post({
          url: baseTransaksi + "produksi/save-input-sisa-produksi-barang"
        },data)
      },

      postorderbarang: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/save-order-barang"
        },data)
      },

      postbatalorderbarang: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/save-batal-order-barang"
        },data)
      },

      postpermintaanpengirimanbarang: function(data){
        return r.post({
          url: baseTransaksi + "sppb/save-permintaan-pengiriman-barang"
        },data)
      },

      postjurnalterimabarangsuplier: function(data){
        return r.post({
          url: baseTransaksi + "akuntansi/save-jurnal-penerimaan-barang"
        },data)
      },

      postterimabarangsuplier: function(data){
        return r.post({
          url: baseTransaksi + "penerimaan-suplier/save-terima-barang-suplier"
        },data)
      },

      postbatalterimabarangsuplier: function(data){
        return r.post({
          url: baseTransaksi + "penerimaan-suplier/save-batal-terima-barang-suplier"
        },data)
      },

      postpemakaianstokruangan: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/save-pemakaian-ruangan"
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

      getFieldListProduk: function(kode, kodeintern, kdBarcode, kdBmn, NamaProduk, StatuProduk) {
                //debugger;;
                return r.get({
                    url: baseMaster + 'produk/list-produk?kdProduk=' + kode + '&kdInternal=' + kodeintern + '&kdBarcode='+kdBarcode+'&kdBmn='+kdBmn+'&nmProduk='+NamaProduk+'&StatutEnabled='+StatuProduk
                });
      },
       getFieldMapRuanganToProduk: function(NamaProduk) {
                //debugger;;
                return r.get({
                    url: baseMaster + 'produk/list-produk?nmProduk='+NamaProduk
                });
      },

      saveDataProduk: function(data, urlSave) {
                return r.post({
                    url: baseMaster + urlSave
                }, data);
      },
      saveDataProduk2: function(data, urlSave) {
                return r.post({
                    url: baseTransaksi + urlSave
                }, data);
      },

       postUsulanPelaksanaanKegiatan: function(data){
        return r.post({
          url: baseTransaksi + "upk/ruangan/save-data"
        },data)
      },

      postSuratPelaksanaanKegiatan: function(data){
        return r.post({
          url: baseTransaksi + "spk/ruangan/edit-data"
        },data)
      },

      postUpdateRekanan: function(data){
        return r.post({
          url: baseTransaksi + "spk/update-data-rekanan"
        },data)
      },

       postpaketobat: function(data){
        return r.post({
          url: baseTransaksi + "logistik-paket-obat/save-paket-obat"
        },data)
      },

      postdataspk: function(data){
        return r.post({
          url: baseTransaksi + "spk/ruangan/save"
        },data)
      },

      updatedataspkkeupk: function(data){
        return r.post({
          url: baseTransaksi + "spk/udpate-status-upk"
        },data)
      },

      deletespk: function(data){
        return r.post({
          url: baseTransaksi + "spk/delete-spk"
        },data)
      },
      
      savesppbnew: function(data){
        return r.post({
          url: baseTransaksi + "sppb/save-permintaan-pengiriman-barang-new"
        },data)
      },

      postorderpelayananapotiknew: function(data){
        return r.post({
          url: baseTransaksi + "logistik/simpan-order-pelayananobatfarmasi"
        },data)
      },

      postspklangsung: function(data){
        return r.post({
          url: baseTransaksi + "spk/save-spk-langsung"
        },data)
      },

      postfasilitas: function(data){
        return r.post({
          url: baseTransaksi + "humas/save-fasilitas"
        },data)
      },

      postusulanpermintaanbarangjasanew: function(data){
        return r.post({
          url: baseTransaksi + "usulan-permintaan/ruangan/save-data-new"
        },data)
      },

      postUsulanPelaksanaanKegiatanNew: function(data){
        return r.post({
          url: baseTransaksi + "upk/ruangan/save-data-new"
        },data)
      },

      postdataspknew: function(data){
        return r.post({
          url: baseTransaksi + "spk/ruangan/save-new"
        },data)
      },

      postspklangsungNew: function(data){
        return r.post({
          url: baseTransaksi + "spk/save-spk-langsung-new"
        },data)
      },

      postterimabarangsupliernew: function(data){
        return r.post({
          url: baseTransaksi + "penerimaan-suplier/save-terima-barang-suplier-new"
        },data)
      },

      savesppbnewera: function(data){
        return r.post({
          url: baseTransaksi + "sppb/save-permintaan-pengiriman-barang-enggal"
        },data)
      },

      riwayatrealisasi: function(data){
        return r.post({
          url: baseTransaksi + "persediaan/data-persediaan"
        },data)
      },

      simpanregistrasiasset: function(data){
        return r.post({
          url: baseTransaksi + "aset/simpan-register-aset"
        },data)
      },

      postkirimbarangasset: function(data){
        return r.post({
          url: baseTransaksi + "aset/simpan-kirimbarang-aset"
        },data)
      },

      simpandetailregisaset: function(data){
        return r.post({
          url: baseTransaksi + "aset/simpan-detail-regisaset"
        },data)
      },

      simpantypeproduk: function(data){
        return r.post({
          url: baseTransaksi + "aset/simpan-type-produk"
        },data)
      },

      batalkirimbarang: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/batal-kirim-terima-barang"
        },data)
      },

      saveconsisobatbebas: function(data){
        return r.post({
          url: baseTransaksi + "bridging/save-consis-d-bebas"
        },data)
      },

       savemutasibarangexp: function(data){
        return r.post({
          url: baseTransaksi + "expired-stok/mutasi-barang-expired"
        },data)
      },

      savehps: function(data){
        return r.post({
          url: baseTransaksi + "hps/save-data-hps"
        },data)
      },

      saveverifanggaran: function(data){
        return r.post({
          url: baseTransaksi + "hps/save-data-verifikasi"
        },data)
      },

      savesps: function(data){
        return r.post({
          url: baseTransaksi + "hps/save-data-sps"
        },data)
      },

      saveverifdk: function(data){
        return r.post({
          url: baseTransaksi + "hps/save-verifikasi-dk"
        },data)
      },

      deletemapruangantoproduk: function(data){
        return r.post({
          url: baseTransaksi + "iti/delete-mapping-ruangan-to-produk"
        },data)
      },

      postReturObatBebas: function(data){
        return r.post({
          url: baseTransaksi + "kasir/save-retur-non-layanan-obat"
        },data)
      },

       postBatalKirimBarangPerItem: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/batal-kirim-terima-barang-peritem"
        },data)
      },


      hapusPemakaianRuangan: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/hapus-pemakaian-ruangan"
        },data)
      },

      returdistribusibarang: function(data){
        return r.post({
          url: baseTransaksi + "retur-stok/retur-distribusi-barang"
        },data)
      },

      returpenerimaanbarang: function(data){
        return r.post({
          url: baseTransaksi + "retur-stok/retur-penerimaan-barang-supplier"
        },data)
      },
      postOrderLaboratRad: function(data){
        return r.post({
          url: baseTransaksi + "lab-radiologi/save-order-layanan"
        },data)
      },

      postUbahPenerimaan: function(data){
        return r.post({
          url: baseTransaksi + "penerimaan-suplier/ubah-terima-barang-suplier"
        },data)
      },

      postjurnalamprahanbarang: function(data){
        return r.post({
          url: baseTransaksi + "akuntansi/save-jurnal-amprahan-barang"
        },data)
      },

      hapusjurnalamprahanbarang: function(data){
        return r.post({
          url: baseTransaksi + "akuntansi/hapus-jurnal-amprahan-barang"
        },data)
      },

      updatejurnalbatalkirimperitem: function(data){
        return r.post({
          url: baseTransaksi + "akuntansi/update-jurnal-batalkirim-peritem"
        },data)
      },

      postjurnalterimabarangnew: function(data){
        return r.post({
          url: baseTransaksi + "akuntansi/save-terima-barang-new"
        },data)
      },

      hapusjurnalterimabarang: function(data){
        return r.post({
          url: baseTransaksi + "akuntansi/hapus-jurnal-penerimaan-barang"
        },data)
      },

      postjurnalamprahanbarangall: function(data){
        return r.post({
          url: baseTransaksi + "akuntansi/save-jurnal-amprahan-barang-all"
        },data)
      },

      postinputbarangkadaluarsa: function(data){
        return r.post({
          url: baseTransaksi + "logistik-stok/save-barang-kadaluarsa"
        },data)
      },

      postverifikasiusulan: function(data){
        return r.post({
          url: baseTransaksi + "upk/ruangan/save-verifikasi-usulan"
        },data)
      },

      posttransaksi: function(url,data){
        return r.post({
          url: baseTransaksi + url
        },data)
      },

      gettransaksi: function(url,data){
        return r.get({
          url: baseTransaksi + url
        },data)
      },

      postverifikasianggaran: function(data){
        return r.post({
          url: baseTransaksi + "upk/ruangan/save-verifikasi-anggaran"
        },data)
      },

       hapususulanpermintaanbarang: function(data){
        return r.post({
          url: baseTransaksi + "usulan-permintaan/ruangan/hapus-data-usulan"
        },data)
      },

      postLogging: function(jenislog,referensi, noreff,keterangan) {
         return r.get({
            url: baseTransaksi + "logging/save-log-all?jenislog="+jenislog+"&referensi=" +   
                 referensi +'&noreff='+ noreff +'&keterangan='+keterangan
         });
      },

      saverencanausulanpermintaanbarang: function(data){
        return r.post({
          url: baseTransaksi + "rencana-usulan-permintaan/ruangan/save-data-rencana-usulan"
        },data)
      },

      hapusrencanausulanpermintaanbarang: function(data){
        return r.post({
          url: baseTransaksi + "rencana-usulan-permintaan/ruangan/hapus-data-rencana-usulan"
        },data)
      },

      verifikasipengelolaurusan: function(data){
        return r.post({
          url: baseTransaksi + "rencana-usulan-permintaan/ruangan/verifikasi-pengelola-urusan"
        },data)
      },

      verifikasikepalainstalasi: function(data){
        return r.post({
          url: baseTransaksi + "rencana-usulan-permintaan/ruangan/verifikasi-kepala-instalasi"
        },data)
      },

      hapusobatproduksi: function(data){
        return r.post({
          url: baseTransaksi + "produksi/hapus-produksi-barang"
        },data)
      },

       hapusmasterobatproduksi: function(data){
        return r.post({
          url: baseTransaksi + "produksi/hapus-master-barang-produksi"
        },data)
      },

      postData: function(data,urlPost){
        return r.post({
          url: baseTransaksi + urlPost
        },data) 
      },

    }
  }]);
 });