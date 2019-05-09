 define(['Configuration'], function(config) {

   var baseUrlApiAction = config.baseApiPostData_Akuntansi;
   var baseUrlApiPostAction = config.baseApiPostData;
   var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
   var urlPrinting = config.urlPrinting;
   var akuntansiService = angular.module('TataRekeningService', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   akuntansiService.service('ManageTataRekening', ['R_Akuntansi', function(r) {
       return {
            getItem : function(urlGet) {
                return r.get({
                    url: baseUrlApiAction + urlGet
                });
            },
            getStatus:function(){
                var data = [
                    {id:1, namaExternal:"Sudah Bayar"},
                    {id:2, namaExternal:"Belum Bayar"} 
                ];
                return data;
            },
            getDataTableTransaksi:function(urlGet){
              return r.get({
                    url: baseTransaksi + urlGet
                });
            },
             saveFormUbahJenisPasien: function(data){
              return r.post({
                url: baseTransaksi + "tatarekening/ubah-jenis-pasien/"+data.noRegistrasi
              }, {
                jenisPasienBaruId : data.jenisPasienBaru.id,
                tanggalPerjanjian :  moment(data.tanggalPerjanjian).format('YYYY-MM-DD')
              })
             },

             saveVerifikasiTagihan: function(data){
              return r.post({
                url: baseTransaksi + "tatarekening/simpan-verifikasi-tagihan/"+data.noRegistrasi
              }, {
                jumlahBayar: data.jumlahBayar,
                totalKlaim: data.totalKlaim,
                jumlahPiutang: data.jumlahPiutang
              })
             },
             saveUnVerifikasiTagihan: function(data){
              return r.post({
                url: baseTransaksi + "tatarekening/batal-verifikasi-tagihan/"+data
              }, {
              })
             },
             saveupdatetglpulang: function(data){
              return r.post({
                url: baseTransaksi + "pasien/save-tglpulang"
                
              },data 
              )
             },

             savebridginginacbg: function(data){
              return r.post({
                url: baseTransaksi + "inacbg/save-bridging-inacbg"
                
              },data 
              )
             },
             savemapakomodasitea: function(data){
              return r.post({
                url: baseTransaksi + "tatarekening/save-map-akomodasi-tea"
                
              },data 
              )
             },

             saveakomodasitea: function(data){
              return r.post({
                url: baseTransaksi + "tatarekening/save-akomodasi-tea"
                
              },data 
              )
             },
             
             verifikasiPiutang: function(data){
              return r.post({
                url: baseTransaksi + "tatarekening/verify-piutang-pasien"
              }, {
                dataPiutang: data
              })
             },

             postSaveDokter: function(data){
                return r.post({
                  url: baseTransaksi + 'tatarekening/save-update-dokter'
                },data)
              },

              postUpdateHargaDiskonKomponen: function(data){
                return r.post({
                  url: baseTransaksi + 'tatarekening/save-update-harga-diskon-komponen'
                },data)
              },

              postJurnalAkuntansi: function(data){
                return r.post({
                  url: baseTransaksi + 'akuntansi/save-jurnal-pelayananpasien_t'
                },data)
              },

              postJurnalAkuntansiVerifikasi: function(data){
                return r.post({
                  url: baseTransaksi + 'akuntansi/save-jurnal-verifikasi_tarek'
                },data)
              },

              postJurnalPenerimaanAkuntansi: function(data){
                return r.post({
                  url: baseTransaksi + 'akuntansi/save-jurnal-pembayaran_tagihan'
                },data)
              },

              postUpdatepelayananpasienpetugas: function(data){
                return r.post({
                  url: baseTransaksi + 'tatarekening/save-update-dokter_ppp'
                },data)
              },

             
             savePasienPenunjang: function(data){
                return r.post({
                  url: baseTransaksi + 'pasien/save-pasien-penunjang'
                },data)
              },


             cancelVerifikasiPiutang: function(data){
              return r.post({
                url: baseTransaksi + "tatarekening/cancel-verify-piutang-pasien"
              }, {
                dataPiutang: data
              })
             },

             openPageBilling : function(noReg){
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token;
                //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
             },

             openPageKartuPasien : function(noReg){
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return urlPrinting+'reporting/lapKartuPasienPulang?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token;
                //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
             },

             saveKonsulRuangan: function(data){
               return r.post({
                 url: baseTransaksi + "pelayanan/save-konsul-keruangan"
               }, data)
             },

             saveUpdateDokter: function(data){
               return r.post({
                 url: baseTransaksi + "tatarekening/save-update-dokter_apd"
               }, data)
             },

             saveUpdateRekanan: function(data){
               return r.post({
                 url: baseTransaksi + "tatarekening/save-update-rekanan_pd"
               }, data)
            },
            postUpdateOrderLabel: function(data){
              return r.post({
                url: baseTransaksi + "orderlabel/save-update-order-label"
              },data)
           },
            postUpdatetglpelayanan: function(data){
              return r.post({
                url: baseTransaksi + 'tatarekening/save-update-tanggal_pelayanan'
              },data)
            },

             hapusAntrianPasien: function(data){
              return r.post({
                url: baseTransaksi + 'tatarekening/hapus-antrian-pasien'
              },data)
            },

            postPelayananPetugas: function(data){
              return r.post({
                url: baseTransaksi + 'pelayananpetugas/save-ppasienpetugas'
              },data)
            },
            deletePelayananPetugas: function(data){
              return r.post({
                url: baseTransaksi + 'pelayananpetugas/hapus-ppasienpetugas'
              },data)
            },

            postSaveSep: function(data){
                return r.post({
                  url: baseTransaksi + 'operator/save-pemakaian-asuransi'
                },data)
              },

            postSaveBatalRegistrasi: function(data){
                return r.post({
                  url: baseTransaksi + 'operator/save-Batal-registrasi'
                },data)
              },

            postSaveDiagnosaRMK: function(data){
                return r.post({
                  url: baseTransaksi + 'operator/save-diagnosa-rmk'
                },data)
              },
              postUpdateTanggal: function(data){
                return r.post({
                  url: baseTransaksi + 'pindahpasien/update-tanggal'
                },data)
              },
             saveLogVerifikasi: function(data){
                return r.post({
                  url: baseTransaksi + 'logging/save-log-verifikasi-tarek'
                },data)
              },
               saveLogUnverifikasi: function(data){
                return r.get({
                  url: baseTransaksi + 'logging/save-log-unverifikasi-tarek'
                },data)
              },
              saveLogHapusTindakan: function(data){
                return r.post({
                  url: baseTransaksi + 'logging/save-log-hapus-tindakan'
                },data)
              },
                ubahDokterRegis: function(data){
              return r.post({
                url: baseTransaksi + "registrasipasien/post-update-dokter"
              },data)
             },
              updateKelasDitanggung: function(data){
              return r.post({
                url: baseTransaksi + "registrasipasien/update-kelas-ditanggung"
              },data)
             },
              updateDokterPelPasien: function(data){
              return r.post({
                url: baseTransaksi + "inputtindakan/update-dokter-pel-pasien"
              },data)
             },
             simpanlaporanpasienpulang: function(data){
              return r.post({
                url: baseTransaksi + "laporan/laporan-pasien-pulang-new"
              },data)
             },
              updateDokterPelPasienNew: function(data){
              return r.post({
                url: baseTransaksi + "inputtindakan/update-dokter-pel-pasien-new"
              },data)
             },
             simpanlaporalayanan: function(data){
              return r.post({
                url: baseTransaksi + "laporan/laporan-layanan"
              },data)
             },
             postSaveSepTarek: function(data){
              return r.post({
                url: baseTransaksi + 'tatarekening/save-pemakaian-asuransi'
              },data)
            },

            postData: function(url,data){
              return r.post({
                url: baseTransaksi + url
              },data)
            },
       }
   }]);


});