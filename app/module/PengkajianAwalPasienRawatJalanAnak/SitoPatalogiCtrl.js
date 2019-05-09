/**
 * Created by jasamedika on 6/20/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('SitoPatalogiCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'GetPostOnPengkajianAwal',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper, GetPostOnPengkajianAwal) {
            ModelItem.get("RiwayatLabPatAnatomik").then(function(data) {
                $scope.item = data;
            })

            ModelItem.getDataDummyGeneric("StatusCaraPengambilan", false).then(function(data) {
                $scope.listStatusCaraPengambilan = data;
            })
            ModelItem.getDataDummyGeneric("StatusDiagnosaFake", false).then(function(data) {
                $scope.listStatusDiagnosa = data;
            })
            ModelItem.getDataDummyGeneric("StatusPilihanDiagnosa", false).then(function(data) {
                $scope.listStatusPilihanDiagnosa = data;
            })
            $scope.now = new Date();
            $scope.isCaraPengambilanKet = false;
            $scope.$watch('item.CaraPengambilan', function(newValue, oldValue) {
                if (newValue == "Lainnya") {
                    $scope.isCaraPengambilanKet = true;
                } else {
                    $scope.isCaraPengambilanKet = false;
                }
            });
            $scope.isStatKode = false;
            $scope.isStatName = false;
            $scope.$watch('item.RadioDiagnosis', function(newValue, oldValue) {
                if (newValue == "Kode Penyakit") {
                    $scope.isStatKode = true;
                    $scope.isStatName = false;

                } else {
                    $scope.isStatKode = false;
                    $scope.isStatName = true;
                }
            });


            $scope.Next = function() {
                var dataVO = delete $scope.item.attributes;
                console.log(JSON.stringify($scope.item));

                //kirim data inputan dari frontend ke server
                GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/SitoPatalogi")
                    .then(
                        function(res) {
                            //eksekusi posting berhasil

                        },
                        function(err) {
                            //eksekusi kalo posting gagal
                        })
            };

        }
    ]);
}); 