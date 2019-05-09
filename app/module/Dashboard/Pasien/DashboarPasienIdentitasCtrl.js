define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboarPasienIdentitasCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien','DateHelper',
        function($rootScope, $scope, ModelItem, $state, findPasien,dateHelper) {
            $rootScope.showMenu = false;
            $scope.noCM = $state.params.noRec;
            $rootScope.showMenuPengkajianMedis = false;
            // findPasien.getByNoCM($scope.noCM).then(function(data) {
            //     // $rootScope.currentPasien = data.data;
            //     debugger;
            //     $scope.item = data.data.data;
            //     $scope.tglLahir= new moment($scope.item.tglLahir).format('DD MMMM YYYY');
            // });
            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                debugger;
                $scope.item = ModelItem.beforePost(data.data, true);
                // $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);

                $scope.item.pasien.umurPasien = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-YYYY HH:mm');
                $scope.tglLahir = new moment($scope.item.pasien.tglLahir).format('DD MMMM YYYY');
                debugger;
            });
        }
    ]);
});