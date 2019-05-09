define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SimulasiPendapatanCtrl', ['FindSdm', 'ModelItem', 'ManageSdm', '$state', '$rootScope', '$scope',
        function(findSdm, modelItem, manageSdm, $state, $rootScope, $scope) {
            $scope.listTahun = [];
            for (var i = 2014; i <= new Date().getFullYear(); i++)
                $scope.listTahun.push({ id: i });
            $scope.item = {
                pendapatan: 0,
                persenRemun: 40,
                persenP2: 70,
                persenP1: 30
            }
            $scope.$watch('selectedTahun', function(e) {
                if (e === undefined) return;
                findSdm.getRekapEvaluasi(e.id).then(function(data) {
                    $scope.item.tahun = e.id;
                    $scope.item.totalJobValue = data.data.data.result;
                    findSdm.getSimulasi(e.id).then(function(data) {
                        if (data.data.data.items !== null) {
                            $scope.item = data.data.data.items;
                            $scope.calculate();
                        }
                    });
                    $scope.calculate();
                });


            })
            $scope.$watch('item.totalJobValue', function() {
                $scope.calculate();
            })
            $scope.calculate = function() {
                $scope.item.jumlahRemun = $scope.item.pendapatan * $scope.item.persenRemun / 100;
                $scope.item.anggaranRemunerasi = $scope.item.jumlahRemun - $scope.item.jumlahP3;
                $scope.item.jumlahP1 = $scope.item.anggaranRemunerasi * $scope.item.persenP1 / 100;
                $scope.item.jumlahP2 = $scope.item.anggaranRemunerasi * $scope.item.persenP2 / 100;
                $scope.item.kebutuhanRemunerasi = $scope.item.anggaranRemunerasi / 13;
                $scope.item.poinPir = $scope.item.kebutuhanRemunerasi / $scope.item.totalJobValue;
            }
            $scope.Save = function() {
                manageSdm.savePir(modelItem.beforePost($scope.item));
            }
        }

    ])
});