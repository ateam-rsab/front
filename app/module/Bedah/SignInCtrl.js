define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SignInCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru','$mdDialog',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru,$mdDialog) {
            $scope.isLoadingData = true;
            $scope.AllData = false;
            ModelItem.getDataDummyGeneric("KonfirmasiSignIn", false).then(function(data) {
                $scope.listKonfirmasi = data;
            });
         
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);
                $scope.item.pasien = data.data.pasien;
                $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('YYYY-MM-DD');
                $scope.item.noRec = data.data.noRec;
                $scope.isLoadingData = false;
                $scope.AllData = true;
            });

            $scope.loadGrid = function () {
              findPasien.getLoadSignIn($state.params.noRec).then(function(data) {
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

            $scope.columnSignIn = [
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


            $scope.loadGrid();
            $rootScope.isViewDiagnosa = true;
            $scope.ScanData = function(){
            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak = data;
                ModelItem.getDataDummyGeneric("PengobatanKhususSignIn", false).then(function(data) {
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
                    $scope.listSignIn = temp;
                 
                    ModelItem.getDataDummyGeneric("DetailSignIn", false).then(function(data) {
                        findPasien.getSignIn($state.params.noRegister).then(function(e) {
                            if (e.data.data.SignInOperation.length > 0) {
                                var data = ModelItem.beforePost(e.data.data.SignInOperation[0], true);
                                $scope.item = {
                                    noRec: data.noRec,
                                    pasienDaftar: {
                                        noRec: data.pasienDaftar.noRec
                                    }
                                };
                                for (var key in data.signInOperationDetail) {
                                    if (data.signInOperationDetail.hasOwnProperty(key)) {
                                        var element = data.signInOperationDetail[key];
                                        for (var keyItem in $scope.listKonfirmasi) {
                                            if ($scope.listKonfirmasi.hasOwnProperty(keyItem)) {
                                                var elementItem = $scope.listKonfirmasi[keyItem];
                                                if (elementItem.id === element.konfirmasiSignIn.id) {
                                                    elementItem.isChecked = true;
                                                    $scope.konfirmasis.push(elementItem);
                                                }
                                            }
                                        }

                                    }
                                }

                                for (var key in data.signInOperationDetailQuisioner) {
                                    if (data.signInOperationDetailQuisioner.hasOwnProperty(key)) {
                                        var element = data.signInOperationDetailQuisioner[key];
                                        for (var keyItem in $scope.listSignIn) {
                                            if ($scope.listSignIn.hasOwnProperty(keyItem)) {
                                                var elementItem = $scope.listSignIn[keyItem];
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

             $scope.klik = function(dataSelected){
              if (dataSelected != undefined){
                toastr.info("1 Dipilih");
               $scope.item.idCheckin = dataSelected.noRec;
               findPasien.getLoadSubSignIn($scope.item.idCheckin).then(function(data) {
                $scope.subdatamaster = data.data.data.showData;
                $scope.item.NorecCheckin = $scope.subdatamaster[2].noRecCheckIn[0].noRec;
                $scope.listKonfirmasi.forEach(function(t){
                t.isChecked = false     
                }) 
                 $scope.konfirmasis = [];
                  $scope.subdatamaster[1].OperationDetail.forEach(function(data){
                   $scope.listKonfirmasi.forEach(function(e){
                     if(e.id == data.idKonfirmasiSignIn){
                        e.isChecked = true
                         var dataid = {"id": data.idKonfirmasiSignIn,
                           "noRec2" : data.noRec,
                           "status" : data.statusEnabled}
                            $scope.konfirmasis.push(dataid)       
                        }          
                   });       
                })
                ModelItem.getDataDummyGeneric("PengobatanKhususSignIn", false).then(function(f) {
                 var temporary = [];
                        for (var key in f) {
                            if (f.hasOwnProperty(key)) {
                                var element = f[key];
                                if (element !== true) {
                                    element.value = null;
                                     $scope.subdatamaster[0].DetailQuisionerDetail.forEach(function(datax){
                                        if(element.id == datax.idPengobatanKhusus){
                                                 if(datax.value == "2"){
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
                        $scope.listSignIn = temporary;
                });
                });
               }
               }

            $scope.konfirmasis = [];
            $scope.manageCheck = function(listId) {
                if($scope.item.ModeEdit = true){
                  $scope.ModeHapus = false;
                    for(var i = 0; i<$scope.konfirmasis.length; i++){
                      if (listId.id == $scope.konfirmasis[i].id){
                         if($scope.konfirmasis[i].status == true){
                            var getNorec = $scope.konfirmasis[i].noRec2;
                            $scope.konfirmasis.splice(i, 1)
                            listId.status = false;
                            listId.noRec2 = getNorec;
                            $scope.konfirmasis.push(listId);
                            $scope.ModeHapus = true;
                            return $scope.konfirmasis;
                          }else{
                            var getNorec = $scope.konfirmasis[i].noRec2;
                            $scope.konfirmasis.splice(i, 1)
                            listId.status = true;
                            listId.noRec2 = getNorec;
                            $scope.konfirmasis.push(listId);
                            $scope.ModeHapus = true;
                            return $scope.konfirmasis;
                          }
                      }
                    }
                   if ($scope.ModeHapus == false){
                       listId.status = true;
                       $scope.konfirmasis.push(listId);
                    }
                }else{
                    var idx = $scope.konfirmasis.indexOf(listId);
                    if (idx > -1) {
                        $scope.konfirmasis.splice(idx, 1);
                    } else {
                        $scope.konfirmasis.push(listId);
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
             $state.params.noRec;
                var konfirmasis = [];
                for (var key in $scope.konfirmasis) {
                    if ($scope.konfirmasis.hasOwnProperty(key)) {
                        var element = $scope.konfirmasis[key];
                        konfirmasis.push({
                            konfirmasiSignIn: {id: element.id},
                            noRec : element.noRec2,
                            statusEnabled : element.status
                        })
                    }
                }
                $scope.item.signInOperationDetail = konfirmasis;
                var dataSign = [];
                for (var key in $scope.listSignIn) {
                    if ($scope.listSignIn.hasOwnProperty(key)) {
                        var element = $scope.listSignIn[key];
                        if (element.value !== undefined) {
                            dataSign.push({
                                pengobatanKhusus: { id: element.id },
                                value: element.value.id,
                                noRec: element.noRec2,
                                statusEnabled : true
                            });
                        }
                    }
                }
                var data = 
                {
                  "pasien": {"noRec": $state.params.noRec},
                  "noRec" : $scope.item.NorecCheckin,
                  "statusEnabled" : "true",
                  "tglRegistrasi" : $scope.item.tanggalRegistrasi,
                  "signInOperationDetail":konfirmasis, 
                  "signInOperationDetailQuisioner": dataSign
                 }
                ManagePasien.saveSignIn(data).then(function() {
                $scope.loadGrid();
                })
            }
        }
    ]);
});