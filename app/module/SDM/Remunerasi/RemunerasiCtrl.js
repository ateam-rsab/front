define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RemunerasiCtrl', ['FindSdm', 'ModelItem', 'ManageSdm', '$state', '$rootScope', '$scope',
        function(findSdm, modelItem, manageSdm, $state, $rootScope, $scope) {
            $scope.listTahun = [];
            for (var i = 2014; i <= new Date().getFullYear(); i++)
                $scope.listTahun.push({ id: i });
            modelItem.getDataDummyGeneric('Pegawai').then(function(e) {
                $scope.pegawais = _.sortBy(e, function(i) {
                    return i.namaLengkap;
                });
            });
            $scope.$watch('pegawai', function(e) {
                $scope.refresh();
            });
            $scope.$watch('selectedTahun', function(e) {
                $scope.refresh();
            });
            $scope.$watch('adjustmenFactorIndeks', function(e) {
                $scope.calculate();
            });
            $scope.$watch('existing', function(e) {
                $scope.calculate();
            })
            $scope.refresh = function() {
                if ($scope.selectedTahun === undefined) return;
                if ($scope.selectedTahun.id === undefined) return;
                if ($scope.pegawai === undefined) return;
                findSdm.getEvaluasiPegawai($scope.selectedTahun.id, $scope.pegawai.id).then(function(e) {
                    $scope.nilaiJabatan = e.data.data.result;
                    findSdm.getPir($scope.selectedTahun.id).then(function(e) {
                        $scope.adjustmenFactorIndeks = 1;
                        $scope.nilaiPir = e.data.data.items.poinPir;

                        $scope.calculate();
                    });
                });

            }
            $scope.calculate = function() {
                $scope.p1p2 = $scope.nilaiPir * $scope.nilaiJabatan;
                $scope.positionP1 = $scope.p1p2 * 30 / 100;
                $scope.p2Iki = 70 * 1 * 1 * $scope.adjustmenFactorIndeks * $scope.p1p2 / 100;
                $scope.p2Min = 0.5 * 0.5 * $scope.adjustmenFactorIndeks * $scope.p2Iki;
                $scope.p2Max = 3 * 1 * $scope.adjustmenFactorIndeks * $scope.p2Iki;

                $scope.jumlahUsulanMin = $scope.positionP1 + $scope.p2Min;
                $scope.jumlahUsulanIki = $scope.positionP1 + $scope.p2Iki;
                $scope.jumlahUsulanMax = $scope.positionP1 + $scope.p2Max;
                $scope.selisih = $scope.jumlahUsulanIki - $scope.existing;

                $scope.kebutuhanAnggaranP1 = $scope.positionP1;
                $scope.kebutuhanP2Iki = $scope.p2Iki;
                $scope.kebutuhanP2Min = $scope.p2Min;
                $scope.kebutuhanP2Max = $scope.p2Max;

                $scope.kebutuhanJumlahUsulanMin = $scope.jumlahUsulanMin;
                $scope.kebutuhanJumlahUsulanIki = $scope.jumlahUsulanIki;
                $scope.kebutuhanJumlahUsulanMax = $scope.jumlahUsulanMax;
            }
        }
    ]);
});