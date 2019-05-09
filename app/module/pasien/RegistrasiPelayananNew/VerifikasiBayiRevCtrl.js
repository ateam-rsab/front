define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('VerifikasiBayiRevCtrl', ['ManagePasien', '$scope', 'ModelItem', '$rootScope', '$state', 'FindPasien', 'FindPegawai', 'CacheHelper','ManageServicePhp',
        function(managePasien, $scope, modelItem, $rootScope, $state, findPasien, findPegawai, cacheHelper, manageServicePhp) {
            $scope.isRouteLoading=false;
            $scope.state = window.state;
            if ($state.params !== undefined) {

                if ($state.params.id !== undefined) {
                    $scope.state = $state.params.id.toUpperCase();
                }
            }
            $scope.showDokter = window.tipe;
            $scope.item = {};
            $scope.VerificationNamaIbu = function() {
                $scope.isRouteLoading=true;
                 manageServicePhp.getDataTableTransaksi("registrasipasienbayi/get-nocm-ibu?noCm=" + $scope.item.NoCM)         
                      .then(function (e) {
                        $scope.isRouteLoading=false;
                        if(e.data.data.length==0){
                          $scope.isBusyNoCm = false;
                           toastr.error('Data tidak ditemukan','Informasi');  
                        }else{
                             $scope.item.pasien = modelItem.beforePost(e.data.data[0]);
                                $scope.item.noTelpon = e.data.data[0].notelepon + ' - ' +e.data.data[0].nohp
                                $scope.item.tglLahir =new moment( e.data.data[0].tgllahir).format('YYYY-MM-DD HH:mm');
                                // $scope.item.pendidikan = $scope.item.pasien.pendidikan;
                                // $scope.item.pekerjaan = $scope.item.pasien.pekerjaan;
                        }
                        if (!$scope.$$phase)
                            $scope.$apply();
                    })
            }
            
            $scope.Selanjutnya = function() {
                if ($scope.item.pasien==undefined){
                     toastr.error('Cari Ibu Bayi Dulu','Informasi');  
                }else{
                    // var isMenuDinamis = JSON.parse(localStorage.getItem('isMenuDinamis'))
                    // if(isMenuDinamis && isMenuDinamis == true){
                        $state.go('RegistrasiPasienNewRev');
                    // }else{
                    //     $state.go('RegistrasiBayi');
                    // }
                
                    var cacheBayi = $scope.item.pasien.nocm        
                    cacheHelper.set('CacheRegisBayi', cacheBayi);
                }
             
            };
           
            $scope.now = new Date();


        }
    ]);
});