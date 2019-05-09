define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SignOutCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru','$mdDialog',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, $mdDialog) {
            $scope.isLoadingData = true;
            $scope.AllData = false;
            $scope.item = {};

            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak = data;
                ModelItem.getDataDummyGeneric("CekKelengkapanAlkes", false).then(function(data) {
                $scope.listAlkes = data;
                $scope.listSignOut = data;
                 var temp = [];
                for (var key in $scope.listAlkes) {
                    if ($scope.listAlkes.hasOwnProperty(key)) {
                        var element = $scope.listAlkes[key];
                        if (element !== true) {
                            element.cekKelengkapanAlkes = $scope.listStatusYaTidak[0];
                            element.disabled = 1;
                            temp.push(element);
                        }
                    }
                 }
                 $scope.listSignOut = temp;
                });
               })

              $scope.loadGrid = function () {
              findPasien.getLoadSignOut($state.params.noRec).then(function(data) {
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


              $scope.columnSignOut = [
                    {
                        "field": "tglRegistrasi",
                        "title": "Tanggal Registrasi",
                        "template": "#= new moment(new Date(tglRegistrasi)).format('DD-MM-YYYY') #"
                    }
                    // ,
                    // {
                    //     "field": "noRec",
                    //     "title": "Norec"
                    // }
              ];

            findPasien.getByNoRegistrasi($state.params.noRegister).then(function(data) {
              // $scope.item = ModelItem.beforePost(data.data, true);
              $scope.item.pasien = data.data.pasien;
              $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-YYYY HH:mm');
              $scope.isLoadingData = false;
              $scope.AllData = true;
            });

            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak = data;
            })
            $scope.listTindakanJaringan = [{
                keterangan: "",
                name: "Ada Jaringan / Cairan tubuh",
                id:0
            }, {
                name: "Sudah diberikan Identitas",
                id:1
            }, {
                name: "Tidak ada Tindakan jaringan",
                id:2
            }]

            $scope.kliks = function(data){
            if(data.disabled==1){
            data.disabled = 2;
            }else{
            data.disabled = 1;
            data.keterangan = "";
            }
            }

            $scope.klik = function(dataSelected){
              if (dataSelected != undefined){
               $scope.item.ModeEdit = true;
               $scope.item.idCheckin = dataSelected.noRec;
               findPasien.getLoadSubSignOut($scope.item.idCheckin).then(function(data) {
                debugger
                $scope.subdatamaster = data.data.data.showData;
                $scope.item.isReadResult = $scope.subdatamaster[2].noRecCheckOut[0].statusperawatmembicarakantindakan;
                $scope.NorecSignout = $scope.subdatamaster[2].noRecCheckOut[0].noRec;
                toastr.info("1 Dipilih");
                $scope.listTindakanJaringan.forEach(function(t){
                t.isChecked = false     
                }) 
                 $scope.listTindakan = [];
                 $scope.subdatamaster[1].PemeriksaanJaringanCairanTubuhDetail.forEach(function(data){
                 $scope.listTindakanJaringan.forEach(function(e){
                 if (e.id == data.id){
                        e.isChecked = true
                        var dataid = {"id":data.id,
                                     "noRec":data.noRec,
                                     "keterangan":data.keterangan,
                                     "status":data.status}
                         $scope.listTindakan.push(dataid)
                    }
                  })
                 })
              ModelItem.getDataDummyGeneric("CekKelengkapanAlkes", false).then(function(f) {
                debugger
                 var temporary = [];
                        for (var key in f) {
                            if (f.hasOwnProperty(key)) {
                                var element = f[key];
                                if (element !== true) {
                                    element.cekKelengkapanAlkes = null;
                                     $scope.subdatamaster[0].CekKelengkapanalKesDetail.forEach(function(datax){
                                        if(element.id == datax.id){
                                               if(datax.idStatus  == 1){
                                                  element.cekKelengkapanAlkes = $scope.listStatusYaTidak[1];
                                                  element.noRec2 = datax.noRec;
                                                  element.keterangan = datax.keterangan;
                                                  element.disabled = 2;
                                                }else{
                                                  element.cekKelengkapanAlkes = $scope.listStatusYaTidak[0];
                                                  element.noRec2 = datax.noRec;
                                                  element.keterangan = datax.keterangan;
                                                  element.disabled = 1;
                                                }
                                         temporary.push(element);
                                         }
                                        })
                                }
                            }
                        }
                  $scope.listSignOut = temporary;
                });
                });
               }
               }


          $scope.Back = function(){
          $state.go('RevDaftarPasienRuanganBedah')
          }

          $scope.listTindakan = [];
            $scope.manageCheck = function(listId) {
                if($scope.item.ModeEdit = true){
                  $scope.ModeHapus = false;
                    for(var i = 0; i<$scope.listTindakan.length; i++){
                      if (listId.id == $scope.listTindakan[i].id){
                         if($scope.listTindakan[i].status == true){
                            var getNorec = $scope.listTindakan[i].noRec;
                            $scope.listTindakan.splice(i, 1)
                            listId.status = false;
                            listId.noRec = getNorec;
                            $scope.listTindakan.push(listId);
                            $scope.ModeHapus = true;
                            return $scope.listTindakan;
                          }else{
                            var getNorec = $scope.listTindakan[i].noRec;
                            $scope.listTindakan.splice(i, 1)
                            listId.status = true;
                            listId.noRec = getNorec;
                            $scope.listTindakan.push(listId);
                            $scope.ModeHapus = true;
                            return $scope.listTindakan;
                          }
                      }
                    }
                   if ($scope.ModeHapus == false){
                       listId.status = true;
                       $scope.listTindakan.push(listId);
                    }
                }else{
                    var idx = $scope.listTindakan.indexOf(listId);
                    if (idx > -1) {
                        $scope.listTindakan.splice(idx, 1);
                    } else {
                        $scope.listTindakan.push(listId);
                    }
                  }
            };

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
              var valid = false;
              $scope.item.isReadResult;
              var dataTindakaJaringan = [];
                for (var key in $scope.listTindakan) {
                    if ($scope.listTindakan.hasOwnProperty(key)) {
                        var element = $scope.listTindakan[key];
                        dataTindakaJaringan.push({
                            pemeriksaanJaringanCairanTubuh: {id : element.id},
                            noRec: element.noRec,
                            status: element.status,
                            statusEnabled: element.status,
                        })
                    }
                }
                var dataSignOut = [];
                for (var key in $scope.listSignOut) {
                    if ($scope.listSignOut.hasOwnProperty(key)) {
                        var element = $scope.listSignOut[key];
                        if(element.cekKelengkapanAlkes!=undefined){
                        if(element.cekKelengkapanAlkes.name === "Ya"){
                        dataSignOut.push({
                         cekKelengkapanAlkes : {id :  element.id},
                         statusLengkapTidakLengkap : {id :  1},
                         noRec: element.noRec2,
                         keterangan:element.keterangan,
                         status:true,
                         statusEnabled:element.statusEnabled
                         })
                        }else{
                        dataSignOut.push({
                         cekKelengkapanAlkes : {id : element.id},
                         statusLengkapTidakLengkap : {id :  0},
                         noRec: element.noRec2,
                         keterangan:element.keterangan,
                         status:false,
                         statusEnabled:element.statusEnabled
                        })
                        }
                        }
                    }
                }

        var data =
             {
                 "pasienDaftar" : {"noRec" : $state.params.noRec},
                 "noRec" : $scope.NorecSignout,
                 "statusperawatmembicarakantindakan" : $scope.item.isReadResult,
                 "pemeriksaanJaringanCairanTubuhDetail" : dataTindakaJaringan,
                 "cekKelengkapanAlkesDetail" : dataSignOut
               }
                ManagePasien.saveSignOut(data).then(function() {
                $scope.loadGrid();
                })
            }

           
        }
    ]);
});
