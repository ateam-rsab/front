define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarKehadiranPasienLabCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper', 'ManageServicePhp', '$window', '$mdDialog',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper, manageServicePhp, $window, $mdDialog) {
            $scope.item = {};

            $scope.item.tglAwal = dateHelper.setJamAwal(new Date());
            $scope.item.tglAkhir = dateHelper.setJamAkhir(new Date());

            $scope.optGridKehadiran = {
                columns: [{
                    "field": "noCm",
                    "title": "No. Rekam Medis",
                    "width": 100,
                }, {
                    "field": "noRegistrasi",
                    "title": "No. Registrasi",
                    "width": 100,
                }, {
                    "field": "namaPasien",
                    "title": "Nama Pasien",
                    "width": 200,
                }, {
                    "field": "tglOrder",
                    "title": "Tanggal Order",
                    "width": 100,
                }, {
                    command: [{
                        text: "Verifikasi",
                        click: verifikasi,
                        imageClass: "k-icon k-i-pencil"
                    }],
                    title: "",
                    width: 70
                }]
            }

            $scope.getDataKehadiran = () => {
                $scope.isRouteLoading = true;

                let tglAwal = $scope.item.tglAwal ? dateHelper.formatDate($scope.item.tglAwal, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm"),
                    tglAkhir = $scope.item.tglAkhir ? dateHelper.formatDate($scope.item.tglAkhir, "YYYY-MM-DD HH:mm") : dateHelper.formatDate(new Date(), "YYYY-MM-DD HH:mm");

                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-dashboard-after-verif?tglAwal=" + tglAwal + "&tglAkhir=" + tglAkhir, true).then(function (res) {
                    $scope.dataSourceKehadiranPasien = new kendo.data.DataSource({
                        data: res.data.data,
                        pageSize: 100
                    });

                    $scope.isRouteLoading = false;
                })
            }
            $scope.getDataKehadiran();

            function verifikasi(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                let dataSave = {
                    norec_order: dataItem.norecSO
                }

                let confirm = $mdDialog.confirm()
                    .title('Apakah anda yakin akan Verifikasi?')
                    .textContent(`${dataItem.noRegistrasi} akan di Verifikasi`)
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Simpan')
                    .cancel('Batal');

                $mdDialog.show(confirm).then(function () {
                    manageLogistikPhp.saveData("transaksi/lab-radiologi/save-selesai", dataSave).then((res) => {
                        $scope.getDataKehadiran();
                    })
                }, function () {
                    console.log("Batal")
                });
            }
        }
    ]);
});