define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('RekamDataNonPegawaiCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm', 'ManageSdmNew', 'DateHelper', 'FindPegawai', 'FindSdm', '$timeout', 'ManageSarprasPhp', 'ModelItemAkuntansi', '$mdDialog',
        function ($q, $rootScope, $scope, ModelItem, $state, ManageSdm, ManageSdmNew, dateHelper, FindPegawai, FindSdm, $timeout, manageSarprasPhp, modelItemAkuntansi, $mdDialog) {
            $scope.item = {};
            $scope.listJenisKelamin = [
                {
                    id: 1,
                    jenisKelamin: 'Laki - laki',
                },
                {
                    id: 1,
                    jenisKelamin: 'Perempuan',
                },
            ]

            $scope.init = function () {
                ManageSdm.getOrderList("service/list-generic/?view=Agama&select=*", true).then(res => {
                    $scope.ListAgama = res.data
                })
            }
            $scope.init();
        }
    ]);
});