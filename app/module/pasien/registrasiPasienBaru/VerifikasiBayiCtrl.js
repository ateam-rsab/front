define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('VerifikasiBayiCtrl', ['ManagePasien', '$scope', 'ModelItem', '$rootScope', '$state', 'FindPasien', 'FindPegawai',

        function(managePasien, $scope, modelItem, $rootScope, $state, findPasien, findPegawai) {
            // if ($state.current.name === 'touchscreenreBpjs')
            //     $scope.state = 'BPJS';
            // else
            $scope.state = window.state;
            if ($state.params !== undefined) {

                if ($state.params.id !== undefined) {
                    $scope.state = $state.params.id.toUpperCase();
                }
            }
            $scope.showDokter = window.tipe;
            $scope.item = {};
            $scope.VerificationNamaIbu = function() {
                findPasien.getByNoCM($scope.item.NoCM).then(function(e) {
                    debugger;
                        $scope.item.pasien = modelItem.beforePost(e.data.data);
                        $scope.item.jenisKelamin = $scope.item.pasien.jenisKelamin;
                        $scope.item.pendidikan = $scope.item.pasien.pendidikan;
                        $scope.item.pekerjaan = $scope.item.pasien.pekerjaan;

                        if (!$scope.$$phase)
                            $scope.$apply();
                    }),
                    function(e) {
                        $scope.isBusyNoCm = false;
                        window.messageContainer.error("Data tidak ditemukan");
                    }
            }
            
            $scope.Selanjutnya = function() {
                modelItem.set("ReservasiPasien", $scope.item);
                $state.go('RegistrasiPasienBaruBayiVerif',{
                    "noCm": $scope.item.pasien.noCm
                });
            };
           
            modelItem.getDataDummyGeneric("JenisKelamin", true, undefined, 10).then(function(data) {
                $scope.jenisKelaminsLocal = data;
            });
            modelItem.getDataDummyGeneric("KelompokPasien", false, undefined, 10).then(function(data) {
                $scope.asuransiPasiens = _.filter(data, function(item) {
                    return item.kelompokPasien !== 'UMUM';
                });;
            });
            modelItem.getDataDummyGeneric("JenisKelamin", false, undefined, 10).then(function(data) {
                $scope.jenisKelamins = data;
            });
            modelItem.getDataDummyGeneric("DesaKelurahan", true, undefined, 10).then(function(data) {
                $scope.desaKelurahans = data;
            });
            $scope.now = new Date();


        }
    ]);
});