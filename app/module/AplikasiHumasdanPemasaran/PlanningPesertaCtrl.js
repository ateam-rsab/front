define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('PlanningPesertaCtrl', ['$rootScope', '$mdDialog','$scope', 'ModelItem', 'ManageSdm',  'DateHelper','$state','InformasiPegawaiPenerima','InformasiJenisPetugas','InformasiAsalPeserta','InformasiRekanan','InformasiPegawaiTujuan','InformasiProdukDHM','InfoAsalTempat','InformasiRuangan',
    function($rootScope, $mdDialog, $scope, ModelItem, ManageSdm, DateHelper,$state,InformasiPegawaiPenerima,InformasiJenisPetugas,InformasiAsalPeserta,InformasiRekanan,InformasiPegawaiTujuan,InformasiProdukDHM,InfoAsalTempat,InformasiRuangan) {
      $scope.item = {};
      $scope.now = new Date();
       $scope.dataVOloaded = false;

        
        ManageSdm.getItem("planningdiklathumasmarketpeserta/get-list-all-planning-dhm", true).then(function(dat){
        $scope.dataMaster = dat.data.data;
        $scope.dataSource = new kendo.data.DataSource({
        pageSize: 5,
        data : $scope.dataMaster,
        autoSync: true,
          });
        });

       //Get Combo List Data

        InformasiPegawaiPenerima.getOrderList("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){      
        $scope.ListDataPegawai = dat.data.data.data;
        });

        InformasiPegawaiTujuan.getOrderList("planningdiklathumasmarketpeserta/get-list-all-pegawai", true).then(function(dat){
        $scope.ListDataPenanggungJawab = dat.data.data.data;
        $scope.ListDataPegawaiExec = dat.data.data.data;
        });

        InformasiJenisPetugas.getOrderList("planningdiklathumasmarketpeserta/get-list-jenispetugaspe", true).then(function(dat){
        $scope.ListDataJenisPe = dat.data.data.data;
        });

        InformasiAsalPeserta.getOrderList("planningdiklathumasmarketpeserta/get-list-asalpeserta", true).then(function(dat){
        $scope.ListDataAsalPeserta = dat.data.data.data;
       
        });
        InformasiRekanan.getOrderList("planningdiklathumasmarketpeserta/get-list-rekananpeserta", true).then(function(dat){
         
         $scope.ListDataRekanan = dat.data.data.data;
         $scope.ListNamaRekanan = dat.data.data.data;
        });

        InfoAsalTempat.getOrderList("/planningdiklathumasmarket/get-load-jenistempat",true).then(function(dat){
           debugger;  
           $scope.ListDataAsalTempat = dat.data.data.data;
       });

         InformasiRuangan.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
        $scope.ListDataRuangan = dat;

        });

         

      $scope.isShowPopUp = false;
      $scope.dataSelected = {};
      $scope.openWindow = function(){
      debugger;
      if ($scope.item.noPlannings==null){
        alert("Daftar Planning DHM Pelaksana Belum dipilih");
      }else{

       var myWindow = $("#winPopUp");
       myWindow.data("kendoWindow").open();
       $scope.isShowPopUp = true;
       }
      }

      $scope.closeWindow = function(){
        $scope.isShowPopUp = false;
      }


      $scope.hapusData = function(){
        //isi codingan buat hapus data
      }

      $scope.cancelData = function(){
        var myWindow = $("#winPopUp");
        myWindow.data("kendoWindow").close();

        //isi codingan buat cancel data yang di edit
      }

      $scope.reset = function(){

           $scope.item.noPlanning = "";
           $scope.item.produkDHM = "";
           $scope.item.tglplanning = "";
           $scope.item.namaLengkap = "";
           $scope.item.namaLengkap2 = "";
           $scope.item.deskripsitugas = "";
           $scope.item.jenispetugas = "";
           $scope.item.asalPeserta ="";
           $scope.item.rekananpeserta ="";
           $scope.item.namarekanan ="";
           $scope.item.keteranganplan ="";
           $scope.item.dataAktif ="";
           $scope.item.namaLengkap3 ="";
           $scope.item.keteranganlainnya ="";
      }

       $scope.$watch('item.desaKelurahan', function(e) {
                if (e === undefined) return;
                $scope.item.kodePos = e.kodePos;
                ModelItem.getDataDummyGeneric("Kecamatan", true, true, undefined, {
                    filter: {
                        field: "kdKecamatan",
                        operator: "equal",
                        value: e.kecamatan ? e.kecamatan.kdKecamatan : e.kecamatanId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kecamatan = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            })

             $scope.$watch('item.kecamatan', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("KotaKabupaten", true, true, undefined, {
                    filter: {
                        field: "kdKotaKabupaten",
                        operator: "equal",
                        value: e.propinsi ? e.kotaKabupaten.kdKotaKabupaten : e.kotaKabupatenId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.kotaKabupaten = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            });

            $scope.$watch('item.kotaKabupaten', function(e) {
                if (e === undefined) return;
                ModelItem.getDataDummyGeneric("Propinsi", true, true, undefined, {
                    filter: {
                        field: "kdPropinsi",
                        operator: "equal",
                        value: e.propinsi ? e.propinsi.kdPropinsi : e.propinsiId
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.propinsi = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            });
              $scope.findKodePos = function() {
                $scope.isBusy = true;
                if ($scope.item.kodePos === '' || $scope.item.kodePos === undefined) return;
                ModelItem.getDataDummyGeneric("DesaKelurahan", true, true, undefined, {
                    filter: {
                        field: "kodePos",
                        operator: "equal",
                        value: $scope.item.kodePos
                    }
                }, '*').then(function(e) {
                    e.fetch(function() {
                        $scope.isBusy = false;
                        if (this._data.length !== 0)
                            $scope.item.desaKelurahan = this._data[0];
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    })
                })
            }
            

  

       var arrFieldSelectVoKelurahan = ['id', 'namaDesaKelurahan', 'kecamatan', 'kodePos'];
      $scope.listDataKelurahan = ModelItem
          .kendoSource("DesaKelurahan", arrFieldSelectVoKelurahan, true);

      var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'kotaKabupaten'];
      ModelItem.getKendoSource("Kecamatan", arrFieldSelectVoKecamatan, true).then(function(data) {
          $scope.listDataKecamatan = data;
      });
      var arrFieldSelectVoKecamatan = ['id', 'namaExternal', 'propinsi'];
      ModelItem.getKendoSource("KotaKabupaten", arrFieldSelectVoKecamatan, true).then(function(data) {
          $scope.listDataKotaKabupaten = data;
      });

      arrFieldSelectVoKecamatan = ['id', 'namaExternal'];
      ModelItem.getKendoSource("Propinsi", arrFieldSelectVoKecamatan, true).then(function(data) {
          $scope.listDataPropinsi = data;
      });

  //      $scope.testo = function(){
  //       debugger;
  //       var genoplanning = $scope.item.noPlanning;
      
  //     if ($scope.item.noPlanning==null){
  //       alert("Daftar Rencana Pemasaran Harus Dipilih Terlebih dahulu !!");
  //         $scope.item.RuangTujuan="";
         
  //     }else{
  //           InformasiProdukDHM.getOrderList("/planningdiklathumasmarketpeserta/get-list-all-produkdkm-bynoplanning?noPlanning="+genoplanning, true).then(function(dat){      
  //           debugger;
  //            $scope.ListProduk = dat.data.data.data;
  //           });
  // }
  //     }
      

      $scope.columnDataUser = [
          

          {
            "field": "noPlanning",
            "title": "No Planning"
          },
          {
            "field": "namaPlanning",
            "title": "Nama Planning"
          },
          {
            "field": "deskripsi",
            "title": "Deskripsi Planning"
          },
          {
            "field": "tglPengajuan",
            "title": "Tanggal Pengajuan"
          }
          

          ];

           $scope.columnDataUser2 = [
          

          {
            "field": "",
            "title": "No Planning"
          },
          {
            "field": "",
            "title": "Kode Produk DHM,"
          },
          {
            "field": "",
            "title": "Tanggal Exec Awal"
          },
          {
            "field": "",
            "title": "Tanggal Exec Akhir"
          },
          {
            "field": "",
            "title": "Ruangan Exec"
          },
          {
            "field": "",
            "title": "Jenis Tempat Exec"
          },
          {
            "field": "",
            "title": "Alamat"
          },
          {
            "field": "",
            "title": "Jumlah Peserta"
          },
          {
            "field": "",
            "title": "Keterangan"
          }
          

          ];


      $scope.columnPelaksana = [
          
          {
            "field": "noPlanning",
            "title": "No Planning"
          },
          {
            "field": "kdProdukDHM",
            "title": "Kode Produk DHM"
          },
          {
            "field": "tglPlanning",
            "title": "Tanggal Planning"
          },
          {
            "field": "namaPegawai",
            "title": "Pegawai"
          },
           {
            "field": "isPetugasPeJawab",
            "title": "Petugas Penanggung Jawab",
             "template": "<span class='style-right'>{{pelayanans('#: isPetugasPeJawab #')}}</span>"
          },
           {
            "field": "dekripsiTugasFungsi",
            "title": "Deskripsi Tugas Fungsi"
          },
           {
            "field": "jenisPetugasPe",
            "title": "Jenis Petugas"
          },
          {
            "field": "asalPeserta",
            "title": "Asal Peserta"
          },
            {
            "field": "namaRekanan",
            "title": "Rekanan Peserta"
          },
        
           {
            "field": "ketPlanLain",
            "title": "Keterangan Plan Lain"
          },
           {
            "field": "namaLengkapExe",
            "title": "Pegawai Exec"
          },

           {
            "field": "ketExecLain",
            "title": "Keterangan Exec Lainnya"
          }
          
          ];

       $scope.dataModelGrid = {};

        $scope.cutiHabis = false;
        $scope.dataVOloaded = true;
        $scope.disJumlahCuti = true;
        $scope.hideJumlahCuti = false;
        $scope.showJumlahCuti = function () {
          if ($scope.item.statusPegawai.id == 1) {
            $scope.hideJumlahCuti = true;
            $scope.getCuti();
            
          } else {
            $scope.hideJumlahCuti = false;
          }
        }

      $scope.dataSelectedRow = {};
      $scope.sourceRencanaPemasaran = new kendo.data.DataSource({
        data: [{id:1}],
        pageSize : 10
      });
      
       $scope.pelayanans = function(values){
        var data=values;
        if (data==1){
            return 'Ya'
         }   
        else {
            return 'Tidak'
       }
       }

      var aktif = false;
      var aktif = 0;
      $scope.check = function () {
        debugger; 
        if (aktif)
        aktif = 0;

        else
        aktif = 1;    
      }

      $scope.save2 = function () {
        var listRawRequired = [
          "item.tglawalexec|ng-model|Tanggal Awal Exec",
          "item.tglakhirexec|k-ng-model|Tanggal Akhir Exrc",
          "item.ruangan|k-ng-model|Ruangan",
          "item.jenistempat|k-ng-model|Jenis Tempat",
          "item.kodePos|ng-model|Kode Pos",
          "item.desaKelurahan|k-ng-model|Desa Keluarahan",
          "item.kecamatan|k-ng-model|Kecamatan",
          "item.kotaKabupaten|k-ng-model|Kota Kabupatem",
          "item.propinsi|k-ng-model|Propinsi",
          "item.JumlahPeserta|k-ng-model|Qty Peserta",
          "item.keteranganexec|k-ng-model|Keterangan Exec",
          
          
        ];

        var isValid = ModelItem.setValidation($scope, listRawRequired);   

      debugger;
       var data2 = { 
        "noRec" : $scope.item.noRecDHM,
        "tglPlanningExecAwal" : $scope.item.tglawalexec,
        "tglPlanningExecAkhir" : $scope.item.tglakhirexec,
        "jenisTempatExec" : {"id" : $scope.item.jenistempat.idjenisTempat},
        "qtyPesertaExec" : $scope.item.JumlahPeserta,
        "ruanganExec" : {"id" : $scope.item.ruangan.id},
        "keteranganExecLainnya" : $scope.item.keteranganexec
        }
          ManageSdm.saveData(data2,"planningdiklathumasmarket/save-pelaksana-dhm").then(function(e) {
          console.log(JSON.stringify(e.data2));
         // $scope.klik();
          });
 

      }

      $scope.Save = function () {
      debugger;
      if ($scope.item.noPlanning==null){
        alert("No Planning Tidak Boleh Kosong!! Harap Pilih no planning di daftar rencana pemasaran!!");
      }else{

       var listRawRequired = [
          "item.noPlanning|ng-model|No Planning",
          "item.produkDHM|k-ng-model|Kode Produk DHM",
          "item.tglplanning|k-ng-model|Tanggal Pengajuan",
          "item.namaLengkap|k-ng-model|Pegawai",
          "item.jenispetugas|k-ng-model|Jenis Petugas",
          "item.asalPeserta|k-ng-model|Asal Peserta",
          "item.namarekanan|k-ng-model|Rekanan Peserta",
          "item.namaLengkap3|k-ng-model|Pegawai Exec",
          
          
        ];

        var isValid = ModelItem.setValidation($scope, listRawRequired);    


        var data = {
            "kdPegawai" : {"id" : $scope.item.namaLengkap.idpegawai},
            "tglPlanning" : $scope.item.tglplanning,
            "kdProdukDHM" : $scope.item.produkDHM.produkDHM,
            "noPlanning" : $scope.item.noPlanning,
            "kdJenisPetugasPe" : {"id" : $scope.item.jenispetugas.id},
            "deskripsiTugasFungsi" : $scope.item.deskripsitugas,
            // "kdJenisTempat" : {"id" : 1},
            "kdRekananPeserta" : {"id" : $scope.item.namarekanan.id},
            "namaRekananPeserta" : $scope.item.namarekanan.namaRekanan,
            "kdAsalPeserta" : {"id" : $scope.item.asalPeserta.id},
            "kdPegawaiExec" : {"id" : $scope.item.namaLengkap3.idpegawai},
            "keteranganExecLainnya" : $scope.item.keteranganlainnya,
            "keteranganPlanLainnya" : $scope.item.keteranganplan,
            "statusEnabled" : aktif,
            "isPetugasPePJawab" : $scope.item.pelayanan.id
                   }

            ManageSdm.saveData(data,"planningdiklathumasmarketpeserta/save-planning-dhm-peserta").then(function(e) {
            console.log(JSON.stringify(e.data));
            //$scope.klik();
            $scope.item.namaLengkap = "";
            $scope.item.tglplanning = "";
            $scope.item.produkDHM = "";
            $scope.item.jenispetugas = "";
            $scope.item.deskripsitugas = "";
            $scope.item.namarekanan = "";
            $scope.item.asalPeserta = "";
            $scope.item.namaLengkap3 = "";
            $scope.item.keteranganlainnya = "";
            $scope.item.keteranganplan = "";
            ManageSdm.getItem("planningdiklathumasmarketpeserta/get-list-bynoplanning?noPlanning="+$scope.item.noPlanning, true).then(function(dat){
            debugger;
            $scope.dataMaster2 = dat.data.data.data;
            $scope.dataSource = new kendo.data.DataSource({
            pageSize: 5,
            data : $scope.dataMaster2,
            autoSync: true,
              });
            });
            var myWindow = $("#winPopUp");
            myWindow.data("kendoWindow").close();

            });
            }}

            $scope.klik = function(dataSelected){
            debugger;
            $scope.showEdit = true;
            $scope.dataSelected = dataSelected;
            $scope.item.noPlanning = dataSelected.noPlanning;
            //$scope.item.norec = dataSelected2.noRec;
            InformasiProdukDHM.getOrderList("/planningdiklathumasmarketpeserta/get-list-all-produkdkm-bynoplanning?noPlanning="+dataSelected.noPlanning, true).then(function(dat){      
            debugger;
             $scope.ListProduk = dat.data.data.data;
            });
             ManageSdm.getItem("planningdiklathumasmarketpeserta/get-list-bynoplanning?noPlanning="+dataSelected.noPlanning, true).then(function(dat){
            debugger;
            $scope.dataMaster2 = dat.data.data.data;
            $scope.dataSource = new kendo.data.DataSource({
            pageSize: 5,
            data : $scope.dataMaster2,
            autoSync: true,
              });
            });
          
            };

             $scope.kliks = function(dataSelected2){
             $scope.item.noPlannings = dataSelected2.noPlanning;
             $scope.item.noProduk = dataSelected2.kdProdukDHM;
             $scope.item.noRecDHM = dataSelected2.noRecDHM;
             debugger;
            };
      
      }
    ]);
});