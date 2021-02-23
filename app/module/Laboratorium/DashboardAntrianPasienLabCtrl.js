define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DashboardAntrianPasienLabCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp', '$state', 'CacheHelper', 'DateHelper',
        function ($q, $rootScope, $scope, manageLogistikPhp, $state, cacheHelper, dateHelper) {
            let intervalTime = 5 * 1000;
            $scope.dataPasienAntrian = [];

            let init = () => {
                setInterval(() => {
                    init();
                }, intervalTime)
                manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-daftar-order-lab?isNotVerif=true&jmlRow=10").then(res => {
                    $scope.dataPasienAntrian = res.data.data
                })
            }
            init();
            
        }
    ]);
});