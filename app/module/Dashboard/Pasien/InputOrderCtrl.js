define(['initialize'], function(initialize, pasienServices) {
    'use strict';
    initialize.controller('InputOrderCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'FindPegawai',

        function($rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, findPegawai) {

            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $rootScope.showMenuPengkajianMedis = true;
            if ($state.current.name.indexOf('Farmasi') > 0)
                $scope.selected = "far";
            else if ($state.current.name.indexOf('Laboratorium') > 0)
                $scope.selected = "lab";
            else if ($state.current.name.indexOf('Radiologi') > 0)
                $scope.selected = "rad";
            $scope.NavToLaboratorium = function() {
                $scope.selected = "lab";
                var arrStr ={ 0 : $state.params.noRec ,1:$state.params.noCM
                }
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterCtrl', arrStr);
                $state.go('dashboardpasien.PengkajianMedis.Order.Laboratorium', {
                    noCM: $state.params.noCM,
                    tanggal: $state.params.tanggal,
                    noRec: $state.params.noRec
                });
            }
            $scope.NavToBedah = function() {
                $scope.selected = "bed";
                $state.go('dashboardpasien.PengkajianMedis.Order.Bedah', {
                    noCM: $state.params.noCM,
                    tanggal: $state.params.tanggal,
                    noRec: $state.params.noRec
                });
            }
            $scope.NavToRadiology = function() {
                $scope.selected = "rad";
                var arrStr ={ 0 : $state.params.noRec ,1:$state.params.noCM
                }
                cacheHelper.set('TransaksiPelayananRadiologiCtrl', arrStr);
                $state.go('dashboardpasien.PengkajianMedis.Order.Radiologi', {
                    noCM: $state.params.noCM,
                    tanggal: $state.params.tanggal,
                    noRec: $state.params.noRec
                });
            }
            $scope.NavToDarah = function() {
                $scope.selected = "blood";
                $state.go('dashboardpasien.PengkajianMedis.Order.Darah', {
                    noCM: $state.params.noCM,
                    tanggal: $state.params.tanggal,
                    noRec: $state.params.noRec
                });
            }
            $scope.NavToGizi = function() {
                $scope.selected = "gizi";
                $state.go('dashboardpasien.PengkajianMedis.Order.Gizi', {
                    noCM: $state.params.noCM,
                    tanggal: $state.params.tanggal,
                    noRec: $state.params.noRec
                });
            }
            $scope.NavToPharmacy = function() {
                $scope.selected = "far";
                $state.go('dashboardpasien.PengkajianMedis.Order.Farmasi', {
                    noCM: $state.params.noCM,
                    tanggal: $state.params.tanggal,
                    noRec: $state.params.noRec
                });
            }

        }

    ]);
});