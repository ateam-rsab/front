 define(['Configuration'], function(config) {

   var baseUrlApiAction = config.baseApiPostData_Akuntansi;
   var baseTransaksi = config.urlDataTableTransaksi_Akuntansi;
   var urlPrinting = config.urlPrinting;
   var akuntansiService = angular.module('AkuntansiService', ['ngResource', 'HttpServicesAkuntansi', 'Services']);
   akuntansiService.service('ManageAkuntansi', ['R_Akuntansi', function( r) {
       return {

        
      getDataTableTransaksi:function(urlGet){
        return r.get({
              url: baseTransaksi + urlGet
          });
      },

      getLaporanBukuBesar:function(url) {
        return r.get({
          url: 'http://192.168.12.3:7777/' + url
        })
      },

            getJenisPelayanan:function(){
                var data = [
                    {id:1, namaExternal:"Reguler"},
                    {id:2, namaExternal:"Eksekutif"}
                ];
                return data;
            },

            getPenjamin:function(){
                var data = [
                    {id:1, namaExternal:"Penjamin 1"},
                    {id:2, namaExternal:"Penjamin 2"},
                    {id:3, namaExternal:"Penjamin 3"},
                    {id:4, namaExternal:"Penjamin 4"}
                ];
                return data;
            },

            getBalanceStatus:function(){
              var data = [
                    { "id":"D", "value":"Debit"},
                    { "id":"K", "value":"Kredit"}
                ]
              return data;
            },

            postpost: function(data,url){
              return r.post({
                url: baseTransaksi + url
              },data)
            },

            postentryjurnal: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-entry-jurnal"
              },data)
            },
            postcoa: function(data){
              return r.post({
                url: baseTransaksi + "master/save-master-coa"
              },data)
            },
            postbengkeljurnal: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-bengkel-jurnal"
              },data)
            },
            postdeldoublejurnal: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-hapus-double-jurnal"
              },data)
            },
            postJurnalAkuntansi: function(data){
                return r.post({
                  url: baseTransaksi + 'akuntansi/save-jurnal-pelayananpasien_t'
                },data)
              },
            postJurnalPenerimaanAkuntansi: function(data){
              return r.post({
                url: baseTransaksi + 'akuntansi/save-jurnal-pembayaran_tagihan'
              },data)
            },
            postJurnalAkuntansiVerifikasi: function(data){
              return r.post({
                url: baseTransaksi + 'akuntansi/save-jurnal-verifikasi_tarek'
              },data)
            },
            postjurnalrev: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-posting-jurnalv1"
              },data)
            },
            postunjurnalrev: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-unposting-jurnalv1"
              },data)
            },
            posthapussaldoawal: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-hapus-saldo-awal"
              },data)
            },
            postaddsaldoawal: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-saldo-awal"
              },data)
            },
            posthapusmappinglaporanakutansitochartofaccountteaheueuh: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-hapus-map-laporan-akuntansi"
              },data)
            },
            postaddmaplaporanakuntansimappingtochartofaccount: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-map-laporan-akuntansi"
              },data)
            },
            postclosingjurnal: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-closing-jurnal"
              },data)
            },
            postbatalclosingjurnal: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-batal-closing-jurnal"
              },data)
            },

            posthapusentryjurnal: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-hapus-data-jurnal"
              },data)
            },

            posthapusjurnalnorec: function(data){
              return r.post({
                url: baseTransaksi + "akuntansi/save-hapus-jurnal-norec"
              },data)
            },

            postupdatejurnalnorec: function(data){
              return r.post({
                url: baseTransaksi + "akutansi/save-update-jurnal"
              },data)
            },

            postupdatejurnalbatch: function(data){
              return r.post({
                url: baseTransaksi + "akutansi/save-update-jurnal-batch"
              },data)
            },

            postkelompokkerja: function(data){
              return r.post({
                url: baseTransaksi + "humas/save-kelompok-kerja"
              },data)
            },


            getDataTableTransaksi:function(urlGet){
              return r.get({
                    url: baseTransaksi + urlGet
                });
            },
            
            saveCOA: function(data) {

               var idEffectAdd = "";
               var idEffectMin = "";
               var valSaldoNormalEffectAdd = "";
               var valSaldoNormalEffectMin = "";
               
               if(data.accEffectAdd)
                idEffectAdd = data.accEffectAdd.id;

               if(data.accEffectMin)
                idEffectMin = data.accEffectMin.id;

               if(data.saldoNormalEffectAdd)
                valSaldoNormalEffectAdd = data.saldoNormalEffectAdd.value;

               if(data.saldoNormalEffectMin)
                valSaldoNormalEffectMin = data.saldoNormalEffectMin.value;

               return r.post({
                url: baseUrlApiAction + "master/chartofaccount/"
               }, {
                kodeExternal: data.kodeSubAccount,
                namaExternal: data.namaSubAccount,
                reportDisplay: data.namaSubAccount,
                jenisAccount: data.jenisAccount,
                kategoryAccount: data.kategoryAccount,
                strukturAccount: data.strukturAccount,
                namaAccount: data.namaAccount,
                noAccount: data.kodeSubAccount,
                accountHead: data.accountHead,
                saldoNormalAdd: data.saldoNormalAdd.id,
                saldoNormalMin: data.saldoNormalMin.id,
                saldoNormalEffectAdd: valSaldoNormalEffectAdd,
                saldoNormalEffectMin: valSaldoNormalEffectMin,
                kdAccountEffectAdd: idEffectAdd,
                kdAccountEffectMin: idEffectMin
            });
           },

           editCOA: function(data) {

               var idEffectAdd = "";
               var idEffectMin = "";
               var valSaldoNormalEffectAdd = "";
               var valSaldoNormalEffectMin = "";
               
               if(data.accEffectAdd)
                idEffectAdd = data.accEffectAdd.id;

               if(data.accEffectMin)
                idEffectMin = data.accEffectMin.id;

               if(data.saldoNormalEffectAdd)
                valSaldoNormalEffectAdd = data.saldoNormalEffectAdd.value;

               if(data.saldoNormalEffectMin)
                valSaldoNormalEffectMin = data.saldoNormalEffectMin.value;
              
               return r.put({
                url: baseUrlApiAction + "master/chartofaccount/" + data.id
               }, {
                kodeExternal: data.kodeSubAccount,
                namaExternal: data.namaSubAccount,
                reportDisplay: data.namaSubAccount,
                jenisAccount: data.jenisAccount,
                kategoryAccount: data.kategoryAccount,
                strukturAccount: data.strukturAccount,
                namaAccount: data.namaAccount,
                noAccount: data.kodeSubAccount,
                accountHead: data.accountHead,
                saldoNormalAdd: data.saldoNormalAdd.id,
                saldoNormalMin: data.saldoNormalMin.id,
                saldoNormalEffectAdd: valSaldoNormalEffectAdd,
                saldoNormalEffectMin: valSaldoNormalEffectMin,
                kdAccountEffectAdd: idEffectAdd,
                kdAccountEffectMin: idEffectMin
            });
           },

           deleteCOA: function(id) {
               return r.delete({
                url: baseUrlApiAction + "master/chartofaccount/"+ id
               });
           },

           uploadDataCoaFromExcel: function(data) {
               return r.post({
                url: baseUrlApiAction + "master/chartofaccount/import-from-excel"
               }, {
                accounts: data
              });
           },

           uploadDataJurnalFromExcel: function(data) {
               return r.post({
                url: baseUrlApiAction + "transaksi/jurnalmanual/import-from-excel"
               }, {
                jurnals: data
              });
           },

           createPeriodeAkuntansi: function(data) {
               return r.post({
                url: baseUrlApiAction + "transaksi/settingperiode/"
               }, {
                periode: data.periode,
                detailPeriode: data.detailPeriode
              });
           },

           updatePeriodeAkuntansi: function(data) {
               return r.put({
                url: baseUrlApiAction + "transaksi/settingperiode/" + data.noRec
               }, {
                periode: data.periode,
                detailPeriode: data.detailPeriode
              });
           },

           postingJurnalUmumManual: function(data){
            return r.post({
              url: baseUrlApiAction + "transaksi/jurnalmanual/"
            }, {
              jurnal:data.jurnal,
              detailJurnal:data.detailJurnal
            })
           },

           sampleUploadFile: function(data){

            return r.post({
             url:'http://172.16.16.27:9999/jasamedika-web/agama/upload/',
                        
             //url: "http://localhost/Dokumentasi/php/upload.php"
            }, {
              fileInput: data.fileInput,
              fileName: data.fileName
            })
           },

           postingVerifikasiJurnal: function(data){
            return r.post({
              url: baseUrlApiAction + "transaksi/akuntansi/verifikasi-jurnal/"
            }, {
              jurnals:data
            })
           },

           mappingCOA: function(data) {
               return r.post({
                url: baseUrlApiAction + "transaksi/akuntansi/mapping-coa/simpan-mapping-coa/"
               }, {
                account_id: data.coa.account_id,
                instalasi_id: data.instalasi.instalasi_id,
                penjamin_id: data.penjamin.penjamin_id,
                jenisPelayanan: data.jenisPelayanan.reportDisplay,
                account_lawan_id: data.accountOponen.account_id,
                instalasi_tambahan: data.instalasiTambahan
              });
           },

            urlBukuBesar : function(){
                var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvcGVyYXRvciJ9.eNEJVKwi8thRx0ruZxlk377mgpgkkLGtraRKwBjmb3Y4yT_nxfWUCeT-DrJ93_U0ZNJZrc-TM2rO4cxe5LjL5A";
                return urlPrinting+'reporting/lapKartuPasienPulang?noRegistrasi='+"1611000153"+'&X-AUTH-TOKEN='+token;
                //window.open(urlPrinting+'reporting/lapBilling?noRegistrasi='+noReg+'&X-AUTH-TOKEN='+token, '_blank')
             },

            postupdatestatusconfirm: function(data){
              return r.post({
                url: baseTransaksi + "pelayanan/update-data-status-reservasi"
              },data)
            },

            postPelayananPetugasRad: function(data){
              return r.post({
                url: baseTransaksi + 'pelayananpetugas/save-ppasienpetugas-Rad'
              },data)
            },

           updateDokterLab: function(data){
              return r.post({
                url: baseTransaksi + "pelayananpetugas/update-ppasienpetugas-Lab"
              },data)
            },

            hapusHargaNettoProdukByKelas: function(data){
              return r.post({
                url: baseTransaksi + "tarif/hapus-harganetto"
              },data)
            },

            hapuscoa: function(data){
              return r.post({
                url: baseTransaksi + "master/hapus-master-coa"
              },data)
            },



       }
   }]);


});