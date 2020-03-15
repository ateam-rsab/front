define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardRuanganBedahCtrl', ['$q', '$rootScope','$scope', 'ManageServicePhp', '$state', 'CacheHelper', 'DateHelper', '$window','ModelItemAkuntansi',
        function ($q, $rootScope, $scope, ManageServicePhp, $state, cacheHelper, dateHelper, $window, modelItemAkuntansi) {
            $scope.item = {};
            $scope.dataAntrian = [];

            $scope.init = function() {
                $scope.isRouteLoading = true;
                // simrs_harkit/service/transaksi/rekam-medis/get-dashboard-jadwal-harian?tgloperasi=2020-02-27
                ManageServicePhp.getDataTableTransaksi("rekam-medis/get-dashboard-jadwal-harian?tgloperasi=" + dateHelper.formatDate(new Date(), 'YYYY-MM-DD'), true).then(function (data) {
                    $scope.dataAntrian = data.data.daftar;
                    console.log(data.data.daftar);
                    $scope.isRouteLoading = false;
                });
            }
            $scope.init();
        }
    ]);
});
