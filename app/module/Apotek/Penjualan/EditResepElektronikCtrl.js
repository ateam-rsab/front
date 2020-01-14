define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('EditResepElektronikCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, $mdDialog) {
            // $scope.labelSelesai = "Selesai";
            $scope.dataResep = [];

            $scope.showLoader = true;
            let getDataResep = function () {
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
            }
            getDataResep();

            $scope.kembali = function () {
                window.history.back();
            }

            $scope.batalkanResep = function (data) {
                let norec = data.norec;
                let dataSave = {
                    "norec": norec
                }
                var confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan menghapus Resep?')
                    .textContent(`Anda akan menghapus  R/${data.resep}`)
                    .ariaLabel('Lucky day')
                    // .targetEvent(data)
                    .ok('Ya')
                    .cancel('Tidak');
                $mdDialog.show(confirm).then(function () {
                    $scope.showLoader = true;
                    manageLogistikPhp.postpost('logistik/edit-resep-elektronik-by-norec/delete', dataSave).then(res => {
                        getDataResep();
                    });
                }, function () {
                    console.warn('Tidak jadi hapus');
                });
            }

            $scope.editResep = function (data) {
                $scope.namaObat = data.namaproduk;
                $scope.quantity = data.jumlah;
                $scope.satuan = data.satuan;
                
                $scope.norecObat = data.norec;
                $scope.popupEditObat.open().center();
            }

            $scope.simpanResep = function () {
                $scope.showLoader = true;
                let dataSave = {
                    "norec": $scope.norecObat,
                    "jumlah": $scope.quantity,
                }
                manageLogistikPhp.postpost('logistik/edit-resep-elektronik-by-norec/edit', dataSave).then(res => {
                    getDataResep();
                    $scope.showLoader = false;
                    $scope.popupEditObat.close();
                });
                // http://172.16.99.119:8000/service/transaksi/logistik/edit-resep-elektronik-by-norec/edit
            }
        }
    ]);
});