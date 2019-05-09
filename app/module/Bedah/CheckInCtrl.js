define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CheckInCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru','DateHelper','$mdDialog',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, DateHelper,$mdDialog) {
            $scope.isLoadingData = true;
            $scope.AllData = false;
            ModelItem.getDataDummyGeneric("Puasa", false).then(function(data) {
            $scope.sourcePuasa = data;
            })
            ModelItem.getDataDummyGeneric("JenisOperasi", false).then(function(data) {
            $scope.listJenisOperasi = data;    
            })

            $scope.item ={}
            $scope.ScanData = function(){
                ModelItem.getDataDummyGeneric("AlatYangTerpasangCheckIn", false).then(function(data) {
                    $scope.listAlatYangTerpasang = data;
                    ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                        $scope.listStatusYaTidak = data;
                        ModelItem.getDataDummyGeneric("PengobatanKhususCheckIn", false).then(function(data) {
                        var temp = [];
                            for (var key in data) {
                                if (data.hasOwnProperty(key)) {
                                    var element = data[key];
                                    if (element !== true) {
                                        element.value = $scope.listStatusYaTidak[0];
                                        temp.push(element);
                                    }
                                }
                          }
                       $scope.listPengobatanKhusus = temp;
                        findPasien.getCheckIn($state.params.noRegister).then(function(e) {
                            $scope.listAlergi = [];
                            if (e.data.data.CheckIn.length > 0) {
                                var data = ModelItem.beforePost(e.data.data.CheckIn[0], true);
                                $scope.item = {
                                    jenisOperasi: data.jenisOperasi,
                                    puasa: data.puasa,
                                    n: data.n,
                                    kesadaBillingDetailCtrlran: data.kesadaran,
                                    td: data.td,
                                    tinggiBadan: data.tinggiBadan,
                                    jumlah: data.jumlah,
                                    beratBadan: data.beratBadan,
                                    makanMinumTerakhir: data.makanMinumTerakhir,
                                    noRec: data.noRec,
                                    pasien: { noRec: data.pasienDaftar.noRec }
                                };
                                for (var key in data.alatTerpasang) {
                                    if (data.alatTerpasang.hasOwnProperty(key)) {
                                        var element = data.alatTerpasang[key];
                                        for (var keyItem in $scope.listAlatYangTerpasang) {
                                            if ($scope.listAlatYangTerpasang.hasOwnProperty(keyItem)) {
                                                var elementItem = $scope.listAlatYangTerpasang[keyItem];
                                                if (elementItem.id === element.alatTerpasang.id) {
                                                    elementItem.isChecked = true;
                                                    $scope.alatTerpasang.push(elementItem);
                                                }
                                            }
                                        }

                                    }
                                }
                                for (var key in data.pengobatanKhusus) {
                                    if (data.pengobatanKhusus.hasOwnProperty(key)) {
                                        var element = data.pengobatanKhusus[key];
                                        for (var keyItem in $scope.listPengobatanKhusus) {
                                            if ($scope.listPengobatanKhusus.hasOwnProperty(keyItem)) {
                                                var elementItem = $scope.listPengobatanKhusus[keyItem];
                                                if (elementItem.id === element.pengobatanKhusus.id) {
                                                    elementItem.value = $scope.listStatusYaTidak[element.value - 1];
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        });

                    })
                });
             })
            }
            $scope.ScanData();
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
             //$scope.item = ModelItem.beforePost(data.data, true);
               $scope.item.jenisOperasi ={
                   id : 1, name:" Operasi Besar A"
                }
                $scope.item.puasa ={
                   id : 0, name:""
                }
               $scope.item.pasien = data.data.pasien;
                 $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('YYYY-MM-DD');
                   $scope.item.noRec = data.data.noRec;
                   $scope.isLoadingData = false;
                   $scope.AllData = true;
                
            });
             $scope.loadGrid = function () {
              findPasien.getLoadCheckIn($state.params.noRec).then(function(data) {
              if(data.data.data != undefined){
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
              if (dataSelected != undefined){
               $scope.item.ModeEdit = true;
               $scope.item.idCheckin = dataSelected.noRec;
               findPasien.getLoadSubCheckIn($scope.item.idCheckin).then(function(data) {
                toastr.info("1 Dipilih");
                $scope.subdatamaster = data.data.data.showData;
                  $scope.item.beratBadan = $scope.subdatamaster[2].noRecCheckIn[0].beratBadan;
                   $scope.item.NorecCheckin = $scope.subdatamaster[2].noRecCheckIn[0].noRec;
                     $scope.item.tinggiBadan = $scope.subdatamaster[2].noRecCheckIn[0].tinggiBadan;
                          $scope.item.jenisOperasi = {id : $scope.subdatamaster[2].noRecCheckIn[0].idJenisOperasi, name :""}
                           $scope.item.puasa = {id : $scope.subdatamaster[2].noRecCheckIn[0].idPuasa,
                            name : ""}
                           $scope.item.MakanMinumTerakhir = $scope.subdatamaster[2].noRecCheckIn[0].makanMinumTerakhir;
                          $scope.item.jumlah = $scope.subdatamaster[2].noRecCheckIn[0].jumlah;
                         $scope.item.kesadaran = $scope.subdatamaster[2].noRecCheckIn[0].kesadaran;
                        $scope.item.td = $scope.subdatamaster[2].noRecCheckIn[0].td;
                      $scope.item.n = $scope.subdatamaster[2].noRecCheckIn[0].n;
                    $scope.item.rr = $scope.subdatamaster[2].noRecCheckIn[0].rr;
                    $scope.listAlatYangTerpasang.forEach(function(t){
                   t.isChecked = false     
                  }) 
                  $scope.alatTerpasang = [];
                  $scope.subdatamaster[0].AlatTerpasang.forEach(function(data){
                 $scope.listAlatYangTerpasang.forEach(function(e){
                 if (e.id == data.id){
                        e.isChecked = true
                        var dataid = {"id":data.id,
                         "noRec2":data.noRec,
                         "status":data.statusEnabled}
                        $scope.alatTerpasang.push(dataid)
                    }
                  })
                 })
            ModelItem.getDataDummyGeneric("PengobatanKhususCheckIn", false).then(function(f) {
                  $scope.listPengobatanKhusus = temporary;
                   var temporary = [];
                          for (var key in f) {
                              if (f.hasOwnProperty(key)) {
                                  var element = f[key];
                                  if (element !== true) {
                                     element.value = null;
                                       $scope.subdatamaster[1].PengobatanKhusus.forEach(function(datax){
                                           if(element.id == datax.id){
                                                  if(datax.value == "Tidak"){
                                                    element.value = $scope.listStatusYaTidak[1]
                                                    element.noRec2 = datax.noRec;
                                                  }else{
                                                    element.value = $scope.listStatusYaTidak[0]
                                                    element.noRec2 = datax.noRec;
                                                  }
                                           temporary.push(element);
                                           }
                                          })
                                  }
                              }
                          }
                    $scope.listPengobatanKhusus = temporary;
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
                        "field": "kesadaran",
                        "title": "Kesadaran"
                    }
                    ];

            $scope.alatTerpasang = [];
            $scope.PasangCheck = function(listId) {
                if($scope.item.ModeEdit = true){
                  $scope.ModeHapus = false;
                    for(var i = 0; i<$scope.alatTerpasang.length; i++){
                      if (listId.id == $scope.alatTerpasang[i].id){
                         if($scope.alatTerpasang[i].status == true){
                            var getNorec = $scope.alatTerpasang[i].noRec2;
                            $scope.alatTerpasang.splice(i, 1)
                            listId.status = false;
                            listId.noRec2 = getNorec;
                            $scope.alatTerpasang.push(listId);
                            $scope.ModeHapus = true;
                            return $scope.alatTerpasang;
                          }else{
                            var getNorec = $scope.alatTerpasang[i].noRec2;
                            $scope.alatTerpasang.splice(i, 1)
                            listId.status = true;
                            listId.noRec2 = getNorec;
                            $scope.alatTerpasang.push(listId);
                            $scope.ModeHapus = true;
                            return $scope.alatTerpasang;
                          }
                      }
                    }
                   if ($scope.ModeHapus == false){
                       listId.status = true;
                       $scope.alatTerpasang.push(listId);
                    }
                }else{
                    var idx = $scope.alatTerpasang.indexOf(listId);
                    if (idx > -1) {
                        $scope.alatTerpasang.splice(idx, 1);
                    } else {
                        $scope.alatTerpasang.push(listId);
                    }
                  }
            };

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
                debugger
                $scope.isLoadingSave = true;
                $scope.item.pasien.noRec;
                $scope.item.beratBadan;
                $scope.item.tinggiBadan;
                var alatTerpasang = [];
                for (var key in $scope.alatTerpasang) {
                    if ($scope.alatTerpasang.hasOwnProperty(key)) {
                        var element = $scope.alatTerpasang[key];
                        alatTerpasang.push({
                            alatTerpasang: { id: element.id },
                            noRec: element.noRec2,
                            statusEnabled : element.status
                        })
                    }
                }
                $scope.item.alatTerpasang = alatTerpasang;
                var pengobatanKhususs = [];
                for (var key in $scope.listPengobatanKhusus) {
                    if ($scope.listPengobatanKhusus.hasOwnProperty(key)) {
                        var element = $scope.listPengobatanKhusus[key];
                        if (element.value !== undefined) {
                             if(element.value.id == 1){
                                pengobatanKhususs.push({
                                pengobatanKhusus: { id: element.id },
                                value: "Ya",
                                noRec: element.noRec2,
                                statusEnabled : true
                            });
                             }else{
                                pengobatanKhususs.push({
                                pengobatanKhusus: { id: element.id },
                                value: "Tidak",
                                noRec: element.noRec2,
                                statusEnabled : true
                            });       
                            }

                        }
                    }
                }
                $scope.item.pengobatanKhusus = data;
                if ($scope.item.puasa == undefined){
                    $scope.item.puasa = {"id":1};
                }
                if ($scope.item.jenisOperasi == undefined){
                    $scope.item.jenisOperasi = {"id":1};
                }
                $scope.item.tanggalRegistrasi;
                
                var data =  {
                              "noRec" : $scope.item.NorecCheckin,
                              "pasien": {"noRec": $state.params.noRec},
                              "statusEnabled" : true,
                              "beratBadan" : $scope.item.beratBadan,
                              "tinggiBadan" : $scope.item.tinggiBadan,
                              "jumlah": $scope.item.jumlah,
                              "kesadaran": $scope.item.kesadaran,
                              "makanMinumTerakhir" : $scope.item.MakanMinumTerakhir,
                              "n": $scope.item.n,
                              "td": $scope.item.td,
                              "rr":  $scope.item.rr,
                              "puasa": {"id": $scope.item.puasa.id},
                              "jenisOperasi": {"id": $scope.item.jenisOperasi.id},
                              "tglRegistrasi": $scope.item.tanggalRegistrasi,
                              "alatTerpasang": alatTerpasang,
                              "pengobatanKhusus": pengobatanKhususs
                             }
                ManagePasien.saveCheckIn(data).then(function(e) {
                    $scope.loadGrid();
                })
            }

        }
    ]);
});