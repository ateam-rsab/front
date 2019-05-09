/**
 * Created by jasamedika on 6/20/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('LanjutanKetLainLainCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'GetPostOnPengkajianAwal',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper, GetPostOnPengkajianAwal) {
            ModelItem.get("RiwayatLanjKetLainLain").then(function(data) {
                $scope.item = data;
            })
            $scope.now = new Date();
            ModelItem.getDataDummyGeneric("StatusMikroskopik", false).then(function(data) {
                $scope.listStatusMikroskopik= data;
            })
            $scope.Next = function() {
                var dataVO = delete $scope.item.attributes;
                console.log(JSON.stringify($scope.item));

                //kirim data inputan dari frontend ke server
                GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/LanjutanKetLainLain")
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
 