/**
 * Created by jasamedika on 6/20/2016.
 */
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KetLainLainCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'GetPostOnPengkajianAwal',
        function($rootScope, $scope, ModelItem, $state, cacheHelper, DateHelper, GetPostOnPengkajianAwal) {
            ModelItem.get("RiwayatKetLainLain").then(function(data) {
                $scope.item = data;
            })
            $scope.now = new Date();
            ModelItem.getDataDummyGeneric("StatusFiksasi", false).then(function(data) {
                $scope.listStatusFiksasi= data;
            })
            ModelItem.getDataDummyGeneric("StatusYaTidak", false).then(function(data) {
                $scope.listStatusYaTidak= data;
            })
            ModelItem.getDataDummyGeneric("StatusDr", false).then(function(data) {
                $scope.listStatusDr= data;
            })
            $scope.Next = function() {
                var dataVO = delete $scope.item.attributes;
                console.log(JSON.stringify($scope.item));

                //kirim data inputan dari frontend ke server
                GetPostOnPengkajianAwal.SendData(dataVO, "Pengkajian/KetLainLain")
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
 