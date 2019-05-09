define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaporanRL3_13Ctrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien, manageTataRekening) {
              //Inisial Variable 
          $scope.isRouteLoading=false;
          $scope.dataVOloaded = true;
          $scope.now = new Date();
          $scope.dataSelected={};
          $scope.dataSelected1={};
          $scope.item={};
          // LoadData()
          $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));

          $scope.CariRegistrasiPasien = function () {
               // $scope.isRouteLoading = true;
              LoadData()
          }

          $scope.CariRegistrasiPasien1 = function () {
              $scope.isRouteLoading = true;
              LoadDatas()
          }

          function LoadData() {  
              $scope.isRouteLoading = true;
              // var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
              // var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');

              // var chacePeriode = {
              //     0: tglAwal,
              //     1: tglAkhir,
              // }
              // cacheHelper.set('LaporanRl3_13Ctrl', chacePeriode);
  
              modelItemAkuntansi.getDataTableTransaksi("laporan/get-pengadaan-obat?"
                  // + "tglAwal=" + tglAwal
                  // + "&tglAkhir=" + tglAkhir
                   ).then(function (data) {
                     $scope.isRouteLoading = false;
                    for (var i = 0; i < data.data.length; i++) {
                        data.data[i].no = i + 1
                    }
                     
                      $scope.ambildataexcel = data.data;
                      $scope.panggil($scope.ambildataexcel);
                      $scope.dataRL52 = new kendo.data.DataSource({
                          data: data.data,
                          pageSize: 10,
                          total: data.length,
                          serverPaging: false,
                          schema: {
                              model: {
                                  fields: {
                                  }
                              }
                          }
                      });

                  })

          }

          function LoadDatas() {  
              var tglAwal1 = moment($scope.item.tglawal1).format('YYYY-MM-DD HH:mm');
              var tglAkhir1 = moment($scope.item.tglakhir1).format('YYYY-MM-DD HH:mm');
              var chacePeriode = {
                  0: tglAwal1,
                  1: tglAkhir1,
              }
              cacheHelper.set('LaporanRl3_13Ctrl', chacePeriode);
  
                  modelItemAkuntansi.getDataTableTransaksi("laporan/get-pelayanan-resep?"
                  + "tglAwal=" + tglAwal1
                  + "&tglAkhir=" + tglAkhir1).then(function (data) {
                         $scope.isRouteLoading = false;
                    for (var i = 0; i < data.data.length; i++) {
                        data.data[i].no = i + 1
                    }
                 
                      $scope.getdataexcel = data.data;
                      $scope.callExcel($scope.calldataexcel);
                      $scope.dataRL3_13 = new kendo.data.DataSource({
                          data: data.data,
                          pageSize: 10,
                          total: data.length,
                          serverPaging: false,
                          schema: {
                              model: {
                                  fields: {
                                  }
                              }
                          }
                      });
                    

                  })
          }

   $scope.panggil = function(cokot){
   
          $("#kGrid").kendoGrid({
            toolbar: ["excel"],
            excel: {
                fileName: "Pengadaan Obat.xlsx",
                filterable: true,
                allPages: true
            },
            dataSource: $scope.ambildataexcel,
            // filterable: true,
            pageable: true,
            resizable: true,
            sortable: true,
            columns: [
                       {
                         title: "A.Pengadaan Obat",
                         Template: "<span class='style-left'>#: no #</span>",
                         columns: [
                          { 
                            field: "no", 
                            title: "No",
                            Template: "<span class='style-center'>#: no #</span>",
                            width:"50px"
                          },
                          { 
                            field: "detailobat",
                            title: "Golongan Obat"
                          },
                          { 
                            field: "jumlah",
                            title: "Jumlah Item Obat"
                          },
                          { 
                            field: "jumlahtersedia",
                            title: "Jumlah Item Obat Yang Tersedia Di Rumah Sakit"
                          },
                          { 
                            field: "jumlahfortersedia",
                            title: "Jumlah Item Obat Formulatorium Tersedia Di rumah Sakit"
                          }
                        ]
                      }
                    ] 
            });
          }
          $scope.panggil();

          $scope.callExcel = function(ambil){
   
          $("#kGrid1").kendoGrid({
            toolbar: ["excel"],
            excel: {
                fileName: "Pengadaan Obat.xlsx",
                filterable: true,
                allPages: true
            },
            dataSource: $scope.calldataexcel,
            // filterable: true,
             sortable: true,
            pageable: true,
            resizable: true,
            columns: [
                       {
                         title: "B.Penulisan dan Pelayanan Resep",
                         Template: "<span class='style-left'>#: no #</span>",
                         columns: [
                          { 
                            field: "no", 
                            title: "No",
                            Template: "<span class='style-center'>#: no #</span>",
                            width:"50px"
                          },
                          { 
                            field: "detailobat",
                            title: "Golongan Obat"
                          },
                          { 
                            field: "Jmlrj",
                            title: "Rawat Jalan"
                          },
                          { 
                            field: "JmlIGD",
                            title: "IGD"
                          },
                          { 
                            field: "JmlRawatInap",
                            title: "Rawat Inap"
                          }
                        ]
                      }
                    ] 
            });
          }
          $scope.callExcel();

         

          $scope.formatTanggal = function (tanggal) {
              return moment(tanggal).format('DD-MMM-YYYY HH:mm');
          }
          $scope.formatRupiah = function (value, currency) {
              return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
          }

          $scope.columnRL52 = [
                      {
                          title: "A.Pengadaan Obat",
                          Template: "<span class='style-left'>#: no #</span>",
                          columns: [
                          { 
                            field: "no", 
                            title: "No",
                            Template: "<span class='style-center'>#: no #</span>",
                            width:"50px"
                          },
                          { 
                            field: "",
                            title: "Golongan Obat"
                          },
                          { 
                            field: "",
                            title: "Jumlah Item Obat"
                          },
                          { 
                            field: "",
                            title: "Jumlah Item Obat Yang Tersedia DiRumah Sakit"
                          },
                          { 
                            field: "",
                            title: "Jumlah Item Obat Formulatorium Tersedia Dirumah Sakit"
                          }

                         ]
                      }     
          ];

          $scope.columnRL3_13 = [
                      {
                         title: "B.Penulisan dan Pelayanan Resep",
                         Template: "<span class='style-left'>#: no #</span>",
                         columns: [
                          { 
                            field: "no", 
                            title: "No",
                            Template: "<span class='style-center'>#: no #</span>",
                            width:"50px"
                          },
                          { 
                            field: "",
                            title: "Golongan Obat"
                          },
                          { 
                            field: "",
                            title: "Jumlah Item Obat"
                          },
                          { 
                            field: "",
                            title: "Jumlah Item Obat Yang Tersedia DiRumah Sakit"
                          },
                          { 
                            field: "",
                            title: "Jumlah Item Obat Formulatorium Tersedia Dirumah Sakit"
                          }
                        ]
                      }    
          ];

          $scope.Perbaharui = function () {
              $scope.ClearSearch();
          }
  
          //fungsi clear kriteria search
          $scope.ClearSearch = function () {
              $scope.item = {};
              
          //     $scope.CariRegistrasiPasien();
          }

          $scope.ClearSearch1 = function () {
              $scope.item = {};
              $scope.item.tglawal = $scope.now;
              $scope.item.tglakhir = $scope.now;
              // $scope.CariRegistrasiPasien1();
          }
  
        

          $scope.date = new Date();
          var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
          
          //Tanggal Default
          $scope.item.tglawal = tanggals+" 00:00";
          $scope.item.tglakhir= tanggals+" 23:59";
           $scope.item.tglawal1 = tanggals+" 00:00";
          $scope.item.tglakhir1= tanggals+" 23:59";
         
          // Tanggal Inputan
          $scope.tglawal = $scope.item.tglawal;
          $scope.tglakhir = $scope.item.tglakhir;
          $scope.tglawal1 = $scope.item.tglawal;
          $scope.tglakhir1 = $scope.item.tglakhir;
          $scope.pegawai = modelItemAkuntansi.getPegawai();
          
          
        
          }
      ]);
  });