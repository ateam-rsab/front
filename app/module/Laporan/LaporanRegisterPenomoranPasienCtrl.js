define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaporanRegisterPenomoranPasienCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien, manageTataRekening) {
              //Inisial Variable 
          $scope.isRouteLoading=false;
          $scope.dataVOloaded = true;
          $scope.now = new Date();
          $scope.dataSelected={};
          $scope.item={};
          $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
          $scope.listStatusKunjungan = [{ id: 1, names: "BARU" },
                                         { id: 2, names: "LAMA" }];
          $scope.item.statuskunjungan = $scope.listStatusKunjungan[0]
          $scope.CariRegistrasiPasien = function () {

              LoadData()
          }

          
          function LoadData() {  
            $scope.isRouteLoading = true;
              var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
              var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
              var tempRuanganId = "";
              if ($scope.item.ruangan != undefined) {
                  tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
              }
              var tempDepartemen = "";
              if ($scope.item.departement != undefined) {
                  tempDepartemen = "&idDept=" + $scope.item.departement.id;
              }
                  var statusKunjungan = "";
              if ($scope.item.statuskunjungan != undefined) {
                  statusKunjungan = "&statusKunjunganz=" + $scope.item.statuskunjungan.names;
              }
            //   var tempKelPasienId = "";
            //   if ($scope.item.namaPenjamin != undefined) {
            //       tempKelPasienId = "&kelompokPasien=" + $scope.item.namaPenjamin.id;
            //   }
            //   var tempRekananId = "";
            //   if ($scope.item.institusiAsalPasien != undefined) {
            //       tempRekananId = "&institusiAsalPasien=" + $scope.item.institusiAsalPasien.id;
            //   }  
              var chacePeriode = {
                  0: tglAwal,
                  1: tglAkhir
              }
              cacheHelper.set('LaporanRegisterPenomoranPasienCtrl', chacePeriode);
  
              modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-Reg-pasien?"
                  + "tglAwal=" + tglAwal
                  + "&tglAkhir=" + tglAkhir
                  + tempRuanganId
                  + tempDepartemen
                  + statusKunjungan
                      ).then(function (data) {
                           for (var i = 0; i < data.data.length; i++) {
                        data.data[i].no = i + 1
                  }
                      $scope.isRouteLoading = false;
                      $scope.ambildataexcel = data.data;
                      $scope.dataRegisterPenomoran=[];
                      $scope.ambildataexcel.forEach(function(data){
                        if(data.statusbaru == "V"){
                            data.statusbaru = "✓";
                         }else{
                            data.statusbaru = "✗";
                         }
                         
                         if(data.statuslama == "V"){
                            data.statuslama = "✓";
                         }else{
                            data.statuslama = "✗";
                         }
                        if(data.statusinap == "V"){
                            data.statusinap = "✓";
                         }else{
                            data.statusinap = "✗";
                         }
                       
                        $scope.dataRegisterPenomoran.push(data);
                    
                });
                      $scope.panggil($scope.ambildataexcel);


                      $scope.dataRegistrasiPasien = new kendo.data.DataSource({
                          data:   $scope.dataRegisterPenomoran,
                          pageSize: 20,
                          total: data.length,
                        //   template: dataRegistrasiPasien.indexOf(dataItem) + 1,
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
//    $scope.item.kunjungan = doubleTotal
//    $scope.item.pasien = doubleTotal
   $scope.panggil = function(cokot){
   
          $("#kGrid").kendoGrid({
            toolbar: ["excel"],
            excel: {
                fileName: "Laporan Register Penomoran Pasien.xlsx",
                filterable: true,
                allPages: true
            },
            dataSource: $scope.ambildataexcel,
            // filterable: true,
            pageable: true,
            resizable: true,
            scrollable: false,
            sortable: true,
            columns: [   { 
                                  field: "no", 
                                  title: "No",
                                   Template: "<span class='style-center'>#: no #</span>",
                                   width:"30px"
                              },
                          
                              { 
                                  field: "nocm", 
                                  title: "NO MR",
                                   Template: "<span class='style-center'>#: nocm #</span>",
                                   width:"100px"
                              },
                              {
                                  field: "NamaKeluarga", 
                                  title: "NAMA KELUARGA",
                                     Template: "<span class='style-center'>#: NamaKeluarga #</span>",
                                   width:"100px"
                              },
                              {
                                   field: "namapasien", 
                                   title: "NAMA PASIEN",
                                      Template: "<span class='style-center'>#: namapasien #</span>",
                                   width:"150px"
                              },                             
                              { 
                                  field: "jam", 
                                  title: "JAM",
                                     Template: "<span class='style-center'>#: jam #</span>",
                                   width:"40px"
                                  
                              },
                              {
                                field: "jeniskelamin", 
                                title: "L/P",
                                   Template: "<span class='style-center'>#: jeniskelamin #</span>",
                                   width:"40px"
                              },
                              {
                                field: "statusbaru", 
                                title: "BARU",
                                   Template: "<span class='style-center'>#: statusbaru #</span>",
                                   width:"40px"
                              },
                                {
                                field: "statuslama", 
                                title: "LAMA",
                                   Template: "<span class='style-center'>#: statuslama #</span>",
                                   width:"40px"
                              },
                              {
                                field: "statusinap", 
                                title: "INAP",
                                   Template: "<span class='style-center'>#: statusinap #</span>",
                                   width:"40px"
                              },
                              {
                                field: "namalengkap", 
                                title: "DOKTER",
                                   Template: "<span class='style-center'>#: namalengkap #</span>",
                                   width:"100px"
                              },
                              {
                                field: "namaruangan", 
                                title: "UNIT TUJUAN",
                                   Template: "<span class='style-center'>#: namaruangan #</span>",
                                   width:"100px"
                              }
              ]
             })
            };

          $scope.panggil();

          $scope.click = function (dataPasienSelected) {
              var data = dataPasienSelected;
              
          };
          $scope.formatTanggal = function (tanggal) {
              return moment(tanggal).format('DD-MMM-YYYY HH:mm');
          }
          $scope.formatRupiah = function (value, currency) {
              return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
          }

         
          $scope.Perbaharui = function () {
              $scope.ClearSearch();
          }
  
          //fungsi clear kriteria search
          $scope.ClearSearch = function () {
              $scope.item = {};
              $scope.item.tglawal = $scope.now;
              $scope.item.tglakhir = $scope.now;
              $scope.CariRegistrasiPasien();
          }
  
          manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
              $scope.listDepartemen = data.data.departemen;
              $scope.listKelompokPasien = data.data.kelompokpasien;
              
          })
  
          $scope.getIsiComboRuangan = function(){
              $scope.listRuangan = $scope.item.departement.ruangan
          }
  
          findPasien.getKelompokPasien().then(function(e) {
              $scope.kelompokPasiens = e.data.data
          })
          $scope.$watch('item.namaPenjamin', function(e){
              
              if (e === undefined) return;
              findPasien.getDataRekanan(e.id).then(function(data) {
                  $scope.sourceDataRekanan = data.data.data.listData;
                  $scope.item.institusiAsalPasien = $scope.sourceDataRekanan;
              });
              if(e.id==5 || e.id==3 ){
                  $scope.Perusahaan=true
              }else{
                  $scope.Perusahaan=false
                  $scope.item.institusiAsalPasien=""
              }
          })
  
          $scope.tglPelayanan = $scope.item.pelayanan;
          $scope.dokter = $scope.item.namaPegawai;
          
          
          $scope.date = new Date();
          var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
          
          //Tanggal Default
          $scope.item.tglawal = tanggals+" 00:00";
          $scope.item.tglakhir= tanggals+" 23:59";
         
          // Tanggal Inputan
          $scope.tglawal = $scope.item.tglawal;
          $scope.tglakhir = $scope.item.tglakhir;
          $scope.pegawai = modelItemAkuntansi.getPegawai();
          
          
          LoadData()
         
          }
      ]);
  });