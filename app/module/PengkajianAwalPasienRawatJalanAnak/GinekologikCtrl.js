/**
 * Created by jasamedika on 6/20/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('GinekologikCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'GetPostOnPengkajianAwal',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper, GetPostOnPengkajianAwal) {
            ModelItem.get("RiwayatGinekologik").then(function(data) {
                $scope.item = data;
            })
            $scope.now = new Date();
            $rootScope.hideButtonAdd = true;
            ModelItem.getDataDummyGeneric("Statustest", false).then(function(data) {
                $scope.listStatusTest = data;
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



            $scope.arrKarateristikNyeri = [];
            $scope.cekArrKarateristikNyeri = function(listId) {
                var idx = $scope.arrKarateristikNyeri.indexOf(listId);

                // is currently selected
                if (idx > -1) {
                    $scope.arrKarateristikNyeri.splice(idx, 1);
                }

                // is newly selected
                else {
                    $scope.arrKarateristikNyeri.push(listId);
                }
                var a = $scope.arrKarateristikNyeri
                var sum = a.reduce(function(a, b) { return a + b; }, 0);
                alert(sum);
                console.log('list arrKarateristikNyeri : ' + $scope.arrKarateristikNyeri);
            };

            $scope.isTextLain = false;
            $scope.clickStatusGinekologik = function(listId) {
                alert(listId);
                if (listId == "Lain-Lain") {
                    $scope.isTextLain = true;
                } else {
                    $scope.isTextLain = false;
                }
            };


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
});
/**
 * Created by jasamedika on 6/20/2016.
 */