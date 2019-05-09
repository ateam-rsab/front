 define(['Configuration'], function(config) {

   var baseUrlApiAction = config.baseApiPostData_Akuntansi;
   var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
   var baseMaster = config.urlDataTableMaster_Akuntansi;
   var urlPrinting = config.urlPrinting;
   var urlDataGeneric = config.urlDataGeneric_Akuntansi;
   var akuntansiService = angular.module('PhpServices', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   akuntansiService.service('ManageServicePhp', ['R_Akuntansi', function( r) {
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

      saveDataTransaksi: function(urlPost,data){
        return r.post({
          url: baseTransaksi + urlPost
        },data)
       },

      saveRegitrasiPasien: function(data){
        return r.post({
          url: baseTransaksi + "registrasipasien/save-registrasipasien"
        },data)
       },

       saveRegitrasiPasienBPJS: function(data){
        return r.post({
          url: baseTransaksi + "registrasipasien/save-registrasipasien-bpjs"
        },data)
       },

        saveRegitrasiPasienNonBpjs: function(data){
        return r.post({
          url: baseTransaksi + "registrasipasien/save-registrasipasien-nonbpjs"
        },data)
       },


       checkPesertaByNoBpjs:function(noKartu){
        return r.get({
              url: baseTransaksi + "bpjs/get-no-peserta?nokartu=" + noKartu + "&tglsep=" + new moment(new Date).format('YYYY-MM-DD'),
          });
      },
      
        checkPesertaByNik:function(nik){
        return r.get({
              url: baseTransaksi + "bpjs/get-nik?nik=" + nik + "&tglsep=" + new moment(new Date).format('YYYY-MM-DD'),
          });
      },
      
       cariSep:function(noSep){
        return r.get({
              url: baseTransaksi + "bpjs/cek-sep?nosep=" + noSep,
          });
      },

       generateSEP: function(data){
        return r.post({
          url: baseTransaksi + "bpjs/insert-sep"
        },data)
       },

      saveAsuransiPasien: function(data){
        return r.post({
          url: baseTransaksi + "registrasipasien/save-asuransipasien"
        },data)
       },
      postSaveDiagnosaRMK: function(data){
                return r.post({
                  url: baseTransaksi + 'operator/save-diagnosa-rmk'
                },data)
       },

       deleteSep:function(noSeps){
        return r.delete({
              url: baseTransaksi + "bpjs/delete-sep?nosep=" + noSeps,
          });
      },
      saveTindakanPelayanan: function(data){
                return r.post({
                  url: baseTransaksi + 'inputtindakan/save-tindakan'
                },data)
       },

      checkPesertaByNoRujukanRs:function(norujukan){
        return r.get({
              url: baseTransaksi + "bpjs/get-rujukan-rs?norujukan=" + norujukan, 
          });
      },

      updateSEP: function(data){
        return r.put({
          url: baseTransaksi + "bpjs/update-sep"
        },data)
       },


       updateTglPulang: function(data){
        return r.put({
          url: baseTransaksi + "bpjs/update-tglpulang"
        },data)
       },

      insertLPK: function(data){
        return r.post({
          url: baseTransaksi + "bpjs/insert-lpk"
        },data)
       },


      postPengajuanSep: function(data){
        return r.post({
          url: baseTransaksi + "bpjs/post-pengajuan"
        },data)
       },
        postApprovalSep: function(data){
        return r.post({
          url: baseTransaksi + "bpjs/post-aprovalSEP"
        },data)
       },
 
       getIntegrasiInacbg:function(noSep){
        return r.get({
              url: baseTransaksi + "bpjs/get-integrasi-inacbg?noSEP=" + noSep,
          });
      },

      cekRujukanRsByNoKartu:function(nokartu){
        return r.get({
              url: baseTransaksi + "bpjs/get-rujukan-rs-nokartu?nokartu=" + nokartu, 
          });
      },

      postRujukan: function(data){
        return r.post({
          url: baseTransaksi + "bpjs/insert-rujukan"
        },data)
       },

       deleteRujukan:function(norujukan){
        return r.delete({
              url: baseTransaksi + "bpjs/delete-rujukan?norujukan=" + norujukan,
          });
      },

       deleteLPK:function(noSeps){
        return r.delete({
              url: baseTransaksi + "bpjs/delete-lpk?nosep=" + noSeps,
          });
      },

      savePindahPasien: function(data){
        return r.post({
          url: baseTransaksi + "pindahpasien/save-pindah-pasien"
        },data)
       },
        savePasienPulang: function(data){
        return r.post({
          url: baseTransaksi + "pindahpasien/save-pulang-pasien"
        },data)
       },
      
      savePasienBayis: function(data){
        return r.post({
          url: baseTransaksi + "registrasipasienbayi/save-bayi"
        },data)
       },

        saveGenerateNoCM: function(data){
        return r.post({
          url: baseTransaksi + "registrasipasienbayi/generate-nocm"
        },data)
       },

      updateRujukan: function(data){
        return r.put({
          url: baseTransaksi + "bpjs/update-rujukan"
        },data)
       },

        saveLogInputTindakan: function(data){
                return r.post({
                  url: baseTransaksi + 'logging/save-log-input-tindakan'
                },data)
        },

         savePasien: function(data){
        return r.post({
          url: baseTransaksi + "pasien/save-pasien"
        },data)
       },

         postSaveDokters: function(data){
        return r.post({
          url: baseTransaksi + "registrasipasien/post-update-dokter"
        },data)
       },

         saveChildAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/save-child"
        },data)
       },


       hapusChildAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/delete-child"
        },data)
       },

        saveKelHeadAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/save-kel-head-anggaran"
        },data)
       },

        saveKelPertamaAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/save-kel-pertama-anggaran"
        },data)
       },

        saveKelKeduaAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/save-kel-kedua-anggaran"
        },data)
       },

        saveKelKetigaAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/save-kel-ketiga-anggaran"
        },data)
       },

        saveKelKeempatAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/save-kel-keempat-anggaran"
        },data)
       },

         deleteKelHeadAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/delete-kel-head-anggaran"
        },data)
       },

        deleteKelPertamaAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/delete-kel-pertama-anggaran"
        },data)
       },

       deleteKelKeduaAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/delete-kel-kedua-anggaran"
        },data)
       },

        deleteKelKetigaAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/delete-kel-ketiga-anggaran"
        },data)
       },

        deleteKelKeempatAnggaran: function(data){
        return r.post({
          url: baseTransaksi + "anggaran/delete-kel-keempat-anggaran"
        },data)
       },
         saveMutasiPindahPasien: function(data){
        return r.post({
          url: baseTransaksi + "mutasi/simpan-mutasi-pindah"
        },data)
       },

      updatePasien: function(data){
        return r.post({
          url: baseTransaksi + "pasien/update-pasien"
        },data)
       },

         disablePasien: function(data){
        return r.post({
          url: baseTransaksi + "pasien/update-false-pasien"
        },data)
       },

      postOrderLayanan: function(data){
        return r.post({
          url: baseTransaksi + "lab-radiologi/save-order-layanan"
        },data)
      },

       deleteOrderPelayanan: function(data){
        return r.post({
          url: baseTransaksi + "lab-radiologi/delete-order-pelayanan"
        },data)
      },

      saveBridingSysmex: function(data){
        return r.post({
          url: baseTransaksi + "lab-radiologi/save-bridging-sysmex"
        },data)
      },

      
      savePelayananPasien: function(data){
        return r.post({
          url: baseTransaksi + "lab-radiologi/save-pelayanan-pasien"
        },data)
      },
      savePelayananPasienBedah: function(data){
        return r.post({
          url: baseTransaksi + "lab-radiologi/save-pelayanan-pasien-bedah"
        },data)
      },

      saveakomodasitea: function(data){
              return r.post({
                url: baseTransaksi + "tatarekening/save-akomodasi-tea"
                
              },data 
              )
      },
       simpantandavital: function(data){
        return r.post({
          url: baseTransaksi + "operator/save-tanda-vital"
        },data)
      },  

      saveBrigdingZeta: function(data){
        return r.post({
          url: baseTransaksi + "lab-radiologi/save-bridging-zeta"
        },data)
      },

      deletePelayananPasien: function(data){
        return r.post({
          url: baseTransaksi + "lab-radiologi/delete-pelayanan-pasien"
        },data)
      },

      postUbahCaraBayar: function(data){
          return r.post({
            url: baseTransaksi + "kasir/save-ubah-cara-bayar"
          },data)
        },

        postBatalBayar: function(data){
                return r.post({
                  url: baseTransaksi + "kasir/save-batal-bayar"
                },data)
        },

        saveCaraSetor: function(data){
                return r.post({
                  url: baseTransaksi + "bedahara-penerimaan/save-cara-setor"
                },data)
        },
        deleteCaraSetor: function(data){
                return r.post({
                  url: baseTransaksi + "bedahara-penerimaan/delete-cara-setor"
                },data)
        },
        saveAntrianPasienDiperiksa: function(data){
                return r.post({
                  url: baseTransaksi + "lab-radiologi/save-apd"
                },data)
        },
       
      saveHasilPemeriksaan: function(data){
        return r.post({
          url: baseTransaksi + "lab-radiologi/save-hasil-pemeriksaan"
        },data)
      },

       deleteBKU: function(data){
            return r.post({
              url: baseTransaksi + "bendaharapenerimaan/hapus-bku"
            },data)
        },

        saveTempBku: function(data){
        return r.post({
          url: baseTransaksi + "bendahara-penerimaan/save-temp-bku"
        },data)
      },

        saveOrderGizi: function(data){
          return r.post({
            url: baseTransaksi + "gizi/save-order-gizi"
          },data)
        },

         updateOrderPelayananGizi: function(data){
          return r.post({
            url: baseTransaksi + "gizi/update-orderpelayanan-gizi"
          },data)
        },
         deleteOrderPelayananGizi: function(data){
          return r.post({
            url: baseTransaksi + "gizi/delete-orderpelayanan-gizi"
          },data)
        },

          saveKirimMenuMakanan: function(data){
          return r.post({
            url: baseTransaksi + "gizi/save-kirimmenu-gizi"
          },data)
        },
         saveJenisDiet: function(data){
          return r.post({
            url: baseTransaksi + "gizi/save-jenisdiet"
          },data)
        },

        hapusJenisDiet: function(data){
          return r.post({
            url: baseTransaksi + "gizi/delete-jenisdiet"
          },data)
        },

        saveJenisWaktu: function(data){
          return r.post({
            url: baseTransaksi + "gizi/save-jeniswaktu"
          },data)
        },
        
        hapusJenisWaktu: function(data){
          return r.post({
            url: baseTransaksi + "gizi/delete-jeniswaktu"
          },data)
        },

        saveKategoryDiet: function(data){
          return r.post({
            url: baseTransaksi + "gizi/save-kategorydiet"
          },data)
        },

        hapusKategoryDiet: function(data){
          return r.post({
            url: baseTransaksi + "gizi/delete-kategorydiet"
          },data)
        },
        updateSEPnew: function(data){
          return r.put({
            url: baseTransaksi + "bpjs/update-sep-v1.1"
          },data)
         },
         updateLPK: function(data){
          return r.put({
            url: baseTransaksi + "bpjs/update-lpk"
          },data)
         },

        saveKeluhanPelanggan: function(data){
          return r.post({
            url: baseTransaksi + "humas/save-keluhan-pelanggan"
          },data)
        },

        savePenangananKeluhanPelanggan: function(data){
          return r.post({
            url: baseTransaksi + "humas/save-keluhan-penanganan-pelanggan"
          },data)
        },        
         deleteLPKnew: function(data){
          return r.delete({
            url: baseTransaksi + "bpjs/delete-lpk"
          },data)
         },

         BatalKeluhanPelanggan: function(data){
          return r.post({
            url: baseTransaksi + "humas/save-batal-keluhan"
          },data)
        },

        savepembayarantagihansupplier: function(data){
          return r.post({
            url: baseTransaksi + "bendahara-pengeluaran/save-pembayaran-tagihan-suplier"
          },data)
        },

        savekegiatanpenelitianeksternal: function(data){
          return r.post({
            url: baseTransaksi + "sdm-penelitian/save-kegiatan-penelitian-eksternal"
          },data)
        },

        hapuskegiatanpenelitianeksternal: function(data){
          return r.post({
            url: baseTransaksi + "sdm-penelitian/batal-kegiatan-penelitian-eksternal"
          },data)
        },

        savekegiatanpenelitianpegawai: function(data){
          return r.post({
            url: baseTransaksi + "sdm-penelitian/save-kegiatan-penelitian-pegawai"
          },data)
        },

        hapuskegiatanpenelitianpegawai: function(data){
          return r.post({
            url: baseTransaksi + "sdm-penelitian/batal-kegiatan-penelitian-pegawai"
          },data)
        },

        hapusPenangananKeluhanPelanggan: function(data){
          return r.post({
            url: baseTransaksi + "humas/save-batal-penangankeluhan"
          },data)
        },  

        savepengajuanpelatihan: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan/save-pengajuan-pelatihan"
          },data)
        },   

        savenarasumberkompetensi: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan-narasumber/save-narasumber-kompetensi"
          },data)
        },   

        hapusnarasumberkompetensi: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan-narasumber/hapus-narasumber-kompetensi"
          },data)
        },   


        postSimpan: function(urlPost, data){
        return r.post({
          url: baseTransaksi + urlPost
        },data) 
      },

      savekurikulumkompetensi: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan-kurikulum/save-kurikulum-kompetensi"
          },data)
        },   

      hapuskurikulumkompetensi: function(data){
        return r.post({
          url: baseTransaksi + "sdm-pelatihan-kurikulum/hapus-kurikulum-kompetensi"
        },data)
      }, 

      hapuspengajuanpelatihan: function(data){
        return r.post({
          url: baseTransaksi + "sdm-pelatihan/hapus-pengajuan-pelatihan"
        },data)
      }, 

      saveevaluasinarasumber: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan-narasumber/save-evaluasi-narasumber"
          },data)
      }, 

      hapusevaluasinarasumber: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan-narasumber/hapus-evaluasi-narasumber"
          },data)
      },    
      
      verifikasisdmpengajuanpelatihan: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan/verifikasi-pengajuan-pelatihan"
          },data)
      }, 

      unverifikasisdmpengajuanpelatihan: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan/unverifikasi-pengajuan-pelatihan"
          },data)
      },

      verifikasidirektursdmpengajuanpelatihan: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan/verifikasi-pengajuan-pelatihan-direk-sdm"
          },data)
      }, 

      unverifikasidirektursdmpengajuanpelatihan: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan/unverifikasi-pengajuan-pelatihan-direk-sdm"
          },data)
      },  

      savekehadiranpeserta: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan/save-kehadiran-peserta-pelatihan"
          },data)
      },   

      verifikasidirekturterkait: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan/verifikasi-pengajuan-pelatihan-direk-terkait"
          },data)
      }, 

       saveevaluasipenyelenggara: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan-penyelenggara/save-evaluasi-penyelenggara"
          },data)
      }, 

      hapusevaluasipenyelenggara: function(data){
          return r.post({
            url: baseTransaksi + "sdm-pelatihan-penyelenggara/hapus-evaluasi-penyelenggara"
          },data)
      }, 

      saveOrderPindahPasien: function(data){
        return r.post({
          url: baseTransaksi + "pindahpasien/save-order-pindah-pasien"
        },data)
       },

      saveOrderPulangPasien: function(data){
        return r.post({
          url: baseTransaksi + "pindahpasien/save-order-pulang-pasien"
        },data)
      },
    }
  }]);
 });