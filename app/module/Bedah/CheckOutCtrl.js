define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CheckOutCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru','DateHelper','$mdDialog',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru,DateHelper,$mdDialog) {
            $scope.isLoadingData = true;
            $scope.AllData = false;
            $scope.item = {};
            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
            $scope.listStatusYaTidak = data;
            findPasien.getListKesadaraan().then(function(data){
             $scope.listKeadaanUmum = data.data.data.id;
            });

            findPasien.getListKelengkapan().then(function(e) {
            var data = e.data.data.data
                var temp = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var element = data[key];
                        if (element !== true) {
                            element.cekKelengkapanAlkes = $scope.listStatusYaTidak[0];
                            temp.push(element);
                        }
                    }
                }
                $scope.listCheckOut = temp;
            });
            })

            $scope.loadGrid = function () {
              findPasien.getLoadCheckOut($state.params.noRec).then(function(data) {
                debugger
              if(data.data.data != undefined){
                debugger
              $scope.dataMaster = data.data.data.showData;
              $scope.dataSource = new kendo.data.DataSource({
              pageSize:50,
              data : $scope.dataMaster,
              $scrollable : true
               });
              }
              });
              }
             $scope.loadGrid();

             $scope.klik = function(dataSelected){
              debugger
              if (dataSelected != undefined){
              toastr.info("1 Dipilih");
               $scope.item.idCheckin = dataSelected.noRec;
               findPasien.getLoadSubCheckOut($scope.item.idCheckin).then(function(data) {
                debugger
                $scope.subdatamaster = data.data.data.showData;
                $scope.item.kesadaran = {
                  id : $scope.subdatamaster[0].KesadaranCheckOutDetail[0].idKesadaranCheckOut,
                  name : $scope.subdatamaster[0].KesadaranCheckOutDetail[0].nameKesadaranCheckOut
                }
                $scope.NoRecKesadaraan = $scope.subdatamaster[0].KesadaranCheckOutDetail[0].noRec;
                $scope.noRecCheckOut = $scope.subdatamaster[4].noRecCheckOut[0].noRec;
                
                findPasien.getListKelengkapan().then(function(e) {
                debugger
                var f = e.data.data.data
                var temporary = [];
                    for (var key in f) {
                      debugger
                        if (f.hasOwnProperty(key)) {
                            var element = f[key];
                            if (element !== true) {
                                element.cekKelengkapanAlkes = null;
                                 $scope.subdatamaster[1].KelengkapanCheckOutDetail.forEach(function(datax){
                                  debugger
                                    if(element.id == datax.id){
                                             if(datax.idStatusYaTidak == "2"){
                                              element.cekKelengkapanAlkes = $scope.listStatusYaTidak[1]
                                              element.noRec2 = datax.noRec;
                                            }else{
                                              element.cekKelengkapanAlkes = $scope.listStatusYaTidak[0]
                                              element.noRec2 = datax.noRec;
                                            }
                                     temporary.push(element);
                                     }
                                    })
                            }
                        }
                    }
                $scope.listCheckOut = temporary;
                }); 
                });
               }
               }

            $scope.columnCheckIn = [
                    {
                        "field": "tglRegistrasi",
                        "title": "Tanggal Registrasi",
                        "template": "#= new moment(new Date(tglRegistrasi)).format('DD-MM-YYYY') #"
                    },
                    // {
                    //     "field": "noRec",
                    //     "title": "Norec"
                    // },
                    {
                        "field": "namaKelas",
                        "title": "Nama Kelas"
                    }
            ];

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
            $scope.item.kesadaran = {
              id : 1, name : ""
            }
            $scope.item.pasien = data.data.pasien;
            $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('YYYY-MM-DD HH:mm:ss');
            $scope.item.noRec = data.data.noRec;
            $scope.isLoadingData = false;
            $scope.AllData = true;
            });

             $scope.Back = function(){
                $state.go('RevDaftarPasienRuanganBedah')
             }

             $scope.Save = function(){
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

            $scope.Simpan = function() {
             
             if ($scope.item.kesadaran == undefined){
                     $scope.item.kesadaran = {"id":1};
                }
              var dataCheckOut = [];
                for (var key in $scope.listCheckOut) {
                    if ($scope.listCheckOut.hasOwnProperty(key)) {
                        var element = $scope.listCheckOut[key];
                        if (element.cekKelengkapanAlkes !== undefined) {
                        if(element.cekKelengkapanAlkes.name === "Ya"){
                            dataCheckOut.push({
                                kelengkapanCheckOut: {id : element.id},
                                statusYaTidak: {id : 2} ,
                                noRec: element.noRec2//Ya
                            });
                        }else{
                            dataCheckOut.push({
                                kelengkapanCheckOut: {id : element.id},
                                statusYaTidak: {id : 1},//Tidak
                                noRec: element.noRec2
                            });
                          }
                        }
                    }
                }

              var datakesadaran = [];
              if($scope.NoRecKesadaraan != undefined){
                   datakesadaran.push({
                                kesadaranCheckOut : {id : $scope.item.kesadaran.id},
                                                    noRec: $scope.NoRecKesadaraan
                                      });
              }else{
                   datakesadaran.push({
                                kesadaranCheckOut : {id : $scope.item.kesadaran.id},
                                      });
                    }
            
               var data =  {
                            "pasienDaftar" : {"noRec" : $state.params.noRec},
                            "noRec" : $scope.noRecCheckOut,
                            "jam": "2017-10-23 10:30:00",
                            "kesadaranCheckOutDetail" : datakesadaran,
                            "kelengkapanCheckOutDetail" : dataCheckOut
                            }
                ManagePasien.saveCheckOut(data).then(function() {
                  $scope.loadGrid();
                })
            }
        }
    ]);
});