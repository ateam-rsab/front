/**
 * Created by jasamedika on 6/20/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RiwayatPartusCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'GetPostOnPengkajianAwal',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper, GetPostOnPengkajianAwal) {
            ModelItem.get("RiwayatPartus").then(function(data) {
                $scope.item = data;
            })
            $scope.now = new Date();

            ModelItem.getDataDummyGeneric("Statustest", false).then(function(data) {
                $scope.listStatusTest= data;
            })
            ModelItem.getDataDummyGeneric("StatusKontrasepsi", false).then(function(data) {
                $scope.listStatusKontrasepsi = data;
            })
            ModelItem.getDataDummyGeneric("StatusGinekologi", false).then(function(data) {
                $scope.listStatusGinekologi = data;
            })
            $scope.item = {};
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
                GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/Ginekologik")
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
});/**
 * Created by jasamedika on 6/20/2016.
 */
 