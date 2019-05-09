define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboarPasienPengkajianLanjutanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'DateHelper', '$mdDialog',

        function($rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, dateHelper, $mdDialog) {
            $scope.noCM = $state.params.noCM;
            $scope.tanggal = $state.params.tanggal;
            $scope.noRecRiwayatPap = $state.params.noRecRiwayatPap;
            $scope.pasienId = $state.params.pasienId;
            // findPasien.findDokterPenanggungJawab($state.params.tanggal, $state.params.noCM).then(function(e) {
            //     $rootScope.dpjp = e.data.namaPegawai;
            // });
            $scope.validasi= function(){
                var confirm = $mdDialog.confirm()
                    .clickOutsideToClose(true)
                    .title('Penting')
                    .textContent('Silahkan input pengkajian awal terlebih dahulu')
                    .ariaLabel('Alert Dialog')
                    .ok('OK')
                $mdDialog.show(confirm).then(function() {
                })
            };
            var isExistKajianAwal = cacheHelper.get('idPengkajianLanjut');
            if (!isExistKajianAwal){
                // messageContainer.log('Data Kajian Awal Belum di buat');
                // return;
                $scope.validasi();
            }
            if(currentState.indexOf('Skrining') > 0 || currentState.indexOf('Diagnosis') > 0){
                debugger;
                $scope.activeMenuPengkajianLanjutan = localStorage.getItem('activeMenuPengkajianLanjutan'); // set active menu
            } else {
                localStorage.removeItem('activeMenuPengkajianLanjutan'); // remove cache activeMenuDashboardPAP
            }
            $rootScope.tanggal = $scope.tanggal;
            $rootScope.showMenuPengkajianLanjutan = true;
            $scope.item = cacheHelper.get("kajianAwal");
            $rootScope.hideMenuKajianAwal = window.stateKajianAwal;

            findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                $scope.item = ModelItem.beforePost(data.data, true);
                // $scope.item.pasien = ModelItem.beforePost(data.data.pasien, true);
                $scope.item.pasien.umurPasien = dateHelper.CountAge($scope.item.pasien.tglLahir, data.data.tglRegistrasi);
                $scope.item.tanggalRegistrasi = new moment($scope.item.tglRegistrasi).format('DD-MM-YYYY HH:mm');
            });
            $scope.nav = function(state) {
                $scope.activeMenuPengkajianLanjutan = state;
                localStorage.setItem('activeMenuPengkajianLanjutan', state);
                $state.go(state, $state.params);
            }
        }
    ]);
});