define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('TimeOutCtrl', ['FindPasien', 'ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru','$mdDialog',
        function(findPasien, ManagePasien, $rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru,$mdDialog) {
            $scope.isLoadingData = true;
            $scope.AllData = false;
             // ModelItem.getDataDummyGeneric("Pegawai", false).then(function(data) {
             // debugger
             // $scope.listPegawai = data;
             //  })
            // ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaExternal").then(function(dat) {
            //     $scope.listDataPegawai = dat.data;
            // });
            // $scope.listPegawai=[{
             //  namaLengkap : "rendy novian",
             //  id : 1
             // }]
            findPasien.getPegawaiTen().then(function(dat) {
              debugger
            $scope.listPegawai = dat.data.data.data;
            });

            ModelItem.getDataDummyGeneric("JenisPegawaiOperasi", true, undefined, 10).then(function(data) {
                $scope.sourceJenisDiagnosisPrimer = data;
            });
            $scope.item = {};
            ModelItem.getDataDummyGeneric("CheckTimeout", false).then(function(data) {
                $scope.listTimeOut = data;
            });

            $scope.column = [
            {
                "field": "jenisPegawai.jenisPegawai",
                "title": "Jenis Pelaksana"
            }, 
            {
                "field": "namaPelaksana.namaLengkap",
                "title": "Nama Pelaksana"
            }];
            $scope.dataPegawai = new kendo.data.DataSource({
                data: []
            });
            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak = data;
            })
            $scope.addPegawai = function() {
            debugger;
                $scope.dataPegawai.add({
                    jenisPegawai: $scope.item.jenisPerawat,
                    namaPelaksana: $scope.item.dokter
                });
                $scope.item.jenisPerawat = undefined;
                $scope.item.dokter = undefined;
            }

            $scope.removePegawai = function() {

                $scope.dataPegawai.data([]);
            };

             $scope.Back = function(){
                $state.go('RevDaftarPasienRuanganBedah')
             }


            $scope.loadGrid = function () {
            debugger
              findPasien.getLoadTimeout($state.params.noRec).then(function(data) {
               debugger
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

                 ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                 $scope.listStatusYaTidak = data;
                 $scope.listRadioo=[
                    {id:1, name:"Photo Radiologi DiPasang"}
                 ];
                var temp = [];
                for (var key in $scope.listRadioo) {
                
                    if ($scope.listRadioo.hasOwnProperty(key)) {
                        var element = $scope.listRadioo[key];
                        if (element !== true) {
                            element.value = $scope.listStatusYaTidak[0];
                            temp.push(element);
                        }
                    }
                 }
                $scope.listradiologi = temp;
               })
              ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                debugger;
                $scope.listStatusYaTidak2 = data;
                $scope.lisantobiotik=[
                    {id:2, name:"Apakah Antibiotik Profil Aksis Sudah Diberikan 60Menit Sebelumnya"}
                ];
                var temp = [];
                for (var key in $scope.lisantobiotik) {
                    debugger
                    if ($scope.lisantobiotik.hasOwnProperty(key)) {
                        var element = $scope.lisantobiotik[key];
                        if (element !== true) {
                            element.value = $scope.listStatusYaTidak2[0];
                            temp.push(element);
                        }
                    }
                 }
                $scope.listAntibio = temp;
            })

            $scope.klik = function(dataSelected){
              debugger
            if (dataSelected != undefined){
             $scope.item.idCheckin = dataSelected.noRec;
             findPasien.getLoadSubTimeout($scope.item.idCheckin).then(function(data) {
              toastr.info("1 Data Dipilih");
              $scope.subdatamaster = data.data.data.showData;
              debugger
              $scope.item.NorecTimeout = $scope.subdatamaster[1].TimeOut[0].noRec;
              $scope.item.idFotoRadiologi = $scope.subdatamaster[1].TimeOut[0].idFotoRadiologi;
              $scope.item.idFotoRadiologi = $scope.subdatamaster[1].TimeOut[0].nameFotoRadiologi;
              $scope.dataPegawai.data([]);
              for(var i = 0; i< $scope.subdatamaster[1].TimeOut.length; i++){
                 $scope.dataPegawai.add({
                  jenisPegawai: {jenisPegawai: $scope.subdatamaster[0].Pelaksana[0].jenisPegawai, id : $scope.subdatamaster[0].Pelaksana[0].idJenisPegawai},
                  namaPelaksana: {namaLengkap: $scope.subdatamaster[0].Pelaksana[0].namaPegawai, id : $scope.subdatamaster[0].Pelaksana[0].idPegawai}
              });
              }
              $scope.item.namaAntibiotik = $scope.subdatamaster[1].TimeOut[0].namaAntibiotik
              $scope.item.dosisAntibiotik = $scope.subdatamaster[1].TimeOut[0].dosisAntibiotik
              $scope.item.halKhusus = $scope.subdatamaster[1].TimeOut[0].halKhusus;
              $scope.subdatamaster[1].TimeOut[0].nameFotoRadiologi;
              $scope.subdatamaster[1].TimeOut[0].idFotoRadiologi;
               var f = $scope.listRadioo;
               var temporary = [];
               for (var key in f) {
                      if (f.hasOwnProperty(key)) {
                          var element = f[key];
                          if (element !== true) {
                              element.value = null;
                               $scope.subdatamaster[1].TimeOut.forEach(function(datax){
                                           if(datax.nameFotoRadiologi == "Ya"){
                                            element.value = $scope.listStatusYaTidak[1]
                                          }else{
                                            element.value = $scope.listStatusYaTidak[0]
                                          }
                                   temporary.push(element);
                                   
                                  })
                          }
                      }
                  }
                 $scope.listradiologi = temporary;
                
                 var g = $scope.lisantobiotik;
                 var temps = [];
                 for (var key in g) {
                        if (g.hasOwnProperty(key)) {
                            var element = g[key];
                            if (element !== true) {
                                element.value = null;
                                 $scope.subdatamaster[1].TimeOut.forEach(function(dat){
                                          if(dat.nameStatusAntiBiotikPro == "Ya"){
                                              element.value = $scope.listStatusYaTidak2[1]
                                            }else{
                                              element.value = $scope.listStatusYaTidak2[0]
                                            }
                                     temps.push(element);
                                     
                                    })
                            }
                        }
                    }
                  $scope.listAntibio = temps;
                });
              }
             }

    
            $scope.columnTimeOut = [
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
            if($scope.item.halKhusus == undefined){
                $scope.item.halKhusus = "-";
            }
            if($scope.item.namaAntibiotik == undefined){
                $scope.item.namaAntibiotik = "-";
            }
            if($scope.item.dosisAntibiotik == undefined){
                $scope.item.dosisAntibiotik = "-";
            } 

            var tempPelaksana = []
            for(var x = 0; x<$scope.dataPegawai._data.length; x++){
             var dataPelaksana = {"jenisPegawai" : {"id" : $scope.dataPegawai._data[x].jenisPegawai.id}, "namaPelaksana" : {"id" : $scope.dataPegawai._data[x].namaPelaksana.idpegawai}}
               tempPelaksana.push(dataPelaksana);
            }
                var data =    {
                                    "pasienDaftar" : {"noRec" : $state.params.noRec},
                                    "halKhusus" : $scope.item.halKhusus,
                                    "noRec" : $scope.item.NorecTimeout,
                                    "namaAntibiotik" : $scope.item.namaAntibiotik,
                                    "dosisAntibiotik" : $scope.item.dosisAntibiotik,
                                    "fotoRadiologi" : {"id" : $scope.listRadioo[0].value.id},
                                    "statusAntibiotikProfilaksis" : {"id" : $scope.listAntibio[0].value.id},
                                    "pelaksana" : tempPelaksana
                                }
                ManagePasien.saveTimeOut(data).then(function() {
                $scope.loadGrid();
                })
            }
        }
    ]);
});