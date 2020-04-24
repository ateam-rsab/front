define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PresensiPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'ManageSdmNew', 'DateHelper', '$mdDialog', 'CetakHelper',
        '$state', 'ManageSarprasPhp', '$timeout',
        function ($q, $rootScope, $scope, ModelItem, ManageSdm, ManageSdmNew, DateHelper, $mdDialog, cetakHelper, $state, manageSarprasPhp, $timeout) {
            $scope.data = {};
            $scope.now = new Date();
            $scope.time = "";
            let dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));

            let init = function () {
                $scope.tanggalPresensi = new Date();

                ManageSdmNew.getListData('sdm/get-jadwal-pegawai').then((res) => {
                    $scope.data = res.data.data;
                });

                ManageSdmNew.getListData('sdm/get-histori-presensi-pegawai').then((res) => {                    
                    $scope.dataHistoriPresensi = res.data.data.data;
                });
            }

            init();


        }
    ]);
});