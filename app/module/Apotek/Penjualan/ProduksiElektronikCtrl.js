define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ProduksiElektronikCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, $mdDialog) {
            // $scope.labelSelesai = "Selesai";
            $scope.dataResep = [];

            $scope.showLoader = true;
            manageLogistikPhp.getDataTableTransaksi('logistik/get-resep-elektronik-by-norec?norec_so=' + $state.params.norec_so).then(res => {
                $scope.dataResep = res.data.data;
                for (let i = 0; i < res.data.data.length; i++) {
                    if ($scope.dataResep.length > 1) {
                        $scope.dataResep[i]["jenisKemasan"] = "Racikan"
                    } else {
                        $scope.dataResep[i]["jenisKemasan"] = "Non Racikan"
                    }
                }
                $scope.showLoader = false;

            });

            $scope.kembali = function () {
                window.history.back();
            }

            $scope.selesaiProduksi = function () {
                let data = {
                    norec_so: $state.params.norec_so
                }
                manageLogistikPhp.postpost('logistik/post-resep-elektronik-selesai-norec', data).then(res => {
                    $state.go('ResepElektronik');
                })
            }

            $scope.onchecked = function (item, data) {
                if (data) {
                    $("#resep" + item).addClass('card-block-ui');
                } else {
                    $("#resep" + item).removeClass('card-block-ui');
                }

            }
        }
    ]);
});