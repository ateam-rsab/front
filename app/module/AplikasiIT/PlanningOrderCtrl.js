define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('PlanningOrderCtrl', ['$rootScope', '$mdDialog','$scope', 'ModelItem', 'ManageSdm',  'DateHelper','$state','InformasiPegawaiPenerima','InformasiJenisPetugas','InformasiAsalPeserta','InformasiRekanan','InformasiPegawaiTujuan',
    function($rootScope, $mdDialog, $scope, ModelItem, ManageSdm, DateHelper,$state,InformasiPegawaiPenerima,InformasiJenisPetugas,InformasiAsalPeserta,InformasiRekanan,InformasiPegawaiTujuan) {
      $scope.item = {};
      $scope.now = new Date();
       $scope.dataVOloaded = false;
       $scope.item.tglplanning = $scope.now;
       $scope.item.tglfinishing = $scope.now;
       $scope.item.tglqa = $scope.now;  
       $scope.item.tglexpose = $scope.now;
       $scope.item.tgldelivery = $scope.now;
       $scope.item.tgltraining = $scope.now;

    //Daftar Stuk Order
    $scope.InitDaftarStruk = function(){
    $scope.item.CariStruk = "";
      ManageSdm.getOrderList("orderpelayanansistem/get-order-sistem-all", true).then(function (dat) {
        var nomors = 1;
            $scope.GetDaftarStrukOrder = dat.data.data.data;
            $scope.GetDaftarStrukOrder.forEach(function(DataStruk){
              DataStruk.no = nomors++
            })
            $scope.daftarJabatan = new kendo.data.DataSource({ 
             data: $scope.GetDaftarStrukOrder
            });
      });
    }
    $scope.InitDaftarStruk();

    $scope.$watch('item.CariPlanning', function(dummyCari) {
            var q = dummyCari;
            var grid2 = $("#gridPlanning").data("kendoGrid");
            grid2.dataSource.query({
              pageSize:20,
              page:1,
              filter:{
                     logic:"or",
                       filters:[
                                 {field:"noPlanning", operator:"contains",value:q},
                                 {field:"noOrder", operator:"contains",value:q},
                                 {field:"namaProduk", operator:"contains",value:q}
                               ]
              }
            })
        });

    $scope.$watch('item.CariStruk', function(AlirinData) {
        var q = AlirinData;
        var grid = $("#kGrid").data("kendoGrid");
        grid.dataSource.query({
          pageSize:20,
          page:1,
          filter:{
                 logic:"or",
                   filters:[
                             {field:"noOrder", operator:"contains",value:q},
                             {field:"nmProduk", operator:"contains",value:q},
                             {field:"namaRuangan", operator:"contains",value:q}
                           ]
          }
        })
    });   


     
      $scope.ClearCari = function(){
        $scope.item.CariStruk = "";
          var gridData = $("#kGrid").data("kendoGrid");
          gridData.dataSource.filter({});
      }


      $scope.columnDataUser = [
          {
            "field": "no",
            "title": "<h3 align=center>No.<h3>",
            "width": "30px"
          },          
          {
            "field": "noOrder",
            "title": "<h3 align=center>No Order<h3>"
          },
          {
            "field": "nmProduk",
            "title": "<h3 align=center>Produk<h3>"
          },
          {
            "field": "namaRuangan",
            "title": "<h3 align=center>Nama Ruangan Asal<h3>"
          },
          {
            "field": "namaRuanganTujuan",
            "title": "<h3 align=center>Nama Ruangan Tujuan<h3>"
          }
      ];

      $scope.ClearPlanning = function(){
          $scope.item.CariPlanning = "";
           var gridData  = $("#gridPlanning").data("kendoGrid");
          gridData.dataSource.filter({});
      }

        

       //Refresh Daftar Exec
       $scope.penyegaran = function(){
         ManageSdm.getItem("planningpelayanansistempetugas/get-load-pelayanan-sistem-petugas", true).then(function(dat){
          var Nomors = 1;
          $scope.dataMaster2 = dat.data.data.data;
          for(var i=0; i<$scope.dataMaster2.length; i++){
            $scope.dataMaster2[i].no = Nomors++;
          }
          $scope.dataSource = new kendo.data.DataSource({
          pageSize: 5,
          data : $scope.dataMaster2,
          autoSync: true,
          
            });
          });
        }

        //Daftar Exec (pelayanan yang sudah di exec)
        $scope.daftarpetugas = function(){
        $scope.exec=true;
        ManageSdm.getItem("planningpelayanansistempetugas/get-load-pelayanan-sistem-petugas", true).then(function(dat){
        debugger;
        var number = 1;
        $scope.dataMaster2 = dat.data.data.data;
        for (var i = 0; i < $scope.dataMaster2.length; i++) {
          $scope.dataMaster2[i].no = number++;
        }

        $scope.dataSource = new kendo.data.DataSource({
        pageSize: 5,
        data : $scope.dataMaster2,
        autoSync: true,
        schema: {
                   model: {
                            fields: {
                                      noPlanning: { editable: false },
                                      noOrder: { editable: false },
                                      namaProduk: { editable: false },
                                      ruanganAsal: { editable: true },
                                      ruanganTujuan: { editable: false },
                                      namaExec: { editable: false },
                                      tglFinisExec: { editable: false }
                                      }
                                  }
                              },
          });
        });


        $scope.columnPermohonanPerubahanStatus2 = [
          {
            "field" : "no",
            "title" : "<h3 align=center>No<h3>",
            'width' : "40px"
          },
          {
            "field": "noPlanning",
            "title": "<h3 align=center>No Planning<h3>"
          },
          {
            "field": "noOrder",
            "title": "<h3 align=center>No Order<h3>"
          },

          {
            "field": "namaProduk",
            "title": "<h3 align=center>Produk<h3>"
          },
          {
            "field": "ruanganAsal",
            "title": "<h3 align=center>Ruangan Asal<h3>"
          },
           {
            "field": "ruanganTujuan",
            "title": "<h3 align=center>Ruangan Tujuan<h3>"
          },
           
           {
            "field": "namaExec",
            "title": "<h3 align=center>Petugas Exec<h3>"
          },
           {
            "field": "tglFinisExec",
            "title": "<h3 align=center>Tanggal Finish Exec<h3>",
             "template": "#= new moment(new Date(tglFinisExec)).format('DD-MM-YYYY') #"
          }
      
          ];
      }


        $scope.tutup = function(){
          $scope.exec=false;
        }

       ManageSdm.getItem("planningpelayanansistem/get-load-noplanning-desc", true).then(function(dat){
        debugger;
        $scope.item.noPlanning = dat.data.data.data[0].noPlanning;
      
        });
        
       ManageSdm.getItem("orderpelayanansistem/get-load-rungan-tujuan", true).then(function(dat){
      $scope.listRuangan = dat.data.data.data;
      
      });
       
       

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

       

      $scope.isShowPopUp = false;
      $scope.dataSelected = {};


       $scope.eksekusi = function(){
      debugger;
      if ($scope.item.noPlanning3==null){
        alert("Daftar Planning Pelayanan Sistem Belum dipilih");
      }else{

       var myWindow = $("#winPopUp");
       myWindow.data("kendoWindow").open();
       $scope.isShowPopUp = true;
       }
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

   //Daftar Planning Pelayanan Sistem
      $scope.refresh = function(){
        $scope.numbr = 1;
          ManageSdm.getItem("/planningpelayanansistem/get-load-allplanning-sistem", true).then(function(dat){
          $scope.dataMaster = dat.data.data.data;
          $scope.dataMaster.forEach(function(e){
            e.no = $scope.numbr++
          })
          $scope.dataSource = new kendo.data.DataSource({
          pageSize: 5,
          data : $scope.dataMaster,
          autoSync: true,
            });
          });
      }




        //Daftar Planning Pelayanan Sistem
        ManageSdm.getItem("/planningpelayanansistem/get-load-allplanning-sistem", true).then(function(dat){
        debugger
        var nomors = 1;
        $scope.dataMaster = dat.data.data.data;
        $scope.dataMaster.forEach(function(e){
          debugger
          e.no = nomors++
        })
        $scope.dataSource = new kendo.data.DataSource({
        pageSize: 5,
        data : $scope.dataMaster,
        autoSync: true,
          });
        });
       
         $scope.columnPermohonanPerubahanStatus = [
          {
            "field" :"no",
            "title" :"<h3 align=center>No.<h3>",
            "width" : "40px"
          },
          {
            "field": "noPlanning",
            "title": "<h3 align=center>No Planning<h3>"
          },
          {
            "field": "noOrder",
            "title": "<h3 align=center>No Order<h3>"
          },

          {
            "field": "namaProduk",
            "title": "<h3 align=center>Produk<h3>"
          },
           {
            "field": "detailPelayananSistem",
            "title": "<h3 align=center>Detail Pelayanan Sistem<h3>"
          },
           {
            "field": "tlgPlanning",
            "title": "<h3 align=center>Tanggal Planning<h3>",
            "template": "#= new moment(new Date(tlgPlanning)).format('DD-MM-YYYY') #"
          },
           {
            "field": "tglFinishPlanning",
            "title": "<h3 align=center>Tanggal Finish Planning<h3>",
            "template": "#= new moment(new Date(tglFinishPlanning)).format('DD-MM-YYYY') #"
          },
           {
            "field": "tglQAPlanning",
            "title": "<h3 align=center>Tangal QA Planning<h3>",
            "template": "#= new moment(new Date(tglQAPlanning)).format('DD-MM-YYYY') #"
          },
           {
            "field": "tglExposePlanning",
            "title": "<h3 align=center>Tanggal Expose Planning<h3>",
            "template": "#= new moment(new Date(tglExposePlanning)).format('DD-MM-YYYY') #"
          },
           {
            "field": "tglDeliveryPlanning",
            "title": "<h3 align=center>Tanggal Delivery Planning<h3>",
            "template": "#= new moment(new Date(tglDeliveryPlanning)).format('DD-MM-YYYY') #"
          },
          {
            "field": "tglTrainingPlanning",
            "title": "<h3 align=center>Tanggal Training Planning<h3>",
            "template": "#= new moment(new Date(tglTrainingPlanning)).format('DD-MM-YYYY') #"
          },
          {
            "field":"ketLain",
            "title":"<h3 align=center>Keterangan Lainnya<h3>"

          }
          ];
          
         
         


          
       $scope.dataModelGrid = {};

        $scope.cutiHabis = false;
        $scope.dataVOloaded = true;
       
       

        $scope.dataSelectedRow = {};
        $scope.sourceRencanaPemasaran = new kendo.data.DataSource({
          data: [{id:1}],
          pageSize : 10
        });
         $scope.cancelData = function(){
        var myWindow = $("#winPopUp");
        myWindow.data("kendoWindow").close();

        //isi codingan buat cancel data yang di edit
      }

      $scope.getProduk = function(){
      if ($scope.item.noOrder==null){
        alert("Pilih Daftar Struk Order Terlebih dahulu !!");
          $scope.item.RuangTujuan="";
         
      }else{
       ManageSdm.getItem("orderpelayanansistem/get-load-rungan-tujuan", true).then(function(dat){
     
      $scope.listRuangan = dat.data.data.data;
     
      });
       
  }
      }

         $scope.klik = function(dataSelected){
              debugger;
              $scope.showEdit = true;
              $scope.dataSelected = dataSelected;
              $scope.item.noOrder = dataSelected.noOrder;
              $scope.item.produk = dataSelected.nmProduk;
              $scope.item.NoRec = dataSelected.noRec;
              $scope.item.noRecOP = dataSelected.noRecOP;
              $scope.item.idProduk = dataSelected.idProduk;
              $scope.item.idRuanganTujuan = dataSelected.idRuanganTujuan;
              $scope.item.idRuangan = dataSelected.idRuangan;
            };

            $scope.kliks = function(dataSelected2){
            debugger;
             $scope.dataSelected2 = dataSelected2;
             // $scope.item.tglplanexec2 = DateHelper.getPeriodeFormatted(dataSelected2.tlgPlanning);
             $scope.item.tglplan = new moment(dataSelected2.tlgPlanning).format('YYYY-MM-DD');
             $scope.item.tglplanexec2 = new moment(dataSelected2.tlgPlanning).format('YYYY-MM-DD');
             $scope.item.tglqaexec2 = new moment(dataSelected2.tglQAPlanning).format('YYYY-MM-DD');
             $scope.item.tglexposeexec2 = new moment(dataSelected2.tglExposePlanning).format('YYYY-MM-DD');
             $scope.item.tgldeliveryexec2 = new moment(dataSelected2.tglDeliveryPlanning).format('YYYY-MM-DD');
             $scope.item.tgltrainingexec2 = new moment(dataSelected2.tglTrainingPlanning).format('YYYY-MM-DD');
             $scope.item.finishecex2 =new moment(dataSelected2.tglFinishPlanning).format('YYYY-MM-DD');
             $scope.item.noPlanning3 = dataSelected2.noPlanning;
             $scope.item.noRecSO = dataSelected2.noRecSO;
             $scope.item.noRecPlanningSI = dataSelected2.noRecPlanningSI;
             $scope.item.noRecStrukPlanning = dataSelected2.noRecStrukPlanning;
             $scope.item.idProduk = dataSelected2.idProduk;
            };
        
    
      var aktif = false;
       var aktif = 0;
      $scope.check = function () {
        debugger; 
        if (aktif)
          aktif = 0;

        else
          aktif = 1;    
      
      }

      $scope.Save=function(){
        if($scope.item.noOrder == undefined){
           window.messageContainer.error("No Order Belum Dipilih");
        }else if($scope.item.RuangTujuan == undefined){
          window.messageContainer.error("Ruangan Asal Belum Dipilih");
        }else{
          var confirm = $mdDialog.confirm()
                .title('Peringatan!')
                .textContent('Apakah anda yakin akan menyimpan data ini?')
                .ariaLabel('Lucky day')
                .ok('Ya')
                .cancel('Tidak')

          $mdDialog.show(confirm).then(function() {
              $scope.Simpan();
          })
        }
      };


     

      $scope.save2=function(){
        debugger;
        var data={
                  "kdNoPlanning" : {"noRec" : $scope.item.noRecStrukPlanning},
                  "kdNoOrder" : {"noRec" : $scope.item.noRecSO},
                  "kdProduk" : {"id" : $scope.item.idProduk},
                  "tglPlanning" : $scope.item.tglplan,
                  "kdPegawai" : {"id" : $scope.item.namaLengkap2.idpegawai},
                  "kdJenisPetugasPe" : {"id" : $scope.item.jenispetugas.id},
                  "isPetugasPePJawab" : 1,
                  "deskripsiTugasFungsi" : $scope.item.deskripsi2,
                  "kdPegawaiExec" : {"id" : $scope.item.namaLengkap2.idpegawai},
                  "tglPlanningExec" : $scope.item.tglplanexec2,
                  "tglFinishExec" : $scope.item.finishecex2,
                  "statusEnabled" : 1
                }
        ManageSdm.saveData(data,"planningpelayanansistempetugas/save-planning-peyanan-sistem-petugas").then(function(e) {
        console.log(JSON.stringify(e.data));
       $scope.penyegaran();
        });
        var myWindow = $("#winPopUp");
        myWindow.data("kendoWindow").close();
        };


    
      $scope.Simpan = function () {
      debugger;
      var listRawRequired = [
          "item.tglplanning|k-ng-model|Tanggal Planning",
          "item.keterangan|ng-model|Keterangan",
          "item.detailpelayanan|ng-model|Detail Pelayanan",
          "item.kdNoOrder|ng-model|No Order",
           "item.kdProduk|ng-model|No Produk",
          "item.tglfinishing|k-ng-model|Tanggal Finishing Planning",
          "item.tglPlanningExec|k-ng-model|Tanggal Planning Exekusi",
          "item.tglqa|k-ng-model|Tanggal QA Planning",
          "item.tglexpose|k-ng-model|Tanggal Expose Planning",
          "item.tgltraining|k-ng-model|Tanggal Training Planning",
          "item.tgldelivery|k-ng-model|Tanggal Delivery Planning",
          "item.kdruangan|k-ng-model|Kode Ruangan Tujuan",
          "item.kdruanganasal|k-ng-model|Kode Ruangan Asal"
         
        ];
         var isValid = ModelItem.setValidation($scope, listRawRequired);
          var data =   { 
                          "noPlanning" : "PP17060001",
                          "tglPlanning" : $scope.item.tglplanning,
                          "keteranganLainnya" : $scope.item.keterangan,
                          "detailPelayananSistem" : $scope.item.detailpelayanan,
                          "kdNoOrder" : {"noRec" : $scope.item.NoRec},
                          "kdProduk" : {"id" : $scope.item.idProduk},
                          "tglFinishPlanning" : $scope.item.tglfinishing,
                          "tglPlanningExec" : $scope.item.tglplanning,
                          "tglQAPlanning" : $scope.item.tglqa,
                          "tglExposePlanning" : $scope.item.tglexpose,
                          "tglDeliveryPlanning" : $scope.item.tgldelivery,
                          "tglTrainingPlanning" :  $scope.item.tgltraining,
                          "strukPlanning" : { 
                              "kdruangan" : {"id" : $scope.item.idRuanganTujuan},
                              "kdruanganasal" : {"id" : $scope.item.idRuangan}
                          }
                      } 
 
 

        ManageSdm.saveData(data,"planningpelayanansistem/save-planning-sistem").then(function(e) {
          console.log(JSON.stringify(e.data));
          $scope.refresh();
          $scope.item.tglplanning ="";
          $scope.item.keterangan ="";
          $scope.item.detailpelayanan ="";
          $scope.item.tglfinishing ="";
          $scope.item.tglplanning ="";
          $scope.item.tglqa ="";
          $scope.item.tglexpose ="";
          $scope.item.tgldelivery ="";
          $scope.item.tgltraining ="";
        });

        ManageSdm.getItem("planningpelayanansistem/get-load-noplanning-desc", true).then(function(dat){
            $scope.item.noPlanning = dat.data.data.data[0].noPlanning;
            $scope.item.tglplanning = $scope.now;
            $scope.item.tglfinishing = $scope.now;
            $scope.item.tglqa = $scope.now;  
            $scope.item.tglexpose = $scope.now;
            $scope.item.tgldelivery = $scope.now;
            $scope.item.tgltraining = $scope.now;

        });
 

      }

          var removeA = function (arr) {
              var what, a = arguments, L = a.length, ax;
              while (L > 1 && arr.length) {
                  what = a[--L];
                  while ((ax= arr.indexOf(what)) !== -1) {
                      arr.splice(ax, 1);
                  }
              }
              return arr;
          }


      
      }
    ]);
});