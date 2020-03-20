define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SurveilansKasusPtmRJCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien, manageTataRekening) {
              //Inisial Variable 
          $scope.isRouteLoading=false;
          $scope.dataVOloaded = true;
          $scope.now = new Date();
          $scope.dataSelected={};
          $scope.item={};
          $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
          //
          $scope.CariRegistrasiPasien = function () {
              $scope.isRouteLoading = true;
              LoadData()
          }

          
          function LoadData() {  
              var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
              var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
              var chacePeriode = {
                  0: tglAwal,
                  1: tglAkhir
              }
              cacheHelper.set('SurveilansKasusPtmRJCtrl', chacePeriode);
  
              modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-surveilans-rajal?"
                  + "tglAwal=" + tglAwal
                  + "&tglAkhir=" + tglAkhir
                //   + tempRuanganId
                //   + tempDepartemen
                //   + tempKelPasienId
                      ).then(function (data) {
                          
                      $scope.isRouteLoading = false;
                      var doubleTotal = 0;
                      var doubleKarcis = 0;
                      for (var i = 0; i < data.data.length; i++) {
                          doubleTotal = doubleTotal + parseFloat(data.data[i].total)
                          doubleKarcis = doubleKarcis + parseFloat(data.data[i].karcis)
                      }
                      
                      $scope.ambildataexcel = data.data;
                      $scope.panggil($scope.ambildataexcel);
                      $scope.dataSurveilan = new kendo.data.DataSource({
                          data: data.data,
                          pageSize: 10,
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
   $scope.panggil = function(cokot){
   
          $("#kGrid").kendoGrid({
            toolbar: ["excel"],
            excel: {
                fileName: "Surveilans Kasus PTM Dari Rumah Sakit.xlsx",
                filterable: true,
                allPages: true
            },
            dataSource: $scope.ambildataexcel,
            scrollable: true,
            filterable: true,
            pageable: true,
            // resizable: true,
            columns: [
                { 
                    field: "golongansebabpenyakit", 
                    title: "NAMA PENYAKIT",
                    template: "<span class='style-center'>#: golongansebabpenyakit #</span>",
                    // headerAttributes:{style:"align; text-align : center"},
                    width: "150px"
                },
                {
                    field: "kddiagnosa", 
                    title: "ICD X",
                    width: "80px",
                    template: "<span class='style-center'>#: kddiagnosa #</span>",

                    // headerAttributes:{style:"align; text-align : center"}
                },
                {
                    title: "JUMLAH KASUS RAWAT INAP",
                    headerAttributes:{style:"text-align : center"},
                    columns:[
                        { 
                            field: "", 
                            title: "GOLONGAN UMUR",
                            headerAttributes:{style:"text-align : center"},
                            columns:[
                                { 
                                    field: "", 
                                    title: "< 1 Tahun",
                                    headerAttributes:{style:"text-align : center"},
                                    columns:[
                                        {
                                            "field":"jmlOrokL",
                                            "title":"L",
                                               width: "40px",
                                        },
                                        {
                                            "field":"jmlOrokP",
                                            "title":"P",
                                               width: "40px",
                                        }
                                      ]  
                                    
                                },
                                { 
                                    field: "", 
                                    title: "1 - 4 Tahun",
                                    width: "50px",
                                    headerAttributes:{style:"text-align : center"},
                                    columns:[
                                        {
                                            "field":"jmlbalitaL",
                                            "title":"L",
                                               width: "40px",
                                        },
                                        {
                                            "field":"jmlbalitaP",
                                            "title":"P",
                                               width: "40px",
                                        }
                                      ]  
                                },
                                { 
                                    field: "", 
                                    title: "5 - 14 Tahun",
                                    headerAttributes:{style:"text-align : center"},
                                    columns:[
                                        {
                                            "field":"jmlanakL",
                                            "title":"L",
                                               width: "40px",
                                        },
                                        {
                                            "field":"jmlanakP",
                                            "title":"P",
                                               width: "40px",
                                        }
                                      ]  
                                },
                                { 
                                    field: "", 
                                    title: "15 - 24 Tahun",
                                    headerAttributes:{style:"text-align : center"},
                                    columns:[
                                        {
                                            "field":"jmlRemajaL",
                                            "title":"L",
                                               width: "40px",
                                        },
                                        {
                                            "field":"jmlRemajaP",
                                            "title":"P",
                                               width: "40px",
                                        }
                                      ]  
                                },
                                { 
                                    field: "", 
                                    title: "25 - 44 Tahun",
                                    headerAttributes:{style:"text-align : center"},
                                    columns:[
                                        {
                                            "field":"jmlDewasaL",
                                            "title":"L",
                                               width: "40px",
                                        },
                                        {
                                            "field":"jmlDewasaP",
                                            "title":"P",
                                               width: "40px",
                                        }
                                      ]  
                                },
                                { 
                                    field: "", 
                                    title: "45 - 64 Tahun",
                                    headerAttributes:{style:"text-align : center"},
                                    columns:[
                                        {
                                            "field":"jmlDewasasL",
                                            "title":"L",
                                               width: "40px",
                                        },
                                        {
                                            "field":"jmlDewasasP",
                                            "title":"P",
                                               width: "40px",
                                        }
                                      ]  
                                },
                                { 
                                    field: "", 
                                    title: "> 65 Tahun",
                                    headerAttributes:{style:"text-align : center"},
                                    columns:[
                                        {
                                            "field":"jmlkakek",
                                            "title":"L",
                                               width: "40px",
                                        },
                                        {
                                            "field":"jmlnenek",
                                            "title":"P",
                                               width: "40px",
                                        }
                                      ]  
                                }
                            ]
                        },
                        {
                            field: "", 
                            title: "KASUS BARU MENURUT SEKS",
                            headerAttributes:{style:"align; text-align : center"},
                            columns:[
                                {
                                    "field":"kasusBaruL",
                                    "title":"L",
                                       width: "80px",
                                },
                                {
                                    "field":"kasusBaruP",
                                    "title":"P",
                                       width: "80px",
                                }
                              ]  
                        },
                        {
                            field: "totalKasusBaru", 
                            title: "JUMLAH KASUS BARU",
                            headerAttributes:{style:"align; text-align : center"},
                              width: "80px",
                        },
                        {
                            field: "totalKunjungan", 
                            title: "JUMLAH KUNJUNGAN",
                            headerAttributes:{style:"align; text-align : center"},
                              width: "80px",
                        },
                        {
                            field: "jumlahMati", 
                            title: "MENINGGAL",
                            headerAttributes:{style:"align; text-align : center"},
                              width: "80px",
                        }
                    ]
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

          $scope.columnSurveilan = [
  
            { 
                field: "nocm", 
                title: "NO MR"
            },
            {
                field: "NamaKeluarga", 
                title: "NAMA KELUARGA"
            },
            {
                 field: "namapasien", 
                 title: "NAMA KELUARGA"
            },                             
            { 
                field: "jam", 
                title: "JAM" 
            },
            {
              field: "jeniskelamin", 
              title: "L/P"
            },
            {
              field: "status", 
              title: "BARU"
            },
            {
              field: "statusinap", 
              title: "INAP"
            },
            {
              field: "namalengkap", 
              title: "DOKTER"
            },
            {
              field: "namaruangan", 
              title: "UNIT TUJUAN"
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
              $scope.CariRegistrasiPasien();
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