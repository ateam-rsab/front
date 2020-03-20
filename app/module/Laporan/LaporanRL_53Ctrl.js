define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LaporanRL_53Ctrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien, manageTataRekening) {
              //Inisial Variable 
          $scope.isRouteLoading=false;
          $scope.dataVOloaded = true;
          $scope.now = new Date();
          $scope.dataSelected={};
          $scope.item={};
          $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
          //debugger
          $scope.CariRL53 = function () {
              $scope.isRouteLoading = true;
              LoadData()
          }

          
          function LoadData() {  
              var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
              var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
            //   var tempRuanganId = "";
            //   if ($scope.item.ruangan != undefined) {
            //       tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
            //   }
            //   var tempDepartemen = "";
            //   if ($scope.item.departement != undefined) {
            //       tempDepartemen = "&idDept=" + $scope.item.departement.id;
            //   }
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
              cacheHelper.set('LaporanRL_53Ctrl', chacePeriode);
  
              modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-RekamMedis-RL-53?"
                  + "tglAwal=" + tglAwal
                  + "&tglAkhir=" + tglAkhir
                //   + tempRuanganId
                //   + tempDepartemen
                //   + tempKelPasienId
                      ).then(function (data) {
                          debugger
                      $scope.isRouteLoading = false;
                   
                    //   debugger
                      $scope.ambildataexcel = data.data;
                      $scope.panggil($scope.ambildataexcel);
                      $scope.dataRL53 = new kendo.data.DataSource({
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
                fileName: "RL53.xlsx",
                filterable: true,
                allPages: true,
            },
            dataSource: $scope.ambildataexcel,
            filterable: true,
            resizable: true,
                sortable: true,
                // reorderable: true,
                // filterable: true,
                pageable: true,
                // groupable: true,
                // columnMenu: true,
                // resizable: true,
             
            columns: [
                              { 
                                  field: "kddiagnosa", 
                                  title: "Kode ICD 10"
                              },
                              {
                                  field: "namadiagnosa", 
                                  title: "Deskripsi"
                              },
                              { 
                                  title: "Pasien Keluar Hidup Menurut Jenis Kelamin",
                                  headerAttributes:{style:"text-align : center"},
                                  columns:[
                                    {
                                        "field":"jumlahLKH",
                                        "title":"Laki-laki"
                                    },
                                    {
                                        "field":"jumlahPRH",
                                        "title":"Perempuan"
                                    }
                                  ]                                                              
                              },
                              { 
                                  title: "Pasien Keluar Meninggal Menurut Jenis Kelamin",
                                  headerAttributes:{style:"text-align : center"},    
                                  columns:[
                                    {
                                        "field":"jumlahLKM",
                                        "title":"Laki-laki"
                                    },
                                    {
                                        "field":"jumlahPRM",
                                        "title":"Perempuan"
                                    }
                                  ]                              
                              },
                              { 
                                  field: "jumlah", 
                                  title: "Total (Hidup & Mati)"
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
          
          $scope.createColumn = function () {
            var list = [
                {
                    "field":"jumlahLKH",
                    "title":"LK"
                },
                {
                    "field":"jumlahPRH",
                    "title":"LP"
                }
            ];

            return list;
          };

          $scope.createColumn1 = function () {
            var list = [
                {
                    "field":"jumlahLKM",
                    "title":"LK"
                },
                {
                    "field":"jumlahPRM",
                    "title":"LP"
                }
            ];

            return list;
          };

          $scope.columndataRL53 = [
  
              {
                  "field":"kddiagnosa",
                  "title":"Kode ICD 10",
                  "width":"150px",
                  "align":"center"
              },
              {
                  "field": "namadiagnosa",
                  "title": "<center>Deskripsi</center>",
                  "width": "150px"               
              },
              {
                title: "<center>Pasien Keluar Hidup Menurut Jenis Kelamin</center>",
                columns: $scope.createColumn()
              },
              {
                title: "<center>Pasien Keluar Meninggal Menurut Jenis Kelamin</center>",
                columns: $scope.createColumn1()
              },
              {
                  "field": "jumlah",
                  "title": "<center>Total (Hidup & Mati)</center>",
                  "width": "180px"              
              }            
          ];
  
          $scope.Perbaharui = function () {
              $scope.ClearSearch();
          }
  
          //fungsi clear kriteria search
          $scope.ClearSearch = function () {
              $scope.item = {};
              $scope.item.tglawal = $scope.now;
              $scope.item.tglakhir = $scope.now;
              $scope.CariLapPasienPulang();
          }
  
          var HttpClient = function() {
              this.get = function(aUrl, aCallback) {
                  var anHttpRequest = new XMLHttpRequest();
                  anHttpRequest.onreadystatechange = function() { 
                      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                          aCallback(anHttpRequest.responseText);
                  }
  
                  anHttpRequest.open( "GET", aUrl, true );            
                  anHttpRequest.send( null );
              }
          }
          //sdm service hanya sementara, nanti harus diganti pake service kasir !!
  
          // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat) {
          // $scope.listRuangan = dat.data;
          // });
          manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function(data) {
              $scope.listDepartemen = data.data.departemen;
              $scope.listKelompokPasien = data.data.kelompokpasien;
          })
  
          $scope.getIsiComboRuangan = function(){
              $scope.listRuangan = $scope.item.departement.ruangan
          }
  
          // ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function(dat) {
          // $scope.listPasien = dat.data;
          // });
          // manageLogistikPhp.getDataTableTransaksi("kasir/laporan-penerimaan-kasir-datacombo", true).then(function(dat){
          //     //debugger
          //     //$scope.listPegawai = dat.data.dataDokter;
          //     $scope.listRuangan = dat.data.dataruangan;
          //     //$scope.listPegawaiKasir = dat.data.datakasir;
          //     //$scope.dataLogin = dat.data.datalogin[0];
          //     $scope.listKelompokPasien = dat.data.datakelompokpasien;
          // });
          findPasien.getKelompokPasien().then(function(e) {
              $scope.kelompokPasiens = e.data.data
          })
          $scope.$watch('item.namaPenjamin', function(e){
              //debugger
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
  
          $scope.listDataFormat = [
               {
               "id":1, "format":"pdf"
               },
               {
                "id":2, "format":"xls"
               }
          ];
          
          
          $scope.date = new Date();
          var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
          
          //Tanggal Default
          $scope.item.tglawal = tanggals+" 00:00";
          $scope.item.tglakhir= tanggals+" 12:59";
         
          // Tanggal Inputan
          $scope.tglawal = $scope.item.tglawal;
          $scope.tglakhir = $scope.item.tglakhir;
          $scope.pegawai = modelItemAkuntansi.getPegawai();
          
          //excel
          var myApp=angular.module("myApp",[]);
          myApp.factory('Excel',function($window){
                  var uri='data:application/vnd.ms-excel;base64,',
                      template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                      base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
                      format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
                  return {
                      tableToExcel:function(tableId,worksheetName){
                          var table=$(tableId),
                              ctx={worksheet:worksheetName,table:table.html()},
                              href=uri+base64(format(template,ctx));
                          return href;
                      }
                  };
              })
              .controller('MyCtrl',function(Excel,$timeout,$scope){
                $scope.exportToExcel=function(tableId){ // ex: '#my-table'
                      var exportHref=Excel.tableToExcel(tableId,'WireWorkbenchDataExport');
                      $timeout(function(){location.href=exportHref;},100); // trigger download
                  }
              });
          

          $scope.Cetak = function() {
          // if($scope.item.format == undefined){
          // 	alert('format file harus dipilih terlebih dahulu !!!')
          // }
              if($scope.item.tglawal == $scope.tglawal)
                  var tglawal = $scope.item.tglawal;
              else
                  var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
              if($scope.item.tglakhir == $scope.tglakhir)
                  var tglakhir = $scope.item.tglakhir;
              else
                  var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
              if($scope.item.departement == undefined)
                  var departement = "";
              else
                  var departement = $scope.item.departement.id;
              if($scope.item.namaPenjamin == undefined)
                  var kelompokPasien = "";
              else
                  var kelompokPasien = $scope.item.namaPenjamin.id;
              if($scope.item.ruangan == undefined)
                  var ruangan = "";
              else
                  var ruangan = $scope.item.ruangan.id;
              if($scope.item.institusiAsalPasien == undefined || $scope.item.institusiAsalPasien.id == undefined)
                  var perusahaan = "";
              else
                  var perusahaan = $scope.item.institusiAsalPasien.id;
              var stt = 'false'
              if (confirm('View Laporan Pasien Pulang? ')){
                  // Save it!
                  stt='true';
              }else {
                  // Do nothing!
                  stt='false'
              }
              var client = new HttpClient();        
              client.get('http://127.0.0.1:1237/printvb/kasir?cetak-LaporanPasienPulang=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdDepartement='+departement+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+$scope.pegawai.id+'&strIdPerusahaan='+perusahaan+'&view='+ stt, function(response) {
                  // do something with response
              });
              // if(client.status==0){
              //     if($scope.item.format == undefined){
              //         alert('format file harus dipilih terlebih dahulu !!!');
              //     }else{
              //         var urlLaporan = ReportPelayanan.open('preporting/lapPelayananPasien?startDate=''+tglawal+'+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdDepartement='+departement+'&strIdKelompokPasien='+kelompokPasien+'&strIdDokter='+namaPegawai+'&format='+$scope.item.format.format);
              //         window.open(urlLaporan, '_blank');
              //     }
              // }   
          }
         
          }
      ]);
  });