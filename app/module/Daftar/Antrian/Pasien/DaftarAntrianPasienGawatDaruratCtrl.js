define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarAntrianPasienGawatDaruratCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'RegistrasiPasienBaru', 'FindPasien', 'DateHelper',
        function($rootScope, $scope, ModelItem, $state, RegistrasiPasienBaru, findPasien, dateHelper) {
            $scope.dataVOloaded = false;
            $scope.now = new Date();
            $scope.from = new Date();
            $scope.until = new Date();
            $scope.Column = [{
                field: "noRegistrasi",
                title: "No Registrasi",
                width: 120
            }, {
                field: "noCm",
                title: "No Rekam Medis",
                width: 150
            }, {
                field: "namaPasien",
                title: "Nama Pasien",
                width: 200
            }, {
                field: "ruanganTujuan",
                title: "Ruangan Tujuan",
                width: 200
            }, {
                field: "status",
                title: "Status",
                width: 200
            }, {
                field: "kategory",
                title: "Kategori",
                width: 200
            }, ];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }


        }
    ]);
});